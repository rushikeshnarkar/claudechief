import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  // GET is public — no auth required to list pages

  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get('type');
  const status = searchParams.get('status');

  let query = supabase
    .from('pages')
    .select('id, title, slug, page_type, status, excerpt, tags, published_at, created_at, updated_at')
    .order('updated_at', { ascending: false });

  if (pageType) query = query.eq('page_type', pageType);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ pages: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('user_profiles').select('is_admin').eq('id', user.id).single();
  if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json();
  const { title, slug, page_type, status, excerpt, meta_title, meta_description, og_image, tags, blocks, author } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
  }

  const insertData: Record<string, unknown> = {
    title,
    slug,
    page_type: page_type || 'blog',
    status: status || 'draft',
    excerpt: excerpt || '',
    meta_title: meta_title || '',
    meta_description: meta_description || '',
    og_image: og_image || '',
    tags: tags || [],
    blocks: blocks || [],
    author: author || 'Claude Chief Team',
  };

  if (status === 'published') {
    insertData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('pages')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ page: data }, { status: 201 });
}