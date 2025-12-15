"""
STRUCTURAL ANALYSIS MODULE
"""

from dataclasses import dataclass
from logs.logging_config import setup_logger
from typing import List
from difflib import get_close_matches
import re

import Levenshtein


from src.data.models import PackageProfile
from src.enums.behavior_category import BehaviorCategory
from src.enums.severity import Severity

logger = setup_logger()

@dataclass
class StructuralAnalysisFinding:
    """Data class to represent a structural analysis finding."""
    risk_type: str
    severity: Severity
    evidence: str
    confidence: float
    category: BehaviorCategory
    
class StructuralAnalyzer:
    """
    STATIC ANALYSIS - METADATA-LEVEL
    
    Techniques: Regex, heuristics, Levenshtein distance...
    """
    def __init__(self, package_profile: PackageProfile):
        self.package_profile = package_profile
        self.risks: List[StructuralAnalysisFinding] = []
        

    def _check_install_script(self):
        """
        Check for malicious install/preinstall/postinstall hooks.
        """
        risky = ["preinstall", "install", "postinstall"]
        
        mal_script_patterns = [
                (r'curl\s+.*\|\s*(?:bash|sh)', BehaviorCategory.REMOTE_CODE_EXECUTION),
                (r'wget\s+.*\|\s*(?:bash|sh)', BehaviorCategory.REMOTE_CODE_EXECUTION),
                (r'eval\s*\(', BehaviorCategory.DYNAMIC_CODE_EXECUTION),
                (r'Function\s*\(', BehaviorCategory.DYNAMIC_CODE_EXECUTION),
                (r'process\.env\[\s*[\'"](?:NPM_TOKEN|TOKEN|PASSWORD)', BehaviorCategory.CREDENTIAL_THEFT),
                (r'(?:btoa|atob|Buffer\.from).*(?:eval|Function)', BehaviorCategory.OBFUSCATION),
            ]
        
        for hook in risky:
            if hook in self.package_profile.scripts:
                script = self.package_profile.scripts[hook]
                
                for pattern, category in mal_script_patterns:
                    if re.search(pattern, script, re.IGNORECASE):
                        self.risks.append(StructuralAnalysisFinding(
                            risk_type=f"{hook}_script",
                            severity=Severity.HIGH,
                            evidence=f"{hook}: {script[:100]}...",
                            confidence=0.9,
                            category=category
                        ))
                        
                if not any(re.search(p[0], script, re.IGNORECASE) for p in mal_script_patterns):
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type="install_hook_present",
                        severity=Severity.MEDIUM,
                        evidence=f"{hook} script found",
                        confidence=0.5,
                        category=BehaviorCategory.INSTALL_HOOK
                    ))
                    

    def _check_typosquatting(self):
        """
        Check for potential typosquatting in package name.
        """
        POPULAR_PACKAGES = [
            # Most Targeted
            "react", "express", "lodash", "axios", "request", 
            "moment", "chalk", "commander", "fs-extra", "debug",
            # Development Tools
            "webpack", "babel", "typescript", "eslint", "prettier",
            "jest", "mocha", "chai", "sinon", "nyc",
            "rimraf", "cross-env", "dotenv", "concurrently",
            # Build & Utilities
            "gulp", "grunt", "browserify", "parcel", "rollup",
            "uglify-js", "terser", "clean-css", "autoprefixer",
            # Framework & Runtime
            "vue", "angular", "jquery", "socket.io", "ws",
            "next", "nuxt", "nestjs", "fastify", "koa",
            # Data & Utilities  
            "underscore", "ramda", "immutable", "rxjs", "bluebird",
            "async", "yargs", "minimist", "inquirer",
            # Security & Auth
            "jsonwebtoken", "bcrypt", "bcryptjs", "passport", "helmet",
            "cors", "express-session", "cookie-parser",
            # Network & HTTP
            "superagent", "node-fetch", "got", "needle", "http-proxy",
            "request-promise", "form-data", "multer",
            # Database & Storage
            "mongoose", "sequelize", "typeorm", "redis", "ioredis",
            "sqlite3", "pg", "mysql2", "mongodb",
            # UI & Styling
            "styled-components", "sass", "less", "stylus",
            "bootstrap", "material-ui", "antd",
            # Package Management
            "npm", "yarn", "pnpm", "lerna", "webpack-bundle-analyzer",
            # Runtime & Process
            "pm2", "forever", "nodemon", "ts-node", "node-gyp"
        ]
        
        package_name = self.package_profile.package_name.lower()
        
        for p in POPULAR_PACKAGES:
            if p == package_name:
                continue
            distance = Levenshtein.distance(p, package_name)
            
            if 0 < distance <= 2:
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="typosquatting",
                    severity=Severity.HIGH,
                    evidence=f"Package name '{package_name}' is {distance} character different from '{p}'",
                    confidence=0.8,
                    category=BehaviorCategory.TYPOSQUATTING
                ))
            
            if p in package_name and package_name != p:
                if len(package_name) - len(p) <= 2:
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type="typosquatting_substring",
                        severity=Severity.MEDIUM,
                        evidence=f"Package name '{package_name}' contains popular package name '{p}'",
                        confidence=0.6,
                        category=BehaviorCategory.TYPOSQUATTING
                    ))
    
    def _check_denpendency_confusion(self):
        """
        Check for potential dependency confusion via similar package names.
        Scoped package (@company/package) depending on non-scoped version
        """
        package_name = self.package_profile.package_name
        dependencies = self.package_profile.dependencies.keys()
        
        if package_name.startswith("@"):
            scoped_name = package_name.split("/")[0]
            
            for dep in dependencies:
                if not dep.startswith("@"):
                    self.risks.append(StructuralAnalysisFinding(
                        risk_type="potential_dependency_confusion",
                        severity=Severity.MEDIUM,
                        evidence=f"Scoped package '{package_name}' depends on non-scoped package '{dep}'",
                        confidence=0.5,
                        category=BehaviorCategory.SUPPLY_CHAIN_ATTACK
                    ))
                    
    def _check_suspicious_permissions(self):
        """
        Check for suspicious permissions in package.json (if available).
        """
        suspicious_dependencies = ["child_process", "node-pty", "ssh2", "node-cmd"]
        package_json_raw = self.package_profile.package_json_raw
        dependencies = self.package_profile.dependencies
        
        if "bin" in self.package_profile.package_json_raw:
            self.risks.append(StructuralAnalysisFinding(
                risk_type="executable_binary",
                severity=Severity.MEDIUM,
                evidence="Package defines 'bin' scripts which may execute arbitrary code",
                confidence=0.6,
                category=BehaviorCategory.SYSTEM_CAPABILITY
            ))
        
        for dep in suspicious_dependencies:
            if dep in dependencies:
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="suspicious_dependency",
                    severity=Severity.HIGH,
                    evidence=f"Package depends on '{dep}' which can execute system commands",
                    confidence=0.7,
                    category=BehaviorCategory.SYSTEM_CAPABILITY
                ))
    
    def _check_network_indicators(self):
        """
        Check hardcoded URLs, IPs, and domains in code.
        """
        if not self.package_profile.entry_point_code:
            return
        
        code_content = self.package_profile.entry_point_code
        
        url_pattern = r'https?://[a-zA-Z0-9.-]+(?:/[^\s\'"]*)?'
        urls = re.findall(url_pattern, code_content)
        
        legitimate_domains = ["npmjs.com", "github.com", "githubusercontent.com"]
        suspicious_urls = [u for u in urls if not any(d in u for d in legitimate_domains)]
        
        if suspicious_urls:
            self.risks.append(StructuralAnalysisFinding(
                risk_type="hardcoded_urls",
                severity=Severity.HIGH,
                evidence=f"Found {len(suspicious_urls)} non-standard URLs: {suspicious_urls}",
                confidence=0.7,
                category=BehaviorCategory.NETWORK_EXFILTRATION
            ))
        
        ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
        ips = re.findall(ip_pattern, code_content)
        if ips:
            self.risks.append(StructuralAnalysisFinding(
                risk_type="hardcoded_ip",
                severity=Severity.CRITICAL,
                evidence=f"Contains IP addresses: {ips}",
                confidence=0.9,
                category=BehaviorCategory.NETWORK_EXFILTRATION
            ))
            
    
    def _check_simple_ofuscation(self):
        """
        Check for common obfuscation patterns 
        Base64 strings (atob, btoa, Buffer.from)  
        Hex escape sequences (\x41\x42\x43)  
        Suspicious eval/Function 
        Dynamic Property Access
        String Array Obfuscation
        Computed Require/Import
        Environment Variable Exfiltration Patterns
        Indirect Execution
        """
        
        if not self.package_profile.entry_point_code:
            return
        
        entry_code = self.package_profile.entry_point_code
        
        obfuscation_patterns = [
        # Obfuscation wrapper 
        (r'\(\s*function\s*\([^)]*\)\s*\{[^}]*\}\s*\)\s*\(', 'IIFE obfuscation wrapper', 0.5),

        # Encoding
        (r'atob\s*\(|btoa\s*\(', 'Base64 encoding', 0.7),
        (r'Buffer\.from\s*\([^,]+,\s*[\'"]base64[\'"]\)', 'Base64 Buffer', 0.7),
        (r'\\x[0-9a-fA-F]{2}', 'Hex escape sequences', 0.8),
        (r'\\u[0-9a-fA-F]{4}', 'Unicode escape sequences', 0.7),
        
        # Dynamic access
        (r'\w+\[[\'"][^\'"]+[\'"]\s*\+\s*[\'"][^\'"]+[\'"]\]', 'Property concatenation obfuscation', 0.8),
        (r'(global|process|require)\[[\'"]', 'Dynamic property access', 0.9),
        
        # Computed requires
        (r'require\s*\(\s*[\'"]\w+[\'"]\s*\.\s*concat', 'String concat in require', 0.9),
        (r'require\s*\(\s*\[[^\]]+\]\.join', 'Array join in require', 0.9),
        (r'String\.fromCharCode\s*\([^)]+\)', 'CharCode obfuscation', 0.8),
        
        # Suspicious execution
        (r'Function\s*\(\s*[\'"]return', 'Function constructor', 0.9),
        (r'\[\s*\]\s*\[\s*[\'"]constructor[\'"]\s*\]', 'Array constructor access', 0.9),
        (r'\(1\s*,\s*eval\)', 'Indirect eval', 0.95),
        
        # Variable names (obfuscator signatures)
        (r'_0x[a-f0-9]{4,}', 'Hex variable names (obfuscator)', 0.8),
        (r'const\s+[a-zA-Z]\s*=\s*\[[\'"]', 'String array pattern', 0.6)]
        
        for pattern, description, confidence in obfuscation_patterns:
            finds = re.findall(pattern, entry_code, re.IGNORECASE)
            if finds:
                self.risks.append(StructuralAnalysisFinding(
                    risk_type="obfuscated_code",
                    severity=Severity.HIGH,
                    evidence=f"Obfuscation pattern '{description}' found {len(finds)} times.",
                    confidence=confidence,
                    category=BehaviorCategory.OBFUSCATION
                ))
                
    def run_all(self):
        """
        Execute all structural analysis checks.
        """
        logger.info(f"Running structural analysis on {self.package_profile.package_name}")
        
        self._check_install_script()
        self._check_typosquatting()
        self._check_denpendency_confusion()
        self._check_suspicious_permissions()
        self._check_network_indicators()
        self._check_simple_ofuscation()
        
        logger.info(f"Structural analysis complete: {len(self.risks)} risk(s) found")
        return self.risks
