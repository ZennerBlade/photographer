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
  import Logo from '../components/Logo.svelte';

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
    <Logo />
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
      <a class="cat stagger press" style:--i={i + 2} href={`#/photographers?cat=${c.id}`}>
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
      {#each [0, 1, 2] as n (n)}<div class="skw"><div class="sk skeleton"></div><span class="skeleton sk-line" style="width:70%;margin-top:12px"></span><span class="skeleton sk-line" style="width:90%;margin-top:8px;height:10px"></span></div>{/each}
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
  .srch { width: var(--tap); height: var(--tap); display: grid; place-items: center; color: var(--gold); margin-right: -10px; }
  .intro { padding: var(--s-4) var(--gutter) 0; }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: var(--t-h1); line-height: 1.02; margin-top: var(--s-3); letter-spacing: -0.012em; }
  h1 i { color: var(--gold-hi); }
  .search { margin: var(--s-6) var(--gutter) 0; border: 1px solid var(--line); border-radius: var(--r-pill); padding: 0 18px; height: 50px; display: flex; gap: 12px; align-items: center; color: var(--mute); background: var(--surf); transition: border-color var(--d-fast), box-shadow var(--d-base); }
  .search:focus-within { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(212, 176, 106, 0.12); }
  input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--ink); font: inherit; font-size: 13px; }
  input::placeholder { color: var(--mute); opacity: 1; }
  .cats { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); padding: 0 var(--gutter); }
  .cat { position: relative; border-radius: var(--r-lg); overflow: hidden; height: 112px; background: #2a2119; box-shadow: var(--shadow-card), inset 0 0 0 1px var(--line); }
  .cat :global(.img) { filter: saturate(1.05) brightness(1.02); transition: transform var(--d-slow) var(--ease-out); }
  .cat:active :global(.img) { transform: scale(1.04); }
  .cat::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8, 6, 4, 0.06) 20%, rgba(8, 6, 4, 0.9)); }
  .cat div { position: absolute; z-index: 2; left: var(--s-3); bottom: var(--s-3); right: var(--s-2); }
  .cat b { font-family: var(--font-serif); font-size: 19px; font-weight: 500; line-height: 1.05; display: block; text-shadow: 0 1px 10px rgba(0, 0, 0, 0.5); }
  .cat small { display: block; font-size: 11px; color: var(--gold-hi); margin-top: var(--s-1); letter-spacing: 0.06em; }
  .fl { display: flex; gap: 14px; padding: 0 var(--gutter) 4px; overflow-x: auto; scroll-snap-type: x proximity; scroll-padding-left: var(--gutter); scrollbar-width: none; }
  .fl::-webkit-scrollbar { display: none; }
  .skw { flex: 0 0 190px; }
  .sk { width: 100%; flex: 0 0 190px; height: 262px; border-radius: 6px; }
  .all { margin: var(--s-8) var(--gutter) 0; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .all .btn { width: 100%; }
  .join { font-size: var(--t-xs); color: var(--mute); min-height: var(--tap); }
  .join u { color: var(--gold-hi); text-underline-offset: 3px; }
</style>
