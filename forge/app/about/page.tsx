import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'About — FORGE by NorwegianSpark SA',
  description: 'FORGE is built by NorwegianSpark SA — Thomas and Øyvind, two career-changers who went all-in on AI. We build tools we actually use ourselves.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="pt-14">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <span className="text-xs font-mono text-[--forge-green] uppercase tracking-wider">About</span>
          <h1 className="text-4xl font-display italic text-[--text-primary] mt-3 mb-8">
            Built by people who needed it
          </h1>

          <div className="prose-sm text-[--text-secondary] leading-relaxed space-y-5 mb-16">
            <p>
              FORGE is built by NorwegianSpark SA — Thomas and Øyvind, two Norwegians who made a career shift into AI and tech.
            </p>
            <p>
              Thomas came from electrical work and housebuilding. Øyvind from insurance and debt management. Neither of us had traditional software backgrounds. We learned by building — dozens of affiliate sites, SaaS tools, and now FORGE.
            </p>
            <p>
              We built FORGE because we kept running into the same problem: AI app builders produce code that looks right but isn&apos;t. TypeScript errors. Wrong patterns. Framework choices that made sense for a demo but not a production app. We wanted something that generated code we&apos;d actually be proud to ship — Next.js 15, TypeScript strict, proper structure from the first prompt.
            </p>
            <p>
              We also got tired of Vercel bills and credit counting. FORGE deploys to Cloudflare Pages. It&apos;s free, it&apos;s global, and your app is yours — no platform dependency.
            </p>
            <p>
              We test everything we build before recommending it. We read every email. If something is wrong, tell us — we&apos;ll fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
            {[
              { name: 'Thomas', role: 'Co-founder', bg: 'Former electrician and housebuilder. Handles technical build direction, prompt engineering, and site architecture.' },
              { name: 'Øyvind', role: 'Co-founder', bg: 'Former insurance professional and debt management expert. Handles research, evidence-based content, and operations.' },
            ].map(p => (
              <div key={p.name} className="p-6 rounded-xl border border-[--border] bg-[--surface-1]">
                <div className="w-10 h-10 rounded-full bg-[--surface-3] flex items-center justify-center text-sm font-medium text-[--text-primary] mb-4">
                  {p.name[0]}
                </div>
                <p className="font-medium text-[--text-primary] mb-0.5">{p.name}</p>
                <p className="text-xs text-[--forge-green] font-mono mb-3">{p.role}</p>
                <p className="text-sm text-[--text-secondary] leading-relaxed">{p.bg}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-[--border] bg-[--surface-1]">
            <p className="font-medium text-[--text-primary] mb-3">Get in touch</p>
            <p className="text-sm text-[--text-secondary] mb-4">Questions, feedback, or just want to talk about what you&apos;re building?</p>
            <div className="space-y-1 text-sm text-[--text-secondary] font-mono">
              <p>norwegianspark@gmail.com</p>
              <p>+47 99 73 74 67</p>
              <p>NorwegianSpark SA · Org no: 834 984 172</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
