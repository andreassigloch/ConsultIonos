#!/usr/bin/env node
/**
 * Website Scraper for siglochconsulting.de
 * Extracts structure, content, and design information
 */

import { chromium } from 'playwright';
import fs from 'fs';

async function scrapeWebsite(url) {
  console.log(`Scraping ${url}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  try {
    // Try loading the page
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Extract page information
    const pageInfo = await page.evaluate(() => {
      // Get all text content
      const bodyText = document.body.innerText;

      // Get page structure
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName.toLowerCase(),
        text: h.innerText.trim()
      }));

      // Get navigation
      const navLinks = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href')
      }));

      // Get forms
      const forms = Array.from(document.querySelectorAll('form')).map(form => ({
        action: form.getAttribute('action'),
        method: form.getAttribute('method'),
        fields: Array.from(form.querySelectorAll('input, textarea, select')).map(field => ({
          type: field.type || field.tagName.toLowerCase(),
          name: field.name,
          placeholder: field.placeholder,
          required: field.required
        }))
      }));

      // Get images
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt
      }));

      // Get CSS variables (colors, etc.)
      const styles = getComputedStyle(document.documentElement);
      const cssVars = Array.from(document.styleSheets)
        .flatMap(sheet => {
          try {
            return Array.from(sheet.cssRules);
          } catch (e) {
            return [];
          }
        })
        .filter(rule => rule.selectorText === ':root')
        .flatMap(rule => Array.from(rule.style))
        .filter(prop => prop.startsWith('--'));

      // Get page meta
      const meta = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        keywords: document.querySelector('meta[name="keywords"]')?.content,
        lang: document.documentElement.lang
      };

      // Get sections
      const sections = Array.from(document.querySelectorAll('section, .section, main > div')).map((section, idx) => ({
        index: idx,
        id: section.id || null,
        classes: section.className,
        heading: section.querySelector('h1, h2, h3')?.innerText.trim(),
        text: section.innerText.substring(0, 200)
      }));

      return {
        meta,
        headings,
        navLinks,
        forms,
        images: images.slice(0, 10), // Limit images
        cssVars,
        sections,
        bodyText: bodyText.substring(0, 2000) // Limit text
      };
    });

    // Take screenshot
    await page.screenshot({ path: '/tmp/website-screenshot.png', fullPage: true });

    console.log('\n=== Website Analysis ===\n');
    console.log('Meta Information:');
    console.log(JSON.stringify(pageInfo.meta, null, 2));
    console.log('\nNavigation Links:');
    console.log(JSON.stringify(pageInfo.navLinks, null, 2));
    console.log('\nPage Headings:');
    console.log(JSON.stringify(pageInfo.headings, null, 2));
    console.log('\nSections:');
    console.log(JSON.stringify(pageInfo.sections, null, 2));
    console.log('\nForms:');
    console.log(JSON.stringify(pageInfo.forms, null, 2));

    // Save full results
    fs.writeFileSync('/tmp/website-analysis.json', JSON.stringify(pageInfo, null, 2));

    console.log('\n✓ Full analysis saved to /tmp/website-analysis.json');
    console.log('✓ Screenshot saved to /tmp/website-screenshot.png');

  } catch (error) {
    console.error('Error scraping website:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run scraper
scrapeWebsite('https://siglochconsulting.de')
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
