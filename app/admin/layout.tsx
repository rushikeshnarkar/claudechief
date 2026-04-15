import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in?redirect=/admin');
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-[#0D0B0F] flex">
      <AdminSidebar />
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 h-[72px] flex items-center justify-between px-6 bg-[#0D0B0F]/[0.85] backdrop-blur-xl border-b border-[rgba(54,46,40,0.3)]">
          <h1 className="font-display text-lg font-bold text-[#F5F0EB] tracking-tight">Admin</h1>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
