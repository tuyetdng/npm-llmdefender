import sys
from pathlib import Path

project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

try:
    from src.data.loader import DatasetLoader
    from src.data.models import PackageProfile
    print("✅ Successfully imported loader and models\n")
except ImportError as e:
    print(f"Import error: {e}")
    print("Check that src/data/loader.py and src/data/models.py exist.")
    sys.exit(1)
    
def verify_package_loading():
    
    loader = DatasetLoader(
        source_dir="./dataset",
        extract_dir="./extracted_packages"
    )
    
    validation = loader.validate_dataset(sample_size=4)
    
    print("="*40)
    print("PACKAGE LOADING VERIFICATION")
    print("="*40)
    
    packages = loader.load_malicious_packages(
        use_cache = True,
        force_refresh = False,
        show_progress= True,
        limit=4
    )
    
    print(f"\nSuccessfully loaded {len(packages)} malicious packages")
    
    print("\n" + "="*60)
    print("=== PackageProfile ===\n")
    for i, pkg in enumerate(packages, 1):
        print(f"[Package {i}]")
        print(f"  package_id: {pkg.package_id}")
        print(f"  package_name: {pkg.package_name}")
        print(f"  version: {pkg.version}")
        print(f"  dependencies: {len(pkg.dependencies)}")
        print(f"  dev_dependencies: {len(pkg.dev_dependencies)}")
        print(f"  peer_dependencies: {len(pkg.peer_dependencies)}")
        print(f"  scripts: {len(pkg.scripts)}")
        
        if pkg.scripts:
            print(f"\n  Scripts:")
            for script_name, script_cmd in list(pkg.scripts.items())[:3]:
                print(f"    {script_name}: {script_cmd[:60]}{'...' if len(script_cmd) > 60 else ''}")
        
        print(f"  readme_content:   {'Yes' if pkg.readme_content else 'No'}")
        print(f"  entry_point_code: {'Yes' if pkg.entry_point_code else 'No'}")
        print(f"  install_script_content:  {'Yes' if pkg.install_script_content else 'No'}")
        
        if pkg.install_script_content:
            print(f"\n  Install hooks:")
            for line in pkg.install_script_content.split('\n')[:3]:
                print(f"    {line[:70]}{'...' if len(line) > 70 else ''}")
                
                
        print(f"  file_structure: {len(pkg.file_structure)} files")
        print(f"  has_native_code: {pkg.has_native_code}")
        print(f"  package_json_raw: {'Yes' if pkg.package_json_raw else 'No'}")
        print(f"  label: {pkg.label}")

        print("\n" + "-"*60 + "\n")
    
    return packages

if __name__ == "__main__":
    packages = verify_package_loading()
    
    print(f"\nSuccessfully loaded {len(packages)} PackageProfile objects")
    