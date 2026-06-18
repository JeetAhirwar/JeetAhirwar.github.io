import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  Database, 
  Terminal, 
  Lock,
  Eye,
  Cpu,
  Network,
  MonitorCog,
  Code2,
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "SOC Skills",
      icon: Shield,
      skills: [
        { name: "SOC Fundamentals", level: "Beginner" },
        { name: "SIEM Concepts", level: "Beginner" },
        { name: "Log Analysis", level: "Beginner" },
        { name: "Incident Response", level: "Beginner" },
        { name: "Phishing Analysis", level: "Beginner" },
        { name: "MITRE ATT&CK", level: "Beginner" },
        { name: "Cyber Kill Chain", level: "Beginner" },
      ],
    },
    {
      title: "Security Tools",
      icon: Search,
      skills: [
        { name: "Splunk", level: "Beginner" },
        { name: "Wireshark", level: "Beginner" },
        { name: "VirusTotal", level: "Beginner" },
        { name: "Cisco Packet Tracer", level: "Intermediate" },
        { name: "Nmap", level: "Beginner" },
      ],
    },
    {
      title: "Networking",
      icon: Network,
      skills: [
        { name: "TCP/IP", level: "Intermediate" },
        { name: "DNS", level: "Intermediate" },
        { name: "HTTP/HTTPS", level: "Intermediate" },
        { name: "Common Ports", level: "Intermediate" },
      ],
    },
    {
      title: "Operating Systems & Programming",
      icon: Code2,
      skills: [
        { name: "Windows", level: "Intermediate" },
        { name: "Linux", level: "Intermediate" },
        { name: "Python", level: "Beginner" },
        { name: "SQL", level: "Beginner" },
      ],
    },
  ];

  const coreCompetencies = [
    { icon: Eye, label: "Threat Monitoring" },
    { icon: AlertTriangle, label: "Incident Response" },
    { icon: Database, label: "SIEM Concepts" },
    { icon: Lock, label: "Phishing Analysis" },
  ];

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-green/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; ls -la skills/</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Technical Skills</h2>
        </motion.div>

        {/* Core competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {coreCompetencies.map((comp, index) => (
            <motion.div
              key={comp.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="glass-card p-4 text-center group hover:border-cyber-green/30 transition-all cursor-default"
            >
              <comp.icon className="w-8 h-8 text-cyber-green mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-mono text-muted-foreground">{comp.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
                  <category.icon className="w-5 h-5 text-cyber-green" />
                </div>
                <h3 className="text-lg font-mono font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-md bg-secondary/40 border border-border/50"
                  >
                    <span className="text-sm font-mono text-foreground">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        skill.level === "Intermediate"
                          ? "bg-cyber-green/15 text-cyber-green border-cyber-green/30"
                          : "bg-cyber-green/5 text-cyber-green/80 border-cyber-green/20"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;