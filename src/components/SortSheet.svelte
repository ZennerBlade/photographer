<script lang="ts">
  import type { SortKey } from '../data/types';
  import { SORTS } from '../lib/filters';
  import Sheet from './Sheet.svelte';
  import Icon from './Icon.svelte';

  let { sort, onpick, onclose }: { sort: SortKey; onpick: (s: SortKey) => void; onclose: () => void } = $props();
</script>

<Sheet title="Sort by" {onclose}>
  <ul role="radiogroup" aria-label="Sort by">
    {#each SORTS as s}
      <li>
        <button role="radio" aria-checked={sort === s.id} class:on={sort === s.id} onclick={() => onpick(s.id)}>
          <span>{s.label}</span>{#if sort === s.id}<Icon name="check" size={18} />{/if}
        </button>
      </li>
    {/each}
  </ul>
</Sheet>

<style>
  button { width: 100%; min-height: 52px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: var(--ink-soft); border-bottom: 1px solid var(--line); }
  li:last-child button { border: 0; }
  .on { color: var(--gold-hi); }
</style>
