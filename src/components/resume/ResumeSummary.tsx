import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Activity, Network, FileSearch } from "lucide-react";

const ResumeSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const highlights = [
    { icon: Shield, text: "Foundational knowledge of SOC processes, SIEM concepts, and log analysis" },
    { icon: Activity, text: "Hands-on labs in incident response and phishing investigation" },
    { icon: Network, text: "Networking fundamentals across Windows and Linux environments" },
    { icon: FileSearch, text: "Tools: Splunk, Wireshark, Nmap, VirusTotal, Cisco Packet Tracer" },
  ];

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 max-w-4xl mx-auto"
        >
          <span className="terminal-text text-cyber-green">&gt; cat summary.txt</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4">Professional Summary</h2>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Aspiring SOC Analyst with foundational knowledge of SOC processes, SIEM concepts,
            log analysis, and phishing investigation. Passionate about building practical
            cybersecurity labs and continuously improving incident detection, investigation,
            and response capabilities. Seeking opportunities as a SOC Intern or Junior SOC Analyst.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-colors"
              >
                <div className="mt-0.5 p-1.5 rounded-md bg-cyber-green/10 border border-cyber-green/20">
                  <item.icon className="w-4 h-4 text-cyber-green" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSummary;
