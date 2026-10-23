<script lang="ts">
  import Sheet from './Sheet.svelte';
  import Icon from './Icon.svelte';
  let { onclose }: { onclose: () => void } = $props();
</script>

<Sheet title="List your studio" {onclose}>
  <p class="copy">Create your profile in about ten minutes: your photos, your style, your packages. Clients can then find you and message you straight on WhatsApp.</p>
  <p class="copy dim">This is a demo. Your profile is saved only in this browser, and you can delete it at any time.</p>
  {#snippet footer()}<a class="btn btn-gold go" href="#/join" onclick={onclose}>Join as a photographer <Icon name="arrow" size={18} /></a>{/snippet}
</Sheet>

<style>
  .copy { font-size: 16px; line-height: 1.6; color: var(--ink-soft); margin-bottom: 12px; font-weight: 400; }
  .dim { color: var(--mute); font-size: 14px; }
  .go { flex: 1; height: 56px; font-size: 16px; }
</style>
