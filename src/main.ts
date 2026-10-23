import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-ext-500.css';
import '@fontsource/cormorant-garamond/latin-ext-500-italic.css';
import '@fontsource-variable/manrope/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { ready } from './data/api';

/** Wait (briefly) for locally stored photographer profiles so the first render already includes them. */
await Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]);
export default mount(App, { target: document.getElementById('app')! });

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
