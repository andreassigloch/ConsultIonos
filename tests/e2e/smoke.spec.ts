/**
 * Smoke Tests - CR-001 Website Redesign v2.0
 * @author andreas@siglochconsulting.de
 *
 * Basic E2E tests for all new pages
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage v2.0', () => {
  test('should display new hero section', async ({ page }) => {
    await page.goto('/');

    // Check new headline
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator('h1')).toContainText('Daten strukturieren');
    await expect(heroSection.locator('h1')).toContainText('Qualität messbar machen');
  });

  test('should display problem section', async ({ page }) => {
    await page.goto('/');

    const problemSection = page.locator('[data-testid="problem-section"]');
    await expect(problemSection).toBeVisible();
    await expect(problemSection).toContainText('KI-Tools können das nicht lösen');
  });

  test('should display solution steps', async ({ page }) => {
    await page.goto('/');

    const solutionSection = page.locator('[data-testid="solution-section"]');
    await expect(solutionSection).toBeVisible();
    await expect(solutionSection).toContainText('Daten strukturieren');
    await expect(solutionSection).toContainText('Regeln automatisieren');
    await expect(solutionSection).toContainText('Qualität messen');
  });

  test('should display FAQ section with Schema.org', async ({ page }) => {
    await page.goto('/');

    const faqSection = page.locator('[data-testid="faq-section"]');
    await expect(faqSection).toBeVisible();

    // Check Schema.org FAQPage markup (second script tag contains FAQ)
    const schemaScripts = page.locator('script[type="application/ld+json"]');
    const count = await schemaScripts.count();
    let hasFAQPage = false;
    for (let i = 0; i < count; i++) {
      const content = await schemaScripts.nth(i).textContent();
      if (content && content.includes('FAQPage')) {
        hasFAQPage = true;
        break;
      }
    }
    expect(hasFAQPage).toBe(true);
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');

    const ctaContact = page.locator('[data-testid="cta-contact"]');
    await expect(ctaContact).toBeVisible();
    await expect(ctaContact).toHaveAttribute('href', '/kontakt');

    const ctaApproach = page.locator('[data-testid="cta-approach"]');
    await expect(ctaApproach).toBeVisible();
    await expect(ctaApproach).toHaveAttribute('href', '/mein-ansatz');
  });
});

test.describe('Navigation', () => {
  test('should have all new nav items', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('[data-testid="nav-menu"]');
    await expect(nav).toContainText('Mein Ansatz');
    await expect(nav).toContainText('Projekte');
    await expect(nav).toContainText('Beiträge');
    await expect(nav).toContainText('Hintergrund');
    await expect(nav).toContainText('Kontakt');
  });
});

test.describe('Mein Ansatz Page', () => {
  test('should display 7 stages table', async ({ page }) => {
    await page.goto('/mein-ansatz');

    await expect(page.locator('h1')).toContainText('Mein Ansatz');

    const stagesTable = page.locator('[data-testid="stages-table"]');
    await expect(stagesTable).toBeVisible();

    // Check for all 7 stages
    for (let i = 1; i <= 7; i++) {
      await expect(stagesTable).toContainText(String(i));
    }
  });

  test('should display fit/not fit section', async ({ page }) => {
    await page.goto('/mein-ansatz');

    const fitSection = page.locator('[data-testid="fit-section"]');
    await expect(fitSection).toBeVisible();
    await expect(fitSection).toContainText('Passt gut, wenn');
    await expect(fitSection).toContainText('Passt nicht, wenn');
  });
});

test.describe('Projekte Page', () => {
  test('should display project cards', async ({ page }) => {
    await page.goto('/projekte');

    await expect(page.locator('h1')).toContainText('Projekte');

    const projectCard = page.locator('[data-testid="project-card-0"]');
    await expect(projectCard).toBeVisible();
  });
});

test.describe('Beiträge Page', () => {
  test('should display article cards', async ({ page }) => {
    await page.goto('/beitraege');

    await expect(page.locator('h1')).toContainText('Beiträge');

    const beitragCard = page.locator('[data-testid="beitrag-card-0"]');
    await expect(beitragCard).toBeVisible();
  });
});

test.describe('Hintergrund Section', () => {
  test('should display index page with all articles', async ({ page }) => {
    await page.goto('/hintergrund');

    await expect(page.locator('h1')).toContainText('Hintergrund');

    // Check for all 4 article cards
    for (let i = 0; i < 4; i++) {
      await expect(page.locator(`[data-testid="article-card-${i}"]`)).toBeVisible();
    }
  });

  test('should navigate to struktur-vor-ki', async ({ page }) => {
    await page.goto('/hintergrund/struktur-vor-ki');
    await expect(page.locator('h1')).toContainText('Struktur vor KI');
  });

  test('should navigate to 7-fragen', async ({ page }) => {
    await page.goto('/hintergrund/7-fragen');
    await expect(page.locator('h1')).toContainText('7 Fragen');
  });

  test('should navigate to branchen', async ({ page }) => {
    await page.goto('/hintergrund/branchen');
    await expect(page.locator('h1')).toContainText('Branchen');
  });

  test('should navigate to technik', async ({ page }) => {
    await page.goto('/hintergrund/technik');
    await expect(page.locator('h1')).toContainText('Technischer Stack');
  });
});

test.describe('Kontakt Page', () => {
  test('should display contact options', async ({ page }) => {
    await page.goto('/kontakt');

    // Use specific testid selector for h1
    const heroSection = page.locator('[data-testid="kontakt-hero"]');
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator('h1')).toContainText('Kontakt');

    // Check for Calendly button
    const calendlyButton = page.locator('[data-testid="calendly-button"]');
    await expect(calendlyButton).toBeVisible();

    // Check for contact form
    const contactForm = page.locator('[data-testid="contact-form"]');
    await expect(contactForm).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('all pages should have proper heading structure', async ({ page }) => {
    const pages = [
      '/',
      '/mein-ansatz',
      '/projekte',
      '/beitraege',
      '/hintergrund',
      '/kontakt'
    ];

    for (const url of pages) {
      await page.goto(url);
      // Check for at least one h1 in main content (ignore any debug panels)
      const mainH1 = page.locator('main h1').first();
      await expect(mainH1).toBeVisible();
    }
  });
});
