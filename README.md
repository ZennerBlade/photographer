# Noor Atelier (photographer discovery demo)

A mobile-first web app where clients in India find and contact photographers by occasion (weddings, corporate, birthdays, portraits). Demo only: seeded data, no backend, no auth. Svelte 5 + TypeScript + Vite, Bun, hash routing, local images.

```bash
export PATH=$PATH:/root/.bun/bin   # if bun is not on PATH
bun install
bun run dev -- --host              # open the Network URL on your phone
bun run build && bun run preview -- --host
bun run check                      # svelte-check
bun run test                       # Playwright smoke (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers)
```

On screens 600px and wider the app renders inside a CSS phone frame. All names, prices and contacts are fictional; photos are stock images (see `public/img/CREDITS.md`, release blocker). Start with `docs/HANDBOOK.md`; design tokens are in `docs/DESIGN.md`; screenshots in `docs/screenshots/`.
