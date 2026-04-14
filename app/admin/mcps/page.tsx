'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';

const MCPS = [
  { id: '1', title: 'Filesystem MCP', service: 'Local System', tier: 'free', saves: 3210, difficulty: 'Beginner', creator: 'Marcus Rodriguez', created_at: '2026-02-01' },
  { id: '2', title: 'GitHub MCP', service: 'GitHub', tier: 'free', saves: 2847, difficulty: 'Intermediate', creator: 'Anthropic', created_at: '2026-02-15' },
  { id: '3', title: 'Slack MCP', service: 'Slack', tier: 'free', saves: 1934, difficulty: 'Beginner', creator: 'Marcus Rodriguez', created_at: '2026-03-01' },
  { id: '4', title: 'Sequential Thinking MCP', service: 'Anthropic', tier: 'free', saves: 4102, difficulty: 'Beginner', creator: 'Anthropic', created_at: '2026-03-10' },
  { id: '5', title: 'PostgreSQL MCP', service: 'PostgreSQL', tier: 'free', saves: 1220, difficulty: 'Advanced', creator: 'Marcus Rodriguez', created_at: '2026-03-15' },
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

interface MCPFormData {
  title: string; description: string; service: string; difficulty: string;
  install_command: string; creator_name: string; source_url: string;
}

export default function AdminMCPsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MCPFormData>({
    title: '', description: '', service: '', difficulty: 'Beginner',
    install_command: '', creator_name: '', source_url: '',
  });
  const [saved, setSaved] = useState(false);

  const filtered = MCPS.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) || m.service.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', description: '', service: '', difficulty: 'Beginner',
      install_command: '', creator_name: '', source_url: '' });
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
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">MCPs</h2>
          <p className="text-[#6B6158] text-sm mt-1">{MCPS.length} MCPs total</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4">
          <Plus className="w-4 h-4" /> Add MCP
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search MCPs…" className="input pl-11 h-11 text-sm" />
      </div>

      <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(54,46,40,0.4)]">
                {['Title', 'Service', 'Difficulty', 'Saves', 'Creator', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-[#F5F0EB]">{m.title}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{m.service}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{m.difficulty}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{m.saves.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{m.creator}</td>
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
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit MCP' : 'Add New MCP'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div><label className="input-label">Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="Filesystem MCP" required /></div>
              <div><label className="input-label">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input resize-none" rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Connected Service</label><input value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="input" placeholder="GitHub" /></div>
                <div><label className="input-label">Difficulty</label><select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="input cursor-pointer">{DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              </div>
              <div><label className="input-label">Install Command</label><input value={form.install_command} onChange={e => setForm({ ...form, install_command: e.target.value })} className="input font-mono text-sm" placeholder="npx @modelcontextprotocol/server-filesystem" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Creator Name</label><input value={form.creator_name} onChange={e => setForm({ ...form, creator_name: e.target.value })} className="input" /></div>
                <div><label className="input-label">Source URL</label><input value={form.source_url} onChange={e => setForm({ ...form, source_url: e.target.value })} className="input" /></div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary text-sm h-10 px-4">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : editingId ? 'Update' : 'Add MCP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
