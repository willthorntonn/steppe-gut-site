// The store. One JSON file, read once into memory on boot and written back
// atomically after every mutation.
//
// A JSON file is not what this would be in production - the shape below is
// deliberately the shape of three tables, so moving to Postgres or SQLite is
// a matter of replacing this file rather than rewriting the routes. What it
// does give is a real server-side store: the data lives with the service, not
// in one visitor's browser, so an account and its orders follow the person to
// any device that can reach this server.

import fs from "node:fs";
import path from "node:path";

const EMPTY = () => ({
  // id -> user record (see routes/auth.js for the shape)
  users: {},
  // sha256(token) -> { userId, createdAt, expiresAt }
  sessions: {},
  // userId -> Order[]
  orders: {},
  // Counters that must not restart when the process does.
  meta: { orderSeq: 0 },
});

function merge(parsed) {
  const base = EMPTY();
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return base;
  return {
    users: isPlainObject(parsed.users) ? parsed.users : base.users,
    sessions: isPlainObject(parsed.sessions) ? parsed.sessions : base.sessions,
    orders: isPlainObject(parsed.orders) ? parsed.orders : base.orders,
    meta: { ...base.meta, ...(isPlainObject(parsed.meta) ? parsed.meta : null) },
  };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function createDb(file) {
  let data = EMPTY();

  try {
    const raw = fs.readFileSync(file, "utf8");
    data = merge(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") {
      // A half-written or hand-edited file must not take the service down, but
      // it must not be silently overwritten either - the copy is kept aside so
      // whatever was in it can still be recovered.
      const backup = `${file}.corrupt-${Date.now()}`;
      try {
        fs.renameSync(file, backup);
        console.warn(`[db] ${file} could not be parsed, moved to ${backup}`);
      } catch {
        console.warn(`[db] ${file} could not be parsed or moved aside`);
      }
    }
  }

  function save() {
    // Write beside the target and rename over it: a crash mid-write leaves the
    // previous good file in place rather than a truncated one.
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
    fs.renameSync(tmp, file);
  }

  return {
    get data() {
      return data;
    },
    save,
    file,
  };
}
