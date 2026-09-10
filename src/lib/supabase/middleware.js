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

/**
 * @param {import("next/server").NextRequest} request
 * @param {Record<string,string>} [forwardHeaders]
 *   Extra headers to add to the *request* as it continues into the app, for
 *   values the middleware worked out and a server component has to read back
 *   with headers() - the resolved locale, in practice. These cannot be set on
 *   the response: headers() reads what came in, so a response header is only
 *   ever visible to the browser, never to the page being rendered.
 */
export async function refreshSession(request, forwardHeaders = {}) {
  // Rebuilt on each call rather than captured once, because the Supabase
  // client mutates request.cookies before asking for a new response and those
  // mutations have to survive into the forwarded request.
  const nextWithHeaders = () => {
    const headers = new Headers(request.headers);
    for (const [name, value] of Object.entries(forwardHeaders)) {
      headers.set(name, value);
    }
    return NextResponse.next({ request: { headers } });
  };

  let response = nextWithHeaders();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(list) {
          for (const { name, value } of list) request.cookies.set(name, value);
          response = nextWithHeaders();
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
