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
  .tabs { position: fixed; left: 16px; right: 16px; bottom: calc(16px + var(--safe-bottom)); height: 64px; border-radius: var(--r-pill); isolation: isolate; overflow: hidden; display: flex; justify-content: space-around; align-items: center; z-index: var(--z-tabs);
    background: linear-gradient(180deg, rgba(255, 240, 215, 0.10) 0%, rgba(255, 240, 215, 0.03) 45%, rgba(20, 16, 12, 0.18) 100%), rgba(22, 18, 14, 0.55);
    backdrop-filter: blur(24px) saturate(180%) brightness(0.9);
    border: 1px solid rgba(255, 236, 200, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 245, 225, 0.28), inset 0 -1px 0 rgba(0, 0, 0, 0.35), inset 0 0 18px rgba(240, 217, 164, 0.06), 0 18px 36px -14px rgba(0, 0, 0, 0.8); }
  /* specular sheen across the top edge */
  .tabs::before { content: ''; position: absolute; inset: 0 0 50% 0; border-radius: inherit; background: linear-gradient(180deg, rgba(255, 248, 232, 0.14), transparent); pointer-events: none; z-index: -1; }
  @supports not (backdrop-filter: blur(1px)) { .tabs { background: rgba(22, 18, 14, 0.96); } }
  a { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: var(--mute); text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); transition: color var(--d-fast); }
  a.on { color: var(--gold-hi); }
  .ic { position: relative; display: grid; place-items: center; }
  em { position: absolute; top: -6px; right: -10px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 8px; background: var(--gold); color: var(--on-gold); font-style: normal; font-size: 10px; font-weight: 600; display: grid; place-items: center; }
  .lb { font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; }
</style>
