import { motion } from "framer-motion";


const ResumeHero = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden grid-bg">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyber-green/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group shrink-0 mb-8"
          >
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-cyber-green/40 via-cyber-green/10 to-cyber-green/30 blur-sm group-hover:blur-md transition-all duration-500" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-cyber-green/30 group-hover:border-cyber-green/50 group-hover:scale-105 transition-all duration-500">
              <img
                src="/newone1.png"
                alt="Jeet Ahirwar – SOC Analyst"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/5 transition-colors duration-500" />
            </div>
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-cyber-green border-2 border-background animate-pulse" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Jeet </span>
              <span className="cyber-text">Ahirwar</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono text-cyber-green/80 mt-3">
              SOC Analyst / Blue Team Enthusiast
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed italic"
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
