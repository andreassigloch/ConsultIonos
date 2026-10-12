/**
 * Link-Vorschaubild (Open Graph) erzeugen
 * @author andreas@siglochconsulting.de
 *
 * Rendert public/images/og-image.png (1200×630) aus Wortmarke und Claim,
 * im Aufbau des LinkedIn-Banners aus dem Markenpaket. Aufruf: npm run og:image
 */

import { readFile } from 'fs/promises';
import path from 'path';
import { chromium } from '@playwright/test';

const root = process.cwd();
const logo = await readFile(path.join(root, 'src/assets/logo/logo-dunkel.svg'), 'utf-8');
// Als Data-URI: eine per setContent geladene Seite darf keine file://-Schriften nachladen.
const font = async (weight) => {
  const file = path.join(root, `node_modules/@fontsource/poppins/files/poppins-latin-${weight}-normal.woff2`);
  return `data:font/woff2;base64,${(await readFile(file)).toString('base64')}`;
};

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<style>
  @font-face { font-family: 'Poppins'; font-weight: 400; src: url('${await font(400)}') format('woff2'); }
  @font-face { font-family: 'Poppins'; font-weight: 600; src: url('${await font(600)}') format('woff2'); }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 0 96px;
    display: flex; flex-direction: column; justify-content: center;
    background: #151515; color: #ffffff; font-family: 'Poppins', sans-serif;
  }
  .logo svg { display: block; height: 132px; width: auto; }
  h1 { margin: 64px 0 0; font-size: 56px; line-height: 1.2; font-weight: 600; }
  h1 span { color: #9baa47; }
  p { margin: 24px 0 0; font-size: 28px; font-weight: 400; color: #cbd5e1; }
</style>
</head>
<body>
  <div class="logo">${logo}</div>
  <h1>Struktur vor KI. <span>Mehrwert durch KI.</span></h1>
  <p>Systems Engineering · Requirements · Automatisierung</p>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
const target = path.join(root, 'public/images/og-image.png');
await page.screenshot({ path: target });
await browser.close();

console.log(`✅ ${path.relative(root, target)}`);
