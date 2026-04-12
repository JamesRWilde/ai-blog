const { test, expect } = require('@playwright/test');

test('no console errors on homepage or first three articles', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push({ type: 'pageerror', msg: err.message }));
  page.on('console', msg => { if (msg.type() === 'error') errors.push({ type: 'console', msg: msg.text() }); });

  // 1. Load homepage
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  if (errors.length) {
    expect(errors, `Console error on homepage load — errors: ${JSON.stringify(errors)}`).toHaveLength(0);
  }

  // 2. Get article links from homepage
  const articleLinks = await page.locator('a[href*="/posts/"], a[href*="/review/"]').all();
  const hrefs = (await Promise.all(articleLinks.map(el => el.getAttribute('href'))))
    .filter(h => h && h.startsWith('/'));

  // 3. Visit first 3 articles and check for errors on each
  const count = Math.min(3, hrefs.length);
  for (let i = 0; i < count; i++) {
    const url = hrefs[i];
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    if (errors.length) {
      expect(errors, `Console error on "${url}" — errors: ${JSON.stringify(errors)}`).toHaveLength(0);
    }
  }
});
