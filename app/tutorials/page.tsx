import Link from "next/link"
import { getAllTutorials } from "@/lib/tutorials"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deep Tutorials",
  description: "Step-by-step deep tutorials on building production apps with FORGE, Claude, and modern web tools.",
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function TutorialsPage() {
  const tutorials = getAllTutorials()

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Deep Tutorials</h1>
      <p className="text-zinc-400 mb-14 max-w-2xl">Long-form, chapter-by-chapter build guides. Follow along from empty folder to deployed product.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {tutorials.map(t => (
          <Link
            key={t.slug}
            href={`/tutorials/${t.slug}`}
            className="group p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[t.difficulty] ?? ""}`}>
                {t.difficulty}
              </span>
              <span className="text-xs text-zinc-500">{t.duration}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-200">{t.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-1">{t.subtitle}</p>
            <p className="mt-4 text-xs text-zinc-500">{t.author} · {t.publishedAt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
