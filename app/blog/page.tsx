import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArrowRight, Calendar, User, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const metadata: Metadata = {
  title: 'Claude Chief Blog — AI Insights & Resources',
  description: 'Stay updated with the latest Claude news, tutorials, and insights. Expert guides on Claude skills, workflows, and the AI ecosystem.',
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
}

function getBlogPosts(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const files = fs.readdirSync(postsDirectory);

    const posts = files.map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.md$/, '');

      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        author: data.author as string,
        category: data.category as string,
      };
    });

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 lg:px-8 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#D97757] rounded-[10px] overflow-hidden">
                <div className="absolute top-[5px] right-[5px] w-3.5 h-3.5 bg-[#F5F0EB] rounded-full" />
                <div className="absolute bottom-[5px] left-[6px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-[3px] rotate-12" />
              </div>
            </div>
            <span className="font-display text-xl font-bold text-[#F5F0EB] tracking-tight">
              Claude Chief
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/skills" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Skills
            </Link>
            <Link href="/workflows" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Workflows
            </Link>
            <Link href="/mcps" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              MCPs
            </Link>
            <Link href="/blog" className="px-4 py-2.5 text-sm font-semibold text-[#F5F0EB] bg-[#D97757] rounded-lg">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="btn btn-primary text-sm h-11 px-5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO HEADER ─── */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D97757]/20 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#D97757]" />
            </div>
            <span className="text-[#6B6158] text-sm">Insights, tutorials & news</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            Insights, tutorials, and news about Claude, AI skills, and the future of work.
          </p>
        </div>
      </section>

      {/* ─── BLOG POSTS ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#A99E92] text-lg mb-4">Blog posts coming soon</p>
              <Link href="/skills" className="btn btn-primary">
                Browse skills
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group relative p-8 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] spring-hover animate-fadeUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.08),transparent_70%)]" />

                  <Link href={`/blog/${post.slug}`} className="block relative">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="inline-flex items-center px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[#6B6158]">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F5F0EB] mb-3 group-hover:text-[#D97757] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#A99E92] text-sm leading-relaxed mb-5 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-[#6B6158]">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-[#D97757] font-medium group-hover:gap-3 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1A1720] border-t border-[rgba(54,46,40,0.3)] px-6 sm:px-8 py-12">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D97757] rounded-lg relative overflow-hidden">
              <div className="absolute top-[4px] right-[4px] w-2 h-2 bg-[#F5F0EB] rounded-full" />
              <div className="absolute bottom-[4px] left-[4px] w-1.5 h-1.5 bg-[#F5F0EB] rounded-[2px] rotate-12" />
            </div>
            <span className="text-[#6B6158] text-sm">
              Claude Chief · Not affiliated with Anthropic
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#6B6158]">
            <Link href="/skills" className="hover:text-[#A99E92] transition-colors">Skills</Link>
            <Link href="/blog" className="hover:text-[#A99E92] transition-colors">Blog</Link>
            <Link href="/sign-in" className="hover:text-[#A99E92] transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </>
  );
}