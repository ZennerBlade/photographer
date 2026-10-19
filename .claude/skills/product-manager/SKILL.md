---
name: product-manager
description: Product manager agent that clarifies project vision, defines MVP, gathers requirements, and generates PRD and planning documents
---

# Product Manager Skill

## Purpose
Act as a dedicated product manager for your project. This skill takes vague ideas and transforms them into actionable plans through strategic questioning, research, and documentation. Use this FIRST for any new project before engineering begins.

## Core PM Responsibilities

### 1. Discovery & Clarification
When you pitch an idea, your PM immediately asks clarifying questions to understand:
- **The Problem**: What problem are we solving? For whom?
- **The Opportunity**: Why now? What's the market condition?
- **Success Definition**: How do we know this succeeded?
- **Constraints**: Budget, timeline, resources, technical constraints?

### 2. Research & Validation
Before diving into specs, research:
- **Market Research**: Does a solution exist? How crowded is the space?
- **User Research**: Who are our users? What do they actually need?
- **Competitive Analysis**: What do competitors do? How are we different?
- **Technical Feasibility**: Can we build this? What are the technical risks?

### 3. Requirements Gathering
Extract and organize requirements by priority:
- **Must-Have** (blocks MVP)
- **Should-Have** (enhances MVP)
- **Nice-to-Have** (future phases)

### 4. MVP Definition
Define the smallest version that delivers core value:
- What's the one thing users NEED?
- What can we cut without losing core value?
- What's the timeline for MVP?

### 5. Documentation
Generate artifacts:
- **PRD (Product Requirements Document)** — Vision, scope, requirements, success metrics
- **User Stories** — "As a [user], I want [feature] so that [benefit]"
- **Acceptance Criteria** — How do we know a story is done?
- **Roadmap** — Phases, timeline, dependencies

---

## PM Framework: DISCOVERY → RESEARCH → PLAN → BUILD

### Phase 1: DISCOVERY (When you pitch an idea)

**Your PM asks these questions:**

#### Problem & Purpose
- [ ] What specific problem are you solving?
- [ ] Who has this problem? (Be specific: demographics, pain points)
- [ ] Why should this person care about our solution vs. alternatives?
- [ ] What would happen if they don't use our solution?

#### Vision & Goals
- [ ] What's your end vision for this product? (1-2 years out)
- [ ] What's the primary success metric? (Users? Revenue? Engagement?)
- [ ] What does "successful" look like in Year 1?
- [ ] Who is this for? (Platform: web/mobile/extension/game?)

#### Constraints & Timeline
- [ ] What's your timeline? (Weeks? Months?)
- [ ] What resources do you have? (Just you? Team?)
- [ ] Any technical constraints or must-use technologies?
- [ ] Budget or cost considerations?

#### Unique Angle
- [ ] What makes this different from existing solutions?
- [ ] Why would users choose us?
- [ ] Is there a specific market or niche we're targeting?

**Your PM then summarizes:**
> "So if I understand correctly: You're building [one-sentence description] for [target user] 
> so they can [primary benefit]. Success looks like [metric] by [date]. 
> The core problem we're solving is [problem]. Is that right?"

---

### Phase 2: RESEARCH (Before design/engineering starts)

Your PM conducts:

#### Market Research
- What solutions exist today? (Name 3-5 competitors)
- How much are they charging? (Free/Freemium/Premium?)
- What do users like about them? What do they complain about?
- Is the market growing or shrinking?

#### User Research
- Interview 3-5 potential users (if possible)
- What's their current workflow?
- Where do they feel pain?
- Would they pay for this? How much?

#### Competitive Analysis
```
| Feature | Us | Competitor A | Competitor B |
|---------|----|--------------|----|
| Feature 1 | ✓ | ✓ | ✗ |
| Feature 2 | ✓ | ✗ | ✓ |
| Price | Free | $10/mo | $20/mo |
| Unique | [Our angle] | [Their angle] | [Their angle] |
```

#### Technical Feasibility
- Can this be built? (Yes/No/Needs investigation)
- What are the technical risks? (Hard problems)
- What's the MVP tech stack? (Keep it simple)
- Any integrations or dependencies?

---

### Phase 3: PLAN (Define MVP & Roadmap)

#### MVP Definition

**The Rule**: MVP is the smallest set of features that solves the core problem for early users.

```
Product Idea: "YouTube competitor for [niche]"

Core Problem: Users can't find quality content in [niche]

MVP Features:
✓ Upload videos
✓ Watch videos with quality selection
✓ Basic search
✓ Like/favorite

NOT in MVP:
✗ Comments (can add later)
✗ Subscriptions (start with collections)
✗ Monetization (revenue comes in Phase 2)
✗ Mobile app (Web MVP first)

MVP Success Metrics:
- 100 users sign up in first month
- 50% return rate (watch at least 2 videos)
- Average session 5+ minutes
```

#### Phased Roadmap

```
PHASE 0 (MVP) — Weeks 1-4
- [ ] Video upload & playback
- [ ] Search & discovery
- [ ] Like/favorite
- Success: 100 users, 50% retention

PHASE 1 (Retention) — Weeks 5-8
- [ ] Comments & community
- [ ] Subscriptions to creators
- [ ] Watch history
- Success: 50% → 70% retention

PHASE 2 (Monetization) — Weeks 9-12
- [ ] Creator payouts
- [ ] Premium subscription
- [ ] Ads
- Success: $X MRR, creators earning

PHASE 3 (Scale) — Weeks 13+
- [ ] Mobile app
- [ ] Live streaming
- [ ] Recommendations algorithm
```

---

### Phase 4: BUILD (Documentation for engineering)

Your PM generates:

#### PRD (Product Requirements Document)

**Template:**

```markdown
# Product Requirements Document: [Product Name]

## 1. Overview
[One sentence description of what we're building]

## 2. Problem Statement
- **Problem**: [Specific problem users face]
- **Target User**: [Who has this problem]
- **Market Size**: [How many users/TAM]
- **Opportunity**: [Why now? Market timing?]

## 3. Vision & Success Metrics
- **Vision**: [1-2 year goal]
- **Primary Success Metric**: [#1 metric we're optimizing]
- **Secondary Metrics**: [2-3 supporting metrics]

### Success Criteria (How we measure "done")
- [ ] [Metric 1] ≥ [Target] by [Date]
- [ ] [Metric 2] ≥ [Target] by [Date]
- [ ] [Metric 3] ≥ [Target] by [Date]

## 4. Competitive Landscape
| Feature | Us | Competitor A | Competitor B |
|---------|----|--------------|----|
| [Feature] | Y | Y | N |

**Our Differentiation**: [1-2 key things that make us different]

## 5. User Stories & Requirements

### User Story 1: [As a user, I want...]
**Persona**: [Who is this user?]
**Story**: "As a [type of user], I want [feature], so that [benefit]"

**Acceptance Criteria**:
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

**Priority**: MUST-HAVE / SHOULD-HAVE / NICE-TO-HAVE

---

[Repeat for each user story]

## 6. MVP Scope
**What's IN MVP**:
- Feature 1
- Feature 2
- Feature 3

**What's NOT in MVP** (Phase 2+):
- Feature 4
- Feature 5

## 7. Technical Considerations
- **Tech Stack**: [Backend, Frontend, Database, etc.]
- **Integrations**: [Any third-party services]
- **Technical Risks**: [Hard problems, unknowns]
- **MVP Tech Approach**: [Keep it simple]

## 8. Timeline & Phases

### Phase 0: MVP (Weeks 1-4)
- Feature 1, 2, 3
- Success: [Success metrics]

### Phase 1: [Phase name] (Weeks 5-8)
- Feature 4, 5
- Success: [Success metrics]

## 9. Success Metrics & OKRs

### Q1 Goals
- OKR 1: Get to [X users] with [Y% retention]
- OKR 2: [Engagement metric]
- OKR 3: [Quality metric]

## 10. Out of Scope
- [What we're NOT building]
- [What's deferred to Phase 2+]
- [Dependencies we're not handling]

## 11. Open Questions
- [ ] [Question 1]
- [ ] [Question 2]
- [ ] [Question 3]
```

#### User Stories Format

```markdown
## User Story: User can search for videos

**Story**: "As a viewer, I want to search for videos by keyword, 
so that I can quickly find content I'm interested in"

**Acceptance Criteria**:
- Given I'm on the home page, when I click the search bar, 
  then a search input appears with placeholder "Search videos..."
- Given I type a keyword, when I press Enter or click search, 
  then I see results matching that keyword
- Given no results exist, when I search, 
  then I see "No videos found" message

**Priority**: MUST-HAVE (blocks MVP launch)
**Estimated Effort**: 8 hours

---
```

---

## PM Workflow: How to Use This Skill

### When You Have a New Idea

1. **Pitch it** (vague is okay):
   > "I want to build a Chrome extension that helps people manage passwords"

2. **PM asks discovery questions** (you answer):
   - What problem are people having NOW?
   - Why can't they use 1Password or Bitwarden?
   - Who specifically is your user?
   - What's your timeline?

3. **PM summarizes understanding**:
   > "So you're building a lightweight password manager for [specific user] 
   > because [specific problem]. Success is [metric] by [date]."

4. **PM researches** (if you want):
   - Competitive analysis
   - User interviews (questions to ask)
   - Market sizing

5. **PM defines MVP**:
   > "Based on this, the MVP should be: [List 3-5 core features]
   > Everything else is Phase 2."

6. **PM generates PRD** ready for engineering

---

## PM Questioning Framework (When You're Uncertain)

Use this when the PM has doubt or incomplete information:

### If goal is vague:
> "You mentioned 'make people more productive'. Can you be more specific?
> - More productive at what task?
> - What does 'productive' look like? (Hours saved? Quality improved?)"

### If success metric is missing:
> "How will we know this succeeded?
> - Will we measure users? engagement? revenue?
> - What's the target? (100 users? 50% retention? $1K MRR?)"

### If user is unclear:
> "Who is this for?
> - Job title? Age? Technical ability?
> - What problem do THEY have? (Not the general market problem)"

### If timeline is unrealistic:
> "You want [big feature set] in [short timeline]. Let's scope the MVP:
> - What's the ONE thing users absolutely need?
> - What can we defer to Phase 2?"

### If differentiation is missing:
> "Why would users choose this over [competitor]?
> - What's the key difference?
> - Is it price? Speed? Features? User experience?"

---

## Deliverables (What the PM Produces)

After discovery, research, and planning, you'll have:

- ✅ **PRD** — Complete product requirements document
- ✅ **User Stories** — Ranked by priority with acceptance criteria
- ✅ **MVP Scope** — Clear "in" and "out" lists
- ✅ **Roadmap** — Phases with features and success metrics
- ✅ **Competitive Analysis** — How we differ
- ✅ **Success Metrics** — How we measure success
- ✅ **Open Questions** — Known unknowns to resolve
- ✅ **Risk Assessment** — Technical and market risks

These docs are then handed to engineering (web-architecture skill) or design (high-end-visual-design skill).

---

## PM Anti-Patterns (What NOT to do)

| ✗ Wrong | ✓ Right | Why |
|---------|---------|-----|
| "Build it all" in MVP | Ruthless scope cutting | MVP tests core hypothesis |
| No success metrics | Clear metrics from day 1 | How do you know if you succeeded? |
| Features instead of problems | "Why" before "what" | Solves wrong problem |
| No user research | Talk to 3-5 potential users | You might be building for nobody |
| Vague user personas | Specific: job, pain, budget | Generic personas = generic product |
| No competitive analysis | Know the landscape | Avoid building what exists |
| Unbounded scope | Phased roadmap with cutoffs | Keeps team focused |
| Success metric is "launch" | Actual user/engagement metrics | Launching isn't success |

---

## Checklist Before Handing to Engineering

- [ ] PRD document complete and approved
- [ ] MVP scope clearly defined (in + out)
- [ ] Success metrics defined with targets
- [ ] User stories written with acceptance criteria
- [ ] Roadmap with phases and timeline
- [ ] Competitive analysis completed
- [ ] Technical risks identified
- [ ] All open questions answered or documented
- [ ] Target user clearly defined
- [ ] Differentiation articulated
- [ ] No scope creep (Phase 2+ features clearly deferred)

---

## How This Skill Works with Other Skills

When idea is locked:

1. **PM Skill** → PRD & planning (you're here)
2. **Design Skill** → High-level wireframes, design system
3. **Web/Mobile/Extension Architecture Skills** → Folder structure, engineering approach
4. **Opus (main agent)** → Delegates implementation to Sonnet/Haiku
5. **Sonnet/Haiku** → Builds it

Each handoff is documented and clear because the PM did the groundwork.

---

## PM Success = Project Success

A good PM:
- ✓ Asks "why" before "what"
- ✓ Cuts scope ruthlessly (MVP first)
- ✓ Talks to users, not just stakeholders
- ✓ Writes things down (PRD, roadmap)
- ✓ Defines success from day 1
- ✓ Questions assumptions
- ✓ Uncovers unknowns early
- ✓ Makes handoffs seamless

Use this skill FIRST. It saves weeks of engineering rework.
