<script lang="ts">
  import type { Draft, Errors } from '../../data/userProfiles';
  import { downscale } from '../../lib/image';
  import Field from './Field.svelte';
  import FocusPicker from './FocusPicker.svelte';
  import Icon from '../Icon.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  let busy = $state(false);
  let problem = $state('');

  async function pick(ev: Event) {
    const input = ev.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    problem = '';
    busy = true;
    try {
      const s = await downscale(file);
      d.portrait = { blob: s.blob, w: s.w, h: s.h, fx: 0.5, fy: 0.3 };
    } catch {
      problem = 'We could not read that photo. Please try a different one (JPG, PNG or WebP).';
    } finally {
      busy = false;
    }
  }
</script>

<h1>A photo of <i>you</i></h1>
<p class="onb-lead">Clients like to see who they are hiring.</p>

{#if !d.portrait}<div class="tip">
  <span class="ic"><Icon name="camera" size={22} /></span>
  <div><b>A quick tip</b><p>A well-lit photo of you with your camera builds trust. Face a window, and smile.</p></div>
</div>{/if}

<Field label={d.portrait ? 'Your photo' : 'Add your photo'} id="f-portrait" group error={show ? (errs.portrait ?? '') : ''}>
  {#if d.portrait}
    <FocusPicker bind:portrait={d.portrait} />
  {/if}
  <div class="stack" style:margin-top={d.portrait ? '22px' : '4px'}>
    <label class="btn2 full" class:fill={!d.portrait}>
      <Icon name="camera" size={22} />{d.portrait ? 'Take a new photo' : 'Take a photo now'}
      <input class="file" type="file" accept="image/*" capture="user" onchange={pick} aria-label="Take a photo with the camera" />
    </label>
    <label class="btn2 full">
      {d.portrait ? 'Choose a different photo' : 'Choose from my gallery'}
      <input class="file" type="file" accept="image/*" onchange={pick} aria-label="Choose a photo from the gallery" data-testid="portrait-file" />
    </label>
  </div>
  {#if busy}<p class="hint" role="status">Getting your photo ready...</p>{/if}
  {#if problem}<p class="err" role="alert">{problem}</p>{/if}
</Field>

<style>
  .btn2 { position: relative; cursor: pointer; margin: 0; }
  .file { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; font-size: 0; }
</style>
