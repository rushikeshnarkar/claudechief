import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { DEPARTMENTS, SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Fetch slugs from all content tables for dynamic pages
  const supabase = await createClient();

  const [skillsRes, workflowsRes, mcpsRes, updatesRes, creatorsRes] = await Promise.all([
    supabase.from('skills').select('slug, updated_at'),
    supabase.from('workflows').select('slug, updated_at'),
    supabase.from('mcps').select('slug, updated_at'),
    supabase.from('updates').select('slug, created_at'),
    supabase.from('creators').select('slug'),
  ]);

  const skills = skillsRes.data ?? [];
  const workflows = workflowsRes.data ?? [];
  const mcps = mcpsRes.data ?? [];
  const updates = updatesRes.data ?? [];
  const creators = creatorsRes.data ?? [];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcps`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/creators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  // Department pages
  const departmentPages: MetadataRoute.Sitemap = DEPARTMENTS.map((dept) => ({
    url: `${baseUrl}/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Detail pages (dynamic, fetched from DB)
  const skillPages: MetadataRoute.Sitemap = skills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.slug}`,
    lastModified: skill.updated_at ? new Date(skill.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const workflowPages: MetadataRoute.Sitemap = workflows.map((wf) => ({
    url: `${baseUrl}/workflows/${wf.slug}`,
    lastModified: wf.updated_at ? new Date(wf.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const mcpPages: MetadataRoute.Sitemap = mcps.map((mcp) => ({
    url: `${baseUrl}/mcps/${mcp.slug}`,
    lastModified: mcp.updated_at ? new Date(mcp.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const updatePages: MetadataRoute.Sitemap = updates.map((update) => ({
    url: `${baseUrl}/updates/${update.slug}`,
    lastModified: update.created_at ? new Date(update.created_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const creatorPages: MetadataRoute.Sitemap = creators.map((creator) => ({
    url: `${baseUrl}/creators/${creator.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...departmentPages,
    ...skillPages,
    ...workflowPages,
    ...mcpPages,
    ...updatePages,
    ...creatorPages,
  ];
}
