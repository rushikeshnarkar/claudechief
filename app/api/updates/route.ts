import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const update_type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '20');

  let query = supabase
    .from('updates')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);

  if (update_type) query = query.eq('update_type', update_type);

  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, count });
}

async function adminCheck(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), user: null };
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  if (!profile?.is_admin) return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), user };
  return { user };
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const check = await adminCheck(supabase);
  if (check.error) return check.error;

  const body = await request.json();

  // Auto-generate slug if not provided
  if (!body.slug && body.title) {
    body.slug = slugify(body.title);
  }

  const { data, error } = await supabase.from('updates').insert([body]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const check = await adminCheck(supabase);
  if (check.error) return check.error;

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  // Auto-generate slug if title changed
  if (updates.title && !updates.slug) {
    updates.slug = slugify(updates.title);
  }

  const { data, error } = await supabase
    .from('updates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const check = await adminCheck(supabase);
  if (check.error) return check.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  const { error } = await supabase.from('updates').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
