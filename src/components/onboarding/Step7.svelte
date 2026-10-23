<script lang="ts">
  import { normalisePhone, type Draft, type Errors } from '../../data/userProfiles';
  import Field from './Field.svelte';
  let { d, errs, show }: { d: Draft; errs: Errors; show: boolean } = $props();
  const e = (k: string) => (show ? (errs[k] ?? '') : '');
  // WhatsApp follows the phone number until the photographer edits it themselves.
  function onPhone() { if (!d.waTouched) d.whatsapp = d.phone; }
  const tidy = (k: 'phone' | 'whatsapp') => { const n = normalisePhone(d[k]); if (n) d[k] = n; };
</script>

<h1>How clients <i>reach you</i></h1>
<p class="onb-lead">Clients will tap these to call, message or email you. Only enter details you are happy to share.</p>

<Field label="Mobile number" id="f-phone" error={e('phone')} hint="10 digits. We add +91 for you.">
  <input id="f-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="98765 43210" bind:value={d.phone} oninput={onPhone} onblur={() => tidy('phone')} aria-invalid={!!e('phone')} />
</Field>

<Field label="WhatsApp number" id="f-whatsapp" error={e('whatsapp')} hint={d.waTouched ? '' : 'Filled in from your mobile number. Change it if your WhatsApp is different.'}>
  <input id="f-whatsapp" type="tel" inputmode="tel" placeholder="98765 43210" bind:value={d.whatsapp} oninput={() => (d.waTouched = true)} onblur={() => tidy('whatsapp')} aria-invalid={!!e('whatsapp')} />
</Field>

<Field label="Email" id="f-email" error={e('email')}>
  <input id="f-email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" bind:value={d.email} aria-invalid={!!e('email')} />
</Field>
