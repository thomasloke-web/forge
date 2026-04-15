import { notFound } from "next/navigation"
import Link from "next/link"
import { ARTICLES, getArticle } from "@/lib/articles"

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  return a ? { title: a.title, description: a.description } : {}
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) notFound()
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-widest text-orange-400 mb-3">{a.tags[0]}</p>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">{a.title}</h1>
      <p className="text-lg text-zinc-400 leading-relaxed mb-8">{a.description}</p>
      <p className="text-xs text-zinc-500 pb-10 border-b border-zinc-800">By {a.author} · {new Date(a.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {a.readTime}</p>
      <div className="prose prose-invert max-w-none mt-10 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-orange-400">
        {a.body.split("\n\n").map((block, i) => {
          if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>
          return <p key={i}>{block}</p>
        })}
      </div>
      <div className="mt-16 pt-10 border-t border-zinc-800">
        <Link href="/journal" className="text-orange-400 hover:text-orange-300 text-sm">← Back to Journal</Link>
      </div>
    </article>
  )
}
