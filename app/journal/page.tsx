import Link from "next/link"
import { articles, articleCategories } from "@/lib/articles"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles on AI code generation, app building, and deploying with FORGE. Comparisons, guides, and tutorials.",
}

export default function JournalPage() {
  const grouped = articleCategories.map(cat => ({
    category: cat,
    items: articles
      .filter(a => a.category === cat)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
  }))

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Journal</h1>
      <p className="text-zinc-400 mb-14 max-w-2xl">Honest takes on AI code generation, builder comparisons, and production deployment.</p>

      {grouped.map(group => (
        <section key={group.category} className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{group.category}</h2>
            <Link
              href={`/journal/category/${group.category.toLowerCase()}`}
              className="text-sm text-orange-400 hover:text-orange-300"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {group.items.map(a => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 transition"
              >
                <p className="text-xs uppercase tracking-widest text-orange-400 mb-2">{a.category}</p>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-200">{a.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{a.description}</p>
                <p className="mt-4 text-xs text-zinc-500">{a.author} · {a.readingTime} min read · {a.publishedAt}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
