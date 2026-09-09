// The one place the app talks to its account backend.
//
// What changed, and why: identity is Supabase Auth now, not the hand-rolled
// service in `server/`. That is what makes "continue with Google" possible at
// all, and it brings password reset and email confirmation with it - both of
// which the old service named as missing on purpose, because neither can be
// built without somewhere to send mail from.
//
// Where the data comes from:
//
//   - The profile and the address book are read and written straight from the
//     browser. Row-level security in the database decides what an account can
//     touch, keyed on the signed-in user's id, so there is nothing an API
//     route in front of them would add except another copy of the same check.
//   - Orders go through /api/orders/ instead, because a price must not be
//     posted. The browser sends slugs and quantities; the route prices the
//     basket with server/catalog.js and writes the row.
//
// The session is a cookie Supabase manages, so nothing here carries a token by
// hand, and the shapes below are unchanged - the views, the checkout and the
// account area all still speak `publicUser` and `address` as they did.

import { supabaseBrowser } from "../lib/supabase/client";

/** A failed request, in a shape the forms can render. */
export class ApiError extends Error {
  constructor(message, { status = 0, field = null, retryAfterSeconds = 0 } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    // Which form field the message belongs under, when one is known.
    this.field = field;
    this.retryAfterSeconds = retryAfterSeconds;
    // A dead network is worth telling apart from a refusal: one is worth
    // retrying and the other is not.
    this.offline = status === 0 || status === 502 || status === 503 || status === 504;
  }
}

// ── turning Supabase's refusals into the site's own ────────────────────
// Supabase answers in its own words and mostly without saying which field is
// at fault. The forms need both, so the handful of failures a visitor can
// actually cause are translated here and anything unrecognised falls through
// with its own message rather than being flattened to "something went wrong".
function authError(error) {
  if (!error) return null;
  const code = error.code ?? "";
  const text = String(error.message ?? "");

  if (code === "user_already_exists" || /already registered|already been registered/i.test(text)) {
    // Deliberately explicit. Hiding it would only move the same information
    // to the sign-in form, and the sign-up form is where a person needs to be
    // told that they already have an account.
    return new ApiError("An account already uses that email address", {
      status: 409,
      field: "email",
    });
  }
  if (code === "invalid_credentials" || /invalid login credentials/i.test(text)) {
    // One message for both halves, so the form cannot be used to find out
    // which email addresses have accounts.
    return new ApiError("That email and password don't match an account", {
      status: 401,
    });
  }
  if (code === "email_not_confirmed" || /email not confirmed/i.test(text)) {
    return new ApiError("Confirm your email address first, the link is in your inbox", {
      status: 401,
      field: "email",
    });
  }
  if (code === "weak_password" || /password should be at least/i.test(text)) {
    return new ApiError("Use at least 8 characters", { status: 400, field: "password" });
  }
  if (code === "same_password" || /should be different from the old/i.test(text)) {
    return new ApiError("Choose a password you are not already using", {
      status: 400,
      field: "next",
    });
  }
  if (
    code === "email_address_invalid" ||
    code === "validation_failed" ||
    // Supabase words this both ways round depending on which check refused,
    // so neither order can be relied on: "invalid email" and "Email address
    // ... is invalid" are the same refusal.
    /email.*invalid|invalid.*email|unable to validate email/i.test(text)
  ) {
    return new ApiError("Enter a valid email address", { status: 400, field: "email" });
  }
  if (code === "over_request_rate_limit" || code === "over_email_send_rate_limit" || error.status === 429) {
    return new ApiError("Too many attempts, try again later", { status: 429 });
  }
  if (error.status === 0 || /fetch|network/i.test(text)) {
    return new ApiError("Could not reach the Steppe Gut server, check your connection");
  }
  return new ApiError(text || "Something went wrong", { status: error.status ?? 400 });
}

/** Anything that failed against the database rather than against auth. */
function dataError(error, fallback) {
  if (!error) return null;
  if (error.code === "23505") {
    return new ApiError("That is already saved on your account", { status: 409 });
  }
  return new ApiError(error.message || fallback, { status: 400 });
}

function throwIf(error, translate) {
  const failure = translate(error);
  if (failure) throw failure;
}

// ── row shapes the app already speaks ──────────────────────────────────
function mapAddress(row) {
  return {
    id: row.id,
    label: row.label,
    name: row.name,
    line1: row.line1,
    line2: row.line2 ?? "",
    city: row.city,
    postalCode: row.postal_code ?? "",
    country: row.country ?? "",
    phone: row.phone ?? "",
    isDefault: Boolean(row.is_default),
  };
}

function toAddressRow(address) {
  return {
    label: (address.label ?? "").trim() || "Address",
    name: (address.name ?? "").trim(),
    line1: (address.line1 ?? "").trim(),
    line2: (address.line2 ?? "").trim(),
    city: (address.city ?? "").trim(),
    postal_code: (address.postalCode ?? "").trim(),
    country: (address.country ?? "").trim(),
    phone: (address.phone ?? "").trim(),
  };
}

export function mapOrder(row) {
  return {
    id: row.id,
    placedOn: row.placed_on,
    status: row.status,
    currency: row.currency,
    items: row.items,
    totals: row.totals,
    promoLabel: row.promo_label ?? null,
    shippingAddress: row.shipping_address ?? null,
  };
}

/**
 * What the app calls a user: the auth record and the profile row read as one
 * thing, with the address book attached the way the old serialiser attached
 * it. Nothing here is a secret - the password never existed in the browser to
 * begin with, and the session is a cookie no script can read.
 */
function composeUser(authUser, profile, addresses) {
  if (!authUser) return null;
  return {
    id: authUser.id,
    name: profile?.name ?? authUser.user_metadata?.name ?? "",
    email: authUser.email ?? "",
    avatar: profile?.avatar ?? authUser.user_metadata?.avatar_url ?? null,
    notifications: { ...(profile?.notifications ?? {}) },
    addresses: (addresses ?? []).map(mapAddress),
    createdAt: profile?.created_at ?? authUser.created_at,
    // Supabase holds the address being changed to until its link is followed.
    // The account area shows "check your email" from this, same as before.
    pendingEmail: authUser.new_email ?? null,
  };
}

// ── reading the account ────────────────────────────────────────────────
async function loadAccount(supabase, authUser) {
  if (!authUser) return null;
  const [profile, addresses] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle(),
    supabase.from("addresses").select("*").eq("user_id", authUser.id).order("created_at"),
  ]);
  throwIf(profile.error, (e) => dataError(e, "Could not read your account"));
  throwIf(addresses.error, (e) => dataError(e, "Could not read your addresses"));
  return composeUser(authUser, profile.data, addresses.data);
}

/** The signed-in user as the app wants it, or null. */
export async function currentUser() {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.auth.getUser();
  // "No session" is not a failure, it is the signed-out answer.
  if (error && error.status !== 401 && !/session|jwt/i.test(String(error.message))) {
    throw authError(error);
  }
  return loadAccount(supabase, data?.user ?? null);
}

async function refreshAddresses(supabase) {
  const { data: auth } = await supabase.auth.getUser();
  const user = await loadAccount(supabase, auth?.user ?? null);
  if (!user) throw new ApiError("Sign in to continue", { status: 401 });
  return { user, addresses: user.addresses };
}

/** The orders route needs a real request; everything else is a query. */
async function orderRequest(method, path, body) {
  let response;
  try {
    // Every URL ends in a slash: next.config.mjs sets trailingSlash, and a
    // 308 redirect would turn a POST body into a GET.
    response = await fetch(`/api${path}/`, {
      method,
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
  session: async () => ({ user: await currentUser() }),

  register: async (profile) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signUp({
      email: (profile.email ?? "").trim().toLowerCase(),
      password: profile.password,
      options: {
        // Read by the handle_new_user trigger, which is what puts the name
        // and photo on the profile row before the app ever asks for it.
        data: {
          name: (profile.name ?? "").trim(),
          avatar: profile.avatar ?? null,
          promotions: Boolean(profile.promotions),
        },
        emailRedirectTo: `${window.location.origin}/auth/callback/`,
      },
    });
    throwIf(error, authError);

    // With email confirmation switched on there is no session yet: the
    // account exists and the link is in the inbox. The modal's confirmation
    // view says so rather than pretending the visitor is signed in.
    if (!data.session) {
      return { user: null, confirmationRequired: true };
    }
    return { user: await loadAccount(supabase, data.user), confirmationRequired: false };
  },

  login: async (email, password) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: (email ?? "").trim().toLowerCase(),
      password: password ?? "",
    });
    throwIf(error, authError);
    return { user: await loadAccount(supabase, data.user) };
  },

  /**
   * Hands off to Google. The browser leaves the site here and comes back to
   * /auth/callback/, so nothing after this call runs.
   */
  signInWithGoogle: async (next = "/account/orders/") => {
    const supabase = supabaseBrowser();
    const callback = new URL("/auth/callback/", window.location.origin);
    callback.searchParams.set("next", next);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callback.toString(),
        // Asking for consent every time is what makes a refresh token arrive
        // reliably rather than only on the very first authorisation.
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    throwIf(error, authError);
  },

  logout: async () => {
    const { error } = await supabaseBrowser().auth.signOut();
    throwIf(error, authError);
    return null;
  },

  /** Sends the reset link. Deliberately silent about whether the address has
   * an account, so this form cannot be used to enumerate them. */
  requestPasswordReset: async (email) => {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.resetPasswordForEmail(
      (email ?? "").trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/auth/callback/?next=/account/settings/` }
    );
    // A rate limit is worth saying out loud; nothing else is.
    if (error && error.status === 429) throw authError(error);
    return null;
  },

  updateProfile: async (patch) => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) throw new ApiError("Sign in to continue", { status: 401 });

    const row = {};
    if (patch.name !== undefined) {
      const name = String(patch.name ?? "").trim();
      if (!name) throw new ApiError("Enter your name", { status: 400, field: "name" });
      row.name = name;
    }
    if (patch.avatar !== undefined) row.avatar = patch.avatar || null;

    const { error } = await supabase.from("profiles").update(row).eq("id", auth.user.id);
    throwIf(error, (e) => dataError(e, "Could not save your profile"));
    return { user: await loadAccount(supabase, auth.user) };
  },

  /**
   * Starts an email change. Supabase sends a confirmation link to the new
   * address; following it is what completes the change. There is no six-digit
   * code any more - the old one existed only because nothing could send mail.
   */
  requestEmailChange: async (email) => {
    const supabase = supabaseBrowser();
    const next = (email ?? "").trim().toLowerCase();
    const { data: auth } = await supabase.auth.getUser();
    if (next && next === (auth?.user?.email ?? "").toLowerCase()) {
      throw new ApiError("That is already your email address", {
        status: 400,
        field: "email",
      });
    }
    const { error } = await supabase.auth.updateUser(
      { email: next },
      { emailRedirectTo: `${window.location.origin}/auth/callback/?next=/account/settings/` }
    );
    throwIf(error, authError);
    return { pendingEmail: next };
  },

  changePassword: async (current, next) => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user?.email) throw new ApiError("Sign in to continue", { status: 401 });

    // Supabase will change a password without asking for the old one, which
    // would let anyone who found an unlocked laptop take the account. The
    // current password is checked here first, and a wrong one is refused.
    const { error: wrong } = await supabase.auth.signInWithPassword({
      email: auth.user.email,
      password: current ?? "",
    });
    if (wrong) {
      throw new ApiError("That is not your current password", {
        status: 400,
        field: "current",
      });
    }

    const { error } = await supabase.auth.updateUser({ password: next });
    throwIf(error, authError);
    return null;
  },

  setNotification: async (key, value) => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) throw new ApiError("Sign in to continue", { status: 401 });

    const { data: profile, error: read } = await supabase
      .from("profiles")
      .select("notifications")
      .eq("id", auth.user.id)
      .single();
    throwIf(read, (e) => dataError(e, "Could not read your settings"));

    const { error } = await supabase
      .from("profiles")
      .update({ notifications: { ...profile.notifications, [key]: Boolean(value) } })
      .eq("id", auth.user.id);
    throwIf(error, (e) => dataError(e, "Could not save that setting"));
    return { user: await loadAccount(supabase, auth.user) };
  },

  addresses: async () => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return { addresses: [] };
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", auth.user.id)
      .order("created_at");
    throwIf(error, (e) => dataError(e, "Could not read your addresses"));
    return { addresses: data.map(mapAddress) };
  },

  addAddress: async (address) => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) throw new ApiError("Sign in to continue", { status: 401 });

    const row = toAddressRow(address);
    if (!row.name) throw new ApiError("Enter the recipient's full name", { status: 400, field: "name" });
    if (!row.line1) throw new ApiError("Enter the first line of the address", { status: 400, field: "line1" });
    if (!row.city) throw new ApiError("Enter the city or district", { status: 400, field: "city" });

    const { error } = await supabase.from("addresses").insert({
      ...row,
      user_id: auth.user.id,
      // The trigger makes the first address the default whether it asked to
      // be or not, and clears the previous one when this asks to be.
      is_default: Boolean(address.isDefault),
    });
    throwIf(error, (e) => dataError(e, "Could not save that address"));
    return refreshAddresses(supabase);
  },

  updateAddress: async (id, address) => {
    const supabase = supabaseBrowser();
    const { error } = await supabase
      .from("addresses")
      .update(toAddressRow(address))
      .eq("id", id);
    throwIf(error, (e) => dataError(e, "Could not save that address"));
    return refreshAddresses(supabase);
  },

  removeAddress: async (id) => {
    const supabase = supabaseBrowser();
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    throwIf(error, (e) => dataError(e, "Could not remove that address"));
    return refreshAddresses(supabase);
  },

  setDefaultAddress: async (id) => {
    const supabase = supabaseBrowser();
    const { error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);
    throwIf(error, (e) => dataError(e, "Could not set that address as default"));
    return refreshAddresses(supabase);
  },

  orders: async () => {
    const supabase = supabaseBrowser();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return { orders: [] };
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", auth.user.id)
      // Newest first, which is how an order history normally reads.
      .order("placed_on", { ascending: false });
    throwIf(error, (e) => dataError(e, "Could not read your orders"));
    return { orders: data.map(mapOrder) };
  },

  // The one write that cannot happen from the browser: the price is decided
  // by the server, so the basket is posted and the priced order comes back.
  placeOrder: (draft) => orderRequest("POST", "/orders", draft),
};
