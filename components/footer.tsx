import Link from "next/link"
import { Flame } from "lucide-react"

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
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Product</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/generate" className="hover:text-white">Generate</Link></li>
            <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Company</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/journal" className="hover:text-white">Journal</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href="mailto:thomaslien@norwegianspark.com" className="hover:text-white">thomaslien@norwegianspark.com</a></li>
            <li><a href="tel:+4799737467" className="hover:text-white">+47 99 73 74 67</a></li>
            <li className="text-zinc-500 text-xs">Org no: 834 984 172</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        © 2026 NorwegianSpark SA · Made in Norway
      </div>
    </footer>
  )
}
