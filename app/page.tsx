import Link from "next/link"
import { ArrowRight, Check, Sparkles, Code, Zap } from "lucide-react"
import { ARTICLES } from "@/lib/articles"

export default function Home() {
  const featured = ARTICLES.slice(0, 3)
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-24 text-center">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-orange-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Powered by Claude Opus 4.6
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl mx-auto">
          Forge production-ready apps from plain English.
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Describe what you want. Get a full Next.js app you actually own. Deploy to Vercel, Netlify, or Cloudflare — your choice.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <Link href="/generate" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">
            Start generating <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/templates" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-200 hover:border-zinc-500">
            Browse templates
          </Link>
        </div>
        <div className="mt-20 mx-auto max-w-3xl text-left bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/5">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">forge · terminal</span>
          </div>
          <pre className="p-6 text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto">
{`$ forge build "a pricing page with 3 tiers and annual toggle"

→ Claude Opus 4.6 thinking...
→ Generated app/pricing/page.tsx  (2.4 kB)
→ Generated components/pricing-card.tsx  (1.1 kB)
→ Generated lib/plans.ts  (412 B)
→ Build: OK · 0 errors · 0 warnings
→ Deploy: vercel --prod`}
          </pre>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 border-t border-zinc-900">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-14">Why FORGE vs the alternatives</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-3 pr-4 font-medium"></th>
                <th className="py-3 px-4 font-medium">FORGE</th>
                <th className="py-3 px-4 font-medium">Lovable</th>
                <th className="py-3 px-4 font-medium">Bolt</th>
                <th className="py-3 px-4 font-medium">v0</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {([
                ["Claude Opus 4.6", true, false, false, false],
                ["Exportable Next.js code", true, "partial", true, true],
                ["Deploy anywhere", true, false, "partial", false],
                ["15 production templates", true, false, false, false],
                ["Streaming generation", true, true, true, true],
                ["No platform lock-in", true, false, "partial", false],
              ] as const).map((row, i) => (
                <tr key={i} className="border-b border-zinc-900">
                  <td className="py-3 pr-4 text-zinc-400">{row[0]}</td>
                  {row.slice(1).map((v, j) => (
                    <td key={j} className="py-3 px-4">
                      {v === true ? <Check className="w-4 h-4 text-green-400" /> : v === "partial" ? <span className="text-yellow-400">~</span> : <span className="text-zinc-600">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 border-t border-zinc-900">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">From the Journal</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(a => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition">
              <p className="text-xs uppercase tracking-widest text-orange-400 mb-2">{a.tags[0]}</p>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-200">{a.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{a.description}</p>
              <p className="mt-4 text-xs text-zinc-500">{a.author} · {a.readTime}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/journal" className="text-sm text-orange-400 hover:text-orange-300 inline-flex items-center gap-2">
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 border-t border-zinc-900 text-center">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Code className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">You own the code</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Exportable Next.js projects. No runtime, no proprietary SDK.</p>
          </div>
          <div>
            <Zap className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Deploy anywhere</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Vercel, Netlify, Cloudflare Pages, or run it locally.</p>
          </div>
          <div>
            <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Best model, always</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Claude Opus 4.6 exclusively. No routing to cheaper models.</p>
          </div>
        </div>
      </section>
    </>
  )
}
