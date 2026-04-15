import Link from "next/link"
import { Flame } from "lucide-react"

async function getUserId(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) return null
  try {
    const { auth } = await import("@clerk/nextjs/server")
    const { userId } = await auth()
    return userId ?? null
  } catch {
    return null
  }
}

export default async function Nav() {
  const userId = await getUserId()
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  let UserButtonCmp: React.ComponentType | null = null
  if (hasClerk && userId) {
    try {
      const mod = await import("@clerk/nextjs")
      UserButtonCmp = mod.UserButton
    } catch {}
  }
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <Flame className="w-5 h-5 text-orange-400" />
          <span>FORGE</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
          <Link href="/generate" className="hover:text-white">Generate</Link>
          <Link href="/templates" className="hover:text-white">Templates</Link>
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <Link href="/journal" className="hover:text-white">Journal</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          {userId ? (
            <>
              <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white">Dashboard</Link>
              {UserButtonCmp ? <UserButtonCmp /> : null}
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-white">Sign in</Link>
              <Link href="/sign-up" className="text-sm px-4 py-2 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
