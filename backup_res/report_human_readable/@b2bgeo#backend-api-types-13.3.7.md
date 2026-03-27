# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@b2bgeo/backend-api-types`
- **Version:** `13.3.7`
- **Scan Date:** 2025-12-23T23:55:42

---

## Final Security Verdict: **SUSPICIOUS** (Policy: Needs Review)

**Risk Level:**  **None**  
**Confidence Score:** 56.0%

### Executive Summary
HTTP request to an external server with sensitive data The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPES:** Credential Theft

**PRIMARY TACTICS:**
- Credential Theft
- Sensitive Data Collection

**KEY RISK FACTORS:**
- HTTP request to an external server with sensitive data

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Credential Theft [HIGH]
**Description:** The preinstall script makes an HTTP request to an external server with several headers and data, potentially used for credential theft or sensitive data collection.

```bash
http://npm_org.bl04szombv0uaoedbxwle53be2ks8h.c.act1on3.ru
```

**Attack Chain:** No apparent attack flow detected

**Legitimacy Assessment:** The behavior does not match the package purpose

---

## RECOMMENDATIONS

### Immediate Action
**Use with caution - Manual review recommended**

### Remediation Steps
1. Review package source code and dependencies
1. Check for unauthorized access to credentials or secrets
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** credential_theft, sensitive_data_collection
**Highest Detection Confidence:** 80.0%
**Verification Confidence:** 40.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
