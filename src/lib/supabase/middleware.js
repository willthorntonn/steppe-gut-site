// Session refresh, run on every request that matches the matcher in
// middleware.js at the project root.
//
// Supabase access tokens are short-lived. A server component cannot set
// cookies, so without this the refreshed token would be thrown away and a
// visitor would be signed out the moment their token aged past its expiry.
// Calling getClaims() here refreshes the token when it needs it and writes the
// new cookies onto a response the browser will actually receive.

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function refreshSession(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(list) {
          for (const { name, value } of list) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of list) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Do not put anything between creating the client and this call: the token
  // has to be resolved before the response is returned or the refreshed
  // cookies never get written.
  await supabase.auth.getClaims();

  return response;
}
