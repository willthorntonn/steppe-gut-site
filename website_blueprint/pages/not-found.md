# Page — Not Found `/404`

## Summary

The error page. Small, and worth doing properly: it is the only page a visitor reaches by accident, and it is the one place where a brand's tone under failure is visible.

The reference site does not appear to serve a designed 404 at all — unknown paths render the homepage, which is worse than an error page because the visitor cannot tell whether they arrived somewhere wrong or somewhere unhelpful. **Steppe Gut serves a real 404 with a real status code.**

## Purpose

- **Goals:** trust
- **Audience:** someone who followed a broken link, mistyped a URL, or reached a page that has moved
- **Intent:** "Get me somewhere useful"
- **Primary CTA:** *Go to the homepage*
- **Secondary CTA:** search, and the four most-wanted destinations

## Layout

| Property | Value |
|---|---|
| Container | `container-narrow` 520px, centred |
| Vertical | `pt-24 pb-32`, `min-height: 60vh` on `<main>` so the footer does not sit high on a large screen |
| Background | `cream` |
| Chrome | Full header and footer. **Do not strip the navigation from an error page** — navigation is the entire remedy |
| Images | None. A decorative illustration on a 404 delays the one thing the visitor wants |

## Structure

| # | Element | Spec |
|---|---|---|
| 1 | Eyebrow | "404" in `eyebrow` token, `sage` |
| 2 | `<h1>` | `h1` token |
| 3 | Body | `body-lg`, `text-secondary`, two sentences maximum |
| 4 | Search field | `h-12`, `radius-full`, full-width, submitting to the site search |
| 5 | Four links | `CardGrid columns={2}` of text-only cards |
| 6 | Contact line | `caption`, `text-tertiary` |

## Copy

> **Eyebrow:** 404
> **H1:** This page isn't here
> **Body:** Either the link was wrong or we moved something. Try a search, or one of these.

**Search placeholder:** Search Steppe Gut

**The four links:**

| Title | Excerpt | Href |
|---|---|---|
| Products | The three formats, and what is in them. | `/products/` |
| How it works | What fermented mare's milk is and why it might do anything. | `/how-it-works/` |
| Questions | Thirty-four things people ask us. | `/faq/` |
| Our story | Where the milk comes from. | `/our-story/` |

**Contact line:**
> If you followed a link from somewhere on this site and it brought you here, tell us at hello@steppegut.com and we will fix it.

> That last line is worth the space it takes. It is honest, it costs nothing, and broken internal links are otherwise almost impossible to discover.

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Everything full-width at 20px margins. Cards 1 column |
| ≥ 640px | Content at 520px, centred. Cards 2 columns |

## Accessibility notes

- One `<h1>` — "This page isn't here". **The `<h1>` must describe the error**, not say "404", because a screen-reader user hearing "404" alone gets no information
- Focus moves to the `<h1>` on render
- The search field has a real visually-hidden `<label>`
- The four links are a `<ul>`/`<li>`
- Full header and footer are present, so all normal navigation landmarks remain available
- Colour is not used to indicate the error state

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Page not found · Steppe Gut |
| **HTTP status** | **Must be a genuine `404`** (or `410` for intentionally removed pages). A 404 page served with a `200` status is a soft 404 — it keeps dead URLs in the index and is one of the most common technical SEO faults on SPA-based sites. **Verify this in the deployed environment, not just locally** |
| Robots | `noindex` |
| Sitemap | Excluded |
| JSON-LD | None |

## Developer notes

- Catch-all route, rendered for any unmatched path, and for known-invalid dynamic slugs (`/products/:slug`, `/faq/:slug`, `/the-science/:slug`, `/wellbeing/:slug`, `/rituals/:slug`, `/journal/:slug`, `/press/:slug`)
- **Every dynamic route must 404 on an unknown slug rather than rendering an empty template.** This is stated in each template's developer notes and is worth repeating: an empty product page returning 200 is worse than an error
- The correct status code depends on the host. On a static SPA host this usually requires an explicit 404 configuration — **confirm it on the deployed site with `curl -I`**, because it will silently return 200 by default on several common hosts
- Set up 301 redirects for any URL that changes after launch rather than letting it 404
- Reuses `Container`, `CardGrid`, `ContentCard variant="text"`, `Button`, `Field`. No new components
- Half an hour of work. Build it in Stage 1 alongside the routing skeleton, not at the end — an unrouted site needs it immediately
