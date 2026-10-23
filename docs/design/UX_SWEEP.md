# UX sweep: client flow at 390x844 (2026-10-23)

Flow: Home, list, filters/sort, profile, contact, saved.

## Fixed (major)
1. Featured cards changed height when a name wrapped, so the row looked ragged. Now equal height (stretch), 2 lines reserved for the name, meta rows pinned to the bottom. List cards reserve 2 lines for the name too.
2. Occasion tiles clashed (rainbow balloons, blown-out stage, teal portrait). New covers (couple, panel talk, birthday girl with cake, editorial red portrait) plus one shared treatment: desaturate, warm sepia lift, same contrast and a warm dark scrim. Screenshot: docs/screenshots/occasions.png.
3. Tap targets under 44px: Home section links (28px), list Filters/Sort pills (42px), category quick chips (36px). All 44px now.
4. Ambiguous section links "All" and "View all" now read "See all".

## Minor follow-ups
- Quick category chips scroll sideways and clip "Birthdays" at the edge with no fade; add a right-edge fade.
- Text at 11px (tile counts, card chips) is small for 50-60 year-olds; raise to 12-13px.
- Muted grey location/meta text (var(--mute)) has modest contrast on the dark cards; lighten slightly.
- Contact bar overlaps the lower edge of profile content; add bottom padding checks on short screens.
- Single-line names on list cards leave a blank line; acceptable trade-off for steady rhythm.
- Saved empty/one-item states are fine, but no "Clear" or sort on Saved.
