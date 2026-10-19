# Handbook

## Product
Mobile-app-style directory (web, local-only) where clients in India find and contact photographers by occasion: Weddings, Corporate events, Birthdays/parties, Portraits/fashion. Browse, filter/sort, view profile (style, portfolio, packages), save, then Call/WhatsApp/Email. Demo only, no backend.

## Status
Phase 1 PRD locked (v1.0, 2026-10-19). Next: tech-stack phase (confirm stack).

## Repo map
- `docs/PRD.md` - locked PRD (source of truth)
- `docs/HANDBOOK.md` - this file
- `src/`, `index.html`, `package.json` - bare Vite scaffold (to be replaced/scaffolded)
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

## Runbook
TBD after scaffold.

## Gotchas
- RELEASE BLOCKER: demo images may be non-licensed web images; replace all before any public release.
- No deploy or shareable link by design.

## Pending
- Tech-stack confirmation
- Name/branding selection
- Scaffold and runbook
