// A fixed-window counter, in memory. It exists so a password field is not an
// open guessing machine; it is not a defence against a distributed attacker,
// and it resets when the process does. A real deployment puts this in Redis
// or in front of the service.

const windows = new Map();

/**
 * Records one attempt against `key`. Returns
 * `{ allowed, remaining, retryAfterSeconds }`.
 */
export function hit(key, { limit, windowMs }) {
  const now = Date.now();
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }
  current.count += 1;
  const allowed = current.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - current.count),
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}

/** Called after a success, so a good password clears the failure count. */
export function reset(key) {
  windows.delete(key);
}

// Nothing here grows without bound in practice, but a long-lived process with
// many keys should still not hold every window it has ever seen.
export function sweep(now = Date.now()) {
  for (const [key, value] of windows) {
    if (value.resetAt <= now) windows.delete(key);
  }
}
