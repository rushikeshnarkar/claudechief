'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Save, Eye, Globe, X, Check, Loader2,
  AlertCircle, ExternalLink, Monitor, Smartphone,
} from 'lucide-react';
import { Block, BlockType, DEFAULT_CONTENT } from '@/lib/blocks/types';
import BlockForm from '@/components/blocks/BlockForm';
import BlockTypePicker from '@/components/blocks/BlockTypePicker';
import AdminAuthGate from '@/components/admin/AdminAuthGate';

interface PageData {
  id?: string;
  title: string;
  slug: string;
  page_type: string;
  status: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  tags: string;
  blocks: Block[];
  author: string;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

interface BlockComposerProps {
  initialData?: PageData;
  pageId?: string;
}

function ComposerInner({ initialData, pageId }: BlockComposerProps) {
  const router = useRouter();
  const [showPicker, setShowPicker] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [metaExpanded, setMetaExpanded] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState<PageData>(() => ({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    page_type: initialData?.page_type || 'blog',
    status: initialData?.status || 'draft',
    excerpt: initialData?.excerpt || '',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    og_image: initialData?.og_image || '',
    tags: initialData?.tags || '',
    blocks: initialData?.blocks || [],
    author: initialData?.author || 'Claude Chief Team',
  }));

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialData && form.title && !form.slug.startsWith(slugify(form.title.slice(0, 20)))) {
      // Only auto-slug on new pages
    }
  }, [form.title]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      content: DEFAULT_CONTENT[type] || {},
    };
    setForm(f => ({ ...f, blocks: [...f.blocks, newBlock] }));
  };

  const updateBlock = (index: number, block: Block) => {
    setForm(f => ({ ...f, blocks: f.blocks.map((b, i) => i === index ? block : b) }));
  };

  const deleteBlock = (index: number) => {
    setForm(f => ({ ...f, blocks: f.blocks.filter((_, i) => i !== index) }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...form.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setForm(f => ({ ...f, blocks: newBlocks }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.slug.trim()) {
      setError('Slug is required');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      const url = pageId ? `/api/blocks/${pageId}` : '/api/blocks';
      const method = pageId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      if (!pageId) {
        const data = await res.json();
        router.push(`/admin/blocks/${data.page.id}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const charCount = form.meta_description.length;
  const previewUrl = form.slug ? `/blog/${form.slug}` : '';

  return (
    <div className="flex flex-col h-[calc(100vh-72px)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[rgba(54,46,40,0.4)] bg-[#1A1720]">
        <div className="flex items-center gap-4">
          <input
            value={form.title}
            onChange={e => {
              setForm(f => ({ ...f, title: e.target.value }));
              if (!initialData) setForm(f => ({ ...f, slug: slugify(e.target.value) }));
            }}
            placeholder="Page title..."
            className="bg-transparent text-xl font-bold text-[#F5F0EB] border-none outline-none placeholder:text-[#6B6158] w-80"
          />
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            form.status === 'published' ? 'bg-[#788C5D]/10 text-[#788C5D]' : 'bg-[rgba(54,46,40,0.3)] text-[#6B6158]'
          }`}>
            {form.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#A99E92] hover:text-[#F5F0EB] border border-[rgba(54,46,40,0.4)] rounded-lg hover:border-[rgba(54,46,40,0.8)] transition-all"
            >
              <Eye className="w-4 h-4" /> Preview <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={submitting}
            className="btn btn-primary text-sm h-9 px-4"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> :
             saved ? <><Check className="w-4 h-4" /> Saved!</> :
             <><Save className="w-4 h-4" /> Save</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Builder */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Page Settings */}
          <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl mb-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(54,46,40,0.4)]">
              <span className="text-sm font-semibold text-[#F5F0EB]">Page Settings</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Slug *</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#6B6158]">/blog/</span>
                    <input
                      value={form.slug}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      className="input flex-1 text-sm font-mono"
                      placeholder="my-blog-post"
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">Page Type</label>
                  <select
                    value={form.page_type}
                    onChange={e => setForm(f => ({ ...f, page_type: e.target.value }))}
                    className="input"
                  >
                    <option value="blog">Blog Post</option>
                    <option value="landing">Landing Page</option>
                    <option value="resource">Resource Page</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  className="input resize-none"
                  rows={2}
                  placeholder="Short description for listings and SEO..."
                />
              </div>
              <div>
                <label className="input-label">Author</label>
                <input
                  value={form.author}
                  onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                  className="input"
                  placeholder="Claude Chief Team"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl mb-6 overflow-hidden">
            <button
              onClick={() => setMetaExpanded(!metaExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[rgba(54,46,40,0.1)] transition-colors"
            >
              <span className="text-sm font-semibold text-[#F5F0EB]">SEO Settings</span>
              <span className="text-xs text-[#6B6158]">{metaExpanded ? 'collapse' : 'expand'}</span>
            </button>
            {metaExpanded && (
              <div className="p-4 space-y-4 border-t border-[rgba(54,46,40,0.4)]">
                <div>
                  <label className="input-label">Meta Title</label>
                  <input
                    value={form.meta_title}
                    onChange={e => setForm(f => ({ ...f, meta_title: e.target.value }))}
                    className="input"
                    placeholder={form.title || 'Page title for search engines...'}
                  />
                </div>
                <div>
                  <label className="input-label">
                    Meta Description <span className={`text-xs ${charCount > 160 ? 'text-red-400' : charCount > 140 ? 'text-yellow-400' : 'text-[#6B6158]'}`}>({charCount}/160)</span>
                  </label>
                  <textarea
                    value={form.meta_description}
                    onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))}
                    className="input resize-none"
                    rows={3}
                    placeholder="160 characters for search results..."
                  />
                </div>
                <div>
                  <label className="input-label">OG Image URL (1200x630)</label>
                  <input
                    value={form.og_image}
                    onChange={e => setForm(f => ({ ...f, og_image: e.target.value }))}
                    className="input"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="input-label">Tags (comma separated)</label>
                  <input
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className="input"
                    placeholder="claude, marketing, AI skills"
                  />
                  {form.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-[#D97757]/10 text-[#D97757] rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Blocks */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#F5F0EB]">Content Blocks</h3>
              <span className="text-xs text-[#6B6158]">{form.blocks.length} blocks</span>
            </div>

            <div className="space-y-3 mb-4">
              {form.blocks.map((block, i) => (
                <BlockForm
                  key={block.id}
                  block={block}
                  index={i}
                  isFirst={i === 0}
                  isLast={i === form.blocks.length - 1}
                  onUpdate={(b) => updateBlock(i, b)}
                  onDelete={() => deleteBlock(i)}
                  onMoveUp={() => moveBlock(i, 'up')}
                  onMoveDown={() => moveBlock(i, 'down')}
                />
              ))}
            </div>

            <button
              onClick={() => setShowPicker(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-[rgba(54,46,40,0.4)] rounded-xl text-[#6B6158] hover:text-[#D97757] hover:border-[#D97757]/40 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Content Block
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-[420px] border-l border-[rgba(54,46,40,0.4)] bg-[#0D0B09] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(54,46,40,0.4)]">
            <span className="text-sm font-semibold text-[#F5F0EB]">Live Preview</span>
            <div className="flex items-center gap-1 bg-[rgba(19,17,24,0.88)] rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-[#D97757]/20 text-[#D97757]' : 'text-[#6B6158]'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-[#D97757]/20 text-[#D97757]' : 'text-[#6B6158]'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className={`p-4 transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''}`}>
              {form.blocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Globe className="w-8 h-8 text-[#6B6158] mb-2" />
                  <p className="text-sm text-[#6B6158]">Add blocks to see preview</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {form.blocks.map((block) => {
                    switch (block.type) {
                      case 'hero': return (
                        <div key={block.id} className="py-12 text-center bg-[#0D0B09]">
                          {block.content.badge_text && (
                            <span className="inline-block mb-4 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#D97757]/20 text-[#D97757] rounded-full">
                              {block.content.badge_text}
                            </span>
                          )}
                          <h1 className="font-display text-2xl font-bold text-[#F5F0EB] mb-3 leading-tight">
                            {block.content.headline || 'Your Headline'}
                          </h1>
                          {block.content.subheadline && (
                            <p className="text-sm text-[#A99E92] mb-4">{block.content.subheadline}</p>
                          )}
                          {block.content.cta_text && (
                            <span className="inline-block px-4 py-2 bg-[#D97757] text-white text-sm font-semibold rounded-lg">
                              {block.content.cta_text}
                            </span>
                          )}
                        </div>
                      );
                      case 'text': return (
                        <div key={block.id} className="py-8 px-4">
                          {block.content.heading && (
                            <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">{block.content.heading}</h2>
                          )}
                          <p className="text-sm text-[#A99E92] leading-relaxed">{block.content.paragraph || 'Your paragraph text...'}</p>
                        </div>
                      );
                      case 'feature_grid': return (
                        <div key={block.id} className="py-8 px-4">
                          {block.content.section_title && (
                            <h2 className="font-display text-lg font-bold text-[#F5F0EB] mb-6 text-center">{block.content.section_title}</h2>
                          )}
                          <div className={`grid gap-3 ${block.content.columns === 2 ? 'grid-cols-2' : block.content.columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
                            {(block.content.items || []).map((item: any, i: number) => (
                              <div key={i} className="p-3 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl">
                                <div className="w-8 h-8 rounded-lg bg-[#D97757]/10 flex items-center justify-center mb-2">
                                  <div className="w-4 h-4 bg-[#D97757]/30 rounded" />
                                </div>
                                <div className="text-xs font-semibold text-[#F5F0EB] mb-1">{item.title}</div>
                                <div className="text-[10px] text-[#A99E92]">{item.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                      case 'faq': return (
                        <div key={block.id} className="py-8 px-4">
                          {block.content.section_title && (
                            <h2 className="font-display text-lg font-bold text-[#F5F0EB] mb-6 text-center">{block.content.section_title}</h2>
                          )}
                          <div className="space-y-2">
                            {(block.content.items || []).map((item: any, i: number) => (
                              <div key={i} className="p-3 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.4)] rounded-xl">
                                <div className="text-xs font-semibold text-[#F5F0EB]">{item.question}</div>
                                <div className="text-[10px] text-[#A99E92] mt-1">{item.answer}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                      case 'stats': return (
                        <div key={block.id} className="py-8 px-4 bg-[rgba(19,17,24,0.88)] border-y border-[rgba(54,46,40,0.4)]">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            {(block.content.items || []).map((item: any, i: number) => (
                              <div key={i}>
                                <div className="font-display text-2xl font-bold text-[#D97757]">{item.number}</div>
                                <div className="text-[10px] text-[#A99E92] uppercase tracking-wider">{item.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                      case 'testimonial': return (
                        <div key={block.id} className="py-8 px-4 text-center">
                          <div className="mb-4 text-[#D97757]/50">❝</div>
                          <p className="text-sm text-[#F5F0EB] italic mb-3">"{block.content.quote || 'Your testimonial...'}"</p>
                          <div className="text-xs text-[#A99E92]">{block.content.author}{block.content.role && ` — ${block.content.role}`}</div>
                        </div>
                      );
                      case 'code': return (
                        <div key={block.id} className="py-6 px-4">
                          <div className="bg-[#1A1720] border border-[rgba(54,46,40,0.5)] rounded-xl overflow-hidden">
                            <div className="px-3 py-2 border-b border-[rgba(54,46,40,0.4)] text-[10px] text-[#6B6158] font-mono">{block.content.language}</div>
                            <pre className="p-3 text-[10px] font-mono text-[#A99E92] overflow-x-auto">{block.content.code || '// code here'}</pre>
                          </div>
                        </div>
                      );
                      case 'image': return (
                        <div key={block.id} className="py-6 px-4">
                          <img src={block.content.url || 'https://picsum.photos/800/400'} alt={block.content.alt} className="w-full rounded-xl" />
                          {block.content.caption && <p className="text-[10px] text-[#6B6158] text-center mt-2">{block.content.caption}</p>}
                        </div>
                      );
                      case 'cta_banner': return (
                        <div key={block.id} className={`py-8 px-4 text-center ${block.content.cta_theme === 'terracotta' ? 'bg-[#D97757]' : block.content.cta_theme === 'dark' ? 'bg-[#1A1720]' : 'bg-[#F5F0EB]'}`}>
                          <h3 className={`font-display text-lg font-bold mb-2 ${block.content.cta_theme === 'light' ? 'text-[#0D0B09]' : 'text-white'}`}>
                            {block.content.cta_headline || 'Your CTA Headline'}
                          </h3>
                          {block.content.cta_button_text && (
                            <span className={`inline-block px-4 py-2 text-sm font-semibold rounded-lg ${block.content.cta_theme === 'light' ? 'bg-[#0D0B09] text-white' : 'bg-white text-[#D97757]'}`}>
                              {block.content.cta_button_text}
                            </span>
                          )}
                        </div>
                      );
                      case 'divider': return (
                        <div key={block.id} className="py-4 flex items-center justify-center">
                          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[rgba(54,46,40,0.5)] to-transparent" />
                        </div>
                      );
                      default: return null;
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPicker && <BlockTypePicker onSelect={addBlock} onClose={() => setShowPicker(false)} />}
    </div>
  );
}

export default function BlockComposer({ initialData, pageId }: BlockComposerProps) {
  return (
    <AdminAuthGate>
      <ComposerInner initialData={initialData} pageId={pageId} />
    </AdminAuthGate>
  );
}