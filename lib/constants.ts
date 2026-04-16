import { DepartmentInfo } from '@/types';

export const DEPARTMENTS: DepartmentInfo[] = [
  { name: 'Marketing', slug: 'marketing', description: 'Skills for marketing teams' },
  { name: 'Sales', slug: 'sales', description: 'Skills for sales teams' },
  { name: 'Design', slug: 'design', description: 'Skills for designers' },
  { name: 'Content', slug: 'content', description: 'Skills for content creators' },
  { name: 'Founders', slug: 'founders', description: 'Skills for startup founders' },
  { name: 'Operations', slug: 'operations', description: 'Skills for operations teams' },
  { name: 'Finance', slug: 'finance', description: 'Skills for finance teams' },
  { name: 'Research', slug: 'research', description: 'Skills for researchers' },
];

export const RESOURCE_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Skills', value: 'skills' },
  { label: 'Workflows', value: 'workflows' },
  { label: 'MCPs', value: 'mcps' },
  { label: 'Updates', value: 'updates' },
  { label: 'Creators', value: 'creators' },
] as const;

export const TRUST_ITEMS = [
  { label: 'Free to explore' },
  { label: 'Updated daily' },
  { label: 'Curated by humans' },
] as const;

export const SOURCE_ICONS: Record<string, string> = {
  youtube: '▶',
  github: '⌨',
  blog: '✎',
  twitter: '✈',
  website: '◎',
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://claudechief.com';
export const SITE_NAME = 'Claude Chief';
export const SITE_TAGLINE = 'Best Claude Skills Directory';
export const SITE_DESCRIPTION = 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place so you always know what\'s possible.';

export const HERO_HEADLINE = 'Find the Claude skill, workflow, or MCP for the job.';
export const HERO_SUBLINE = 'A hand-picked library of prompts, agents, and integrations from the people actually using them. No SEO sludge, no AI-generated junk.';

export const NAV_LINKS = [
  { label: 'Skills', href: '/skills' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'MCPs', href: '/mcps' },
  { label: 'News', href: '/updates' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com/claudechief' },
  { label: 'GitHub', href: 'https://github.com/claudechief' },
] as const;

export const FOOTER_LINKS = {
  resources: [
    { label: 'Skills', href: '/skills' },
    { label: 'Workflows', href: '/workflows' },
    { label: 'MCPs', href: '/mcps' },
    { label: 'News', href: '/updates' },
    { label: 'Creators', href: '/creators' },
  ],
  company: [
    { label: 'Blog', href: '/blog' },
    { label: 'Submit a skill', href: '/submit' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};