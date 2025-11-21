"""
TEST SEMANTIC PROMPT ANALYSIS
"""
from datetime import time
import json
import sys
from pathlib import Path

import re
import sys
from typing import Any, Dict, Optional
from logs.logging_config import setup_logger
from models.prompts.templates.semantic_prompt_analysis import SemanticPromptAnalysis

logger = setup_logger()

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from models.providers.deepseek_adapter import DeepSeekAdapter
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.structural_analysis import StructuralAnalyzer
    from enums.behavior_category import BehaviorCategory
    from enums.severity import Severity
    print("Imports successful")
    logger.info("Successfully imported necessary modules for structural analysis test")
except ImportError as e:
    print(f"Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)
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
        r"```json\s*(\{[\s\S]*?\})\s*```",                              # json
        r"```(?:javascript|js|ts|typescript)\s*(\{[\s\S]*?\})\s*```",   # javascript
        r"```\s*(\{[\s\S]*?\})\s*```",                                  # no label
        r"(\{(?:[^{}]|(?:\{[^{}]*\}))*\})"                              # Inline JSON
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

def run_semantic_analysis():
    print("Loading packages...")
    loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages"
        )
    packages = loader.load_malicious_packages(
            use_cache = True,
            force_refresh = False,
            show_progress= True,
            limit=2
        )
    print(f"Loaded {len(packages)} packages")
    
    test_packages = packages
    
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
    
    results = []
    
    for i, package in enumerate(test_packages, 1):
        print(f"\n{'='*60}")
        print(f" Package {i}/{len(test_packages)}: {package.package_name}")
        print(f"{'='*60}")
        
        print("Running structural analysis...")
        structural_analyzer = StructuralAnalyzer(package)
        structural_risks = structural_analyzer.run_all()
        
        print(f"Found {len(structural_risks)} structural risks")
        for risk in structural_risks:
            print(f"  - {risk.risk_type}: {risk.severity.value}")
        
        # Run semantic analysis
        print("Running semantic analysis...")
        semantic_analyzer = SemanticPromptAnalysis(package, structural_risks)
        prompt_parts = semantic_analyzer.build_prompt()
        
        final_prompt = f"""
            {prompt_parts["system"]}

            {prompt_parts["user"]}

            {prompt_parts["instructions"]}
        """
        print("Generating semantic analysis with model...")
        t0 = time.time()
        output = adapter.generate(final_prompt, max_new_tokens=4096)
        t1 = time.time()
        
        print("Time (s):", t1 - t0)
        print("Raw output:\n", output[:2000])
        

        data = _extract_from_markdown(output)
        if data:
            print("Parsed JSON:", json.dumps(data, indent=2))
        else:
            print("Failed to extract JSON from model output")
        
        print(f"\n{'='*60}")
        print("SUMMARY")
        print(f"{'='*60}")
        for result in results:
            print(f"Package: {result['package']}")
            print(f"  Structural risks: {result['structural_risks']}")
            print(f"  Semantic behaviors: {result['semantic_behaviors']}")
            print()

def main():
    print("Semantic Analysis Test...")
    print("=" * 60)
    
    run_semantic_analysis()

if __name__ == "__main__":
    main()

    