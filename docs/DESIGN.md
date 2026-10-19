# Design: Noor Atelier (Direction A)

Source of truth: `docs/design/directions/direction-a.html` (approved). Every value below lives in `src/styles/tokens.css` as a CSS custom property; change brand values there only. Screenshots of the built app: `docs/screenshots/`.

Tagline: "Weddings and portraits, told in low light." Mood: editorial luxury, dark espresso, antique gold, arch-cropped portraits, film grain.

## Colour
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0d0b09` | App background |
| `--surf` / `--surf-2` | `#171310` / `#1f1a15` | Cards, signature block, skeletons |
| `--ink` | `#f3ece0` | Primary text |
| `--ink-soft` | `#d6ccbd` | Body copy |
| `--mute` | `#a49a8a` | Secondary text, placeholders |
| `--gold` | `#d4b06a` | Eyebrows, links, primary button, badges |
| `--gold-hi` | `#f0d9a4` | Italic accents, prices, active tab, ratings |
| `--wine` | `#5b1e2b` | Reserved accent (hot package gradient starts `--hot-from #2a1a1c`) |
| `--line` / `--line-strong` | `rgba(231,207,160,.14)` / `.30` | Hairline borders / chip outlines |
| `--on-gold` | `#1a1208` | Text on gold fills |
| `--glass` / `--glass-cta` | `rgba(28,23,18,.82)` / `rgba(23,19,16,.88)` | Floating tab bar and contact bar (20px backdrop blur) |
| `--scrim` | `rgba(8,6,4,.85)` | Gradient under tile labels |

Dark only (`color-scheme: dark`). Film grain: SVG feTurbulence overlay at 5% opacity on `.device::after`.

## Typography
Fonts are bundled via `@fontsource` (no network at runtime): **Cormorant Garamond** 400/500/600 + italic 400/500 for display, **Manrope** variable 300-800 for UI. latin-ext subsets are included because the rupee sign is not in the latin subset.

| Token | Size | Use |
|---|---|---|
| `--t-eyebrow` | 10px, tracking `.28em`, uppercase, gold | Section eyebrows |
| `--t-xs` / `--t-sm` / `--t-base` | 11 / 12.5 / 14px | Meta, lists, body (Manrope 300) |
| `--t-lg` | 18px | Tile titles |
| `--t-h3` | 21px | Signature style title (italic, gold-hi) |
| `--t-h2` | 24px | Section titles (Cormorant 500) |
| `--t-profile` | 32px | Profile name (last word italic gold-hi) |
| `--t-h1` | 35px / line-height 1 | Home headline; page titles on list/saved are 38px |
Prices: Cormorant, gold-hi, 18-24px, `formatINR` (Indian grouping, e.g. `₹1,20,000`).

## Spacing, radii, sizing
- 4px base scale `--s-1..--s-8`; page gutter `--gutter: 24px`; min tap target `--tap: 44px`.
- Radii: `--r-sm 12`, `--r-md 16` (grid tiles), `--r-lg 18` (category tiles, packages), `--r-xl 20` (cards, signature), `--r-pill 999` (buttons, chips, search, bars), `--r-arch 95px` (featured arch crop: 95/95/16/16; list thumbs use 56/56/14/14).
- Floating bars sit 16px from edges; tab bar 64px tall; contact bar buttons 46px.

## Motion
| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` | Default |
| `--ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Press feedback |
| `--d-fast` / `--d-base` / `--d-slow` / `--d-page` | 180 / 350 / 600 / 520ms | Hover and chips / sheets / image fade and stagger / page enter |

Implemented: page enter (fade + 14px rise, Svelte transition), staggered cards (`.stagger`, 70ms steps), bottom sheet slide-up with draggable handle, viewer fade, image fade-in on load, profile hero parallax, `motion` spring pop on the save heart, gold shimmer on the WhatsApp button, package-select pulse on the contact bar. `prefers-reduced-motion: reduce` disables all of it (CSS and the JS helpers in `src/lib/motion.ts`).

## Image framing (user requirement: no chopped heads or eyes)
Every photo has `focus` (face centre, `"x% y%"`) and, when faces were detected, `box` (union of faces with head room) in `src/data/seed/images.ts`. All crops render through `Img.svelte` + `lib/focus.ts`, which computes the exact `object-position` for the container aspect ratio and shifts the window to keep `box` whole when possible. Crop contexts and aspect ratios: category tile 166:96, featured arch 1:1, list thumb 112:140 (arch), profile hero ~390:340, portfolio grid 4:5. Hero and cover images were chosen so their face box fits those windows; the viewer uses `object-fit: contain` (no crop).

## Layout
- Single column, 375-430px. Tab bar: Home, Photographers, Saved (floating glass pill, hidden on profile where the contact bar sits in the same slot).
- Contact bar: WhatsApp (gold primary, wider), Call, Email; it shows the chosen package above the bar.
- Wide screens (>=600px): the same layout inside a 390x844 CSS phone frame (black bezel, notch, `transform: translateZ(0)` so `position: fixed` bars and sheets stay inside the frame). No JS.

## Polish pass (2026-10-19)
See `docs/design/POLISH_AUDIT.md`. Tokens added: `--ease-expo`, `--shadow-card`, `--shadow-float`; micro-type floor 11px; `--mute` #b0a695. Press states via `.press` / `.press-sm`; `.bar-fade` under the floating bars. Brand name lives only in `src/lib/brand.ts`. PWA: manifest plugin in `vite.config.ts`, `public/sw.js`, icons in `public/icons/`.
