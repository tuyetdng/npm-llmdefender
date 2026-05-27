"""
AST ANALYZER MODULE
Layer 2: JavaScript source code analysis using tree-sitter.

Input : PackageProfile
Output: List[StructuralAnalysisFinding]

Compatible with tree-sitter >= 0.22 (pure AST walk, no Query API).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Optional, Set, Tuple
import re

from logs.logging_config import setup_logger
from src.data.models import PackageProfile
from src.enums.behavior_category import BehaviorCategory
from src.enums.severity import Severity
from src.analysis.structural_analysis import StructuralAnalysisFinding, _is_internal_ip

logger = setup_logger()


# ---------------------------------------------------------------------------
# Lazy import tree-sitter
# ---------------------------------------------------------------------------

try:
    from tree_sitter import Language, Parser, Node
    import tree_sitter_javascript as tsjs

    _JS_LANGUAGE = Language(tsjs.language())
    _PARSER = Parser(_JS_LANGUAGE)
    _TREE_SITTER_AVAILABLE = True
except Exception:
    _TREE_SITTER_AVAILABLE = False
    logger.warning("[Layer 2] tree-sitter not available — AST analysis will be skipped.")


# ---------------------------------------------------------------------------
# AST helpers
# ---------------------------------------------------------------------------

def _walk(node: "Node"):
    """DFS traverse all AST nodes."""
    yield node
    for child in node.children:
        yield from _walk(child)


def _text(node: "Node", source: bytes) -> str:
    return source[node.start_byte: node.end_byte].decode("utf-8", errors="replace")


def _find(root: "Node", *types: str) -> List["Node"]:
    """Find all nodes matching any of the given types."""
    return [n for n in _walk(root) if n.type in types]


def _node_line(node: "Node") -> int:
    """Return 1-based line number of node."""
    return node.start_point[0] + 1


def _build_evidence(
    node: "Node",
    source: bytes,
    signal: str,
    source_label: str = "entry_point",
) -> str:
    """
    Build consistent 3-line evidence string matching structural_analysis.py format.

    Format:
        Signal  : <what was detected>
        Location: <source_label>:<line>
        Code    : <source snippet>
    """
    line = _node_line(node)
    snippet = _text(node, source).strip().replace("\n", " ")
    if len(snippet) > 140:
        snippet = snippet[:140] + "..."
    return (
        f"Signal  : {signal}\n"
        f"Location: {source_label}:{line}\n"
        f"Code    : {snippet}"
    )


def _build_evidence_regex(
    source_text: str,
    match_start: int,
    signal: str,
    code_snippet: str,
    source_label: str = "entry_point",
) -> str:
    """Build evidence for regex-based checks (no AST node available)."""
    line = source_text[:match_start].count("\n") + 1
    return (
        f"Signal  : {signal}\n"
        f"Location: {source_label}:{line}\n"
        f"Code    : {code_snippet[:120]}"
    )


# ---------------------------------------------------------------------------
# TaintTracker
# ---------------------------------------------------------------------------

_NETWORK_SINKS: Set[str] = {
    "fetch", "axios", "got", "request", "needle", "superagent",
    "http.request", "http.get", "https.request", "https.get",
    "XMLHttpRequest", "open", "send",
    "axios.post", "axios.get", "axios.put", "axios.patch",
    "sendRequest", "makeRequest", "httpRequest",
}

_CREDENTIAL_KEYS = re.compile(
    r"TOKEN|SECRET|PASSWORD|PASSWD|KEY|CREDENTIAL|API_KEY|AUTH|PRIVATE|ACCESS",
    re.IGNORECASE,
)

# Known webhook / exfil collector domains — shared with structural_analysis
_WEBHOOK_DOMAINS = re.compile(
    r"(?:pipedream\.net|requestbin\.|ngrok\.io|ngrok-free\.app|"
    r"webhook\.site|beeceptor\.com|hookbin\.com|"
    r"burpcollaborator\.net|interact\.sh|canarytokens\.com|"
    r"oast\.pro|oast\.live|oast\.site|oast\.online|oast\.fun|"
    r"localxpose\.io|serveo\.net)",
    re.IGNORECASE,
)


@dataclass
class _TaintedVar:
    name: str
    env_key: str
    source_line: int        # line number of the assignment
    assignment_snippet: str


class TaintTracker:
    """
    Taint tracking: process.env.CREDENTIAL → network sink.
    Pure AST walk — no Query API.
    """

    def __init__(self, root: "Node", source: bytes, source_label: str):
        self._root = root
        self._source = source
        self._source_label = source_label
        self._tainted_vars: Dict[str, _TaintedVar] = {}
        self._tainted_functions: Dict[str, _TaintedVar] = {}

    # ------------------------------------------------------------------
    # Pass 1: collect taint sources
    # ------------------------------------------------------------------

    def _collect_sources(self):
        self._collect_direct_env_assignments()
        for _ in range(3):
            if not self._propagate_assignments():
                break
        self._collect_tainted_returns()

    def _collect_direct_env_assignments(self):
        """Find: const x = process.env.TOKEN"""
        for node in _find(self._root, "variable_declarator"):
            name_node = node.child_by_field_name("name")
            value_node = node.child_by_field_name("value")
            if name_node is None or value_node is None:
                continue
            if value_node.type != "member_expression":
                continue

            outer_obj = value_node.child_by_field_name("object")
            env_key_node = value_node.child_by_field_name("property")
            if outer_obj is None or env_key_node is None:
                continue
            if outer_obj.type != "member_expression":
                continue

            proc_node = outer_obj.child_by_field_name("object")
            env_node = outer_obj.child_by_field_name("property")
            if proc_node is None or env_node is None:
                continue
            if _text(proc_node, self._source) != "process":
                continue
            if _text(env_node, self._source) != "env":
                continue

            env_key = _text(env_key_node, self._source).strip("'\"[]")
            if not _CREDENTIAL_KEYS.search(env_key):
                continue

            var_name = _text(name_node, self._source)
            self._tainted_vars[var_name] = _TaintedVar(
                name=var_name,
                env_key=env_key,
                source_line=_node_line(node),
                assignment_snippet=_text(node, self._source)[:80],
            )

    def _propagate_assignments(self) -> bool:
        """const y = x  →  if x tainted, y is tainted."""
        new_taints: Dict[str, _TaintedVar] = {}
        for node in _find(self._root, "variable_declarator"):
            name_node = node.child_by_field_name("name")
            value_node = node.child_by_field_name("value")
            if name_node is None or value_node is None:
                continue
            if value_node.type != "identifier":
                continue
            src_name = _text(value_node, self._source)
            new_name = _text(name_node, self._source)
            if src_name in self._tainted_vars and new_name not in self._tainted_vars:
                orig = self._tainted_vars[src_name]
                new_taints[new_name] = _TaintedVar(
                    name=new_name,
                    env_key=orig.env_key,
                    source_line=_node_line(node),
                    assignment_snippet=f"{new_name} = {src_name} (propagated from {orig.env_key})",
                )
        self._tainted_vars.update(new_taints)
        return len(new_taints) > 0

    def _collect_tainted_returns(self):
        """Find functions that return tainted vars."""
        for node in _find(self._root, "function_declaration"):
            name_node = node.child_by_field_name("name")
            body_node = node.child_by_field_name("body")
            if name_node and body_node:
                tainted = self._find_tainted_return(body_node)
                if tainted:
                    self._tainted_functions[_text(name_node, self._source)] = tainted

        for node in _find(self._root, "variable_declarator"):
            name_node = node.child_by_field_name("name")
            value_node = node.child_by_field_name("value")
            if name_node is None or value_node is None:
                continue
            if value_node.type != "arrow_function":
                continue
            body_node = value_node.child_by_field_name("body")
            if body_node:
                tainted = self._find_tainted_return(body_node)
                if tainted:
                    self._tainted_functions[_text(name_node, self._source)] = tainted

    def _find_tainted_return(self, body_node: "Node") -> Optional[_TaintedVar]:
        for node in _find(body_node, "return_statement"):
            for child in node.children:
                if child.type == "identifier":
                    name = _text(child, self._source)
                    if name in self._tainted_vars:
                        return self._tainted_vars[name]
        if body_node.type == "identifier":
            name = _text(body_node, self._source)
            if name in self._tainted_vars:
                return self._tainted_vars[name]
        return None


    # Pass 2: check sinks
    def _check_sinks(self) -> List[Tuple[str, int, str, _TaintedVar]]:
        """Returns list of (sink_fn_name, sink_line, call_snippet, tainted_var)."""
        results = []
        for node in _find(self._root, "call_expression"):
            fn_node = node.child_by_field_name("function")
            args_node = node.child_by_field_name("arguments")
            if fn_node is None or args_node is None:
                continue

            fn_text = _text(fn_node, self._source)
            is_sink = (
                fn_text in _NETWORK_SINKS
                or any(fn_text.endswith(f".{s}") for s in _NETWORK_SINKS)
                or any(s in fn_text for s in {"fetch", "axios", "request", "http", "https"})
            )
            if not is_sink:
                continue

            args_text = _text(args_node, self._source)
            sink_line = _node_line(node)

            for var_name, tainted in self._tainted_vars.items():
                if re.search(rf"\b{re.escape(var_name)}\b", args_text):
                    results.append((fn_text, sink_line, f"{fn_text}{args_text[:100]}", tainted))
                    break

            for fn_name, tainted in self._tainted_functions.items():
                if re.search(rf"\b{re.escape(fn_name)}\s*\(", args_text):
                    results.append((fn_text, sink_line, f"{fn_text}{args_text[:100]}", tainted))
                    break

        return results

    def run(self) -> List[StructuralAnalysisFinding]:
        self._collect_sources()
        if not self._tainted_vars and not self._tainted_functions:
            return []

        hits = self._check_sinks()
        findings: List[StructuralAnalysisFinding] = []
        seen: Set[str] = set()

        for sink_name, sink_line, call_snippet, tainted in hits:
            key = f"{tainted.env_key}→{sink_name}"
            if key in seen:
                continue
            seen.add(key)
            findings.append(StructuralAnalysisFinding(
                risk_type="credential_exfiltration_path",
                severity=Severity.HIGH,
                evidence=(
                    f"Signal  : Credential taint path detected\n"
                    f"Location: {self._source_label}:{sink_line}\n"
                    f"Code    : process.env.{tainted.env_key} "
                    f"→ '{tainted.name}' (line {tainted.source_line}) "
                    f"→ {call_snippet[:80]}"
                ),
                confidence=0.90,
                category=BehaviorCategory.CREDENTIAL_THEFT,
            ))
        return findings


# ASTAnalyzer
class ASTAnalyzer:
    """
    LAYER 2: AST-LEVEL STATIC ANALYSIS

    Analyzes all available JS sources in priority order:
        1. install_script_files  (files called from install hooks — highest risk)
        2. entry_point_code      (main entry point)

    Each source is parsed and analyzed independently via _analyze_source().
    """

    _LEGITIMATE_DOMAINS = {
        "npmjs.com", "github.com", "githubusercontent.com",
        "unpkg.com", "cdn.jsdelivr.net", "registry.npmjs.org",
        "nodejs.org", "cloudflare.com", "cdnjs.cloudflare.com",
    }

    def __init__(self, package_profile: PackageProfile):
        self.package_profile = package_profile
        self.risks: List[StructuralAnalysisFinding] = []
        # Active source context — set by _analyze_source(), used by all _check_* methods
        self._source: Optional[bytes] = None
        self._root = None
        self._source_label: str = "unknown"
        self._source_text: str = ""   # decoded string, for regex-based checks


    # Multi-source entry point
    def _analyze_source(self, code: str, source_label: str) -> List[StructuralAnalysisFinding]:
        """
        Parse a JS code string and run all checks against it.

        Sets self._source, self._root, self._source_label, self._source_text
        for the duration of this call, then restores previous state.
        All _check_* methods read these instance attributes.

        Args:
            code: JS source code string
            source_label: e.g. "entry_point", "preinstall.js", "scripts/setup.js"

        Returns:
            List of findings from this source only.
        """
        if not _TREE_SITTER_AVAILABLE or not code or not code.strip():
            return []

        source_bytes = code.encode("utf-8")
        try:
            root = _PARSER.parse(source_bytes).root_node
        except Exception as e:
            logger.warning(f"[Layer 2] Parse failed for {source_label}: {e}")
            return []

        # Save & swap state
        prev_source = self._source
        prev_root = self._root
        prev_label = self._source_label
        prev_text = self._source_text
        prev_risks = self.risks

        self._source = source_bytes
        self._root = root
        self._source_label = source_label
        self._source_text = code
        self.risks = []

        try:
            # HIGH confidence — AST-based
            self._check_obfuscator_signatures()
            self._check_encoded_require()
            self._check_indirect_eval()
            self._check_credential_taint()

            # MEDIUM confidence
            self._check_hardcoded_urls()
            self._check_hardcoded_ip()
            self._check_child_process_dynamic()
            self._check_base64_eval_combo()

            # LOW confidence
            self._check_low_confidence_signals()

            findings = self.risks

        finally:
            # Always restore — even if a check raises
            self._source = prev_source
            self._root = prev_root
            self._source_label = prev_label
            self._source_text = prev_text
            self.risks = prev_risks

        if findings:
            logger.info(f"[Layer 2] {source_label}: {len(findings)} finding(s)")

        return findings

    def run_all(self) -> List[StructuralAnalysisFinding]:
        """
        Analyze all JS sources available in PackageProfile.

        Priority order:
            1. install_script_files — files called from install hooks
            2. entry_point_code     — main entry point
        """
        logger.info(f"[Layer 2] AST analysis: {self.package_profile.package_name}")

        all_findings: List[StructuralAnalysisFinding] = []

        if not _TREE_SITTER_AVAILABLE:
            logger.warning(
                f"[Layer 2] Skipped — tree-sitter unavailable: "
                f"{self.package_profile.package_name}"
            )
            return []

        # --- Priority 1: Install script files ---
        install_files = getattr(self.package_profile, "install_script_files", {}) or {}
        for filename, code in install_files.items():
            findings = self._analyze_source(code, source_label=filename)
            all_findings.extend(findings)

        # --- Priority 2: Entry point ---
        entry_code = self.package_profile.entry_point_code or ""
        if entry_code.strip():
            findings = self._analyze_source(entry_code, source_label="entry_point")
            all_findings.extend(findings)

        if not install_files and not entry_code.strip():
            logger.warning(
                f"[Layer 2] Skipped — no JS source available: "
                f"{self.package_profile.package_name}"
            )

        logger.info(
            f"[Layer 2] Complete: {len(all_findings)} finding(s) — "
            f"{self.package_profile.package_name}"
        )

        self.risks = all_findings
        return all_findings


    # HIGH CONFIDENCE checks
    def _check_obfuscator_signatures(self) -> None:
        """
        _0x variable names — signature of javascript-obfuscator tool.
        Requires >= 3 matches to avoid false positives on single hex variables.
        """
        source = self._source_text
        matches = list(re.compile(r"\b_0x[a-f0-9]{4,}\b", re.IGNORECASE).finditer(source))
        if len(matches) >= 3:
            first = matches[0]
            line_no = source[:first.start()].count("\n") + 1
            line = source.splitlines()[line_no - 1].strip()
            self.risks.append(StructuralAnalysisFinding(
                risk_type="obfuscator_signature",
                severity=Severity.HIGH,
                evidence=_build_evidence_regex(
                    source, first.start(),
                    signal=f"Obfuscator tool signature (_0x pattern, {len(matches)} occurrences)",
                    code_snippet=line,
                    source_label=self._source_label,
                ),
                confidence=0.90,
                category=BehaviorCategory.OBFUSCATION,
            ))

    def _check_encoded_require(self) -> None:
        """require(Buffer.from(...) / atob(...) / fromCharCode(...)) — no legitimate use."""
        for call in _find(self._root, "call_expression"):
            fn_node = call.child_by_field_name("function")
            args_node = call.child_by_field_name("arguments")
            if fn_node is None or args_node is None:
                continue
            if _text(fn_node, self._source) != "require":
                continue
            for inner in _find(args_node, "call_expression"):
                if re.search(r"Buffer\.from|atob|fromCharCode",
                             _text(inner, self._source), re.IGNORECASE):
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type="encoded_require",
                        severity=Severity.HIGH,
                        evidence=_build_evidence(
                            call, self._source,
                            signal="require() with encoded/obfuscated module name",
                            source_label=self._source_label,
                        ),
                        confidence=0.92,
                        category=BehaviorCategory.OBFUSCATION,
                    ))
                    break

    def _check_indirect_eval(self) -> None:
        """
        Three patterns:
        - eval(fetch(...))  — execute remote code
        - Function('return ...')  — string-based code execution
        - (1, eval)(...)  — indirect eval bypass
        """
        network_calls = {"fetch", "axios", "http.get", "https.get", "request", "got"}

        for call in _find(self._root, "call_expression"):
            fn_node = call.child_by_field_name("function")
            args_node = call.child_by_field_name("arguments")
            if fn_node is None or args_node is None:
                continue

            fn_name = _text(fn_node, self._source)
            args_text = _text(args_node, self._source)

            if fn_name == "eval" and any(net in args_text for net in network_calls):
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="eval_network_result",
                    severity=Severity.CRITICAL,
                    evidence=_build_evidence(
                        call, self._source,
                        signal="eval() executing result of network request — remote code execution",
                        source_label=self._source_label,
                    ),
                    confidence=0.95,
                    category=BehaviorCategory.REMOTE_CODE_EXECUTION,
                ))
                continue

            if fn_name == "Function" and re.search(r'[\'"]return\s', args_text):
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="function_constructor",
                    severity=Severity.HIGH,
                    evidence=_build_evidence(
                        call, self._source,
                        signal="Function constructor with string argument — dynamic code execution",
                        source_label=self._source_label,
                    ),
                    confidence=0.88,
                    category=BehaviorCategory.DYNAMIC_CODE_EXECUTION,
                ))

        # (1, eval)(...) — indirect eval, no dedicated AST node
        m = re.search(r"\(\s*1\s*,\s*eval\s*\)", self._source_text)
        if m:
            self.risks.append(StructuralAnalysisFinding(
                risk_type="indirect_eval",
                severity=Severity.HIGH,
                evidence=_build_evidence_regex(
                    self._source_text, m.start(),
                    signal="Indirect eval pattern (1, eval)(...) — bypasses strict mode eval restrictions",
                    code_snippet=m.group(0),
                    source_label=self._source_label,
                ),
                confidence=0.95,
                category=BehaviorCategory.DYNAMIC_CODE_EXECUTION,
            ))

    def _check_credential_taint(self) -> None:
        """Track process.env.CREDENTIAL → network sink data flow."""
        findings = TaintTracker(self._root, self._source, self._source_label).run()
        self.risks.extend(findings)


    # MEDIUM CONFIDENCE checks
    def _check_hardcoded_urls(self) -> None:
        """
        URLs hardcoded in function call arguments.
        Webhook/exfil domains → CRITICAL.
        Unknown domains → MEDIUM.
        """
        url_pattern = re.compile(r'https?://[a-zA-Z0-9.\-]+(?:/[^\s\'"<>]*)?')
        seen_urls: Set[str] = set()

        for call in _find(self._root, "call_expression"):
            args_node = call.child_by_field_name("arguments")
            if args_node is None:
                continue
            for str_node in _find(args_node, "string", "template_string"):
                raw = _text(str_node, self._source).strip("'\"` ")
                for url in url_pattern.findall(raw):
                    if url in seen_urls:
                        continue
                    seen_urls.add(url)

                    # Webhook/exfil domain — very high confidence
                    if _WEBHOOK_DOMAINS.search(url):
                        self.risks.append(StructuralAnalysisFinding(
                            risk_type="webhook_url_in_source",
                            severity=Severity.CRITICAL,
                            evidence=_build_evidence(
                                call, self._source,
                                signal=f"Known exfiltration/webhook collector URL: {url}",
                                source_label=self._source_label,
                            ),
                            confidence=0.95,
                            category=BehaviorCategory.DATA_EXFILTRATION,
                        ))
                    elif not any(d in url for d in self._LEGITIMATE_DOMAINS):
                        self.risks.append(StructuralAnalysisFinding(
                            risk_type="hardcoded_url_in_call",
                            severity=Severity.MEDIUM,
                            evidence=_build_evidence(
                                call, self._source,
                                signal=f"Non-standard URL in function call: {url}",
                                source_label=self._source_label,
                            ),
                            confidence=0.65,
                            category=BehaviorCategory.NETWORK_EXFILTRATION,
                        ))

    def _check_hardcoded_ip(self) -> None:
        """External IP address hardcoded as function call argument."""
        ip_pattern = re.compile(r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b")
        seen_ips: Set[str] = set()

        for call in _find(self._root, "call_expression"):
            args_node = call.child_by_field_name("arguments")
            if args_node is None:
                continue
            for str_node in _find(args_node, "string"):
                raw = _text(str_node, self._source)
                ips = [ip for ip in ip_pattern.findall(raw) if not _is_internal_ip(ip)]
                new_ips = [ip for ip in ips if ip not in seen_ips]
                if new_ips:
                    seen_ips.update(new_ips)
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type="hardcoded_ip_in_source",
                        severity=Severity.HIGH,
                        evidence=_build_evidence(
                            call, self._source,
                            signal=f"Hardcoded external IP(s) in function call: {', '.join(new_ips)}",
                            source_label=self._source_label,
                        ),
                        confidence=0.85,
                        category=BehaviorCategory.NETWORK_EXFILTRATION,
                    ))

    def _check_child_process_dynamic(self) -> None:
        """
        child_process exec/spawn with dynamic (non-literal) arguments.

        Detects both:
        - require('child_process').exec(...)
        - const { exec } = require('child_process'); exec(...)  [destructured]
        """
        exec_methods = {"exec", "execSync", "spawn", "spawnSync", "execFile", "execFileSync"}

        # Collect destructured child_process bindings: const { exec, spawn } = require(...)
        destructured_exec_vars: Set[str] = set()
        for node in _find(self._root, "variable_declaration"):
            decl_text = _text(node, self._source)
            if "child_process" not in decl_text and "require" not in decl_text:
                continue
            for declarator in _find(node, "variable_declarator"):
                name_node = declarator.child_by_field_name("name")
                value_node = declarator.child_by_field_name("value")
                if name_node is None or value_node is None:
                    continue
                # Destructuring pattern: { exec, spawn }
                if name_node.type == "object_pattern":
                    for prop in _find(name_node, "shorthand_property_identifier_pattern",
                                      "property_identifier"):
                        prop_name = _text(prop, self._source)
                        if prop_name in exec_methods:
                            destructured_exec_vars.add(prop_name)

        for call in _find(self._root, "call_expression"):
            fn_node = call.child_by_field_name("function")
            args_node = call.child_by_field_name("arguments")
            if fn_node is None or args_node is None:
                continue

            fn_text = _text(fn_node, self._source)
            args_text = _text(args_node, self._source)

            # Pattern A: require('child_process').exec(...) or cp.execSync(...)
            is_chained = (
                fn_node.type == "member_expression"
                and (
                    "child_process" in _text(fn_node.child_by_field_name("object") or fn_node, self._source)
                    or _text(fn_node.child_by_field_name("object") or fn_node, self._source)
                       in {"cp", "childProcess", "child"}
                )
                and _text(fn_node.child_by_field_name("property") or fn_node, self._source)
                    in exec_methods
            )

            # Pattern B: destructured exec(...)
            is_destructured = (
                fn_node.type == "identifier"
                and _text(fn_node, self._source) in destructured_exec_vars
            )

            if not is_chained and not is_destructured:
                continue

            method_name = fn_text.split(".")[-1]
            is_dynamic = not re.fullmatch(r'\(\s*[\'"][^\'"]*[\'"]\s*\)', args_text)

            self.risks.append(StructuralAnalysisFinding(
                risk_type="child_process_dynamic_exec",
                severity=Severity.HIGH if is_dynamic else Severity.MEDIUM,
                evidence=_build_evidence(
                    call, self._source,
                    signal=f"child_process.{method_name}() with "
                           f"{'dynamic' if is_dynamic else 'static'} argument",
                    source_label=self._source_label,
                ),
                confidence=0.82 if is_dynamic else 0.55,
                category=BehaviorCategory.LOCAL_CODE_EXECUTION,
            ))

    def _check_base64_eval_combo(self) -> None:
        """eval(Buffer.from(...)) or eval(atob(...)) — decode + execute."""
        m = re.compile(
            r"eval\s*\(\s*(?:Buffer\.from|atob)\s*\([^)]+\)", re.IGNORECASE
        ).search(self._source_text)
        if m:
            self.risks.append(StructuralAnalysisFinding(
                risk_type="base64_eval_combo",
                severity=Severity.HIGH,
                evidence=_build_evidence_regex(
                    self._source_text, m.start(),
                    signal="eval(base64_decode(...)) — decode and execute encoded payload",
                    code_snippet=m.group(0)[:100],
                    source_label=self._source_label,
                ),
                confidence=0.92,
                category=BehaviorCategory.OBFUSCATION,
            ))

    # LOW CONFIDENCE checks
    def _check_low_confidence_signals(self) -> None:
        """
        Weak signals — contribute to score but not individually conclusive.
        Filtered out in StructuralContext (noise_filtered counter).
        """
        low_signals = [
            (
                r"\batob\s*\(|\bbtoa\s*\(",
                "base64_encoding_standalone",
                "atob/btoa usage — may indicate encoded payload (common in legitimate code too)",
                BehaviorCategory.OBFUSCATION,
                0.30,
            ),
            (
                r"\(\s*function\s*\([^)]*\)\s*\{",
                "iife_wrapper",
                "IIFE wrapper — common in bundles, occasionally used for obfuscation",
                BehaviorCategory.OBFUSCATION,
                0.15,
            ),
        ]
        for pattern, risk_type, description, category, confidence in low_signals:
            m = re.search(pattern, self._source_text, re.IGNORECASE)
            if m:
                self.risks.append(StructuralAnalysisFinding(
                    risk_type=risk_type,
                    severity=Severity.LOW,
                    evidence=_build_evidence_regex(
                        self._source_text, m.start(),
                        signal=description,
                        code_snippet=m.group(0)[:80],
                        source_label=self._source_label,
                    ),
                    confidence=confidence,
                    category=category,
                ))