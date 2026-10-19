<script lang="ts">
  import { onMount } from 'svelte';
  import Img from './Img.svelte';
  import Icon from './Icon.svelte';
  import { fadeIn } from '../lib/motion';

  let { ids, start, onclose }: { ids: string[]; start: number; onclose: () => void } = $props();
  // svelte-ignore state_referenced_locally
  let index = $state(start);
  let track: HTMLDivElement | undefined = $state();
  let closeBtn: HTMLButtonElement | undefined = $state();

  onMount(() => {
    if (track) track.scrollLeft = start * track.clientWidth;
    closeBtn?.focus();
  });
  function onscroll() {
    if (track) index = Math.round(track.scrollLeft / track.clientWidth);
  }
  function go(d: number) {
    if (!track) return;
    const n = Math.min(ids.length - 1, Math.max(0, index + d));
    track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' });
  }
  function key(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
  }
</script>

<svelte:window onkeydown={key} />
<div class="viewer" role="dialog" aria-modal="true" aria-label="Photo viewer" in:fadeIn|global out:fadeIn|global>
  <div class="bar">
    <span class="count" aria-live="polite">{index + 1} / {ids.length}</span>
    <button bind:this={closeBtn} class="close" onclick={onclose} aria-label="Close viewer"><Icon name="close" size={20} /></button>
  </div>
  <div class="track" bind:this={track} {onscroll}>
    {#each ids as id, n}
      <div class="slide" aria-hidden={n !== index}>
        <div class="frame"><Img {id} contain eager={Math.abs(n - start) < 2} /></div>
      </div>
    {/each}
  </div>
  <p class="hint">Swipe to browse</p>
</div>

<style>
  .viewer { position: fixed; inset: 0; z-index: var(--z-viewer); background: #070605; display: flex; flex-direction: column; }
  .bar { position: absolute; top: 0; left: 0; right: 0; z-index: 2; display: flex; justify-content: space-between; align-items: center; padding: calc(var(--safe-top) + 12px) 16px 12px 24px; background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent); }
  .count { font-family: var(--font-serif); font-size: 20px; color: var(--gold-hi); letter-spacing: 0.06em; }
  .close { width: var(--tap); height: var(--tap); border-radius: 50%; display: grid; place-items: center; background: rgba(13, 11, 9, 0.6); border: 1px solid var(--line); }
  .track { flex: 1; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; overscroll-behavior-x: contain; }
  .track::-webkit-scrollbar { display: none; }
  .slide { flex: 0 0 100%; scroll-snap-align: center; scroll-snap-stop: always; display: grid; place-items: center; padding: calc(var(--safe-top) + 64px) 0 calc(var(--safe-bottom) + 56px); }
  .frame { position: relative; width: 100%; height: 100%; }
  .hint { position: absolute; bottom: calc(var(--safe-bottom) + 20px); left: 0; right: 0; text-align: center; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--mute); }
</style>
