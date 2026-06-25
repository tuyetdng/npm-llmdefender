#src/models/prompts/templates/semantic_prompt_analysis.py
"""
SEMANTIC ANALYSIS PROMPT TEMPLATES
"""

from datetime import datetime
import os
import json
import re
from typing import Dict, List, Optional
from analysis.signal_aggregator import StructuralContext
from analysis.structural_analysis import StructuralAnalysisFinding
from data.models import PackageProfile, SemanticAnalysisResult, Behavior
from enums.behavior_category import BehaviorCategory
from enums.severity import Severity
from logs.logging_config import setup_logger
logger = setup_logger()

SEMANTIC_OUTPUT_DIR = "./experiment_results/semantic_output"

# Token budget per routing tier (approximate: 1 token ≈ 4 chars)
# DeepSeek-Coder-6.7B context = 16K tokens
# Reserve ~3K for system + instructions + output schema → ~13K for code
_CODE_BUDGET: Dict[str, int] = {
    "flag":   10_000,   # chars - full context, high priority
    "review":  7_000,   # chars - focused context
    "skip":    4_000,   # chars - minimal, LLM does independent scan
}

class SemanticPromptAnalysis:
    """Templates for semantic analysis prompts.
    Uses StructuralContext (from SignalAggregator) as the primary anchor -
    LLM is asked to verify/expand on structural signals, not re-analyze from scratch.

    4 analysis cases based on routing × has_js_source:
        FLAG/REVIEW + has_js   → verify confirmed signals + scan code
        FLAG/REVIEW + no js    → verify from hook commands + metadata only
        SKIP        + has_js   → independent scan, no prior bias
        SKIP        + no js    → metadata-only reasoning
    """
        
    @classmethod
    def get_behavior_categories(cls) -> List[str]:
        return [category.value for category in BehaviorCategory]
    
    @classmethod
    def get_severity_levels(cls) -> List[str]:
        return [severity.value for severity in Severity]
    
    def __init__(
        self,
        package_profile: PackageProfile,
        structural_context: StructuralContext,
    ):
        self.package = package_profile
        self.ctx = structural_context
        self._routing = structural_context.routing  # "flag" | "review" | "skip"

    @property
    def _has_js_source(self) -> bool:
        """True if any JS source is available for LLM to read."""
        return bool(
            (self.package.entry_point_code or "").strip()
            or (getattr(self.package, "install_script_files", {}) or {})
        )   
    
    def save_parsed_output(
        self,
        parsed_data: dict,
        version_tag: str,
        analyst_note: Optional[str] = None,
    ) -> dict:
        """
        Persist semantic stage output to JSON.

        """
        os.makedirs(SEMANTIC_OUTPUT_DIR, exist_ok=True)

        result = {
            "package_name": self.package.package_name,
            "version":       self.package.version,
            "label":         self.package.label,
            # --- Core findings ---
            "behaviors":     parsed_data.get("behaviors", []),
            "risk_vector":   parsed_data.get("risk_vector", []),
            "analyst_note":  analyst_note or "",
            # --- Analysis metadata ---
            "analysis_metadata": {
                "model":                    "deepseek-coder-6.7b-instruct",
                "stage":                    version_tag,
                "routing":                  self._routing,
                "structural_risk_score":    self.ctx.risk_score,
                "confirmed_signals_count":  len(self.ctx.confirmed_signals),
                "has_structural_backup":    len(self.ctx.confirmed_signals) > 0,
            },
            "created_at": datetime.now().isoformat(),
        }

        safe_name = f"{self.package.package_name.replace('/', '#')}-{self.package.version}.json"
        file_path = os.path.join(SEMANTIC_OUTPUT_DIR, safe_name)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        return result
    # ------------------------------------------------------------------
    # Prompt sections
    # ------------------------------------------------------------------

    def _system(self) -> str:
        return (
            "You are a JavaScript supply chain security analyst. "
            "Your task is to identify malicious behaviors in npm packages "
            "based on static analysis evidence and source code. "
            "Do NOT flag standard minified code, bundlers, or legitimate third-party library usage."
            "Output ONLY valid JSON - no prose, no markdown fences."
        )

    def _user(self) -> str:
        parts = []

        # Package metadata (always included, compact)
        parts.append(self._format_metadata())

        # Structural pre-analysis block (the anchor)
        parts.append(self._format_structural_anchor())

        # Code to analyze (budget-controlled)
        parts.append(self._format_code_context())

        return "\n\n".join(parts)

    def _instructions(self) -> str:
        categories = [c.value for c in BehaviorCategory]

        output_schema = {
            "behaviors": [
                {
                    "category": categories[0],
                    "summary": "One sentence: what malicious action does this take?",
                    "details": "Technical evidence: which API, file, line, domain",
                    "confidence": 0.0,
                    "evidence_apis": [],
                    "evidence_files": [],
                    "evidence_domains": [],
                    "evidence_commands": [],
                    "evidence_env_vars": [],
                }
            ],
            "risk_vector": [categories[0]],
        }

        anchor_instruction = {
            "flag": (
                "The structural pre-analysis above flagged HIGH-CONFIDENCE signals. "
                "Your primary task is to VERIFY these signals and determine their "
                "malicious intent. Also check for additional behaviors not yet detected."
            ),
            "review": (
                "The structural pre-analysis above found some signals worth investigating. "
                "Verify whether these signals represent genuine malicious behavior, "
                "and look for any additional issues in the code."
            ),
            "skip": (
                "The structural pre-analysis found no significant signals - "
                "but static analysis has limited coverage and may miss obfuscated "
                "or novel malware. Perform an INDEPENDENT scan of the code below. "
                "Do not assume the package is clean."
            ),
        }[self._routing]

        return f"""INSTRUCTIONS:
{anchor_instruction}

Analysis principles:
- Evidence-based: every behavior must cite specific API calls, files, or commands
- Intent-focused: describe what the malicious code DOES to the victim, not mechanics
- Conservative: if genuinely ambiguous, lower confidence (< 0.5) or omit
- Do NOT report standard library usage (https, fs, path) as malicious without context
- The 'risk_vector' list must contain each category ONCE (deduped)
- If no suspicious behavior found, return behaviors=[] and risk_vector=[]

Confidence scoring guide:
  0.9-1.0 : explicit malicious payload (reverse shell, exfil to known C2)
  0.7-0.89: strong signal (credential access + network call)
  0.5-0.69: suspicious but ambiguous
  < 0.5   : weak signal, include only if part of a pattern

Output schema (fill exactly, no extra fields):
{json.dumps(output_schema, indent=2)}

Valid categories: {", ".join(categories)}
Output ONLY the JSON object. No explanation, no markdown."""

    def _format_metadata(self) -> str:
        """Compact package identity block - always included regardless of routing."""
        pkg = self.package
        scripts = pkg.scripts or {}
        hook_keys = [
            k for k in scripts
            if k in ("preinstall", "install", "postinstall", "prepare", "prepublish")
        ]

        lines = [
            "PACKAGE METADATA:",
            f"  Name    : {pkg.package_name}",
            f"  Version : {pkg.version}",
        ]
        if hook_keys:
            lines.append(f"  Hooks   : {', '.join(hook_keys)}")
            for k in hook_keys:
                lines.append(f"    {k}: {str(scripts[k])[:120]}")

        all_deps = {**(pkg.dependencies or {}), **(getattr(pkg, "dev_dependencies", {}) or {})}
        if all_deps:
            dep_str = ", ".join(f"{k}@{v}" for k, v in list(all_deps.items())[:8])
            lines.append(f"  Deps    : {dep_str}")

        return "\n".join(lines)

    def _format_structural_anchor(self) -> str:
        """
        Format StructuralContext as LLM priming anchor.

        4 cases - routing × has_js_source:

        Case 1: FLAG/REVIEW + has_js_source=True
            → confirmed signals + code available below
        Case 2: FLAG/REVIEW + has_js_source=False
            → confirmed signals, NO code (metadata-only / hook-based attack)
            → tell model to verify from hook commands in metadata
        Case 3: SKIP + has_js_source=True
            → no structural signals, but code available
            → independent scan, do not assume clean
        Case 4: SKIP + has_js_source=False
            → no signals AND no code - very limited analysis possible
            → model can only reason from package metadata
        """
        ctx = self.ctx


        # Case 3 & 4: SKIP
        if self._routing == "skip":
            lines = [
                "STRUCTURAL PRE-ANALYSIS:",
                f"Routing: SKIP",
                f"Risk Score: {ctx.risk_score:.2f}",
                "Result: No signals detected by static analysis.",
            ]
            if self._has_js_source:
                # Case 3: code available - independent scan
                lines += [
                    "IMPORTANT: Static analysis has limited coverage - "
                    "regex/AST patterns may miss obfuscated payloads, "
                    "novel C2 patterns, or logic bombs.",
                    "Perform an INDEPENDENT scan of the code below. "
                    "Do not assume the package is clean.",
                ]
            else:
                # Case 4: no code either - very limited
                lines += [
                    "NOTE: No JS source available AND no structural signals.",
                    "nalyze based on package metadata only (name, version, hooks, deps). "
                    "Flag only if metadata itself is suspicious "
                    "(e.g. typosquatting, version inflation, suspicious hook commands).",
                ]
            return "\n".join(lines)


        # Case 1 & 2: FLAG / REVIEW
        lines = [
            "STRUCTURAL PRE-ANALYSIS:",
            f"  Routing    : {ctx.routing.upper()}",
            f"  Risk Score : {ctx.risk_score:.2f}",
            f"  Confidence : {ctx.confidence:.2f}",
            f"  Primary    : {ctx.primary_category.value if ctx.primary_category else 'none'}",
        ]

        if ctx.confirmed_signals:
            lines.append(f"\n  Confirmed signals ({len(ctx.confirmed_signals)}):")
            for s in ctx.confirmed_signals[:5]:   # cap at 5 to save tokens
                sig_lines = s.strip().splitlines()
                for sl in sig_lines[:2]:           # Signal + Location only, skip Code line
                    lines.append(f"    [!] {sl.strip()}")

        if ctx.supporting_signals:
            lines.append(f"\n  Supporting signals ({len(ctx.supporting_signals)}):")
            for s in ctx.supporting_signals[:3]:
                first = s.strip().splitlines()[0]
                lines.append(f"    [-] {first.strip()}")

        if not self._has_js_source:
            # Case 2: signals exist but no JS code to read
            lines.append(
                "\n  NOTE: No JS source available. "
                "This is likely a hook-based attack - payload executes at install time "
                "via the commands listed in PACKAGE METADATA above. "
                "Verify malicious intent from hook commands and structural signals only."
            )

        return "\n".join(lines)


    # Code context (budget-controlled)
    def _format_code_context(self) -> str:
        """
        Assemble code sections within token budget.

        Priority order:
        1. install_script_files (highest risk, usually small)
        2. install_script_content (hook command string)
        3. entry_point_code (truncated to fit remaining budget)
        """
        budget = _CODE_BUDGET.get(self._routing, 6_000)
        sections = []
        used = 0

        # Priority 1: Install script files (JS called from hooks)
        install_files = getattr(self.package, "install_script_files", {}) or {}
        for filename, code in install_files.items():
            if not code or not code.strip():
                continue
            snippet = f"FILE: {filename}\n```javascript\n{code}\n```"
            if used + len(snippet) > budget:
                # Truncate to fit
                remaining = budget - used - len(f"FILE: {filename}\n```javascript\n\n```") - 50
                if remaining > 200:
                    snippet = f"FILE: {filename}\n```javascript\n{code[:remaining]}\n... [truncated]\n```"
                else:
                    break
            sections.append(snippet)
            used += len(snippet)
            if used >= budget:
                break

        # Priority 2: Install hook command (raw string - usually short)
        install_cmd = self.package.install_script_content or ""
        if install_cmd.strip() and used < budget:
            snippet = f"INSTALL HOOK COMMANDS:\n{install_cmd}"
            if used + len(snippet) <= budget:
                sections.append(snippet)
                used += len(snippet)

        # Priority 3: Entry point code
        entry = self.package.entry_point_code or ""
        if entry.strip() and used < budget:
            remaining = budget - used
            if len(entry) > remaining:
                entry_snippet = (
                    f"ENTRY POINT (main) [first {remaining} chars shown]:\n"
                    f"```javascript\n{entry[:remaining]}\n... [truncated]\n```"
                )
            else:
                entry_snippet = f"ENTRY POINT (main):\n```javascript\n{entry}\n```"
            sections.append(entry_snippet)

        if not sections:
            return "CODE: No source files available for analysis."

        return "CODE TO ANALYZE:\n" + "\n\n".join(sections)

    # ------------------------------------------------------------------
    # Public
    # ------------------------------------------------------------------

    def build_prompt(self) -> Dict[str, str]:
        """Return {system, user, instructions} dict for the LLM call."""
        return {
            "system": self._system(),
            "user": self._user(),
            "instructions": self._instructions(),
        }