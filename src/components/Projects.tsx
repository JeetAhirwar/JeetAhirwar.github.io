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
      title: "ThreatHunter Dashboard",
      description: "Real-time threat hunting dashboard built with Python and Splunk. Aggregates IOCs from multiple sources and correlates with internal telemetry.",
      longDescription: "A comprehensive threat hunting platform that integrates with VirusTotal, AbuseIPDB, and internal SIEM. Features automated correlation, ML-based anomaly detection, and custom alerting workflows.",
      icon: Eye,
      tags: ["Python", "Splunk", "REST API", "Docker"],
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      title: "SOC Automation Framework",
      description: "SOAR-inspired automation framework for common SOC tasks. Reduces response time by 60% through automated triage and enrichment.",
      longDescription: "Modular automation framework with 50+ playbooks for incident response. Includes IP reputation checks, user activity correlation, and automated containment actions.",
      icon: Cpu,
      tags: ["Python", "SOAR", "Automation", "APIs"],
      github: "#",
      demo: null,
      featured: true,
    },
    {
      title: "Detection Rule Library",
      description: "Open-source repository of 200+ Sigma/YARA rules for detecting common and emerging threats across enterprise environments.",
      longDescription: "Community-driven detection rules mapped to MITRE ATT&CK framework. Includes automated testing pipeline and coverage analysis tools.",
      icon: Shield,
      tags: ["Sigma", "YARA", "MITRE ATT&CK", "CI/CD"],
      github: "#",
      demo: null,
      featured: false,
    },
    {
      title: "Phishing Analysis Tool",
      description: "Automated phishing email analysis tool with sandbox integration, URL reputation checking, and ML-based classification.",
      longDescription: "End-to-end phishing analysis pipeline with header analysis, attachment sandboxing, and threat intelligence enrichment. Processes 500+ suspicious emails daily.",
      icon: Lock,
      tags: ["Python", "ML", "API Integration", "Automation"],
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
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
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
            href="#"
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