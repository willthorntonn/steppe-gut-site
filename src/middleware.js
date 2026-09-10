import { refreshSession } from "./src/lib/supabase/middleware";

export async function middleware(request) {
  return refreshSession(request);
}

export const config = {
  matcher: [
    // Everything except Next's own build output and static files. Images and
    // fonts carry no session and matching them would only add latency to
    // every asset on the page.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|mp4|webm)$).*)",
  ],
};
