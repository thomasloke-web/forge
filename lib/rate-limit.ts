const buckets = new Map<string, { count: number; ts: number }>()

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = buckets.get(key)
  if (!entry || now - entry.ts > windowMs) {
    buckets.set(key, { count: 1, ts: now })
    return true
  }
  if (entry.count >= max) return false
  entry.count += 1
  return true
}

export function getIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
}
