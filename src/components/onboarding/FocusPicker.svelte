<script lang="ts">
  import { leadMeta, type StoredPortrait } from '../../data/userProfiles';
  import { focusPosition } from '../../lib/focus';

  let { portrait = $bindable() }: { portrait: StoredPortrait } = $props();
  let url = $state('');
  let box: HTMLDivElement | undefined = $state();
  let dragging = $state(false);

  $effect(() => {
    const u = URL.createObjectURL(portrait.blob);
    url = u;
    return () => URL.revokeObjectURL(u);
  });

  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  function setFrom(ev: PointerEvent) {
    if (!box) return;
    const r = box.getBoundingClientRect();
    portrait.fx = clamp((ev.clientX - r.left) / r.width);
    portrait.fy = clamp((ev.clientY - r.top) / r.height);
  }
  function down(ev: PointerEvent) {
    dragging = true;
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    setFrom(ev);
  }
  function move(ev: PointerEvent) { if (dragging) setFrom(ev); }
  function up() { dragging = false; }
  function key(ev: KeyboardEvent) {
    const step = 0.03;
    const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[ev.key];
    if (!d) return;
    ev.preventDefault();
    portrait.fx = clamp(portrait.fx + d[0]);
    portrait.fy = clamp(portrait.fy + d[1]);
  }

  const meta = $derived(leadMeta(url, portrait, ''));
  const heroPos = $derived(focusPosition(meta, 390 / 340, 0.48));
  const cardPos = $derived(focusPosition(meta, 112 / 140, 0.36));
  const ar = $derived(portrait.w / portrait.h);
</script>

<div class="wrap">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="stage" bind:this={box} style:aspect-ratio={ar} style:width={`min(100%, ${(340 * ar).toFixed(0)}px)`} onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
    {#if url}<img src={url} alt="Your portrait" draggable="false" />{/if}
    <button type="button" class="ring" class:drag={dragging} style:left={`${portrait.fx * 100}%`} style:top={`${portrait.fy * 100}%`} onkeydown={key} aria-label="Face position. Use the arrow keys to move it."><i></i></button>
  </div>
  <p class="how"><b>Drag the ring</b> onto your face, so it is never cut off.</p>

  <div class="prevs">
    <div class="pv"><span>On your card</span><div class="mount">{#if url}<img src={url} alt="" style:object-position={cardPos} />{/if}</div></div>
    <div class="pv"><span>At the top of your profile</span><div class="hero">{#if url}<img src={url} alt="" style:object-position={heroPos} />{/if}</div></div>
  </div>
</div>

<style>
  .wrap { margin-top: 20px; }
  .stage { position: relative; margin: 0 auto; border-radius: var(--r-lg); overflow: hidden; touch-action: none; cursor: grab; background: var(--surf); border: 1px solid var(--line-strong); max-height: 340px; }
  .stage img { width: 100%; height: 100%; display: block; object-fit: cover; user-select: none; -webkit-user-drag: none; pointer-events: none; }
  .ring { position: absolute; width: 84px; height: 84px; margin: -42px 0 0 -42px; border-radius: 50%; border: 3px solid var(--gold-hi); box-shadow: 0 0 0 9999px rgba(8, 6, 4, 0.52), 0 0 0 1px rgba(0, 0, 0, 0.5) inset; touch-action: none; display: grid; place-items: center; transition: transform var(--d-fast); }
  .ring.drag { transform: scale(1.08); }
  .ring i { width: 10px; height: 10px; border-radius: 50%; background: var(--gold-hi); }
  .ring:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
  .how { text-align: center; margin-top: 12px; font-size: 16px; color: var(--ink-soft); }
  .how b { color: var(--gold-hi); font-weight: 600; }
  .prevs { margin-top: 22px; display: grid; grid-template-columns: 96px 140px; gap: 18px; align-items: end; }
  .pv span { display: block; font-size: 14px; color: var(--mute); margin-bottom: 8px; }
  .mount { width: 110px; aspect-ratio: 1; padding: 5px; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(212, 176, 106, 0.35); overflow: hidden; border: 1px solid var(--line-strong); background: var(--surf); }
  .hero { width: 140px; aspect-ratio: 390 / 340; border-radius: 14px; overflow: hidden; border: 1px solid var(--line-strong); background: var(--surf); }
  .mount img, .hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
