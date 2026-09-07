# Build prompt — make the auth / account area honestly "not connected yet"

Paste everything below into a fresh Claude Code session in this repo.

---

The sign-in flow and the account pages are a frontend-only shell with no backend, exactly like the checkout. The checkout says so in plain language before anyone interacts with it; the auth / account surface does not. Bring that same discipline to auth and account so nothing on screen implies a real service that doesn't exist yet.

Read `SG-PROJECT_SPEC.md` first for conflict priority (brand guidelines win, then the existing homepage in `src/App.jsx`, then design tokens, then the spec, then everything else). Then read:

- `website_blueprint/pages/cart-and-checkout.md` §3 — the "not connected yet" pattern this task is copying
- `website_blueprint/02_brand_guidelines.md` §6 — claim discipline (no implying a live service, no implying Thai FDA registration), plus voice
- `website_blueprint/03_design_system.md` — tokens; reuse `styles/type.js`, `components/ui/Modal`, `components/ui/Field`, `components/ui/Button`, don't restyle
- `src/components/checkout/CheckoutForm.jsx` — the reference implementation of the pattern: read its top-of-file comment block ("NOTHING HERE IS TRANSMITTED OR STORED") and how it (a) puts a plain-text notice above the form before the visitor types and (b) leaves the part that would be a lie visibly `disabled`
- `src/components/ui/HonestLimits.jsx` — the house treatment for "what isn't real yet": calm, no warning icon, styled identically everywhere so it reads as a principle not a disclaimer

## Current state (what you're fixing)

- `src/auth/AuthProvider.jsx` — a `localStorage`-backed demo. Seeds a demo account on first load. `signIn()` re-seeds a fresh demo session (no credentials checked). `register()` stores the submitted form values locally. **Confirm `register()` does not persist the password** — if it does, stop persisting it.
- `src/components/auth/AuthModal.jsx` — the sign-in tab has a single ad-hoc line ("This is a preview build, signing in opens a sample account…"). The **create-account tab has no equivalent notice**. The "already signed in" state has none. The email field's help text ("We'll send the weekly Steppe Gut dispatch here, one email a week") implies a mailing backend that doesn't exist.
- `src/pages/AccountOrders.jsx` — renders a demo order history from `src/checkout/demoPrices`. No notice that the account and its orders are a sample.
- `src/pages/AccountSettings.jsx` — profile / password / email-preference toggles with "Save" affordances that imply server persistence. No notice.
- `src/components/account/EditProfileModal.jsx`, `LogoutConfirmModal.jsx`, `Toggle.jsx`, `PasswordField.jsx` — supporting UI, same gap.

## Tasks

1. **One shared notice, reused everywhere.** Check `src/components/ui/` first for something reusable; if nothing fits, add one small primitive (e.g. `src/components/ui/PreviewNotice.jsx`) styled the same way in every location, following `HonestLimits.jsx`'s calm treatment — no warning triangle, no caution colour, just a bordered/tinted block of plain text. One wording, reused verbatim. Place it:
   - top of `AuthModal`, on **both** the create and sign-in tabs (replace the existing one-liner with the shared component)
   - top of `AccountOrders`, directly under the page header
   - top of `AccountSettings`, directly under the page header

2. **Notice content** — plain, factual, brand voice, house punctuation (no terminal full stops, no em dashes, no " - "). It must say, in the site's own words: there is no account system yet; creating an account or signing in opens a sample account so the order history and settings screens can be seen; anything entered or changed here stays in this browser only and is gone if site data is cleared; no email is sent and no password is checked.

3. **Disable the part that would be a lie.** A password is never verified or stored, so the password fields on the sign-in tab assert something false. Prefer keeping them for realism **only if** the notice above makes the non-verification explicit; otherwise reduce to a single non-functional field or drop them from the sign-in tab. Keep create-account's password + confirm (it demonstrates validation) but never write the password value to `localStorage`.

4. **Account settings persistence.** Keep "Save" working against `localStorage` so the UI demonstrates, but confirmation copy must not imply a server round-trip — "Saved" is fine, "Synced to your account" / "Updated on all your devices" is not. The page notice covers that saves are local to the browser.

5. **Strip or soften claims of a service that doesn't exist.** Anywhere in the auth / account surface: no "securely stored", no "we'll email you …" stated as present tense, no "synced". Rework `AuthModal`'s weekly-dispatch help text to future/conditional or fold it into the notice.

6. **Top-of-file comment blocks.** Add one to `src/auth/AuthProvider.jsx`, `src/pages/AccountOrders.jsx`, and `src/pages/AccountSettings.jsx`, matching the style of `CheckoutForm.jsx`'s block: what is fake, why, and the exact steps to switch it on when a backend lands (which calls to add, which notice to remove, which `disabled` to drop).

7. **Prove there is no transmission.** `grep -rnE "fetch\(|axios|XMLHttpRequest|navigator.sendBeacon" src/auth src/components/auth src/components/account src/pages/Account*` must return nothing. If it doesn't, that's a bug to fix as part of this task.

## Hard constraints

- No backend calls, no analytics calls, no new dependencies
- Nothing may state or imply Thai FDA registration, or a live account / email / payment service
- `localStorage` is the only persistence and the copy must say so
- Reuse `Modal` / `Field` / `Button` / `styles/type.js` — match the existing look, don't restyle
- The existing homepage (`src/App.jsx` and `src/components/home/*`) stays untouched
- Keyboard-navigable, visible focus states, `prefers-reduced-motion` respected

## Acceptance

- [ ] Every entry point to the auth / account surface (both AuthModal tabs, AccountOrders, AccountSettings) shows the shared notice before the visitor interacts
- [ ] No on-screen copy implies real authentication, payment, email delivery, or cross-device / server persistence
- [ ] The `grep` in task 7 returns nothing
- [ ] The password value is never written to `localStorage` (verify in `AuthProvider`)
- [ ] `AuthProvider.jsx` and both account pages carry a switch-on comment block
- [ ] `npm run build` passes, no new console errors, notice is reachable and readable by keyboard and screen reader

## Related, out of scope unless told otherwise

`src/pages/Checkout.jsx` (the "SG-REPLICA" brick clone that replaced `CheckoutForm.jsx` on the `/checkout/` route) has itself lost this discipline: card fields are fully typeable, it shows "All transactions are secure and encrypted", and "Pay now" just navigates to the confirmation screen with no notice that nothing is charged. Flag this in your summary and recommend a companion pass, but don't fix it here unless asked.
