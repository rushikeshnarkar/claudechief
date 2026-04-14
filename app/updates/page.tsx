import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, Zap, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Claude Updates — Anthropic Announcements & Releases',
  description: 'Stay updated with all Anthropic releases, model updates, API changes, and announcements.',
};

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  model: { bg: 'rgba(217,119,87,0.12)', text: '#D97757', border: 'rgba(217,119,87,0.2)' },
  feature: { bg: 'rgba(106,155,204,0.12)', text: '#6A9BCC', border: 'rgba(106,155,204,0.2)' },
  api: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80', border: 'rgba(74,222,128,0.2)' },
  announcement: { bg: 'rgba(201,134,42,0.12)', text: '#D97757', border: 'rgba(201,134,42,0.2)' },
};

const TYPE_LABELS: Record<string, string> = {
  model: 'Model',
  feature: 'Feature',
  api: 'API',
  announcement: 'Announcement',
};

export default async function UpdatesPage() {
  const supabase = await createClient();
  const { data: updates } = await supabase
    .from('updates')
    .select('*')
    .order('date', { ascending: false });

  const dbUpdates = updates ?? [];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D97757]/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#D97757]" />
            </div>
            <span className="text-[#6B6158] text-sm">Latest from Anthropic</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude Updates
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            Curated feed of all Anthropic releases, model updates, API changes, and announcements with editorial context.
          </p>
        </div>
      </section>

      {/* ─── UPDATES LIST ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-4xl mx-auto">
          {dbUpdates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B6158] text-lg">No updates found. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {dbUpdates.map((update, index) => {
                const typeStyle = TYPE_COLORS[update.update_type] || TYPE_COLORS.feature;
                const typeLabel = TYPE_LABELS[update.update_type] || update.update_type;

                return (
                  <article
                    key={update.id}
                    className="group relative p-8 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] spring-hover animate-fadeUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Decorative Glow */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span
                            className="inline-flex items-center px-3 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full border"
                            style={{ background: typeStyle.bg, color: typeStyle.text, borderColor: typeStyle.border }}
                          >
                            {typeLabel}
                          </span>
                          {update.impact_level === 'high' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                              <Zap className="w-3 h-3" />
                              High Impact
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#F5F0EB] leading-snug">
                          {update.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#A99E92] leading-relaxed mb-5">
                      {update.summary}
                    </p>

                    {/* Summary Card */}
                    {update.summary && (
                      <div className="p-5 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)] mb-5">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-[#D97757]" />
                          <span className="text-sm font-semibold text-[#F5F0EB]">Summary</span>
                        </div>
                        <p className="text-sm text-[#A99E92] leading-relaxed">
                          {update.summary}
                        </p>
                      </div>
                    )}

                    {/* Action */}
                    {update.source_link && (
                      <a
                        href={update.source_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#D97757] hover:text-[#E5886A] transition-colors font-medium"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more updates
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
