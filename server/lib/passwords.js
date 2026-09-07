// Password hashing. scrypt from node:crypto, so there is no dependency and no
// home-made cryptography either.
//
// Stored form: `scrypt$N$r$p$salt$hash`, both halves base64. The parameters
// travel with the hash so raising them later does not invalidate every
// existing password - an old hash still verifies against its own settings.

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const N = 16384; // ~16 MB of memory per hash at r=8
const R = 8;
const P = 1;
const KEY_BYTES = 64;
const SALT_BYTES = 16;

// Long enough to matter, short enough that a passphrase is not rejected.
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 200;

export function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES);
  const hash = scryptSync(password, salt, KEY_BYTES, { N, r: R, p: P });
  return [
    "scrypt",
    N,
    R,
    P,
    salt.toString("base64"),
    hash.toString("base64"),
  ].join("$");
}

/** Constant-time check. Any malformed stored value fails rather than throws. */
export function verifyPassword(password, stored) {
  try {
    const [scheme, n, r, p, salt, hash] = String(stored).split("$");
    if (scheme !== "scrypt") return false;
    const expected = Buffer.from(hash, "base64");
    const actual = scryptSync(password, Buffer.from(salt, "base64"), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}
