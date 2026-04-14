import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Bookmark, User, Calendar, Share2, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';

interface SkillDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SkillDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: skill } = await supabase
    .from('skills')
    .select('title, description, department, tier, creator_name, creator_link')
    .eq('slug', slug)
    .single();

  if (!skill) return { title: 'Skill Not Found' };

  return {
    title: `${skill.title} — Claude Skill | Claude Chief`,
    description: skill.description,
    openGraph: {
      title: skill.title,
      description: skill.description,
      type: 'article',
      url: `${SITE_URL}/skills/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/skills/${slug}`,
    },
  };
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: skill } = await supabase
    .from('skills')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!skill) notFound();

  const deptLabel = skill.department.charAt(0).toUpperCase() + skill.department.slice(1);
  const sourceLabel = skill.source_type === 'github' ? 'GitHub'
    : skill.source_type === 'youtube' ? 'YouTube'
    : skill.source_type === 'blog' ? 'Blog'
    : skill.source_type === 'twitter' ? 'Twitter'
    : 'Source';

  const tierBadge = skill.tier === 'free'
    ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
    : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]';

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to skills
          </Link>

          {/* Tags */}
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
              {deptLabel}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${tierBadge}`}>
              {skill.tier === 'elite' ? 'Elite' : 'Free'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
            {skill.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl mb-8">
            {skill.description}
          </p>

          {/* Meta Stats */}
          <div className="flex items-center gap-6 text-sm flex-wrap">
            {skill.creator_link ? (
              <a
                href={skill.creator_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A99E92] hover:text-[#D97757] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>by <span className="font-medium">{skill.creator_name}</span></span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-[#A99E92]">
                <User className="w-4 h-4" />
                <span>by <span className="font-medium">{skill.creator_name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#A99E92]">
              <Bookmark className="w-4 h-4" />
              <span>{formatNumber(skill.save_count)} saves</span>
            </div>
            <div className="flex items-center gap-2 text-[#A99E92]">
              <Calendar className="w-4 h-4" />
              <span>{new Date(skill.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Prompt Preview Card */}
              {skill.prompt_preview && (
                <div className="relative p-8 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#D97757]/20 rounded-lg">
                      <Star className="w-4 h-4 text-[#D97757]" />
                    </span>
                    Prompt Preview
                  </h2>
                  <pre className="text-[#A99E92] text-sm leading-relaxed whitespace-pre-wrap font-mono bg-[#131118]/50 rounded-xl p-5 border border-[rgba(54,46,40,0.3)]">
                    {skill.prompt_preview}
                  </pre>
                </div>
              )}

              {/* Related Resources */}
              <div className="p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">
                  Related Resources
                </h2>
                <p className="text-[#6B6158] text-sm">
                  More {deptLabel} skills coming soon…
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Action Card */}
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
                  Get this skill
                </h3>
                <div className="space-y-3">
                  {skill.source_url ? (
                    <a
                      href={skill.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center"
                    >
                      View on {sourceLabel}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button className="btn btn-primary w-full justify-center opacity-50 cursor-not-allowed">
                      No source available
                    </button>
                  )}
                  <button className="btn btn-ghost w-full justify-center">
                    <Bookmark className="w-4 h-4" />
                    Save for later
                  </button>
                </div>
              </div>

              {/* Share Card */}
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
                  Share this skill
                </h3>
                <button className="btn btn-outline w-full justify-center">
                  <Share2 className="w-4 h-4" />
                  Copy link
                </button>
              </div>

              {/* Creator Card */}
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
                  Creator
                </h3>
                {skill.creator_link ? (
                  <a
                    href={skill.creator_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center text-lg">
                      <User className="w-5 h-5 text-[#6B6158]" />
                    </div>
                    <span className="font-medium">{skill.creator_name}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 text-[#A99E92]">
                    <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center text-lg">
                      <User className="w-5 h-5 text-[#6B6158]" />
                    </div>
                    <span className="font-medium">{skill.creator_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: skill.title,
            description: skill.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Claude',
            offers: {
              '@type': 'Offer',
              price: skill.tier === 'free' ? '0' : '0',
              priceCurrency: 'USD',
            },
            author: {
              '@type': 'Person',
              name: skill.creator_name,
              url: skill.creator_link || undefined,
            },
            keywords: `Claude skills, ${skill.department}, AI prompts`,
            url: `${SITE_URL}/skills/${slug}`,
          }),
        }}
      />
    </>
  );
}
