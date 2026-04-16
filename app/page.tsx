import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, Zap, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { formatNumber } from '@/lib/utils';
import { HomeSearch } from '@/components/HomeSearch';
import { ScrollReveal } from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Claude Chief — Discover the Best Claude Skills, Workflows & MCPs',
  description: 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place.',
};

const DEPT_ICONS: Record<string, string> = {
  marketing: 'M',
  sales: 'S',
  design: 'D',
  content: 'C',
  founders: 'F',
  operations: 'O',
  finance: '$',
  research: 'R',
};

const DEPT_GRADIENTS: Record<string, string> = {
  marketing: 'from-[rgba(196,99,58,0.15)] to-transparent',
  sales: 'from-[rgba(90,138,181,0.15)] to-transparent',
  design: 'from-[rgba(122,154,94,0.15)] to-transparent',
  content: 'from-[rgba(201,139,58,0.15)] to-transparent',
  founders: 'from-[rgba(196,99,58,0.12)] to-transparent',
  operations: 'from-[rgba(90,138,181,0.12)] to-transparent',
  finance: 'from-[rgba(122,154,94,0.12)] to-transparent',
  research: 'from-[rgba(201,139,58,0.12)] to-transparent',
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
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Layered ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Core terracotta orb — center */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
            <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(196,99,58,0.14)_0%,rgba(196,99,58,0.06)_40%,transparent_70%)] animate-glow-pulse" />
          </div>
          {/* Secondary sage orb — left */}
          <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] opacity-40">
            <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(122,154,94,0.12)_0%,transparent_70%)] animate-glow-pulse" style={{ animationDelay: '1s' }} />
          </div>
          {/* Tertiary blue orb — right */}
          <div className="absolute top-1/3 right-[10%] w-[400px] h-[400px] opacity-40">
            <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(90,138,181,0.12)_0%,transparent_70%)] animate-glow-pulse" style={{ animationDelay: '2s' }} />
          </div>
          {/* Bottom amber wash */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]">
            <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(201,139,58,0.06)_0%,transparent_70%)]" />
          </div>
        </div>

        {/* Decorative floating rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]" aria-hidden>
          <div className="w-[600px] h-[600px] border border-[var(--color-accent)] rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
          <div className="absolute inset-8 w-[480px] h-[480px] border border-[var(--color-accent)] rounded-full animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
          <div className="absolute inset-16 w-[360px] h-[360px] border border-[var(--color-accent)] rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden>
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(196,99,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(196,99,58,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }} />
        </div>

        {/* Hero content */}
        <div className="relative max-w-4xl mx-auto text-center z-10">
          {/* Animated status pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[rgba(20,18,16,0.8)] backdrop-blur-md border border-[var(--color-border)] rounded-full text-sm text-[var(--color-text-secondary)] mb-10 animate-fade-up shadow-[0_0_40px_rgba(196,99,58,0.08)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]" />
            </span>
            <span className="font-medium">{totalResources.toLocaleString()} resources</span>
            <span className="w-px h-3.5 bg-[var(--color-border)]" />
            <span className="text-[var(--color-text-muted)]">Live curated directory</span>
          </div>

          {/* Giant headline */}
          <h1 className="font-display text-[clamp(2.8rem,9vw,5.5rem)] font-bold leading-[1.0] tracking-[-0.035em] mb-8 animate-fade-up animate-delay-100">
            <span className="text-[var(--color-text-primary)]">Claude is</span>
            <br />
            <span className="text-[var(--color-text-primary)]">redefining what</span>
            <br />
            <span className="text-gradient-accent italic">software can do.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-up animate-delay-200">
            Stop hunting across YouTube, GitHub, and Twitter. Every skill, workflow, MCP, update, and creator — curated and ready.
          </p>

          {/* Search */}
          <div className="animate-fade-up animate-delay-300">
            <HomeSearch />
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)] mt-10 animate-fade-up animate-delay-500 flex-wrap">
            {[
              { icon: '◆', label: 'Free to explore', accent: true },
              { icon: '◆', label: 'Updated daily', accent: true },
              { icon: '◆', label: 'Human curated', accent: true },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rotate-45 flex-shrink-0"
                  style={{ background: 'var(--color-accent)', opacity: 0.7 }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] animate-fade-up animate-delay-800">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-8 z-20">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-3 animate-fade-up animate-delay-600">
            {[
              { label: 'Skills', value: skillsCount.count ?? 0, color: 'var(--color-accent)' },
              { label: 'Workflows', value: workflowsCount.count ?? 0, color: 'var(--color-blue)' },
              { label: 'MCPs', value: mcpsCount.count ?? 0, color: 'var(--color-sage)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative p-5 bg-[rgba(20,18,16,0.9)] backdrop-blur-lg border border-[var(--color-border)] rounded-2xl text-center overflow-hidden group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(ellipse at top, ${stat.color}08, transparent 70%)` }}
                />
                <div
                  className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEPARTMENT GRID ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="container max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-accent)] mb-4">
                <span className="w-5 h-px bg-[var(--color-accent)]" />
                Explore
                <span className="w-5 h-px bg-[var(--color-accent)]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] mb-3">
                Browse by department
              </h2>
              <p className="text-[var(--color-text-muted)] text-base max-w-md mx-auto">
                Resources organized for your role and workflow
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DEPARTMENTS.map((dept, i) => (
              <ScrollReveal key={dept.slug} delay={i * 60}>
                <Link
                  href={`/${dept.slug}`}
                  className="group relative block p-5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[0_0_30px_rgba(196,99,58,0.06)] hover:-translate-y-0.5"
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${DEPT_GRADIENTS[dept.slug]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Icon letter */}
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-base)] border border-[var(--color-border)] flex items-center justify-center mb-4 text-sm font-bold font-display text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    {DEPT_ICONS[dept.slug]}
                  </div>

                  <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-[15px] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{dept.count} resources</p>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED SKILLS ─── */}
      {featuredSkills && featuredSkills.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="container max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-sage)] mb-4">
                    <span className="w-5 h-px bg-[var(--color-sage)]" />
                    Featured
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] mb-2">
                    Top skills
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-base">
                    Most saved by the community
                  </p>
                </div>
                <Link
                  href="/skills"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredSkills.map((skill, index) => (
                <ScrollReveal key={skill.id} delay={index * 80}>
                  <Link
                    href={`/skills/${skill.slug}`}
                    className="group relative block bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[0_0_40px_rgba(196,99,58,0.08)]"
                  >
                    {/* Top accent bar */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    <div className="p-6">
                      {/* Title + saves */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base group-hover:text-[var(--color-accent)] transition-colors leading-snug flex-1 pr-2">
                          {skill.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{formatNumber(skill.save_count ?? 0)}</span>
                        </div>
                      </div>

                      {/* Prompt preview */}
                      {skill.prompt_preview && (
                        <div className="mb-4 p-3 bg-[var(--color-bg-base)] rounded-xl border border-[rgba(196,99,58,0.08)] overflow-hidden">
                          <pre className="text-xs font-mono text-[var(--color-text-muted)] line-clamp-2 leading-relaxed whitespace-pre-wrap">
                            {skill.prompt_preview}
                          </pre>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <span className="badge badge-dept">
                          {skill.department.charAt(0).toUpperCase() + skill.department.slice(1)}
                        </span>
                        <span className={`badge ${skill.tier === 'free' ? 'badge-free' : 'badge-elite'}`}>
                          {skill.tier === 'elite' ? 'Elite' : 'Free'}
                        </span>
                      </div>

                      {/* Source */}
                      <div className="pt-3 border-t border-[rgba(196,99,58,0.06)]">
                        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                          via {skill.source_type}
                        </span>
                      </div>
                    </div>

                    {/* Ambient hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {/* Mobile view all */}
            <div className="mt-8 text-center sm:hidden">
              <Link href="/skills" className="btn btn-outline text-sm">
                View all skills
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BAND ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative p-10 sm:p-14 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-3xl overflow-hidden text-center">
              {/* Corner glows */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse,rgba(196,99,58,0.1)_0%,transparent_70%)]" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse,rgba(122,154,94,0.08)_0%,transparent_70%)]" />

              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[rgba(196,99,58,0.04)] rounded-full pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-accent-muted)] border border-[rgba(196,99,58,0.2)] mb-6">
                  <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] mb-3">
                  Know a skill others need?
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base max-w-md mx-auto mb-8">
                  Share your Claude expertise with the community. Every great skill started with someone like you.
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(196,99,58,0.2)]"
                >
                  <Zap className="w-5 h-5" />
                  Submit a skill
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
