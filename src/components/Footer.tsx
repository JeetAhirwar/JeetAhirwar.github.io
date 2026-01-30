import { Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber-green" />
            <span className="font-mono text-sm text-muted-foreground">
              AC<span className="text-cyber-green">_</span>SEC © {currentYear}
            </span>
          </div>

          <p className="text-sm text-muted-foreground font-mono">
            Built with <span className="text-cyber-green">{"<"}/</span> and ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;