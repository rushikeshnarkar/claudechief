'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const PLATFORMS = ['twitter', 'youtube', 'github', 'blog', 'linkedin', 'newsletter'];

interface Creator {
  id: string;
  name: string;
  platform: string;
  focus_area: string;
  follower_count: number;
  profile_url: string;
  created_at: string;
}

interface CreatorFormData {
  name: string; platform: string; focus_area: string;
  profile_url: string; follower_count: string; best_resources: string;
}

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<CreatorFormData>({
    name: '', platform: 'twitter', focus_area: '', profile_url: '', follower_count: '', best_resources: '',
  });

  const fetchCreators = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('creators')
      .select('id, name, platform, focus_area, follower_count, profile_url, created_at')
      .order('created_at', { ascending: false });
    setCreators(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCreators(); }, [fetchCreators]);

  const filtered = creators.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.focus_area.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (creator: Creator) => {
    setEditingId(creator.id);
    setForm({
      name: creator.name, platform: creator.platform, focus_area: creator.focus_area,
      profile_url: creator.profile_url, follower_count: String(creator.follower_count), best_resources: '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ name: '', platform: 'twitter', focus_area: '', profile_url: '', follower_count: '', best_resources: '' });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        ...form,
        follower_count: parseInt(form.follower_count) || 0,
        best_resources: form.best_resources ? form.best_resources.split('\n').filter(Boolean) : [],
      };
      const res = await fetch('/api/creators', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...body }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => { setSaved(false); setShowForm(false); fetchCreators(); }, 1200);
      } else {
        alert('Failed to save. Make sure you are signed in as admin.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/creators?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchCreators();
    else alert('Failed to delete.');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-[#D97757] animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Creators</h2>
          <p className="text-[#6B6158] text-sm mt-1">{creators.length} creators total</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4"><Plus className="w-4 h-4" /> Add Creator</button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search creators…" className="input pl-11 h-11 text-sm" />
      </div>

      <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(54,46,40,0.4)]">
                {['Name', 'Platform', 'Focus Area', 'Followers', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
              {filtered.map(creator => (
                <tr key={creator.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4"><span className="text-sm font-medium text-[#F5F0EB]">{creator.name}</span></td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{creator.platform}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{creator.focus_area}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{creator.follower_count.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(creator)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(creator.id, creator.name)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#1A1720] border border-[rgba(54,46,40,0.5)] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(54,46,40,0.4)]">
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit Creator' : 'Add Creator'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input" placeholder="Alex Chen" required /></div>
                <div><label className="input-label">Platform</label><select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="input cursor-pointer">{PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}</select></div>
              </div>
              <div><label className="input-label">Focus Area</label><input value={form.focus_area} onChange={e => setForm({ ...form, focus_area: e.target.value })} className="input" placeholder="Claude Skills & Workflows" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Profile URL</label><input value={form.profile_url} onChange={e => setForm({ ...form, profile_url: e.target.value })} className="input" placeholder="https://twitter.com/..." /></div>
                <div><label className="input-label">Follower Count</label><input type="number" value={form.follower_count} onChange={e => setForm({ ...form, follower_count: e.target.value })} className="input" placeholder="45000" /></div>
              </div>
              <div><label className="input-label">Best Resources (one per line)</label><textarea value={form.best_resources} onChange={e => setForm({ ...form, best_resources: e.target.value })} className="input resize-none font-mono text-sm" rows={4} placeholder="LinkedIn Content System&#10;Cold Email Writer Pro" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} disabled={submitting} className="btn btn-primary text-sm h-10 px-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <><Check className="w-4 h-4" /> Saved!</> : <>{editingId ? 'Update' : 'Add'} Creator</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
