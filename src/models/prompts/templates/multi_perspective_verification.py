"""
VERIFICATION PROMPT TEMPLATES
"""

from datetime import datetime
import json
import os
from typing import Dict, List, Any
from data.models import PackageProfile

VERIFICATION_OUTPUT_DIR = "./experiment_results/verification_output"

class VerificationPromptAnalysis:
    """
    Templates for Step 2: Multi-Perspective Verification.
    Input: Package Metadata + Identified Behaviors (from Step 1.2)
    Output: Reasoning about Attack Chain & Context Legitimacy.
    """

    def __init__(self, package_profile: PackageProfile, semantic_findings: Dict[str, Any]):
        """
        Args:
            package_profile: Raw package data (for description/readme).
            semantic_findings: The model's JSON output containing 'behaviors'.
        """
        self.package = package_profile
        self.semantic_findings = semantic_findings
        
    def save_verification_result(self, parsed_data: dict, version_tag: str):
        """Save verification analysis result to disk."""
        os.makedirs(VERIFICATION_OUTPUT_DIR, exist_ok=True)
        
        result = {
            "package_name": self.package.package_name,
            "version": self.package.version,
            "label": self.package.label,
            "semantic_findings_summary": {
                "num_behaviors": len(self.semantic_findings.get("behaviors", [])),
                "risk_vector": self.semantic_findings.get("risk_vector", [])
            },
            "verification_result": parsed_data,
            "analysis_metadata": {
                "model": "deepseek-coder-6.7b",
                "stage": version_tag
            },
            "created_at": datetime.now().isoformat()
        }
        
        safe_name = f"{self.package.package_name.replace('/', '#')}-{self.package.version}.json"
        file_path = os.path.join(VERIFICATION_OUTPUT_DIR, safe_name)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        
        return file_path


    def _format_package_intent(self) -> str:
        """
        Extract claimed functionality from package.json and README.
        Crucial for 'Context Legitimacy Check'.
        """
        pkg_json = self.package.package_json_raw or {}
        description = pkg_json.get("description", "No description provided.")
        keywords = pkg_json.get("keywords", [])
        
        readme_snippet = self.package.readme_content[:500] if self.package.readme_content else "No README."
        
        return f"""
        - Package Name: {self.package.package_name}
        - Description: {description}
        - Keywords: {', '.join(keywords) if keywords else 'None'}
        - Readme Snippet: {readme_snippet.replace(chr(10), ' ')}...
        """

    def _format_detected_behaviors(self) -> str:
        """
        Convert JSON behaviors from models response into a readable list for the verifier.
        """
        behaviors = self.semantic_findings.get("behaviors", [])
        if not behaviors:
            return "No suspicious behaviors detected."
        
        formatted = ""
        for idx, b in enumerate(behaviors):
            formatted += (
                f"Behavior #{idx+1}:\n"
                f"  - Category: {b.get('category')}\n"
                f"  - Summary: {b.get('summary')}\n"
                f"  - Details: {b.get('details')}\n"
                f"  - Evidence: {b.get('evidence_commands', []) + b.get('evidence_apis', [])}\n"
            )
        return formatted

    def _get_system_message(self) -> str:
        return (
            "You are a Senior Security Auditor specializing in False Positive Elimination and Attack Chain Reconstruction. "
            "Your goal is NOT to find new bugs, but to VERIFY existing findings. "
            "You must reason across two perspectives: \n"
            "1. Behavior Chain Analysis: Do the isolated findings connect to form a coherent attack?\n"
            "2. Context Legitimacy Check: Is the behavior justified by the package's stated purpose?\n"
            "Provide a calibrated risk score based on this reasoning."
        )

    def _get_user_message(self) -> str:
        return f"""
        TARGET PACKAGE IDENTITY (STATED PURPOSE):
        {self._format_package_intent()}

        DETECTED BEHAVIORS (FROM PREVIOUS ANALYSIS):
        {self._format_detected_behaviors()}
        
        Verify if these behaviors constitute a real threat or a benign utility.
        """

    def _get_instructions(self) -> str:
        output_schema = {
            "chain_analysis": {
                "is_coherent_chain": "<boolean>",
                "chain_narrative": "<string: short describe the attack flow if exists>",
                "chain_score": "<float 0.0-1.0: 1.0=perfect attack chain, 0.0=isolated behaviors>"
            },
            "legitimacy_check": {
                "is_justified": "<boolean>",
                "reasoning":"<string: short explain if behaviors match package purpose>",
                "legitimacy_score": "<float 0.0-1.0: 1.0=completely legitimate, 0.0=totally unjustified>"
            },
            "final_verification": {
                "verdict": "<string: MALICIOUS | SUSPICIOUS | BENIGN>",
                "calibrated_confidence": "<float 0.0-1.0>",
                "explanation": "<string: summary reasoning for verdict>"
            }
        }

        return f"""
        INSTRUCTIONS:
        
        STEP 1: BEHAVIOR CHAIN ANALYSIS
        - Examine the list of behaviors. 
        - Look for Causal Dependencies: Does Behavior A facilitate Behavior B? (e.g., Obfuscation -> Network Call -> File Write).
        - If behaviors are isolated/random, the chain score is LOW (0.0-0.3).
        - If behaviors form a partial chain, the score is MEDIUM (0.4-0.6).
        - If behaviors form a 'Kill Chain' (Recon -> Weaponization -> Actions on Objectives), the chain score is HIGH (0.7-1.0).
        
        STEP 2: CONTEXT LEGITIMACY CHECK
        - Compare the 'Target Package Identity' (Description/Name) vs 'Detected Behaviors'.
        - Ask: "Does a package named '{self.package.package_name}' reasonably need to perform these actions?"
        - Example: A 'deployment-tool' needing 'child_process' is HIGH legitimacy (Score ~0.7-1.0)).
        - Example: A 'icon-pack' needing 'network sockets' is LOW legitimacy (Score ~0.4-0.6).
        - Example: An 'icon-pack' opening network sockets → LOW legitimacy (0.0-0.3)
        
        STEP 3: CALIBRATION
        - Combine both chain_score and legitimacy_score to form final verdict:
        * Low chain_score + Low legitimacy → MALICIOUS (high confidence)
        * High chain_score + Low legitimacy → MALICIOUS (very high confidence)
        * Low chain_score + High legitimacy → BENIGN (medium confidence)
        * Medium scores on both → SUSPICIOUS (low-medium confidence)
        
        OUTPUT FORMAT:
        - Return ONLY valid JSON matching this schema structure (replace all <...> placeholders with actual values):
         {json.dumps(output_schema, indent=2)}
        - Calculate scores based on YOUR ACTUAL ANALYSIS of the provided code
        - Ensure all float values are between 0.0 and 1.0
        - Verdict must be exactly one of: MALICIOUS, SUSPICIOUS, BENIGN
        """

    def build_prompt(self) -> Dict[str, str]:
        return {
            "system": self._get_system_message(),
            "user": self._get_user_message(),
            "instructions": self._get_instructions()
        }