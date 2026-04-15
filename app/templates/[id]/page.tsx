import { notFound } from "next/navigation"
import Link from "next/link"
import { TEMPLATES, getTemplate } from "@/lib/templates"
import { ArrowRight } from "lucide-react"

export async function generateStaticParams() {
  return TEMPLATES.map(t => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = getTemplate(id)
  return t ? { title: t.name, description: t.description } : {}
}

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = getTemplate(id)
  if (!t) notFound()
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-widest text-orange-400 mb-3">{t.category}</p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">{t.name}</h1>
      <p className="text-zinc-400 leading-relaxed mb-8">{t.description}</p>
      <div className="flex gap-2 flex-wrap mb-10">
        {t.tags.map(tag => <span key={tag} className="text-xs uppercase tracking-wider text-zinc-500 border border-zinc-800 rounded-full px-3 py-1">{tag}</span>)}
      </div>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Prompt preview</p>
        <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">{t.prompt}</pre>
      </div>
      <Link href={`/generate?template=${t.id}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">
        Use this template <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
