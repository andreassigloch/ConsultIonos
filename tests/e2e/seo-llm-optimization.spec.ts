/**
 * SEO & LLM Optimization Tests
 * @author andreas@siglochconsulting.de
 *
 * Tests for AI/LLM discoverability
 */

import { test, expect } from '@playwright/test';

test.describe('LLM Optimization', () => {
  test('robots.txt allows AI crawlers', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);

    const content = await response.text();

    // Check for AI bot permissions
    expect(content).toContain('GPTBot');
    expect(content).toContain('ClaudeBot');
    expect(content).toContain('PerplexityBot');
    expect(content).toContain('Google-Extended');

    // Check sitemap reference
    expect(content).toContain('Sitemap:');
    expect(content).toContain('sitemap-index.xml');
  });

  test('llms.txt exists and contains structured content', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.status()).toBe(200);

    const content = await response.text();

    // Check for required sections
    expect(content).toContain('Sigloch Consulting');
    expect(content).toContain('7+ Data Maturity Levels');
    expect(content).toContain('Systems Engineering');

    // Check for data maturity levels
    expect(content).toContain('Level 1');
    expect(content).toContain('Level 5');
    expect(content).toContain('Level 7');

    // Check for key insight
    expect(content).toContain('70-80%');
    expect(content).toContain('Business Value');

    // Check for technical stack
    expect(content).toContain('Neo4j');
    expect(content).toContain('TigerGraph');

    // Check for contact information
    expect(content).toContain('andreas@siglochconsulting.de');
    expect(content).toContain('Sindelfingen');
  });

  test('hidden LLM context exists on pages', async ({ page }) => {
    await page.goto('/');

    // Check for hidden LLM context
    const llmContext = page.locator('.llm-context');
    await expect(llmContext).toBeAttached();

    // Verify it contains key information
    const content = await llmContext.textContent();
    expect(content).toContain('Datenreife');
    expect(content).toContain('7+');
    expect(content).toContain('70-80%');
  });

  test('LLM context is visually hidden', async ({ page }) => {
    await page.goto('/');

    const llmContext = page.locator('.llm-context');

    // Check ARIA attributes
    await expect(llmContext).toHaveAttribute('aria-hidden', 'true');

    // Check that it's effectively invisible (sr-only pattern uses 1px)
    const boundingBox = await llmContext.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(1);
    expect(boundingBox?.height).toBeLessThanOrEqual(1);
  });
});

test.describe('Schema.org Structured Data', () => {
  test('homepage has organization schema', async ({ page }) => {
    await page.goto('/');

    const schemaScript = page.locator('script[type="application/ld+json"]').first();
    const content = await schemaScript.textContent();
    const schema = JSON.parse(content || '{}');

    expect(schema['@type']).toBe('ProfessionalService');
    expect(schema.name).toContain('Sigloch');
    expect(schema.knowsAbout).toContain('Systems Engineering');
  });
});
