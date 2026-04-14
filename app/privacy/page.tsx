import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Claude Chief',
  description: 'Read the Privacy Policy for Claude Chief. Last updated April 2026.',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[#6B6158] text-sm">Last updated: April 14, 2026</p>
        </div>

        <div className="relative p-8 sm:p-10 bg-[rgba(19,17,24,0.88)] border border-[rgba(54,46,40,0.5)] rounded-[22px]">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_top_right,rgba(217,119,87,0.06),transparent_70%)]" />

          <div className="max-w-none text-[#A99E92] relative leading-relaxed space-y-8">

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">1. Introduction</h2>
              <p>Claude Chief (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.</p>
              <p>We are an independent project and are not affiliated with Anthropic PBC.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">2. Information We Collect</h2>
              <p className="font-semibold text-[#F5F0EB] mt-4">Account Information</p>
              <p>When you create an account, we collect your email address and any profile information you provide (such as your name). We use Supabase for authentication services.</p>

              <p className="font-semibold text-[#F5F0EB] mt-4">Usage Data</p>
              <p>We may collect basic analytics data about how you use the Site, including pages visited, search queries, and feature usage. This data is aggregated and anonymized where possible.</p>

              <p className="font-semibold text-[#F5F0EB] mt-4">Cookies</p>
              <p>We use essential cookies for authentication and session management. We do not use advertising or tracking cookies.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Provide and maintain your account</li>
                <li>Allow you to save and access your saved resources</li>
                <li>Send you account-related communications (if you opt in)</li>
                <li>Improve the Site based on aggregate usage patterns</li>
                <li>Detect and prevent abuse or unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">4. Information Sharing</h2>
              <p>We do not sell, rent, or trade your personal information. We may share information in the following limited circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-[#F5F0EB]">Service providers:</strong> We use Supabase for authentication and hosting. Their use of your data is governed by their privacy policy.</li>
                <li><strong className="text-[#F5F0EB]">Legal requirements:</strong> We may disclose information if required by law.</li>
                <li><strong className="text-[#F5F0EB]">With your consent:</strong> We will share information in other ways only with your explicit consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">5. Data Retention</h2>
              <p>We retain your account information for as long as your account is active or as needed to provide services. You may delete your account at any time, which will remove your personal information from our systems within 30 days.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Export your data in a portable format</li>
                <li>Object to certain processing activities</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:privacy@claudechief.com" className="text-[#D97757] hover:underline">privacy@claudechief.com</a>.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">7. Data Security</h2>
              <p>We use industry-standard security measures to protect your information, including HTTPS encryption, secure authentication via Supabase, and regular security reviews. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">8. Children&apos;s Privacy</h2>
              <p>The Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-[#F5F0EB] mb-3">10. Contact</h2>
              <p>For questions about this Privacy Policy, contact us at <a href="mailto:privacy@claudechief.com" className="text-[#D97757] hover:underline">privacy@claudechief.com</a>.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}