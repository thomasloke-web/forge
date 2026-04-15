import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@clerk/nextjs/server"
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

  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const { prompt, template, style } = parsed.data
  const tpl = template ? getTemplate(template) : undefined
  const systemPrompt = `You are FORGE, an expert full-stack engineer. Output production-ready Next.js 16 App Router TypeScript + Tailwind code. ${style ? `Design style: ${style}.` : ""}`
  const userPrompt = tpl ? `${tpl.prompt}\n\nAdditional instructions: ${prompt}` : prompt

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: "Model not configured" }, { status: 503 })

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 8192,
        stream: true,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    })

    if (!anthropicRes.ok || !anthropicRes.body) {
      const errText = await anthropicRes.text().catch(() => "")
      console.error("Anthropic error:", anthropicRes.status, errText)
      return NextResponse.json({ error: "Model request failed" }, { status: 502 })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = anthropicRes.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""
            for (const line of lines) {
              if (!line.startsWith("data:")) continue
              try {
                const evt = JSON.parse(line.slice(5).trim())
                if (evt.type === "content_block_delta" && evt.delta?.text) {
                  controller.enqueue(encoder.encode(evt.delta.text))
                }
              } catch {}
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } })
  } catch (err) {
    console.error("generate error", err)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
