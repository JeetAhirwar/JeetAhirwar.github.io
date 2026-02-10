import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const ResumeHero = () => {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden grid-bg">
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyber-green/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar / Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full border-2 border-cyber-green/40 flex items-center justify-center bg-cyber-green/5">
              <Shield className="w-12 h-12 text-cyber-green" strokeWidth={1.5} />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyber-green border-2 border-background" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Jeet </span>
              <span className="cyber-text">Ahirwar</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono text-muted-foreground mt-2">
              SOC Analyst / Blue Team Enthusiast
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mt-3 max-w-xl leading-relaxed"
            >
              Protecting digital infrastructure through proactive threat hunting, incident response, and security monitoring.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeHero;
