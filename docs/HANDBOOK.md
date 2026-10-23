# Handbook

## Product
Mobile-app-style directory (web, local-only) where clients in India find and contact photographers by occasion: Weddings, Corporate events, Birthdays/parties, Portraits/fashion. Browse, filter/sort, view profile (style, portfolio, packages), save, then Call/WhatsApp/Email. Demo only, no backend.

## Status
PRD locked (v1.0). Stack locked. Direction A dark theme approved; product renamed Aperta (2026-10-23). Working prototype built (all MVP screens, 16 photographers, local images). Next: user review on a real phone, then polish.

## Repo map
- `docs/PRD.md` - locked PRD (source of truth); `docs/TECH_STACK.md` - locked stack
- `docs/DESIGN.md` - tokens and design rules (Direction A); `docs/design/directions/` - approved mockups
- `docs/screenshots/` - 390x844 screenshots of every screen + 1440px frame shot (regenerate with `bun run shots`)
- `src/main.ts`, `src/App.svelte` - entry, router, app shell (phone frame wrapper)
- `src/routes/` - Home, List, Profile, Saved, NotFound, Join (onboarding hub), Onboarding (wizard + done screen)
- `src/components/` - Img (focal-point crops), Sheet, FilterSheet, SortSheet, Viewer, TabBar, cards, HeartButton, Icon
- `src/data/` - `types.ts`, `api.ts` (only data entry point for UI), `seed/` (photographers, packages, portfolio, categories, generated `images.ts`)
- `src/lib/` - format (INR), contact (tel/wa.me/mailto), filters (URL query), focus (smart crop), saved (localStorage), motion
- `src/styles/` - `tokens.css`, `base.css`; `src/lib/brand.ts` (brand name, one-line rename); `public/sw.js` + `public/icons/` (PWA)
- `public/img/p/` - curated Pexels demo set (4 per portfolio, plus `lead-<slug>.webp` portraits of each studio lead); `public/img/CREDITS.md` - source URLs
- `e2e/smoke.spec.ts`, `e2e/onboarding.spec.ts` (+ `e2e/fixtures/*.jpg`) + `playwright.config.ts` - Playwright; `scripts/screenshots.mjs` and `scripts/onboarding-shots.mjs` - screenshot capture
- `CLAUDE.md` - agent entry point

## Photographer onboarding (added 2026-10-23, demo only, no backend)
Entry: Home "List your studio" -> JoinSheet -> "Join as a photographer" -> `#/join`. Audience is photographers aged 25-65, so: >=16px text (17-18px in forms), >=48px tap targets, one screen per topic, progress bar, Back always shown, plain-words validation shown on Continue, autosaved drafts.
- Routes: `#/join` (hub: start / continue draft / view, edit, delete my profile), `#/join/1` .. `#/join/8`, `#/join/done?id=<profileId>`. Tab bar is hidden on these.
- Steps: 1 name, studio (optional, default "<name> Photography"), city (5 seed cities + Other), neighbourhood (optional), years. 2 categories + signature style title + up to 3 tags. 3 lead portrait (camera or gallery, tip card, drag-the-ring focal point with live card/hero previews). 4 portfolio, 4 photos (min 3), each tagged by category. 5 bio (40-600 letters, counter, example placeholder). 6 packages (1-3: name, INR price, hours, edited photos, album yes/no, preview within 24/48/72 h, full gallery within 7-45 days; delivery times become package deliverables, cf. the SLA idea in BUSINESS_MODEL.md). 7 phone, WhatsApp (pre-filled from phone until edited), email. 8 review: renders the real `Profile.svelte` against an unsaved preview (id `preview-draft`), then Publish.
- Done screen: share link (`<origin><path>#/photographers/<id>`), Copy link (clipboard API with execCommand fallback), Share (Web Share where available).
- Storage: IndexedDB database `photographer-demo`, stores `drafts` (key `current`) and `profiles` (key = profile id). Images are Blobs, downscaled client-side to max 1200px WebP (JPEG fallback) by `src/lib/image.ts`. `src/lib/idb.ts` wraps every call in try/catch and falls back to an in-memory map, so blocked storage never breaks the app (data then lasts only until reload). Drafts autosave (350 ms debounce) from `src/lib/draft.svelte.ts`.
- Data path: `src/data/userProfiles.ts` (types, validation, Draft -> Photographer/Package/PortfolioImage, persistence). `api.ts` merges stored profiles with the seed (`ready` promise awaited in `main.ts`; `refreshUserProfiles()` after publish/delete; `imageMeta()` also resolves user images via object URLs). So lists, filters, search, featured sorting and `Profile` work unchanged. New fields on `Photographer`: `mine`, `isNew` (30 days). New profiles have no rating: cards/profile show a "New" badge (`NewBadge.svelte`) instead of stars, and lead the "Recommended" sort until they have reviews.
- Edit/Delete: the hub copies a published profile into the draft (Edit my profile) and Publish overwrites the same id; "Delete my demo profile" asks to confirm, then removes it and its images.
- Not a real listing: profiles live only in the browser that created them, so share links work on that device only.
- Screenshots: `docs/screenshots/onboarding-*.png` (regenerate with preview on :4173 and `node scripts/onboarding-shots.mjs`).

## Locked decisions (2026-10-19)
1. Svelte 5 + TS on Vite, Bun, hash/svelte-spa-router, `motion`, headless primitives (confirm in tech-stack phase)
2. India, INR, Indian cities/names
3. Real photography (free stock first); AI images last resort
4. Mobile-app-only, 375-430px, no desktop layout; CSS phone frame on wide screens
5. Photographer editor out (Phase 1). Amended 2026-10-23: a local-only onboarding/edit/delete flow is in the demo (see above)
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

## Locked decisions (2026-10-23)
1. Name: **Aperta**, tagline "Every occasion, wide open." Keep dark espresso + gold theme (Cormorant + Manrope). Six-blade aperture mark in gold (`Logo.svelte`, PWA icons regenerated).
2. Arch / rounded-doorway photographer image shape removed everywhere.
3. Featured and list cards use the Keepsake mounted-print pattern in dark colours (see DESIGN.md).
4. Long names wrap to 2 balanced lines on cards and profile; profile keeps Noor layout (name below portrait) and about section.
5. Portraits occasion tile crop shifted to keep the forehead (`ty` 0.3).

## Gotchas
- RELEASE BLOCKER: demo images may be non-licensed web images; replace all before any public release.
- No deploy or shareable link by design.

- Contact bar uses WhatsApp as the gold primary (PRD wording); Direction A mockup had Call primary.
- Seed phone numbers are `+91 99999 000nn` (fake, not guaranteed unassigned); emails use `example.com`.
- Dev server adds a 220ms fake latency to data calls to exercise skeletons; production build has none.

## Pending
- Real-device check (iOS Safari + Android Chrome) of safe areas and `tel:`/`wa.me`/`mailto:` handoff
- Replace all stock images before any public release (see CREDITS.md)
