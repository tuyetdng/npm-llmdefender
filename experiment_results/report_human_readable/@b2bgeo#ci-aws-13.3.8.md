# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@b2bgeo/ci-aws`
- **Version:** `13.3.8`
- **Scan Date:** 2025-12-23T23:57:41

---

## Final Security Verdict: **SUSPICIOUS** (Policy: Needs Review)

**Risk Level:**  **None**  
**Confidence Score:** 58.0%

### Executive Summary
Package exhibits suspicious characteristics but no definitive malicious behavior confirmed.

---

## THREAT PROFILE

**ATTACK TYPES:** Reconnaissance

**PRIMARY TACTICS:**
- Network Reconnaissance

**KEY RISK FACTORS:**

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Network Reconnaissance [HIGH]
**Description:** The package is making an HTTP request to an external server with several headers and data, including the package name, version, hostname, whoami, and pwd.

```bash
http://npm-org.bl04szombv0uaoedbxwle53be2ks8h.c.act1on3.ru
```

**Attack Chain:** The detected behaviors do not form a coherent attack chain.

**Legitimacy Assessment:** The behavior of sending network reconnaissance requests to an external server is not expected for a package named '@b2bgeo/ci-aws'.

---

## RECOMMENDATIONS

### Immediate Action
**Use with caution - Manual review recommended**

### Remediation Steps
1. Review package source code and dependencies
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** network_reconnaissance
**Highest Detection Confidence:** 70.0%
**Verification Confidence:** 50.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
