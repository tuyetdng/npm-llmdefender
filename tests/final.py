"""
TEST COMPLETE PIPELINE WITH FINAL CLASSIFICATION
"""
import time
import json
import sys
import os
from pathlib import Path
from datetime import datetime
import re
from typing import Any, Dict, Optional

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

from detection.decision.batch_classifier import BatchFinalClassifier
from logs.logging_config import setup_logger
from config.csv_logger_config import CSVLoggerConfig

VERSION_TAG = "v2.0"
SEMANTIC_OUTPUT_DIR = "./experiment_results/semantic_output"
VERIFICATION_OUTPUT_DIR = "./experiment_results/verification_output"
FINAL_OUTPUT_DIR = "./experiment_results/output_machine_readable"
REPORTS_DIR = "./experiment_results/report_human_readable"

logger = setup_logger()
# csv_logger = CSVLoggerConfig(
#     output_dir="./experiment_results",
#     prompt_version=VERSION_TAG
# )



try:
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from detection.decision.classificator import FinalClassifier 
    print("Imports successful")
    logger.info("Successfully imported necessary modules")
except ImportError as e:
    print(f"Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)

NUM_PACKAGES = 20

class TestFinalClassifierSingleFile:
    def __init__(self, semantic_file: str, verification_file: str):
        self.semantic_file = Path(semantic_file)
        self.verification_file = Path(verification_file)

    def run(self):
        # Load JSON
        with open(self.semantic_file, "r", encoding="utf-8") as f:
            semantic_result = json.load(f)

        with open(self.verification_file, "r", encoding="utf-8") as f:
            verification_result = json.load(f)

        classifier = FinalClassifier(semantic_result, verification_result)
        result = classifier.classify()

        json_path = classifier.save_result(result)
        md_path = classifier.save_user_report(result)

        print(f"JSON result saved to: {json_path}")
        print(f"Markdown report saved to: {md_path}")
        print("\nGenerated Report:\n")
        print(classifier.generate_user_report(result))


if __name__ == "__main__":
    tester = TestFinalClassifierSingleFile(
        semantic_file="./experiment_results/semantic_output/@aszxc#npmexp-1.0.1.json",
        verification_file="./experiment_results/verification_output/@aszxc#npmexp-1.0.1.json"
    )
    tester.run()