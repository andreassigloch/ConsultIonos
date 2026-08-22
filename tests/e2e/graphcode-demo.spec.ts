/**
 * graphcode-Demo (City People Mover) - Statische Demo
 * @author andreas@siglochconsulting.de
 *
 * Prüft die Landing-Page und die 15 aus dem Modell generierten Dokumente.
 */

import { test, expect } from '@playwright/test';

const DOC_SLUGS = [
  'srs', 'conops', 'architecture', 'icd', 'nfr', 'rtm', 'testconcept',
  'testmatrix', 'intplan', 'implplan', 'fmea', 'trade', 'changelog',
  'cr-list', 'references',
];

test.describe('graphcode-Demo Landing-Page', () => {
  test('zeigt Modellzahlen, beide Screenshots und alle Dokumentlinks', async ({ page }) => {
    await page.goto('/projekte/graphcode-demo');

    await expect(page.locator('[data-testid="graphcode-demo"] h1')).toContainText('City People Mover');
    await expect(page.locator('[data-testid="demo-system"]')).toContainText('219 Einträge');

    const images = page.locator('[data-testid="graphcode-demo"] figure img');
    await expect(images).toHaveCount(2);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      // Bild wirklich geladen, nicht nur im DOM
      expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    }

    const docLinks = page.locator('[data-testid="demo-documents"] .doc-list a');
    await expect(docLinks).toHaveCount(DOC_SLUGS.length);
  });

  test('ist von der Projektübersicht aus erreichbar', async ({ page }) => {
    await page.goto('/projekte');
    await page.locator('a[href="/projekte/graphcode-demo"]').first().click();
    await expect(page).toHaveURL(/\/projekte\/graphcode-demo\/?$/);
  });
});

test.describe('Generierte Dokumente', () => {
  for (const slug of DOC_SLUGS) {
    test(`${slug} rendert Inhalt aus dem Modell`, async ({ page }) => {
      const response = await page.goto(`/projekte/graphcode-demo/${slug}`);
      expect(response?.status()).toBe(200);

      const content = page.locator('.doc-content');
      await expect(content).toBeVisible();

      // Der Export-Hinweis steht in jedem generierten Dokument
      await expect(content).toContainText('GENERATED from');

      // Die englische Export-Überschrift ist entfernt, der deutsche Titel steht im Kopf
      await expect(content.locator('h1')).toHaveCount(0);
      await expect(page.locator('[data-testid="gc-doc-' + slug + '"] header h1')).toBeVisible();
    });
  }

  test('FMEA zeigt die 16 Fehlermodi mit Bewertung', async ({ page }) => {
    await page.goto('/projekte/graphcode-demo/fmea');
    const rows = page.locator('.doc-content table tbody tr');
    await expect(rows).toHaveCount(16);
    await expect(page.locator('.doc-content')).toContainText('the cabin door unlocks while the cabin is in motion');
  });

  test('Blättern führt durch die Dokumentreihenfolge', async ({ page }) => {
    await page.goto('/projekte/graphcode-demo/srs');
    await page.locator('[data-testid="doc-next"]').click();
    await expect(page).toHaveURL(/\/projekte\/graphcode-demo\/conops\/?$/);
    await page.locator('[data-testid="doc-prev"]').click();
    await expect(page).toHaveURL(/\/projekte\/graphcode-demo\/srs\/?$/);
  });
});
