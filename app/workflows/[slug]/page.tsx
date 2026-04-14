import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Wrench, Bookmark, ExternalLink, User, ArrowRight } from 'lucide-react';

const WORKFLOWS: Record<string, {
  title: string; description: string; department: string; tier: string;
  creator_name: string; creator_link: string; save_count: number;
  source_url: string; created_at: string; time_estimate: string;
  difficulty: string; tools: string[]; steps: { title: string; description: string }[];
}> = {
  'automated-content': {
    title: 'Automated Content Pipeline',
    description: 'A complete workflow for generating, editing, and publishing content automatically using Claude + Notion. Save 5+ hours per week with this battle-tested system.',
    department: 'Content',
    tier: 'workflow',
    creator_name: 'Sarah Mitchell',
    creator_link: 'https://twitter.com/sarahmitchell',
    save_count: 1523,
    source_url: 'https://github.com/sarahmitchell/content-pipeline',
    created_at: '2026-03-10',
    time_estimate: '30 minutes to set up, then fully automated',
    difficulty: 'Intermediate',
    tools: ['Claude', 'Notion', 'Buffer', 'Zapier'],
    steps: [
      { title: 'Define your content calendar', description: 'Set up a Notion database with your content calendar. Include fields for topic, target platform, publish date, and status.' },
      { title: 'Create your Claude prompt template', description: 'Build a reusable prompt that takes your topic and generates platform-specific content variations.' },
      { title: 'Set up Zapier automation', description: 'Connect Notion to Claude via Zapier webhook. When a new row is added, trigger your content generation.' },
      { title: 'Add approval step', description: 'Route generated content back to Notion for human review before publishing.' },
      { title: 'Connect to Buffer', description: 'Once approved, push content to Buffer for scheduled social media publishing.' },
    ],
  },
  'lead-qualification-funnel': {
    title: 'Lead Qualification Funnel',
    description: 'Automatically score and qualify leads based on engagement data. Integrate with your CRM for seamless workflow. Used by 200+ sales teams.',
    department: 'Sales',
    tier: 'workflow',
    creator_name: 'David Kim',
    creator_link: 'https://twitter.com/davidkim',
    save_count: 982,
    source_url: 'https://github.com/davidkim/lead-funnel',
    created_at: '2026-03-05',
    time_estimate: '1 hour to set up, ongoing automation',
    difficulty: 'Advanced',
    tools: ['Claude', 'HubSpot', 'Zapier', 'Google Sheets'],
    steps: [
      { title: 'Export CRM data', description: 'Pull your lead list from HubSpot with all engagement metrics.' },
      { title: 'Run Claude scoring analysis', description: 'Use Claude to analyze engagement patterns and assign lead scores.' },
      { title: 'Segment by score tier', description: 'Automatically tag leads as Hot, Warm, or Cold based on Claude\'s analysis.' },
      { title: 'Trigger outreach sequence', description: 'High-scoring leads get routed to your sales team\'s priority queue.' },
    ],
  },
};

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = WORKFLOWS[slug];
  if (!workflow) return { title: 'Workflow Not Found' };
  return {
    title: `${workflow.title} — Claude Workflow | Claude Chief`,
    description: workflow.description,
  };
}

export default async function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = WORKFLOWS[slug];

  if (!workflow) notFound();

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
              {workflow.department}
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
            <a href={workflow.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A99E92] hover:text-[#D97757] transition-colors">
              <User className="w-4 h-4" /><span>by <span className="font-medium">{workflow.creator_name}</span></span>
            </a>
            <div className="flex items-center gap-2 text-[#A99E92]"><Bookmark className="w-4 h-4" /><span>{workflow.save_count.toLocaleString()} saves</span></div>
            <div className="flex items-center gap-2 text-[#A99E92]"><Clock className="w-4 h-4" /><span>{workflow.time_estimate}</span></div>
            <div className="flex items-center gap-2 text-[#A99E92]"><Wrench className="w-4 h-4" /><span>{workflow.difficulty}</span></div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(106,155,204,0.08),transparent_70%)]" />
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#6A9BCC]/20 rounded-lg"><ArrowRight className="w-4 h-4 text-[#6A9BCC]" /></span>
                  How it works
                </h2>
                <div className="space-y-6">
                  {workflow.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-full flex items-center justify-center text-[#6B6158] text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-body font-semibold text-[#F5F0EB] mb-1">{step.title}</h3>
                        <p className="text-[#A99E92] text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">Tools used</h2>
                <div className="flex flex-wrap gap-3">
                  {workflow.tools.map(tool => (
                    <span key={tool} className="px-4 py-2 bg-[#131118] border border-[rgba(54,46,40,0.5)] rounded-lg text-sm text-[#A99E92]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Get this workflow</h3>
                <a href={workflow.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
                <button className="btn btn-ghost w-full justify-center mt-3">
                  <Bookmark className="w-4 h-4" /> Save for later
                </button>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Creator</h3>
                <a href={workflow.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors">
                  <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#6B6158]" />
                  </div>
                  <span className="font-medium">{workflow.creator_name}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
