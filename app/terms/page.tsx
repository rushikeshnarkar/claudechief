import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Claude Chief',
  description: 'Read the Terms of Service for Claude Chief. Last updated April 2026.',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0D0B0F]">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6B6158] hover:text-[#D97757] transition-colors mb-8"
          >
            ← Back to home
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F0EB] tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-[#6B6158] text-sm">Last updated: April 14, 2026</p>
        </div>

        <div className="relative p-8 sm:p-10 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.06),transparent_70%)]" />

          <div className="max-w-none text-[#A99E92] relative leading-relaxed space-y-8">

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Claude Chief (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">2. Description of Service</h2>
              <p>Claude Chief is a curated directory that aggregates and organizes information about Claude skills, workflows, MCPs, updates, and creators from third-party sources. We do not host, sell, or license any of the resources listed on the Site.</p>
              <p>All resources are linked to their original sources, and any licensing, usage terms, or restrictions are determined by the respective creators and original platforms.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">3. Not Affiliated with Anthropic</h2>
              <p>Claude Chief is not affiliated with, endorsed by, or connected to Anthropic PBC, the creator of Claude AI. &quot;Claude&quot; and related marks are trademarks of Anthropic. Claude Chief is an independent community project.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">4. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Site for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to any part of the Site</li>
                <li>Not use the Site in any way that could damage or impair its functionality</li>
                <li>Review and comply with the terms of each resource&apos;s original source before use</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">5. Intellectual Property</h2>
              <p>The Site&apos;s design, content, and code are owned by Claude Chief. We respect the intellectual property of others and expect users to do the same.</p>
              <p>If you believe any content on the Site infringes your copyright, please contact us at <a href="mailto:legal@claudechief.com" className="text-[#D97757] hover:underline">legal@claudechief.com</a> and we will address it promptly.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">6. Third-Party Links and Resources</h2>
              <p>The Site contains links to external websites and references to third-party resources. We do not control, endorse, or guarantee the accuracy, completeness, or reliability of any third-party content. Use third-party resources at your own risk.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">7. Disclaimer of Warranties</h2>
              <p>THE SITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SITE WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">8. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Claude Chief shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or any resources linked from the Site.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">9. Changes to Terms</h2>
              <p>We may update these Terms from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after any changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">10. Contact</h2>
              <p>For questions about these Terms, please contact us at <a href="mailto:legal@claudechief.com" className="text-[#D97757] hover:underline">legal@claudechief.com</a>.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}