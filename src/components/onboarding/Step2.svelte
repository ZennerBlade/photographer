<script lang="ts">
  import type { CategoryId } from '../../data/types';
  import { CATEGORIES } from '../../data/seed/categories';
  import { STYLE_TAGS, STYLE_TITLES, type Draft, type Errors } from '../../data/userProfiles';
  import Field from './Field.svelte';
  import Img from '../Img.svelte';
  import Icon from '../Icon.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const e = (k: string) => (show ? (errs[k] ?? '') : '');
  const toggle = (id: CategoryId) => (d.categories = d.categories.includes(id) ? d.categories.filter((c) => c !== id) : [...d.categories, id]);
  const toggleTag = (t: string) => (d.styleTags = d.styleTags.includes(t) ? d.styleTags.filter((x) => x !== t) : d.styleTags.length < 3 ? [...d.styleTags, t] : d.styleTags);
</script>

<h1>What do you <i>shoot</i>?</h1>
<p class="onb-lead">Tap everything that applies.</p>

<Field label="Kinds of photography" id="f-cats" group error={e('categories')}>
  <div class="cats" role="group" aria-labelledby="f-cats-l">
    {#each CATEGORIES as c}
      <button type="button" class="cat" class:on={d.categories.includes(c.id)} aria-pressed={d.categories.includes(c.id)} onclick={() => toggle(c.id)}>
        <Img id={c.cover} ratio={1.1} ty={0.4} />
        <span class="shade"></span>
        <span class="tick"><Icon name="check" size={18} stroke={2.2} /></span>
        <b>{c.short}</b>
      </button>
    {/each}
  </div>
</Field>

<Field label="Your signature style" id="f-style" error={e('styleTitle')} hint="A short name for your look. Tap a suggestion or type your own.">
  <input id="f-style" type="text" maxlength="40" placeholder="For example, Candid & natural" bind:value={d.styleTitle} aria-invalid={!!e('styleTitle')} />
  <div class="opts sug">
    {#each STYLE_TITLES as t}<button type="button" class="opt sm" class:on={d.styleTitle === t} onclick={() => (d.styleTitle = t)}>{t}</button>{/each}
  </div>
</Field>

<Field label="Style tags" id="f-tags" group optional hint={d.styleTags.length >= 3 ? 'That is 3, the most you can pick. Tap a gold one to remove it.' : `Pick up to 3. ${d.styleTags.length} chosen.`}>
  <div class="opts" role="group" aria-labelledby="f-tags-l">
    {#each STYLE_TAGS as t}
      <button type="button" class="opt sm" class:on={d.styleTags.includes(t)} aria-pressed={d.styleTags.includes(t)} disabled={d.styleTags.length >= 3 && !d.styleTags.includes(t)} onclick={() => toggleTag(t)}>{t}</button>
    {/each}
  </div>
</Field>

<style>
  .cats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .cat { position: relative; aspect-ratio: 1.1; border-radius: var(--r-lg); overflow: hidden; border: 2px solid var(--line); text-align: left; background: var(--surf); }
  .cat.on { border-color: var(--gold-hi); box-shadow: 0 0 0 2px rgba(240, 217, 164, 0.25); }
  .shade { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(8, 6, 4, 0.9), transparent 62%); }
  .cat b { position: absolute; left: 12px; right: 12px; bottom: 10px; font-family: var(--font-serif); font-size: 21px; font-weight: 500; line-height: 1.05; }
  .tick { position: absolute; top: 8px; right: 8px; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: rgba(13, 11, 9, 0.55); border: 1.5px solid rgba(255, 255, 255, 0.5); color: transparent; }
  .cat.on .tick { background: var(--gold); border-color: var(--gold); color: var(--on-gold); }
  .sug { margin-top: 12px; }
</style>
