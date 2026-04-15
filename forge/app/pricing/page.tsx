import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { PLANS } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Pricing — FORGE AI App Builder',
  description: 'Free to start. Pro at $19/month for unlimited builds. Agency at $79/month for white-label and API access. Deploy free on Cloudflare Pages.',
}

const FAQ = [
  { q: 'What counts as a build?', a: 'Each time you click "Generate app" and Claude generates code, that\'s one build. Editing your prompt and regenerating counts as another build.' },
  { q: 'Do I need Vercel?', a: 'No. FORGE is designed to deploy to Cloudflare Pages (free) or Netlify. Both are free at launch and scale. No Vercel account needed.' },
  { q: 'Do I own the generated code?', a: 'Yes, completely. The code FORGE generates is yours. Download it, push it to GitHub, modify it, sell the product you build with it — no restrictions.' },
  { q: 'What external services do I need?', a: 'Depends on your app. A typical SaaS needs Clerk (free tier), Supabase (free tier), and optionally Stripe. FORGE generates all the integration code.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel your subscription from your dashboard. You keep access until the end of the billing period.' },
  { q: 'What is the Agency white-label?', a: 'On the Agency plan, your clients see your brand (not FORGE) on the generated output. The dashboard is also branded with your agency name.' },
]

export default function PricingPage() {
  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-medium text-[--text-primary] mb-3">Simple pricing</h1>
            <p className="text-[--text-secondary]">Free to start. Upgrade when you need more. No surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => {
              const isPopular = key === 'pro'
              return (
                <div
                  key={key}
                  className={`rounded-xl border p-7 flex flex-col ${isPopular ? 'border-[--forge-green]/50 bg-[--forge-green]/5 relative' : 'border-[--border] bg-[--surface-1]'}`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[--forge-green] text-black text-xs font-medium rounded-full">
                      Most popular
                    </span>
                  )}
                  <div className="mb-6">
                    <p className="text-sm text-[--text-muted] mb-1 font-mono">{plan.name.toUpperCase()}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-mono font-medium text-[--text-primary]">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && <span className="text-[--text-muted] text-sm">/month</span>}
                    </div>
                    <p className="text-xs text-[--text-muted]">
                      {plan.builds === -1 ? 'Unlimited builds' : `${plan.builds} builds/month`}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-2.5 text-sm text-[--text-secondary]">
                        <span className="text-[--forge-green] shrink-0 mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.price === 0 ? '/sign-up' : '/sign-up'}
                    className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${isPopular ? 'bg-[--forge-green] text-black hover:bg-[--forge-green-dim]' : 'border border-[--border] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-bright]'}`}
                  >
                    {plan.price === 0 ? 'Start for free' : `Get ${plan.name}`}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Deploy callout */}
          <div className="rounded-xl border border-[--border] bg-[--surface-1] p-8 mb-20 text-center">
            <h2 className="text-xl font-medium text-[--text-primary] mb-2">Deploy free, on your terms</h2>
            <p className="text-[--text-secondary] text-sm max-w-xl mx-auto mb-6">
              FORGE doesn&apos;t lock you into any hosting provider. Deploy to Cloudflare Pages or Netlify — both have generous free tiers and no vendor lock-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pages.cloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] text-sm rounded-lg transition-colors"
              >
                Cloudflare Pages → free, 310 edge locations
              </a>
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] text-sm rounded-lg transition-colors"
              >
                Netlify → free tier, easy setup
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-[--text-primary] mb-8 text-center">Questions</h2>
            <div className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="border-b border-[--border] pb-5 last:border-0">
                  <p className="text-[--text-primary] font-medium mb-2">{q}</p>
                  <p className="text-sm text-[--text-secondary] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
