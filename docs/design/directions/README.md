# Brand + visual directions (pick one)

Each file shows Home and Photographer Profile in 390x844 phone frames. Open `direction-{a,b,c}.html` (or the `.png`). Photos are Unsplash; names, prices and contacts are fake demo data.

| | A. Noor Atelier | B. Rangeela | C. Fokus |
|---|---|---|---|
| Alternates | Ek Frame, Obsidian Lens | Jashn, Utsav Lens | Kshan, Lenzo |
| Tagline | Weddings and portraits, told in low light. | Every celebration, in full colour. | Find the right photographer, fast. |
| Vibe | Editorial luxury, dark, cinematic | Warm, celebratory, festive Indian | Clean modern minimal, product-first |
| Wordmark | Cormorant serif, italic gold "Atelier" | Fraunces, magenta + marigold, teal sparkle | Lowercase "fokus" with lens-dot mark |
| Fonts | Cormorant Garamond + Manrope | Fraunces + Plus Jakarta Sans | Geist + Instrument Serif (italic accent) |
| Palette | bg #0D0B09, surface #171310, ink #F3ECE0, gold #D4B06A / #F0D9A4, wine #5B1E2B | cream #FFF4E2, ink #3A1020, magenta #C8145A, marigold #F5A30A, teal #0E7C74, saffron #FF6A2B | bg #F6F6F4, ink #101113, card #FFFFFF, accent #2F4BFF, tint #E8EBFF |
| Shapes | Arch-cropped portraits, pill floating tab bar, film grain | Rounded 22-26px cards, offset tiles, full-width tab and CTA bars | Soft white cards, thumbnails list, dark floating CTA |
| Motion | Slow fades, 600-800ms ease-out, image parallax, gold shimmer on CTA | Springy tile pop, marigold confetti on save, bouncy sheets | Fast 180ms ease-out, shared-element image transitions, skeletons |

Trade-offs: A is the most premium but suits weddings/portraits more than corporate or birthdays. B is the most Indian and warm, with the least "global SaaS" feel. C is the fastest to scan and the cheapest to build, and lets photography carry the brand.

## Rename candidates: Keepsake and Aperta (fallback: Noor Atelier)
Open `keepsake.html` / `aperta.html` (screenshots `keepsake.png`, `aperta.png`). Both use real repo photos (`public/img/p/`) with the focal points from `src/data/seed/images.ts`, INR prices, 16px body text, 48-52px tap targets, labelled tab bar and contact buttons (older-user friendly, light grounds, no region-specific motifs). DECIDED 2026-10-23: name Aperta, dark Noor theme kept (see DESIGN.md).

| | D. Keepsake | E. Aperta |
|---|---|---|
| Tagline | Made to be kept. | Every occasion, wide open. |
| Mood | Warm, tactile, heirloom: paper and linen, photo-album mounts, tilted polaroids with tape | Precise, gallery-like, modern: hairline grid, numbered index, square corners, one signal colour |
| Palette | ivory #F8F2E6, paper #EFE5D0, mount #FFFCF4, ink #2A211A, oxblood #6E1F2B, line #D9CCB2 | paper #F3F4F2, ink #0F1114, graphite #14171B, signal #C93A12, line #D3D7DA |
| Fonts | Newsreader (display, italic accents) + Figtree | Bodoni Moda (display, italic accents) + Hanken Grotesk |
| Mark | Tilted print in an album mount with photo corners and a portrait window (oxblood); wordmark Keep*sake* | Six-blade iris around a hexagonal opening in signal red; wordmark APERTA in tracked caps |
| Motion | Prints settle in (1.1s, 3 degree straighten, 120ms stagger), text fades up 8px, taps press 2px | 800ms fast-out rise, blades rotate open once on load, snappy 120ms press |

How each changes the app (tokens live in `src/styles/tokens.css`, name in `src/lib/brand.ts`):
- Keepsake: switch to a light theme (`color-scheme: light`), re-point `--bg/--surf/--ink/--gold*` to ivory/mount/ink/oxblood, drop the film grain for a faint linen texture, replace arch crops with rectangular mounts (3px radius, warm shadow, slight rotation on featured cards and the profile lead), tab bar becomes a solid mount-coloured pill, WhatsApp primary turns oxblood, fonts swap to Newsreader + Figtree, new mark/icons/PWA colours.
- Aperta: light cool theme, square 4px radii, hairline-bordered 2x2 occasion grid with numbered labels, rectangular 150x150 featured crops, full-bleed profile hero with thirds grid overlay, dark graphite signature block and tab bar, signal vermilion for primary actions and the selected package bar, fonts swap to Bodoni Moda + Hanken Grotesk, new mark/icons/PWA colours.
- Both: keep routes, data, focal-point `Img` logic and motion helpers unchanged; only tokens, fonts, radii, shadows and a few component styles change. Check Bodoni/Newsreader latin-ext coverage for the rupee glyph when bundling via `@fontsource`.
