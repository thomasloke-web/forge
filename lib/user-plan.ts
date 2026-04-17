import { getSupabaseAdmin } from "./supabase"
import type { Plan } from "./system-prompts"

export async function getUserPlan(userId: string): Promise<Plan> {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("users")
    .select("plan")
    .eq("clerk_id", userId)
    .single()

  if (!data) return "free"
  const plan = data.plan as string
  if (plan === "pro" || plan === "agency") return plan
  return "free"
}

export async function getWhiteLabelConfig(userId: string) {
  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("users")
    .select("white_label_brand_name, white_label_logo_url, white_label_primary_color")
    .eq("clerk_id", userId)
    .single()

  if (!data) return undefined
  return {
    brandName: data.white_label_brand_name ?? undefined,
    logoUrl: data.white_label_logo_url ?? undefined,
    primaryColor: data.white_label_primary_color ?? undefined,
  }
}

export async function ensureUser(userId: string, email?: string): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.from("users").upsert(
    { clerk_id: userId, email: email ?? null },
    { onConflict: "clerk_id", ignoreDuplicates: true }
  )
}
