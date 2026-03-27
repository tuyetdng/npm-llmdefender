"""
TEST — Final Classifier (Step 3)

Usage:
    tester = TestFinalClassifierSingleFile(
        semantic_file="./experiment_results/semantic_output/@aszxc#npmexp-1.0.1.json",
        verification_file="./experiment_results/verification_output/@aszxc#npmexp-1.0.1.json"
    )
    tester.run()
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


def _load_json(path: str) -> Dict:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"File not found: {path}")
    return json.loads(p.read_text(encoding="utf-8"))


class TestFinalClassifierSingleFile:
    def __init__(
        self,
        semantic_file: str,
        verification_file: Optional[str] = None,
    ):
        self.semantic_file     = semantic_file
        self.verification_file = verification_file

    def run(self):
        # ── Load files ───────────────────────────────────────────────
        semantic     = _load_json(self.semantic_file)
        verification = _load_json(self.verification_file) if self.verification_file else None

        # ── Run classifier ───────────────────────────────────────────
        classifier = FinalClassifier(semantic, verification)
        result     = classifier.classify()

        # ── Print result ─────────────────────────────────────────────
        fv = result["final_verdict"]

        verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(
            fv["classification"], "❓"
        )
        label_icon = "🔴" if semantic.get("label") == "malicious" else "🟢"

        print("=" * 60)
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

        print(f"\n📄 Generating markdown report...")
        report = classifier.generate_user_report(result)
        classifier.save_result(result)
        classifier.save_user_report(result)
        print(f"   Report length : {len(report)} chars")
        print(f"   ✅ Saved to ./experiment_results/output_machine_readable/")
        print(f"   ✅ Saved to ./experiment_results/report_human_readable/")
        print("=" * 60)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--semantic",      required=True)
    parser.add_argument("--verification",  default=None)
    args = parser.parse_args()

    tester = TestFinalClassifierSingleFile(
        semantic_file=args.semantic,
        verification_file=args.verification,
    )
    tester.run()