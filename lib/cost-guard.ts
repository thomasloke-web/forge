import { getSupabaseAdmin } from "./supabase"
import type { Plan } from "./system-prompts"

const DAILY_LIMITS: Record<Plan, number> = {
  free: 5,
  pro: 100,
  agency: 1000,
}

export async function checkDailyLimit(userId: string, plan: Plan): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getSupabaseAdmin()
  const todayStart = new Date()
  todayStart.setUTCHours(0, 0, 0, 0)

  const { count } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", todayStart.toISOString())

  const used = count ?? 0
  const limit = DAILY_LIMITS[plan]
  return { allowed: used < limit, remaining: Math.max(0, limit - used) }
}

export async function checkMonthlyBudget(): Promise<{ allowed: boolean; usedCents: number; budgetCents: number }> {
  const budgetUsd = parseInt(process.env.MONTHLY_ANTHROPIC_BUDGET_USD || "500", 10)
  const budgetCents = budgetUsd * 100

  const supabase = getSupabaseAdmin()
  const monthStart = new Date()
  monthStart.setUTCDate(1)
  monthStart.setUTCHours(0, 0, 0, 0)

  const { data } = await supabase
    .from("generations")
    .select("total_cost_cents")
    .gte("created_at", monthStart.toISOString())

  const usedCents = (data ?? []).reduce((sum, row) => sum + (row.total_cost_cents ?? 0), 0)
  return { allowed: usedCents < budgetCents, usedCents, budgetCents }
}

export async function sendBudgetAlert(usedCents: number, budgetCents: number): Promise<void> {
  const pctUsed = Math.round((usedCents / budgetCents) * 100)
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: `FORGE Alerts <${process.env.RESEND_FROM_EMAIL || "thomas@claudeforge.shop"}>`,
      to: "thomaslovaslokoy@gmail.com",
      subject: `FORGE: Anthropic budget at ${pctUsed}%`,
      html: `<p>Monthly Anthropic spend is at <strong>${pctUsed}%</strong> ($${(usedCents / 100).toFixed(2)} of $${(budgetCents / 100).toFixed(2)}).</p><p>Generations will pause at 100%.</p>`,
    })
  } catch (e) {
    console.error("Failed to send budget alert:", e)
  }
}
