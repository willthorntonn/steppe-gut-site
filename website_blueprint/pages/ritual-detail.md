# Template — Ritual Detail `/rituals/:slug/`

Six pages, one template. The shortest content template on the site.

## Summary

A single preparation, on one screen. The reference site's recipe detail template was studied and its core interaction is worth carrying: **a two-panel Ingredients / Method switcher on mobile that becomes two side-by-side columns on desktop.** It works because it puts the two things a person actually needs within one thumb's reach while cooking, and it stops being an interaction the moment there is room for both.

## Purpose

- **Goals:** product understanding, conversion
- **Journey question:** 7
- **Audience:** an existing or nearly-decided customer, often on a phone, often in a kitchen
- **Intent:** "Tell me how to make this, in ten seconds"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** another ritual

## Layout

| Property | Value |
|---|---|
| Header | Split hero: image and title side by side on `lg`, stacked below |
| Body | `container` capped at 1200px |
| Rhythm | `section-gap-sm` — this page is short and should feel it |
| Total length | Under 250 words |

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Split hero: image + title + meta | Custom, using `Container` |
| 2 | Ingredients / Method | `TabbedPanel` |
| 3 | One note | `Prose`, a single sentence |
| 4 | More ways to take it | `CardRail` of the other five |
| 5 | Product CTA | `MediaTextRow`, compact |

---

# Layout detail

## 1. Split hero

| Property | Value |
|---|---|
| Container | `Container` capped at 1200px, `pt-8 lg:pt-12` |
| < 1024px | Image full-width 3:2, `radius-lg`; text below, centred |
| ≥ 1024px | `flex`, image left 50% / text right 50%, vertically centred, 48px gap |
| Eyebrow | Category ("Cold", "With food"), `sage` |
| `<h1>` | `h1` token |
| Meta row | Two items with 16px Lucide icons: servings (`user`) and time (`clock`), `body-sm`, `text-secondary`, centred on mobile |

## 2. Ingredients / Method

**Component:** `TabbedPanel`

| Property | Value |
|---|---|
| Panel | `#FFFDF9` (`cream-raised`), `radius-lg`, `p-6 lg:p-12` |
| < 1024px | 48px tab bar, two equal halves, active half `solid-forest` with `radius-md`. One panel visible |
| ≥ 1024px | **Tabs hidden entirely.** Both panels side by side, `lg:flex lg:space-x-8`, each `lg:w-1/2` |
| Ingredients | `<ul>`, `body`, 10px item gap, 4px `gold` square markers |
| Method | `<ol>`, numerals in `forest` Inter 600, 16px gap |

## 3. One note

A single sentence in `caption` / `text-secondary`, centred, below the panel. Never more than one.

## 4. More ways to take it

`CardRail` of the other five rituals, heading "More ways to take it", "View all" → `/rituals/`.

## 5. Product CTA

A compact `MediaTextRow` — product image left, two lines of text and a button right.

> **Heading:** Twenty-five mornings in a box
> **Body:** One sachet a day, whichever way you take it.
> **CTA:** See the products → `/products/`

---

# Content records

### `plain-in-water` — Plain, in water
**Category:** Cold · **Serves:** 1 · **Time:** 1 min · **Image:** R-1
**Ingredients:** 1 Steppe Gut sachet (10 g) · 100 ml cool or room-temperature water
**Method:** 1. Tear the sachet along the notch and tip the powder into a glass. 2. Add the water. 3. Stir for about ten seconds until no powder is visible on the surface. 4. Drink straight away, before it settles.
**Note:** This is what most people do every morning, and it is the one worth getting used to.

### `with-citrus` — With citrus
**Category:** Cold · **Serves:** 1 · **Time:** 2 min · **Image:** R-2
**Ingredients:** 1 Steppe Gut sachet (10 g) · 100 ml cool water · a wedge of lime, or a slice of orange
**Method:** 1. Stir the sachet into the water as usual. 2. Squeeze in the lime, or drop in the orange slice and stir once. 3. Drink straight away.
**Note:** The acidity sits alongside the sourness rather than covering it, which works better than sweetening.

### `into-yoghurt` — Into plain yoghurt
**Category:** With food · **Serves:** 1 · **Time:** 2 min · **Image:** R-3
**Ingredients:** 1 Steppe Gut sachet (10 g) · 150 g plain unsweetened yoghurt · optional: a few berries
**Method:** 1. Spoon the yoghurt into a bowl. 2. Add the powder and stir it through thoroughly — it will thicken slightly. 3. Add berries if you want them. Eat straight away.
**Note:** Both are fermented dairy, so nothing in the flavours fights.

### `with-cold-tea` — With cold tea
**Category:** Cold · **Serves:** 1 · **Time:** 2 min · **Image:** R-4
**Ingredients:** 1 Steppe Gut sachet (10 g) · 150 ml chilled unsweetened jasmine or barley tea
**Method:** 1. Make sure the tea is properly cold. 2. Stir the sachet through it for about fifteen seconds — it takes slightly longer than in plain water. 3. Drink straight away.
**Note:** This was the most popular alternative among the people who tested it for us.

### `green-smoothie` — In a green smoothie
**Category:** Cold · **Serves:** 1 · **Time:** 5 min · **Image:** R-5
**Ingredients:** 1 Steppe Gut sachet (10 g) · 1 small banana · a large handful of spinach · 200 ml coconut water · a few ice cubes
**Method:** 1. Blend the banana, spinach, coconut water and ice until smooth. 2. Add the powder and blend for a further five seconds only. 3. Pour and drink.
**Note:** Add the powder at the end — long blending aerates it and the texture suffers.

### `warm-not-hot` — Warm, not hot
**Category:** Warm · **Serves:** 1 · **Time:** 2 min · **Image:** R-6
**Ingredients:** 1 Steppe Gut sachet (10 g) · 100 ml warm water, below 40 °C
**Method:** 1. Boil water and let it stand for several minutes, or mix boiled and cold water roughly one to three. 2. Test it — it should feel warm rather than hot on the inside of your wrist. 3. Stir the sachet through and drink.
**Note:** Above about 40 °C the taste turns noticeably worse. This is the single most common mistake.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 1024px | Hero stacked, image first. `TabbedPanel` shows tabs, one panel at a time. `CardRail` 1.2 cards |
| ≥ 1024px | Hero side-by-side. **Tabs disappear; both panels shown.** Rail arrows appear |

## Accessibility notes

- One `<h1>` per page. "Ingredients" and "Method" are `<h2>` and remain in the outline whether or not the tabs are visible
- `TabbedPanel` is `role="tablist"` with arrow-key navigation and paired `aria-controls`/`aria-labelledby`
- **On `≥1024px` where both panels show, the tab semantics must be removed entirely** — not just visually hidden. A `tablist` with no visible tabs and both panels open is invalid and confusing to a screen-reader user. Render two plain `<section>`s at that breakpoint
- Method is an `<ol>`; ingredients is a `<ul>`
- Meta icons are `aria-hidden`; the text beside them carries the meaning
- Temperature uses a non-breaking space: `40 °C`

## SEO notes

- `<title>`: `Plain, in Water — Ways to Take Steppe Gut` *(pattern per ritual)*
- JSON-LD: **do not use `Recipe`.** These are product-use instructions, not recipes. `HowTo` is defensible for the smoothie; for the rest, plain `Article` is correct and lower-risk
- Each links to the other five, `/rituals/`, and `/products/`
- Target queries: "how to mix mare's milk powder", "mare's milk powder in smoothie", "can you take mare's milk powder with hot water"

## Developer notes

- Route `/rituals/:slug`, lazy-loaded. Unknown slug → 404
- **Zero new images** — all six reuse R-1 … R-6 from the collection page
- Records live in the same `src/data/rituals.js` as the collection page. One file, six objects, both pages
- `TabbedPanel` is first built here. Build the responsive semantics correctly the first time — the "tabs disappear above `lg`" behaviour is easy to implement visually and easy to get wrong in the accessibility tree
- Reuses `Container`, `TabbedPanel`, `CardRail`, `ContentCard`, `MediaTextRow`, `Prose`
- These six pages are roughly half a day of work in total once `TabbedPanel` exists
