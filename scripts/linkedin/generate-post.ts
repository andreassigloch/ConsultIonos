/**
 * LinkedIn Post Generator
 * @author andreas@siglochconsulting.de
 *
 * Generiert LinkedIn-Posts aus Blog-Artikeln:
 * - Hook: Max 140 Zeichen (vor "See more")
 * - Body: 800-1.200 Zeichen Kerninhalt
 * - CTA: Frage oder Aufforderung
 * - Hashtags: 3-5 am Ende
 * - Link: Im ersten Kommentar (Algorithmus-optimiert)
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import {
  type PostTemplate,
  formatPost,
  formatLinkComment,
  validatePost,
  DEFAULT_POST_CONFIG,
  type PostConfig,
  type ValidationResult,
} from './templates.js';

const SITE_URL = 'https://siglochconsulting.de';
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// =============================================================================
// Types
// =============================================================================

interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: Date;
  tags?: string[];
  hashtags?: string[];
  linkedinStatus?: 'draft' | 'planned' | 'published';
  linkedinType?: 'post' | 'article';
  linkedinHook?: string;
  image?: string;
  series?: string;
}

export interface LinkedInPost {
  slug: string;
  title: string;
  hook: string;
  body: string;
  cta: string;
  text: string;
  hashtags: string[];
  hashtagString: string;
  url: string;
  linkComment: string;
  imagePath?: string;
  validation: ValidationResult;
}

// =============================================================================
// Content Extraction
// =============================================================================

/**
 * Extrahiert Hook aus Frontmatter oder generiert aus Description
 * Max 140 Zeichen, muss standalone funktionieren
 */
function extractHook(
  frontmatter: BlogFrontmatter,
  _content: string,
  maxLength: number = DEFAULT_POST_CONFIG.hookMaxLength
): string {
  // 1. Expliziter Hook im Frontmatter
  if (frontmatter.linkedinHook) {
    return frontmatter.linkedinHook.substring(0, maxLength);
  }

  // 2. Aus Description generieren
  const description = frontmatter.description;

  // Wenn Description kurz genug, direkt verwenden
  if (description.length <= maxLength) {
    return description;
  }

  // Kürzen bei Satzende
  const shortened = description.substring(0, maxLength);
  const lastPeriod = shortened.lastIndexOf('.');
  const lastQuestion = shortened.lastIndexOf('?');
  const lastExclamation = shortened.lastIndexOf('!');

  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

  if (lastSentenceEnd > maxLength * 0.6) {
    return shortened.substring(0, lastSentenceEnd + 1);
  }

  // Fallback: Wort-Grenze
  const lastSpace = shortened.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return shortened.substring(0, lastSpace) + '...';
  }

  return shortened + '...';
}

/**
 * Extrahiert Body aus Content
 * Ziel: 800-1.200 Zeichen mit Kernaussagen
 */
function extractBody(
  _frontmatter: BlogFrontmatter,
  content: string,
  targetLength: number = 1000
): string {
  const lines: string[] = [];

  // 1. Finde Blockquotes (Kernthesen) - höchste Priorität
  const blockquoteRegex = /^>\s*\*\*(.+?)\*\*\s*(.*)$/gm;
  const blockquotes: string[] = [];
  let match;

  while ((match = blockquoteRegex.exec(content)) !== null) {
    const quote = match[1] + (match[2] ? ' ' + match[2] : '');
    blockquotes.push(quote.trim());
  }

  // 2. Finde erste Absätze nach Überschriften
  const paragraphs = content
    .split(/\n\n+/)
    .filter(p => {
      const trimmed = p.trim();
      // Keine Überschriften, keine Code-Blöcke, keine Listen
      return (
        trimmed.length > 0 &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('```') &&
        !trimmed.startsWith('*Tech:') &&
        !trimmed.startsWith('- ') &&
        !trimmed.startsWith('> ') &&
        !trimmed.includes('[') // Keine Links
      );
    })
    .map(p => p.replace(/\*\*/g, '').trim());

  // 3. Baue Body zusammen
  let currentLength = 0;

  // Erste Kernthese als Opener
  if (blockquotes.length > 0) {
    lines.push(blockquotes[0]);
    currentLength += blockquotes[0].length;
  }

  // Wichtigste Absätze hinzufügen
  for (const para of paragraphs.slice(0, 3)) {
    if (currentLength + para.length > targetLength) {
      break;
    }
    lines.push('');
    lines.push(para);
    currentLength += para.length + 1;
  }

  // Falls zu kurz, mehr Absätze hinzufügen
  if (currentLength < targetLength * 0.6 && paragraphs.length > 3) {
    for (const para of paragraphs.slice(3, 5)) {
      if (currentLength + para.length > targetLength * 1.2) {
        break;
      }
      lines.push('');
      lines.push(para);
      currentLength += para.length + 1;
    }
  }

  return lines.join('\n').trim();
}

/**
 * Generiert CTA (Call-to-Action)
 */
function generateCTA(frontmatter: BlogFrontmatter, _content: string): string {
  // Frage basierend auf Thema
  const tags = frontmatter.tags || [];

  if (tags.includes('Strategie') || tags.includes('KI')) {
    return 'Wo steht Ihr Unternehmen auf der Datenreife-Leiter?';
  }

  if (tags.includes('Systems Engineering') || tags.includes('MBSE')) {
    return 'Wie strukturiert ist Ihre Datenbasis?';
  }

  if (frontmatter.series) {
    return `Mehr zur ${frontmatter.series}-Serie im Artikel.`;
  }

  return 'Was sind Ihre Erfahrungen?';
}

/**
 * Generiert Hashtags aus Tags und Serie
 */
function generateHashtags(
  frontmatter: BlogFrontmatter,
  count: number = DEFAULT_POST_CONFIG.hashtagCount
): string[] {
  const hashtags: string[] = [];

  // 1. Explizite Hashtags aus Frontmatter
  if (frontmatter.hashtags && frontmatter.hashtags.length > 0) {
    hashtags.push(...frontmatter.hashtags);
  }

  // 2. Serie als Hashtag
  if (frontmatter.series) {
    const seriesTag = frontmatter.series.replace(/\s+/g, '');
    if (!hashtags.includes(seriesTag)) {
      hashtags.push(seriesTag);
    }
  }

  // 3. Aus Tags generieren
  const fromTags = (frontmatter.tags || [])
    .map(tag => tag.replace(/\s+/g, '').replace(/[^a-zA-ZäöüÄÖÜ0-9]/g, ''))
    .filter(tag => tag.length > 2 && !hashtags.includes(tag));

  hashtags.push(...fromTags);

  // 4. Standard-Hashtags als Fallback
  const baseHashtags = ['SystemsEngineering', 'GenAI'];
  for (const base of baseHashtags) {
    if (!hashtags.includes(base) && hashtags.length < count) {
      hashtags.push(base);
    }
  }

  // Deduplizieren und limitieren
  return [...new Set(hashtags)].slice(0, count);
}

// =============================================================================
// Main Generator
// =============================================================================

/**
 * Generiert LinkedIn-Post aus Artikel
 */
export function generateLinkedInPost(
  slug: string,
  frontmatter: BlogFrontmatter,
  content: string,
  config: PostConfig = DEFAULT_POST_CONFIG
): LinkedInPost {
  const url = `${SITE_URL}/blog/${slug}`;

  // Komponenten extrahieren
  const hook = extractHook(frontmatter, content, config.hookMaxLength);
  const body = extractBody(frontmatter, content, config.targetLength - 200);
  const cta = generateCTA(frontmatter, content);
  const hashtags = generateHashtags(frontmatter, config.hashtagCount);

  // Template zusammenbauen
  const template: PostTemplate = {
    hook,
    body,
    cta,
    hashtags,
    linkComment: formatLinkComment(url, frontmatter.title),
  };

  // Post-Text generieren
  const text = formatPost(template, config);

  // Validieren
  const validation = validatePost(text, hook, hashtags);

  return {
    slug,
    title: frontmatter.title,
    hook,
    body,
    cta,
    text,
    hashtags,
    hashtagString: hashtags.map(h => `#${h}`).join(' '),
    url,
    linkComment: template.linkComment,
    imagePath: frontmatter.image,
    validation,
  };
}

// =============================================================================
// File Operations
// =============================================================================

/**
 * Findet alle Artikel mit linkedinStatus: 'planned'
 */
export async function findPlannedArticles(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const planned: string[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(BLOG_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(content);

    if (data.linkedinStatus === 'planned') {
      planned.push(file.replace('.md', ''));
    }
  }

  return planned;
}

/**
 * Liest Artikel und generiert Post
 */
export async function processArticle(
  slug: string,
  config: PostConfig = DEFAULT_POST_CONFIG
): Promise<LinkedInPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return generateLinkedInPost(slug, data as BlogFrontmatter, content, config);
}

// =============================================================================
// CLI
// =============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Alle geplanten Artikel
    const planned = await findPlannedArticles();

    if (planned.length === 0) {
      console.log('Keine Artikel mit linkedinStatus: "planned" gefunden.');
      process.exit(0);
    }

    console.log(`\n📝 ${planned.length} Artikel mit Status "planned":\n`);

    for (const slug of planned) {
      const post = await processArticle(slug);
      console.log('─'.repeat(60));
      console.log(`📄 ${post.title}`);
      console.log(`🔗 ${post.url}`);
      console.log(`🖼️  ${post.imagePath || 'Kein Bild'}`);
      console.log('');
      console.log('--- POST TEXT ---');
      console.log(post.text);
      console.log('');
      console.log('--- ERSTER KOMMENTAR ---');
      console.log(post.linkComment);
      console.log('');
      console.log(`📊 Validierung: ${post.validation.valid ? '✅' : '⚠️'}`);
      console.log(`   Zeichen: ${post.validation.stats.totalChars}`);
      console.log(`   Hook: ${post.validation.stats.hookChars}`);
      if (post.validation.warnings.length > 0) {
        console.log(`   Warnings: ${post.validation.warnings.join(', ')}`);
      }
      console.log('');
    }
  } else {
    // Einzelner Artikel
    const slug = args[0];
    const post = await processArticle(slug);
    console.log(JSON.stringify(post, null, 2));
  }
}
