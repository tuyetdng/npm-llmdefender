"""
STRUCTURAL ANALYSIS TEST
"""

import sys
from pathlib import Path
from config.csv_logger_config import CSVLoggerConfig
from logs.logging_config import setup_logger

logger = setup_logger()
csv_logger = CSVLoggerConfig(
    output_dir="./experiment_results",
    prompt_version="v1.0"
)

project_root = Path(__file__).resolve().parent.parent
src_path = project_root / "src"
sys.path.insert(0, str(src_path))

try:
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


def run_structural_analysis(packages):
    print("=" * 60)
    print("RUNNING STRUCTURAL ANALYSIS")
    print("=" * 60)
    
    all_results = []
    
    for i, package in enumerate(packages, 1):
        print(f"\n Package {i}/{len(packages)}: {package.package_name}")
        print("-" * 50)
        print(f"Analyzing package {i}/{len(packages)}: {package.package_name}")
        
        analyzer = StructuralAnalyzer(package)
        
        risks = analyzer.run_all()
        
        csv_logger.log_structural_anlyser(
            package_name=package.package_name,
            version=package.version,
            findings=risks
        )
        
        if risks:
            print(f" Found {len(risks)} risks:")
            for risk in risks:
                print(f"    {risk.risk_type}")
                print(f"     Severity: {risk.severity.value}")
                print(f"     Evidence: {risk.evidence[:80]}...")
                print(f"     Confidence: {risk.confidence}")
                print(f"     Category: {risk.category.value}")
        else:
            print("No risks found")
        
        all_results.append({
            'package': package.package_name,
            'version': package.version,
            'risks': risks
        })
        
        print(f"Analysis completed for {package.package_name}")
    
    return all_results


def generate_llm_context(results):

    print("\n" + "=" * 60)
    print("LLM CONTEXT SUMMARY")
    print("=" * 60)
    
    context_parts = []
    
    for result in results:
        package_name = result['package']
        risks = result['risks']
        
        if risks:
            risk_count = len(risks)
            high_risks = [r for r in risks if r.severity.value in ['high', 'critical']]
            all_categories = list(set([risk.category.value for risk in risks]))
            
            context_parts.append(f" {package_name}:")
            context_parts.append(f"   - Total risks: {risk_count}")
            context_parts.append(f"   - High/Critical: {len(high_risks)}")
            context_parts.append(f"   - Categories: {', '.join(sorted(all_categories))}")
            
            for risk in risks[:3]:
                context_parts.append(f"   - {risk.risk_type}: {risk.evidence[:60]}...")
        else:
            context_parts.append(f" {package_name}: No structural risks detected")
        
        context_parts.append("")
    
    return "\n".join(context_parts)


def main():

    print("Structural Analysis Test")
    
    try:
        loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages"
        )
        
        print("Loading packages...")
        packages = loader.load_malicious_packages(
            use_cache = False,
            force_refresh = False,
            show_progress= True,
            limit=10
        )
        
        if not packages:
            print("No packages loaded!")
            return 1
            
        packages = packages[:10]
        print(f"Loaded {len(packages)} packages")
        
        for i, pkg in enumerate(packages, 1):
            logger.info(f"   {i}. {pkg.package_name}")
        
    except Exception as e:
        print(f"Error loading packages: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    results = run_structural_analysis(packages)
    
    llm_context = generate_llm_context(results)
    logger.info(llm_context)
    
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)
    
    total_risks = sum(len(result['risks']) for result in results)
    packages_with_risks = sum(1 for result in results if result['risks'])
    
    print(f"Packages analyzed: {len(packages)}")
    print(f"Packages with risks: {packages_with_risks}")
    print(f"Total risks found: {total_risks}")
    
    print("Structural Analysis completed successfully!")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
