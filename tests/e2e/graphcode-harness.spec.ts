/**
 * graphcode-Harness-Seite und „Das Systemmodell in Bildern" (CR-022)
 * @author andreas@siglochconsulting.de
 */

import { test, expect } from '@playwright/test';

test.describe('graphcode-Harness', () => {
  test('nennt den Installationsbefehl, acht Key Features und verlinkt das Systemmodell', async ({ page }) => {
    await page.goto('/projekte/graphcode');
    await expect(page.locator('[data-testid="install-command"]')).toHaveText('npx @sigloch/graphcode init');
    await expect(page.locator('[data-testid="features"] .card')).toHaveCount(8);
    await page.locator('[data-testid="link-systemmodell"]').click();
    await expect(page).toHaveURL(/\/projekte\/graphcode\/systemmodell\/?$/);
  });

  test('ist von der Projektübersicht aus erreichbar', async ({ page }) => {
    await page.goto('/projekte');
    await page.locator('a[href="/projekte/graphcode"]').first().click();
    await expect(page).toHaveURL(/\/projekte\/graphcode\/?$/);
  });
});

test.describe('Das Systemmodell in Bildern', () => {
  test('rendert die Diagramme per Script und lädt keine externen Ressourcen', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const url = new URL(req.url());
      if (!['localhost', '127.0.0.1'].includes(url.hostname)) external.push(req.url());
    });

    await page.goto('/projekte/graphcode/systemmodell');
    await expect(page.locator('h1')).toHaveText('Das Systemmodell in Bildern');
    // Landkarte, Beispiel und Zug-Diagramm entstehen erst im Script
    await expect(page.locator('#map svg')).toHaveCount(1);
    await expect(page.locator('#instance svg')).toHaveCount(1);
    await expect(page.locator('#rules article.rule')).toHaveCount(13);
    // Zielgruppen-Schalter blendet Abschnitte um
    await page.locator('.audience button[data-aud="code"]').click();
    await expect(page.locator('#audHint')).toHaveText('Einstieg: Methode');
    // Schriften kommen vom eigenen Server
    const fontsReady = await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check('600 16px Fraunces');
    });
    expect(fontsReady).toBe(true);
    expect(external).toEqual([]);
  });
});
