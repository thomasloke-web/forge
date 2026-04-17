import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getUserPlan } from "@/lib/user-plan"
import { z } from "zod"

export const runtime = "nodejs"

const clientSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().optional(),
  company: z.string().max(200).optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const supabase = getSupabaseAdmin()
  const { data: clients } = await supabase
    .from("clients")
    .select("*, client_projects(id, name, created_at)")
    .eq("agency_user_id", userId)
    .order("created_at", { ascending: false })

  return NextResponse.json({ clients: clients ?? [] })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = clientSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("clients")
    .insert({ agency_user_id: userId, ...parsed.data })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ client: data })
}
