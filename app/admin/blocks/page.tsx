'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Eye, X, Check, Loader2, FileText } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import AdminAuthGate from '@/components/admin/AdminAuthGate';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  page_type: string;
  status: string;
  excerpt: string;
  tags: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function PageTable() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    const supabase = createClient();
    let query = supabase
      .from('pages')
      .select('id, title, slug, page_type, status, excerpt, tags, published_at, created_at, updated_at')
      .order('updated_at', { ascending: false });
    if (typeFilter) query = query.eq('page_type', typeFilter);
    if (statusFilter) query = query.eq('status', statusFilter);
    const { data } = await query;
    setPages(data ?? []);
    setLoading(false);
  }, [typeFilter, statusFilter]);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/blocks/${id}`, { method: 'DELETE' });
    if (res.ok) fetchPages();
    else alert('Failed to delete.');
    setDeletingId(null);
  };

  const handleToggleStatus = async (page: PageItem) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    const res = await fetch(`/api/blocks/${page.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchPages();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-[#D97757] animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Content Blocks</h2>
          <p className="text-[#6B6158] text-sm mt-1">{pages.length} pages total</p>
        </div>
        <Link href="/admin/blocks/new" className="btn btn-primary text-sm h-10 px-4">
          <Plus className="w-4 h-4" /> New Page
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pages..."
            className="input pl-11 h-11 text-sm"
          />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input h-11 text-sm">
          <option value="">All Types</option>
          <option value="blog">Blog</option>
          <option value="landing">Landing</option>
          <option value="resource">Resource</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input h-11 text-sm">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-12 h-12 text-[#6B6158] mb-4" />
            <p className="text-[#A99E92] mb-2">No pages found</p>
            <Link href="/admin/blocks/new" className="btn btn-primary text-sm h-10 px-4">
              <Plus className="w-4 h-4" /> Create your first page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(54,46,40,0.4)]">
                  {['Title', 'Slug', 'Type', 'Status', 'Updated', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
                {filtered.map(page => (
                  <tr key={page.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-[#F5F0EB]">{page.title}</span>
                      {page.excerpt && <p className="text-xs text-[#6B6158] mt-0.5 truncate max-w-xs">{page.excerpt}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-mono text-[#A99E92]">/{page.slug}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        page.page_type === 'blog' ? 'bg-[#D97757]/10 text-[#D97757]' :
                        page.page_type === 'landing' ? 'bg-[#788C5D]/10 text-[#788C5D]' :
                        'bg-[#C9862A]/10 text-[#C9862A]'
                      }`}>
                        {page.page_type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(page)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                          page.status === 'published'
                            ? 'bg-[#788C5D]/10 text-[#788C5D] hover:bg-[#788C5D]/20'
                            : 'bg-[rgba(54,46,40,0.3)] text-[#6B6158] hover:bg-[rgba(54,46,40,0.5)]'
                        }`}
                      >
                        {page.status === 'published' ? (
                          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Published</span>
                        ) : 'Draft'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#6B6158]">
                      {new Date(page.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {page.status === 'published' && (
                          <a
                            href={`/blog/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-[#6B6158] hover:text-[#788C5D] hover:bg-[rgba(120,140,93,0.08)] transition-all"
                            title="View live"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`/admin/blocks/${page.id}`}
                          className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id, page.title)}
                          disabled={deletingId === page.id}
                          className="p-2 rounded-lg text-[#6B6158] hover:text-red-500 hover:bg-[rgba(239,68,68,0.08)] transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === page.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminBlocksPage() {
  return (
    <AdminAuthGate>
      <PageTable />
    </AdminAuthGate>
  );
}