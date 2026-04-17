import Link from "next/link"
import { Flame, ShieldCheck } from "lucide-react"

function TrustBadge({ siteName }: { siteName: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 text-xs text-zinc-400">
      <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
      <span>{siteName} — AI-Powered · Verified Business</span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <span>FORGE</span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            AI App Builder powered by Claude Opus 4.6. You own the code. Deploy anywhere.
          </p>
          <div className="mt-4">
            <TrustBadge siteName="FORGE" />
          </div>
          <p className="mt-3 text-xs text-zinc-500">Payments secured by Stripe</p>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-6 mb-2">More from NorwegianSpark</p>
          <ul className="space-y-1.5 text-sm text-zinc-400">
            <li><a href="https://aivault.zone" target="_blank" rel="noopener noreferrer" className="hover:text-white">aivault.zone</a></li>
            <li><a href="https://aureumandco.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">aureumandco.com</a></li>
            <li><a href="https://cognixcore.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">cognixcore.com</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Product</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
            <li><Link href="/changelog" className="hover:text-white">Changelog</Link></li>
            <li><Link href="/docs/api" className="hover:text-white">API Docs</Link></li>
            <li><Link href="/generate" className="hover:text-white">Generate</Link></li>
            <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Company</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-6 mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/disclosure" className="hover:text-white">Disclosure</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="mailto:norwegianspark@gmail.com" className="hover:text-white">norwegianspark@gmail.com</a></li>
            <li><a href="tel:+4799737467" className="hover:text-white">+47 99 73 74 67</a></li>
            <li className="text-zinc-500 text-xs">NorwegianSpark SA</li>
            <li className="text-zinc-500 text-xs">Org no: 834 984 172</li>
            <li className="text-zinc-500 text-xs">Bank: 3624 19 61537</li>
          </ul>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-6 mb-3">@norwegianspark</p>
          <ul className="space-y-1.5 text-sm text-zinc-400">
            <li><a href="https://instagram.com/norwegianspark" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://linkedin.com/company/norwegianspark" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            <li><a href="https://x.com/norwegianspark" target="_blank" rel="noopener noreferrer" className="hover:text-white">X / Twitter</a></li>
            <li><a href="https://pinterest.com/norwegianspark" target="_blank" rel="noopener noreferrer" className="hover:text-white">Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        © 2026 NorwegianSpark SA. All rights reserved.
      </div>
    </footer>
  )
}
