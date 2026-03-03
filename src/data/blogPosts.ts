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
    slug: "web-attack-detection-lab",
    title: "Web Attack Detection Lab: Brute Force Detection using Docker + Ubuntu + Kali",
    summary:
      "Built a structured SOC-level lab to simulate a brute force web attack using Hydra and detect it through Apache log analysis inside a Docker-based DVWA environment.",
    date: "3rd Mar 2026",
    tags: ["SIEM", "SOC", "Log Analysis", "Brute Force", "Blue Team"],
    readTime: "10 min read",
    content: `## 🔥 Project Overview

Instead of random practice, I built a structured SOC-level detection lab from scratch.

Goal:

- Simulate a real web brute force attack
- Capture Apache logs
- Analyze attack behavior
- Detect brute force activity
- Document incident like a SOC analyst

Lab Environment:

- Attacker: Kali Linux (192.168.223.156)
- Target: Ubuntu Server (192.168.223.145)
- Application: DVWA (Docker container)
- Port: 8080
- Log Source: Apache access.log

---

## 🏗 Phase 1: Lab Setup

Installed Docker on Ubuntu:

\`\`\`bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
\`\`\`

Deployed DVWA:

\`\`\`bash
docker run -d -p 8080:80 vulnerables/web-dvwa
\`\`\`

📸 Screenshot 1:
docker ps showing container running

---

### 🔴 Mistake #1: Port Mapping Issue

Initially, DVWA was not accessible.

Cause:
Incorrect port mapping.

Fix:
Re-ran container using proper -p 8080:80 mapping.

Lesson:
Always verify container port exposure.

---

## 🌐 Phase 2: Accessing DVWA

Opened:

http://192.168.223.145:8080

Login:
admin / password

Security level set to LOW.

📸 Screenshot 2:
DVWA login page

---

## ⚔ Phase 3: Brute Force Attack (Red Team)

Executed Hydra from Kali:

\`\`\`bash
hydra -l admin -p password 192.168.223.145 -s 8080 http-get-form "/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect"
\`\`\`

Attack Source:
192.168.223.156

Hydra generated multiple rapid login attempts.

📸 Screenshot 3:
Hydra attack running

---

### 🔴 Mistake #2: Incorrect Hydra Syntax

Initially attack failed because:

- Wrong form path
- Missing failure message string

After correcting form path and response condition, attack executed successfully.

Lesson:
Understanding HTTP request structure is critical in brute force simulations.

---

## 🛡 Phase 4: Log Analysis (Blue Team)

Accessed Docker container:

\`\`\`bash
docker exec -it dd9c04bb55fc /bin/bash
\`\`\`

Checked Apache logs:

\`\`\`bash
ls /var/log/apache2
\`\`\`

Found:
- access.log
- error.log

📸 Screenshot 4:
Apache log directory listing

---

Filtered brute force entries:

\`\`\`bash
grep "vulnerabilities/brute" /var/log/apache2/access.log
\`\`\`

Observed:

- Repeated requests
- Same IP multiple times
- Rapid execution

📸 Screenshot 5:
Filtered brute log entries

---

## 📊 Phase 5: Counting Attack Attempts

To confirm brute force behavior:

\`\`\`bash
grep "vulnerabilities/brute" /var/log/apache2/access.log | awk '{print $1}' | sort | uniq -c
\`\`\`

Output:

99 192.168.223.156

This confirmed 99 login attempts from a single IP.

📸 Screenshot 6:
Frequency output showing 99 attempts

---

## 🧠 Detection Logic (SIEM Simulation)

Defined threshold rule:

If login attempts from same IP > 10  
→ Trigger brute force alert

Actual attempts:
99

Result:
Attack Successfully Detected

This simulates how SIEM correlation rules detect brute force attacks.

---

## 📄 Incident Summary

Attack Type: HTTP Brute Force  
Attacker IP: 192.168.223.156  
Target: DVWA on Port 8080  
Log Source: Apache access.log  
Total Attempts: 99  
Detection Status: Successful  

---

## 🛠 Recommendations

- Enable account lockout
- Implement rate limiting
- Deploy Fail2Ban
- Add Web Application Firewall
- Integrate logs into SIEM

---

## 📘 Lessons Learned

- Docker networking must be verified
- Hydra requires precise form configuration
- Log analysis is fundamental in SOC
- Frequency-based detection is effective for brute force identification

---

## ✅ Project Completion

This lab successfully demonstrated:

✔ Attack simulation  
✔ Log capture  
✔ Manual detection  
✔ Basic SIEM-style correlation logic  
✔ Incident documentation  

This marks the completion of the Web Attack Detection Lab.

---

⚠ Conducted in a controlled lab environment for educational purposes only.
`
  },
  {
  slug: "ssh-brute-force-detection-lab",
  title: "SSH Brute Force Detection Lab: Auth.log Analysis using Ubuntu + Kali",
  summary:
    "Simulated an SSH brute force attack from Kali Linux and detected it through Linux auth.log analysis, applying SOC-style threshold-based detection logic.",
  date: "Mar 2026",
  tags: ["SOC", "Blue Team", "Linux Security", "Auth.log", "Brute Force"],
  readTime: "8 min read",
  content: `## 🔥 Project Overview

After building a web brute force detection lab, I extended my SOC practice to system-level attack detection.

Goal:

- Simulate SSH brute force attack
- Analyze Linux authentication logs
- Detect failed login attempts
- Implement threshold-based detection logic

Lab Environment:

- Attacker: Kali Linux (192.168.223.156)
- Target: Ubuntu Server (192.168.223.145)
- Service: SSH (Port 22)
- Log Source: /var/log/auth.log

---

## 🏗 Phase 1: Lab Preparation

First, I ensured SSH was installed and running on Ubuntu:

\`\`\`bash
sudo apt install openssh-server -y
sudo systemctl start ssh
sudo systemctl status ssh
\`\`\`

Verified port 22 was active.

📸 Screenshot 1:
SSH service status active

---

### 🔴 Mistake #1: SSH Not Running

Initially SSH connection failed from Kali.

Cause:
SSH service was not started.

Fix:
Started service manually using:
sudo systemctl start ssh

Lesson:
Always verify service status before attack simulation.

---

## ⚔ Phase 2: SSH Brute Force Attack (Red Team)

From Kali Linux, I launched Hydra against SSH:

\`\`\`bash
hydra -l root -P rockyou.txt ssh://192.168.223.145
\`\`\`

This generated multiple failed login attempts.

Attack Source:
192.168.223.156

---

📸 Screenshot 2:
Hydra SSH brute force running

Caption:
SSH brute force attack initiated from Kali Linux.

---

### 🔴 Mistake #2: Incorrect Username

Initially used wrong username which didn’t exist.

Fix:
Verified valid system users using:
cat /etc/passwd

Then retried attack with correct username.

Lesson:
Reconnaissance is important before brute force attempts.

---

## 🛡 Phase 3: Log Analysis (Blue Team)

Moved to Ubuntu to analyze logs.

Viewed authentication logs:

\`\`\`bash
cat /var/log/auth.log
\`\`\`

Filtered failed login attempts:

\`\`\`bash
grep "Failed password" /var/log/auth.log
\`\`\`

Observed:

- Multiple failed login attempts
- Same IP repeated
- Rapid authentication failures

---

📸 Screenshot 3:
Failed password entries from auth.log

Caption:
Repeated failed SSH login attempts detected.

---

## 📊 Phase 4: Counting Attack Attempts

To confirm brute force activity:

\`\`\`bash
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c
\`\`\`

Output example:

25 192.168.223.156

This confirmed repeated authentication failures from a single IP.

---

📸 Screenshot 4:
IP frequency count output

Caption:
Frequency-based detection confirming SSH brute force behavior.

---

## 🧠 Detection Logic (SIEM Simulation)

Defined detection rule:

If failed SSH login attempts > 5 within short time  
→ Trigger brute force alert

Actual attempts:
25

Result:
SSH Brute Force Attack Successfully Detected

This simulates how SOC teams monitor authentication logs.

---

## 📄 Incident Summary

Attack Type: SSH Brute Force  
Attacker IP: 192.168.223.156  
Target Service: SSH (Port 22)  
Log Source: /var/log/auth.log  
Total Failed Attempts: 25  
Detection Status: Successful  

---

## 🛠 Recommendations

If this were a production server:

- Disable root SSH login
- Implement key-based authentication
- Enable account lockout
- Install Fail2Ban
- Monitor auth.log continuously
- Integrate logs into SIEM platform

---

## 📘 Lessons Learned

- System logs are critical for detecting authentication attacks
- SSH brute force is easily detectable via frequency analysis
- Basic Linux commands can simulate SIEM-style detection
- Proper service hardening is essential for security

---

## ✅ Project Completion

This lab successfully demonstrated:

✔ SSH brute force simulation  
✔ Authentication log monitoring  
✔ Frequency-based detection  
✔ SOC-style incident reporting  

This marks the completion of the SSH Brute Force Detection Lab.

---

⚠ Conducted in a controlled lab environment for educational purposes only.
`
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
