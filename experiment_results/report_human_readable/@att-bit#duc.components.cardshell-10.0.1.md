# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@att-bit/duc.components.cardshell`
- **Version:** `10.0.1`
- **Scan Date:** 2025-12-23T23:46:31

---

## Final Security Verdict: **SUSPICIOUS** (Policy: Needs Review)

**Risk Level:**  **None**  
**Confidence Score:** 66.2%

### Executive Summary
The package sends DNS queries and HTTP requests to the provided URLs during preinstall script execution. The package contains the potential for remote code execution during preinstall script execution.

---

## THREAT PROFILE

**ATTACK TYPES:** Remote Code Execution

**PRIMARY TACTICS:**
- Network Reconnaissance
- Credential Theft
- Sensitive Data Collection
- Remote Code Execution
- Install Hook

**KEY RISK FACTORS:**
- The package sends DNS queries and HTTP requests to the provided URLs during preinstall script execution.
- The package contains the potential for remote code execution during preinstall script execution.
- The package has a preinstall script that could potentially be used to install a backdoor or malicious code.

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Network Reconnaissance [HIGH]
**Description:** The preinstall script contains commands that send DNS queries and HTTP requests to the provided URLs.

```bash
https://s5yyin8i0k0g9u7wx12fwg9im9s0g04p.oastify.com
```

#### 2. Credential Theft [HIGH]
**Description:** The preinstall script contains a command that sends the content of the /etc/hosts file to the provided URL.

```bash
https://s5yyin8i0k0g9u7wx12fwg9im9s0g04p.oastify.com
```

#### 3. Sensitive Data Collection [HIGH]
**Description:** The preinstall script contains a command that sends the output of the `uname` command to the provided URL.

```bash
https://uname.rqlx3mthljlfutsvi0nehfuh78dz10pp.oastify.com
```

**Attack Chain:** The behaviors do not form a coherent attack chain.

**Legitimacy Assessment:** The behaviors are expected for a package named '@att-bit/duc.components.cardshell' as it is stated for testing purposes.

---

## RECOMMENDATIONS

### Immediate Action
**Use with caution - Manual review recommended**

### Remediation Steps
1. Review package source code and dependencies
1. Inspect install/preinstall scripts in package.json
1. Check for unauthorized access to credentials or secrets
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 5
**Risk Categories:** network_reconnaissance, credential_theft, sensitive_data_collection, remote_code_execution, install_hook
**Highest Detection Confidence:** 90.0%
**Verification Confidence:** 57.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
