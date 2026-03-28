"""
TEST — Final Classifier (Step 3)

Usage:
    tester = TestFinalClassifierSingleFile("1ru-cache-0.0.1")
    tester.run()

    # hoặc CLI:
    python test_final_classifier.py --package 1ru-cache-0.0.1
"""

import sys
import json
from pathlib import Path
from typing import Dict, Optional

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from detection.decision.classificator import FinalClassifier
    print("✅ Import successful\n")
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)

SEMANTIC_DIR      = "./experiment_results/semantic_output"
VERIFICATION_DIR  = "./experiment_results/verification_output"


def _load_json(path: Path) -> Dict:
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


class TestFinalClassifierSingleFile:
    """
    Truyền tên gói (không cần .json), class tự resolve path:
        semantic_output/<package>.json
        verification_output/<package>.json  (nếu có)
    """

    def __init__(self, package: str):
        filename         = package if package.endswith(".json") else f"{package}.json"
        self.sem_path    = Path(SEMANTIC_DIR)  / filename
        self.veri_path   = Path(VERIFICATION_DIR) / filename

    def run(self):
        # ── Load semantic (bắt buộc) ─────────────────────────────────
        try:
            semantic = _load_json(self.sem_path)
        except FileNotFoundError as e:
            print(f"❌ {e}")
            return

        # ── Load verification (nếu có) ───────────────────────────────
        verification: Optional[Dict] = None
        if self.veri_path.exists():
            verification = _load_json(self.veri_path)
            print(f"📂 Semantic     : {self.sem_path}")
            print(f"📂 Verification : {self.veri_path}")
        else:
            print(f"📂 Semantic     : {self.sem_path}")
            print(f"📂 Verification : not found — running without")

        # ── Classify ─────────────────────────────────────────────────
        classifier = FinalClassifier(semantic, verification)
        result     = classifier.classify()

        # ── Print ────────────────────────────────────────────────────
        fv           = result["final_verdict"]
        verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(fv["classification"], "❓")
        label_icon   = "🔴" if semantic.get("label") == "malicious" else "🟢"

        print("\n" + "=" * 60)
        print(f"{label_icon} {semantic['package_name']} v{semantic['version']}"
              f"  (ground truth: {semantic.get('label', '?')})")
        print("=" * 60)

        print(f"\n{verdict_icon}  Verdict    : {fv['classification']}")
        print(f"    Risk level : {fv['risk_level']}")
        print(f"    Confidence : {fv['confidence']:.3f} ({fv['confidence']*100:.1f}%)")

        print(f"\n📋 Executive Summary:\n   {result['executive_summary']}")

        iocs = result["threat_profile"].get("attack_vector_iocs", [])
        if iocs:
            print(f"\n🎯 Attack Vector IOCs: {', '.join(iocs)}")

        indicators = result["evidence_summary"].get("malicious_indicators", [])
        if indicators:
            print(f"\n🔍 Malicious Indicators ({len(indicators)}):")
            for ind in indicators:
                cmd = ind.get("command", "")
                print(f"   [{ind['severity']}] {ind['type']}"
                      + (f"  →  {cmd}" if cmd else ""))

        chain = result["evidence_summary"].get("behavioral_chain", "N/A")
        if chain != "N/A":
            print(f"\n🔗 Attack Chain: {chain}")

        print(f"\n⚠️  Immediate Action: {result['recommendations']['immediate_action']}")

        steps = result["recommendations"].get("remediation_steps", [])
        if steps:
            print("   Remediation:")
            for step in steps:
                print(f"   - {step}")

        da  = result["detailed_analysis"]
        sem = da["semantic_detection"]
        ver = da["verification_analysis"]

        print(f"\n📊 Analysis Details:")
        print(f"   Behaviors found    : {sem['behaviors_found']}")
        print(f"   Risk categories    : {', '.join(sem['categories']) or 'none'}")
        print(f"   Highest confidence : {sem['highest_confidence']*100:.1f}%")
        if ver["verification_available"]:
            print(f"   Chain score        : {ver['chain_score']:.2f}")
        else:
            print(f"   Verification       : not available")

        print(f"\n📄 Saving report...")
        classifier.save_result(result)
        classifier.save_user_report(result)
        print(f"   ✅ ./experiment_results/output_machine_readable/")
        print(f"   ✅ ./experiment_results/report_human_readable/")
        print("=" * 60)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--package", required=True,
                        help="Package filename without .json, e.g. 1ru-cache-0.0.1")
    args = parser.parse_args()

    TestFinalClassifierSingleFile(args.package).run()