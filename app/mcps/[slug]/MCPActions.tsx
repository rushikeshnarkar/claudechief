'use client';

import { useState } from 'react';
import { ExternalLink, Share2, User } from 'lucide-react';
import SaveButton from '@/components/SaveButton';

interface MCPActionsProps {
  mcp: any;
}

export function MCPActions({ mcp }: MCPActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">Install This MCP</h3>
        {mcp.install_link ? (
          <a href={mcp.install_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
            View on GitHub <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <button className="btn btn-primary w-full justify-center opacity-50 cursor-not-allowed">
            No install link available
          </button>
        )}
        <SaveButton resourceId={mcp.id} resourceTitle={mcp.title} resourceType="mcp" className="mt-3" />
      </div>

      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">Share This MCP</h3>
        <button onClick={handleCopyLink} className={`btn w-full justify-center transition-all ${copied ? 'bg-[rgba(122,154,94,0.15)] text-[var(--color-sage)] border border-[rgba(122,154,94,0.3)]' : 'btn-outline'}`}>
          {copied ? 'Copied!' : (<><Share2 className="w-4 h-4" /> Copy link</>)}
        </button>
      </div>

      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">Creator</h3>
        {mcp.creator_name && (
          <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
            <div className="w-10 h-10 bg-[var(--color-bg-base)] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--color-text-muted)]" />
            </div>
            <span className="font-medium">{mcp.creator_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}