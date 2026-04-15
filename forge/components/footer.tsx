'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = {
  product: [
    { href: '/generate', label: 'Build an app' },
    { href: '/templates', label: 'Templates' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/journal', label: 'Journal' },
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
  ],
  deploy: [
    { href: 'https://pages.cloudflare.com', label: 'Cloudflare Pages', external: true },
    { href: 'https://netlify.com', label: 'Netlify', external: true },
    { href: 'https://supabase.com', label: 'Supabase', external: true },
    { href: 'https://clerk.com', label: 'Clerk', external: true },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="border-t border-[--border] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-mono text-[--forge-green] font-medium text-lg">FORGE</span>
            <p className="text-[--text-secondary] text-sm mt-3 max-w-xs leading-relaxed">
              AI app builder powered by Claude. Generate production-grade Next.js 15 apps. Deploy free on Cloudflare Pages.
            </p>
            <div className="mt-6">
              <p className="text-xs text-[--text-muted] mb-3">New articles and updates</p>
              {status === 'done' ? (
                <p className="text-sm text-[--forge-green]">You&apos;re in.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 min-w-0 px-3 py-2 bg-[--surface-2] border border-[--border] rounded-lg text-sm text-[--text-primary] placeholder:text-[--text-muted] forge-input"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-4 py-2 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] disabled:opacity-50 transition-colors"
                  >
                    {status === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </form>
              )}
              {status === 'error' && <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>}
            </div>
          </div>

          <div>
            <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-4">Product</p>
            <ul className="space-y-2.5">
              {links.product.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-2.5">
              {links.company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-4">Deploy on</p>
            <ul className="space-y-2.5">
              {links.deploy.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[--border] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[--text-muted]">
            © 2026 NorwegianSpark SA · Org no: 834 984 172 · norwegianspark@gmail.com · +47 99 73 74 67
          </p>
          <p className="text-xs text-[--text-muted]">
            Built with Claude · Deployed on Cloudflare Pages
          </p>
        </div>
      </div>
    </footer>
  )
}
