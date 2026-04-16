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
        t.classList.remove('tab-active');
      });
      target.classList.add('tab-active');

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
    <div className="max-w-xl mx-auto">
      {/* Search bar — premium glassmorphism */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-5 w-5 h-5 flex items-center justify-center pointer-events-none">
            <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
          </div>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills, workflows, MCPs, creators…"
            className="w-full pl-14 pr-32 py-[18px] bg-[rgba(20,18,16,0.8)] backdrop-blur-lg border border-[var(--color-border)] rounded-2xl text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_1px_rgba(196,99,58,0.3),0_0_30px_rgba(196,99,58,0.1)] transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-all min-h-11"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Explore</span>
          </button>
        </div>
      </form>

      {/* Tab navigation */}
      <div className="flex gap-1.5 p-1.5 bg-[rgba(20,18,16,0.6)] backdrop-blur-lg rounded-xl mt-3 overflow-x-auto scrollbar-hide">
        {RESOURCE_TABS.map((tab) => (
          <button
            key={tab.id}
            data-tab={tab.id}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap min-h-10 flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-[var(--color-accent)] text-[var(--color-text-primary)] font-semibold shadow-[0_4px_12px_rgba(196,99,58,0.2)]'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomeTabs() {
  return null;
}
