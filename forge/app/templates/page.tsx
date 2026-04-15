import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { templates } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Templates — FORGE AI App Builder',
  description: '15 production-ready Next.js app templates. SaaS starter, client portal, waitlist manager, invoice generator and more. Customise with your prompt.',
}

const categories = [...new Set(templates.map(t => t.category))]

export default function TemplatesPage() {
  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-10">
            <h1 className="text-4xl font-medium text-[--text-primary] mb-3">Templates</h1>
            <p className="text-[--text-secondary]">Start from a proven scaffold. Customise the prompt, FORGE generates the code.</p>
          </div>

          {categories.map(cat => (
            <div key={cat} className="mb-14">
              <p className="text-xs text-[--text-muted] uppercase tracking-wider font-mono mb-5">{cat}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {templates.filter(t => t.category === cat).map(t => (
                  <Link key={t.id} href={`/templates/${t.id}`} className="group">
                    <div className="p-6 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors h-full">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-mono text-[--text-muted] px-2 py-1 border border-[--border] rounded-full">{t.category}</span>
                        {t.popular && <span className="text-xs text-[--forge-green] font-mono">Popular</span>}
                      </div>
                      <h2 className="text-[--text-primary] font-medium mb-2 group-hover:text-[--forge-green] transition-colors">{t.name}</h2>
                      <p className="text-sm text-[--text-secondary] leading-relaxed">{t.description}</p>
                      <p className="text-xs text-[--forge-green] mt-4 group-hover:underline">Use template →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
