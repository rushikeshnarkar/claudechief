import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink, Bookmark, User, Calendar, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import DownloadButton from '@/components/DownloadButton';
import { SkillActions } from './SkillActions';

interface SkillDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SkillDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: skill } = await supabase
    .from('skills')
    .select('title, description, department, tier, creator_name, creator_link, asset_file')
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
    .select('*, asset_file')
    .eq('slug', slug)
    .single();

  if (!skill) notFound();

  const deptLabel = skill.department.charAt(0).toUpperCase() + skill.department.slice(1);
  const sourceLabel = skill.source_type === 'github' ? 'GitHub'
    : skill.source_type === 'youtube' ? 'YouTube'
    : skill.source_type === 'blog' ? 'Blog'
    : skill.source_type === 'twitter' ? 'Twitter'
    : 'Source';

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          {/* Back Button */}
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to skills
          </Link>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="badge badge-dept">{deptLabel}</span>
            <span className={`badge ${skill.tier === 'free' ? 'badge-free' : 'badge-elite'}`}>
              {skill.tier === 'elite' ? 'Elite' : 'Free'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.1] mb-5">
            {skill.title}
          </h1>

          {/* Decorative accent underline */}
          <div className="w-32 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6" />

          {/* Description */}
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
            {skill.description}
          </p>

          {/* Meta Stats */}
          <div className="flex items-center gap-6 text-sm flex-wrap">
            {skill.creator_link ? (
              <a
                href={skill.creator_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>by <span className="font-medium">{skill.creator_name}</span></span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <User className="w-4 h-4" />
                <span>by <span className="font-medium">{skill.creator_name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Bookmark className="w-4 h-4 text-[var(--color-accent)]" />
              <span>{formatNumber(skill.save_count ?? 0)} saves</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Calendar className="w-4 h-4" />
              <span>{new Date(skill.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[var(--color-bg-base)]">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Prompt Preview Card */}
              {skill.prompt_preview && (
                <div className="relative p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(196,99,58,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-[var(--color-accent-muted)] rounded-xl">
                      <Star className="w-5 h-5 text-[var(--color-accent)]" />
                    </span>
                    Prompt Preview
                  </h2>
                  <pre className="text-sm font-mono text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap bg-[var(--color-bg-base)] rounded-xl p-5 border border-[var(--color-border)] overflow-x-auto">
                    {skill.prompt_preview}
                  </pre>
                </div>
              )}

              {/* Related Resources */}
              <div className="p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
                <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-4">
                  Related Resources
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  More {deptLabel} skills coming soon…
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <SkillActions skill={skill} sourceLabel={sourceLabel} />
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
              price: '0',
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