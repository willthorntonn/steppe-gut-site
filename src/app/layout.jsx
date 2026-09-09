import "./globals.css";
import Providers from "./providers";
import { SITE_URL } from "../lib/seo";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
