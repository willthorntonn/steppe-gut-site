// The account API, served in-process. server/app.js is plain Node (a
// (req, res) handler over http.IncomingMessage / ServerResponse) and is
// reused here unchanged: each Web Request is turned into a Readable that
// looks enough like an IncomingMessage for the handler, and whatever the
// handler writes back is captured into a Web Response.
//
// The store and the app are created once per module instance. Note that
// server/lib/db.js writes a JSON file: on Vercel's ephemeral filesystem
// those writes do not persist between invocations, so production accounts
// need a real store before launch (flagged in the migration report).

import path from "node:path";
import { Readable } from "node:stream";
import { createApp } from "../../../../server/app.js";
import { createDb } from "../../../../server/lib/db.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const file = process.env.SG_DB_FILE
  ? path.resolve(process.env.SG_DB_FILE)
  : path.join(process.cwd(), "server", "data", "db.json");

const db = createDb(file);
const handle = createApp(db, {
  secureCookies: process.env.SG_SECURE_COOKIES === "true",
});

/** A Readable with the fields server/app.js and server/lib/http.js read. */
async function toNodeRequest(request) {
  const url = new URL(request.url);
  const body =
    request.method === "GET" || request.method === "HEAD"
      ? null
      : Buffer.from(await request.arrayBuffer());
  const req = Readable.from(body && body.length ? [body] : []);
  req.method = request.method;
  // Path plus search, without the trailing slash next.config's
  // `trailingSlash` adds (server/app.js drops it anyway).
  req.url = url.pathname + url.search;
  req.headers = Object.fromEntries(
    [...request.headers.entries()].map(([name, value]) => [name.toLowerCase(), value])
  );
  req.socket = {
    remoteAddress: req.headers["x-forwarded-for"]?.split(",")[0].trim() ?? "",
  };
  return req;
}

/** Collects writeHead / setHeader / end into a Response. */
function toNodeResponse() {
  let status = 200;
  const headers = new Headers();
  const chunks = [];
  let resolve;
  const done = new Promise((r) => {
    resolve = r;
  });

  const res = {
    headersSent: false,
    setHeader(name, value) {
      headers.set(name, value);
    },
    getHeader(name) {
      return headers.get(name);
    },
    writeHead(code, extra = {}) {
      status = code;
      for (const [name, value] of Object.entries(extra)) {
        if (value !== undefined) headers.set(name, String(value));
      }
      res.headersSent = true;
      return res;
    },
    write(chunk) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return true;
    },
    end(chunk) {
      if (chunk !== undefined) res.write(chunk);
      resolve();
    },
  };

  return {
    res,
    async response() {
      await done;
      // content-length is recomputed by the platform from the body; the
      // handler's own value would be right, but the header is dropped to
      // avoid any disagreement with a compressing proxy.
      headers.delete("content-length");
      const body = Buffer.concat(chunks);
      return new Response(status === 204 || status === 304 ? null : body, {
        status,
        headers,
      });
    },
  };
}

async function proxy(request) {
  const req = await toNodeRequest(request);
  const { res, response } = toNodeResponse();
  handle(req, res).catch((error) => {
    console.error("[api] unhandled", error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
  return response();
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
