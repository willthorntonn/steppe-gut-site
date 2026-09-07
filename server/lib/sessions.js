// Sessions. A random token in an HttpOnly cookie, with the server holding the
// authority for what that token means.
//
// Two decisions worth stating:
//
// 1. The cookie is HttpOnly, so no script on the page can read the token -
//    which is why the token is a cookie and not something the app keeps in
//    localStorage next to the cart.
// 2. Only the SHA-256 of the token is stored. Whoever reads the database
//    still cannot sign in as anyone, because the value in the cookie cannot
//    be recovered from the value on disk.

import { createHash, randomBytes } from "node:crypto";

export const COOKIE_NAME = "sg_session";
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function fingerprint(token) {
  return createHash("sha256").update(token).digest("hex");
}

/** Issues a session for `userId` and returns the raw token for the cookie. */
export function createSession(db, userId) {
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  db.data.sessions[fingerprint(token)] = {
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + SESSION_TTL_MS).toISOString(),
  };
  db.save();
  return token;
}

/** The user this token belongs to, or null. Expired sessions are dropped. */
export function resolveSession(db, token) {
  if (!token) return null;
  const key = fingerprint(token);
  const session = db.data.sessions[key];
  if (!session) return null;
  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    delete db.data.sessions[key];
    db.save();
    return null;
  }
  return db.data.users[session.userId] ?? null;
}

export function destroySession(db, token) {
  if (!token) return;
  const key = fingerprint(token);
  if (db.data.sessions[key]) {
    delete db.data.sessions[key];
    db.save();
  }
}

/** Every session belonging to one account. Used when a password changes. */
export function destroyUserSessions(db, userId, exceptToken = null) {
  const keep = exceptToken ? fingerprint(exceptToken) : null;
  let changed = false;
  for (const [key, session] of Object.entries(db.data.sessions)) {
    if (session.userId === userId && key !== keep) {
      delete db.data.sessions[key];
      changed = true;
    }
  }
  if (changed) db.save();
}

export function sweepSessions(db) {
  const now = Date.now();
  let changed = false;
  for (const [key, session] of Object.entries(db.data.sessions)) {
    if (new Date(session.expiresAt).getTime() <= now) {
      delete db.data.sessions[key];
      changed = true;
    }
  }
  if (changed) db.save();
}
