# Page — Social `/social/`

> **Written 2026-08-07**, during the build. Two decisions were confirmed with the client before any of it was specified:
>
> 1. **Curated static grid, not a live embedded feed.** Hand-picked posts held as local data. No Instagram/TikTok API, no access tokens, no token-refresh backend, no rate limits, no moderation surface, and no third-party script on the page. The grid can be swapped for a live fetch later without a rebuild.
> 2. **There is no live social presence yet.** The page must work, and read as deliberate, with zero posts in it.
>
> Everything below follows from those two answers. If either changes, this document is wrong.

## Summary

A social page for a brand that has not posted anything yet. That sounds like a page with nothing to do, and it is the opposite: it is the page that decides whether the brand looks *early* or looks *abandoned*.

The failure mode is obvious and common — a grid of stock images pretending to be posts, a follower count that is really a target, an Instagram embed showing someone else's hashtag. Every one of those is a fabricated trust signal, and `02_brand_guidelines.md` §10 rules all of them out by name: no follower counts, no customer photos, no "as seen in".

So the page states its position plainly. It says what the accounts will be for, it says they are not open yet, and it gives one real way to be told when they are. That is honest, it costs nothing, and it is consistent with the honest-limits principle the rest of the site is built on.

## Purpose

- **Website goals served:** trust, brand storytelling
- **Journey questions:** 2 (why does it exist?), 3 (why trust it?)
- **Audience:** someone who clicked a social icon in the footer, or who wants to see whether anyone real is behind this
- **User intent:** "Is this brand alive, and where do I follow it?"
- **Primary CTA:** *Email us and we will tell you* → `mailto:`
- **Secondary CTA:** *See the products* → `/products/`

## The hard constraints

| Constraint | Consequence for this page |
|---|---|
| No live accounts | **No handles are linked.** A link to an account that does not exist is a broken link and, if someone squats the handle later, worse than broken |
| No backend (`SG-PROJECT_SPEC.md`, cart/contact rule) | **No email capture field.** A notify form that collects addresses into nothing is the same data-protection problem as the checkout form. The action is a `mailto:` link, which collects nothing and goes somewhere real |
| No posts | The grid renders its empty state. It is not filled with stock photography dressed as posts |
| `02_brand_guidelines.md` §10 | No follower counts, no engagement numbers, no testimonials, no UGC, no press logos. None of these exist honestly pre-launch |
| `02_brand_guidelines.md` §4.2 | No "coming soon!", no countdown, no "be the first". Urgency is off-brand and, pre-launch, dishonest |

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Header | `PageHeader align="left"` |
| Body container | `content` |
| Section rhythm | `Section size="default"` |
| Images | None of its own. The page is type-led |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Page header | `PageHeader` | States the position in the first two sentences: not posting yet, here is what it will be |
| 2 | What we will post | fact-card grid | Four content pillars. Turns an empty page into a statement of intent |
| 3 | The grid | `SocialGrid` | Renders posts when they exist; renders a plain, deliberate empty state until then |
| 4 | Where to find us | handle list, unlinked | Names the platforms without linking accounts that do not exist |
| 5 | Tell me when | `mailto:` panel | The one real action available with no backend |
| 6 | Closing CTA | `ClosingCTA` | Routes back to the product |

---

# Copy

## 1. Page header

> **Eyebrow:** Social
> **Title (h1):** We have not started posting yet
> **Lead:** The accounts are not open. Rather than fill this page with pictures that are not ours and numbers that are not real, here is what we intend to post, and how to find out when it starts.

## 2. What we will post

> **Heading:** What will be on them

| Title | Body |
|---|---|
| The season | The milking season runs June to October. Most of what we have to show happens in those five months, on the grassland, and it is the part of this business that is genuinely interesting to look at. |
| How it is made | Fermenting, drying, packing. The unglamorous middle of the process, which almost nobody in this category shows. |
| What we are asked | The questions that come in by email, answered in public, including the ones where the answer is that we do not know yet. |
| What we get wrong | When we correct something on this site — a figure, a claim, a piece of wording — we would rather say so than quietly edit it. |

## 3. The grid

**Component:** `SocialGrid`, reading from `src/data/social.js`.

| State | Behaviour |
|---|---|
| Posts present | 2-column grid < 640px, 3 at `sm`, 4 at `lg`. Each item: square image, caption below, whole tile an `<a>` to the post, `target="_blank" rel="noopener noreferrer"` |
| Posts empty *(current)* | A single bordered panel with one line of type. No skeletons, no greyed-out placeholder tiles pretending posts are loading |

**Empty-state copy:**
> There is nothing here yet. When there is, it will be posts we made, not reposts of other people's.

## 4. Where to find us

> **Heading:** Where to find us
> **Body:** These are the platforms we intend to use. None of the accounts is open yet, so none of them is linked — when they are live, the handles will appear here and in the footer.

Platforms listed as plain text, not links: Instagram · TikTok · Facebook · YouTube · LINE

> **Why they are not linked:** an unlinked platform name is a statement of intent. A link to a nonexistent account is a broken link, and if somebody registers that handle in the meantime it becomes a link to a stranger.

## 5. Tell me when

> **Heading:** Tell me when it starts
> **Body:** We do not have a mailing list set up yet, and we are not going to put up a form that quietly collects addresses into nothing. Email us and we will write to you when the accounts go live.
> **CTA:** `mailto:` the brand-owner address from `src/data/site.js`

## 6. Closing CTA

> **Heading:** In the meantime
> **Body:** The product pages have more detail than anything we would post anyway.
> **Primary:** See the products → `/products/`
> **Secondary:** What is in it → `/ingredients-sourcing/`

---

## Footer social icons

The footer's four social icons currently carry `href="#"` — dead links on every page of the site. They are repointed at `/social/`, which is a real destination that explains the position honestly. They keep their existing appearance; only the target changes. When the accounts open, `SOCIAL_PLATFORMS` in `src/data/site.js` gains real URLs and both the footer and this page pick them up.

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Pillar cards 1 column. Grid 2 columns when populated. Platform list stacks |
| 640–1023px | Pillar cards 2 columns. Grid 3 columns |
| ≥ 1024px | Pillar cards 4 columns. Grid 4 columns |

## Accessibility notes

- One `<h1>`. Pillar titles and platform names are `<h3>` under section `<h2>`s
- The platform list is a `<ul>` of plain text, not links — it must not be marked up as a list of links with no destination
- When populated, each grid tile is a single `<a>` with an accessible name describing the post, not "Instagram post" repeated
- Outbound links get `rel="noopener noreferrer"` and an indication they open in a new tab
- The `mailto:` link is real text, not an icon alone

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Social · Steppe Gut |
| Meta description | What Steppe Gut intends to post, and how to find out when the accounts open. |
| `<h1>` | We have not started posting yet |
| JSON-LD | **No `sameAs` entries** until the accounts exist — emitting `sameAs` for accounts that are not live is a structured-data error |
| Robots | Indexable. It is a small page but an honest one, and it is a legitimate destination for a brand-name search |

## Developer notes

- Route `/social/`, lazy-loaded
- `src/data/social.js` exports `SOCIAL_POSTS` (currently `[]`) and `SOCIAL_PLATFORMS` (name + `href: null`). **Turning the page on is adding objects to those arrays** — no component changes
- Post record shape, chosen to match an Instagram media response so a live fetch can be dropped in later without reshaping the component: `{ id, permalink, image, alt, caption, platform, postedAt }`
- **No third-party embed script, no API key, no token refresh.** That was the point of choosing a curated grid
- Reuses `PageHeader`, `Section`, `Container`, `ClosingCTA`. `SocialGrid` is the one new component
- Do not add a follower count, an engagement figure, or a testimonial to this page later without re-reading `02_brand_guidelines.md` §10
