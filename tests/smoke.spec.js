const { test, expect } = require('@playwright/test');

test('blog smoke test — homepage loads, articles render', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  // Load homepage
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  expect(errors, 'No errors on homepage load').toHaveLength(0);

  // Find article links
  const link = page.locator('a[href*="/posts/"], a[href*="/review/"]').first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  const firstHref = await link.getAttribute('href');
  expect(firstHref).toBeTruthy();

  // Visit first article
  await page.goto(firstHref, { waitUntil: 'networkidle', timeout: 30000 });
  expect(errors, `No errors on first article`).toHaveLength(0);

  // Visit second article
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  const secondLink = page.locator('a[href*="/posts/"], a[href*="/review/"]').nth(1);
  const secondHref = await secondLink.getAttribute('href');
  if (secondHref) {
    await page.goto(secondHref, { waitUntil: 'networkidle', timeout: 30000 });
    expect(errors, `No errors on second article`).toHaveLength(0);
  }
});
