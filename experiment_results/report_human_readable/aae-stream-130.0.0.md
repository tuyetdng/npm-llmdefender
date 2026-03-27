# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `aae-stream`
- **Version:** `130.0.0`
- **Scan Date:** 2026-03-27T14:40:49

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-1 (Critical) **CRITICAL**  
**Confidence Score:** 89.2%

### Executive Summary
The package is downloading files from an external IP address (196.188.125.134) and sending them to an unknown IP address (192.81.209.195). The files are then sent to the victim's machine. The package is collecting sensitive data from the victim's machine by reading files and environment variables. The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPE:** Credential Theft

**PRIMARY TACTICS:**
- Exfiltration (Network)
- Credential Access (Sensitive Data)

**ATTACK VECTOR IOCs:**
- `nc`
- `wget`
- `196.188.125.134`
- `192.81.209.195`
- `user`
- `path`

**KEY RISK FACTORS:**
- The package is downloading files from an external IP address (196.188.125.134) and sending them to an unknown IP address (192.81.209.195).
- The package is collecting sensitive data from the victim's machine.

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Network Exfiltration [CRITICAL]
**Description:** The package uses the wget command to download files from an external IP address (196.188.125.134) and sends them to an unknown IP address (192.81.209.195). The files are then sent to the victim's machine using netcat.

```
nc
```

**Attack Chain:** The package is downloading files from an external IP address (196.188.125.134) and sending them to an unknown IP address (192.81.209.195). The files are then sent to the victim's machine. The package is collecting sensitive data from the victim's machine by reading files and environment variables.

**Legitimacy Assessment:** 

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL — Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Monitor network traffic for suspicious outbound connections
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 2
**Risk Categories:** network_exfiltration, sensitive_data_collection
**Highest Detection Confidence:** 90.0%
**Chain Score:** 0.89
**Chain Narrative:** The package is downloading files from an external IP address (196.188.125.134) and sending them to an unknown IP address (192.81.209.195). The files are then sent to the victim's machine. The package is collecting sensitive data from the victim's machine by reading files and environment variables.

---

*Analysis Version: semantic_v2.0*  
*Model: deepseek-coder-6.7b-instruct*  
*Ground Truth Label: malicious*
