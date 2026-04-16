import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { HomeSearch } from '@/components/HomeSearch';

export const metadata: Metadata = {
  title: 'Claude Chief — Best Claude Skills Directory',
  description: 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place.',
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: featuredSkills } = await supabase
    .from('skills')
    .select('*')
    .order('save_count', { ascending: false })
    .limit(6);

  const [skillsCount, workflowsCount, mcpsCount] = await Promise.all([
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('workflows').select('*', { count: 'exact', head: true }),
    supabase.from('mcps').select('*', { count: 'exact', head: true }),
  ]);

  const totalResources =
    (skillsCount.count ?? 0) +
    (workflowsCount.count ?? 0) +
    (mcpsCount.count ?? 0);

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Ambient terracotta glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.12)_0%,transparent_70%)] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
            </span>
            <span>{totalResources} resources available</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] mb-6 animate-fade-up animate-delay-100">
            <span className="text-[var(--color-text-primary)]">Claude is changing everything.</span>
            <br />
            <span className="text-[var(--color-accent)] italic">Are you keeping up?</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
            Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place so you always know what&apos;s possible.
          </p>

          {/* Search Bar + Tabs */}
          <HomeSearch />

          {/* Trust indicators — diamond bullets */}
          <div className="flex items-center justify-center gap-8 text-sm text-[var(--color-text-muted)] animate-fade-up animate-delay-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rotate-45" />
              Free to explore
            </span>
            <span className="w-1 h-1 bg-[var(--color-text-muted)] rounded-full" />
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rotate-45" />
              Updated daily
            </span>
            <span className="w-1 h-1 bg-[var(--color-text-muted)] rounded-full" />
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rotate-45" />
              Human curated
            </span>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="bg-[var(--color-bg-surface)] rounded-t-[32px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Department Grid */}
          <div className="mb-16 animate-fade-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2">
                  Browse by department
                </h2>
                <p className="text-[var(--color-text-muted)] text-base">
                  Find resources tailored to your role
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.slug}
                  href={`/${dept.slug}`}
                  className="group relative p-5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300"
                >
                  <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-[15px] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{dept.count} resources</p>
                  <span className="absolute bottom-4 right-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Skills */}
          {featuredSkills && featuredSkills.length > 0 && (
            <div className="animate-fade-up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2">
                    Featured skills
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-base">
                    The most popular resources in the community
                  </p>
                </div>
                <Link href="/skills" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-1">
                  View all
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredSkills.map((skill, index) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.slug}`}
                    className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300"
                    style={{ animationDelay: `${index * 75}ms` }}
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

                    {/* Ambient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}