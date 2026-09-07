// Reading and shaping user records. The public serialiser is the important
// part: it is the only thing that ever leaves the server, so the password
// hash and the pending email code cannot escape by being forgotten in a
// route handler.

import { HttpError } from "./http.js";

/** What the browser is allowed to see. Everything else stays here. */
export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar ?? null,
    notifications: { ...user.notifications },
    addresses: (user.addresses ?? []).map((address) => ({ ...address })),
    createdAt: user.createdAt,
    // The account area shows "check your email" state without needing the
    // code, so the address is exposed and the code is not.
    pendingEmail: user.pendingEmail?.email ?? null,
  };
}

export function findByEmail(db, email) {
  const wanted = email.trim().toLowerCase();
  return (
    Object.values(db.data.users).find((user) => user.email.toLowerCase() === wanted) ??
    null
  );
}

/** The signed-in user, or a 401 - for routes that have no signed-out form. */
export function requireUser(context) {
  if (!context.user) {
    throw new HttpError(401, "Sign in to continue");
  }
  return context.user;
}
