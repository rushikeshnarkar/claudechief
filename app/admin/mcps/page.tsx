'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const DEPARTMENTS = ['marketing', 'sales', 'design', 'content', 'founders', 'operations', 'finance', 'research'];
const DIFFICULTIES = ['easy', 'medium', 'advanced'];

interface MCP {
  id: string;
  title: string;
  connected_service: string;
  setup_difficulty: string;
  save_count: number;
  creator_name: string;
  created_at: string;
}

interface MCPFormData {
  title: string; connected_service: string; setup_difficulty: string;
  install_link: string; department: string; tier: string; creator_name: string;
  use_cases: string;
}

export default function AdminMCPsPage() {
  const [mcps, setMcps] = useState<MCP[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<MCPFormData>({
    title: '', connected_service: '', setup_difficulty: 'easy',
    install_link: '', department: 'research', tier: 'free', creator_name: '', use_cases: '',
  });

  const fetchMCPs = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('mcps')
      .select('id, title, connected_service, setup_difficulty, save_count, creator_name, created_at')
      .order('created_at', { ascending: false });
    setMcps(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMCPs(); }, [fetchMCPs]);

  const filtered = mcps.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.connected_service.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (mcp: MCP) => {
    setEditingId(mcp.id);
    setForm({
      title: mcp.title, connected_service: mcp.connected_service, setup_difficulty: mcp.setup_difficulty,
      install_link: '', department: 'research', tier: 'free', creator_name: mcp.creator_name, use_cases: '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', connected_service: '', setup_difficulty: 'easy',
      install_link: '', department: 'research', tier: 'free', creator_name: '', use_cases: '' });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        ...form,
        use_cases: form.use_cases ? form.use_cases.split('\n').filter(Boolean) : [],
      };
      const res = await fetch('/api/mcps', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...body }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => { setSaved(false); setShowForm(false); fetchMCPs(); }, 1200);
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
    const res = await fetch(`/api/mcps?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchMCPs();
    else alert('Failed to delete.');
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-[#D97757] animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">MCPs</h2>
          <p className="text-[#6B6158] text-sm mt-1">{mcps.length} MCPs total</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4"><Plus className="w-4 h-4" /> Add MCP</button>
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
              {filtered.map(mcp => (
                <tr key={mcp.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4"><span className="text-sm font-medium text-[#F5F0EB]">{mcp.title}</span></td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{mcp.connected_service}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{mcp.setup_difficulty}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{(mcp.save_count ?? 0).toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{mcp.creator_name}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(mcp)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(mcp.id, mcp.title)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit MCP' : 'Add MCP'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div><label className="input-label">Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="GitHub MCP" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Connected Service</label><input value={form.connected_service} onChange={e => setForm({ ...form, connected_service: e.target.value })} className="input" placeholder="GitHub" /></div>
                <div><label className="input-label">Setup Difficulty</label><select value={form.setup_difficulty} onChange={e => setForm({ ...form, setup_difficulty: e.target.value })} className="input cursor-pointer">{DIFFICULTIES.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Department</label><select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="input cursor-pointer">{DEPARTMENTS.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}</select></div>
                <div><label className="input-label">Creator Name</label><input value={form.creator_name} onChange={e => setForm({ ...form, creator_name: e.target.value })} className="input" placeholder="Anthropic" /></div>
              </div>
              <div><label className="input-label">Install Link</label><input value={form.install_link} onChange={e => setForm({ ...form, install_link: e.target.value })} className="input" placeholder="https://github.com/..." /></div>
              <div><label className="input-label">Use Cases (one per line)</label><textarea value={form.use_cases} onChange={e => setForm({ ...form, use_cases: e.target.value })} className="input resize-none font-mono text-sm" rows={4} placeholder="Review pull requests&#10;Manage issues&#10;Search codebases" /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} disabled={submitting} className="btn btn-primary text-sm h-10 px-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <><Check className="w-4 h-4" /> Saved!</> : <>{editingId ? 'Update' : 'Add'} MCP</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
