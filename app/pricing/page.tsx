import Link from "next/link"
import { Check, X } from "lucide-react"

export const revalidate = 86400
export const metadata = { title: "Pricing" }

const PLANS = [
  {
    name: "Free",
    price: 0,
    cta: "Start free",
    href: "/sign-up",
    features: [
      "5 generations/day",
      "Claude Haiku model",
      "Code export (ZIP download)",
      "FORGE watermark in generated code",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: 29,
    cta: "Go Pro",
    href: "/sign-up",
    highlight: true,
    badge: "MOST POPULAR",
    features: [
      "100 generations/day",
      "Claude Sonnet model",
      "Save unlimited projects",
      "Deploy guides (Vercel, Cloudflare, Netlify)",
      "No watermark",
      "Email support",
    ],
  },
  {
    name: "Agency",
    price: 99,
    cta: "Upgrade",
    href: "/sign-up",
    features: [
      "Unlimited generations",
      "Claude Sonnet + Opus models",
      "White-label generated code",
      "Client dashboard",
      "API access with your own key",
      "Scheduled builds",
      "Priority support (< 24h response)",
    ],
  },
]

const COMPARISON = [
  { feature: "Daily generations", free: "5", pro: "100", agency: "Unlimited" },
  { feature: "AI model", free: "Haiku", pro: "Sonnet", agency: "Sonnet + Opus" },
  { feature: "Code export", free: true, pro: true, agency: true },
  { feature: "Save projects", free: false, pro: true, agency: true },
  { feature: "Deploy guides", free: false, pro: true, agency: true },
  { feature: "No watermark", free: false, pro: true, agency: true },
  { feature: "White-label branding", free: false, pro: false, agency: true },
  { feature: "Client dashboard", free: false, pro: false, agency: true },
  { feature: "API access", free: false, pro: false, agency: true },
  { feature: "Scheduled builds", free: false, pro: false, agency: true },
  { feature: "Email support", free: false, pro: true, agency: true },
  { feature: "Priority support", free: false, pro: false, agency: true },
]

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your dashboard at any time. Your plan stays active through the current billing period. No contracts, no questions." },
  { q: "Do you offer refunds?", a: "We offer a full refund within 7 days of your first payment if you're not satisfied. After that, you can cancel anytime but refunds are not available." },
  { q: "Can I add team members?", a: "Not yet — team seats are on our roadmap. For now, each account is single-user. Agency plan users can manage client projects through the client dashboard." },
  { q: "What are the token limits per generation?", a: "Free: 1,500 tokens (short pages). Pro: 4,000 tokens (full pages + components). Agency: 8,000 tokens (complete multi-file apps)." },
  { q: "Which AI models can I use?", a: "Free gets Claude Haiku (fast, efficient). Pro gets Claude Sonnet (balanced quality). Agency gets both Sonnet and Opus (highest quality, longest output)." },
  { q: "What does white-label include?", a: "Agency users can set their own brand name, logo URL, and primary color. Generated code will use your brand instead of FORGE in all headers, footers, and metadata." },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Simple, honest pricing.</h1>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">Start free. Upgrade when you&apos;re shipping.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(p => (
          <div key={p.name} className={`relative rounded-2xl p-8 border ${p.highlight ? "border-orange-500 bg-zinc-900/50" : "border-zinc-800"}`}>
            {p.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-zinc-950 text-[10px] font-semibold uppercase tracking-widest">
                {p.badge}
              </span>
            )}
            <p className="text-sm uppercase tracking-widest text-orange-400">{p.name}</p>
            <p className="mt-2 text-4xl font-semibold">${p.price}<span className="text-base text-zinc-500 font-normal">/mo</span></p>
            <ul className="mt-6 space-y-3">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`mt-8 block text-center px-5 py-2.5 rounded-full font-medium ${p.highlight ? "bg-orange-500 text-zinc-950 hover:bg-orange-400" : "border border-zinc-700 hover:border-zinc-500"}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Compare plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-3 pr-4 font-medium">Feature</th>
                <th className="py-3 px-4 font-medium">Free</th>
                <th className="py-3 px-4 font-medium">Pro</th>
                <th className="py-3 px-4 font-medium">Agency</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {COMPARISON.map((row, i) => (
                <tr key={i} className="border-b border-zinc-900">
                  <td className="py-3 pr-4 text-zinc-400">{row.feature}</td>
                  {(["free", "pro", "agency"] as const).map(plan => {
                    const v = row[plan]
                    return (
                      <td key={plan} className="py-3 px-4">
                        {v === true ? <Check className="w-4 h-4 text-green-400" /> : v === false ? <X className="w-4 h-4 text-zinc-700" /> : <span>{v}</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-2xl font-semibold mb-8 text-center">Frequently asked</h2>
        <div className="max-w-2xl mx-auto divide-y divide-zinc-800 border border-zinc-800 rounded-2xl">
          {FAQ.map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer font-medium list-none flex justify-between items-center">
                {f.q}
                <span className="text-orange-400 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
