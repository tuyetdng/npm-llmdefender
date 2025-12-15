"""
TEST MULTI-PERSPECTIVE VERIFICATION ANALYSIS
"""
import time
import json
import sys
import os
from pathlib import Path
from datetime import datetime
import re
from typing import Any, Dict, Optional
from logs.logging_config import setup_logger
from config.csv_logger_config import CSVLoggerConfig

VERSION_TAG = "v2.0"
VERIFICATION_OUTPUT_DIR = "./experiment_results/verification_output"

logger = setup_logger()
csv_logger = CSVLoggerConfig(
    output_dir="./experiment_results",
    prompt_version=VERSION_TAG
)

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    print("Imports successful")
    logger.info("Successfully imported necessary modules for verification analysis test")
except ImportError as e:
    print(f"Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)

NUM_PACKAGES = 20

def _safe_repair_json(text: str) -> Optional[Dict[str, Any]]:
    """Safely repair common JSON issues."""
    res = text
    
    # Remove trailing commas
    res = re.sub(r',\s*}', '}', res)
    res = re.sub(r',\s*]', ']', res)
    
    # Add quotes for keys if missing
    res = re.sub(r'(?<!["\'])\b(\w+)\s*:', r'"\1":', res)
    
    # Replace single quotes around key
    res = re.sub(r"'(\w+)'\s*:", r'"\1":', res)
    
    # Replace single quotes around simple string values
    res = re.sub(r":\s*'([^']*?)'\s*([,}])", r': "\1"\2', res)
    
    # Remove comments
    res = re.sub(r'//.*?$', '', res, flags=re.MULTILINE)
    res = re.sub(r'/\*.*?\*/', '', res, flags=re.DOTALL)

    try:
        return json.loads(res)
    except json.JSONDecodeError:
        return None


def _extract_from_markdown(text: str) -> Optional[Dict[str, Any]]:
    """Extract JSON from markdown code blocks."""
    patterns = [
        r"```json\s*(\{[\s\S]*?\})\s*```",
        r"```(?:javascript|js|ts|typescript)\s*(\{[\s\S]*?\})\s*```",
        r"```\s*(\{[\s\S]*?\})\s*```",
        r"(\{(?:[^{}]|(?:\{[^{}]*\}))*\})"
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, text, re.DOTALL | re.IGNORECASE)
        for match in matches:
            cleaned_text = match.strip()
            try:
                return json.loads(cleaned_text)
            except json.JSONDecodeError:
                res = _safe_repair_json(cleaned_text)
                if res:
                    return res
    return None


def load_semantic_results(semantic_output_dir: str = "./experiment_results/semantic_output") -> Dict[str, Dict]:
    """
    Load all semantic analysis results from disk.
    Returns: dict mapping package_name -> semantic_findings
    """
    semantic_results = {}
    
    if not os.path.exists(semantic_output_dir):
        logger.warning(f"Semantic output directory not found: {semantic_output_dir}")
        return semantic_results
    
    for filename in os.listdir(semantic_output_dir):
        if filename.endswith('.json'):
            filepath = os.path.join(semantic_output_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    pkg_name = data.get('package_name')
                    if pkg_name:
                        semantic_results[pkg_name] = data
                        logger.info(f"Loaded semantic result for {pkg_name}")
            except Exception as e:
                logger.error(f"Failed to load {filename}: {e}")
    
    return semantic_results

def run_verification_analysis(num_packages: int = 20):
    """Main verification analysis pipeline."""
    
    print("\n" + "="*60)
    print("STEP 1: Loading packages...")
    print("="*60)
    
    loader = DatasetLoader(
        source_dir="./dataset",
        extract_dir="./extracted_packages"
    )
    
    packages = loader.load_packages(
        use_cache=True,
        limit=num_packages,
        balanced_experiment_test_only=True
    )
    
    if not packages:
        print("No packages loaded!")
        return 1
    
    mal_count = sum(1 for p in packages if p.label == "malicious")
    ben_count = sum(1 for p in packages if p.label == "benign")
    
    print(f"Loaded {len(packages)} packages:")
    print(f"Malicious: {mal_count}")
    print(f"Benign: {ben_count}")
    
    print("\n" + "="*60)
    print("Loading semantic analysis results...")
    print("="*60)
    
    semantic_results = load_semantic_results()
    print(f"Loaded {len(semantic_results)} semantic results")
    
    print("\n" + "="*60)
    print("Initializing DeepSeek model...")
    print("="*60)
    
    config = {
        "torch_dtype": "float16",
        "device_map": "auto",
        "max_new_tokens": 4096,
        "temperature": 0.0,
        "top_k": 50,
        "top_p": 0.95,
        "do_sample": False
    }
    
    adapter = DeepSeekAdapter(config=config)
    print("Model loaded")
    
    print("\n" + "="*60)
    print("Running verification analysis...")
    print("="*60)
    
    results = []
    
    for i, package in enumerate(packages, 1):
        print(f"\n{'='*60}")
        print(f"Package {i}/{len(packages)}: {package.package_name}")
        print(f"{'='*60}")
        
        semantic_findings = semantic_results.get(package.package_name)
        
        if not semantic_findings:
            logger.warning(f"No semantic results found for {package.package_name}, skipping")
            csv_logger.log_model_failure(
                package_name=package.package_name,
                version=package.version,
                response="No semantic analysis results found",
                failure_type="missing_semantic_results"
            )
            continue
        
        print(f"Found semantic results: {len(semantic_findings.get('behaviors', []))} behaviors")
        
        verifier = VerificationPromptAnalysis(package, semantic_findings)
        prompt_parts = verifier.build_prompt()
        
        final_prompt = f"""
                    {prompt_parts["system"]}

                    {prompt_parts["user"]}

                    {prompt_parts["instructions"]}
                """
        
        print("Generating verification analysis...")
        t0 = time.time()
        output = adapter.generate(final_prompt, max_new_tokens=4096)
        t1 = time.time()
        
        print(f"Time: {t1 - t0:.2f}s")
        print(f"\nRaw output:\n{output[:500]}...")
        
        data = _extract_from_markdown(output)
        
        if data:
            print("Successfully parsed JSON")
            print(json.dumps(data, indent=2))
            
            try:
                output_path = verifier.save_verification_result(
                    parsed_data=data,
                    version_tag=VERSION_TAG
                )
                
                csv_logger.log_verification_analysis(
                    package_name=package.package_name,
                    version=package.version,
                    parsed_json=data,
                    raw_response=output
                )
                
                results.append({
                    "package": package.package_name,
                    "verdict": data.get("final_verification", {}).get("verdict"),
                    "confidence": data.get("final_verification", {}).get("calibrated_confidence"),
                    "success": True
                })
                
            except Exception as e:
                logger.error(f"Failed to save verification result: {e}")
                results.append({
                    "package": package.package_name,
                    "success": False,
                    "error": str(e)
                })
        else:
            print("Failed to parse JSON from model output")
            csv_logger.log_model_failure(
                package_name=package.package_name,
                version=package.version,
                response=output,
                failure_type="json_parsing_error_verification"
            )
            results.append({
                "package": package.package_name,
                "success": False,
                "error": "JSON parsing failed"
            })
    
    # Summary
    print("\n" + "="*60)
    print("VERIFICATION ANALYSIS SUMMARY")
    print("="*60)
    
    success_count = sum(1 for r in results if r.get("success"))
    print(f"Successful: {success_count}/{len(results)}")
    
    if success_count > 0:
        print("\nVerdicts:")
        for r in results:
            if r.get("success"):
                print(f"  - {r['package']}: {r.get('verdict')} (confidence: {r.get('confidence', 'N/A')})")
    
    return 0


def main():
    print("="*60)
    print("MULTI-PERSPECTIVE VERIFICATION ANALYSIS TEST")
    print("="*60)
        
    try:
        exit_code = run_verification_analysis(NUM_PACKAGES)
        sys.exit(exit_code)
    except Exception as e:
        logger.error(f"Fatal error: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()