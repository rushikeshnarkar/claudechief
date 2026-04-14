'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';

const CREATORS = [
  { id: '1', name: 'Alex Chen', platform: 'Twitter', focus: 'Claude Skills & Workflows', resources: 24, followers: '45K', profile_url: 'https://twitter.com/alexchen' },
  { id: '2', name: 'Sarah Mitchell', platform: 'YouTube', focus: 'Claude for Business', resources: 18, followers: '28K', profile_url: 'https://youtube.com/@sarahmitchell' },
  { id: '3', name: 'Marcus Rodriguez', platform: 'GitHub', focus: 'Developer Tools & MCPs', resources: 42, followers: '12K', profile_url: 'https://github.com/marcusrodriguez' },
  { id: '4', name: 'Emily Watson', platform: 'Blog', focus: 'AI Productivity', resources: 31, followers: '15K', profile_url: 'https://emilywatson.ai' },
  { id: '5', name: 'David Kim', platform: 'Twitter', focus: 'Claude Marketing', resources: 19, followers: '32K', profile_url: 'https://twitter.com/davidkim' },
];

const PLATFORMS = ['Twitter', 'YouTube', 'GitHub', 'Blog', 'Website'];

interface CreatorFormData {
  name: string; platform: string; focus: string; bio: string;
  profile_url: string; follower_count: string;
}

export default function AdminCreatorsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreatorFormData>({
    name: '', platform: 'Twitter', focus: '', bio: '', profile_url: '', follower_count: '',
  });
  const [saved, setSaved] = useState(false);

  const filtered = CREATORS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.platform.toLowerCase().includes(search.toLowerCase())
  );

  const PLATFORM_COLORS: Record<string, string> = {
    Twitter: '#38A3FF', YouTube: '#FF3B30', GitHub: '#F5F0EB', Blog: '#4ADE80',
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ name: '', platform: 'Twitter', focus: '', bio: '', profile_url: '', follower_count: '' });
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
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Creators</h2>
          <p className="text-[#6B6158] text-sm mt-1">{CREATORS.length} creators tracked</p>
        </div>
        <button onClick={handleNew} className="btn btn-primary text-sm h-10 px-4">
          <Plus className="w-4 h-4" /> Add Creator
        </button>
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
                {['Name', 'Platform', 'Focus', 'Followers', 'Resources', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-[#F5F0EB]">{c.name}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium" style={{ color: PLATFORM_COLORS[c.platform] || '#A99E92' }}>{c.platform}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{c.focus}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{c.followers}</td>
                  <td className="px-5 py-4 text-sm text-[#A99E92]">{c.resources}</td>
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
              <h3 className="font-display text-lg font-bold text-[#F5F0EB]">{editingId ? 'Edit Creator' : 'Add New Creator'}</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div><label className="input-label">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input" placeholder="Alex Chen" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Platform</label><select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="input cursor-pointer">{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                <div><label className="input-label">Followers</label><input value={form.follower_count} onChange={e => setForm({ ...form, follower_count: e.target.value })} className="input" placeholder="45K" /></div>
              </div>
              <div><label className="input-label">Focus Area</label><input value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} className="input" placeholder="Claude Skills & Workflows" /></div>
              <div><label className="input-label">Bio</label><textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="input resize-none" rows={3} placeholder="Short bio about this creator…" /></div>
              <div><label className="input-label">Profile URL</label><input value={form.profile_url} onChange={e => setForm({ ...form, profile_url: e.target.value })} className="input" placeholder="https://twitter.com/..." /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[rgba(54,46,40,0.4)]">
              <button onClick={() => setShowForm(false)} className="btn btn-outline text-sm h-10 px-4">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary text-sm h-10 px-4">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : editingId ? 'Update' : 'Add Creator'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
