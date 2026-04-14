import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Bookmark, Clock, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Claude Workflows — Multi-Step Processes',
  description: 'Discover Claude workflows — multi-step processes using Claude with other tools for automation.',
};

const WORKFLOWS = [
  {
    title: 'Automated Content Pipeline',
    description: 'A complete workflow for generating, editing, and publishing content automatically using Claude + Notion. Save 5+ hours per week.',
    department: 'Content',
    tier: 'workflow',
    saves: '1.5k',
    time: '30 min',
    difficulty: 'Intermediate',
    href: '/workflows/automated-content',
  },
  {
    title: 'Lead Qualification Funnel',
    description: 'Automatically score and qualify leads based on engagement data. Integrate with your CRM for seamless workflow.',
    department: 'Sales',
    tier: 'workflow',
    saves: '982',
    time: '45 min',
    difficulty: 'Advanced',
    href: '/workflows/lead-qualification-funnel',
  },
  {
    title: 'Design to Code Handoff',
    description: 'Transform Figma designs into production-ready code. Perfect for design teams working with developers.',
    department: 'Design',
    tier: 'workflow',
    saves: '1.1k',
    time: '20 min',
    difficulty: 'Beginner',
    href: '/workflows/design-to-code-handoff',
  },
  {
    title: 'Weekly Analytics Report',
    description: 'Aggregate data from multiple sources and generate comprehensive weekly reports with insights and recommendations.',
    department: 'Operations',
    tier: 'workflow',
    saves: '756',
    time: '15 min',
    difficulty: 'Beginner',
    href: '/workflows/analytics-report',
  },
  {
    title: 'Customer Onboarding Sequence',
    description: 'Automate customer onboarding emails and tasks based on user behavior and milestones.',
    department: 'Marketing',
    tier: 'workflow',
    saves: '1.3k',
    time: '1 hour',
    difficulty: 'Intermediate',
    href: '/workflows/onboarding-sequence',
  },
  {
    title: 'Investment Thesis Builder',
    description: 'Research and analyze potential investments with structured frameworks and due diligence checklists.',
    department: 'Finance',
    tier: 'workflow',
    saves: '645',
    time: '2 hours',
    difficulty: 'Advanced',
    href: '/workflows/investment-thesis',
  },
];

export default function WorkflowsPage() {
  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude Workflows
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            Multi-step processes using Claude, often combined with other tools. Automate your workflows and save time.
          </p>
        </div>
      </section>

      {/* ─── SEARCH ─── */}
      <section className="bg-[#1A1720] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container max-w-7xl mx-auto">
          <div className="relative max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6158] pointer-events-none" />
            <input
              type="search"
              placeholder="Search workflows..."
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </div>
        </div>
      </section>

      {/* ─── WORKFLOWS GRID ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKFLOWS.map((workflow, index) => (
              <Link
                key={workflow.title}
                href={workflow.href}
                className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] hover:-translate-y-[5px] spring-hover animate-fadeUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(106,155,204,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-body font-semibold text-[#F5F0EB] text-base leading-snug flex-1 pr-2">
                    {workflow.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6158] flex-shrink-0">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{workflow.saves}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                  {workflow.description}
                </p>

                {/* Meta Tags */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                    {workflow.department}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
                    Workflow
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-[#6B6158] pt-4 border-t border-[rgba(54,46,40,0.3)]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {workflow.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    {workflow.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more workflows
            </button>
          </div>
        </div>
      </section>
    </>
  );
}