// The router and the request pipeline. Everything a request passes through
// between the socket and a route handler is here: session lookup, body
// parsing, the cross-site check, and the one place errors turn into replies.

import {
  HttpError,
  parseCookies,
  readJsonBody,
  sendEmpty,
  sendJson,
  serializeCookie,
} from "./lib/http.js";
import {
  COOKIE_NAME,
  SESSION_TTL_MS,
  resolveSession,
  sweepSessions,
} from "./lib/sessions.js";
import { sweep as sweepRateLimits } from "./lib/rateLimit.js";
import * as auth from "./routes/auth.js";
import * as addresses from "./routes/addresses.js";
import * as orders from "./routes/orders.js";

// Only these methods change anything, so only these are checked for a
// cross-site origin.
const MUTATING = new Set(["POST", "PATCH", "PUT", "DELETE"]);

const ROUTES = [
  ["GET", "/api/health", async () => ({ body: { ok: true } })],

  ["GET", "/api/session", auth.session],
  ["POST", "/api/auth/register", auth.register],
  ["POST", "/api/auth/login", auth.login],
  ["POST", "/api/auth/logout", auth.logout],

  ["PATCH", "/api/account/profile", auth.updateProfile],
  ["POST", "/api/account/email/code", auth.requestEmailCode],
  ["POST", "/api/account/email/confirm", auth.confirmEmailCode],
  ["POST", "/api/account/password", auth.changePassword],
  ["PATCH", "/api/account/notifications", auth.setNotification],

  ["GET", "/api/addresses", addresses.list],
  ["POST", "/api/addresses", addresses.create],
  ["PATCH", "/api/addresses/:id", addresses.update],
  ["DELETE", "/api/addresses/:id", addresses.remove],
  ["POST", "/api/addresses/:id/default", addresses.makeDefault],

  ["GET", "/api/orders", orders.list],
  ["POST", "/api/orders", orders.create],
  ["GET", "/api/orders/:id", orders.get],
].map(([method, pattern, handler]) => ({
  method,
  segments: pattern.split("/").filter(Boolean),
  handler,
}));

function match(method, pathname) {
  const parts = pathname.split("/").filter(Boolean);
  let pathMatched = false;
  for (const route of ROUTES) {
    if (route.segments.length !== parts.length) continue;
    const params = {};
    let ok = true;
    for (const [index, segment] of route.segments.entries()) {
      if (segment.startsWith(":")) {
        params[segment.slice(1)] = decodeURIComponent(parts[index]);
      } else if (segment !== parts[index]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    pathMatched = true;
    if (route.method === method) return { route, params };
  }
  // Separating these two is what lets the reply be 405 rather than a 404 that
  // makes a wrong verb look like a wrong URL.
  return pathMatched ? { methodMismatch: true } : null;
}

function allowedOrigins() {
  return (process.env.SG_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

// The app and the API are same-origin in normal use (Vite proxies /api during
// development), so a browser sending a cross-site Origin on a write is either
// a misconfiguration or a forgery attempt.
function originAllowed(origin) {
  if (!origin) return true; // curl, a health check, a server-to-server call
  if (allowedOrigins().includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  } catch {
    return false;
  }
}

function corsHeaders(origin) {
  if (!origin || !originAllowed(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    // The session is a cookie, so the browser has to be told to send it.
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "vary": "Origin",
  };
}

export function createApp(db, { secureCookies = false } = {}) {
  // Housekeeping that would be a cron job in a real deployment.
  const housekeeping = setInterval(() => {
    sweepSessions(db);
    sweepRateLimits();
  }, 60 * 60 * 1000);
  housekeeping.unref?.();

  return async function handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
    const origin = req.headers.origin ?? null;
    const cors = corsHeaders(origin);

    if (req.method === "OPTIONS") {
      sendEmpty(res, 204, cors);
      return;
    }

    if (!url.pathname.startsWith("/api/")) {
      sendJson(res, 404, { error: "No such endpoint" }, cors);
      return;
    }

    const found = match(req.method, url.pathname);
    if (!found) {
      sendJson(res, 404, { error: "No such endpoint" }, cors);
      return;
    }
    if (found.methodMismatch) {
      sendJson(res, 405, { error: "That method is not allowed here" }, cors);
      return;
    }

    if (MUTATING.has(req.method) && !originAllowed(origin)) {
      sendJson(res, 403, { error: "That request came from somewhere else" }, cors);
      return;
    }

    const cookies = parseCookies(req.headers.cookie);
    const token = cookies[COOKIE_NAME] ?? null;
    const headers = { ...cors };

    const ctx = {
      req,
      res,
      url,
      params: found.params,
      body: {},
      db,
      token,
      user: resolveSession(db, token),
      ip:
        (req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ||
        req.socket.remoteAddress ||
        "unknown",
      setSession(newToken) {
        ctx.token = newToken;
        headers["set-cookie"] = serializeCookie(COOKIE_NAME, newToken, {
          maxAge: SESSION_TTL_MS / 1000,
          secure: secureCookies,
        });
      },
      clearSession() {
        ctx.token = null;
        headers["set-cookie"] = serializeCookie(COOKIE_NAME, "", {
          maxAge: 0,
          secure: secureCookies,
        });
      },
    };

    try {
      if (MUTATING.has(req.method)) ctx.body = await readJsonBody(req);
      const result = (await found.route.handler(ctx)) ?? {};
      const status = result.status ?? 200;
      if (status === 204 || result.body === undefined) {
        sendEmpty(res, status, headers);
      } else {
        sendJson(res, status, result.body, headers);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(
          res,
          error.status,
          { error: error.message, ...(error.details ?? {}) },
          headers
        );
        return;
      }
      // An unexpected failure is logged in full and reported as one line. The
      // visitor gets no stack trace and no internal detail.
      console.error("[api]", error);
      sendJson(res, 500, { error: "Something went wrong at our end" }, headers);
    }
  };
}
