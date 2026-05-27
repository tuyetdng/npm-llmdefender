"""
ATTACK CHAIN VERIFICATION PROMPT TEMPLATES

Stage 2: Verification — runs ONLY when semantic stage detected ≥1 behavior.

Primary  : Attack Chain Reconstruction — decompose behaviors into ordered stages
Secondary: Context Legitimacy Check    — boolean sanity check (no scoring)

Input:
    - PackageProfile      (name, description, readme, scripts)
    - StructuralContext   (routing, risk_score, confirmed_signals)
    - semantic_findings   (behaviors list from Stage 1)

Output schema:
    {
        "chain_analysis": {
                        "chain_narrative": str          # 1-2 sentence summary of full attack
            "chain_score":     float        # 0.0-1.0, strength of reconstructed chain
            "verdict":         str          # MALICIOUS | SUSPICIOUS | BENIGN
            "confidence":      float        # 0.3-0.95, never 0.0
        },
        "legitimacy_check": {
            "is_justified": bool            # would a legit package need this?
            "reasoning":    str             # one sentence only
        }
    }
"""

from datetime import datetime
import json
import os
from typing import Any, Dict, List, Optional

from analysis.signal_aggregator import StructuralContext
from data.models import PackageProfile
from logs.logging_config import setup_logger

logger = setup_logger()

VERIFICATION_OUTPUT_DIR = "./experiment_results/verification_output"
_README_BUDGET = 400  # chars — enough for intent signal, not full doc


class VerificationPromptAnalysis:
    """
    Stage 2: Attack Chain Reconstruction + Legitimacy Check.

    Should only be called when semantic_findings contains >=1 behavior.
    Caller is responsible for this gate — this class does not enforce it.
    """

    def __init__(
        self,
        package_profile: PackageProfile,
        structural_context: StructuralContext,
        semantic_findings: Dict[str, Any],
        analyst_note: Optional[str] = None,
    ):
        self.package = package_profile
        self.ctx = structural_context
        self.semantic_findings = semantic_findings
        self._behaviors: List[Dict] = semantic_findings.get("behaviors", [])
        self.analyst_note = analyst_note.strip() if analyst_note and analyst_note.strip() else None

    # Persistence
    def save_verification_result(self, parsed_data: dict, version_tag: str) -> dict:
        """Persist verification stage output to JSON."""
        os.makedirs(VERIFICATION_OUTPUT_DIR, exist_ok=True)

        result = {
            "package_name": self.package.package_name,
            "version":      self.package.version,
            "label":        self.package.label,
            "semantic_summary": {
                "num_behaviors": len(self._behaviors),
                "risk_vector":   self.semantic_findings.get("risk_vector", []),
                "behaviors":     self._behaviors,
                "analyst_note":  self.analyst_note or "",
            },
            "verification_result": parsed_data,
            "analysis_metadata": {
                "model":                   "deepseek-coder-6.7b-instruct",
                "stage":                   version_tag,
                "structural_routing":      self.ctx.routing,
                "structural_risk_score":   self.ctx.risk_score,
                "confirmed_signals_count": len(self.ctx.confirmed_signals),
                "has_structural_backup":   len(self.ctx.confirmed_signals) > 0,
            },
            "created_at": datetime.now().isoformat(),
        }

        safe_name = f"{self.package.package_name.replace('/', '#')}-{self.package.version}.json"
        file_path = os.path.join(VERIFICATION_OUTPUT_DIR, safe_name)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        return result

    # Prompt sections
    def _system(self) -> str:
        return (
            "You are a malware analyst specializing in npm supply chain attacks. "
            "You will receive behaviors detected by a previous automated scan. "
            "Your task is to reconstruct the attack chain — decompose the behaviors "
            "into ordered stages and explain how they connect into a coherent threat. "
            "Output ONLY valid JSON — no prose, no markdown fences."
        )

    def _user(self) -> str:
        return "\n\n".join([
            self._format_package_context(),
            self._format_structural_context(),
            self._format_detected_behaviors(),
        ])

    def _instructions(self) -> str:
        has_description = bool(
            (self.package.package_json_raw or {}).get("description", "").strip()
            or (self.package.readme_content or "").strip()
        )

        legitimacy_hint = (
            f"Would a legitimate '{self.package.package_name}' package need this behavior?"
            if has_description else
            "This package has no description or README — any suspicious behavior is unjustified."
        )

        output_schema = {
            "chain_analysis": {
                "chain_narrative": "",
                "attack_vector": [],
                "chain_score": 0.0,
                "verdict": "MALICIOUS",
                "confidence": 0.0,
            },
            "legitimacy_check": {
                "is_justified": False,
                "reasoning": "",
            },
        }

        return f"""TASK: ATTACK CHAIN RECONSTRUCTION

Given the detected behaviors below, reconstruct the attack chain step by step.
Use ONLY the actual evidence provided — real IPs, real commands, real domains from the behaviors above.
Do NOT copy example text from these instructions into your output.

RECONSTRUCTION GUIDE:
  - chain_narrative: 1-2 sentences summarizing the full attack using real package name and real IOCs
  - attack_vector: short list of the key technical indicators — real IPs, domains, commands, API calls
    Example of attack_vector for a reverse shell: ["postinstall hook", "bash -c", "34.x.x.x:4444", "reverse shell"]
    Use ACTUAL values from the evidence above, not the example values
  - Only include what is clearly supported by evidence — do NOT invent

chain_score guide:
  0.7-1.0 : multiple behaviors with clear causal links (hook → exec → exfil)
  0.4-0.69: 1 strong behavior, or partial chain
  0.0-0.39: isolated behavior, no meaningful chain

verdict guide:
  MALICIOUS  : chain_score >= 0.4 AND is_justified is false
  SUSPICIOUS : chain_score >= 0.4 AND is_justified is ambiguous/true, OR chain_score < 0.4 but behavior is clearly anomalous
  BENIGN     : chain_score < 0.4 AND behavior could be justified

confidence guide:
  Base = chain_score
  +0.10 if package has no description/README
  +0.10 if is_justified is false
  Clamp to [0.30, 0.95]. Never output 0.0.

LEGITIMACY CHECK (secondary — boolean only, no scoring):
  {legitimacy_hint}

Fill the output schema below with values derived from the detected behaviors above.
"verdict" must be exactly one of: MALICIOUS, SUSPICIOUS, BENIGN.
Output schema:
{json.dumps(output_schema, indent=2)}

Output ONLY the JSON object. No explanation, no markdown."""


    # Context formatters
    def _format_package_context(self) -> str:
        """Package identity — for legitimacy check."""
        pkg_json = self.package.package_json_raw or {}
        description = pkg_json.get("description", "").strip() or "No description."
        keywords = pkg_json.get("keywords", [])
        readme = (self.package.readme_content or "").strip()
        readme_snippet = readme[:_README_BUDGET] + ("..." if len(readme) > _README_BUDGET else "")

        lines = [
            "PACKAGE IDENTITY:",
            f"  Name        : {self.package.package_name}",
            f"  Version     : {self.package.version}",
            f"  Description : {description[:200]}",
        ]
        if keywords:
            lines.append(f"  Keywords    : {', '.join(keywords[:8])}")
        if readme_snippet and readme_snippet != "No description.":
            lines.append(f"  README      : {readme_snippet.replace(chr(10), ' ')}")
        if description == "No description." and not readme_snippet and not keywords:
            lines.append("  WARNING: No stated purpose found.")

        return "\n".join(lines)

    def _format_structural_context(self) -> str:
        """Structural pre-analysis — ground truth anchor."""
        ctx = self.ctx
        lines = [
            "STRUCTURAL PRE-ANALYSIS (rule-based, pre-LLM):",
            f"  Routing    : {ctx.routing.upper()}",
            f"  Risk Score : {ctx.risk_score:.2f}",
        ]
        if ctx.confirmed_signals:
            lines.append(f"  Confirmed signals ({len(ctx.confirmed_signals)}):")
            for s in ctx.confirmed_signals[:4]:
                first = s.strip().splitlines()[0]
                lines.append(f"    [!] {first.strip()}")
        else:
            lines.append("  Confirmed signals : none")

        return "\n".join(lines)

    def _format_detected_behaviors(self) -> str:
        """Semantic stage output — the input to chain reconstruction."""
        if not self._behaviors:
            return "DETECTED BEHAVIORS: None."

        lines = [f"DETECTED BEHAVIORS ({len(self._behaviors)} total):"]
        for i, b in enumerate(self._behaviors, 1):
            lines.append(f"\n  Behavior #{i}:")
            lines.append(f"    Category : {b.get('category', '?')}")
            lines.append(f"    Summary  : {b.get('summary', '')[:150]}")
            lines.append(f"    Details  : {b.get('details', '')[:200]}")
            lines.append(f"    Confidence (semantic): {b.get('confidence', 0):.2f}")

            evidence_parts = []
            if b.get("evidence_commands"):
                evidence_parts.append(f"commands={b['evidence_commands'][:2]}")
            if b.get("evidence_apis"):
                evidence_parts.append(f"apis={b['evidence_apis'][:3]}")
            if b.get("evidence_domains"):
                evidence_parts.append(f"domains={b['evidence_domains'][:2]}")
            if b.get("evidence_env_vars"):
                evidence_parts.append(f"env_vars={b['evidence_env_vars'][:3]}")
            if evidence_parts:
                lines.append(f"    Evidence : {', '.join(evidence_parts)}")

        if self.analyst_note:
            lines.append(f"\n  ANALYST NOTE:\n  {self.analyst_note[:400]}")

        risk_vector = self.semantic_findings.get("risk_vector", [])
        if risk_vector:
            lines.append(f"\n  Risk vector: {', '.join(risk_vector)}")

        return "\n".join(lines)


    # Public
    def build_prompt(self) -> Dict[str, str]:
        """Return {system, user, instructions} dict for the LLM call."""
        return {
            "system": self._system(),
            "user": self._user(),
            "instructions": self._instructions(),
        }

    @staticmethod
    def should_run(semantic_findings: Dict[str, Any]) -> bool:
        """
        Gate check — only run verification when semantic found >=1 behavior.

        Usage:
            if VerificationPromptAnalysis.should_run(parsed_semantic):
                verifier = VerificationPromptAnalysis(pkg, ctx, parsed_semantic)
        """
        return len(semantic_findings.get("behaviors", [])) > 0