'use client';

import { useState } from 'react';
import {
  Zap, Type, LayoutGrid, HelpCircle, BarChart3,
  Quote, Code, Image, Megaphone, Minus, GripVertical,
  ChevronDown, ChevronUp, Trash2, Plus, Pencil, X,
} from 'lucide-react';
import {
  Block, BlockType, BlockContent,
  BLOCK_TYPES, DEFAULT_CONTENT,
  FeatureItem, FAQItem, StatItem,
} from '@/lib/blocks/types';

const BLOCK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Type, LayoutGrid, HelpCircle, BarChart3, Quote, Code, Image, Megaphone, Minus,
};

interface BlockFormProps {
  block: Block;
  index: number;
  onUpdate: (block: Block) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ICON_OPTIONS = ['Zap', 'Type', 'LayoutGrid', 'HelpCircle', 'BarChart3', 'Quote', 'Code', 'Image', 'Megaphone', 'Star', 'Check', 'ArrowRight', 'Globe', 'Shield', 'Rocket', 'Crown'];

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap, Type, LayoutGrid, HelpCircle, BarChart3, Quote, Code, Image, Megaphone, Star: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    Check: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>,
    ArrowRight: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>,
    Globe: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    Shield: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Rocket: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m3.5 11.5 9 3"/><path d="m14.5 6.5 5-5"/><path d="m18.5 10.5-9-3-3 9"/><circle cx="12" cy="12" r="3"/></svg>,
    Crown: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>,
  };
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="input h-9 text-xs">
      {ICON_OPTIONS.map(icon => (
        <option key={icon} value={icon}>{icon}</option>
      ))}
    </select>
  );
}

function HeroForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="input-label">Headline</label>
        <input value={content.headline || ''} onChange={e => onChange({ ...content, headline: e.target.value })} className="input" placeholder="Your compelling headline..." />
      </div>
      <div>
        <label className="input-label">Subheadline</label>
        <input value={content.subheadline || ''} onChange={e => onChange({ ...content, subheadline: e.target.value })} className="input" placeholder="Supporting text..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">CTA Text</label><input value={content.cta_text || ''} onChange={e => onChange({ ...content, cta_text: e.target.value })} className="input" placeholder="Browse Skills" /></div>
        <div><label className="input-label">CTA URL</label><input value={content.cta_url || ''} onChange={e => onChange({ ...content, cta_url: e.target.value })} className="input" placeholder="/skills" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Badge Text</label><input value={content.badge_text || ''} onChange={e => onChange({ ...content, badge_text: e.target.value })} className="input" placeholder="New 2026" /></div>
        <div><label className="input-label">Background Image URL</label><input value={content.background_image || ''} onChange={e => onChange({ ...content, background_image: e.target.value })} className="input" placeholder="https://..." /></div>
      </div>
    </div>
  );
}

function TextForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div><label className="input-label">Heading (H2)</label><input value={content.heading || ''} onChange={e => onChange({ ...content, heading: e.target.value })} className="input" placeholder="Section heading..." /></div>
      <div><label className="input-label">Paragraph</label><textarea value={content.paragraph || ''} onChange={e => onChange({ ...content, paragraph: e.target.value })} className="input resize-none" rows={4} placeholder="Your content..." /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Inline CTA Text</label><input value={content.cta_text_inline || ''} onChange={e => onChange({ ...content, cta_text_inline: e.target.value })} className="input" placeholder="Learn more" /></div>
        <div><label className="input-label">Inline CTA URL</label><input value={content.cta_url_inline || ''} onChange={e => onChange({ ...content, cta_url_inline: e.target.value })} className="input" placeholder="/skills" /></div>
      </div>
    </div>
  );
}

function FeatureGridForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  const items = (content.items || []) as any[];
  const updateItem = (i: number, patch: Partial<FeatureItem>) => {
    const newItems = items.map((item, idx) => idx === i ? { ...item, ...patch } : item);
    onChange({ ...content, items: newItems });
  };
  const addItem = () => onChange({ ...content, items: [...items, { icon: 'Star', title: 'New Feature', description: 'Description here.' }] as BlockContent['items'] });
  const removeItem = (i: number) => onChange({ ...content, items: items.filter((_, idx) => idx !== i) as BlockContent['items'] });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Section Title</label><input value={content.section_title || ''} onChange={e => onChange({ ...content, section_title: e.target.value })} className="input" placeholder="Our Features" /></div>
        <div><label className="input-label">Columns</label>
          <select value={content.columns || 3} onChange={e => onChange({ ...content, columns: parseInt(e.target.value) })} className="input">
            <option value={2}>2 Columns</option><option value={3}>3 Columns</option><option value={4}>4 Columns</option>
          </select>
        </div>
      </div>
      <div><label className="input-label">Section Subtitle</label><input value={content.section_subtitle || ''} onChange={e => onChange({ ...content, section_subtitle: e.target.value })} className="input" placeholder="Supporting text for the section..." /></div>
      <div className="space-y-3 mt-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 p-3 bg-[rgba(54,46,40,0.15)] rounded-lg">
            <IconPicker value={item.icon} onChange={v => updateItem(i, { icon: v })} />
            <div className="flex-1 space-y-2">
              <input value={item.title} onChange={e => updateItem(i, { title: e.target.value })} className="input text-sm" placeholder="Feature title" />
              <textarea value={item.description} onChange={e => updateItem(i, { description: e.target.value })} className="input text-sm resize-none" rows={2} placeholder="Feature description" />
            </div>
            <button onClick={() => removeItem(i)} className="mt-1 p-1 rounded text-[#6B6158] hover:text-red-500"><X className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#D97757] hover:text-[#c2644a]"><Plus className="w-4 h-4" /> Add Feature</button>
      </div>
    </div>
  );
}

function FAQForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  const items = (content.items || []) as any[];
  const updateItem = (i: number, patch: Partial<FAQItem>) => {
    const newItems = items.map((item, idx) => idx === i ? { ...item, ...patch } : item);
    onChange({ ...content, items: newItems });
  };
  const addItem = () => onChange({ ...content, items: [...items, { question: 'New question?', answer: 'Answer here.' }] as BlockContent['items'] });
  const removeItem = (i: number) => onChange({ ...content, items: items.filter((_, idx) => idx !== i) as BlockContent['items'] });

  return (
    <div className="space-y-4">
      <div><label className="input-label">Section Title</label><input value={content.section_title || ''} onChange={e => onChange({ ...content, section_title: e.target.value })} className="input" placeholder="Frequently Asked Questions" /></div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-[rgba(54,46,40,0.15)] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B6158] font-medium">Q{i + 1}</span>
              <button onClick={() => removeItem(i)} className="p-1 rounded text-[#6B6158] hover:text-red-500"><X className="w-4 h-4" /></button>
            </div>
            <input value={item.question} onChange={e => updateItem(i, { question: e.target.value })} className="input text-sm font-medium" placeholder="Question?" />
            <textarea value={item.answer} onChange={e => updateItem(i, { answer: e.target.value })} className="input text-sm resize-none" rows={3} placeholder="Answer..." />
          </div>
        ))}
        <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#D97757] hover:text-[#c2644a]"><Plus className="w-4 h-4" /> Add Question</button>
      </div>
      <p className="text-xs text-[#788C5D] bg-[#788C5D]/10 px-3 py-2 rounded-lg">FAQ blocks auto-generate JSON-LD schema for Google</p>
    </div>
  );
}

function StatsForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  const items = (content.items || []) as any[];
  const updateItem = (i: number, patch: Partial<StatItem>) => {
    const newItems = items.map((item, idx) => idx === i ? { ...item, ...patch } : item);
    onChange({ ...content, items: newItems });
  };
  const addItem = () => onChange({ ...content, items: [...items, { number: '100+', label: 'Items' }] as BlockContent['items'] });
  const removeItem = (i: number) => onChange({ ...content, items: items.filter((_, idx) => idx !== i) as BlockContent['items'] });

  return (
    <div className="space-y-3">
      <div><label className="input-label">Section Title</label><input value={content.stats_section_title || ''} onChange={e => onChange({ ...content, stats_section_title: e.target.value })} className="input" placeholder="By the Numbers" /></div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-[rgba(54,46,40,0.15)] rounded-lg">
            <input value={item.number} onChange={e => updateItem(i, { number: e.target.value })} className="input text-lg font-bold text-[#D97757]" placeholder="1,200+" />
            <input value={item.label} onChange={e => updateItem(i, { label: e.target.value })} className="input flex-1" placeholder="Skills indexed" />
            <button onClick={() => removeItem(i)} className="p-1 rounded text-[#6B6158] hover:text-red-500"><X className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={addItem} className="flex items-center gap-2 text-sm text-[#D97757] hover:text-[#c2644a]"><Plus className="w-4 h-4" /> Add Stat</button>
      </div>
    </div>
  );
}

function TestimonialForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div><label className="input-label">Quote</label><textarea value={content.quote || ''} onChange={e => onChange({ ...content, quote: e.target.value })} className="input resize-none" rows={4} placeholder="What your customer says..." /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Author Name</label><input value={content.author || ''} onChange={e => onChange({ ...content, author: e.target.value })} className="input" placeholder="Alex Chen" /></div>
        <div><label className="input-label">Role / Title</label><input value={content.role || ''} onChange={e => onChange({ ...content, role: e.target.value })} className="input" placeholder="Founder, Acme Inc" /></div>
      </div>
    </div>
  );
}

function CodeForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Title</label><input value={content.title || ''} onChange={e => onChange({ ...content, title: e.target.value })} className="input" placeholder="Example Usage" /></div>
        <div><label className="input-label">Language</label>
          <select value={content.language || 'typescript'} onChange={e => onChange({ ...content, language: e.target.value })} className="input">
            {['typescript', 'javascript', 'python', 'bash', 'json', 'sql', 'html', 'css', 'go', 'rust'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <div><label className="input-label">Code</label><textarea value={content.code || ''} onChange={e => onChange({ ...content, code: e.target.value })} className="input resize-none font-mono text-sm" rows={8} placeholder="// Your code here..." /></div>
    </div>
  );
}

function ImageForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div><label className="input-label">Image URL</label><input value={content.url || ''} onChange={e => onChange({ ...content, url: e.target.value })} className="input" placeholder="https://..." /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Alt Text (SEO)</label><input value={content.alt || ''} onChange={e => onChange({ ...content, alt: e.target.value })} className="input" placeholder="Describe the image" /></div>
        <div><label className="input-label">Layout</label>
          <select value={content.layout || 'full'} onChange={e => onChange({ ...content, layout: e.target.value as 'full' | 'contained' | 'left' | 'right' })} className="input">
            <option value="full">Full Width</option><option value="contained">Contained</option><option value="left">Left Aligned</option><option value="right">Right Aligned</option>
          </select>
        </div>
      </div>
      <div><label className="input-label">Caption (optional)</label><input value={content.caption || ''} onChange={e => onChange({ ...content, caption: e.target.value })} className="input" placeholder="Image attribution or description" /></div>
    </div>
  );
}

function CTABannerForm({ content, onChange }: { content: BlockContent; onChange: (c: BlockContent) => void }) {
  return (
    <div className="space-y-3">
      <div><label className="input-label">Headline</label><input value={content.cta_headline || ''} onChange={e => onChange({ ...content, cta_headline: e.target.value })} className="input" placeholder="Ready to get started?" /></div>
      <div><label className="input-label">Subtext</label><input value={content.cta_subtext || ''} onChange={e => onChange({ ...content, cta_subtext: e.target.value })} className="input" placeholder="Supporting message..." /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="input-label">Button Text</label><input value={content.cta_button_text || ''} onChange={e => onChange({ ...content, cta_button_text: e.target.value })} className="input" placeholder="Get Started" /></div>
        <div><label className="input-label">Button URL</label><input value={content.cta_button_url || ''} onChange={e => onChange({ ...content, cta_button_url: e.target.value })} className="input" placeholder="/skills" /></div>
      </div>
      <div><label className="input-label">Theme</label>
        <select value={content.cta_theme || 'terracotta'} onChange={e => onChange({ ...content, cta_theme: e.target.value as 'terracotta' | 'dark' | 'light' })} className="input">
          <option value="terracotta">Terracotta (Brand Color)</option><option value="dark">Dark</option><option value="light">Light</option>
        </select>
      </div>
    </div>
  );
}

export default function BlockForm({ block, index, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: BlockFormProps) {
  const [expanded, setExpanded] = useState(false);

  const updateContent = (newContent: BlockContent) => {
    onUpdate({ ...block, content: newContent });
  };

  const blockInfo = BLOCK_TYPES.find(b => b.type === block.type);
  const BlockIcon = BLOCK_ICONS[block.type] || Zap;

  return (
    <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[rgba(54,46,40,0.15)] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <GripVertical className="w-4 h-4 text-[#6B6158] cursor-grab" />
        <div className="w-8 h-8 rounded-lg bg-[#D97757]/10 flex items-center justify-center flex-shrink-0">
          <BlockIcon className="w-4 h-4 text-[#D97757]" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-[#F5F0EB]">{blockInfo?.label || block.type}</span>
          <span className="text-xs text-[#6B6158] ml-2">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-1">
          {!isFirst && (
            <button onClick={e => { e.stopPropagation(); onMoveUp(); }} className="p-1.5 rounded text-[#6B6158] hover:text-[#F5F0EB]"><ChevronUp className="w-4 h-4" /></button>
          )}
          {!isLast && (
            <button onClick={e => { e.stopPropagation(); onMoveDown(); }} className="p-1.5 rounded text-[#6B6158] hover:text-[#F5F0EB]"><ChevronDown className="w-4 h-4" /></button>
          )}
          <button onClick={e => { e.stopPropagation(); onDelete(); }} className="p-1.5 rounded text-[#6B6158] hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          {expanded ? <ChevronUp className="w-4 h-4 text-[#6B6158]" /> : <ChevronDown className="w-4 h-4 text-[#6B6158]" />}
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-[rgba(54,46,40,0.3)] pt-4">
          {block.type === 'hero' && <HeroForm content={block.content} onChange={updateContent} />}
          {block.type === 'text' && <TextForm content={block.content} onChange={updateContent} />}
          {block.type === 'feature_grid' && <FeatureGridForm content={block.content} onChange={updateContent} />}
          {block.type === 'faq' && <FAQForm content={block.content} onChange={updateContent} />}
          {block.type === 'stats' && <StatsForm content={block.content} onChange={updateContent} />}
          {block.type === 'testimonial' && <TestimonialForm content={block.content} onChange={updateContent} />}
          {block.type === 'code' && <CodeForm content={block.content} onChange={updateContent} />}
          {block.type === 'image' && <ImageForm content={block.content} onChange={updateContent} />}
          {block.type === 'cta_banner' && <CTABannerForm content={block.content} onChange={updateContent} />}
          {block.type === 'divider' && (
            <p className="text-sm text-[#6B6158]">Divider is a visual separator — no content to edit.</p>
          )}
        </div>
      )}
    </div>
  );
}