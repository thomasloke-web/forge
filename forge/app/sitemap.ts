import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'
import { templates } from '@/lib/templates'

const BASE = 'https://claudeforge.shop'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/templates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const templateRoutes: MetadataRoute.Sitemap = templates.map(t => ({
    url: `${BASE}/templates/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes, ...templateRoutes]
}
