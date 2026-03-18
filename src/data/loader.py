# Load packages
import json
import logging
import pickle
import re
import re
import tarfile
import shutil
import traceback
import os
from pathlib import Path
from typing import List, Optional, Iterator, Dict, Any, Tuple
from dataclasses import dataclass
from datetime import datetime

from tqdm import tqdm

from src.data.models import PackageProfile
from src.enums.behavior_category import BehaviorCategory
from src.enums.severity import Severity

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

CACHE_VERSION = "1.0"
EXTRACTION_MARKER = ".decompressed"

_NODE_FILE_PATTERN = re.compile(
    r"node\s+([a-zA-Z0-9_\-./]+\.(?:js|cjs|mjs))",
    re.IGNORECASE
)

def _add_mode(directory: str):
    """
    Fix directory and file permissions recursively.
    
    Args:
        directory: Folder path to fix permissions for
    """
    if not os.path.exists(directory):
        return
    
    try:
        for dirpath, dirnames, filenames in os.walk(directory):
            # Fix directory permissions (rwxr-xr-x = 755)
            for dirname in dirnames:
                dir_path = os.path.join(dirpath, dirname)
                if not os.access(dir_path, os.R_OK | os.W_OK | os.X_OK):
                    try:
                        os.chmod(dir_path, 0o755)
                    except Exception as e:
                        logger.warning(f"Could not fix permissions for directory {dir_path}: {e}")
              
            # Fix file permissions (rw-r--r-- = 644)          
            for filename in filenames:
                file_path = os.path.join(dirpath, filename)
                if not os.access(file_path, os.R_OK | os.W_OK):
                    try:
                        os.chmod(file_path, 0o644)
                    except Exception as e:
                        logger.warning(f"Could not fix permissions for file {file_path}: {e}")

    except Exception as e:
        logger.error(f"Error while fixing permissions in {directory}: {e}")

def _decompress_tarballs(
    source_dir: Path,
    dest_dir: Path,
    use_cache: bool = False,
    show_progress: bool = True
) -> Tuple[Path, bool]:
    """
    Decompress .tar.gz and .tgz files to a destination directory.
        
    Args:
        source_dir: Directory containing tarballs
        dest_dir: Where to extract packages
        use_cache: If True and dest already exists, skip decompression
        show_progress: Show progress bar
    
    Returns:
        Tuple of (extraction_path, was_extracted)
        - extraction_path: Path to directory with extracted packages
        - was_extracted: True if extraction was performed, False if cached
    """
    marker_file = dest_dir / EXTRACTION_MARKER
    
    if use_cache and marker_file.exists():
        logger.info(f"Using cached decompressed dataset: {dest_dir}")
        return dest_dir, False
    
    if not dest_dir.exists():
        dest_dir.mkdir(parents=True, exist_ok=True)
    
    
    tarball_files = [
        f for f in source_dir.iterdir()
        if f.is_file() and (f.suffix in ['.gz', '.tgz'] or f.name.endswith('.tar.gz'))
    ]
    
    if not tarball_files:
        logger.warning(f"No tarballs found in {source_dir}")
        return dest_dir, False
    
    logger.info(f"Found {len(tarball_files)} tarballs to decompress")
    
    if dest_dir.exists() and not marker_file.exists():
        logger.info("Incomplete extraction found, cleaning up...")
        shutil.rmtree(dest_dir)
        dest_dir.mkdir(parents=True)
    
    iterable = tqdm(tarball_files, desc="Decompressing tarballs") if show_progress else tarball_files
    
    failed = []
    successful = 0
    
    for tarball_path in iterable:
        # Get clean package name from tarball (remove .tar/.gz extension)
        package_name = tarball_path.stem
        if package_name.endswith('.tar'):
            package_name = package_name[:-4]
            
        package_name = "".join(c for c in package_name if c.isalnum() or c in ('-', '_','.','@'))
            
        temp_path = dest_dir / package_name
        
        try:
            temp_path.mkdir(parents=True, exist_ok=True)
            with tarfile.open(tarball_path, 'r:gz') as tar:
                def is_safe_path(member):
                    if member.isdir():
                        return True
                    member_path = Path(temp_path) / member.name
                    try:
                        member_path.resolve().relative_to(temp_path.resolve())      # Ensure member path is inside temp_package_path
                        return True
                    except ValueError:
                        logger.warning(f"Unsafe path detected in tarball {tarball_path}: {member.name}")
                        return False
                
                safe_members = [m for m in tar.getmembers() if is_safe_path(m)]
                if safe_members:
                    tar.extractall(path=temp_path, members=safe_members)
                else:
                    raise ValueError(f"No safe paths in {tarball_path.name} to extract")
                
                successful += 1

        except Exception as e:
            logger.error(f"Failed to decompress for {package_name}: {e}")
            failed.append(tarball_path.name)
            
            if temp_path.exists():
                shutil.rmtree(temp_path, ignore_errors=True)
                
    _add_mode(str(dest_dir))
    
    if successful > 0:
        marker_file.write_text(
            f"Extraction completed at: {datetime.now()}\n"
            f"Source: {source_dir}\n"
            f"Success: {successful}/{len(tarball_files)}\n"
            f"Failed: {len(failed)}\n"
            f"Cache version: {CACHE_VERSION}"
        )
        logger.info(f"Extraction complete: {successful}/{len(tarball_files)} successful")

        if failed:
            logger.warning("Failed packages:\n" + "\n".join(failed))

        
        return dest_dir, True
    else:
        logger.error("No packages were successfully extracted!")
        return dest_dir, False
        

@dataclass
class DatasetMetadata:
    """Quick statistics without full load."""
    total_packages: int
    malicious_count: int
    benign_count: int
    avg_size_mb: float
    cache_exists: bool
    extracted_exists: bool
    cache_timestamp: Optional[datetime] = None
    # extraction_timestamp: Optional[datetime] = None

    def __str__(self) -> str:
        status = "CACHED" if self.cache_exists else "NOT CACHED"
        extracted_status = "EXTRACTED" if self.extracted_exists else "NOT EXTRACTED"
        return (
            f"Dataset Metadata ({status}):\n"
            f"  Total packages: {self.total_packages:,}\n"
            f"  Malicious: {self.malicious_count:,}\n"
            f"  Benign: {self.benign_count:,}\n"
            f"  Avg size: {self.avg_size_mb:.2f} MB"
        )
        
# ============================================================================
# MAIN LOADER CLASS
# ============================================================================

class DatasetLoader:
    """
    Loader for package datasets from tarballs, with caching support.
    """
    
    def __init__(
        self,
        source_dir: str,
        cache_dir: str = "./cache",
        mal_folder: str = "mal",
        ben_folder: str = "ben",
        extract_dir: str = "./extracted_packages"
    ):
        
        """
        Initialize loader.

        Args:
            source_dir: Root folder containing malicious/ and benign/ subfolders
            cache_dir: Where to store cached package data
            mal_folder: Name of malicious packages folder
            ben_folder: Name of benign packages folder (for evaluation only)
            extract_dir: Where to extract tarballs 
        """
        self.data_dir = Path(source_dir)
        self.cache_dir = Path(cache_dir)
        self.extract_dir = Path(extract_dir)
        
        self.mal_source = self.data_dir / mal_folder
        self.ben_source = self.data_dir / ben_folder
        self.mal_extracted = self.extract_dir / "mal"
        self.ben_extracted = self.extract_dir / "ben"
        
        dataset_name = self.data_dir.name
        self.dataset_cache = self.cache_dir / dataset_name 
        
        self.dataset_cache.mkdir(parents=True, exist_ok=True)
        self.extract_dir.mkdir(parents=True, exist_ok=True)
        
        self.cache_dir.mkdir(exist_ok=True)
        
        # print(f"   DEBUG PATHS:")
        # print(f"   Current dir: {Path.cwd()}")
        # print(f"   source_dir : '{source_dir}'")
        # print(f"   self.mal_source: {self.mal_source.absolute()}")
        
        if not self.data_dir.exists():
            raise FileNotFoundError(f"Source directory does not exist: {self.data_dir}")
        
        if not self.mal_source.exists():
            raise FileNotFoundError(f"Malicious folder does not exist: {self.mal_source}")   
         
        if not self.ben_source.exists():
            raise FileNotFoundError(f"Benign folder does not exist: {self.ben_source}")
        
        logger.info(f"DatasetLoader initialized:")
        logger.info(f"  Source: {self.data_dir}")
        logger.info(f"  Cache: {self.cache_dir}")
        logger.info(f"  Extracted: {self.extract_dir}")    
        
        
    def ensure_extracted(
        self, 
        package_type: str = "malicious",
        use_cache: bool = True,
        show_progress: bool = True
    ) -> Path:
        """
        Ensure packages are extracted before loading.
        
        Args:
            package_type: "malicious" or "benign"
            use_cache: Use extraction cache if available
            show_progress: Show progress bar
            
        Returns:
            Path to extracted packages directory
        """
        if package_type == "malicious":
            source_dir = self.mal_source
            dest_dir = self.mal_extracted
        else:
            source_dir = self.ben_source
            dest_dir = self.ben_extracted
        
        if not source_dir.exists():
            raise FileNotFoundError(f"Source directory not found: {source_dir}")

        extracted_path, was_extracted = _decompress_tarballs(
            source_dir, 
            dest_dir, 
            use_cache=use_cache,
            show_progress=show_progress
        )
        
        if was_extracted:
            logger.info(f"Extracted packages to {extracted_path} newly")
        else:
            logger.info(f"Using existing extracted packages in {extracted_path}")
            
        return extracted_path
    
    def load_packages(
        self,
        use_cache: bool = True,
        force_refresh: bool = False,
        show_progress: bool = True,
        limit: Optional[int] = None,
        balanced_experiment_test_only: bool = False
    ) -> List[PackageProfile]:
        """
        Load ALL packages (both malicious and benign).
        
        Args:
            use_cache: If True, use cached data if available
            force_refresh: If True, skip cache and reload from disk
            show_progress: Show progress bar during loading
            limit: Maximum number of packages to load TOTAL (not per class)
            balanced: If True, load equal number of malicious and benign packages
            
        Returns:
            List of PackageProfile objects with correct labels
        """
        cache_path = self.dataset_cache / "all_packages_cache.pkl"

        if use_cache and cache_path.exists() and not force_refresh:
            logger.info(f"Loading all packages from cache: {cache_path}")
            try:
                packages = self._load_cache(cache_path)
                if limit:
                    packages = packages[:limit]
                logger.info(f"Loaded {len(packages)} packages from cache")
                return packages
            except Exception as e:
                logger.warning(f"Cache load failed: {e}, reloading from disk...")
                force_refresh = True
        
        # Load malicious packages
        malicious_packages = self.load_malicious_packages(
            use_cache=use_cache,
            force_refresh=force_refresh,
            show_progress=False,
            limit=None if not balanced_experiment_test_only else (limit // 2 if limit else None)
        )
        
        # Load benign packages
        benign_packages = self.load_benign_packages(
            use_cache=use_cache,
            force_refresh=force_refresh,
            show_progress=False,
            limit=None if not balanced_experiment_test_only else (limit // 2 if limit else None)
        )
        
        # Combine
        all_packages = malicious_packages + benign_packages
        
        if limit and len(all_packages) > limit:
            all_packages = all_packages[:limit]
        
        logger.info(f"Loaded {len(all_packages)} total packages:")
        logger.info(f"  - Malicious: {len(malicious_packages)}")
        logger.info(f"  - Benign: {len(benign_packages)}")
        
        if use_cache and all_packages:
            self._save_cache(all_packages, cache_path)
        
        return all_packages
        
        
    def load_malicious_packages(
        self,
        use_cache: bool = True,
        force_refresh: bool = False,
        show_progress: bool = True,
        limit: Optional[int] = None
    ) -> List[PackageProfile]:
        """
        Load ALL malicious packages for training phase.

        Args:
            use_cache: If True, use cached data if available
            force_refresh: If True, skip cache and reload from disk
            show_progress: Show progress bar during loading
            limit: Maximum number of packages to load

        Returns:
            List of PackageProfile objects (labeled as malicious)
        """
        cache_path = self.dataset_cache / "mal_packages_cache.pkl"

        if use_cache and cache_path.exists() and not force_refresh:
            logger.info(f"Loading from cache: {cache_path}")
            try:
                packages = self._load_cache(cache_path)
                if limit:
                    packages = packages[:limit]
                logger.info(f"Loaded {len(packages)} malicious packages from cache")
                return packages
            except Exception as e:
                logger.warning(f"Cache load failed with error: {e}, reloading from disk...")
                force_refresh = True

        extracted_path = self.ensure_extracted("malicious", use_cache=use_cache, show_progress=show_progress)
        
        logger.info(f"Loading malicious packages from: {extracted_path}...")

        packages = self._load_packages_from_folder(
            folder_path=extracted_path,
            label="malicious",
            limit=limit,
            show_progress=show_progress
        )

        if use_cache and packages:
            self._save_cache(packages, cache_path)

        logger.info(f"Loaded {len(packages)} malicious packages successfully")
        return packages
    
    def load_benign_packages(
        self,
        use_cache: bool = True,
        force_refresh: bool = False,
        show_progress: bool = True,
        limit: Optional[int] = None
    ) -> List[PackageProfile]:
        """
        Load ALL packages for training phase.

        Args:
            use_cache: If True, use cached data if available
            force_refresh: If True, skip cache and reload from disk
            show_progress: Show progress bar during loading
            limit: Maximum number of packages to load

        Returns:
            List of PackageProfile objects
        """
        cache_path = self.dataset_cache / "ben_packages_cache.pkl"

        if use_cache and cache_path.exists() and not force_refresh:
            logger.info(f"Loading from cache: {cache_path}")
            try:
                packages = self._load_cache(cache_path)
                if limit:
                    packages = packages[:limit]
                logger.info(f"Loaded {len(packages)} packages from cache")
                return packages
            except Exception as e:
                logger.warning(f"Cache load failed with error: {e}, reloading from disk...")
                force_refresh = True

        extracted_path = self.ensure_extracted("benign", use_cache=use_cache, show_progress=show_progress)
        
        logger.info(f"Loading  packages from: {extracted_path}...")

        packages = self._load_packages_from_folder(
            folder_path=extracted_path,
            label="benign",
            limit=limit,
            show_progress=show_progress
        )

        if use_cache and packages:
            self._save_cache(packages, cache_path)

        logger.info(f"Loaded {len(packages)} benign packages successfully")
        return packages
    
    def stream_malicious_packages(
        self, 
        use_cache: bool = True,
        show_progress: bool = True
    ) -> Iterator[PackageProfile]:
        """
        Stream malicious packages one by one without full loading.

        Yields:
            PackageProfile objects labeled as 
        """
        extracted_path = self.ensure_extracted("malicious", use_cache=use_cache, show_progress=show_progress)
        package_dirs = sorted([d for d in extracted_path.iterdir() if d.is_dir()])
        
        logger.info(f"Streaming {len(package_dirs)}  packages...")
        
        iterable = tqdm(package_dirs, desc="Streaming packages") if show_progress else package_dirs
        
        for pkg_dir in iterable:
            try:
                package = self._load_single_package(pkg_dir, label="malicious")
                if package:
                    yield package
            except Exception as e:
                logger.warning(f"Error loading package {pkg_dir}: {e}")
                continue
    
    def stream_benign_packages(
        self, 
        use_cache: bool = True,
        show_progress: bool = True
    ) -> Iterator[PackageProfile]:
        """
        Stream benign packages one by one without full loading.

        Yields:
            PackageProfile objects labeled as 
        """
        extracted_path = self.ensure_extracted("benign", use_cache=use_cache, show_progress=show_progress)
        package_dirs = sorted([d for d in extracted_path.iterdir() if d.is_dir()])
        
        logger.info(f"Streaming {len(package_dirs)}  packages...")
        
        iterable = tqdm(package_dirs, desc="Streaming packages") if show_progress else package_dirs
        
        for pkg_dir in iterable:
            try:
                package = self._load_single_package(pkg_dir, label="benign")
                if package:
                    yield package
            except Exception as e:
                logger.warning(f"Error loading package {pkg_dir}: {e}")
                continue
    
    # HELPER METHODS
    
    def get_dataset_metadata(self) -> DatasetMetadata:
        """
        Gather metadata about the dataset without full loading.

        Returns:
            DatasetMetadata object
        """
        mal_tarballs = list(self.mal_source.iterdir()) if self.mal_source.exists() else []
        ben_tarballs = list(self.ben_source.iterdir()) if self.ben_source.exists() else []
        total_packages = len(mal_tarballs) + len(ben_tarballs)

        total_size = sum(
            sum(f.stat().st_size for f in d.glob('*') if f.is_file())
            for d in mal_tarballs + ben_tarballs
        )
        avg_size_mb = (total_size / total_packages) / (1024 * 1024) if total_packages > 0 else 0.0
        
        cache_path = self.dataset_cache / "mal_packages_cache.pkl"
        cache_exists = cache_path.exists()
        cache_timestamp = datetime.fromtimestamp(cache_path.stat().st_mtime) if cache_exists else None

        mal_extracted_exists = (self.mal_extracted / EXTRACTION_MARKER).exists()
        ben_extracted_exists = (self.ben_extracted / EXTRACTION_MARKER).exists()
        extraction_timestamp = None
        if mal_extracted_exists:
            marker_file = self.mal_extracted / EXTRACTION_MARKER
            extraction_timestamp = datetime.fromtimestamp(marker_file.stat().st_mtime)
            
        if ben_extracted_exists:
            marker_file = self.ben_extracted / EXTRACTION_MARKER
            ben_extraction_time = datetime.fromtimestamp(marker_file.stat().st_mtime)
            if extraction_timestamp is None or ben_extraction_time > extraction_timestamp:
                extraction_timestamp = ben_extraction_time
        
        return DatasetMetadata(
            total_packages=total_packages,
            malicious_count=len(mal_tarballs),
            benign_count=len(ben_tarballs),
            avg_size_mb=avg_size_mb,
            cache_exists=cache_exists,
            extracted_exists=mal_extracted_exists or ben_extracted_exists,
            cache_timestamp=cache_timestamp,
        )
        
    
    def validate_dataset(self, sample_size: int = 20) -> Dict[str, Any]:
        """
        Validate dataset structure and extraction.
        """
        logger.info(f"Validating dataset with {sample_size} samples...")
        
        try:
            extracted_path = self.ensure_extracted("malicious", use_cache=True, show_progress=False)
            extracted_path_ben = self.ensure_extracted("benign", use_cache=True, show_progress=False)
        except Exception as e:
            return {
                "valid": False,
                "error": f"Extraction failed: {e}"
            }
        
        mal_dirs = [d for d in extracted_path.iterdir() if d.is_dir()]
        ben_dirs = [d for d in extracted_path_ben.iterdir() if d.is_dir()]
    
        total_mal = len(mal_dirs)
        total_ben = len(ben_dirs)
        total_available = total_mal + total_ben
        
        if total_available == 0:
            return {
                "valid": False,
                "error": "No extracted packages found"
            }
        
        if total_available <= sample_size:
            package_dirs = mal_dirs + ben_dirs
        else:
            mal_ratio = total_mal / total_available
            mal_sample_size = max(1, int(sample_size * mal_ratio)) 
            ben_sample_size = max(1, sample_size - mal_sample_size)
            
            mal_sample_size = min(mal_sample_size, total_mal)
            ben_sample_size = min(ben_sample_size, total_ben)
            
            package_dirs = mal_dirs[:mal_sample_size] + ben_dirs[:ben_sample_size]
        
        logger.info(f"Sampling {len([d for d in package_dirs if d.parent.name == 'mal'])} malicious "
                    f"and {len([d for d in package_dirs if d.parent.name == 'ben'])} benign packages "
                    f"(Total available: {total_mal} mal, {total_ben} ben)")
        
            
        issues = []
        valid_count = 0
        mal_valid = 0
        ben_valid = 0
        
        for pkg_dir in package_dirs:
            package_subdir = pkg_dir / "package"
            if package_subdir.exists():
                package_json_path = package_subdir / "package.json"  
            else:
                package_json_path = pkg_dir / "package.json"
                
            if not package_json_path.exists():
                # Look for package.json in subdirectories (common in extracted tarballs)
                package_json_candidates = list(pkg_dir.rglob("package.json"))
                if not package_json_candidates:
                    issues.append(f"{pkg_dir.name}: No package.json found")
                    continue
                package_json_path = package_json_candidates[0]
            
            try:
                with open(package_json_path) as f:
                    package_data = json.load(f)
            except (json.JSONDecodeError, Exception) as e:
                issues.append(f"{pkg_dir.name}: Invalid package.json - {e}")
                continue
                
            if not package_data.get("name"):
                issues.append(f"{pkg_dir.name}: Missing package name")
                continue
                
            valid_count += 1
            if pkg_dir.parent.name == "mal":
                mal_valid += 1
            else:
                ben_valid += 1
            
        is_valid = valid_count >= max(1, len(package_dirs) * 0.8)       # At least 80% valid
        status = "VALID" if is_valid else "INVALID"
        
        logger.info(f"{status}: {valid_count}/{len(package_dirs)} packages valid")
        logger.info(f"  - Malicious: {mal_valid}/{len([d for d in package_dirs if d.parent.name == 'mal'])} valid")
        logger.info(f"  - Benign: {ben_valid}/{len([d for d in package_dirs if d.parent.name == 'ben'])} valid")
        
        return {
            "valid": is_valid,
            "total_checked": len(package_dirs),
            "total_available": total_available,
            "malicious_available": total_mal,
            "benign_available": total_ben,
            "valid_count": valid_count,
            "malicious_valid": mal_valid,
            "benign_valid": ben_valid,
            "invalid_count": len(issues),
            "issues": issues
        }
          
    def _load_install_script_files(
        self,
        package_dir: Path,
        package_data: dict,
        max_size_bytes: int = 512 * 1024,  # 512KB cap — avoid reading large bundles
    ) -> Dict[str, str]:
        """
        Read the content of JS files called from install hooks.
    
        Args:
            package_dir: Path to package directory (contains package.json)
            package_data: Dict parsed from package.json
            max_size_bytes: Skip files larger than this limit (avoid minified bundles)
    
        Returns:
            Dict mapping filename → content JS
        """
        scripts = package_data.get("scripts", {})
        result: Dict[str, str] = {}
    
        install_hooks = ["preinstall", "install", "postinstall", "prepublish", "prepare"]
    
        for hook in install_hooks:
            command = scripts.get(hook, "")
            if not command:
                continue
    
            # Find "node <file.js>" in command
            for match in _NODE_FILE_PATTERN.finditer(command):
                filename = match.group(1)
                file_path = package_dir / filename
    
                if not file_path.exists():
                    continue
    
                # Skip file too large (usually bundles, not malware scripts)
                try:
                    size = file_path.stat().st_size
                    if size > max_size_bytes:
                        continue
                except OSError:
                    continue
    
                # Read content
                try:
                    content = file_path.read_text(encoding="utf-8", errors="replace")
                    if content.strip():
                        result[filename] = content
                except Exception:
                    continue
    
        return result  
            
    def _extract_install_script(self, package_data: dict) -> Optional[str]:
        """
        Extract install script from package.json data.
        
        """
        
        scripts = package_data.get("scripts", {})
        install_hooks = {}
        
        for hook in ["install", "preinstall", "postinstall", "prepublish"]:
            if hook in scripts:
                install_hooks[hook] = scripts[hook]
                
        if install_hooks:
            return "\n".join(f"{k}: {v}" for k, v in install_hooks.items())
        
        return None
    
    def _load_entry_point(self, package_dir: Path, package_data: dict) -> Optional[str]:
        """
        Load the main entry point code content.
        
        Args:
            package_dir: Path to package directory
            package_data: Loaded package.json data (Parsed)
        """
        
        main = package_data.get("main", "index.js")
        main_path = package_dir / main
        
        if not main_path.exists():
            for candidate in ["index.js", "main.js", "src/index.js", "lib/index.js"]:
                candidate_path = package_dir / candidate
                if candidate_path.exists():
                    main_path = candidate_path
                    break
                
        if main_path.exists():
            try:
                with open(main_path, 'r', encoding='utf-8') as f:
                    return f.read()
            except Exception:
                pass
            
        return None
    
    
    def _load_readme(self, package_dir: Path) -> Optional[str]:
        """
        Load README file content if exists.
        """        
        for readme_file in ["README.md", "README.txt", "readme.md", "readme.txt"]:
            readme_path = package_dir / readme_file
            if readme_path.exists():
                try:
                    content = readme_path.read_text(encoding='utf-8')
                    if len(content.strip()) > 50:
                        return content
                except Exception:
                    pass
        
        return None
    
    def _get_file_structure(self, package_dir: Path, max_files: int = 100) -> List[str]:
        """
        Get a list of file paths in the package, limited to max_files.
        """
        file_list = []
        
        try:
            for files in package_dir.rglob('*'):
                if files.is_file():
                    file_list.append(str(files.relative_to(package_dir)))
                    if len(file_list) >= max_files:
                        break
        except Exception:
            pass
        return sorted(file_list)
    
    def _has_native_code(self, file_structure: List[str]) -> bool:
        """
        Check if package contains native code files.
        """
        native_extensions = {'.node', '.cc','.c', '.cpp', '.h', '.so', '.dll', '.dylib'}

        for f in file_structure:
            for ext in native_extensions:
                if f.endswith(ext):
                    return True
        return False


    def _save_cache(self, packages: List[PackageProfile], cache_path: Path):
        """Save packages to pickle cache (fast binary format)."""
        try:
            with open(cache_path, 'wb') as f:
                pickle.dump({
                    'version': CACHE_VERSION,
                    'packages': packages,
                    'timestamp': datetime.now()
                }, f)
            logger.info(f"Cached {len(packages)} packages to {cache_path}")
        except Exception as e:
            logger.warning(f"Failed to cache: {e}")


    def _load_cache(self, cache_path: Path) -> List[PackageProfile]:
        """Load packages from pickle cache."""
        with open(cache_path, 'rb') as f:
            data = pickle.load(f)
        
        if data.get('version') != CACHE_VERSION:
            raise ValueError("Cache version mismatch")
        
        return data['packages']
    
    # def _load_single_package(self, package_dir: Path, label: str) -> Optional[PackageProfile]:
    #     """ Load a single package directory """

    #     package_json_path = package_dir / "package" / "package.json"
        
    #     if not package_json_path.exists():
    #         package_json_path = package_dir / "package.json"

    #     if not package_json_path.exists():
    #         logger.warning(f"Missing package.json in {package_dir}")
    #         return None
        
    #     try: 
    #         with open(package_json_path, 'r', encoding='utf-8') as f:
    #             package_data = json.load(f) 
    #     except Exception as e:
    #         logger.debug(f"Failed to load package.json in {package_dir}: {e}")
    #         return None
        
    #     name = package_data.get("name", package_dir.name)
    #     version = package_data.get("version", "1.0.0")
        
    #     install_script = self._extract_install_script(package_data)
        
    #     install_script_files = self._load_install_script_files(pkg_dir, package_data)
        
    #     pkg_dir = package_json_path.parent          #dataset/mal/package_name/package/
        
    #     entry_point_code = self._load_entry_point(pkg_dir, package_data)
        
    #     readme_content = self._load_readme(pkg_dir)
        
    #     file_structure = self._get_file_structure(pkg_dir)
        
    #     has_native = self._has_native_code(file_structure)
        
    #     return PackageProfile(
    #         package_name=name,
    #         version=version,
    #         dependencies=package_data.get("dependencies", {}),
    #         dev_dependencies=package_data.get("devDependencies", {}),
    #         peer_dependencies=package_data.get("peerDependencies", {}),
    #         scripts=package_data.get("scripts", {}),
    #         readme_content=readme_content,
    #         entry_point_code=entry_point_code,
    #         install_script_content=install_script,
    #         install_script_files=install_script_files,
    #         file_structure=file_structure,
    #         has_native_code=has_native,
    #         package_json_raw=package_data,
    #         label=label
    #     )
    
    def _load_single_package(self, package_dir: Path, label: str) -> Optional[PackageProfile]:
        # Đổi parameter name thành package_dir thay vì pkg_dir
        
        package_json_path = package_dir / "package" / "package.json"
        
        if not package_json_path.exists():
            package_json_path = package_dir / "package.json"

        if not package_json_path.exists():
            logger.warning(f"Missing package.json in {package_dir}")
            return None
        
        try: 
            with open(package_json_path, 'r', encoding='utf-8') as f:
                package_data = json.load(f) 
        except Exception as e:
            logger.debug(f"Failed to load package.json in {package_dir}: {e}")
            return None
        
        name = package_data.get("name", package_dir.name)
        version = package_data.get("version", "1.0.0")
        
        install_script = self._extract_install_script(package_data)
        
        pkg_root = package_json_path.parent

        install_script_files = self._load_install_script_files(pkg_root, package_data)  # ← bỏ self thủ công
        entry_point_code = self._load_entry_point(pkg_root, package_data)               # ← bỏ self
        readme_content = self._load_readme(pkg_root)                                     # ← bỏ self
        file_structure = self._get_file_structure(pkg_root)                              # ← bỏ self
        has_native = self._has_native_code(file_structure)                               # ← bỏ self
                
        return PackageProfile(
            package_name=name,
            version=version,
            dependencies=package_data.get("dependencies", {}),
            dev_dependencies=package_data.get("devDependencies", {}),
            peer_dependencies=package_data.get("peerDependencies", {}),
            scripts=package_data.get("scripts", {}),
            readme_content=readme_content,
            entry_point_code=entry_point_code,
            install_script_content=install_script,
            install_script_files=install_script_files,
            file_structure=file_structure,
            has_native_code=has_native,
            package_json_raw=package_data,
            label=label
        )

    def _load_packages_from_folder(
        self,
        folder_path: Path,
        label: str,
        limit: Optional[int] = None,
        show_progress: bool = True
    ) -> List[PackageProfile]:
        """ Load packages from folder"""
        
        package_dirs = sorted([d for d in folder_path.iterdir() if d.is_dir()])
        
        if limit:
            package_dirs = package_dirs[:limit]

        packages = []
        iterable = tqdm(package_dirs, desc=f"Loading {label} packages") if show_progress else package_dirs
        
        for pkg_dir in iterable:
            try:
                package = self._load_single_package(pkg_dir, label)
                if package:
                    packages.append(package)
            except Exception as e:
                logger.warning(f"Error loading package {pkg_dir}: {e}")  # đổi debug → warning
                import traceback
                traceback.print_exc()  # thêm dòng này
                continue
                
        return packages