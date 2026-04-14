import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SITE_URL } from '@/lib/constants';

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  twitter: { bg: 'rgba(56,163,255,0.12)', text: '#38A3FF' },
  youtube: { bg: 'rgba(255,59,48,0.12)', text: '#FF3B30' },
  github: { bg: 'rgba(255,255,255,0.08)', text: '#F5F0EB' },
  blog: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80' },
  linkedin: { bg: 'rgba(10,102,194,0.12)', text: '#0A66C2' },
  newsletter: { bg: 'rgba(201,134,42,0.12)', text: '#D97757' },
};

function formatFollowerCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

interface CreatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: creator } = await supabase
    .from('creators')
    .select('name, focus_area')
    .eq('slug', slug)
    .single();

  if (!creator) return { title: 'Creator Not Found' };

  return {
    title: `${creator.name} — Claude Creator | Claude Chief`,
    description: creator.focus_area,
    alternates: {
      canonical: `${SITE_URL}/creators/${slug}`,
    },
  };
}

export default async function CreatorDetailPage({ params }: CreatorPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: creator } = await supabase
    .from('creators')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!creator) notFound();

  const platformStyle = PLATFORM_COLORS[creator.platform] || PLATFORM_COLORS.blog;
  const platformLabel = creator.platform.charAt(0).toUpperCase() + creator.platform.slice(1);
  const bestResources = Array.isArray(creator.best_resources) ? creator.best_resources : [];

  return (
    <>
      {/* ─── PROFILE HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/creators" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to creators
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#F5F0EB] flex-shrink-0" style={{ background: platformStyle.bg }}>
              <User className="w-12 h-12" style={{ color: platformStyle.text }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-display text-3xl font-bold text-[#F5F0EB] tracking-tight">{creator.name}</h1>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full" style={{ background: platformStyle.bg, color: platformStyle.text }}>
                  {platformLabel}
                </span>
              </div>
              {creator.focus_area && (
                <p className="text-[#A99E92] text-sm mb-3">{creator.focus_area}</p>
              )}
              {creator.focus_area && (
                <p className="text-[#A99E92] leading-relaxed mb-5">{creator.focus_area}</p>
              )}
              <div className="flex items-center gap-6 text-sm flex-wrap">
                <span className="text-[#6B6158]">{formatFollowerCount(creator.follower_count)} followers</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {creator.profile_url && (
            <div className="flex gap-3 mt-6">
              <a href={creator.profile_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-10 px-4">
                Follow on {platformLabel} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ─── RESOURCES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resources */}
            <div className="lg:col-span-2 space-y-8">
              {bestResources.length > 0 && (
                <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">Best Resources</h2>
                  <div className="space-y-3">
                    {bestResources.map((resource: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)]">
                        <span className="text-sm font-medium text-[#F5F0EB]">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Best Resource */}
            <div>
              {bestResources[0] && (
                <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] sticky top-24">
                  <h3 className="text-[10px] uppercase tracking-wider text-[#6B6158] mb-3">Best Resource</h3>
                  <div className="p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)] mb-5">
                    <span className="text-[#F5F0EB] font-medium text-sm">{bestResources[0]}</span>
                  </div>
                  {creator.profile_url && (
                    <a href={creator.profile_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center text-sm">
                      Follow on {platformLabel} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
