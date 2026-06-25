"""
Signal Aggregator Module.

Aggregates findings from StructuralAnalyzer (Layer 1) and ASTAnalyzer (Layer 2)
into a StructuralContext used by downstream analysis.

Instead of passing raw findings, signals are summarized into a normalized
risk_score and routing decision (skip / review / flag) to guide later stages.
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, field
from typing import List, Literal, Optional

from logs.logging_config import setup_logger
from src.data.models import PackageProfile
from src.enums.behavior_category import BehaviorCategory
from src.enums.severity import Severity
from src.analysis.structural_analysis import StructuralAnalysisFinding, StructuralAnalyzer
from src.analysis.ast_analyzer import ASTAnalyzer

logger = setup_logger()


# Severity weights - calculate risk_score
_SEVERITY_WEIGHT: dict[Severity, float] = {
    Severity.CRITICAL: 1.0,
    Severity.HIGH:     0.7,
    Severity.MEDIUM:   0.3,
    Severity.LOW:      0.0,   # not contribute to score
}

# Confidence threshold to be "confirmed signal"
_CONFIRMED_THRESHOLD = 0.70

# Confidence threshold to be considered a "supporting signal"
_SUPPORTING_THRESHOLD = 0.40


# Output data structure
@dataclass
class StructuralContext:
    """
    Aggregated structural analysis output for downstream LLM processing.
    
    Contains normalized risk assessment and routing decision instead of raw findings.
    
    Attributes:
        risk_score: Float 0.0–1.0 indicating maliciousness likelihood.
        confidence: Float 0.0–1.0 indicating score reliability.
        primary_category: Most significant BehaviorCategory or None.
        confirmed_signals: High-confidence findings (≥0.70) for LLM context.
        supporting_signals: Medium-confidence findings (0.40–0.69) for LLM context.
        noise_filtered: Count of low-confidence signals excluded (<0.40).
        routing: Downstream instruction-"skip", "review", or "flag".
    """
    risk_score: float
    confidence: float
    primary_category: Optional[BehaviorCategory]
    confirmed_signals: List[str]
    supporting_signals: List[str]
    noise_filtered: int
    routing: Literal["skip", "review", "flag"]

    def to_llm_prompt_block(self) -> str:
        lines = [
            "[STRUCTURAL ANALYSIS]",
            f"Risk Score   : {self.risk_score:.2f} / 1.00",
            f"Confidence   : {self.confidence:.2f}",
            f"Routing      : {self.routing.upper()}",
            f"Primary Risk : {self.primary_category.value if self.primary_category else 'none'}",
        ]

        if self.confirmed_signals:
            lines.append(f"\nConfirmed Signals ({len(self.confirmed_signals)}):")
            for s in self.confirmed_signals:
                indented = "\n    ".join(s.strip().splitlines())
                lines.append(f"  [!] {indented}")

        if self.supporting_signals:
            lines.append(f"\nSupporting Signals ({len(self.supporting_signals)}):")
            for s in self.supporting_signals:
                first_line = s.strip().splitlines()[0]
                lines.append(f"  [-] {first_line}")

        if self.noise_filtered > 0:
            lines.append(f"\n({self.noise_filtered} low-confidence signal(s) filtered)")

        lines.append(
            "\nNOTE: Signals above are pre-analysis anchors. "
            "Verify intent from code below before concluding."
        )

        return "\n".join(lines)


# SignalAggregator
class SignalAggregator:
    """
    Aggregate findings from Layer 1 and Layer 2 into a StructuralContext.

    Scoring logic:
        raw_score = Σ (severity_weight × confidence) for each finding
        risk_score = min(raw_score / NORMALIZATION_FACTOR, 1.0)

    Normalization factor is calibrated such that:
        - 1 HIGH finding (0.7 × 0.9 = 0.63) → score ~0.4 → routing: review
        - 2 HIGH findings → score ~0.8 → routing: flag
        - 1 CRITICAL finding → score ~0.65 → routing: flag
    """

    _NORMALIZATION_FACTOR = 1.5

    def __init__(self, package_profile: PackageProfile):
        self.package_profile = package_profile

    def _collect_findings(self) -> List[StructuralAnalysisFinding]:
        """Chạy Layer 1 + Layer 2, gom toàn bộ findings."""
        layer1 = StructuralAnalyzer(self.package_profile).run_all()
        layer2 = ASTAnalyzer(self.package_profile).run_all()
        return layer1 + layer2

    def _compute_score(self, findings: List[StructuralAnalysisFinding]) -> float:
        """
        Calculate risk score based on severity and confidence of findings.
        LOW severity findings do not contribute (weight = 0.0).
        """
        raw = sum(
            _SEVERITY_WEIGHT[f.severity] * f.confidence
            for f in findings
        )
        return min(raw / self._NORMALIZATION_FACTOR, 1.0)

    def _compute_confidence(self, findings: List[StructuralAnalysisFinding]) -> float:
        """
        Confidence of the score = average confidence of the findings
        with severity >= MEDIUM.
        If no findings meet this criteria → low confidence (0.2) because the package is not clearly clean.
        """
        meaningful = [
            f for f in findings
            if _SEVERITY_WEIGHT[f.severity] > 0
        ]
        if not meaningful:
            return 0.20
        return sum(f.confidence for f in meaningful) / len(meaningful)

    def _primary_category(
        self,
        findings: List[StructuralAnalysisFinding],
    ) -> Optional[BehaviorCategory]:
        """
        Choose the category that appears most frequently in confirmed signals.
        If there's a tie, prioritize the category with higher severity.
        """
        confirmed = [
            f for f in findings
            if f.confidence >= _CONFIRMED_THRESHOLD
        ]
        if not confirmed:
            return None

        # Sort severity weight descending to prioritize higher severity when tied
        confirmed.sort(key=lambda f: _SEVERITY_WEIGHT[f.severity], reverse=True)

        counter = Counter(f.category for f in confirmed)
        return counter.most_common(1)[0][0]

    def _route(self, risk_score: float) -> Literal["skip", "review", "flag"]:
        """
        Routing decision for downstream LLM:
            skip   - package clean, LLM does not need to review
            review - there are some signals, LLM reviews but without bias
            flag   - strong signals, LLM reviews with high suspicion context
        """
        if risk_score < 0.30:
            return "skip"
        elif risk_score < 0.60:
            return "review"
        else:
            return "flag"

    def aggregate(self) -> StructuralContext:
        """
        Entry point: run pipeline and return StructuralContext.
        """
        logger.info(f"[Aggregator] Start: {self.package_profile.package_name}")

        findings = self._collect_findings()

        risk_score = self._compute_score(findings)
        confidence = self._compute_confidence(findings)
        primary_category = self._primary_category(findings)
        routing = self._route(risk_score)

        # Classify findings as confidence tier
        confirmed_signals = [
            f.evidence
            for f in findings
            if f.confidence >= _CONFIRMED_THRESHOLD
        ]
        supporting_signals = [
            f.evidence
            for f in findings
            if _SUPPORTING_THRESHOLD <= f.confidence < _CONFIRMED_THRESHOLD
        ]
        noise_filtered = sum(
            1 for f in findings
            if f.confidence < _SUPPORTING_THRESHOLD
        )

        context = StructuralContext(
            risk_score=round(risk_score, 4),
            confidence=round(confidence, 4),
            primary_category=primary_category,
            confirmed_signals=confirmed_signals,
            supporting_signals=supporting_signals,
            noise_filtered=noise_filtered,
            routing=routing,
        )

        logger.info(
            f"[Aggregator] Done: score={context.risk_score:.2f} "
            f"routing={context.routing} "
            f"confirmed={len(confirmed_signals)} "
            f"supporting={len(supporting_signals)} "
            f"filtered={noise_filtered}"
        )

        return context