import Link from "next/link"
import { ARTICLES } from "@/lib/articles"

export const metadata = { title: "Journal" }

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Journal</h1>
      <p className="text-zinc-400 mb-10">Notes on AI, app builders, and shipping.</p>
      <div className="divide-y divide-zinc-800">
        {ARTICLES.map(a => (
          <Link key={a.slug} href={`/journal/${a.slug}`} className="block py-7 group">
            <p className="text-xs uppercase tracking-widest text-orange-400 mb-2">{a.tags[0]}</p>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-orange-200">{a.title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{a.description}</p>
            <p className="mt-3 text-xs text-zinc-500">{a.author} · {new Date(a.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {a.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
