import { expect, test } from '@playwright/test';

test('home to saved journey', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  const noHScroll = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  await page.goto('/#/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('remembering');
  await expect(page.locator('.cat')).toHaveCount(4);
  await noHScroll();

  // category -> list
  await page.locator('.cat', { hasText: 'Weddings' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Weddings' })).toBeVisible();
  await expect(page.locator('.count')).toContainText(/\d+ photographers/);
  const before = Number((await page.locator('.count').innerText()).match(/\d+/)![0]);
  await noHScroll();

  // filter sheet: price band + city
  await page.getByRole('button', { name: /Filters/ }).click();
  await expect(page.getByRole('dialog', { name: 'Filters' })).toBeVisible();
  await page.getByRole('button', { name: '₹60,000 to ₹1,20,000' }).click();
  await page.getByRole('button', { name: /^Show \d+ photographer/ }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const after = Number((await page.locator('.count').innerText()).match(/\d+/)![0]);
  expect(after).toBeGreaterThan(0);
  expect(after).toBeLessThan(before);
  await expect(page).toHaveURL(/price=60-120/);

  // sort
  await page.getByRole('button', { name: /Recommended/ }).click();
  await page.getByRole('radio', { name: 'Price, low to high' }).click();
  await expect(page).toHaveURL(/sort=price-asc/);

  // profile
  await page.locator('.card .link').first().click();
  await expect(page.locator('.cta a')).toHaveCount(3);
  await expect(page.locator('.cta a.p')).toHaveAttribute('href', /^https:\/\/wa\.me\/91\d+\?text=/);
  await expect(page.locator('.cta a', { hasText: 'Call' })).toHaveAttribute('href', /^tel:\+91\d+$/);
  await expect(page.locator('.cta a', { hasText: 'Email' })).toHaveAttribute('href', /^mailto:.+@example\.com\?subject=/);
  await noHScroll();

  // viewer
  await page.locator('.tile').first().click();
  await expect(page.getByRole('dialog', { name: 'Photo viewer' })).toBeVisible();
  await expect(page.locator('.count')).toContainText(/1 \/ \d+/);
  await page.keyboard.press('Escape');

  // save + persists across reload
  await page.locator('.nav .heart').click();
  await expect(page.locator('.nav .heart')).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('.nav .heart')).toHaveAttribute('aria-pressed', 'true');

  // saved tab
  await page.goto('/#/saved');
  await expect(page.locator('.card')).toHaveCount(1);
  await noHScroll();

  // 404 -> home
  await page.goto('/#/nope');
  await page.getByRole('link', { name: 'Back to Home' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('remembering');

  expect(errors).toEqual([]);
});

for (const width of [375, 390, 430]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/photographers', '/photographers/aarav-mehta', '/photographers/farhan-qureshi', '/saved', '/nope']) {
      await page.goto(`/#${route}`);
      await page.waitForTimeout(700);
      const over = await page.evaluate(() => {
        const el = document.querySelector('.page')!;
        return { page: el.scrollWidth - el.clientWidth, doc: document.documentElement.scrollWidth - document.documentElement.clientWidth };
      });
      expect(over, `${route} @${width}`).toEqual({ page: 0, doc: 0 });
    }
  });
}

test('every seeded photographer has >=8 portfolio images and loads without image errors', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', (r) => r.url().includes('/img/') && r.status() >= 400 && failed.push(r.url()));
  const ids = ['aarav-mehta', 'kabir-films', 'meher-vikram', 'ananya-rao', 'joaquim-fernandes', 'riya-shekhawat', 'zoya-khan', 'ira-kapoor', 'dev-malhotra', 'pooja-iyer', 'farhan-qureshi', 'neha-kapoor', 'aditi-verma', 'rohan-kulkarni', 'siddharth-nair', 'tanvi-sharma'];
  for (const id of ids) {
    await page.goto(`/#/photographers/${id}`);
    await expect(page.locator('.tile').first()).toBeVisible();
    expect(await page.locator('.tile').count(), id).toBeGreaterThanOrEqual(8);
  }
  expect(failed).toEqual([]);
});
