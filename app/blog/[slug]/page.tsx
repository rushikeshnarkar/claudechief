import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, FileText, Tag, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  content: string;
}

async function getPost(slug: string): Promise<PostData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return {
      slug,
      content,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      author: data.author as string,
      category: data.category as string,
      tags: data.tags as string[] | undefined,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Claude Chief Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

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

      {/* ─── ARTICLE ─── */}
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Category & Date */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#6B6158]">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-[#A99E92] leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Author & Tags */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-[#A99E92]">
                <div className="w-8 h-8 bg-[#131118] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-[#6B6158]" />
                </div>
                <span>{post.author}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#6B6158]" />
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#131118] text-[#6B6158] text-xs rounded-full border border-[rgba(54,46,40,0.5)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <article className="relative p-8 sm:p-10 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.06),transparent_70%)]" />

            <div className="prose max-w-none text-[#A99E92] relative leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-display text-3xl font-bold text-[#F5F0EB] mb-4 mt-8">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-3 mt-8">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display text-xl font-bold text-[#F5F0EB] mb-3 mt-6">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-base leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 pl-6 space-y-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 pl-6 space-y-2 list-decimal">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[#A99E92]">{children}</li>
                  ),
                  code: ({ children }) => (
                    <code className="px-2 py-1 bg-[#131118] text-[#D97757] rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="mb-4 p-5 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="pl-5 py-3 border-l-2 border-[#D97757] mb-4 italic text-[#A99E92]">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D97757] hover:text-[#E5886A] underline"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-[#F5F0EB] font-semibold">{children}</strong>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Related Content */}
          <div className="mt-12 p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
            <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-4">
              Continue reading
            </h3>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#D97757] hover:text-[#E5886A] font-medium transition-colors"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Claude Chief',
            },
          }),
        }}
      />
    </>
  );
}