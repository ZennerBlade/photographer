<script lang="ts">
  import Router, { router } from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import List from './routes/List.svelte';
  import Profile from './routes/Profile.svelte';
  import Saved from './routes/Saved.svelte';
  import NotFound from './routes/NotFound.svelte';
  import Join from './routes/Join.svelte';
  import Onboarding from './routes/Onboarding.svelte';
  import TabBar from './components/TabBar.svelte';

  const routes = {
    '/': Home,
    '/photographers': List,
    '/photographers/:id': Profile,
    '/saved': Saved,
    '/join': Join,
    '/join/:step': Onboarding,
    '*': NotFound,
  };
  const hideTabs = $derived(/^\/photographers\/[^/]+/.test(router.location));
  const known = $derived(router.location === '/' || router.location === '/saved' || router.location.startsWith('/photographers'));
</script>

<div class="device-wrap">
  <div class="device">
    <div class="notch" aria-hidden="true"></div>
    <Router {routes} />
    {#if !hideTabs && known}<div class="bar-fade" aria-hidden="true"></div><TabBar path={router.location} />{/if}
  </div>
</div>
