import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { getArticle, articles } from '@/lib/articles'

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — FORGE Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = articles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[--text-muted] mb-8 font-mono" aria-label="Breadcrumb">
            <Link href="/journal" className="hover:text-[--text-secondary] transition-colors">Journal</Link>
            <span>→</span>
            <span>{article.category}</span>
          </nav>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-full border border-[--border] text-xs text-[--text-muted] font-mono">{article.category}</span>
              <span className="text-xs text-[--text-muted]">{article.readTime} min read</span>
              <span className="text-xs text-[--text-muted] font-mono">
                {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-medium text-[--text-primary] leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-[--text-secondary] leading-relaxed">{article.excerpt}</p>
            <p className="text-xs text-[--text-muted] mt-4">
              Reviewed by Thomas &amp; Øyvind — <Link href="/about" className="hover:text-[--text-secondary] transition-colors">NorwegianSpark SA</Link> · Last updated {new Date(article.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </header>

          <div className="prose prose-invert prose-sm max-w-none text-[--text-secondary] leading-relaxed
            [&_h2]:text-[--text-primary] [&_h2]:font-medium [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-[--text-primary] [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-5 [&_p]:leading-relaxed
            [&_ul]:mb-5 [&_ul]:space-y-2 [&_li]:pl-1
            [&_code]:font-mono [&_code]:text-xs [&_code]:bg-[--surface-2] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[--forge-green]
            [&_strong]:text-[--text-primary] [&_strong]:font-medium
          ">
            {article.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i}>{para.slice(3)}</h2>
              }
              if (para.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-medium text-[--text-primary] mt-10 mb-4">{para.slice(2)}</h1>
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n').filter(l => l.startsWith('- '))
                return <ul key={i} className="list-disc list-inside space-y-1 mb-5">{items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}</ul>
              }
              return <p key={i}>{para}</p>
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-6 rounded-xl border border-[--forge-green]/20 bg-[--forge-green]/5">
            <p className="text-[--text-primary] font-medium mb-1">Try FORGE free</p>
            <p className="text-sm text-[--text-secondary] mb-4">5 builds per month, no credit card required. Generate your first Next.js app in minutes.</p>
            <Link
              href="/sign-up"
              className="inline-block px-5 py-2.5 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              Start building free →
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-5 font-mono">More in {article.category}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r.slug} href={`/journal/${r.slug}`} className="group p-5 rounded-xl border border-[--border] hover:border-[--border-bright] transition-colors">
                    <p className="text-sm font-medium text-[--text-primary] group-hover:text-[--forge-green] transition-colors leading-snug">{r.title}</p>
                    <p className="text-xs text-[--text-muted] mt-2">{r.readTime} min</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
