// Input validation. Every value that reaches the store passes through here
// first, so a route handler never has to wonder whether a field is a string.
//
// Messages are written to be shown to the visitor as they are, which is why
// they follow the site's punctuation rule (PUNCTUATION_RULE.md): no terminal
// full stops.

import { HttpError } from "./http.js";

// Deliberately permissive. The address is confirmed by using it, not by a
// regular expression, and an over-strict pattern only rejects real people.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FIELD = 200;
// A 256px JPEG data URL lands around 20 KB. The cap is generous enough for a
// larger one and far short of the body limit.
const MAX_AVATAR_CHARS = 400_000;

export function trimmed(value, max = MAX_FIELD) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function requireString(value, field, { max = MAX_FIELD, message } = {}) {
  const out = trimmed(value, max);
  if (!out) throw new HttpError(400, message ?? `${field} is required`, { field });
  return out;
}

export function requireEmail(value) {
  const email = trimmed(value, MAX_FIELD).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    throw new HttpError(400, "Enter a valid email address", { field: "email" });
  }
  return email;
}

/** Avatars arrive as small data URLs. `null` clears the picture. */
export function optionalAvatar(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" || !value.startsWith("data:image/")) {
    throw new HttpError(400, "That photo could not be read", { field: "avatar" });
  }
  if (value.length > MAX_AVATAR_CHARS) {
    throw new HttpError(413, "That photo is too large", { field: "avatar" });
  }
  return value;
}

export const NOTIFICATION_KEYS = [
  "weeklyDispatch",
  "orderUpdates",
  "dispatchAndDelivery",
  "productNews",
  "backInStock",
];

export function defaultNotifications(promotions = false) {
  return {
    // An account comes with an email address, so the weekly dispatch is on;
    // promotions are opt-in and stay off unless the box was ticked.
    weeklyDispatch: true,
    orderUpdates: true,
    dispatchAndDelivery: true,
    productNews: Boolean(promotions),
    backInStock: false,
  };
}

// The address shape the account area and the checkout both speak. Only `name`,
// `line1` and `city` are required, matching the form in Account Settings.
export function normaliseAddress(input) {
  if (!input || typeof input !== "object") {
    throw new HttpError(400, "Enter an address", { field: "address" });
  }
  return {
    label: trimmed(input.label, 60) || "Address",
    name: requireString(input.name, "Full name", {
      message: "Enter the recipient's full name",
    }),
    line1: requireString(input.line1, "Address line 1", {
      message: "Enter the first line of the address",
    }),
    line2: trimmed(input.line2),
    city: requireString(input.city, "City", { message: "Enter the city or district" }),
    postalCode: trimmed(input.postalCode, 32),
    country: trimmed(input.country, 80),
    phone: trimmed(input.phone, 40),
  };
}

/** Exactly one default while any address exists, and never none. */
export function withOneDefault(addresses, preferredId = null) {
  if (addresses.length === 0) return addresses;
  const wanted = addresses.some((address) => address.id === preferredId)
    ? preferredId
    : addresses.find((address) => address.isDefault)?.id ?? addresses[0].id;
  return addresses.map((address) => ({ ...address, isDefault: address.id === wanted }));
}
