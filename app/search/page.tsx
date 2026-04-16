import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft, Bookmark, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search Resources — Claude Chief',
  description: 'Search Claude Chief — Find skills, workflows, MCPs, creators, and updates.',
  robots: { index: false, follow: true },
};

type SearchResult = {
  type: string;
  title: string;
  description: string;
  slug: string;
  tier: string;
  department?: string;
  save_count?: number;
  source_type?: string;
};

const TYPE_BADGE: Record<string, string> = {
  skill: 'Skill',
  workflow: 'Workflow',
  mcp: 'MCP',
  creator: 'Creator',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || '').trim();
  const results: SearchResult[] = [];

  if (query) {
    const supabase = await createClient();
    const searchTerm = `%${query}%`;

    const { data: skills } = await supabase
      .from('skills')
      .select('title, description, slug, tier, department, save_count, source_type')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (skills) {
      results.push(...skills.map(s => ({ ...s, type: 'skill' })));
    }

    const { data: workflows } = await supabase
      .from('workflows')
      .select('title, description, slug, tier, department, save_count, source_type')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (workflows) {
      results.push(...workflows.map(w => ({ ...w, type: 'workflow' })));
    }

    const { data: mcps } = await supabase
      .from('mcps')
      .select('title, description, slug, tier, department, save_count, source_type')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (mcps) {
      results.push(...mcps.map(m => ({ ...m, type: 'mcp' })));
    }

    const { data: creators } = await supabase
      .from('creators')
      .select('name, focus_area, slug, follower_count')
      .or(`name.ilike.${searchTerm},focus_area.ilike.${searchTerm}`)
      .limit(10);

    if (creators) {
      results.push(...creators.map(c => ({
        type: 'creator',
        title: c.name,
        description: c.focus_area,
        slug: c.slug,
        tier: 'free',
        save_count: c.follower_count,
      })));
    }
  }

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-3xl mx-auto relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 animate-fade-up"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {query && (
            <>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-accent)] mb-4 animate-fade-up animate-delay-100">
                <span className="w-4 h-px bg-[var(--color-accent)]" />
                Search
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
                Results for &ldquo;{query}&rdquo;
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 animate-fade-up animate-delay-100" />
              <p className="text-sm text-[var(--color-text-muted)] animate-fade-up animate-delay-200">
                {results.length} result{results.length !== 1 ? 's' : ''} across skills, workflows, MCPs, and creators
              </p>
            </>
          )}
        </div>
      </section>

      {/* ─── SEARCH INPUT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 bg-[var(--color-bg-surface)]">
        <div className="container max-w-3xl mx-auto">
          <form method="get" action="/search" className="relative max-w-xl animate-fade-up animate-delay-300">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search skills, workflows, MCPs, creators…"
              className="w-full pl-14 pr-5 py-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_var(--color-accent-glow)] transition-all min-h-12"
              autoFocus={!query}
            />
          </form>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[var(--color-bg-base)]">
        <div className="container max-w-5xl mx-auto">
          {query ? (
            results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => {
                  const href = result.type === 'skill' ? `/skills/${result.slug}`
                    : result.type === 'workflow' ? `/workflows/${result.slug}`
                    : result.type === 'mcp' ? `/mcps/${result.slug}`
                    : `/creators/${result.slug}`;

                  return (
                    <Link
                      key={`${result.type}-${result.slug}`}
                      href={href}
                      className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Top accent bar */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex-1">
                            {/* Type + department badges */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[var(--color-accent-muted)] text-[var(--color-accent)] border-[rgba(196,99,58,0.2)]">
                                {TYPE_BADGE[result.type] || result.type}
                              </span>
                              {result.department && (
                                <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] border-[var(--color-border)]">
                                  {result.department}
                                </span>
                              )}
                              {result.tier && (
                                <span className={`inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                                  result.tier === 'elite'
                                    ? 'bg-[var(--color-amber-muted)] text-[var(--color-amber)] border-[rgba(201,139,58,0.2)]'
                                    : 'bg-[var(--color-sage-muted)] text-[var(--color-sage)] border-[rgba(122,154,94,0.2)]'
                                }`}>
                                  {result.tier === 'elite' ? 'Elite' : 'Free'}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                              {result.title}
                            </h3>
                          </div>
                          {result.save_count !== undefined && result.save_count > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{formatNumber(result.save_count)}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mb-4">
                          {result.description}
                        </p>

                        <div className="flex items-center justify-between">
                          {result.source_type && (
                            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                              via {result.source_type}
                            </span>
                          )}
                          <span className="text-xs text-[var(--color-accent)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Open
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Ambient hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[var(--color-bg-elevated)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-8 h-8 text-[var(--color-text-muted)]" />
                </div>
                <p className="text-[var(--color-text-secondary)] text-lg mb-2">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-[var(--color-text-muted)] text-sm">
                  Try searching for &ldquo;LinkedIn&rdquo;, &ldquo;code review&rdquo;, or &ldquo;MCP&rdquo;
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[var(--color-bg-elevated)] rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-lg mb-2">Search for skills, workflows, MCPs, and creators</p>
              <p className="text-[var(--color-text-muted)] text-sm">
                Try &ldquo;LinkedIn&rdquo;, &ldquo;cold email&rdquo;, or &ldquo;GitHub&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}