from enum import Enum

class BehaviorCategory(Enum):
    """Behavior categories"""
    CREDENTIAL_THEFT = "credential_theft"  
    SENSITIVE_DATA_COLLECTION = "sensitive_data_collection"   
    CRYPTO_HIJACKING = "crypto_hijacking"              
    NETWORK_EXFILTRATION = "network_exfiltration"      
    DATA_EXFILTRATION = "data_exfiltration"
    LOCAL_CODE_EXECUTION = "local_code_execution"
    SYSTEM_RECONNAISSANCE = "system_reconnaissance"
    BACKDOOR_INSTALLATION = "backdoor_installation"
    NETWORK_RECONNAISSANCE = "network_reconnaissance"
    REMOTE_CODE_EXECUTION = "remote_code_execution"
    DYNAMIC_CODE_EXECUTION = "dynamic_code_execution"
    DEPENDENCY_INJECTION = "dependency_injection" 
    SUPPLY_CHAIN_PROPAGATION = "supply_chain_propagation"
    SUPPLY_CHAIN_ATTACK = "supply_chain_attack"
    REPOSITORY_MANIPULATION = "repository_manipulation"              
    PRIVILEGE_ESCALATION = "privilege_escalation"
    PERSISTENCE = "persistence"
    SENSITIVE_FILE_ACCESS = "sensitive_file_access"     
    OBFUSCATION = "obfuscation"
    ANTI_DEBUGGING = "anti_debugging"                   # checks for debugger (debugger keyword, inspector)
    ANTI_ANALYSIS = "anti_analysis"                     # broader (checks for sandboxes, VMs, honeypots)
    RESOURCE_ABUSE = "resource_abuse"
    TYPOSQUATTING = "typosquatting"
    INSTALL_HOOK = "install_hook"
    SYSTEM_CAPABILITY = "system_capability"
    SUSPICIOUS_BEHAVIOR = "suspicious_behavior"         # Can't classify but looks bad
    UNKNOWN = "unknown"                                 # Fallback for unclassified behaviors
    