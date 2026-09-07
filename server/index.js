// The account API for the Steppe Gut site. Plain Node, no dependencies.
//
//   npm run server        start it on http://localhost:8787
//   npm run dev:all       start it alongside Vite, which proxies /api to it
//
// Environment:
//   SG_API_PORT           port to listen on            (default 8787)
//   SG_API_HOST           interface to bind            (default 127.0.0.1)
//   SG_DB_FILE            where the store is written   (default server/data/db.json)
//   SG_ALLOWED_ORIGINS    comma-separated origins allowed to call the API
//                         from a browser. localhost is always allowed
//   SG_SECURE_COOKIES     "true" to mark the session cookie Secure, which is
//                         required once the site is served over https
//   SG_ECHO_EMAIL_CODES   "false" to stop returning email-change codes in the
//                         response. See routes/auth.js
//
// See server/README.md for the endpoint list and the deployment notes.

import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";
import { createDb } from "./lib/db.js";

const here = path.dirname(fileURLToPath(import.meta.url));

const port = Number(process.env.SG_API_PORT ?? 8787);
const host = process.env.SG_API_HOST ?? "127.0.0.1";
const file = process.env.SG_DB_FILE
  ? path.resolve(process.env.SG_DB_FILE)
  : path.join(here, "data", "db.json");

const db = createDb(file);
const handle = createApp(db, {
  secureCookies: process.env.SG_SECURE_COOKIES === "true",
});

const server = http.createServer((req, res) => {
  handle(req, res).catch((error) => {
    console.error("[api] unhandled", error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
});

server.listen(port, host, () => {
  const users = Object.keys(db.data.users).length;
  console.log(`[api] listening on http://${host}:${port}`);
  console.log(`[api] store ${file} (${users} account${users === 1 ? "" : "s"})`);
});

// Finish in-flight requests rather than dropping them when the dev script is
// stopped with Ctrl-C.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  });
}
