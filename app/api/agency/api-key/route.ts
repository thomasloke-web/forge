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

  const apiKey = randomBytes(16).toString("hex")
  const supabase = getSupabaseAdmin()

  await supabase.from("users").update({
    api_key: apiKey,
    api_key_created_at: new Date().toISOString(),
  }).eq("clerk_id", userId)

  return NextResponse.json({ apiKey })
}

export async function DELETE() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = getSupabaseAdmin()
  await supabase.from("users").update({
    api_key: null,
    api_key_created_at: null,
  }).eq("clerk_id", userId)

  return NextResponse.json({ revoked: true })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("users")
    .select("api_key, api_key_created_at")
    .eq("clerk_id", userId)
    .single()

  return NextResponse.json({
    hasKey: !!data?.api_key,
    keyPreview: data?.api_key ? `${data.api_key.slice(0, 8)}...` : null,
    createdAt: data?.api_key_created_at ?? null,
  })
}
