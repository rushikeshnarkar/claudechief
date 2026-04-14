import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe, User } from 'lucide-react';

const CREATORS: Record<string, {
  name: string; platform: string; focus: string; resources: number;
  followers: string; bio: string; profile_url: string;
  best_resource: string; recent_resources: { title: string; type: string; href: string }[];
  twitter?: string; github?: string; youtube?: string; website?: string;
}> = {
  'alex-chen': {
    name: 'Alex Chen',
    platform: 'Twitter',
    focus: 'Claude Skills & Workflows',
    resources: 24,
    followers: '45K',
    bio: 'Building AI products and sharing Claude workflows daily. Ex-Stripe, ex-Notion. I post 3+ Claude tips per week — follow for practical workflows you can use today.',
    profile_url: 'https://twitter.com/alexchen',
    best_resource: 'LinkedIn Content System',
    twitter: 'https://twitter.com/alexchen',
    recent_resources: [
      { title: 'LinkedIn Content System', type: 'skill', href: '/skills/linkedin-content-system' },
      { title: 'Cold Email Writer Pro', type: 'skill', href: '/skills/cold-email-writer' },
      { title: 'Automated Content Pipeline', type: 'workflow', href: '/workflows/automated-content' },
    ],
  },
  'sarah-mitchell': {
    name: 'Sarah Mitchell',
    platform: 'YouTube',
    focus: 'Claude for Business',
    resources: 18,
    followers: '28K',
    bio: 'YouTube creator helping businesses leverage Claude for growth and efficiency. 100+ videos on Claude prompts, workflows, and automation strategies.',
    profile_url: 'https://youtube.com/@sarahmitchell',
    best_resource: 'Claude for Sales Automation',
    youtube: 'https://youtube.com/@sarahmitchell',
    recent_resources: [
      { title: 'Automated Content Pipeline', type: 'workflow', href: '/workflows/automated-content' },
      { title: 'Content Repurposing Engine', type: 'skill', href: '/skills/content-repurposing' },
    ],
  },
  'marcus-rodriguez': {
    name: 'Marcus Rodriguez',
    platform: 'GitHub',
    focus: 'Developer Tools & MCPs',
    resources: 42,
    followers: '12K',
    bio: 'Open source maintainer. Building MCP servers and Claude integrations for developers. 40+ MCP implementations and counting.',
    profile_url: 'https://github.com/marcusrodriguez',
    best_resource: 'MCP Server Template',
    github: 'https://github.com/marcusrodriguez',
    recent_resources: [
      { title: 'Filesystem MCP', type: 'mcp', href: '/mcps/filesystem' },
      { title: 'Slack MCP', type: 'mcp', href: '/mcps/slack' },
      { title: 'GitHub MCP', type: 'mcp', href: '/mcps/github' },
    ],
  },
};

interface CreatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const creator = CREATORS[slug];
  if (!creator) return { title: 'Creator Not Found' };
  return {
    title: `${creator.name} — Claude Creator | Claude Chief`,
    description: creator.bio,
  };
}

export default async function CreatorDetailPage({ params }: CreatorPageProps) {
  const { slug } = await params;
  const creator = CREATORS[slug];

  if (!creator) notFound();

  const platformColors: Record<string, { bg: string; text: string }> = {
    Twitter: { bg: 'rgba(56,163,255,0.12)', text: '#38A3FF' },
    YouTube: { bg: 'rgba(255,59,48,0.12)', text: '#FF3B30' },
    GitHub: { bg: 'rgba(255,255,255,0.08)', text: '#F5F0EB' },
    Blog: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80' },
  };
  const pStyle = platformColors[creator.platform] || platformColors.Blog;

  return (
    <>
      {/* ─── PROFILE HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/creators" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to creators
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-[#F5F0EB] flex-shrink-0" style={{ background: pStyle.bg }}>
              <User className="w-12 h-12" style={{ color: pStyle.text }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-display text-3xl font-bold text-[#F5F0EB] tracking-tight">{creator.name}</h1>
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full" style={{ background: pStyle.bg, color: pStyle.text }}>
                  {creator.platform}
                </span>
              </div>
              <p className="text-[#A99E92] text-sm mb-3">{creator.focus}</p>
              <p className="text-[#A99E92] leading-relaxed mb-5">{creator.bio}</p>
              <div className="flex items-center gap-6 text-sm flex-wrap">
                <span className="text-[#6B6158]">{creator.followers} followers</span>
                <span className="text-[#6B6158]">{creator.resources} resources</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            {creator.twitter && (
              <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-10 px-4">
                Twitter <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {creator.github && (
              <a href={creator.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-10 px-4">
                GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {creator.youtube && (
              <a href={creator.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-10 px-4">
                YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {creator.website && (
              <a href={creator.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-10 px-4">
                <Globe className="w-3.5 h-3.5" /> Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── RESOURCES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resources */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">Resources by {creator.name}</h2>
                <div className="space-y-3">
                  {creator.recent_resources.map((resource, i) => (
                    <Link key={i} href={resource.href} className="group flex items-center justify-between p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)] hover:border-[#D97757] transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#6B6158]">{resource.type}</span>
                        </div>
                        <span className="text-sm font-medium text-[#F5F0EB] group-hover:text-[#D97757] transition-colors">{resource.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#6B6158] group-hover:text-[#D97757] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Resource */}
            <div>
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] sticky top-24">
                <h3 className="text-[10px] uppercase tracking-wider text-[#6B6158] mb-3">Best Resource</h3>
                <div className="p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)] mb-5">
                  <span className="text-[#F5F0EB] font-medium text-sm">{creator.best_resource}</span>
                </div>
                <a href={creator.profile_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center text-sm">
                  Follow on {creator.platform} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
