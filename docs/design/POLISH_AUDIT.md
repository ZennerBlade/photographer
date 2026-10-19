# Polish audit (mobile, 390x844)

Method: built app, `bun run shots`, every screen reviewed (home, list, filter sheet, profile top/about/portfolio/packages, viewer, saved, empty, 404). Direction A identity (espresso, gold, Cormorant + Manrope) is kept; this is refinement, not redesign.

## Ranked issues (before) and status
| # | Issue | Where | Status |
|---|---|---|---|
| 1 | Corporate and Portraits occasion tiles near-black (brightness .78 + heavy scrim, dark source photos); tiles looked broken next to Weddings | Home | Fixed: brighter covers (stage with lit screen, teal/yellow portrait), exposure lifted, scrim now a bottom gradient only, tiles 96 to 112px |
| 2 | Floating tab bar was 55% transparent, list cards and text showed through it (ghosted "Weddings" chip, card text) | All tabbed screens | Fixed: 82% glass + bottom fade (`.bar-fade`) so content dissolves under the bar |
| 3 | Spacing off-grid (22/10/14/18/26/6 px mixed); sections and cards had uneven rhythm | Everywhere | Fixed: 4/8 scale tokens (`--s-*`) applied to sections, cards, chips, sheets, profile; sections 32px apart, cards 16px apart |
| 4 | Micro-type too small (9.5/10/11px chips, tags, eyebrows) and weak contrast on mute grey | Chips, tags, meta, tab labels | Fixed: min 11px for chips/meta, 12px meta, eyebrow 11px/500, `--mute` lifted to #b0a695 |
| 5 | No tap feedback beyond buttons (cards, tiles, pills, tab items, chips did nothing on press) | All | Fixed: `.press` / `.press-sm` compress on `:active` (90ms in, 260ms expo out), tab icon spring, chips/pills/tiles/CTA |
| 6 | Cards flat; weak hierarchy (name, area, price equal weight); profile header cramped, hero text over busy photo | Cards, Profile | Fixed: gradient surface + tinted warm shadow (no black drop shadow), larger names, price weight, divider above meta, stronger hero shade, bigger tagline |
| 7 | Skeletons crude (single block; profile loading was a full-screen slab; image slots popped in) | Home, List, Profile, Img | Fixed: shaped skeletons (title/meta lines under featured arches, profile header lines), image slots shimmer until loaded |
| 8 | Sheets plain: flat panel, cubicOut slide, weak backdrop | Filter, Sort, Join | Fixed: expo-out slide, 6px backdrop blur, gradient panel with top highlight and lift shadow, tactile close |
| 9 | Category quick-tabs hard-clipped at the right edge ("Portra") | List | Fixed: edge mask fade, snap |
| 10 | Brand name hard-coded in 4 places | Home, contact msg, index.html | Fixed: `src/lib/brand.ts` is the single source (also feeds manifest, title, apple title) |
| 11 | Not installable, no offline | PWA | Fixed, see below |
| 12 | Search inputs: no focus state beyond border colour | Home, List | Fixed: gold border + soft 4px halo |

## Still open (lower priority)
- Icons are hand-drawn 1.3px line glyphs (consistent, light); a Phosphor Light set would be sharper but adds a dependency. Heart/home stroke thickens to 1.6 when active.
- Header text on the home page has no image; an editorial hero photo would add presence (needs image rights).
- Featured cards clip a third card by design (affordance); a pager dot row could help.
- Page-to-page transitions are fade+rise only; View Transitions API shared-element from card to profile hero would be the next step.
- Viewer has no pinch-zoom.

## PWA
`manifest.webmanifest` (name, short name, standalone, portrait, `#0d0b09` theme/background, icons 192, 512, maskable 512) is emitted by a small Vite plugin from `src/lib/brand.ts`. `public/sw.js` is hand-rolled (no dependency): precaches the app shell (build-stamped version), warms all 84 photos into `img-v1` (cache-first, survives deploys), navigations fall back to the cached `index.html`. iOS: apple-touch-icon 180, `apple-mobile-web-app-*` meta, black-translucent status bar. Registered only in production builds; `base: './'` is kept. Verified in Chromium: SW active, 21 shell + 84 image entries cached, reload with network offline renders the home page with images.

## Desktop / tablet proposal (do not build until the business model is locked)
- Breakpoints: mobile < 640 (current), tablet 640-1023, desktop >= 1024, wide >= 1440 (content capped at 1280, centred).
- Retire the phone-frame wrapper at >= 640; keep it only as a marketing screenshot mode.
- Nav: the floating tab pill becomes a slim top bar at >= 1024 (logo left, Photographers / Saved, search centre, Join CTA right, max 72px tall, not edge-glued: inset pill like the mobile bar). Tablet keeps the bottom pill.
- Home: 12-col grid. Hero split (headline + search left 5 cols, arched portrait collage right 7). Occasions as 4 equal tiles in one row. Featured as a 4-up arch row, no horizontal scroll.
- List: filters move from the sheet to a persistent left rail (280px: category, city, price, rating, sort) at >= 1024; results as a 2-col card grid at 1024-1279, 3-col at >= 1280. Tablet: 2-col grid, filters stay in the sheet.
- Profile: two columns at >= 1024: sticky left column (hero, name, meta, contact actions, chosen package), right column scrolling (about, style, portfolio masonry 3-col, packages). The bottom contact bar becomes a sticky card in the left column.
- Viewer: full-window lightbox with arrow keys and thumbnails; sheets become centred 480px modals.
- Mechanics: reuse the same components; add container-aware tokens (`--gutter` 24 to 40 to 64), a `.shell` max-width wrapper, and CSS Grid with `minmax(0,1fr)`; hover states gated by `@media (hover: hover)`.
- Add after business model decision: whether photographers get an account area (changes top nav) and whether enquiries become on-platform (changes the contact card).

## Before / after notes
Screens regenerated in `docs/screenshots/`. Before: Corporate/Portraits tiles nearly black, tab bar ghosting, uneven gaps, tiny chips. After: all four occasion tiles bright and legible with a bottom scrim, cards with clear name/location/price hierarchy, consistent 4/8 rhythm, solid glass tab bar with content fade, filter sheet with weighted depth, shaped skeletons, press feedback on every tappable.
