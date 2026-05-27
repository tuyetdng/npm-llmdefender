"""
END-TO-END PIPELINE — Single Package Analysis

    Step 0 : Load & extract package from dataset/ben/ or dataset/mal/
    Step 1 : Structural Analysis  (Layer 1 + Layer 2 + SignalAggregator)
    Step 2 : Semantic Analysis    (LLM — DeepSeek)
    Step 3 : Verification         (LLM — Attack Chain Reconstruction)
    Step 4 : Final Classification (Deterministic — no LLM)

Usage:
    runner = PipelineRunner("1ru-cache-0.0.1")
    runner.run()

    # CLI:
    python run_pipeline.py --package 1ru-cache-0.0.1
"""

import sys
import json
import re
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

# ---------------------------------------------------------------------------
# Imports
# ---------------------------------------------------------------------------

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.signal_aggregator import SignalAggregator, StructuralContext
    from analysis.structural_analysis import StructuralAnalyzer, StructuralAnalysisFinding
    from analysis.ast_analyzer import ASTAnalyzer
    from models.prompts.templates.semantic_prompt_analysis import SemanticPromptAnalysis
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter
    from detection.decision.classificator import FinalClassifier
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

DATASET_DIR      = "./dataset"
EXTRACT_DIR      = "./extracted_packages"
SEMANTIC_DIR     = "./experiment_results/semantic_output"
VERIFICATION_DIR = "./experiment_results/verification_output"
OUTPUT_DIR       = "./experiment_results/output_machine_readable"
REPORT_DIR       = "./experiment_results/report_human_readable"

MODEL_PATH   = "./models/deepseek-coder-6.7b-instruct"
MODEL_CONFIG = {
    "torch_dtype":    "float16",
    "device_map":     "auto",
    "max_new_tokens": 2048,
    "do_sample":      False,
}

# ---------------------------------------------------------------------------
# Console helpers
# ---------------------------------------------------------------------------

def _banner(title: str) -> None:
    print(f"\n{'═'*60}")
    print(f"  {title}")
    print(f"{'═'*60}")

def _step(n: int, title: str) -> None:
    print(f"\n{'─'*60}")
    print(f"  STEP {n}: {title}")
    print(f"{'─'*60}")

def _ok(msg: str)   -> None: print(f"  ✅  {msg}")
def _warn(msg: str) -> None: print(f"  ⚠️   {msg}")
def _err(msg: str)  -> None: print(f"  ❌  {msg}")
def _info(msg: str) -> None: print(f"  ℹ️   {msg}")

# ---------------------------------------------------------------------------
# JSON parsing (reused across semantic + verification)
# ---------------------------------------------------------------------------

def _safe_repair_json(text: str) -> Optional[Dict]:
    res = re.sub(r',\s*}', '}', text)
    res = re.sub(r',\s*]', ']', res)
    res = re.sub(r'//.*?$', '', res, flags=re.MULTILINE)
    res = re.sub(r'/\*.*?\*/', '', res, flags=re.DOTALL)
    try:
        return json.loads(res)
    except json.JSONDecodeError:
        return None

def _extract_json(text: str) -> Optional[Dict]:
    start = text.find('{')
    if start == -1:
        return None
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == '{':   depth += 1
        elif ch == '}': depth -= 1
        if depth == 0:
            candidate = text[start:i + 1]
            try:
                return json.loads(candidate)
            except json.JSONDecodeError:
                return _safe_repair_json(candidate)
    return None

def _extract_analyst_note(raw: str, json_end: int) -> Optional[str]:
    if json_end <= 0:
        return None
    tail = raw[json_end:].strip()
    tail = re.sub(r'^```+\w*\s*', '', tail).strip()
    tail = re.sub(r'```+\s*$', '', tail).strip()
    if len(tail) < 30:
        return None
    refusals = ["i'm sorry", "i cannot", "i can't", "i'm not able", "as an ai"]
    if any(s in tail.lower() for s in refusals):
        return None
    return tail

def _find_json_end(text: str) -> int:
    start = text.find('{')
    if start == -1:
        return -1
    depth = 0
    for i, ch in enumerate(text[start:], start):
        if ch == '{':   depth += 1
        elif ch == '}': depth -= 1
        if depth == 0:
            return i + 1
    return -1

# ---------------------------------------------------------------------------
# PipelineRunner
# ---------------------------------------------------------------------------

class PipelineRunner:
    """
    Run all pipeline for package

    Args:
        package: package slug, e.g. "1ru-cache-0.0.1" (without .tar.gz)
    """

    def __init__(self, package: str):
        self.package_slug = package
        self._adapter: Optional[DeepSeekAdapter] = None

    # ------------------------------------------------------------------
    # Public entry point
    # ------------------------------------------------------------------

    def run(self) -> None:
        start_time = time.time()

        _banner(f"NPM PACKAGE SECURITY ANALYSIS PIPELINE")
        print(f"  Package   : {self.package_slug}")
        print(f"  Started   : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        # ── Load package ─────────────────────────────────────
        package = self._load()
        if package is None:
            return

        # ── Structural analysis ──────────────────────────────
        context = self._structural(package)
        if context is None:
            return

        # ── Semantic analysis (LLM) ──────────────────────────
        semantic_result = self._semantic(package, context)
        if semantic_result is None:
            return

        # ── Verification (LLM, only if behaviors found) ──────
        verification_result = self._verification(package, context, semantic_result)

        # ── Final classification ─────────────────────────────
        self._classify(semantic_result, verification_result)

        # ── Done ─────────────────────────────────────────────────────
        elapsed = time.time() - start_time
        _banner("PIPELINE COMPLETE")
        print(f"  Total time    : {elapsed:.1f}s")
        print(f"  Machine JSON  : {OUTPUT_DIR}/")
        print(f"  Human report  : {REPORT_DIR}/")
        print()

    # ------------------------------------------------------------------
    # Load & extract package
    # ------------------------------------------------------------------

    def _load(self) -> Optional[PackageProfile]:
        _step(0, "LOAD & EXTRACT PACKAGE")

        try:
            loader = DatasetLoader(
                source_dir=DATASET_DIR,
                extract_dir=EXTRACT_DIR,
            )
        except Exception as e:
            _err(f"DatasetLoader init failed: {e}")
            return None

        _info(f"Scanning {DATASET_DIR}/mal/ and {DATASET_DIR}/ben/ ...")

        try:
            all_packages = loader.load_packages(
                use_cache=False,
                force_refresh=False,
                limit=None,
                balanced_experiment_test_only=False,
            )
        except Exception as e:
            _err(f"load_packages failed: {e}")
            return None

        if not all_packages:
            _err("No packages found in dataset directory.")
            return None

        # Match by slug: "1ru-cache-0.0.1" → name="1ru-cache", version="0.0.1"
        package = self._match_package(all_packages)

        if package is None:
            _err(f"Package '{self.package_slug}' not found in dataset.")
            _info("Available packages:")
            for p in sorted(all_packages, key=lambda x: x.package_name)[:20]:
                label_icon = "🔴" if p.label == "malicious" else "🟢"
                print(f"      {label_icon} {p.package_name}-{p.version}")
            if len(all_packages) > 20:
                print(f"      ... and {len(all_packages) - 20} more")
            return None

        label_icon = "🔴" if package.label == "malicious" else "🟢"
        _ok(f"{label_icon} Loaded: {package.package_name} v{package.version} [{package.label}]")

        has_src = bool(
            package.entry_point_code
            or getattr(package, "install_script_files", {})
        )
        _info(f"JS source available : {'yes' if has_src else 'no (Layer 2 will be skipped)'}")

        return package

    def _match_package(self, packages) -> Optional[PackageProfile]:
        """Match package_slug to a PackageProfile. Tries exact then fuzzy."""
        slug = self.package_slug

        # Exact: "name-version" → split on last hyphen-digits pattern
        m = re.match(r'^(.+?)-(\d[\d.]*)$', slug)
        if m:
            name, version = m.group(1), m.group(2)
            for p in packages:
                if p.package_name == name and p.version == version:
                    return p

        # Fuzzy: match by package_name only
        for p in packages:
            if p.package_name == slug:
                return p

        # Fuzzy: slug is a substring of "name-version"
        for p in packages:
            if slug in f"{p.package_name}-{p.version}":
                return p

        return None

    # ------------------------------------------------------------------
    # Structural analysis
    # ------------------------------------------------------------------

    def _structural(self, package: PackageProfile) -> Optional[StructuralContext]:
        _step(1, "STRUCTURAL ANALYSIS  (Layer 1 (Structural Metadata Static Analysis) + Layer 2 (AST Analysis) + SignalAggregator)")

        try:
            layer1 = StructuralAnalyzer(package).run_all()
            _info(f"Layer 1 (metadata)  : {len(layer1)} finding(s)")

            ast      = ASTAnalyzer(package)
            layer2   = ast.run_all()
            _info(f"Layer 2 (AST)       : {len(layer2)} finding(s)")

            context  = SignalAggregator(package).aggregate()

        except Exception as e:
            _err(f"Structural analysis failed: {e}")
            return None

        routing_icon = {"skip": "✅", "review": "⚠️ ", "flag": "🚨"}.get(context.routing, "?")
        print()
        _ok(f"Routing     : {routing_icon} {context.routing.upper()}")
        _info(f"Risk score  : {context.risk_score:.2f}")
        _info(f"Confidence  : {context.confidence:.2f}")
        _info(f"Primary cat : {context.primary_category.value if context.primary_category else 'none'}")

        if context.confirmed_signals:
            print(f"\n  Confirmed signals ({len(context.confirmed_signals)}):")
            for s in context.confirmed_signals[:3]:
                first_line = s.strip().splitlines()[0]
                print(f"    [!] {first_line}")

        if context.supporting_signals:
            print(f"  Supporting signals : {len(context.supporting_signals)}")

        return context

    # ------------------------------------------------------------------
    # Semantic analysis
    # ------------------------------------------------------------------

    def _semantic(
        self, package: PackageProfile, context: StructuralContext
    ) -> Optional[Dict]:
        _step(2, "SEMANTIC ANALYSIS  (LLM — Behavioral Detection)")

        adapter = self._get_adapter()

        # Build prompt
        try:
            semantic    = SemanticPromptAnalysis(package, context)
            prompt_dict = semantic.build_prompt()
            full_prompt = (
                prompt_dict["system"] + "\n\n"
                + prompt_dict["user"]   + "\n\n"
                + prompt_dict["instructions"]
            )
            _info(f"Prompt size : ~{len(full_prompt)//4} tokens (est.)")
        except Exception as e:
            _err(f"Prompt build failed: {e}")
            return None

        # LLM inference
        _info("Running inference...")
        t0 = time.time()
        try:
            raw = adapter.generate(full_prompt)
        except Exception as e:
            _err(f"Inference failed: {e}")
            return None
        elapsed = time.time() - t0
        _info(f"Inference time : {elapsed:.1f}s")

        # Parse
        json_end = _find_json_end(raw)
        parsed   = _extract_json(raw)
        analyst_note = _extract_analyst_note(raw, json_end)

        if parsed is None:
            _warn("Could not parse LLM output — no JSON found")
            _info(f"Raw (first 200): {raw[:200]}")
            return None

        behaviors = parsed.get("behaviors", [])
        _ok(f"{len(behaviors)} behavior(s) detected")

        if behaviors:
            for b in behaviors:
                print(f"    [{b.get('confidence',0):.2f}] "
                      f"{b.get('category','?')}: {b.get('summary','')[:70]}")
        else:
            _info("No behaviors — package appears clean at semantic stage")

        # Save JSON
        try:
            semantic.save_parsed_output(
                parsed_data=parsed,
                version_tag="semantic_v2.0",
                analyst_note=analyst_note,
            )
            sem_file = f"{SEMANTIC_DIR}/{package.package_name.replace('/', '#')}-{package.version}.json"
            _ok(f"Saved → {sem_file}")
        except Exception as e:
            _warn(f"save_parsed_output failed: {e}")

        # Return full semantic result as the classifier expects it
        return self._load_semantic_file(package)

    def _load_semantic_file(self, package: PackageProfile) -> Optional[Dict]:
        safe   = package.package_name.replace('/', '#')
        path   = Path(SEMANTIC_DIR) / f"{safe}-{package.version}.json"
        if path.exists():
            return json.loads(path.read_text(encoding="utf-8"))
        _warn("Semantic output file not found after save — using in-memory result")
        return None

    # ------------------------------------------------------------------
    # Verification
    # ------------------------------------------------------------------

    def _verification(
        self,
        package: PackageProfile,
        context: StructuralContext,
        semantic_result: Dict,
    ) -> Optional[Dict]:
        _step(3, "VERIFICATION  (LLM — Attack Chain Reconstruction)")

        behaviors = semantic_result.get("behaviors", [])

        if not behaviors:
            _info("No behaviors detected — verification skipped (CLEAN path)")
            return None

        _info(f"{len(behaviors)} behavior(s) to verify")

        adapter = self._get_adapter()

        # Build prompt
        try:
            verifier    = VerificationPromptAnalysis(
                package_profile=package,
                structural_context=context,
                semantic_findings={
                    "behaviors":   behaviors,
                    "risk_vector": semantic_result.get("risk_vector", []),
                },
                analyst_note=semantic_result.get("analyst_note"),
            )
            prompt_dict = verifier.build_prompt()
            full_prompt = (
                prompt_dict["system"] + "\n\n"
                + prompt_dict["user"]   + "\n\n"
                + prompt_dict["instructions"]
            )
            _info(f"Prompt size : ~{len(full_prompt)//4} tokens (est.)")
        except Exception as e:
            _err(f"Verification prompt build failed: {e}")
            return None

        # LLM inference
        _info("Running inference...")
        t0 = time.time()
        try:
            raw = adapter.generate(full_prompt)
        except Exception as e:
            _err(f"Inference failed: {e}")
            return None
        elapsed = time.time() - t0
        _info(f"Inference time : {elapsed:.1f}s")

        # Parse
        parsed = _extract_json(raw)
        if parsed is None:
            _warn("Could not parse verification output")
            _info(f"Raw (first 200): {raw[:200]}")
            return None

        chain = parsed.get("chain_analysis", {})
        verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(
            chain.get("verdict", ""), "❓"
        )
        _ok(f"{verdict_icon} Chain verdict : {chain.get('verdict', '?')}  "
            f"(score={chain.get('chain_score', 0):.2f}, "
            f"conf={chain.get('confidence', 0):.2f})")
        narrative = chain.get("chain_narrative", "")
        if narrative:
            _info(f"Narrative : {narrative[:120]}")

        # Save
        try:
            verifier.save_verification_result(parsed_data=parsed, version_tag="verification_v2.0")
            veri_file = f"{VERIFICATION_DIR}/{package.package_name.replace('/', '#')}-{package.version}.json"
            _ok(f"Saved → {veri_file}")
        except Exception as e:
            _warn(f"save_verification_result failed: {e}")

        return self._load_verification_file(package)

    def _load_verification_file(self, package: PackageProfile) -> Optional[Dict]:
        safe = package.package_name.replace('/', '#')
        path = Path(VERIFICATION_DIR) / f"{safe}-{package.version}.json"
        if path.exists():
            return json.loads(path.read_text(encoding="utf-8"))
        return None

    # ------------------------------------------------------------------
    # Final classification
    # ------------------------------------------------------------------

    def _classify(
        self,
        semantic_result: Optional[Dict],
        verification_result: Optional[Dict],
    ) -> None:
        _step(4, "FINAL CLASSIFICATION  (Confidence Calibration + Report)")

        if semantic_result is None:
            _err("No semantic result — cannot classify")
            return

        try:
            clf    = FinalClassifier(semantic_result, verification_result)
            result = clf.classify()
        except Exception as e:
            _err(f"Classification failed: {e}")
            return

        fv           = result["final_verdict"]
        verdict_icon = {"MALICIOUS": "🔴", "SUSPICIOUS": "🟡", "BENIGN": "🟢"}.get(
            fv["classification"], "❓"
        )

        print()
        print(f"  {verdict_icon}  VERDICT    : {fv['classification']}")
        print(f"      Risk level : {fv['risk_level']}")
        print(f"      Confidence : {fv['confidence']:.3f} ({fv['confidence']*100:.1f}%)")
        print(f"\n  📋 {result['executive_summary'][:200]}")

        iocs = result["threat_profile"].get("attack_vector_iocs", [])
        if iocs:
            print(f"\n  🎯 IOCs : {', '.join(iocs)}")

        print(f"\n  ⚠️   {result['recommendations']['immediate_action']}")

        # Save
        try:
            clf.save_result(result)
            clf.save_user_report(result)
            _ok(f"Machine-readable → {OUTPUT_DIR}/")
            _ok(f"Human report     → {REPORT_DIR}/")
        except Exception as e:
            _warn(f"Save failed: {e}")

    # ------------------------------------------------------------------
    # Model loader (lazy, shared across steps 2 & 3)
    # ------------------------------------------------------------------

    def _get_adapter(self) -> DeepSeekAdapter:
        if self._adapter is None:
            _info("Loading DeepSeek model (first call)...")
            self._adapter = DeepSeekAdapter(
                model_name=MODEL_PATH,
                config=MODEL_CONFIG,
            )
            self._adapter.load_model()
            _ok("Model loaded")
        return self._adapter


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="End-to-end pipeline for a single npm package."
    )
    parser.add_argument(
        "--package", required=True,
        help="Package slug without .tar.gz, e.g. 1ru-cache-0.0.1"
    )
    args = parser.parse_args()

    PipelineRunner(args.package).run()