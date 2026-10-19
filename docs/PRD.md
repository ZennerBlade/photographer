# PRD: Photographer Discovery App (Demo)

Status: LOCKED v1.0, 2026-10-19 | Scope: demo only | Platform: mobile-app-only (375-430px), runs locally on device

## 1. Overview and Problem

**What**: A mobile-first directory where people find and contact photographers for an event or shoot, the way other apps let you find a chef or driver.

**Problem**: Finding a photographer today means scattered Instagram DMs, word of mouth, and generic marketplaces. Clients cannot quickly compare style, price, and location in one place. Photographers' strengths ("what makes my work different") are buried in unstructured portfolios.

**Product idea**: Browse by occasion, see a short list, compare on price/rating/location, open a profile that shows style, work and clear packages, then tap Call / WhatsApp / Email.

**Demo purpose**: Show stakeholders and early testers the full client journey with believable content. The demo must feel like a real product, but nothing is transacted and no backend is required.

**Model**: Directory only. No in-app booking, payments, or chat. "Hire" = contact buttons.

## 2. Personas

**P1. Priya, the Event Planner Client (primary)**
- 28-40, books a photographer for a wedding or birthday, or a corporate event for work.
- Pain: no quick way to compare price and style; doesn't know what a fair package costs.
- Wants: shortlist in minutes, visible prices, proof of similar work, easy way to reach out.
- Device: phone, one-handed, often on the go.

**P2. Arjun, the Portrait/Fashion Client**
- 20-35, wants a shoot for a portfolio, social profile, or brand.
- Cares about style and look more than event experience; browses visually.

**P3. Meera, the Photographer (secondary, not interactive in demo MVP)**
- Independent photographer, 3-10 years experience, gets work via Instagram and referrals.
- Wants: a clean profile that shows her signature style and packages, plus direct enquiries.
- In demo, she is represented by seeded profiles only (see section 3, decision on editor).

## 3. MVP Scope

### 3.1 Decision: photographer profile editor
**Locked: OUT of demo MVP (deferred to Phase 1).** Rationale: the demo's value is the client experience; an editor needs auth, uploads, and persistence, which contradicts "no real backend". Profiles are seeded as static data (JSON/TS module). To keep the photographer story credible, include a non-interactive "Are you a photographer? Join the directory" link on the home or profile screen that opens a simple "Coming soon" sheet (optional, Should-have).

### 3.2 Categories (fixed)
1. Weddings
2. Corporate events
3. Birthdays / parties
4. Portraits / fashion

### 3.3 IN scope
- Home with category browse and featured photographers
- Photographer list (per category or all) with cards
- Filter and sort: category, price range, location, rating
- Photographer profile: hero photo, about, signature style, portfolio gallery by category, packages (price + inclusions), contact CTAs
- Contact CTAs: Call (`tel:`), WhatsApp (`https://wa.me/`), Email (`mailto:`)
- Full-screen image viewer for portfolio photos
- Seed/mock data: about 12-16 photographers across all 4 categories and 4-5 locations
- Loading skeletons, empty states, image-fallback states
- Mobile-only layout (375-430px) using app patterns: bottom tab bar, bottom sheets, safe areas
- Saved/shortlist (heart toggle, persisted in `localStorage`) with a Saved tab
- INR pricing, Indian cities and names; fake contact details with a "Demo data" notice

### 3.4 OUT of scope
- Booking, availability calendars, payments, deposits, invoices
- In-app chat or messaging
- User accounts, login, sign-up (client or photographer)
- Photographer profile editor / dashboard / uploads
- Reviews submission (ratings shown are seeded read-only values)
- Real backend, database, admin panel, real geolocation or maps
- Desktop and tablet layouts, and any phone-frame/"open on mobile" wrapper
- Hosting, deployment, shareable links (runs locally only)
- Push notifications, analytics, SEO, i18n, accessibility audit beyond sensible basics
- Launch, marketing, app store, go-to-market, pricing of the product itself

### 3.5 Data model (seed)
- **Photographer**: id, name, tagline, heroImage, city/area, categories[], rating (0-5), reviewCount, startingPrice, about, signatureStyle (short title + 2-3 bullets or a paragraph), contact {phone, whatsapp, email}, yearsExperience (optional)
- **PortfolioImage**: id, photographerId, category, src, alt
- **Package**: id, photographerId, name, category, price, duration, deliverables[] (what is included)
- Currency and unit formatting centralised (INR; see section 9, Locked decisions).

## 4. Screens, User Stories, Acceptance Criteria

Priority key: MUST = needed for demo; SHOULD = enhances demo; NICE = only if time.

### 4.1 Home / Browse by Category (MUST)
**Story**: As a client, I want to start from the occasion I need so that I see relevant photographers fast.

Acceptance criteria:
- Given I open the app, then I see a header, a short value line, and four category tiles (Weddings, Corporate events, Birthdays/parties, Portraits/fashion) with imagery.
- When I tap a tile, then I land on the Photographer List pre-filtered to that category.
- Then I see a "Top rated" or "Featured" horizontal strip of at least 4 photographers; tapping a card opens the profile.
- A "View all photographers" action opens the unfiltered list.
- Layout fits 375px width with no horizontal page scroll (the featured strip may scroll horizontally).

### 4.2 Photographer List (MUST)
**Story**: As a client, I want a scannable list with price, rating, and location so that I can compare quickly.

Acceptance criteria:
- Each card shows: photo, name, primary category chips, city/area, rating with review count, "from {price}".
- Given a category is selected, then only photographers who serve that category are listed, and the active category is shown in the header or a chip.
- A results count is shown (e.g., "9 photographers").
- Tapping a card opens that photographer's profile; back returns to the list with scroll position and filters intact.
- Given no results, then an empty state explains and offers "Clear filters".
- Cards have tap targets of at least 44px height and images do not cause layout shift (reserved aspect ratio).

### 4.3 Filter and Sort (MUST)
**Story**: As a client, I want to narrow by price, location and rating, and sort results so that I find a fit for my budget and city.

Acceptance criteria:
- A "Filters" button and a "Sort" control are visible at the top of the list, with a badge showing the number of active filters.
- Filter sheet (bottom sheet) offers: category (single or multi select), price range (min-max slider or preset bands, applied against starting price), location (select from seeded cities), minimum rating (e.g., Any, 4.0+, 4.5+).
- Sort options: Recommended (default), Rating high to low, Price low to high, Price high to low.
- Given I change filters and tap "Apply", then the list updates and count reflects it; "Reset" clears all.
- Filters combine with AND logic; sort applies after filtering.
- Filter state persists while navigating list <-> profile in the same session.
- Filtering response is instant (client-side, under 100 ms on seed data).

### 4.4 Photographer Profile: Hero and About (MUST)
**Story**: As a client, I want to see who the photographer is at a glance so that I can judge trust and fit.

Acceptance criteria:
- Top of screen shows a full-width hero photo, back button, name, tagline, city, rating and review count.
- An "About" section shows a short bio (3-6 lines) with "Read more" if longer than the collapsed height.
- Hero image has a graceful fallback if it fails to load.

### 4.5 Photographer Profile: Signature Style (MUST)
**Story**: As a client, I want to understand what defines this photographer's style so that I can pick someone whose look matches my taste.

Acceptance criteria:
- A distinct "Signature style" section appears after About, with a one-line style label (e.g., "Candid, golden-hour storytelling") and 2-3 short traits or a short paragraph.
- Optionally shows 1-3 style tags (e.g., Candid, Cinematic, Editorial).
- Every seeded photographer has unique, non-generic signature style copy.

### 4.6 Photographer Profile: Portfolio Gallery by Category (MUST)
**Story**: As a client, I want to see work in the category I care about so that I can see relevant examples.

Acceptance criteria:
- Gallery has category tabs or chips limited to the categories this photographer serves, plus "All".
- Images display in a 2-column grid with consistent spacing; selecting a category filters the grid.
- Tapping an image opens a full-screen viewer with swipe between images, close button, and counter (e.g., 3/12).
- Each photographer has at least 8 images across their categories in seed data.
- Images are lazy-loaded and show a placeholder until loaded.

### 4.7 Photographer Profile: Packages (MUST)
**Story**: As a client, I want clear packages with prices and inclusions so that I know what I would pay and get.

Acceptance criteria:
- Packages shown as cards (2-4 per photographer): name, price, duration, and an inclusions checklist (e.g., hours of coverage, edited photos count, delivery time, second shooter, album).
- If the photographer has packages for multiple categories, packages are labelled or grouped by category.
- One package may be flagged "Most popular" (seed-driven).
- A note states that prices are indicative and final terms are agreed directly with the photographer.
- Tapping a package scrolls to or highlights the contact bar; it does not start a booking.

### 4.8 Contact CTAs (MUST)
**Story**: As a client, I want to reach the photographer in one tap using my preferred channel so that I can enquire or hire.

Acceptance criteria:
- A sticky bottom bar on the profile shows primary "WhatsApp" plus "Call" and "Email" actions, reachable at any scroll position.
- Call opens `tel:`; WhatsApp opens `https://wa.me/<number>?text=<prefilled message>`; Email opens `mailto:` with prefilled subject and body that mention the photographer's name and, if chosen, the package.
- Prefilled messages are editable in the target app and contain no personal data from the app.
- In the demo, seeded contact details are clearly fake/safe (e.g., reserved test numbers and `example.com` emails) and a small "Demo data" notice is visible somewhere in the app.
- Sticky bar does not cover content (page has bottom padding) and respects safe-area insets.

### 4.9 Shortlist / Saved (MUST, locked in scope)
**Story**: As a client, I want to save photographers so that I can compare later.
- Heart icon on cards and profile toggles saved state, persisted in `localStorage`; the Saved tab in the bottom tab bar lists them, with an empty state.

### 4.10 Photographer teaser (SHOULD)
**Story**: As a photographer visiting the demo, I want to see where I would join so that I understand the supply side.
- A "Are you a photographer? Join the directory" link opens a simple "Coming soon" sheet with an email field that does nothing but show a thank-you (no data stored) or just static copy.

### 4.11 Navigation and global states (MUST)
- Single-column mobile app shell with a header and back navigation, and a bottom tab bar (Home, Photographers, Saved) respecting safe areas.
- Deep-linkable routes (`/`, `/photographers`, `/photographers/:id`, via hash router) so a profile can be opened directly during a demo.
- Browser back button works as expected.
- A 404/not-found fallback returns to Home.

## 5. Demo Success Criteria

The demo is convincing when:
1. **Complete journey in under 60 seconds**: Home -> pick category -> filter by price/city -> open profile -> tap WhatsApp, with no dead ends.
2. **Content feels real**: 12-16 photographers with high-quality images (best-looking real photography; see section 9 decision 3 and the release blocker), distinct names, cities, bios, signature styles and credible package prices.
3. **Every category is well stocked**: at least 3 photographers per category, and at least 2 photographers serve more than one category (to show gallery tabs).
4. **Filters visibly work**: every filter and sort changes the results; no combination crashes, and empty states are handled.
5. **Looks native on a phone**: renders cleanly at 375, 390 and 430px widths; no horizontal scroll, no overlapping elements, tap targets of 44px or more.
6. **Fast**: first screen interactive in under 2s on a typical laptop dev build; images lazy-loaded; no layout jumps.
7. **Contact CTAs open the right app**: tested on at least one iOS and one Android device (or emulator); links are well-formed.
8. **Zero console errors** on the primary flow.
9. **Stakeholder walk-through test**: 3 people unfamiliar with it can find a wedding photographer under a given budget in their city without help.

## 6. Technical Considerations (light, for engineering handoff)

- **Framework (locked direction)**: lightweight, not React. Svelte 5 + TypeScript on Vite, Bun as package manager/runtime, svelte-spa-router or a simple hash router. Motion via Svelte built-in transitions + `motion`; headless primitives (bits-ui / shadcn-svelte style) as needed. Vite+ considered, can swap later. Final stack confirmed in the tech-stack phase.
- **Data**: static `seed` module exporting photographers, portfolio images and packages; thin data-access layer (`getPhotographers(filters)`) so a real API can replace it later.
- **State**: URL search params for filters/sort (shareable, survives refresh) or a small store; no server state library needed.
- **Mobile-only**: treat as a mobile app rendered on the web. No laptop/desktop layout and no phone frame; design for 375-430px with app patterns (bottom tab bar, sheets, safe areas).
- **Images**: use consistent aspect ratios, `loading="lazy"`, width/height attributes; real photography (free stock such as Unsplash/Pexels first; other web images acceptable for the private on-device demo; AI-generated only as last resort). RELEASE BLOCKER: all images must be replaced with licensed/owned ones before any public release.
- **Hosting**: none. Runs locally (dev server / local preview), opened on a phone over LAN. No deploy, no shareable link; private repo.
- **Risks**: image quality; filter state with deep links; sticky bar vs. browser chrome/safe areas; image licensing before any public release (blocker).

## 7. Phased Roadmap (post-demo, directional only)

| Phase | Theme | Highlights |
|-------|-------|------------|
| 0 | Demo (this PRD) | Client browse, filter, profile, contact CTAs, seeded data |
| 1 | Supply side | Auth, photographer profile editor, image upload, real backend, availability toggle |
| 2 | Trust | Verified reviews and ratings, verified badge, rating breakdown, reporting |
| 3 | Enquiry flow | In-app enquiry/quote request form (still no payment), enquiry inbox, notifications |
| 4 | Booking | Calendar availability, booking requests, confirmations, reminders |
| 5 | Payments | Deposits, escrow/payout, invoices, cancellation policy |
| 6 | Growth | Maps and distance search, saved shortlists with accounts, recommendations, more categories (e.g., product, real estate, maternity), native apps |

No dates or launch planning are included by design: the project is demo-only.

## 8. Competitive Landscape (from general knowledge, UNVERIFIED)

Not researched live; confirm before relying on any claim.

| Player | Type | Notes (unverified) |
|--------|------|--------------------|
| Instagram / Facebook | Social | Where most photographers actually get leads; no structured pricing or filtering |
| Shaadi/WedMeGood-style wedding portals (India) | Vertical marketplace | Wedding-focused vendor listings with packages and enquiry; limited non-wedding categories |
| Thumbtack / Bark | Generic services marketplace | Lead-gen across many services; photography is a small slice; quote-based, little visual-first browsing |
| Snappr / Shootsta-style on-demand platforms | Booking marketplace | Standardised, priced bookings; less emphasis on individual style |
| Photographer-run websites | Self-hosted | Beautiful but isolated; no comparison |

**Differentiation for this product**: occasion-first browsing across four categories; a dedicated "signature style" section so clients choose by taste, not just price; transparent packages with inclusions; one-tap direct contact with zero platform friction. Trade-off: no booking protection or reviews in the demo.

## 9. Locked decisions (2026-10-19)

1. **Framework**: lightweight, not React. Svelte 5 + TypeScript on Vite, Bun, svelte-spa-router or hash router; Svelte transitions + `motion`; bits-ui/shadcn-svelte style headless primitives. Vite+ considered, swappable. Final stack confirmed in tech-stack phase.
2. **Region**: India, INR, Indian cities, Indian names.
3. **Images**: best-looking real photography (free stock e.g. Unsplash/Pexels; other web images acceptable for the private on-device demo). AI-generated only as last resort. **RELEASE BLOCKER**: replace all images before any public release.
4. **Mobile-app-only**: a mobile app rendered on the web. No desktop layout, no phone frame; 375-430px; bottom tab bar, sheets, safe areas.
5. **Photographer profile editor**: OUT of demo (Phase 1); profiles are seed data.
6. **Shortlist/Saved**: IN scope, persisted in `localStorage`, with a Saved tab.
7. **Filters/sort**: IN scope; price filter on starting price.
8. **Contact details**: fake numbers/emails with a "Demo data" notice.
9. **Name/branding**: design agent proposes several directions; user picks (pending).
10. **Hosting**: none. Local only (dev server / local preview, phone over LAN). No deploy, no shareable link. Private repo.
