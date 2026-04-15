import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Zap, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { DEPARTMENTS } from '@/lib/constants';

interface DepartmentPageProps {
  params: Promise<{ department: string }>;
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { department } = await params;
  const dept = DEPARTMENTS.find(d => d.slug === department);

  if (!dept) return { title: 'Department Not Found' };

  return {
    title: `Claude Skills for ${dept.name} — Best ${dept.name} Resources`,
    description: `Discover the best Claude skills, workflows, and resources for ${dept.name.toLowerCase()}. Curated and ready to use.`,
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { department } = await params;
  const dept = DEPARTMENTS.find(d => d.slug === department);

  if (!dept) notFound();

  const supabase = await createClient();
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .eq('department', department)
    .order('save_count', { ascending: false });

  const { data: workflows } = await supabase
    .from('workflows')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: false });

  const resources = [...(skills ?? []), ...(workflows ?? [])];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-4 py-2 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-sm font-semibold rounded-full border border-[rgba(217,119,87,0.2)]">
              {dept.name}
            </span>
            <span className="text-[#6B6158] text-sm">{resources.length} resources</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude Skills for {dept.name}
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            {dept.description}. Explore our curated collection of the best Claude resources for {dept.name.toLowerCase()} teams.
          </p>
        </div>
      </section>

      {/* ─── SKILLS GRID ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-7xl mx-auto">
          {resources.length > 0 ? (
            <>
              {/* Skills Section */}
              {(skills ?? []).length > 0 && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-4 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#D97757]" />
                    Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(skills ?? []).map((skill, index) => (
                      <Link
                        key={skill.id}
                        href={`/skills/${skill.slug}`}
                        className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover animate-fadeUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-body font-semibold text-[#F5F0EB] text-base leading-snug flex-1 pr-2">
                            {skill.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{formatNumber(skill.save_count)}</span>
                          </div>
                        </div>

                        <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                          {skill.description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                            skill.tier === 'free'
                              ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
                              : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                          }`}>
                            {skill.tier === 'elite' ? 'Elite' : 'Free'}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                            Skill
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[#6B6158] pt-4 border-t border-[rgba(54,46,40,0.3)]">
                          <span>View skill</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflows Section */}
              {(workflows ?? []).length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#6A9BCC]" />
                    Workflows
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(workflows ?? []).map((workflow: any, index: number) => (
                      <Link
                        key={workflow.id}
                        href={`/workflows/${workflow.slug}`}
                        className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#6A9BCC] hover:-translate-y-[5px] spring-hover animate-fadeUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(106,155,204,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-body font-semibold text-[#F5F0EB] text-base leading-snug flex-1 pr-2">
                            {workflow.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{formatNumber((workflow as any).save_count ?? 0)}</span>
                          </div>
                        </div>

                        <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                          {(workflow as any).description}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                            (workflow as any).tier === 'free'
                              ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
                              : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                          }`}>
                            {(workflow as any).tier === 'elite' ? 'Elite' : 'Free'}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
                            Workflow
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[#6B6158] pt-4 border-t border-[rgba(54,46,40,0.3)]">
                          <span>View workflow</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse All */}
              <div className="mt-12 text-center flex items-center justify-center gap-4">
                <Link href="/skills" className="btn btn-outline text-sm h-11 px-6">
                  Browse all skills
                </Link>
                <Link href="/workflows" className="btn btn-outline text-sm h-11 px-6">
                  Browse all workflows
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#A99E92] text-lg mb-4">
                Resources for {dept.name} coming soon
              </p>
              <Link href="/skills" className="btn btn-primary">
                Browse all skills
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
