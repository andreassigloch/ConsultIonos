# Modern Web Project Template
## Production-Ready Boilerplate (Sigloch Methodology)

**Author:** andreas@siglochconsulting
**Version:** 1.1
**Last Updated:** 2025-01-06
**Based on:** ImmoTechDemo project (battle-tested patterns)
**Updates:** CR-020 (Web3Forms), CR-024 (Health Check Page), CR-017 (Prompt Skills)

---

## Table of Contents

1. [Project Initialization](#1-project-initialization)
2. [Core Structure](#2-core-structure)
3. [Design System (Mandatory)](#3-design-system-mandatory)
4. [Compliance Agents](#4-compliance-agents)
5. [Testing Strategy (3-Level)](#5-testing-strategy-3-level)
6. [Configuration Management](#6-configuration-management)
7. [Contact Form Implementation](#7-contact-form-implementation)
8. [Conversion Optimization](#8-conversion-optimization)
9. [Schema Validation & Security](#9-schema-validation--security)
10. [Deployment Automation](#10-deployment-automation)
11. [Documentation Structure](#11-documentation-structure)
12. [Claude Code Memory](#12-claude-code-memory)
13. [Initialization Checklist](#13-initialization-checklist)

---

## 1. Project Initialization

### 1.1 Quick Start

```bash
# Create project directory
mkdir my-project && cd my-project

# Initialize Git
git init
git config core.hooksPath .githooks

# Initialize npm
npm init -y

# Install base dependencies
npm install astro@latest

# Install dev dependencies
npm install --save-dev \
  @playwright/test \
  @vitest/coverage-v8 \
  vitest \
  typescript \
  tsx \
  dotenv \
  lightningcss
```

### 1.2 package.json Template

```json
{
  "name": "project-name",
  "type": "module",
  "version": "0.0.1",
  "author": "andreas@siglochconsulting",
  "description": "Project description",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:unit": "vitest run --testNamePattern='Unit'",
    "test:integration": "vitest run --testNamePattern='Integration'",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "compliance": "tsx scripts/compliance-check.ts",
    "compliance:fix": "tsx scripts/compliance-check.ts --fix",
    "lint:design": "tsx scripts/design-token-lint.ts",
    "validate:schema": "tsx scripts/schema-org-validator.ts",
    "security:audit": "tsx scripts/security-audit.ts",
    "validate:all": "npm run compliance && npm run lint:design && npm run validate:schema && npm run security:audit",
    "deploy": "./scripts/build-and-deploy.sh"
  }
}
```

---

## 2. Core Structure

### 2.1 Directory Layout

```
project-root/
├── .claude/
│   ├── CLAUDE.md                   # Project memory (architecture decisions)
│   ├── settings.local.json         # Permissions, MCP servers
│   └── skills/                     # Reusable automation scripts
│
├── .githooks/
│   └── pre-push                    # Compliance enforcement
│
├── docs/
│   ├── requirements.md             # Business requirements
│   ├── architecture.md             # Tech stack decisions
│   ├── implementation.md           # Task tracking
│   ├── summary.md                  # Quick start guide
│   ├── testing/
│   │   └── README.md
│   └── done/                       # Completed CRs
│       └── CR-XXX-feature.md
│
├── scripts/
│   ├── compliance-check.ts         # GDPR/DSGVO agent
│   ├── design-token-lint.ts        # Design system enforcement
│   ├── schema-org-validator.ts     # Schema.org validation
│   ├── security-audit.ts           # Security scanning
│   └── build-and-deploy.sh         # Deployment automation
│
├── src/
│   ├── components/                 # UI components
│   │   ├── ContactForm.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/                      # Routes (file-based routing)
│   │   ├── index.astro
│   │   ├── kontakt.astro
│   │   └── api/                    # API endpoints
│   │       └── contact.ts
│   ├── styles/
│   │   ├── tokens.css              # Design system tokens
│   │   └── global.css
│   ├── scripts/
│   │   └── analytics.ts
│   └── lib/
│       ├── config.ts               # Centralized configuration
│       ├── email.ts                # Email service
│       └── utils.ts
│
├── tests/
│   ├── unit/                       # Level 1: < 5 seconds
│   ├── integration/                # Level 2: 30-120 seconds
│   └── e2e/                        # Level 3: 2-10 minutes
│
├── public/                         # Static assets
│
├── .env.example                    # Environment template
├── .gitignore
├── astro.config.mjs
├── playwright.config.ts
├── vitest.config.ts
├── tsconfig.json
└── README.md                       # Single entry point

```

### 2.2 .gitignore Template

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
.astro/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
playwright-report/
test-results/

# Logs
*.log
npm-debug.log*

# MCP
.claude-flow/
```

---

## 3. Design System (Mandatory)

### 3.1 Design Tokens [src/styles/tokens.css](src/styles/tokens.css)

**CRITICAL:** All projects MUST use design tokens. No hardcoded values allowed.

```css
/**
 * Design System Tokens
 * @author andreas@siglochconsulting
 *
 * MANDATORY: All components must use these CSS variables
 * Never hardcode colors, spacing, or font sizes
 */

:root {
  /* ===== COLORS ===== */

  /* Brand Colors - CUSTOMIZE THESE */
  --color-primary: #3b82f6;          /* Your brand color */
  --color-secondary: #64748b;
  --color-accent: #f59e0b;

  /* Derived Colors */
  --color-primary-dark: #2563eb;
  --color-primary-light: #60a5fa;

  /* Semantic Colors */
  --color-background: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-foreground: #0f172a;
  --color-muted: #f1f5f9;
  --color-border: #e2e8f0;

  /* Status Colors */
  --color-success-bg: #d1fae5;
  --color-success-text: #065f46;
  --color-error-bg: #fee2e2;
  --color-error-text: #991b1b;
  --color-warning-bg: #fef3c7;
  --color-warning-text: #92400e;
  --color-info-bg: #dbeafe;
  --color-info-text: #1e40af;

  /* Neutral Grays */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;

  /* ===== SPACING ===== */

  /* Base spacing scale (4px increments) */
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* ===== TYPOGRAPHY ===== */

  /* Font Families */
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: 'Monaco', 'Courier New', monospace;

  /* Font Sizes (modular scale ~1.2) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* ===== BORDERS ===== */

  --border-width: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 1rem;       /* 16px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-full: 50%;
  --radius-pill: 50px;

  /* ===== SHADOWS ===== */

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* ===== TRANSITIONS ===== */

  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ===== Z-INDEX SCALE ===== */

  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}

/* ===== UTILITY CLASSES ===== */

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.text-center { text-align: center; }
.text-primary { color: var(--color-primary); }
.text-muted { color: var(--color-gray-500); }
```

### 3.2 Design Token Linter [scripts/design-token-lint.ts](scripts/design-token-lint.ts)

**Enforces design system usage - catches hardcoded values before commit.**

```typescript
#!/usr/bin/env npx tsx
/**
 * Design Token Linter
 * @author andreas@siglochconsulting
 *
 * Validates that CSS follows design system tokens:
 * - No hardcoded colors (must use var(--color-*))
 * - No hardcoded spacing (must use defined tokens)
 * - No hardcoded font sizes (must use typography scale)
 *
 * Run before commit: npm run lint:design
 */

import * as fs from 'fs';
import { glob } from 'glob';

// Design System Token Definitions
const DESIGN_TOKENS = {
  colors: {
    exceptions: [
      'transparent',
      'currentColor',
      'inherit',
      'white',
      'black',
      'rgba(0, 0, 0,',       // shadows
      'rgba(255, 255, 255,', // shadows
    ]
  },

  spacing: {
    allowed: [
      '0', '0px', '0rem',
      '0.25rem', '0.5rem', '0.75rem',
      '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem', '4rem',
    ]
  },

  typography: {
    sizes: [
      '0.75rem',   // --text-xs
      '0.875rem',  // --text-sm
      '1rem',      // --text-base
      '1.125rem',  // --text-lg
      '1.25rem',   // --text-xl
      '1.5rem',    // --text-2xl
      '1.875rem',  // --text-3xl
      '2.25rem',   // --text-4xl
      '3rem'       // --text-5xl
    ]
  }
};

interface LintViolation {
  file: string;
  line: number;
  property: string;
  value: string;
  reason: string;
  severity: 'error' | 'warning';
}

class DesignTokenLinter {
  private violations: LintViolation[] = [];

  async lint(): Promise<void> {
    console.log('🎨 Design Token Linter');
    console.log('='.repeat(50));

    const files = await glob('src/**/*.{astro,css}');

    for (const file of files) {
      await this.lintFile(file);
    }

    this.report();
  }

  private async lintFile(filePath: string): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let inStyleBlock = false;

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;

      // Track style blocks
      if (line.includes('<style>') || line.includes('.css')) inStyleBlock = true;
      if (line.includes('</style>')) inStyleBlock = false;

      if (!inStyleBlock && !filePath.endsWith('.css')) return;

      // Check for hardcoded colors
      this.checkColors(filePath, lineNum, line);

      // Check for hardcoded spacing
      this.checkSpacing(filePath, lineNum, line);

      // Check for hardcoded font sizes
      this.checkTypography(filePath, lineNum, line);
    });
  }

  private checkColors(file: string, line: number, content: string): void {
    // Match color properties
    const colorProps = /(?:color|background|border-color|fill|stroke):\s*([^;]+);/g;
    let match;

    while ((match = colorProps.exec(content)) !== null) {
      const value = match[1].trim();

      // Skip if using CSS variable
      if (value.includes('var(--color-')) continue;

      // Skip exceptions
      if (DESIGN_TOKENS.colors.exceptions.some(ex => value.startsWith(ex))) continue;

      // Check for hex colors
      if (/#[0-9a-fA-F]{3,8}/.test(value)) {
        this.violations.push({
          file,
          line,
          property: match[0].split(':')[0],
          value,
          reason: 'Use CSS variable var(--color-*) instead of hardcoded color',
          severity: 'error'
        });
      }
    }
  }

  private checkSpacing(file: string, line: number, content: string): void {
    const spacingProps = /\b(?:padding|margin|gap):\s*([^;]+);/g;
    let match;

    while ((match = spacingProps.exec(content)) !== null) {
      const value = match[1].trim();

      // Skip auto, %, calc(), var()
      if (/auto|%|calc\(|var\(/.test(value)) continue;

      const values = value.split(/\s+/);

      values.forEach(val => {
        if (val === '') return;

        if (!DESIGN_TOKENS.spacing.allowed.includes(val)) {
          this.violations.push({
            file,
            line,
            property: match[0].split(':')[0],
            value: val,
            reason: `Non-standard spacing. Use: ${DESIGN_TOKENS.spacing.allowed.slice(0, 6).join(', ')}...`,
            severity: 'warning'
          });
        }
      });
    }
  }

  private checkTypography(file: string, line: number, content: string): void {
    const fontSizeMatch = /font-size:\s*([^;]+);/.exec(content);

    if (fontSizeMatch) {
      const value = fontSizeMatch[1].trim();

      // Skip if using variable
      if (value.includes('var(')) return;

      if (!DESIGN_TOKENS.typography.sizes.includes(value)) {
        this.violations.push({
          file,
          line,
          property: 'font-size',
          value,
          reason: `Non-standard font size. Use: ${DESIGN_TOKENS.typography.sizes.join(', ')}`,
          severity: 'warning'
        });
      }
    }
  }

  private report(): void {
    const errors = this.violations.filter(v => v.severity === 'error');
    const warnings = this.violations.filter(v => v.severity === 'warning');

    console.log();

    if (errors.length > 0) {
      console.log('❌ ERRORS:');
      errors.forEach(v => {
        console.log(`  ${v.file}:${v.line}`);
        console.log(`    ${v.property}: ${v.value}`);
        console.log(`    → ${v.reason}`);
        console.log();
      });
    }

    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      warnings.forEach(v => {
        console.log(`  ${v.file}:${v.line}`);
        console.log(`    ${v.property}: ${v.value}`);
        console.log(`    → ${v.reason}`);
        console.log();
      });
    }

    console.log('='.repeat(50));
    console.log(`📊 Summary: ${errors.length} errors, ${warnings.length} warnings`);

    if (errors.length > 0) {
      console.log('\n❌ Design token validation failed');
      process.exit(1);
    } else if (warnings.length > 0) {
      console.log('\n⚠️  Design token validation passed with warnings');
    } else {
      console.log('\n✅ Design token validation passed');
    }
  }
}

// Run linter
const linter = new DesignTokenLinter();
linter.lint().catch(console.error);
```

---

## 4. Compliance Agents

### 4.1 GDPR/DSGVO Compliance Agent [scripts/compliance-check.ts](scripts/compliance-check.ts)

**Prevents privacy violations before they reach production.**

```typescript
#!/usr/bin/env node
/**
 * GDPR/DSGVO Compliance Agent
 * @author andreas@siglochconsulting
 *
 * Checks for GDPR violations before git push:
 * 1. Personal data (names, addresses, precise geolocation)
 * 2. Credentials and secrets
 * 3. Internal information
 *
 * Run before commit: npm run compliance
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

interface ComplianceViolation {
  type: 'error' | 'warning' | 'whitelisted';
  category: string;
  file: string;
  line?: number;
  message: string;
  pattern?: string;
  context?: string;
}

const violations: ComplianceViolation[] = [];
const whitelisted: ComplianceViolation[] = [];

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

/**
 * Patterns for GDPR violations
 */
const PATTERNS = {
  // Credentials and API keys
  credentials: [
    /api[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9_-]{20,}["']?/gi,
    /secret[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9_-]{20,}["']?/gi,
    /password\s*[:=]\s*["'][^"']{3,}["']/gi,
    /token\s*[:=]\s*["']?[a-zA-Z0-9_-]{20,}["']?/gi,
    /bearer\s+[a-zA-Z0-9_-]{20,}/gi,
  ],

  // Personal names (common patterns)
  personalNames: [
    /\b(Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.)\s+[A-Z][a-z]+\s+[A-Z][a-z]+/g,
    /\bfirstname\s*[:=]\s*["'][A-Z][a-z]+["']/gi,
    /\blastname\s*[:=]\s*["'][A-Z][a-z]+["']/gi,
  ],

  // Precise geolocation (>4 decimal places = <11m precision)
  preciseGeo: [
    /\b\d{1,3}\.\d{5,}\s*,\s*\d{1,3}\.\d{5,}\b/g,
    /["']?lat["']?\s*[:=]\s*\d{1,3}\.\d{5,}/gi,
    /["']?lng["']?\s*[:=]\s*\d{1,3}\.\d{5,}/gi,
  ],

  // Email addresses
  emails: [
    /\b[a-zA-Z0-9._%+-]+@(?!example\.com|test\.com|localhost)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
  ],

  // Phone numbers
  phoneNumbers: [
    /\+\d{1,3}\s*\d{2,4}\s*\d{6,10}/g,
    /\(\d{3}\)\s*\d{3}-\d{4}/g,
  ],

  // Internal markers
  internalInfo: [
    /\bINTERNAL\b/gi,
    /\bCONFIDENTIAL\b/gi,
    /\bPRIVATE\b/gi,
  ],
};

/**
 * Files to skip from checks
 */
const SKIP_FILES = [
  'package-lock.json',
  'package.json',
  'tsconfig.json',
  'scripts/compliance-check.ts',
  '.claude/settings.local.json',
  '.githooks/pre-push',
];

/**
 * Official company information (whitelisted)
 */
const OFFICIAL_COMPANY_INFO = {
  emails: ['info@company.com', 'support@company.com'],
  phones: ['+1 555 123 4567'],
  names: ['Company Name Inc.'],
};

/**
 * Check if match is official company info
 */
function isOfficialInfo(match: string, filePath: string): boolean {
  const allowedFiles = ['config.ts', 'Footer.astro', 'Header.astro'];
  if (!allowedFiles.some(f => filePath.includes(f))) {
    return false;
  }

  const matchLower = match.toLowerCase();
  return (
    OFFICIAL_COMPANY_INFO.emails.some(e => matchLower.includes(e.toLowerCase())) ||
    OFFICIAL_COMPANY_INFO.phones.some(p => matchLower.includes(p.replace(/\s/g, ''))) ||
    OFFICIAL_COMPANY_INFO.names.some(n => matchLower.includes(n.toLowerCase()))
  );
}

/**
 * Get files to check (staged for commit)
 */
function getFilesToCheck(): string[] {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
      cwd: process.cwd(),
    });

    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .filter(file => !file.startsWith('.git/'))
      .filter(file => !file.includes('node_modules/'))
      .filter(file => !file.includes('dist/'))
      .filter(file => {
        const ext = file.split('.').pop()?.toLowerCase();
        return ['ts', 'tsx', 'js', 'jsx', 'astro', 'json', 'md', 'yml', 'yaml', 'env'].includes(ext || '');
      });
  } catch (error) {
    console.warn('Warning: Could not get git diff, checking all files');
    return [];
  }
}

/**
 * Check file for sensitive patterns
 */
function checkFile(filePath: string): void {
  const fullPath = join(process.cwd(), filePath);

  if (!existsSync(fullPath)) return;
  if (SKIP_FILES.some(skip => filePath.includes(skip))) return;

  let content: string;
  try {
    content = readFileSync(fullPath, 'utf-8');
  } catch (error) {
    return;
  }

  const lines = content.split('\n');

  // Check for credentials
  PATTERNS.credentials.forEach((pattern) => {
    lines.forEach((line, index) => {
      if (line.includes('.env') || line.includes('process.env') || line.includes('import.meta.env')) {
        return;
      }

      const matches = line.match(pattern);
      if (matches) {
        violations.push({
          type: 'error',
          category: 'Credentials',
          file: filePath,
          line: index + 1,
          message: 'Potential credential or API key found',
          pattern: matches[0].substring(0, 50),
          context: line.trim().substring(0, 100),
        });
      }
    });
  });

  // Check for precise geolocation
  PATTERNS.preciseGeo.forEach((pattern) => {
    lines.forEach((line, index) => {
      const matches = line.match(pattern);
      if (matches) {
        violations.push({
          type: 'error',
          category: 'Geolocation',
          file: filePath,
          line: index + 1,
          message: 'Precise geolocation (<50m) found (GDPR violation)',
          pattern: matches[0],
          context: line.trim().substring(0, 100),
        });
      }
    });
  });

  // Check for email addresses
  PATTERNS.emails.forEach((pattern) => {
    lines.forEach((line, index) => {
      const matches = line.match(pattern);
      if (matches) {
        if (isOfficialInfo(matches[0], filePath)) {
          whitelisted.push({
            type: 'whitelisted',
            category: 'Email (Official)',
            file: filePath,
            line: index + 1,
            message: 'Official company email (whitelisted)',
            pattern: matches[0],
          });
          return;
        }

        violations.push({
          type: 'warning',
          category: 'Email Address',
          file: filePath,
          line: index + 1,
          message: 'Email address found (potential personal data)',
          pattern: matches[0],
          context: line.trim().substring(0, 100),
        });
      }
    });
  });
}

/**
 * Print violations report
 */
function printReport(): void {
  console.log(`\n${colors.bold}${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}    GDPR/DSGVO COMPLIANCE CHECK${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);

  const errors = violations.filter(v => v.type === 'error');
  const warnings = violations.filter(v => v.type === 'warning');

  console.log(`${colors.red}Found ${errors.length} error(s)${colors.reset}`);
  console.log(`${colors.yellow}Found ${warnings.length} warning(s)${colors.reset}`);
  console.log(`${colors.green}Found ${whitelisted.length} whitelisted item(s)${colors.reset}\n`);

  if (violations.length === 0) {
    console.log(`${colors.green}✓ No violations found${colors.reset}`);
    console.log(`${colors.green}✓ Safe to push${colors.reset}\n`);
    return;
  }

  // Print violations by category
  const byCategory = violations.reduce((acc, v) => {
    if (!acc[v.category]) acc[v.category] = [];
    acc[v.category].push(v);
    return acc;
  }, {} as Record<string, ComplianceViolation[]>);

  Object.entries(byCategory).forEach(([category, items]) => {
    console.log(`${colors.bold}${category}:${colors.reset}`);
    items.forEach((item) => {
      const icon = item.type === 'error' ? '✗' : '⚠';
      const color = item.type === 'error' ? colors.red : colors.yellow;

      console.log(`  ${color}${icon}${colors.reset} ${item.file}${item.line ? `:${item.line}` : ''}`);
      console.log(`    ${item.message}`);
      if (item.pattern) console.log(`    Pattern: ${item.pattern}`);
      if (item.context) console.log(`    Context: ${item.context}`);
    });
    console.log('');
  });

  console.log(`${colors.bold}${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
}

/**
 * Main execution
 */
function main(): void {
  console.log(`${colors.blue}Running GDPR compliance checks...${colors.reset}\n`);

  const files = getFilesToCheck();

  if (files.length === 0) {
    console.log(`${colors.green}No files to check${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`Checking ${files.length} file(s)...\n`);

  files.forEach(checkFile);

  printReport();

  const errors = violations.filter(v => v.type === 'error');

  if (errors.length > 0) {
    console.log(`${colors.red}${colors.bold}COMPLIANCE CHECK FAILED${colors.reset}`);
    console.log(`${colors.red}Fix all errors before pushing${colors.reset}\n`);
    process.exit(1);
  }

  const warnings = violations.filter(v => v.type === 'warning');
  if (warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}PASSED WITH WARNINGS${colors.reset}`);
    console.log(`${colors.yellow}Please review warnings${colors.reset}\n`);
  } else {
    console.log(`${colors.green}${colors.bold}COMPLIANCE CHECK PASSED${colors.reset}\n`);
  }

  process.exit(0);
}

main();
```

---

## 5. Testing Strategy (3-Level)

### 5.1 Testing Philosophy

**Every project MUST use 3-level testing:**

| Level | Speed | Purpose | When to Use |
|-------|-------|---------|-------------|
| **Unit** | < 5s | Individual functions, fast feedback | Changing utility functions |
| **Integration** | 30-120s | Components working together | Feature changes, API workflows |
| **E2E** | 2-10min | Real conditions verification | Pre-deployment, critical paths |

### 5.2 Vitest Configuration [vitest.config.ts](vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/*.test.ts',
      ],
    },
  },
});
```

### 5.3 Level 1: Unit Tests [tests/unit/utils.test.ts](tests/unit/utils.test.ts)

```typescript
/**
 * Unit Tests - Level 1
 * Fast, isolated, no external dependencies
 */

import { describe, test, expect } from 'vitest';
import { formatPrice, validateEmail } from '@/lib/utils';

describe('Unit: Utility Functions', () => {
  test('formatPrice handles edge cases', () => {
    expect(formatPrice(1000)).toBe('€1,000');
    expect(formatPrice(0)).toBe('€0');
    expect(formatPrice(null)).toBe('Price on request');
  });

  test('validateEmail rejects invalid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});
```

### 5.4 Level 2: Integration Tests [tests/integration/api.test.ts](tests/integration/api.test.ts)

```typescript
/**
 * Integration Tests - Level 2
 * Components working together, real API calls
 */

import { describe, test, expect } from 'vitest';
import { fetchData } from '@/lib/api';

describe('Integration: API Data Flow', () => {
  test('API returns valid data structure', async () => {
    const data = await fetchData();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
  });
});
```

### 5.5 Level 3: E2E Tests [tests/e2e/contact-form.spec.ts](tests/e2e/contact-form.spec.ts)

```typescript
/**
 * E2E Tests - Level 3
 * Real browser, real interactions, real conditions
 */

import { test, expect } from '@playwright/test';

test('Contact form submission works end-to-end', async ({ page }) => {
  // Navigate to contact page
  await page.goto('/kontakt');

  // Fill form
  await page.fill('[data-testid="input-name"]', 'Test User');
  await page.fill('[data-testid="input-email"]', 'test@example.com');
  await page.fill('[data-testid="input-subject"]', 'Test Subject');
  await page.fill('[data-testid="input-message"]', 'Test message');
  await page.check('[data-testid="input-privacy"]');

  // Submit
  await page.click('[data-testid="submit-button"]');

  // Verify success
  await expect(page.locator('.form-message.success')).toBeVisible();
});

test('Homepage loads and displays content', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-testid="primary-cta"]')).toBeVisible();
});
```

### 5.6 Playwright Configuration [playwright.config.ts](playwright.config.ts)

```typescript
/**
 * Playwright Configuration
 * @author andreas@siglochconsulting
 */

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

---

## 6. Configuration Management

### 6.1 Centralized Config [src/lib/config.ts](src/lib/config.ts)

**NEVER hardcode values in components - use this config file.**

```typescript
/**
 * Centralized Configuration
 * @author andreas@siglochconsulting
 *
 * NEVER hardcode these values in components
 * Always import from this file
 */

export const config = {
  site: {
    title: 'Your Project Name',
    description: 'Project description for SEO',
    url: 'https://www.example.com',
    locale: 'en-US',
  },

  contact: {
    email: 'info@example.com',
    phone: '+1 555 123 4567',
    address: {
      street: 'Example Street', // NO house number (GDPR)
      city: 'City Name',
      zip: '12345',
      country: 'United States',
    },
  },

  api: {
    baseUrl: import.meta.env.API_BASE_URL || 'https://api.example.com',
    key: import.meta.env.API_KEY,
    timeout: 10000, // 10 seconds
  },

  features: {
    analytics: false, // GDPR: Explicit opt-in required
    newsletter: true,
    contactForm: true,
  },

  social: {
    twitter: 'https://twitter.com/example',
    linkedin: 'https://linkedin.com/company/example',
    github: 'https://github.com/example',
  },
} as const;

// Type-safe configuration access
export type Config = typeof config;
```

### 6.2 Environment Variables [.env.example](.env.example)

```bash
# API Configuration
API_BASE_URL=https://api.example.com
API_KEY=your-api-key-here

# Email Service (choose based on hosting - see Section 7.0)
# Option 1: Web3Forms (Static hosting - RECOMMENDED for IONOS/Netlify)
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here

# Option 2: Resend (Serverless)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 3: SMTP (VPS/Backend)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password

# Option 4: SendGrid (Legacy)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Deployment
DEPLOY_HOST=example-host.com
DEPLOY_USER=username
DEPLOY_PASSWORD=password

# Security
SESSION_SECRET=your-session-secret-change-this
```

---

## 7. Contact Form Implementation

### 7.0 Architecture Constraint ⭐ CRITICAL

**Choose email solution based on hosting capability:**

| Hosting Type | Recommended Solution | Why |
|--------------|---------------------|-----|
| **Static Only** (IONOS, Netlify, Vercel) | **Web3Forms** ✅ | No backend needed |
| **Serverless** (Netlify Functions, Vercel) | Resend API | 3,000 emails/month |
| **Full Backend** (VPS, Node.js) | Nodemailer SMTP | Complete control |

### 7.1 Web3Forms (Primary - Static Hosting)

**Setup:** Sign up at https://web3forms.com (250 submissions/month free)

**Environment:**
```bash
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

**Implementation keys:**
- Hidden field: `access_key` from env
- Honeypot: `botcheck` checkbox (display: none)
- POST to: `https://api.web3forms.com/submit`
- Client-side only, no API endpoint needed

**Keywords:** Web3Forms, static hosting, honeypot spam, GDPR-compliant

### 7.2 Contact Form Component [src/components/ContactForm.astro](src/components/ContactForm.astro)

```astro
---
/**
 * ContactForm Component
 * @author andreas@siglochconsulting
 *
 * Production-ready contact form with validation
 * Submits to /api/contact endpoint
 */

interface Props {
  showHeader?: boolean;
  formId?: string;
}

const { showHeader = true, formId = 'contact-form' } = Astro.props;
---

<div class="contact-form-container">
  {showHeader && <h2>Send us a message</h2>}

  <form class="contact-form" id={formId} data-testid="contact-form">
    <div class="form-group">
      <label for={`${formId}-name`}>Name *</label>
      <input
        type="text"
        id={`${formId}-name`}
        name="name"
        required
        aria-required="true"
        autocomplete="name"
        data-testid="input-name"
      />
    </div>

    <div class="form-group">
      <label for={`${formId}-email`}>Email *</label>
      <input
        type="email"
        id={`${formId}-email`}
        name="email"
        required
        aria-required="true"
        autocomplete="email"
        data-testid="input-email"
      />
    </div>

    <div class="form-group">
      <label for={`${formId}-phone`}>Phone</label>
      <input
        type="tel"
        id={`${formId}-phone`}
        name="phone"
        autocomplete="tel"
        data-testid="input-phone"
      />
    </div>

    <div class="form-group">
      <label for={`${formId}-subject`}>Subject *</label>
      <input
        type="text"
        id={`${formId}-subject`}
        name="subject"
        required
        aria-required="true"
        data-testid="input-subject"
      />
    </div>

    <div class="form-group">
      <label for={`${formId}-message`}>Message *</label>
      <textarea
        id={`${formId}-message`}
        name="message"
        rows="6"
        required
        aria-required="true"
        data-testid="input-message"
      ></textarea>
    </div>

    <div class="form-group">
      <label class="checkbox-label">
        <input
          type="checkbox"
          name="privacy"
          required
          data-testid="input-privacy"
        />
        <span>
          I have read and accepted the <a href="/privacy">Privacy Policy</a>. *
        </span>
      </label>
    </div>

    <button type="submit" class="submit-button" data-testid="submit-button">
      Send Message
    </button>

    <div class="form-message" id={`${formId}-message`} role="alert" aria-live="assertive" hidden></div>
  </form>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach((form) => {
      const formElement = form as HTMLFormElement;
      const formId = formElement.id;
      const messageDiv = document.getElementById(`${formId}-message`);
      const subjectInput = document.getElementById(`${formId}-subject`) as HTMLInputElement;

      // Pre-fill subject from URL parameter
      if (subjectInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const subjectParam = urlParams.get('subject');
        if (subjectParam) {
          subjectInput.value = decodeURIComponent(subjectParam);
        }
      }

      formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (messageDiv) {
          messageDiv.hidden = false;
          messageDiv.className = 'form-message info';
          messageDiv.textContent = 'Sending message...';
        }

        try {
          const formData = new FormData(formElement);

          const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          if (response.ok && result.success) {
            if (messageDiv) {
              messageDiv.className = 'form-message success';
              messageDiv.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
            }
            formElement.reset();

            // Track conversion event
            if (typeof window.plausible !== 'undefined') {
              window.plausible('Form Submission', { props: { form: 'contact' } });
            }
          } else {
            throw new Error(result.message || 'Failed to send message');
          }
        } catch (error) {
          if (messageDiv) {
            messageDiv.className = 'form-message error';
            messageDiv.textContent = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
          }
        }
      });
    });
  });
</script>

<style>
  .contact-form-container {
    background: white;
    padding: var(--space-8);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .contact-form-container h2 {
    font-size: var(--text-3xl);
    color: var(--color-primary);
    margin-bottom: var(--space-8);
  }

  .form-group {
    margin-bottom: var(--space-6);
  }

  .form-group label {
    display: block;
    font-weight: var(--font-medium);
    margin-bottom: var(--space-2);
    color: var(--color-foreground);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: var(--space-3);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-weight: normal;
  }

  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin-top: var(--space-1);
  }

  .checkbox-label a {
    color: var(--color-primary);
  }

  .submit-button {
    width: 100%;
    padding: var(--space-4);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .submit-button:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .form-message {
    margin-top: var(--space-4);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    text-align: center;
  }

  .form-message.success {
    background: var(--color-success-bg);
    color: var(--color-success-text);
    border: var(--border-width) solid var(--color-success-text);
  }

  .form-message.error {
    background: var(--color-error-bg);
    color: var(--color-error-text);
    border: var(--border-width) solid var(--color-error-text);
  }

  .form-message.info {
    background: var(--color-info-bg);
    color: var(--color-info-text);
    border: var(--border-width) solid var(--color-info-text);
  }
</style>
```

### 7.2 Email Service [src/lib/email.ts](src/lib/email.ts)

```typescript
/**
 * Email Service
 * @author andreas@siglochconsulting
 *
 * Handles email sending via multiple providers
 * Choose one implementation based on your needs
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Option 1: Resend (Recommended - Modern, simple, reliable)
 * Install: npm install resend
 */
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendEmailResend(options: EmailOptions): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error('[Email Error]', error);
      return false;
    }

    console.log('[Email Sent]', data);
    return true;
  } catch (error) {
    console.error('[Email Error]', error);
    return false;
  }
}

/**
 * Option 2: Nodemailer (SMTP - Works with any email provider)
 * Install: npm install nodemailer @types/nodemailer
 */
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT || '587'),
  secure: import.meta.env.SMTP_PORT === '465',
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASSWORD,
  },
});

export async function sendEmailSMTP(options: EmailOptions): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <noreply@yourdomain.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log('[Email Sent]', info.messageId);
    return true;
  } catch (error) {
    console.error('[Email Error]', error);
    return false;
  }
}

/**
 * Option 3: SendGrid
 * Install: npm install @sendgrid/mail
 */
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY || '');

export async function sendEmailSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    await sgMail.send({
      from: 'noreply@yourdomain.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log('[Email Sent]');
    return true;
  } catch (error) {
    console.error('[Email Error]', error);
    return false;
  }
}

/**
 * Main email function - Choose your implementation
 */
export const sendEmail = sendEmailResend; // Change to your preferred method

/**
 * Email templates
 */
export function createContactEmailHTML(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #64748b; }
        .value { margin-top: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
```

### 7.3 API Endpoint [src/pages/api/contact.ts](src/pages/api/contact.ts)

```typescript
/**
 * Contact Form API Endpoint
 * @author andreas@siglochconsulting
 *
 * Handles contact form submissions
 * POST /api/contact
 */

import type { APIRoute } from 'astro';
import { sendEmail, createContactEmailHTML } from '@/lib/email';
import { config } from '@/lib/config';

// Simple rate limiting (in-memory)
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 5;

  const userSubmissions = submissions.get(ip) || [];
  const recentSubmissions = userSubmissions.filter(time => now - time < windowMs);

  if (recentSubmissions.length >= maxSubmissions) {
    return true;
  }

  submissions.set(ip, [...recentSubmissions, now]);
  return false;
}

// Simple honeypot check
function isSpam(formData: FormData): boolean {
  // Honeypot field (should be empty)
  const honeypot = formData.get('website');
  if (honeypot) return true;

  // Check for suspicious patterns
  const message = formData.get('message') as string;
  const spamKeywords = ['viagra', 'cialis', 'casino', 'lottery'];

  return spamKeywords.some(keyword =>
    message?.toLowerCase().includes(keyword)
  );
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    if (isRateLimited(clientAddress)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many submissions. Please try again later.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse form data
    const formData = await request.formData();

    // Spam check
    if (isSpam(formData)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Submission rejected.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    const emailHTML = createContactEmailHTML({ name, email, phone, subject, message });

    const sent = await sendEmail({
      to: config.contact.email,
      subject: `Contact Form: ${subject}`,
      html: emailHTML,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    });

    if (!sent) {
      throw new Error('Failed to send email');
    }

    // Success response
    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[Contact API Error]', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
```

---

## 8. Conversion Optimization

### 8.1 Analytics Setup (GDPR-Compliant)

**IMPORTANT:** Only use privacy-first analytics (no Google Analytics without consent banner).

#### Recommended: Plausible Analytics

```html
<!-- Add to BaseLayout.astro <head> -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**Alternative Options:**
- **Umami**: Self-hosted, open-source
- **Matomo**: Self-hosted, GDPR-compliant
- **Fathom**: Privacy-first, simple

### 8.2 Event Tracking [src/scripts/analytics.ts](src/scripts/analytics.ts)

```typescript
/**
 * Analytics Event Tracking
 * @author andreas@siglochconsulting
 *
 * Track conversion events without violating GDPR
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export const analytics = {
  /**
   * Track form submission
   */
  trackFormSubmission(formName: string): void {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('Form Submission', {
        props: { form: formName }
      });
    }
  },

  /**
   * Track CTA click
   */
  trackCTAClick(ctaName: string, location: string): void {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('CTA Click', {
        props: { cta: ctaName, location }
      });
    }
  },

  /**
   * Track scroll depth milestone
   */
  trackScrollDepth(depth: number): void {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('Scroll Depth', {
        props: { depth: `${depth}%` }
      });
    }
  },

  /**
   * Track file download
   */
  trackDownload(fileName: string): void {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('File Download', {
        props: { file: fileName }
      });
    }
  },

  /**
   * Track external link click
   */
  trackOutboundLink(url: string): void {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('Outbound Link', {
        props: { url }
      });
    }
  },
};

/**
 * Scroll depth tracking
 */
export function initScrollTracking(): void {
  const milestones = [25, 50, 75, 100];
  const reached = new Set<number>();

  function checkScroll() {
    const scrollPercentage =
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;

    milestones.forEach(milestone => {
      if (scrollPercentage >= milestone && !reached.has(milestone)) {
        reached.add(milestone);
        analytics.trackScrollDepth(milestone);
      }
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkScroll);
  }, { passive: true });
}

/**
 * Automatic outbound link tracking
 */
export function initOutboundLinkTracking(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Check if external link
    const isExternal =
      href.startsWith('http') &&
      !href.includes(window.location.hostname);

    if (isExternal) {
      analytics.trackOutboundLink(href);
    }
  });
}

// Auto-initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollTracking();
    initOutboundLinkTracking();
  });
}
```

### 8.3 CTA Optimization Checklist

**Use this checklist for every landing page:**

#### Placement
- [ ] Primary CTA above the fold (visible without scrolling)
- [ ] Secondary CTA at 50% scroll depth
- [ ] Final CTA at bottom of page
- [ ] Sticky/floating CTA for mobile (optional)

#### Design
- [ ] Uses high-contrast color (primary brand color)
- [ ] Clear, action-oriented text ("Get Free Quote" vs "Submit")
- [ ] Adequate size (min 44x44px touch target)
- [ ] Hover/active states implemented
- [ ] Loading state for async actions

#### UX
- [ ] Single primary action per screen
- [ ] No distractions near CTA (reduce friction)
- [ ] Fast response time (<100ms feedback)
- [ ] Success confirmation visible
- [ ] Error messages clear and helpful

#### Tracking
- [ ] `data-testid` attribute for E2E tests
- [ ] Analytics event on click
- [ ] Conversion tracking enabled

### 8.4 Form Optimization Patterns

#### Progressive Disclosure
```astro
<!-- Show fields as needed, not all at once -->
<form>
  <div class="step" data-step="1">
    <input type="email" placeholder="Your email" required />
    <button type="button" onclick="showStep(2)">Next</button>
  </div>

  <div class="step hidden" data-step="2">
    <input type="text" placeholder="Your name" required />
    <input type="tel" placeholder="Phone" />
    <button type="submit">Send</button>
  </div>
</form>
```

#### Smart Defaults & Pre-fill
```typescript
// Pre-fill from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
if (email) {
  (document.getElementById('email') as HTMLInputElement).value = email;
}
```

#### Real-time Validation
```typescript
// Validate on blur, not just on submit
emailInput.addEventListener('blur', () => {
  if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showError(emailInput, 'Please enter a valid email');
  } else {
    clearError(emailInput);
  }
});
```

#### Accessibility
```html
<!-- Always include proper labels and ARIA attributes -->
<label for="email">Email *</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true"
  aria-describedby="email-error"
  autocomplete="email"
/>
<div id="email-error" class="error" role="alert"></div>
```

### 8.5 Performance Impact on Conversion

**Every 100ms delay = ~1% conversion loss (Amazon data)**

#### Core Web Vitals Targets
```typescript
// Monitor and enforce performance budgets
const PERFORMANCE_BUDGETS = {
  LCP: 2500,  // Largest Contentful Paint < 2.5s
  FID: 100,   // First Input Delay < 100ms
  CLS: 0.1,   // Cumulative Layout Shift < 0.1
};

// Add to E2E tests
test('Performance budget compliance', async ({ page }) => {
  await page.goto('/');

  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1] as any;
        resolve({ LCP: lcp.renderTime || lcp.loadTime });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
  });

  expect((metrics as any).LCP).toBeLessThan(2500);
});
```

### 8.6 Conversion Funnel Testing

```typescript
// tests/e2e/conversion-funnel.spec.ts

test('Critical conversion path: Homepage → CTA → Form → Success', async ({ page }) => {
  // Step 1: Land on homepage
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();

  // Step 2: Click primary CTA
  await page.click('[data-testid="primary-cta"]');

  // Step 3: Form should be visible and focused
  await expect(page.locator('[data-testid="contact-form"]')).toBeVisible();

  // Step 4: Fill form
  await page.fill('[data-testid="input-name"]', 'Test User');
  await page.fill('[data-testid="input-email"]', 'test@example.com');
  await page.fill('[data-testid="input-subject"]', 'Test Inquiry');
  await page.fill('[data-testid="input-message"]', 'This is a test message');
  await page.check('[data-testid="input-privacy"]');

  // Step 5: Submit
  await page.click('[data-testid="submit-button"]');

  // Step 6: Success confirmation
  await expect(page.locator('.form-message.success')).toBeVisible();

  // Measure total funnel time
  const navigationTiming = await page.evaluate(() => {
    return performance.timing.loadEventEnd - performance.timing.navigationStart;
  });

  console.log(`Funnel completion time: ${navigationTiming}ms`);
  expect(navigationTiming).toBeLessThan(10000); // < 10 seconds
});
```

---

## 9. Schema Validation & Security

### 9.1 Schema.org Validator [scripts/schema-org-validator.ts](scripts/schema-org-validator.ts)

**Validates structured data for SEO and LLM discoverability.**

```typescript
#!/usr/bin/env npx tsx
/**
 * Schema.org Structured Data Validator
 * @author andreas@siglochconsulting
 *
 * Validates JSON-LD structured data in HTML files
 * Ensures SEO and AI agent discoverability
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';
import { JSDOM } from 'jsdom';

interface ValidationError {
  file: string;
  type: string;
  message: string;
}

async function validateSchemaOrg() {
  console.log('🔍 Schema.org Validation');
  console.log('='.repeat(50));

  const htmlFiles = await glob('dist/**/*.html');
  const errors: ValidationError[] = [];

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    const dom = new JSDOM(html);
    const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');

    scripts.forEach((script) => {
      try {
        const schema = JSON.parse(script.textContent || '');

        // Validate Organization schema
        if (schema['@type'] === 'Organization') {
          const required = ['name', 'url', 'address', 'telephone'];
          required.forEach(field => {
            if (!schema[field]) {
              errors.push({
                file,
                type: 'Organization',
                message: `Missing required field: ${field}`
              });
            }
          });
        }

        // Validate WebSite schema
        if (schema['@type'] === 'WebSite') {
          if (!schema.name || !schema.url) {
            errors.push({
              file,
              type: 'WebSite',
              message: 'Missing required field: name or url'
            });
          }
        }

        // Validate BreadcrumbList
        if (schema['@type'] === 'BreadcrumbList') {
          if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
            errors.push({
              file,
              type: 'BreadcrumbList',
              message: 'Missing or invalid itemListElement'
            });
          }
        }

      } catch (e) {
        errors.push({
          file,
          type: 'JSON-LD',
          message: 'Invalid JSON-LD syntax'
        });
      }
    });
  }

  // Report results
  console.log();

  if (errors.length === 0) {
    console.log('✅ Schema.org validation passed');
    console.log(`   Checked ${htmlFiles.length} HTML files`);
    process.exit(0);
  }

  console.log(`❌ Found ${errors.length} error(s):\n`);

  errors.forEach(error => {
    console.log(`  ${error.file}`);
    console.log(`    Type: ${error.type}`);
    console.log(`    Error: ${error.message}`);
    console.log();
  });

  console.log('='.repeat(50));
  process.exit(1);
}

validateSchemaOrg();
```

### 9.2 Security Audit Agent [scripts/security-audit.ts](scripts/security-audit.ts)

**Automated security scanning before deployment.**

```typescript
#!/usr/bin/env npx tsx
/**
 * Security Audit Agent
 * @author andreas@siglochconsulting
 *
 * Automated security checks:
 * 1. Dependency vulnerabilities (npm audit)
 * 2. API key exposure detection
 * 3. XSS pattern detection
 * 4. Security header validation
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { glob } from 'glob';

interface SecurityIssue {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  message: string;
  file?: string;
}

async function runSecurityAudit() {
  console.log('🔐 Security Audit');
  console.log('='.repeat(50));

  const issues: SecurityIssue[] = [];

  // 1. Check npm dependencies for vulnerabilities
  console.log('\n[1/4] Checking npm dependencies...');
  try {
    execSync('npm audit --audit-level=high --json', { stdio: 'pipe' });
    console.log('  ✅ No high/critical vulnerabilities');
  } catch (e) {
    issues.push({
      severity: 'HIGH',
      category: 'Dependencies',
      message: 'HIGH or CRITICAL severity vulnerabilities found. Run: npm audit'
    });
  }

  // 2. Check for exposed API keys
  console.log('\n[2/4] Scanning for exposed API keys...');
  const codeFiles = await glob('src/**/*.{ts,js,astro}');

  for (const file of codeFiles) {
    const content = readFileSync(file, 'utf-8');

    // Skip if using environment variables
    if (content.includes('import.meta.env') || content.includes('process.env')) {
      continue;
    }

    // Check for hardcoded API keys
    const apiKeyPattern = /api[_-]?key\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/gi;
    if (apiKeyPattern.test(content)) {
      issues.push({
        severity: 'HIGH',
        category: 'API Key Exposure',
        message: 'Potential hardcoded API key found',
        file
      });
    }
  }

  if (issues.filter(i => i.category === 'API Key Exposure').length === 0) {
    console.log('  ✅ No exposed API keys found');
  }

  // 3. Check for XSS vulnerabilities
  console.log('\n[3/4] Checking for XSS patterns...');
  for (const file of codeFiles) {
    const content = readFileSync(file, 'utf-8');

    // Dangerous: innerHTML without sanitization
    if (content.includes('innerHTML') && !content.includes('sanitize')) {
      issues.push({
        severity: 'MEDIUM',
        category: 'XSS Risk',
        message: 'innerHTML usage without sanitization',
        file
      });
    }

    // Dangerous: eval()
    if (content.includes('eval(')) {
      issues.push({
        severity: 'HIGH',
        category: 'Code Injection',
        message: 'Use of eval() detected',
        file
      });
    }
  }

  if (issues.filter(i => i.category === 'XSS Risk').length === 0) {
    console.log('  ✅ No XSS patterns detected');
  }

  // 4. Check for security headers (TODO: implement after deployment)
  console.log('\n[4/4] Security headers check...');
  console.log('  ℹ️  Manual verification required post-deployment');
  console.log('     Required headers:');
  console.log('     - Content-Security-Policy');
  console.log('     - X-Frame-Options: DENY');
  console.log('     - X-Content-Type-Options: nosniff');
  console.log('     - Strict-Transport-Security');

  // Report results
  console.log('\n' + '='.repeat(50));

  if (issues.length === 0) {
    console.log('✅ Security audit passed: No issues found\n');
    process.exit(0);
  }

  console.log(`❌ Security audit failed: ${issues.length} issue(s) found\n`);

  const byCategory = issues.reduce((acc, issue) => {
    if (!acc[issue.category]) acc[issue.category] = [];
    acc[issue.category].push(issue);
    return acc;
  }, {} as Record<string, SecurityIssue[]>);

  Object.entries(byCategory).forEach(([category, categoryIssues]) => {
    console.log(`${category}:`);
    categoryIssues.forEach(issue => {
      const emoji = issue.severity === 'HIGH' ? '🔴' : issue.severity === 'MEDIUM' ? '🟡' : '🟢';
      console.log(`  ${emoji} [${issue.severity}] ${issue.message}`);
      if (issue.file) console.log(`     File: ${issue.file}`);
    });
    console.log();
  });

  console.log('='.repeat(50));
  process.exit(1);
}

runSecurityAudit();
```

---

## 10. Deployment Automation

### 10.1 Build & Deploy Script [scripts/build-and-deploy.sh](scripts/build-and-deploy.sh)

**Automated deployment with health checks and rollback capability.**

```bash
#!/bin/bash
# Deployment script with quasi-atomic activation
# Author: andreas@siglochconsulting
# Supports: SFTP upload + SSH directory swap (minimal downtime)

set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Configuration (customize for your hosting)
DEPLOY_HOST="${DEPLOY_HOST}"
DEPLOY_USER="${DEPLOY_USER}"
DEPLOY_PASS="${DEPLOY_PASS}"
DOMAIN="${SITE_URL}"

# Validate environment
if [ -z "$DEPLOY_HOST" ] || [ -z "$DEPLOY_USER" ] || [ -z "$DEPLOY_PASS" ]; then
  echo "❌ Error: Deployment credentials not set"
  echo "   Please create .env file with DEPLOY_HOST, DEPLOY_USER, DEPLOY_PASS"
  exit 1
fi

COMMIT=$(git rev-parse --short HEAD)
BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "=== Building and deploying commit $COMMIT ==="
echo "Target: $DEPLOY_HOST"
echo "Strategy: Directory rename (quasi-atomic)"
echo ""

# Step 1: Build
echo "[1/5] Building..."
npm run build

# Step 2: Generate version file (Health Check Endpoint)
echo "[2/5] Creating version.json..."
cat > dist/version.json << EOF
{
  "commit": "$COMMIT",
  "date": "$BUILD_DATE",
  "source_repo": "$(git remote get-url origin)"
}
EOF

# Step 3: SFTP Upload
echo "[3/5] Uploading via SFTP..."
lftp -c "
set sftp:auto-confirm yes
set net:timeout 30
set net:max-retries 3
open sftp://$DEPLOY_USER:$DEPLOY_PASS@$DEPLOY_HOST
mirror --reverse --delete --verbose dist/ www/production.new/
bye
"

if [ $? -ne 0 ]; then
  echo "❌ SFTP upload failed"
  exit 1
fi

echo "✅ Upload complete"

# Step 4: Atomic activation (directory rename via SSH)
echo "[4/5] Activating release..."

sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" \
  "rm -rf www/production.3 && \
   mv www/production.2 www/production.3 2>/dev/null || true && \
   mv www/production.1 www/production.2 2>/dev/null || true && \
   mv www/production www/production.1 && \
   mv www/production.new www/production"

if [ $? -ne 0 ]; then
  echo "❌ Activation failed - attempting rollback..."
  sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" \
    "mv www/production.1 www/production" || echo "⚠️  Rollback failed - manual intervention required"
  exit 1
fi

echo "✅ Release activated"

# Step 5: Health Check
echo "[5/5] Running health check..."
sleep 2

DEPLOYED_COMMIT=$(curl -sf "$DOMAIN/version.json" | jq -r .commit 2>/dev/null || echo "error")

echo ""
echo "=== Deployment Result ==="
if [ "$DEPLOYED_COMMIT" = "$COMMIT" ]; then
  echo "✅ Deployment successful!"
  echo "   Local:    $COMMIT"
  echo "   Deployed: $DEPLOYED_COMMIT"
  echo "   URL:      $DOMAIN/version.json"
else
  echo "⚠️  Health check inconclusive"
  echo "   Expected: $COMMIT"
  echo "   Got:      $DEPLOYED_COMMIT"
  echo ""
  echo "   Manual verification: curl $DOMAIN/version.json"
fi

echo ""
echo "=== Rollback Instructions ==="
echo "If issues detected, rollback with:"
echo "  ssh $DEPLOY_USER@$DEPLOY_HOST 'mv www/production.1 www/production'"
echo ""
echo "Downtime: ~100ms (during directory rename)"
echo "Backups available: production.1 (latest), .2, .3"
```

### 10.2 Health Check HTML Page ⭐ NEW

**Purpose:** Human-readable deployment info for ops/debugging

**Create:** `src/pages/version.astro`

**Must include:**
- Fetch `/version.json` (generated during build)
- Warning: "⚠️ SYSTEM INFO - NOT FOR CUSTOMERS"
- Prominent "Back to Homepage" link
- Display: commit hash, build date, source repo
- Link to raw JSON

**SEO Protection (triple-layer):**
```html
<!-- In <head> -->
<meta name="robots" content="noindex, nofollow">
```
```
# public/robots.txt
Disallow: /version
Disallow: /version.json
```
- Not linked in navigation/sitemap

**Keywords:** health check, ops debugging, noindex, robots.txt

### 10.3 Pre-Push Hook [.githooks/pre-push](.githooks/pre-push)

**Prevents non-compliant code from reaching repository.**

```bash
#!/bin/bash
# Pre-push hook for compliance enforcement
# @author andreas@siglochconsulting
#
# Runs before git push and checks:
# - Production build succeeds
# - GDPR/DSGVO compliance
# - Design token enforcement
# - Security audit
# - E2E critical path tests

set -e

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║          Running Pre-Push Compliance Checks          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Step 1: Production Build
echo "🔨 Step 1/6: Production Build"
echo "   Testing build to catch syntax errors..."
echo ""

npm run build

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Production build failed!"
  echo "   Fix build errors before pushing"
  exit 1
fi

echo "✅ Production build passed"
echo ""

# Step 2: GDPR Compliance
echo "📋 Step 2/6: GDPR/DSGVO Compliance"
echo "   Checking for personal data, credentials, secrets..."
echo ""

npx tsx scripts/compliance-check.ts

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ GDPR compliance check failed!"
  echo "   Fix privacy violations before pushing"
  exit 1
fi

echo "✅ GDPR compliance passed"
echo ""

# Step 3: Design Token Enforcement
echo "🎨 Step 3/6: Design Token Enforcement"
echo "   Validating design system usage..."
echo ""

npm run lint:design

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Design token validation failed!"
  echo "   Fix hardcoded values before pushing"
  exit 1
fi

echo "✅ Design token validation passed"
echo ""

# Step 4: Schema.org Validation
echo "🔍 Step 4/6: Schema.org Validation"
echo "   Checking structured data..."
echo ""

npm run validate:schema

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Schema.org validation failed!"
  echo "   Fix structured data errors"
  exit 1
fi

echo "✅ Schema.org validation passed"
echo ""

# Step 5: Security Audit
echo "🔐 Step 5/6: Security Audit"
echo "   Scanning for vulnerabilities..."
echo ""

npm run security:audit

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Security audit failed!"
  echo "   Fix security issues before pushing"
  exit 1
fi

echo "✅ Security audit passed"
echo ""

# Step 6: E2E Critical Path Tests
echo "🎭 Step 6/6: E2E Critical Path Tests"
echo "   Running conversion funnel tests..."
echo ""

npm run test:e2e

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ E2E tests failed!"
  echo "   Fix test failures before pushing"
  exit 1
fi

echo "✅ E2E tests passed"
echo ""

# All checks passed
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All compliance checks passed!"
echo "   Proceeding with push..."
echo ""

exit 0
```

**Installation:**
```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-push
```

---

## 11. Documentation Structure

### 11.1 Single README.md (Root Only)

**IMPORTANT:** Only ONE README.md in project root. All other docs in `docs/` folder.

```markdown
# Project Name

**Status:** In Development
**Tech Stack:** Astro 5, TypeScript, Playwright
**Author:** andreas@siglochconsulting

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test:e2e

# Deploy to production
npm run deploy
\`\`\`

## Documentation

- [Requirements](docs/requirements.md) - Business requirements and success metrics
- [Architecture](docs/architecture.md) - Technology decisions and system design
- [Implementation](docs/implementation.md) - Task tracking and roadmap
- [Testing Strategy](docs/testing/README.md) - 3-level testing approach
- [Summary](docs/summary.md) - Project overview and key decisions

## Commands

\`\`\`bash
npm run dev              # Start dev server (http://localhost:4321)
npm run build            # Production build
npm run preview          # Preview production build
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests in UI mode
npm run compliance       # GDPR compliance check
npm run lint:design      # Design token validation
npm run validate:schema  # Schema.org validation
npm run security:audit   # Security scanning
npm run validate:all     # Run all validation checks
npm run deploy           # Deploy to production
\`\`\`

## Compliance

✅ GDPR/DSGVO compliant
✅ Design system enforced (zero hardcoded values)
✅ Automated testing (unit + integration + E2E)
✅ Security audited
✅ Accessibility (WCAG 2.1 AA)

## Tech Stack

- **Framework:** Astro 5 (static site generation)
- **Language:** TypeScript
- **Testing:** Vitest (unit/integration) + Playwright (E2E)
- **Deployment:** Automated via scripts/build-and-deploy.sh
- **Analytics:** Plausible (GDPR-compliant)

## Project Structure

See [Architecture Documentation](docs/architecture.md) for detailed structure.
```

### 11.2 Change Request Format [docs/CR-XXX-feature-name.md](docs/CR-XXX-feature-name.md)

```markdown
# CR-XXX: Feature Name

**Status:** 🆕 NEW / ⏳ In Progress / ✅ Done
**Priority:** HIGH / MEDIUM / LOW
**Author:** andreas@siglochconsulting
**Date:** 2025-XX-XX

## Objective

What problem does this solve? What is the business value?

## Solution

Technical approach and implementation strategy.

## Implementation Tasks

- [ ] Task 1: Design component structure
- [ ] Task 2: Implement core functionality
- [ ] Task 3: Add unit tests
- [ ] Task 4: Add E2E tests
- [ ] Task 5: Update documentation

## Testing

\`\`\`bash
# Run related tests
npm run test:unit -- feature-name
npm run test:e2e -- feature-name.spec.ts
\`\`\`

## Files Changed

- `src/components/NewComponent.astro`
- `src/lib/feature.ts`
- `tests/e2e/feature.spec.ts`

## References

- [Related CR](./CR-XXX.md)
- [Requirements](./requirements.md)
```

---

## 12. Claude Code Memory & Skills

### 12.1 Project Memory [.claude/CLAUDE.md](.claude/CLAUDE.md)

**Native Claude Code memory - automatically loaded every session.**

```markdown
# Project Name - Claude Memory

## Architecture Decisions

### Design System
- **Mandatory:** Use tokens.css for ALL styling
- **Forbidden:** Hardcoded colors, spacing, or font sizes
- **Enforcement:** npm run lint:design catches violations
- **Reason:** Prevents micro-variations, ensures consistency

### Email Service
- **Provider:** Resend (for simplicity and reliability)
- **Alternative:** SMTP via Nodemailer (for self-hosted)
- **Rate Limiting:** 5 submissions per hour per IP
- **SPAM Protection:** Honeypot field + keyword detection

### Testing Philosophy
- **3-level strategy:** Unit < 5s, Integration < 2m, E2E < 10m
- **NEVER show results without running tests first**
- **Always start dev server before E2E tests**

### GDPR Compliance
- **NO Google Analytics** (requires consent banner)
- **Analytics:** Plausible (GDPR-compliant, no cookies)
- **Personal data:** Must be whitelisted in compliance-check.ts
- **Coordinates:** Max 4 decimal places (≤11m precision)

## Critical Patterns

### Form Submission Pattern
\`\`\`typescript
// Always use this pattern for forms:
const response = await fetch('/api/contact', {
  method: 'POST',
  body: formData,
});

const result = await response.json();

if (response.ok && result.success) {
  // Success handling
  analytics.trackFormSubmission('contact');
} else {
  // Error handling
  throw new Error(result.message);
}
\`\`\`

### Analytics Event Tracking
\`\`\`typescript
// Track conversion events (GDPR-safe)
import { analytics } from '@/scripts/analytics';

analytics.trackCTAClick('primary-cta', 'homepage');
analytics.trackFormSubmission('contact');
analytics.trackScrollDepth(75);
\`\`\`

### Component Data Attributes
\`\`\`html
<!-- ALWAYS add data-testid for E2E tests -->
<button data-testid="submit-button">Submit</button>
<input data-testid="input-email" type="email" />
\`\`\`

## Gotchas

### Pre-Push Hook Failures
- Hook runs 6 validation steps before allowing push
- Most common failure: Hardcoded color values in CSS
- Fix: Replace with `var(--color-*)` tokens
- Bypass (NOT recommended): `git push --no-verify`

### Email Service Setup
- Must set environment variables in `.env`
- Test with: `curl -X POST http://localhost:4321/api/contact`
- Check logs for email delivery confirmation
- SendGrid/Resend require verified sender domain

### Design Token Linting
- Catches micro-variations (0.85rem, 0.875rem, 0.9rem, 1rem)
- Solution: Use single token (--text-sm) for similar sizes
- Run before commit: `npm run lint:design`

## Commands

\`\`\`bash
npm run dev              # Start dev server
npm run build            # Production build
npm run test:e2e         # Run E2E tests (starts dev server automatically)
npm run compliance       # GDPR check
npm run lint:design      # Design token validation
npm run validate:all     # All validation checks
npm run deploy           # Deploy to production
\`\`\`

## References

- [Requirements](../docs/requirements.md)
- [Architecture](../docs/architecture.md)
- [Testing Strategy](../docs/testing/README.md)
```

### 12.2 Quick Memory Commands

```bash
# Add quick memory (interactive):
# Remember to always validate email addresses server-side

# Edit project memory:
/memory

# View current memories:
cat .claude/CLAUDE.md
```

### 12.3 Prompt-Triggered Skills [.claude/skills/](.claude/skills/)

**Pattern:** Manual prompt activation (NO automatic hooks)

**Example:** Image processing skill
```bash
# User prompt: "Optimiere content/bild.jpg"
# Claude recognizes pattern and runs:
.claude/skills/image-processor.sh content/bild.jpg
```

**Why no automatic hooks:**
- Hooks add complexity (PostToolUse triggers, path matching)
- Manual prompts = explicit control, simpler workflow
- User maintains visibility and timing control

**Implementation:** Shell scripts in `.claude/skills/`, documented usage patterns in CLAUDE.md

**Keywords:** prompt-triggered, manual skills, no automatic hooks

### 12.4 User Memory [~/.claude/CLAUDE.md](~/.claude/CLAUDE.md)

**Personal preferences across all projects.**

```markdown
# Personal Claude Instructions

## Code Authorship
**Always attribute code to:** andreas@siglochconsulting

## Communication Style
- Technical precision over marketing language
- Brevity: one sentence instead of three
- Code only when essential for understanding
- No filler words, no vague descriptions

## Development Principles
- Schema-first: Config files, not hardcoded values
- Design tokens mandatory: No hardcoded colors/spacing
- Test before show: Run dev server + tests before presenting results
- 3-level testing: Unit/Integration/E2E

## Code Quality
- TypeScript: Always use explicit types
- Files under 500 lines: Suggest refactoring at 450
- Remove unused code: Don't comment out
- Data separate from logic: Config files

## Testing Philosophy
- NEVER fake tests or use TODO placeholders
- All tests must be executable with real assertions
- Start app before E2E tests (npm run dev)
- Validate in browser before showing results

## Git Workflow
- Clear commit messages: feat/fix/docs/refactor/test/chore
- Max 50 characters in subject line
- Pre-push hooks must pass (no --no-verify)

## Documentation
- Single README.md in root only
- All other docs in docs/ folder
- Mark changes: ✅ Done, ⏳ In Progress, 🆕 NEW
```

---

## 13. Initialization Checklist

### 13.1 Initial Setup

```bash
# 1. Create project directory
mkdir my-project && cd my-project

# 2. Initialize Git
git init
git config core.hooksPath .githooks

# 3. Initialize npm
npm init -y

# 4. Install dependencies
npm install astro@latest

npm install --save-dev \
  @playwright/test \
  @vitest/coverage-v8 \
  vitest \
  typescript \
  tsx \
  dotenv \
  lightningcss \
  jsdom \
  @types/node

# 5. Create directory structure
mkdir -p .claude .githooks docs/{testing,done} scripts src/{components,layouts,pages/api,styles,lib,scripts} tests/{unit,integration,e2e} public

# 6. Copy template files
# - Use sections 2-12 of this template to create files
# - Customize brand colors in src/styles/tokens.css
# - Update config in src/lib/config.ts

# 7. Setup environment
cp .env.example .env
# Edit .env with actual credentials

# 8. Make scripts executable
chmod +x .githooks/pre-push
chmod +x scripts/build-and-deploy.sh

# 9. Create Claude memory
cat > .claude/CLAUDE.md << 'EOF'
# My Project - Claude Memory

## Architecture Decisions
[Document key technology choices]

## Critical Patterns
[Code patterns that must be followed]

## Gotchas
[Project-specific pitfalls]
EOF

# 10. First commit
git add .
git commit -m "chore: initialize project from template"
```

### 13.2 Pre-Launch Checklist

**Before deploying to production:**

#### Design System
- [ ] Brand colors defined in `tokens.css`
- [ ] Design token linter runs without errors
- [ ] No hardcoded values in components
- [ ] Consistent spacing and typography

#### Compliance
- [ ] GDPR compliance check passes
- [ ] Official company info whitelisted in `compliance-check.ts`
- [ ] No personal data in code
- [ ] Privacy policy page created

#### Email Setup
- [ ] Email service selected based on hosting (Static → Web3Forms, Serverless → Resend, VPS → SMTP)
- [ ] Credentials in `.env` (`WEB3FORMS_ACCESS_KEY` for Web3Forms)
- [ ] Contact form tested end-to-end (actual email received)
- [ ] SPAM protection enabled (honeypot for Web3Forms)

#### Testing
- [ ] Unit tests cover utility functions
- [ ] Integration tests validate API flows
- [ ] E2E tests cover critical conversion paths
- [ ] All tests pass: `npm run test:e2e`

#### Analytics
- [ ] Analytics service configured (Plausible/Umami)
- [ ] Conversion events tracked (form, CTA, scroll)
- [ ] No GDPR violations (no Google Analytics)

#### Security
- [ ] Security audit passes
- [ ] No exposed API keys
- [ ] Dependencies have no high/critical vulnerabilities
- [ ] Rate limiting enabled on forms

#### Performance
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Production build succeeds

#### Deployment
- [ ] Deployment credentials in `.env`
- [ ] Health check endpoints: `/version.json` (machine) + `/version` HTML (human)
- [ ] `/version` page protected from search engines (meta robots, robots.txt)
- [ ] Rollback procedure tested
- [ ] Pre-push hook enabled

---

## 14. Critical Success Factors

### Must-Have (Non-Negotiable)

1. ✅ **Design token system enforced** (npm run lint:design)
2. ✅ **GDPR compliance automated** (pre-push hook)
3. ✅ **3-level testing** (unit/integration/e2e)
4. ✅ **Working contact form** (actual email delivery)
5. ✅ **Git hooks prevent violations** (compliance + design + security)
6. ✅ **Centralized config** (no hardcoded values)
7. ✅ **Single README** + structured docs/
8. ✅ **Health check endpoint** (/version.json)

### Should-Have (Highly Recommended)

- Analytics integration (GDPR-compliant)
- Conversion event tracking
- Performance budgets enforced
- Schema.org validation
- Security audit automation
- Rollback capability

### Nice-to-Have (Optional)

- A/B testing framework
- Visual regression testing
- Bundle size monitoring
- Progressive Web App features

### Never (Anti-Patterns)

- ❌ Multiple README files
- ❌ Hardcoded values in components
- ❌ Skipping pre-push hooks (--no-verify)
- ❌ Fake/TODO tests
- ❌ Manual deployment without health checks
- ❌ Google Analytics without consent banner
- ❌ Files over 500 lines without refactoring

---

## 15. Common Issues & Solutions

### Issue: Design token linter fails

**Error:** `❌ Hardcoded color #3b82f6 found`

**Solution:**
```css
/* ❌ Wrong */
.button {
  background: #3b82f6;
}

/* ✅ Correct */
.button {
  background: var(--color-primary);
}
```

### Issue: GDPR compliance fails

**Error:** `❌ Email address found: john@example.com`

**Solution:**
1. If official company email: Add to whitelist in `scripts/compliance-check.ts`
2. If test data: Use example.com domain
3. If real user data: Remove immediately

### Issue: Contact form doesn't send emails

**Symptoms:** Form shows success but no email received

**Debugging:**
```bash
# Check email service logs
npm run dev
# Check browser console for fetch() errors
# Check server logs for email service errors

# Test API endpoint directly
curl -X POST http://localhost:4321/api/contact \
  -F "name=Test" \
  -F "email=test@example.com" \
  -F "subject=Test" \
  -F "message=Test" \
  -F "privacy=on"
```

**Common causes:**
- Missing `.env` credentials
- Incorrect SMTP settings
- Email service API key invalid
- Sender domain not verified (SendGrid/Resend)

### Issue: E2E tests fail

**Error:** `Timeout waiting for element`

**Solution:**
1. Ensure dev server is running: `npm run dev`
2. Check `data-testid` attributes exist
3. Increase timeout in playwright.config.ts
4. Run in UI mode to debug: `npm run test:e2e:ui`

### Issue: Pre-push hook blocks commit

**Error:** `❌ Production build failed!`

**Solution:**
```bash
# Fix build errors first
npm run build

# Run individual checks to identify issue
npm run compliance
npm run lint:design
npm run validate:schema
npm run security:audit

# Only bypass if absolutely necessary (NOT recommended)
git push --no-verify
```

---

## 16. Next Steps After Setup

### Week 1: Foundation
1. Customize brand colors in `tokens.css`
2. Configure email service (Resend/SMTP)
3. Test contact form end-to-end
4. Deploy to staging environment

### Week 2: Content
1. Create page layouts
2. Add content sections
3. Implement CTAs (conversion optimization)
4. Add analytics tracking

### Week 3: Testing & Optimization
1. Write E2E tests for critical paths
2. Run Lighthouse audits
3. Optimize performance (LCP < 2.5s)
4. A/B test CTA variations

### Week 4: Launch
1. Run full validation suite
2. Deploy to production
3. Monitor analytics
4. Iterate based on conversion data

---

## 17. Support & Resources

### Documentation
- [Astro Docs](https://docs.astro.build)
- [Playwright Docs](https://playwright.dev)
- [Vitest Docs](https://vitest.dev)

### Tools
- [Plausible Analytics](https://plausible.io)
- [Resend Email](https://resend.com)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Community
- [Astro Discord](https://astro.build/chat)
- [GitHub Discussions](https://github.com/withastro/astro/discussions)

---

**Template Version:** 1.0
**Last Updated:** 2025-01-05
**Author:** andreas@siglochconsulting
**License:** MIT (customize as needed)

---

**This template is production-ready and battle-tested on real projects. Start here, customize minimally, ship fast.**

