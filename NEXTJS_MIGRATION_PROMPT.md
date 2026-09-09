# Prompt: migrate Steppe Gut from Vite to Next.js (safe, checkpointed)

Paste everything below this line into a new session.

---

Read `SG-PROJECT_SPEC.md` first, per `CLAUDE.md`. Then read this whole prompt before touching anything.

## The task

Migrate this site from Vite + React Router to **Next.js 15 App Router**. This is a framework migration, not a redesign. The finished site must look and behave **identically** to the current Vite build: same layout, colours, type, spacing, animations, timing, hover states, carousels, checkout flow, account area, redirects and URLs.

Two decisions are final. Do not reopen them, do not ask about them:

1. **Next.js migration: approved and required.**
2. **The current animation direction is approved.** Keep every existing scroll reveal, CSS keyframe, carousel, hover state, smooth scroll and timing exactly as is. Do not add GSAP, Lenis, Framer Motion, Embla, scroll-jacking, parallax or any new motion. None of those are installed today and none should be. `ANIMATION_REQUIREMENTS.md` describes an aspirational stack that was never wired in; ignore that part of it.

Also required: server-rendered metadata (title, description, canonical, Open Graph, Twitter) so WhatsApp / LINE / Facebook previews work; production-ready for Vercel (the project is already linked in `.vercel/project.json`); keep all existing `.avif` / `.webp` / `.png` assets; keep the structure i18n-ready for a future `/th/...` but **do no language work now** (no `[locale]`, no next-intl, no middleware).

## Process rules. These are not optional.

A previous attempt at this migration failed badly, not because the code was wrong but because of how it was run. Follow these exactly.

1. **Work on a new branch** `next-migration`. Never touch `main`. Never push.
2. **Do not start any dev server until `npm run build` passes clean.** The previous attempt hot-reloaded a live server through a 130-file rewrite; the intermediate states had no Tailwind stylesheet, so the site rendered with no colours, every `hidden` element visible (looked like duplicated navs/icons) and no animations. Nobody should be able to look at a half-migrated page. Build first, view second.
3. **Stop at every checkpoint below and wait for a "yes" before continuing.** Show screenshots. Do not commit until the final checkpoint is approved.
4. **Verify with the Browser pane visible.** `IntersectionObserver` and `requestAnimationFrame` do not run while the pane is hidden, so scroll reveals and carousels cannot be verified headlessly. If the pane is hidden, say so and ask for it to be opened rather than reporting motion as working. "Could not verify" is never reported as "done".
5. **Side-by-side, not from memory.** For visual checks, run the Vite build (`git stash` / a worktree on `main`, port 5173) alongside Next (port 3000) and compare the same page at the same width. Any visible difference is a bug to fix, not a note to leave.
6. **Do not delete the old Vite entry files (`index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`) until the final checkpoint is approved.** Until then the Vite build must still run from the same branch.
7. Stay in JS/JSX. No TypeScript conversion.
8. Do not "improve" anything. No refactors, no tidy-ups, no copy edits, no new dependencies beyond `next`, `@tailwindcss/postcss`, `postcss`.

## Facts learned the hard way. Use them.

These are verified against this codebase. They will save a lot of time.

- **`src/pages/` must be renamed.** Next treats `src/pages/` as the Pages Router and will try to serve every file in it as a route. Rename the folder to `src/views/` and update imports. Every file in it becomes `"use client"`.
- **Image imports need a loader.** The codebase has ~130 `import img from "../assets/x.webp"` imports plus `src: importedImg` fields throughout `src/content/*` and `src/data/*`, all expecting a **URL string** (Vite behaviour). Next's default turns them into `{src,width,height}` objects and breaks every `<img src={x}>`. Fix in `next.config.mjs`: `images.disableStaticImages: true` **plus** a webpack rule `{ test: /\.(png|jpe?g|gif|webp|avif|svg)$/i, type: "asset/resource" }`. `disableStaticImages` alone leaves no loader at all and the build fails. This means webpack, not Turbopack; do not pass `--turbopack`.
- **`trailingSlash: true` is right for pages** (every URL is slash-canonical; it replaces ~15 hand-written redirects) **but it 308-redirects `/api/*` too**, which turns POST bodies into GETs and breaks login/register. Fix: `src/api/client.js` must append a trailing slash to every request URL. `server/app.js` already drops the empty trailing segment, so `/api/session/` resolves the same as `/api/session`.
- **The account API in `server/` is plain Node and must be reused, not rewritten.** Wrap `createApp()` from `server/app.js` in a single catch-all `src/app/api/[...path]/route.js`: read the Web `Request` body into a `Readable`, attach `method`, `url` (path + search), `headers`, `socket.remoteAddress`; capture `writeHead` / `setHeader` / `end` into a `Response`. Instantiate `createDb()` + `createApp()` once at module scope. `export const runtime = "nodejs"` and `dynamic = "force-dynamic"`. `server/test/api.test.mjs` must still pass. Flag (do not fix): `db.json` is a file, so writes will not persist on Vercel's ephemeral FS; production accounts need a real store later.
- **Two layouts, two route groups.** `/checkout/` uses the reduced `CheckoutLayout` (no nav row, no footer). Everything else, **including `/checkout/confirmation/`**, uses the full `Layout`. Do this as `src/app/(site)/**` (full chrome) and `src/app/(checkout)/checkout/page.jsx` (reduced chrome) so `/checkout/confirmation/` can live under `(site)`. Turn `Layout.jsx` / `CheckoutLayout.jsx` into client `SiteChrome` / `CheckoutChrome` taking `children` instead of `<Outlet/>`.
- **`Reveal.jsx` crashes SSR.** It reads `window.matchMedia` at render time. Move that read into a `useEffect` (initial state `false`) and add `"use client"`. Do not change anything else in it: the IntersectionObserver logic, the 24px slide, the 700ms curve and the stagger must stay byte-identical. Several carousels have a `prefersReducedMotion()` helper too, but they only call it inside handlers, so they just need `"use client"`.
- **Router navigation state has no Next equivalent.** `Checkout.jsx` does `navigate("/checkout/confirmation/", { state: { placed, order } })` and `Confirmation.jsx` reads it and redirects home if absent. Replace with `sessionStorage` (write before `router.push`, read-and-clear on mount in Confirmation, `router.replace("/")` if missing).
- **`useLocation().hash` is used in `RouteChange.jsx` and `FaqAccordion.jsx`.** Next has no reactive hash. Use `usePathname()` for route changes and read `window.location.hash` plus a `hashchange` listener for same-page anchors. Keep `RouteChange`'s `behavior: "instant"` and `setTimeout` polling exactly as written; the comments in that file explain why (`html { zoom: 0.85 }` makes non-instant `scrollIntoView` a no-op).
- **`NavLink` is used in `Nav.jsx` (3 places, one with a render-prop child) and `SectionSubNav.jsx`.** Replace with `next/link` + `usePathname()`. The top nav had no `end`, so use a prefix match there; the two `end` cases and `SectionSubNav` are exact matches.
- **Wrapper components `Button` and `LinkArrow` take a `to` prop.** Keep that prop name; only change their internal `<Link to>` to `<Link href>`. Callers stay untouched. Direct `<Link to=...>` usages (~50, many multi-line) become `href=`; a regex that only rewrites `to=` inside a `<Link ...>` open tag is safe. `<LinkArrow to=` and `<Button to=` must not be touched.
- **Fonts: keep the Google Fonts `<link>` tags**, rendered inside `<body>` of the root layout (React hoists them). Do not switch to `next/font`; `tailwind.config.js` and `design-tokens.js` reference the literal family names `"EB Garamond"` and `"Inter"`. The Seed Sans `@font-face` rules stay in the global CSS with files in `public/fonts/`.
- **`src/index.css` becomes `src/app/globals.css` verbatim.** Only the `@config` path changes (`../../tailwind.config.js`). It contains the `zoom: 0.85` root, `--vw` / `--vh`, every keyframe, the `prefers-reduced-motion` block and the focus rings. Tailwind v4 via `postcss.config.mjs` with `@tailwindcss/postcss`. `tailwind.config.js` stays unchanged.
- **Metadata.** Replace `src/components/ui/PageMeta.jsx` (31 call sites, client-only) with App Router `metadata` exports. Write one helper `src/lib/seo.js` `buildMetadata({ title, description, path, noindex, image })` returning title, description, `alternates.canonical`, `robots`, `openGraph` (type, siteName, url, images) and `twitter` (summary_large_image). Copy every title/description string verbatim from the existing `<PageMeta>` calls. Set `metadataBase` once in the root layout from `NEXT_PUBLIC_SITE_URL` (default `https://steppegut.com`). Provide a default OG image in `public/og/`. `noindex` pages: cart, checkout, checkout/confirmation, account/*, not-found.
- **404s.** `src/app/not-found.jsx` should render `SiteChrome` + the existing `NotFound` view so the 404 has full chrome as it does today, and it now returns a real 404 status (the SPA could only ever return 200 and leaned on `public/404.html`, which can be removed at the end). Unknown product slugs: `notFound()` in `products/[slug]/page.jsx`.
- **Route map to recreate** (from `src/App.jsx`): `/`, `/products/`, `/products/[slug]/` (3 static params from `PRODUCTS`), `/our-story/` + `mission/` + `science-mission/` + `manufacturing/`, `/gut-health/` + `diet/` + `exercise/` + `routine/` + `sleep/` + `[section]/` (only `mood` is real; it renders `GutMood`), `/faq/`, `/buy/`, `/social/`, `/cart/`, `/checkout/`, `/checkout/confirmation/`, `/contact/`, `/cookies/`, `/privacy/`, `/terms/`, `/sitemap/`, `/account/orders/`, `/account/settings/`, `/sign-in/` (client page: `openAuthModal("signin")` then `router.replace("/")`). The `Editorial` wrapper (`<div className="editorial-copy">`) applies to our-story/*, gut-health/*, cookies, privacy, terms, sitemap. Content redirects in `next.config`: `/ingredients-sourcing/ → /gut-health/`, `/our-story/how-its-made/ → /our-story/manufacturing/`, `/our-story/social-mission/ → /our-story/`, `/signin/ → /sign-in/`, `/account/ → /account/orders/`. Slash-adding redirects come free from `trailingSlash`.
- **`next.config.mjs` also needs** `outputFileTracingRoot: import.meta.dirname` (there is a stray `package-lock.json` in the home directory that confuses Next's workspace detection).
- Scripts: `dev` → `next dev`, `build` → `next build`, `start` → `next start`. Keep `server` and `test:api`. `dev:all` can become an alias for `next dev` since the API is now in-process. Update `.claude/launch.json` to port 3000.
- `FybelleLayout.jsx` and `Ag1Sections.jsx` use `<style>{CSS_STRING}</style>` scoped blocks. They work as-is inside client components. Do not touch them.

## Execution order with checkpoints

**Stage 1. Audit.** Read `src/App.jsx`, `src/main.jsx`, `index.html`, `vite.config.js`, `vercel.json`, `src/index.css`, `src/components/layout/*`, the three providers, `src/api/client.js`, `server/app.js`, `src/components/ui/Reveal.jsx`, `src/components/ui/PageMeta.jsx`. List every `react-router-dom` importer (`grep -rl`). Present the audit and the exact file plan.
→ **Checkpoint 1: wait for approval.**

**Stage 2. Build the Next tree alongside Vite, server off.** Install deps, write configs, root layout, `globals.css`, route groups, chrome components, `Providers`, every `page.jsx`, `seo.js`, the API route handler, rename `src/pages` → `src/views`, do the router-API swap, add `"use client"` where hooks or browser APIs are used. Do **not** delete the Vite files yet. Run `npm run build` until it is completely clean and every route in the map appears in the output.
→ **Checkpoint 2: show the build output. Wait for approval.**

**Stage 3. Side-by-side visual review.** Start Vite on 5173 (from `main` in a worktree) and Next on 3000. With the pane visible, screenshot the same page at desktop width in both and show them as pairs: home (top, and after scrolling so reveals have fired), `/products/`, `/products/pill-bottle/`, `/our-story/`, `/gut-health/mood/`, `/faq/`, `/cart/`, `/checkout/`, `/account/orders/`, a 404. Then the same at 360px for home, products, checkout. Fix every difference before showing. Confirm in the console: zero errors, zero hydration warnings.
→ **Checkpoint 3: wait for approval.**

**Stage 4. Behaviour review.** With the pane visible, demonstrate and screenshot: hero word reveal on load; a section fading up on scroll; a carousel dragging; mobile drawer open (scroll lock + social rail hidden) and closed; search overlay; add-to-cart fly + badge bump; `/sign-in/` opening the modal on home; register → sign in → add address → place order → confirmation → order in `/account/orders/` → sign out (API in-process); a hash deep link from search landing on the right section; `prefers-reduced-motion` emulated (reveals visible instantly, no transforms). `curl` checks: real 404 status on a bad path and a bad product slug; every redirect above resolves; `og:*`, canonical, description and `noindex` present in raw server HTML. `npm run test:api` passes.
→ **Checkpoint 4: wait for approval.**

**Stage 5. Cleanup and commit.** Only now delete `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `vercel.json`, `public/404.html`, `src/components/layout/Layout.jsx`, `CheckoutLayout.jsx`, `PageMeta.jsx`; remove `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `react-router-dom` from `package.json`; add `.next` to `.gitignore`. Rebuild clean. One commit on the branch with a message that lists what changed and the two flagged follow-ups (durable DB for accounts; `NEXT_PUBLIC_SITE_URL` must be set per Vercel environment). Do not push.
→ **Checkpoint 5: report and stop.**

## Out of scope (mention in the final report, do not build)

- EN/TH localisation plumbing.
- Replacing `db.json` with a real database.
- Converting the hero's hand-positioned images to `next/image`. Where `next/image` is used at all, it must take explicit `width`/`height` and produce a pixel-identical result; if in doubt, keep `<img>`.
- Any ESLint setup (the project has none; `next build` is the check).
