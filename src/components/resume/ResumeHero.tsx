import { motion } from "framer-motion";

const ResumeHero = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden grid-bg">
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyber-green/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-cyber-green/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group shrink-0"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyber-green/40 via-cyber-green/10 to-cyber-green/30 blur-sm group-hover:blur-md group-hover:from-cyber-green/50 group-hover:to-cyber-green/40 transition-all duration-500" />
            
            {/* Photo container */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-cyber-green/30 group-hover:border-cyber-green/50 transition-colors duration-500">
              <img
                src="/newone.jpeg"
                alt="Jeet Ahirwar – SOC Analyst"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-cyber-green/0 group-hover:bg-cyber-green/5 transition-colors duration-500" />
            </div>

            {/* Online indicator */}
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-cyber-green border-2 border-background animate-pulse" />
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
