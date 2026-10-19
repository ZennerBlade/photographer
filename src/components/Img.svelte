<script lang="ts">
  import { imageMeta } from '../data/api';
  import { focusPosition } from '../lib/focus';

  /**
   * Every crop in the app goes through this component so the stored focal point is always honoured.
   * `ratio` = width/height of the CSS box that contains it (needed for exact focal-point maths); `ty` = where the focal point lands vertically (0..1).
   */
  let { id, ratio, ty = 0.42, tx = 0.5, eager = false, alt, contain = false, fit = true }: { id: string; ratio?: number; ty?: number; tx?: number; eager?: boolean; alt?: string; contain?: boolean; fit?: boolean } = $props();

  const meta = $derived(imageMeta(id));
  const pos = $derived(contain ? '50% 50%' : ratio ? focusPosition(meta, ratio, ty, tx) : meta.focus);
  let loaded = $state(false);
  let failed = $state(false);
  let el: HTMLImageElement | undefined = $state();
  $effect(() => {
    if (el?.complete && el.naturalWidth > 0) loaded = true;
  });
</script>

<span class="img" class:failed class:loaded class:contain>
  {#if !failed}
    <img
      bind:this={el}
      src={meta.src}
      width={meta.w}
      height={meta.h}
      alt={alt ?? meta.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style:object-fit={contain ? 'contain' : 'cover'}
      style:object-position={pos}
      onload={() => (loaded = true)}
      onerror={() => (failed = true)}
    />
  {/if}
</span>

<style>
  .img { display: block; position: absolute; inset: 0; background: linear-gradient(135deg, #2a2119, #151110); }
  .img:not(.loaded):not(.failed):not(.contain) { background: linear-gradient(100deg, #1c1611 30%, #2a2119 50%, #1c1611 70%) 0 0 / 300% 100%; animation: img-sheen 1.6s var(--ease-out) infinite; }
  @keyframes img-sheen { to { background-position: -300% 0; } }
  .img.contain { background: transparent; }
  .img.failed { background: radial-gradient(circle at 50% 35%, #3a2d20, #151110 70%); }
  .img.failed::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 40%, rgba(212, 176, 106, 0.25) 0 18px, transparent 19px); }
  img { width: 100%; height: 100%; opacity: 0; transition: opacity var(--d-slow) var(--ease-out); }
  .loaded img { opacity: 1; }
  @media (prefers-reduced-motion: reduce) { img { transition: none; } }
</style>
