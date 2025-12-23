# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `@aviationpast/niotest`
- **Version:** `1.0.14`
- **Scan Date:** 2025-12-23T23:55:16

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-3 (Medium) **MEDIUM**  
**Confidence Score:** 65.3%

### Executive Summary
Install script found Potential dependency confusion The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPES:** Supply Chain Attack

**PRIMARY TACTICS:**
- Install Hook
- Supply Chain Propagation
- System Capability

**KEY RISK FACTORS:**
- Install script found
- Potential dependency confusion

---

## EVIDENCE SUMMARY

**Attack Chain:** No coherent attack chain detected

**Legitimacy Assessment:** The behaviors do not match the package purpose as stated in the description

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

**Behaviors Detected:** 3
**Risk Categories:** install_hook, supply_chain_propagation, system_capability
**Highest Detection Confidence:** 80.0%
**Verification Confidence:** 60.0%


---

*Analysis Version: v2.0*  
*Model: deepseek-coder-6.7b*  
*Ground Truth Label: malicious*
