import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Calendar, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 relative" ref={ref}>
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyber-green/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="terminal-text text-cyber-green">&gt; cat /var/log/research/*</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Write-ups & Research</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Security research, case studies, and technical write-ups from the trenches.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
            >
              <Link
                to={`/blog/${article.slug}`}
                className="glass-card group flex flex-col transition-all duration-300 hover:ring-1 hover:ring-cyber-green/40 h-full"
              >
                <div className="h-1 w-full bg-gradient-to-r from-cyber-dim to-cyber-green opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <FileText className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-mono font-semibold leading-snug mb-3 group-hover:text-cyber-green transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-mono text-cyber-green opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
