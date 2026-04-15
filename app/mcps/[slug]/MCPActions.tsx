'use client';

import { useState } from 'react';
import { ExternalLink, Bookmark, User, Share2 } from 'lucide-react';
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
      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Install this MCP</h3>
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

      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Share this MCP</h3>
        <button onClick={handleCopyLink} className={`btn w-full justify-center ${copied ? 'bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30' : 'btn-outline'}`}>
          {copied ? 'Copied!' : <><Share2 className="w-4 h-4" /> Copy link</>}
        </button>
      </div>

      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">Creator</h3>
        {mcp.creator_link ? (
          <a href={mcp.creator_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors">
            <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#6B6158]" />
            </div>
            <span className="font-medium">{mcp.creator_name}</span>
          </a>
        ) : (
          <div className="flex items-center gap-3 text-[#A99E92]">
            <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#6B6158]" />
            </div>
            <span className="font-medium">{mcp.creator_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
