import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { getTemplate, templates } from '@/lib/templates'

export async function generateStaticParams() {
  return templates.map(t => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const template = getTemplate(id)
  if (!template) return {}
  return {
    title: `${template.name} template — FORGE`,
    description: template.description,
  }
}

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplate(id)
  if (!template) notFound()

  const related = templates.filter(t => t.category === template.category && t.id !== template.id).slice(0, 3)

  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <nav className="flex items-center gap-2 text-xs text-[--text-muted] mb-8 font-mono" aria-label="Breadcrumb">
            <Link href="/templates" className="hover:text-[--text-secondary] transition-colors">Templates</Link>
            <span>→</span>
            <span>{template.category}</span>
          </nav>

          <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
            <div>
              <span className="text-xs font-mono text-[--text-muted] mb-3 block">{template.category}</span>
              <h1 className="text-3xl font-medium text-[--text-primary] mb-2">{template.name}</h1>
              <p className="text-[--text-secondary]">{template.description}</p>
            </div>
            <Link
              href={`/generate?template=${template.id}`}
              className="px-5 py-2.5 bg-[--forge-green] text-black font-medium text-sm rounded-lg hover:bg-[--forge-green-dim] transition-colors shrink-0"
            >
              Use this template →
            </Link>
          </div>

          <div className="rounded-xl border border-[--border] bg-[--surface-1] overflow-hidden mb-12">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[--border]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-[--text-muted] font-mono">prompt</span>
            </div>
            <pre className="p-6 text-xs text-[--text-secondary] leading-relaxed whitespace-pre-wrap overflow-x-auto">
              {template.prompt}
            </pre>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/generate?template=${template.id}`}
              className="px-6 py-3 bg-[--forge-green] text-black font-medium text-sm rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              Build with this template →
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 border border-[--border] text-[--text-secondary] hover:text-[--text-primary] text-sm rounded-lg transition-colors"
            >
              Browse all templates
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <p className="text-xs text-[--text-muted] uppercase tracking-wider mb-5 font-mono">More {template.category} templates</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.id} href={`/templates/${r.id}`} className="group p-5 rounded-xl border border-[--border] hover:border-[--border-bright] transition-colors">
                    <p className="text-sm font-medium text-[--text-primary] group-hover:text-[--forge-green] transition-colors">{r.name}</p>
                    <p className="text-xs text-[--text-muted] mt-1 leading-snug">{r.description}</p>
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
