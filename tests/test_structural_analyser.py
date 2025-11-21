"""
STRUCTURAL ANALYSIS TEST
"""

import sys
from pathlib import Path
from logs.logging_config import setup_logger

logger = setup_logger()

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
    logger.info("RUNNING STRUCTURAL ANALYSIS")
    
    all_results = []
    
    for i, package in enumerate(packages, 1):
        print(f"\n Package {i}/{len(packages)}: {package.package_name}")
        print("-" * 50)
        logger.info(f"Analyzing package {i}/{len(packages)}: {package.package_name}")
        
        analyzer = StructuralAnalyzer(package)
        
        risks = analyzer.run_all()
        
        if risks:
            logger.info(f" Found {len(risks)} risks:")
            for risk in risks:
                logger.info(f"    {risk.risk_type}")
                logger.info(f"     Severity: {risk.severity.value}")
                logger.info(f"     Evidence: {risk.evidence[:80]}...")
                logger.info(f"     Confidence: {risk.confidence}")
                logger.info(f"     Category: {risk.category.value}")
        else:
            logger.info("No risks found")
        
        all_results.append({
            'package': package.package_name,
            'risks': risks
        })
        
        logger.info(f"Analysis completed for {package.package_name}")
    
    return all_results


def generate_llm_context(results):

    print("\n" + "=" * 60)
    print("LLM CONTEXT SUMMARY")
    print("=" * 60)
    logger.info("LLM CONTEXT SUMMARY")
    
    context_parts = []
    
    for result in results:
        package_name = result['package']
        risks = result['risks']
        
        if risks:
            risk_count = len(risks)
            high_risks = [r for r in risks if r.severity.value in ['high', 'critical']]
            
            context_parts.append(f" {package_name}:")
            context_parts.append(f"   - Total risks: {risk_count}")
            context_parts.append(f"   - High/Critical: {len(high_risks)}")
            
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
        
        logger.info("Loading packages...")
        packages = loader.load_malicious_packages(
            use_cache = True,
            force_refresh = False,
            show_progress= True,
            limit=4
        )
        
        if not packages:
            print("No packages loaded!")
            logger.warning("No packages loaded!")
            return 1
            
        packages = packages[:4]
        print(f"Loaded {len(packages)} packages")
        logger.info(f"Loaded {len(packages)} packages")
        
        for i, pkg in enumerate(packages, 1):
            logger.info(f"   {i}. {pkg.package_name}")
        
    except Exception as e:
        print(f"Error loading packages: {e}")
        logger.error(f"Error loading packages: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    results = run_structural_analysis(packages)
    
    llm_context = generate_llm_context(results)
    logger.info(llm_context)
    
    logger.info("\n" + "=" * 60)
    logger.info("FINAL SUMMARY")
    logger.info("=" * 60)
    
    total_risks = sum(len(result['risks']) for result in results)
    packages_with_risks = sum(1 for result in results if result['risks'])
    
    logger.info(f"Packages analyzed: {len(packages)}")
    logger.info(f"Packages with risks: {packages_with_risks}")
    logger.info(f"Total risks found: {total_risks}")
    
    logger.info("Structural Analysis completed successfully!")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
