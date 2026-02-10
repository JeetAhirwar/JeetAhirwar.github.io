import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Eye, Cpu, ChevronRight, Github, ExternalLink } from "lucide-react";

const ResumeFeaturedProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  const projects = [
    {
      icon: Eye,
      title: "ThreatHunter Dashboard",
      problem: "SOC teams lacked a centralized view of threat intelligence feeds and internal alerts.",
      action: "Built a real-time dashboard integrating VirusTotal, AbuseIPDB, and Splunk data with automated IOC correlation.",
      outcome: "Reduced mean-time-to-detect by 40% with ML-based anomaly scoring and custom alert workflows.",
      tools: ["Python", "Splunk", "REST API", "Docker"],
      github: "#",
      demo: "#",
    },
    {
      icon: Cpu,
      title: "SOC Automation Framework",
      problem: "Repetitive L1 triage tasks consumed 60% of analyst time during shifts.",
      action: "Designed a modular automation framework with 50+ playbooks for IP enrichment, user correlation, and containment.",
      outcome: "Cut average response time by 60% and freed analysts for higher-priority threat hunting.",
      tools: ["Python", "SOAR", "APIs", "Automation"],
      github: "#",
      demo: null,
    },
  ];

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; ls featured-projects/</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className={`glass-card cursor-pointer transition-all duration-300 ${
                expanded === idx ? "ring-1 ring-cyber-green/50" : ""
              }`}
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
                    <project.icon className="w-6 h-6 text-cyber-green" />
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      expanded === idx ? "rotate-90" : ""
                    }`}
                  />
                </div>

                <h3 className="text-xl font-mono font-semibold mb-3">{project.title}</h3>

                {expanded === idx ? (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p><span className="text-cyber-green font-mono">Problem:</span> {project.problem}</p>
                    <p><span className="text-cyber-green font-mono">Action:</span> {project.action}</p>
                    <p><span className="text-cyber-green font-mono">Outcome:</span> {project.outcome}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{project.problem}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tools.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border flex gap-4">
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyber-green transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeFeaturedProjects;
