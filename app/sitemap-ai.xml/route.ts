import { createClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DEPARTMENTS, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = SITE_URL;
  const supabase = await createClient();

  // Blog posts from markdown files
  let blogPosts: Array<{ slug: string; date: string }> = [];
  try {
    const postsDir = path.join(process.cwd(), 'content/blog');
    const files = fs.readdirSync(postsDir);
    blogPosts = files
      .filter((f) => f.endsWith('.md'))
      .map((filename) => {
        const slug = filename.replace(/\.md$/, '');
        const { data } = matter(fs.readFileSync(path.join(postsDir, filename), 'utf8'));
        return { slug, date: (data.date as string) ?? new Date().toISOString() };
      });
  } catch {
    // no blog posts yet
  }

  const [skillsRes, workflowsRes, mcpsRes, updatesRes, creatorsRes] = await Promise.all([
    supabase.from('skills').select('slug, title, department, description, created_at'),
    supabase.from('workflows').select('slug, title, department, description, created_at'),
    supabase.from('mcps').select('slug, title, connected_service, department, description, created_at'),
    supabase.from('updates').select('slug, title, update_type, summary, created_at'),
    supabase.from('creators').select('slug, name, platform, focus_area'),
  ]);

  const skills = skillsRes.data ?? [];
  const workflows = workflowsRes.data ?? [];
  const mcps = mcpsRes.data ?? [];
  const updates = updatesRes.data ?? [];
  const creators = creatorsRes.data ?? [];

  const urls: Array<{ loc: string; lastmod: string; priority: number }> = [
    { loc: baseUrl, lastmod: new Date().toISOString(), priority: 1.0 },
    { loc: `${baseUrl}/skills`, lastmod: new Date().toISOString(), priority: 0.95 },
    { loc: `${baseUrl}/workflows`, lastmod: new Date().toISOString(), priority: 0.95 },
    { loc: `${baseUrl}/mcps`, lastmod: new Date().toISOString(), priority: 0.95 },
    { loc: `${baseUrl}/creators`, lastmod: new Date().toISOString(), priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString(), priority: 0.9 },
    ...blogPosts.map((p) => ({
      loc: `${baseUrl}/blog/${p.slug}`,
      lastmod: new Date(p.date).toISOString(),
      priority: 0.9,
    })),
    ...DEPARTMENTS.map((d) => ({
      loc: `${baseUrl}/${d.slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.85,
    })),
    ...skills.map((s) => ({
      loc: `${baseUrl}/skills/${s.slug}`,
      lastmod: s.created_at ? new Date(s.created_at).toISOString() : new Date().toISOString(),
      priority: 0.9,
    })),
    ...workflows.map((w) => ({
      loc: `${baseUrl}/workflows/${w.slug}`,
      lastmod: w.created_at ? new Date(w.created_at).toISOString() : new Date().toISOString(),
      priority: 0.9,
    })),
    ...mcps.map((m) => ({
      loc: `${baseUrl}/mcps/${m.slug}`,
      lastmod: m.created_at ? new Date(m.created_at).toISOString() : new Date().toISOString(),
      priority: 0.9,
    })),
    ...updates.map((u) => ({
      loc: `${baseUrl}/updates/${u.slug}`,
      lastmod: u.created_at ? new Date(u.created_at).toISOString() : new Date().toISOString(),
      priority: 0.7,
    })),
    ...creators.map((c) => ({
      loc: `${baseUrl}/creators/${c.slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:ai="https://schemas.ai.com/sitemap">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${new Date(u.lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
