import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Clock, Wrench, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { DEPARTMENTS } from '@/lib/constants';

// Mock department skills
const DEPT_SKILLS: Record<string, Array<{
  title: string;
  description: string;
  tier: string;
  saves: string;
  difficulty: string;
  href: string;
}>> = {
  marketing: [
    {
      title: 'LinkedIn Content System',
      description: 'A comprehensive prompt system for creating engaging LinkedIn content with Claude.',
      tier: 'free',
      saves: '1.2k',
      difficulty: 'Beginner',
      href: '/skills/linkedin-content-system',
    },
    {
      title: 'SEO Content Generator',
      description: 'Generate SEO-optimized blog posts and articles with AI-powered keyword research.',
      tier: 'free',
      saves: '892',
      difficulty: 'Intermediate',
      href: '/skills/seo-content-generator',
    },
    {
      title: 'Email Campaign Builder',
      description: 'Create high-converting email campaigns with personalized copy for each segment.',
      tier: 'elite',
      saves: '1.5k',
      difficulty: 'Intermediate',
      href: '/skills/email-campaign-builder',
    },
    {
      title: 'Social Media Scheduler',
      description: 'Plan and schedule social media content across multiple platforms.',
      tier: 'free',
      saves: '654',
      difficulty: 'Beginner',
      href: '/skills/social-media-scheduler',
    },
  ],
  sales: [
    {
      title: 'Cold Email Writer Pro',
      description: 'Generate personalized cold emails at scale. Perfect for sales teams.',
      tier: 'free',
      saves: '2.1k',
      difficulty: 'Beginner',
      href: '/skills/cold-email-writer',
    },
    {
      title: 'Lead Qualification Assistant',
      description: 'Score and qualify leads based on engagement data and demographics.',
      tier: 'free',
      saves: '1.3k',
      difficulty: 'Intermediate',
      href: '/skills/lead-qualification',
    },
    {
      title: 'Sales Script Generator',
      description: 'Create personalized sales scripts for different scenarios and personas.',
      tier: 'elite',
      saves: '987',
      difficulty: 'Advanced',
      href: '/skills/sales-script-generator',
    },
  ],
  design: [
    {
      title: 'UI Design Critic',
      description: 'Get expert design feedback on your UI mockups from Claude.',
      tier: 'free',
      saves: '1.8k',
      difficulty: 'Beginner',
      href: '/skills/ui-design-critic',
    },
    {
      title: 'Design System Builder',
      description: 'Generate design tokens and component documentation automatically.',
      tier: 'elite',
      saves: '756',
      difficulty: 'Advanced',
      href: '/skills/design-system-builder',
    },
    {
      title: 'Figma to Code Converter',
      description: 'Transform Figma designs into production-ready React components.',
      tier: 'free',
      saves: '2.3k',
      difficulty: 'Intermediate',
      href: '/skills/figma-to-code',
    },
  ],
  content: [
    {
      title: 'Content Repurposing Engine',
      description: 'Transform one piece of content into 20+ variations for different platforms.',
      tier: 'elite',
      saves: '3.1k',
      difficulty: 'Intermediate',
      href: '/skills/content-repurposing',
    },
    {
      title: 'Blog Post Outline Generator',
      description: 'Create structured outlines for blog posts with SEO best practices.',
      tier: 'free',
      saves: '1.4k',
      difficulty: 'Beginner',
      href: '/skills/blog-outline-generator',
    },
    {
      title: 'Video Script Writer',
      description: 'Write engaging video scripts for YouTube, TikTok, and short-form content.',
      tier: 'free',
      saves: '987',
      difficulty: 'Beginner',
      href: '/skills/video-script-writer',
    },
  ],
  founders: [
    {
      title: 'Pitch Deck Generator',
      description: 'Create compelling pitch decks for investors with AI-powered suggestions.',
      tier: 'free',
      saves: '2.8k',
      difficulty: 'Beginner',
      href: '/skills/pitch-deck-generator',
    },
    {
      title: 'Business Plan Writer',
      description: 'Generate comprehensive business plans with market analysis and projections.',
      tier: 'elite',
      saves: '1.2k',
      difficulty: 'Intermediate',
      href: '/skills/business-plan-writer',
    },
    {
      title: 'Competitor Analysis Tool',
      description: 'Research and analyze competitors with structured frameworks.',
      tier: 'free',
      saves: '876',
      difficulty: 'Intermediate',
      href: '/skills/competitor-analysis',
    },
  ],
  operations: [
    {
      title: 'Process Documentation Generator',
      description: 'Document business processes and SOPs with AI assistance.',
      tier: 'free',
      saves: '654',
      difficulty: 'Beginner',
      href: '/skills/process-documentation',
    },
    {
      title: 'Meeting Notes Summarizer',
      description: 'Automatically summarize meeting notes and extract action items.',
      tier: 'free',
      saves: '1.1k',
      difficulty: 'Beginner',
      href: '/skills/meeting-summarizer',
    },
  ],
  finance: [
    {
      title: 'Financial Report Generator',
      description: 'Transform raw financial data into investor-ready reports.',
      tier: 'free',
      saves: '987',
      difficulty: 'Intermediate',
      href: '/skills/financial-report-generator',
    },
    {
      title: 'Investment Thesis Builder',
      description: 'Research and analyze potential investments with structured frameworks.',
      tier: 'elite',
      saves: '654',
      difficulty: 'Advanced',
      href: '/skills/investment-thesis',
    },
  ],
  research: [
    {
      title: 'Market Research Analyst',
      description: 'Conduct comprehensive market research in minutes.',
      tier: 'elite',
      saves: '1.5k',
      difficulty: 'Intermediate',
      href: '/skills/market-research-analyst',
    },
    {
      title: 'Academic Paper Summarizer',
      description: 'Summarize and analyze academic papers and research documents.',
      tier: 'free',
      saves: '1.2k',
      difficulty: 'Beginner',
      href: '/skills/academic-summarizer',
    },
  ],
};

interface DepartmentPageProps {
  params: Promise<{ department: string }>;
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const { department } = await params;
  const dept = DEPARTMENTS.find((d) => d.slug === department);

  if (!dept) {
    return { title: 'Department Not Found' };
  }

  return {
    title: `Claude Skills for ${dept.name} — Best ${dept.name} Resources`,
    description: `Discover the best Claude skills, workflows, and resources for ${dept.name.toLowerCase()}. Curated and ready to use.`,
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { department } = await params;
  const dept = DEPARTMENTS.find((d) => d.slug === department);

  if (!dept) {
    notFound();
  }

  const skills = DEPT_SKILLS[department] || [];

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 lg:px-8 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-[#D97757] rounded-[10px] overflow-hidden">
                <div className="absolute top-[5px] right-[5px] w-3.5 h-3.5 bg-[#F5F0EB] rounded-full" />
                <div className="absolute bottom-[5px] left-[6px] w-2.5 h-2.5 bg-[#F5F0EB] rounded-[3px] rotate-12" />
              </div>
            </div>
            <span className="font-display text-xl font-bold text-[#F5F0EB] tracking-tight">
              Claude Chief
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/skills" className="px-4 py-2.5 text-sm font-semibold text-[#F5F0EB] bg-[#D97757] rounded-lg">
              Skills
            </Link>
            <Link href="/workflows" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Workflows
            </Link>
            <Link href="/mcps" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              MCPs
            </Link>
            <Link href="/blog" className="px-4 py-2.5 text-sm font-medium text-[#A99E92] hover:text-[#F5F0EB] hover:bg-[#131118] rounded-lg transition-all">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="btn btn-primary text-sm h-11 px-5">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO HEADER ─── */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
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
            <span className="text-[#6B6158] text-sm">{dept.count} resources</span>
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
          {skills.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {skills.map((skill, index) => (
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
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border ${
                        skill.tier === 'free'
                          ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]'
                          : 'bg-[rgba(201,134,42,0.12)] text-[#D97757] border-[rgba(201,134,42,0.2)]'
                      }`}>
                        {skill.tier === 'elite' ? 'Elite' : 'Free'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
                        {skill.difficulty}
                      </span>
                    </div>

                    {/* View More */}
                    <div className="flex items-center gap-1 text-xs text-[#6B6158] pt-4 border-t border-[rgba(54,46,40,0.3)]">
                      <span>View skill</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Browse All */}
              <div className="mt-12 text-center">
                <Link href="/skills" className="btn btn-outline text-base h-12 px-8">
                  Browse all skills
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

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1A1720] border-t border-[rgba(54,46,40,0.3)] px-6 sm:px-8 py-12">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D97757] rounded-lg relative overflow-hidden">
              <div className="absolute top-[4px] right-[4px] w-2 h-2 bg-[#F5F0EB] rounded-full" />
              <div className="absolute bottom-[4px] left-[4px] w-1.5 h-1.5 bg-[#F5F0EB] rounded-[2px] rotate-12" />
            </div>
            <span className="text-[#6B6158] text-sm">
              Claude Chief · Not affiliated with Anthropic
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#6B6158]">
            <Link href="/skills" className="hover:text-[#A99E92] transition-colors">Skills</Link>
            <Link href="/blog" className="hover:text-[#A99E92] transition-colors">Blog</Link>
            <Link href="/sign-in" className="hover:text-[#A99E92] transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </>
  );
}