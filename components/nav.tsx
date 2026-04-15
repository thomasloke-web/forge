import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { Flame } from "lucide-react"

export default async function Nav() {
  const { userId } = await auth()
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
              <UserButton />
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
