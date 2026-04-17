import { ImageResponse } from "next/og"
import { getArticleBySlug } from "@/lib/articles"

export const runtime = "edge"
export const alt = "FORGE Blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const title = article?.title ?? "FORGE Blog"
  const category = article?.category ?? "Article"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 16, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
          {category}
        </div>
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          {title}
        </div>
        <div style={{ marginTop: "auto", fontSize: 20, color: "#71717a", display: "flex", alignItems: "center", gap: 12 }}>
          FORGE — AI App Builder by NorwegianSpark SA
        </div>
      </div>
    ),
    { ...size }
  )
}
