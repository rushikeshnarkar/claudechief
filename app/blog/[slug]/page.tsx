import { createClient } from '@/lib/supabase/server';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: page } = await supabase
    .from('pages')
    .select('title, slug, meta_title, meta_description, og_image, tags')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || '',
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || '',
      images: page.og_image ? [{ url: page.og_image }] : [],
      type: 'article',
    },
    alternates: { canonical: `/blog/${page.slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!page) {
    return (
      <div className="min-h-screen bg-[#0D0B0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-[#F5F0EB] mb-4">404</h1>
          <p className="text-[#A99E92] mb-6">This page doesn't exist.</p>
          <Link href="/blog" className="btn btn-primary">Browse all posts</Link>
        </div>
      </div>
    );
  }

  const blocks = page.blocks || [];
  const publishedDate = page.published_at
    ? new Date(page.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.meta_title || page.title,
    description: page.meta_description || page.excerpt || '',
    datePublished: page.published_at,
    author: { '@type': 'Organization', name: page.author || 'Claude Chief' },
    publisher: {
      '@type': 'Organization',
      name: 'Claude Chief',
      url: 'https://claudechief-v1.netlify.app',
    },
    keywords: (page.tags || []).join(', '),
    ...(page.og_image && { image: page.og_image }),
  };

  const faqBlocks = blocks.filter((b: any) => b.type === 'faq');
  const faqSchema = faqBlocks.flatMap((block: any) =>
    (block.content.items || []).map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqSchema,
            }),
          }}
        />
      )}

      <div className="min-h-screen bg-[#0D0B0F]">
        <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
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
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center px-4 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                  {page.page_type}
                </span>
                {publishedDate && (
                  <span className="flex items-center gap-1.5 text-sm text-[#6B6158]">
                    <Calendar className="w-4 h-4" />
                    {publishedDate}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
                {page.title}
              </h1>

              {page.excerpt && (
                <p className="text-lg text-[#A99E92] leading-relaxed mb-6">{page.excerpt}</p>
              )}

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-[#A99E92]">
                  <div className="w-8 h-8 bg-[#131118] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#6B6158]" />
                  </div>
                  <span>{page.author}</span>
                </div>
                {page.tags && page.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#6B6158]" />
                    <div className="flex gap-2 flex-wrap">
                      {page.tags.map((tag: string) => (
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

            {/* Content Blocks */}
            <div className="relative p-8 sm:p-10 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.06),transparent_70%)]" />
              <div className="relative space-y-0">
                {blocks.map((block: any, index: number) => (
                  <BlockRenderer key={block.id || index} block={block} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-4">Continue reading</h3>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#D97757] hover:text-[#E5886A] font-medium transition-colors"
              >
                View all posts <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}