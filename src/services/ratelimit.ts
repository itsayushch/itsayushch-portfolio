const rateLimitCache = new Map<string, { count: number; firstRequestTime: number }>()

const LIMIT = 2
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export function rateLimit(ip: string): {
  success: boolean
  remaining: number
  reset: number // UNIX timestamp (seconds)
} {
  const now = Date.now()
  const entry = rateLimitCache.get(ip)

  if (!entry || now - entry.firstRequestTime > WINDOW_MS) {
    // New window
    rateLimitCache.set(ip, { count: 1, firstRequestTime: now })
    return {
      success: true,
      remaining: LIMIT - 1,
      reset: Math.floor((now + WINDOW_MS) / 1000),
    }
  }

  const reset = Math.floor((entry.firstRequestTime + WINDOW_MS) / 1000)

  if (entry.count < LIMIT) {
    entry.count += 1
    return {
      success: true,
      remaining: LIMIT - entry.count,
      reset,
    }
  }

  return {
    success: false,
    remaining: 0,
    reset,
  }
}
