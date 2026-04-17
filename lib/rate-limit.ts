import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

let redis: Redis | null = null
function getRedis(): Redis | null {
  if (redis) return redis
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  redis = new Redis({ url, token })
  return redis
}

export function createRateLimiter(maxRequests: number, windowSeconds: number) {
  const r = getRedis()
  if (!r) return null
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
    analytics: true,
  })
}

const limiters = new Map<string, Ratelimit>()

export async function rateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  const windowSec = Math.ceil(windowMs / 1000)
  const limiterKey = `${max}:${windowSec}`

  let limiter = limiters.get(limiterKey)
  if (!limiter) {
    const created = createRateLimiter(max, windowSec)
    if (!created) return true
    limiter = created
    limiters.set(limiterKey, limiter)
  }

  const { success } = await limiter.limit(key)
  return success
}

export function getIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
}
