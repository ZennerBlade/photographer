<script lang="ts">
  import Icon from './Icon.svelte';
  import { session } from '../lib/session.svelte';
  import { saved } from '../lib/saved.svelte';

  let { path }: { path: string } = $props();
  const tabs = $derived([
    { href: '#/', label: 'Home', icon: 'home' as const, on: path === '/' },
    { href: `#/photographers${session.listQuery ? '?' + session.listQuery : ''}`, label: 'Photographers', icon: 'grid' as const, on: path.startsWith('/photographers') },
    { href: '#/saved', label: 'Saved', icon: 'heart' as const, on: path === '/saved' },
  ]);
</script>

<nav class="tabs" aria-label="Main">
  {#each tabs as t}
    <a href={t.href} class:on={t.on} aria-current={t.on ? 'page' : undefined}>
      <span class="ic"><Icon name={t.icon} size={22} />{#if t.icon === 'heart' && saved.ids.length}<em>{saved.ids.length}</em>{/if}</span>
      <span class="lb">{t.label}</span>
    </a>
  {/each}
</nav>

<style>
  .tabs { position: fixed; left: 16px; right: 16px; bottom: calc(16px + var(--safe-bottom)); height: 64px; border-radius: var(--r-pill); background: var(--glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--line); display: flex; justify-content: space-around; align-items: center; z-index: var(--z-tabs); box-shadow: 0 14px 30px -12px rgba(0, 0, 0, 0.7); }
  a { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: var(--mute); transition: color var(--d-fast); }
  a.on { color: var(--gold-hi); }
  .ic { position: relative; display: grid; place-items: center; }
  em { position: absolute; top: -6px; right: -10px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 8px; background: var(--gold); color: var(--on-gold); font-style: normal; font-size: 10px; font-weight: 600; display: grid; place-items: center; }
  .lb { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; }
</style>
