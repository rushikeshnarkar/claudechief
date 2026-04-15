'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, Search, Loader2, FileText, Download, ExternalLink, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import AdminAuthGate from '@/components/admin/AdminAuthGate';

interface StoredFile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  size: number;
  url: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function AdminUploadsPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/uploads');
    if (res.ok) {
      const { data } = await res.json();
      setFiles(data ?? []);
    } else {
      const body = await res.json();
      setError(body.error || 'Failed to load files');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '-')}`;

    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
    } else {
      fetchFiles();
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(name);
    const res = await fetch(`/api/uploads?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    if (res.ok) {
      setFiles(files => files.filter(f => f.name !== name));
    } else {
      const body = await res.json();
      alert(`Delete failed: ${body.error}`);
    }
    setDeleting(null);
  };

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <AdminAuthGate>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight">Uploads</h2>
          <p className="text-[#6B6158] text-sm mt-1">
            {files.length} files · {formatBytes(totalSize)} total
          </p>
        </div>
        <label className="btn btn-primary text-sm h-10 px-4 flex items-center gap-2 cursor-pointer">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          Upload File
          <input
            type="file"
            className="hidden"
            accept="*/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-xl text-sm text-[#EF4444]">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6158]" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search files…"
          className="input pl-11 h-11 text-sm"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#D97757] animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-[#131118] rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-[#6B6158]" />
          </div>
          <p className="text-[#A99E92] mb-2">No files uploaded yet</p>
          <p className="text-[#6B6158] text-sm">Upload files from the admin panels for skills, workflows, or MCPs.</p>
        </div>
      ) : (
        <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(54,46,40,0.4)]">
                  {['File', 'Size', 'Uploaded', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#6B6158] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(54,46,40,0.3)]">
                {filtered.map(file => (
                  <tr key={file.name} className="hover:bg-[rgba(54,46,40,0.1)] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#131118] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-[#6B6158]" />
                        </div>
                        <span className="text-sm font-medium text-[#F5F0EB] truncate max-w-xs font-mono">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#A99E92]">{formatBytes(file.size)}</td>
                    <td className="px-5 py-4 text-sm text-[#A99E92]">
                      {new Date(file.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-[#6B6158] hover:text-[#D97757] hover:bg-[rgba(217,119,87,0.08)] transition-all"
                          title="Open file"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={file.url}
                          download={file.name}
                          className="p-2 rounded-lg text-[#6B6158] hover:text-[#4ADE80] hover:bg-[rgba(74,222,128,0.08)] transition-all"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(file.name)}
                          disabled={deleting === file.name}
                          className="p-2 rounded-lg text-[#6B6158] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.08)] transition-all"
                          title="Delete file"
                        >
                          {deleting === file.name ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </AdminAuthGate>
  );
}
