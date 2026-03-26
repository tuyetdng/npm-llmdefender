"""
MULTI-PERSPECTIVE VERIFICATION PROMPT TEMPLATES

Stage 2: Verification — runs ONLY when semantic stage detected ≥1 behavior.

Two perspectives:
    1. Attack Chain Analysis  — do behaviors connect into a coherent kill chain?
    2. Context Legitimacy     — are behaviors justified by package's stated purpose?

Input:
    - PackageProfile          (name, description, readme, scripts)
    - StructuralContext       (routing, risk_score, confirmed_signals)
    - semantic_findings       (behaviors list from Stage 1)

Output schema:
    {
        "chain_analysis":      { "is_coherent_chain", "chain_narrative", "chain_score" }
        "legitimacy_check":    { "is_justified", "reasoning", "legitimacy_score" }
        "final_verification":  { "verdict", "calibrated_confidence", "explanation" }
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

# README budget — enough for intent signal, not full doc
_README_BUDGET = 400   # chars


class VerificationPromptAnalysis:
    """
    Stage 2: Multi-Perspective Verification.

    Should only be called when semantic_findings contains ≥1 behavior.
    Caller is responsible for this gate — this class does not enforce it
    but will produce low-value output if behaviors is empty.
    """

    def __init__(
        self,
        package_profile: PackageProfile,
        structural_context: StructuralContext,
        semantic_findings: Dict[str, Any],
        analyst_note: Optional[str] = None
    ):
        self.package = package_profile
        self.ctx = structural_context
        self.semantic_findings = semantic_findings
        self._behaviors: List[Dict] = semantic_findings.get("behaviors", [])
        self.analyst_note = analyst_note

    # ------------------------------------------------------------------
    # Persistence
    # ------------------------------------------------------------------

    def save_verification_result(self, parsed_data: dict, version_tag: str) -> dict:
        os.makedirs(VERIFICATION_OUTPUT_DIR, exist_ok=True)

        result = {
            "package_name": self.package.package_name,
            "version": self.package.version,
            "label": self.package.label,
            "semantic_summary": {
                "num_behaviors": len(self._behaviors),
                "risk_vector": self.semantic_findings.get("risk_vector", []),
            },
            "verification_result": parsed_data,
            "analysis_metadata": {
                "model": "deepseek-coder-6.7b-instruct",
                "stage": version_tag,
                "structural_routing": self.ctx.routing,
                "structural_risk_score": self.ctx.risk_score,
            },
            "created_at": datetime.now().isoformat(),
        }

        safe_name = f"{self.package.package_name.replace('/', '#')}-{self.package.version}.json"
        file_path = os.path.join(VERIFICATION_OUTPUT_DIR, safe_name)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        return result

    # ------------------------------------------------------------------
    # Prompt sections
    # ------------------------------------------------------------------

    def _system(self) -> str:
        return (
            "You are a senior supply chain security auditor. "
            "Your task is NOT to find new issues — it is to VERIFY existing findings "
            "from a previous automated scan. "
            "Reason across two perspectives: "
            "(1) do the detected behaviors form a coherent attack chain, and "
            "(2) are they justified by the package's stated purpose? "
            "Output ONLY valid JSON — no prose, no markdown fences."
        )

    def _user(self) -> str:
        parts = [
            self._format_package_context(),
            self._format_structural_context(),
            self._format_detected_behaviors(),
        ]
        return "\n\n".join(parts)

    def _instructions(self) -> str:
        output_schema = {
            "chain_analysis": {
                "is_coherent_chain": True,
                "chain_narrative": "Short description of attack flow, or 'none' if isolated",
                "chain_score": 0.0,
            },
            "legitimacy_check": {
                "is_justified": False,
                "reasoning": "Why behaviors match or do not match the package purpose",
                "legitimacy_score": 0.0,
            },
            "final_verification": {
                "verdict": "MALICIOUS",
                "calibrated_confidence": 0.0,
                "explanation": "One paragraph summary of the reasoning",
            },
        }

        return f"""VERIFICATION INSTRUCTIONS:

PERSPECTIVE 1 — ATTACK CHAIN ANALYSIS
Examine the detected behaviors. Do they connect causally?
Examples of coherent chains:
  - Obfuscation → reads env credentials → POST to external domain  (strong chain)
  - install hook downloads remote script → executes it             (strong chain)
  - single https.request with no credential access                 (isolated, weak)
chain_score guide:
  0.0–0.3 : isolated behaviors, no causal connection
  0.4–0.6 : partial chain or circumstantial link
  0.7–1.0 : clear kill chain (≥2 causally linked stages)

PERSPECTIVE 2 — CONTEXT LEGITIMACY CHECK
Compare the package's stated purpose vs detected behaviors.
Ask: "Would a legitimate '{self.package.package_name}' package need to do this?"
legitimacy_score guide:
  0.0–0.3 : totally unjustified (e.g. icon pack exfiltrating tokens)
  0.4–0.6 : grey area (e.g. logger running shell commands)
  0.7–1.0 : fully justified (e.g. deploy-tool using child_process)

VERDICT RULES (apply in order, stop at first match):
  1. chain_score > 0.6 AND legitimacy_score < 0.7  →  MALICIOUS
  2. chain_score > 0.3 AND legitimacy_score < 0.4  →  MALICIOUS
  3. chain_score > 0.3 AND legitimacy_score 0.4–0.7 →  SUSPICIOUS
  4. legitimacy_score > 0.7                         →  BENIGN
  5. chain_score <= 0.3                             →  BENIGN

calibrated_confidence: your overall confidence in the verdict (0.0–1.0).
  - Use high confidence (>0.8) only when evidence is unambiguous.
  - Use low confidence (<0.5) when behaviors are ambiguous or context is unclear.

Output schema (fill with real values — no placeholders):
{json.dumps(output_schema, indent=2)}

Output ONLY the JSON object. No explanation, no markdown."""

    # ------------------------------------------------------------------
    # Context formatters
    # ------------------------------------------------------------------

    def _format_package_context(self) -> str:
        """Package identity + stated purpose — for legitimacy check."""
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

        return "\n".join(lines)

    def _format_structural_context(self) -> str:
        """
        Structural pre-analysis context — ground truth anchor for verifier.
        Shows what rule-based analysis found BEFORE the LLM semantic scan.
        Helps verifier distinguish 'LLM invented this' vs 'structural confirmed this'.
        """
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
            lines.append(
                "  NOTE: Semantic analyzer detected behaviors without structural confirmation — "
                "apply extra scrutiny to legitimacy check."
            )

        return "\n".join(lines)

    def _format_detected_behaviors(self) -> str:
        """Semantic stage output — what needs to be verified."""
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
            if self._analyst_note and self._analyst_note.strip():
                lines.append(
                    f"\n  ANALYST NOTE (semantic model free-form reasoning):\n"
                    f"  {self._analyst_note.strip()[:400]}"
                )

        risk_vector = self.semantic_findings.get("risk_vector", [])
        if risk_vector:
            lines.append(f"\n  Risk vector: {', '.join(risk_vector)}")

        return "\n".join(lines)

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

    @staticmethod
    def should_run(semantic_findings: Dict[str, Any]) -> bool:
        """
        Gate check — verification is only meaningful when semantic found behaviors.
        Call this before instantiating to avoid wasted inference.

        Usage:
            if VerificationPromptAnalysis.should_run(parsed_semantic):
                verifier = VerificationPromptAnalysis(pkg, ctx, parsed_semantic)
                ...
        """
        behaviors = semantic_findings.get("behaviors", [])
        return len(behaviors) > 0