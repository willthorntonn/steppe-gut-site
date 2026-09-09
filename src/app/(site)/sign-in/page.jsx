import { Suspense } from "react";
import SignInRedirect from "./SignInRedirect";
import { buildMetadata } from "../../../lib/seo";

// Onboarding / sign-in is a modal (components/auth/AuthModal), not a page.
// The old /sign-in/ URL is kept alive for bookmarks and external links: it
// pops the modal open and drops the visitor on the home page behind it.
export const metadata = buildMetadata({
  title: "Sign in · Steppe Gut",
  path: "/sign-in/",
  noindex: true,
});

export default function SignInPage() {
  // SignInRedirect reads ?error= off the query string, which needs a
  // Suspense boundary for this route to prerender.
  return (
    <Suspense fallback={null}>
      <SignInRedirect />
    </Suspense>
  );
}
