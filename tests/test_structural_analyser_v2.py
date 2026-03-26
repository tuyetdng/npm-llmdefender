"""
STRUCTURAL ANALYSIS TEST (MALICIOUS + BENIGN)
Full pipeline: Layer 1 + Layer 2 + SignalAggregator → StructuralContext

Changes from v1:
- run_structural_analysis(): log layer1_count + layer2_count + sources_analyzed
  per package (requires running Layer 1 and Layer 2 separately before aggregating,
  OR reading from aggregator internals — we use a lightweight approach: run
  SignalAggregator normally, then read its internal layer breakdown via a patched
  _collect_findings that returns tagged findings).
- generate_llm_context(): print FULL to_llm_prompt_block() output (not truncated),
  now also samples 1 SKIP package to show what LLM sees for clean packages.
- print_detailed_summary(): add source coverage stats (how many packages had
  JS source available for Layer 2), signal breakdown by layer.
- main(): remove debug block (entry_point_code preview), use_cache=True to
  avoid re-extracting on repeated runs.
- CSVLoggerConfig.log_structural_analyser_context(): updated to log new fields.
"""

import sys
from pathlib import Path
from typing import List, Dict, Tuple

from config.csv_logger_config import CSVLoggerConfig
from logs.logging_config import setup_logger

logger = setup_logger()
csv_logger = CSVLoggerConfig(output_dir="./experiment_results", prompt_version="v2.0")

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from analysis.structural_analysis import StructuralAnalyzer, StructuralAnalysisFinding
    from analysis.ast_analyzer import ASTAnalyzer
    from enums.behavior_category import BehaviorCategory
    from enums.severity import Severity

    print("✅ Imports successful")
    logger.info("Successfully imported modules for structural analysis test")
except ImportError as e:
    print(f"❌ Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Helper: run layers separately to get per-layer counts + source info
# ---------------------------------------------------------------------------

def _run_with_layer_info(package: PackageProfile) -> Tuple[StructuralContext, Dict]:
    """
    Run full pipeline AND collect per-layer metadata for logging/debugging.

    Returns:
        (context, layer_info) where layer_info = {
            "layer1_count": int,
            "layer2_count": int,
            "sources_analyzed": str,   # e.g. "entry_point,preinstall.js"
            "has_js_source": bool,
        }
    """
    # Layer 1
    layer1_findings: List[StructuralAnalysisFinding] = StructuralAnalyzer(package).run_all()

    # Layer 2 — run separately so we can inspect what was analyzed
    ast_analyzer = ASTAnalyzer(package)
    layer2_findings: List[StructuralAnalysisFinding] = ast_analyzer.run_all()

    # Determine which sources were analyzed by Layer 2
    install_files = getattr(package, "install_script_files", {}) or {}
    sources = []
    if install_files:
        sources.extend(install_files.keys())
    if package.entry_point_code and package.entry_point_code.strip():
        sources.append("entry_point")
    sources_str = ",".join(sources) if sources else "none"

    has_js_source = bool(sources)

    # Build context via aggregator (uses its own internal run — consistent with prod)
    context = SignalAggregator(package).aggregate()

    layer_info = {
        "layer1_count": len(layer1_findings),
        "layer2_count": len(layer2_findings),
        "sources_analyzed": sources_str,
        "has_js_source": has_js_source,
    }

    return context, layer_info


# ---------------------------------------------------------------------------
# Core analysis
# ---------------------------------------------------------------------------

def run_structural_analysis(packages: list) -> list:
    print("=" * 60)
    print("RUNNING STRUCTURAL ANALYSIS — Layer 1 + Layer 2 + Aggregator")
    print("=" * 60)

    mal_packages = [p for p in packages if p.label == "malicious"]
    ben_packages = [p for p in packages if p.label == "benign"]
    print(f"\nAnalyzing {len(mal_packages)} malicious + {len(ben_packages)} benign packages...")
    print(f"Total: {len(packages)} packages\n")

    all_results = []

    for i, package in enumerate(packages, 1):
        label_emoji = "🔴" if package.label == "malicious" else "🟢"
        print(f"\n{label_emoji} Package {i}/{len(packages)}: {package.package_name} [{package.label.upper()}]")
        print("-" * 50)

        try:
            context, layer_info = _run_with_layer_info(package)
        except Exception as e:
            logger.error(f"Error analyzing {package.package_name}: {e}")
            print(f"  ❌ Error: {e}")
            import traceback; traceback.print_exc()
            continue

        # Log to CSV (extended schema)
        csv_logger.log_structural_analyser_context(
            package_name=package.package_name,
            version=package.version,
            label=package.label,
            context=context,
            layer1_count=layer_info["layer1_count"],
            layer2_count=layer_info["layer2_count"],
            sources_analyzed=layer_info["sources_analyzed"],
            has_js_source=layer_info["has_js_source"],
        )

        # Print routing decision
        routing_icon = {"skip": "✅", "review": "⚠️", "flag": "🚨"}.get(context.routing, "?")
        print(f"  {routing_icon} Routing     : {context.routing.upper()}")
        print(f"     Risk Score : {context.risk_score:.2f}")
        print(f"     Confidence : {context.confidence:.2f}")
        print(f"     Primary    : {context.primary_category.value if context.primary_category else 'none'}")
        print(f"     L1 signals : {layer_info['layer1_count']}  |  L2 signals: {layer_info['layer2_count']}")
        print(f"     JS sources : {layer_info['sources_analyzed']}")

        if context.confirmed_signals:
            print(f"\n  Confirmed signals ({len(context.confirmed_signals)}):")
            for s in context.confirmed_signals:
                # Print full evidence (3-line format), indented
                indented = "\n      ".join(s.strip().splitlines())
                print(f"    [!] {indented}")

        if context.supporting_signals:
            print(f"\n  Supporting signals ({len(context.supporting_signals)}):")
            for s in context.supporting_signals:
                first_line = s.strip().splitlines()[0]  # just Signal line
                print(f"    [-] {first_line}")

        if context.noise_filtered > 0:
            print(f"\n  ({context.noise_filtered} low-confidence signal(s) filtered)")

        all_results.append({
            "package": package.package_name,
            "version": package.version,
            "label": package.label,
            "context": context,
            "layer_info": layer_info,
        })

        print(f"\n✓ Done: {package.package_name}")

    return all_results


# ---------------------------------------------------------------------------
# LLM context preview
# ---------------------------------------------------------------------------

def generate_llm_context(results: list) -> str:
    """
    Print to_llm_prompt_block() for 3 representative packages:
    1. Malicious with highest risk score (best case for our detector)
    2. Malicious routed SKIP (worst case — what LLM gets for false negatives)
    3. Benign routed SKIP (what LLM gets for clean packages)

    This shows the full range of context quality the LLM will actually receive.
    """
    print("\n" + "=" * 60)
    print("LLM CONTEXT SAMPLE — what the semantic analyzer receives")
    print("=" * 60)

    samples: list = []

    # 1. Best detected malicious (highest score)
    mal_flagged = [r for r in results if r["label"] == "malicious" and r["context"].routing == "flag"]
    if mal_flagged:
        best = max(mal_flagged, key=lambda r: r["context"].risk_score)
        samples.append(("BEST DETECTION (malicious, FLAG)", best))

    # 2. Malicious missed (SKIP) — shows LLM what it gets for false negatives
    mal_skipped = [r for r in results if r["label"] == "malicious" and r["context"].routing == "skip"]
    if mal_skipped:
        samples.append(("MISSED MALICIOUS (malicious, SKIP) — LLM must catch this alone", mal_skipped[0]))

    # 3. Clean benign (SKIP) — shows LLM context for normal packages
    ben_skipped = [r for r in results if r["label"] == "benign" and r["context"].routing == "skip"]
    if ben_skipped:
        samples.append(("CLEAN PACKAGE (benign, SKIP)", ben_skipped[0]))

    # Fallback if categories not populated
    if not samples:
        for r in results[:3]:
            samples.append((f"{r['label'].upper()}", r))

    output_lines = []
    for title, r in samples:
        ctx: StructuralContext = r["context"]
        output_lines.append(f"\n{'─'*60}")
        output_lines.append(f"  {title}")
        output_lines.append(f"  Package: {r['package']} v{r['version']}")
        output_lines.append(f"{'─'*60}")
        # Full block — no truncation, this is exactly what LLM receives
        output_lines.append(ctx.to_llm_prompt_block())

    output = "\n".join(output_lines)
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
    print(f"   Routed FLAG      : {mal_counts['flag']}  ({mal_counts['flag']/len(mal)*100:.1f}%)")
    print(f"   Routed REVIEW    : {mal_counts['review']}  ({mal_counts['review']/len(mal)*100:.1f}%)")
    print(f"   Routed SKIP      : {mal_counts['skip']}  ({mal_counts['skip']/len(mal)*100:.1f}%)  ← FALSE NEGATIVES")
    avg_mal_score = sum(r["context"].risk_score for r in mal) / len(mal)
    print(f"   Avg risk score   : {avg_mal_score:.3f}")

    # --- Benign ---
    print("\n🟢 BENIGN PACKAGES:")
    print(f"   Total analyzed   : {len(ben)}")
    print(f"   Routed SKIP      : {ben_counts['skip']}  ({ben_counts['skip']/len(ben)*100:.1f}%)")
    print(f"   Routed REVIEW    : {ben_counts['review']}  ({ben_counts['review']/len(ben)*100:.1f}%)")
    print(f"   Routed FLAG      : {ben_counts['flag']}  ({ben_counts['flag']/len(ben)*100:.1f}%)  ← FALSE POSITIVES")
    avg_ben_score = sum(r["context"].risk_score for r in ben) / len(ben)
    print(f"   Avg risk score   : {avg_ben_score:.3f}")

    # --- Source coverage ---
    print("\n📁 SOURCE COVERAGE (Layer 2 effectiveness):")
    all_results = mal + ben
    has_source = [r for r in all_results if r["layer_info"]["has_js_source"]]
    no_source  = [r for r in all_results if not r["layer_info"]["has_js_source"]]
    mal_no_src = [r for r in mal if not r["layer_info"]["has_js_source"]]
    print(f"   Has JS source    : {len(has_source)}/{len(all_results)}  ({len(has_source)/len(all_results)*100:.0f}%)")
    print(f"   No JS source     : {len(no_source)}/{len(all_results)}  (Layer 2 skipped)")
    if mal_no_src:
        print(f"   ⚠️  Malicious with no source: {len(mal_no_src)} — these rely on Layer 1 only:")
        for r in mal_no_src:
            print(f"      - {r['package']} v{r['version']}")

    # --- Signal layer breakdown ---
    print("\n📊 SIGNAL BREAKDOWN BY LAYER:")
    total_l1 = sum(r["layer_info"]["layer1_count"] for r in all_results)
    total_l2 = sum(r["layer_info"]["layer2_count"] for r in all_results)
    print(f"   Layer 1 (metadata) signals total : {total_l1}")
    print(f"   Layer 2 (AST)      signals total : {total_l2}")

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
    print(f"   Precision (FLAG only)    : {precision*100:.1f}%  ({mal_counts['flag']}/{total_flagged})")

    # --- Cases to investigate ---
    print("\n🔍 CASES TO INVESTIGATE:")

    false_negatives = [r for r in mal if r["context"].routing == "skip"]
    if false_negatives:
        print(f"\n  False Negatives — malicious SKIP ({len(false_negatives)}):")
        for r in false_negatives:
            li = r["layer_info"]
            print(f"    - {r['package']} v{r['version']}")
            print(f"      score={r['context'].risk_score:.2f} | "
                  f"L1={li['layer1_count']} L2={li['layer2_count']} | "
                  f"sources={li['sources_analyzed']}")
    else:
        print("\n  No false negatives ✅")

    false_positives = [r for r in ben if r["context"].routing == "flag"]
    if false_positives:
        print(f"\n  False Positives — benign FLAG ({len(false_positives)}):")
        for r in false_positives:
            ctx = r["context"]
            print(f"    - {r['package']} v{r['version']}  (score={ctx.risk_score:.2f})")
            for s in ctx.confirmed_signals[:2]:
                first_line = s.strip().splitlines()[0]
                print(f"        [!] {first_line}")
    else:
        print("\n  No false positives ✅")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("STRUCTURAL ANALYSIS TEST — Full Pipeline")
    print("=" * 60)

    NUM_PACKAGES = 246

    try:
        loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages",
        )

        print(f"\n📦 Loading {NUM_PACKAGES} packages...")
        packages = loader.load_packages(
            use_cache=False,
            force_refresh=False,        # ← không force, để loader tự xử lý
            limit=NUM_PACKAGES,
            balanced_experiment_test_only=False,  # ← giữ False như test cũ
        )

        if not packages:
            print("❌ No packages loaded!")
            return 1

        mal_count = sum(1 for p in packages if p.label == "malicious")
        ben_count = sum(1 for p in packages if p.label == "benign")
        print(f"✅ Loaded {len(packages)} packages: {mal_count} malicious / {ben_count} benign")

        print("\nPackage list:")
        for i, pkg in enumerate(packages, 1):
            label_emoji = "🔴" if pkg.label == "malicious" else "🟢"
            has_src = bool(pkg.entry_point_code or getattr(pkg, "install_script_files", {}))
            src_tag = "📄" if has_src else "📦"
            print(f"   {i:2}. {label_emoji} {src_tag} {pkg.package_name} v{pkg.version} [{pkg.label}]")

        print("\n  📄 = has JS source for Layer 2  |  📦 = metadata only (Layer 1)\n")

    except Exception as e:
        print(f"❌ Error loading packages: {e}")
        import traceback
        traceback.print_exc()
        return 1

    results = run_structural_analysis(packages)

    if not results:
        print("❌ No results to summarize.")
        return 1

    generate_llm_context(results)
    print_detailed_summary(results)

    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)

    total_flagged = sum(1 for r in results if r["context"].routing == "flag")
    total_review  = sum(1 for r in results if r["context"].routing == "review")
    total_skip    = sum(1 for r in results if r["context"].routing == "skip")

    print(f"  Packages analyzed : {len(results)}")
    print(f"  🚨 FLAG           : {total_flagged}")
    print(f"  ⚠️  REVIEW         : {total_review}")
    print(f"  ✅ SKIP            : {total_skip}")
    print("\n✅ Structural Analysis Pipeline completed")
    return 0


if __name__ == "__main__":
    sys.exit(main())