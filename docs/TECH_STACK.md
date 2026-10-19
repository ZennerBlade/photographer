# Tech Stack: Photographer Discovery App (Demo)

Status: LOCKED v1.0, 2026-10-19 | Source: docs/PRD.md (locked) | Decisions pre-made, no open questions.
Versions verified against the npm registry on 2026-10-19; pin exact versions at scaffold time.

## 1. Constraints (from PRD)
- Demo only. No backend, no auth, no hosting, no deploy. Runs locally, opened on a phone over LAN.
- Mobile-only app on the web (375-430px). Wide screens get a cosmetic phone frame.
- Solo, keep it simple. Zero console errors; first screen interactive < 2s.

## 2. Locked choices

| Area | Choice | Version (verified) | Why |
|------|--------|--------------------|-----|
| Framework | Svelte 5 + TypeScript | svelte 5.57.x | Small, fast, runes for state |
| Build | Vite (plain) + @sveltejs/vite-plugin-svelte | vite 8.3.x, plugin 7.3.x | Standard, fast HMR, `--host` for LAN |
| Package manager/runtime | Bun | 1.4.2 at /root/.bun/bin/bun | Installed; `bun install`, `bun run` |
| Router | svelte-spa-router (hash) | 5.1.x | See 3 |
| Motion | Svelte built-in transitions + `motion` | motion 14.3.x | Sheets, viewer swipe, springs |
| Headless UI | Hand-rolled; bits-ui only if needed | bits-ui 2.19.x (optional) | See 4 |
| Styling | Plain CSS + custom-property tokens | n/a | See 5 |
| Data | Typed TS seed modules + data-access layer | n/a | See 6 |
| State | Svelte runes; localStorage; URL query | n/a | See 7 |
| Images | Local files in /public | n/a | See 8 |
| Type check | svelte-check + TypeScript | svelte-check 4.7.x, typescript 7.0.x | Light safety net |
| E2E smoke | Playwright (Chromium only) | see 11 | Preinstalled browser |

## 3. Routing: svelte-spa-router (hash mode)
Chosen over a custom hash router. Reasons: PRD already names it; gives `:id` params, `querystring`, `push/pop/replace`, a catch-all `*` route for the 404 -> Home fallback, and back-button behaviour with no code to maintain. A custom router would be ~40 lines but re-implements the same edge cases (query parsing, not-found, scroll restore) for no gain.
- Routes: `/` Home, `/photographers` List, `/photographers/:id` Profile, `/saved` Saved, `*` NotFound.
- Tab bar highlights from the active location. Hash mode means no server rewrite config, works from `vite preview` and any static file server.
- Scroll restore on list <-> profile back is done by the list screen (store scrollTop in a module variable keyed by route).
- Risk: if svelte-spa-router lags Svelte 5 compatibility at scaffold time, fall back to a ~40-line custom hash router behind the same route table. Verify at scaffold.

## 4. Headless UI: hand-rolled first
Needed primitives: bottom sheet (filters, sort, "Coming soon"), full-screen image viewer, collapsible "Read more", chips/tabs. All are simple with `<dialog>` or a fixed-position div + Svelte `fly`/`fade` transitions. Hand-roll `Sheet.svelte` and `Viewer.svelte` (focus trap via `<dialog>`, Escape/backdrop close). Add bits-ui only if the price-range slider or accessible select proves costly (use preset price bands first, which the PRD allows). No shadcn-svelte, no Tailwind-coupled kits.

## 5. Styling: plain CSS with custom-property tokens
Chosen over Tailwind v4 for simplicity: no plugin or config, Svelte's scoped `<style>` already gives component scoping, and a small app with ~15 components needs few utilities.
- `src/styles/tokens.css`: colour, spacing, radius, type scale, shadow, z-index, motion durations/easings as `--vars`. `src/styles/base.css`: reset, body, safe-area helpers.
- Safe areas: `env(safe-area-inset-*)` on tab bar, sticky contact bar; `viewport-fit=cover` meta.
- Units: rem/px with a 44px min tap target token (`--tap: 44px`). Use `100dvh`, never `100vh`.
- Brand/colour values come from the design agent (branding pending); tokens make them a one-file change.

## 6. Data: typed seed modules behind a data-access layer
- `src/data/types.ts`: `Photographer`, `PortfolioImage`, `Package`, `Category` (union of 4 ids), `City`, `Filters`, `SortKey` per PRD 3.5.
- `src/data/seed/{photographers,portfolio,packages}.ts`: typed arrays (12-16 photographers). Contacts fake (`example.com`, reserved test numbers).
- `src/data/api.ts`: the only module UI imports for data. Async-shaped to allow a real API later: `getPhotographers(filters, sort)`, `getPhotographer(id)`, `getPortfolio(id, category?)`, `getPackages(id)`, `getFeatured()`, `getCities()`. Returns Promises (with a small artificial delay in dev only, to exercise skeletons).
- `src/lib/format.ts`: central `formatINR`, rating, duration. `src/lib/contact.ts`: builds `tel:`, `wa.me`, `mailto:` URLs with prefilled text.

## 7. State
- Svelte 5 runes (`$state`, `$derived`) in `.svelte.ts` modules; no store library, no server-state library.
- Filters/sort: URL query on the list route (`#/photographers?cat=weddings&city=Pune&min=4&price=...&sort=rating`). Parsed into a `Filters` object, serialised back on Apply. Survives refresh and back navigation; shareable deep links.
- Saved: `saved.svelte.ts` holds an id set, mirrored to `localStorage` key `pd:saved:v1`. All storage access wrapped in try/catch; app works if blocked.
- Ephemeral UI state (sheet open, viewer index) stays local to components.

## 8. Images: local files in /public
Recommend local, downloaded files over remote URLs: the demo runs on a phone over LAN and must work offline and not break on hotlink or CDN changes; also deterministic for the 60-second walkthrough.
- Source: Unsplash/Pexels first (PRD). Download once via a script into `public/img/{hero,portfolio,category}/`, resized to max 1600px wide, WebP/JPEG ~80%, plus a ~600px thumb variant for grids.
- `public/img/CREDITS.md` records source URL and photographer per image (supports the release-blocker replacement audit).
- Every `<img>` gets `width`/`height` or CSS `aspect-ratio`, `loading="lazy"`, `decoding="async"`, an `onerror` fallback (neutral gradient placeholder), and a blur/solid placeholder until load.
- Release blocker (PRD): all images replaced with licensed/owned ones before any public release. Keep `public/img` private repo only.

## 9. Phone frame on wide screens (CSS only)
At `@media (min-width: 600px)`: body centres `.device` at 390x844 (max-height 100dvh), rounded corners, shadow, `overflow: hidden`, `transform: translateZ(0)` so `position: fixed` children (tab bar, sheets, contact bar) are contained by the frame. Below 600px the frame is removed and the app is full-bleed. No JS. Sheets/viewer must mount inside `.device`, not on `document.body`.

## 10. Run commands (local LAN, no deploy)
- Install: `/root/.bun/bin/bun install`
- Dev on LAN: `bun run dev -- --host` (script `"dev": "vite"`; reaches `http://<lan-ip>:5173` from phone). Optional `server.host: true` in `vite.config.ts`.
- Preview of production build: `bun run build && bun run preview -- --host`.
- Typecheck: `bun run check` (script: `svelte-check --tsconfig ./tsconfig.json`).
- Vite+ swap path: Vite+ is a drop-in toolchain wrapper over Vite; keep `vite.config.ts` and package scripts conventional (no custom plugins beyond the Svelte plugin) so swapping to Vite+ later is a config/CLI change, not a rewrite.

## 11. Testing (light)
- `svelte-check` must be clean (errors = 0) before any handoff.
- Playwright smoke, one spec, Chromium only, viewport 390x844, base URL from `vite preview`: Home loads -> tap Weddings -> list shows count -> apply a price filter -> open profile -> contact bar has well-formed `wa.me`, `tel:`, `mailto:` hrefs -> heart saves and survives reload. Asserts no horizontal scroll (`scrollWidth <= clientWidth`) and zero `console.error`.
- Browser: preinstalled at `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (chromium-1194, matches Playwright ~1.56). Pin `@playwright/test` to the version whose bundled Chromium revision is 1194 (1.56.x); do NOT run `playwright install`. Latest registry version is 1.64.1 and would expect a newer browser build.
- No unit-test framework in the demo; `api.ts` filter logic is covered by the smoke spec.

## 12. Out of stack (by PRD)
Backend, DB, auth, state libraries, UI kits, Tailwind, CI/CD, hosting, analytics, i18n, SSR/SvelteKit (plain Vite SPA is enough).

## 13. Risks
- svelte-spa-router Svelte 5 compatibility (mitigation: custom router fallback, section 3).
- typescript 7.0.x vs svelte-check 4.7.x compatibility: if svelte-check errors, pin typescript to the latest 5.x/6.x.
- Sticky bar vs mobile browser chrome: use `dvh` and safe-area insets; test on a real iOS and Android device.
- Playwright/Chromium version mismatch (section 11).
