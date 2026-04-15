'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import AdminAuthGate from '@/components/admin/AdminAuthGate';

const TYPES = ['model', 'feature', 'api', 'announcement'];
const IMPACTS = ['low', 'medium', 'high'];

interface Update {
  id: string;
  title: string;
  update_type: string;
  impact_level: string;
  date: string;
  summary: string;
  source_link: string;
  created_at: string;
}

interface UpdateFormData {
  title: string; date: string; update_type: string; impact_level: string;
  summary: string; source_link: string;
}

export default function AdminUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<UpdateFormData>({
    title: '', date: new Date().toISOString().split('T')[0], update_type: 'feature',
    impact_level: 'medium', summary: '', source_link: '',
  });

  const fetchUpdates = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('updates')
      .select('id, title, update_type, impact_level, date, summary, source_link, created_at')
      .order('date', { ascending: false });
    setUpdates(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUpdates(); }, [fetchUpdates]);

  const filtered = updates.filter(u => u.title.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (u: Update) => {
    setEditingId(u.id);
    setForm({ title: u.title, date: u.date, update_type: u.update_type,
      impact_level: u.impact_level, summary: u.summary ?? '', source_link: u.source_link ?? '' });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', date: new Date().toISOString().split('T')[0], update_type: 'feature',
      impact_level: 'medium', summary: '', source_link: '' });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/updates', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => { setSaved(false); setShowForm(false); fetchUpdates(); }, 1200);
      } else {
        alert('Failed to save. Make sure you are signed in as admin.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/updates?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchUpdates();
    else alert('Failed to delete.');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-[#D97757] animate-spin" /></div>;

  return (
    <AdminAuthGate>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Updates</h2>
          <p className="text-[#6B6158] text-sm mt-1">{updates.length} updates total</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4"><Plus className="w-4 h-4" /> Add Update</button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search updates…" className="input pl-11 h-11 text-sm" />
      </div>

      <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(54,46,40,0.4)]">
                {['Title', 'Type', 'Impact', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4"><span className="text-sm font-medium text-[#F5F0EB]">{u.title}</span></td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{u.update_type}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{u.impact_level}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{u.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(u)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(u.id, u.title)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit Update' : 'Add Update'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div><label className="input-label">Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="Claude 3.7 Sonnet Released" required /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="input-label">Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input" /></div>
                <div><label className="input-label">Type</label><select value={form.update_type} onChange={e => setForm({ ...form, update_type: e.target.value })} className="input cursor-pointer">{TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}</select></div>
                <div><label className="input-label">Impact</label><select value={form.impact_level} onChange={e => setForm({ ...form, impact_level: e.target.value })} className="input cursor-pointer">{IMPACTS.map(i => <option key={i} value={i}>{i.charAt(0).toUpperCase() + i.slice(1)}</option>)}</select></div>
              </div>
              <div><label className="input-label">Summary *</label><textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} className="input resize-none" rows={4} placeholder="Key points about this update…" /></div>
              <div><label className="input-label">Source Link</label><input value={form.source_link} onChange={e => setForm({ ...form, source_link: e.target.value })} className="input" placeholder="https://anthropic.com/..." /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} disabled={submitting} className="btn btn-primary text-sm h-10 px-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <><Check className="w-4 h-4" /> Saved!</> : <>{editingId ? 'Update' : 'Add'} Update</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminAuthGate>
  );
}
