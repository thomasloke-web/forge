export default async function Page() {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    const { SignUp } = await import("@clerk/nextjs")
    return <div className="min-h-[80vh] flex items-center justify-center px-5 py-16"><SignUp /></div>
  }
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-3">Create account</h1>
        <p className="text-zinc-400 text-sm">Authentication is not configured yet.</p>
      </div>
    </div>
  )
}
