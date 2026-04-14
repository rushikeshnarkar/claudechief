import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Bookmark, Download, Clock, User, LogOut, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Profile — Claude Chief',
  description: 'Your saved resources and download history on Claude Chief.',
};

// Mock saved data — replace with Supabase queries when connected
const SAVED_RESOURCES = [
  {
    type: 'skill',
    title: 'LinkedIn Content System',
    description: 'A comprehensive prompt system for creating engaging LinkedIn content.',
    department: 'Marketing',
    tier: 'free',
    saves: '1.2k',
    href: '/skills/linkedin-content-system',
    savedAt: '2 hours ago',
  },
  {
    type: 'workflow',
    title: 'Automated Content Pipeline',
    description: 'A complete workflow for generating, editing, and publishing content automatically.',
    department: 'Content',
    tier: 'workflow',
    saves: '1.5k',
    href: '/workflows/automated-content',
    savedAt: '1 day ago',
  },
  {
    type: 'mcp',
    title: 'Sequential Thinking MCP',
    description: 'Break down complex problems into sequential steps for better analysis.',
    department: 'Research',
    tier: 'free',
    saves: '4.1k',
    href: '/mcps/sequential-thinking',
    savedAt: '3 days ago',
  },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

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
          <div className="flex items-center gap-3">
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                className="btn btn-outline text-sm h-11 px-4"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* ─── PROFILE HEADER ─── */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-[#D97757] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#F5F0EB] flex-shrink-0">
              {initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F0EB] tracking-tight mb-1">
                {fullName}
              </h1>
              <p className="text-[#6B6158] text-sm">{user.email}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-[#F5F0EB]">{SAVED_RESOURCES.length}</div>
                <div className="text-[#6B6158] text-xs uppercase tracking-wider">Saved</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-[#F5F0EB]">0</div>
                <div className="text-[#6B6158] text-xs uppercase tracking-wider">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SAVED RESOURCES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[#0D0B0F]">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-[#D97757]" />
              <h2 className="font-display text-2xl font-bold text-[#F5F0EB]">
                Saved resources
              </h2>
            </div>
            <Link href="/skills" className="btn btn-ghost text-sm h-10 px-4">
              Explore more
            </Link>
          </div>

          {SAVED_RESOURCES.length > 0 ? (
            <div className="space-y-4">
              {SAVED_RESOURCES.map((resource) => (
                <div
                  key={resource.title}
                  className="group relative p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] hover:border-[#D97757] spring-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="inline-flex items-center px-3 py-1.5 bg-[rgba(217,119,87,0.12)] text-[#D97757] text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[rgba(217,119,87,0.2)]">
                          {resource.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border-[rgba(74,222,128,0.2)]">
                          {resource.tier === 'workflow' ? 'Workflow' : resource.tier === 'elite' ? 'Elite' : 'Free'}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[#6B6158]">
                          <Clock className="w-3 h-3" />
                          Saved {resource.savedAt}
                        </span>
                      </div>
                      <h3 className="font-body font-semibold text-[#F5F0EB] text-base mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-[#A99E92] text-sm leading-relaxed line-clamp-1">
                        {resource.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={resource.href}
                        className="btn btn-outline text-sm h-10 px-4"
                      >
                        View
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-2.5 text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] rounded-lg transition-all">
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#131118] rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-8 h-8 text-[#6B6158]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">
                No saved resources yet
              </h3>
              <p className="text-[#A99E92] text-sm mb-6 max-w-md mx-auto">
                Browse the directory and save skills, workflows, and MCPs you want to revisit.
              </p>
              <Link href="/skills" className="btn btn-primary">
                Explore skills
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
            <Link href="/about" className="hover:text-[#A99E92] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#A99E92] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#A99E92] transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
