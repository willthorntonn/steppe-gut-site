# server/

What's left of the old account service: three plain-Node modules that the
Next.js order route imports. There is no longer a process to run here, no JSON
store, and no cookie sessions. Identity, profiles and the address book are
Supabase Auth and Supabase Postgres, read straight from the browser under RLS.
Only order writes still pass through server code, and only for pricing.

## What's here

| File | What it does |
|---|---|
| `catalog.js` | The three products the shop sells and what a basket is worth. `priceBasket()` takes `[{ slug, qty }]` and returns priced lines, totals and the launch-promo label. Prices come from `src/checkout/demoPrices.js`; nothing is read from the request |
| `lib/http.js` | `HttpError(status, message, { field })` — the error shape `src/api/client.js` turns into a field-scoped message the forms render |
| `lib/validate.js` | `normaliseAddress()` and the string/email helpers it uses, shared with the checkout form's field names |

## Who imports it

`src/app/api/orders/route.js` only. That route runs with the Supabase secret
key (`supabaseAdmin()`), prices the basket with `catalog.js`, and inserts the
row — because `public.orders` has no client insert policy, so a price can never
be posted from a browser. Sign-in, profile and addresses do not come through
here at all.

## Pricing

`priceBasket()` decides the total server-side. A basket posts slugs and
quantities; the unit price, the product name and the "20% off two or more"
promo are all applied here, not taken from the request. When real prices land
in `src/data/products.js`, repoint the import at the top of `demoPrices.js`.

## Not here anymore

The scrypt password hashing, the JSON-file store, the HttpOnly session cookies,
the in-memory rate limits and the six-digit email-change code were all removed
when auth moved to Supabase. Password reset and email confirmation now come
from Supabase. Payment, stock, fulfilment beyond `processing`, and
transactional email remain out of scope.
