import type { Metadata } from 'next'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — FORGE',
  description: 'Privacy policy for FORGE by NorwegianSpark SA.',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-medium text-[--text-primary] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[--text-muted] mb-10 font-mono">Last updated: April 2026</p>

          <div className="space-y-8 text-sm text-[--text-secondary] leading-relaxed">
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">Who we are</h2>
              <p>FORGE is operated by NorwegianSpark SA (Org no: 834 984 172), based in Norway. Contact: norwegianspark@gmail.com.</p>
            </section>
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">Data we collect</h2>
              <p>We collect: your email address and name when you register, prompts you submit for code generation, project data you save, and payment information processed by Stripe (we never store card details). We also collect anonymised usage analytics.</p>
            </section>
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">How we use your data</h2>
              <p>To operate the service, send important account emails, process your subscription, and improve FORGE. We do not sell your data. We do not use your prompts to train AI models.</p>
            </section>
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">Third-party services</h2>
              <p>We use Clerk for authentication, Supabase for data storage, Stripe for payments, Resend for email, and Anthropic for AI generation. Each operates under their own privacy policies.</p>
            </section>
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">Your rights (GDPR)</h2>
              <p>You have the right to access, correct, export, or delete your data. Email norwegianspark@gmail.com with any requests. We respond within 30 days.</p>
            </section>
            <section>
              <h2 className="text-[--text-primary] font-medium text-base mb-3">Cookies</h2>
              <p>We use essential session cookies (Clerk auth) and anonymous analytics. No third-party advertising cookies.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
