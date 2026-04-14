import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Users, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Claude Creators — Top Claude Content Creators',
  description: 'Discover top Claude creators and their best resources. Follow the best minds in the Claude ecosystem.',
};

const CREATORS = [
  {
    name: 'Alex Chen',
    platform: 'Twitter',
    focus: 'Claude Skills & Workflows',
    resources: 24,
    followers: '45K',
    bio: 'Building AI products and sharing Claude workflows daily. Ex-Stripe, ex-Notion.',
    profileUrl: 'https://twitter.com/alexchen',
    bestResource: 'LinkedIn Content System',
  },
  {
    name: 'Sarah Mitchell',
    platform: 'YouTube',
    focus: 'Claude for Business',
    resources: 18,
    followers: '28K',
    bio: 'YouTube creator helping businesses leverage Claude for growth and efficiency.',
    profileUrl: 'https://youtube.com/@sarahmitchell',
    bestResource: 'Claude for Sales Automation',
  },
  {
    name: 'Marcus Rodriguez',
    platform: 'GitHub',
    focus: 'Developer Tools & MCPs',
    resources: 42,
    followers: '12K',
    bio: 'Open source maintainer. Building MCP servers and Claude integrations for developers.',
    profileUrl: 'https://github.com/marcusrodriguez',
    bestResource: 'MCP Server Template',
  },
  {
    name: 'Emily Watson',
    platform: 'Blog',
    focus: 'AI Productivity',
    resources: 31,
    followers: '15K',
    bio: 'Productivity researcher and writer. Exploring how Claude changes the way we work.',
    profileUrl: 'https://emilywatson.ai',
    bestResource: 'The Complete Claude Productivity Guide',
  },
  {
    name: 'David Kim',
    platform: 'Twitter',
    focus: 'Claude Marketing',
    resources: 19,
    followers: '32K',
    bio: 'Marketing lead @techstartup. Sharing battle-tested Claude prompts for marketers.',
    profileUrl: 'https://twitter.com/davidkim',
    bestResource: 'Marketing Prompt Library',
  },
  {
    name: 'Lisa Park',
    platform: 'YouTube',
    focus: 'Design & Creative',
    resources: 15,
    followers: '21K',
    bio: 'Senior designer turned AI educator. Teaching designers how to use Claude effectively.',
    profileUrl: 'https://youtube.com/@lisapark',
    bestResource: 'Figma to Code with Claude',
  },
];

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  Twitter: { bg: 'rgba(56,163,255,0.12)', text: '#38A3FF' },
  YouTube: { bg: 'rgba(255,59,48,0.12)', text: '#FF3B30' },
  GitHub: { bg: 'rgba(255,255,255,0.08)', text: '#F5F0EB' },
  Blog: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80' },
};

export default function CreatorsPage() {
  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D97757]/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[#D97757]" />
            </div>
            <span className="text-[#6B6158] text-sm">The Claude ecosystem&apos;s best minds</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Claude Creators
          </h1>
          <p className="text-[#A99E92] text-lg max-w-2xl leading-relaxed">
            People producing high-quality Claude content. Discover creators, their platforms, and their best resources.
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
              placeholder="Search creators..."
              className="w-full pl-14 pr-5 py-4 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] transition-all min-h-12"
            />
          </div>
        </div>
      </section>

      {/* ─── CREATORS GRID ─── */}
      <section className="bg-[#0D0B0F] px-4 sm:px-6 lg:px-8 py-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CREATORS.map((creator, index) => {
              const platformStyle = PLATFORM_COLORS[creator.platform] || PLATFORM_COLORS.Blog;

              return (
                <article
                  key={creator.name}
                  className="group relative p-6 bg-[linear-gradient(135deg,rgba(19,17,24,0.88)_0%,rgba(26,23,32,0.6)_100%)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl overflow-hidden hover:border-[#D97757] spring-hover animate-fadeUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Platform Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: platformStyle.bg }}
                    >
                      <svg className="w-6 h-6" style={{ color: platformStyle.text }} viewBox="0 0 24 24" fill="currentColor">
                        {creator.platform === 'Twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                        {creator.platform === 'YouTube' && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>}
                        {creator.platform === 'GitHub' && <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>}
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-[#F5F0EB] text-base">
                        {creator.name}
                      </h3>
                      <span className="text-xs text-[#6B6158]">{creator.followers} followers</span>
                    </div>
                  </div>

                  {/* Focus Area */}
                  <div className="mb-4">
                    <span
                      className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border"
                      style={{ background: platformStyle.bg, color: platformStyle.text, borderColor: `${platformStyle.text}33` }}
                    >
                      {creator.focus}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-[#A99E92] text-sm leading-relaxed mb-4 line-clamp-2">
                    {creator.bio}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-[#6B6158] mb-5">
                    <span>{creator.resources} resources</span>
                  </div>

                  {/* Best Resource */}
                  <div className="p-4 bg-[#131118]/50 rounded-xl border border-[rgba(54,46,40,0.3)] mb-5">
                    <span className="text-[10px] text-[#6B6158] uppercase tracking-wider mb-1 block">Best Resource</span>
                    <span className="text-sm text-[#F5F0EB] font-medium">{creator.bestResource}</span>
                  </div>

                  {/* Action */}
                  <a
                    href={creator.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#D97757] hover:text-[#E5886A] transition-colors font-medium"
                  >
                    Follow on {creator.platform}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </article>
              );
            })}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="btn btn-outline text-base h-12 px-8">
              Load more creators
            </button>
          </div>
        </div>
      </section>
    </>
  );
}