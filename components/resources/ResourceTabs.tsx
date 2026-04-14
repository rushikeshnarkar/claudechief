'use client';

import { RESOURCE_TABS } from '@/lib/constants';

interface ResourceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ResourceTabs({ activeTab, onTabChange }: ResourceTabsProps) {
  return (
    <div className="tab-list" role="tablist" aria-label="Resource types">
      {RESOURCE_TABS.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeTab === tab.value}
          aria-controls={`${tab.value}-panel`}
          onClick={() => onTabChange(tab.value)}
          className={`tab-item ${activeTab === tab.value ? 'active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}