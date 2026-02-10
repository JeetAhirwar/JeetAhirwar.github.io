import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Mail } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const ResumeDownloadCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-14 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="cyber-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Interested in working together? Download my resume or reach out directly — 
            I'm always open to discussing security challenges.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-green text-primary-foreground font-mono font-medium transition-all hover:shadow-[0_0_30px_hsl(var(--cyber-green)/0.4)]"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <HashLink
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyber-green/30 text-foreground font-mono font-medium transition-all hover:bg-cyber-green/10 hover:border-cyber-green/50"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </HashLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeDownloadCTA;
