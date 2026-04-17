"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Plus, Users } from "lucide-react"

type Client = {
  id: string
  name: string
  email: string | null
  company: string | null
  created_at: string
  client_projects: Array<{ id: string; name: string; created_at: string }>
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  useEffect(() => {
    fetch("/api/agency/clients")
      .then(r => r.json())
      .then(d => setClients(d.clients ?? []))
      .catch(() => toast.error("Failed to load clients"))
      .finally(() => setLoading(false))
  }, [])

  async function addClient() {
    if (!name.trim()) return toast.error("Name is required")
    const res = await fetch("/api/agency/clients", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email: email || undefined, company: company || undefined }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return toast.error(data.error ?? "Failed to add client")
    }
    const { client } = await res.json()
    setClients(prev => [{ ...client, client_projects: [] }, ...prev])
    setName("")
    setEmail("")
    setCompany("")
    setShowForm(false)
    toast.success("Client added")
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>
          <p className="text-zinc-400 mt-2">Manage your agency clients and their projects.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-zinc-950 font-medium hover:bg-orange-400"
        >
          <Plus className="w-4 h-4" /> Add client
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Client name *"
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
            />
            <input
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Company"
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:border-orange-500 outline-none"
            />
          </div>
          <button
            onClick={addClient}
            className="px-5 py-2 rounded-full bg-orange-500 text-zinc-950 text-sm font-medium hover:bg-orange-400"
          >
            Save client
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-zinc-500 text-center py-12">Loading...</p>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
          <Users className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 mb-2">No clients yet.</p>
          <p className="text-sm text-zinc-500">Add your first client to start organizing projects.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-3 pr-4 font-medium">Client</th>
                <th className="py-3 px-4 font-medium">Company</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Projects</th>
                <th className="py-3 px-4 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {clients.map(c => (
                <tr key={c.id} className="border-b border-zinc-900">
                  <td className="py-3 pr-4 font-medium">{c.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{c.company ?? "—"}</td>
                  <td className="py-3 px-4 text-zinc-400">{c.email ?? "—"}</td>
                  <td className="py-3 px-4">{c.client_projects?.length ?? 0}</td>
                  <td className="py-3 px-4 text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
