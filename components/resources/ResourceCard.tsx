import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { formatNumber, getSourceIcon } from '@/lib/utils';
import type { ResourceType } from '@/types';

interface ResourceCardProps {
  type: ResourceType;
  id: string;
  title: string;
  description: string;
  department: string;
  tier: 'free' | 'elite';
  slug: string;
  creatorName?: string;
  sourceType?: string;
  saveCount?: number;
  timeEstimate?: string;
}

export default function ResourceCard({
  type,
  id,
  title,
  description,
  department,
  tier,
  slug,
  creatorName,
  sourceType,
  saveCount,
  timeEstimate,
}: ResourceCardProps) {
  const href = `/${type}/${slug}`;
  const deptLabel = department.charAt(0).toUpperCase() + department.slice(1);

  return (
    <article className="card card-hover group">
      <Link href={href} className="block h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-1 truncate group-hover:text-[var(--color-terra)] transition-colors">
              {title}
            </h3>
            {creatorName && (
              <p className="text-xs text-[var(--color-text-muted)]">
                by {creatorName}
              </p>
            )}
          </div>

          {/* Save Count */}
          {saveCount !== undefined && (
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
              <Bookmark className="w-3.5 h-3.5" />
              <span>{formatNumber(saveCount)}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Department Badge */}
          <span className="badge badge-dept">{deptLabel}</span>

          {/* Tier Badge */}
          <span className={`badge ${tier === 'free' ? 'badge-free' : 'badge-elite'}`}>
            {tier === 'free' ? 'Free' : 'Elite'}
          </span>

          {/* Source Type */}
          {sourceType && (
            <span className="text-xs text-[var(--color-text-muted)] ml-auto">
              {getSourceIcon(sourceType)} {sourceType}
            </span>
          )}

          {/* Time Estimate */}
          {timeEstimate && (
            <span className="text-xs text-[var(--color-text-muted)]">
              {timeEstimate}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}