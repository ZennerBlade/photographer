---
name: mobile-game-ux
description: Design and review guidance for casual and party mobile games (pass-the-phone, social deduction, word games) so they feel like a game with an ownable identity, not a premium app. Use when designing or reviewing game screens, logo, app icon, mascot, motion, sound, haptics, onboarding, mockup rounds, or store assets, especially for dim-room, one-phone, drinking-party use.
---

# Mobile Game UX (casual / party)

Goal: fun and ownable first, classy second. A party game is judged in 3 seconds from across a table by people holding drinks. Design for the room, not for the holder's thumb alone.

## When to use
- Designing or critiquing any screen of a casual/party game, its logo, icon, mascot, copy, sound or haptics.
- Preparing mockup rounds or store assets.
- Not for: real-time action feel, controller UI, monetisation/ads flows.

## 1. Principles
1. One hero per screen. One idea, one primary action.
2. Identity is an object and a voice, not a style. Players must be able to point at the thing.
3. Restraint in the base, spend the fun budget on 4 moments: reveal, vote/speak, elimination, win.
4. Juice scales with importance. If everything pops, nothing does.
5. Every cue has a twin: sound has a visual, haptic has a visual, colour has a shape or word. The game works muted, vibration off, and colour-blind.
6. Secrecy first: all roles look and time identically on every screen an onlooker can see.
7. Fewer taps beat cleverness. Defaults must produce a good game.

## 2. Identity system (decide first, write it in one paragraph)
- **Motif**: one recurring object or shape (stamp, mask, curtain, card...). It shows up in logo, icon, loaders, buttons, reveals.
- **Wordmark**: custom touch (one altered letter, cut-out, tilt, stencil). Never plain font text.
- **Logo lockups**: horizontal and stacked, one-colour version, works on light and dark.
- **Icon**: single silhouette, 2 to 3 flat colours, no text (or one letter), no thin strokes. Must read at 48 px and still be distinct at 192 px. Keep the subject inside the central 66% of the adaptive canvas (72 of 108 dp). Supply foreground, background and monochrome layers. Check at 48, 96, 192 px, in grayscale, and on light and dark wallpaper. Squint test: name the object.
- **Mascot (optional)**: only if it reacts to game state (at least 4 expressions tied to events). Face and a few features, not a full body. Static mascot = clip art; skip it.
- **Palette**: choose deliberately from the concept, not by default. Dark base that is not pure black; text off-white not pure white (halation); 1 signature accent, 1 secondary, 1 alert. Accent must stand apart from competitors in the store category. Define roles (surface, text, accent, danger, success) as tokens before drawing screens.
- **Type**: one display face with character for hero words, one plain readable face for everything else.
- **Voice**: pick a persona (dry host, bureaucrat, stage manager, bluffing dealer). Every string follows it. Verbs on buttons. 3-word instructions. No pun spam, one exclamation mark per screen at most, no emoji on controls.
- **Signature moment**: one animation players imitate or mention, with matching sound and haptic. Under 1.2 s when it repeats per player.

## 3. Per-screen rules (pass-the-phone)
- **Home**: logo + one giant "New game". Resume, rules, settings small and secondary. Motif visible and alive (idle motion under 6 s loop, tiny).
- **Setup**: sane defaults by player count; steppers not text fields where possible; advanced options folded. Start in 3 taps or fewer.
- **Pass screen** ("Pass to NAME"): name in huge type, nothing secret visible, ignore input for about 700 ms, then require press-and-hold to proceed.
- **Reveal (secret)**: hold-to-reveal, release hides instantly; or tap-to-flip with a fixed show time then auto-hide. Identical layout, size, timing and animation for every role. Low glow, no large bright fills. Block screenshots (FLAG_SECURE). Explicit "Hide" and a confirmation before passing on.
- **Speaking order / discussion**: one name as the hero, whose turn it is, a visible shared timer readable across the table, large "Next" with hold or generous gap. Group-readable (arm's length, 40 sp+ for key words).
- **Voting / elimination**: shared screen. Selection is two-step (select, then hold to lock). Undo until locked. Result is a held beat (300 to 600 ms) then the signature moment; show the eliminated player's role only after the beat.
- **Game over**: winner in one hero line, roles listed plainly, "Play again" the biggest button with the same players kept. Share/rematch secondary.
- **Always**: back/menu in a consistent corner, away from the main action; quit needs hold or confirm; respect safe-area insets (notch, rounded corners, gesture bar).

## 4. Juice (numbers for a calm party game)
- Tap acknowledged in under 100 ms through three channels: scale press (0.96) then spring back (up to 1.04 overshoot), a soft haptic, a short sound.
- Durations: micro 120 to 200 ms; standard 200 to 300 ms; screen transition 250 to 350 ms; big moment 400 to 700 ms; nothing repeated per player over 1.2 s; all skippable by tap.
- Easing: ease-out to settle, overshoot spring to pop in, ease-in to wind up, never linear for user motion. Anticipate, hit, settle.
- Tiers: **small** (nav, select): scale + tick, no shake. **medium** (confirm, lock): scale + thump + 60 ms hit-stop. **large** (reveal, elimination, win): 80 to 120 ms hit-stop, shake up to 4 px (decays in 250 ms), flash replaced by tint if reduce-motion, one held beat before payoff.
- Stagger list items 40 to 70 ms, max 6 items; the rest appear together.
- Juice returns to rest; no permanent scale, glow or offset build-up under spam taps.
- Invalid action: small shake or colour-plus-icon flash with a reason line; must look different from "ignored".
- Max 2 to 3 transient messages at once; merge duplicates.
- Reduce-motion: replace shake/slide with fades and 95 to 100% scale; keep press feedback. Honour the OS setting plus an in-app toggle.

## 5. Sound and haptics
- Palette of 6 to 8 sounds in one timbre family (felt, wood, low brass, paper...): tap, confirm, reveal sting, lock, eliminate, win, error. Each 80 ms to 1.5 s; sting max 2 s.
- No looping music on secret screens; ambient bed optional and off by default; ducking under any speech or timer cue.
- Haptics: light tick (select), medium thump (confirm), ramp during hold-to-confirm, double pulse (reveal), distinct pattern (error). Always paired with a visual, fired in sync.
- Master toggles for sound and haptics on home; remember choices. Fail silently if audio is locked.
- Provide a sound/haptic table per concept: event, sound, haptic, visual, duration.

## 6. Accessibility, dim room, drunk-proofing
- Tap targets: min 48 dp, primary actions 56 to 72 dp, 8 dp or more between targets, small icon with large hit area.
- No wipe, scratch, drag, pinch, swipe-to-reveal or timing-precise gestures (greasy, shaky fingers). Taps and press-and-hold (0.8 to 1 s, with ring progress) only.
- Mis-tap protection: 700 ms input lock after screen changes, two-step destructive actions (hold or confirm + undo), no primary button next to destructive one, double-tap debounce.
- Contrast: body text 7:1 or better, large text 4.5:1 at least; never colour-only meaning; avoid red/green pairs; add icon or label.
- Text: key words 40 sp+, body 18 sp+, never under 14 sp; weights not thin; honour system font scaling up to 130% without clipping.
- Brightness: avoid big bright fills; the screen is lit in a dark room and reveals secrets. Offer a dim/low-glow toggle if palette is bright.
- Landscape and one-handed grip both OK; keep primary in thumb zone, bottom half.
- Time pressure only where it is the game; otherwise no auto-advance while someone reads.

## 7. Onboarding (one-time hints only)
- No account, no permission prompts, no tutorial gate. First game in 3 taps.
- Teach by doing: one-line inline hints that appear once, then vanish and never return (store a seen flag). Maximum one hint per screen.
- Rules: swipeable card stack, one picture per rule, reachable anytime from home.
- A single host line per phase tells the group what to do aloud. Copy replaces tutorial.
- Empty/error states carry voice and one clear action.

## 8. Anti-patterns
Plain font logo; stock mask or bubble clip art; rainbow gradients; emoji on controls; confetti on routine taps; everything animates at once; modal pile-ups; wipe-to-reveal; tiny secondary text during play; auto-advancing secret screens; different layout per role; sound-only or colour-only cues; hidden fun behind settings; competitor palette copies; permanent mascot grin; ads, nags or pay prompts mid-game; unskippable repeated animation; pure black + pure white; hover-only affordances.

## 9. Design-review checklist
- [ ] Stranger names the motif within 5 seconds; one sentence of voice defined.
- [ ] One hero element and one primary action per screen.
- [ ] Reveal, speak, eliminate, win each have visual + sound + haptic, tiered by importance.
- [ ] Legible at arm's length in a dim room; no glare; contrast measured.
- [ ] All targets 48 dp or larger, key ones 56 to 72; no precision gestures.
- [ ] Destructive actions hold or undo; 700 ms input lock after pass screens.
- [ ] Secret roles identical in layout, timing, animation.
- [ ] Works with sound off, haptics off, reduce-motion on, colour-blind simulation.
- [ ] Per-player animations under 1.2 s and skippable; juice returns to rest under spam taps.
- [ ] Icon passes 48 px, grayscale, light and dark wallpaper tests.
- [ ] Hints appear once only.
- [ ] Next to two competitors' store icons it still looks different.
- [ ] Safe-area insets respected; no clipped text at 130% font.

## 10. Required deliverables for a mockup round
Each identity concept is rendered visually as clickable HTML mockups (phone-width frame, dark-room background, real tappable flow), not described in prose:
1. Logo (wordmark + lockup, light and dark).
2. Icon at 48 px and 192 px, on light and dark wallpaper, plus grayscale.
3. Home.
4. Role reveal (hold interaction working, hide behaviour).
5. Speaking order / discussion with timer.
6. Elimination (vote lock, held beat, signature moment).
7. Game over.
Also per concept: palette tokens with roles, type pairing, 10 sample strings in the voice, sound + haptic table, signature animation working in the mockup, and a states table (default, pressed, disabled, error) for the primary button. Add a reduce-motion toggle in each mockup. Flag where concepts are meant to differ, so comparison is fair.
Optional per-screen spec: purpose, arrival state, states, transitions (duration/easing/skip), acceptance criteria.

## References (paraphrased, not copied)
- gamedev-skills game-feel: importance tiers, easing roles, brief-then-rest, accessibility toggles. https://skills.sh/gamedev-skills/awesome-gamedev-agent-skills/game-feel
- randroids-dojo randroid-game-feel: verify the verb, distinct rejection feedback, non-audio twins. https://www.skills.sh/randroids-dojo/skills/randroid-game-feel
- omer-metin game-ui-design: redundant cues, touch targets, destructive confirmation, notification limits. https://claudemarketplaces.com/skills/omer-metin/skills-for-antigravity/game-ui-design
- Donchitos Claude-Code-Game-Studios ux-design: per-screen spec structure. https://github.com/Donchitos/Claude-Code-Game-Studios
- Sheshiyer mobile-touch: timing bands, haptics paired with visuals. https://claudskills.com/skills/mobile-touch/
- Jackbox low-friction principles: https://builtin.com/media-gaming/jackbox-games-design-party-pack
- Icon A/B lessons: https://www.smashingmagazine.com/2015/08/ab-testing-taught-app-store-optimization
- Not read in full: opusgamelabs design-game, jezweb icon-design.
