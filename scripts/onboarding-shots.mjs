// Usage: with `bun run preview` on :4173 -> node scripts/onboarding-shots.mjs  (writes docs/screenshots/onboarding-*.png)
import { chromium } from '@playwright/test';

const BASE = process.env.BASE ?? 'http://localhost:4173';
const OUT = 'docs/screenshots';
const fx = (n) => `e2e/fixtures/${n}`;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
const shot = async (name) => { await page.waitForTimeout(900); await page.screenshot({ path: `${OUT}/onboarding-${name}.png` }); };
const next = () => page.locator('.onb-go').click();

await page.goto(`${BASE}/#/`);
await page.waitForTimeout(1200);
await page.getByRole('button', { name: /List your studio/ }).click();
await shot('00-join-sheet');
await page.getByRole('link', { name: /Join as a photographer/ }).click();
await shot('01-welcome');
await page.getByRole('button', { name: /Start my profile/ }).click();

// step 1 (first show friendly validation)
await next(); await shot('02-step1-errors');
await page.fill('#f-name', 'Rohan Kapoor');
await page.getByRole('radio', { name: 'Jaipur' }).click();
await page.fill('#f-years', '12');
await shot('02b-step1-filled');
await next();

// step 2
await next(); await shot('03-step2-errors');
await page.getByRole('button', { name: /Weddings/ }).click();
await page.getByRole('button', { name: /Portraits/ }).click();
await page.getByRole('button', { name: 'Candid & natural' }).click();
for (const t of ['Candid', 'Warm tones', 'Natural light']) await page.getByRole('button', { name: t, exact: true }).click();
await page.evaluate(() => document.querySelector('.onb-body').scrollTo(0, 0));
await shot('03b-step2-filled');
await page.evaluate(() => document.querySelector('.onb-body').scrollTo(0, 9999));
await shot('03c-step2-style');
await next();

// step 3
await shot('04-step3-empty');
await page.getByTestId('portrait-file').setInputFiles(fx('portrait.jpg'));
await page.locator('.stage img').waitFor();
await shot('04b-step3-picker');
await page.evaluate(() => document.querySelector('.onb-body').scrollTo(0, 9999));
await shot('04c-step3-previews');
await next();

// step 4
await next(); await shot('05-step4-errors');
await page.getByTestId('portfolio-file').setInputFiles(['work-1.jpg', 'work-2.jpg', 'work-3.jpg', 'work-4.jpg'].map(fx));
await page.locator('.slot .ph').nth(3).waitFor();
await shot('05b-step4-filled');
await next();

// step 5
await shot('06-step5-empty');
await page.fill('#f-bio', 'I have photographed weddings in Jaipur for twelve years. I work quietly from the edges so the day stays yours.');
await shot('06b-step5-filled');
await next();

// step 6
await next(); await shot('07-step6-errors');
await page.fill('#f-name0', 'Essential');
await page.fill('#f-price0', '45000');
await page.fill('#f-hours0', '6');
await page.fill('#f-photos0', '350');
await page.evaluate(() => document.querySelector('.onb-body').scrollTo(0, 0));
await shot('07b-step6-filled');
await page.evaluate(() => document.querySelector('.onb-body').scrollTo(0, 9999));
await shot('07c-step6-delivery');
await next();

// step 7
await next(); await shot('08-step7-errors');
await page.fill('#f-phone', '9876543210');
await page.fill('#f-email', 'rohan@example.com');
await shot('08b-step7-filled');
await next();

// step 8
await page.waitForTimeout(1200);
await shot('09-step8-review');
await page.evaluate(() => document.querySelector('.frame .page').scrollTo(0, 900));
await shot('09b-step8-review-scrolled');
await page.locator('.onb-go').click();
await page.waitForURL(/join\/done/);
await shot('10-done');

await page.goto(`${BASE}/#/photographers`);
await shot('11-list-new');
await page.goto(`${BASE}/#/join`);
await shot('12-manage');
await browser.close();
console.log('console errors:', errors);
