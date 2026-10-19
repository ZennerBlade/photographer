<script lang="ts">
  type Name = 'search' | 'home' | 'grid' | 'heart' | 'heart-fill' | 'back' | 'phone' | 'chat' | 'mail' | 'sliders' | 'sort' | 'close' | 'check' | 'chevron' | 'pin' | 'arrow' | 'camera';
  let { name, size = 20, stroke = 1.3 }: { name: Name; size?: number; stroke?: number } = $props();
</script>

<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  {#if name === 'search'}<circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" />
  {:else if name === 'home'}<path d="M4 11 12 4l8 7v9H4z" />
  {:else if name === 'grid'}<rect x="4" y="4" width="6.5" height="6.5" /><rect x="13.5" y="4" width="6.5" height="6.5" /><rect x="4" y="13.5" width="6.5" height="6.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" />
  {:else if name === 'heart'}<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  {:else if name === 'heart-fill'}<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="currentColor" />
  {:else if name === 'back'}<path d="M15 5l-7 7 7 7" />
  {:else if name === 'phone'}<path d="M6 4h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 2-2z" />
  {:else if name === 'chat'}<path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z" />
  {:else if name === 'mail'}<rect x="3.5" y="5.5" width="17" height="13" /><path d="m4 7 8 6 8-6" />
  {:else if name === 'sliders'}<path d="M4 7h9M17 7h3M4 17h3M11 17h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" />
  {:else if name === 'sort'}<path d="M8 5v14M8 19l-3-3M8 19l3-3M16 19V5M16 5l-3 3M16 5l3 3" />
  {:else if name === 'close'}<path d="M6 6l12 12M18 6 6 18" />
  {:else if name === 'check'}<path d="m5 12.5 4.5 4.5L19 7.5" />
  {:else if name === 'chevron'}<path d="m9 6 6 6-6 6" />
  {:else if name === 'pin'}<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.400-6.500 11-6.500 11z" /><circle cx="12" cy="10" r="2.200" />
  {:else if name === 'arrow'}<path d="M5 12h14M13 6l6 6-6 6" />
  {:else if name === 'camera'}<path d="M4 8h3l1.500-2h7L17 8h3v11H4z" /><circle cx="12" cy="13.500" r="3.500" />
  {/if}
</svg>
