"""
STRUCTURAL ANALYSIS TEST (MALICIOUS + BENIGN)
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
    print(" Imports successful")
    logger.info("Successfully imported necessary modules for structural analysis test")
except ImportError as e:
    print(f" Import error: {e}")
    logger.error(f"Import error: {e}")
    sys.exit(1)


def run_structural_analysis(packages):
    print("=" * 60)
    print("RUNNING STRUCTURAL ANALYSIS")
    print("=" * 60)
    
    all_results = []
    
    mal_packages = [p for p in packages if p.label == "malicious"]
    ben_packages = [p for p in packages if p.label == "benign"]
    
    print(f"\nAnalyzing {len(mal_packages)} malicious + {len(ben_packages)} benign packages...")
    print(f"Total: {len(packages)} packages\n")
    
    for i, package in enumerate(packages, 1):
        label_emoji = "" if package.label == "malicious" else ""
        print(f"\n{label_emoji} Package {i}/{len(packages)}: {package.package_name} [{package.label.upper()}]")
        print("-" * 50)
        
        analyzer = StructuralAnalyzer(package)
        
        risks = analyzer.run_all()
        
        csv_logger.log_structural_anlyser(
            package_name=package.package_name,
            version=package.version,
            findings=risks
        )
        
        if risks:
            print(f"Found {len(risks)} risk(s):")
            for risk in risks:
                print(f"   {risk.risk_type}")
                print(f"      Severity: {risk.severity.value.upper()}")
                print(f"      Evidence: {risk.evidence[:80]}...")
                print(f"      Confidence: {risk.confidence:.2f}")
                print(f"      Category: {risk.category.value}")
        else:
            print(" No risks found")
        
        all_results.append({
            'package': package.package_name,
            'version': package.version,
            'label': package.label,
            'risks': risks
        })
        
        print(f"✓ Analysis completed for {package.package_name}")
    
    return all_results


def generate_llm_context(results):
    """Generate summary context for LLM analysis"""
    
    print("\n" + "=" * 60)
    print("LLM CONTEXT SUMMARY")
    print("=" * 60)
    
    context_parts = []
    
    mal_results = [r for r in results if r['label'] == 'malicious']
    ben_results = [r for r in results if r['label'] == 'benign']
    
    context_parts.append("=== MALICIOUS PACKAGES ===\n")
    for result in mal_results:
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
    
    context_parts.append("\n=== BENIGN PACKAGES ===\n")
    for result in ben_results:
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


def print_detailed_summary(results):
    """Detailed analysis summary"""
    
    print("\n" + "=" * 60)
    print("DETAILED ANALYSIS SUMMARY")
    print("=" * 60)
    
    mal_results = [r for r in results if r['label'] == 'malicious']
    ben_results = [r for r in results if r['label'] == 'benign']
    
    mal_with_risks = sum(1 for r in mal_results if r['risks'])
    mal_total_risks = sum(len(r['risks']) for r in mal_results)
    mal_high_risks = sum(1 for r in mal_results for risk in r['risks'] if risk.severity.value in ['high', 'critical'])
    
    ben_with_risks = sum(1 for r in ben_results if r['risks'])
    ben_total_risks = sum(len(r['risks']) for r in ben_results)
    ben_high_risks = sum(1 for r in ben_results for risk in r['risks'] if risk.severity.value in ['high', 'critical'])
    
    print("\n MALICIOUS PACKAGES:")
    print(f"   Total analyzed: {len(mal_results)}")
    print(f"   With risks: {mal_with_risks}/{len(mal_results)} ({mal_with_risks/len(mal_results)*100:.1f}%)")
    print(f"   Total risks: {mal_total_risks}")
    print(f"   High/Critical risks: {mal_high_risks}")
    if mal_results:
        print(f"   Avg risks per package: {mal_total_risks/len(mal_results):.2f}")
    
    print("\n BENIGN PACKAGES:")
    print(f"   Total analyzed: {len(ben_results)}")
    print(f"   With risks: {ben_with_risks}/{len(ben_results)} ({ben_with_risks/len(ben_results)*100 if ben_results else 0:.1f}%)")
    print(f"   Total risks: {ben_total_risks}")
    print(f"   High/Critical risks: {ben_high_risks}")
    if ben_results:
        print(f"   Avg risks per package: {ben_total_risks/len(ben_results):.2f}")


def main():
    print("=" * 60)
    print("STRUCTURAL ANALYSIS TEST (MAL + BEN)")
    print("=" * 60)
    
    NUM_PACKAGES = 130
    
    try:
        loader = DatasetLoader(
            source_dir="./dataset",
            extract_dir="./extracted_packages"
        )
        
        print(f"\n Loading {NUM_PACKAGES} packages...")
        packages = loader.load_packages(
            use_cache=False, 
            limit=NUM_PACKAGES,
            balanced_experiment_test_only=False 
        )
        
        if not packages:
            print(" No packages loaded!")
            return 1
        
        mal_count = sum(1 for p in packages if p.label == "malicious")
        ben_count = sum(1 for p in packages if p.label == "benign")
        
        print(f" Loaded {len(packages)} packages:")
        print(f"    Malicious: {mal_count}")
        print(f"    Benign: {ben_count}")
        
        print("\nPackage list:")
        for i, pkg in enumerate(packages, 1):
            label_emoji = "" if pkg.label == "malicious" else ""
            logger.info(f"   {i}. {label_emoji} {pkg.package_name} [{pkg.label}]")
        
    except Exception as e:
        print(f" Error loading packages: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    results = run_structural_analysis(packages)
    
    llm_context = generate_llm_context(results)
    logger.info(llm_context)
    
    print_detailed_summary(results)
    
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)
    
    total_risks = sum(len(result['risks']) for result in results)
    packages_with_risks = sum(1 for result in results if result['risks'])
    
    print(f" Packages analyzed: {len(packages)}")
    print(f"    Malicious: {sum(1 for r in results if r['label'] == 'malicious')}")
    print(f"    Benign: {sum(1 for r in results if r['label'] == 'benign')}")
    print(f"  Packages with risks: {packages_with_risks}/{len(packages)} ({packages_with_risks/len(packages)*100:.1f}%)")
    print(f" Total risks found: {total_risks}")
    
    print("\n Structural Analysis completed successfully!")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())