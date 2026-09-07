// Request and response plumbing for the account API. Node's http module and
// nothing else - the server has no dependencies, so the small amount of
// framework a JSON API needs lives here.

/** An error with a status code. Thrown anywhere, caught once, in app.js. */
export class HttpError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// A request body is a name, an address or a small avatar data URL. Anything
// past a megabyte is a mistake or an attack, and is refused before it is
// buffered rather than after.
export const MAX_BODY_BYTES = 1024 * 1024;

export function sendJson(res, status, payload, headers = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    // The API answers with data, never with markup, and no browser should
    // ever be persuaded otherwise.
    "x-content-type-options": "nosniff",
    // Account data is per session; a shared cache holding it would hand one
    // visitor another's profile.
    "cache-control": "no-store",
    ...headers,
  });
  res.end(body);
}

export function sendEmpty(res, status, headers = {}) {
  res.writeHead(status, { "cache-control": "no-store", ...headers });
  res.end();
}

/** Reads and parses a JSON body. Empty bodies are `{}`, not an error. */
export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new HttpError(413, "That request is too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("error", () => reject(new HttpError(400, "The request was interrupted")));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          reject(new HttpError(400, "The request body must be a JSON object"));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new HttpError(400, "The request body is not valid JSON"));
      }
    });
  });
}

/** `a=1; b=2` -> `{ a: "1", b: "2" }`. Malformed pairs are skipped. */
export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 1) continue;
    const name = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!name) continue;
    try {
      out[name] = decodeURIComponent(value);
    } catch {
      out[name] = value;
    }
  }
  return out;
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
  parts.push(`Path=${options.path ?? "/"}`);
  if (options.httpOnly !== false) parts.push("HttpOnly");
  // Lax, not None: the session cookie should ride a normal navigation back to
  // the site but never a cross-site form post, which is most of what CSRF is.
  parts.push(`SameSite=${options.sameSite ?? "Lax"}`);
  if (options.secure) parts.push("Secure");
  return parts.join("; ");
}
