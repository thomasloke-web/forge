import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import Anthropic from "@anthropic-ai/sdk"
import { getTemplate } from "@/lib/templates"
import { getSystemPrompt, MODEL_CONFIG, calculateCostCents } from "@/lib/system-prompts"
import { getWhiteLabelConfig } from "@/lib/user-plan"
import { checkDailyLimit, checkMonthlyBudget } from "@/lib/cost-guard"
import { getSupabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"
export const maxDuration = 300

const schema = z.object({
  prompt: z.string().min(1).max(4000),
  template: z.string().optional(),
  style: z.string().optional(),
  model: z.enum(["sonnet", "opus"]).optional(),
})

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 })
  }

  const apiKeyProvided = authHeader.slice(7)
  const supabase = getSupabaseAdmin()
  const { data: user } = await supabase
    .from("users")
    .select("clerk_id, plan, white_label_brand_name, white_label_logo_url, white_label_primary_color")
    .eq("api_key", apiKeyProvided)
    .single()

  if (!user || user.plan !== "agency") {
    return NextResponse.json({ error: "Invalid API key or insufficient plan" }, { status: 403 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  if (!anthropicKey) return NextResponse.json({ error: "Model not configured" }, { status: 503 })

  const dailyCheck = await checkDailyLimit(user.clerk_id, "agency")
  if (!dailyCheck.allowed) {
    return NextResponse.json({ error: "Daily limit reached" }, { status: 429, headers: { "Retry-After": "86400" } })
  }

  const budgetCheck = await checkMonthlyBudget()
  if (!budgetCheck.allowed) {
    return NextResponse.json({ error: "Service temporarily at capacity" }, { status: 503 })
  }

  const { prompt, template, style } = parsed.data
  const tpl = template ? getTemplate(template) : undefined
  const userPrompt = tpl ? `${tpl.prompt}\n\nAdditional instructions: ${prompt}` : prompt

  const whiteLabel = await getWhiteLabelConfig(user.clerk_id)
  const plan = parsed.data.model === "opus" ? "agency" as const : "pro" as const
  const systemPrompt = getSystemPrompt("agency", style, whiteLabel)
  const { model, maxTokens } = MODEL_CONFIG[plan]

  try {
    const client = new Anthropic({ apiKey: anthropicKey })
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userPrompt }],
    })

    const codeOutput = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map(b => b.text)
      .join("")

    const inputTokens = message.usage.input_tokens
    const outputTokens = message.usage.output_tokens
    const costCents = calculateCostCents(model, inputTokens, outputTokens)

    await supabase.from("generations").insert({
      user_id: user.clerk_id,
      prompt,
      template_id: template ?? null,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_cost_cents: costCents,
      status: "completed",
      code_output: codeOutput,
      completed_at: new Date().toISOString(),
    })

    return NextResponse.json({
      code: codeOutput,
      model,
      usage: { inputTokens, outputTokens, costCents },
    })
  } catch (err) {
    console.error("API v1 generate error", err)
    return NextResponse.json({ error: "Generation failed" }, { status: 500 })
  }
}
