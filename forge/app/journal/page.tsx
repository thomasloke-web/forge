import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { articles, categories } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Journal — FORGE AI App Builder',
  description: 'Articles on vibe coding, AI app builders, Next.js, prompt engineering, and shipping production apps with AI.',
}

export default function JournalPage() {
  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-medium text-[--text-primary] mb-3">Journal</h1>
            <p className="text-[--text-secondary]">Guides, comparisons, and deep dives on building with AI.</p>
          </div>

          <div className="flex gap-2 flex-wrap mb-10">
            <span className="px-3 py-1.5 rounded-full border border-[--forge-green]/40 bg-[--forge-green]/5 text-xs text-[--forge-green] font-mono">All</span>
            {categories.map(c => (
              <span key={c} className="px-3 py-1.5 rounded-full border border-[--border] text-xs text-[--text-muted] font-mono hover:border-[--border-bright] cursor-pointer transition-colors">
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.map(a => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group">
                <article className="p-6 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-[--text-muted]">{a.category}</span>
                    <span className="text-[--text-muted] text-xs">·</span>
                    <span className="text-xs text-[--text-muted]">{a.readTime} min read</span>
                  </div>
                  <h2 className="text-[--text-primary] font-medium mb-2 leading-snug group-hover:text-[--forge-green] transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-sm text-[--text-secondary] leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <p className="text-xs text-[--text-muted] mt-4 font-mono">
                    {new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
