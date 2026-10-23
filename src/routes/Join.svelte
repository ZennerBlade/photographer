<script lang="ts">
  import { push } from 'svelte-spa-router';
  import '../styles/onboarding.css';
  import { getMyProfiles, getPhotographer, refreshUserProfiles } from '../data/api';
  import { loadDraft, removeProfile, studioOf, type Draft, type StoredProfile } from '../data/userProfiles';
  import { draft } from '../lib/draft.svelte';
  import { BRAND_NAME } from '../lib/brand';
  import { pageIn } from '../lib/motion';
  import Icon from '../components/Icon.svelte';
  import Img from '../components/Img.svelte';

  let mine = $state.raw<StoredProfile[]>(getMyProfiles());
  let saved = $state.raw<Draft | null>(null);
  let ready = $state(false);
  let confirming = $state('');
  let gone = $state('');
  $effect(() => { loadDraft().then((x) => { saved = x && (x.name || x.portrait || x.categories.length) ? x : null; ready = true; }); });

  const stepsDone = (x: Draft) => Math.max(0, x.step - 1);

  async function start() {
    await draft.startNew();
    push('/join/1');
  }
  async function resume() {
    await draft.load(true);
    push(`/join/${Math.min(8, Math.max(1, draft.d.step))}`);
  }
  async function edit(rec: StoredProfile) {
    await draft.startEdit(rec);
    push('/join/1');
  }
  async function del(id: string) {
    await removeProfile(id);
    await refreshUserProfiles();
    mine = getMyProfiles();
    gone = 'Your demo profile has been deleted.';
    confirming = '';
  }
  const back = () => (history.length > 1 ? history.back() : push('/'));
</script>

<div class="onb">
  <header class="onb-head">
    <div class="onb-bar"><button type="button" class="onb-back press-sm" onclick={back}><Icon name="back" size={22} stroke={1.8} />Back</button></div>
  </header>
  <div class="onb-body" in:pageIn|global>
    {#if mine.length}
      <span class="eyebrow">Your studio</span>
      <h1>Welcome <i>back</i></h1>
      {#each mine as rec (rec.id)}
        {@const p = rec.draft}
        <article class="mine">
          <a class="top" href={`#/photographers/${rec.id}`} aria-label={`View ${studioOf(p)}`}>
            <span class="im">{#await getPhotographer(rec.id) then ph}{#if ph}<Img id={ph.leadImage} ratio={1} ty={0.4} eager />{/if}{/await}</span>
            <span class="tx"><b>{studioOf(p)}</b><small>{p.city === 'Other' ? p.cityOther : p.city} · <span class="newtag">New</span></small></span>
          </a>
          <div class="stack">
            <a class="btn2 fill full" href={`#/photographers/${rec.id}`}>View my profile</a>
            <button type="button" class="btn2 full" onclick={() => edit(rec)}>Edit my profile</button>
            {#if confirming === rec.id}
              <div class="confirm" role="alertdialog" aria-label="Confirm delete">
                <p>Delete your demo profile and all its photos? This cannot be undone.</p>
                <button type="button" class="btn2 danger full" onclick={() => del(rec.id)}>Yes, delete it</button>
                <button type="button" class="btn2 full" onclick={() => (confirming = '')}>No, keep it</button>
              </div>
            {:else}
              <button type="button" class="btn2 danger full" onclick={() => (confirming = rec.id)}>Delete my demo profile</button>
            {/if}
          </div>
        </article>
      {/each}
    {:else}
      <span class="eyebrow">For photographers</span>
      <h1>List your <i>studio</i></h1>
      <p class="onb-lead">Get found by clients across India. Setting up takes about ten minutes, and you can stop and come back at any time.</p>
      {#if gone}<p class="ok" role="status">{gone}</p>{/if}
      <ul class="what">
        <li><span>1</span>Tell us about you and what you shoot</li>
        <li><span>2</span>Add your photo and 4 of your best pictures</li>
        <li><span>3</span>Set your packages and how clients reach you</li>
        <li><span>4</span>Check your page, then publish</li>
      </ul>
      <div class="stack">
        {#if ready && saved}
          <button type="button" class="btn2 fill full" onclick={resume}>Continue where I left off{#if stepsDone(saved)} (step {saved.step}){/if}</button>
          <button type="button" class="btn2 full" onclick={start}>Start again from the beginning</button>
        {:else}
          <button type="button" class="btn2 fill full" onclick={start} disabled={!ready}>Start my profile <Icon name="arrow" size={20} stroke={2} /></button>
        {/if}
      </div>
      <p class="hint note">{BRAND_NAME} is a demo. Your profile is saved only in this browser and you can delete it at any time.</p>
    {/if}
  </div>
</div>

<style>
  .mine { margin-top: 22px; padding: 14px; border: 1px solid var(--line-strong); border-radius: var(--r-xl); background: linear-gradient(180deg, var(--surf-2), var(--surf)); }
  .top { display: flex; gap: 14px; align-items: center; }
  .im { position: relative; flex: none; width: 72px; height: 90px; border-radius: 36px 36px 12px 12px; overflow: hidden; background: var(--surf); }
  .tx b { display: block; font-family: var(--font-serif); font-weight: 500; font-size: 25px; line-height: 1.08; }
  .tx small { color: var(--mute); font-size: 15px; }
  .newtag { color: var(--gold-hi); font-weight: 600; }
  .what { margin-top: 24px; display: flex; flex-direction: column; gap: 14px; }
  .what li { display: flex; gap: 14px; align-items: center; font-size: 17px; line-height: 1.35; color: var(--ink-soft); }
  .what span { flex: none; width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--line-strong); color: var(--gold-hi); display: grid; place-items: center; font-weight: 600; }
  .confirm { padding: 14px; border-radius: var(--r-lg); border: 1px solid var(--err-line); display: flex; flex-direction: column; gap: 10px; }
  .confirm p { font-size: 16px; line-height: 1.45; color: var(--ink); }
  .ok { margin-top: 16px; color: var(--gold-hi); font-size: 16px; }
  .note { margin-top: 20px; }
</style>
