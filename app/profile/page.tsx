import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Bookmark, Clock, ExternalLink, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Profile — Claude Chief',
  description: 'Your saved resources and download history on Claude Chief.',
};

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

            {/* Sign Out */}
            <form action="/api/auth/signout" method="post">
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
        </div>
      </section>
    </>
  );
}
