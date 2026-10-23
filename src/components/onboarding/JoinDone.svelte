<script lang="ts">
  import { getPhotographer } from '../../data/api';
  import type { Photographer } from '../../data/types';
  import { BRAND_NAME } from '../../lib/brand';
  import Img from '../Img.svelte';
  import Icon from '../Icon.svelte';
  let { id }: { id: string } = $props();
  let p = $state<Photographer | undefined>();
  let copied = $state(false);
  let input: HTMLInputElement | undefined = $state();
  let timer: ReturnType<typeof setTimeout>;
  $effect(() => { getPhotographer(id).then((x) => (p = x)); });

  const link = $derived(`${location.origin}${location.pathname}#/photographers/${id}`);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  async function copy() {
    let ok = false;
    try { await navigator.clipboard.writeText(link); ok = true; } catch { /* fall back below */ }
    if (!ok && input) {
      input.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
    }
    copied = ok;
    if (!ok) input?.select();
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 3000);
  }
  const share = () => navigator.share({ title: p?.name ?? 'My photography profile', text: `Find me on ${BRAND_NAME}`, url: link }).catch(() => {});
</script>

<div class="done">
  <div class="seal" aria-hidden="true"><Icon name="check" size={34} stroke={2} /></div>
  <h1>You are <i>live</i></h1>
  <p class="onb-lead">{p ? `${p.name} is now in the directory, with a New badge.` : 'Your profile is now in the directory.'} Clients can find it in the list, in filters and in search.</p>

  {#if p}
    <a class="me" href={`#/photographers/${id}`}>
      <span class="im"><Img id={p.leadImage} ratio={1} ty={0.4} eager /></span>
      <span class="tx"><b>{p.name}</b><small>{p.city}</small></span>
      <Icon name="chevron" size={22} />
    </a>
  {/if}

  <div class="f">
    <label for="share-link">Your profile link</label>
    <input id="share-link" type="text" readonly value={link} bind:this={input} onfocus={(e) => e.currentTarget.select()} />
    <p class="hint">Send this link to clients. It opens your profile on this device.</p>
  </div>

  <div class="stack">
    <button type="button" class="btn2 fill full" onclick={copy}>{#if copied}<Icon name="check" size={20} stroke={2.2} />{/if}{copied ? 'Link copied' : 'Copy link'}</button>
    {#if canShare}<button type="button" class="btn2 full" onclick={share}>Share...</button>{/if}
    <a class="btn2 full" href={`#/photographers/${id}`}>View my profile</a>
    <a class="btn2 full" href="#/">Back to home</a>
  </div>
  <p class="hint" role="status" style="margin-top:14px">{copied ? 'The link is copied. Paste it into WhatsApp or a message.' : ''}</p>
  <p class="hint note">Demo only: this profile is saved in this browser, so the link works here but not on other devices. You can edit or delete it any time from "List your studio".</p>
</div>

<style>
  .done { padding: 14px 0 0 10px; }
  .seal { width: 72px; height: 72px; border-radius: 50%; background: var(--gold); color: var(--on-gold); display: grid; place-items: center; margin-bottom: 18px; box-shadow: 0 0 0 8px rgba(212, 176, 106, 0.16); }
  .me { margin-top: 22px; display: flex; align-items: center; gap: 14px; padding: 12px; border: 1px solid var(--line-strong); border-radius: var(--r-xl); background: linear-gradient(180deg, var(--surf-2), var(--surf)); min-height: 76px; }
  .im { position: relative; flex: none; width: 56px; height: 70px; border-radius: 28px 28px 10px 10px; overflow: hidden; }
  .tx { flex: 1; min-width: 0; }
  .tx b { display: block; font-family: var(--font-serif); font-weight: 500; font-size: 23px; line-height: 1.1; }
  .tx small { color: var(--mute); font-size: 15px; }
  input[readonly] { font-size: 16px; }
  .note { margin-top: 18px; }
</style>
