"""
STRUCTURAL ANALYSIS TEST (MALICIOUS + BENIGN)
Full pipeline: Layer 1 + Layer 2 + SignalAggregator → StructuralContext
"""

import sys
from pathlib import Path
from config.csv_logger_config import CSVLoggerConfig
from logs.logging_config import setup_logger

logger = setup_logger()
csv_logger = CSVLoggerConfig(output_dir="./experiment_results", prompt_version="v1.0")

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from enums.behavior_category import BehaviorCategory
    from enums.severity import Severity

    print("✅ Imports successful")
    logger.info("Successfully imported modules for structural analysis test")
except ImportError as e:
    print(f"❌ Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Core analysis
# ---------------------------------------------------------------------------


def run_structural_analysis(packages: list) -> list:
    print("=" * 60)
    print("RUNNING STRUCTURAL ANALYSIS - Layer 1 + Layer 2 + Aggregator")
    print("=" * 60)

    mal_packages = [p for p in packages if p.label == "malicious"]
    ben_packages = [p for p in packages if p.label == "benign"]
    print(
        f"\nAnalyzing {len(mal_packages)} malicious + {len(ben_packages)} benign packages..."
    )
    print(f"Total: {len(packages)} packages\n")

    all_results = []

    for i, package in enumerate(packages, 1):
        label_emoji = "🔴" if package.label == "malicious" else "🟢"
        print(
            f"\n{label_emoji} Package {i}/{len(packages)}: {package.package_name} [{package.label.upper()}]"
        )
        print("-" * 50)

        try:
            context: StructuralContext = SignalAggregator(package).aggregate()
        except Exception as e:
            logger.error(f"Error analyzing {package.package_name}: {e}")
            print(f"  ❌ Error: {e}")
            continue

        # Log to CSV
        csv_logger.log_structural_analyser_context(
            package_name=package.package_name,
            version=package.version,
            label=package.label,
            context=context,
        )

        # Print routing decision
        routing_icon = {"skip": "✅", "review": "⚠️", "flag": "🚨"}.get(
            context.routing, "?"
        )
        print(f"  {routing_icon} Routing     : {context.routing.upper()}")
        print(f"     Risk Score : {context.risk_score:.2f}")
        print(f"     Confidence : {context.confidence:.2f}")
        print(
            f"     Primary    : {context.primary_category.value if context.primary_category else 'none'}"
        )

        if context.confirmed_signals:
            print(f"\n  Confirmed signals ({len(context.confirmed_signals)}):")
            for s in context.confirmed_signals:
                print(f"    [!] {s[:90]}")

        if context.supporting_signals:
            print(f"\n  Supporting signals ({len(context.supporting_signals)}):")
            for s in context.supporting_signals:
                print(f"    [-] {s[:90]}")

        if context.noise_filtered > 0:
            print(f"\n  ({context.noise_filtered} low-confidence signal(s) filtered)")

        all_results.append(
            {
                "package": package.package_name,
                "version": package.version,
                "label": package.label,
                "context": context,
            }
        )

        print(f"\n✓ Done: {package.package_name}")

    return all_results


# ---------------------------------------------------------------------------
# LLM context preview
# ---------------------------------------------------------------------------


def generate_llm_context(results: list) -> str:
    """
    Show to_llm_prompt_block() output - đây là thứ LLM thực sự nhận được.
    In 3 packages đầu: 1 malicious, 1 benign, 1 bất kỳ.
    """
    print("\n" + "=" * 60)
    print("LLM CONTEXT SAMPLE")
    print("=" * 60)

    samples = []

    #first malicious package have findings
    for r in results:
        if r["label"] == "malicious" and r["context"].routing != "skip":
            samples.append(r)
            break

    #first benign package have findings (false positive candidate)
    for r in results:
        if r["label"] == "benign" and r["context"].routing != "skip":
            samples.append(r)
            break

    # Add a random package if we don't have 2 already (e.g., if all malicious were routed skip)
    if len(samples) < 2:
        for r in results:
            if r not in samples:
                samples.append(r)
            if len(samples) >= 3:
                break

    lines = []
    for r in samples:
        ctx: StructuralContext = r["context"]
        lines.append(f"\n--- {r['package']} [{r['label'].upper()}] ---")
        lines.append(ctx.to_llm_prompt_block())

    output = "\n".join(lines)
    print(output)
    logger.info(output)
    return output


# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------


def print_detailed_summary(results: list):
    print("\n" + "=" * 60)
    print("DETAILED ANALYSIS SUMMARY")
    print("=" * 60)

    mal = [r for r in results if r["label"] == "malicious"]
    ben = [r for r in results if r["label"] == "benign"]

    if not mal or not ben:
        print("⚠️  Not enough data for summary.")
        return

    def routing_counts(subset):
        counts = {"skip": 0, "review": 0, "flag": 0}
        for r in subset:
            counts[r["context"].routing] += 1
        return counts

    mal_counts = routing_counts(mal)
    ben_counts = routing_counts(ben)

    # --- Malicious ---
    print("\n🔴 MALICIOUS PACKAGES:")
    print(f"   Total analyzed   : {len(mal)}")
    print(
        f"   Routed FLAG      : {mal_counts['flag']}  ({mal_counts['flag']/len(mal)*100:.1f}%)"
    )
    print(
        f"   Routed REVIEW    : {mal_counts['review']}  ({mal_counts['review']/len(mal)*100:.1f}%)"
    )
    print(
        f"   Routed SKIP      : {mal_counts['skip']}  ({mal_counts['skip']/len(mal)*100:.1f}%)  ← FALSE NEGATIVES"
    )
    avg_mal_score = sum(r["context"].risk_score for r in mal) / len(mal)
    print(f"   Avg risk score   : {avg_mal_score:.3f}")

    # --- Benign ---
    print("\n🟢 BENIGN PACKAGES:")
    print(f"   Total analyzed   : {len(ben)}")
    print(
        f"   Routed SKIP      : {ben_counts['skip']}  ({ben_counts['skip']/len(ben)*100:.1f}%)"
    )
    print(
        f"   Routed REVIEW    : {ben_counts['review']}  ({ben_counts['review']/len(ben)*100:.1f}%)"
    )
    print(
        f"   Routed FLAG      : {ben_counts['flag']}  ({ben_counts['flag']/len(ben)*100:.1f}%)  ← FALSE POSITIVES"
    )
    avg_ben_score = sum(r["context"].risk_score for r in ben) / len(ben)
    print(f"   Avg risk score   : {avg_ben_score:.3f}")

    # --- Routing breakdown table ---
    print("\n📊 ROUTING BREAKDOWN:")
    print(f"   {'':20} {'MAL':>8} {'BEN':>8}")
    print(f"   {'FLAG':20} {mal_counts['flag']:>8} {ben_counts['flag']:>8}")
    print(f"   {'REVIEW':20} {mal_counts['review']:>8} {ben_counts['review']:>8}")
    print(f"   {'SKIP':20} {mal_counts['skip']:>8} {ben_counts['skip']:>8}")

    # --- Key metrics ---
    caught = mal_counts["flag"] + mal_counts["review"]
    recall = caught / len(mal)
    fp = ben_counts["flag"] + ben_counts["review"]
    fpr = fp / len(ben)
    total_flagged = mal_counts["flag"] + ben_counts["flag"]
    precision = mal_counts["flag"] / total_flagged if total_flagged else 0.0

    print("\n🎯 KEY METRICS:")
    print(f"   Recall (mal caught)      : {recall*100:.1f}%  ({caught}/{len(mal)})")
    print(f"   False Positive Rate      : {fpr*100:.1f}%  ({fp}/{len(ben)})")
    print(
        f"   Precision (FLAG only)    : {precision*100:.1f}%  ({mal_counts['flag']}/{total_flagged})"
    )

    # --- Cases to investigate ---
    print("\n🔍 CASES TO INVESTIGATE:")

    false_negatives = [r for r in mal if r["context"].routing == "skip"]
    if false_negatives:
        print(
            f"\n  False Negatives - malicious packages routed SKIP ({len(false_negatives)}):"
        )
        for r in false_negatives:
            print(
                f"    - {r['package']} v{r['version']}  (score={r['context'].risk_score:.2f})"
            )
    else:
        print("\n  No false negatives ✅")

    false_positives = [r for r in ben if r["context"].routing == "flag"]
    if false_positives:
        print(
            f"\n  False Positives - benign packages routed FLAG ({len(false_positives)}):"
        )
        for r in false_positives:
            ctx = r["context"]
            print(f"    - {r['package']} v{r['version']}  (score={ctx.risk_score:.2f})")
            for s in ctx.confirmed_signals[:2]:
                print(f"        [!] {s[:80]}")
    else:
        print("\n  No false positives ✅")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    print("=" * 60)
    print("STRUCTURAL ANALYSIS TEST - Full Pipeline")
    print("=" * 60)

    NUM_PACKAGES = 20

    try:
        loader = DatasetLoader(
            source_dir="./dataset", extract_dir="./extracted_packages"
        )

        print(f"\n📦 Loading {NUM_PACKAGES} packages...")
        packages = loader.load_packages(
            use_cache=False, limit=NUM_PACKAGES, balanced_experiment_test_only=True
        )

        if not packages:
            print("❌ No packages loaded!")
            return 1

        mal_count = sum(1 for p in packages if p.label == "malicious")
        ben_count = sum(1 for p in packages if p.label == "benign")
        print(
            f"✅ Loaded {len(packages)} packages: {mal_count} malicious / {ben_count} benign"
        )

        print("\nPackage list:")
        for i, pkg in enumerate(packages, 1):
            label_emoji = "🔴" if pkg.label == "malicious" else "🟢"
            print(
                f"   {i}. {label_emoji} {pkg.package_name} v{pkg.version} [{pkg.label}]"
            )

    except Exception as e:
        print(f"❌ Error loading packages: {e}")
        import traceback

        traceback.print_exc()
        return 1

    results = run_structural_analysis(packages)
    for pkg in packages[:3]:
        print(f"{pkg.package_name}:")
        print(f"  entry_point_code: {bool(pkg.entry_point_code)}")
        print(f"  preview: {(pkg.entry_point_code or '')[:100]}")

    if not results:
        print("❌ No results to summarize.")
        return 1

    generate_llm_context(results)
    print_detailed_summary(results)

    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)

    total_flagged = sum(1 for r in results if r["context"].routing == "flag")
    total_review = sum(1 for r in results if r["context"].routing == "review")
    total_skip = sum(1 for r in results if r["context"].routing == "skip")

    print(f"  Packages analyzed : {len(results)}")
    print(f"  🚨 FLAG           : {total_flagged}")
    print(f"  ⚠️  REVIEW         : {total_review}")
    print(f"  ✅ SKIP            : {total_skip}")

    print("\n✅ Structural Analysis Pipeline completed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
