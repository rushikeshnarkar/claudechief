import type { Metadata } from 'next';
import { ArrowRight, Users, BookOpen, Zap, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Claude Chief — Our Mission',
  description: 'Learn about Claude Chief — why we built it, our mission, and how we curate the best Claude skills and resources for the community.',
};

export default function AboutPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#D97757]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-8 h-8 text-[#D97757]" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F0EB] tracking-tight mb-6">
            We built this because<br />
            <span className="text-[#D97757]">we were frustrated.</span>
          </h1>
          <p className="text-lg text-[#A99E92] leading-relaxed max-w-2xl mx-auto">
            Every week, new Claude skills, workflows, and MCPs appear across Twitter, GitHub, YouTube, and random blogs. Finding the good ones? That takes hours. We wanted one place that had already done that work.
          </p>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
              <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
              <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-4">The Problem</h2>
              <p className="text-[#A99E92] leading-relaxed mb-4">
                The Claude ecosystem is growing faster than any one person can track. Great skills live in YouTube videos, buried GitHub repos, abandoned Twitter threads, and niche newsletters. By the time you find the good ones, there are ten new ones you&apos;ve missed.
              </p>
              <p className="text-[#A99E92] leading-relaxed">
                And even when you find them, you have to figure out: is this still relevant? Who made it? What tier is it? Does it actually work?
              </p>
            </div>

            <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_top_right,rgba(106,155,204,0.08),transparent_70%)]" />
              <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-4">Our Solution</h2>
              <p className="text-[#A99E92] leading-relaxed mb-4">
                Claude Chief is a curated directory. Every skill, workflow, MCP, and creator has been reviewed, categorized, and linked to its original source. We tag by department, difficulty, tier, and source — so you can find exactly what you need in seconds.
              </p>
              <p className="text-[#A99E92] leading-relaxed">
                We also track Anthropic updates so you never miss a model release, API change, or new feature that might change how you use Claude.
              </p>
            </div>

            <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_bottom_right,rgba(74,222,128,0.08),transparent_70%)]" />
              <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-4">What We&apos;re NOT</h2>
              <p className="text-[#A99E92] leading-relaxed mb-4">
                We are not affiliated with Anthropic. We don&apos;t host skills on our servers. We don&apos;t make you pay to access things that are free elsewhere.
              </p>
              <p className="text-[#A99E92] leading-relaxed">
                Think of us as the curated, human-edited front page of the Claude internet — not a walled garden, but a map to everything already out there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-[#F5F0EB] tracking-tight mb-3 text-center">
            What we believe
          </h2>
          <p className="text-[#A99E92] text-center mb-12 max-w-xl mx-auto">
            Three principles that guide every decision we make.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] text-center">
              <div className="w-12 h-12 bg-[rgba(217,119,87,0.12)] rounded-xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-6 h-6 text-[#D97757]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">Curated by humans</h3>
              <p className="text-sm text-[#A99E92] leading-relaxed">
                Every resource is reviewed by a real person. No algorithmic rankings, no engagement bait. We link to the original source and let you decide.
              </p>
            </div>

            <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] text-center">
              <div className="w-12 h-12 bg-[rgba(106,155,204,0.12)] rounded-xl flex items-center justify-center mx-auto mb-5">
                <Zap className="w-6 h-6 text-[#6A9BCC]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">Free first</h3>
              <p className="text-sm text-[#A99E92] leading-relaxed">
                The directory is free to explore. We don&apos;t hide good resources behind a paywall. Elite tier just means we give it extra love.
              </p>
            </div>

            <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px] text-center">
              <div className="w-12 h-12 bg-[rgba(74,222,128,0.12)] rounded-xl flex items-center justify-center mx-auto mb-5">
                <Heart className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">Community driven</h3>
              <p className="text-sm text-[#A99E92] leading-relaxed">
                The best resources come from the community. We surface creators who are doing great work and give them a platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-[#0D0B0F]">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-4">
            Ready to explore?
          </h2>
          <p className="text-[#A99E92] text-lg mb-10 max-w-xl mx-auto">
            Browse hundreds of Claude skills, workflows, and MCPs — all curated and ready to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/skills" className="btn btn-primary text-base h-12 px-8">
              Browse skills
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/contact" className="btn btn-ghost text-base h-12 px-8">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}