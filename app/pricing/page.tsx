import Link from "next/link"
import { Check } from "lucide-react"

export const metadata = { title: "Pricing" }

const PLANS = [
  { name: "Free", price: 0, cta: "Start free", features: ["3 generations/month", "All 15 templates", "Export code", "Deploy anywhere"] },
  { name: "Pro", price: 19, cta: "Go Pro", highlight: true, features: ["100 generations/month", "All templates", "Priority queue", "Longer outputs", "Email support"] },
  { name: "Agency", price: 79, cta: "Upgrade", features: ["Unlimited generations", "Team seats (5)", "Custom templates", "Dedicated support", "Invoice billing"] },
]

const FAQ = [
  { q: "Do I own the code?", a: "Yes. Every generation exports a clean Next.js project with no runtime dependency on Forge." },
  { q: "Which AI model do you use?", a: "Claude Opus 4.6 — exclusively. We do not route to cheaper models behind the scenes." },
  { q: "Can I deploy elsewhere?", a: "Yes. Forge code deploys to Vercel, Netlify, Cloudflare Pages, or any Node.js host." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel any time from your dashboard. No contracts." },
  { q: "Is there a free trial?", a: "The free plan gives you 3 full generations every month. No credit card required." },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Simple, honest pricing.</h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">Start free. Upgrade when you're shipping.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(p => (
          <div key={p.name} className={`rounded-2xl p-8 border ${p.highlight ? "border-orange-500 bg-zinc-900/50" : "border-zinc-800"}`}>
            <p className="text-sm uppercase tracking-widest text-orange-400">{p.name}</p>
            <p className="mt-2 text-4xl font-semibold">${p.price}<span className="text-base text-zinc-500 font-normal">/mo</span></p>
            <ul className="mt-6 space-y-3">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {f}</li>
              ))}
            </ul>
            <Link href="/sign-up" className={`mt-8 block text-center px-5 py-2.5 rounded-full font-medium ${p.highlight ? "bg-orange-500 text-zinc-950 hover:bg-orange-400" : "border border-zinc-700 hover:border-zinc-500"}`}>{p.cta}</Link>
          </div>
        ))}
      </div>
      <div className="mt-24">
        <h2 className="text-2xl font-semibold mb-8 text-center">Frequently asked</h2>
        <div className="max-w-2xl mx-auto divide-y divide-zinc-800 border border-zinc-800 rounded-2xl">
          {FAQ.map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer font-medium list-none flex justify-between items-center">{f.q}<span className="text-orange-400 group-open:rotate-45 transition">+</span></summary>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
