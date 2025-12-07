#src/models/prompts/templates/semantic_prompt_analysis.py
"""
SEMANTIC ANALYSIS PROMPT TEMPLATES
"""


import json
import re
from typing import Dict, List
from analysis.structural_analysis import StructuralAnalysisFinding
from data.models import PackageProfile
from enums.behavior_category import BehaviorCategory
from enums.severity import Severity


class SemanticPromptAnalysis:
    """Templates for semantic analysis prompts."""
        
    @classmethod
    def get_behavior_categories(cls) -> List[str]:
        return [category.value for category in BehaviorCategory]
    
    @classmethod
    def get_severity_levels(cls) -> List[str]:
        return [severity.value for severity in Severity]
    
    def __init__(self, package_profile: PackageProfile, structural_risks: List[StructuralAnalysisFinding]):
        self.package = package_profile
        self.structural_risks = structural_risks
        
    def _format_structural_context(self) -> str:
        """Format structural analysis findings (prioritize suspicious ones from structural analysis)."""
        if not self.structural_risks:
            return "STRUCTURAL ANALYSIS: Not detected.\n"

        severity_order = {
            "critical": 0,
            "high": 1,
            "medium": 2,
            "low": 3
        }
        sorted_risks = sorted(self.structural_risks, key=lambda r: severity_order.get(r.severity.value, 99))

        context = "STRUCTURAL ANALYSIS:\n"
        for risk in sorted_risks:
            context += f"- [{risk.severity.value.upper()}] {risk.risk_type}: {risk.evidence[:100]}\n"
        return context
    
    def _format_dependencies(self) -> str:
        """Format dependency list (prioritize suspicious ones from structural analysis)."""
        all_deps = {**self.package.dependencies, **self.package.dev_dependencies, **self.package.peer_dependencies}
        
        if not all_deps:
            return "None"
        
        sus_dep = set()
        for risk in self.structural_risks:
            if "dependency" in risk.risk_type.lower():
                match = re.search(r"'([^']+)'", risk.evidence)
                if match:
                    sus_dep.add(match.group(1))
        
        res_list = []
        for dep, version in list(all_deps.items())[:10]:
            marker = "[SUSPICIOUS]" if dep in sus_dep else ""
            res_list.append(f"{dep}@{version}{marker}")
        
        return ", ".join(res_list)
    
    def _get_system_message(self) -> str:
        """System messages for the prompt."""        
        return (
            "You are a JavaScript cybersecurity analyst, your task is to review open-source dependencies in client and server-side JavaScript code for potentially malicious behavior or sabotage."
            "for malicious behavior, supply chain attacks, and other security risks. "
            "Do NOT flag standard minified code or third-party library usage alone."
            "FILL THE JSON SKELETON BELOW based ONLY on the provided files."
        )

        
    
    def _get_user_message(self) -> str:
        """User messages for the prompt."""
        
        structural_context = self._format_structural_context()
        dependencies = self._format_dependencies()
        
        code_context = []
        
        if self.package.install_script_content:
            code_context.append(
                f"INSTALL SCRIPT\n"
                f"```javascript\n{self.package.install_script_content}\n```\n"
            )
            
        if self.package.entry_point_code:
            code_context.append(
                f"ENTRY POINT CODE (main)\n"
                f"```javascript\n{self.package.entry_point_code}\n```\n"
            )
            
        if code_context:
            code_context_str = "\n".join(code_context)
        else:
            code_context_str = "No code snippets available."
        
        return f"""
            PACKAGE METADATA:
            - Name: {self.package.package_name}
            - Version: {self.package.version}
            - Dependencies: {dependencies}
            - Has Install Scripts: {bool(self.package.scripts)}
            - Structural context: 
            {structural_context}

            CODE TO ANALYZE:
            {code_context}
            """
                
        
    def _get_instructions(self) -> str:
        """Instructions for the prompt."""
        categories = self.get_behavior_categories()
        
        output_schema = {
            "behaviors": [
                {
                    "category": categories[0], 
                    "summary": "Brief description of malicious intent",
                    "details": "Specific technical evidence",
                    "confidence": "0.0 to 1.0",
                    "evidence_apis": ["example.api.call"],
                    "evidence_files": ["example/file/path"],
                    "evidence_domains": [],
                    "evidence_commands": [],
                    "evidence_env_vars": []
                }
            ],
            "risk_vector": categories[:2]
        }


        return f"""
            INSTRUCTIONS:
            1. Analyze the provided code snippets and structural analysis context.
            2. Identify any potential malicious behaviors, supply chain attacks, or security risks.
            3. For each identified behavior, classify it into one of the following categories: {', '.join(categories)}.
            4. Provide a brief explanation for each identified behavior (short ver).
            5. Assign confidence scores based on evidence clarity.
            6. DO NOT include 'behavior_id' field in your response - IDs will be generated automatically.
            7. Include evidence arrays (evidence_apis, evidence_files, etc.) even if empty.

            ANALYSIS PRINCIPLES:
            1. Context-Aware: Interpret code within package context (dependencies, scripts, structure)
            2. Evidence-Based: Ground all findings in observable API calls, functions, system interactions
            3. Intent-Focused: Describe malicious INTENT, not just implementation mechanics
            4. Conservative Confidence: Lower confidence for ambiguous evidence
            6. The "confidence" field is a float in [0,1] summarizing aggregated confidence.
            7. The 'risk_vector' field should contain a list of UNIQUE behavior categories found in this package. Include each category only ONCE, even if multiple behaviors share the same category.
            
            OUTPUT REQUIREMENTS:
            - Use EXACTLY this JSON schema: {json.dumps(output_schema, indent=2)}
            - Categories must be from: {', '.join(categories)}
            - Each behavior needs concrete evidence
            - DO NOT include 'behavior_id' in your JSON response
            - Output ONLY JSON, no other text
            """

    
    def build_prompt(self) -> Dict[str, str]:
        """Semantic analysis prompt template."""
        return {
            "system": self._get_system_message(),
            "user": self._get_user_message(),
            "instructions": self._get_instructions()  #
        }
