import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Bookmark } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Claude Skills — Best Skills for Claude',
  description: 'Browse the best Claude skills, reusable prompt systems for specific tasks. Curated and ready to use.',
};

const SKILLS = [
  {
    title: 'LinkedIn Content System',
    description: 'A comprehensive prompt system for creating engaging LinkedIn content with Claude. Generate viral posts in minutes.',
    department: 'Marketing',
    tier: 'free',
    saves: '1.2k',
    source: 'YouTube',
    href: '/skills/linkedin-content-system',
  },
  {
    title: 'Cold Email Writer Pro',
    description: 'Generate personalized cold emails at scale. Perfect for sales teams looking to automate outreach.',
    department: 'Sales',
    tier: 'free',
    saves: '892',
    source: 'Blog',
    href: '/skills/cold-email-writer',
  },
  {
    title: 'UI Design Critic',
    description: 'Get expert design feedback on your UI mockups. Upload a screenshot and get detailed critique from Claude.',
    department: 'Design',
    tier: 'free',
    saves: '654',
    source: 'GitHub',
    href: '/skills/ui-design-critic',
  },
  {
    title: 'Content Repurposing Engine',
    description: 'Transform one piece of content into 20+ variations for different platforms automatically.',
    department: 'Content',
    tier: 'elite',
    saves: '2.3k',
    source: 'YouTube',
    href: '/skills/content-repurposing',
  },
  {
    title: 'Pitch Deck Generator',
    description: 'Create compelling pitch decks for investors. Input your company details and get a professional deck.',
    department: 'Founders',
    tier: 'free',
    saves: '1.8k',
    source: 'GitHub',
    href: '/skills/pitch-deck-generator',
  },
  {
    title: 'Market Research Analyst',
    description: 'Conduct comprehensive market research in minutes. Analyze competitors, trends, and opportunities.',
    department: 'Research',
    tier: 'elite',
    saves: '1.4k',
    source: 'Blog',
    href: '/skills/market-research-analyst',
  },
  {
    title: 'Financial Report Generator',
    description: 'Transform raw financial data into investor-ready reports with charts and key insights.',
    department: 'Finance',
    tier: 'free',
    saves: '987',
    source: 'GitHub',
    href: '/skills/financial-report-generator',
  },
  {
    title: 'Customer Support Agent',
    description: 'Handle customer inquiries with empathy and accuracy. Generates context-aware responses.',
    department: 'Operations',
    tier: 'free',
    saves: '756',
    source: 'Blog',
    href: '/skills/customer-support-agent',
  },
];

const SOURCE_TYPES = ['All', 'YouTube', 'GitHub', 'Blog', 'Twitter'];
const TIER_TYPES = ['All', 'Free', 'Elite'];
const DEPT_FILTER = ['All', ...DEPARTMENTS.map(d => d.name)];

export default function SkillsPage() {
  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude Skills
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            Reusable prompt systems for specific tasks. Browse our curated collection of the best Claude skills.
          </p>
        </div>
      </section>

      {/* ─── SEARCH & FILTERS ─── */}
      <section className="bg-[#1A1720] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative max-w-xl mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
            <input
              type="search"
              placeholder="Search skills..."
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <select className="px-4 py-2.5 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92] focus:outline-none focus:border-[#D97757] cursor-pointer min-h-11">
              {DEPT_FILTER.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select className="px-4 py-2.5 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92] focus:outline-none focus:border-[#D97757] cursor-pointer min-h-11">
              {TIER_TYPES.map(tier => (
                <option key={tier} value={tier}>{tier === 'All' ? 'All Tiers' : tier}</option>
              ))}
            </select>
            <select className="px-4 py-2.5 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92] focus:outline-none focus:border-[#D97757] cursor-pointer min-h-11">
              {SOURCE_TYPES.map(source => (
                <option key={source} value={source}>{source === 'All' ? 'All Sources' : source}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <p className="text-[#6B6158] text-sm">
            Showing <span className="text-[#F5F0EB] font-medium">8</span> skills
          </p>
        </div>
      </section>

      {/* ─── SKILLS GRID ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((skill, index) => (
              <Link
                key={skill.title}
                href={skill.href}
                className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
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
                      : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                  }`}>
                    {skill.tier === 'elite' ? 'Elite' : 'Free'}
                  </span>
                </div>

                {/* Source Badge */}
                <div className="mt-4 pt-4 border-t border-[rgba(54,46,40,0.3)]">
                  <span className="text-[10px] text-[#6B6158] uppercase tracking-wider">
                    via {skill.source}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more skills
            </button>
          </div>
        </div>
      </section>
    </>
  );
}