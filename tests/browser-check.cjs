const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const base = 'http://127.0.0.1:4173/';
  await page.goto(base);
  await page.locator('[data-add-current]').click();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '1');
  await page.locator('.links a[href="galeri.html"]').click();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '1');
  async function checkGalleryRows() {
    const filled = await page.locator('.tiles').evaluate(grid => {
      const cards = [...grid.querySelectorAll('.gi:not([hidden])')];
      const bounds = grid.getBoundingClientRect();
      const rows = new Map();
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const top = Math.round(rect.top);
        rows.set(top, Math.max(rows.get(top) || 0, rect.right));
      });
      return [...rows.values()].every(right => Math.abs(right - bounds.right) < 2);
    });
    assert.ok(filled, 'Every gallery row should reach the right edge');
  }
  await checkGalleryRows();
  await page.screenshot({ path: 'tests/gallery-all-desktop.png', fullPage: true });
  await page.locator('[data-cart-open]').click();
  assert.match(await page.locator('[data-cart-list]').textContent(), /BLACK/);
  await page.locator('#o-nama').fill('Uji Pesanan');
  await page.locator('#o-cat').fill('Coba unit hitam');
  await page.locator('[data-q][data-d="1"]').click();
  await page.keyboard.press('Escape');
  await page.reload();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '2');
  await page.locator('.links a[href="produk.html"]').click();
  await page.goBack();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '2');
  await page.locator('[data-cart-open]').click();
  assert.equal(await page.locator('#o-nama').inputValue(), 'Uji Pesanan');
  await page.keyboard.press('Escape');
  await page.locator('[data-filter="products"]').click();
  assert.equal(await page.locator('.gi:visible').count(), 4);
  await checkGalleryRows();
  await page.locator('.gi:visible').first().click();
  assert.equal(await page.locator('#lb').getAttribute('aria-hidden'), 'false');
  await page.keyboard.press('ArrowRight');
  assert.match(await page.locator('#lb img').getAttribute('src'), /street/);
  await page.locator('[data-photo-step="-1"]').click();
  assert.match(await page.locator('#lb img').getAttribute('src'), /black/);
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'tests/gallery-desktop.png', fullPage: true });
  const second = await context.newPage();
  await second.goto(base + 'produk.html');
  await second.locator('[data-add="street"]').click();
  await page.waitForFunction(() => document.querySelector('[data-cart-count]').textContent === '3');
  await page.goto(base);
  await page.screenshot({ path: 'tests/home-desktop.png', fullPage: true });

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const file of ['index.html', 'galeri.html', 'produk.html', 'tentang.html', 'artikel.html', 'kontak.html']) {
      await page.goto(base + file);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${file} overflow at ${width}`);
      if (file === 'galeri.html') {
        for (const filter of ['all', 'products', 'store']) {
          await page.locator(`[data-filter="${filter}"]`).click();
          await checkGalleryRows();
        }
        if (width === 390) await page.screenshot({ path: 'tests/gallery-mobile.png', fullPage: true });
      }
    }
    if (width === 390) {
      await page.goto(base);
      await page.screenshot({ path: 'tests/home-mobile.png', fullPage: true });
    }
  }
  await page.goto(base + 'produk.html');
  await page.evaluate(() => localStorage.setItem('gano-cart', 'null'));
  await page.reload();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '0');
  await page.evaluate(() => localStorage.setItem('gano-cart', JSON.stringify({black: '2', street: -4, invalid: 12})));
  await page.reload();
  assert.equal(await page.locator('[data-cart-count]').textContent(), '2');

  const animated = await context.newPage();
  await animated.emulateMedia({ reducedMotion: 'no-preference' });
  animated.on('pageerror', error => errors.push(error.message));
  await animated.goto(base);
  await animated.locator('[data-next]').click();
  assert.equal(await animated.locator('.hero').getAttribute('data-v'), '1');
  await animated.locator('.steps').scrollIntoViewIfNeeded();
  await animated.waitForFunction(() => document.querySelector('.steps li').classList.contains('in'));
  await animated.goto(base + 'galeri.html');
  await animated.locator('[data-filter="products"]').click();
  assert.equal(await animated.locator('.gi:visible').count(), 4);
  await animated.close();

  const filePage = await context.newPage();
  await filePage.goto(pathToFileURL(path.resolve('index.html')).href);
  await filePage.locator('[data-add-current]').click();
  await filePage.locator('.links a[href="galeri.html"]').click();
  assert.equal(await filePage.locator('[data-cart-count]').textContent(), '1');
  await filePage.locator('[data-cart-open]').click();
  await filePage.locator('[data-rm]').click();
  await filePage.keyboard.press('Escape');
  await filePage.locator('.links a[href="index.html"]').click();
  assert.equal(await filePage.locator('[data-cart-count]').textContent(), '0');
  assert.deepEqual(errors, []);
  console.log('PASS: cart navigation, reload, draft, cross-tab sync, invalid data, gallery, local files, 18 responsive checks; no JS errors.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
