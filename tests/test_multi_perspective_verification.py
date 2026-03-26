"""
MULTI-PERSPECTIVE VERIFICATION TEST
Stage 2: Attack Chain Reconstruction + Context Legitimacy

Input  : semantic_analysis.csv (output from Stage 1)
         + PackageProfile (for description/readme — legitimacy check)
Output : verification_analysis.csv

Pipeline:
    Read semantic CSV
        → filter rows where parse_success=True AND total_behaviors > 0
        → load matching PackageProfile from cache
        → rebuild StructuralContext (lightweight — just for anchor, no re-inference)
        → VerificationPromptAnalysis.build_prompt()
        → DeepSeekAdapter.generate()
        → parse + log
"""

import sys
import csv
import json
import time
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

from config.csv_logger_config import CSVLoggerConfig
from logs.logging_config import setup_logger

logger = setup_logger()
csv_logger = CSVLoggerConfig(
    output_dir="./experiment_results",
    prompt_version="verification_v1.0",
)

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from analysis.structural_analysis import StructuralAnalyzer
    from analysis.ast_analyzer import ASTAnalyzer
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter

    print("✅ Imports successful")
    logger.info("Successfully imported modules for verification test")
except ImportError as e:
    print(f"❌ Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Read semantic CSV
# ---------------------------------------------------------------------------

def load_semantic_results(csv_path: str) -> List[Dict[str, Any]]:
    """
    Load semantic_analysis.csv and filter to rows worth verifying:
        - parse_success == True
        - total_behaviors > 0

    Returns list of dicts with keys:
        package_name, version, label, routing, structural_risk_score,
        parsed_json, analyst_note
    """
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"Semantic CSV not found: {csv_path}")

    results = []
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Filter: only rows with successful parse AND detected behaviors
            parse_success = row.get("parse_success", "").strip().lower() == "true"
            total_behaviors = int(row.get("total_behaviors", 0) or 0)

            if not parse_success or total_behaviors == 0:
                continue

            # Parse the JSON string back to dict
            parsed_json_str = row.get("parsed_json", "{}")
            try:
                parsed_json = json.loads(parsed_json_str)
            except json.JSONDecodeError:
                logger.warning(f"Could not parse parsed_json for {row.get('package_name')}")
                continue

            results.append({
                "package_name":         row["package_name"],
                "version":              row["version"],
                "label":                row.get("label", "unknown"),
                "routing":              row.get("routing", "skip"),
                "structural_risk_score": float(row.get("structural_risk_score", 0.0) or 0.0),
                "parsed_json":          parsed_json,
                "analyst_note":         row.get("analyst_note", "").strip() or None,
                "behavior_categories":  row.get("behavior_categories", ""),
            })

    return results


# ---------------------------------------------------------------------------
# Rebuild StructuralContext from PackageProfile
# (lightweight — avoids re-running full pipeline, just re-aggregates)
# ---------------------------------------------------------------------------

def _rebuild_structural_context(package: PackageProfile) -> StructuralContext:
    """
    Re-run structural pipeline to get StructuralContext.
    This is fast (<1s) since Layer 2 is typically skipped without tree-sitter.
    Needed because StructuralContext is not serialized in semantic CSV.
    """
    return SignalAggregator(package).aggregate()


# ---------------------------------------------------------------------------
# JSON parsing helpers (same as semantic test)
# ---------------------------------------------------------------------------

def _safe_repair_json(text: str) -> Optional[Dict[str, Any]]:
    res = text
    res = re.sub(r',\s*}', '}', res)
    res = re.sub(r',\s*]', ']', res)
    res = re.sub(r'(?<!["\'])\b(\w+)\s*:', r'"\1":', res)
    res = re.sub(r"'(\w+)'\s*:", r'"\1":', res)
    res = re.sub(r":\s*'([^']*?)'\s*([,}])", r': "\1"\2', res)
    res = re.sub(r'//.*?$', '', res, flags=re.MULTILINE)
    res = re.sub(r'/\*.*?\*/', '', res, flags=re.DOTALL)
    try:
        return json.loads(res)
    except json.JSONDecodeError:
        return None


def _extract_first_json(text: str) -> Optional[Dict[str, Any]]:
    start = text.find('{')
    if start == -1:
        return None
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                candidate = text[start:i + 1]
                try:
                    return json.loads(candidate)
                except json.JSONDecodeError:
                    return _safe_repair_json(candidate)
    return None


def _extract_from_markdown(text: str) -> Optional[Dict[str, Any]]:
    patterns = [
        r"```json\s*(\{[\s\S]*?\})\s*```",
        r"```\s*(\{[\s\S]*?\})\s*```",
    ]
    for pattern in patterns:
        for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
            cleaned = match.group(1).strip()
            try:
                return json.loads(cleaned)
            except json.JSONDecodeError:
                repaired = _safe_repair_json(cleaned)
                if repaired:
                    return repaired
    return None


def parse_verification_output(raw: str) -> Tuple[Optional[Dict], bool]:
    parsed = _extract_first_json(raw)
    if parsed:
        return parsed, True
    parsed = _extract_from_markdown(raw)
    if parsed:
        return parsed, True
    return None, False


def _classify_output(raw: str, parsed: Optional[Dict], parse_success: bool) -> str:
    raw_lower = raw.lower()
    refusal_signals = ["i'm sorry", "i cannot", "i can't assist", "i'm not able", "as an ai"]
    if any(s in raw_lower for s in refusal_signals):
        return "model_refusal"
    if parse_success and parsed:
        return "success"
    analysis_keywords = ["malicious", "chain", "legitimacy", "verdict", "benign", "suspicious"]
    if sum(1 for kw in analysis_keywords if kw in raw_lower) >= 2:
        return "schema_violation"
    return "parse_error"


# ---------------------------------------------------------------------------
# Verification runner
# ---------------------------------------------------------------------------

def run_verification(
    semantic_rows: List[Dict[str, Any]],
    packages_by_key: Dict[str, PackageProfile],
    adapter: DeepSeekAdapter,
) -> List[Dict]:
    """
    packages_by_key: dict keyed by "package_name@version" → PackageProfile
    """
    print("=" * 60)
    print("RUNNING VERIFICATION — Attack Chain Reconstruction")
    print("=" * 60)
    print(f"\nVerifying {len(semantic_rows)} packages with detected behaviors...\n")

    all_results = []

    for i, row in enumerate(semantic_rows, 1):
        pkg_name = row["package_name"]
        version  = row["version"]
        label    = row["label"]
        key      = f"{pkg_name}@{version}"

        label_emoji = "🔴" if label == "malicious" else "🟢"
        print(f"\n{label_emoji} [{i}/{len(semantic_rows)}] {pkg_name} v{version}")
        print("-" * 50)

        # --- Step 1: Get PackageProfile ---
        package = packages_by_key.get(key)
        if package is None:
            # Try matching by name only (version mismatch edge case)
            package = next(
                (p for p in packages_by_key.values() if p.package_name == pkg_name),
                None,
            )
        if package is None:
            print(f"  ⚠️  PackageProfile not found for {key} — skipping")
            logger.warning(f"PackageProfile not found: {key}")
            continue

        # --- Step 2: Rebuild StructuralContext ---
        try:
            context = _rebuild_structural_context(package)
        except Exception as e:
            logger.error(f"StructuralContext rebuild failed for {key}: {e}")
            print(f"  ❌ Structural error: {e}")
            continue

        # Print what we're working with
        behaviors = row["parsed_json"].get("behaviors", [])
        cats = [b.get("category", "?") for b in behaviors]
        print(f"  Behaviors    : {len(behaviors)} — {', '.join(cats)}")
        print(f"  Routing      : {row['routing'].upper()} "
              f"(score={row['structural_risk_score']:.2f})")
        if row["analyst_note"]:
            print(f"  Analyst note : {row['analyst_note'][:80]}...")

        # --- Step 3: Build verification prompt ---
        try:
            verifier = VerificationPromptAnalysis(
                package_profile=package,
                structural_context=context,
                semantic_findings=row["parsed_json"],
                analyst_note=row["analyst_note"],
            )
            prompt_dict = verifier.build_prompt()
            full_prompt = (
                prompt_dict["system"] + "\n\n"
                + prompt_dict["user"] + "\n\n"
                + prompt_dict["instructions"]
            )
            print(f"  Prompt       : ~{len(full_prompt) // 4} tokens (est.)")
        except Exception as e:
            logger.error(f"Prompt build failed for {key}: {e}")
            print(f"  ❌ Prompt error: {e}")
            continue

        # --- Step 4: LLM inference ---
        t0 = time.time()
        try:
            raw_output = adapter.generate(full_prompt)
        except Exception as e:
            logger.error(f"Generation failed for {key}: {e}")
            raw_output = f"INFERENCE_ERROR: {e}"
        elapsed = time.time() - t0
        print(f"  ⏱  Inference : {elapsed:.1f}s")

        # --- Step 5: Parse output ---
        parsed, parse_success = parse_verification_output(raw_output)
        output_type = _classify_output(raw_output, parsed, parse_success)

        # --- Step 6: Print verdict ---
        if output_type == "success" and parsed:
            final = parsed.get("final_verification", {})
            verdict    = final.get("verdict", "?")
            conf       = final.get("calibrated_confidence", 0)
            chain      = parsed.get("chain_analysis", {})
            legitimacy = parsed.get("legitimacy_check", {})

            verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(verdict, "?")
            print(f"  {verdict_icon} Verdict      : {verdict} (conf={conf:.2f})")
            print(f"     Chain score : {chain.get('chain_score', '?'):.2f}  "
                  f"| is_coherent: {chain.get('is_coherent_chain', '?')}")
            print(f"     Legitimacy  : {legitimacy.get('legitimacy_score', '?'):.2f}  "
                  f"| is_justified: {legitimacy.get('is_justified', '?')}")
            if chain.get("chain_narrative"):
                print(f"     Chain       : {chain['chain_narrative'][:100]}")

            # Log success
            csv_logger.log_verification_analysis(
                package_name=pkg_name,
                version=version,
                parsed_json=parsed,
                raw_response=raw_output,
            )
        else:
            print(f"  ❌ Output type: {output_type}")
            print(f"     Raw (200): {raw_output[:200]}")
            csv_logger.log_model_failure(
                package_name=pkg_name,
                version=version,
                response=raw_output,
                failure_type=f"verification_{output_type}",
            )

        all_results.append({
            "package":      pkg_name,
            "version":      version,
            "label":        label,
            "parsed":       parsed,
            "output_type":  output_type,
            "elapsed":      elapsed,
            "routing":      row["routing"],
            "analyst_note": row["analyst_note"],
        })

        print(f"✓ Done: {pkg_name}")

    return all_results


# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

def print_verification_summary(results: List[Dict]):
    print("\n" + "=" * 60)
    print("VERIFICATION SUMMARY")
    print("=" * 60)

    total   = len(results)
    mal     = [r for r in results if r["label"] == "malicious"]
    ben     = [r for r in results if r["label"] == "benign"]
    success = [r for r in results if r["output_type"] == "success"]

    print(f"\n📊 Total verified    : {total}")
    print(f"   Parse success     : {len(success)}/{total}")

    avg_time = sum(r["elapsed"] for r in results) / total if total else 0
    print(f"⏱  Avg inference     : {avg_time:.1f}s/package")

    # Verdict breakdown
    verdicts: Dict[str, int] = {"MALICIOUS": 0, "SUSPICIOUS": 0, "BENIGN": 0}
    for r in success:
        if r["parsed"]:
            v = r["parsed"].get("final_verification", {}).get("verdict", "")
            if v in verdicts:
                verdicts[v] += 1

    print(f"\n📊 Verdict breakdown (success only):")
    for verdict, count in verdicts.items():
        icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}[verdict]
        bar = "█" * count
        print(f"   {icon} {verdict:12} {count:3}  {bar}")

    # Correctness vs label (malicious only)
    print(f"\n🔴 MALICIOUS ({len(mal)} packages sent to verification):")
    mal_success = [r for r in mal if r["output_type"] == "success" and r["parsed"]]
    mal_correct = [
        r for r in mal_success
        if r["parsed"].get("final_verification", {}).get("verdict") in ("MALICIOUS", "SUSPICIOUS")
    ]
    mal_fp = [
        r for r in mal_success
        if r["parsed"].get("final_verification", {}).get("verdict") == "BENIGN"
    ]
    print(f"   Confirmed (MAL/SUS) : {len(mal_correct)}/{len(mal_success)}")
    if mal_fp:
        print(f"   Downgraded to BENIGN: {len(mal_fp)}")
        for r in mal_fp:
            conf = r["parsed"].get("final_verification", {}).get("calibrated_confidence", 0)
            print(f"      - {r['package']} v{r['version']} (conf={conf:.2f})")

    # False positive reduction (benign packages)
    if ben:
        print(f"\n🟢 BENIGN ({len(ben)} packages sent to verification):")
        ben_success = [r for r in ben if r["output_type"] == "success" and r["parsed"]]
        ben_benign = [
            r for r in ben_success
            if r["parsed"].get("final_verification", {}).get("verdict") == "BENIGN"
        ]
        ben_malicious = [
            r for r in ben_success
            if r["parsed"].get("final_verification", {}).get("verdict") in ("MALICIOUS", "SUSPICIOUS")
        ]
        print(f"   Correctly BENIGN    : {len(ben_benign)}/{len(ben_success)}")
        if ben_malicious:
            print(f"   Still flagged MAL/SUS: {len(ben_malicious)}")
            for r in ben_malicious:
                print(f"      - {r['package']} v{r['version']}")

    # Failures
    failures = [r for r in results if r["output_type"] != "success"]
    if failures:
        print(f"\n⚠️  Failures ({len(failures)}):")
        for r in failures:
            print(f"   [{r['output_type']}] {r['package']} v{r['version']}")
    else:
        print("\n✅ No failures")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("VERIFICATION TEST — Multi-Perspective Attack Chain")
    print("=" * 60)

    SEMANTIC_CSV = "./experiment_results/semantic_analysis.csv"
    MODEL_CONFIG = {
        "torch_dtype": "float16",
        "device_map": "auto",
        "max_new_tokens": 2048,   # verification output is shorter than semantic
        "do_sample": False,
    }

    # --- Step 1: Load semantic results from CSV ---
    print(f"\n📄 Loading semantic results from {SEMANTIC_CSV}...")
    try:
        semantic_rows = load_semantic_results(SEMANTIC_CSV)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return 1

    if not semantic_rows:
        print("❌ No rows with detected behaviors found in semantic CSV.")
        print("   Run test_semantic_prompt_analysis_v2.py first.")
        return 1

    mal_rows = [r for r in semantic_rows if r["label"] == "malicious"]
    ben_rows = [r for r in semantic_rows if r["label"] == "benign"]
    print(f"✅ Loaded {len(semantic_rows)} rows to verify: "
          f"{len(mal_rows)} malicious / {len(ben_rows)} benign")

    # --- Step 2: Load PackageProfiles (for description/readme) ---
    print("\n📦 Loading PackageProfiles for context...")
    try:
        loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages",
        )
        packages = loader.load_packages(
            use_cache=False,
            force_refresh=False,
            limit=None,
            balanced_experiment_test_only=False,
        )
        packages_by_key = {
            f"{p.package_name}@{p.version}": p for p in packages
        }
        print(f"✅ Loaded {len(packages)} packages into lookup")
    except Exception as e:
        print(f"❌ Error loading packages: {e}")
        import traceback; traceback.print_exc()
        return 1

    # --- Step 3: Load model ---
    print("\nLoading DeepSeek model...")
    adapter = DeepSeekAdapter(
        model_name="./models/deepseek-coder-6.7b-instruct",
        config=MODEL_CONFIG,
    )
    adapter.load_model()

    # --- Step 4: Run verification ---
    results = run_verification(semantic_rows, packages_by_key, adapter)

    if not results:
        print("❌ No results.")
        return 1

    print_verification_summary(results)

    print("\n" + "=" * 60)
    print("✅ Verification Pipeline completed")
    print(f"   Results → ./experiment_results/verification_analysis.csv")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())