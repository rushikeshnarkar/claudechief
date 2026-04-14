import { DepartmentInfo } from '@/types';

export const DEPARTMENTS: DepartmentInfo[] = [
  { name: 'Marketing', slug: 'marketing', count: 142, description: 'Skills for marketing teams' },
  { name: 'Sales', slug: 'sales', count: 98, description: 'Skills for sales teams' },
  { name: 'Design', slug: 'design', count: 76, description: 'Skills for designers' },
  { name: 'Content', slug: 'content', count: 187, description: 'Skills for content creators' },
  { name: 'Founders', slug: 'founders', count: 63, description: 'Skills for startup founders' },
  { name: 'Operations', slug: 'operations', count: 54, description: 'Skills for operations teams' },
  { name: 'Finance', slug: 'finance', count: 41, description: 'Skills for finance teams' },
  { name: 'Research', slug: 'research', count: 88, description: 'Skills for researchers' },
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
export const HERO_HEADLINE = 'Claude is changing everything. Are you keeping up?';
export const HERO_SUBLINE = 'Stop hunting across YouTube, GitHub, and Twitter. Claude Chief brings every skill, workflow, MCP, update, and creator into one curated place so you always know what\'s possible.';

export const NAV_LINKS = [
  { label: 'Skills', href: '/skills' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'MCPs', href: '/mcps' },
  { label: 'Updates', href: '/updates' },
  { label: 'Creators', href: '/creators' },
  { label: 'Blog', href: '/blog' },
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
    { label: 'Updates', href: '/updates' },
    { label: 'Creators', href: '/creators' },
  ],
  company: [
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
