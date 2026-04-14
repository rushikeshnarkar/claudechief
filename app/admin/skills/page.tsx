'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, ExternalLink, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const DEPARTMENTS = ['marketing', 'sales', 'design', 'content', 'founders', 'operations', 'finance', 'research'];
const TIERS = ['free', 'elite'];
const SOURCES = ['github', 'youtube', 'blog', 'twitter', 'website'];

interface Skill {
  id: string;
  title: string;
  department: string;
  tier: string;
  save_count: number;
  source_type: string;
  creator_name: string;
  created_at: string;
}

interface SkillFormData {
  title: string; description: string; department: string; tier: string;
  source_type: string; source_url: string; creator_name: string; creator_link: string;
  prompt_preview: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<SkillFormData>({
    title: '', description: '', department: 'marketing', tier: 'free',
    source_type: 'github', source_url: '', creator_name: '', creator_link: '', prompt_preview: '',
  });

  const fetchSkills = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('skills')
      .select('id, title, department, tier, save_count, source_type, creator_name, created_at')
      .order('created_at', { ascending: false });
    setSkills(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  const filtered = skills.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setForm({
      title: skill.title, description: '', department: skill.department,
      tier: skill.tier, source_type: skill.source_type, source_url: '',
      creator_name: skill.creator_name, creator_link: '', prompt_preview: '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', description: '', department: 'marketing', tier: 'free',
      source_type: 'github', source_url: '', creator_name: '', creator_link: '', prompt_preview: '' });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => { setSaved(false); setShowForm(false); fetchSkills(); }, 1200);
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
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    if (res.ok) fetchSkills();
    else alert('Failed to delete. Make sure you are signed in as admin.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#D97757] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Skills</h2>
          <p className="text-[#6B6158] text-sm mt-1">{skills.length} skills total</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills…"
          className="input pl-11 h-11 text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(54,46,40,0.4)]">
                {['Title', 'Department', 'Tier', 'Saves', 'Source', 'Creator', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
              {filtered.map(skill => (
                <tr key={skill.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4"><span className="text-sm font-medium text-[#F5F0EB]">{skill.title}</span></td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{skill.department}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                      skill.tier === 'free'
                        ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'
                        : 'bg-[rgba(201,134,42,0.12)] text-[#C9862A]'
                    }`}>
                      {skill.tier}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{skill.save_count.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{skill.source_type}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{skill.creator_name}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(skill)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(skill.id, skill.title)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#1A1720] border border-[rgba(54,46,40,0.5)] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(54,46,40,0.4)]">
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="input-label">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="LinkedIn Content System" required />
              </div>
              <div>
                <label className="input-label">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input resize-none" rows={3} placeholder="A brief description…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Department</label>
                  <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="input cursor-pointer">
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Tier</label>
                  <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })} className="input cursor-pointer">
                    {TIERS.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Source Type</label>
                  <select value={form.source_type} onChange={e => setForm({ ...form, source_type: e.target.value })} className="input cursor-pointer">
                    {SOURCES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Source URL</label>
                  <input value={form.source_url} onChange={e => setForm({ ...form, source_url: e.target.value })} className="input" placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Creator Name</label>
                  <input value={form.creator_name} onChange={e => setForm({ ...form, creator_name: e.target.value })} className="input" placeholder="Alex Chen" />
                </div>
                <div>
                  <label className="input-label">Creator Link</label>
                  <input value={form.creator_link} onChange={e => setForm({ ...form, creator_link: e.target.value })} className="input" placeholder="https://twitter.com/..." />
                </div>
              </div>
              <div>
                <label className="input-label">Prompt Preview</label>
                <textarea value={form.prompt_preview} onChange={e => setForm({ ...form, prompt_preview: e.target.value })} className="input resize-none font-mono text-sm" rows={4} placeholder="Create a LinkedIn post about [TOPIC] that follows..." />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} disabled={submitting} className="btn btn-primary text-sm h-10 px-4">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <><Check className="w-4 h-4" /> Saved!</> : <>{editingId ? 'Update Skill' : 'Add Skill'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
