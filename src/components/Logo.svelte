<script lang="ts">
  import { BRAND_NAME } from '../lib/brand';
  let { size = 26, word = true }: { size?: number; word?: boolean } = $props();
</script>

<span class="logo" role="img" aria-label={BRAND_NAME}>
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="var(--gold)" />
    <g stroke="var(--bg)" stroke-width="1.9" stroke-linecap="round" fill="none">
      <path d="M24.00 16.00L38.62 7.56" /><path d="M30.93 20.00L45.55 28.44" /><path d="M30.93 28.00L30.93 44.88" />
      <path d="M24.00 32.00L9.38 40.44" /><path d="M17.07 28.00L2.45 19.56" /><path d="M17.07 20.00L17.07 3.12" />
    </g>
    <path d="M24 16L30.93 20V28L24 32L17.07 28V20Z" fill="var(--bg)" />
  </svg>
  {#if word}<span class="wm">Aperta</span>{/if}
</span>

<style>
  .logo { display: inline-flex; align-items: center; gap: 10px; }
  svg { flex: none; display: block; }
  .wm { font-family: var(--font-serif); font-weight: 500; font-size: 26px; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1; color: var(--ink); }
</style>
