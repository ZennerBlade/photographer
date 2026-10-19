<script lang="ts">
  import type { Photographer } from '../data/types';
  import { CATEGORIES } from '../data/seed/categories';
  import { formatINR, formatRating } from '../lib/format';
  import Img from './Img.svelte';
  import HeartButton from './HeartButton.svelte';

  let { p, i = 0 }: { p: Photographer; i?: number } = $props();
  const cat = $derived(CATEGORIES.find((c) => c.id === p.categories[0])!.short.split(' ')[0]);
</script>

<div class="fc stagger press" style:--i={i + 2}>
  <a href={`#/photographers/${p.id}`}>
    <div class="im"><Img id={p.leadImage} ratio={1} ty={0.4} eager={i < 2} /></div>
    <div class="t"><b>{p.name}</b><span class="pr">{formatRating(p.rating)} ★</span></div>
    <div class="m">{p.city} · {cat} · from {formatINR(p.startingPrice)}</div>
  </a>
  <div class="heart"><HeartButton id={p.id} name={p.name} /></div>
</div>

<style>
  .fc { position: relative; flex: 0 0 190px; scroll-snap-align: start; }
  .im { position: relative; height: 190px; box-shadow: var(--shadow-card); border-radius: var(--r-arch) var(--r-arch) 16px 16px; overflow: hidden; }
  .t { margin-top: var(--s-3); display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  b { font-family: var(--font-serif); font-size: 21px; font-weight: 500; line-height: 1.1; }
  .pr { color: var(--gold-hi); font-size: var(--t-xs); white-space: nowrap; }
  .m { font-size: var(--t-xs); color: var(--mute); margin-top: var(--s-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .heart { position: absolute; top: 138px; right: 6px; }
</style>
