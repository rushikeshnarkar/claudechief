import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Zap, Rocket, Code, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SITE_URL } from '@/lib/constants';

const TYPE_CONFIG: Record<string, { icon: typeof Rocket; color: string; bg: string; border: string }> = {
  model: { icon: Rocket, color: '#D97757', bg: 'rgba(217,119,87,0.12)', border: 'rgba(217,119,87,0.2)' },
  feature: { icon: Zap, color: '#6A9BCC', bg: 'rgba(106,155,204,0.12)', border: 'rgba(106,155,204,0.2)' },
  api: { icon: Code, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.2)' },
  announcement: { icon: FileText, color: '#D97757', bg: 'rgba(201,134,42,0.12)', border: 'rgba(201,134,42,0.2)' },
};

const TYPE_LABELS: Record<string, string> = {
  model: 'Model',
  feature: 'Feature',
  api: 'API',
  announcement: 'Announcement',
};

interface UpdatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: update } = await supabase
    .from('updates')
    .select('title, summary')
    .eq('slug', slug)
    .single();

  if (!update) return { title: 'Update Not Found' };

  return {
    title: `${update.title} — Claude Update | Claude Chief`,
    description: update.summary,
    alternates: {
      canonical: `${SITE_URL}/updates/${slug}`,
    },
  };
}

export default async function UpdateDetailPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: update } = await supabase
    .from('updates')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!update) notFound();

  const config = TYPE_CONFIG[update.update_type] || TYPE_CONFIG.feature;
  const Icon = config.icon;
  const typeLabel = TYPE_LABELS[update.update_type] || update.update_type;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/updates" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full border" style={{ background: config.bg, color: config.color, borderColor: config.border }}>
              <Icon className="w-3 h-3" /> {typeLabel}
            </span>
            {update.impact_level === 'high' && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                <Zap className="w-3 h-3" /> High Impact
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-[#6B6158]">
              <Calendar className="w-4 h-4" />
              {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
            {update.title}
          </h1>
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl">
            {update.summary}
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#D97757]/20 rounded-lg"><FileText className="w-4 h-4 text-[#D97757]" /></span>
                  Summary
                </h2>
                <p className="text-[#A99E92] leading-relaxed text-base">{update.summary}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Read more</h3>
                {update.source_link ? (
                  <a href={update.source_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                    Official Announcement <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="btn btn-primary w-full justify-center opacity-50 cursor-not-allowed">
                    No link available
                  </button>
                )}
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Impact level</h3>
                <div className="space-y-3">
                  {['high', 'medium', 'low'].map(level => (
                    <div key={level} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${update.impact_level === level ? 'bg-[#D97757]' : 'bg-[rgba(54,46,40,0.5)]'}`} />
                      <span className={`text-sm ${update.impact_level === level ? 'text-[#F5F0EB] font-medium' : 'text-[#6B6158]'}`}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
