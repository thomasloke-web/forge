import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { templates } from '@/lib/templates'
import { articles } from '@/lib/articles'
import PromptTester from '@/components/prompt-tester'

export const metadata: Metadata = {
  title: 'FORGE — AI App Builder. Ship production Next.js apps from a prompt.',
  description: 'Describe your app. FORGE generates production-grade Next.js 15 + TypeScript code powered by Claude. Deploy free on Cloudflare Pages or Netlify. No Vercel bill. No vendor lock-in.',
}

const FEATURES = [
  {
    title: 'Production-grade code',
    desc: 'TypeScript strict mode. Next.js 15 App Router. Every file, every route, every API — complete and correct.',
    icon: '⬡',
  },
  {
    title: 'Deploy free, anywhere',
    desc: 'Cloudflare Pages or Netlify. Global edge. Zero hosting cost at launch and through early growth. No Vercel bill.',
    icon: '⟁',
  },
  {
    title: 'Claude-powered',
    desc: 'Claude understands TypeScript better than GPT. Fewer errors, better architecture, production-ready from prompt one.',
    icon: '◈',
  },
  {
    title: 'Own your code',
    desc: 'No vendor lock-in. Download your Next.js project, push to GitHub, deploy anywhere. Your code is yours.',
    icon: '◉',
  },
  {
    title: '15 templates',
    desc: 'SaaS starter, client portal, waitlist, invoice generator, booking scheduler — pick a template, customize with your prompt.',
    icon: '▦',
  },
  {
    title: 'Save and iterate',
    desc: 'Projects saved to your dashboard. Come back, keep building. Pro plan: unlimited builds, no monthly credit anxiety.',
    icon: '⟳',
  },
]

const COMPARISON = [
  { tool: 'Lovable', price: '$25/mo', engine: 'GPT', deploy: 'Vercel', export: 'GitHub sync', limit: '100 msg/mo' },
  { tool: 'Bolt.new', price: '$25/mo', engine: 'Claude/GPT', deploy: 'StackBlitz', export: 'GitHub', limit: '10M tokens/mo' },
  { tool: 'Base44', price: '$20–200/mo', engine: 'GPT', deploy: 'Base44 cloud', export: 'Paid only', limit: 'Credits' },
  { tool: 'FORGE', price: '$19/mo', engine: 'Claude', deploy: 'Cloudflare / Netlify', export: 'Always free', limit: 'Unlimited', highlight: true },
]

const popularTemplates = templates.filter(t => t.popular).slice(0, 3)
const recentArticles = articles.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <Nav />
      <div className="pt-14">

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[--border] text-xs text-[--text-muted] mb-8 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[--forge-green] animate-pulse-slow" />
            Powered by Claude · Deploys to Cloudflare Pages
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[--text-primary] italic leading-tight mb-6">
            Ship production apps<br />
            <span className="text-[--forge-green] not-italic font-mono">without writing production code.</span>
          </h1>

          <p className="text-lg text-[--text-secondary] max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your app. FORGE generates Next.js 15 + TypeScript code.
            Deploy free on Cloudflare Pages. No Vercel bill. No vendor lock-in.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/sign-up"
              className="px-6 py-3 bg-[--forge-green] text-black font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors text-sm"
            >
              Start building free
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-bright] rounded-lg transition-colors text-sm"
            >
              Browse templates →
            </Link>
          </div>
          <p className="text-xs text-[--text-muted]">Free plan: 5 builds/month · No credit card required</p>
        </section>

        {/* Terminal demo mockup */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="rounded-xl border border-[--border] bg-[--surface-1] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[--border]">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-[--text-muted] font-mono">forge — generating</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <p className="text-[--text-muted] mb-2">Prompt:</p>
              <p className="text-[--text-primary] mb-6 pl-4 border-l border-[--forge-green] text-sm leading-relaxed">
                &quot;Build a SaaS waitlist manager. Clerk auth, Supabase database. Public signup page at /join, admin dashboard, email confirmations via Resend. Referral tracking — sharing bumps you up the list.&quot;
              </p>
              <p className="text-[--text-muted] mb-3">Generating:</p>
              <div className="space-y-1 text-xs text-[--forge-green]">
                <p>✓ app/layout.tsx</p>
                <p>✓ app/page.tsx</p>
                <p>✓ app/join/page.tsx</p>
                <p>✓ app/dashboard/page.tsx</p>
                <p>✓ app/api/signup/route.ts</p>
                <p>✓ app/api/webhook/resend/route.ts</p>
                <p>✓ lib/supabase.ts</p>
                <p>✓ lib/env.ts</p>
                <p className="text-[--text-muted]">generating app/api/invite/route.ts<span className="cursor" /></p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-medium text-[--text-primary] text-center mb-12">
            Built differently
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="p-6 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors">
                <span className="text-[--forge-green] text-xl mb-4 block font-mono" aria-hidden="true">{f.icon}</span>
                <h3 className="text-[--text-primary] font-medium mb-2">{f.title}</h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free prompt tester tool */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[--forge-green] uppercase tracking-wider">Free tool</span>
            <h2 className="text-2xl font-medium text-[--text-primary] mt-2 mb-3">AI Prompt Scorer</h2>
            <p className="text-[--text-secondary] text-sm">Paste your app prompt. Get instant feedback on how to improve it before building.</p>
          </div>
          <PromptTester />
        </section>

        {/* Comparison table */}
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-medium text-[--text-primary] text-center mb-10">How FORGE compares</h2>
          <div className="rounded-xl border border-[--border] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[--border]">
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Tool</th>
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Price</th>
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Engine</th>
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Deploy</th>
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Code export</th>
                    <th className="text-left px-5 py-3 text-xs text-[--text-muted] uppercase tracking-wider font-medium">Limits</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.tool}
                      className={`border-b border-[--border] last:border-0 ${row.highlight ? 'bg-[--forge-green]/5' : i % 2 === 0 ? 'bg-[--surface-1]' : ''}`}
                    >
                      <td className="px-5 py-3.5">
                        <span className={`font-medium ${row.highlight ? 'text-[--forge-green]' : 'text-[--text-primary]'}`}>
                          {row.tool}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[--text-secondary]">{row.price}</td>
                      <td className="px-5 py-3.5 text-[--text-secondary]">{row.engine}</td>
                      <td className="px-5 py-3.5 text-[--text-secondary]">{row.deploy}</td>
                      <td className="px-5 py-3.5 text-[--text-secondary]">{row.export}</td>
                      <td className="px-5 py-3.5 text-[--text-secondary]">{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Popular templates */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-[--text-primary]">Popular templates</h2>
            <Link href="/templates" className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors">
              All templates →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {popularTemplates.map(t => (
              <Link
                key={t.id}
                href={`/templates/${t.id}`}
                className="p-6 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full border border-[--border] text-[--text-muted] font-mono">{t.category}</span>
                </div>
                <h3 className="text-[--text-primary] font-medium mb-2 group-hover:text-[--forge-green] transition-colors">{t.name}</h3>
                <p className="text-sm text-[--text-secondary] leading-relaxed">{t.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
          <h2 className="text-2xl font-medium text-[--text-primary] mb-3">Simple pricing</h2>
          <p className="text-[--text-secondary] mb-8">Free to start. Upgrade when you need more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Free', price: '$0', note: '5 builds/month', cta: 'Start free' },
              { name: 'Pro', price: '$19/mo', note: 'Unlimited builds', cta: 'Upgrade', highlight: true },
              { name: 'Agency', price: '$79/mo', note: 'White-label + API', cta: 'Get Agency' },
            ].map(plan => (
              <div
                key={plan.name}
                className={`p-6 rounded-xl border ${plan.highlight ? 'border-[--forge-green]/40 bg-[--forge-green]/5' : 'border-[--border] bg-[--surface-1]'}`}
              >
                <p className="font-medium text-[--text-primary] mb-1">{plan.name}</p>
                <p className={`text-2xl font-mono mb-1 ${plan.highlight ? 'text-[--forge-green]' : 'text-[--text-primary]'}`}>{plan.price}</p>
                <p className="text-xs text-[--text-muted] mb-4">{plan.note}</p>
                <Link
                  href="/pricing"
                  className={`block text-sm py-2 rounded-lg transition-colors ${plan.highlight ? 'bg-[--forge-green] text-black hover:bg-[--forge-green-dim]' : 'border border-[--border] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-bright]'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Recent articles */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium text-[--text-primary]">From the journal</h2>
            <Link href="/journal" className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors">
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentArticles.map(a => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group"
              >
                <div className="p-6 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors h-full">
                  <span className="text-xs text-[--text-muted] font-mono">{a.category} · {a.readTime} min</span>
                  <h3 className="text-[--text-primary] font-medium mt-2 mb-2 leading-snug group-hover:text-[--forge-green] transition-colors">{a.title}</h3>
                  <p className="text-sm text-[--text-secondary] leading-relaxed line-clamp-2">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-[--border]">
          <div className="max-w-3xl mx-auto px-4 py-24 text-center">
            <h2 className="font-display text-4xl sm:text-5xl text-[--text-primary] italic mb-4">
              Ready to build?
            </h2>
            <p className="text-[--text-secondary] mb-8">
              5 free builds. No credit card. Production-grade Next.js from your first prompt.
            </p>
            <Link
              href="/sign-up"
              className="inline-block px-8 py-3.5 bg-[--forge-green] text-black font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              Start building free →
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
