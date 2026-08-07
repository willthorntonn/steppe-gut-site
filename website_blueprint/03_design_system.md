# 03 — Design System

Colour, type, spacing, containers, radii, shadows, breakpoints, motion. Everything in this document is implementable directly as Tailwind theme values.

> Colour hexes and typeface names come from `design-tokens.js` / `BRAND_GUIDELINES.md` and must not be changed here. Everything else in this document — scale, rhythm, radii, containers, motion — is defined by this blueprint, informed by the structural analysis of the reference site.

---

## 1. Colour

### 1.1 Brand palette (from `design-tokens.js`, unchanged)

| Token | Hex | Role |
|---|---|---|
| `forest` | `#2F3E2F` | Primary. Text, dark surfaces, footer, buttons |
| `cream` | `#F5F1E9` | Secondary. Page background, light surfaces |
| `gold` | `#D4AF37` | Tertiary. Accent only — never a fill for large areas |
| `sage` | `#7D9D75` | Quaternary. Secondary text on dark, muted UI, icon accents |
| `earth` | `#442D1C` | Documented but **not used on the website** (muted palette only) |

### 1.2 Extended surface ramp

The brand palette has one light and one dark value, which is not enough to build cards, panels and hovers. These derived tints are additions, all mixed from the brand colours — they introduce no new hues.

| Token | Value | Use |
|---|---|---|
| `cream-raised` | `#FFFDF9` | Cards and menu panels on a `cream` page — separates by lightness, no border needed |
| `cream-sunk` | `#EDE8DD` | Insets, table stripes, disabled fields |
| `forest-800` | `#26321F` | Footer band, deepest surfaces |
| `forest-600` | `#3D5039` | Hover state for `forest` fills |
| `sage-tint` | `#E8EDE4` | Quiet informational panels, "what we don't know yet" blocks |
| `gold-tint` | `#F5EBCB` | Highlight backgrounds. Sparing |

### 1.3 Text colours

| Token | Value | Use |
|---|---|---|
| `text-primary` | `forest` `#2F3E2F` | Body and headings on light |
| `text-secondary` | `rgba(47,62,47,0.72)` | Supporting copy, captions |
| `text-tertiary` | `rgba(47,62,47,0.55)` | Metadata, breadcrumbs, legal |
| `text-on-dark` | `cream` `#F5F1E9` | Body on `forest` |
| `text-on-dark-muted` | `rgba(245,241,233,0.72)` | Supporting copy on `forest` |

### 1.4 Contrast — a hard constraint

`BRAND_GUIDELINES.md` and `SG-PROJECT_SPEC.md` §12 both flag gold-on-cream as a known risk. It is worse than "a risk": **gold `#D4AF37` on cream `#F5F1E9` measures roughly 2.0:1**, which fails WCAG AA for text at every size.

**Rules:**

| Combination | Ratio | Verdict |
|---|---|---|
| `forest` on `cream` | ~9.9:1 | ✅ Use freely. This is the default pair |
| `cream` on `forest` | ~9.9:1 | ✅ Use freely |
| `gold` on `forest` | ~4.9:1 | ✅ Passes AA for normal text. **This is the only permitted gold text pairing** |
| `gold` on `cream` | ~2.0:1 | ❌ **Never for text.** Permitted only for non-informational decoration: rules, underlines ≥ 2px, icon strokes that duplicate a text label, borders |
| `sage` on `cream` | ~2.8:1 | ❌ Never for body text. Permitted for ≥ 24px display text only where it is not the sole carrier of meaning, and for decorative rules |
| `text-secondary` on `cream` | ~7.0:1 | ✅ |
| `text-tertiary` on `cream` | ~5.2:1 | ✅ |

**Consequence for the design:** gold is a *line* colour and a *dark-background text* colour on this site. On cream, it draws rules, underlines and edges. It never sets a word.

### 1.5 Semantic colours

| Token | Value | Use |
|---|---|---|
| `success` | `#4B6B47` | Form success, in-stock |
| `error` | `#8C3A2B` | Form errors, out-of-stock. A desaturated brick, chosen to sit inside the palette rather than shout |
| `focus-ring` | `forest` at 2px, offset 2px | Every interactive element |

---

## 2. Typography

### 2.1 Families

| Token | Family | Weights | Use |
|---|---|---|---|
| `font-display` | EB Garamond | 400, 600 | H1–H3, pull quotes, product names, numerals in stat bands |
| `font-body` | Inter | 400, 600, 700 | Body, UI, labels, buttons, nav, H4–H6 |
| `font-thai` | Noto Sans Thai | 300, 400, 700 | All Thai copy, both display and body |

Loading: `font-display: swap`, self-hosted WOFF2, subset to Latin + Latin-Extended (EB Garamond, Inter) and Thai + Latin (Noto Sans Thai). Preload only the two weights used above the fold: EB Garamond 400 and Inter 400.

### 2.2 Type scale

A 1.25 modular scale, clamped for fluid resizing between 390px and 1280px viewports.

| Token | Mobile | Desktop | `clamp()` | Line-height | Family / weight | Tracking |
|---|---|---|---|---|---|---|
| `display-1` | 40px | 68px | `clamp(2.5rem, 1.2rem + 5.3vw, 4.25rem)` | 1.06 | Display 400 | −0.02em |
| `display-2` | 32px | 52px | `clamp(2rem, 1.1rem + 3.7vw, 3.25rem)` | 1.12 | Display 400 | −0.015em |
| `h1` | 30px | 44px | `clamp(1.875rem, 1.2rem + 2.8vw, 2.75rem)` | 1.16 | Display 400 | −0.01em |
| `h2` | 26px | 34px | `clamp(1.625rem, 1.3rem + 1.3vw, 2.125rem)` | 1.22 | Display 400 | −0.01em |
| `h3` | 21px | 25px | `clamp(1.3125rem, 1.2rem + 0.5vw, 1.5625rem)` | 1.32 | Display 600 | 0 |
| `h4` | 17px | 18px | `1.0625rem → 1.125rem` | 1.4 | Body 600 | 0 |
| `body-lg` | 18px | 19px | `1.125rem → 1.1875rem` | 1.72 | Body 400 | 0 |
| `body` | 16px | 16px | `1rem` | 1.68 | Body 400 | 0 |
| `body-sm` | 14px | 14px | `0.875rem` | 1.6 | Body 400 | 0 |
| `caption` | 13px | 13px | `0.8125rem` | 1.5 | Body 400 | 0 |
| `legal` | 12px | 12px | `0.75rem` | 1.6 | Body 400 | 0 |
| `eyebrow` | 11px | 12px | `0.6875rem → 0.75rem` | 1.4 | Body 600, uppercase | 0.1em |
| `button` | 15px | 15px | `0.9375rem` | 1 | Body 600 | 0.01em |

**`body-lg` is the default for prose in editorial sections.** `body` is the default for UI, cards, tables and dense panels.

### 2.3 Rules

- **One `<h1>` per page, always.** The reference audit found 6 pages with no `<h1>` at all (including its homepage) and 6 with two. Both are defects. Steppe Gut ships exactly one, and it is the page's actual title.
- Heading levels never skip. An `<h3>` always sits under an `<h2>`.
- Never use a heading element for visual size. Use `display-1`/`display-2` classes on a `<p>` where a large non-heading is wanted.
- **Measure:** prose line length is capped at `68ch` (≈ 660px at `body-lg`). Long-form science pages use `72ch`.
- `text-wrap: balance` on all H1/H2. `text-wrap: pretty` on lead paragraphs.
- Never centre more than three lines of body copy.
- Italic is available in EB Garamond and used for Latin binomials (*Lactobacillus*), publication titles, and nothing else.

---

## 3. Spacing

### 3.1 Base scale

4px base unit. Tailwind's default scale is used, plus these named section-rhythm tokens.

### 3.2 Section rhythm — the most important spacing decision on the site

The reference site's entire vertical rhythm is a single pair of values: `56px` on mobile stepping to `120px` on desktop between top-level sections. That one decision is what makes 168 pages feel like one site. Steppe Gut adopts the same principle with values tuned to its quieter, more editorial character (Steppe Gut runs slightly more generous, because whitespace is the primary carrier of "premium" in a restrained palette).

| Token | Mobile | Tablet | Desktop | Use |
|---|---|---|---|---|
| `section-gap` | 64px | 88px | 128px | Between top-level page sections. **The default.** |
| `section-gap-lg` | 88px | 120px | 176px | Around chapter breaks, full-bleed sections, closing CTA |
| `section-gap-sm` | 40px | 48px | 64px | Between tightly related sub-sections inside one section |
| `block-gap` | 24px | 28px | 32px | Between blocks inside a section (heading → body → CTA) |
| `element-gap` | 12px | 12px | 16px | Between adjacent elements (label → value) |

Implementation: a `<Section>` component owns this. Individual sections never hand-set their own top margin.

### 3.3 Horizontal padding

| Viewport | Padding |
|---|---|
| < 640px | 20px |
| 640–1023px | 32px |
| ≥ 1024px | 48px |

---

## 4. Containers

| Token | Max width | Use |
|---|---|---|
| `container` | 1280px | Default page container |
| `container-wide` | 1440px | Full-bleed-adjacent sections, image galleries |
| `container-content` | 940px | Section headers, badge rows, centred intros |
| `container-prose` | 680px | Long-form body copy (the `68ch` measure) |
| `container-narrow` | 520px | Forms, nutrition panels, newsletter, checkout column |
| `full-bleed` | 100vw | Chapter heroes and closing CTA only |

All containers are `mx-auto` and carry the §3.3 horizontal padding.

**Full-bleed technique:** rather than breaking out of the container with negative margins, full-bleed sections sit outside the container in the DOM and place their own inner `container` for text. Simpler, and avoids horizontal-scroll bugs.

---

## 5. Radii

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Inputs, small chips, table cells |
| `radius-md` | 14px | Cards, image frames, accordion panels |
| `radius-lg` | 24px | Hero banner, feature panels, media frames |
| `radius-xl` | 36px | Nutrition panel, quote panels, large inset blocks |
| `radius-full` | 9999px | Buttons, badges, avatars, pills |

**Rule:** a page uses at most three radii. Mixing five reads as inconsistent.

---

## 6. Elevation

The palette is low-contrast, so shadows must be soft and warm-tinted or they read as dirt.

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(47,62,47,0.06)` | Rest state on interactive cards |
| `shadow-md` | `0 10px 30px -12px rgba(47,62,47,0.16)` | Raised cards, dropdown panels |
| `shadow-lg` | `0 22px 60px -18px rgba(47,62,47,0.22)` | Buy box, modals, cart drawer |
| `shadow-inset` | `inset 0 1px 0 rgba(255,255,255,0.5)` | Optional top highlight on `cream-raised` cards |

Never use a pure-black shadow. Never use more than two elevation levels on one screen.

---

## 7. Borders

| Token | Value | Use |
|---|---|---|
| `border-subtle` | 1px `rgba(47,62,47,0.12)` | Card edges, table rows, input rest |
| `border-strong` | 1px `rgba(47,62,47,0.28)` | Input focus-adjacent, dividers that must read |
| `border-accent` | 2px `gold` | Accordion dividers, active underlines, section rules |

The reference site uses a heavy 3px accent divider on accordions to make a long list scannable at a glance. The principle is sound; 2px gold is the Steppe Gut equivalent, because 3px in gold on cream becomes decorative noise at this palette's contrast level.

---

## 8. Breakpoints

| Name | Min-width | Primary purpose |
|---|---|---|
| `sm` | 640px | Two-column card grids begin |
| `md` | 768px | Media/text rows go side-by-side; social rail appears |
| `lg` | 1024px | Three-column grids; full section padding |
| `xl` | 1280px | Desktop nav replaces hamburger; container reaches max |
| `2xl` | 1440px | `container-wide` reaches max |
| `1395` | 1395px | **Retained from the existing `tailwind.config.js`.** Do not remove — the existing hero depends on it |

**Test matrix (required before any page ships):** 360 · 390 · 768 · 1024 · 1280 · 1395 · 1600px.

Mobile-first authoring throughout. Layouts change **structurally** at breakpoints (column count, stacking order, image crop), not merely by scaling.

---

## 9. Thai typography overrides

Applied via `:lang(th)` or a `[data-lang="th"]` root attribute.

| Property | Latin | Thai |
|---|---|---|
| Display family | EB Garamond | **Noto Sans Thai 700** (no serif with Thai coverage exists in the brand set) |
| Body family | Inter | Noto Sans Thai 400 |
| Display size | as §2.2 | **×0.92** — Thai glyphs have a larger apparent size at the same point size |
| Line-height (headings) | 1.06–1.32 | **+0.14** on every value — Thai needs room for upper and lower vowel marks and tone marks |
| Line-height (body) | 1.68 | **1.9** |
| Letter-spacing | as §2.2 | **0** always. Never letter-space Thai; it breaks glyph clusters |
| `word-break` | normal | `word-break: normal; line-break: loose;` — Thai has no inter-word spaces |
| Uppercase transform | used on eyebrows | **Never.** Thai has no case; the transform does nothing to Thai and desynchronises bilingual pairs |

**Layout consequence:** Thai headings run 15–25% longer. Every heading container must tolerate one extra line without the layout shifting. Test every page in Thai before calling it done.

---

## 10. Motion

Follows `SG-PROJECT_SPEC.md` §9 exactly; restated with concrete values.

| Pattern | Implementation | Duration | Easing |
|---|---|---|---|
| Scroll reveal | `Reveal` component — Framer Motion `whileInView`, opacity 0→1 + `translateY(24px→0)`, `once: true`, `margin: "-80px"` | 600 ms | `[0.22, 1, 0.36, 1]` |
| Staggered children | `staggerChildren: 0.08` | — | — |
| Hover / press | **Tailwind CSS transitions**, not Framer Motion | 150–200 ms | `ease-out` |
| Menu / drawer | Transform-based slide | 260 ms | `[0.22, 1, 0.36, 1]` |
| Accordion | Height auto via grid-rows trick or Framer `AnimatePresence` | 240 ms | `ease-out` |
| Page transition | Fade only | 200 ms | `linear` |
| Count-up stat | Framer `useMotionValue` + spring | ~1.2 s | spring |
| Carousel drag | Embla, free-scroll off, `dragFree: false` | — | — |

**Rules:**
- One reveal primitive sitewide. Never write a bespoke scroll animation for a single section.
- Never mix Framer `whileHover` and Tailwind `hover:` on the same element.
- **`prefers-reduced-motion` is a hard requirement.** When set: reveals render content immediately at full opacity with no transform, carousels do not autoplay, parallax is disabled, and all transitions collapse to ≤ 120 ms opacity-only.
- No parallax on text. Ever.
- No animation on first paint above the fold — the hero renders, it does not perform.

---

## 11. Iconography

- **Lucide only**, for every functional icon. Never generate icon imagery with an image model.
- Default 20px box, 1.5px stroke, `currentColor`.
- 24px at 1.75px stroke for feature/benefit icons in badge rows.
- Icons that carry meaning alone get an `aria-label`; icons beside a text label get `aria-hidden="true"`.
- Never use an icon as the sole indicator of state — pair with text or an accessible name.

---

## 12. Imagery treatment

| Property | Value |
|---|---|
| Aspect ratios in use | `16:9` (chapter heroes) · `3:2` (media rows) · `4:5` (product cards) · `1:1` (macro, avatars) · `3:4` (portrait cards) |
| Formats | AVIF `<source>` → WebP `<source>` → JPEG `<img>` fallback |
| Responsive | `srcset` at 1×/2× for each layout width; `sizes` always set explicitly |
| Dimensions | `width` and `height` always present on `<img>`. Zero tolerance for CLS |
| Loading | `loading="lazy"` everywhere except the single above-fold hero image, which is `fetchpriority="high"` and eager |
| Radius | `radius-lg` (24px) on framed images; full-bleed images unrounded |
| Overlay for text-on-image | Linear gradient `rgba(47,62,47,0.62)` → `rgba(47,62,47,0.15)`, direction chosen so text sits in the dense end. Never rely on the photograph alone for contrast |
| Alt text | Descriptive where the image carries information; `alt=""` where purely decorative. Decided per image, never defaulted |

---

## 13. Forms

| Element | Spec |
|---|---|
| Label | Always present and visible. Inter 600, `body-sm`, `forest`, 8px above the field. Placeholders are never labels |
| Input | `h-12`, `radius-sm`, 1px `border-subtle`, `bg-cream-raised`, `px-4`, Inter 400 16px (**16px minimum — anything smaller triggers iOS zoom on focus**) |
| Focus | `border-strong` + 2px `gold/40` ring, offset 0 |
| Error | 1px `error` border, message below in `error` at `body-sm`, `aria-describedby` wired, `aria-invalid="true"` |
| Required | Marked in the label text as "(required)", not with a bare asterisk |
| Help text | `caption`, `text-tertiary`, below the field, linked via `aria-describedby` |
| Submit | `Button` `solid-forest`, full-width on mobile, auto on desktop. Disabled + spinner while pending, with an `aria-live` status |
| Autofill | Correct `autocomplete` attributes on every field (`email`, `given-name`, `tel`, `address-line1`, `postal-code`, `country`) |
| Touch target | ≥ 44 × 44px for every control |

---

## 14. Buttons

| Variant | Fill | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| `solid-forest` | `forest` | `cream` | none | `forest-600` | Primary action. **One per screen region** |
| `outline-forest` | transparent | `forest` | 1px `forest` | fill `forest`, text `cream` | Secondary action, nav Buy |
| `ghost` | transparent | `forest` | none | `cream-sunk` background | Tertiary, in-card actions |
| `link-arrow` | transparent | `forest` | none | arrow translates 4px right, 2px `gold` underline grows | Inline "read more" links |
| `solid-cream` | `cream` | `forest` | none | `cream-sunk` | Primary action on a `forest` background |

**Shared:** `radius-full`, `px-6 h-12` (`px-7 h-13` for large), Inter 600 15px, `transition-colors duration-200`, focus ring per §1.5, `min-height: 44px`.

**Gold is never a button fill.** Gold text on forest is legible (§1.4), but a gold button next to a forest button creates two competing primaries and undermines the restraint the brand depends on. Gold's role in buttons is limited to the `link-arrow` underline.

---

## 15. Tailwind config additions

```js
// tailwind.config.js — additions to the existing config
theme: {
  extend: {
    colors: {
      'cream-raised': '#FFFDF9',
      'cream-sunk':   '#EDE8DD',
      'forest-800':   '#26321F',
      'forest-600':   '#3D5039',
      'sage-tint':    '#E8EDE4',
      'gold-tint':    '#F5EBCB',
      success:        '#4B6B47',
      error:          '#8C3A2B',
    },
    maxWidth: {
      'container':      '1280px',
      'container-wide': '1440px',
      'content':        '940px',
      'prose-measure':  '680px',
      'narrow':         '520px',
    },
    borderRadius: { sm: '8px', md: '14px', lg: '24px', xl: '36px' },
    boxShadow: {
      sm: '0 1px 2px rgba(47,62,47,0.06)',
      md: '0 10px 30px -12px rgba(47,62,47,0.16)',
      lg: '0 22px 60px -18px rgba(47,62,47,0.22)',
    },
    transitionTimingFunction: { 'brand': 'cubic-bezier(0.22, 1, 0.36, 1)' },
  },
},
// `screens` keeps the existing sm/md/lg/xl set plus the existing custom `1395`.
```

---

## 16. Performance budget

Carried forward from `SG-PROJECT_SPEC.md` §13 and applied per page, not just to Home.

| Metric | Target |
|---|---|
| LCP | < 2.5 s on 4G |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS per route (gzipped) | < 180 KB |
| Largest image (compressed) | < 220 KB |
| Web fonts | ≤ 4 files preloaded |

Route-based code splitting via `React.lazy`. Everything below the fold lazy-loads. No dependency is added without a stated need; GSAP stays out of the bundle unless a pinned-scroll section is actually built.
