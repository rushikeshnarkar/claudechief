import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Submit a Skill — Claude Chief',
  description: 'Share your Claude skills with the community.',
};

export default function SubmitPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg-surface)] relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(196,99,58,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="container max-w-2xl mx-auto relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-[var(--color-accent)] mb-4 animate-fade-up">
            <span className="w-4 h-px bg-[var(--color-accent)]" />
            Community
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-[-0.03em] leading-[1.05] mb-4 animate-fade-up animate-delay-100">
            Submit a skill
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 animate-fade-up animate-delay-100" />

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-12 animate-fade-up animate-delay-200">
            Our community submit form is coming soon. For now, reach out directly and we&apos;ll get your skill up on the directory.
          </p>

          {/* CTA Options */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300">
            <a
              href="https://twitter.com/claudechief"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-accent)] text-[var(--color-text-primary)] rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Message on X
            </a>
            <a
              href="https://github.com/claudechief"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl font-semibold hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Open on GitHub
            </a>
          </div>

          {/* What to share */}
          <div className="mt-16 p-8 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl animate-fade-up animate-delay-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--color-accent-muted)] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                What to share
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'Claude skills — reusable prompt templates or systems',
                'Workflows — multi-step processes you\'ve automated with Claude',
                'MCPs — Model Context Protocol integrations you\'ve built or discovered',
                'Any tool, resource, or insight from your own Claude workflow',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[var(--color-accent)] flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}