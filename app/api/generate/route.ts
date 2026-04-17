import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import Anthropic from "@anthropic-ai/sdk"
import { getTemplate } from "@/lib/templates"
import { getSystemPrompt, MODEL_CONFIG, calculateCostCents } from "@/lib/system-prompts"
import { getUserPlan, getWhiteLabelConfig, ensureUser } from "@/lib/user-plan"
import { checkDailyLimit, checkMonthlyBudget, sendBudgetAlert } from "@/lib/cost-guard"
import { getSupabaseAdmin } from "@/lib/supabase"
import * as Sentry from "@sentry/nextjs"

export const runtime = "nodejs"
export const maxDuration = 300

const schema = z.object({
  prompt: z.string().min(1).max(4000),
  template: z.string().optional(),
  style: z.string().optional(),
})

export async function POST(req: NextRequest) {
  let userId: string | null = null
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
    try {
      const { auth } = await import("@clerk/nextjs/server")
      const { userId: uid } = await auth()
      userId = uid ?? null
    } catch {}
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } else {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }

  await ensureUser(userId)

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: "Model not configured" }, { status: 503 })

  const plan = await getUserPlan(userId)

  const dailyCheck = await checkDailyLimit(userId, plan)
  if (!dailyCheck.allowed) {
    return NextResponse.json(
      { error: "Daily generation limit reached", remaining: 0 },
      { status: 429, headers: { "Retry-After": "86400" } }
    )
  }

  const budgetCheck = await checkMonthlyBudget()
  if (!budgetCheck.allowed) {
    return NextResponse.json(
      { error: "Service temporarily at capacity. Please try again later." },
      { status: 503 }
    )
  }

  if (budgetCheck.usedCents >= budgetCheck.budgetCents * 0.8) {
    sendBudgetAlert(budgetCheck.usedCents, budgetCheck.budgetCents).catch(() => {})
  }

  const { prompt, template, style } = parsed.data
  const tpl = template ? getTemplate(template) : undefined
  const userPrompt = tpl ? `${tpl.prompt}\n\nAdditional instructions: ${prompt}` : prompt

  const whiteLabel = plan === "agency" ? await getWhiteLabelConfig(userId) : undefined
  const systemPrompt = getSystemPrompt(plan, style, whiteLabel)
  const { model, maxTokens } = MODEL_CONFIG[plan]

  const supabase = getSupabaseAdmin()
  const { data: genRow } = await supabase
    .from("generations")
    .insert({
      user_id: userId,
      prompt,
      template_id: template ?? null,
      model,
      status: "streaming",
    })
    .select("id")
    .single()

  const generationId = genRow?.id

  try {
    const client = new Anthropic({ apiKey })
    const stream = client.messages.stream({
      model,
      max_tokens: maxTokens,
      system: [
        { type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userPrompt }],
    })

    let fullOutput = ""
    let inputTokens = 0
    let outputTokens = 0

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              fullOutput += event.delta.text
              const sseData = JSON.stringify({ type: "delta", text: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${sseData}\n\n`))
            }
          }

          const finalMessage = await stream.finalMessage()
          inputTokens = finalMessage.usage.input_tokens
          outputTokens = finalMessage.usage.output_tokens
          const costCents = calculateCostCents(model, inputTokens, outputTokens)

          const doneData = JSON.stringify({
            type: "done",
            model,
            inputTokens,
            outputTokens,
            costCents,
          })
          controller.enqueue(encoder.encode(`data: ${doneData}\n\n`))

          if (generationId) {
            await supabase.from("generations").update({
              input_tokens: inputTokens,
              output_tokens: outputTokens,
              total_cost_cents: costCents,
              status: "completed",
              code_output: fullOutput,
              completed_at: new Date().toISOString(),
            }).eq("id", generationId)
          }
        } catch (err) {
          console.error("stream error", err)
          const errData = JSON.stringify({ type: "error", message: "Generation failed" })
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`))

          if (generationId) {
            await supabase.from("generations").update({ status: "failed" }).eq("id", generationId)
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-store",
        "x-generation-id": generationId ?? "",
        "x-model": model,
      },
    })
  } catch (err) {
    Sentry.captureException(err)
    console.error("generate error", err)
    if (generationId) {
      await supabase.from("generations").update({ status: "failed" }).eq("id", generationId)
    }
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
