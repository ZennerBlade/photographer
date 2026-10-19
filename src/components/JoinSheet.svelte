<script lang="ts">
  import Sheet from './Sheet.svelte';
  let { onclose }: { onclose: () => void } = $props();
</script>

<Sheet title="Join the directory" {onclose}>
  <p class="copy">Photographer profiles are coming soon. Soon you will be able to publish your portfolio, signature style and packages, and take enquiries straight to your phone.</p>
  <p class="copy dim">This demo has no sign-up. Nothing is collected or stored.</p>
  {#snippet footer()}<button class="btn btn-gold" style="flex:1" onclick={onclose}>Got it</button>{/snippet}
</Sheet>

<style>
  .copy { font-size: 14px; line-height: 1.65; color: var(--ink-soft); margin-bottom: 12px; }
  .dim { color: var(--mute); font-size: 12.5px; }
</style>
