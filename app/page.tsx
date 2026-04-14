import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight, Bookmark, Zap, Shield } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Claude Chief — Best Claude Skills Directory',
  description: 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place.',
};

const FEATURED_SKILLS = [
  {
    title: 'LinkedIn Content System',
    description: 'A comprehensive prompt system for creating engaging LinkedIn content with Claude. Generate viral posts in minutes.',
    department: 'Marketing',
    tier: 'free' as const,
    saves: '1.2k',
    href: '/skills/linkedin-content-system',
  },
  {
    title: 'Cold Email Writer Pro',
    description: 'Generate personalized cold emails at scale. Perfect for sales teams looking to automate outreach.',
    department: 'Sales',
    tier: 'free' as const,
    saves: '892',
    href: '/skills/cold-email-writer',
  },
  {
    title: 'UI Design Critic',
    description: 'Get expert design feedback on your UI mockups. Upload a screenshot and get detailed critique.',
    department: 'Design',
    tier: 'free' as const,
    saves: '654',
    href: '/skills/ui-design-critic',
  },
  {
    title: 'Content Repurposing Engine',
    description: 'Transform one piece of content into 20+ variations for different platforms automatically.',
    department: 'Content',
    tier: 'elite' as const,
    saves: '2.3k',
    href: '/skills/content-repurposing',
  },
  {
    title: 'Pitch Deck Generator',
    description: 'Create compelling pitch decks for investors. Input your company details and get a professional deck.',
    department: 'Founders',
    tier: 'free' as const,
    saves: '1.8k',
    href: '/skills/pitch-deck-generator',
  },
  {
    title: 'Automated Content Pipeline',
    description: 'A complete workflow for generating, editing, and publishing content automatically using Claude + Notion.',
    department: 'Content',
    tier: 'workflow' as const,
    saves: '1.5k',
    href: '/workflows/automated-content',
  },
];

const RESOURCE_TABS = [
  { id: 'all', label: 'All' },
  { id: 'skills', label: 'Skills' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'mcps', label: 'MCPs' },
  { id: 'updates', label: 'Updates' },
  { id: 'creators', label: 'Creators' },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(217,119,87,0.08)_0%,transparent_70%)] rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(106,155,204,0.06)_0%,transparent_70%)] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Capsule Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-full text-sm font-medium text-[#A99E92] mb-8 animate-fadeUp">
            <span className="w-2 h-2 bg-[#D97757] rounded-full animate-pulse" />
            <span>Best Claude Skills Directory</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] mb-6 animate-fadeUp animate-delay-1">
            <span className="text-[#F5F0EB]">Claude is changing everything.</span>
            <br />
            <span className="text-[#D97757] italic">Are you keeping up?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#A99E92] leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeUp animate-delay-2">
            Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place so you always know what&apos;s possible.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6 animate-fadeUp animate-delay-3">
            <div className="relative flex items-center">
              <Search className="absolute left-5 w-5 h-5 text-[#6B6158] pointer-events-none" />
              <input
                type="search"
                placeholder="Search skills, workflows, MCPs, creators…"
                className="w-full pl-14 pr-32 py-[18px] bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[18px] text-base text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] focus:shadow-[0_0_0_4px_rgba(217,119,87,0.12)] transition-all"
              />
              <button className="absolute right-2 btn btn-primary h-11 px-5 text-sm">
                Explore
              </button>
            </div>
          </div>

          {/* Trust Row */}
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
          {/* Tabs */}
          <div className="flex gap-1.5 p-1.5 bg-[#131118] rounded-xl mb-10 overflow-x-auto scrollbar-hide animate-fadeUp">
            {RESOURCE_TABS.map((tab) => (
              <button
                key={tab.id}
                className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap min-h-11"
                data-tab={tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

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
            {FEATURED_SKILLS.map((skill) => (
              <Link
                key={skill.title}
                href={skill.href}
                className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover"
              >
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-body font-semibold text-[#F5F0EB] text-base leading-snug flex-1 pr-2">
                    {skill.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{skill.saves}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                  {skill.description}
                </p>

                {/* Meta Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                    {skill.department}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                    skill.tier === 'free'
                      ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
                      : skill.tier === 'elite'
                      ? 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                      : 'bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] border-[rgba(106,155,204,0.2)]'
                  }`}>
                    {skill.tier === 'workflow' ? 'Workflow' : skill.tier === 'elite' ? 'Elite' : 'Free'}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center animate-fadeUp">
            <Link
              href="/skills"
              className="btn btn-ghost text-base h-12 px-8"
            >
              View all skills
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TAB SCRIPT ─── */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('[data-tab]').forEach(tab => {
              tab.addEventListener('click', function() {
                document.querySelectorAll('[data-tab]').forEach(t => {
                  t.classList.remove('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
                  t.classList.add('text-[#A99E92]');
                });
                this.classList.add('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
                this.classList.remove('text-[#A99E92]');
              });
            });
            document.querySelector('[data-tab="all"]')?.classList.add('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
          `,
        }}
      />
    </>
  );
}