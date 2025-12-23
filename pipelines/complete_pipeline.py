"""
COMPLETE MALWARE DETECTION PIPELINE
Runs end-to-end analysis: extraction → structural → semantic → verification → classification
"""
import time
import json
import sys
import os
from pathlib import Path
from datetime import datetime
import re
from typing import Any, Dict, Optional, List
from dataclasses import dataclass

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
    from data.loader import DatasetLoader
    from data.models import PackageProfile
    from analysis.structural_analysis import StructuralAnalyzer
    from models.prompts.templates.semantic_prompt_analysis import SemanticPromptAnalysis
    from models.prompts.templates.multi_perspective_verification import VerificationPromptAnalysis
    from models.providers.deepseek_adapter import DeepSeekAdapter
    from detection.decision.classificator import FinalClassifier
    from logs.logging_config import setup_logger
    from config.csv_logger_config import CSVLoggerConfig
    print("Imports successful")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)

logger = setup_logger()

@dataclass
class PipelineResult:
    """Container for pipeline execution results"""
    package_name: str
    version: str
    label: str
    structural_risks: List
    semantic_output: Optional[Dict]
    verification_output: Optional[Dict]
    final_classification: Optional[Dict]
    execution_time: float
    success: bool
    error_message: Optional[str] = None


class MalwareDetectionPipeline:

    def __init__(
        self,
        dataset_dir: str = "./dataset",
        extract_dir: str = "./extracted_packages",
        output_dir: str = "./experiment_results",
        version_tag: str = "v2.0"
    ):
        self.dataset_dir = dataset_dir
        self.extract_dir = extract_dir
        self.output_dir = output_dir
        self.version_tag = version_tag
        
        self.loader = DatasetLoader(
            source_dir=dataset_dir,
            extract_dir=extract_dir
        )
        
        config = {
            "torch_dtype": "float16",
            "device_map": "auto",
            "max_new_tokens": 4096,
            "temperature": 0.0,
            "top_k": 50,
            "top_p": 0.95,
            "do_sample": False
        }
        self.llm_adapter = DeepSeekAdapter(config=config)
        
        self.csv_logger = CSVLoggerConfig(
            output_dir=output_dir,
            prompt_version=version_tag
        )
        
        logger.info("Pipeline initialized successfully")
    
    def _extract_json_from_text(self, text: str) -> Optional[Dict[str, Any]]:
        """Extract and parse JSON from markdown code blocks or raw text."""
        # Try markdown patterns
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
                    # Try repair
                    repaired = self._repair_json(cleaned_text)
                    if repaired:
                        return repaired
        return None
    
    def _repair_json(self, text: str) -> Optional[Dict[str, Any]]:
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
    
    def run_structural_analysis(self, package: PackageProfile) -> List:
        print(f"\n{'='*60}")
        print("RUNNING STRUCTURAL ANALYSIS")
        print(f"{'='*60}")
        
        analyzer = StructuralAnalyzer(package)
        risks = analyzer.run_all()
        
        print(f"Found {len(risks)} structural risks")
        if risks:
            for risk in risks[:3]:  
                print(f"  - {risk.risk_type} ({risk.severity.value})")
        
        self.csv_logger.log_structural_anlyser(
            package_name=package.package_name,
            version=package.version,
            findings=risks
        )
        
        return risks
    
    def run_semantic_analysis(
        self, 
        package: PackageProfile, 
        structural_risks: List
    ) -> Optional[Dict]:
        print(f"\n{'='*60}")
        print("RUNNING SEMANTIC ANALYSIS (LLM)")
        print(f"{'='*60}")
        
        semantic_analyzer = SemanticPromptAnalysis(package, structural_risks)
        prompt_parts = semantic_analyzer.build_prompt()
        
        final_prompt = f"""
            {prompt_parts["system"]}
            {prompt_parts["user"]}
            {prompt_parts["instructions"]}
        """
        
        print("Generating semantic analysis...")
        t0 = time.time()
        output = self.llm_adapter.generate(final_prompt, max_new_tokens=4096)
        t1 = time.time()
        
        print(f"Analysis completed in {t1-t0:.2f}s")
        
        data = self._extract_json_from_text(output)
        
        if data:
            print(f"Successfully parsed semantic findings")
            
            try:
                enriched_data = semantic_analyzer.save_parsed_output(
                    parsed_data=data,
                    version_tag=self.version_tag
                )
                logger.info(f"Semantic result saved to {enriched_data}")
            except Exception as e:
                logger.error(f"Failed to save semantic result: {e}")
                enriched_data = data
                
            
            self.csv_logger.log_semantic_analysis(
                package_name=package.package_name,
                version=package.version,
                raw_response=output,
                parsed_json=enriched_data  
            )
            
            return enriched_data  
        else:
            print("Failed to parse semantic analysis output")
            self.csv_logger.log_model_failure(
                package_name=package.package_name,
                version=package.version,
                response=output,
                failure_type="json_parsing_error_semantic"
            )
            return None
    
    def run_verification_analysis(
        self,
        package: PackageProfile,
        semantic_findings: Dict
    ) -> Optional[Dict]:
        print(f"\n{'='*60}")
        print("RUNNING MULTI-PERSPECTIVE VERIFICATION")
        print(f"{'='*60}")
        
        verifier = VerificationPromptAnalysis(package, semantic_findings)
        prompt_parts = verifier.build_prompt()
        
        final_prompt = f"""
            {prompt_parts["system"]}
            {prompt_parts["user"]}
            {prompt_parts["instructions"]}
        """
        
        print("Generating verification analysis...")
        t0 = time.time()
        output = self.llm_adapter.generate(final_prompt, max_new_tokens=4096)
        t1 = time.time()
                
        data = self._extract_json_from_text(output)
        
        if data:
            print(f"Successfully parsed verification results")
            
            try:
                enriched_data = verifier.save_verification_result(
                    parsed_data=data,
                    version_tag=self.version_tag
                )
                logger.info(f"Verification result saved to {enriched_data}")
            except Exception as e:
                logger.error(f"Failed to save verification result: {e}")
                enriched_data = data
            
            self.csv_logger.log_verification_analysis(
                package_name=package.package_name,
                version=package.version,
                parsed_json=enriched_data,
                raw_response=output
            )

            return enriched_data
        else:
            print("Failed to parse verification output")
            self.csv_logger.log_model_failure(
                package_name=package.package_name,
                version=package.version,
                response=output,
                failure_type="json_parsing_error_verification"
            )
            return None
    
    def run_final_classification(
        self,
        package: PackageProfile,
        semantic_result: Dict,
        verification_result: Dict
    ) -> Dict:
        print(f"\n{'='*60}")
        print("STAGE 4: FINAL CLASSIFICATION")
        print(f"{'='*60}")
        
        classifier = FinalClassifier(semantic_result, verification_result)
        result = classifier.classify()
        
        json_path = classifier.save_result(result)
        md_path = classifier.save_user_report(result)
        
        return result
    
    def analyze_package(self, package: PackageProfile) -> PipelineResult:        
        print(f"\n{'#'*70}")
        print(f"# ANALYZING: {package.package_name} v{package.version}")
        print(f"{'#'*70}")
        
        start_time = time.time()
        
        try:
            structural_risks = self.run_structural_analysis(package)
            
            semantic_output = self.run_semantic_analysis(package, structural_risks)
            if not semantic_output:
                raise Exception("Semantic analysis failed")
            
            verification_output = self.run_verification_analysis(package, semantic_output)
            if not verification_output:
                raise Exception("Verification analysis failed")
            
            final_classification = self.run_final_classification(
                package,
                semantic_output, 
                verification_output
            )
            
            execution_time = time.time() - start_time
            
            print(f"\n{'='*60}")
            print("PIPELINE COMPLETED SUCCESSFULLY")

            
            return PipelineResult(
                package_name=package.package_name,
                version=package.version,
                label=package.label,
                structural_risks=structural_risks,
                semantic_output=semantic_output,
                verification_output=verification_output,
                final_classification=final_classification,
                execution_time=execution_time,
                success=True
            )
            
        except Exception as e:
            execution_time = time.time() - start_time
            print(f"\n{'='*60}")
            print(f"FAILED")
            print(f"{'='*60}")
            print(f"Error: {str(e)}")
            logger.error(f"Pipeline failed for {package.package_name}: {e}", exc_info=True)
            
            return PipelineResult(
                package_name=package.package_name,
                version=package.version,
                label=package.label,
                structural_risks=[],
                semantic_output=None,
                verification_output=None,
                final_classification=None,
                execution_time=execution_time,
                success=False,
                error_message=str(e)
            )
    
    def run_demo(self, num_malicious: int = 4, num_benign: int = 1):
        print(f"\n{'#'*70}")
        print(f"# MALWARE DETECTION PIPELINE DEMO")
        print(f"# Analyzing {num_malicious} malicious + {num_benign} benign packages")
        print(f"{'#'*70}")
        
        total_needed = num_malicious + num_benign
        packages = self.loader.load_packages(
            use_cache=False,
            limit=total_needed * 3,
            balanced_experiment_test_only=False
        )
        
        malicious_packages = [p for p in packages if p.label == "malicious"][:num_malicious]
        benign_packages = [p for p in packages if p.label == "benign"][:num_benign]
        
        demo_packages = malicious_packages + benign_packages
        
        # Run pipeline for each package
        results = []
        for package in demo_packages:
            result = self.analyze_package(package)
            results.append(result)
        
        self._print_final_summary(results)
        
        return results
    
    def _print_final_summary(self, results: List[PipelineResult]):
        """Print final summary of all analyses"""
        print(f"\n{'#'*70}")
        print("# SUMMARY")
        print(f"{'#'*70}")
        
        successful = [r for r in results if r.success]
        failed = [r for r in results if not r.success]
        
        print(f"\nTotal packages analyzed: {len(results)}")
        print(f"Successful: {len(successful)}")
        print(f"Failed: {len(failed)}")
        
        
        if failed:
            print(f"\nFailed packages:")
            for r in failed:
                print(f"  - {r.package_name}: {r.error_message}")


def main():
    """Main entry point for demo"""
    
    pipeline = MalwareDetectionPipeline(
        dataset_dir="./dataset",
        extract_dir="./extracted_packages",
        output_dir="./experiment_results",
        version_tag="v2.0"
    )
    
    results = pipeline.run_demo(
        num_malicious=8,
        num_benign=1
    )
    
    print("\nAnalysis completed!")
    print(f"Results saved to: {pipeline.output_dir}")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())