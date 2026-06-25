"""
Final Classification and Report Generator

Compatible with:
  - semantic_v2.0   output schema
  - verification_v2.0 output schema  (chain_analysis + legitimacy_check)
  - verification_result=None          (no behaviors detected → CLEAN path)
"""

import json
from typing import Any, Dict, List, Optional
from datetime import datetime
from pathlib import Path

from enums.behavior_category import BehaviorCategory


# Helpers 
def _safe_chain(verification_result: Optional[Dict]) -> Dict:
    """Extract chain_analysis block safely."""
    if not verification_result:
        return {}
    return verification_result.get("verification_result", {}).get("chain_analysis", {})


def _safe_legitimacy(verification_result: Optional[Dict]) -> Dict:
    """Extract legitimacy_check block safely."""
    if not verification_result:
        return {}
    return verification_result.get("verification_result", {}).get("legitimacy_check", {})


# FinalClassifier 

class FinalClassifier:
    """
    Generates final classification with calibrated confidence and explanation.

    Handles three input cases:
        Case A: behaviors ≥ 1 AND verification present  → full pipeline
        Case B: behaviors ≥ 1 AND verification missing  → semantic-only fallback
        Case C: behaviors = 0                           → CLEAN (no verification needed)
    """

    CRITICAL_THRESHOLD = 0.85
    HIGH_THRESHOLD     = 0.70
    MEDIUM_THRESHOLD   = 0.50

    def __init__(
        self,
        semantic_result: Dict,
        verification_result: Optional[Dict] = None,
    ):
        self.semantic            = semantic_result
        self.verification        = verification_result          # None
        self.package_name        = semantic_result.get("package_name", "unknown")
        self.version             = semantic_result.get("version", "unknown")
        self.ground_truth_label  = semantic_result.get("label")

    # Public entry point 

    def classify(self) -> Dict[str, Any]:
        behaviors   = self.semantic.get("behaviors", [])
        risk_vector = self.semantic.get("risk_vector", [])

        # Case C: no behavior
        if not behaviors:
            return self._classify_clean()

        chain      = _safe_chain(self.verification)
        legitimacy = _safe_legitimacy(self.verification)

        final_confidence = self._calculate_final_confidence(behaviors, chain)
        final_verdict    = self._resolve_verdict(chain, behaviors)
        risk_level       = self._calculate_risk_level(final_confidence, risk_vector, final_verdict)

        return {
            "package_name":    self.package_name,
            "version":         self.version,
            "scan_timestamp":  datetime.now().isoformat(),

            "final_verdict": {
                "classification": final_verdict,
                "confidence":     round(final_confidence, 3),
                "risk_level":     risk_level,
            },

            "executive_summary": self._generate_executive_summary(
                behaviors, chain, legitimacy, final_verdict
            ),

            "threat_profile": self._build_threat_profile(behaviors, risk_vector, chain),

            "evidence_summary": self._build_evidence_summary(behaviors, chain, legitimacy),

            "recommendations": self._generate_recommendations(
                final_verdict, risk_level, behaviors
            ),

            "detailed_analysis": {
                "semantic_detection": {
                    "behaviors_found":    len(behaviors),
                    "categories":         risk_vector,
                    "highest_confidence": max(
                        (b.get("confidence", 0) for b in behaviors), default=0
                    ),
                },
                "verification_analysis": {
                    "chain_narrative":        chain.get("chain_narrative", "N/A"),
                    "chain_score":            chain.get("chain_score", 0.0),
                    "legitimacy_mismatch":    not legitimacy.get("is_justified", True),
                    "verification_available": self.verification is not None,
                },
            },

            "metadata": {
                "analysis_version": self.semantic.get("analysis_metadata", {}).get("stage", "unknown"),
                "model":            self.semantic.get("analysis_metadata", {}).get("model", "unknown"),
                "ground_truth_label": self.ground_truth_label,
            },
        }

    # Case C  clean path 

    def _classify_clean(self) -> Dict[str, Any]:
        """Return a CLEAN result when no behaviors were detected by any stage."""
        structural_score = self.semantic.get(
            "analysis_metadata", {}
        ).get("structural_risk_score", 0.0)

        # If structural layer already flagged something but semantic found nothing,
        # demote to SUSPICIOUS rather than CLEAN so it gets human attention.
        if structural_score >= 0.60:
            verdict    = "SUSPICIOUS"
            risk_level = "LOW"
            confidence = 0.50
            summary    = (
                "No behaviors detected by semantic analysis, but structural "
                f"pre-analysis flagged a risk score of {structural_score:.2f}. "
                "Manual review recommended."
            )
        else:
            verdict    = "BENIGN"
            risk_level = "NONE"
            confidence = 0.85
            summary    = "No suspicious behaviors detected by structural or semantic analysis."

        return {
            "package_name":   self.package_name,
            "version":        self.version,
            "scan_timestamp": datetime.now().isoformat(),

            "final_verdict": {
                "classification": verdict,
                "confidence":     confidence,
                "risk_level":     risk_level,
            },

            "executive_summary": summary,
            "threat_profile":    {"attack_type": "None", "primary_tactics": [], "severity_factors": []},
            "evidence_summary":  {"malicious_indicators": [], "behavioral_chain": "N/A", "legitimacy_assessment": "N/A"},
            "recommendations":   {"immediate_action": "Package appears safe to use", "remediation_steps": []},

            "detailed_analysis": {
                "semantic_detection": {
                    "behaviors_found":    0,
                    "categories":         [],
                    "highest_confidence": 0.0,
                },
                "verification_analysis": {
                    "chain_narrative":        "N/A",
                    "chain_score":            0.0,
                    "legitimacy_mismatch":    False,
                    "verification_available": False,
                },
            },

            "metadata": {
                "analysis_version":   self.semantic.get("analysis_metadata", {}).get("stage", "unknown"),
                "model":              self.semantic.get("analysis_metadata", {}).get("model", "unknown"),
                "ground_truth_label": self.ground_truth_label,
            },
        }

    # Confidence + verdict

    def _calculate_final_confidence(
        self, behaviors: List[Dict], chain: Dict
    ) -> float:
        """
        Weighted blend:
            - verification present : 0.40 × avg_semantic  + 0.60 × chain_score
            - verification absent  : avg_semantic  (semantic-only fallback)

        chain_score comes from chain_analysis.chain_score (0.0–1.0).
        """
        avg_semantic = sum(b.get("confidence", 0) for b in behaviors) / len(behaviors)

        chain_score = chain.get("chain_score")          # None when verification absent
        if chain_score is not None:
            blended = 0.40 * avg_semantic + 0.60 * chain_score
        else:
            blended = avg_semantic                      # fallback: semantic only

        return min(round(blended, 4), 0.99)

    def _resolve_verdict(self, chain: Dict, behaviors: List[Dict]) -> str:
        """
        Primary source: verification chain verdict.
        Fallback (no verification): derive from semantic confidence.
        """
        # Verification present → trust its verdict
        chain_verdict = chain.get("verdict", "").upper()
        if chain_verdict in {"MALICIOUS", "SUSPICIOUS", "BENIGN"}:
            return chain_verdict

        # Semantic-only fallback
        avg_semantic = sum(b.get("confidence", 0) for b in behaviors) / len(behaviors)
        if avg_semantic >= 0.70:
            return "MALICIOUS"
        elif avg_semantic >= 0.45:
            return "SUSPICIOUS"
        return "BENIGN"

    def _calculate_risk_level(
        self, confidence: float, risk_vector: List[str], verdict: str
    ) -> str:
        critical_categories = {
            BehaviorCategory.REMOTE_CODE_EXECUTION.value,
            BehaviorCategory.CREDENTIAL_THEFT.value,
            BehaviorCategory.SUPPLY_CHAIN_ATTACK.value,
            BehaviorCategory.PRIVILEGE_ESCALATION.value,
            BehaviorCategory.BACKDOOR_INSTALLATION.value,
            BehaviorCategory.SUPPLY_CHAIN_PROPAGATION.value,
            BehaviorCategory.DEPENDENCY_INJECTION.value,
        }

        if verdict == "BENIGN":
            if confidence >= 0.90:
                return "NONE"
            elif confidence >= 0.70:
                return "LOW"
            return "MEDIUM"

        if verdict == "SUSPICIOUS":
            if confidence >= self.HIGH_THRESHOLD:
                return "HIGH"
            elif confidence >= self.MEDIUM_THRESHOLD:
                return "MEDIUM"
            return "LOW"

        # MALICIOUS
        has_critical = bool(set(risk_vector) & critical_categories)
        if confidence >= self.CRITICAL_THRESHOLD or (has_critical and confidence >= 0.70):
            return "CRITICAL"
        elif confidence >= self.HIGH_THRESHOLD:
            return "HIGH"
        elif confidence >= self.MEDIUM_THRESHOLD:
            return "MEDIUM"
        return "LOW"


    # Report builders
    def _generate_executive_summary(
        self,
        behaviors: List[Dict],
        chain: Dict,
        legitimacy: Dict,
        verdict: str,
    ) -> str:
        if verdict == "BENIGN":
            return "This package appears to be benign with no significant security concerns detected."

        # Prefer chain_narrative as the primary summary when available
        narrative = chain.get("chain_narrative", "").strip()
        if narrative:
            justification = (
                " The detected behaviors have no legitimate justification based "
                "on the package's stated purpose."
                if not legitimacy.get("is_justified", True)
                else ""
            )
            return narrative + justification

        # Fallback: compose from high-confidence behaviors
        key = [b for b in behaviors if b.get("confidence", 0) > 0.70]
        if not key:
            return "Package exhibits suspicious characteristics but no definitive malicious behavior confirmed."
        summaries = " ".join(b.get("summary", "") for b in key[:2])
        if not legitimacy.get("is_justified", True):
            summaries += " The detected behaviors have no legitimate justification."
        return summaries

    def _build_threat_profile(
        self, behaviors: List[Dict], risk_vector: List[str], chain: Dict
    ) -> Dict[str, Any]:
        attack_vectors = chain.get("attack_vector", [])
        return {
            "attack_type":     self._infer_attack_type(risk_vector),
            "primary_tactics": self._get_primary_tactics(risk_vector),
            "severity_factors": [
                b.get("summary", "")
                for b in behaviors
                if b.get("confidence", 0) > 0.70
            ][:5],
            "attack_vector_iocs": attack_vectors[:6],   # real IOCs from verification
        }

    def _build_evidence_summary(
        self, behaviors: List[Dict], chain: Dict, legitimacy: Dict
    ) -> Dict[str, Any]:
        indicators = []
        for behavior in behaviors:
            if behavior.get("confidence", 0) < 0.60:
                continue
            apis     = behavior.get("evidence_apis", [])
            commands = behavior.get("evidence_commands", [])
            domains  = behavior.get("evidence_domains", [])
            if not (apis or commands or domains):
                continue
            indicator: Dict[str, Any] = {
                "type":        behavior.get("category", "").replace("_", " ").title(),
                "description": behavior.get("details", behavior.get("summary", "")),
                "severity":    self._map_confidence_to_severity(behavior.get("confidence", 0)),
            }
            # Prefer command → API → domain as the representative IOC
            if commands:
                indicator["command"] = commands[0]
            elif apis:
                indicator["command"] = apis[0]
            elif domains:
                indicator["command"] = domains[0]
            indicators.append(indicator)

        return {
            "malicious_indicators": indicators[:5],
            "behavioral_chain":     chain.get("chain_narrative", "N/A"),
            "legitimacy_assessment": legitimacy.get("reasoning", "N/A"),
        }

    def _generate_recommendations(
        self, verdict: str, risk_level: str, behaviors: List[Dict]
    ) -> Dict[str, Any]:
        if verdict == "BENIGN":
            return {"immediate_action": "Package appears safe to use", "remediation_steps": []}

        immediate = (
            "DO NOT INSTALL  Remove immediately if already installed"
            if risk_level in {"CRITICAL", "HIGH"}
            else "Use with caution  Manual review recommended"
        )

        remediation = ["Review package source code and dependencies"]

        REMEDIATION_MAP = {
            BehaviorCategory.NETWORK_EXFILTRATION.value:
                "Monitor network traffic for suspicious outbound connections",
            BehaviorCategory.CREDENTIAL_THEFT.value:
                "Check for unauthorized access to credentials or secrets",
            BehaviorCategory.INSTALL_HOOK.value:
                "Inspect install/preinstall scripts in package.json",
            BehaviorCategory.SUPPLY_CHAIN_ATTACK.value:
                "Scan for other compromised packages from the same author",
            BehaviorCategory.BACKDOOR_INSTALLATION.value:
                "Audit system for unauthorized processes or cron jobs",
            BehaviorCategory.REMOTE_CODE_EXECUTION.value:
                "Isolate affected systems and audit running processes",
        }

        risk_categories = {
            b.get("category")
            for b in behaviors
            if b.get("confidence", 0) >= 0.60
        }
        for cat in risk_categories:
            if cat in REMEDIATION_MAP:
                remediation.append(REMEDIATION_MAP[cat])

        remediation.append("Report to npm security team if confirmed malicious")
        return {"immediate_action": immediate, "remediation_steps": remediation}

    # Taxonomy helpers
    def _infer_attack_type(self, risk_vector: List[str]) -> str:
        rv = set(risk_vector)
        checks = [
            ({"supply_chain_attack", "supply_chain_propagation", "dependency_injection",
              "repository_manipulation", "typosquatting",
              BehaviorCategory.SUPPLY_CHAIN_ATTACK.value,
              BehaviorCategory.TYPOSQUATTING.value},          "Supply Chain Attack"),
            ({BehaviorCategory.BACKDOOR_INSTALLATION.value,
              BehaviorCategory.PERSISTENCE.value},             "Backdoor Installation"),
            ({BehaviorCategory.REMOTE_CODE_EXECUTION.value,
              BehaviorCategory.DYNAMIC_CODE_EXECUTION.value,
              BehaviorCategory.LOCAL_CODE_EXECUTION.value,
              BehaviorCategory.PRIVILEGE_ESCALATION.value},   "Remote Code Execution"),
            ({BehaviorCategory.CREDENTIAL_THEFT.value,
              BehaviorCategory.SENSITIVE_DATA_COLLECTION.value,
              BehaviorCategory.SENSITIVE_FILE_ACCESS.value},  "Credential Theft"),
            ({BehaviorCategory.NETWORK_EXFILTRATION.value,
              BehaviorCategory.DATA_EXFILTRATION.value},      "Data Exfiltration"),
            ({BehaviorCategory.CRYPTO_HIJACKING.value,
              BehaviorCategory.RESOURCE_ABUSE.value},         "Cryptocurrency Mining"),
            ({BehaviorCategory.SYSTEM_RECONNAISSANCE.value,
              BehaviorCategory.NETWORK_RECONNAISSANCE.value}, "Reconnaissance"),
            ({BehaviorCategory.OBFUSCATION.value,
              BehaviorCategory.ANTI_DEBUGGING.value,
              BehaviorCategory.ANTI_ANALYSIS.value},          "Defense Evasion"),
        ]
        for category_set, label in checks:
            if rv & category_set:
                return label
        return "Malicious Package"

    def _get_primary_tactics(self, risk_vector: List[str]) -> List[str]:
        tactic_map = {
            BehaviorCategory.REMOTE_CODE_EXECUTION:      "Execution (Remote)",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION:     "Execution (Dynamic)",
            BehaviorCategory.LOCAL_CODE_EXECUTION:       "Execution (Local)",
            BehaviorCategory.BACKDOOR_INSTALLATION:      "Persistence (Backdoor)",
            BehaviorCategory.PERSISTENCE:                "Persistence (Auto-run)",
            BehaviorCategory.INSTALL_HOOK:               "Persistence (Install Hook)",
            BehaviorCategory.CREDENTIAL_THEFT:           "Credential Access",
            BehaviorCategory.SENSITIVE_FILE_ACCESS:      "Credential Access (File Access)",
            BehaviorCategory.SENSITIVE_DATA_COLLECTION:  "Credential Access (Sensitive Data)",
            BehaviorCategory.NETWORK_EXFILTRATION:       "Exfiltration (Network)",
            BehaviorCategory.DATA_EXFILTRATION:          "Exfiltration (File/Data)",
            BehaviorCategory.OBFUSCATION:                "Defense Evasion (Obfuscation)",
            BehaviorCategory.ANTI_ANALYSIS:              "Defense Evasion (Anti-Analysis)",
            BehaviorCategory.ANTI_DEBUGGING:             "Defense Evasion (Anti-Debugging)",
            BehaviorCategory.SYSTEM_RECONNAISSANCE:      "Discovery (System)",
            BehaviorCategory.NETWORK_RECONNAISSANCE:     "Discovery (Network)",
            BehaviorCategory.CRYPTO_HIJACKING:           "Impact (Crypto Mining)",
            BehaviorCategory.RESOURCE_ABUSE:             "Impact (Resource Abuse)",
        }
        seen: set = set()
        tactics: List[str] = []
        for entry in risk_vector:
            tactic = next(
                (v for k, v in tactic_map.items() if k.value == entry),
                entry.replace("_", " ").title()
            )
            if tactic not in seen:
                tactics.append(tactic)
                seen.add(tactic)
        return tactics[:5]

    def _map_confidence_to_severity(self, confidence: float) -> str:
        if confidence >= 0.85:
            return "CRITICAL"
        elif confidence >= 0.70:
            return "HIGH"
        elif confidence >= 0.40:
            return "MEDIUM"
        return "LOW"

    # Markdown report
    def generate_user_report(self, result: Dict) -> str:
        return self._generate_markdown_report(result)

    def _generate_markdown_report(self, result: Dict) -> str:
        verdict        = result["final_verdict"]
        risk_level     = verdict["risk_level"]
        classification = verdict["classification"]
        confidence     = verdict["confidence"]

        RISK_LABEL = {
            "CRITICAL": "SEV-1 (Critical)",
            "HIGH":     "SEV-2 (High)",
            "MEDIUM":   "SEV-3 (Medium)",
            "LOW":      "SEV-4 (Low)",
            "NONE":     "SEV-5 (None)",
        }
        VERDICT_LABEL = {
            "MALICIOUS":  "Blocked",
            "SUSPICIOUS": "Needs Review",
            "BENIGN":     "Allowed",
        }

        report = f"""# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `{result['package_name']}`
- **Version:** `{result['version']}`
- **Scan Date:** {result['scan_timestamp'][:19]}

---

## Final Security Verdict: **{classification}** (Policy: {VERDICT_LABEL.get(classification, "Unknown")})

**Risk Level:** {RISK_LABEL.get(risk_level, risk_level)} **{risk_level}**  
**Confidence Score:** {confidence * 100:.1f}%

### Executive Summary
{result['executive_summary']}

---

## THREAT PROFILE

**ATTACK TYPE:** {result['threat_profile']['attack_type']}

**PRIMARY TACTICS:**
"""
        for tactic in result['threat_profile']['primary_tactics']:
            report += f"- {tactic}\n"

        iocs = result['threat_profile'].get('attack_vector_iocs', [])
        if iocs:
            report += "\n**ATTACK VECTOR IOCs:**\n"
            for ioc in iocs:
                report += f"- `{ioc}`\n"

        report += "\n**KEY RISK FACTORS:**\n"
        for factor in result['threat_profile']['severity_factors'][:3]:
            report += f"- {factor}\n"

        report += "\n---\n\n## EVIDENCE SUMMARY\n\n"

        indicators = result['evidence_summary']['malicious_indicators']
        if indicators:
            report += "### MALICIOUS INDICATORS DETECTED\n\n"
            for i, indicator in enumerate(indicators, 1):
                report += f"#### {i}. {indicator['type']} [{indicator['severity']}]\n"
                report += f"**Description:** {indicator['description']}\n\n"
                if 'command' in indicator:
                    report += f"```\n{indicator['command']}\n```\n\n"

        chain = result['evidence_summary']['behavioral_chain']
        if chain != "N/A":
            report += f"**Attack Chain:** {chain}\n\n"

        legitimacy = result['evidence_summary']['legitimacy_assessment']
        if legitimacy != "N/A":
            report += f"**Legitimacy Assessment:** {legitimacy}\n\n"

        report += "---\n\n## RECOMMENDATIONS\n\n"
        report += f"### Immediate Action\n**{result['recommendations']['immediate_action']}**\n\n"

        steps = result['recommendations']['remediation_steps']
        if steps:
            report += "### Remediation Steps\n"
            for step in steps:
                report += f"1. {step}\n"

        sem  = result['detailed_analysis']['semantic_detection']
        veri = result['detailed_analysis']['verification_analysis']

        report += f"\n---\n\n## TECHNICAL ANALYSIS DETAILS\n\n"
        report += f"**Behaviors Detected:** {sem['behaviors_found']}\n"
        report += f"**Risk Categories:** {', '.join(sem['categories'][:5])}\n"
        report += f"**Highest Detection Confidence:** {sem['highest_confidence'] * 100:.1f}%\n"

        if veri['verification_available']:
            report += f"**Chain Score:** {veri['chain_score']:.2f}\n"
            report += f"**Chain Narrative:** {veri['chain_narrative']}\n"
        else:
            report += "**Verification Stage:** Not run (no behaviors detected)\n"

        report += f"\n---\n\n*Analysis Version: {result['metadata']['analysis_version']}*  \n"
        report += f"*Model: {result['metadata']['model']}*  \n"
        if result['metadata'].get('ground_truth_label'):
            report += f"*Ground Truth Label: {result['metadata']['ground_truth_label']}*\n"

        return report

    # Persistence
    def save_result(
        self,
        result: Dict,
        output_dir: str = "./experiment_results/output_machine_readable",
    ) -> str:
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        safe_name = f"{self.package_name.replace('/', '#')}-{self.version}.json"
        filepath  = Path(output_dir) / safe_name
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        return str(filepath)

    def save_user_report(
        self,
        result: Dict,
        output_dir: str = "./experiment_results/report_human_readable",
    ) -> str:
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        safe_name = f"{self.package_name.replace('/', '#')}-{self.version}.md"
        filepath  = Path(output_dir) / safe_name
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(self.generate_user_report(result))
        return str(filepath)