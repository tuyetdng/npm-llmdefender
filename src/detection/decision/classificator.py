"""
Final Classification and Report Generator
"""

import json
from typing import Dict, List, Any, Optional
from datetime import datetime
from pathlib import Path

from enums.behavior_category import BehaviorCategory


class FinalClassifier:
    """Generates final classification with calibrated confidence and explanation."""
    
    # Risk level thresholds
    CRITICAL_THRESHOLD = 0.85
    HIGH_THRESHOLD = 0.70
    MEDIUM_THRESHOLD = 0.50

    def __init__(self, semantic_result: Dict, verification_result: Dict):
        """
        Args:
            semantic_result: semantic analysis
            verification_result: verification analysis
        """
        self.semantic = semantic_result
        self.verification = verification_result
        self.package_name = semantic_result.get("package_name")
        self.version = semantic_result.get("version")
        self.ground_truth_label = semantic_result.get("label")
        
    def classify(self) -> Dict[str, Any]:
        """Generate final classification output."""
        
        behaviors = self.semantic.get("behaviors", [])
        risk_vector = self.semantic.get("risk_vector", [])
        verification = self.verification.get("verification_result", {})
        
        final_confidence = self._calculate_final_confidence(verification)
        
        raw_verdict = verification.get("final_verification", {}).get("verdict", "SUSPICIOUS")
        final_verdict = raw_verdict  
        
        risk_level = self._calculate_risk_level(final_confidence, risk_vector)
        
        return {
            "package_name": self.package_name,
            "version": self.version,
            "scan_timestamp": datetime.now().isoformat(),
            
            "final_verdict": {
                "classification": final_verdict,
                "confidence": round(final_confidence, 3),
                "risk_level": risk_level
            },
            
            "executive_summary": self._generate_executive_summary(
                behaviors, verification, final_verdict
            ),
            
            "threat_profile": self._build_threat_profile(behaviors, risk_vector),
            
            "evidence_summary": self._build_evidence_summary(
                behaviors, verification
            ),
            
            "recommendations": self._generate_recommendations(
                final_verdict, risk_level, behaviors
            ),
            
            "detailed_analysis": {
                "semantic_detection": {
                    "behaviors_found": len(behaviors),
                    "categories": risk_vector,
                    "highest_confidence": max(
                        [b.get("confidence", 0) for b in behaviors], default=0
                    )
                },
                "verification_analysis": {
                    "chain_coherence": verification.get("chain_analysis", {}).get("chain_narrative", "N/A"),
                    "legitimacy_mismatch": not verification.get("legitimacy_check", {}).get("is_justified", True),
                    "calibrated_confidence": verification.get("final_verification", {}).get("calibrated_confidence", 0)
                }
            },
            
            "metadata": {
                "analysis_version": self.semantic.get("analysis_metadata", {}).get("stage", "unknown"),
                "model": self.semantic.get("analysis_metadata", {}).get("model", "unknown"),
                "ground_truth_label": self.ground_truth_label
            }
        }
    
    def _calculate_final_confidence(self, verification: Dict) -> float:
        """
        Calibrate final confidence by combining semantic and verification confidences.
        """
        verification_confidence = verification.get("final_verification", {}).get("calibrated_confidence", 0.5)
        
        behaviors = self.semantic.get("behaviors", [])
        if not behaviors:
            return verification_confidence
        
        semantic_confidences = [b.get("confidence", 0) for b in behaviors]
        avg_semantic_conf = sum(semantic_confidences) / len(semantic_confidences)
        
        final_conf = (0.4 * avg_semantic_conf) + (0.6 * verification_confidence)
        
        return min(final_conf, 0.99)
    
    def _calculate_risk_level(self, confidence: float, risk_vector: List[str], verdict: str) -> str:
        """Determine risk level based on confidence and detected behaviors."""
        
        critical_categories = {
            BehaviorCategory.REMOTE_CODE_EXECUTION.value,
            BehaviorCategory.CREDENTIAL_THEFT.value,
            BehaviorCategory.SUPPLY_CHAIN_ATTACK.value,
            BehaviorCategory.PRIVILEGE_ESCALATION.value,
            BehaviorCategory.BACKDOOR_INSTALLATION.value,
            BehaviorCategory.SUPPLY_CHAIN_PROPAGATION.value,
            BehaviorCategory.DEPENDENCY_INJECTION.value,
        }
        
        if verdict.upper() == "BENIGN":
            if confidence >= 0.9:
                return "NONE"
            elif confidence >= 0.7:
                return "LOW"
            else:
                return "MEDIUM"  
        elif verdict.upper() == "MALICIOUS":

            has_critical = bool(set(risk_vector) & critical_categories)
            
            if confidence >= self.CRITICAL_THRESHOLD or (has_critical and confidence >= 0.7):
                return "CRITICAL"
            elif confidence >= self.HIGH_THRESHOLD:
                return "HIGH"
            elif confidence >= self.MEDIUM_THRESHOLD:
                return "MEDIUM"
            else:
                return "LOW"
    
    def _generate_executive_summary(self, behaviors: List[Dict], 
                                   verification: Dict, verdict: str) -> str:
        """Generate human-readable executive summary."""
        
        if verdict == "BENIGN":
            return f"This package appears to be benign with no significant security concerns detected."
        
        key_behaviors = [b for b in behaviors if b.get("confidence", 0) > 0.7]
        
        if not key_behaviors:
            return "Package exhibits suspicious characteristics but no definitive malicious behavior confirmed."
        
        summaries = []
        for behavior in key_behaviors[:3]:
            summaries.append(behavior.get("summary", ""))
        
        legitimacy = verification.get("legitimacy_check", {})
        if not legitimacy.get("is_justified", True):
            context = " The detected behaviors have no legitimate justification based on the package's stated purpose."
        else:
            context = ""
        
        return " ".join(summaries[:2]) + context
    
    def _build_threat_profile(self, behaviors: List[Dict], 
                             risk_vector: List[str]) -> Dict[str, Any]:
        """Build structured threat profile."""
        
        attack_type = self._infer_attack_type(risk_vector)
        
        primary_tactics = self._get_primary_tactics(risk_vector)
        
        severity_factors = []
        for behavior in behaviors:
            if behavior.get("confidence", 0) > 0.7:
                severity_factors.append(behavior.get("summary", ""))
        
        return {
            "attack_type": attack_type,
            "primary_tactics": primary_tactics,
            "severity_factors": severity_factors[:5] 
        }
    
    def _build_evidence_summary(self, behaviors: List[Dict], 
                               verification: Dict) -> Dict[str, Any]:
        """Evidence summary with concrete indicators."""
        
        malicious_indicators = []
        
        for behavior in behaviors:
            if behavior.get("confidence", 0) < 0.6:
                continue
                
            evidence_apis = behavior.get("evidence_apis", [])
            evidence_commands = behavior.get("evidence_commands", [])
            
            if evidence_apis or evidence_commands:
                indicator = {
                    "type": behavior.get("category", "").replace("_", " ").title(),
                    "description": behavior.get("details", behavior.get("summary", "")),
                    "severity": self._map_confidence_to_severity(behavior.get("confidence", 0))
                }
                
                if evidence_apis:
                    indicator["command"] = evidence_apis[0]
                elif evidence_commands:
                    indicator["command"] = evidence_commands[0]
                
                malicious_indicators.append(indicator)
        
        return {
            "malicious_indicators": malicious_indicators[:5],
            "behavioral_chain": verification.get("chain_analysis", {}).get("chain_narrative", "N/A"),
            "legitimacy_assessment": verification.get("legitimacy_check", {}).get("reasoning", "N/A")
        }
    
    def _generate_recommendations(self, verdict: str, risk_level: str, 
                                 behaviors: List[Dict]) -> Dict[str, Any]:
        """Generate actionable recommendations."""
        
        if verdict == "BENIGN":
            return {
                "immediate_action": "Package appears safe to use",
                "remediation_steps": []
            }
        
        if risk_level in ["CRITICAL", "HIGH"]:
            immediate = "DO NOT INSTALL - Remove immediately if already installed"
        else:
            immediate = "Use with caution - Manual review recommended"
        
        remediation = ["Review package source code and dependencies"]
        
        risk_categories = {
            b.get("category")
            for b in behaviors
            if b.get("confidence", 0) >= 0.6
        }
        
        REMEDIATION_MAP = {
            BehaviorCategory.NETWORK_EXFILTRATION.value:
                "Monitor network traffic for suspicious outbound connections",

            BehaviorCategory.CREDENTIAL_THEFT.value:
                "Check for unauthorized access to credentials or secrets",

            BehaviorCategory.INSTALL_HOOK.value:
                "Inspect install/preinstall scripts in package.json",

            BehaviorCategory.SUPPLY_CHAIN_ATTACK.value:
                "Scan for other compromised packages from same author"
        }

        
        for category in risk_categories:
            if category in REMEDIATION_MAP:
                remediation.append(REMEDIATION_MAP[category])

        remediation.append("Report to npm security team if confirmed malicious")
        
        return {
            "immediate_action": immediate,
            "remediation_steps": remediation
        }
    
    def _infer_attack_type(self, risk_vector: List[str]) -> str:
        """
        Infer primary attack objective based on highest-impact behavior.
        """
        rv = set(risk_vector)

        if rv & {
            BehaviorCategory.SUPPLY_CHAIN_ATTACK.value,
            BehaviorCategory.SUPPLY_CHAIN_PROPAGATION.value,
            BehaviorCategory.DEPENDENCY_INJECTION.value,
            BehaviorCategory.REPOSITORY_MANIPULATION.value,
            BehaviorCategory.TYPOSQUATTING.value,
        }:
            return "Supply Chain Attack"

        if rv & {
            BehaviorCategory.BACKDOOR_INSTALLATION.value,
            BehaviorCategory.PERSISTENCE.value,
        }:
            return "Backdoor Installation"

        if rv & {
            BehaviorCategory.REMOTE_CODE_EXECUTION.value,
            BehaviorCategory.DYNAMIC_CODE_EXECUTION.value,
            BehaviorCategory.LOCAL_CODE_EXECUTION.value,
            BehaviorCategory.PRIVILEGE_ESCALATION.value,
        }:
            return "Remote Code Execution"

        if rv & {
            BehaviorCategory.CREDENTIAL_THEFT.value,
            BehaviorCategory.SENSITIVE_DATA_COLLECTION.value,
            BehaviorCategory.SENSITIVE_FILE_ACCESS.value,
        }:
            return "Credential Theft"

        if rv & {
            BehaviorCategory.NETWORK_EXFILTRATION.value,
            BehaviorCategory.DATA_EXFILTRATION.value,
        }:
            return "Data Exfiltration"
        if rv & {
            BehaviorCategory.CRYPTO_HIJACKING.value, 
            BehaviorCategory.RESOURCE_ABUSE.value
        }:
            return "Cryptocurrency Mining"
        
        if rv & {
            BehaviorCategory.SYSTEM_RECONNAISSANCE.value,
            BehaviorCategory.NETWORK_RECONNAISSANCE.value,
        }:
            return "Reconnaissance"
        if rv & {
            BehaviorCategory.OBFUSCATION.value,
            BehaviorCategory.ANTI_DEBUGGING.value,
            BehaviorCategory.ANTI_ANALYSIS.value,
        }:
            return "Defense Evasion"

        return "Malicious Package"

    
    def _get_primary_tactics(self, risk_vector: List[str]) -> List[str]:
        """Get human-readable tactics."""
        
        tactic_map = {
            # Execution
            BehaviorCategory.REMOTE_CODE_EXECUTION: "Execution (Remote)",
            BehaviorCategory.DYNAMIC_CODE_EXECUTION: "Execution (Dynamic)",
            BehaviorCategory.LOCAL_CODE_EXECUTION: "Execution (Local)",

            # Persistence
            BehaviorCategory.BACKDOOR_INSTALLATION: "Persistence (Backdoor)",
            BehaviorCategory.PERSISTENCE: "Persistence (Auto-run)",
            BehaviorCategory.INSTALL_HOOK: "Persistence (Install Hook)",

            # Credential Access
            BehaviorCategory.CREDENTIAL_THEFT: "Credential Access",
            BehaviorCategory.SENSITIVE_FILE_ACCESS: "Credential Access (File Access)",
            BehaviorCategory.SENSITIVE_DATA_COLLECTION: "Credential Access (Sensitive Data)",

            # Exfiltration
            BehaviorCategory.NETWORK_EXFILTRATION: "Exfiltration (Network)",
            BehaviorCategory.DATA_EXFILTRATION: "Exfiltration (File/Data)",

            # Defense Evasion
            BehaviorCategory.OBFUSCATION: "Defense Evasion (Obfuscation)",
            BehaviorCategory.ANTI_ANALYSIS: "Defense Evasion (Anti-Analysis)",
            BehaviorCategory.ANTI_DEBUGGING: "Defense Evasion (Anti-Debugging)",

            # Discovery
            BehaviorCategory.SYSTEM_RECONNAISSANCE: "Discovery (System)",
            BehaviorCategory.NETWORK_RECONNAISSANCE: "Discovery (Network)",
            
            # Impact
            BehaviorCategory.CRYPTO_HIJACKING: "Impact (Crypto Mining)",
            BehaviorCategory.RESOURCE_ABUSE: "Impact (Resource Abuse)",
        }
        
        tactics = []
        seen = set()
        
        for behavior in risk_vector:
            if behavior in tactic_map:
                tactic = tactic_map[behavior]
                if tactic not in seen:
                    tactics.append(tactic)
                    seen.add(tactic)
            else:
                tactic = behavior.replace("_", " ").title()
                if tactic not in seen:
                    tactics.append(tactic)
                    seen.add(tactic)
        
        return tactics[:5]  
    
    def _map_confidence_to_severity(self, confidence: float) -> str:
        """Map confidence score to severity level."""
        if confidence >= 0.85:
            return "CRITICAL"
        elif confidence >= 0.7:
            return "HIGH"
        elif confidence >= 0.4:
            return "MEDIUM"
        else:
            return "LOW"
    
    def generate_user_report(self, result) -> str:
        """
        Generate human-readable report for end users.
        
        Args:
            output_format: "markdown" or "text"
        
        Returns:
            Formatted report as string
        """        
        return self._generate_markdown_report(result)

    
    def _generate_markdown_report(self, result: Dict) -> str:
        """Generate markdown formatted report."""
        
        verdict = result["final_verdict"]
        risk_level = verdict["risk_level"]
        classification = verdict["classification"]
        confidence = verdict["confidence"]
        
        RISK_LABEL = {
            "CRITICAL": "SEV-1 (Critical)",
            "HIGH": "SEV-2 (High)",
            "MEDIUM": "SEV-3 (Medium)",
            "LOW": "SEV-4 (Low)"
        }
        
        VERDICT_LABEL = {
            "MALICIOUS": "Blocked",
            "SUSPICIOUS": "Needs Review",
            "BENIGN": "Allowed"
        }
        
        report = f"""# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `{result['package_name']}`
- **Version:** `{result['version']}`
- **Scan Date:** {result['scan_timestamp'][:19]}

---

## Final Security Verdict: **{classification}** (Policy: {VERDICT_LABEL.get(classification, "Unknown")})

**Risk Level:** {RISK_LABEL.get(risk_level, '')} **{risk_level}**  
**Confidence Score:** {confidence * 100:.1f}%

### Executive Summary
{result['executive_summary']}

---

## THREAT PROFILE

**ATTACK TYPES:** {result['threat_profile']['attack_type']}

**PRIMARY TACTICS:**
"""
        
        for tactic in result['threat_profile']['primary_tactics']:
            report += f"- {tactic}\n"
        
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
                    report += f"```bash\n{indicator['command']}\n```\n\n"
        
        chain = result['evidence_summary']['behavioral_chain']
        if chain != "N/A":
            report += f"**Attack Chain:** {chain}\n\n"
        
        legitimacy = result['evidence_summary']['legitimacy_assessment']
        if legitimacy != "N/A":
            report += f"**Legitimacy Assessment:** {legitimacy}\n\n"
        
        report += "---\n\n## RECOMMENDATIONS\n\n"
        report += f"### Immediate Action\n**{result['recommendations']['immediate_action']}**\n\n"
        
        if result['recommendations']['remediation_steps']:
            report += "### Remediation Steps\n"
            for step in result['recommendations']['remediation_steps']:
                report += f"1. {step}\n"
        
        report += f"\n---\n\n## TECHNICAL ANALYSIS DETAILS\n\n"
        report += f"**Behaviors Detected:** {result['detailed_analysis']['semantic_detection']['behaviors_found']}\n"
        report += f"**Risk Categories:** {', '.join(result['detailed_analysis']['semantic_detection']['categories'][:5])}\n"
        report += f"**Highest Detection Confidence:** {result['detailed_analysis']['semantic_detection']['highest_confidence'] * 100:.1f}%\n"
        report += f"**Verification Confidence:** {result['detailed_analysis']['verification_analysis']['calibrated_confidence'] * 100:.1f}%\n\n"
        
        report += f"\n---\n\n*Analysis Version: {result['metadata']['analysis_version']}*  \n"
        report += f"*Model: {result['metadata']['model']}*  \n"
        if result['metadata'].get('ground_truth_label'):
            report += f"*Ground Truth Label: {result['metadata']['ground_truth_label']}*\n"
        
        return report

    def save_result(self, result,output_dir: str = "./experiment_results/output_machine_readable") -> str:
        """Save final classification result to disk."""
        
        Path(output_dir).mkdir(parents=True, exist_ok=True)
                
        pkg_name = self.package_name
        version = self.version

        if not pkg_name or not version:
            raise ValueError("Missing package_name or version in FinalClassifier")

        safe_name = f"{pkg_name.replace('/', '#')}-{version}.json"


        filepath = Path(output_dir) / safe_name
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        return str(filepath)
    
    def save_user_report(self, result, output_dir: str = "./experiment_results/report_human_readable") -> str:
        """
        Save human-readable report to disk.
        
        Args:
            output_dir: Directory to save report
            format: "markdown" or "text"
        
        Returns:
            Path to saved report file
        """
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        report = self.generate_user_report(result)
        
        pkg_name = self.package_name
        version = self.version

        if not pkg_name or not version:
            raise ValueError("Missing package_name or version in FinalClassifier")

        safe_name = f"{pkg_name.replace('/', '#')}-{version}.json"

        filepath = Path(output_dir) / safe_name
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(report)
        
        return str(filepath)


