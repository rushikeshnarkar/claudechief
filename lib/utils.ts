import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getSourceIcon(sourceType: string): string {
  const icons: Record<string, string> = {
    youtube: '▶',
    github: '⌨',
    blog: '✎',
    twitter: '✈',
    website: '◎',
  };
  return icons[sourceType] || '◎';
}

export function getDepartmentColor(dept: string): string {
  const colors: Record<string, string> = {
    marketing: 'terracotta',
    sales: 'amber',
    design: 'blue',
    content: 'sage',
    founders: 'terra',
    operations: 'ink',
    finance: 'amber',
    research: 'blue',
  };
  return colors[dept] || 'terracotta';
}
