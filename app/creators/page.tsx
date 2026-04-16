import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Claude Creators — Top Claude Content Creators',
  description: 'Discover top Claude creators and their best resources. Follow the best minds in the Claude ecosystem.',
};

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  twitter: { bg: 'rgba(56,163,255,0.12)', text: '#38A3FF' },
  youtube: { bg: 'rgba(255,59,48,0.12)', text: '#FF3B30' },
  github: { bg: 'rgba(255,255,255,0.06)', text: '#B5AFA2' },
  blog: { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80' },
  linkedin: { bg: 'rgba(10,102,194,0.12)', text: '#0A66C2' },
  newsletter: { bg: 'var(--color-accent-muted)', text: 'var(--color-accent)' },
};

function formatFollowerCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
}

function PlatformIcon({ platform, className, color }: { platform: string; className: string; color?: string }) {
  const style = color ? { color } : {};
  if (platform === 'twitter') {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (platform === 'youtube') {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (platform === 'github') {
    return (
      <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    );
  }
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}

export default async function CreatorsPage() {
  const supabase = await createClient();
  const { data: creators } = await supabase
    .from('creators')
    .select('*')
    .order('follower_count', { ascending: false });

  const dbCreators = creators ?? [];

  return (
    <>
      {/* ─── HERO HEADER ─── */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4 animate-fade-up">
            <div className="w-10 h-10 bg-[var(--color-accent-muted)] rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <span className="text-[var(--color-text-muted)] text-sm">The Claude ecosystem&apos;s best minds</span>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-accent)] mb-4 animate-fade-up animate-delay-100">
            <span className="w-4 h-px bg-[var(--color-accent)]" />
            Directory
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
            Creators
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 animate-fade-up animate-delay-100" />
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed animate-fade-up animate-delay-200">
            People producing high-quality Claude content. Discover creators, their platforms, and their best resources.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-4 animate-fade-up animate-delay-300">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* ─── SEARCH ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 bg-[var(--color-bg-surface)]">
        <div className="container max-w-5xl mx-auto">
          <div className="relative max-w-xl animate-fade-up animate-delay-400">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="search"
              placeholder="Search creators..."
              className="w-full pl-14 pr-5 py-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_var(--color-accent-glow)] transition-all min-h-12"
            />
          </div>
        </div>
      </section>

      {/* ─── CREATORS GRID ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[var(--color-bg-base)]">
        <div className="container max-w-5xl mx-auto">
          {dbCreators.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">No creators found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dbCreators.map((creator, index) => {
                const platformStyle = PLATFORM_COLORS[creator.platform] || PLATFORM_COLORS.blog;
                const platformLabel = creator.platform.charAt(0).toUpperCase() + creator.platform.slice(1);
                const initial = creator.name.charAt(0).toUpperCase();

                return (
                  <article
                    key={creator.id}
                    className="group relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Top accent bar */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    <div className="p-6">
                      {/* Platform Badge + Avatar */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: platformStyle.bg }}
                        >
                          <PlatformIcon platform={creator.platform} className="w-5 h-5" color={platformStyle.text} />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base group-hover:text-[var(--color-accent)] transition-colors">
                            {creator.name}
                          </h3>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {formatFollowerCount(creator.follower_count)} followers
                          </span>
                        </div>
                      </div>

                      {/* Focus Area Badge */}
                      {creator.focus_area && (
                        <div className="mb-4">
                          <span
                            className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border"
                            style={{ background: platformStyle.bg, color: platformStyle.text, borderColor: `${platformStyle.text}22` }}
                          >
                            {creator.focus_area}
                          </span>
                        </div>
                      )}

                      {/* Bio */}
                      {creator.bio && (
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-2">
                          {creator.bio}
                        </p>
                      )}

                      {/* Action */}
                      {creator.profile_url && (
                        <a
                          href={creator.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-medium"
                        >
                          Follow on {platformLabel}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Bottom ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,99,58,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More */}
          {dbCreators.length > 0 && (
            <div className="mt-12 text-center animate-fade-up">
              <button className="btn btn-outline text-base h-12 px-8">
                Load more creators
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}