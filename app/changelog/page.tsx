import type { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in FORGE — updates, improvements, and new features.",
}

const ENTRIES = [
  {
    date: "2026-04-17",
    version: "v2.0",
    title: "Agency plan + real Anthropic streaming",
    items: [
      "Real Claude API streaming — see tokens arrive live as your code generates",
      "Agency plan ($99/mo) with white-label, client dashboard, API access, scheduled builds",
      "Cost guardrails — daily rate limits per plan, monthly budget cap with email alerts",
      "Plan-based model selection: Free → Haiku, Pro → Sonnet, Agency → Opus",
      "Token usage tracking and cost reporting per generation",
    ],
  },
  {
    date: "2026-04-15",
    version: "v1.0",
    title: "Launch",
    items: [
      "15 production templates (SaaS, AI chat, portfolio, e-commerce, and more)",
      "Claude Opus 4.6 code generation with streaming output",
      "Clerk authentication with sign-in/sign-up flows",
      "Stripe billing for Pro and Agency plans",
      "Dashboard with project saving",
      "Deploy anywhere: Vercel, Netlify, Cloudflare Pages",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Changelog</h1>
      <p className="text-zinc-400 mb-14">What&apos;s new in FORGE.</p>

      <div className="space-y-12">
        {ENTRIES.map((entry, i) => (
          <div key={i} className="relative pl-6 border-l-2 border-zinc-800">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-orange-500" />
            <p className="text-xs text-zinc-500 mb-1">{entry.date} · {entry.version}</p>
            <h2 className="text-xl font-semibold mb-3">{entry.title}</h2>
            <ul className="space-y-2">
              {entry.items.map((item, j) => (
                <li key={j} className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
