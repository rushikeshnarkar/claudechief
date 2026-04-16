import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Wrench, Bookmark, User, ArrowRight, Code } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import { WorkflowActions } from './WorkflowActions';

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
  const deptLabel = workflow.department.charAt(0).toUpperCase() + workflow.department.slice(1);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: workflow.title,
            description: workflow.description,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Claude',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Person', name: workflow.creator_name },
            keywords: `Claude, workflow, ${workflow.department}, automation`,
          }),
        }}
      />

      {/* ─── HERO ─── */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(90,138,181,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          <Link href="/workflows" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to workflows
          </Link>

          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="badge badge-dept">{deptLabel}</span>
            <span className="badge" style={{ background: 'var(--color-blue-muted)', color: 'var(--color-blue)', border: '1px solid rgba(90,138,181,0.25)' }}>
              Workflow
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.1] mb-5">
            {workflow.title}
          </h1>

          <div className="w-32 h-1 bg-gradient-to-r from-[var(--color-blue)] to-transparent mb-6" />

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
            {workflow.description}
          </p>

          <div className="flex items-center gap-6 text-sm flex-wrap">
            {workflow.creator_name && (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <User className="w-4 h-4" />
                <span>by <span className="font-medium">{workflow.creator_name}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <Bookmark className="w-4 h-4 text-[var(--color-blue)]" />
              <span>{formatNumber(workflow.save_count ?? 0)} saves</span>
            </div>
            {workflow.time_estimate && (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]"><Clock className="w-4 h-4" /><span>{workflow.time_estimate}</span></div>
            )}
            {workflow.difficulty && (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]"><Wrench className="w-4 h-4" /><span>{DIFFICULTY_LABELS[workflow.difficulty] ?? workflow.difficulty}</span></div>
            )}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[var(--color-bg-base)]">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps */}
            <div className="lg:col-span-2 space-y-8">
              {steps.length > 0 && (
                <div className="relative p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,rgba(90,138,181,0.08),transparent_70%)]" />
                  <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-[var(--color-blue-muted)] rounded-xl">
                      <ArrowRight className="w-5 h-5 text-[var(--color-blue)]" />
                    </span>
                    How it works
                  </h2>
                  <div className="space-y-6">
                    {steps.map((step: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text-muted)] text-sm font-bold">
                          {i + 1}
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tools.length > 0 && (
                <div className="p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
                  <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center bg-[var(--color-accent-muted)] rounded-xl">
                      <Code className="w-5 h-5 text-[var(--color-accent)]" />
                    </span>
                    Tools used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool: string) => (
                      <span key={tool} className="px-4 py-2 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-secondary)]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <WorkflowActions workflow={workflow} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}