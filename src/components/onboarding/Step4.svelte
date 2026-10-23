<script lang="ts">
  import { CATEGORIES } from '../../data/seed/categories';
  import type { CategoryId } from '../../data/types';
  import type { Draft, Errors } from '../../data/userProfiles';
  import { downscale } from '../../lib/image';
  import Field from './Field.svelte';
  import BlobImg from './BlobImg.svelte';
  import Icon from '../Icon.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const MAX = 4;
  let busy = $state(false);
  let problem = $state('');
  const label = (c: CategoryId) => CATEGORIES.find((x) => x.id === c)!.short;
  const cats = $derived(d.categories.length ? d.categories : (['portraits'] as CategoryId[]));

  // Photos tagged with a category the photographer later un-picked fall back to their first category.
  $effect(() => {
    for (const im of d.portfolio) if (!cats.includes(im.category)) im.category = cats[0];
  });

  async function add(ev: Event) {
    const input = ev.currentTarget as HTMLInputElement;
    const files = [...(input.files ?? [])].slice(0, MAX - d.portfolio.length);
    input.value = '';
    if (!files.length) return;
    problem = '';
    busy = true;
    let bad = 0;
    for (const f of files) {
      try {
        const s = await downscale(f);
        d.portfolio.push({ id: Math.random().toString(36).slice(2, 9), blob: s.blob, w: s.w, h: s.h, category: cats[0] });
      } catch { bad++; }
    }
    busy = false;
    if (bad) problem = `${bad === 1 ? 'One photo' : `${bad} photos`} could not be read. Please try again with JPG, PNG or WebP files.`;
  }
  const remove = (i: number) => d.portfolio.splice(i, 1);
  const n = $derived(d.portfolio.length);
</script>

<h1>Your best <i>work</i></h1>
<p class="onb-lead">Add 4 photos you are proud of. We need at least 3.</p>

<Field label={`${n} of ${MAX} added`} id="f-portfolio" group error={show ? (errs.portfolio ?? '') : ''} hint={cats.length > 1 ? 'Tap a kind under each photo to say what it shows.' : ''}>
  <div class="grid" role="list">
    {#each d.portfolio as im, i (im.id)}
      <div class="slot" role="listitem">
        <div class="ph"><BlobImg blob={im.blob} alt={`Portfolio photo ${i + 1}`} /></div>
        <button type="button" class="rm" onclick={() => remove(i)} aria-label={`Remove photo ${i + 1}`}><Icon name="close" size={20} stroke={2} /></button>
        {#if cats.length > 1}
          <div class="cs" role="group" aria-label={`What photo ${i + 1} shows`}>
            {#each cats as c}<button type="button" class="c" class:on={im.category === c} aria-pressed={im.category === c} onclick={() => (im.category = c)}>{label(c)}</button>{/each}
          </div>
        {/if}
      </div>
    {/each}
    {#if n < MAX}
      <label class="slot empty">
        <span class="plus" aria-hidden="true">+</span>
        <span class="t">Add photos</span>
        <input class="file" type="file" accept="image/*" multiple onchange={add} aria-label="Add portfolio photos from the gallery" data-testid="portfolio-file" />
      </label>
    {/if}
  </div>
  {#if n < MAX}
    <div class="stack">
      <label class="btn2 full cam">
        <Icon name="camera" size={22} />Take a photo now
        <input class="file" type="file" accept="image/*" capture="environment" onchange={add} aria-label="Take a portfolio photo with the camera" />
      </label>
    </div>
  {/if}
  {#if busy}<p class="hint" role="status">Getting your photos ready...</p>{/if}
  {#if problem}<p class="err" role="alert">{problem}</p>{/if}
</Field>

<style>
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .slot { position: relative; }
  .ph { aspect-ratio: 4 / 5; border-radius: var(--r-md); overflow: hidden; background: var(--surf); border: 1px solid var(--line-strong); }
  .rm { position: absolute; top: 6px; right: 6px; width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: rgba(13, 11, 9, 0.72); border: 1px solid var(--line-strong); color: var(--ink); }
  .cs { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .c { min-height: 40px; padding: 0 12px; border-radius: var(--r-pill); border: 1.5px solid var(--line-strong); font-size: 14px; color: var(--ink-soft); }
  .c.on { background: var(--gold); border-color: var(--gold); color: var(--on-gold); font-weight: 600; }
  .empty { aspect-ratio: 4 / 5; border: 2px dashed var(--line-strong); border-radius: var(--r-md); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; margin: 0; background: var(--surf); }
  .plus { font-size: 44px; line-height: 1; color: var(--gold); font-weight: 300; }
  .t { font-size: 17px; font-weight: 500; color: var(--gold-hi); }
  .file { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; font-size: 0; }
  .cam { position: relative; cursor: pointer; margin: 0; }
</style>
