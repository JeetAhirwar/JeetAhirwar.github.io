import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, FileText, ShieldAlert, FileLock } from "lucide-react";

const academicProjects = [
  {
    icon: BookOpen,
    title: "AI-Powered Security Operations Centers for Modern Threat Detection",
    type: "Minor Project",
    description:
      "Research study exploring the evolution of traditional SOCs into AI-driven security operations using Machine Learning, UEBA, SOAR, and Generative AI.",
    highlights: [
      "Evolution of SOCs",
      "Machine Learning",
      "UEBA",
      "SOAR",
      "Generative AI",
      "Alert Fatigue Reduction",
      "Future Autonomous SOCs",
    ],
    outcome: "AI augments analysts rather than replacing them.",
    button: "View Research",
  },
  {
    icon: FileText,
    title: "Analysis of OWASP Top 10 (2021) Web Application Security Risks and Mitigation Strategies",
    type: "Academic Project",
    description:
      "Comprehensive study of the OWASP Top 10 vulnerabilities, secure development practices, threat response concepts, and mitigation strategies.",
    highlights: [
      "Broken Access Control",
      "Injection",
      "Security Misconfiguration",
      "SSRF",
      "Secure SDLC",
      "Threat Response",
    ],
    button: "View Research",
  },
  {
    icon: ShieldAlert,
    title: "Colonial Pipeline Incident Response Analysis",
    type: "Incident Response Assignment",
    description:
      "Applied the NIST Incident Response Lifecycle to analyze the Colonial Pipeline attack and identify response improvements.",
    highlights: [
      "Detection",
      "Containment",
      "Eradication",
      "Recovery",
      "Lessons Learned",
    ],
    button: "View Case Study",
  },
  {
    icon: FileLock,
    title: "Information Security Policy Framework",
    type: "Policy Assignment",
    description:
      "Designed an enterprise information security policy covering access control, data protection, incident response, and remote work security.",
    highlights: [
      "Access Control",
      "MFA",
      "Data Classification",
      "Incident Reporting",
      "Remote Work Security",
    ],
    button: "View Policy",
  },
];

const AcademicProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="academic" className="py-24 relative" ref={ref}>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyber-green/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; ls /academic/research</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Academic Research & University Projects
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Research-based cybersecurity projects completed during MCA.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {academicProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-card overflow-hidden group flex flex-col"
            >
              <div className="p-6 pb-4 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/20 group-hover:bg-cyber-green/15 transition-colors">
                    <project.icon className="w-6 h-6 text-cyber-green" />
                  </div>
                  <span className="px-2 py-1 text-xs font-mono bg-cyber-green/10 text-cyber-green rounded border border-cyber-green/20">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-lg font-mono font-semibold mb-2 group-hover:text-cyber-green transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.outcome && (
                  <p className="text-sm text-muted-foreground/90 italic border-l-2 border-cyber-green/40 pl-3">
                    {project.outcome}
                  </p>
                )}
              </div>

              <div className="px-6 py-4 border-t border-border">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center gap-1.5 text-sm font-mono text-cyber-green/80 cursor-not-allowed"
                  title="Research document coming soon"
                >
                  {project.button}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicProjects;