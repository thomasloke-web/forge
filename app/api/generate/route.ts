import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import Anthropic from "@anthropic-ai/sdk"
import { getTemplate } from "@/lib/templates"
import { rateLimit, getIp } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const maxDuration = 300

const schema = z.object({
  prompt: z.string().min(1).max(4000),
  template: z.string().optional(),
  style: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  if (!rateLimit(`gen:${ip}`, 10, 3600_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  let userId: string | null = null
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
    try {
      const { auth } = await import("@clerk/nextjs/server")
      const { userId: uid } = await auth()
      userId = uid ?? null
    } catch {}
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const { prompt, template, style } = parsed.data
  const tpl = template ? getTemplate(template) : undefined
  const SYSTEM_PROMPT = `You are FORGE, an expert full-stack engineer. Output production-ready Next.js 16 App Router TypeScript + Tailwind code. ${style ? `Design style: ${style}.` : ""}`
  const userPrompt = tpl ? `${tpl.prompt}\n\nAdditional instructions: ${prompt}` : prompt

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: "Model not configured" }, { status: 503 })

  try {
    const client = new Anthropic({ apiKey })
    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 8192,
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userPrompt }],
    })

    const encoder = new TextEncoder()
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } catch (err) {
          console.error("stream error", err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } })
  } catch (err) {
    console.error("generate error", err)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
