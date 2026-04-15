import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
      <p className="text-xs uppercase tracking-widest text-orange-400 mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Page not found</h1>
      <p className="text-zinc-400 max-w-md mb-8">That page may have moved or never existed.</p>
      <div className="flex gap-3">
        <Link href="/" className="px-6 py-3 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400">Home</Link>
        <Link href="/journal" className="px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500">Journal</Link>
      </div>
    </div>
  )
}
