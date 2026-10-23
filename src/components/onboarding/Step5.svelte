<script lang="ts">
  import { BIO_MAX, BIO_MIN, type Draft, type Errors } from '../../data/userProfiles';
  import Field from './Field.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const len = $derived(d.bio.trim().length);
  const example = 'I have photographed weddings in Jaipur for 12 years. I work quietly from the edges so the day stays yours, and most couples tell me they forgot I was there. I love golden-hour portraits and the small moments between the rituals.';
</script>

<h1>Tell your <i>story</i></h1>
<p class="onb-lead">A few friendly sentences. Say who you shoot for and what makes your work different.</p>

<Field label="About you" id="f-bio" error={show ? (errs.bio ?? '') : ''}>
  <textarea id="f-bio" rows="8" maxlength={BIO_MAX} placeholder={`For example: ${example}`} bind:value={d.bio} aria-describedby="bio-count"></textarea>
  <p class="count" id="bio-count" class:ok={len >= BIO_MIN} aria-live="polite">{d.bio.length} / {BIO_MAX} letters{len < BIO_MIN ? ` (write at least ${BIO_MIN})` : ''}</p>
</Field>

<style>
  .count { margin-top: 8px; text-align: right; font-size: 15px; color: var(--mute); }
  .count.ok { color: var(--gold-hi); }
</style>
