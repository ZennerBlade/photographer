<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fadeIn, sheetIn } from '../lib/motion';
  import Icon from './Icon.svelte';

  let { title, onclose, children, footer }: { title: string; onclose: () => void; children: Snippet; footer?: Snippet } = $props();
  let panel: HTMLDivElement | undefined = $state();
  let dragY = $state(0);
  let startY = 0;
  let dragging = $state(false);

  $effect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel?.focus();
    return () => prev?.focus?.();
  });

  function key(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
    if (e.key === 'Tab' && panel) {
      // minimal focus trap
      const f = [...panel.querySelectorAll<HTMLElement>('button, [href], input, select, [tabindex]:not([tabindex="-1"])')].filter((x) => !x.hasAttribute('disabled'));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  function down(e: PointerEvent) { dragging = true; startY = e.clientY; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }
  function move(e: PointerEvent) { if (dragging) dragY = Math.max(0, e.clientY - startY); }
  function up() { dragging = false; if (dragY > 110) onclose(); dragY = 0; }
</script>

<div class="root" role="presentation" onkeydown={key}>
  <button class="backdrop" aria-label="Close" onclick={onclose} in:fadeIn|global out:fadeIn|global tabindex="-1"></button>
  <div class="panel" bind:this={panel} role="dialog" aria-modal="true" aria-label={title} tabindex="-1" style:transform={dragY ? `translateY(${dragY}px)` : undefined} style:transition={dragging ? 'none' : undefined} in:sheetIn|global out:sheetIn|global={{ duration: 280 }}>
    <div class="grab" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up} role="presentation"><i></i></div>
    <header>
      <h2>{title}</h2>
      <button class="x" onclick={onclose} aria-label="Close"><Icon name="close" size={18} /></button>
    </header>
    <div class="content">{@render children()}</div>
    {#if footer}<footer>{@render footer()}</footer>{/if}
  </div>
</div>

<style>
  .root { position: fixed; inset: 0; z-index: var(--z-sheet); }
  .backdrop { position: absolute; inset: 0; width: 100%; background: rgba(5, 4, 3, 0.66); backdrop-filter: blur(6px); }
  .panel { position: absolute; left: 0; right: 0; bottom: 0; max-height: 86%; display: flex; flex-direction: column; background: linear-gradient(180deg, #1a1511, #14100d 120px); border: 1px solid var(--line-strong); border-bottom: 0; border-radius: 28px 28px 0 0; outline: none; box-shadow: 0 -24px 60px -20px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 240, 215, 0.08); transition: transform var(--d-base) var(--ease-expo); }
  .grab { padding: var(--s-3) 0 var(--s-1); display: grid; place-items: center; touch-action: none; cursor: grab; }
  .grab i { width: 38px; height: 4px; border-radius: 4px; background: var(--line-strong); }
  header { display: flex; justify-content: space-between; align-items: center; padding: var(--s-2) var(--s-5) var(--s-3) var(--s-6); }
  h2 { font-family: var(--font-serif); font-weight: 500; font-size: 26px; }
  .x { width: var(--tap); height: var(--tap); display: grid; place-items: center; border-radius: 50%; color: var(--mute); }
  .x:active { transform: scale(0.9); background: rgba(255, 255, 255, 0.06); }
  .content { overflow-y: auto; padding: var(--s-1) var(--s-6) var(--s-5); scrollbar-width: none; }
  footer { padding: var(--s-4) var(--s-6) calc(var(--s-5) + var(--safe-bottom)); border-top: 1px solid var(--line); display: flex; gap: 10px; background: #14100d; }
</style>
