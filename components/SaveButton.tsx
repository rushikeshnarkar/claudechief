'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Loader2, LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SaveButtonProps {
  resourceId: string;
  resourceTitle: string;
  resourceType: 'skill' | 'workflow' | 'mcp';
  className?: string;
}

export default function SaveButton({ resourceId, resourceTitle, resourceType, className = '' }: SaveButtonProps) {
  const [state, setState] = useState<'loading' | 'saved' | 'unsaved' | 'error'>('loading');
  const supabase = createClient();

  useEffect(() => {
    checkSaved();
  }, [resourceId]);

  const checkSaved = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setState('unsaved'); return; }

    const { data } = await supabase
      .from('saved_resources')
      .select('id')
      .eq('user_id', user.id)
      .eq('resource_id', resourceId)
      .eq('resource_type', resourceType)
      .maybeSingle();

    setState(data ? 'saved' : 'unsaved');
  };

  const handleToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/sign-in?redirect=' + encodeURIComponent(window.location.pathname);
      return;
    }

    if (state === 'saved') {
      setState('loading');
      const res = await fetch(`/api/saved?resource_id=${resourceId}&resource_type=${resourceType}`, {
        method: 'DELETE',
      });
      if (res.ok) setState('unsaved');
      else setState('error');
    } else if (state === 'unsaved') {
      setState('loading');
      const res = await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource_id: resourceId, resource_type: resourceType }),
      });
      if (res.ok || res.status === 409) setState('saved');
      else setState('error');
    }
  };

  if (state === 'loading') {
    return (
      <button disabled className={`btn w-full justify-center opacity-60 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  if (state === 'saved') {
    return (
      <button onClick={handleToggle} className={`btn w-full justify-center bg-[#D97757]/10 text-[#D97757] border border-[#D97757]/30 hover:bg-[#D97757]/20 transition-all ${className}`}>
        <Bookmark className="w-4 h-4 fill-current" />
        Saved
      </button>
    );
  }

  return (
    <button onClick={handleToggle} className={`btn btn-outline w-full justify-center ${className}`}>
      <Bookmark className="w-4 h-4" />
      Save for later
    </button>
  );
}
