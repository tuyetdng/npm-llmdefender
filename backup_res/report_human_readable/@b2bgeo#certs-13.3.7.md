# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@b2bgeo/certs`
- **Version:** `13.3.7`
- **Scan Date:** 2025-12-23T23:56:28

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-1 (Critical) **CRITICAL**  
**Confidence Score:** 86.0%

### Executive Summary
The package has a preinstall script that sends HTTP requests with sensitive information The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPES:** Credential Theft

**PRIMARY TACTICS:**
- Credential Theft
- Sensitive Data Collection

**KEY RISK FACTORS:**
- The package has a preinstall script that sends HTTP requests with sensitive information

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Credential Theft [HIGH]
**Description:** The package @b2bgeo/certs has a preinstall script that sends HTTP requests to an external server with sensitive information such as the package name, version, hostname, whoami, pwd, and a custom message

```bash
http://npm_org.bl04szombv0uaoedbxwle53be2ks8h.c.act1on3.ru
```

**Attack Chain:** The detected behaviors form a coherent attack chain. The preinstall script sends HTTP requests to an external server with sensitive information, which could potentially lead to credential theft.

**Legitimacy Assessment:** The detected behaviors do not align with the package's stated purpose. The package is created for security research purposes and does not contain any useful or malicious code.

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL - Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Check for unauthorized access to credentials or secrets
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** credential_theft, sensitive_data_collection
**Highest Detection Confidence:** 80.0%
**Verification Confidence:** 90.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
