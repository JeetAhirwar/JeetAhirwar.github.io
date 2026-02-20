import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Wrench, Network, Users } from "lucide-react";

const ResumeSkills = () => {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-80px" });

  // const categories = [
  //   {
  //     title: "SOC & Security",
  //     icon: Shield,
  //     skills: [
  //       { name: "Threat Hunting", level: 85 },
  //       { name: "Incident Response", level: 80 },
  //       { name: "Log Analysis", level: 90 },
  //       { name: "Malware Triage", level: 75 },
  //     ],
  //   },
  //   {
  //     title: "Tools & Platforms",
  //     icon: Wrench,
  //     skills: [
  //       { name: "Splunk", level: 90 },
  //       { name: "Microsoft Sentinel", level: 85 },
  //       { name: "CrowdStrike", level: 80 },
  //       { name: "Wireshark", level: 88 },
  //     ],
  //   },
  //   {
  //     title: "Networking & Protocols",
  //     icon: Network,
  //     skills: [
  //       { name: "TCP/IP", level: 88 },
  //       { name: "DNS / HTTP", level: 85 },
  //       { name: "Firewall Rules", level: 80 },
  //       { name: "VPN / Proxy", level: 78 },
  //     ],
  //   },
  //   {
  //     title: "Soft Skills",
  //     icon: Users,
  //     skills: [
  //       { name: "Analytical Thinking", level: 92 },
  //       { name: "Documentation", level: 88 },
  //       { name: "Team Collaboration", level: 90 },
  //       { name: "Communication", level: 85 },
  //     ],
  //   },
  // ];

  // return (
  //   <section className="py-20 relative" ref={ref}>
  //     <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyber-green/3 rounded-full blur-[150px]" />

  //     <div className="container mx-auto px-6 relative">
  //       <motion.div
  //         initial={{ opacity: 0, y: 30 }}
  //         animate={isInView ? { opacity: 1, y: 0 } : {}}
  //         transition={{ duration: 0.6 }}
  //         className="mb-12"
  //       >
  //         <span className="terminal-text text-cyber-green">&gt; skills --list --verbose</span>
  //         <h2 className="text-3xl md:text-4xl font-bold mt-2">Skills & Expertise</h2>
  //       </motion.div>

  //       <div className="grid md:grid-cols-2 gap-6">
  //         {categories.map((cat, catIdx) => (
  //           <motion.div
  //             key={cat.title}
  //             initial={{ opacity: 0, y: 30 }}
  //             animate={isInView ? { opacity: 1, y: 0 } : {}}
  //             transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.1 }}
  //             className="glass-card p-6"
  //           >
  //             <div className="flex items-center gap-3 mb-5">
  //               <div className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
  //                 <cat.icon className="w-5 h-5 text-cyber-green" />
  //               </div>
  //               <h3 className="text-lg font-mono font-semibold">{cat.title}</h3>
  //             </div>

  //             <div className="space-y-4">
  //               {cat.skills.map((skill, sIdx) => (
  //                 <div key={skill.name}>
  //                   <div className="flex justify-between text-sm mb-1.5">
  //                     <span className="text-muted-foreground">{skill.name}</span>
  //                     <span className="font-mono text-cyber-green">{skill.level}%</span>
  //                   </div>
  //                   <div className="h-2 bg-secondary rounded-full overflow-hidden">
  //                     <motion.div
  //                       initial={{ width: 0 }}
  //                       animate={isInView ? { width: `${skill.level}%` } : {}}
  //                       transition={{
  //                         duration: 1,
  //                         delay: 0.4 + catIdx * 0.1 + sIdx * 0.1,
  //                         ease: "easeOut",
  //                       }}
  //                       className="h-full rounded-full bg-gradient-to-r from-cyber-dim to-cyber-green"
  //                       style={{ boxShadow: "0 0 10px hsl(var(--cyber-green) / 0.5)" }}
  //                     />
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default ResumeSkills;
