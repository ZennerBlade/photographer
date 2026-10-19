<script lang="ts">
  import { getPhotographersByIds } from '../data/api';
  import type { Photographer } from '../data/types';
  import { saved } from '../lib/saved.svelte';
  import { pageIn } from '../lib/motion';
  import { plural } from '../lib/format';
  import PhotographerCard from '../components/PhotographerCard.svelte';
  import Icon from '../components/Icon.svelte';

  let list = $state<Photographer[] | null>(null);
  $effect(() => {
    const ids = [...saved.ids];
    getPhotographersByIds(ids).then((l) => (list = l));
  });
</script>

<div class="page page-pad-bottom" in:pageIn|global>
  <header>
    <span class="eyebrow">Your shortlist</span>
    <h1>Saved</h1>
    <p class="count">{plural(saved.ids.length, 'photographer')}</p>
  </header>
  {#if list && list.length}
    {#each list as p, i (p.id)}<PhotographerCard {p} {i} />{/each}
  {:else if list}
    <div class="empty">
      <span class="ring"><Icon name="heart" size={26} /></span>
      <h2>Nothing saved yet</h2>
      <p>Tap the heart on any photographer to keep them here for later.</p>
      <a class="btn btn-gold" href="#/photographers">Browse photographers</a>
    </div>
  {/if}
</div>

<style>
  header { padding: calc(var(--safe-top) + 22px) var(--gutter) 14px; }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: 38px; line-height: 1; margin-top: 8px; }
  .count { color: var(--mute); font-size: 12px; margin-top: 6px; }
  .empty { margin: 40px var(--gutter) 0; padding: 36px 24px; border: 1px dashed var(--line-strong); border-radius: var(--r-xl); display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }
  .ring { width: 64px; height: 64px; border-radius: 50%; border: 1px solid var(--line-strong); display: grid; place-items: center; color: var(--gold); }
  h2 { font-family: var(--font-serif); font-weight: 500; font-size: 26px; }
  p { color: var(--ink-soft); font-size: 13px; line-height: 1.6; max-width: 240px; }
  .empty .btn { margin-top: 8px; }
</style>
