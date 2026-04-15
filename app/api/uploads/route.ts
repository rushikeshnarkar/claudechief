import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/authGuard';

// GET — list all files in storage
export async function GET() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: files, error } = await supabase.storage
    .from('assets')
    .list('', { limit: 100 });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get signed URLs for each file (or public URLs)
  const filesWithUrls = await Promise.all(
    (files ?? [])
      .filter(f => f.id && f.name)
      .map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('assets')
          .getPublicUrl(file.name);
        return {
          id: file.id,
          name: file.name,
          created_at: file.created_at,
          updated_at: file.updated_at,
          size: file.metadata?.size ?? 0,
          url: urlData.publicUrl,
        };
      })
  );

  return NextResponse.json({ data: filesWithUrls });
}

// DELETE — delete a file from storage
export async function DELETE(request: Request) {
  await requireAdmin();
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) return NextResponse.json({ error: 'filename required' }, { status: 400 });

  const { error } = await supabase.storage.from('assets').remove([name]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
