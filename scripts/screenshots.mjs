// Usage: bun run shots   (needs `bun run preview` on :4173, or set BASE)
import { chromium } from '@playwright/test';

const BASE = process.env.BASE ?? 'http://localhost:4173';
const OUT = 'docs/screenshots';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
const shot = async (name) => { await page.waitForTimeout(1300); await page.screenshot({ path: `${OUT}/${name}.png` }); };
const scrollPage = async (y) => page.evaluate((y) => (document.querySelector('.page').scrollTop = y), y);

await page.goto(`${BASE}/#/`); await shot('01-home');
await page.evaluate(() => document.querySelector('.fl').scrollTo(0, 0));
await scrollPage(520); await shot('01b-home-scrolled');
await page.goto(`${BASE}/#/photographers?cat=weddings`); await shot('02-list');
await page.getByRole('button', { name: /Filters/ }).click(); await shot('03-filter-sheet');
await page.getByRole('button', { name: 'Jaipur' }).click(); await page.getByRole('button', { name: /^Show/ }).click();
await shot('03b-list-filtered');
await page.goto(`${BASE}/#/photographers?sort=rating`); await shot('02b-list-all');
await page.goto(`${BASE}/#/photographers/aarav-mehta`); await shot('04-profile-top');
await scrollPage(700); await shot('05-profile-about-style');
await scrollPage(1350); await shot('05b-profile-portfolio');
await scrollPage(2600); await shot('05c-profile-packages');
await page.locator('.tile').nth(2).click(); await shot('06-viewer');
await page.keyboard.press('Escape');
await page.locator('.nav .heart').click();
await page.goto(`${BASE}/#/photographers/riya-shekhawat`); await shot('04b-profile-riya');
await page.locator('.nav .heart').click();
await page.goto(`${BASE}/#/saved`); await shot('07-saved');
await page.goto(`${BASE}/#/photographers?city=Goa&price=120p`); await shot('08-empty');
await page.goto(`${BASE}/#/nope`); await shot('09-404');
for (const id of ['kabir-films','ira-kapoor','dev-malhotra','pooja-iyer','rohan-kulkarni','tanvi-sharma','zoya-khan','farhan-qureshi','neha-kapoor','aditi-verma','siddharth-nair','ananya-rao','meher-vikram','joaquim-fernandes']) {
  await page.goto(`${BASE}/#/photographers/${id}`); await page.waitForTimeout(900); await page.screenshot({ path: `${OUT}/all/hero-${id}.png`, clip: { x: 0, y: 0, width: 390, height: 520 } });
}
const wide = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const wp = await wide.newPage();
await wp.goto(`${BASE}/#/`); await wp.waitForTimeout(1500); await wp.screenshot({ path: `${OUT}/10-frame-1440.png` });
await wp.goto(`${BASE}/#/photographers/ira-kapoor`); await wp.waitForTimeout(1500); await wp.screenshot({ path: `${OUT}/10b-frame-1440-profile.png` });
await browser.close();
console.log('console errors:', errors);
