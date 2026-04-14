'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, ExternalLink } from 'lucide-react';

// Mock data — replace with Supabase queries
const SKILLS = [
  { id: '1', title: 'LinkedIn Content System', department: 'Marketing', tier: 'free', saves: 1247, source_type: 'github', creator: 'Alex Chen', created_at: '2026-03-15' },
  { id: '2', title: 'Cold Email Writer Pro', department: 'Sales', tier: 'free', saves: 892, source_type: 'youtube', creator: 'Alex Chen', created_at: '2026-03-12' },
  { id: '3', title: 'UI Design Critic', department: 'Design', tier: 'free', saves: 654, source_type: 'github', creator: 'Lisa Park', created_at: '2026-03-10' },
  { id: '4', title: 'Content Repurposing Engine', department: 'Content', tier: 'elite', saves: 2310, source_type: 'youtube', creator: 'Sarah Mitchell', created_at: '2026-03-08' },
  { id: '5', title: 'Pitch Deck Generator', department: 'Founders', tier: 'free', saves: 1812, source_type: 'github', creator: 'Alex Chen', created_at: '2026-03-05' },
  { id: '6', title: 'Market Research Analyst', department: 'Research', tier: 'elite', saves: 1430, source_type: 'blog', creator: 'Emily Watson', created_at: '2026-03-01' },
];

const DEPARTMENTS = ['Marketing', 'Sales', 'Design', 'Content', 'Founders', 'Operations', 'Finance', 'Research'];
const TIERS = ['free', 'elite'];
const SOURCES = ['github', 'youtube', 'blog', 'twitter'];

interface SkillFormData {
  title: string; description: string; department: string; tier: string;
  source_type: string; source_url: string; creator_name: string; creator_link: string;
  prompt_preview: string;
}

export default function AdminSkillsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SkillFormData>({
    title: '', description: '', department: 'Marketing', tier: 'free',
    source_type: 'github', source_url: '', creator_name: '', creator_link: '',
    prompt_preview: '',
  });
  const [saved, setSaved] = useState(false);

  const filtered = SKILLS.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (skill: typeof SKILLS[0]) => {
    setEditingId(skill.id);
    setForm({
      title: skill.title, description: '', department: skill.department,
      tier: skill.tier, source_type: skill.source_type, source_url: '',
      creator_name: skill.creator, creator_link: '', prompt_preview: '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', description: '', department: 'Marketing', tier: 'free',
      source_type: 'github', source_url: '', creator_name: '', creator_link: '', prompt_preview: '' });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Skills</h2>
          <p className="text-[#6B6158] text-sm mt-1">{SKILLS.length} skills total</p>
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
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-[#F5F0EB]">{skill.title}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{skill.department}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                      skill.tier === 'free'
                        ? 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'
                        : 'bg-[rgba(201,134,42,0.12)] text-[#C9862A]'
                    }`}>
                      {skill.tier}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{skill.saves.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92] capitalize">{skill.source_type}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{skill.creator}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(skill)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all">
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
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(54,46,40,0.4)]">
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">
                {editingId ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                <label className="input-label">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="LinkedIn Content System" required />
              </div>
              <div>
                <label className="input-label">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input resize-none" rows={3} placeholder="A brief description of this skill…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Department</label>
                  <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="input cursor-pointer">
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
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

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary text-sm h-10 px-4">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : <>{editingId ? 'Update Skill' : 'Add Skill'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
