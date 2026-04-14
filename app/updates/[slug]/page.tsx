import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Zap, Rocket, Code, FileText } from 'lucide-react';

const UPDATES: Record<string, {
  title: string; description: string; date: string; type: string;
  impact: string; summary: string; source_url: string; tags?: string[];
}> = {
  'claude-3-7-sonnet': {
    title: 'Claude 3.7 Sonnet Released',
    description: 'Anthropic releases Claude 3.7 Sonnet with extended thinking capabilities and improved coding performance.',
    date: '2026-04-10',
    type: 'model',
    impact: 'high',
    summary: 'Claude 3.7 Sonnet introduces extended thinking with up to 128K token context for complex reasoning tasks. Coding performance improved by 15%. The new model can think through problems step-by-step before responding, leading to more accurate answers on complex tasks.',
    source_url: 'https://anthropic.com/news/claude-3-7-sonnet',
    tags: ['Extended Thinking', '128K Context', 'Coding', 'Reasoning'],
  },
  'mcp-sdk-v2': {
    title: 'MCP SDK v2.0 Launch',
    description: 'Model Context Protocol SDK v2.0 brings simplified setup, better error handling, and new transport options.',
    date: '2026-03-28',
    type: 'feature',
    impact: 'medium',
    summary: 'The new SDK includes TypeScript support, WebSocket transport, and improved debugging tools for MCP server developers. Setup time reduced from hours to minutes.',
    source_url: 'https://anthropic.com/docs/mcp/sdk-v2',
    tags: ['TypeScript', 'WebSocket', 'MCP', 'SDK'],
  },
  'claude-for-business': {
    title: 'Claude for Business Announcement',
    description: 'Anthropic announces Claude for Business with admin controls, SSO, and dedicated support for enterprise teams.',
    date: '2026-02-20',
    type: 'product',
    impact: 'high',
    summary: 'Claude for Business includes team management, analytics dashboard, custom model fine-tuning, and priority support. SSO with SAML 2.0, audit logs, and data residency options.',
    source_url: 'https://anthropic.com/claude-for-business',
    tags: ['Enterprise', 'SSO', 'Admin', 'Analytics'],
  },
};

const TYPE_CONFIG: Record<string, { icon: typeof Rocket; color: string; bg: string }> = {
  model: { icon: Rocket, color: '#D97757', bg: 'rgba(217,119,87,0.12)' },
  feature: { icon: Zap, color: '#6A9BCC', bg: 'rgba(106,155,204,0.12)' },
  api: { icon: Code, color: '#4ADE80', bg: 'rgba(74,222,128,0.12)' },
  product: { icon: FileText, color: '#C9862A', bg: 'rgba(201,134,42,0.12)' },
  'open-source': { icon: Code, color: '#788C5D', bg: 'rgba(120,140,93,0.12)' },
};

interface UpdatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = UPDATES[slug];
  if (!update) return { title: 'Update Not Found' };
  return {
    title: `${update.title} — Claude Update | Claude Chief`,
    description: update.summary,
  };
}

export default async function UpdateDetailPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const update = UPDATES[slug];

  if (!update) notFound();

  const config = TYPE_CONFIG[update.type] || TYPE_CONFIG.feature;
  const Icon = config.icon;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/updates" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border" style={{ background: config.bg, color: config.color, borderColor: `${config.color}33` }}>
              <Icon className="w-3 h-3" /> {update.type}
            </span>
            {update.impact === 'high' && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
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
            {update.description}
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

              {/* Tags */}
              {update.tags && (
                <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <h3 className="text-[10px] uppercase tracking-wider text-[#6B6158] mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {update.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Read more</h3>
                <a href={update.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                  Official Announcement <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Impact level</h3>
                <div className="space-y-3">
                  {['Critical', 'High', 'Medium', 'Low'].map(level => (
                    <div key={level} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${update.impact === level.toLowerCase() ? 'bg-[#D97757]' : 'bg-[rgba(54,46,40,0.5)]'}`} />
                      <span className={`text-sm ${update.impact === level.toLowerCase() ? 'text-[#F5F0EB] font-medium' : 'text-[#6B6158]'}`}>
                        {level}
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
