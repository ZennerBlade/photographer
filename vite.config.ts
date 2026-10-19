import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { BRAND_DESCRIPTION, BRAND_NAME, BRAND_SHORT, THEME } from './src/lib/brand';

/** Injects brand constants into index.html, emits the web manifest, and stamps the service worker with this build's file list. */
function pwa(): Plugin {
  let outDir = 'dist';
  return {
    name: 'pwa',
    configResolved: (c) => { outDir = c.build.outDir; },
    transformIndexHtml: (html) => html.replaceAll('%BRAND_NAME%', BRAND_NAME).replaceAll('%BRAND_DESCRIPTION%', BRAND_DESCRIPTION).replaceAll('%THEME_BG%', THEME.bg),
    generateBundle() {
      const manifest = {
        name: BRAND_NAME, short_name: BRAND_SHORT, description: BRAND_DESCRIPTION,
        start_url: './', scope: './', id: './', display: 'standalone', orientation: 'portrait',
        background_color: THEME.bg, theme_color: THEME.bg, lang: 'en-IN', categories: ['photo', 'lifestyle'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      };
      this.emitFile({ type: 'asset', fileName: 'manifest.webmanifest', source: JSON.stringify(manifest, null, 2) });
    },
    closeBundle() {
      const walk = (d: string, base = ''): string[] => readdirSync(join(d, base), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(d, join(base, e.name)) : [join(base, e.name)]));
      const all = walk(outDir);
      const imgs = all.filter((f) => f.startsWith('img/') && f.endsWith('.webp'));
      const shell = ['./', ...all.filter((f) => !f.startsWith('img/') && !f.endsWith('.woff') && f !== 'sw.js' && f !== 'img-manifest.json').map((f) => './' + f)];
      writeFileSync(join(outDir, 'img-manifest.json'), JSON.stringify(imgs.map((f) => './' + f)));
      const sw = readFileSync(join(outDir, 'sw.js'), 'utf8').replace('__BUILD__', Date.now().toString(36)).replace(`'__SHELL__';`, `'${JSON.stringify(shell)}';`);
      writeFileSync(join(outDir, 'sw.js'), sw);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [svelte(), pwa()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
