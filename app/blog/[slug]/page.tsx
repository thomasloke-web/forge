import Link from "next/link"
import { notFound } from "next/navigation"
import { articles, getArticleBySlug, getArticlesByCategory } from "@/lib/articles"
import type { Metadata } from "next"

export const revalidate = 86400

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Not Found" }
  const title = article.title.length > 60 ? article.title.slice(0, 57) + "..." : article.title
  return {
    title,
    description: article.description,
    alternates: { canonical: `https://claudeforge.shop/blog/${slug}` },
    openGraph: {
      title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    twitter: { card: "summary_large_image", title, description: article.description },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getArticlesByCategory(article.category)
    .filter(a => a.slug !== slug)
    .slice(0, 3)

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://claudeforge.shop" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://claudeforge.shop/blog" },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "NorwegianSpark SA" },
  }

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <nav className="text-xs text-zinc-500 mb-6 flex gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link> <span>/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
        </nav>
        <p className="text-xs uppercase tracking-widest text-orange-400 mb-3">{article.category}</p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">{article.title}</h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-8">{article.description}</p>
        <p className="text-xs text-zinc-500 pb-10 border-b border-zinc-800">
          By {article.author} — {article.publishedAt}, last updated {article.updatedAt}
        </p>
        <div className="prose prose-invert max-w-none mt-10 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-orange-400">
          {article.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>
            return <p key={i}>{block}</p>
          })}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <h2 className="text-xl font-semibold mb-6">Related articles</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group p-5 rounded-xl border border-zinc-800 hover:border-zinc-600 transition">
                <h3 className="font-medium mb-1 group-hover:text-orange-200 text-sm">{a.title}</h3>
                <p className="text-xs text-zinc-500">{a.readingTime} min · {a.author}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </>
  )
}
