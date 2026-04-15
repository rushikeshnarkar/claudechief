'use client';

import { useState } from 'react';
import { Download, Loader2, LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface DownloadButtonProps {
  resourceId: string;
  resourceTitle: string;
  resourceType: 'skills' | 'workflows' | 'mcps';
  hasFile: boolean;
}

export default function DownloadButton({ resourceId, resourceTitle, resourceType, hasFile }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    if (!hasFile) return;

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch(`/api/download/${resourceId}?type=${resourceType}`);

      if (res.status === 401) {
        // Not authenticated — redirect to sign in
        window.location.href = '/sign-in?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Download failed');
      }

      const { url } = await res.json();
      // Trigger download by navigating to the signed URL
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Download error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    } finally {
      setLoading(false);
    }
  };

  if (!hasFile) {
    return (
      <button disabled className="btn w-full justify-center opacity-50 cursor-not-allowed" title="No file attached">
        <Download className="w-4 h-4" />
        No file available
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`btn w-full justify-center transition-all ${
        status === 'success'
          ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30'
          : status === 'error'
          ? 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
          : 'btn-primary'
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === 'success' ? (
        'Downloaded!'
      ) : status === 'error' ? (
        'Try again'
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download File
        </>
      )}
    </button>
  );
}
