export type RateLimitInfo = {
    count: number;
    lastReset: number;
};

// In-memory store. Note: In serverless environments (Vercel/Netlify), 
// this map will reset whenever the isolate restarts natively.
// For robust rate limiting across multiple serverless instances, use Upstash Redis.
const rateLimits = new Map<string, RateLimitInfo>();

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const info = rateLimits.get(ip);

    // If IP isn't in map, or the window has expired
    if (!info || now - info.lastReset > windowMs) {
        rateLimits.set(ip, { count: 1, lastReset: now });
        return true; // Allowed
    }

    // If window hasn't expired and count is too high
    if (info.count >= limit) {
        return false; // Denied
    }

    // Increment and allow
    info.count += 1;
    return true;
}
