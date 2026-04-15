'use client';

import { useState } from 'react';
import { ExternalLink, Bookmark, User, Calendar, Share2, Star, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import DownloadButton from '@/components/DownloadButton';
import SaveButton from '@/components/SaveButton';

interface SkillActionsProps {
  skill: any;
  sourceLabel: string;
}

export function SkillActions({ skill, sourceLabel }: SkillActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Action Card */}
      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
          Get this skill
        </h3>
        <div className="space-y-3">
          {skill.source_url ? (
            <a
              href={skill.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full justify-center"
            >
              View on {sourceLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
          <DownloadButton
            resourceId={skill.id}
            resourceTitle={skill.title}
            resourceType="skills"
            hasFile={!!skill.asset_file}
          />
          <SaveButton
            resourceId={skill.id}
            resourceTitle={skill.title}
            resourceType="skill"
          />
        </div>
      </div>

      {/* Share Card */}
      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
          Share this skill
        </h3>
        <button
          onClick={handleCopyLink}
          className={`btn w-full justify-center transition-all ${
            copied
              ? 'bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30'
              : 'btn-outline'
          }`}
        >
          {copied ? (
            'Copied!'
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Copy link
            </>
          )}
        </button>
      </div>

      {/* Creator Card */}
      <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] backdrop-blur-xl">
        <h3 className="font-body font-semibold text-[#F5F0EB] text-sm mb-4">
          Creator
        </h3>
        {skill.creator_link ? (
          <a
            href={skill.creator_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors"
          >
            <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center text-lg">
              <User className="w-5 h-5 text-[#6B6158]" />
            </div>
            <span className="font-medium">{skill.creator_name}</span>
          </a>
        ) : (
          <div className="flex items-center gap-3 text-[#A99E92]">
            <div className="w-10 h-10 bg-[#131118] rounded-full flex items-center justify-center text-lg">
              <User className="w-5 h-5 text-[#6B6158]" />
            </div>
            <span className="font-medium">{skill.creator_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
