<script lang="ts">
  import type { Photographer } from '../data/types';
  import { CATEGORIES } from '../data/seed/categories';
  import { formatINR, formatRating } from '../lib/format';
  import Img from './Img.svelte';
  import HeartButton from './HeartButton.svelte';
  import NewBadge from './NewBadge.svelte';

  let { p, i = 0 }: { p: Photographer; i?: number } = $props();
  const cat = $derived(CATEGORIES.find((c) => c.id === p.categories[0])!.short.split(' ')[0]);
</script>

<div class="fc stagger press" style:--i={i + 2}>
  <a href={`#/photographers/${p.id}`}>
    <div class="im"><Img id={p.leadImage} ratio={1} ty={0.4} eager={i < 2} /></div>
    <div class="t"><b>{p.name}</b></div>
    <div class="m">{p.city}{#if p.reviewCount} · <span class="pr">{formatRating(p.rating)} ★</span>{:else if p.isNew} · <NewBadge />{/if}</div>
    <div class="m">{cat} · from {formatINR(p.startingPrice)}</div>
  </a>
  <div class="heart"><HeartButton id={p.id} name={p.name} /></div>
</div>

<style>
  .fc { position: relative; flex: 0 0 196px; scroll-snap-align: start; align-self: flex-start; padding: 9px 9px 12px; border: 1px solid var(--line); border-radius: 6px; background: linear-gradient(180deg, var(--surf-2), var(--surf)); box-shadow: var(--shadow-card); transform: rotate(var(--tilt, 0deg)); }
  .fc:nth-child(odd) { --tilt: -0.8deg; }
  .fc:nth-child(even) { --tilt: 0.7deg; }
  .im { position: relative; height: 168px; border-radius: 2px; overflow: hidden; outline: 1px solid var(--line-strong); outline-offset: 3px; margin: 3px 3px 0; width: calc(100% - 6px); }
  .t { margin: var(--s-3) 2px 0; display: flex; flex-direction: column; gap: 2px; }
  b { font-family: var(--font-serif); font-size: 20px; font-weight: 500; line-height: 1.1; text-wrap: balance; overflow-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { color: var(--gold-hi); font-size: var(--t-xs); }
  .m { font-size: var(--t-xs); color: var(--mute); margin: var(--s-1) 2px 0; }
  .heart { position: absolute; top: 12px; right: 12px; }
</style>
