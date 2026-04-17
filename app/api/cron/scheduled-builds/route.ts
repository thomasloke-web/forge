import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getSystemPrompt, MODEL_CONFIG, calculateCostCents } from "@/lib/system-prompts"
import { getWhiteLabelConfig } from "@/lib/user-plan"

export const runtime = "nodejs"
export const maxDuration = 300

function matchesCron(expression: string, date: Date): boolean {
  const parts = expression.trim().split(/\s+/)
  if (parts.length < 5) return false
  const [minExpr, hourExpr] = parts
  const minute = date.getUTCMinutes()
  const hour = date.getUTCHours()
  const matchField = (expr: string, value: number) =>
    expr === "*" || expr.split(",").some(p => parseInt(p, 10) === value)
  return matchField(minExpr, minute) && matchField(hourExpr, hour)
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: "Not configured" }, { status: 503 })

  const supabase = getSupabaseAdmin()
  const { data: schedules } = await supabase
    .from("scheduled_builds")
    .select("*, users!inner(plan)")
    .eq("enabled", true)

  if (!schedules?.length) return NextResponse.json({ processed: 0 })

  const now = new Date()
  let processed = 0

  for (const schedule of schedules) {
    if (!matchesCron(schedule.cron_expression, now)) continue

    try {
      const whiteLabel = await getWhiteLabelConfig(schedule.user_id)
      const systemPrompt = getSystemPrompt("agency", undefined, whiteLabel)
      const { model, maxTokens } = MODEL_CONFIG.agency

      const client = new Anthropic({ apiKey })
      const message = await client.messages.create({
        model,
        max_tokens: maxTokens,
        system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: schedule.prompt }],
      })

      const codeOutput = message.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map(b => b.text)
        .join("")

      const costCents = calculateCostCents(model, message.usage.input_tokens, message.usage.output_tokens)

      await supabase.from("generations").insert({
        user_id: schedule.user_id,
        prompt: schedule.prompt,
        model,
        input_tokens: message.usage.input_tokens,
        output_tokens: message.usage.output_tokens,
        total_cost_cents: costCents,
        status: "completed",
        code_output: codeOutput,
        completed_at: new Date().toISOString(),
      })

      await supabase.from("scheduled_builds").update({ last_run_at: new Date().toISOString() }).eq("id", schedule.id)

      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        const { data: user } = await supabase.from("users").select("email").eq("clerk_id", schedule.user_id).single()
        if (user?.email) {
          await resend.emails.send({
            from: "FORGE <noreply@claudeforge.shop>",
            to: user.email,
            subject: `FORGE: Scheduled build "${schedule.name}" completed`,
            html: `<p>Your scheduled build <strong>${schedule.name}</strong> has completed. View it in your <a href="https://claudeforge.shop/dashboard">dashboard</a>.</p>`,
          })
        }
      } catch {}

      processed++
    } catch (err) {
      console.error(`Scheduled build ${schedule.id} failed:`, err)
    }
  }

  return NextResponse.json({ processed })
}
