'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/nav'
import { useUser } from '@clerk/nextjs'
import type { Project } from '@/lib/supabase'

export default function DashboardPage() {
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <div className="pt-14 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl font-medium text-[--text-primary]">
                {user?.firstName ? `${user.firstName}'s projects` : 'Your projects'}
              </h1>
              <p className="text-sm text-[--text-secondary] mt-1">All your FORGE builds in one place</p>
            </div>
            <Link
              href="/generate"
              className="px-5 py-2.5 bg-[--forge-green] text-black font-medium text-sm rounded-lg hover:bg-[--forge-green-dim] transition-colors"
            >
              + New build
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-36 rounded-xl border border-[--border] bg-[--surface-1] animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24 border border-[--border] border-dashed rounded-xl">
              <p className="text-[--text-muted] mb-4">No projects yet</p>
              <Link
                href="/generate"
                className="px-5 py-2.5 bg-[--forge-green] text-black text-sm font-medium rounded-lg hover:bg-[--forge-green-dim] transition-colors"
              >
                Build your first app →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(p => (
                <div key={p.id} className="p-5 rounded-xl border border-[--border] bg-[--surface-1] hover:border-[--border-bright] transition-colors">
                  <p className="font-medium text-[--text-primary] mb-1 truncate">{p.name}</p>
                  <p className="text-xs text-[--text-muted] mb-3 line-clamp-2">{p.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[--text-muted] font-mono">
                      {new Date(p.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                    <Link
                      href={`/generate?project=${p.id}`}
                      className="text-xs text-[--forge-green] hover:underline"
                    >
                      Open →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
