import type { MetadataRoute } from "next"
import { articles, articleCategories } from "@/lib/articles"
import { tutorials } from "@/lib/tutorials"
import { TEMPLATES } from "@/lib/templates"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://claudeforge.shop"
  const now = new Date()

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/pricing", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/tutorials", priority: 0.8 },
    { path: "/demo", priority: 0.8 },
    { path: "/generate", priority: 0.8 },
    { path: "/templates", priority: 0.8 },
    { path: "/changelog", priority: 0.7 },
    { path: "/methodology", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/journal", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/disclosure", priority: 0.3 },
    { path: "/docs/api", priority: 0.6 },
  ].map(r => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }))

  const blogRoutes = articles.map(a => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const journalRoutes = articles.map(a => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const categoryRoutes = articleCategories.map(c => ({
    url: `${base}/journal/category/${c.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const tutorialRoutes = tutorials.map(t => ({
    url: `${base}/tutorials/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const templateRoutes = TEMPLATES.map(t => ({
    url: `${base}/templates/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes, ...journalRoutes, ...categoryRoutes, ...tutorialRoutes, ...templateRoutes]
}
