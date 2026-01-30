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
  Cpu
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Security Tools",
      icon: Shield,
      skills: [
        { name: "Splunk", level: 95 },
        { name: "Microsoft Sentinel", level: 90 },
        { name: "CrowdStrike", level: 85 },
        { name: "Wireshark", level: 88 },
      ],
    },
    {
      title: "Threat Detection",
      icon: Search,
      skills: [
        { name: "YARA Rules", level: 85 },
        { name: "Sigma Rules", level: 90 },
        { name: "IOC Analysis", level: 92 },
        { name: "Log Analysis", level: 95 },
      ],
    },
    {
      title: "Incident Response",
      icon: AlertTriangle,
      skills: [
        { name: "Forensics", level: 80 },
        { name: "Malware Triage", level: 85 },
        { name: "Root Cause Analysis", level: 88 },
        { name: "Playbook Dev", level: 90 },
      ],
    },
    {
      title: "Technical Skills",
      icon: Terminal,
      skills: [
        { name: "Python", level: 82 },
        { name: "PowerShell", level: 88 },
        { name: "Linux/Bash", level: 85 },
        { name: "KQL/SPL", level: 92 },
      ],
    },
  ];

  const coreCompetencies = [
    { icon: Eye, label: "Threat Hunting" },
    { icon: Lock, label: "Access Control" },
    { icon: Database, label: "SIEM Operations" },
    { icon: Cpu, label: "Automation" },
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

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="font-mono text-cyber-green">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: 0.5 + catIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyber-dim to-cyber-green"
                        style={{
                          boxShadow: "0 0 10px hsl(var(--cyber-green) / 0.5)",
                        }}
                      />
                    </div>
                  </div>
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