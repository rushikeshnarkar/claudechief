import type { Metadata } from 'next';
import { Calendar, ArrowRight, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Claude Updates — Anthropic Announcements & Releases',
  description: 'Stay updated with all Anthropic releases, model updates, API changes, and announcements.',
};

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  model: { bg: 'var(--color-accent-muted)', text: 'var(--color-accent)', border: 'rgba(196,99,58,0.2)' },
  feature: { bg: 'var(--color-blue-muted)', text: 'var(--color-blue)', border: 'rgba(90,138,181,0.2)' },
  api: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80', border: 'rgba(74,222,128,0.2)' },
  announcement: { bg: 'var(--color-amber-muted)', text: 'var(--color-amber)', border: 'rgba(201,139,58,0.2)' },
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
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4 animate-fade-up">
            <div className="w-10 h-10 bg-[var(--color-accent-muted)] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="text-[var(--color-text-muted)] text-sm">Latest from Anthropic</span>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-accent)] mb-4 animate-fade-up animate-delay-100">
            <span className="w-4 h-px bg-[var(--color-accent)]" />
            News
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
            Claude Updates
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 animate-fade-up animate-delay-100" />
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed animate-fade-up animate-delay-200">
            Curated feed of all Anthropic releases, model updates, API changes, and announcements with editorial context.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-4 animate-fade-up animate-delay-300">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* ─── TYPE FILTER TABS ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 bg-[var(--color-bg-surface)]">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 animate-fade-up animate-delay-400">
            {['All', 'Model', 'Feature', 'API', 'Announcement'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all min-h-11 ${
                  type === 'All'
                    ? 'bg-[var(--color-accent)] text-[var(--color-text-primary)] border-[var(--color-accent)]'
                    : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPDATES LIST ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[var(--color-bg-base)]">
        <div className="container max-w-5xl mx-auto">
          {dbUpdates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">No updates found. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {dbUpdates.map((update, index) => {
                const typeStyle = TYPE_COLORS[update.update_type] || TYPE_COLORS.feature;
                const typeLabel = TYPE_LABELS[update.update_type] || update.update_type;

                return (
                  <article
                    key={update.id}
                    className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Top accent bar */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    {/* Decorative Glow */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(196,99,58,0.06),transparent_70%)]" />

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-6 pb-0">
                      <div>
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span
                            className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border"
                            style={{ background: typeStyle.bg, color: typeStyle.text, borderColor: typeStyle.border }}
                          >
                            {typeLabel}
                          </span>
                          {update.impact_level === 'high' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[var(--color-accent-muted)] text-[var(--color-accent)] border-[rgba(196,99,58,0.2)]">
                              <Zap className="w-3 h-3" />
                              High Impact
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] leading-snug">
                          {update.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] flex-shrink-0 pt-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--color-text-secondary)] leading-relaxed px-6 mb-5">
                      {update.summary}
                    </p>

                    {/* Action */}
                    {update.source_link && (
                      <div className="px-6 pb-6">
                        <a
                          href={update.source_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-medium"
                        >
                          Read more on Anthropic
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    )}

                    {/* Bottom ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More */}
          <div className="mt-12 text-center animate-fade-up">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more updates
            </button>
          </div>
        </div>
      </section>
    </>
  );
}