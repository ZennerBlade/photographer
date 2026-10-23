import { expect, test, type Page } from '@playwright/test';

const fx = (n: string) => `e2e/fixtures/${n}`;
const next = (page: Page) => page.locator('.onb-go').click();
const noHScroll = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

async function fillThrough(page: Page, upTo: number) {
  await page.goto('/#/join/1');
  await page.fill('#f-name', 'Rohan Kapoor');
  await page.getByRole('radio', { name: 'Jaipur' }).click();
  await page.fill('#f-years', '12');
  if (upTo < 2) return;
  await next(page);
  await page.getByRole('button', { name: /Weddings/ }).click();
  await page.getByRole('button', { name: 'Candid & natural' }).click();
  await page.getByRole('button', { name: 'Candid', exact: true }).click();
  if (upTo < 3) return;
  await next(page);
  await page.getByTestId('portrait-file').setInputFiles(fx('portrait.jpg'));
  await expect(page.locator('.stage img')).toBeVisible();
  if (upTo < 4) return;
  await next(page);
  await page.getByTestId('portfolio-file').setInputFiles(['work-1.jpg', 'work-2.jpg', 'work-3.jpg', 'work-4.jpg'].map(fx));
  await expect(page.locator('.slot .ph')).toHaveCount(4);
  if (upTo < 5) return;
  await next(page);
  await page.fill('#f-bio', 'I have photographed weddings in Jaipur for twelve years. I work quietly from the edges so the day stays yours.');
  if (upTo < 6) return;
  await next(page);
  await page.fill('#f-name0', 'Essential');
  await page.fill('#f-price0', '45000');
  await page.fill('#f-hours0', '6');
  await page.fill('#f-photos0', '350');
  if (upTo < 7) return;
  await next(page);
  await page.fill('#f-phone', '9876543210');
  await page.fill('#f-email', 'rohan@example.com');
}

test('photographer onboarding: publish, appear in list/search/filters, edit, delete', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  // entry points
  await page.goto('/#/');
  await page.getByRole('button', { name: /List your studio/ }).click();
  await expect(page.getByRole('dialog', { name: 'List your studio' })).toBeVisible();
  await expect(page.getByText('coming soon')).toHaveCount(0);
  await page.getByRole('link', { name: /Join as a photographer/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('List your');
  await page.getByRole('button', { name: /Start with a blank form/ }).click();

  // friendly validation on step 1, then walk through all steps
  await next(page);
  await expect(page.getByText('Please tell us your name')).toBeVisible();
  await expect(page.getByText('Step 1 of 8')).toBeVisible();
  await fillThrough(page, 7);
  await noHScroll(page);

  // WhatsApp was pre-filled from the phone number; step 7 -> review
  await expect(page.locator('#f-whatsapp')).toHaveValue('9876543210');
  await next(page);
  await expect(page.getByText('Step 8 of 8')).toBeVisible();
  await expect(page.locator('.frame h1')).toContainText('Rohan Kapoor Photography');
  await expect(page.locator('.frame .tile')).toHaveCount(4);
  await expect(page.locator('.frame .cta a.p')).toHaveAttribute('href', /^https:\/\/wa\.me\/919876543210\?text=/);

  // publish -> done screen with share link
  await page.getByRole('button', { name: /Publish my profile/ }).click();
  await expect(page).toHaveURL(/#\/join\/done\?id=/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('live');
  const link = await page.locator('#share-link').inputValue();
  expect(link).toMatch(/#\/photographers\/rohan-kapoor-photography-[a-z0-9]{4}$/);
  await page.getByRole('button', { name: /Copy link/ }).click();
  await expect(page.getByRole('button', { name: /Link copied|Copy link/ })).toBeVisible();

  // directory: list, New badge, search, city filter, persists across reload
  await page.goto('/#/photographers');
  await expect(page.locator('.card', { hasText: 'Rohan Kapoor Photography' })).toBeVisible();
  await expect(page.locator('.card', { hasText: 'Rohan Kapoor Photography' }).getByText('New', { exact: true })).toBeVisible();
  await page.goto('/#/photographers?q=rohan');
  await expect(page.locator('.card')).toHaveCount(1);
  await page.goto('/#/photographers?cat=weddings&city=Jaipur');
  await expect(page.locator('.card', { hasText: 'Rohan Kapoor Photography' })).toBeVisible();
  await page.reload();
  await expect(page.locator('.card', { hasText: 'Rohan Kapoor Photography' })).toBeVisible();

  // profile page via the share link
  await page.goto(link.slice(link.indexOf('/#/')));
  await expect(page.locator('h1')).toContainText('Rohan Kapoor');
  await expect(page.locator('.tile')).toHaveCount(4);
  await expect(page.getByText('₹45,000')).toBeVisible();
  await expect(page.getByText('Full gallery in 21 days')).toBeVisible();
  await expect(page.locator('.cta a', { hasText: 'Call' })).toHaveAttribute('href', 'tel:+919876543210');

  // edit my profile
  await page.goto('/#/join');
  await page.getByRole('button', { name: 'Edit my profile' }).click();
  await expect(page.locator('#f-name')).toHaveValue('Rohan Kapoor');
  await page.fill('#f-studio', 'Kapoor Frames');
  await page.goto('/#/join/8');
  await expect(page.locator('.frame h1')).toContainText('Kapoor Frames');
  await page.getByRole('button', { name: /Save my changes/ }).click();
  await expect(page).toHaveURL(/join\/done/);
  await page.goto('/#/photographers?q=kapoor');
  await expect(page.locator('.card')).toHaveCount(1);
  await expect(page.locator('.card')).toContainText('Kapoor Frames');

  // delete my demo profile
  await page.goto('/#/join');
  await page.getByRole('button', { name: 'Delete my demo profile' }).click();
  await page.getByRole('button', { name: 'Yes, delete it' }).click();
  await expect(page.getByText('Your demo profile has been deleted.')).toBeVisible();
  await page.goto('/#/photographers?q=kapoor');
  await expect(page.locator('.card')).toHaveCount(0);

  expect(errors).toEqual([]);
});

test('onboarding validation messages and draft autosave across reload', async ({ page }) => {
  await fillThrough(page, 1);
  await page.waitForTimeout(700); // autosave debounce
  await page.reload();
  await expect(page.locator('#f-name')).toHaveValue('Rohan Kapoor');
  await expect(page.locator('#f-years')).toHaveValue('12');

  // welcome page offers to continue the draft
  await page.goto('/#/join');
  await expect(page.getByRole('button', { name: /Continue where I left off/ })).toBeVisible();

  // phone number and portfolio rules
  await fillThrough(page, 3);
  await next(page);
  await next(page);
  await expect(page.getByText('Please add at least 3 photos')).toBeVisible();
  await page.getByTestId('portfolio-file').setInputFiles(['work-1.jpg', 'work-2.jpg', 'work-3.jpg'].map(fx));
  await expect(page.locator('.slot .ph')).toHaveCount(3);
  await next(page);
  await expect(page.getByText('Step 5 of 8')).toBeVisible();
  await page.fill('#f-bio', 'Too short');
  await next(page);
  await expect(page.getByText(/at least 40 letters/)).toBeVisible();

  // Back is always there and goes to the previous step; tap targets are large
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('Step 4 of 8')).toBeVisible();
  for (const loc of [page.getByRole('button', { name: 'Back' }), page.locator('.onb-go')]) {
    const box = (await loc.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(48);
  }
  expect(await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.onb-lead')!).fontSize))).toBeGreaterThanOrEqual(16);
});

test('demo pre-fill: tapping Continue through every step publishes a profile', async ({ page }) => {
  await page.goto('/#/join');
  await page.getByRole('button', { name: /Start my profile/ }).click();
  for (let i = 1; i <= 7; i++) {
    await expect(page).toHaveURL(new RegExp(`#/join/${i}$`));
    await page.getByRole('button', { name: /^(Continue|Review my profile)/ }).click();
  }
  await expect(page).toHaveURL(/#\/join\/8$/);
  await page.getByRole('button', { name: /Publish my profile/ }).click();
  await expect(page).toHaveURL(/#\/join\/done/);
});
