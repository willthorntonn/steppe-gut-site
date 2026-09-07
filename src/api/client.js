// The one place the app talks to the account API (server/).
//
// Everything account-shaped goes through here: the session, the profile, the
// address book and the order history. There is no token to carry - the
// session is an HttpOnly cookie the browser holds and this file can't read -
// so every call sends credentials and the server decides who is asking.
//
// In development Vite proxies /api to the Node service (see vite.config.js),
// which keeps both on one origin. Point VITE_API_URL at another origin only
// if the API is deployed apart from the site, and add that origin to the
// server's SG_ALLOWED_ORIGINS when you do.

const BASE = (import.meta.env?.VITE_API_URL ?? "/api").replace(/\/$/, "");

/** A failed request, in a shape the forms can render. */
export class ApiError extends Error {
  constructor(message, { status = 0, field = null, retryAfterSeconds = 0 } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    // Which form field the message belongs under, when the server named one.
    this.field = field;
    this.retryAfterSeconds = retryAfterSeconds;
    // A dead network is worth telling apart from a refusal: one is worth
    // retrying and the other is not. The gateway statuses count as dead
    // because a proxy in front of the API - Vite's in development - answers
    // for an upstream that is not there rather than failing the fetch.
    this.offline = status === 0 || status === 502 || status === 503 || status === 504;
  }
}

async function request(method, path, body) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      // Same-origin in normal use; explicit so a split deployment still sends
      // the session cookie.
      credentials: "include",
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Could not reach the Steppe Gut server, check your connection");
  }

  if (response.status === 204) return null;

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new ApiError(payload?.error ?? "Something went wrong", {
      status: response.status,
      field: payload?.field ?? null,
      retryAfterSeconds: payload?.retryAfterSeconds ?? 0,
    });
  }
  return payload;
}

export const api = {
  session: () => request("GET", "/session"),
  register: (profile) => request("POST", "/auth/register", profile),
  login: (email, password) => request("POST", "/auth/login", { email, password }),
  logout: () => request("POST", "/auth/logout", {}),

  updateProfile: (patch) => request("PATCH", "/account/profile", patch),
  requestEmailCode: (email) => request("POST", "/account/email/code", { email }),
  confirmEmailCode: (code) => request("POST", "/account/email/confirm", { code }),
  changePassword: (current, next) =>
    request("POST", "/account/password", { current, next }),
  setNotification: (key, value) =>
    request("PATCH", "/account/notifications", { key, value }),

  addresses: () => request("GET", "/addresses"),
  addAddress: (address) => request("POST", "/addresses", { address }),
  updateAddress: (id, address) => request("PATCH", `/addresses/${id}`, { address }),
  removeAddress: (id) => request("DELETE", `/addresses/${id}`),
  setDefaultAddress: (id) => request("POST", `/addresses/${id}/default`, {}),

  orders: () => request("GET", "/orders"),
  placeOrder: (draft) => request("POST", "/orders", draft),
};
