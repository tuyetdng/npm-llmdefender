# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@att-bit/duc.components.cardshell`
- **Version:** `10.0.0`
- **Scan Date:** 2025-12-23T23:45:38

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-3 (Medium) **MEDIUM**  
**Confidence Score:** 68.0%

### Executive Summary
Install hook present that may lead to unauthorized installation or malicious behavior The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPES:** Malicious Package

**PRIMARY TACTICS:**
- Install Hook

**KEY RISK FACTORS:**
- Install hook present that may lead to unauthorized installation or malicious behavior

---

## EVIDENCE SUMMARY

**Attack Chain:** No clear attack chain detected

**Legitimacy Assessment:** The behavior is not expected for a package named '@att-bit/duc.components.cardshell'

---

## RECOMMENDATIONS

### Immediate Action
**Use with caution - Manual review recommended**

### Remediation Steps
1. Review package source code and dependencies
1. Inspect install/preinstall scripts in package.json
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 1
**Risk Categories:** install_hook
**Highest Detection Confidence:** 80.0%
**Verification Confidence:** 60.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
