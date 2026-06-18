import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight, Shield, Eye, Cpu, Lock, Mail, Clock } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

const projects = [
  {
    title: "SIEM Log Analysis & Alert Triage",
    type: "Hands-on Lab",
    description:
      "Installed Splunk and analyzed Windows authentication logs to identify suspicious login activity. Created searches and dashboards to investigate failed logon events and understand alert triage fundamentals.",
    longDescription:
      "Installed Splunk and analyzed Windows authentication logs to identify suspicious login activity. Created searches and dashboards to investigate failed logon events (Event ID 4625), built triage workflows, and mapped behavior to MITRE ATT&CK techniques.",
    icon: Eye,
    tags: ["Splunk", "Windows Logs", "Event ID 4625", "Alert Triage", "MITRE ATT&CK"],
    github: "https://github.com/JeetAhirwar/SIEM-BruteForce-Detection-Lab",
    featured: true,
  },
  {
    title: "Web Attack Detection Lab: Brute Force Detection using DVWA",
    type: "Blue Team Lab",
    description:
      "Built a practical lab using Ubuntu, Kali Linux, DVWA, and Hydra to simulate brute-force attacks and monitor detection opportunities through server logs.",
    longDescription:
      "Deployed DVWA on Ubuntu and used Hydra from Kali Linux to simulate brute-force attacks. Monitored Apache access logs, performed frequency analysis on attacker IPs, and validated detection logic similar to SIEM correlation rules.",
    icon: Shield,
    tags: ["DVWA", "Hydra", "Apache Logs", "Linux", "Threat Detection"],
    github: "https://github.com/JeetAhirwar/Brute-Force-Detection-Splunk-IR-Lab",
    featured: true,
  },
  {
    title: "Phishing Email Analysis & Incident Investigation",
    type: "Threat Investigation Lab",
    description:
      "Conducted analysis of sample phishing emails to identify malicious indicators and understand email-based threat investigation fundamentals.",
    longDescription:
      "Examined email headers, suspicious URLs, sender reputation, and attachment behavior. Used VirusTotal to validate potentially malicious artifacts and documented investigation findings with mitigation recommendations. Status: Learning Project / Case Study.",
    icon: Lock,
    tags: ["Phishing Analysis", "Email Header Analysis", "IOC Investigation", "VirusTotal", "Threat Intelligence", "Incident Investigation"],
    github: null,
    featured: true,
  },
  {
    title: "Network Traffic Analysis using Wireshark",
    type: "Traffic Analysis Lab",
    description:
      "Captured and analyzed packets to identify protocols, suspicious communication patterns, and indicators of malicious activity.",
    longDescription:
      "Used Wireshark to capture live traffic and analyze protocols including TCP/IP, DNS, and HTTP. Identified unusual patterns and suspicious connections relevant to SOC-level threat hunting.",
    icon: Cpu,
    tags: ["Wireshark", "Packet Analysis", "TCP/IP", "Threat Hunting"],
    github: null,
    featured: false,
  },
  {
    title: "Network Security Simulation using Cisco Packet Tracer",
    type: "Simulation Lab",
    description:
      "Designed secure network topologies and explored fundamental security controls using Cisco Packet Tracer simulations.",
    longDescription:
      "Modeled enterprise network segments with routers, switches, and access controls. Applied ACLs and basic security configurations, and simulated network-based attacks to study detection opportunities.",
    icon: Shield,
    tags: ["Cisco Packet Tracer", "Network Security", "ACL", "Switching"],
    github: null,
    featured: false,
  },
];

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; find /projects -type d</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`glass-card overflow-hidden group cursor-pointer transition-all duration-300 ${
                activeProject === index ? "ring-1 ring-cyber-green/50" : ""
              }`}
              onClick={() => setActiveProject(activeProject === index ? null : index)}
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/20 group-hover:bg-cyber-green/15 transition-colors">
                    <project.icon className="w-6 h-6 text-cyber-green" />
                  </div>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-mono bg-cyber-green/10 text-cyber-green rounded border border-cyber-green/20">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-mono font-semibold mb-2 group-hover:text-cyber-green transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {activeProject === index ? project.longDescription : project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border flex items-center justify-between">
                <div className="flex gap-4">
                  {project.github ? (
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View GitHub
                    </a>
                  ) : (
                    <span
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground/60 cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4" />
                      Coming Soon
                    </span>
                  )}
                </div>

                <ChevronRight 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    activeProject === index ? "rotate-90" : ""
                  }`} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/JEETAHIRWAR?tab=repositories"
            target="_blank"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyber-green transition-colors font-mono text-sm"
          >
            View all projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;