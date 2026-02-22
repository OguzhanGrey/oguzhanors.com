export type RateLimitInfo = {
    count: number;
    lastReset: number;
};

const rateLimits = new Map<string, RateLimitInfo>();

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const info = rateLimits.get(ip);

    if (!info || now - info.lastReset > windowMs) {
        rateLimits.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (info.count >= limit) {
        return false;
    }
    info.count += 1;
    return true;
}
