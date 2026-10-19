# Business Model: Indian Photographer Marketplace

Status: DRAFT v1, 2026-10-19 | Authors: market-research + sales-agent | Not committed.
Evidence legend: **[V]** = seen in a fetched/searched source (URL given); **[U]** = unverified, from memory or logic. Rates change; re-check before relying on any number. Trademarks/domains not checked.

Founder facts used: father's network = supply is not the bottleneck. Real problems: (1) client acquisition, (2) disintermediation (meet on platform, deal on WhatsApp).

## 0. Bottom line

Charge BOTH sides, but keep it light: ~10% photographer commission (8% for Pro subscribers), ~3% client convenience fee, all collected through an escrowed, milestone-based booking. Leakage is beaten by making the platform the safest and most useful place to transact (payment protection, replacement-photographer guarantee, contracts, gallery delivery), NOT by trying to police WhatsApp. Start with a free, contact-visible directory for discovery; the first booking is always "managed".

## 1. Comparison of platforms

| Platform | Who pays | Rates / model | Leakage defence | Quality enforcement |
|---|---|---|---|---|
| Urban Company | Pro pays commission; customer pays some convenience fee | Commission slabs 8.5% (small) to 30% (large), cut to 25% cap on beauty; averages ~20-22% post-change [V: [UC blog](https://www.urbancompany.com/blog/urban-company-announces-12-point-program-to-improve-partner-earnings-and-livelihood), [FPJ](https://www.freepressjournal.in/business/urban-company-cuts-commission-to-25-from-30-after-workers-protest)]; ~25% FY24 avg (unaudited) [V: [Entrackr](https://entrackr.com/2024/07/urban-company-claims-rs-827-cr-revenue-in-fy24-70-cut-in-losses)]; fees+commission 28.3% of pro gross earnings 9M FY26 [V: [Inc42](https://inc42.com/?p=571319)] | Platform assigns the pro, masked calling, payment in-app, ratings, job-flow and lead supply the pro cannot get elsewhere [U] | Ratings, training, kits, penalties/deactivation for cancellations and low ratings [U] |
| WedMeGood / WeddingWire India / ShaadiSaga | Vendor | Paid listing/subscription + lead packs; current prices not found [V that exact prices were not published; WedMeGood claims 150k+ vendors, 2M monthly users]; model described as subscription + commission [U, aggregator only] | Weak: contact is the product, so leakage is by design; they sell visibility not transactions | Reviews and "verified" badges only; no delivery guarantee [U] |
| Thumbtack | Pro pays per lead/contact | Pay per lead, price varies by category/location; also pay for "instant book" results [U] | Fee is paid up front so leakage after lead does not hurt revenue | Ratings, reviews, background check, guarantee programmes [U] |
| Bark | Pro pays credits per lead | Credits per lead [U] | Same as Thumbtack | Reviews only [U] |
| Upwork | Freelancer (and client fee) | Freelancer fee reported 0-15% per contract since May 2025 (older: 20/10/5% sliding) [V, conflicting: [jobbers.io](https://www.jobbers.io/?p=53038)] | Escrow + fixed-price milestones; ToS bans off-platform payment; fee-free "conversion" buyout [U] | Dispute process, JSS ratings, Top Rated tiers [U] |
| Fiverr | Both | Seller 20% flat; buyer ~5.5% plus small fixed fee on small orders [V: [jobbers.io](https://www.jobbers.io/?p=53038)] | Payment held until delivery accepted; chat filters hide contacts [U] | Level system, delivery-time metrics, order cancellations hurt ranking [U] |
| Airbnb | Both | Host ~3% (split-fee) and guest ~14% typical [U] | Payment released only after check-in; host guarantee, AirCover, reviews tied to completed booking; contact hidden pre-booking [U] | Superhost metrics, cancellation penalties [U] |
| Swiggy / Zomato | Restaurant commission + ads/listing; customer delivery, platform, packaging fees | Commission ~16-30% [U]; customer "platform fee" a few rupees [U] | Delivery, tracking and support are the product; restaurant cannot replicate [U] | Ratings, delivery-time SLAs, delisting [U] |
| Practo / Justdial / Sulekha | Provider (subscription/ads/leads); patient mostly free | Subscription tiers, paid prominence, lead sales [U] | Little: the lead is the product | Verification, reviews [U] |
| Snappr (photo) | Photographer commission; client pays price | ~20-35% commission per 2019 reporting, current rate unknown [V: [Inside Imaging](https://insideimaging.com.au/2019/life-as-a-snappr-photographer/), [Sacra](https://sacra.com/research/snappr)] | Platform-set pricing, booking, payment and delivery all in app | Photographer vetting, client rating, guarantee/re-shoot [U]; critics note low pay [V] |
| Shoott | Photographer revenue share | One third-party profile says 60% of net gallery sales + hourly guarantee [V, weak: ContactOut] | Platform-managed shoots | Vetted bench [U] |
| Flytographer | Client pays; photographer paid via Tipalti | Photographer split not found [V: [Flytographer](https://www.flytographer.com/payment-setup-flyt)] | Fixed-price packages, platform-only booking | Curated, vetted, re-shoot promise [U] |

Takeaway: lead-sellers (WedMeGood, Justdial) tolerate leakage because the lead is the product; transaction platforms (Urban Company, Airbnb, Fiverr, Snappr) win by owning payment, protection and delivery. A wedding is a high-ticket, once-in-a-life, trust-heavy purchase, which suits the second family.

## 2. Why leakage happens and what actually works

Why: (a) the commission is visible and large vs the platform's visible value after the match; (b) both sides already have WhatsApp and nothing else is needed to close; (c) photographers know GST/commission cost 10-25% of an Rs 80k job; (d) clients want a discount; (e) trust, once earned, makes the platform feel redundant.

| Defence | Works? | Notes |
|---|---|---|
| Hide phone/WhatsApp until booking is paid | Partly | Cheap, Urban Company-style. But Instagram handles leak identity; photographers are on Instagram anyway. Use it for the first message only; chat in-app until the advance is paid. Do not rely on regex chat-policing. |
| Escrowed advance + milestone release | YES (core) | Client wants it (no vanishing photographer); photographer wants it (committed client, date locked). |
| Platform-only guarantees | YES (core) | Replacement photographer or refund, delivery-SLA credit, raw-file backup. Void if paid off-platform. This is Airbnb's real moat. |
| Contracts, timelines, gallery delivery on-platform | YES | Digital contract, shot list, event-day checklist, gallery with download. Switching cost is real. |
| SaaS value for photographers (invoice, contract, CRM, gallery, GST invoices) | YES | Gives them a reason to run existing clients through us (the Pixieset/HoneyBook playbook [U]). Pays off in repeat/referral. |
| Low take rate | YES | 10% total is near the "not worth the hassle" threshold; 25-30% (UC) needs a strong supply engine we do not have. |
| Penalties and ranking | YES | Rank and badge based on on-platform completion; off-platform reports remove "Guaranteed" status. |
| Detection (chat keyword flags, client surveys, "did you pay off-platform?" audits, mystery bookings) | Support only | Surveys and review-gated incentives are more effective than keyword filters. |
| Contractual no-solicit / fines | Weak | Hard to enforce in India for small amounts. Use as a deterrent clause, not a strategy. |

Design principle: make it irrational to leave. A client who books off-platform loses: protection, replacement guarantee, in-app gallery, verified review, loyalty credit. A photographer loses: ranking, Guaranteed badge, advance escrow, lead flow, SaaS data.

## 3. Options evaluated

Score 1-5 (5 best for us).

| | Revenue | Leakage risk (5 = low) | Photographer acceptance | Build simplicity | Legal/payments simplicity | Total /25 |
|---|---|---|---|---|---|---|
| A. Pure subscription (listing Rs 500-2,000/mo) | 2 | 5 (no booking to leak) | 3 (unproven ROI) | 5 | 5 | 20 |
| B. Pay-per-lead (Rs 100-400/lead) | 3 | 4 (money taken at lead) | 2 (leads feel low quality; lead-fraud disputes) | 4 | 4 | 17 |
| C. Commission via escrow only (10%) | 4 | 2 (if value is thin) | 3 | 2 | 2 | 13 |
| D. Hybrid: escrow commission + client fee + optional Pro subscription + SaaS | 5 | 3-4 (value stack) | 4 | 2 | 2 | 16-17 |

A and B are easy but cap revenue and train the market to treat us as a lead portal (WedMeGood's turf). C and D need payments, but only they build a defensible, high-ticket business. D wins on strategic fit; build in phases so complexity does not block launch (section 4.6).

Which side pays: BOTH (Swiggy logic), but weighted to the photographer commission (the party who earns from the booking), with a small client fee to cover payment cost and fund guarantees. Do not charge listing fees at launch (see GTM plan: free founding listing is what bootstraps the network).

## 4. RECOMMENDED model

### 4.1 Pricing

| Item | Recommendation |
|---|---|
| Photographer commission (managed bookings) | 10% Standard; 8% Pro; 12% for new (first 3 bookings) rising to Standard after 3 five-star deliveries; 5% on repeat clients and photographer-referred clients (loyalty, reduces leakage) |
| Client convenience/protection fee | 3% of package value, min Rs 499, max Rs 2,999, plus GST; waived for photographer-referred clients |
| Photographer subscription (Pro) | Rs 499/month or Rs 4,999/year: client gallery hosting (100 GB), contract + invoice templates, CRM, calendar, 8% commission, priority ranking. Optional, not required |
| Listing | Free forever for basic profile (single-player value) |
| Lead fees | None at launch. Optional later: "Featured" placement Rs 999-2,999/month in a city |
| Security holdback | 10% of photographer payout held until delivery accepted (not a deposit up front, so no friction); release at acceptance or auto at day 7 |
| Refundable security deposit | None for Standard; Rs 5,000 for "Platinum Guaranteed" tier only (needs deposit to carry guarantee) |

Rationale for ~13% combined take: below Urban Company (20-28%) and Fiverr (about 25%), above Airbnb-style 3% host fee because photographers have no inventory risk to us. Revenue target per Rs 80k wedding: about Rs 10-11k before costs (see section 6).

### 4.2 Booking and payment flow (managed booking)

1. Client browses profiles (contact buttons visible but WhatsApp is "chat-with-booking" after first reply; see Phase 1 for a softer launch).
2. Quote and packages are shown in-platform; client pays a 30% advance through the platform (Razorpay Route or equivalent) which creates the contract and locks the date.
3. Milestones (Indian norm is 30-50% advance, balance near event [U]): 30% at booking, 40% due 7 days before event, 30% due at delivery acceptance.
4. Release to photographer: 50% of the advance (15% of package) after a 48-hour cool-off, for travel/second-shooter costs; remaining advance + second payment on event completion (confirmed by both); final 30% minus 10% holdback on delivery acceptance. Commission is netted from the first releases.
5. Delivery acceptance: client has 5 days to accept or raise a dispute; silence = auto-accept.

### 4.3 Cancellation and refund policy (client)

| When | Client refund | Photographer |
|---|---|---|
| Within 48 hours of booking, 30+ days before event | 100% (fee refunded) | Nothing |
| 30+ days before event | Advance minus Rs 2,000 admin + convenience fee non-refundable | Keeps up to 50% of advance if work done |
| 15-29 days | 50% of advance forfeited to photographer | Gets it, minus commission |
| Under 14 days | Full advance forfeited | Gets advance |
| Photographer cancels | 100% refund + we find replacement at same price; if replacement costs more, platform covers up to 20% difference [cap U] | Penalty, see 4.4 |
| Force majeure (government restriction, death in family) | Date transfer free once; else refund minus costs | Keeps documented costs |

### 4.4 SLA and penalty matrix

Defaults shown on every profile: preview gallery in 48 hours; 30-50 edited highlights in 7 days; full gallery in 21 days; album design in 45 days (photographer can set stricter, e.g. "next-day teaser", shown as a badge and used for ranking). These are defaults, not the founder's numbers; calibrate with the dad's network before launch.

| Breach | Grace | Penalty (photographer) | Client remedy |
|---|---|---|---|
| Late preview/teaser | 24 hours | Ranking dock after 2 repeats; no cash | Free reminder + status shown |
| Late full delivery | 3 days | 2% of package per week late from holdback (cap 10%) | Credit of same amount |
| Delivery over 30 days late | None | Holdback forfeited; Delivery Hold on payouts; account review | Partial refund up to 25% or free reshoot of key events if possible |
| No-show / cancellation within 7 days | None | Full advance returned + Rs 5,000 or 10% penalty from payouts; 3-month ranking suspension; repeat = delist | Full refund + replacement (platform guarantee) |
| Late arrival over 60 min | None | 10% holdback | Client claims |
| Quality dispute (blur/missing key moments) | n/a | Mediated: partial refund 10-50% from holdback, remaining set by panel | See 4.5 |
| Raw files lost | None | Escalation to full refund evaluation | Insurance not available in India for this at small scale, so use our own guarantee fund [U] |
| Off-platform payment (detected) | None | Loss of Guaranteed badge and ranking; warning then removal | No platform protection |

Client penalties: no-show or unreasonable rejection without evidence: forfeit of the dispute amount; repeated abuse blocks bookings.

### 4.5 Dispute resolution

1. Day 0-2: client raises dispute with photos or timestamps; automatic freeze on remaining payout.
2. Day 2-5: photographer replies with evidence; the platform suggests a remedy (reshoot, retouch, partial refund).
3. Day 5-10: panel of two senior photographers + staff decides; standard bands 10/25/50%; decision final for the platform's guarantee portion.
4. Appeal once within 7 days; thereafter normal civil/consumer remedies. Record keeping: contract, chat, gallery metadata.
5. Guarantee fund: 1% of GMV from convenience fee to cover replacements.

### 4.6 Phased rollout (dad's network = seed supply)

| Phase | Timing | Launch |
|---|---|---|
| 0 (now-Dec 2026) | Weeks 0-6 | Free directory + profiles (current product). Onboard 40-60 photographers from the dad's network. Manual bookings: founder takes 3-5 real bookings by hand via UPI to a current account, to learn SLA and dispute patterns. Contact info visible. No fees. |
| 1 (Jan-Mar 2027) | Weeks 6-14 | In-app booking request, digital contract/quote, 30% advance through payment gateway (settle to us, pay out manually in T+2). 10% commission only on bookings through "Book with protection". Photographer SLA badge. Client fee waived (launch offer). |
| 2 (Apr-Jun 2027) | Months 4-6 | Milestone escrow with automated splits (Route/Cashfree), delivery gallery, holdback, dispute workflow, client 3% fee, review-gating. Pro subscription beta. |
| 3 (H2 2027) | Months 7-12 | Replacement-photographer guarantee fund, Platinum tier, corporate/events booking, loyalty commission tiers (5% repeat), featured placement. |

Do not launch on day one with fees on everyone: the first 50 photographers must see value before cost.

### 4.7 Payments and legal notes (Indian specifics)

- RBI Payment Aggregator (PA) guidelines (Sept 2025) limit who can offer split/marketplace flows; Razorpay says Route access requires meeting a minimum financial turnover criterion plus payer/payee transparency, with no category exempt, and otherwise points to a two-step flow (settle to merchant, then transfer to vendors, e.g. via RazorpayX) [V: [Razorpay Route docs](https://razorpay.com/docs/payments/route/), [Route FAQs](https://razorpay.com/docs/payments/route/faqs.md); exact thresholds not retrieved, check RBI circular]. Cashfree Easy Split is the alternative [U]. Early-stage fix: use a PA partner's escrow/split product, or settle to our current account and pay out within T+2 after contract disclosure; get legal advice before holding client funds, as holding funds as a marketplace without the PA rails is a regulatory risk.
- GST: platform commission and convenience fee are taxable services at 18% [U]. Photographers above the GST threshold (Rs 20 lakh services, Rs 10 lakh in special-category states [U]) charge GST on their own invoice; we must issue a tax invoice for our commission. Marketplace may have TCS/e-commerce operator obligations on supplies it facilitates (Section 9(5) CGST applies to specified services only, photography generally not [U]; TCS 0.5%/1% under Section 52 can apply to e-commerce operators collecting payments [U]). Needs a CA.
- Income-tax TDS: platform may need TDS under Section 194-O (e-commerce participants) at 0.1% on gross [U]; confirm.
- Typical practice: wedding photographers take 30-50% advance and balance on/after event, plus extras cash/UPI [U]; our 30/40/30 split is closer to the lower advance so clients adopt it.
- Contract: e-sign (Aadhaar eSign/click-wrap), consumer protection compliance, terms clearly state fees.

## 5. Top 5 client acquisition tactics for THIS model

1. Planner and venue partnerships: offer wedding planners 3-5% referral on bookings made through the protected flow (comes out of our commission) and the "Guaranteed photographer" pitch; planners control a large share of vendor choice [U].
2. Photographer-driven demand: every photographer shares their profile link plus "Book with Protection" to their followers; waive the client fee on photographer-referred clients to avoid friction, and drop commission to 5% for their repeat clients. The dad's network seeds city coverage.
3. Guarantee-led SEO and Instagram content: "wedding photographer in Jaipur under Rs 80,000 with delivery guarantee"; pages per city x style x budget bucket; real wedding galleries with delivered-on-time stamps.
4. WhatsApp-first conversion: click-to-WhatsApp ads and a bot that matches 3 photographers in 5 minutes, then "pay Rs 5,000 token to hold the date" (escrowed). Rs 150-400 CAC target on corporate leads [U].
5. Corporate and event buyers: HR/admin and agencies get invoices, GST bills, SLA-backed delivery. Outbound to 100 companies via LinkedIn/referrals; this is where escrow plus compliance invoices genuinely beats a WhatsApp deal.

Supporting: review-gated referral credit (Rs 1,000 off next booking, only through the platform); couples' reviews appear only for verified bookings.

## 6. Unit economics: Rs 80,000 wedding package (illustrative)

Assumptions: client fee 3% (Rs 2,400); photographer Standard 10% (Rs 8,000); GST 18% on our fees; payment gateway ~2% blended including GST-on-fee treated as ITC [U, check current pricing]. Photographer not charged TCS in this example.

| Line | Rs |
|---|---|
| Package price (photographer invoice, GST aside) | 80,000 |
| Client convenience fee (3%) | 2,400 |
| GST on client fee (18%) | 432 |
| **Client pays** | **82,832** |
| Photographer commission (10%) | 8,000 |
| GST on commission (18%, shown on invoice; photographer may claim ITC if registered) | 1,440 |
| **Photographer receives** (80,000 - 8,000 - 1,440) | **70,560** (88.2%) |
| Platform revenue ex-GST (8,000 + 2,400) | 10,400 |
| Gateway cost on 82,832 at 2% (ex-GST) | about 1,657 |
| Guarantee fund contribution (1% GMV) | 800 |
| Support/dispute cost allowance (est.) | 600 |
| **Net contribution** | **about 7,340 (about 9.2% of package)** |
| Pro-photographer variant (8%) | commission 6,400; net about 5,340 |
| Photographer-referred client (client fee waived, 5% repeat) | commission 4,000, net about 1,700 after costs: acceptable only if CAC is zero |

Wedding GMV equals customer acquisition leverage: at 40 bookings a month in one city, GMV is Rs 32 lakh and contribution about Rs 2.9 lakh/month before staff. Fixed team cost is the real hurdle; Pro subscriptions at Rs 499 x 300 photographers add about Rs 1.5 lakh/month. [All U; revise after pilot.]

Leakage sensitivity: if 40% of bookings leak, net contribution roughly falls 40% plus guarantee exposure. Target under 20% via the stack in section 2.

## 7. Risks and open questions

Risks:
1. Payments regulation: holding client funds without PA rails; Route eligibility thresholds may exclude a pre-revenue startup (see 4.7). Mitigation: partner PA/escrow, legal advice early.
2. Leakage still high in weddings (relationship-driven, high ticket, cash culture). Mitigation: value stack, low take, repeat-client discounts, accept some leakage.
3. Photographer revolt at commission: network is founder's father's, so goodwill is high, but friends-and-family may refuse fees. Do not make the dad a special case publicly; give founding photographers a grandfathered 8% for 12 months.
4. Quality enforcement needs ops staff: disputes, penalties and replacements are manual and costly; replacement guarantee requires a bench.
5. Client demand: a directory with fees on top still needs traffic; acquisition cost vs 10% take (Rs 8k) must stay under about Rs 2.5k per booking.
6. Seasonality: Nov-Feb and Apr-Jun peaks [U]; revenue lumpy.
7. Concentration: if the dad's network is 70% of supply, the founder's relationships become a single point of failure and conflict of interest.
8. Legal: GST/TDS/TCS treatment, consumer protection for penalties, enforceability of non-circumvention clauses.

Open questions (assumptions made, no answers asked):
- Is the founder's company entity incorporated, GST-registered, and does it have a current account? (assumed soon)
- What is the real average package and advance share in the dad's network? (assumed Rs 80k, 30-50% advance)
- Photographer GST registration share? (many below threshold)
- Which payment partner will onboard a pre-revenue marketplace? (needs quotes from Razorpay, Cashfree, PayU, Easebuzz)
- Delivery turnaround norms to put in the SLA defaults (next-day teaser realistic only for some).
- Willingness-to-pay test: run a Wizard-of-Oz concierge booking for 10 weddings before building escrow.

## 8. Naming

Noor Atelier rejected. Criteria: short, easy to say/spell in Hindi/English, works for weddings and corporate, .com/.in plausible. Availability and trademarks NOT verified; check IP India registry, domain and Instagram handle before use.

| # | Name | Rationale |
|---|---|---|
| 1 | Clickwala | "Wala" is instantly Indian; reads as the photo person; casual, friendly; works B2B with a tagline. |
| 2 | Framely | Frame + family; easy to spell, global-ready, neutral tone for weddings and corporate. |
| 3 | Shootnow | Plain English, action-oriented, appeals to corporate and quick bookings; risk: generic, may be taken. |
| 4 | Pixelaya | Pixel + "aalay" (home); Indian sound; slightly longer to spell. |
| 5 | Snapwed | Short, clear weddings focus; weak for corporate. |
| 6 | Lenskart-style Lensaa | Lens + "-aa" ending; memorable; but Lenskart is a brand, so risk of confusion. |
| 7 | Kshan | Hindi "moment" (kshan); short, meaningful; some will mis-spell (Kshan/Kshun). |
| 8 | Yaadein | Hindi "memories"; emotional for weddings; harder for corporate. |
| 9 | Bookashoot | Descriptive and simple; works anywhere; the name says the product. |
| 10 | Tasveer | Hindi/Urdu "picture", widely understood; likely a crowded namespace. |

Ranking (top 3):
1. **Framely**: easy to spell and say in any Indian language, neutral for weddings and corporate, short, brandable; best chance at clean .com/.in [U].
2. **Kshan**: meaningful ("moment"), short, ownable; spelling risk managed by Kshan.in redirect and Kshan.com test.
3. **Clickwala**: friendliest and most memorable for Indian users, works for weddings and corporate (tagline "Clickwala: your trusted photographers"), though it feels less premium.

Check before deciding: .com/.in availability, Instagram handle, Google search clutter, IP India class 35/41/42 search.

## Sources
- Urban Company commission: https://www.urbancompany.com/blog/urban-company-announces-12-point-program-to-improve-partner-earnings-and-livelihood ; https://www.freepressjournal.in/business/urban-company-cuts-commission-to-25-from-30-after-workers-protest ; https://entrackr.com/2024/07/urban-company-claims-rs-827-cr-revenue-in-fy24-70-cut-in-losses ; https://inc42.com/?p=571319
- Razorpay Route / RBI PA: https://razorpay.com/docs/payments/route/ ; https://razorpay.com/docs/payments/route/faqs.md
- Fiverr/Upwork fees (secondary): https://www.jobbers.io/?p=53038
- Snappr: https://insideimaging.com.au/2019/life-as-a-snappr-photographer/ ; https://sacra.com/research/snappr
- Flytographer payments: https://www.flytographer.com/payment-setup-flyt
- WedMeGood pricing: not found publicly; verify with vendor sales.
- Not researched live (all [U]): Thumbtack, Bark, Airbnb, Swiggy/Zomato, Practo/Justdial/Sulekha, GST/TDS/TCS rules, Cashfree Easy Split, Indian wedding advance norms.
