"""
Batch Final Classifier

Scans semantic_output/ as the source of truth (all 229 packages).
For each semantic file:
    Case A  behaviors ≥ 1 AND matching verification file exists
             → FinalClassifier(semantic, verification)
    Case B  behaviors ≥ 1 AND verification file missing
             → FinalClassifier(semantic, None)   [semantic-only fallback]
    Case C  behaviors = 0
             → FinalClassifier(semantic, None)   [CLEAN path]
"""

from pathlib import Path
import json
import logging
from typing import Optional

from detection.decision.classificator import FinalClassifier

logger = logging.getLogger(__name__)


class BatchFinalClassifier:
    def __init__(
        self,
        semantic_dir: str,
        verification_dir: str,
    ):
        self.semantic_dir      = Path(semantic_dir)
        self.verification_dir  = Path(verification_dir)

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _load_json(self, path: Path) -> Optional[dict]:
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load {path}: {e}")
            return None

    # ------------------------------------------------------------------
    # Entry point
    # ------------------------------------------------------------------

    def run_all(self) -> None:
        semantic_files = sorted(self.semantic_dir.glob("*.json"))

        if not semantic_files:
            logger.warning(f"No semantic files found in {self.semantic_dir}")
            return

        total   = len(semantic_files)
        success = 0
        skipped = 0

        for sem_file in semantic_files:
            semantic_result = self._load_json(sem_file)
            if semantic_result is None:
                skipped += 1
                continue

            behaviors        = semantic_result.get("behaviors", [])
            veri_file        = self.verification_dir / sem_file.name
            verification_result: Optional[dict] = None

            if behaviors:
                # Case A / B  try to load verification
                if veri_file.exists():
                    verification_result = self._load_json(veri_file)
                    if verification_result is None:
                        logger.warning(
                            f"Verification file corrupt for {sem_file.name}  "
                            "falling back to semantic-only"
                        )
                else:
                    logger.warning(
                        f"No verification file for {sem_file.name} "
                        f"({len(behaviors)} behavior(s))  using semantic-only fallback"
                    )
            # Case C  behaviors = 0, verification_result stays None → CLEAN path

            try:
                classifier = FinalClassifier(semantic_result, verification_result)
                result     = classifier.classify()
                classifier.save_result(result)
                classifier.save_user_report(result)
                success += 1

                verdict    = result["final_verdict"]["classification"]
                risk_level = result["final_verdict"]["risk_level"]
                logger.info(
                    f"[{verdict:<10}] [{risk_level:<8}] {sem_file.name}"
                )

            except Exception as e:
                logger.error(f"Classification failed for {sem_file.name}: {e}")
                skipped += 1

        logger.info(
            f"Batch complete  total={total} success={success} skipped={skipped}"
        )
        print(f"\nBatch complete: {success}/{total} processed, {skipped} skipped.")