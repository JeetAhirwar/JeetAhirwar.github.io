import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const ResumeExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const experiences = [
    {
      role: "Cyber Security Intern",
      company: "NIIT Foundation",
      period: "Jun 2025 – July 2025",
      highlights: [
        "Completed foundational training in cybersecurity concepts and SOC fundamentals through live instructor-led sessions.",
        "Gained hands-on exposure to network security and threat scenarios using Cisco Packet Tracer",
        "Successfully completed Cisco Networking Academy courses and cleared final assessments",
        "Gained foundational cybersecurity knowledge and SOC operations training",
        "Practiced hands-on network security configuration using Cisco Packet Tracer",
        "Successfully completed Cisco Networking Academy certification courses",
        "Applied cybersecurity concepts in a practical network simulation project",
      ],
    },
    // {
    //   role: "Cybersecurity Lab Researcher",
    //   company: "University Cyber Lab",
    //   period: "Aug 2023 – Dec 2024",
    //   highlights: [
    //     "Configured and maintained a home lab with Splunk, pfSense, and Security Onion",
    //     "Performed network traffic analysis and identified simulated APT behaviors",
    //     "Documented findings and presented threat reports to faculty advisors",
    //   ],
    // },
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
          <span className="terminal-text text-cyber-green">&gt; history --experience</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Experience</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full border-2 border-cyber-green bg-background" />

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-mono font-semibold">{exp.role}</h3>
                      <p className="text-sm text-cyber-green font-mono">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-cyber-green mt-1.5 w-1.5 h-1.5 rounded-full bg-cyber-green shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeExperience;
