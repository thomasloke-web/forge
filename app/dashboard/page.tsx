import Link from "next/link"
import { Plus } from "lucide-react"

async function getFirstName(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) return null
  try {
    const { currentUser } = await import("@clerk/nextjs/server")
    const user = await currentUser()
    return user?.firstName ?? null
  } catch {
    return null
  }
}

export default async function Dashboard() {
  const firstName = await getFirstName()
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
          <p className="text-zinc-400 mt-2">Your projects and recent generations.</p>
        </div>
        <Link href="/generate" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">
          <Plus className="w-4 h-4" /> New project
        </Link>
      </div>
      <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
        <p className="text-zinc-400 mb-4">No projects yet.</p>
        <Link href="/generate" className="text-orange-400 hover:text-orange-300 text-sm">Start your first build →</Link>
      </div>
    </div>
  )
}
