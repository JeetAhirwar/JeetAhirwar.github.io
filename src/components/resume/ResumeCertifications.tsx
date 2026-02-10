import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const ResumeCertifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const certs = [
    { name: "Google Cybersecurity Certificate", issuer: "Google / Coursera", year: "2024" },
    { name: "Cisco CyberOps Associate", issuer: "Cisco", year: "2024" },
    { name: "CompTIA Security+ (In Progress)", issuer: "CompTIA", year: "2025" },
    { name: "Splunk Core Certified User", issuer: "Splunk", year: "2024" },
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
          <span className="terminal-text text-cyber-green">&gt; certifications --verified</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Certifications</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
              className="glass-card p-5 text-center group hover:border-cyber-green/30 transition-all"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-cyber-green" />
              </div>
              <h3 className="text-sm font-mono font-semibold leading-snug mb-1">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              <span className="inline-block mt-2 text-xs font-mono text-cyber-green bg-cyber-green/10 px-2 py-0.5 rounded">
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeCertifications;
