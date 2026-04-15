// Block type definitions for the CMS

export type BlockType =
  | 'hero'
  | 'text'
  | 'feature_grid'
  | 'faq'
  | 'stats'
  | 'testimonial'
  | 'code'
  | 'image'
  | 'cta_banner'
  | 'divider';

export type BlockContent = {
  // Hero
  headline?: string;
  subheadline?: string;
  cta_text?: string;
  cta_url?: string;
  badge_text?: string;
  background_image?: string;

  // Text
  heading?: string;
  paragraph?: string;
  cta_text_inline?: string;
  cta_url_inline?: string;

  // Feature Grid & FAQ & Stats share items
  section_title?: string;
  section_subtitle?: string;
  stats_section_title?: string;
  columns?: number;

  // Mixed items array — components cast as needed
  items?: FeatureItem[] | FAQItem[] | StatItem[] | any[];

  // Testimonial
  quote?: string;
  author?: string;
  role?: string;

  // Code
  title?: string;
  language?: string;
  code?: string;

  // Image
  url?: string;
  alt?: string;
  caption?: string;
  layout?: 'full' | 'contained' | 'left' | 'right';

  // CTA Banner
  cta_headline?: string;
  cta_subtext?: string;
  cta_button_text?: string;
  cta_button_url?: string;
  cta_theme?: 'terracotta' | 'dark' | 'light';
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  page_type: 'blog' | 'landing' | 'resource';
  status: 'draft' | 'published';
  excerpt: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  tags: string[];
  blocks: Block[];
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const BLOCK_TYPES: { type: BlockType; label: string; description: string; icon: string }[] = [
  { type: 'hero', label: 'Hero', description: 'Full-width headline + CTA', icon: 'Zap' },
  { type: 'text', label: 'Text', description: 'Heading + paragraph', icon: 'Type' },
  { type: 'feature_grid', label: 'Feature Grid', description: 'Cards with icons', icon: 'LayoutGrid' },
  { type: 'faq', label: 'FAQ', description: 'Accordion Q&A (auto schema)', icon: 'HelpCircle' },
  { type: 'stats', label: 'Stats', description: 'Big numbers + labels', icon: 'BarChart3' },
  { type: 'testimonial', label: 'Testimonial', description: 'Quote block', icon: 'Quote' },
  { type: 'code', label: 'Code', description: 'Syntax highlighted', icon: 'Code' },
  { type: 'image', label: 'Image', description: 'Image with caption', icon: 'Image' },
  { type: 'cta_banner', label: 'CTA Banner', description: 'Call to action strip', icon: 'Megaphone' },
  { type: 'divider', label: 'Divider', description: 'Visual separator', icon: 'Minus' },
];

export const DEFAULT_CONTENT: Record<BlockType, BlockContent> = {
  hero: { headline: 'Your Headline Here', subheadline: '', cta_text: '', cta_url: '', badge_text: '', background_image: '' },
  text: { heading: '', paragraph: '', cta_text_inline: '', cta_url_inline: '' },
  feature_grid: { section_title: '', section_subtitle: '', columns: 3, items: [{ icon: 'Star', title: 'Feature Title', description: 'Feature description goes here.' }, { icon: 'Star', title: 'Feature Title', description: 'Feature description goes here.' }, { icon: 'Star', title: 'Feature Title', description: 'Feature description goes here.' }] },
  faq: { items: [{ question: 'What is this?', answer: 'Answer goes here.' }] },
  stats: { stats_section_title: '', items: [{ number: '100+', label: 'Items' }, { number: '50+', label: 'Users' }] },
  testimonial: { quote: '', author: '', role: '' },
  code: { title: 'Code Example', language: 'typescript', code: '' },
  image: { url: '', alt: '', caption: '', layout: 'full' },
  cta_banner: { cta_headline: '', cta_subtext: '', cta_button_text: '', cta_button_url: '', cta_theme: 'terracotta' },
  divider: {},
};