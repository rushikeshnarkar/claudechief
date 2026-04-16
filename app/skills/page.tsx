import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Bookmark } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Claude Skills — Best Skills for Claude',
  description: 'Browse the best Claude skills, reusable prompt systems for specific tasks. Curated and ready to use.',
};

const DEPT_FILTER = [
  'All',
  'Marketing',
  'Sales',
  'Design',
  'Content',
  'Founders',
  'Operations',
  'Finance',
  'Research',
];

export default async function SkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('save_count', { ascending: false });

  const dbSkills = skills ?? [];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          {/* Overline */}
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-accent)] mb-4 animate-fade-up">
            <span className="w-4 h-px bg-[var(--color-accent)]" />
            Directory
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
            Skills
          </h1>

          {/* Decorative underline */}
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 animate-fade-up animate-delay-100" />

          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed animate-fade-up animate-delay-200">
            Reusable prompt systems for specific tasks. Browse our curated collection of the best Claude skills.
          </p>
        </div>
      </section>

      {/* ─── SEARCH & FILTERS ─── */}
      <section className="bg-[var(--color-bg-surface)] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-xl mb-6 animate-fade-up animate-delay-300">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="search"
              placeholder="Search skills..."
              className="w-full pl-14 pr-5 py-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] backdrop-blur-sm focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_var(--color-accent-glow)] transition-all min-h-12"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-up animate-delay-400">
            {DEPT_FILTER.map((dept) => (
              <button
                key={dept}
                className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all min-h-11 ${
                  dept === 'All'
                    ? 'bg-[var(--color-accent)] text-[var(--color-text-primary)] border-[var(--color-accent)]'
                    : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-[var(--color-text-muted)] animate-fade-up animate-delay-500">
            Showing <span className="text-[var(--color-text-primary)] font-medium">{dbSkills.length}</span> skills
          </p>
        </div>
      </section>

      {/* ─── SKILLS GRID ─── */}
      <section className="bg-[var(--color-bg-base)] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-5xl mx-auto">
          {dbSkills.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[var(--color-bg-elevated)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-[var(--color-text-muted)] text-lg mb-2">No skills found</p>
              <p className="text-[var(--color-text-muted)] text-sm">Check back soon — we&apos;re adding new skills daily</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbSkills.map((skill, index) => (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.slug}`}
                  className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Brand accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="p-6">
                    {/* Title Row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base group-hover:text-[var(--color-accent)] transition-colors leading-snug flex-1 pr-2">
                        {skill.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{formatNumber(skill.save_count ?? 0)}</span>
                      </div>
                    </div>

                    {/* Prompt Preview */}
                    {skill.prompt_preview && (
                      <div className="mb-4 p-3 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border)]">
                        <pre className="text-xs font-mono text-[var(--color-text-muted)] line-clamp-2 leading-relaxed whitespace-pre-wrap">
                          {skill.prompt_preview}
                        </pre>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge-dept">
                        {skill.department.charAt(0).toUpperCase() + skill.department.slice(1)}
                      </span>
                      <span className={`badge ${skill.tier === 'free' ? 'badge-free' : 'badge-elite'}`}>
                        {skill.tier === 'elite' ? 'Elite' : 'Free'}
                      </span>
                    </div>

                    {/* Source line */}
                    <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)]">
                      <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                        via {skill.source_type}
                      </span>
                    </div>
                  </div>

                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              ))}
            </div>
          )}

          {/* Load More */}
          {dbSkills.length > 0 && (
            <div className="mt-12 text-center animate-fade-up">
              <button className="btn btn-outline text-base h-12 px-8">
                Load more skills
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Needed for Bookmark icon