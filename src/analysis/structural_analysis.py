"""
STRUCTURAL ANALYSIS MODULE
Layer 1: Metadata-level analysis  (package.json + install hooks + install script files)
Layer 2: AST-level analysis (JS source code) 
TODO: tree-sitter implementation

Output: List[StructuralAnalysisFinding] → consumed by SignalAggregator → StructuralContext → LLM
"""

from dataclasses import dataclass
import ipaddress
from logs.logging_config import setup_logger
from typing import List, Optional
import re

import Levenshtein

from src.data.models import PackageProfile
from src.enums.behavior_category import BehaviorCategory
from src.enums.severity import Severity

logger = setup_logger()


# Data class
@dataclass
class StructuralAnalysisFinding:
    """Represents a single structural analysis finding."""
    risk_type: str
    severity: Severity
    evidence: str       # Multi-line: Signal / Location / Code - ready for LLM prompt
    confidence: float
    category: BehaviorCategory


# Module-level helpers
def _is_internal_ip(ip: str) -> bool:
    try:
        addr = ipaddress.ip_address(ip)
        return (
            addr.is_private
            or addr.is_loopback
            or addr.is_link_local
            or addr.is_multicast
            or addr.is_reserved
        )
    except ValueError:
        return False


def _find_line(code: str, match_start: int) -> int:
    """Return 1-based line number of a match position in code."""
    return code[:match_start].count("\n") + 1


def _get_line_snippet(code: str, line_no: int, max_len: int = 120) -> str:
    """Return the source line at line_no (1-based), truncated."""
    lines = code.splitlines()
    if 1 <= line_no <= len(lines):
        snippet = lines[line_no - 1].strip()
        return snippet[:max_len] + ("..." if len(snippet) > max_len else "")
    return ""


def _build_evidence(signal: str, location: str, code: str) -> str:
    """
    Build a consistent 3-line evidence string for LLM context.

    Format:
        Signal  : <what was detected>
        Location: <file:line or metadata field>
        Code    : <source snippet>
    """
    return f"Signal  : {signal}\nLocation: {location}\nCode    : {code}"


# StructuralAnalyzer
class StructuralAnalyzer:
    """
    LAYER 1: METADATA-LEVEL STATIC ANALYSIS

    Analyzes package.json metadata and install hook scripts.
    Does NOT parse JS AST
    """

    _IP_PATTERN = re.compile(r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b')

    # Known webhook / exfiltration collector domains
    _WEBHOOK_DOMAINS = re.compile(
        r"(?:pipedream\.net|requestbin\.|ngrok\.io|ngrok-free\.app|"
        r"webhook\.site|beeceptor\.com|hookbin\.com|"
        r"burpcollaborator\.net|interact\.sh|canarytokens\.com|"
        r"oast\.pro|oast\.live|oast\.site|oast\.online|oast\.fun|"
        r"localxpose\.io|serveo\.net)",
        re.IGNORECASE,
    )

    _POPULAR_PACKAGES = [
        # Most Targeted
        "react", "express", "lodash", "axios", "request", "moment",
        "chalk", "commander", "fs-extra", "debug",
        # Development Tools
        "webpack", "babel", "typescript", "eslint", "prettier",
        "jest", "mocha", "chai", "sinon", "nyc", "rimraf",
        "cross-env", "dotenv", "concurrently",
        # Build & Utilities
        "gulp", "grunt", "browserify", "parcel", "rollup",
        "uglify-js", "terser", "clean-css", "autoprefixer",
        # Framework & Runtime
        "vue", "angular", "jquery", "socket.io", "ws",
        "next", "nuxt", "nestjs", "fastify", "koa",
        # Data & Utilities
        "underscore", "ramda", "immutable", "rxjs", "bluebird",
        "async", "yargs", "minimist", "inquirer",
        # Security & Auth
        "jsonwebtoken", "bcrypt", "bcryptjs", "passport",
        "helmet", "cors", "express-session", "cookie-parser",
        # Network & HTTP
        "superagent", "node-fetch", "got", "needle",
        "http-proxy", "request-promise", "form-data", "multer",
        # Database & Storage
        "mongoose", "sequelize", "typeorm", "redis", "ioredis",
        "sqlite3", "pg", "mysql2", "mongodb",
        # UI & Styling
        "styled-components", "sass", "less", "stylus",
        "bootstrap", "material-ui", "antd",
        # Package Management
        "npm", "yarn", "pnpm", "lerna", "webpack-bundle-analyzer",
        # Runtime & Process
        "pm2", "forever", "nodemon", "ts-node", "node-gyp",
    ]

    # (regex_pattern, risk_type, category, severity, confidence)
    # Ordered: high-confidence first
    _HOOK_PATTERNS = [
        # Pipe to shell (RCE, very high confidence) 
        (
            r"curl\s+\S+.*\|\s*(?:bash|sh|zsh|fish|ksh)",
            "remote_shell_download",
            BehaviorCategory.REMOTE_CODE_EXECUTION,
            Severity.CRITICAL, 0.97,
        ),
        (
            r"wget\s+\S+.*\|\s*(?:bash|sh|zsh|fish|ksh)",
            "remote_shell_download",
            BehaviorCategory.REMOTE_CODE_EXECUTION,
            Severity.CRITICAL, 0.97,
        ),
        # Download + execute 
        (
            r"(?:curl|wget)\s+\S+.*(?:-o|-O)\s+\S+.*&&.*(?:bash|sh|chmod\s+\+x)",
            "download_and_exec",
            BehaviorCategory.REMOTE_CODE_EXECUTION,
            Severity.CRITICAL, 0.93,
        ),
        # Reverse shell 
        (
            r"/dev/tcp/",
            "reverse_shell_tcp",
            BehaviorCategory.BACKDOOR_INSTALLATION,
            Severity.CRITICAL, 0.97,
        ),
        (
            r"bash\s+-i\s+>&",
            "interactive_reverse_shell",
            BehaviorCategory.BACKDOOR_INSTALLATION,
            Severity.CRITICAL, 0.97,
        ),
        (
            r"\bnc\s+-[el]",
            "netcat_listener",
            BehaviorCategory.BACKDOOR_INSTALLATION,
            Severity.CRITICAL, 0.92,
        ),
        # child_process in shell command (inline node -e) 
        (
            r"child_process\.(exec|spawn|execSync|spawnSync|execFile)\s*\(",
            "child_process_in_hook",
            BehaviorCategory.LOCAL_CODE_EXECUTION,
            Severity.HIGH, 0.90,
        ),
        # Credential access 
        (
            r'process\.env\.(?:NPM_TOKEN|TOKEN|SECRET|PASSWORD|API_KEY|AUTH|KEY|CREDENTIAL)',
            "credential_env_access",
            BehaviorCategory.CREDENTIAL_THEFT,
            Severity.HIGH, 0.90,
        ),
        (
            r'\$(?:NPM_TOKEN|SECRET|PASSWORD|AUTH_TOKEN|API_KEY)',
            "credential_env_shell",
            BehaviorCategory.CREDENTIAL_THEFT,
            Severity.HIGH, 0.88,
        ),
        # Dynamic code execution 
        (
            r"\beval\s*\(",
            "eval_in_hook",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION,
            Severity.HIGH, 0.88,
        ),
        (
            r"\bFunction\s*\(\s*['\"]",
            "function_constructor_in_hook",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION,
            Severity.HIGH, 0.83,
        ),
        # Obfuscation combo
        (
            r"(?:btoa|atob|Buffer\.from).*(?:eval|Function)",
            "base64_exec_combo",
            BehaviorCategory.OBFUSCATION,
            Severity.HIGH, 0.92,
        ),
        # Polyglot execution
        (
            r"python\s+-c\s+['\"]",
            "python_inline_exec",
            BehaviorCategory.LOCAL_CODE_EXECUTION,
            Severity.HIGH, 0.88,
        ),
        (
            r"perl\s+-e\s+['\"]",
            "perl_inline_exec",
            BehaviorCategory.LOCAL_CODE_EXECUTION,
            Severity.HIGH, 0.88,
        ),
        # Generic curl/wget (lower confidence, no pipe) 
        (
            r"curl\s+https?://\S+",
            "curl_external_url",
            BehaviorCategory.NETWORK_EXFILTRATION,
            Severity.MEDIUM, 0.72,
        ),
        (
            r"wget\s+https?://\S+",
            "wget_external_url",
            BehaviorCategory.NETWORK_EXFILTRATION,
            Severity.MEDIUM, 0.72,
        ),
        # Package manager abuse 
        (
            r"(?:apt-get|apt|yum|brew|pip)\s+install\s+-?y?\s+\S+",
            "package_manager_install",
            BehaviorCategory.PERSISTENCE,
            Severity.MEDIUM, 0.72,
        ),
    ]

    # Patterns to scan inside JS files called from install hooks
    # (regex, risk_type, category, severity, confidence)
    _INSTALL_FILE_PATTERNS = [
        (
            r"require\s*\(\s*['\"]child_process['\"]\s*\)\s*\.\s*"
            r"(?:exec|execSync|spawn|spawnSync|execFile)\s*\(",
            "child_process_exec",
            BehaviorCategory.LOCAL_CODE_EXECUTION,
            Severity.HIGH, 0.88,
        ),
        (
            r"(?:require\s*\(\s*['\"](?:http|https|axios|node-fetch|got)['\"]\s*\)"
            r"|fetch\s*\(|axios\s*\.(?:get|post|put|patch))",
            "network_request_in_install",
            BehaviorCategory.NETWORK_EXFILTRATION,
            Severity.HIGH, 0.78,
        ),
        (
            r"process\.env\.(?:NPM_TOKEN|TOKEN|SECRET|PASSWORD|API_KEY|AUTH|KEY|CREDENTIAL)",
            "credential_env_access",
            BehaviorCategory.CREDENTIAL_THEFT,
            Severity.HIGH, 0.88,
        ),
        (
            r"\beval\s*\(",
            "eval_in_install_file",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION,
            Severity.HIGH, 0.85,
        ),
        (
            r"\bFunction\s*\(\s*['\"]",
            "function_constructor_in_install",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION,
            Severity.HIGH, 0.82,
        ),
        (
            r"(?:\.ssh[/\\]|authorized_keys|\.bashrc|\.bash_profile|\.profile|crontab)",
            "persistence_target_file",
            BehaviorCategory.PERSISTENCE,
            Severity.HIGH, 0.85,
        ),
        (
            r"(?:os\.homedir|os\.tmpdir|fs\.writeFile|fs\.writeFileSync)\s*\(",
            "filesystem_write_in_install",
            BehaviorCategory.PERSISTENCE,
            Severity.MEDIUM, 0.65,
        ),
    ]

    _SUSPICIOUS_EXTERNAL_DEPS = ["node-pty", "ssh2", "node-cmd"]

    def __init__(self, package_profile: PackageProfile):
        self.package_profile = package_profile
        self.risks: List[StructuralAnalysisFinding] = []

    # Install hook - shell command level
    def _check_install_script(self) -> None:
        """
        Scan install hook commands (raw shell strings from package.json scripts).

        Key improvements over v1:
        - Does NOT break after first match - collects ALL signals per hook
        - Webhook domains get CRITICAL severity regardless of other patterns
        - evidence uses _build_evidence() for consistent LLM formatting
        - risk_type is specific (not generic "suspicious_install_hook")
        """
        risky_hooks = ["preinstall", "install", "postinstall", "prepublish", "prepare"]

        for hook in risky_hooks:
            script = self.package_profile.scripts.get(hook)
            if not script:
                continue

            # Webhook domain check (highest priority) 
            if self._WEBHOOK_DOMAINS.search(script):
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="webhook_exfiltration_in_hook",
                    severity=Severity.CRITICAL,
                    evidence=_build_evidence(
                        signal="Known webhook/exfiltration collector domain in install hook",
                        location=f"package.json → scripts.{hook}",
                        code=script[:120],
                    ),
                    confidence=0.95,
                    category=BehaviorCategory.DATA_EXFILTRATION,
                ))

            # Pattern scan (collect all, no break) 
            matched_risk_types = set()
            for pattern, risk_type, category, severity, confidence in self._HOOK_PATTERNS:
                if risk_type in matched_risk_types:
                    continue  # one finding per risk_type per hook
                m = re.search(pattern, script, re.IGNORECASE)
                if m:
                    matched_risk_types.add(risk_type)
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type=f"hook_{risk_type}",
                        severity=severity,
                        evidence=_build_evidence(
                            signal=f"{risk_type.replace('_', ' ').title()} in install hook",
                            location=f"package.json → scripts.{hook}",
                            code=script[:120],
                        ),
                        confidence=confidence,
                        category=category,
                    ))
                    

    # Install script files - JS source level
    def _check_install_script_files(self) -> None:
        """
        Scan JS files that are called from install hooks (e.g. "node preinstall.js").

        Requires PackageProfile.install_script_files: Dict[str, str]
        populated by DatasetLoader._load_install_script_files().

        If field is absent or empty → skip gracefully (backwards compat).
        """
        install_files = getattr(self.package_profile, "install_script_files", {})
        if not install_files:
            return

        for filename, code in install_files.items():
            if not code or not code.strip():
                continue

            # Webhook domain in file content 
            if self._WEBHOOK_DOMAINS.search(code):
                for line_no, line in enumerate(code.splitlines(), 1):
                    if self._WEBHOOK_DOMAINS.search(line):
                        self.risks.append(StructuralAnalysisFinding(
                            risk_type="webhook_in_install_file",
                            severity=Severity.CRITICAL,
                            evidence=_build_evidence(
                                signal="Known webhook/exfiltration collector domain",
                                location=f"{filename}:{line_no}",
                                code=line.strip()[:120],
                            ),
                            confidence=0.95,
                            category=BehaviorCategory.DATA_EXFILTRATION,
                        ))
                        break  # one finding per file for webhook

            # Pattern scan 
            for pattern, risk_type, category, severity, confidence in self._INSTALL_FILE_PATTERNS:
                m = re.search(pattern, code, re.IGNORECASE)
                if m:
                    line_no = _find_line(code, m.start())
                    snippet = _get_line_snippet(code, line_no)
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type=risk_type,
                        severity=severity,
                        evidence=_build_evidence(
                            signal=risk_type.replace("_", " ").title(),
                            location=f"{filename}:{line_no}",
                            code=snippet,
                        ),
                        confidence=confidence,
                        category=category,
                    ))
                    

    # Typosquatting
    def _check_typosquatting(self) -> None:
        package_name = self.package_profile.package_name.lower()

        if len(package_name) < 4:
            return

        tokens = re.split(r"[-_]", package_name)

        for popular in self._POPULAR_PACKAGES:
            if popular == package_name:
                return
            if popular in tokens:
                continue
            if package_name.startswith(popular + "-"):
                continue
            if abs(len(popular) - len(package_name)) > 3:
                continue

            distance = Levenshtein.distance(popular, package_name)
            longer = max(len(popular), len(package_name))
            ratio = distance / longer

            if 0 < distance <= 2 and ratio <= 0.25:
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="typosquatting",
                    severity=Severity.HIGH,
                    evidence=_build_evidence(
                        signal=f"Package name closely resembles popular package '{popular}'",
                        location="package.json → name",
                        code=f"'{package_name}' vs '{popular}' "
                             f"(edit_distance={distance}, ratio={ratio:.2f})",
                    ),
                    confidence=round(1.0 - ratio, 2),
                    category=BehaviorCategory.TYPOSQUATTING,
                ))
                break


    # Dependency confusion
    def _check_dependency_confusion(self) -> None:
        package_name = self.package_profile.package_name

        if not package_name.startswith("@"):
            return

        bare_name = package_name.split("/")[-1]
        deps = self.package_profile.dependencies

        if bare_name not in deps:
            return

        version = deps[bare_name]
        broad_version = (
            version in ("*", "latest")
            or version.startswith("^")
            or version.startswith("~")
        )
        confidence = 0.75 if broad_version else 0.55

        self.risks.append(StructuralAnalysisFinding(
            risk_type="dependency_confusion",
            severity=Severity.MEDIUM,
            evidence=_build_evidence(
                signal="Scoped package depends on identically-named public package",
                location="package.json → dependencies",
                code=f"'{package_name}' depends on '{bare_name}' @ '{version}'",
            ),
            confidence=confidence,
            category=BehaviorCategory.SUPPLY_CHAIN_ATTACK,
        ))


    # Suspicious dependencies
    def _check_suspicious_dependencies(self) -> None:
        deps = self.package_profile.dependencies or {}

        for dep in self._SUSPICIOUS_EXTERNAL_DEPS:
            if dep not in deps:
                continue

            has_install_hook = any(
                hook in (self.package_profile.scripts or {})
                for hook in ["preinstall", "install", "postinstall"]
            )
            confidence = 0.55 if has_install_hook else 0.40

            self.risks.append(StructuralAnalysisFinding(
                risk_type="suspicious_dependency",
                severity=Severity.LOW,
                evidence=_build_evidence(
                    signal=f"Dependency '{dep}' enables system command execution",
                    location="package.json → dependencies",
                    code=f"\"{dep}\": \"{deps[dep]}\""
                         + (" (install hook present)" if has_install_hook else ""),
                ),
                confidence=confidence,
                category=BehaviorCategory.SYSTEM_CAPABILITY,
            ))


    # Hardcoded IP in metadata
    def _check_hardcoded_ip_in_metadata(self) -> None:
        fields = {}
        fields["homepage"] = self.package_profile.package_json_raw.get("homepage", "")

        repo = self.package_profile.package_json_raw.get("repository", "")
        if isinstance(repo, dict):
            repo = repo.get("url", "")
        fields["repository"] = repo
        fields["funding"] = self.package_profile.package_json_raw.get("funding", "")

        for name, cmd in (self.package_profile.scripts or {}).items():
            fields[f"scripts.{name}"] = cmd

        seen: set = set()

        for field, value in fields.items():
            if not value:
                continue
            for candidate in self._IP_PATTERN.findall(str(value)):
                try:
                    ipaddress.ip_address(candidate)
                except ValueError:
                    continue
                if _is_internal_ip(candidate):
                    continue
                key = (candidate, field)
                if key in seen:
                    continue
                seen.add(key)

                in_script = field.startswith("scripts.")
                severity = Severity.CRITICAL if in_script else Severity.HIGH
                confidence = 0.95 if in_script else 0.85

                self.risks.append(StructuralAnalysisFinding(
                    risk_type="hardcoded_ip_in_metadata",
                    severity=severity,
                    evidence=_build_evidence(
                        signal=f"Hardcoded external IP address '{candidate}'",
                        location=f"package.json → {field}",
                        code=str(value)[:120],
                    ),
                    confidence=confidence,
                    category=BehaviorCategory.NETWORK_EXFILTRATION,
                ))


    # Version anomaly
    def _check_version_anomaly(self) -> None:
        """
        Detect version inflation used in dependency confusion / version injection attacks.

        Pattern: versions with segments >= 99 (e.g. 9.99.999, 99.0.0).
        force override of legitimate packages via semver resolution.
        """
        version = self.package_profile.version or ""
        core = version.split("-")[0]   # strip pre-release tag
        parts = core.split(".")

        try:
            nums = [int(p) for p in parts if p.isdigit()]
        except ValueError:
            return

        inflated = [n for n in nums if n >= 500]
        if not inflated:
            return

        # Major >= 500 is stronger signal than minor/patch
        confidence = 0.80 if nums and nums[0] >= 500 else 0.65
        severity = Severity.HIGH if confidence >= 0.75 else Severity.MEDIUM

        self.risks.append(StructuralAnalysisFinding(
            risk_type="version_anomaly",
            severity=severity,
            evidence=_build_evidence(
                signal=f"Version contains inflated segment(s) {inflated} - "
                       "possible dependency confusion or squatting attempt",
                location="package.json → version",
                code=version,
            ),
            confidence=confidence,
            category=BehaviorCategory.SUPPLY_CHAIN_ATTACK,
        ))


    # Empty package
    def _check_empty_package(self) -> None:
        """
        Flag packages that have no JS files at all.

        A published npm package with zero JS files is structurally anomalous.
        - With install hook: HIGH confidence - payload may be downloaded at install time
        - Without install hook: LOW confidence - could be data-only / types package
        """
        file_structure = self.package_profile.file_structure or []

        js_files = [
            f for f in file_structure
            if f.endswith((".js", ".cjs", ".mjs"))
            and not f.endswith(".min.js")
        ]

        if js_files:
            return  # has JS files - not empty

        has_install_hook = any(
            hook in (self.package_profile.scripts or {})
            for hook in ["preinstall", "install", "postinstall"]
        )

        confidence = 0.72 if has_install_hook else 0.40
        severity = Severity.HIGH if has_install_hook else Severity.LOW

        non_json_files = [f for f in file_structure if not f.endswith(".json")]
        file_summary = (
            f"{len(file_structure)} file(s): {file_structure[:5]}"
            if file_structure else "no files found"
        )

        self.risks.append(StructuralAnalysisFinding(
            risk_type="empty_package_no_js",
            severity=severity,
            evidence=_build_evidence(
                signal="Package contains no JavaScript files"
                       + (" (install hook present - payload may be remote)"
                          if has_install_hook else ""),
                location="package file_structure",
                code=file_summary,
            ),
            confidence=confidence,
            category=BehaviorCategory.SUSPICIOUS_BEHAVIOR,
        ))


    # Entry point
    def run_all(self) -> List[StructuralAnalysisFinding]:
        """Execute all Layer 1 checks."""
        logger.info(f"[Layer 1] Structural analysis: {self.package_profile.package_name}")

        self._check_install_script()
        self._check_install_script_files()
        self._check_typosquatting()
        self._check_dependency_confusion()
        self._check_suspicious_dependencies()
        self._check_hardcoded_ip_in_metadata()
        self._check_version_anomaly()
        self._check_empty_package()

        logger.info(
            f"[Layer 1] Complete: {len(self.risks)} finding(s) - "
            f"{self.package_profile.package_name}"
        )
        return self.risks