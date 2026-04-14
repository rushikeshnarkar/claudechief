import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft, Bookmark } from 'lucide-react';
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
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || '').trim();
  const results: SearchResult[] = [];

  if (query) {
    const supabase = await createClient();
    const searchTerm = `%${query}%`;

    // Search skills
    const { data: skills } = await supabase
      .from('skills')
      .select('title, description, slug, tier, department, save_count')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (skills) {
      results.push(...skills.map(s => ({ ...s, type: 'skill' })));
    }

    // Search workflows
    const { data: workflows } = await supabase
      .from('workflows')
      .select('title, description, slug, tier, department, save_count')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (workflows) {
      results.push(...workflows.map(w => ({ ...w, type: 'workflow' })));
    }

    // Search mcps
    const { data: mcps } = await supabase
      .from('mcps')
      .select('title, description, slug, tier, department, save_count')
      .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .limit(10);

    if (mcps) {
      results.push(...mcps.map(m => ({ ...m, type: 'mcp' })));
    }

    // Search creators
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
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[rgba(217,119,87,0.12)] rounded-xl flex items-center justify-center">
              <SearchIcon className="w-7 h-7 text-[#D97757]" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0EB] tracking-tight">
                {query ? `Results for "${query}"` : 'Search'}
              </h1>
              {query && (
                <p className="text-[#6B6158] text-sm mt-1">
                  Found {results.length} results across skills, workflows, MCPs, and more
                </p>
              )}
            </div>
          </div>

          {/* Search Input */}
          <form method="get" action="/search" className="relative max-w-xl">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search skills, workflows, MCPs, creators…"
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </form>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-10">
        <div className="container max-w-4xl mx-auto">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => {
                  const href = result.type === 'skill' ? `/skills/${result.slug}`
                    : result.type === 'workflow' ? `/workflows/${result.slug}`
                    : result.type === 'mcp' ? `/mcps/${result.slug}`
                    : `/creators/${result.slug}`;

                  return (
                    <Link
                      key={`${result.type}-${result.slug}`}
                      href={href}
                      className="group block p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl hover:border-[#D97757] spring-hover animate-fadeUp"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="inline-flex items-center px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                              {result.type}
                            </span>
                            {result.department && (
                              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] border-[rgba(106,155,204,0.2)]">
                                {result.department}
                              </span>
                            )}
                          </div>
                          <h3 className="font-body font-semibold text-[#F5F0EB] text-base mb-2 group-hover:text-[#D97757] transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-[#A99E92] text-sm leading-relaxed line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        {result.save_count !== undefined && (
                          <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{formatNumber(result.save_count)}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#131118] rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-8 h-8 text-[#6B6158]" />
                </div>
                <p className="text-[#A99E92] text-lg mb-2">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-[#6B6158] text-sm">
                  Try searching for &ldquo;LinkedIn&rdquo;, &ldquo;cold email&rdquo;, or &ldquo;MCP&rdquo;
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#131118] rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-8 h-8 text-[#6B6158]" />
              </div>
              <p className="text-[#A99E92] text-lg mb-2">Enter a search term</p>
              <p className="text-[#6B6158] text-sm">
                Try searching for &ldquo;LinkedIn&rdquo;, &ldquo;cold email&rdquo;, or &ldquo;MCP&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
