'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Zap, Settings2, X, ArrowRight, Command } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SearchResult {
  id: string;
  type: 'skill' | 'workflow' | 'mcp';
  title: string;
  description: string;
  department: string;
  slug: string;
}

const TYPE_META = {
  skill: { icon: Sparkles, color: 'var(--color-accent)', label: 'Skill', path: '/skills' },
  workflow: { icon: Zap, color: 'var(--color-blue)', label: 'Workflow', path: '/workflows' },
  mcp: { icon: Settings2, color: 'var(--color-sage)', label: 'MCP', path: '/mcps' },
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = useRef(createClient());

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    const doSearch = async () => {
      setLoading(true);
      const q = query.toLowerCase().trim();

      const [skills, workflows, mcps] = await Promise.all([
        supabase.current.from('skills').select('id, title, description, department, slug').ilike('title', `%${q}%`).limit(4),
        supabase.current.from('workflows').select('id, title, description, department, slug').ilike('title', `%${q}%`).limit(4),
        supabase.current.from('mcps').select('id, title, description, department, slug').ilike('title', `%${q}%`).limit(4),
      ]);

      if (cancelled) return;

      const combined: SearchResult[] = [
        ...(skills.data ?? []).map((s: any) => ({ ...s, type: 'skill' as const })),
        ...(workflows.data ?? []).map((w: any) => ({ ...w, type: 'workflow' as const })),
        ...(mcps.data ?? []).map((m: any) => ({ ...m, type: 'mcp' as const })),
      ];

      // If no title matches, search description too
      if (combined.length === 0) {
        const [sDesc, wDesc, mDesc] = await Promise.all([
          supabase.current.from('skills').select('id, title, description, department, slug').ilike('description', `%${q}%`).limit(4),
          supabase.current.from('workflows').select('id, title, description, department, slug').ilike('description', `%${q}%`).limit(4),
          supabase.current.from('mcps').select('id, title, description, department, slug').ilike('description', `%${q}%`).limit(4),
        ]);
        if (!cancelled) {
          setResults([
            ...(sDesc.data ?? []).map((s: any) => ({ ...s, type: 'skill' as const })),
            ...(wDesc.data ?? []).map((w: any) => ({ ...w, type: 'workflow' as const })),
            ...(mDesc.data ?? []).map((m: any) => ({ ...m, type: 'mcp' as const })),
          ]);
        }
      } else {
        setResults(combined);
      }

      setLoading(false);
      setSelectedIndex(0);
    };

    const timeout = setTimeout(doSearch, 200);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  // Grouped results for display
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    acc[r.type] = acc[r.type] ?? [];
    acc[r.type].push(r);
    return acc;
  }, {});

  // Flat list for keyboard navigation
  const flatResults = results;
  const maxIndex = flatResults.length - 1;

  const handleKeyNav = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, maxIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
      e.preventDefault();
      const item = flatResults[selectedIndex];
      window.location.href = `${TYPE_META[item.type].path}/${item.slug}`;
      setIsOpen(false);
    }
  }, [selectedIndex, flatResults, maxIndex]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-secondary)] transition-all group"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:flex items-center gap-0.5 ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded group-hover:border-[var(--color-border-hover)]">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[rgba(12,10,8,0.85)] backdrop-blur-sm z-[100] animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[15vh] md:inset-x-auto md:left-1/2 md:top-[20vh] md:-translate-x-1/2 md:w-full md:max-w-2xl z-[101] animate-fade-up">
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-4 px-5 py-4 border-b border-[var(--color-border)]">
            <Search className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyNav}
              placeholder="Search skills, workflows, MCPs, creators…"
              className="flex-1 bg-transparent text-[var(--color-text-primary)] text-base placeholder:text-[var(--color-text-muted)] focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            {loading && (
              <div className="w-4 h-4 border-2 border-[var(--color-text-muted)] border-t-transparent rounded-full animate-spin flex-shrink-0" />
            )}
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[420px] overflow-y-auto">
            {!query && (
              <div className="px-5 py-12 text-center">
                <div className="w-12 h-12 bg-[var(--color-bg-base)] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-[var(--color-text-muted)]" />
                </div>
                <p className="text-[var(--color-text-muted)] text-sm">Type to search across all resources</p>
                <p className="text-[var(--color-text-muted)] text-xs mt-2">
                  Use <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded text-[10px] font-mono">↑↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded text-[10px] font-mono">↵</kbd> to select
                </p>
              </div>
            )}

            {query && !loading && results.length === 0 && (
              <div className="px-5 py-12 text-center">
                <div className="w-12 h-12 bg-[var(--color-bg-base)] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-[var(--color-text-muted)]" />
                </div>
                <p className="text-[var(--color-text-muted)] text-sm">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-[var(--color-text-muted)] text-xs mt-2">Try a different search term</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {(['skill', 'workflow', 'mcp'] as const).map((type) => {
                  const items = grouped[type];
                  if (!items || items.length === 0) return null;
                  const Icon = TYPE_META[type].icon;
                  const color = TYPE_META[type].color;

                  return (
                    <div key={type}>
                      <div className="px-5 py-2 flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
                          {TYPE_META[type].label}s
                        </span>
                      </div>
                      {items.map((item) => {
                        const globalIndex = flatResults.indexOf(item);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <Link
                            key={item.id}
                            href={`${TYPE_META[type].path}/${item.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                              isSelected ? 'bg-[var(--color-bg-surface)]' : 'hover:bg-[var(--color-bg-surface)]'
                            }`}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                            >
                              <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                                {item.title}
                              </div>
                              <div className="text-xs text-[var(--color-text-muted)] truncate">
                                {item.department.charAt(0).toUpperCase() + item.department.slice(1)}
                              </div>
                            </div>
                            {isSelected && (
                              <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded text-[10px] font-mono">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded text-[10px] font-mono">↵</kbd>
                Open
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded text-[10px] font-mono">Esc</kbd>
                Close
              </span>
            </div>
            <span className="text-[var(--color-text-muted)]">Claude Chief</span>
          </div>
        </div>
      </div>
    </>
  );
}