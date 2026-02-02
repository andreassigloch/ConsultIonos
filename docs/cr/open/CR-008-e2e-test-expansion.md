# CR-008: E2E Test Expansion - Test Pyramid Compliance

## Status
🆕 NEW

## Problem
Sicon website has excellent data-testid coverage (97 instances) but only **2 E2E tests**. Per CLAUDE.md test pyramid (70/20/10), the project lacks unit and integration tests, relying solely on E2E.

## Current State
- ✅ 97 data-testid attributes (excellent coverage)
- ✅ Playwright configured correctly
- ✅ 2 E2E specs (smoke.spec.ts, seo-llm-optimization.spec.ts)
- ❌ 0 unit tests
- ❌ 0 integration tests
- ⚠️ Test pyramid: 0/0/100 instead of 70/20/10

## Scope

### In Scope
1. Add Vitest for unit testing
2. Create unit tests for business logic (if any)
3. Expand E2E tests from 2 to 5-8 smoke tests
4. Add integration tests for API/data fetching

### Out of Scope
- New data-testid attributes (already comprehensive)
- Playwright configuration changes

## Implementation

### Step 1: Add Vitest Configuration

```bash
npm install -D vitest @vitest/coverage-v8
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      thresholds: { lines: 80, functions: 80 }
    }
  }
});
```

### Step 2: Add Unit Tests (if business logic exists)

Check for testable logic:
- Schema.org generation
- SEO metadata functions
- Content transformations

```typescript
// tests/unit/schema-org.test.ts
import { describe, it, expect } from 'vitest';
import { generateOrganizationSchema } from '../../src/utils/schema';

describe('Schema.org Generation', () => {
  it('generates valid Organization schema', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('Sigloch Consulting');
  });
});
```

### Step 3: Expand E2E Tests

Add these smoke tests to cover critical user journeys:

```typescript
// tests/e2e/navigation.spec.ts
test('main navigation links work', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="nav-leistungen"]');
  await expect(page).toHaveURL(/leistungen/);
});

// tests/e2e/contact-form.spec.ts
test('contact form validation', async ({ page }) => {
  await page.goto('/kontakt');
  await page.click('[data-testid="contact-submit-button"]');
  await expect(page.locator('[data-testid="contact-error"]')).toBeVisible();
});

// tests/e2e/footer-links.spec.ts
test('footer social links open correctly', async ({ page }) => {
  await page.goto('/');
  const linkedIn = page.locator('[data-testid="footer-linkedin-link"]');
  await expect(linkedIn).toHaveAttribute('href', /linkedin/);
});

// tests/e2e/mobile-responsive.spec.ts
test('mobile menu works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.click('[data-testid="mobile-menu-toggle"]');
  await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
});
```

### Step 4: Update package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:unit": "vitest run --dir tests/unit",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Target Test Distribution

| Type | Current | Target | Count |
|------|---------|--------|-------|
| Unit | 0% | 70% | 5-7 tests |
| Integration | 0% | 20% | 2-3 tests |
| E2E | 100% (2) | 10% | 5-8 tests |

## Acceptance Criteria
- [ ] Vitest configured and running
- [ ] Minimum 5 unit tests (if business logic exists)
- [ ] E2E tests expanded to 5-8 smoke tests
- [ ] `npm test` runs all test levels
- [ ] Coverage report generated

## Effort Estimate
Small-Medium (1 chat session for setup + tests)

## References
- CLAUDE.md: Test Pyramid 70/20/10
- e2etest-spec_1.md: Test-Routine requirements
- Existing E2E: `tests/e2e/smoke.spec.ts`
