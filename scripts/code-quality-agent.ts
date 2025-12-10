#!/usr/bin/env node
/**
 * Code Quality Agent
 * @author andreas@siglochconsulting
 *
 * Checks for code quality issues during development:
 * 1. TODO/FIXME/HACK comments
 * 2. console.log/error statements in production code
 * 3. Hardcoded URLs/endpoints (should use config)
 * 4. Magic numbers without named constants
 * 5. File size warnings (>500 LOC)
 *
 * Triggered: post-commit hook (non-blocking warnings)
 * Purpose: Preventive validation during development
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

interface QualityViolation {
  type: 'error' | 'warning' | 'info';
  category: string;
  file: string;
  line?: number;
  message: string;
  context?: string;
}

const violations: QualityViolation[] = [];

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

/**
 * Patterns for code quality checks
 */
const PATTERNS = {
  // TODO/FIXME comments
  todoComments: [
    /\b(TODO|FIXME|HACK|XXX|STUB|MOCK|PLACEHOLDER)\b/gi,
  ],

  // Console statements
  consoleStatements: [
    /console\.(log|error|warn|debug|info)\(/g,
  ],

  // Hardcoded URLs (excluding examples, localhost, comments)
  hardcodedUrls: [
    /(?<!\/\/.*)(https?:\/\/(?!example\.com|localhost|127\.0\.0\.1)[\w.-]+\.[a-z]{2,})/gi,
  ],

  // Magic numbers (numbers >99 without context)
  magicNumbers: [
    /(?<!\/\/.*)\b([1-9]\d{2,})\b(?!\s*\/\/|ms|px|rem|%|s\b)/g,
  ],
};

/**
 * Files and patterns to skip
 */
const SKIP_FILES = [
  'scripts/code-quality-agent.ts',
  'scripts/compliance-check.ts',
  'scripts/bfsg-agent.ts',
  'scripts/design-token-lint.ts',
  'vitest.config.ts',
  'playwright.config.ts',
  'astro.config.mjs',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  '.env',
  '.env.example',
];

const SKIP_DIRECTORIES = [
  'node_modules',
  'dist',
  '.git',
  '.astro',
  '__tests__',
  'tests',
  '.claude',
  'docs',
];

const SKIP_EXTENSIONS = [
  '.md',
  '.json',
  '.yml',
  '.yaml',
  '.txt',
  '.lock',
  '.png',
  '.jpg',
  '.svg',
  '.ico',
];

/**
 * Allowed console patterns (exceptions)
 */
const ALLOWED_CONSOLE_PATTERNS = [
  /console\.error\(.*catch/i,           // Error handlers
  /console\.log\(.*\bDEBUG\b/,          // Debug flags (exact word)
  /^\s*\/\/.*console\./,                // Commented out (line starts with //)
  /console\.(log|error)\(.*TODO/i,      // Temporary debug
];

/**
 * Get list of files to check (modified files in last commit)
 */
function getFilesToCheck(): string[] {
  try {
    // Check git-modified files (last commit)
    const output = execSync('git diff HEAD~1 --name-only --diff-filter=ACMR 2>/dev/null || git ls-files', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });

    return output
      .split('\n')
      .filter(Boolean)
      .filter((file) => {
        // Skip files in skip list
        if (SKIP_FILES.some((skip) => file.includes(skip))) return false;

        // Skip directories
        if (SKIP_DIRECTORIES.some((dir) => file.includes(dir))) return false;

        // Skip by extension
        if (SKIP_EXTENSIONS.some((ext) => file.endsWith(ext))) return false;

        // Only check source files
        return /\.(ts|tsx|astro|js|jsx)$/.test(file);
      })
      .filter((file) => existsSync(file));
  } catch (error) {
    // Fallback: check all source files
    try {
      const output = execSync('git ls-files', { encoding: 'utf-8' });
      return output.split('\n').filter((f) => /\.(ts|tsx|astro|js|jsx)$/.test(f) && existsSync(f));
    } catch {
      return [];
    }
  }
}

/**
 * Check file for TODO/FIXME comments
 */
function checkTodoComments(file: string, content: string): void {
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip if in a comment that explains something (e.g., "// TODO: implement later")
    // Only flag standalone TODOs without explanation
    PATTERNS.todoComments.forEach((pattern) => {
      const matches = line.match(pattern);
      if (matches) {
        const match = matches[0];
        const restOfLine = line.substring(line.indexOf(match) + match.length).trim();

        violations.push({
          type: 'warning',
          category: 'TODO Comment',
          file,
          line: index + 1,
          message: `${match} comment found${restOfLine ? ': ' + restOfLine.substring(0, 50) : ''}`,
          context: line.trim(),
        });
      }
    });
  });
}

/**
 * Check file for console statements
 */
function checkConsoleStatements(file: string, content: string): void {
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip if matches allowed patterns
    if (ALLOWED_CONSOLE_PATTERNS.some((pattern) => pattern.test(line))) {
      return;
    }

    // Create new regex for each line (avoids lastIndex issues)
    const consolePattern = /console\.(log|error|warn|debug|info)\(/;
    if (consolePattern.test(line)) {
      violations.push({
        type: 'warning',
        category: 'Console Statement',
        file,
        line: index + 1,
        message: 'console statement in production code',
        context: line.trim(),
      });
    }
  });
}

/**
 * Check file for hardcoded URLs
 */
function checkHardcodedUrls(file: string, content: string): void {
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;

    // Skip if in config.ts (URLs are expected there)
    if (file.includes('config.ts')) return;

    PATTERNS.hardcodedUrls.forEach((pattern) => {
      const matches = [...line.matchAll(pattern)];
      matches.forEach((match) => {
        violations.push({
          type: 'warning',
          category: 'Hardcoded URL',
          file,
          line: index + 1,
          message: `Hardcoded URL found: ${match[1]} (should use config)`,
          context: line.trim(),
        });
      });
    });
  });
}

/**
 * Check file for magic numbers
 */
function checkMagicNumbers(file: string, content: string): void {
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments, imports, config files
    if (
      line.trim().startsWith('//') ||
      line.trim().startsWith('*') ||
      line.trim().startsWith('import') ||
      file.includes('config.')
    ) {
      return;
    }

    PATTERNS.magicNumbers.forEach((pattern) => {
      const matches = [...line.matchAll(pattern)];
      matches.forEach((match) => {
        const number = match[1];

        // Skip common values
        if (['100', '200', '404', '500', '1000', '2000'].includes(number)) return;

        violations.push({
          type: 'info',
          category: 'Magic Number',
          file,
          line: index + 1,
          message: `Magic number ${number} without named constant`,
          context: line.trim(),
        });
      });
    });
  });
}

/**
 * Check file size
 */
function checkFileSize(file: string): void {
  try {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n').length;

    if (lines > 500) {
      violations.push({
        type: 'info',
        category: 'File Size',
        file,
        message: `File has ${lines} lines (>500 LOC recommended limit)`,
      });
    }
  } catch (error) {
    // Skip if file can't be read
  }
}

/**
 * Scan a single file
 */
function scanFile(file: string): void {
  try {
    const content = readFileSync(file, 'utf-8');

    checkTodoComments(file, content);
    checkConsoleStatements(file, content);
    checkHardcodedUrls(file, content);
    checkMagicNumbers(file, content);
    checkFileSize(file);
  } catch (error) {
    // Skip files that can't be read
  }
}

/**
 * Print violations report
 */
function printReport(files: string[]): void {
  console.log(`\n${colors.blue}${colors.bold}🔍 Code Quality Agent${colors.reset}`);
  console.log('━'.repeat(60));
  console.log(`${colors.dim}📂 Checked ${files.length} file(s)${colors.reset}\n`);

  if (violations.length === 0) {
    console.log(`${colors.green}✓ No code quality issues found${colors.reset}`);
    console.log('━'.repeat(60));
    return;
  }

  // Group by severity
  const errors = violations.filter((v) => v.type === 'error');
  const warnings = violations.filter((v) => v.type === 'warning');
  const info = violations.filter((v) => v.type === 'info');

  // Print errors
  if (errors.length > 0) {
    console.log(`${colors.red}${colors.bold}❌ ${errors.length} Error(s):${colors.reset}\n`);
    errors.forEach((v) => {
      console.log(`   ${colors.red}${v.file}:${v.line || '?'}${colors.reset}`);
      console.log(`   └─ ${v.message}`);
      if (v.context) {
        console.log(`      ${colors.dim}${v.context.substring(0, 80)}${colors.reset}`);
      }
      console.log();
    });
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}⚠️  ${warnings.length} Warning(s):${colors.reset}\n`);
    warnings.forEach((v) => {
      console.log(`   ${colors.yellow}${v.file}:${v.line || '?'}${colors.reset}`);
      console.log(`   └─ ${v.message}`);
      if (v.context) {
        console.log(`      ${colors.dim}${v.context.substring(0, 80)}${colors.reset}`);
      }
      console.log();
    });
  }

  // Print info (only if verbose or strict mode)
  const isStrict = process.argv.includes('--strict');
  const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');

  if (info.length > 0 && (isVerbose || isStrict)) {
    console.log(`${colors.blue}${colors.bold}ℹ️  ${info.length} Info Item(s):${colors.reset}\n`);
    info.forEach((v) => {
      console.log(`   ${colors.blue}${v.file}:${v.line || '?'}${colors.reset}`);
      console.log(`   └─ ${v.message}`);
      console.log();
    });
  }

  console.log('━'.repeat(60));
  console.log(
    `${colors.bold}📊 Summary:${colors.reset} ${errors.length} error(s), ${warnings.length} warning(s)${
      isVerbose || isStrict ? `, ${info.length} info item(s)` : ''
    }`
  );

  if (errors.length > 0) {
    console.log(`${colors.red}❌ Code quality check failed${colors.reset}\n`);
  } else if (warnings.length > 0) {
    console.log(`${colors.yellow}⚠️  Code quality check passed with warnings${colors.reset}\n`);
  } else {
    console.log(`${colors.green}✓ Code quality check passed${colors.reset}\n`);
  }
}

/**
 * Main execution
 */
function main(): number {
  const files = getFilesToCheck();

  if (files.length === 0) {
    console.log(`${colors.dim}ℹ️  No files to check${colors.reset}`);
    return 0;
  }

  files.forEach(scanFile);
  printReport(files);

  const isStrict = process.argv.includes('--strict');
  const errors = violations.filter((v) => v.type === 'error');
  const warnings = violations.filter((v) => v.type === 'warning');

  // In strict mode, warnings also block
  if (isStrict && (errors.length > 0 || warnings.length > 0)) {
    return 1;
  }

  // In normal mode, only errors block
  if (errors.length > 0) {
    return 1;
  }

  return 0;
}

// Execute
process.exit(main());
