import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { z } from "zod"

export const runtime = "nodejs"

const projectSchema = z.object({
  name: z.string().min(1).max(200),
  prompt: z.string().min(1).max(8000),
  code: z.string().min(1).max(200_000),
  template: z.string().optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("projects").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ projects: data ?? [] })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json().catch(() => null)
  const parsed = projectSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from("projects").insert({ user_id: userId, ...parsed.data }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ project: data })
}
