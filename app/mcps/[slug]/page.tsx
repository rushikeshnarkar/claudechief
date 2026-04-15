import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark, ExternalLink, User, Settings, Code, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import { MCPActions } from './MCPActions';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Beginner',
  medium: 'Intermediate',
  advanced: 'Advanced',
};

interface MCPPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MCPPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: mcp } = await supabase
    .from('mcps')
    .select('title, description, connected_service')
    .eq('slug', slug)
    .single();

  if (!mcp) return { title: 'MCP Not Found' };

  return {
    title: `${mcp.title} — Claude MCP | Claude Chief`,
    description: mcp.description || `${mcp.title} — connect Claude to ${mcp.connected_service}`,
    alternates: {
      canonical: `${SITE_URL}/mcps/${slug}`,
    },
  };
}

export default async function MCPDetailPage({ params }: MCPPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: mcp } = await supabase
    .from('mcps')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!mcp) notFound();

  const useCases = Array.isArray(mcp.use_cases) ? mcp.use_cases : [];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: mcp.title,
            description: mcp.description || `${mcp.title} — connect Claude to ${mcp.connected_service}`,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Claude',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Person', name: mcp.creator_name },
            keywords: `Claude, MCP, ${mcp.connected_service}, integration`,
          }),
        }}
      />

      {/* ─── HERO ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/mcps" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to MCPs
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
              MCP
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(74,222,128,0.12)] text-[#4ADE80] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(74,222,128,0.2)]">
              Free
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(54,46,40,0.5)] text-[#A99E92] bg-[#131118]">
              {mcp.connected_service}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
            {mcp.title}
          </h1>
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl mb-8">
            {mcp.description || `${mcp.title} — connect Claude to ${mcp.connected_service}`}
          </p>

          <div className="flex items-center gap-6 text-sm flex-wrap">
            {mcp.creator_link ? (
              <a href={mcp.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A99E92] hover:text-[#D97757] transition-colors">
                <User className="w-4 h-4" /><span>by <span className="font-medium">{mcp.creator_name}</span></span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-[#A99E92]">
                <User className="w-4 h-4" /><span>by <span className="font-medium">{mcp.creator_name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#A99E92]"><Bookmark className="w-4 h-4" /><span>{formatNumber(mcp.save_count ?? 0)} saves</span></div>
            <div className="flex items-center gap-2 text-[#A99E92]"><Settings className="w-4 h-4" /><span>{DIFFICULTY_LABELS[mcp.setup_difficulty] ?? mcp.setup_difficulty}</span></div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {useCases.length > 0 && (
                <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#4ADE80]/20 rounded-lg"><Code className="w-4 h-4 text-[#4ADE80]" /></span>
                    What you can do
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {useCases.map((useCase: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)]">
                        <div className="w-5 h-5 bg-[#4ADE80]/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight className="w-3 h-3 text-[#4ADE80]" />
                        </div>
                        <span className="text-sm text-[#A99E92]">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <MCPActions mcp={mcp} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
