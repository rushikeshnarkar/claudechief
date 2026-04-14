'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';

const UPDATES = [
  { id: '1', title: 'Claude 3.7 Sonnet Released', type: 'model', impact: 'high', date: '2026-04-10' },
  { id: '2', title: 'MCP SDK v2.0 Launch', type: 'feature', impact: 'medium', date: '2026-03-28' },
  { id: '3', title: 'Claude API Rate Limits Increased', type: 'api', impact: 'medium', date: '2026-03-15' },
  { id: '4', title: 'New Claude.ai Features', type: 'feature', impact: 'high', date: '2026-03-01' },
  { id: '5', title: 'Claude for Business Announcement', type: 'product', impact: 'high', date: '2026-02-20' },
];

const TYPES = ['model', 'feature', 'api', 'product', 'open-source'];
const IMPACTS = ['low', 'medium', 'high'];

interface UpdateFormData {
  title: string; description: string; type: string; impact: string;
  summary: string; source_url: string; date: string;
}

export default function AdminUpdatesPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UpdateFormData>({
    title: '', description: '', type: 'feature', impact: 'medium',
    summary: '', source_url: '', date: new Date().toISOString().split('T')[0],
  });
  const [saved, setSaved] = useState(false);

  const filtered = UPDATES.filter(u =>
    u.title.toLowerCase().includes(search.toLowerCase()) || u.type.toLowerCase().includes(search.toLowerCase())
  );

  const IMPACT_COLORS: Record<string, string> = { low: 'text-[#788C5D]', medium: 'text-[#C9862A]', high: 'text-[#D97757]' };
  const TYPE_COLORS: Record<string, string> = {
    model: 'text-[#D97757]', feature: 'text-[#6A9BCC]',
    api: 'text-[#4ADE80]', product: 'text-[#C9862A]', 'open-source': 'text-[#788C5D]',
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', description: '', type: 'feature', impact: 'medium',
      summary: '', source_url: '', date: new Date().toISOString().split('T')[0] });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Updates</h2>
          <p className="text-[#6B6158] text-sm mt-1">{UPDATES.length} updates tracked</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4">
          <Plus className="w-4 h-4" /> Add Update
        </button>
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
                  <td className="px-5 py-4 text-sm font-medium text-[#F5F0EB]">{u.title}</td>
                  <td className="px-5 py-4 text-sm capitalize" style={{ color: TYPE_COLORS[u.type] || '#A99E92' }}>{u.type}</td>
                  <td className="px-5 py-4 text-sm capitalize" style={{ color: IMPACT_COLORS[u.impact] || '#A99E92' }}>{u.impact}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{new Date(u.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"><Pencil className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit Update' : 'Add New Update'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div><label className="input-label">Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="Claude 3.7 Sonnet Released" required /></div>
              <div><label className="input-label">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input resize-none" rows={2} /></div>
              <div><label className="input-label">Summary</label><textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} className="input resize-none" rows={3} placeholder="Key details about this update…" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="input-label">Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="input cursor-pointer">{TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="input-label">Impact</label><select value={form.impact} onChange={e => setForm({ ...form, impact: e.target.value })} className="input cursor-pointer">{IMPACTS.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
                <div><label className="input-label">Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input" /></div>
              </div>
              <div><label className="input-label">Source URL</label><input value={form.source_url} onChange={e => setForm({ ...form, source_url: e.target.value })} className="input" placeholder="https://anthropic.com/news/..." /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary text-sm h-10 px-4">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : editingId ? 'Update' : 'Add Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
