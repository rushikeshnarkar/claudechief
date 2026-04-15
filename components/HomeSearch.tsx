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
    // Init first tab as active
    const btn = document.querySelector('[data-tab="all"]') as HTMLButtonElement | null;
    if (btn) btn.classList.add('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
    else document.querySelector('[data-tab="all"]')?.classList.add('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');

    const handleTabClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLButtonElement;
      const tabId = target.dataset.tab as TabId;
      if (!tabId) return;

      setActiveTab(tabId);
      document.querySelectorAll('[data-tab]').forEach(t => {
        t.classList.remove('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
        t.classList.add('text-[#A99E92]');
      });
      target.classList.add('bg-[#D97757]', 'text-[#F5F0EB]', 'font-semibold');
      target.classList.remove('text-[#A99E92]');

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
    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6 animate-fadeUp animate-delay-3">
      <div className="relative flex items-center">
        <Search className="absolute left-5 w-5 h-5 text-[#6B6158] pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search skills, workflows, MCPs, creators…"
          className="w-full pl-14 pr-32 py-[18px] bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[18px] text-base text-[#F5F0EB] placeholder:text-[#6B6158] backdrop-blur-xl focus:outline-none focus:border-[#D97757] focus:shadow-[0_0_0_4px_rgba(217,119,87,0.12)] transition-all"
        />
        <button type="submit" className="absolute right-2 btn btn-primary h-11 px-5 text-sm">
          <ArrowRight className="w-4 h-4" />
          Explore
        </button>
      </div>
    </form>
  );
}

export function HomeTabs() {
  return (
    <div className="flex gap-1.5 p-1.5 bg-[#131118] rounded-xl mb-10 overflow-x-auto scrollbar-hide animate-fadeUp">
      {RESOURCE_TABS.map((tab) => (
        <button
          key={tab.id}
          data-tab={tab.id}
          className="px-5 py-2.5 text-sm font-medium rounded-lg text-[#A99E92] transition-all whitespace-nowrap min-h-11 hover:bg-[rgba(54,46,40,0.3)]"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
