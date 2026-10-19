<script lang="ts">
  import { pageIn } from '../lib/motion';
</script>

<div class="page nf" in:pageIn|global>
  <span class="eyebrow">Error 404</span>
  <h1>This frame <i>is empty</i>.</h1>
  <p>The page you were looking for has moved or never existed.</p>
  <a class="btn btn-gold" href="#/">Back to Home</a>
</div>

<style>
  .nf { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 16px; padding: 0 var(--gutter); }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: 44px; line-height: 1; }
  h1 i { color: var(--gold-hi); }
  p { color: var(--ink-soft); line-height: 1.6; }
</style>
