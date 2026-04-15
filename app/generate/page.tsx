import PromptTester from "@/components/prompt-tester"
import PromptTip from "@/components/prompt-tip"

export const metadata = { title: "Generate" }

export default function GeneratePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Generate</h1>
      <p className="text-zinc-400 mb-10 max-w-2xl">Pick a template or write free-form. Claude Opus 4.6 will stream the generated code.</p>
      <PromptTip />
      <PromptTester />
    </div>
  )
}
