import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/download/[id]?type=skills|workflows|mcps
// Validates auth, increments save_count, and returns a signed download URL
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'skills';

  // Validate type to prevent SQL injection via table name
  const validTypes = ['skills', 'workflows', 'mcps'];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  // ── Auth check ────────────────────────────────────────────────
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Sign in required to download', requiresAuth: true },
      { status: 401 }
    );
  }

  // ── Fetch the record to get asset_file ─────────────────────────
  const { data: record, error: fetchError } = await supabase
    .from(type)
    .select('id, title, asset_file')
    .eq('id', id)
    .single();

  if (fetchError || !record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!record.asset_file) {
    return NextResponse.json({ error: 'No file attached to this resource' }, { status: 404 });
  }

  // ── Increment save_count ───────────────────────────────────────
  await supabase
    .from(type)
    .update({ save_count: (record as any).save_count + 1 || 1 })
    .eq('id', id);

  // ── Generate a signed URL (valid 5 minutes) ───────────────────
  const { data: signedUrl, error: signError } = await supabase.storage
    .from('assets')
    .createSignedUrl(record.asset_file, 300, {
      download: sanitizeFilename(record.title),
    });

  if (signError || !signedUrl) {
    return NextResponse.json(
      { error: 'Could not generate download link' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    url: signedUrl.signedUrl,
    filename: record.asset_file,
  });
}

function sanitizeFilename(title: string): string {
  return `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-claudechief.zip`;
}
