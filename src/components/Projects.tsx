import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight, Shield, Eye, Cpu, Lock } from "lucide-react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

const projects = [
  {
    title: "SIEM Log Analysis & Alert Triage",
    description:
      "Analyzed security logs in Splunk to identify suspicious activities and understand SOC alert workflows.",
    longDescription:
      "This project focuses on basic SOC operations using Splunk. I worked with sample log data to monitor alerts, identify failed login attempts, suspicious IP addresses, and understand how alerts are triaged and documented in a SOC environment.",
    icon: Eye,
    tags: ["Splunk", "Log Analysis", "SOC Monitoring", "MITRE ATT&CK"],
    github: "https://github.com/JEETAHIRWAR/Brute-Force-Detection-Splunk-IR-Lab",
    demo: "https://jeetahirwar.lovable.app/blog/siem-log-analysis-alert-triage",
    featured: true,
  },
  {
    title: "Network Security Simulation using Cisco Packet Tracer",
    description:
      "Simulated a secure network environment and analyzed common network threats using Cisco Packet Tracer.",
    longDescription:
      "Designed a small enterprise network with routers, switches, and end devices. Configured basic security settings, analyzed traffic flow, identified misconfigurations, and simulated network-based attacks to understand how SOC teams detect network threats.",
    icon: Cpu,
    tags: ["Cisco Packet Tracer", "Network Security", "TCP/IP", "DNS"],
    github: "#",
    demo: null,
    featured: true,
  },
  {
    title: "Network Traffic Analysis using Wireshark",
    description:
      "Captured and analyzed network traffic to detect abnormal and suspicious behavior.",
    longDescription:
      "Used Wireshark to capture live and sample network traffic. Analyzed protocols like HTTP, DNS, and TCP to identify unusual patterns, suspicious connections, and potential security issues commonly investigated by SOC analysts.",
    icon: Shield,
    tags: ["Wireshark", "Packet Analysis", "Network Monitoring"],
    github: "#",
    demo: null,
    featured: false,
  },
  {
    title: "Incident Response Lifecycle Simulation",
    description:
      "Practiced the incident response process from detection to closure using simulated security incidents.",
    longDescription:
      "Worked through a simulated security incident by following the incident response lifecycle: detection, analysis, containment, eradication, recovery, and documentation. This project helped me understand how SOC teams handle and report incidents.",
    icon: Lock,
    tags: ["Incident Response", "SOC Workflow", "Documentation"],
    github: "#",
    demo: "#",
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
                  <a
                    href={project.github}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
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