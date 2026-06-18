import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import niitLogo from "../../../public/niit-logo.png";

const ResumeExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const experiences = [
    {
      role: "Cyber Security Intern",
      company: "NIIT Foundation",
      period: "Jul 2025 – Jul 2025",
      logo: niitLogo,
      highlights: [
        "Completed instructor-led cybersecurity training.",
        "Learned SOC fundamentals and threat monitoring concepts.",
        "Performed network simulations using Cisco Packet Tracer.",
        "Worked on cybersecurity assessments and practical activities.",
        "Applied cybersecurity concepts in practical security exercises.",
      ],
    },
  ];

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">
            &gt; history --experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Experience
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
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
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full border-2 border-cyber-green bg-background" />

                <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    
                    {/* Left Side (Logo + Role) */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-mono font-semibold">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-cyber-green font-mono">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyber-green shrink-0" />
                        {highlight}
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