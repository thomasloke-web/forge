import Link from "next/link"
import { TEMPLATES, getTemplateCategories } from "@/lib/templates"

export const metadata = { title: "Templates" }

export default function TemplatesPage() {
  const categories = getTemplateCategories()
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Templates</h1>
      <p className="text-zinc-400 mb-10 max-w-2xl">15 production-grade starting points. Pick one and customize via prompt.</p>
      {categories.map(cat => (
        <div key={cat} className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-orange-400 mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {TEMPLATES.filter(t => t.category === cat).map(t => (
              <Link key={t.id} href={`/templates/${t.id}`} className="p-5 rounded-xl border border-zinc-800 hover:border-zinc-600 transition">
                <h3 className="font-semibold mb-1">{t.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{t.description}</p>
                <div className="mt-4 flex gap-1.5 flex-wrap">
                  {t.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded px-1.5 py-0.5">{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
