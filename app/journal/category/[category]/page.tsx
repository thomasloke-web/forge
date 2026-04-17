import Link from "next/link"
import { notFound } from "next/navigation"
import { articles, articleCategories } from "@/lib/articles"
import type { Metadata } from "next"

export function generateStaticParams() {
  return articleCategories.map(c => ({ category: c.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const match = articleCategories.find(c => c.toLowerCase() === category)
  if (!match) return { title: "Not Found" }
  return {
    title: `${match} — FORGE Journal`,
    description: `${match} articles about AI code generation and app building with FORGE.`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const match = articleCategories.find(c => c.toLowerCase() === category)
  if (!match) notFound()

  const filtered = articles
    .filter(a => a.category === match)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <nav className="text-xs text-zinc-500 mb-6 flex gap-1.5">
        <Link href="/" className="hover:text-white">Home</Link> <span>/</span>
        <Link href="/journal" className="hover:text-white">Journal</Link> <span>/</span>
        <span className="text-zinc-300">{match}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{match}</h1>
      <p className="text-zinc-400 mb-10">{filtered.length} article{filtered.length !== 1 ? "s" : ""} in this category.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map(a => (
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
    </div>
  )
}
