import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArrowRight, Calendar, User, FileText } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0D0B0F]">
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
      <section className="px-4 sm:px-6 lg:px-8 py-12">
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
    </div>
  );
}
