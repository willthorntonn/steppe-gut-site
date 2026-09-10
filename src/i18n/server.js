import { headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_HEADER,
  isSupported,
  localeMeta,
} from "./config";

// Server-side read of the locale the middleware resolved for this request.
// Used by the root layout (for <html lang> and the dictionary) and by any
// generateMetadata that wants a translated <title>.
//
// Reading headers() opts a route into dynamic rendering. That is already true
// of this app for other reasons - middleware.js runs a Supabase session
// refresh on every request, so nothing was being served from a shared static
// cache anyway.

export async function getLocale() {
  const value = (await headers()).get(LOCALE_HEADER);
  return isSupported(value) ? value : DEFAULT_LOCALE;
}

export async function getLocaleMeta() {
  return localeMeta(await getLocale());
}
