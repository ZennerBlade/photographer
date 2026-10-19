<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { getFeatured, getCategories, countByCategory, totalPhotographers } from '../data/api';
  import type { Photographer } from '../data/types';
  import { pageIn } from '../lib/motion';
  import Icon from '../components/Icon.svelte';
  import Img from '../components/Img.svelte';
  import FeaturedCard from '../components/FeaturedCard.svelte';
  import DemoNotice from '../components/DemoNotice.svelte';
  import JoinSheet from '../components/JoinSheet.svelte';

  const cats = getCategories();
  const counts = countByCategory();
  let featured = $state<Photographer[] | null>(null);
  let q = $state('');
  let join = $state(false);
  getFeatured().then((f) => (featured = f));

  function search(e: SubmitEvent) {
    e.preventDefault();
    push(q.trim() ? `/photographers?q=${encodeURIComponent(q.trim())}` : '/photographers');
  }
</script>

<div class="page page-pad-bottom" in:pageIn|global>
  <header class="top">
    <span class="brand serif">Noor <i>Atelier</i></span>
    <a class="srch" href="#/photographers" aria-label="Search photographers"><Icon name="search" size={18} stroke={1.2} /></a>
  </header>

  <div class="intro stagger" style:--i="0">
    <span class="eyebrow">India's finest lens artists</span>
    <h1>Moments worth <i>remembering</i>, framed beautifully.</h1>
  </div>

  <form class="search stagger" style:--i="1" onsubmit={search} role="search">
    <Icon name="search" size={18} stroke={1.2} />
    <input type="search" bind:value={q} placeholder="Search city, style or photographer" aria-label="Search city, style or photographer" enterkeyhint="search" />
  </form>

  <div class="sec"><h2>Occasions</h2><a href="#/photographers">All</a></div>
  <div class="cats">
    {#each cats as c, i}
      <a class="cat stagger" style:--i={i + 2} href={`#/photographers?cat=${c.id}`}>
        <Img id={c.cover} ratio={166 / 96} ty={0.46} eager />
        <div><b>{c.short}</b><small>{counts[c.id]} photographers</small></div>
      </a>
    {/each}
  </div>

  <div class="sec"><h2>Featured this season</h2><a href="#/photographers?sort=rating">View all</a></div>
  <div class="fl" role="list">
    {#if featured}
      {#each featured as p, i (p.id)}<FeaturedCard {p} {i} />{/each}
    {:else}
      {#each [0, 1, 2] as n (n)}<div class="sk skeleton"></div>{/each}
    {/if}
  </div>

  <div class="all">
    <a class="btn btn-gold" href="#/photographers">View all {totalPhotographers} photographers <Icon name="arrow" size={18} /></a>
    <button class="join" onclick={() => (join = true)}>Are you a photographer? <u>Join the directory</u></button>
  </div>
  <DemoNotice />
</div>

{#if join}<JoinSheet onclose={() => (join = false)} />{/if}

<style>
  .top { padding: calc(var(--safe-top) + 14px) var(--gutter) 8px; display: flex; justify-content: space-between; align-items: center; min-height: 66px; }
  .brand { font-size: 25px; font-weight: 500; letter-spacing: 0.02em; }
  .brand i { color: var(--gold); }
  .srch { width: var(--tap); height: var(--tap); display: grid; place-items: center; color: var(--gold); margin-right: -10px; }
  .intro { padding: 16px var(--gutter) 0; }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: var(--t-h1); line-height: 1; margin-top: 10px; letter-spacing: -0.01em; }
  h1 i { color: var(--gold-hi); }
  .search { margin: 18px var(--gutter) 0; border: 1px solid var(--line); border-radius: var(--r-pill); padding: 0 18px; height: 50px; display: flex; gap: 12px; align-items: center; color: var(--mute); background: rgba(255, 255, 255, 0.02); }
  .search:focus-within { border-color: var(--line-strong); }
  input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--ink); font: inherit; font-size: 13px; }
  input::placeholder { color: var(--mute); opacity: 1; }
  .cats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 var(--gutter); }
  .cat { position: relative; border-radius: var(--r-lg); overflow: hidden; height: 96px; background: #222; }
  .cat :global(.img) { filter: saturate(0.9) brightness(0.78); transition: transform var(--d-slow) var(--ease-out); }
  .cat:active :global(.img) { transform: scale(1.04); }
  .cat::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, var(--scrim)); }
  .cat div { position: absolute; z-index: 2; left: 14px; bottom: 12px; right: 10px; }
  .cat b { font-family: var(--font-serif); font-size: 18px; font-weight: 500; line-height: 1; display: block; }
  .cat small { display: block; font-size: 10px; color: var(--gold-hi); margin-top: 4px; letter-spacing: 0.08em; }
  .fl { display: flex; gap: 14px; padding: 0 var(--gutter) 4px; overflow-x: auto; scroll-snap-type: x proximity; scroll-padding-left: var(--gutter); scrollbar-width: none; }
  .fl::-webkit-scrollbar { display: none; }
  .sk { flex: 0 0 190px; height: 262px; border-radius: var(--r-arch) var(--r-arch) 16px 16px; }
  .all { margin: 26px var(--gutter) 0; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .all .btn { width: 100%; }
  .join { font-size: 12px; color: var(--mute); min-height: var(--tap); }
  .join u { color: var(--gold-hi); text-underline-offset: 3px; }
</style>
