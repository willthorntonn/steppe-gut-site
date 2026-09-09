// Supabase on the server: one client that acts as whoever is signed in, and
// one that acts as the service.
//
// The difference matters. `supabaseServer()` reads the session cookie and is
// bound by the same row-level security as the browser, so a route handler
// using it cannot read another account's rows even by mistake.
// `supabaseAdmin()` bypasses row-level security entirely and exists for the
// one thing the browser must not be trusted with: writing an order at a price
// the server decided (see src/app/api/orders/route.js).
//
// The secret key is read from the environment and never leaves this module.
// It must not appear in anything prefixed NEXT_PUBLIC_, which is bundled.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll(list) {
          try {
            for (const { name, value, options } of list) {
              store.set(name, value, options);
            }
          } catch {
            // Server components cannot set cookies. That is fine here: the
            // middleware refreshes the session on every request, so nothing
            // is lost by this write being dropped.
          }
        },
      },
    }
  );
}

export function supabaseAdmin() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SECRET_KEY is not set, so the server cannot write orders"
    );
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
