<script lang="ts">
  import type { CategoryId, City, Filters } from '../data/types';
  import { CATEGORIES, CITIES } from '../data/seed/categories';
  import { EMPTY_FILTERS, PRICE_BANDS, RATINGS } from '../lib/filters';
  import Sheet from './Sheet.svelte';

  let { filters, count, onapply, onclose }: { filters: Filters; count: (f: Filters) => number; onapply: (f: Filters) => void; onclose: () => void } = $props();
  // draft is a deliberate one-time copy of the incoming filters
  // svelte-ignore state_referenced_locally
  let draft = $state<Filters>({ ...filters, categories: [...filters.categories] });
  const n = $derived(count(draft));

  function toggleCat(id: CategoryId) {
    draft.categories = draft.categories.includes(id) ? draft.categories.filter((c) => c !== id) : [...draft.categories, id];
  }
  const reset = () => (draft = { ...EMPTY_FILTERS, q: draft.q });
</script>

<Sheet title="Filters" {onclose}>
  <section>
    <h3>Category</h3>
    <div class="row">
      {#each CATEGORIES as c}
        <button class="chip" class:on={draft.categories.includes(c.id)} aria-pressed={draft.categories.includes(c.id)} onclick={() => toggleCat(c.id)}>{c.short}</button>
      {/each}
    </div>
  </section>
  <section>
    <h3>City</h3>
    <div class="row">
      <button class="chip" class:on={draft.city === ''} aria-pressed={draft.city === ''} onclick={() => (draft.city = '')}>Anywhere</button>
      {#each CITIES as c}
        <button class="chip" class:on={draft.city === c} aria-pressed={draft.city === c} onclick={() => (draft.city = c as City)}>{c}</button>
      {/each}
    </div>
  </section>
  <section>
    <h3>Starting price</h3>
    <div class="row">
      {#each PRICE_BANDS as b}
        <button class="chip" class:on={draft.price === b.id} aria-pressed={draft.price === b.id} onclick={() => (draft.price = b.id)}>{b.label}</button>
      {/each}
    </div>
  </section>
  <section>
    <h3>Minimum rating</h3>
    <div class="row">
      {#each RATINGS as r}
        <button class="chip" class:on={draft.minRating === r.id} aria-pressed={draft.minRating === r.id} onclick={() => (draft.minRating = r.id)}>{r.id ? '★ ' : ''}{r.label}</button>
      {/each}
    </div>
  </section>
  {#snippet footer()}
    <button class="btn btn-ghost" onclick={reset}>Reset</button>
    <button class="btn btn-gold apply" onclick={() => onapply(draft)} disabled={n === 0}>{n === 0 ? 'No matches' : `Show ${n} photographer${n === 1 ? '' : 's'}`}</button>
  {/snippet}
</Sheet>

<style>
  section { padding: 10px 0 14px; border-bottom: 1px solid var(--line); }
  section:last-child { border: 0; }
  h3 { font-size: 10px; letter-spacing: var(--track-eyebrow); text-transform: uppercase; color: var(--gold); font-weight: 400; margin-bottom: 12px; }
  .row { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { min-height: 40px; padding: 0 16px; border-radius: var(--r-pill); border: 1px solid var(--line-strong); color: var(--ink-soft); font-size: var(--t-sm); }
  .chip:active { transform: scale(0.95); }
  .chip.on { background: var(--gold); color: var(--on-gold); border-color: var(--gold); font-weight: 500; }
  .apply { flex: 1; }
  .apply:disabled { opacity: 0.5; }
</style>
