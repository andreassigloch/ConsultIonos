/**
 * SEO Pre-Deployment Check
 * @author andreas@siglochconsulting
 *
 * Validates SEO requirements before deployment:
 * - Duplicate page titles
 * - Missing meta descriptions
 * - Broken internal links (404)
 * - Missing images/assets
 *
 * Run: npx tsx scripts/seo-check.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const DIST_DIR = './dist';

// Pages excluded from indexing (robots.txt Disallow or technical pages) - skip extended checks
const EXCLUDED_PATHS = ['/admin/', '/version/', '/version.json', '/404.html'];

interface PageInfo {
  file: string;
  title: string;
  description: string;
}

interface BrokenLink {
  source: string;
  target: string;
  type: 'href' | 'src';
}

interface SEOReport {
  duplicateTitles: Map<string, string[]>;
  missingDescriptions: string[];
  brokenLinks: BrokenLink[];
  missingImages: BrokenLink[];
  errors: string[];
}

function extractMetaFromHTML(content: string, filePath: string): PageInfo | null {
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descMatch =
    content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
    content.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);

  return {
    file: filePath,
    title: titleMatch?.[1]?.trim() || '',
    description: descMatch?.[1]?.trim() || '',
  };
}

function extractLinks(content: string): { hrefs: string[]; srcs: string[] } {
  const hrefs: string[] = [];
  const srcs: string[] = [];

  // Extract href attributes (links)
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/gi);
  for (const match of hrefMatches) {
    hrefs.push(match[1]);
  }

  // Extract src attributes (images, scripts)
  const srcMatches = content.matchAll(/src=["']([^"']+)["']/gi);
  for (const match of srcMatches) {
    srcs.push(match[1]);
  }

  // Extract srcset attributes (responsive images)
  const srcsetMatches = content.matchAll(/srcset=["']([^"']+)["']/gi);
  for (const match of srcsetMatches) {
    // srcset can contain multiple URLs separated by commas
    const urls = match[1].split(',').map((s) => s.trim().split(' ')[0]);
    srcs.push(...urls);
  }

  return { hrefs, srcs };
}

function isInternalLink(url: string): boolean {
  // Skip external links, anchors, mailto, tel, javascript
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//') ||
    url.startsWith('#') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('javascript:') ||
    url.startsWith('data:')
  ) {
    return false;
  }
  return true;
}

function resolveInternalPath(url: string, sourceFile: string): string {
  // Remove query string and hash
  let cleanUrl = url.split('?')[0].split('#')[0];

  // Handle absolute paths
  if (cleanUrl.startsWith('/')) {
    return path.join(DIST_DIR, cleanUrl);
  }

  // Handle relative paths
  const sourceDir = path.dirname(sourceFile);
  return path.join(sourceDir, cleanUrl);
}

function fileExists(filePath: string): boolean {
  // Check exact path
  if (fs.existsSync(filePath)) {
    return true;
  }

  // For URLs without extension, check if it's a directory with index.html
  if (!path.extname(filePath)) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return true;
    }
    // Also check with trailing slash removed + index.html
    if (fs.existsSync(filePath + '/index.html')) {
      return true;
    }
  }

  return false;
}

function findHTMLFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function checkDuplicateTitles(pages: PageInfo[]): Map<string, string[]> {
  const titleMap = new Map<string, string[]>();

  for (const page of pages) {
    if (!page.title) continue;

    const existing = titleMap.get(page.title) || [];
    existing.push(page.file);
    titleMap.set(page.title, existing);
  }

  // Filter to only duplicates
  const duplicates = new Map<string, string[]>();
  for (const [title, files] of titleMap) {
    if (files.length > 1) {
      duplicates.set(title, files);
    }
  }

  return duplicates;
}

function checkBrokenLinks(htmlFiles: string[]): { brokenLinks: BrokenLink[]; missingImages: BrokenLink[] } {
  const brokenLinks: BrokenLink[] = [];
  const missingImages: BrokenLink[] = [];
  const checkedPaths = new Map<string, boolean>();

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { hrefs, srcs } = extractLinks(content);

    // Check hrefs (links)
    for (const href of hrefs) {
      if (!isInternalLink(href)) continue;

      const resolvedPath = resolveInternalPath(href, file);

      // Cache check results
      if (!checkedPaths.has(resolvedPath)) {
        checkedPaths.set(resolvedPath, fileExists(resolvedPath));
      }

      if (!checkedPaths.get(resolvedPath)) {
        brokenLinks.push({
          source: file,
          target: href,
          type: 'href',
        });
      }
    }

    // Check srcs (images, scripts)
    for (const src of srcs) {
      if (!isInternalLink(src)) continue;

      const resolvedPath = resolveInternalPath(src, file);

      // Cache check results
      if (!checkedPaths.has(resolvedPath)) {
        checkedPaths.set(resolvedPath, fileExists(resolvedPath));
      }

      if (!checkedPaths.get(resolvedPath)) {
        missingImages.push({
          source: file,
          target: src,
          type: 'src',
        });
      }
    }
  }

  // Deduplicate by target (same missing asset may be referenced multiple times)
  const uniqueBrokenLinks = deduplicateBrokenLinks(brokenLinks);
  const uniqueMissingImages = deduplicateBrokenLinks(missingImages);

  return { brokenLinks: uniqueBrokenLinks, missingImages: uniqueMissingImages };
}

function deduplicateBrokenLinks(links: BrokenLink[]): BrokenLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = link.target;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function runSEOCheck(): SEOReport {
  const report: SEOReport = {
    duplicateTitles: new Map(),
    missingDescriptions: [],
    brokenLinks: [],
    missingImages: [],
    errors: [],
  };

  if (!fs.existsSync(DIST_DIR)) {
    report.errors.push(`Build directory not found: ${DIST_DIR}. Run 'npm run build' first.`);
    return report;
  }

  const htmlFiles = findHTMLFiles(DIST_DIR);
  const pages: PageInfo[] = [];

  for (const file of htmlFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const pageInfo = extractMetaFromHTML(content, file);
      if (pageInfo) {
        pages.push(pageInfo);

        // Only check descriptions for indexed pages
        const relativePath = '/' + file.replace(/^\.?\/?(dist\/)?/, '');
        const isExcluded = EXCLUDED_PATHS.some((p) => relativePath.startsWith(p));
        if (!pageInfo.description && !isExcluded) {
          report.missingDescriptions.push(file);
        }
      }
    } catch (err) {
      report.errors.push(`Error reading ${file}: ${err}`);
    }
  }

  report.duplicateTitles = checkDuplicateTitles(pages);

  // Check for broken links and missing images
  const { brokenLinks, missingImages } = checkBrokenLinks(htmlFiles);
  report.brokenLinks = brokenLinks;
  report.missingImages = missingImages;

  return report;
}

function printReport(report: SEOReport): boolean {
  let hasIssues = false;

  console.log('\n=== SEO Pre-Deployment Check ===\n');

  // Broken Links (CRITICAL - blocks deployment)
  if (report.brokenLinks.length > 0) {
    hasIssues = true;
    console.log('❌ BROKEN INTERNAL LINKS (404):');
    console.log('   These links point to non-existent pages.\n');

    for (const link of report.brokenLinks) {
      const sourcePath = link.source.replace(DIST_DIR, '').replace('/index.html', '/');
      console.log(`   ${link.target}`);
      console.log(`      ← found in: ${sourcePath}`);
    }
    console.log('');
  } else {
    console.log('✅ No broken internal links');
  }

  // Missing Images/Assets (CRITICAL - blocks deployment)
  if (report.missingImages.length > 0) {
    hasIssues = true;
    console.log('❌ MISSING IMAGES/ASSETS (404):');
    console.log('   These files are referenced but do not exist.\n');

    for (const img of report.missingImages) {
      const sourcePath = img.source.replace(DIST_DIR, '').replace('/index.html', '/');
      console.log(`   ${img.target}`);
      console.log(`      ← found in: ${sourcePath}`);
    }
    console.log('');
  } else {
    console.log('✅ All images and assets exist');
  }

  // Duplicate Titles (warn only - fix required in PropStack)
  if (report.duplicateTitles.size > 0) {
    // Note: Don't set hasIssues=true, as this requires PropStack fix
    console.log('⚠️  DUPLICATE TITLES FOUND:');
    console.log('   (Fix in PropStack - gleiche rs_name für verschiedene Objekte)');
    console.log('   See: docs/seo-findings.md\n');

    for (const [title, files] of report.duplicateTitles) {
      console.log(`   Title: "${title}"`);
      for (const file of files) {
        const relativePath = file.replace(DIST_DIR, '').replace('/index.html', '/');
        console.log(`      → ${relativePath}`);
      }
      console.log('');
    }
  } else {
    console.log('✅ No duplicate titles found');
  }

  // Missing Descriptions (warn only)
  if (report.missingDescriptions.length > 0) {
    console.log(`⚠️  ${report.missingDescriptions.length} pages without meta description`);
  } else {
    console.log('✅ All pages have meta descriptions');
  }

  // Errors
  if (report.errors.length > 0) {
    hasIssues = true;
    console.log('\n❌ ERRORS:');
    for (const error of report.errors) {
      console.log(`   ${error}`);
    }
  }

  console.log('\n================================\n');

  return hasIssues;
}

// Main
const report = runSEOCheck();
const hasIssues = printReport(report);

if (hasIssues) {
  console.log('SEO check failed. Fix issues before deployment.\n');
  process.exit(1);
} else {
  console.log('SEO check passed.\n');
  process.exit(0);
}
