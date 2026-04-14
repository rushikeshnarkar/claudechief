import type { Metadata } from 'next';
import Link from 'next/link';
import { Search as SearchIcon, ArrowLeft, Bookmark } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search Resources — Claude Chief',
  description: 'Search Claude Chief — Find skills, workflows, MCPs, creators, and updates.',
  robots: { index: false, follow: true },
};

// Mock search results
const MOCK_RESULTS = [
  {
    type: 'skill',
    title: 'LinkedIn Content System',
    description: 'A comprehensive prompt system for creating engaging LinkedIn content with Claude.',
    department: 'Marketing',
    tier: 'free',
    saves: '1.2k',
    href: '/skills/linkedin-content-system',
  },
  {
    type: 'skill',
    title: 'Cold Email Writer Pro',
    description: 'Generate personalized cold emails at scale with Claude.',
    department: 'Sales',
    tier: 'free',
    saves: '892',
    href: '/skills/cold-email-writer',
  },
  {
    type: 'workflow',
    title: 'Automated Content Pipeline',
    description: 'A complete workflow for generating, editing, and publishing content automatically.',
    department: 'Content',
    tier: 'workflow',
    saves: '1.5k',
    href: '/workflows/automated-content',
  },
  {
    type: 'mcp',
    title: 'Sequential Thinking MCP',
    description: 'Break down complex problems into sequential steps for better analysis.',
    department: 'Research',
    tier: 'free',
    saves: '4.1k',
    href: '/mcps/sequential-thinking',
  },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? MOCK_RESULTS : [];

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 lg:px-8 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#D97757] rounded-[10px] overflow-hidden">
                <div className="absolute top-[5px] right-[5px] w-3.5 h-3.5 bg-[#F5F0EB] rounded-full" />
                <div className="absolute bottom-[5px] left-[6px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-[3px] rotate-12" />
              </div>
            </div>
            <span className="font-display text-xl font-bold text-[#F5F0EB] tracking-tight">
              Claude Chief
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/skills" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Skills
            </Link>
            <Link href="/workflows" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Workflows
            </Link>
            <Link href="/mcps" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              MCPs
            </Link>
            <Link href="/blog" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="btn btn-primary text-sm h-11 px-5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

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
          <div className="relative max-w-xl">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
            <input
              type="search"
              placeholder="Search skills, workflows, MCPs, creators…"
              defaultValue={query}
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-10">
        <div className="container max-w-4xl mx-auto">
          {query ? (
            results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <Link
                    key={result.title}
                    href={result.href}
                    className="group block p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl hover:border-[#D97757] spring-hover animate-fadeUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="inline-flex items-center px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                            {result.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]">
                            {result.tier === 'workflow' ? 'Workflow' : result.tier}
                          </span>
                        </div>
                        <h3 className="font-body font-semibold text-[#F5F0EB] text-base mb-2 group-hover:text-[#D97757] transition-colors">
                          {result.title}
                        </h3>
                        <p className="text-[#A99E92] text-sm leading-relaxed line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{result.saves}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#131118] rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-8 h-8 text-[#6B6158]" />
                </div>
                <p className="text-[#A99E92] text-lg mb-2">No results found for "{query}"</p>
                <p className="text-[#6B6158] text-sm">
                  Try searching for "LinkedIn", "cold email", or "MCP"
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
                Try searching for "LinkedIn", "cold email", or "MCP"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1A1720] border-t border-[rgba(54,46,40,0.3)] px-6 sm:px-8 py-12">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D97757] rounded-lg relative overflow-hidden">
              <div className="absolute top-[4px] right-[4px] w-2 h-2 bg-[#F5F0EB] rounded-full" />
              <div className="absolute bottom-[4px] left-[4px] w-1.5 h-1.5 bg-[#F5F0EB] rounded-[2px] rotate-12" />
            </div>
            <span className="text-[#6B6158] text-sm">
              Claude Chief · Not affiliated with Anthropic
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#6B6158]">
            <Link href="/skills" className="hover:text-[#A99E92] transition-colors">Skills</Link>
            <Link href="/blog" className="hover:text-[#A99E92] transition-colors">Blog</Link>
            <Link href="/sign-in" className="hover:text-[#A99E92] transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </>
  );
}