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
        t.classList.remove('active');
      });
      target.classList.add('active');

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
    <div className="search-container">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrap">
          <div className="search-icon-wrap">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search skills, workflows, MCPs, creators…"
            className="search-input-field"
          />
          <button type="submit" className="search-btn">
            <Search className="w-4 h-4" />
            Explore
          </button>
        </div>
      </form>

      {/* Tab navigation */}
      <div className="search-tabs">
        {RESOURCE_TABS.map((tab) => (
          <button
            key={tab.id}
            data-tab={tab.id}
            className={`search-tab ${activeTab === tab.id ? 'active' : ''}`}
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
