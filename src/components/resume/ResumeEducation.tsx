import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen } from "lucide-react";

const ResumeEducation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      specialization: "Cyber Security",
      institution: "Amity University Online, Noida",
      period: "2025 – 2027",
      coursework: [
        "SIEM Monitoring & Log Analysis (Splunk)",
        "Threat Detection & Incident Response",
        "Advanced Network Security & Traffic Analysis",
        "Digital Forensics & Malware Analysis",
        "Cloud & Endpoint Security",
        "Security Operations Center (SOC) Practices",
      ],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Bhabha University, Bhopal",
      period: "2022 – 2025",
      coursework: [
        "Computer Networks",
        "Operating Systems",
        "Database Management Systems",
        "Web Technologies",
        "Software Engineering",
        "Linux System Administration",
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
            &gt; cat /etc/education
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Education
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-6 top-3 w-4 h-4 rounded-full border-2 border-cyber-green bg-background" />

                <div className="glass-card p-6 md:p-8 hover:shadow-xl transition-all duration-300">
                  
                  {/* Degree Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-cyber-green/10 border border-cyber-green/20 shrink-0">
                      <GraduationCap className="w-5 h-5 text-cyber-green" />
                    </div>

                    <div>
                      <h3 className="text-lg font-mono font-semibold">
                        {edu.degree}
                      </h3>

                      {edu.specialization && (
                        <p className="text-sm text-cyber-green font-mono mt-1">
                          Specialization: {edu.specialization}
                        </p>
                      )}

                      <p className="text-sm text-muted-foreground font-mono mt-1">
                        {edu.institution}
                      </p>

                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full inline-block mt-2">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {/* Coursework */}
                  <div className="ml-0 md:ml-14">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-cyber-green" />
                      <span className="text-sm font-mono text-muted-foreground">
                        Relevant Coursework
                      </span>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-2">
                      {edu.coursework.map((course, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyber-green shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeEducation;