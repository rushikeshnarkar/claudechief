import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Bookmark, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Claude MCPs — Model Context Protocol Integrations',
  description: 'Directory of all Claude MCPs (Model Context Protocol integrations) connecting Claude to external services.',
};

const MCPS = [
  {
    title: 'Filesystem MCP',
    description: 'Read, write, and manage files on your local system directly from Claude. Perfect for code generation and documentation tasks.',
    service: 'Local System',
    tier: 'free',
    saves: '3.2k',
    difficulty: 'Beginner',
    useCase: 'File operations',
    href: '/mcps/filesystem',
  },
  {
    title: 'GitHub MCP',
    description: 'Connect Claude to GitHub for repository management, code review, issue tracking, and pull request automation.',
    service: 'GitHub',
    tier: 'free',
    saves: '2.8k',
    difficulty: 'Intermediate',
    useCase: 'Version control',
    href: '/mcps/github',
  },
  {
    title: 'Slack MCP',
    description: 'Send messages, search history, manage channels, and integrate Claude into your team communication workflow.',
    service: 'Slack',
    tier: 'free',
    saves: '1.9k',
    difficulty: 'Beginner',
    useCase: 'Team communication',
    href: '/mcps/slack',
  },
  {
    title: 'Brave Search MCP',
    description: 'Web search capabilities powered by Brave Search API. Get real-time information and research without leaving Claude.',
    service: 'Brave',
    tier: 'free',
    saves: '1.5k',
    difficulty: 'Beginner',
    useCase: 'Web research',
    href: '/mcps/brave-search',
  },
  {
    title: 'PostgreSQL MCP',
    description: 'Query and manage PostgreSQL databases directly from Claude. Run queries, analyze data, and generate reports.',
    service: 'PostgreSQL',
    tier: 'free',
    saves: '1.2k',
    difficulty: 'Advanced',
    useCase: 'Database operations',
    href: '/mcps/postgresql',
  },
  {
    title: 'Sequential Thinking MCP',
    description: 'Break down complex problems into sequential steps for more thorough analysis and better problem-solving.',
    service: 'Anthropic',
    tier: 'free',
    saves: '4.1k',
    difficulty: 'Beginner',
    useCase: 'Analysis',
    href: '/mcps/sequential-thinking',
  },
];

export default function MCPsPage() {
  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude MCPs
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            Model Context Protocol integrations connecting Claude to external services. Extend Claude&apos;s capabilities with MCPs.
          </p>
        </div>
      </section>

      {/* ─── SEARCH ─── */}
      <section className="bg-[#1A1720] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container max-w-7xl mx-auto">
          <div className="relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
            <input
              type="search"
              placeholder="Search MCPs..."
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </div>
        </div>
      </section>

      {/* ─── MCPS GRID ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MCPS.map((mcp, index) => (
              <Link
                key={mcp.title}
                href={mcp.href}
                className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-body font-semibold text-[#F5F0EB] text-base leading-snug mb-1">
                      {mcp.title}
                    </h3>
                    <span className="text-xs text-[#6B6158]">{mcp.service}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{mcp.saves}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                  {mcp.description}
                </p>

                {/* Meta Tags */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
                    {mcp.useCase}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(74,222,128,0.12)] text-[#4ADE80] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(74,222,128,0.2)]">
                    Free
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-[#6B6158] pt-4 border-t border-[rgba(54,46,40,0.3)]">
                  <span className="flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" />
                    {mcp.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more MCPs
            </button>
          </div>
        </div>
      </section>
    </>
  );
}