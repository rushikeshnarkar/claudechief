'use client';

import { Block, BlockContent } from '@/lib/blocks/types';
import {
  Zap, Type, LayoutGrid, HelpCircle, BarChart3,
  Quote, Code, Image, Megaphone, Minus,
} from 'lucide-react';

const BLOCK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Type, LayoutGrid, HelpCircle, BarChart3, Quote, Code, Image, Megaphone, Minus,
};

export function HeroBlock({ content }: { content: BlockContent }) {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[#0D0B09]">
      {content.background_image && (
        <div className="absolute inset-0 opacity-20">
          <img src={content.background_image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B09]/60 to-[#0D0B09]" />
        </div>
      )}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {content.badge_text && (
          <span className="inline-block mb-6 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[#D97757]/20 text-[#D97757] rounded-full">
            {content.badge_text}
          </span>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0EB] tracking-tight leading-[1.1] mb-6">
          {content.headline}
        </h1>
        {content.subheadline && (
          <p className="text-lg md:text-xl text-[#A99E92] leading-relaxed max-w-2xl mx-auto mb-8">
            {content.subheadline}
          </p>
        )}
        {content.cta_text && content.cta_url && (
          <a
            href={content.cta_url}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D97757] text-white font-semibold rounded-xl hover:bg-[#c2644a] transition-all hover:-translate-y-0.5"
          >
            {content.cta_text}
            <Zap className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  );
}

export function TextBlock({ content }: { content: BlockContent }) {
  return (
    <section className="py-12 md:py-16 bg-[#0D0B09]">
      <div className="max-w-3xl mx-auto px-6">
        {content.heading && (
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F5F0EB] tracking-tight mb-4">
            {content.heading}
          </h2>
        )}
        {content.paragraph && (
          <p className="text-[#A99E92] text-base md:text-lg leading-relaxed mb-4">
            {content.paragraph}
          </p>
        )}
        {content.cta_text_inline && content.cta_url_inline && (
          <a
            href={content.cta_url_inline}
            className="inline-flex items-center gap-1 text-[#D97757] font-medium hover:text-[#c2644a] transition-colors"
          >
            {content.cta_text_inline}
            <Zap className="w-3 h-3" />
          </a>
        )}
      </div>
    </section>
  );
}

export function FeatureGridBlock({ content }: { content: BlockContent }) {
  const cols = content.columns || 3;
  const gridClass = cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : cols === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  return (
    <section className="py-16 bg-[#0D0B09]">
      <div className="max-w-6xl mx-auto px-6">
        {content.section_title && (
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3 text-center">
            {content.section_title}
          </h2>
        )}
        {content.section_subtitle && (
          <p className="text-[#6B6158] text-center mb-12 max-w-xl mx-auto">{content.section_subtitle}</p>
        )}
        <div className={`grid ${gridClass} gap-6`}>
          {(content.items || []).map((item, i) => {
            const IconComp = BLOCK_ICONS[item.icon] || Zap;
            return (
              <div key={i} className="group p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-2xl hover:border-[#D97757]/40 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#D97757]/10 flex items-center justify-center mb-4">
                  <IconComp className="w-5 h-5 text-[#D97757]" />
                </div>
                <h3 className="font-semibold text-[#F5F0EB] mb-2">{item.title}</h3>
                <p className="text-sm text-[#A99E92] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQBlock({ content }: { content: BlockContent }) {
  const items = content.items || [];
  return (
    <section className="py-16 bg-[#0D0B09]">
      <div className="max-w-3xl mx-auto px-6">
        {content.section_title && (
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3 text-center">
            {content.section_title}
          </h2>
        )}
        {content.section_subtitle && (
          <p className="text-[#6B6158] text-center mb-12">{content.section_subtitle}</p>
        )}
        <div className="space-y-3">
          {items.map((item, i) => (
            <details key={i} className="group bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-[#F5F0EB] font-medium">
                {item.question}
                <span className="text-[#D97757] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-4 text-[#A99E92] text-sm leading-relaxed border-t border-[rgba(54,46,40,0.4)] pt-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBlock({ content }: { content: BlockContent }) {
  return (
    <section className="py-16 bg-[rgba(19,17,24,0.88)] border-y border-[rgba(54,46,40,0.4)]">
      <div className="max-w-5xl mx-auto px-6">
        {content.stats_section_title && (
          <h2 className="font-display text-2xl font-bold text-[#F5F0EB] tracking-tight mb-10 text-center">
            {content.stats_section_title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {(content.items || []).map((item, i) => (
            <div key={i}>
              <div className="font-display text-4xl md:text-5xl font-bold text-[#D97757] mb-2">{item.number}</div>
              <div className="text-sm text-[#A99E92] uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialBlock({ content }: { content: BlockContent }) {
  return (
    <section className="py-16 bg-[#0D0B09]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-8 text-[#D97757]">
          <Quote className="w-12 h-12 mx-auto opacity-50" />
        </div>
        <blockquote className="font-display text-xl md:text-2xl font-semibold text-[#F5F0EB] tracking-tight leading-relaxed mb-8 italic">
          &ldquo;{content.quote}&rdquo;
        </blockquote>
        {(content.author || content.role) && (
          <div className="text-[#A99E92]">
            <span className="text-[#F5F0EB] font-semibold">{content.author}</span>
            {content.role && <span className="text-[#6B6158]"> — {content.role}</span>}
          </div>
        )}
      </div>
    </section>
  );
}

export function CodeBlock({ content }: { content: BlockContent }) {
  return (
    <section className="py-12 bg-[#0D0B09]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#1A1720] border border-[rgba(54,46,40,0.5)] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(54,46,40,0.4)]">
            <span className="text-xs text-[#6B6158] font-mono">{content.language}</span>
            <button
              onClick={() => navigator.clipboard.writeText(content.code || '')}
              className="text-xs text-[#6B6158] hover:text-[#D97757] transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="p-5 overflow-x-auto">
            <code className="text-sm font-mono text-[#A99E92] whitespace-pre">{content.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export function ImageBlock({ content }: { content: BlockContent }) {
  const isFullWidth = content.layout === 'full';
  return (
    <section className="py-12 bg-[#0D0B09]">
      <div className={`max-w-6xl mx-auto px-6 ${isFullWidth ? '' : 'max-w-4xl'}`}>
        <figure>
          <img
            src={content.url}
            alt={content.alt || ''}
            className={`w-full rounded-2xl ${isFullWidth ? '' : 'max-w-2xl mx-auto'}`}
          />
          {content.caption && (
            <figcaption className="mt-3 text-sm text-[#6B6158] text-center">{content.caption}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

export function CTABannerBlock({ content }: { content: BlockContent }) {
  const isDark = content.cta_theme === 'dark';
  const isLight = content.cta_theme === 'light';
  return (
    <section className={`py-12 ${isDark ? 'bg-[#1A1720]' : isLight ? 'bg-[#F5F0EB]' : 'bg-[#D97757]'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 ${isLight ? 'text-[#0D0B09]' : 'text-white'}`}>
          {content.cta_headline}
        </h2>
        {content.cta_subtext && (
          <p className={`mb-6 ${isLight ? 'text-[#1A1410]' : 'text-white/80'}`}>{content.cta_subtext}</p>
        )}
        {content.cta_button_text && content.cta_button_url && (
          <a
            href={content.cta_button_url}
            className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all hover:-translate-y-0.5 ${
              isLight ? 'bg-[#0D0B09] text-white hover:bg-[#1A1410]' : 'bg-white text-[#D97757] hover:bg-white/90'
            }`}
          >
            {content.cta_button_text}
          </a>
        )}
      </div>
    </section>
  );
}

export function DividerBlock() {
  return (
    <div className="py-8 bg-[#0D0B09] flex items-center justify-center">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-[rgba(54,46,40,0.5)] to-transparent" />
    </div>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero': return <HeroBlock content={block.content} />;
    case 'text': return <TextBlock content={block.content} />;
    case 'feature_grid': return <FeatureGridBlock content={block.content} />;
    case 'faq': return <FAQBlock content={block.content} />;
    case 'stats': return <StatsBlock content={block.content} />;
    case 'testimonial': return <TestimonialBlock content={block.content} />;
    case 'code': return <CodeBlock content={block.content} />;
    case 'image': return <ImageBlock content={block.content} />;
    case 'cta_banner': return <CTABannerBlock content={block.content} />;
    case 'divider': return <DividerBlock />;
    default: return null;
  }
}