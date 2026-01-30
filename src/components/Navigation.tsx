import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Shield className="w-6 h-6 text-cyber-green group-hover:scale-110 transition-transform" />
            <span className="font-mono font-semibold text-foreground">
              GHOST<span className="text-cyber-green">_</span>CODE
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-mono text-muted-foreground hover:text-cyber-green transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-green transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg border border-cyber-green/30 text-cyber-green font-mono text-sm hover:bg-cyber-green/10 transition-all"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-muted-foreground hover:text-cyber-green transition-colors font-mono"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block px-4 py-2 rounded-lg border border-cyber-green/30 text-cyber-green font-mono text-sm hover:bg-cyber-green/10 transition-all"
            >
              Hire Me
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;