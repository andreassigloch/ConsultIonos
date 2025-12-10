# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sigloch Consulting website - a static Astro 5.x site for Systems Engineering & GenAI consulting services. German-language B2B consulting site with blog, contact form (Web3Forms), and IONOS SFTP deployment.

**Live URL:** https://siglochconsulting.de

## Commands

```bash
# Development
npm run dev              # Start dev server on port 4322
npm run build            # Production build
npm run preview          # Preview production build
npm run deploy           # Build & deploy to IONOS SFTP

# Testing
npm run test             # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright with UI

# Validation (run before push)
npm run compliance       # DSGVO privacy check
npm run compliance:bfsg  # BFSG accessibility check (WCAG 2.1 AA)
npm run lint:design      # Design token validation
npm run seo:check        # SEO validation
npm run validate:schema  # Schema.org validation
npm run validate:all     # Run all validators
```

## Architecture

### Directory Structure

- `src/lib/config.ts` - Central configuration (site meta, contact, colors, Schema.org)
- `src/styles/tokens.css` - Design system tokens (MANDATORY for all styles)
- `src/layouts/BaseLayout.astro` - Master template with SEO
- `src/pages/` - File-based routing (Astro)
- `src/content/blog/` - Markdown blog articles with Zod schema
- `scripts/` - Validation and compliance scripts

### Design Token System

All CSS must use tokens from `src/styles/tokens.css`. No hardcoded values:

```css
/* ❌ FORBIDDEN */
.element { background: #68780E; padding: 14px; }

/* ✅ REQUIRED */
.element { background: var(--color-primary); padding: var(--space-4); }
```

Brand color: `#68780E` (olive/sage green), referenced as `--color-primary`

### Key Integrations

- **Contact Form:** Web3Forms (key in `.env` → `WEB3FORMS_ACCESS_KEY`)
- **Booking:** Calendly popup widget
- **Deployment:** IONOS SFTP (password in `.env` → `IONOS_SFTP_PASSWORD`)
- **Schema.org:** ProfessionalService type in `src/lib/config.ts`

## Git Hooks

Pre-push hook (`.githooks/pre-push`) runs automatically:
1. Production build test
2. SEO check (broken links, images)
3. DSGVO compliance (no credentials/secrets)
4. BFSG accessibility (WCAG 2.1 AA)

All checks must pass before push succeeds.

## Environment Variables

```bash
WEB3FORMS_ACCESS_KEY=xxx  # Contact form API key
IONOS_SFTP_PASSWORD=xxx   # Deployment credentials
```

## Claude Skills

Custom automation scripts in `.claude/skills/`:

- `image-processor.sh <path>` - Optimize images (resize, WebP conversion)
- `location-scorer.sh <city>` - Generate infrastructure scores from OpenStreetMap
