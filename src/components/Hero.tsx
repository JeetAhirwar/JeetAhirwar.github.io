import { motion } from "framer-motion";
import { Shield, Terminal, ChevronDown } from "lucide-react";

const Hero = () => {
  const titleWords = "Security Operations Analyst".split(" ");
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyber-green/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Terminal badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-green/30 bg-cyber-green/5"
            >
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="terminal-text text-cyber-green">Available for opportunities</span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="terminal-text text-muted-foreground"
              >
                &gt; whoami
              </motion.p>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-foreground"
                >
                  Hi, I'm{" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="cyber-text cyber-glow"
                >
                  Jeet Ahirwar
                </motion.span>
              </h1>

              <div className="flex flex-wrap gap-2 text-1xl md:text-2xl font-mono font-medium text-muted-foreground">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={index === 0 ? "text-cyber-green" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Protecting digital assets and hunting threats in the SOC. 
              Specialized in incident response, threat intelligence, and SIEM operations.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-green text-primary-foreground font-mono font-medium transition-all hover:shadow-[0_0_30px_hsl(var(--cyber-green)/0.4)]"
              >
                <Terminal className="w-4 h-4" />
                Get in touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyber-green/30 text-foreground font-mono font-medium transition-all hover:bg-cyber-green/10 hover:border-cyber-green/50"
              >
                <Shield className="w-4 h-4" />
                View Projects
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-cyber-green/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border border-cyber-green/15" />
              <div className="absolute inset-16 rounded-full border border-cyber-green/10" />
              
              {/* Center glow */}
              <div className="absolute inset-24 rounded-full bg-cyber-green/10 blur-xl" />
              
              {/* Shield icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-20 border border-dashed border-cyber-green/20 rounded-full"
                />
                <Shield className="w-24 h-24 text-cyber-green/80" strokeWidth={1} />
              </div>

              {/* Floating nodes */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-cyber-green/60"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: i % 2 === 0 ? "10%" : "85%",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="terminal-text text-xs">scroll</span>
            <ChevronDown className="w-5 h-5 text-cyber-green" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;