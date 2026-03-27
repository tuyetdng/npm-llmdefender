# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `1ru-cache`
- **Version:** `0.0.1`
- **Scan Date:** 2026-03-27T14:31:22

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-1 (Critical) **CRITICAL**  
**Confidence Score:** 80.4%

### Executive Summary
The package '1ru-cache' is installed with a post-install script that installs a backdoor and hardcodes an external IP address. The backdoor is a reverse shell that connects to an external IP address (34.121.250.204). The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPE:** Backdoor Installation

**PRIMARY TACTICS:**
- Persistence (Backdoor)
- Hardcoded External Ip

**ATTACK VECTOR IOCs:**
- `postinstallhook`
- `bash-c`
- `34.121.250.204:4444`
- `reverseshell`

**KEY RISK FACTORS:**
- The package.json file contains a post-install script that installs a backdoor.
- The package.json file contains a hardcoded external IP address.

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Backdoor Installation [CRITICAL]
**Description:** The post-install script in the package.json file contains a reverse shell command that connects to an external IP address (34.121.250.204).

```
bash-c
```

#### 2. Hardcoded External Ip [CRITICAL]
**Description:** The post-install script in the package.json file contains the hardcoded external IP address '34.121.250.204'.

```
34.121.250.204
```

**Attack Chain:** The package '1ru-cache' is installed with a post-install script that installs a backdoor and hardcodes an external IP address. The backdoor is a reverse shell that connects to an external IP address (34.121.250.204).

**Legitimacy Assessment:** The package '1ru-cache' does not have a description or README file, indicating that it is not a legitimate package.

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL — Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Audit system for unauthorized processes or cron jobs
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 2
**Risk Categories:** backdoor_installation, hardcoded_external_IP
**Highest Detection Confidence:** 96.0%
**Chain Score:** 0.70
**Chain Narrative:** The package '1ru-cache' is installed with a post-install script that installs a backdoor and hardcodes an external IP address. The backdoor is a reverse shell that connects to an external IP address (34.121.250.204).

---

*Analysis Version: semantic_v2.0*  
*Model: deepseek-coder-6.7b-instruct*  
*Ground Truth Label: malicious*
