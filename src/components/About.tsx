import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Briefcase, Award } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: "0+" },
    { icon: Award, label: "Certifications", value: "4" },
    { icon: MapPin, label: "Location", value: "Bhopal" },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; cat about.txt</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
                <User className="w-6 h-6 text-cyber-green" />
              </div>
              <div>
                <h3 className="text-xl font-mono font-semibold">Security Professional</h3>
                <p className="text-muted-foreground text-sm">Blue Team Specialist</p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I’m an MCA student with a strong interest in SOC operations and cybersecurity. I’m learning how security alerts are monitored, logs are analyzed, and incidents are identified using SIEM tools and SOC workflows.
              </p>
              <p>
                I have practiced phishing analysis, basic malware understanding, network security concepts, and threat detection through labs, simulations, and self-learning. I enjoy analyzing security events, understanding how attacks happen, and improving my skills step by step.
              </p>
              <p>
                I’m a quick learner, detail-oriented, and motivated to start my career as a SOC Analyst, where I can learn from real-world environments and grow into a strong security professional.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
              {["Threat Hunting", "SIEM", "Incident Response", "Malware Analysis", "Blue Team"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats cards */}
          <div className="lg:col-span-2 space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 flex items-center gap-4 group hover:border-cyber-green/30 transition-colors"
              >
                <div className="p-3 rounded-lg bg-cyber-green/5 border border-cyber-green/10 group-hover:bg-cyber-green/10 transition-colors">
                  <stat.icon className="w-5 h-5 text-cyber-green" />
                </div>
                <div>
                  <p className="text-2xl font-mono font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6"
            >
              <p className="text-sm text-muted-foreground mb-3">Certifications</p>
              <div className="space-y-2">
                {["Junior Cybersecurity Analyst Career Path", "Introduction to Cybersecurity ", "Cybersecurity Essentials ", "Foundations of Cybersecurity "].map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                    <span className="text-sm font-mono">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;