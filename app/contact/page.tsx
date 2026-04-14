import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Globe2, MessageSquare, Send, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Claude Chief',
  description: 'Get in touch with the Claude Chief team. We love hearing from the community.',
};

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-[#1A1720]">
        <div className="container max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-[#D97757]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-[#D97757]" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F5F0EB] tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-[#A99E92] max-w-xl mx-auto">
            We love hearing from the Claude community. Whether you have feedback, a resource to submit, or just want to say hi — we&apos;re here.
          </p>
        </div>
      </section>

      {/* ─── MAIN ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#0D0B0F]">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* ─── CONTACT FORM ─── */}
            <div className="relative p-8 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
              <div className="absolute top-0 left-0 w-20 h-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,87,0.08),transparent_70%)]" />
              <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-2">
                Send us a message
              </h2>
              <p className="text-[#6B6158] text-sm mb-8">
                We read every message and aim to respond within 48 hours.
              </p>

              <form className="space-y-5" action="https://formspree.io/f/your-form-id" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="input-label">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Chen"
                      className="input"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="input-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="input-label">Subject</label>
                  <select id="subject" name="subject" className="input cursor-pointer">
                    <option value="general">General inquiry</option>
                    <option value="submit">Submit a resource</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Report a bug</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="input-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    className="input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full justify-center h-12 text-base"
                >
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            </div>

            {/* ─── CONTACT METHODS ─── */}
            <div className="space-y-5">
              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">
                  Submit a resource
                </h3>
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4">
                  Found a great Claude skill, workflow, or MCP that should be on Claude Chief? Tell us about it and we&apos;ll review it for inclusion.
                </p>
                <div className="flex items-center gap-2 text-[#D97757] text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  <span>submit@claudechief.com</span>
                </div>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">
                  Follow us
                </h3>
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4">
                  Stay updated with the latest Claude skills and community news.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://twitter.com/claudechief"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors"
                  >
                    <div className="w-8 h-8 bg-[rgba(56,163,255,0.12)] rounded-lg flex items-center justify-center">
                      <Globe2 className="w-4 h-4 text-[#38A3FF]" />
                    </div>
                    <span className="text-sm font-medium">@claudechief</span>
                  </a>
                  <a
                    href="https://github.com/claudechief"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors"
                  >
                    <div className="w-8 h-8 bg-[rgba(255,255,255,0.08)] rounded-lg flex items-center justify-center">
                      <Globe2 className="w-4 h-4 text-[#F5F0EB]" />
                    </div>
                    <span className="text-sm font-medium">@claudechief</span>
                  </a>
                </div>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">
                  Community
                </h3>
                <p className="text-[#A99E92] text-sm leading-relaxed mb-4">
                  Join the Claude Chief community on Discord to discuss skills, share workflows, and connect with fellow Claude enthusiasts.
                </p>
                <a
                  href="https://discord.gg/claudechief"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#A99E92] hover:text-[#D97757] transition-colors"
                >
                  <div className="w-8 h-8 bg-[rgba(114,137,218,0.12)] rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#7289DA]" />
                  </div>
                  <span className="text-sm font-medium">Join our Discord</span>
                </a>
              </div>

              <div className="p-6 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
                <h3 className="font-display text-lg font-bold text-[#F5F0EB] mb-3">
                  Location
                </h3>
                <div className="flex items-center gap-3 text-[#A99E92]">
                  <MapPin className="w-4 h-4 text-[#6B6158]" />
                  <span className="text-sm">San Francisco, CA · Remote-first</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}