import { refreshSession } from "./lib/supabase/middleware";
import { LOCALE_COOKIE, LOCALE_HEADER, resolveLocale } from "./i18n/config";

// Next allows exactly one middleware, so the two things that have to happen on
// every request share this file: the Supabase session refresh, and resolving
// which language to render in.
//
// It has to sit in src/, beside the app directory, not at the project root.
// This app keeps its routes in src/app, and Next only looks for middleware
// next to that - a middleware.js at the repository root is silently ignored,
// with an empty "middleware" object in .next/server/middleware-manifest.json
// as the only sign that it never ran.

export async function middleware(request) {
  const locale = resolveLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  // The locale rides along on the *request*, because that is the only thing
  // headers() can see from a server component (src/i18n/server.js). Handing it
  // to refreshSession rather than setting it afterwards keeps it on whichever
  // response the Supabase client ends up producing.
  //
  // Deliberately not persisted to a cookie: detection should keep tracking the
  // browser as its settings change, and NEXT_LOCALE is reserved for a language
  // the visitor picks by hand, which has to stay distinguishable from a guess.
  const response = await refreshSession(request, { [LOCALE_HEADER]: locale });

  // The same URL now returns different copy depending on the request's
  // language, so any cache in front of the app has to key on it too.
  response.headers.set("Vary", "Accept-Language, Cookie");

  return response;
}

export const config = {
  matcher: [
    // Everything except Next's own build output and static files. Images and
    // fonts carry no session and matching them would only add latency to
    // every asset on the page.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|mp4|webm)$).*)",
  ],
};
