import "./globals.css";
import Providers from "./providers";
import { SITE_URL } from "../lib/seo";
import { getLocale } from "../i18n/server";
import { localeMeta } from "../i18n/config";
import { fontVars, scriptFonts } from "../i18n/fonts";
import { loadDictionary } from "../i18n/messages";

// Site-wide defaults. Every page sets its own title and description through
// buildMetadata (src/lib/seo.js); what is here is the base URL the canonical
// and Open Graph URLs resolve against, the favicon, and the fallback title
// from the old index.html.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Steppe Gut — Natural Radiance from Within",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  // Resolved once per request by middleware.js from the NEXT_LOCALE cookie,
  // then Accept-Language, then Vercel's country header.
  const locale = await getLocale();
  const meta = localeMeta(locale);
  const fonts = scriptFonts(meta.script);
  const dict = await loadDictionary(locale);

  return (
    <html lang={locale} dir={meta.dir} style={fontVars(meta.script)}>
      <body>
        {/* Google Fonts, as the old index.html loaded them. Rendered here in
            <body> and hoisted into <head> by React; tailwind.config.js and
            design-tokens.js name the literal families, so next/font is not
            used. The Seed Sans faces are @font-face rules in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* The script face for languages the brand fonts cannot render. Null
            for Latin and for CJK, which uses the platform's own fonts rather
            than a multi-megabyte download. See src/i18n/fonts.js. */}
        {fonts.link && <link href={fonts.link} rel="stylesheet" />}
        <Providers locale={locale} dict={dict}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
