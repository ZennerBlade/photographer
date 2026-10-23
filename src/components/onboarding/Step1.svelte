<script lang="ts">
  import type { Draft, Errors } from '../../data/userProfiles';
  import { CITIES } from '../../data/seed/categories';
  import Field from './Field.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const e = (k: string) => (show ? (errs[k] ?? '') : '');
</script>

<h1>Let's start with <i>you</i></h1>
<p class="onb-lead">Just the basics. You can change anything later.</p>

<Field label="Your name" id="f-name" error={e('name')}>
  <input id="f-name" type="text" autocomplete="name" placeholder="For example, Rohan Kapoor" bind:value={d.name} aria-invalid={!!e('name')} />
</Field>

<Field label="Studio name" id="f-studio" optional hint={`Leave it empty and we will use "${d.name.trim() || 'Your name'} Photography".`}>
  <input id="f-studio" type="text" autocomplete="organization" placeholder={`${d.name.trim() || 'Your name'} Photography`} bind:value={d.studio} />
</Field>

<Field label="Which city do you work in?" id="f-city" group error={e('city')}>
  <div class="opts" role="radiogroup" aria-labelledby="f-city-l">
    {#each [...CITIES, 'Other'] as c}
      <button type="button" role="radio" aria-checked={d.city === c} class="opt" class:on={d.city === c} onclick={() => (d.city = c)}>{c}</button>
    {/each}
  </div>
</Field>
{#if d.city === 'Other'}
  <Field label="Name of your city or town" id="f-cityOther" error={e('cityOther')}>
    <input id="f-cityOther" type="text" autocomplete="address-level2" placeholder="For example, Pune" bind:value={d.cityOther} />
  </Field>
{/if}

<Field label="Neighbourhood" id="f-area" optional hint="For example, Vaishali Nagar. Leave it empty if you cover the whole city.">
  <input id="f-area" type="text" placeholder="Where is your studio?" bind:value={d.area} />
</Field>

<Field label="Years of experience" id="f-years" error={e('years')} hint="Type 0 if you are just starting out.">
  <div class="row">
    <input id="f-years" type="text" inputmode="numeric" maxlength="2" style="max-width:120px" placeholder="8" bind:value={d.years} aria-invalid={!!e('years')} />
    <span class="suffix">years</span>
  </div>
</Field>
