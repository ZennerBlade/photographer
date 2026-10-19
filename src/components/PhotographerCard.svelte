<script lang="ts">
  import type { Photographer } from '../data/types';
  import { CATEGORIES } from '../data/seed/categories';
  import { formatINR, formatRating } from '../lib/format';
  import Img from './Img.svelte';
  import HeartButton from './HeartButton.svelte';

  let { p, i = 0, eager = false }: { p: Photographer; i?: number; eager?: boolean } = $props();
  const cats = $derived(p.categories.map((c) => CATEGORIES.find((x) => x.id === c)!.short));
</script>

<article class="card stagger" style:--i={Math.min(i, 8)}>
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
  .card { position: relative; margin: 0 var(--gutter) 14px; border: 1px solid var(--line); border-radius: var(--r-xl); background: var(--surf); }
  .link { display: flex; gap: 14px; padding: 10px; min-height: 160px; }
  .im { position: relative; flex: 0 0 112px; aspect-ratio: 112 / 140; border-radius: 56px 56px 14px 14px; overflow: hidden; align-self: center; }
  .body { flex: 1; min-width: 0; display: flex; flex-direction: column; padding: 6px 36px 4px 0; }
  h3 { font-family: var(--font-serif); font-weight: 500; font-size: 21px; line-height: 1.08; }
  .loc { color: var(--mute); font-size: 12px; margin-top: 4px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .chips li { font-size: 10px; letter-spacing: 0.06em; color: var(--gold-hi); border: 1px solid var(--line-strong); padding: 3px 9px; border-radius: var(--r-pill); }
  .foot { margin-top: auto; padding-top: 10px; display: flex; flex-direction: column; gap: 2px; font-size: 12px; }
  .rate b { color: var(--gold); font-weight: 500; }
  .rate span { color: var(--mute); }
  .price { color: var(--gold-hi); font-family: var(--font-serif); font-size: 18px; }
  .heart { position: absolute; top: 4px; right: 4px; }
</style>
