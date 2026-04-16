import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Bookmark, Clock, Wrench, ListOrdered, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Claude Workflows — Multi-Step Processes',
  description: 'Discover Claude workflows — multi-step processes using Claude with other tools for automation.',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Beginner',
  medium: 'Intermediate',
  advanced: 'Advanced',
};

export default async function WorkflowsPage() {
  const supabase = await createClient();
  const { data: workflows } = await supabase
    .from('workflows')
    .select('*')
    .order('created_at', { ascending: false });

  const dbWorkflows = workflows ?? [];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(90,138,181,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-blue)] mb-4 animate-fade-up">
            <span className="w-4 h-px bg-[var(--color-blue)]" />
            Directory
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
            Workflows
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-blue)] to-transparent mb-6 animate-fade-up animate-delay-100" />

          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed animate-fade-up animate-delay-200">
            Multi-step processes using Claude, often combined with other tools. Automate your workflows and save time.
          </p>
        </div>
      </section>

      {/* ─── SEARCH ─── */}
      <section className="bg-[var(--color-bg-surface)] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container max-w-5xl mx-auto">
          <div className="relative max-w-xl mb-6 animate-fade-up animate-delay-300">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="search"
              placeholder="Search workflows..."
              className="w-full pl-14 pr-5 py-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_var(--color-accent-glow)] transition-all min-h-12"
            />
          </div>

          <p className="text-sm text-[var(--color-text-muted)] animate-fade-up animate-delay-400">
            Showing <span className="text-[var(--color-text-primary)] font-medium">{dbWorkflows.length}</span> workflows
          </p>
        </div>
      </section>

      {/* ─── WORKFLOWS GRID ─── */}
      <section className="bg-[var(--color-bg-base)] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-5xl mx-auto">
          {dbWorkflows.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-[var(--color-bg-elevated)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <p className="text-[var(--color-text-muted)] text-lg mb-2">No workflows found</p>
              <p className="text-[var(--color-text-muted)] text-sm">Check back soon — we&apos;re adding new workflows daily</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbWorkflows.map((workflow, index) => (
                <Link
                  key={workflow.id}
                  href={`/workflows/${workflow.slug}`}
                  className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-[var(--color-blue)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base group-hover:text-[var(--color-blue)] transition-colors leading-snug flex-1 pr-2">
                        {workflow.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{formatNumber(workflow.save_count ?? 0)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                      {workflow.description}
                    </p>

                    {/* Step count indicator */}
                    {Array.isArray(workflow.steps) && workflow.steps.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-blue)] font-medium mb-3">
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>{workflow.steps.length} step{workflow.steps.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className="badge badge-dept">
                        {workflow.department.charAt(0).toUpperCase() + workflow.department.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border-subtle)]">
                      {workflow.time_estimate && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {workflow.time_estimate}
                        </span>
                      )}
                      {workflow.difficulty && (
                        <span className="flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          {DIFFICULTY_LABELS[workflow.difficulty] ?? workflow.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(90,138,181,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              ))}
            </div>
          )}

          {dbWorkflows.length > 0 && (
            <div className="mt-12 text-center animate-fade-up">
              <button className="btn btn-outline text-base h-12 px-8">
                Load more workflows
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}