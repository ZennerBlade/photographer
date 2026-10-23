<script lang="ts">
  import type { Snippet } from 'svelte';
  /** Label + control + hint + friendly error. `group` renders a plain label for chip groups (no single input to point at). */
  let { label, id, hint = '', error = '', optional = false, group = false, children }: { label: string; id: string; hint?: string; error?: string; optional?: boolean; group?: boolean; children: Snippet } = $props();
</script>

<div class="f" class:bad={!!error} data-field={id}>
  {#if group}<div class="lbl" id={`${id}-l`}>{label}{#if optional}<span class="tag-opt">optional</span>{/if}</div>
  {:else}<label for={id}>{label}{#if optional}<span class="tag-opt">optional</span>{/if}</label>{/if}
  {@render children()}
  {#if hint}<p class="hint">{hint}</p>{/if}
  {#if error}<p class="err" role="alert">{error}</p>{/if}
</div>
