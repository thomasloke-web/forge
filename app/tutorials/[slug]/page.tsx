import Link from "next/link"
import { notFound } from "next/navigation"
import { tutorials, getTutorialBySlug } from "@/lib/tutorials"
import type { Metadata } from "next"

export function generateStaticParams() {
  return tutorials.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tutorial = getTutorialBySlug(slug)
  if (!tutorial) return { title: "Not Found" }
  const title = tutorial.title.length > 60 ? tutorial.title.slice(0, 57) + "..." : tutorial.title
  return {
    title,
    description: tutorial.description,
    alternates: { canonical: `https://claudeforge.shop/tutorials/${slug}` },
    openGraph: {
      title,
      description: tutorial.description,
      type: "article",
      publishedTime: tutorial.publishedAt,
      modifiedTime: tutorial.updatedAt,
      authors: [tutorial.author],
    },
  }
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutorial = getTutorialBySlug(slug)
  if (!tutorial) notFound()

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://claudeforge.shop" },
      { "@type": "ListItem", position: 2, name: "Tutorials", item: "https://claudeforge.shop/tutorials" },
      { "@type": "ListItem", position: 3, name: tutorial.title },
    ],
  }

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.description,
    totalTime: tutorial.duration,
    step: tutorial.chapters.map(ch => ({
      "@type": "HowToStep",
      position: ch.number,
      name: ch.title,
      text: ch.body.slice(0, 200),
    })),
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tutorial.title,
    description: tutorial.description,
    datePublished: tutorial.publishedAt,
    dateModified: tutorial.updatedAt,
    author: { "@type": "Person", name: tutorial.author },
    publisher: { "@type": "Organization", name: "NorwegianSpark SA" },
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <nav className="text-xs text-zinc-500 mb-6 flex gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-white">Home</Link> <span>/</span>
          <Link href="/tutorials" className="hover:text-white">Tutorials</Link> <span>/</span>
          <span className="text-zinc-300">{tutorial.title}</span>
        </nav>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[tutorial.difficulty] ?? ""}`}>
              {tutorial.difficulty}
            </span>
            <span className="text-xs text-zinc-500">{tutorial.duration}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">{tutorial.title}</h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-2">{tutorial.subtitle}</p>
          <p className="text-sm text-zinc-500">By {tutorial.author} · {tutorial.publishedAt}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-zinc-800 p-6">
            <h2 className="font-semibold mb-3">What you will build</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              {tutorial.whatYouWillBuild.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 p-6">
            <h2 className="font-semibold mb-3">Prerequisites</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              {tutorial.prerequisites.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="lg:sticky lg:top-24">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Chapters</h3>
              <ul className="space-y-2 text-sm">
                {tutorial.chapters.map(ch => (
                  <li key={ch.number}>
                    <a href={`#chapter-${ch.number}`} className="text-zinc-400 hover:text-white flex justify-between">
                      <span>{ch.number}. {ch.title}</span>
                      <span className="text-zinc-600 text-xs">{ch.estimatedMinutes}m</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            {tutorial.chapters.map(ch => (
              <section key={ch.number} id={`chapter-${ch.number}`} className="mb-16 scroll-mt-24">
                <h2 className="text-2xl font-semibold mb-1">Chapter {ch.number}: {ch.title}</h2>
                <p className="text-xs text-zinc-500 mb-6">~{ch.estimatedMinutes} min</p>
                <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-a:text-orange-400">
                  {ch.body.split("\n\n").map((block, i) => {
                    if (block.startsWith("## ")) return <h3 key={i} className="text-xl font-semibold mt-8 mb-3">{block.slice(3)}</h3>
                    if (block.startsWith("```")) {
                      const lines = block.split("\n")
                      const code = lines.slice(1, -1).join("\n")
                      return <pre key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre my-4">{code}</pre>
                    }
                    return <p key={i}>{block}</p>
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </>
  )
}
