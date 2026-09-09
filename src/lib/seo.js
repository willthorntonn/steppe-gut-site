// Per-route document metadata for the App Router. One helper so every page
// gets the same shape - title, description, canonical, robots, Open Graph and
// Twitter card - and the social previews (WhatsApp, LINE, Facebook) always
// have an image and a URL to show. `metadataBase` is set once in the root
// layout, so `path` and `image` can stay relative here.

export const SITE_NAME = "Steppe Gut";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://steppegut.com";
export const DEFAULT_OG_IMAGE = "/og/default.png";

/**
 * @param {object} options
 * @param {string} options.title          The <title>, verbatim.
 * @param {string} [options.description]
 * @param {string} options.path           Slash-canonical route, e.g. "/faq/".
 * @param {boolean} [options.noindex]     Commerce and error routes stay out
 *                                        of the index.
 * @param {string} [options.image]        Open Graph image path or URL.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  image = DEFAULT_OG_IMAGE,
}) {
  const metadata = {
    title,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      url: path,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [image],
    },
  };

  if (description) {
    metadata.description = description;
    metadata.openGraph.description = description;
    metadata.twitter.description = description;
  }

  if (noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
