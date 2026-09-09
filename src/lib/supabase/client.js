"use client";

// The browser's Supabase client.
//
// It carries the publishable key, which is meant to be public: it identifies
// the project and nothing more. What an account can actually read or write is
// decided by row-level security in the database against the signed-in user's
// id, not by which key the request arrived with. That is why the address book
// and the profile are read straight from here rather than through an API
// route that would only re-implement the same check less reliably.
//
// The session lives in cookies (createBrowserClient writes them), so the
// server components and route handlers in this app see the same session the
// browser does without anything being passed by hand.

import { createBrowserClient } from "@supabase/ssr";

let client;

export function supabaseBrowser() {
  // One instance per tab. A second client would keep its own copy of the
  // session and the two would drift after a token refresh.
  client ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
  return client;
}
