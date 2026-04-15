import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET — list user's saved resources
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('saved_resources')
    .select('resource_type, resource_id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST — save a resource
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { resource_type, resource_id } = body;

  if (!resource_type || !resource_id) {
    return NextResponse.json({ error: 'resource_type and resource_id are required' }, { status: 400 });
  }

  if (!['skill', 'workflow', 'mcp'].includes(resource_type)) {
    return NextResponse.json({ error: 'Invalid resource_type' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('saved_resources')
    .insert([{ user_id: user.id, resource_type, resource_id }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already saved' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

// DELETE — unsave a resource
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const resource_id = searchParams.get('resource_id');
  const resource_type = searchParams.get('resource_type');

  if (!resource_id || !resource_type) {
    return NextResponse.json({ error: 'resource_id and resource_type are required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('saved_resources')
    .delete()
    .eq('user_id', user.id)
    .eq('resource_id', resource_id)
    .eq('resource_type', resource_type);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
