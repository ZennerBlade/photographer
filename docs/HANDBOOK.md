# Handbook

## Product
Mobile-app-style directory (web, local-only) where clients in India find and contact photographers by occasion: Weddings, Corporate events, Birthdays/parties, Portraits/fashion. Browse, filter/sort, view profile (style, portfolio, packages), save, then Call/WhatsApp/Email. Demo only, no backend.

## Status
PRD locked (v1.0). Stack locked. Direction A (Noor Atelier) approved. Working prototype built (all MVP screens, 16 photographers, local images). Next: user review on a real phone, then polish.

## Repo map
- `docs/PRD.md` - locked PRD (source of truth); `docs/TECH_STACK.md` - locked stack
- `docs/DESIGN.md` - tokens and design rules (Direction A); `docs/design/directions/` - approved mockups
- `docs/screenshots/` - 390x844 screenshots of every screen + 1440px frame shot (regenerate with `bun run shots`)
- `src/main.ts`, `src/App.svelte` - entry, router, app shell (phone frame wrapper)
- `src/routes/` - Home, List, Profile, Saved, NotFound
- `src/components/` - Img (focal-point crops), Sheet, FilterSheet, SortSheet, Viewer, TabBar, cards, HeartButton, Icon
- `src/data/` - `types.ts`, `api.ts` (only data entry point for UI), `seed/` (photographers, packages, portfolio, categories, generated `images.ts`)
- `src/lib/` - format (INR), contact (tel/wa.me/mailto), filters (URL query), focus (smart crop), saved (localStorage), motion
- `src/styles/` - `tokens.css`, `base.css`
- `public/img/p/` - trimmed demo set of WebP photos (4 per portfolio, plus `lead-<slug>.webp` portraits of each studio lead); `public/img/CREDITS.md` - source URLs
- `e2e/smoke.spec.ts` + `playwright.config.ts` - Playwright smoke; `scripts/screenshots.mjs` - screenshot capture
- `CLAUDE.md` - agent entry point

## Locked decisions (2026-10-19)
1. Svelte 5 + TS on Vite, Bun, hash/svelte-spa-router, `motion`, headless primitives (confirm in tech-stack phase)
2. India, INR, Indian cities/names
3. Real photography (free stock first); AI images last resort
4. Mobile-app-only, 375-430px, no desktop layout; CSS phone frame on wide screens
5. Photographer editor out (Phase 1)
6. Saved/shortlist in scope (localStorage, Saved tab)
7. Filters/sort in scope; price filter on starting price
8. Fake contact details + "Demo data" notice
9. Branding: design agent proposes directions, user picks
10. No hosting; local only, private repo

## Runbook (verified 2026-10-19)
Bun is at `/root/.bun/bin/bun` (add to PATH: `export PATH=$PATH:/root/.bun/bin`).
- Install: `bun install`
- Dev, reachable from a phone on the same Wi-Fi: `bun run dev -- --host` then open `http://<laptop-lan-ip>:5173` (Vite prints the Network URL).
- Typecheck: `bun run check` (svelte-check, must report 0 errors)
- Build: `bun run build` (output in `dist/`, not committed)
- Preview production build on LAN: `bun run build && bun run preview -- --host --port 4173`
- Smoke test: `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers bun run test` (builds, starts preview on :4173, runs 5 tests at 390x844 plus 375/430 overflow checks). Never run `playwright install`; `@playwright/test` is pinned to 1.56.1 to match the preinstalled chromium-1194.
- Screenshots: with preview running on :4173, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers bun run shots` (writes `docs/screenshots/`).
- Deep links (hash router): `#/`, `#/photographers?cat=weddings&city=Jaipur&price=60-120&rating=4&sort=rating&q=text`, `#/photographers/aarav-mehta`, `#/saved`.

### Stack resolutions
- svelte-spa-router 5.1.1 works with Svelte 5 (no fallback router needed). Its v5 API is `router.location` / `router.querystring` (not the old `location` store).
- TypeScript pinned to 5.9 (svelte-check 4.7 is clean with it; TS 7 not needed).
- Fonts are bundled with `@fontsource` (offline); latin-ext subset is required for the rupee glyph.

### Image pipeline (one-off, already run)
Photos came from Pexels (public search API, 2,300 candidates reviewed as contact sheets), resized to <=1100x1400 WebP q74. Faces were detected with YuNet (OpenCV) to produce `focus` and `box` per image in `src/data/seed/images.ts`; a few were corrected by hand. To swap a photo: drop a WebP into `public/img/p/`, add an entry to `images.ts` with `w`, `h`, `focus` (and `box` if it has faces), reference its id from `portfolioSpec.ts` / `photographers.ts`, then check the crop in a screenshot. Attribution is in `public/img/CREDITS.md`.

## Gotchas
- RELEASE BLOCKER: demo images may be non-licensed web images; replace all before any public release.
- No deploy or shareable link by design.

- Contact bar uses WhatsApp as the gold primary (PRD wording); Direction A mockup had Call primary.
- Seed phone numbers are `+91 99999 000nn` (fake, not guaranteed unassigned); emails use `example.com`.
- Dev server adds a 220ms fake latency to data calls to exercise skeletons; production build has none.

## Pending
- Real-device check (iOS Safari + Android Chrome) of safe areas and `tel:`/`wa.me`/`mailto:` handoff
- Replace all stock images before any public release (see CREDITS.md)
