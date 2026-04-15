import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Call at the top of every admin page server component.
 * Redirects to /sign-in if not logged in, or / if not admin.
 */
export async function requireAdmin() {
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
}
