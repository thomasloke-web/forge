import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getUserPlan } from "@/lib/user-plan"
import { randomBytes } from "crypto"

export const runtime = "nodejs"

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const supabase = getSupabaseAdmin()

  const { data: existing } = await supabase
    .from("referrals")
    .select("code")
    .eq("user_id", userId)
    .single()

  if (existing) {
    return NextResponse.json({ code: existing.code })
  }

  const code = `FORGE-${randomBytes(4).toString("hex").toUpperCase()}`
  await supabase.from("referrals").insert({ user_id: userId, code })

  return NextResponse.json({ code })
}
