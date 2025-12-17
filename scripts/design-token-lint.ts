#!/usr/bin/env npx tsx
/**
 * Design Token Linter
 * @author andreas@siglochconsulting
 *
 * Validates that CSS follows design system tokens
 * - No hardcoded colors (must use var(--color-*))
 * - No hardcoded spacing (must use defined tokens)
 * - No hardcoded font sizes (must use typography scale)
 * - Button sizes must match design system
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Design System Token Definitions
const DESIGN_TOKENS = {
  colors: {
    allowed: [
      '--color-primary',
      '--color-secondary',
      '--color-accent',
      '--color-background',
      '--color-foreground',
      '--color-muted',
      '--color-border',
    ],
    exceptions: [
      'transparent',
      'currentColor',
      'inherit',
      'white',
      'black',
      'rgba(0, 0, 0,', // shadows
      'rgba(255, 255, 255,', // shadows
      // External brand colors (social media)
      '#0077b5', '#006399', // LinkedIn
      '#1da1f2', '#1a8cd8', // Twitter/X
    ]
  },

  spacing: {
    // Allowed spacing values (rem/px)
    allowed: [
      '0', '0px', '0rem',
      '0.25rem', '0.5rem', '0.75rem',
      '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem', '4rem',
      '50px', '56px', '100px', // specific component sizes
    ]
  },

  typography: {
    // Font size scale (from tokens.css) - strict, no micro-variations
    sizes: [
      '0.75rem',   // --text-xs (12px)
      '0.875rem',  // --text-sm (14px)
      '1rem',      // --text-base (16px)
      '1.125rem',  // --text-lg (18px)
      '1.25rem',   // --text-xl (20px)
      '1.5rem',    // --text-2xl (24px)
      '1.875rem',  // --text-3xl (30px)
      '2rem', '2.25rem', '2.5rem', // larger sizes
      '3rem'       // --text-5xl (48px)
    ],
    weights: ['400', '500', '600', '700', '800']
  },

  breakpoints: {
    allowed: ['480px', '600px', '768px', '1024px', '1280px', '1920px']
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

    const files = await glob('src/**/*.astro');

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
      if (line.includes('<style>')) inStyleBlock = true;
      if (line.includes('</style>')) inStyleBlock = false;

      if (!inStyleBlock) return;

      // Check for hardcoded colors
      this.checkColors(filePath, lineNum, line);

      // Check for hardcoded spacing
      this.checkSpacing(filePath, lineNum, line);

      // Check for hardcoded font sizes
      this.checkTypography(filePath, lineNum, line);

      // Check breakpoints
      this.checkBreakpoints(filePath, lineNum, line);
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

    // Check for gradient colors
    const gradientMatch = /linear-gradient\([^)]+#[0-9a-fA-F]+/g.exec(content);
    if (gradientMatch) {
      this.violations.push({
        file,
        line,
        property: 'gradient',
        value: gradientMatch[0],
        reason: 'Hardcoded color in gradient - use var(--color-*)',
        severity: 'warning'
      });
    }
  }

  private checkSpacing(file: string, line: number, content: string): void {
    // Check padding/margin (but exclude border properties)
    const spacingProps = /\b(?:padding|margin|gap):\s*([^;]+);/g;
    let match;

    while ((match = spacingProps.exec(content)) !== null) {
      const value = match[1].trim();

      // Skip auto, %, calc(), var()
      if (/auto|%|calc\(|var\(/.test(value)) continue;

      // Parse multiple values (e.g., "1rem 2rem")
      const values = value.split(/\s+/);

      values.forEach(val => {
        if (val === '') return;

        // Check if it's an allowed spacing value
        if (!DESIGN_TOKENS.spacing.allowed.includes(val)) {
          this.violations.push({
            file,
            line,
            property: match[0].split(':')[0],
            value: val,
            reason: `Non-standard spacing value. Use: ${DESIGN_TOKENS.spacing.allowed.slice(0, 8).join(', ')}...`,
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
          reason: `Non-standard font size. Use typography scale: ${DESIGN_TOKENS.typography.sizes.join(', ')}`,
          severity: 'warning'
        });
      }
    }
  }

  private checkBreakpoints(file: string, line: number, content: string): void {
    const breakpointMatch = /@media\s*\([^)]*(?:max-width|min-width):\s*(\d+px)/.exec(content);

    if (breakpointMatch) {
      const value = breakpointMatch[1];

      if (!DESIGN_TOKENS.breakpoints.allowed.includes(value)) {
        this.violations.push({
          file,
          line,
          property: '@media',
          value,
          reason: `Non-standard breakpoint. Use: ${DESIGN_TOKENS.breakpoints.allowed.join(', ')}`,
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
