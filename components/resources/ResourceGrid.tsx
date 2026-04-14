'use client';

import { useState } from 'react';
import ResourceCard from './ResourceCard';
import ResourceTabs from './ResourceTabs';
import DepartmentGrid from './DepartmentGrid';
import type { SearchResult, ResourceType } from '@/types';

interface ResourceGridProps {
  initialResults?: SearchResult[];
  showDepartmentGrid?: boolean;
}

export default function ResourceGrid({
  initialResults = [],
  showDepartmentGrid = false,
}: ResourceGridProps) {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demo purposes (will be replaced with real Supabase data)
  const mockSkills = [
    {
      type: 'skills' as ResourceType,
      id: '1',
      title: 'LinkedIn Content System',
      description: 'A comprehensive prompt system for creating engaging LinkedIn content with Claude. Generate viral posts in minutes.',
      department: 'marketing' as const,
      tier: 'free' as const,
      slug: 'linkedin-content-system',
      creatorName: 'Alex Chen',
      sourceType: 'github',
      saveCount: 1247,
    },
    {
      type: 'skills' as ResourceType,
      id: '2',
      title: 'Cold Email Writer Pro',
      description: 'Generate personalized cold emails at scale. Perfect for sales teams looking to automate outreach.',
      department: 'sales' as const,
      tier: 'free' as const,
      slug: 'cold-email-writer-pro',
      creatorName: 'Sarah Miller',
      sourceType: 'youtube',
      saveCount: 892,
    },
    {
      type: 'skills' as ResourceType,
      id: '3',
      title: 'UI Design Critic',
      description: 'Get expert design feedback on your UI mockups. Upload a screenshot and get detailed critique.',
      department: 'design' as const,
      tier: 'free' as const,
      slug: 'ui-design-critic',
      creatorName: 'Jordan Lee',
      sourceType: 'github',
      saveCount: 654,
    },
    {
      type: 'skills' as ResourceType,
      id: '4',
      title: 'Content Repurposing Engine',
      description: 'Transform one piece of content into 20+ variations for different platforms automatically.',
      department: 'content' as const,
      tier: 'elite' as const,
      slug: 'content-repurposing-engine',
      creatorName: 'Emma Wilson',
      sourceType: 'blog',
      saveCount: 2341,
    },
    {
      type: 'skills' as ResourceType,
      id: '5',
      title: 'Pitch Deck Generator',
      description: 'Create compelling pitch decks for investors. Input your company details and get a professional deck.',
      department: 'founders' as const,
      tier: 'free' as const,
      slug: 'pitch-deck-generator',
      creatorName: 'Mike Johnson',
      sourceType: 'github',
      saveCount: 1876,
    },
    {
      type: 'skills' as ResourceType,
      id: '6',
      title: 'Meeting Notes Summarizer',
      description: 'Automatically summarize meeting notes, extract action items, and share with your team.',
      department: 'operations' as const,
      tier: 'free' as const,
      slug: 'meeting-notes-summarizer',
      creatorName: 'Lisa Park',
      sourceType: 'github',
      saveCount: 543,
    },
    {
      type: 'skills' as ResourceType,
      id: '7',
      title: 'Financial Analysis Assistant',
      description: 'Analyze financial statements, generate insights, and create comprehensive reports.',
      department: 'finance' as const,
      tier: 'elite' as const,
      slug: 'financial-analysis-assistant',
      creatorName: 'David Kim',
      sourceType: 'blog',
      saveCount: 412,
    },
    {
      type: 'skills' as ResourceType,
      id: '8',
      title: 'Research Paper Summarizer',
      description: 'Summarize academic papers, extract key findings, and generate literature reviews.',
      department: 'research' as const,
      tier: 'free' as const,
      slug: 'research-paper-summarizer',
      creatorName: 'Dr. Anna Smith',
      sourceType: 'github',
      saveCount: 789,
    },
  ];

  const mockWorkflows = [
    {
      type: 'workflows' as ResourceType,
      id: '9',
      title: 'Automated Content Pipeline',
      description: 'A complete workflow for generating, editing, and publishing content automatically using Claude + Notion.',
      department: 'content' as const,
      tier: 'free' as const,
      slug: 'automated-content-pipeline',
      creatorName: 'TechFlow',
      sourceType: 'youtube',
      saveCount: 1567,
      timeEstimate: '15 min',
    },
    {
      type: 'workflows' as ResourceType,
      id: '10',
      title: 'Sales Outreach Automation',
      description: 'Automate your entire sales outreach process from prospecting to follow-up emails.',
      department: 'sales' as const,
      tier: 'elite' as const,
      slug: 'sales-outreach-automation',
      creatorName: 'GrowthLab',
      sourceType: 'github',
      saveCount: 934,
      timeEstimate: '30 min',
    },
  ];

  const mockMCPs = [
    {
      type: 'mcps' as ResourceType,
      id: '11',
      title: 'Filesystem MCP',
      description: 'Access and manipulate the local filesystem directly from Claude. Read, write, and organize files.',
      department: 'operations' as const,
      tier: 'free' as const,
      slug: 'filesystem-mcp',
      creatorName: 'Anthropic',
      sourceType: 'github',
      saveCount: 3421,
    },
    {
      type: 'mcps' as ResourceType,
      id: '12',
      title: 'Slack MCP',
      description: 'Connect Claude to Slack for sending messages, reading channels, and managing notifications.',
      department: 'operations' as const,
      tier: 'free' as const,
      slug: 'slack-mcp',
      creatorName: 'Anthropic',
      sourceType: 'github',
      saveCount: 2156,
    },
  ];

  const mockUpdates = [
    {
      type: 'updates' as ResourceType,
      id: '13',
      title: 'Claude 3.7 Released',
      description: 'Anthropic releases Claude 3.7 with extended thinking, better reasoning, and improved coding capabilities.',
      department: 'research' as const,
      tier: 'free' as const,
      slug: 'claude-3-7-released',
      creatorName: 'Anthropic',
      saveCount: 0,
    },
  ];

  const mockCreators = [
    {
      type: 'creators' as ResourceType,
      id: '14',
      title: 'Alex Chen',
      description: 'Building AI-powered products. Creator of popular Claude skills for marketing and content.',
      department: 'marketing' as const,
      tier: 'free' as const,
      slug: 'alex-chen',
      creatorName: 'Alex Chen',
      saveCount: 0,
    },
  ];

  const allItems = [...mockSkills, ...mockWorkflows, ...mockMCPs, ...mockUpdates, ...mockCreators];
  const filteredItems =
    activeTab === 'all'
      ? allItems
      : allItems.filter((item) => item.type === activeTab);

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <ResourceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Department Grid (only on homepage) */}
      {showDepartmentGrid && <DepartmentGrid />}

      {/* Resource Grid */}
      <div
        role="tabpanel"
        id={`${activeTab}-panel`}
        aria-label={`${activeTab} resources`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fadeUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ResourceCard
                type={item.type}
                id={item.id}
                title={item.title}
                description={item.description}
                department={item.department}
                tier={item.tier}
                slug={item.slug}
                creatorName={'creatorName' in item ? item.creatorName : undefined}
                sourceType={'sourceType' in item ? item.sourceType : undefined}
                saveCount={'saveCount' in item ? item.saveCount : undefined}
                timeEstimate={'timeEstimate' in item ? item.timeEstimate : undefined}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-muted)] text-lg">
              No resources found in this category yet.
            </p>
            <p className="text-[var(--color-text-muted)] text-sm mt-2">
              Check back soon or browse other categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}