export const revalidate = 86400
export const metadata = { title: "About" }

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 prose prose-invert">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">About FORGE</h1>
      <p className="text-lg text-zinc-400 leading-relaxed">FORGE is an AI app builder made by NorwegianSpark SA — a two-person company in Norway, run by Thomas and Øyvind.</p>
      <h2 className="text-2xl font-semibold mt-10 mb-3">Thomas</h2>
      <p className="text-zinc-300 leading-relaxed">Former electrician and house builder. Started building websites in 2023, fell in love with AI code generation, and realised the tools available didn't let you keep what you made. So we built one that does.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Øyvind</h2>
      <p className="text-zinc-300 leading-relaxed">Former insurance and debt-management professional. Handles the systems, the numbers, and the careful questions. Keeps FORGE honest.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Our promise</h2>
      <p className="text-zinc-300 leading-relaxed">We use the best model. We charge fairly. We don't lock you in. If any of those three stops being true, tell us — <a href="mailto:thomaslien@norwegianspark.com" className="text-orange-400">thomaslien@norwegianspark.com</a>.</p>
      <p className="mt-12 text-xs text-zinc-500">NorwegianSpark SA · Org no: 834 984 172 · Bank: 3624 19 61537</p>
    </div>
  )
}
