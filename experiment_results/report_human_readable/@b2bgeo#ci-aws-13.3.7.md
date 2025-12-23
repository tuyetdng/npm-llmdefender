# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@b2bgeo/ci-aws`
- **Version:** `13.3.7`
- **Scan Date:** 2025-12-23T23:57:18

---

## Final Security Verdict: **BENIGN** (Policy: Allowed)

**Risk Level:** SEV-3 (Medium) **MEDIUM**  
**Confidence Score:** 64.0%

### Executive Summary
This package appears to be benign with no significant security concerns detected.

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
**Description:** The package is making an HTTP request to an external server with several headers and data, including the package name, version, hostname, whoami, and pwd

```bash
http://npm_org.bl04szombv0uaoedbxwle53be2ks8h.c.act1on3.ru
```

**Attack Chain:** The detected behaviors do not form a coherent attack chain.

**Legitimacy Assessment:** The detected behaviors are not expected for a package named '@b2bgeo/ci-aws'.

---

## RECOMMENDATIONS

### Immediate Action
**Package appears safe to use**


---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** network_reconnaissance
**Highest Detection Confidence:** 70.0%
**Verification Confidence:** 60.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
