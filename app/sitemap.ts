import type { MetadataRoute } from "next"
import { ARTICLES } from "@/lib/articles"
import { TEMPLATES } from "@/lib/templates"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://claudeforge.shop"
  const now = new Date()
  const staticRoutes = ["", "/generate", "/templates", "/pricing", "/journal", "/about", "/contact"].map(p => ({
    url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8,
  }))
  const articleRoutes = ARTICLES.map(a => ({
    url: `${base}/journal/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "monthly" as const, priority: 0.7,
  }))
  const templateRoutes = TEMPLATES.map(t => ({
    url: `${base}/templates/${t.id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6,
  }))
  return [...staticRoutes, ...articleRoutes, ...templateRoutes]
}
