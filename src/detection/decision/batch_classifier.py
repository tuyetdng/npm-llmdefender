from pathlib import Path
import json

from detection.decision.classificator import FinalClassifier

class BatchFinalClassifier:
    def __init__(
        self,
        semantic_dir: str,
        verification_dir: str,
    ):
        self.semantic_dir = Path(semantic_dir)
        self.verification_dir = Path(verification_dir)

    def _load_json(self, path: Path) -> dict:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def run_all(self):
        verification_files = list(self.verification_dir.glob("*.json"))

        if not verification_files:
            print("No verification files found.")
            return

        for veri_file in verification_files:
            seman_file = self.semantic_dir / veri_file.name

            if not seman_file.exists():
                print(f" Semantic file missing for {veri_file.name} - Skipping.")
                continue

            semantic_result = self._load_json(seman_file)
            verification_result = self._load_json(veri_file)

            classifier = FinalClassifier(semantic_result, verification_result)

            result = classifier.classify()
            classifier.save_result(result)
            classifier.save_user_report(result)

            print(f"Processed {veri_file.name}")
