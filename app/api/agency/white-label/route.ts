import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { getUserPlan } from "@/lib/user-plan"
import { z } from "zod"

export const runtime = "nodejs"

const wlSchema = z.object({
  brand_name: z.string().max(100).optional(),
  logo_url: z.string().url().optional().or(z.literal("")),
  primary_color: z.string().max(20).optional(),
})

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from("users")
    .select("white_label_brand_name, white_label_logo_url, white_label_primary_color")
    .eq("clerk_id", userId)
    .single()

  return NextResponse.json({
    brandName: data?.white_label_brand_name ?? "",
    logoUrl: data?.white_label_logo_url ?? "",
    primaryColor: data?.white_label_primary_color ?? "",
  })
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const plan = await getUserPlan(userId)
  if (plan !== "agency") return NextResponse.json({ error: "Agency plan required" }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = wlSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const supabase = getSupabaseAdmin()
  await supabase.from("users").update({
    white_label_brand_name: parsed.data.brand_name ?? null,
    white_label_logo_url: parsed.data.logo_url || null,
    white_label_primary_color: parsed.data.primary_color ?? null,
  }).eq("clerk_id", userId)

  return NextResponse.json({ updated: true })
}
