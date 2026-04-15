import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, Zap, Shield, ArrowRight } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { HomeSearch } from '@/components/HomeSearch';
import { HomeTabs } from '@/components/HomeSearch';

export const metadata: Metadata = {
  title: 'Claude Chief — Best Claude Skills Directory',
  description: 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place.',
};

export default async function HomePage() {
  const supabase = await createClient();

  const { data: featuredSkills } = await supabase
    .from('skills')
    .select('*')
    .order('save_count', { ascending: false })
    .limit(6);

  const [skillsCount, workflowsCount, mcpsCount] = await Promise.all([
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('workflows').select('*', { count: 'exact', head: true }),
    supabase.from('mcps').select('*', { count: 'exact', head: true }),
  ]);

  const totalResources =
    (skillsCount.count ?? 0) +
    (workflowsCount.count ?? 0) +
    (mcpsCount.count ?? 0);

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(217,119,87,0.08)_0%,transparent_70%)] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(106,155,204,0.06)_0%,transparent_70%)] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-full text-sm font-medium text-[#A99E92] mb-8 animate-fadeUp">
            <span className="w-2 h-2 bg-[#D97757] rounded-full animate-pulse" />
            <span>{totalResources} resources available</span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-6 animate-fadeUp animate-delay-1">
            <span className="text-[#F5F0EB]">Claude is changing everything.</span>
            <br />
            <span className="text-[#D97757] italic">Are you keeping up?</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#A99E92] leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeUp animate-delay-2">
            Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place so you always know what&apos;s possible.
          </p>

          {/* Search Bar — client component */}
          <HomeSearch />

          <div className="flex items-center justify-center gap-8 text-sm text-[#6B6158] animate-fadeUp animate-delay-4">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D97757]" />
              Free to explore
            </span>
            <span className="w-1 h-1 bg-[#6B6158] rounded-full" />
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D97757]" />
              Curated by humans
            </span>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="bg-[#1A1720] rounded-t-[32px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <div className="container max-w-7xl mx-auto">
          {/* Tabs — client component */}
          <HomeTabs />

          {/* Section Header */}
          <div className="mb-8 animate-fadeUp">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0EB] tracking-tight mb-2">
              Browse by department
            </h2>
            <p className="text-[#6B6158] text-base">
              Find resources tailored to your role
            </p>
          </div>

          {/* Department Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16 animate-fadeUp">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.slug}
                href={`/${dept.slug}`}
                className="group relative p-5 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl backdrop-blur-xl hover:border-[#D97757] hover:-translate-y-1 spring-hover"
              >
                <div className="font-body font-semibold text-[#F5F0EB] text-[15px] mb-1">
                  {dept.name}
                </div>
                <div className="text-[#6B6158] text-sm">{dept.count} skills</div>
                <span className="absolute top-5 right-5 text-[#6B6158] group-hover:text-[#D97757] group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Section Header */}
          <div className="mb-8 animate-fadeUp">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0EB] tracking-tight mb-2">
              Featured skills
            </h2>
            <p className="text-[#6B6158] text-base">
              The most popular resources in the community
            </p>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeUp">
            {(featuredSkills ?? []).map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.slug}`}
                className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover"
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
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                    {skill.department.charAt(0).toUpperCase() + skill.department.slice(1)}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                    skill.tier === 'free'
                      ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
                      : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                  }`}>
                    {skill.tier === 'elite' ? 'Elite' : 'Free'}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center animate-fadeUp">
            <Link href="/skills" className="btn btn-ghost text-base h-12 px-8">
              View all skills
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
