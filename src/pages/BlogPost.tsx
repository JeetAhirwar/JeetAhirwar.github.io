import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, FileText, Tag } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-28 pb-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/#blog" className="text-cyber-green font-mono hover:underline">
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-28 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-cyber-green transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to write-ups
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <FileText className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

            <p className="text-muted-foreground leading-relaxed">{post.summary}</p>

            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Divider */}
          <div className="h-px bg-border mb-10" />

          {/* Markdown content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose-cyber"
          >
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 mb-4 ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 mb-4 ml-4 list-decimal">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground leading-relaxed flex items-start gap-2">
                    <span className="text-cyber-green mt-2 w-1.5 h-1.5 rounded-full bg-cyber-green shrink-0" />
                    <span>{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">{children}</strong>
                ),
                code: ({ className, children }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <code className="block bg-terminal-bg border border-border rounded-lg p-4 font-mono text-sm text-cyber-green overflow-x-auto mb-4">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="px-1.5 py-0.5 bg-secondary text-cyber-green font-mono text-sm rounded">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="mb-4">{children}</pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-secondary">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="text-left px-4 py-2 font-mono text-foreground border-b border-border">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-muted-foreground border-b border-border">
                    {children}
                  </td>
                ),
                hr: () => <hr className="border-border my-8" />,
                em: ({ children }) => (
                  <em className="text-muted-foreground italic">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-cyber-green hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
