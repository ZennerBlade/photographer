<script lang="ts">
  import { router, replace } from 'svelte-spa-router';
  import { tick } from 'svelte';
  import { getPhotographers, matches, getPhotographerCount } from '../data/api';
  import { getCategories } from '../data/api';
  import type { CategoryId, Filters, Photographer, SortKey } from '../data/types';
  import { activeFilterCount, buildQuery, EMPTY_FILTERS, parseQuery, SORTS } from '../lib/filters';
  import { plural } from '../lib/format';
  import { session } from '../lib/session.svelte';
  import { pageIn } from '../lib/motion';
  import Icon from '../components/Icon.svelte';
  import PhotographerCard from '../components/PhotographerCard.svelte';
  import FilterSheet from '../components/FilterSheet.svelte';
  import SortSheet from '../components/SortSheet.svelte';

  const cats = getCategories();
  const parsed = $derived(parseQuery(router.querystring));
  const filters = $derived(parsed.filters);
  const sort = $derived(parsed.sort);
  const qs = $derived(buildQuery(filters, sort));
  const nActive = $derived(activeFilterCount(filters));

  let list = $state<Photographer[] | null>(null);
  let sheet = $state<'filters' | 'sort' | null>(null);
  let page: HTMLDivElement | undefined = $state();
  let qInput = $state('');
  let searchTimer: ReturnType<typeof setTimeout>;
  let req = 0;

  $effect(() => {
    session.listQuery = qs;
    const my = ++req;
    const key = qs;
    getPhotographers(filters, sort).then(async (l) => {
      if (my !== req) return;
      list = l;
      await tick();
      if (page) page.scrollTop = session.scroll[key] ?? 0;
    });
  });
  $effect(() => {
    qInput = filters.q;
  });

  function go(f: Filters, s: SortKey = sort) {
    const q = buildQuery(f, s);
    replace('/photographers' + (q ? '?' + q : ''));
  }
  function onsearch() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => go({ ...filters, q: qInput }), 250);
  }
  function quickCat(id: CategoryId | '') {
    go({ ...filters, categories: id ? [id] : [] });
  }
  function onscroll() {
    if (page) session.scroll[qs] = page.scrollTop;
  }
  const title = $derived(filters.categories.length === 1 ? cats.find((c) => c.id === filters.categories[0])!.label : 'All photographers');
  const sortLabel = $derived(SORTS.find((s) => s.id === sort)!.label);
  const quickActive = $derived(filters.categories.length === 1 ? filters.categories[0] : filters.categories.length === 0 ? '' : null);
</script>

<div class="page page-pad-bottom" bind:this={page} {onscroll} in:pageIn|global>
  <header class="head">
    <span class="eyebrow">Photographers</span>
    <h1>{title}</h1>
    <p class="count" aria-live="polite">{list ? plural(list.length, 'photographer') : 'Loading'}{filters.city ? ` in ${filters.city}` : ''}</p>
  </header>

  <div class="sticky">
    <label class="search">
      <Icon name="search" size={17} stroke={1.2} />
      <input type="search" bind:value={qInput} oninput={onsearch} placeholder="Search city, style or photographer" aria-label="Search" enterkeyhint="search" />
    </label>
    <div class="ctrls">
      <button class="pill press-sm" onclick={() => (sheet = 'filters')} aria-haspopup="dialog">
        <Icon name="sliders" size={17} /> Filters {#if nActive}<em aria-label={`${nActive} active`}>{nActive}</em>{/if}
      </button>
      <button class="pill press-sm" onclick={() => (sheet = 'sort')} aria-haspopup="dialog"><Icon name="sort" size={17} /> {sortLabel}</button>
    </div>
    <div class="quick" role="group" aria-label="Category">
      <button class:on={quickActive === ''} onclick={() => quickCat('')}>All</button>
      {#each cats as c}<button class:on={quickActive === c.id} onclick={() => quickCat(c.id)}>{c.short.split(' ')[0]}</button>{/each}
    </div>
  </div>

  <div class="results">
    {#if list === null}
      {#each [0, 1, 2] as n (n)}<div class="sk skeleton"></div>{/each}
    {:else if list.length === 0}
      <div class="empty">
        <span class="ring"><Icon name="camera" size={26} /></span>
        <h2>No photographers match</h2>
        <p>Try a different city or budget, or widen your filters.</p>
        <button class="btn btn-gold" onclick={() => go({ ...EMPTY_FILTERS }, 'recommended')}>Clear filters</button>
      </div>
    {:else}
      {#key qs}
        {#each list as p, i (p.id)}<PhotographerCard {p} {i} eager={i < 3} />{/each}
      {/key}
    {/if}
  </div>
</div>

{#if sheet === 'filters'}
  <FilterSheet {filters} count={(f) => getPhotographerCount(f)} onclose={() => (sheet = null)} onapply={(f) => { sheet = null; go(f); }} />
{:else if sheet === 'sort'}
  <SortSheet {sort} onclose={() => (sheet = null)} onpick={(s) => { sheet = null; go(filters, s); }} />
{/if}

<style>
  .head { padding: calc(var(--safe-top) + 22px) var(--gutter) 12px; }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: 38px; line-height: 1; margin-top: var(--s-2); letter-spacing: -0.012em; }
  .count { color: var(--mute); font-size: var(--t-xs); margin-top: var(--s-2); }
  .sticky { position: sticky; top: 0; z-index: 5; padding: var(--s-2) var(--gutter) var(--s-4); background: linear-gradient(180deg, var(--bg) 84%, transparent); display: flex; flex-direction: column; gap: var(--s-3); }
  .search { height: 46px; border: 1px solid var(--line); border-radius: var(--r-pill); display: flex; align-items: center; gap: 10px; padding: 0 16px; color: var(--mute); background: var(--surf); transition: border-color var(--d-fast), box-shadow var(--d-base); }
  .search:focus-within { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(212, 176, 106, 0.12); }
  input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--ink); font: inherit; font-size: 13px; }
  input::placeholder { color: var(--mute); opacity: 1; }
  .ctrls { display: flex; gap: 8px; }
  .pill { height: 44px; padding: 0 16px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line-strong); border-radius: var(--r-pill); color: var(--gold-hi); font-size: var(--t-sm); font-weight: 400; max-width: 100%; white-space: nowrap; }
  .pill em { font-style: normal; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--gold); color: var(--on-gold); font-size: 10.5px; font-weight: 600; display: grid; place-items: center; }
  .quick { display: flex; gap: var(--s-2); overflow-x: auto; margin: 0 calc(var(--gutter) * -1); padding: 0 var(--gutter); scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 40px), transparent); mask-image: linear-gradient(90deg, #000 calc(100% - 40px), transparent); scroll-snap-type: x proximity; }
  .quick::-webkit-scrollbar { display: none; }
  .quick button { flex: none; min-height: 44px; padding: 0 var(--s-4); font-size: var(--t-sm); color: var(--mute); border-radius: var(--r-pill); }
  .quick button:active { transform: scale(0.95); }
  .quick button.on { color: var(--gold-hi); background: rgba(212, 176, 106, 0.12); box-shadow: inset 0 0 0 1px var(--line-strong); }
  .results { padding-top: 4px; }
  .sk { height: 168px; margin: 0 var(--gutter) var(--s-4); border-radius: var(--r-xl); }
  .empty { margin: 24px var(--gutter) 0; padding: 36px 24px; border: 1px dashed var(--line-strong); border-radius: var(--r-xl); background: radial-gradient(120% 80% at 50% 0%, rgba(212, 176, 106, 0.07), transparent 70%); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }
  .ring { width: 64px; height: 64px; border-radius: 50%; border: 1px solid var(--line-strong); display: grid; place-items: center; color: var(--gold); }
  h2 { font-family: var(--font-serif); font-weight: 500; font-size: 26px; }
  .empty p { color: var(--ink-soft); font-size: 13px; line-height: 1.6; max-width: 240px; }
</style>
