# Steppe Gut — Higgsfield Image Prompts (Homepage Redesign)

Replacement for the earlier deleted prompts doc. This manifest covers the **photo-only** asset pass
for the homepage redesign (July 2026). Every prompt below was used verbatim with the Higgsfield CLI;
regenerate any asset by re-running its command.

**Two pipelines:**

- **Product imagery** → `higgsfield product-photoshoot create` (backend prompt enhancer + GPT Image 2).
  The `--prompt` is a short intent brief, not a full photographic prompt — the backend owns assembly.
  Existing product cutouts are passed as `--image` references for label/pack fidelity.
- **Steppe & brand-story imagery** → `higgsfield generate create gpt_image_2` (direct prompt, no product in frame).

**Shared art direction (echoed in every prompt so the set reads as one shoot):**
natural light, golden-hour warmth against deep forest-green shadow; calm editorial stillness;
generous negative space; subtle film grain; palette anchored to Forest `#2F3E2F`, Cream `#F5F1E9`,
Gold `#D4AF37`. No typography or graphic overlays baked into images.

`generate create` jobs run at `--resolution 2k`; `product-photoshoot create` has no resolution flag
(and `product_shot` mode rejects `4:5` — use `3:4` and crop in CSS). Final assets are
resized/compressed to AVIF + WebP pairs in `src/assets/home/`; the raw PNGs are kept in
`asset-src/` (git-ignored) so slots can be re-cropped without regenerating.

**Caveat:** generated packaging invents its own label microcopy (sachet counts, net weights,
category claims differ from the real pack). Acceptable at card-display sizes for this pass;
re-check any shot where label text is legible before launch.

---

## 1. Product

### P1 — Sachet box hero (`src/assets/home/product-box.{avif,webp}` · 4:5)
Slot: ProductShowcase card 1.
Reference: `src/hero-product-box.png`

```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "premium fermented mare's milk supplement sachet box standing on a rough sandstone plinth, deep forest-green seamless backdrop, single warm golden side light, calm luxury editorial catalog shot, subtle film grain" \
  --image src/hero-product-box.png --aspect_ratio 3:4
```

### P2 — Daily sachets with morning glass (`src/assets/home/product-sachets.{avif,webp}` · 4:5)
Slot: ProductShowcase card 2.
Reference: `src/sachets-cutout.png`

```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "two cream supplement sachets leaning against a small glass of milk-white drink on warm travertine stone, deep forest-green backdrop, golden morning side light, premium wellness editorial still life, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:4
```

### P3 — Capsule bottle render (`src/assets/home/product-capsules.{avif,webp}` · 4:5)
Slot: ProductShowcase card 3. No reference exists — first render of the 90-capsule SKU.

```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "dark forest-green glass supplement jar with brushed gold lid and minimal cream label reading 'STEPPE GUT', a few ivory capsules resting beside it on sandstone, deep green backdrop, warm golden side light, premium editorial catalog shot, subtle film grain" \
  --aspect_ratio 3:4
```

### P4 — Morning ritual lifestyle (`src/assets/home/ritual-pour.{avif,webp}` · 3:2)
Slot: DailyRitual.
Reference: `src/sachets-cutout.png`

```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "woman's hands pouring a cream supplement sachet into a glass of water on a sunlit oak table, morning kitchen atmosphere, linen textures, soft golden window light, calm premium wellness editorial, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

### P5 — Powder macro (`src/assets/home/science-powder.{avif,webp}` · 4:3)
Slot: FermentationScience central annotated image.
Reference: `src/sachets-cutout.png`

```
higgsfield product-photoshoot create --mode conceptual_product \
  --prompt "open cream supplement sachet with fine ivory powder spilling in a sculptural drift across a deep forest-green stone surface, macro detail, dramatic warm golden side light raking the powder texture, premium scientific editorial still life, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 4:3
```

---

## 2. Brand story (fermentation science, sourcing)

### B1 — Traditional fermentation vessel (`src/assets/home/story-vessel.{avif,webp}` · 3:4)
Slot: FermentationScience "the tradition" card.

```
higgsfield generate create gpt_image_2 \
  --prompt "close editorial photograph of a traditional Mongolian wooden fermentation churn with fresh mare's milk, worn oak staves and leather binding, inside a dim ger with warm amber light falling from the roof ring, milk surface softly catching the light, deep shadow, documentary texture, subtle film grain, palette of deep forest green, cream and gold" \
  --aspect_ratio 3:4 --resolution 2k --wait
```

### B2 — Milk swirl macro (`src/assets/home/story-milk.{avif,webp}` · 1:1)
Slot: FermentationScience bioavailability annotation card.

```
higgsfield generate create gpt_image_2 \
  --prompt "overhead macro photograph of cream-white fermented milk mid-swirl in a shallow dark forest-green ceramic bowl, delicate concentric currents and micro-bubbles, single warm golden light raking across the surface, scientific beauty editorial, deep green shadow, subtle film grain" \
  --aspect_ratio 1:1 --resolution 2k --wait
```

---

## 3. Mongolian steppe (provenance anchor)

### S1 — Steppe panorama with herd (`src/assets/home/steppe-panorama.{avif,webp}` · 16:9)
Slot: SteppeOrigin full-bleed chapter hero. Cropped wider in CSS via object-cover.

```
higgsfield generate create gpt_image_2 \
  --prompt "cinematic wide photograph of the Mongolian steppe at golden hour, an endless sea of wind-brushed grass rolling to distant blue mountains, a loose herd of horses grazing mid-distance catching low amber sunlight, vast sky with thin gilded clouds, upper third of frame calm and empty for text, deep green and gold palette, epic quiet, subtle film grain" \
  --aspect_ratio 16:9 --resolution 2k --wait
```

### S2 — Mares and foal (`src/assets/home/steppe-mares.{avif,webp}` · 3:4)
Slot: SteppeOrigin field-note card 1.

```
higgsfield generate create gpt_image_2 \
  --prompt "editorial photograph of two Mongolian mares with a foal standing close together in tall steppe grass, warm low evening light rim-lighting their manes, soft wind movement in the grass, shallow depth of field, tender documentary stillness, deep forest green and amber palette, subtle film grain" \
  --aspect_ratio 3:4 --resolution 2k --wait
```

### S3 — Ger and milk pails at dawn (`src/assets/home/steppe-ger.{avif,webp}` · 3:4)
Slot: SteppeOrigin field-note card 2.

```
higgsfield generate create gpt_image_2 \
  --prompt "documentary photograph of a white Mongolian ger at dawn with steel milk pails and a wooden stool by its painted door, thin woodsmoke rising, dew on the grass, distant hills in cool morning haze, warm lamplight leaking from the doorway against cool blue air, quiet lived-in authenticity, subtle film grain" \
  --aspect_ratio 3:4 --resolution 2k --wait
```

### S4 — Steppe rider, closing (`src/assets/home/steppe-closing.{avif,webp}` · 3:4)
Slot: ClosingCTA left card background.

```
higgsfield generate create gpt_image_2 \
  --prompt "atmospheric photograph of a lone Mongolian herder on horseback silhouetted against a vast dusk sky on the open steppe, last band of gold light on the horizon under deep indigo-green clouds, grass in dark foreground shadow, romantic and monumental, space above the horizon kept clean for text, subtle film grain" \
  --aspect_ratio 3:4 --resolution 2k --wait
```

---

## Slot map

| Asset | Section | Display size (max) | Loading |
|---|---|---|---|
| product-box | ProductShowcase | ~640×800 | lazy |
| product-sachets | ProductShowcase | ~640×800 | lazy |
| product-capsules | ProductShowcase | ~640×800 | lazy |
| steppe-panorama | SteppeOrigin | ~2048×1152 full-bleed | lazy |
| steppe-mares | SteppeOrigin | ~640×853 | lazy |
| steppe-ger | SteppeOrigin | ~640×853 | lazy |
| science-powder | FermentationScience | ~1200×900 | lazy |
| story-milk | FermentationScience | ~640×640 | lazy |
| story-vessel | FermentationScience | ~640×853 | lazy |
| ritual-pour | DailyRitual | ~1200×800 | lazy |
| steppe-closing | ClosingCTA | ~960×1280 | lazy |

Every `<img>` ships with explicit `width`/`height` (no layout shift), `loading="lazy"`
(all slots are below the fold), and an AVIF `<source>` over a WebP fallback.
