<script lang="ts">
  import { push, replace, router } from 'svelte-spa-router';
  import { tick, untrack } from 'svelte';
  import '../styles/onboarding.css';
  import { draft } from '../lib/draft.svelte';
  import { build, firstInvalidStep, PREVIEW_ID, publish, validate, type Draft } from '../data/userProfiles';
  import { refreshUserProfiles, setPreview } from '../data/api';
  import Icon from '../components/Icon.svelte';
  import { pageIn } from '../lib/motion';
  import Step1 from '../components/onboarding/Step1.svelte';
  import Step2 from '../components/onboarding/Step2.svelte';
  import Step3 from '../components/onboarding/Step3.svelte';
  import Step4 from '../components/onboarding/Step4.svelte';
  import Step5 from '../components/onboarding/Step5.svelte';
  import Step6 from '../components/onboarding/Step6.svelte';
  import Step7 from '../components/onboarding/Step7.svelte';
  import Profile from './Profile.svelte';
  import JoinDone from '../components/onboarding/JoinDone.svelte';

  let { params }: { params: { step: string } } = $props();
  const TOTAL = 8;
  const isDone = $derived(params.step === 'done');
  const step = $derived(Math.min(TOTAL, Math.max(1, parseInt(params.step, 10) || 1)));
  const d = $derived(draft.d);
  const errs = $derived(validate(step, d));
  const doneId = $derived(new URLSearchParams(router.querystring ?? '').get('id') ?? '');

  let show = $state(false);
  let busy = $state(false);
  let body: HTMLDivElement | undefined = $state();
  let previewOn = $state(false);

  $effect(() => { draft.load(); });

  // Autosave: any change to the draft schedules a debounced IndexedDB write.
  $effect(() => {
    if (!draft.loaded || isDone) return;
    $state.snapshot(draft.d);
    untrack(() => draft.schedule());
  });

  // New step: reset validation display and scroll to top.
  $effect(() => {
    void params.step;
    untrack(() => { show = false; draft.d.step = step; });
    if (body) body.scrollTop = 0;
  });

  // Step 8 renders the real Profile route against an unsaved preview of the draft.
  const blocker = $derived(step === TOTAL && draft.loaded ? firstInvalidStep(d) : 0);
  $effect(() => {
    if (isDone || step !== TOTAL || !draft.loaded || blocker) return;
    const snap = $state.snapshot(draft.d) as Draft;
    untrack(() => { setPreview(build(PREVIEW_ID, snap, Date.now())); previewOn = true; });
    return () => { previewOn = false; setPreview(null); };
  });

  const TITLES = ['About you', 'What you shoot', 'Your photo', 'Your best work', 'About you', 'Your packages', 'Contact', 'Review'];
  const label = $derived(step === TOTAL ? (d.editingId ? 'Save my changes' : 'Publish my profile') : step === 7 ? 'Review my profile' : 'Continue');

  const go = (n: number) => push(`/join/${n}`);
  function back() {
    if (step > 1) go(step - 1);
    else push('/join');
  }
  async function focusFirstProblem() {
    await tick();
    const el = body?.querySelector<HTMLElement>('.f.bad input, .f.bad textarea, .f.bad button, .f.bad .file');
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el?.focus({ preventScroll: true });
  }
  async function next() {
    if (busy) return;
    if (step < TOTAL) {
      if (Object.keys(errs).length) { show = true; focusFirstProblem(); return; }
      await draft.flush();
      go(step + 1);
      return;
    }
    if (blocker) return;
    busy = true;
    try {
      const snap = $state.snapshot(draft.d) as Draft;
      const r = await publish(snap);
      await refreshUserProfiles();
      await draft.startNew();
      replace(`/join/done?id=${encodeURIComponent(r.id)}`);
    } finally {
      busy = false;
    }
  }
  const status = $derived(draft.status === 'saving' ? 'Saving your answers...' : draft.status === 'saved' ? 'Saved on this phone. You can leave and come back.' : 'Your answers are saved as you go.');
</script>

{#if isDone}
  <div class="onb">
    <div class="onb-body" in:pageIn|global><JoinDone id={doneId} /></div>
  </div>
{:else}
  <div class="onb">
    <header class="onb-head">
      <div class="onb-bar">
        <button type="button" class="onb-back press-sm" onclick={back}><Icon name="back" size={22} stroke={1.8} />Back</button>
        <span class="onb-step" aria-live="polite">Step <b>{step}</b> of {TOTAL}</span>
      </div>
      <div class="onb-prog" role="progressbar" aria-label={TITLES[step - 1]} aria-valuemin="1" aria-valuemax={TOTAL} aria-valuenow={step}>
        {#each Array(TOTAL) as _, i}<i class:on={i < step}></i>{/each}
      </div>
    </header>

    {#if !draft.loaded}
      <div class="onb-body"></div>
    {:else if step === TOTAL}
      <div class="rbody">
        {#if blocker}
          <div class="onb-body" in:pageIn|global>
            <h1>Almost <i>there</i></h1>
            <p class="onb-lead">Step {blocker} still needs a few answers before you can publish.</p>
            <div class="stack"><button type="button" class="btn2 fill full" onclick={() => go(blocker)}>Go to step {blocker}</button></div>
          </div>
        {:else}
          <p class="banner">This is how clients will see you. Scroll to check, then publish.</p>
          <div class="frame">{#if previewOn}<Profile params={{ id: PREVIEW_ID }} />{/if}</div>
        {/if}
      </div>
    {:else}
      <div class="onb-body" bind:this={body}>
        {#key step}
          <div in:pageIn|global>
            {#if step === 1}<Step1 {d} {errs} {show} />
            {:else if step === 2}<Step2 {d} {errs} {show} />
            {:else if step === 3}<Step3 {d} {errs} {show} />
            {:else if step === 4}<Step4 {d} {errs} {show} />
            {:else if step === 5}<Step5 {d} {errs} {show} />
            {:else if step === 6}<Step6 {d} {errs} {show} />
            {:else if step === 7}<Step7 {d} {errs} {show} />{/if}
          </div>
        {/key}
      </div>
    {/if}

    <footer class="onb-foot">
      {#if step < TOTAL}<p class="onb-saved" aria-live="polite">{status}</p>{/if}
      <button type="button" class="onb-go" onclick={next} disabled={busy || (step === TOTAL && !!blocker)}>
        {busy ? 'Publishing...' : label}{#if !busy}<Icon name={step === TOTAL ? 'check' : 'arrow'} size={20} stroke={2} />{/if}
      </button>
    </footer>
  </div>
{/if}

<style>
  .rbody { flex: 1; min-height: 0; display: flex; flex-direction: column; }
  .banner { flex: none; padding: 12px 24px; font-size: 16px; line-height: 1.4; color: var(--gold-hi); background: rgba(212, 176, 106, 0.1); border-bottom: 1px solid var(--line); }
  /* transform makes position:fixed inside the Profile (contact bar) relative to this frame instead of the whole screen */
  .frame { position: relative; flex: 1; min-height: 0; overflow: hidden; transform: translateZ(0); --safe-top: 0px; --safe-bottom: 0px; }
</style>
