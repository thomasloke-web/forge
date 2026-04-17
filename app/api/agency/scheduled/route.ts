import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getUserPlan } from "@/lib/user-plan"
import { z } from "zod"

export const runtime = "nodejs"

const scheduleSchema = z.object({
  name: z.string().min(1).max(200),
  prompt: z.string().min(1).max(4000),
  cron_expression: z.string().min(1).max(100),
  enabled: z.boolean().optional().default(true),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("scheduled_builds")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  return NextResponse.json({ schedules: data ?? [] })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = scheduleSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("scheduled_builds")
    .insert({ user_id: userId, ...parsed.data })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ schedule: data })
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  await supabase.from("scheduled_builds").delete().eq("id", id).eq("user_id", userId)
  return NextResponse.json({ deleted: true })
}
