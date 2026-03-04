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
  slug: "web-attack-detection-lab1",
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

Verified Docker:

\`\`\`bash
docker --version
docker ps
\`\`\`

Deployed DVWA:

\`\`\`bash
docker run -d -p 8080:80 vulnerables/web-dvwa
\`\`\`

Verified container running:

\`\`\`bash
docker ps
\`\`\`

📸 docker ps showing container running  
![docker ps showing container running](/Project1/Screenshot-1.png)

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

Navigated to:
DVWA Security → Set to LOW

Reason:
Low security disables brute force protection for testing.

📸 DVWA login page  
![DVWA login page](/Project1/Screenshot-2.png)

---

## ⚔ Phase 3: Initial Brute Force Test (Red Team)

Executed Hydra from Kali:

\`\`\`bash
hydra -l admin -p password 192.168.223.145 -s 8080 http-get-form "/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect"
\`\`\`

Attack Source:
192.168.223.156

Hydra generated multiple rapid login attempts.

📸 Hydra attack running  
![Hydra attack running](/Project1/Screenshot-3.png)

---

### 🔴 Mistake #2: Incorrect Hydra Syntax

Initially attack failed because:

- Wrong form path
- Missing failure message string

After correcting form path and response condition, attack executed successfully.

Lesson:
Understanding HTTP request structure is critical in brute force simulations.

---

## 🚀 Phase 3.1: Real Brute Force Using Wordlist

To simulate realistic attack behavior, used rockyou wordlist.

### Step 1 – Verify Wordlist

\`\`\`bash
ls /usr/share/wordlists/
\`\`\`

If compressed:

\`\`\`bash
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
\`\`\`

### Step 2 – Launch Full Brute Force

\`\`\`bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.223.145 -s 8080 http-get-form "/vulnerabilities/brute/:username=^USER^&password=^PASS^&Login=Login:Username and/or password incorrect"
\`\`\`

Notice:

- -P (capital P) = password list mode
- Thousands of password attempts executed automatically

This simulates real-world credential stuffing / brute force activity.

---

## 🛡 Phase 4: Live Log Monitoring (Blue Team)

Entered DVWA container:

\`\`\`bash
docker exec -it dd9c04bb55fc /bin/bash
\`\`\`

Checked Apache log directory:

\`\`\`bash
ls /var/log/apache2
\`\`\`

Found:

- access.log
- error.log

Started real-time monitoring:

\`\`\`bash
tail -f /var/log/apache2/access.log
\`\`\`

Opened new Kali terminal and launched Hydra again.

Now live requests appeared inside access.log.

Example log entry:

192.168.223.156 - - [03/Mar/2026:20:10:01 +0000] "GET /vulnerabilities/brute/?username=admin&password=123 HTTP/1.1" 200 4523 "Mozilla/5.0 (Hydra)"

This confirmed:

- Attacker IP visible
- Timestamp recorded
- Username & password visible
- HTTP status captured
- User-Agent shows Hydra

📸 | Apache log directory listing || Live brute force log entries
![4-5](/Project1/Screenshot-4-5.png)

---

## 📊 Phase 5: Counting Attack Attempts

Filtered brute force attempts:

\`\`\`bash
grep "vulnerabilities/brute" /var/log/apache2/access.log
\`\`\`

Counted attempts per IP:

\`\`\`bash
grep "vulnerabilities/brute" /var/log/apache2/access.log | awk '{print $1}' | sort | uniq -c
\`\`\`

Output:

56 192.168.223.156

This confirmed:

56 login attempts from a single IP.

📸 | Frequency output showing 56 attempts
![Screenshot 6](/Project1/Screenshot-6.png)

---

## 🧠 Detection Logic (SIEM Simulation)

Defined threshold rule:

If login attempts from same IP > 10 within short duration  
→ Trigger brute force alert

Actual attempts:
56

Result:
Attack Successfully Detected

This simulates SIEM correlation-based brute force detection.

---

## 📄 Incident Summary

Attack Type: HTTP Brute Force  
Tool Used: Hydra  
Attacker IP: 192.168.223.156  
Target: DVWA on Port 8080  
Log Source: Apache access.log  
Total Attempts: 56  
Detection Status: Successful  

---

## 🛠 Recommendations

- Enable account lockout policy
- Implement rate limiting
- Deploy Fail2Ban
- Add Web Application Firewall
- Forward logs to SIEM (Splunk / ELK)

---

## 📘 Lessons Learned

- Docker networking must be verified
- Hydra requires precise form configuration
- Real brute force involves wordlists
- Log monitoring (tail -f) is critical for detection
- Frequency-based IP analysis is effective for brute force detection

---

## ✅ Project Completion

This lab successfully demonstrated:

✔ Attack simulation  
✔ Wordlist-based brute force  
✔ Live log capture  
✔ Manual detection  
✔ SIEM-style correlation logic  
✔ Incident documentation  

This marks the completion of the Web Attack Detection Lab.

---

⚠ Conducted in a controlled lab environment for educational purposes only.
`
},
{
  slug: "siem-log-analysis-alert-triage",
  title: "SIEM Log Analysis & Alert Triage: Brute Force Detection using Splunk + Windows Server",
  summary:
    "Built a structured SOC-level lab to detect and respond to a brute force attack using Windows Event Logs (Event ID 4625) and Splunk SIEM following the NIST Incident Response Framework.",
  date: "30th Dec 2025",
  tags: ["SIEM", "SOC", "Log Analysis", "Brute Force", "Incident Response", "Blue Team"],
  readTime: "12 min read",
  content: `## 🔥 Project Overview

Instead of random practice, I built a structured SOC-level Incident Response lab from scratch using Splunk.

Goal:

- Detect brute force attack using Windows Security Logs
- Analyze Event ID 4625 (Failed Login Attempts)
- Build dashboards for monitoring
- Configure real-time alerts
- Perform full Incident Response lifecycle
- Document investigation like a SOC analyst

Lab Environment:

- SIEM: Splunk Enterprise
- Log Forwarder: Splunk Universal Forwarder
- Log Source: Windows Server (VMware)
- Security Logs: Windows Event Logs
- Key Event ID: 4625 (Failed Login)
- Management Port: 8089
- Forwarding Port: 9997

---

## 🏗 Phase 1: Preparation & Environment Setup

Installed Splunk Enterprise on Host System.

Installed Windows Server inside VMware to simulate victim system.

Installed Splunk Universal Forwarder on Windows Server.

Configured Forwarder to send logs to Splunk Enterprise using port 9997.

Registered forwarder as Deployment Client using:

\`\`\`bash
splunk set deploy-poll 168.74.174.73:8089
\`\`\`

This enabled centralized configuration and management.

📸 Splunk Enterprise on Host & Windows Server VM  
![Lab Environment](/Project2/Screenshot-1.png)

---

## 🔍 Phase 2: Enabling Authentication Logging

By default, Windows does not log everything.

Enabled:

- Audit Logon Events (Failure)
- Audit Account Logon Events

This ensured failed login attempts were recorded in Windows Security Logs.

Without enabling these logs, brute force detection would not be possible.

---

## ⚙ Phase 3: Configuring Log Source in Splunk

Configured Windows Security Log as data input:

Steps:
- Splunk Web → Settings → Data Inputs
- Windows Event Logs
- Enabled Security Log
- Index set to: main

This allowed Splunk to receive authentication logs.

📸 Configuring Windows Server as Log Source  
![Log Source Configuration](/Project2/Screenshot-2.png)

---

## 📘 Phase 4: Understanding Event ID 4625

Event ID 4625 represents:

Failed Login Attempt

Generated every time authentication fails.

Important Fields:

- Account_Name
- Source_Network_Address
- Logon Type
- Timestamp

Brute force attacks appear as multiple repeated Event ID 4625 entries.

---

## 🚨 Phase 5: Detection & Analysis

Basic search query used:

\`\`\`spl
source="WinEventLog:Security" EventCode=4625
\`\`\`

Brute force detection query:

\`\`\`spl
source="WinEventLog:Security" EventCode=4625 
| stats count by Account_Name
\`\`\`

Why stats command?

- Converts raw logs into numerical counts
- Helps identify attack intensity

High count = possible brute force in progress.

📸 Detection of Brute Force Using Event ID 4625  
![Brute Force Detection](/Project2/Screenshot-3.png)

---

## 📊 Phase 6: Visualization & Dashboard

Created column chart visualization:

- X-axis → User Account
- Y-axis → Failed Login Count

Built monitoring dashboard showing:

- Live failed login attempts
- Attack intensity per user
- Centralized view for SOC monitoring

📸 Brute Force Monitoring Dashboard  
![Dashboard View](/Project2/Screenshot-4.png)

---

## 🔔 Phase 7: Alert Creation

Configured alert rule:

Trigger condition:
If failed login attempts > 0

Alert fires automatically and notifies security team.

Reason:

Admins cannot monitor dashboards 24/7.
Alerts enable automated detection.

---

## 🧠 Phase 8: Incident Detection

Incident declared when:

- Multiple Event ID 4625 detected
- Alert triggered
- High failed login count observed

This marks the official Detection Phase in NIST IR lifecycle.

📸 Incident Detection Phase  
![Incident Detection](/Project2/Screenshot-5.png)

---

## 🛡 Phase 9: Containment

Objective:

Stop attacker immediately and prevent further damage.

Actions Taken:

- Blocked attacker IP using firewall rule
- Locked affected user account

This prevented further password guessing attempts.

📸 Firewall Rule Blocking Attacker IP  
![Firewall Block](/Project2/Screenshot-6.png)

---

## 🔥 Phase 10: Eradication

Objective:

Remove root cause completely.

Steps:

- Reset compromised user password
- Strengthened password complexity policy
- Removed malicious IP
- Performed system scan

This ensured attacker could not exploit same weakness again.

📸 Password Reset & Remediation  
![Eradication Phase](/Project2/Screenshot-7.png)

---

## 🔄 Phase 11: Recovery

Objective:

Restore system to normal operation safely.

Steps:

- Unlocked user account
- Monitored Event ID 4624 (Successful Login)
- Ensured no further suspicious activity

Confirmed normal operations resumed.

📸 Recovery Phase Showing Successful Login  
![Recovery Phase](/Project2/Screenshot-8.png)

---

## 📄 Incident Summary

Attack Type: Brute Force Attack  
Detection Method: Windows Event ID 4625  
SIEM Tool: Splunk Enterprise  
Log Source: Windows Security Logs  
Total Failed Attempts: Multiple repeated attempts  
Detection Status: Successful  
Response Status: Contained, Eradicated, Recovered  

---

## 🛠 Recommendations

- Enforce strong password policies
- Enable account lockout threshold
- Maintain continuous log monitoring
- Configure threshold-based alerts (e.g., >10 attempts in 5 minutes)
- Forward logs to centralized SIEM

---

## 📘 Lessons Learned

- Logging must be enabled before detection
- Event ID 4625 is critical for brute force detection
- stats command simplifies log analysis
- Dashboards improve visibility
- Alerts reduce response time
- Structured IR phases improve handling efficiency

---

## ✅ Project Completion

This lab successfully demonstrated:

✔ Log collection using Splunk Forwarder  
✔ Authentication log monitoring  
✔ Event ID 4625 analysis  
✔ Brute force detection  
✔ Dashboard creation  
✔ Alert configuration  
✔ NIST Incident Response lifecycle  
✔ Containment, Eradication, Recovery  
✔ SOC-style documentation  

This marks the completion of the SIEM Log Analysis & Alert Triage Lab.

---
`
},
//   {
//   slug: "ssh-brute-force-detection-lab",
//   title: "SSH Brute Force Detection Lab: Auth.log Analysis using Ubuntu + Kali",
//   summary:
//     "Simulated an SSH brute force attack from Kali Linux and detected it through Linux auth.log analysis, applying SOC-style threshold-based detection logic.",
//   date: "Mar 2026",
//   tags: ["SOC", "Blue Team", "Linux Security", "Auth.log", "Brute Force"],
//   readTime: "8 min read",
//   content: `## 🔥 Project Overview

// After building a web brute force detection lab, I extended my SOC practice to system-level attack detection.

// Goal:

// - Simulate SSH brute force attack
// - Analyze Linux authentication logs
// - Detect failed login attempts
// - Implement threshold-based detection logic

// Lab Environment:

// - Attacker: Kali Linux (192.168.223.156)
// - Target: Ubuntu Server (192.168.223.145)
// - Service: SSH (Port 22)
// - Log Source: /var/log/auth.log

// ---

// ## 🏗 Phase 1: Lab Preparation

// First, I ensured SSH was installed and running on Ubuntu:

// \`\`\`bash
// sudo apt install openssh-server -y
// sudo systemctl start ssh
// sudo systemctl status ssh
// \`\`\`

// Verified port 22 was active.

// 📸 Screenshot 1:
// SSH service status active

// ---

// ### 🔴 Mistake #1: SSH Not Running

// Initially SSH connection failed from Kali.

// Cause:
// SSH service was not started.

// Fix:
// Started service manually using:
// sudo systemctl start ssh

// Lesson:
// Always verify service status before attack simulation.

// ---

// ## ⚔ Phase 2: SSH Brute Force Attack (Red Team)

// From Kali Linux, I launched Hydra against SSH:

// \`\`\`bash
// hydra -l root -P rockyou.txt ssh://192.168.223.145
// \`\`\`

// This generated multiple failed login attempts.

// Attack Source:
// 192.168.223.156

// ---

// 📸 Screenshot 2:
// Hydra SSH brute force running

// Caption:
// SSH brute force attack initiated from Kali Linux.

// ---

// ### 🔴 Mistake #2: Incorrect Username

// Initially used wrong username which didn’t exist.

// Fix:
// Verified valid system users using:
// cat /etc/passwd

// Then retried attack with correct username.

// Lesson:
// Reconnaissance is important before brute force attempts.

// ---

// ## 🛡 Phase 3: Log Analysis (Blue Team)

// Moved to Ubuntu to analyze logs.

// Viewed authentication logs:

// \`\`\`bash
// cat /var/log/auth.log
// \`\`\`

// Filtered failed login attempts:

// \`\`\`bash
// grep "Failed password" /var/log/auth.log
// \`\`\`

// Observed:

// - Multiple failed login attempts
// - Same IP repeated
// - Rapid authentication failures

// ---

// 📸 Screenshot 3:
// Failed password entries from auth.log

// Caption:
// Repeated failed SSH login attempts detected.

// ---

// ## 📊 Phase 4: Counting Attack Attempts

// To confirm brute force activity:

// \`\`\`bash
// grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c
// \`\`\`

// Output example:

// 25 192.168.223.156

// This confirmed repeated authentication failures from a single IP.

// ---

// 📸 Screenshot 4:
// IP frequency count output

// Caption:
// Frequency-based detection confirming SSH brute force behavior.

// ---

// ## 🧠 Detection Logic (SIEM Simulation)

// Defined detection rule:

// If failed SSH login attempts > 5 within short time  
// → Trigger brute force alert

// Actual attempts:
// 25

// Result:
// SSH Brute Force Attack Successfully Detected

// This simulates how SOC teams monitor authentication logs.

// ---

// ## 📄 Incident Summary

// Attack Type: SSH Brute Force  
// Attacker IP: 192.168.223.156  
// Target Service: SSH (Port 22)  
// Log Source: /var/log/auth.log  
// Total Failed Attempts: 25  
// Detection Status: Successful  

// ---

// ## 🛠 Recommendations

// If this were a production server:

// - Disable root SSH login
// - Implement key-based authentication
// - Enable account lockout
// - Install Fail2Ban
// - Monitor auth.log continuously
// - Integrate logs into SIEM platform

// ---

// ## 📘 Lessons Learned

// - System logs are critical for detecting authentication attacks
// - SSH brute force is easily detectable via frequency analysis
// - Basic Linux commands can simulate SIEM-style detection
// - Proper service hardening is essential for security

// ---

// ## ✅ Project Completion

// This lab successfully demonstrated:

// ✔ SSH brute force simulation  
// ✔ Authentication log monitoring  
// ✔ Frequency-based detection  
// ✔ SOC-style incident reporting  

// This marks the completion of the SSH Brute Force Detection Lab.

// ---

// ⚠ Conducted in a controlled lab environment for educational purposes only.
// `
// },
//   {
//     slug: "building-detection-rules-sigma-splunk",
//     title: "Building Detection Rules with Sigma & Splunk",
//     summary:
//       "How I wrote and tested 20+ Sigma rules for lateral movement detection, converted them to SPL, and deployed them in a home lab Splunk instance.",
//     date: "Dec 2024",
//     tags: ["Detection Engineering", "Splunk"],
//     readTime: "6 min read",
//     content: `## Why Sigma?

// Sigma is a generic signature format for SIEM systems. Writing rules in Sigma means they're portable — you write once and convert to Splunk SPL, Elastic KQL, Microsoft Sentinel, and more.

// ## Setting Up the Pipeline

// My workflow:

// 1. **Write** Sigma rules in YAML
// 2. **Convert** to SPL using \`sigma-cli\`
// 3. **Test** against sample logs in my home lab Splunk instance
// 4. **Validate** detections with Atomic Red Team

// ## Example: Detecting PsExec Lateral Movement

// Here's a Sigma rule I wrote to detect PsExec-style remote service creation:

// \`\`\`yaml
// title: PsExec Remote Service Installation
// status: experimental
// logsource:
//   category: process_creation
//   product: windows
// detection:
//   selection:
//     EventID: 7045
//     ServiceName|contains: 'PSEXE'
//   condition: selection
// level: high
// tags:
//   - attack.lateral_movement
//   - attack.t1021.002
// \`\`\`

// ### Converting to SPL

// \`\`\`bash
// sigma convert -t splunk -p sysmon rules/psexec_service.yml
// \`\`\`

// Output:

// \`\`\`spl
// index=windows EventCode=7045 ServiceName="*PSEXE*"
// | table _time, ComputerName, ServiceName, ImagePath
// \`\`\`

// ## Testing with Atomic Red Team

// I ran the corresponding Atomic test to validate the rule fires:

// \`\`\`powershell
// Invoke-AtomicTest T1021.002 -TestNumbers 1
// \`\`\`

// The alert triggered within seconds in Splunk — confirming end-to-end detection.

// ## Coverage Dashboard

// After building 20+ rules, I created a Splunk dashboard mapping detection coverage to MITRE ATT&CK:

// - **Initial Access:** 4 rules
// - **Execution:** 5 rules
// - **Lateral Movement:** 6 rules
// - **Persistence:** 3 rules
// - **Defense Evasion:** 4 rules

// ## Key Takeaways

// - Sigma provides **vendor-agnostic** detection logic
// - Always **test rules** against real attack simulations before deploying
// - Map every rule to a **MITRE ATT&CK technique** for coverage tracking
// - Maintain a **living document** of rule performance (false positive rates, tuning notes)

// ---

// *All rules are available in my GitHub detection-rules repository.*`,
//   },
];
