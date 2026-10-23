<script lang="ts">
  import type { Photographer } from '../data/types';
  import { CATEGORIES } from '../data/seed/categories';
  import { formatINR, formatRating } from '../lib/format';
  import Img from './Img.svelte';
  import HeartButton from './HeartButton.svelte';

  let { p, i = 0, eager = false }: { p: Photographer; i?: number; eager?: boolean } = $props();
  const cats = $derived(p.categories.map((c) => CATEGORIES.find((x) => x.id === c)!.short));
</script>

<article class="card stagger press" style:--i={Math.min(i, 8)}>
  <a href={`#/photographers/${p.id}`} class="link" aria-label={`${p.name}, ${p.city}, from ${formatINR(p.startingPrice)}`}>
    <div class="im"><Img id={p.leadImage} ratio={112 / 140} ty={0.36} {eager} /></div>
    <div class="body">
      <h3>{p.name}</h3>
      <p class="loc">{p.area}, {p.city}</p>
      <ul class="chips">{#each cats as c}<li>{c}</li>{/each}</ul>
      <div class="foot">
        <span class="rate"><b>★ {formatRating(p.rating)}</b> <span>({p.reviewCount})</span></span>
        <span class="price">from {formatINR(p.startingPrice)}</span>
      </div>
    </div>
  </a>
  <div class="heart"><HeartButton id={p.id} name={p.name} glass={false} /></div>
</article>

<style>
  .card { position: relative; margin: 0 var(--gutter) var(--s-4); border: 1px solid var(--line); border-radius: 6px; background: linear-gradient(180deg, var(--surf-2), var(--surf)); box-shadow: var(--shadow-card); }
  .link { display: flex; gap: var(--s-4); padding: var(--s-3); min-height: 168px; border-radius: inherit; }
  .im { position: relative; flex: 0 0 106px; aspect-ratio: 112 / 140; border-radius: 2px; overflow: hidden; align-self: center; outline: 1px solid var(--line-strong); outline-offset: 3px; margin: 3px; }
  .body { flex: 1; min-width: 0; display: flex; flex-direction: column; padding: var(--s-2) var(--s-8) var(--s-1) 0; }
  h3 { text-wrap: balance; overflow-wrap: break-word; font-family: var(--font-serif); font-weight: 500; font-size: 22px; line-height: 1.08; letter-spacing: -0.005em; }
  .loc { color: var(--mute); font-size: var(--t-xs); margin-top: var(--s-1); }
  .chips { display: flex; flex-wrap: wrap; gap: var(--s-2) 6px; margin-top: var(--s-3); }
  .chips li { font-size: 11px; letter-spacing: 0.04em; color: var(--gold-hi); border: 1px solid var(--line-strong); padding: 3px 10px; border-radius: var(--r-pill); }
  .foot { margin-top: auto; padding-top: var(--s-3); display: flex; flex-direction: column; gap: 2px; font-size: var(--t-xs); }
  .rate b { color: var(--gold); font-weight: 500; }
  .rate span { color: var(--mute); }
  .price { color: var(--gold-hi); font-family: var(--font-serif); font-size: 19px; font-weight: 500; font-variant-numeric: lining-nums; }
  .heart { position: absolute; top: 4px; right: 4px; }
</style>
