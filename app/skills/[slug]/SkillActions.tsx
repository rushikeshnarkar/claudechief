'use client';

import { useState } from 'react';
import { ExternalLink, Share2, User } from 'lucide-react';
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
      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">
          Get This Skill
        </h3>
        <div className="space-y-3">
          {skill.source_url ? (
            <a
              href={skill.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center"
            >
              View on {sourceLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
          {skill.asset_file && (
            <DownloadButton
              resourceId={skill.id}
              resourceTitle={skill.title}
              resourceType="skills"
              hasFile={!!skill.asset_file}
            />
          )}
          <SaveButton
            resourceId={skill.id}
            resourceTitle={skill.title}
            resourceType="skill"
          />
        </div>
      </div>

      {/* Share Card */}
      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">
          Share This Skill
        </h3>
        <button
          onClick={handleCopyLink}
          className={`btn w-full justify-center transition-all ${
            copied
              ? 'bg-[rgba(122,154,94,0.15)] text-[var(--color-sage)] border border-[rgba(122,154,94,0.3)]'
              : 'btn-outline'
          }`}
        >
          {copied ? 'Copied!' : (
            <>
              <Share2 className="w-4 h-4" />
              Copy link
            </>
          )}
        </button>
      </div>

      {/* Creator Card */}
      <div className="p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-4">
          Creator
        </h3>
        {skill.creator_link ? (
          <a
            href={skill.creator_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <div className="w-10 h-10 bg-[var(--color-bg-base)] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--color-text-muted)]" />
            </div>
            <span className="font-medium">{skill.creator_name}</span>
          </a>
        ) : (
          <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
            <div className="w-10 h-10 bg-[var(--color-bg-base)] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--color-text-muted)]" />
            </div>
            <span className="font-medium">{skill.creator_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}