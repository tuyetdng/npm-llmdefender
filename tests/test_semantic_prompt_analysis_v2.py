"""
SEMANTIC ANALYSIS TEST — v2
Full pipeline: Structural (Layer 1 + 2 + Aggregator) → SemanticPromptAnalysis → DeepSeekAdapter

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
csv_logger = CSVLoggerConfig(output_dir="./experiment_results", prompt_version="semantic_v2.0")

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from analysis.structural_analysis import StructuralAnalyzer, StructuralAnalysisFinding
    from analysis.ast_analyzer import ASTAnalyzer
    from models.prompts.templates.semantic_prompt_analysis import SemanticPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter

    print("Imports successful")
    logger.info("Successfully imported modules for semantic analysis test")
except ImportError as e:
    print(f"Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


# ---------------------------------------------------------------------------
# JSON extraction — returns (parsed_dict, end_position)
# end_position is used to extract analyst_note from text AFTER the JSON block
# ---------------------------------------------------------------------------

def _safe_repair_json(text: str) -> Optional[Dict[str, Any]]:
    """Attempt to repair common JSON formatting issues."""
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


def _extract_first_json(text: str) -> Tuple[Optional[Dict[str, Any]], int]:
    """
    Extract first complete JSON object by bracket matching.
    Returns (parsed_dict, end_position) where end_position is the index
    immediately after the closing } — used to find analyst_note prose after JSON.
    Returns (None, -1) if no valid JSON found.
    """
    start = text.find('{')
    if start == -1:
        return None, -1
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                candidate = text[start:i + 1]
                try:
                    return json.loads(candidate), i + 1
                except json.JSONDecodeError:
                    repaired = _safe_repair_json(candidate)
                    return repaired, i + 1
    return None, -1


def _extract_from_markdown(text: str) -> Tuple[Optional[Dict[str, Any]], int]:
    """
    Extract JSON from markdown code blocks.
    Returns (parsed_dict, end_position_in_original_text).
    """
    patterns = [
        r"```json\s*(\{[\s\S]*?\})\s*```",
        r"```(?:javascript|js|ts|typescript)\s*(\{[\s\S]*?\})\s*```",
        r"```\s*(\{[\s\S]*?\})\s*```",
    ]
    for pattern in patterns:
        for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
            cleaned = match.group(1).strip()
            try:
                return json.loads(cleaned), match.end()
            except json.JSONDecodeError:
                repaired = _safe_repair_json(cleaned)
                if repaired:
                    return repaired, match.end()
    return None, -1


def _extract_analyst_note(raw: str, json_end_pos: int) -> Optional[str]:
    """
    Extract model's free-form prose written AFTER the JSON block.
    This is the model's natural cross-behavior reasoning — valuable for
    attack chain reconstruction without polluting the JSON schema.

    Returns None if:
    - Nothing meaningful after JSON (just markdown artifacts)
    - Less than 30 chars (too short to be useful)
    - Appears to be a safety refusal
    """
    if json_end_pos <= 0:
        return None

    tail = raw[json_end_pos:].strip()

    # Remove trailing markdown fences
    tail = re.sub(r'^```+\w*\s*', '', tail).strip()
    tail = re.sub(r'```+\s*$', '', tail).strip()

    if len(tail) < 30:
        return None

    # Detect refusal patterns — don't capture as analyst note
    refusal_signals = [
        "i'm sorry", "i cannot", "i can't assist",
        "i'm not able", "i won't", "as an ai",
    ]
    if any(s in tail.lower() for s in refusal_signals):
        return None

    # Remove boilerplate openers that add no value
    boilerplate = [
        r'^please note[,.]?\s*',
        r'^note that[,.]?\s*',
        r'^this (analysis|response) (is|indicates|shows)\s*',
        r'^based on (the|this)\s*',
    ]
    for pat in boilerplate:
        tail = re.sub(pat, '', tail, flags=re.IGNORECASE).strip()

    return tail if len(tail) > 30 else None


def parse_llm_output(raw: str) -> Tuple[Optional[Dict], int]:
    """
    Extract JSON from raw LLM output.
    Returns (parsed_dict, end_pos).
    Priority: bracket-match → markdown block.
    end_pos is used downstream to extract analyst_note.
    """
    parsed, end_pos = _extract_first_json(raw)
    if parsed:
        return parsed, end_pos

    parsed, end_pos = _extract_from_markdown(raw)
    if parsed:
        return parsed, end_pos

    return None, -1


# ---------------------------------------------------------------------------
# Output classification
# ---------------------------------------------------------------------------

def _classify_output(
    raw: str,
    parsed: Optional[Dict],
    parse_success: bool,
) -> str:
    """
    Classify model output into one of 4 types:

    "success"          → JSON extracted, behaviors may be empty (clean package) or populated
    "schema_violation" → model wrote analysis prose but didn't follow JSON schema
                         (model understood the task, just didn't format correctly)
    "model_refusal"    → safety filter triggered
    "parse_error"      → no extractable JSON, no analysis prose either

    This classification determines WHERE to log:
      success          → semantic_analysis.csv
      everything else  → model_failures.csv
    """
    raw_lower = raw.lower()

    # Check refusal first — highest priority
    refusal_signals = [
        "i'm sorry", "i cannot", "i can't assist",
        "i'm not able", "i won't", "as an ai",
    ]
    if any(s in raw_lower for s in refusal_signals):
        return "model_refusal"

    # Successful parse
    if parse_success and parsed is not None:
        return "success"

    # Parse failed — check if model actually analyzed but violated schema
    analysis_keywords = [
        "malicious", "exfiltrat", "backdoor", "suspicious",
        "install hook", "risk vector", "confidence", "network request",
        "credential", "reverse shell", "obfuscat",
    ]
    has_analysis_prose = sum(
        1 for kw in analysis_keywords if kw in raw_lower
    ) >= 2  # require at least 2 keywords to avoid false positives

    return "schema_violation" if has_analysis_prose else "parse_error"


# ---------------------------------------------------------------------------
# Structural pipeline helper
# ---------------------------------------------------------------------------

def _run_structural(package: PackageProfile) -> Tuple[StructuralContext, Dict]:
    layer1_findings: List[StructuralAnalysisFinding] = StructuralAnalyzer(package).run_all()
    ast_analyzer = ASTAnalyzer(package)
    layer2_findings: List[StructuralAnalysisFinding] = ast_analyzer.run_all()

    install_files = getattr(package, "install_script_files", {}) or {}
    sources = list(install_files.keys())
    if package.entry_point_code and package.entry_point_code.strip():
        sources.append("entry_point")
    sources_str = ",".join(sources) if sources else "none"

    context = SignalAggregator(package).aggregate()

    return context, {
        "layer1_count": len(layer1_findings),
        "layer2_count": len(layer2_findings),
        "sources_analyzed": sources_str,
        "has_js_source": bool(sources),
    }


# ---------------------------------------------------------------------------
# Semantic analysis runner
# ---------------------------------------------------------------------------

def run_semantic_analysis(
    packages: List[PackageProfile],
    adapter: DeepSeekAdapter,
) -> List[Dict]:
    print("=" * 60)
    print("RUNNING SEMANTIC ANALYSIS — Structural → LLM")
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

        # --- Step 1: Structural pipeline ---
        try:
            context, layer_info = _run_structural(package)
        except Exception as e:
            logger.error(f"Structural analysis failed for {package.package_name}: {e}")
            print(f"  Structural error: {e}")
            continue

        routing_icon = {"skip": "", "review": "⚠️", "flag": "🚨"}.get(context.routing, "?")
        print(f"  {routing_icon} Structural: {context.routing.upper()} "
              f"(score={context.risk_score:.2f}, "
              f"L1={layer_info['layer1_count']}, L2={layer_info['layer2_count']})")

        # --- Step 2: Build prompt ---
        try:
            semantic = SemanticPromptAnalysis(package, context)
            prompt_dict = semantic.build_prompt()
            full_prompt = (
                prompt_dict["system"] + "\n\n"
                + prompt_dict["user"] + "\n\n"
                + prompt_dict["instructions"]
            )
            print(f"  Prompt: ~{len(full_prompt)//4} tokens (est.)")
        except Exception as e:
            logger.error(f"Prompt build failed for {package.package_name}: {e}")
            print(f"  Prompt error: {e}")
            continue

        # --- Step 3: LLM inference ---
        t0 = time.time()
        try:
            raw_output = adapter.generate(full_prompt)
        except Exception as e:
            logger.error(f"LLM generation failed for {package.package_name}: {e}")
            raw_output = f"INFERENCE_ERROR: {e}"
        elapsed = time.time() - t0
        print(f"  ⏱  Inference: {elapsed:.1f}s")

        # --- Step 4: Parse + extract analyst note ---
        parsed, end_pos = parse_llm_output(raw_output)
        parse_success = parsed is not None

        # Extract prose model wrote after JSON (cross-behavior reasoning)
        analyst_note = _extract_analyst_note(raw_output, end_pos)

        # --- Step 5: Classify output type ---
        output_type = _classify_output(raw_output, parsed, parse_success)

        # --- Step 6: Log to correct CSV (mutually exclusive) ---
        if output_type == "success":
            # Clean JSON → semantic_analysis.csv
            csv_logger.log_semantic_analysis(
                package_name=package.package_name,
                version=package.version,
                label=package.label,
                routing=context.routing,
                structural_risk_score=context.risk_score,
                raw_response=raw_output,
                parsed_json=parsed,
                parse_success=True,
                analyst_note=analyst_note,
            )
            behaviors = parsed.get("behaviors", [])
            print(f"  Success — {len(behaviors)} behavior(s)")
            if behaviors:
                for b in behaviors:
                    print(f"     [{b.get('confidence',0):.2f}] "
                          f"{b.get('category','?')}: {b.get('summary','')[:70]}")
            if analyst_note:
                print(f"  📝 Analyst note: {analyst_note[:100]}...")

        else:
            # Any failure type → model_failures.csv ONLY
            csv_logger.log_model_failure(
                package_name=package.package_name,
                version=package.version,
                response=raw_output,
                failure_type=output_type,
            )
            failure_msg = {
                "schema_violation": "model analyzed but didn't follow JSON schema",
                "model_refusal":    "safety filter triggered",
                "parse_error":      "no extractable JSON",
            }.get(output_type, output_type)
            print(f"  {output_type}: {failure_msg}")
            print(f"     Raw (first 200): {raw_output[:200]}")

        all_results.append({
            "package":       package.package_name,
            "version":       package.version,
            "label":         package.label,
            "context":       context,
            "layer_info":    layer_info,
            "parsed":        parsed,
            "parse_success": parse_success,
            "output_type":   output_type,
            "analyst_note":  analyst_note,
            "elapsed":       elapsed,
        })

        print(f"✓ Done: {package.package_name}")

    return all_results


# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

def print_semantic_summary(results: List[Dict]):
    print("\n" + "=" * 60)
    print("SEMANTIC ANALYSIS SUMMARY")
    print("=" * 60)

    mal = [r for r in results if r["label"] == "malicious"]
    ben = [r for r in results if r["label"] == "benign"]
    total = len(results)

    # Parse / output type breakdown
    type_counts: Dict[str, int] = {}
    for r in results:
        t = r["output_type"]
        type_counts[t] = type_counts.get(t, 0) + 1

    success_count = type_counts.get("success", 0)
    print(f"\n📊 Output type breakdown ({total} packages):")
    for t, count in sorted(type_counts.items(), key=lambda x: -x[1]):
        bar = "█" * count
        print(f"   {t:20} {count:3}  {bar}")
    print(f"\n   → Logged to semantic_analysis.csv : {success_count}")
    print(f"   → Logged to model_failures.csv    : {total - success_count}")

    avg_time = sum(r["elapsed"] for r in results) / total if total else 0
    print(f"\n⏱  Avg inference time: {avg_time:.1f}s/package")

    # Analyst notes
    with_notes = [r for r in results if r.get("analyst_note")]
    print(f"📝 Packages with analyst note: {len(with_notes)}/{total}")

    # Detection by label (success only)
    for label, subset, emoji in [("malicious", mal, "🔴"), ("benign", ben, "🟢")]:
        if not subset:
            continue
        success = [r for r in subset if r["output_type"] == "success"]
        detected = [r for r in success if r["parsed"] and r["parsed"].get("behaviors")]
        failed = [r for r in subset if r["output_type"] != "success"]

        print(f"\n{emoji} {label.upper()} ({len(subset)} packages):")
        print(f"   Success / detected : {len(detected)}/{len(success)} parsed successfully")
        if failed:
            print(f"   Failures           : {len(failed)}")
            for r in failed:
                print(f"      [{r['output_type']}] {r['package']} v{r['version']}")

        # Category breakdown
        cat_counts: Dict[str, int] = {}
        for r in success:
            if not r["parsed"]:
                continue
            for b in r["parsed"].get("behaviors", []):
                cat = b.get("category", "unknown")
                cat_counts[cat] = cat_counts.get(cat, 0) + 1
        if cat_counts:
            print("   Categories detected:")
            for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
                print(f"      {cat:35} {count}")

    # Routing → detection cross-tab (malicious only)
    print("\n📊 ROUTING → DETECTION (malicious):")
    print(f"   {'Routing':10} {'Total':>8} {'Success':>8} {'Detected':>10} {'Rate':>8}")
    for routing in ["flag", "review", "skip"]:
        subset = [r for r in mal if r["context"].routing == routing]
        if not subset:
            continue
        success = [r for r in subset if r["output_type"] == "success"]
        detected = sum(1 for r in success if r["parsed"] and r["parsed"].get("behaviors"))
        rate = detected / len(subset) * 100
        print(f"   {routing:10} {len(subset):>8} {len(success):>8} {detected:>10} {rate:>7.1f}%")

    # False positives (benign with detected behaviors)
    fp = [r for r in ben
          if r["output_type"] == "success"
          and r["parsed"]
          and r["parsed"].get("behaviors")]
    if fp:
        print(f"\n⚠️  False positives — benign with behaviors ({len(fp)}):")
        for r in fp:
            cats = [b.get("category") for b in r["parsed"].get("behaviors", [])]
            print(f"   - {r['package']} v{r['version']}: {cats}")
    else:
        print("\nNo false positives")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 60)
    print("SEMANTIC ANALYSIS TEST — Full Pipeline v2")
    print("=" * 60)

    NUM_PACKAGES = 246
    MODEL_CONFIG = {
        "torch_dtype": "float16",
        "device_map": "auto",
        "max_new_tokens": 2048,
        "do_sample": False,
    }

  # --- Load packages ---
    try:
        loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages",
        )
        print(f"\n📦 Loading {NUM_PACKAGES} packages...")
        packages = loader.load_packages(
            use_cache=False,
            force_refresh=False,
            limit=NUM_PACKAGES,
            balanced_experiment_test_only=False,
        )
        if not packages:
            print("No packages loaded!")
            return 1

        mal_count = sum(1 for p in packages if p.label == "malicious")
        ben_count = sum(1 for p in packages if p.label == "benign")
        print(f"Loaded {len(packages)} packages: {mal_count} malicious / {ben_count} benign")

    except Exception as e:
        print(f"Error loading packages: {e}")
        import traceback; traceback.print_exc()
        return 1

    # Load model
    print(f"\nLoading model...")
    adapter = DeepSeekAdapter(
        model_name="./models/deepseek-coder-6.7b-instruct",
        config=MODEL_CONFIG,
    )
    adapter.load_model()

    # Run
    results = run_semantic_analysis(packages, adapter)
    if not results:
        print("No results.")
        return 1

    print_semantic_summary(results)

    print("\n" + "=" * 60)
    print("Semantic Analysis Pipeline completed")
    print(f"   semantic_analysis.csv → input for attack chain step")
    print(f"   model_failures.csv    → schema_violation cases worth retrying")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())