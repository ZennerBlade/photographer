<script lang="ts">
  /** Shows an in-memory Blob (object URL created and revoked for us). */
  let { blob, alt = '', cover = true, pos = '50% 50%' }: { blob: Blob; alt?: string; cover?: boolean; pos?: string } = $props();
  let url = $state('');
  $effect(() => {
    const u = URL.createObjectURL(blob);
    url = u;
    return () => URL.revokeObjectURL(u);
  });
</script>

{#if url}<img src={url} {alt} style:object-fit={cover ? 'cover' : 'contain'} style:object-position={pos} />{/if}

<style>
  img { width: 100%; height: 100%; display: block; }
</style>
