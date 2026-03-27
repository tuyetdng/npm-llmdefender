"""
VERIFICATION TEST — Attack Chain Reconstruction
Stage 2: runs after semantic analysis.

Pipeline:
    Read experiment_results/semantic_output/*.json
        → filter: behaviors list non-empty
        → load matching PackageProfile (filtered subset)
        → rebuild StructuralContext (~0.1s, no LLM)
        → VerificationPromptAnalysis.build_prompt()
        → DeepSeekAdapter.generate()
        → parse + log to CSV + save JSON to verification_output/
"""

import sys
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
    prompt_version="verification_v2.0",
)

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter

    print("✅ Imports successful")
    logger.info("Successfully imported modules for verification test")
except ImportError as e:
    print(f"❌ Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Load semantic output JSONs
# ---------------------------------------------------------------------------

def load_semantic_results(semantic_dir: str) -> List[Dict[str, Any]]:
    """
    Load all JSON files from semantic_output/ and filter to packages
    that have at least 1 detected behavior.

    Each JSON file format (from SemanticPromptAnalysis.save_parsed_output):
        {
            "package_name": str,
            "version": str,
            "label": str,
            "behaviors": [...],
            "risk_vector": [...],
            "analysis_metadata": {
                "routing": str,
                "structural_risk_score": float,
                ...
            }
        }

    Returns rows with the same shape as before so run_verification() is unchanged.
    """
    dir_path = Path(semantic_dir)
    if not dir_path.exists():
        raise FileNotFoundError(f"Semantic output dir not found: {semantic_dir}")

    json_files = sorted(dir_path.glob("*.json"))
    if not json_files:
        raise FileNotFoundError(f"No JSON files found in {semantic_dir}")

    results = []
    skipped = 0

    for json_file in json_files:
        try:
            data = json.loads(json_file.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError) as e:
            logger.warning(f"Could not read {json_file.name}: {e}")
            skipped += 1
            continue

        behaviors = data.get("behaviors", [])
        if not behaviors:
            skipped += 1
            continue

        meta = data.get("analysis_metadata", {})

        results.append({
            "package_name":          data["package_name"],
            "version":               data["version"],
            "label":                 data.get("label", "unknown"),
            "routing":               meta.get("routing", "skip"),
            "structural_risk_score": float(meta.get("structural_risk_score", 0.0) or 0.0),
            "parsed_json":           {
                "behaviors":   behaviors,
                "risk_vector": data.get("risk_vector", []),
            },
            "analyst_note":          data.get("analyst_note", "") or None,
            "behavior_categories":   ";".join(
                sorted({b.get("category", "unknown") for b in behaviors})
            ),
        })

    logger.info(f"Loaded {len(results)} packages with behaviors, skipped {skipped}")
    return results


# ---------------------------------------------------------------------------
# Rebuild StructuralContext
# ---------------------------------------------------------------------------

def _rebuild_structural_context(package: PackageProfile) -> StructuralContext:
    return SignalAggregator(package).aggregate()


# ---------------------------------------------------------------------------
# JSON parsing helpers
# ---------------------------------------------------------------------------

def _safe_repair_json(text: str) -> Optional[Dict[str, Any]]:
    res = re.sub(r',\s*}', '}', text)
    res = re.sub(r',\s*]', ']', res)
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
    for pattern in [r"```json\s*(\{[\s\S]*?\})\s*```", r"```\s*(\{[\s\S]*?\})\s*```"]:
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
    if any(s in raw_lower for s in ["i'm sorry", "i cannot", "i can't assist", "i'm not able"]):
        return "model_refusal"
    if parse_success and parsed:
        return "success"
    if sum(1 for kw in ["malicious", "chain", "verdict", "benign", "stages"] if kw in raw_lower) >= 2:
        return "schema_violation"
    return "parse_error"


def _extract_chain(parsed: Dict) -> Dict:
    """Safely extract chain_analysis fields with defaults."""
    chain = parsed.get("chain_analysis", {})
    return {
        "chain_narrative": chain.get("chain_narrative", ""),
        "attack_vector":   chain.get("attack_vector", []),
        "chain_score":     float(chain.get("chain_score", 0.0)),
        "verdict":         chain.get("verdict", "BENIGN"),
        "confidence":      float(chain.get("confidence", 0.3)),
    }


def _extract_legitimacy(parsed: Dict) -> Dict:
    leg = parsed.get("legitimacy_check", {})
    return {
        "is_justified": bool(leg.get("is_justified", True)),
        "reasoning":    leg.get("reasoning", ""),
    }


# ---------------------------------------------------------------------------
# Main verification loop
# ---------------------------------------------------------------------------

def run_verification(
    semantic_rows: List[Dict[str, Any]],
    packages_by_key: Dict[str, PackageProfile],
    adapter: "DeepSeekAdapter",
) -> List[Dict]:
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

        # Step 1: PackageProfile
        package = packages_by_key.get(key) or next(
            (p for p in packages_by_key.values() if p.package_name == pkg_name), None
        )
        if package is None:
            print(f"  ⚠️  PackageProfile not found for {key} — skipping")
            logger.warning(f"PackageProfile not found: {key}")
            continue

        # Step 2: StructuralContext
        try:
            context = _rebuild_structural_context(package)
        except Exception as e:
            logger.error(f"StructuralContext rebuild failed for {key}: {e}")
            print(f"  ❌ Structural error: {e}")
            continue

        behaviors = row["parsed_json"].get("behaviors", [])
        cats = [b.get("category", "?") for b in behaviors]
        print(f"  Behaviors    : {len(behaviors)} — {', '.join(cats)}")
        print(f"  Routing      : {row['routing'].upper()} (score={row['structural_risk_score']:.2f})")
        if row["analyst_note"]:
            print(f"  Analyst note : {row['analyst_note'][:80]}")

        # Step 3: Build prompt
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

        # Step 4: LLM inference
        t0 = time.time()
        try:
            raw_output = adapter.generate(full_prompt)
        except Exception as e:
            logger.error(f"Generation failed for {key}: {e}")
            raw_output = f"INFERENCE_ERROR: {e}"
        elapsed = time.time() - t0
        print(f"  ⏱  Inference : {elapsed:.1f}s")

        # Step 5: Parse
        parsed, parse_success = parse_verification_output(raw_output)
        output_type = _classify_output(raw_output, parsed, parse_success)

        # Step 6: Log + print
        if output_type == "success" and parsed:
            chain      = _extract_chain(parsed)
            legitimacy = _extract_legitimacy(parsed)

            verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(chain["verdict"], "❓")
            print(f"  {verdict_icon} Verdict      : {chain['verdict']} (conf={chain['confidence']:.2f})")
            print(f"     Chain score : {chain['chain_score']:.2f}")
            print(f"     Justified   : {legitimacy['is_justified']} — {legitimacy['reasoning'][:80]}")
            if chain["chain_narrative"]:
                print(f"     Narrative   : {chain['chain_narrative'][:120]}")
            if chain["attack_vector"]:
                print(f"     IOCs        : {', '.join(str(v) for v in chain['attack_vector'][:5])}")

            # CSV log
            csv_logger.log_verification_analysis(
                package_name=pkg_name,
                version=version,
                label=label,
                routing=row["routing"],
                structural_risk_score=row["structural_risk_score"],
                chain=chain,
                legitimacy=legitimacy,
                raw_response=raw_output,
                parsed_json=parsed,
            )

            # JSON save
            try:
                verifier.save_verification_result(parsed_data=parsed, version_tag="verification_v2.0")
            except Exception as e:
                logger.warning(f"save_verification_result failed for {key}: {e}")

        else:
            print(f"  ❌ Output type: {output_type}")
            print(f"     Raw (200): {raw_output[:200]}")
            csv_logger.log_model_failure(
                package_name=pkg_name,
                version=version,
                response=raw_output,
                failure_type=f"verification_{output_type}",
            )
            chain      = {"chain_narrative": "", "attack_vector": [], "chain_score": 0.0, "verdict": "UNKNOWN", "confidence": 0.0}
            legitimacy = {"is_justified": True, "reasoning": ""}

        all_results.append({
            "package":        pkg_name,
            "version":        version,
            "label":          label,
            "parsed":         parsed,
            "chain":          chain,
            "legitimacy":     legitimacy,
            "output_type":    output_type,
            "elapsed":        elapsed,
            "routing":        row["routing"],
            "analyst_note":   row["analyst_note"],
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
    success = [r for r in results if r["output_type"] == "success"]
    mal     = [r for r in results if r["label"] == "malicious"]
    ben     = [r for r in results if r["label"] == "benign"]

    print(f"\n📊 Total verified    : {total}")
    print(f"   Parse success     : {len(success)}/{total}")
    avg_time = sum(r["elapsed"] for r in results) / total if total else 0
    print(f"⏱  Avg inference     : {avg_time:.1f}s/package")

    # Verdict breakdown
    verdicts: Dict[str, int] = {"MALICIOUS": 0, "SUSPICIOUS": 0, "BENIGN": 0, "UNKNOWN": 0}
    chain_scores = []
    for r in success:
        v = r["chain"].get("verdict", "UNKNOWN")
        verdicts[v] = verdicts.get(v, 0) + 1
        s = r["chain"].get("chain_score", 0.0)
        if s > 0:
            chain_scores.append(s)

    print(f"\n📊 Verdict breakdown (success={len(success)}):")
    icon_map = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢", "UNKNOWN": "❓"}
    for verdict, count in verdicts.items():
        if count > 0:
            bar = "█" * count
            print(f"   {icon_map.get(verdict, '?')} {verdict:12} {count:3}  {bar}")

    if chain_scores:
        avg_chain = sum(chain_scores) / len(chain_scores)
        print(f"\n🔗 Avg chain_score   : {avg_chain:.2f} (n={len(chain_scores)})")

    # Correctness — malicious packages
    print(f"\n🔴 MALICIOUS ({len(mal)} sent to verification):")
    mal_success = [r for r in mal if r["output_type"] == "success"]
    mal_correct = [r for r in mal_success if r["chain"].get("verdict") in ("MALICIOUS", "SUSPICIOUS")]
    mal_missed  = [r for r in mal_success if r["chain"].get("verdict") == "BENIGN"]
    print(f"   Confirmed (MAL/SUS) : {len(mal_correct)}/{len(mal_success)}")
    if mal_missed:
        print(f"   Downgraded to BENIGN: {len(mal_missed)}")
        for r in mal_missed:
            print(f"      - {r['package']} v{r['version']} (chain_score={r['chain'].get('chain_score', 0):.2f})")

    # False positives — benign packages
    if ben:
        print(f"\n🟢 BENIGN ({len(ben)} sent to verification):")
        ben_success = [r for r in ben if r["output_type"] == "success"]
        ben_ok  = [r for r in ben_success if r["chain"].get("verdict") == "BENIGN"]
        ben_fp  = [r for r in ben_success if r["chain"].get("verdict") in ("MALICIOUS", "SUSPICIOUS")]
        print(f"   Correctly BENIGN    : {len(ben_ok)}/{len(ben_success)}")
        if ben_fp:
            print(f"   Still flagged MAL/SUS: {len(ben_fp)}")
            for r in ben_fp:
                print(f"      - {r['package']} v{r['version']} (chain_score={r['chain'].get('chain_score', 0):.2f})")

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
    print("VERIFICATION TEST — Attack Chain Reconstruction")
    print("=" * 60)

    SEMANTIC_DIR = "./experiment_results/semantic_output"
    MODEL_CONFIG = {
        "torch_dtype": "float16",
        "device_map": "auto",
        "max_new_tokens": 1024,
        "do_sample": False,
    }

    # Step 1: Load semantic results
    print(f"\n📄 Loading semantic JSONs from {SEMANTIC_DIR}/")
    try:
        semantic_rows = load_semantic_results(SEMANTIC_DIR)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return 1

    if not semantic_rows:
        print("❌ No rows with detected behaviors found. Run semantic analysis first.")
        return 1

    mal_rows = [r for r in semantic_rows if r["label"] == "malicious"]
    ben_rows = [r for r in semantic_rows if r["label"] == "benign"]
    print(f"✅ {len(semantic_rows)} rows to verify: {len(mal_rows)} malicious / {len(ben_rows)} benign")

    # Step 2: Load PackageProfiles — only packages referenced in semantic CSV
    needed_keys  = {f"{r['package_name']}@{r['version']}" for r in semantic_rows}
    needed_names = {r["package_name"] for r in semantic_rows}
    print(f"\n📦 Loading PackageProfiles (need {len(needed_keys)} packages)...")
    try:
        loader = DatasetLoader(source_dir="./dataset", extract_dir="./extracted_packages")
        all_packages = loader.load_packages(
            use_cache=False, force_refresh=False, limit=None, balanced_experiment_test_only=False,
        )
        # Filter immediately — avoid keeping full dataset in memory during inference
        packages_by_key = {
            f"{p.package_name}@{p.version}": p
            for p in all_packages
            if f"{p.package_name}@{p.version}" in needed_keys
            or p.package_name in needed_names
        }
        print(f"✅ Matched {len(packages_by_key)}/{len(all_packages)} packages")
    except Exception as e:
        print(f"❌ Error loading packages: {e}")
        import traceback; traceback.print_exc()
        return 1

    # Step 3: Load model
    print("\nLoading DeepSeek model...")
    adapter = DeepSeekAdapter(
        model_name="./models/deepseek-coder-6.7b-instruct",
        config=MODEL_CONFIG,
    )
    adapter.load_model()

    # Step 4: Run
    results = run_verification(semantic_rows, packages_by_key, adapter)

    if not results:
        print("❌ No results.")
        return 1

    print_verification_summary(results)

    print("\n" + "=" * 60)
    print("✅ Verification completed")
    print(f"   Results → ./experiment_results/verification_analysis.csv")
    print(f"   JSON    → ./experiment_results/verification_output/")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())