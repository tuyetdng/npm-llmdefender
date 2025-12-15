"""
VERIFICATION PROMPT TEMPLATES
"""

import json
from typing import Dict, List, Any
from data.models import PackageProfile

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
                "is_coherent_chain": True,
                "chain_narrative": "Step 1 (Install Hook) -> Step 2 (Download Payload) -> Step 3 (Execute)",
                "chain_score": 0.95  # 1.0 = Perfect Attack Chain
            },
            "legitimacy_check": {
                "is_justified": False,
                "reasoning": "A simple color logger does NOT need access to /etc/shadow or network sockets.",
                "legitimacy_score": 0.1  # 1.0 = Completely Legitimate/Safe, 0.0 = Totally Unjustified
            },
            "final_verification": {
                "verdict": "MALICIOUS", # MALICIOUS, SUSPICIOUS, BENIGN
                "calibrated_confidence": 0.92,
                "explanation": "High confidence due to clear Kill Chain and lack of business justification."
            }
        }

        return f"""
        INSTRUCTIONS:
        
        STEP 1: BEHAVIOR CHAIN ANALYSIS
        - Examine the list of behaviors. 
        - Look for Causal Dependencies: Does Behavior A facilitate Behavior B? (e.g., Obfuscation -> Network Call -> File Write).
        - If behaviors are isolated/random, the chain score is LOW/MEDIUM.
        - If behaviors form a 'Kill Chain' (Recon -> Weaponization -> Actions on Objectives), the chain score is HIGH.
        
        STEP 2: CONTEXT LEGITIMACY CHECK
        - Compare the 'Target Package Identity' (Description/Name) vs 'Detected Behaviors'.
        - Ask: "Does a package named '{self.package.package_name}' reasonably need to perform these actions?"
        - Example: A 'deployment-tool' needing 'child_process' is HIGH LEGITIMACY (Score ~0.9).
        - Example: A 'icon-pack' needing 'network sockets' is LOW LEGITIMACY (Score ~0.1).
        
        STEP 3: CALIBRATION
        - Combine both insights to form a final verdict.
        
        OUTPUT FORMAT:
        - Return ONLY JSON matching this schema: 
        {json.dumps(output_schema, indent=2)}
        """

    def build_prompt(self) -> Dict[str, str]:
        return {
            "system": self._get_system_message(),
            "user": self._get_user_message(),
            "instructions": self._get_instructions()
        }