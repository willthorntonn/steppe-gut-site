# S72 Strategic Scope Checklist — Template Guide

## Overview
Single-file, mobile-optimized HTML interactive checklist. All assets (fonts, logo) embedded as base64 — no external requests. Designed for distribution as a Claude Artifact (shareable private link).

## How to Send
1. Publish HTML as Claude Artifact (Artifact tool with `favicon: ♟️`)
2. Share button → copy link
3. Send link via WhatsApp, email, etc.
4. User selects options, clicks "Send My Scope" → email app opens pre-filled with selections

## Design System Applied
- **Palette**: Dark charcoal (#242424 bg), light grey text (#E5E5E5), accent (#E5E5E5 for highlights), muted grey (#CCCCCC)
- **Type**: Anton (headlines, very sparing), Inter 700 (labels, uppercase), Inter 400 (body/descriptions)
- **Pattern**: Hairline dividers (#404040), no rounded cards, minimal shadows
- **Mobile-first**: 375px baseline, no horizontal scroll

## Technical Stack
- **Single HTML file** (no build step, no external CDN requests)
- **Base64-embedded assets**: fonts (woff2), logo (PNG)
- **Vanilla JS**: state machine for cap enforcement, checkbox listeners, mailto generation
- **CSS variables**: light/dark theme tokens at `:root`
- **Scrollbar**: webkit styling for dark theme match

## Key Files to Prepare
1. **Logo** (PNG, transparent background)
   - Crop to bounding box, pad 6%, resize to target height (200px for header)
   - Encode as base64, embed via `<img src="data:image/png;base64,...">`
   
2. **Fonts** (woff2 format, embed via `@font-face data:` URIs)
   - Display face: Anton (heading, 400 weight)
   - Body/labels: Inter (400 & 700 weights)
   - Fetch from Google Fonts CDN, base64-encode, drop into template
   
3. **Content** (in template HTML)
   - Core items: locked/checked, cannot be unchecked
   - Optional items: user picks up to N (configurable cap)
   - Upsell tiers: nested under one optional item, toggleable pricing

## Template Structure
```html
<header>           Logo + wordmark
<main>
  <section hero>   Headline + instruction
  <section core>   5 locked core items (always checked)
  <div counter>    Live "X / 2 Selected" counter (no box, plain label)
  <section optional> User-selectable add-ons
  <section submit> Button + fallback (mailto link + copy-to-clipboard)
<footer>           Branding
```

## Customization Checklist
- [ ] Replace logo PNG
- [ ] Update hero headline/subheading
- [ ] Update core items list + descriptions
- [ ] Update optional items list + descriptions
- [ ] Adjust `MAX_OPTIONAL` cap in JS
- [ ] Update `EMAIL` variable for mailto target
- [ ] Customize color tokens (`:root` variables)
- [ ] Update footer company name/tagline
- [ ] Test interactions: cap enforcement, counter update, mailto generation, clipboard fallback

## Spacing & Consistency Notes
- Section label to first item below: **16px** (measured via `getBoundingClientRect`)
- Apply equally to all label → content gaps
- Commas in copy: always "x, y" (space after)
- Remove white backgrounds, sticky positioning; use hairline dividers instead

## Sharing & Distribution

### Option 1: Direct Artifact Link (Simplest)
1. Publish to Artifact via Claude Code
2. Click **Share** button → copy the full link (e.g., `https://claude.ai/code/artifact/e212e636-...`)
3. Send directly via WhatsApp, email, etc.
4. Works everywhere, no setup needed
5. Downside: URL contains "claude.ai" and is very long

### Option 2: URL Shortener (Recommended for Branding)
**Goal:** Turn `https://claude.ai/code/artifact/e212e636-0bce-4a33-96c3-b42639099516` into something like `bit.ly/steppe-scope`

**Steps:**
1. Copy your full artifact link (Share button in Claude)
2. Go to **bitly.com** (free, no login required for basic shortening)
3. Paste the long link into the text box
4. Click **Shorten**
5. You get a short link (e.g., `bit.ly/steppe-scope`) — customize the slug if you want
6. Send the short link instead
7. When someone clicks it, they're redirected to the artifact (works perfectly in WhatsApp, email, SMS)

**Why this is good:**
- Clean, short URL with no "claude" branding
- You can customize the slug to match your product (`bit.ly/sg-scope`, `bit.ly/steppe-checklist`, etc.)
- Analytics: bitly shows you how many people clicked
- Same artifact, just a prettier front door

### Option 3: Self-Host (Full Control)
If you want zero external dependencies:
1. Download the HTML file locally
2. Upload to your own web server (Vercel, Netlify, your domain, etc.)
3. URL becomes something like `steppegut.com/scope-checklist`
4. No Claude branding, full control over updates
5. More work upfront, but cleaner for production

### Sharing Checklist
- [ ] Test locally first (npm serve or similar)
- [ ] Verify all interactions work on mobile (375px)
- [ ] Publish to Artifact
- [ ] Choose: direct link, bitly shortener, or self-host
- [ ] Send to test recipient (yourself first)
- [ ] Verify mailto works in their email app
- [ ] Get feedback, iterate
- [ ] Once satisfied, share with broader audience

## For Future Documents
This same approach works for:
- Feature polls, feature requests, scope templates, consent forms, preference centers
- Keep all assets embedded, avoid external CDNs (Artifact CSP blocks them)
- Use consistent typography + token system across variants
- Test on real mobile devices / in-app browsers (WhatsApp, etc.)
