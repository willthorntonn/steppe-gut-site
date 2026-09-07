// Accounts: register, sign in, sign out, and the four things an account
// holder can change about themselves.
//
// This is the file that replaces the old client-side pretence. A password is
// hashed with scrypt and checked on the way back in; an email address is
// unique across accounts; a session is a server-side record, not a flag in
// localStorage. `changePassword` can now fail, and does, when the current
// password is wrong.

import { randomInt, randomUUID, createHash, timingSafeEqual } from "node:crypto";
import { HttpError } from "../lib/http.js";
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  hashPassword,
  verifyPassword,
} from "../lib/passwords.js";
import { hit, reset } from "../lib/rateLimit.js";
import {
  createSession,
  destroySession,
  destroyUserSessions,
} from "../lib/sessions.js";
import { findByEmail, publicUser, requireUser } from "../lib/users.js";
import {
  NOTIFICATION_KEYS,
  defaultNotifications,
  optionalAvatar,
  requireEmail,
  requireString,
  trimmed,
} from "../lib/validate.js";

// Ten wrong passwords for one account in fifteen minutes is enough to stop
// guessing without locking out someone who genuinely cannot remember.
const LOGIN_LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 };
// Sign-ups are cheap to attempt and expensive to clean up.
const REGISTER_LIMIT = { limit: 20, windowMs: 60 * 60 * 1000 };

const EMAIL_CODE_TTL_MS = 15 * 60 * 1000;
const EMAIL_CODE_ATTEMPTS = 5;

// There is no mail transport in this service, by design - transactional email
// is a separate piece of work. So the six-digit code has nowhere to go, and
// the response carries it back instead. That is only tolerable because no
// real address is being confirmed: the moment email sending exists, delete
// the `code` field from the response below and stop returning it.
const ECHO_EMAIL_CODES = process.env.SG_ECHO_EMAIL_CODES !== "false";

function password(value) {
  if (typeof value !== "string" || value.length < MIN_PASSWORD_LENGTH) {
    throw new HttpError(400, "Use at least 8 characters", { field: "password" });
  }
  if (value.length > MAX_PASSWORD_LENGTH) {
    throw new HttpError(400, "That password is too long", { field: "password" });
  }
  return value;
}

function codeFingerprint(code) {
  return createHash("sha256").update(String(code)).digest("hex");
}

function sameCode(a, b) {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function register(ctx) {
  const gate = hit(`register:${ctx.ip}`, REGISTER_LIMIT);
  if (!gate.allowed) {
    throw new HttpError(429, "Too many attempts, try again later");
  }

  const name = requireString(ctx.body.name, "Name", { message: "Enter your name" });
  const email = requireEmail(ctx.body.email);
  const secret = password(ctx.body.password);
  const avatar = optionalAvatar(ctx.body.avatar);

  if (findByEmail(ctx.db, email)) {
    // Deliberately explicit. Hiding it would only move the same information
    // to the sign-in form, and the sign-up form is where a person needs to be
    // told that they already have an account.
    throw new HttpError(409, "An account already uses that email address", {
      field: "email",
    });
  }

  const id = randomUUID();
  ctx.db.data.users[id] = {
    id,
    name,
    email,
    avatar,
    passwordHash: hashPassword(secret),
    notifications: defaultNotifications(ctx.body.promotions),
    addresses: [],
    createdAt: new Date().toISOString(),
    pendingEmail: null,
  };
  ctx.db.data.orders[id] = [];
  ctx.db.save();

  ctx.setSession(createSession(ctx.db, id));
  return { status: 201, body: { user: publicUser(ctx.db.data.users[id]) } };
}

export async function login(ctx) {
  const email = trimmed(ctx.body.email).toLowerCase();
  const secret = typeof ctx.body.password === "string" ? ctx.body.password : "";

  const gate = hit(`login:${ctx.ip}:${email}`, LOGIN_LIMIT);
  if (!gate.allowed) {
    throw new HttpError(429, "Too many sign-in attempts, try again later", {
      retryAfterSeconds: gate.retryAfterSeconds,
    });
  }

  const user = email ? findByEmail(ctx.db, email) : null;
  // One message for both halves, so the form cannot be used to find out which
  // email addresses have accounts.
  const failure = new HttpError(401, "That email and password don't match an account");
  if (!user) {
    // Spend roughly the same time as a real check would, so the response time
    // does not answer the question the message refuses to.
    verifyPassword(secret || "x", hashPassword("decoy"));
    throw failure;
  }
  if (!verifyPassword(secret, user.passwordHash)) throw failure;

  reset(`login:${ctx.ip}:${email}`);
  ctx.setSession(createSession(ctx.db, user.id));
  return { body: { user: publicUser(user) } };
}

export async function logout(ctx) {
  destroySession(ctx.db, ctx.token);
  ctx.clearSession();
  return { status: 204 };
}

/** Who is signed in, if anyone. The app calls this once on boot. */
export async function session(ctx) {
  return { body: { user: publicUser(ctx.user) } };
}

export async function updateProfile(ctx) {
  const user = requireUser(ctx);
  if (ctx.body.name !== undefined) {
    user.name = requireString(ctx.body.name, "Name", { message: "Enter your name" });
  }
  if (ctx.body.avatar !== undefined) {
    user.avatar = optionalAvatar(ctx.body.avatar);
  }
  ctx.db.save();
  return { body: { user: publicUser(user) } };
}

/**
 * Starts an email change. The code is issued and held by the server, hashed,
 * with an expiry and an attempt count - the old client-side version accepted
 * any six digits because nothing had issued anything.
 */
export async function requestEmailCode(ctx) {
  const user = requireUser(ctx);
  const email = requireEmail(ctx.body.email);

  if (email === user.email.toLowerCase()) {
    throw new HttpError(400, "That is already your email address", { field: "email" });
  }
  const existing = findByEmail(ctx.db, email);
  if (existing && existing.id !== user.id) {
    throw new HttpError(409, "An account already uses that email address", {
      field: "email",
    });
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  user.pendingEmail = {
    email,
    codeHash: codeFingerprint(code),
    expiresAt: new Date(Date.now() + EMAIL_CODE_TTL_MS).toISOString(),
    attempts: 0,
  };
  ctx.db.save();

  return {
    body: {
      pendingEmail: email,
      // See ECHO_EMAIL_CODES above: this field exists only because nothing
      // can post the code to the address yet.
      code: ECHO_EMAIL_CODES ? code : undefined,
    },
  };
}

export async function confirmEmailCode(ctx) {
  const user = requireUser(ctx);
  const pending = user.pendingEmail;
  if (!pending) {
    throw new HttpError(400, "Ask for a new code and try again", { field: "code" });
  }
  if (new Date(pending.expiresAt).getTime() <= Date.now()) {
    user.pendingEmail = null;
    ctx.db.save();
    throw new HttpError(400, "That code has expired, ask for a new one", {
      field: "code",
    });
  }

  const submitted = trimmed(ctx.body.code, 12);
  pending.attempts += 1;
  if (pending.attempts > EMAIL_CODE_ATTEMPTS) {
    user.pendingEmail = null;
    ctx.db.save();
    throw new HttpError(429, "Too many wrong codes, ask for a new one", {
      field: "code",
    });
  }
  if (!sameCode(codeFingerprint(submitted), pending.codeHash)) {
    ctx.db.save();
    throw new HttpError(400, "That code is not right", { field: "code" });
  }

  // The address could have been claimed while the code was in flight.
  const clash = findByEmail(ctx.db, pending.email);
  if (clash && clash.id !== user.id) {
    user.pendingEmail = null;
    ctx.db.save();
    throw new HttpError(409, "An account already uses that email address", {
      field: "email",
    });
  }

  user.email = pending.email;
  user.pendingEmail = null;
  ctx.db.save();
  return { body: { user: publicUser(user) } };
}

export async function changePassword(ctx) {
  const user = requireUser(ctx);
  const current = typeof ctx.body.current === "string" ? ctx.body.current : "";
  const next = password(ctx.body.next);

  const gate = hit(`password:${user.id}`, LOGIN_LIMIT);
  if (!gate.allowed) {
    throw new HttpError(429, "Too many attempts, try again later");
  }
  if (!verifyPassword(current, user.passwordHash)) {
    throw new HttpError(400, "That is not your current password", { field: "current" });
  }
  if (current === next) {
    throw new HttpError(400, "Choose a password you are not already using", {
      field: "next",
    });
  }

  reset(`password:${user.id}`);
  user.passwordHash = hashPassword(next);
  ctx.db.save();
  // A password change signs out every other device, which is the whole point
  // of changing one after it has been shared or guessed.
  destroyUserSessions(ctx.db, user.id, ctx.token);
  return { status: 204 };
}

export async function setNotification(ctx) {
  const user = requireUser(ctx);
  const key = trimmed(ctx.body.key, 40);
  if (!NOTIFICATION_KEYS.includes(key)) {
    throw new HttpError(400, "That is not a notification setting", { field: "key" });
  }
  user.notifications = { ...user.notifications, [key]: Boolean(ctx.body.value) };
  ctx.db.save();
  return { body: { user: publicUser(user) } };
}
