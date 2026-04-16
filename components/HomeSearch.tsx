'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';

type TabId = 'all' | 'skills' | 'workflows' | 'mcps' | 'updates' | 'creators';

const RESOURCE_TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'skills', label: 'Skills' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'mcps', label: 'MCPs' },
  { id: 'updates', label: 'Updates' },
  { id: 'creators', label: 'Creators' },
];

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('all');

  useEffect(() => {
    const handleTabClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLButtonElement;
      const tabId = target.dataset.tab as TabId;
      if (!tabId) return;

      setActiveTab(tabId);
      document.querySelectorAll('[data-tab]').forEach(t => {
        t.classList.remove('bg-[var(--color-accent)]', 'text-[var(--color-text-primary)]', 'font-semibold');
        t.classList.add('text-[var(--color-text-secondary)]');
      });
      target.classList.add('bg-[var(--color-accent)]', 'text-[var(--color-text-primary)]', 'font-semibold');
      target.classList.remove('text-[var(--color-text-secondary)]');

      const tabHrefs: Record<TabId, string> = {
        all: '/skills',
        skills: '/skills',
        workflows: '/workflows',
        mcps: '/mcps',
        updates: '/updates',
        creators: '/creators',
      };
      router.push(tabHrefs[tabId]);
    };

    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', handleTabClick as EventListener);
    });

    return () => {
      document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.removeEventListener('click', handleTabClick as EventListener);
      });
    };
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-up animate-delay-300">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills, workflows, MCPs, creators…"
            className="w-full pl-14 pr-32 py-[18px] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_var(--color-accent-glow)] transition-all"
          />
          <button type="submit" className="absolute right-2 btn btn-primary h-11 px-5 text-sm">
            <ArrowRight className="w-4 h-4" />
            Explore
          </button>
        </div>
      </form>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 p-1.5 bg-[var(--color-bg-elevated)] rounded-xl mb-0 overflow-x-auto scrollbar-hide animate-fade-up animate-delay-400">
        {RESOURCE_TABS.map((tab) => (
          <button
            key={tab.id}
            data-tab={tab.id}
            className="px-5 py-2.5 text-sm font-medium rounded-lg text-[var(--color-text-secondary)] transition-all whitespace-nowrap min-h-11 hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeTabs() {
  return null; // Tabs are now inside HomeSearch
}