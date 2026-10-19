<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { tick } from 'svelte';
  import { getPhotographer, getPortfolio, getPackages, getCategories } from '../data/api';
  import type { CategoryId, Package, Photographer, PortfolioImage } from '../data/types';
  import { formatINR, formatRating } from '../lib/format';
  import { mailUrl, telUrl, whatsappUrl } from '../lib/contact';
  import { pageIn } from '../lib/motion';
  import Icon from '../components/Icon.svelte';
  import Img from '../components/Img.svelte';
  import HeartButton from '../components/HeartButton.svelte';
  import Viewer from '../components/Viewer.svelte';
  import DemoNotice from '../components/DemoNotice.svelte';
  import NotFound from './NotFound.svelte';

  let { params }: { params: { id: string } } = $props();
  const catList = getCategories();
  const label = (c: CategoryId) => catList.find((x) => x.id === c)!.label;

  let p = $state<Photographer | null | undefined>(undefined);
  let portfolio = $state<PortfolioImage[]>([]);
  let packages = $state<Package[]>([]);
  let tab = $state<'all' | CategoryId>('all');
  let viewerAt = $state<number | null>(null);
  let pkg = $state<Package | null>(null);
  let pulse = $state(false);
  let page: HTMLDivElement | undefined = $state();
  let aboutEl: HTMLParagraphElement | undefined = $state();
  let expanded = $state(false);
  let overflowing = $state(false);

  $effect(() => {
    const id = params.id;
    p = undefined; tab = 'all'; pkg = null; expanded = false;
    Promise.all([getPhotographer(id), getPortfolio(id), getPackages(id)]).then(async ([ph, pf, pk]) => {
      p = ph ?? null; portfolio = pf; packages = pk;
      await tick();
      if (aboutEl) overflowing = aboutEl.scrollHeight > aboutEl.clientHeight + 2;
    });
  });

  const shown = $derived(tab === 'all' ? portfolio : portfolio.filter((i) => i.category === tab));
  const groups = $derived(p ? p.categories.filter((c) => packages.some((k) => k.category === c)) : []);
  const nameParts = $derived(p ? { head: p.name.split(' ').slice(0, -1).join(' '), last: p.name.split(' ').slice(-1)[0] } : { head: '', last: '' });

  function back() {
    if (history.length > 1) history.back();
    else push('/photographers');
  }
  function choose(k: Package) {
    pkg = pkg?.id === k.id ? null : k;
    pulse = false;
    requestAnimationFrame(() => (pulse = !!pkg));
  }
  function scrolled() {
    if (page) heroShift = Math.min(page.scrollTop, 400) * 0.25;
  }
  let heroShift = $state(0);
</script>

{#if p === null}
  <NotFound />
{:else if p}
  <div class="page" bind:this={page} onscroll={scrolled} in:pageIn|global>
    <div class="hero">
      <div class="himg" style:transform={`translateY(${heroShift}px) scale(1.06)`}><Img id={p.leadImage} ratio={390 / 340} ty={0.48} eager /></div>
      <div class="shade"></div>
    </div>
    <div class="nav">
      <button class="round press-sm" onclick={back} aria-label="Back"><Icon name="back" size={20} /></button>
      <HeartButton id={p.id} name={p.name} />
    </div>

    <div class="hd">
      <span class="eyebrow">{p.categories.map(label).join(' · ')} · {p.city}</span>
      <h1>{nameParts.head} <i>{nameParts.last}</i></h1>
      <p class="led">Led by <b>{p.leadName}</b></p>
      <p class="tag">{p.tagline}</p>
      <div class="meta"><span class="st">★ {formatRating(p.rating)}</span><span>{p.reviewCount} reviews</span><span>{p.yearsExperience} yrs</span><span class="loc"><Icon name="pin" size={13} /> {p.area}</span></div>
    </div>

    <div class="sec"><h2>About</h2></div>
    <p class="ab" class:clamp={!expanded} bind:this={aboutEl}>{p.about}</p>
    {#if overflowing || expanded}
      <button class="more" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>{expanded ? 'Read less' : 'Read more'}</button>
    {/if}

    <div class="sec"><h2>Signature style</h2></div>
    <div class="sig">
      <span class="eyebrow">The look</span>
      <h3>{p.signatureStyle.title}</h3>
      <ul>{#each p.signatureStyle.bullets as b}<li>{b}</li>{/each}</ul>
      <div class="tags">{#each p.signatureStyle.tags as t}<span>{t}</span>{/each}</div>
    </div>

    <div class="sec"><h2>Portfolio</h2><span class="n">{portfolio.length} photographs</span></div>
    {#if p.categories.length > 1}
      <div class="tabs" role="tablist" aria-label="Portfolio category">
        <button role="tab" aria-selected={tab === 'all'} class:on={tab === 'all'} onclick={() => (tab = 'all')}>All</button>
        {#each p.categories as c}<button role="tab" aria-selected={tab === c} class:on={tab === c} onclick={() => (tab = c)}>{label(c)}</button>{/each}
      </div>
    {/if}
    <div class="grid">
      {#each shown as img, i (img.id)}
        <button class="tile stagger" style:--i={Math.min(i, 6)} onclick={() => (viewerAt = i)} aria-label={`Open photograph ${i + 1} of ${shown.length}`}>
          <Img id={img.image} ratio={4 / 5} ty={0.38} />
        </button>
      {/each}
    </div>

    <div class="sec"><h2>Packages</h2><span class="n">INR</span></div>
    {#each groups as g}
      {#if groups.length > 1}<p class="grp">{label(g)}</p>{/if}
      {#each packages.filter((k) => k.category === g) as k (k.id)}
        <button class="pkg" class:hot={k.popular} class:sel={pkg?.id === k.id} onclick={() => choose(k)} aria-pressed={pkg?.id === k.id}>
          <div class="pl">
            {#if k.popular}<span class="badge">Most popular</span>{/if}
            <b>{k.name}</b>
            <small>{k.duration}</small>
            <ul>{#each k.deliverables as d}<li><Icon name="check" size={13} stroke={1.6} />{d}</li>{/each}</ul>
          </div>
          <div class="pp">{formatINR(k.price)}</div>
        </button>
      {/each}
    {/each}
    <p class="note">Prices are indicative. Final terms are agreed directly with {p.name}. Tap a package to attach it to your enquiry.</p>
    <DemoNotice />
    <div class="spacer"></div>
  </div>

  <div class="cta-wrap">
    {#if pkg}
      <div class="chosen"><span>Enquiring about <b>{pkg.name}</b> · {formatINR(pkg.price)}</span><button onclick={() => (pkg = null)} aria-label="Clear package"><Icon name="close" size={14} /></button></div>
    {/if}
    <div class="cta" class:pulse>
      <a class="p" href={whatsappUrl(p, pkg ?? undefined)} target="_blank" rel="noopener"><Icon name="chat" size={18} />WhatsApp</a>
      <a href={telUrl(p)}><Icon name="phone" size={18} />Call</a>
      <a href={mailUrl(p, pkg ?? undefined)}><Icon name="mail" size={18} />Email</a>
    </div>
  </div>

  {#if viewerAt !== null}
    <Viewer ids={shown.map((i) => i.image)} start={viewerAt} onclose={() => (viewerAt = null)} />
  {/if}
{:else}
  <div class="page"><div class="loading skeleton"></div><div class="sk-body"><span class="skeleton sk-line" style="width:40%;height:10px"></span><span class="skeleton sk-line" style="width:78%;height:32px;margin-top:12px"></span><span class="skeleton sk-line" style="width:55%;margin-top:12px"></span><span class="skeleton sk-line" style="width:100%;margin-top:32px"></span><span class="skeleton sk-line" style="width:92%;margin-top:8px"></span><span class="skeleton sk-line" style="width:84%;margin-top:8px"></span></div></div>
{/if}

<style>
  .hero { position: relative; height: 340px; overflow: hidden; }
  .himg { position: absolute; inset: 0; will-change: transform; }
  .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 24%, rgba(13, 11, 9, 0.55) 66%, var(--bg) 99%), linear-gradient(0deg, transparent 55%, rgba(13, 11, 9, 0.35)); }
  .nav { position: absolute; top: calc(var(--safe-top) + 10px); left: 14px; right: 14px; display: flex; justify-content: space-between; z-index: 3; }
  .round { width: var(--tap); height: var(--tap); border-radius: 50%; background: rgba(13, 11, 9, 0.5); backdrop-filter: blur(12px); display: grid; place-items: center; border: 1px solid var(--line); }
  .hd { position: relative; z-index: 3; margin-top: -92px; padding: 0 var(--gutter); }
  h1 { font-family: var(--font-serif); font-weight: 500; font-size: var(--t-profile); line-height: 1; margin-top: var(--s-2); letter-spacing: -0.012em; text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55); }
  h1 i { color: var(--gold-hi); }
  .tag { font-family: var(--font-serif); font-style: italic; font-size: 19px; line-height: 1.25; color: var(--ink-soft); margin-top: var(--s-2); }
  .led { margin-top: var(--s-3); font-size: var(--t-sm); color: var(--mute); }
  .led b { color: var(--gold-hi); font-weight: 500; }
  .meta { display: flex; flex-wrap: wrap; gap: var(--s-2) var(--s-4); font-size: var(--t-xs); color: var(--mute); margin-top: var(--s-3); padding-top: var(--s-3); border-top: 1px solid var(--line); align-items: center; }
  .meta .st { color: var(--gold); }
  .loc { display: inline-flex; align-items: center; gap: 4px; }
  .sec :global(.n), .n { font-size: var(--t-xs); color: var(--mute); letter-spacing: 0.1em; }
  .ab { font-size: var(--t-base); line-height: 1.7; max-width: 62ch; color: var(--ink-soft); margin: 0 var(--gutter); }
  .ab.clamp { display: -webkit-box; -webkit-line-clamp: 4; line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .more { margin: var(--s-1) var(--gutter) 0; min-height: var(--tap); color: var(--gold); font-size: var(--t-xs); font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
  .sig { margin: 0 var(--gutter); padding: var(--s-5); border: 1px solid var(--line); border-radius: var(--r-xl); background: linear-gradient(180deg, var(--surf-2), var(--surf)); box-shadow: var(--shadow-card); }
  .sig h3 { margin: var(--s-2) 0 var(--s-3); font-family: var(--font-serif); font-weight: 500; font-style: italic; font-size: var(--t-h3); color: var(--gold-hi); }
  .sig li { font-size: var(--t-sm); padding: var(--s-3) 0; border-top: 1px solid var(--line); color: var(--ink-soft); line-height: 1.45; }
  .tags { display: flex; flex-wrap: wrap; gap: var(--s-2) 6px; margin-top: var(--s-3); }
  .tags span { font-size: 11px; letter-spacing: 0.04em; color: var(--gold-hi); border: 1px solid var(--line-strong); padding: 3px 10px; border-radius: var(--r-pill); }
  .tabs { display: flex; gap: 8px; padding: 0 var(--gutter) var(--s-4); overflow-x: auto; scrollbar-width: none; }
  .tabs::-webkit-scrollbar { display: none; }
  .tabs button { flex: none; min-height: 38px; padding: 0 16px; border: 1px solid var(--line-strong); border-radius: var(--r-pill); font-size: var(--t-sm); color: var(--ink-soft); }
  .tabs button:active { transform: scale(0.95); }
  .tabs button.on { background: var(--gold); border-color: var(--gold); color: var(--on-gold); font-weight: 500; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-3); padding: 0 var(--gutter); }
  .tile { position: relative; aspect-ratio: 4 / 5; border-radius: var(--r-md); overflow: hidden; background: var(--surf); box-shadow: var(--shadow-card), inset 0 0 0 1px var(--line); }
  .tile:active { transform: scale(0.97); }
  .grp { margin: var(--s-2) var(--gutter) var(--s-3); font-size: var(--t-eyebrow); letter-spacing: var(--track-eyebrow); text-transform: uppercase; color: var(--gold); }
  .pkg { width: calc(100% - 2 * var(--gutter)); text-align: left; margin: 0 var(--gutter) var(--s-3); padding: var(--s-5); border-radius: var(--r-lg); border: 1px solid var(--line); background: var(--surf); display: flex; justify-content: space-between; gap: var(--s-3); box-shadow: var(--shadow-card); transition: border-color var(--d-fast), transform 260ms var(--ease-expo), box-shadow var(--d-base); }
  .pkg:active { transform: scale(0.985); transition-duration: 90ms; }
  .pkg.hot { background: linear-gradient(135deg, var(--hot-from), var(--surf)); border-color: rgba(212, 176, 106, 0.5); }
  .pkg.sel { border-color: var(--gold-hi); box-shadow: 0 0 0 1px var(--gold-hi), 0 14px 30px -16px rgba(212, 176, 106, 0.4); }
  .pl b { font-family: var(--font-serif); font-size: 22px; font-weight: 500; display: block; }
  .pl small { display: block; color: var(--mute); font-size: var(--t-xs); margin-top: var(--s-1); }
  .pl ul { margin-top: var(--s-3); }
  .pl li { display: flex; gap: 8px; align-items: flex-start; font-size: var(--t-xs); line-height: 1.45; padding: 3px 0; color: var(--ink-soft); }
  .pl li :global(svg) { flex: none; margin-top: 2px; color: var(--gold); }
  .badge { display: inline-block; margin-bottom: 8px; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--on-gold); background: var(--gold); padding: 3px 9px; border-radius: var(--r-pill); font-weight: 500; }
  .pp { font-family: var(--font-serif); font-size: 26px; font-weight: 500; line-height: 1.05; color: var(--gold-hi); white-space: nowrap; font-variant-numeric: lining-nums; }
  .note { margin: var(--s-4) var(--gutter) 0; font-size: var(--t-xs); color: var(--mute); line-height: 1.55; }
  .spacer { height: calc(120px + var(--safe-bottom)); }
  .loading { position: absolute; left: 0; right: 0; top: 0; height: 340px; border: 0; border-radius: 0; }
  .sk-body { position: absolute; left: var(--gutter); right: var(--gutter); top: 270px; display: flex; flex-direction: column; }

  .cta-wrap { position: fixed; left: 16px; right: 16px; bottom: calc(16px + var(--safe-bottom)); z-index: var(--z-cta); display: flex; flex-direction: column; gap: 8px; }
  .chosen { align-self: center; display: flex; align-items: center; gap: 8px; max-width: 100%; padding: 6px 8px 6px 14px; border-radius: var(--r-pill); background: var(--glass-cta); backdrop-filter: blur(20px); border: 1px solid var(--line-strong); font-size: 11.5px; color: var(--ink-soft); }
  .chosen b { color: var(--gold-hi); font-weight: 500; }
  .chosen button { width: 28px; height: 28px; display: grid; place-items: center; color: var(--mute); }
  .cta { display: flex; gap: 8px; padding: 8px; border-radius: var(--r-pill); background: var(--glass-cta); backdrop-filter: blur(20px); border: 1px solid var(--line); box-shadow: 0 14px 30px -12px rgba(0, 0, 0, 0.8); }
  .cta a { flex: 1; height: 48px; border-radius: var(--r-pill); display: flex; gap: 8px; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; color: var(--ink); background: rgba(255, 255, 255, 0.06); }
  .cta a:active { transform: scale(0.96); }
  .cta a.p { flex: 1.5; background: linear-gradient(110deg, var(--gold) 30%, #f3dfae 50%, var(--gold) 70%) 0 0 / 220% 100%; color: var(--on-gold); animation: gold-shimmer 4.5s ease-in-out infinite; }
  .cta.pulse { animation: cta-pulse 900ms var(--ease-out); }
  @keyframes gold-shimmer { 0%, 70% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
  @keyframes cta-pulse { 0% { box-shadow: 0 0 0 0 rgba(240, 217, 164, 0.7); } 100% { box-shadow: 0 0 0 16px rgba(240, 217, 164, 0); } }
</style>
