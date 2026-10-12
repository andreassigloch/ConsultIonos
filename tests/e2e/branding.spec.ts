/**
 * Branding - Logo, Favicon, Link-Vorschaubild (CR-017)
 * @author andreas@siglochconsulting.de
 */

import { test, expect } from '@playwright/test';

test.describe('Logo', () => {
  test('Header zeigt die Wortmarke als Link zur Startseite', async ({ page }) => {
    await page.goto('/kontakt');

    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toHaveAttribute('href', '/');
    await expect(logo).toHaveAttribute('aria-label', /Sigloch Consulting/);

    const svg = logo.locator('svg');
    await expect(svg).toBeVisible();
    const box = await svg.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(40);
    expect(box!.width).toBeGreaterThan(box!.height * 3);
  });

  test('Footer zeigt die Wortmarke', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="footer-logo"] svg')).toBeVisible();
  });

  test('Wortmarke bleibt auf dem Smartphone neben dem Menü-Button sichtbar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto('/');
    await expect(page.locator('[data-testid="logo"] svg')).toBeVisible();
    await expect(page.locator('[data-testid="nav-toggle"]')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

test.describe('Icons und Vorschaubild', () => {
  const assets = [
    ['/favicon.svg', 'image/svg+xml'],
    ['/favicon-32.png', 'image/png'],
    ['/apple-touch-icon.png', 'image/png'],
    ['/images/logo.svg', 'image/svg+xml'],
    ['/images/og-image.png', 'image/png'],
  ];

  for (const [url, type] of assets) {
    test(`${url} wird ausgeliefert`, async ({ request }) => {
      const response = await request.get(url);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain(type);
    });
  }

  test('Seite verweist auf Favicon, Touch-Icon und ein vorhandenes Vorschaubild', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', '/favicon.svg');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/\/images\/og-image\.png$/);
    const response = await request.get(new URL(ogImage!).pathname);
    expect(response.status()).toBe(200);
  });

  test('Schema.org nennt ein Logo, das existiert', async ({ page, request }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const logo = blocks.map((b) => JSON.parse(b)).map((d) => d.logo).find(Boolean);
    expect(logo).toMatch(/\/images\/logo\.svg$/);
    const response = await request.get(new URL(logo).pathname);
    expect(response.status()).toBe(200);
  });
});
