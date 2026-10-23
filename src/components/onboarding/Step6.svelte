<script lang="ts">
  import { CATEGORIES } from '../../data/seed/categories';
  import { formatINR } from '../../lib/format';
  import { GALLERY_DAYS, newPackage, PREVIEW_HOURS, type Draft, type Errors } from '../../data/userProfiles';
  import Field from './Field.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const e = (k: string) => (show ? (errs[k] ?? '') : '');
  const short = (id: string) => CATEGORIES.find((c) => c.id === id)!.short;
  const price = (s: string) => { const n = Number(s.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? formatINR(n) : ''; };
  const NAMES = ['Essential', 'Signature', 'Grand'];
  const add = () => { const k = newPackage(); k.category = d.categories[0] ?? ''; d.packages.push(k); };
</script>

<h1>Your <i>packages</i></h1>
<p class="onb-lead">Offer 1 to 3 packages. Clients compare these, so keep them simple.</p>

{#each d.packages as k, i (k.key)}
  <section class="pk" aria-label={`Package ${i + 1}`}>
    <div class="top">
      <h2>Package {i + 1}</h2>
      {#if d.packages.length > 1}<button type="button" class="rm" onclick={() => d.packages.splice(i, 1)} aria-label={`Remove package ${i + 1}`}>Remove</button>{/if}
    </div>

    <Field label="Package name" id={`f-name${i}`} error={e(`name${i}`)}>
      <input id={`f-name${i}`} type="text" maxlength="30" placeholder={`For example, ${NAMES[i] ?? 'Essential'}`} bind:value={k.name} />
    </Field>

    {#if d.categories.length > 1}
      <Field label="Made for" id={`f-cat${i}`} group>
        <div class="opts" role="radiogroup" aria-labelledby={`f-cat${i}-l`}>
          {#each d.categories as c}<button type="button" role="radio" aria-checked={(k.category || d.categories[0]) === c} class="opt sm" class:on={(k.category || d.categories[0]) === c} onclick={() => (k.category = c)}>{short(c)}</button>{/each}
        </div>
      </Field>
    {/if}

    <Field label="Price in rupees" id={`f-price${i}`} error={e(`price${i}`)} hint={price(k.price) ? `Clients will see ${price(k.price)}` : ''}>
      <div class="row"><span class="pre">₹</span><input id={`f-price${i}`} type="text" inputmode="numeric" placeholder="45000" bind:value={k.price} /></div>
    </Field>

    <Field label="Hours of shooting" id={`f-hours${i}`} error={e(`hours${i}`)}>
      <div class="row"><input id={`f-hours${i}`} type="text" inputmode="numeric" maxlength="2" style="max-width:120px" placeholder="6" bind:value={k.hours} /><span class="suffix">hours</span></div>
    </Field>

    <Field label="Edited photos delivered" id={`f-photos${i}`} error={e(`photos${i}`)}>
      <div class="row"><input id={`f-photos${i}`} type="text" inputmode="numeric" maxlength="5" style="max-width:150px" placeholder="350" bind:value={k.photos} /><span class="suffix">photos</span></div>
    </Field>

    <Field label="Album included?" id={`f-album${i}`} group>
      <div class="opts" role="radiogroup" aria-labelledby={`f-album${i}-l`}>
        <button type="button" role="radio" aria-checked={k.album} class="opt" class:on={k.album} onclick={() => (k.album = true)}>Yes, an album</button>
        <button type="button" role="radio" aria-checked={!k.album} class="opt" class:on={!k.album} onclick={() => (k.album = false)}>No album</button>
      </div>
    </Field>

    <Field label="First preview photos within" id={`f-prev${i}`} group hint="A quick preview keeps clients happy while you edit.">
      <div class="opts" role="radiogroup" aria-labelledby={`f-prev${i}-l`}>
        {#each PREVIEW_HOURS as h}<button type="button" role="radio" aria-checked={k.previewHours === h} class="opt sm" class:on={k.previewHours === h} onclick={() => (k.previewHours = h)}>{h} hours</button>{/each}
      </div>
    </Field>

    <Field label="Full gallery within" id={`f-gal${i}`} group>
      <div class="opts" role="radiogroup" aria-labelledby={`f-gal${i}-l`}>
        {#each GALLERY_DAYS as g}<button type="button" role="radio" aria-checked={k.galleryDays === g} class="opt sm" class:on={k.galleryDays === g} onclick={() => (k.galleryDays = g)}>{g} days</button>{/each}
      </div>
    </Field>
  </section>
{/each}

{#if d.packages.length < 3}
  <button type="button" class="btn2 full add" onclick={add}>+ Add another package</button>
{:else}
  <p class="hint" style="margin-top:16px">3 packages is the most. That keeps your page easy to read.</p>
{/if}

<style>
  .pk { margin-top: 26px; padding: 4px 18px 22px; border: 1px solid var(--line-strong); border-radius: var(--r-xl); background: linear-gradient(180deg, var(--surf-2), var(--surf)); }
  .top { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; }
  h2 { font-variant-numeric: lining-nums; font-family: var(--font-serif); font-weight: 500; font-size: 26px; color: var(--gold-hi); }
  .rm { min-height: 48px; padding: 0 6px; font-size: 16px; color: var(--err); text-decoration: underline; text-underline-offset: 3px; }
  .add { margin-top: 20px; }
</style>
