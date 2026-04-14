import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Wrench, Bookmark, ExternalLink, User, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Beginner',
  medium: 'Intermediate',
  advanced: 'Advanced',
};

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: workflow } = await supabase
    .from('workflows')
    .select('title, description, department')
    .eq('slug', slug)
    .single();

  if (!workflow) return { title: 'Workflow Not Found' };

  return {
    title: `${workflow.title} — Claude Workflow | Claude Chief`,
    description: workflow.description,
    alternates: {
      canonical: `${SITE_URL}/workflows/${slug}`,
    },
  };
}

export default async function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: workflow } = await supabase
    .from('workflows')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!workflow) notFound();

  const steps = Array.isArray(workflow.steps) ? workflow.steps : [];
  const tools = Array.isArray(workflow.tools) ? workflow.tools : [];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/workflows" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to workflows
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
              {workflow.department.charAt(0).toUpperCase() + workflow.department.slice(1)}
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
              Workflow
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
            {workflow.title}
          </h1>
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl mb-8">
            {workflow.description}
          </p>

          <div className="flex items-center gap-6 text-sm flex-wrap">
            {workflow.creator_link ? (
              <a href={workflow.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A99E92] hover:text-[#D97757] transition-colors">
                <User className="w-4 h-4" /><span>by <span className="font-medium">{workflow.creator_name}</span></span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-[#A99E92]">
                <User className="w-4 h-4" /><span>by <span className="font-medium">{workflow.creator_name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[#A99E92]"><Bookmark className="w-4 h-4" /><span>{formatNumber(workflow.save_count ?? 0)} saves</span></div>
            {workflow.time_estimate && (
              <div className="flex items-center gap-2 text-[#A99E92]"><Clock className="w-4 h-4" /><span>{workflow.time_estimate}</span></div>
            )}
            {workflow.difficulty && (
              <div className="flex items-center gap-2 text-[#A99E92]"><Wrench className="w-4 h-4" /><span>{DIFFICULTY_LABELS[workflow.difficulty] ?? workflow.difficulty}</span></div>
            )}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps */}
            <div className="lg:col-span-2 space-y-8">
              {steps.length > 0 && (
                <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(106,155,204,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#6A9BCC]/20 rounded-lg"><ArrowRight className="w-4 h-4 text-[#6A9BCC]" /></span>
                    How it works
                  </h2>
                  <div className="space-y-6">
                    {steps.map((step: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-full flex items-center justify-center text-[#6B6158] text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-[#A99E92] text-sm leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tools.length > 0 && (
                <div className="p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">Tools used</h2>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool: string) => (
                      <span key={tool} className="px-4 py-2 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Get this workflow</h3>
                {workflow.source_url ? (
                  <a href={workflow.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                    View Source <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="btn btn-primary w-full justify-center opacity-50 cursor-not-allowed">
                    No source available
                  </button>
                )}
                <button className="btn btn-ghost w-full justify-center mt-3">
                  <Bookmark className="w-4 h-4" /> Save for later
                </button>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Creator</h3>
                {workflow.creator_link ? (
                  <a href={workflow.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors">
                    <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#6B6158]" />
                    </div>
                    <span className="font-medium">{workflow.creator_name}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 text-[#A99E92]">
                    <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#6B6158]" />
                    </div>
                    <span className="font-medium">{workflow.creator_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
