<script lang="ts">
  import Icon from './Icon.svelte';
  import { saved } from '../lib/saved.svelte';
  import { pop } from '../lib/motion';

  let { id, name, glass = true }: { id: string; name: string; glass?: boolean } = $props();
  const on = $derived(saved.has(id));
  let btn: HTMLButtonElement | undefined = $state();

  function toggle(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    saved.toggle(id);
    if (btn) pop(btn);
  }
</script>

<button bind:this={btn} class="heart" class:glass class:on onclick={toggle} aria-pressed={on} aria-label={on ? `Remove ${name} from saved` : `Save ${name}`}>
  <Icon name={on ? 'heart-fill' : 'heart'} size={18} />
</button>

<style>
  .heart { width: var(--tap); height: var(--tap); border-radius: 50%; display: grid; place-items: center; color: var(--ink); }
  .glass { background: rgba(13, 11, 9, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--line); }
  .on { color: var(--gold-hi); }
  .on :global(svg) { filter: drop-shadow(0 0 6px rgba(212, 176, 106, 0.5)); }
</style>
