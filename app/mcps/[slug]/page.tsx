import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bookmark, ExternalLink, User, Settings, Code, ArrowRight } from 'lucide-react';

const MCPS: Record<string, {
  title: string; description: string; service: string; department: string;
  tier: string; creator_name: string; creator_link: string; save_count: number;
  source_url: string; created_at: string; difficulty: string;
  use_cases: string[]; install_command?: string; requirements?: string[];
}> = {
  'filesystem': {
    title: 'Filesystem MCP',
    description: 'Read, write, and manage files on your local system directly from Claude. Perfect for code generation, documentation tasks, and bulk file operations.',
    service: 'Local System',
    department: 'Development',
    tier: 'free',
    creator_name: 'Marcus Rodriguez',
    creator_link: 'https://github.com/marcusrodriguez',
    save_count: 3210,
    source_url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
    created_at: '2026-02-01',
    difficulty: 'Beginner',
    use_cases: ['Read and write code files', 'Generate documentation', 'Batch rename and organize files', 'Search file contents'],
    requirements: ['Node.js 18+', 'Claude Desktop app', 'npx access'],
  },
  'github': {
    title: 'GitHub MCP',
    description: 'Connect Claude to GitHub for repository management, code review, issue tracking, and pull request automation. Your entire GitHub workflow, inside Claude.',
    service: 'GitHub',
    department: 'Development',
    tier: 'free',
    creator_name: 'Anthropic',
    creator_link: 'https://github.com/modelcontextprotocol',
    save_count: 2847,
    source_url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    created_at: '2026-02-15',
    difficulty: 'Intermediate',
    use_cases: ['Review pull requests', 'Manage issues', 'Search codebases', 'Automate repo tasks'],
    requirements: ['GitHub Personal Access Token', 'Node.js 18+', 'Claude Desktop app'],
  },
  'slack': {
    title: 'Slack MCP',
    description: 'Send messages, search history, manage channels, and integrate Claude into your team communication workflow. Automate standups, alerts, and team updates.',
    service: 'Slack',
    department: 'Operations',
    tier: 'free',
    creator_name: 'Marcus Rodriguez',
    creator_link: 'https://github.com/marcusrodriguez',
    save_count: 1934,
    source_url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/slack',
    created_at: '2026-03-01',
    difficulty: 'Beginner',
    use_cases: ['Automate standup messages', 'Search channel history', 'Post alerts and updates', 'Manage channels'],
    requirements: ['Slack workspace admin access', 'Node.js 18+', 'Slack App with Bot Token'],
  },
  'sequential-thinking': {
    title: 'Sequential Thinking MCP',
    description: 'Break down complex problems into sequential steps for more thorough analysis. Think through multi-step challenges with structured reasoning that Claude can follow and refine.',
    service: 'Anthropic',
    department: 'Research',
    tier: 'free',
    creator_name: 'Anthropic',
    creator_link: 'https://github.com/anthropics',
    save_count: 4102,
    source_url: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking',
    created_at: '2026-03-10',
    difficulty: 'Beginner',
    use_cases: ['Complex problem solving', 'Research analysis', 'Multi-step planning', 'Decision frameworks'],
  },
};

interface MCPPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MCPPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mcp = MCPS[slug];
  if (!mcp) return { title: 'MCP Not Found' };
  return {
    title: `${mcp.title} — Claude MCP | Claude Chief`,
    description: mcp.description,
  };
}

export default async function MCPDetailPage({ params }: MCPPageProps) {
  const { slug } = await params;
  const mcp = MCPS[slug];

  if (!mcp) notFound();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <Link href="/mcps" className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to MCPs
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(106,155,204,0.12)] text-[#6A9BCC] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(106,155,204,0.2)]">
              MCP
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 bg-[rgba(74,222,128,0.12)] text-[#4ADE80] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(74,222,128,0.2)]">
              Free
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(54,46,40,0.5)] text-[#A99E92] bg-[#131118]">
              {mcp.service}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0EB] tracking-tight leading-tight mb-5">
            {mcp.title}
          </h1>
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl mb-8">
            {mcp.description}
          </p>

          <div className="flex items-center gap-6 text-sm flex-wrap">
            <a href={mcp.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#A99E92] hover:text-[#D97757] transition-colors">
              <User className="w-4 h-4" /><span>by <span className="font-medium">{mcp.creator_name}</span></span>
            </a>
            <div className="flex items-center gap-2 text-[#A99E92]"><Bookmark className="w-4 h-4" /><span>{mcp.save_count.toLocaleString()} saves</span></div>
            <div className="flex items-center gap-2 text-[#A99E92]"><Settings className="w-4 h-4" /><span>{mcp.difficulty}</span></div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Use Cases */}
              <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.08),transparent_70%)]" />
                <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center bg-[#4ADE80]/20 rounded-lg"><Code className="w-4 h-4 text-[#4ADE80]" /></span>
                  What you can do
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mcp.use_cases.map((useCase, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)]">
                      <div className="w-5 h-5 bg-[#4ADE80]/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-[#4ADE80]" />
                      </div>
                      <span className="text-sm text-[#A99E92]">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              {mcp.requirements && (
                <div className="p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                  <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-5">Requirements</h2>
                  <ul className="space-y-3">
                    {mcp.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#A99E92]">
                        <div className="w-1.5 h-1.5 bg-[#D97757] rounded-full flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Install this MCP</h3>
                <a href={mcp.source_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
                  View on GitHub <ExternalLink className="w-4 h-4" />
                </a>
                <button className="btn btn-ghost w-full justify-center mt-3">
                  <Bookmark className="w-4 h-4" /> Save for later
                </button>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Creator</h3>
                <a href={mcp.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors">
                  <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#6B6158]" />
                  </div>
                  <span className="font-medium">{mcp.creator_name}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
