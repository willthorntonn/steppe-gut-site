// Where Google (and any email confirmation link) lands.
//
// Supabase sends the visitor back here with a one-time `code`. Exchanging it
// sets the session cookies, which is why this is a route handler rather than a
// page: a page could not write them.
//
// Note the URL registered with Supabase must be the trailing-slash form,
// /auth/callback/, because next.config.mjs sets trailingSlash and the
// slash-less form is a 308 away.

import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // Only same-site paths are followed. An absolute `next` would turn this
  // into an open redirect that any phishing page could point at itself.
  const requested = url.searchParams.get("next") ?? "/account/orders/";
  const next = requested.startsWith("/") && !requested.startsWith("//")
    ? requested
    : "/account/orders/";

  // A refusal goes back to /sign-in/, which pops the sign-in modal with the
  // reason above the button - rather than to a dead-end error page that only
  // offers the way back this one already is.
  //
  // Supabase reports a refusal on the query string rather than by status.
  const refused =
    url.searchParams.get("error_description") ?? url.searchParams.get("error");
  if (refused) return backToSignIn(request, url, refused);
  if (!code) return backToSignIn(request, url, "That sign-in link has already been used");

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return backToSignIn(request, url, error.message);

  return NextResponse.redirect(new URL(next, origin(request, url)));
}

function backToSignIn(request, url, reason) {
  const target = new URL("/sign-in/", origin(request, url));
  target.searchParams.set("error", reason);
  return NextResponse.redirect(target);
}

/**
 * The origin to send the visitor back to.
 *
 * Behind Vercel's proxy `url.origin` is the internal host, so the forwarded
 * headers are preferred where they exist - otherwise a successful sign-in
 * would redirect to a hostname the browser cannot resolve.
 */
function origin(request, url) {
  const host = request.headers.get("x-forwarded-host");
  if (!host) return url.origin;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}
