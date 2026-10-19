---
name: tech-stack-planning
description: Technical architecture discussion agent that collaborates with you on tech stack decisions, deployment constraints, and function design before coding starts
---

# Tech Stack Planning Skill

## Purpose
Before the architecture skill defines folder structure and code patterns, this skill facilitates **collaborative discussion** on technical decisions. As a software engineer, you contribute expertise; this agent asks clarifying questions, proposes options, and locks in constraints.

**When to use**: After PRD is locked, before architecture & coding phases.

**Output**: Tech Stack Document that feeds into architecture skill.

---

## Your Role in This Discussion

You're a **technical co-creator**, not just a PM. This agent:
- ✅ Proposes options
- ✅ Asks why (your reasoning matters)
- ✅ Respects your constraints (Vercel, not AWS)
- ✅ Discusses tradeoffs
- ✅ Documents decisions with your input

**Not**: Blindly choosing AWS, overengineering, or ignoring your preferences.

---

## Discussion Framework

### 1. Deployment & Infrastructure (LOCKED FIRST)

**Agent asks you:**
- Where are you deploying? (Vercel, Netlify, self-hosted, AWS, GCP, etc.)
- Why that choice? (Cost, control, simplicity?)
- Any geographic/latency constraints?
- Serverless vs. traditional server preference?
- Database hosting? (Managed service or self-hosted?)

**Your answer determines everything downstream.** Example:
```
YOU: "Vercel for frontend, PostgreSQL on Railway"

AGENT: "Got it. This means:
- Frontend: Next.js or static React (Vercel-native)
- Backend: API routes or separate service?
- Database: Railway PostgreSQL (managed, no ops overhead)
- Scaling: Vercel auto-scales frontend, Railway handles DB
- Cost: Pay-as-you-go, no servers to manage

Sound right?"
```

### 2. Backend Architecture

**Agent asks:**
- API-first or monolithic backend?
- If API-first:
  - REST or GraphQL?
  - API framework? (Express, Fastify, Hono, etc.)
  - Run where? (Vercel functions, Docker, separate VPS?)
- If monolithic:
  - Monolith framework? (Rails, Django, Laravel, Next.js fullstack?)
  - Where does it run?
- Authentication: Built-in or third-party? (Auth0, Clerk, NextAuth, etc.)

**Your reasoning shapes this.** Example:
```
YOU: "I want to keep it simple. Just Next.js API routes + PostgreSQL. 
      No separate backend."

AGENT: "Understood. This means:
- Single codebase (frontend + API)
- Database: Direct from API routes
- Authentication: NextAuth or built-in JWT
- Scaling: Vercel handles both
- Trade-off: Less decoupled, but simpler operations

Acceptable?"
```

### 3. Frontend Stack (if not covered by backend choice)

**Agent asks:**
- Framework? (React, Vue, Svelte, etc.)
- Build tool? (Vite, Webpack, Next.js, etc.)
- Styling? (Tailwind, CSS Modules, styled-components, etc.)
- State management? (Context, Redux, Zustand, Jotai, etc.)
- Forms library? (React Hook Form, Formik, etc.)
- Data fetching? (SWR, React Query, Apollo, fetch with custom hooks?)

**Example decision chain:**
```
YOU: "React + Tailwind. State: just React Context for now. 
      Data fetching: SWR."

AGENT: "Got it:
- React with hooks
- Tailwind CSS (aligns with your design-taste-frontend skill)
- React Context for global state (auth, theme)
- SWR for data fetching + caching
- No Redux (keeping it lightweight)

This works well with Next.js API routes. Good?"
```

### 4. Database Design (Schema Direction)

**Agent asks:**
- Database type: SQL (PostgreSQL) or NoSQL (MongoDB)?
- Key entities? (Users, Products, Orders, etc. from PRD)
- Relationships: Complex (many-to-many) or simple (mostly hierarchical)?
- Scaling: Will this table grow to 1M+ rows?
- Real-time needs? (Subscriptions, live updates?)

**Example:**
```
YOU: "PostgreSQL. Users, Products, Orders, Reviews. 
      Reviews might hit 1M rows. No real-time needed."

AGENT: "Schema direction:
- Users (auth, profile)
- Products (inventory, metadata)
- Orders (transactional, indexed by user_id + date)
- Reviews (denormalize product_rating for performance)

Indexes: user_id, product_id, created_at on Orders/Reviews

Real-time: Polling is fine, no WebSocket needed.

Sound good?"
```

### 5. API Design (Contracts)

**Agent asks:**
- REST or GraphQL?
- Key endpoints? (from user stories in PRD)
- Authentication: Session cookie, JWT, OAuth?
- Rate limiting needs?
- Error handling approach?

**Example (REST):**
```
Key Endpoints:
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/products
GET    /api/products/:id
POST   /api/orders
GET    /api/orders/:id
POST   /api/reviews

Auth: JWT in Authorization header
Errors: Standard { error: "message", code: "ERROR_CODE" }
Rate limit: 100 req/min per IP

Acceptable?"
```

### 6. Performance & Caching

**Agent asks:**
- Caching strategy? (CDN, browser, server?)
- Database query optimization? (How do you avoid N+1 queries?)
- Image/asset optimization?
- Bundle size targets?
- Core Web Vitals targets? (LCP, FID, CLS)

**Example:**
```
YOU: "Cache product list for 5 min (SWR). 
      Images: Next.js Image optimization. 
      LCP target: <2.5s"

AGENT: "Got it:
- SWR cache: 5 min, stale-while-revalidate pattern
- Images: Next.js Image + Cloudinary for optimization
- Bundle: Keep React deps minimal, use code-splitting
- LCP: Optimize above-fold images, preload critical fonts

Approach sound?"
```

### 7. Testing Strategy

**Agent asks:**
- Unit tests? (Jest, Vitest)
- Integration tests? (API + database)
- E2E tests? (Playwright, Cypress)
- Coverage target? (80%+)
- Testing priority? (critical paths first, then full coverage)

**Example:**
```
YOU: "Jest for units. Playwright for E2E. 
      Focus on critical paths first (auth, checkout)."

AGENT: "Testing plan:
- Unit: Jest (components, utils, hooks)
- Integration: Jest + database fixtures (API routes)
- E2E: Playwright (user journeys: signup → checkout → order)
- Priority Phase: Auth & Orders first (100% coverage)
- Phase 2: Full app (80%+ target)

Work?"
```

### 8. Deployment & CI/CD

**Agent asks:**
- CI/CD tool? (GitHub Actions, GitLab CI, etc.)
- Deployment trigger? (On push to main? Manual?)
- Environment strategy? (Dev, staging, production?)
- Secrets management? (Environment variables, encrypted secrets?)
- Rollback strategy? (How to revert a bad deploy?)

**Example (Vercel + GitHub):**
```
YOU: "GitHub push to main → auto-deploy to production. 
      Staging environment for testing first."

AGENT: "Vercel deployment:
- Main branch → production (auto-deploy)
- Develop branch → staging preview (auto-preview)
- Secrets: Vercel env vars (encrypted)
- Rollback: Revert commit, re-push
- Monitoring: Vercel analytics + Sentry for errors

Good?"
```

### 9. Known Constraints & Trade-offs

**Agent asks:**
- Any hard requirements? (Vercel only, PostgreSQL only, etc.)
- Budget constraints? (Keep costs under $X/month?)
- Performance must-haves? (Sub-200ms API response?)
- Team size considerations? (Just you? Easy to understand.)

**Your constraints are LOCKED IN.** Example:
```
YOU: "Keep costs under $20/month. No AWS. Vercel only."

AGENT: "CONSTRAINTS LOCKED:
- Deployment: Vercel (free tier + pay-as-you-go)
- Database: PostgreSQL on Railway ($5/month starter tier)
- No AWS services (RDS, Lambda, etc.)
- Auth0 if needed (free tier covers MVP)
- Target cost: $15/month for MVP

We'll optimize around these constraints."
```

---

## Tech Stack Document (Output)

After discussion, agent compiles:

```markdown
# Tech Stack Document

## Project: [Name]
## Date: [Date]
## Locked By: [You]

### Deployment & Infrastructure
- **Hosting**: Vercel (frontend + API routes)
- **Database**: PostgreSQL on Railway
- **File Storage**: [Cloudinary / local]
- **Authentication**: [NextAuth / Auth0 / built-in]
- **Monitoring**: [Vercel analytics / Sentry]
- **Cost Target**: $20/month

### Backend
- **Framework**: Next.js (API routes)
- **Runtime**: Node.js
- **API Type**: REST
- **Database Client**: Prisma ORM
- **Caching**: Redis (if needed) or in-memory

### Frontend
- **Framework**: React (via Next.js)
- **Build Tool**: Next.js built-in
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Data Fetching**: SWR
- **Forms**: React Hook Form

### Database
- **Type**: PostgreSQL
- **Hosted On**: Railway
- **Key Tables**: Users, Products, Orders, Reviews
- **Scaling Strategy**: [Indexes on high-volume tables]

### API Design
- **Protocol**: REST
- **Authentication**: JWT (Authorization header)
- **Rate Limiting**: 100 req/min per IP
- **Error Format**: { error: "message", code: "ERROR_CODE" }

### Performance Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **API Response Time**: < 200ms p99

### Testing Strategy
- **Unit Tests**: Jest (components, utils, hooks)
- **Integration**: Jest + database fixtures
- **E2E**: Playwright (critical user journeys)
- **Coverage Phase 0**: Auth & Orders (100%)
- **Coverage Phase 2**: Full app (80%+)

### CI/CD & Deployment
- **CI Tool**: GitHub Actions
- **Main Branch**: Auto-deploy to production (Vercel)
- **Develop Branch**: Auto-preview (Vercel)
- **Environment Variables**: Vercel encrypted secrets
- **Rollback**: Git revert + re-push

### Known Constraints
- ✅ Deployment: Vercel only, no AWS
- ✅ Cost: Keep under $20/month
- ✅ Team: Solo (keep it simple, not enterprise)
- ✅ Performance: LCP < 2.5s

### Trade-offs Made
- Chose Next.js fullstack over separate backend → Simplicity wins
- PostgreSQL over MongoDB → Relational data, ACID compliance
- SWR over React Query → Lighter bundle, sufficient for MVP
- Context over Redux → No boilerplate, sufficient for MVP scale

### Next Steps
1. Architecture skill defines folder structure based on this stack
2. Database: Prisma schema matches this design
3. API: Implement routes per this spec
4. Frontend: Component patterns per web-architecture skill
5. Testing: Implement per this strategy

---
Approved by: [You]
Date: [Date]
```

---

## When CEO Fires This Skill

```
"Use tech-stack-planning skill.

Context:
- PRD is locked
- We're building a [web app / mobile / extension]
- You'll discuss tech decisions with the user

Let the user make the final call on:
1. Deployment environment (Vercel, AWS, etc.)
2. Database choice
3. Framework choice
4. Performance targets
5. Budget constraints

Ask clarifying questions. Document everything.
Output: Tech Stack Document ready for architecture skill."
```

---

## How This Feeds Into Architecture Skill

Once tech stack is locked, architecture skill uses it:

```
TECH STACK DOCUMENT says:
- Next.js + React
- PostgreSQL + Prisma
- SWR for data fetching
- Tailwind CSS
- Jest + Playwright

ARCHITECTURE SKILL then says:
- Folder structure for Next.js (app router)
- Prisma schema structure
- Component patterns for this stack
- Hook patterns for data fetching with SWR
- Testing setup (Jest + Playwright config)
```

No surprises. No "we're using AWS" when you wanted Vercel.

---

## Your Collaboration Style

This skill **respects your expertise**:
- ✅ You propose, agent validates
- ✅ Agent proposes, you decide
- ✅ You override defaults (agent accepts)
- ✅ Clear reasoning for every choice
- ✅ Document constraints upfront

**Example collaboration:**
```
AGENT: "For caching, I'd suggest Redis for performance."

YOU: "Nope, keep it simple. SWR client-side caching + database queries only."

AGENT: "Understood. SWR caching locked. Simpler infrastructure, 
        sufficient for MVP scale. Documented."
```

Simple. Collaborative. No blind choices.

---

## Checklist Before Handing to Architecture Skill

- [ ] Deployment environment locked (Vercel, not AWS)
- [ ] Database type & hosting decided
- [ ] Backend approach decided (API-first vs. monolithic)
- [ ] Frontend framework & key libraries locked
- [ ] API design (REST vs. GraphQL) decided
- [ ] Authentication approach chosen
- [ ] Database schema direction clear
- [ ] Performance targets set
- [ ] Testing strategy defined
- [ ] CI/CD approach locked
- [ ] All constraints documented
- [ ] All trade-offs documented
- [ ] Tech Stack Document generated
- [ ] You approved the final document

Once all checked: Hand to architecture skill with confidence.
