# Steppe Gut — Higgsfield Prompts (CLI + skill in Claude Code)

Supersedes the Nano Banana image prompts. Written for the **Higgsfield skill** — Soul for stills, image-to-video for motion. Only assets you don't already have.

---

## Global Image Direction
Every generated asset must:
- Follow `BRAND_GUIDELINES.md`.
- Match the established Steppe Gut visual identity.
- Feel like part of one commercial campaign.
- Use premium editorial photography.
- Be highly photorealistic.
- Use natural soft lighting unless otherwise specified.
- Avoid stock-photo aesthetics.
- Avoid AI artifacts.
- Never include text.
- Never include logos unless explicitly requested.
- Leave sufficient negative space where UI or headings will overlay the image.

**Palette (always):** forest-green #2F3E2F · warm ivory #F5F1E9 · gold #D4AF37 · soft sage #7D9D75. Golden-hour Mongolian steppe / equine world.

---

## Reference images — the 3 real products (pass as `ref:` for packaging accuracy)
- **@sachets** → `src/sachets-cutout.png` — Product 1: single-serve 10g powder sachets (Fermented Mare's Milk + Kumis)
- **@box** → `src/hero-product-box.png` — Product 2: 25-sachet retail box, 250g
- **@bottle** → *generate first (asset 1), then reuse* — Product 3: 90-capsule bottle

**Livery:** matte deep forest-green #2F3E2F, gold #D4AF37 frame, ivory #F5F1E9 arched label, circular horse-head logo.

## How to run
Point Claude Code at this file and generate top-to-bottom with the Higgsfield skill. Where a `ref:` is listed, pass that file. `IMAGE` = Soul; `VIDEO` = image-to-video (make the still first, then animate). Save to the `save:` path.

---

## PRODUCTS — master renders (reused on Home carousel · Shop · Product · Cart)

**1. Capsule bottle** · IMAGE · 1:1 · ref: none (first render) · save: `src/product-bottle.png`
> Studio e-commerce render of a matte deep forest-green #2F3E2F supplement bottle with a black screw cap and an ivory arched label with a gold #D4AF37 border and a circular horse-head emblem, centered on seamless cream #F5F1E9, soft golden-hour studio light, premium editorial, photoreal, generous negative space.

**2. Sachet** *(optional re-render)* · IMAGE · 1:1 · ref: @sachets · save: `src/product-sachet.png`
> Clean studio render of forest-green #2F3E2F single-serve powder sachets with gold border and ivory arched label, one upright and one leaning, on seamless cream #F5F1E9, soft golden-hour light, premium, photoreal. Match reference label.

**3. Box** *(optional re-render)* · IMAGE · 1:1 · ref: @box · save: `src/product-box-clean.png`
> Clean studio render of the forest-green 250g sachet box with gold frame and ivory arched label, three-quarter angle, on seamless cream #F5F1E9, soft golden-hour light, premium, photoreal. Match reference.

---

## SITE-WIDE

**4. OG / social share image** · IMAGE · 1.91:1 · ref: @box · save: `public/og.png`
Function: link previews (social/SEO).
> Clean centered hero of the Steppe Gut box on cream #F5F1E9, forest-green + gold accents, soft golden light, premium, photoreal, 1200×630. Wide empty margins, extra top space for a logo overlay.

---

## HOME `/`

**5. Technology / fermentation visual** · VIDEO (still→motion) · 16:9 · ref: @sachets · save: `src/home-tech.*`
Location: "technology explainer" block.
> Macro of pale creamy mare's-milk powder pouring from an open forest-green sachet into clear water, blooming and swirling with fine bubbles, sage and forest-green tones, gold highlights, cream background, golden-hour light, luxurious clean science aesthetic, photoreal. Slow gentle push-in. Calm negative space around the pour.

**6. Closing CTA bookend** · VIDEO · 21:9 · ref: none · save: `src/home-cta.*`
Location: bottom of Home (reuse on About).
> Cinematic wide aerial of the Mongolian steppe at golden hour, rolling grassland, distant grazing horses, warm gold light, forest-green shadows, ivory sky, serene premium mood, photoreal. Slow drifting aerial move. Open sky space for a headline overlay.

---

## SHOP `/products`

**7. Shop hero / lifestyle banner** · IMAGE · 16:9 · ref: none · save: `src/shop-hero.png`
Location: banner over the product grid.
> Editorial lifestyle photo of a poised woman in her 30s with radiant natural skin in soft morning light, calm wellness mood, cream #F5F1E9 and forest-green palette, gold warmth, shallow depth of field, premium, photoreal. Subject to one side, clear negative space for a headline.

**8. Packaging family shot** · IMAGE · 3:2 · ref: @sachets + @box + @bottle · save: `src/family-shot.png`
Function: full range at a glance (reuse on About).
> Studio group shot of the full Steppe Gut range — forest-green sachets, 250g box and capsule bottle in gold + ivory livery — arranged on cream #F5F1E9, soft golden-hour light, premium editorial, photoreal. Match reference labels. Balanced negative space.

---

## PRODUCT DETAIL `/products/:slug` (hero product = Fermented Mare's Milk box)

**9. Gallery — angle/back** · IMAGE · 1:1 · ref: @box · save: `src/pd-box-angle.png`
> Three-quarter rear studio shot of the forest-green box showing side and back panels, gold + ivory livery, cream background, soft golden-hour light, photoreal. Match reference.

**10. Gallery — in-use (sachet + glass)** · VIDEO · 1:1 · ref: @sachets · save: `src/pd-inuse.*`
> Open forest-green sachet pouring pale powder beside a glass of creamy prepared drink on a natural stone surface with green sprigs, forest-green + ivory + gold palette, golden-hour light, premium wellness, photoreal. Gentle pour motion.

**11. Benefit / beauty lifestyle** · IMAGE · 3:2 · ref: none · save: `src/pd-beauty.png`
> Close editorial beauty shot of a woman with luminous healthy skin in soft golden light, serene, cream and sage tones, forest-green background, premium wellness, photoreal. Space to one side for copy.

**12. Ingredients / actives flat-lay** · IMAGE · 16:9 · ref: @sachets · save: `src/pd-ingredients.png`
> Elegant flat-lay of an open sachet with pale powder, a citrus slice (Vitamin C) and a golden omega oil drop on ivory #F5F1E9, forest-green line accents, gold detail, botanical premium editorial, soft light, photoreal. Airy negative space.

**13. Microscopy / live-culture visual** · IMAGE · 1:1 · ref: none · save: `src/pd-microscopy.png`
Function: hard-science credibility (reuse on About research card).
> Abstract microscopy of fermented milk cultures and microbes, organic cellular shapes, forest-green #2F3E2F and sage with gold highlights on dark ground, elegant scientific premium, photoreal.

---

## ABOUT `/about` (Sustainability + SeedLabs merged, Mongolia)

**14. Origin hero — steppe** · VIDEO · 16:9 · ref: none · save: `src/about-origin.*`
Function: provenance hero. *(Add the Mongolian flag as a real SVG overlay in code — don't generate it.)*
> Sweeping Mongolian steppe at golden hour, grazing horses, dramatic sky, forest-green + gold + ivory palette, premium editorial documentary mood, photoreal. Slow cinematic pan. Open sky for overlay.

**15. Sourcing — mares grazing** · IMAGE/VIDEO · 3:2 · ref: none · save: `src/about-mares.*`
> Herd of mares grazing on green Mongolian steppe, soft golden light, forest-green and ivory tones, natural premium editorial, photoreal. Optional slow drift.

**16. Sourcing — traditional milking** · IMAGE/VIDEO · 3:2 · ref: none · save: `src/about-milking.*`
> Weathered hands performing traditional Mongolian mare-milking at dawn, authentic documentary warmth, gold light, cream and forest-green palette, photoreal.

**17. Research / heritage cards ×3** · IMAGE · 4:3 each · ref: none · save: `src/about-research-{1,2,3}.png`
> Set of 3 matching editorial images — (1) traditional fermentation vessel with pale milk, (2) botanical actives on ivory, (3) close radiant skin — unified forest-green + ivory + gold, soft golden light, premium, photoreal. Consistent framing across all three.

**18. Sustainability / values** · IMAGE · 3:2 · ref: @box · save: `src/about-sustain.png`
> Still-life of the Steppe Gut box and sachets on natural linen with fresh greenery, forest-green + ivory + gold, soft daylight, calm sustainable premium mood, photoreal. Match reference.

---

## CART / CHECKOUT `/cart`
- Line-item thumbnails → reuse assets 1–3, no new generation.
- Order-confirmation mark → reuse `steppe-gut-horse-mark.svg`, don't generate.
- Payment marks → official PromptPay / bank / card logos.

---

## Weak fits for Higgsfield — do these elsewhere
- **Actives icons (Immunity·Gut·Skin·Radiance·Energy)** → vectors in code or extract from the pack art.
- **Mongolia→Thailand map** → vector/design tool for accuracy.
- **Mongolian flag** → real flag asset as an overlay, not generated.

### Count: ~18 Higgsfield assets (6 can be video). Priority: 1 capsule bottle → 8 family shot → 14 origin → 5 tech pour → rest. Generate asset 1 first — it unlocks the carousel, shop grid, family shot and cart.
