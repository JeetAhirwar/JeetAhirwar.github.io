import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Linkedin, Github, CheckCircle, Loader2 } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("sent");
    
    // Reset after showing success
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:alex@example.com" },
  ];

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-green/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="terminal-text text-cyber-green">&gt; ./contact --init</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Get In Touch</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Interested in collaborating or have a security challenge? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/50 transition-all font-mono"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/50 transition-all font-mono"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-green/50 focus:ring-1 focus:ring-cyber-green/50 transition-all resize-none font-mono"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={formState !== "idle"}
                className="w-full py-3 px-6 rounded-lg bg-cyber-green text-primary-foreground font-mono font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_30px_hsl(var(--cyber-green)/0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Terminal style message */}
            <div className="glass-card p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--terminal-close))" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--terminal-minimize))" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--terminal-maximize))" }} />
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p><span className="text-cyber-green">$</span> cat availability.txt</p>
                <p className="pl-4">Currently open to:</p>
                <p className="pl-4 text-foreground">→ Full-time SOC roles</p>
                <p className="pl-4 text-foreground">→ Security consulting</p>
                <p className="pl-4 text-foreground">→ Speaking opportunities</p>
                <p className="mt-4"><span className="text-cyber-green">$</span> <span className="animate-blink">_</span></p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4 font-mono">Connect with me</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-4 glass-card hover:border-cyber-green/30 transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-cyber-green transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground mb-1 font-mono">Location</p>
              <p className="text-foreground">Madhya Pradesh, India</p>
              <p className="text-sm text-muted-foreground mt-1">Remote-friendly</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;