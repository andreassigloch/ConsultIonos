/**
 * LinkedIn Post Generator
 * @author andreas@siglochconsulting.de
 *
 * Generiert LinkedIn-Post aus Blog-Artikel:
 * - Kurzfassung (~200-300 Zeichen)
 * - Hashtags aus Tags
 * - Link zum Artikel
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://siglochconsulting.de';
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: Date;
  tags?: string[];
  hashtags?: string[];
  linkedinStatus?: 'draft' | 'planned' | 'published';
  image?: string;
}

interface LinkedInPost {
  slug: string;
  title: string;
  text: string;
  hashtags: string;
  url: string;
  imagePath?: string;
}

/**
 * Generiert Hook/Einstieg aus Titel
 */
function generateHook(title: string, description: string): string {
  // Verwende Description als Hook, gekürzt auf ~150 Zeichen
  if (description.length <= 150) {
    return description;
  }

  // Kürze bei Satzende
  const shortened = description.substring(0, 150);
  const lastPeriod = shortened.lastIndexOf('.');
  if (lastPeriod > 80) {
    return shortened.substring(0, lastPeriod + 1);
  }

  return shortened + '...';
}

/**
 * Generiert Hashtags aus Tags
 */
function generateHashtags(tags: string[], customHashtags?: string[]): string {
  const baseHashtags = ['SystemsEngineering', 'GenAI', 'KI'];

  // Custom Hashtags haben Priorität
  if (customHashtags && customHashtags.length > 0) {
    return customHashtags.map(h => h.startsWith('#') ? h : `#${h}`).join(' ');
  }

  // Aus Tags generieren
  const fromTags = tags
    .map(tag => tag.replace(/\s+/g, '').replace(/[^a-zA-ZäöüÄÖÜ0-9]/g, ''))
    .filter(tag => tag.length > 2)
    .slice(0, 3);

  const allHashtags = [...new Set([...fromTags, ...baseHashtags])].slice(0, 5);
  return allHashtags.map(h => `#${h}`).join(' ');
}

/**
 * Generiert LinkedIn-Post aus Artikel
 */
export function generateLinkedInPost(
  slug: string,
  frontmatter: BlogFrontmatter,
  _content: string
): LinkedInPost {
  const hook = generateHook(frontmatter.title, frontmatter.description);
  const hashtags = generateHashtags(frontmatter.tags || [], frontmatter.hashtags);
  const url = `${SITE_URL}/blog/${slug}`;

  const text = `${hook}

Mehr dazu: ${url}

${hashtags}`;

  return {
    slug,
    title: frontmatter.title,
    text,
    hashtags,
    url,
    imagePath: frontmatter.image,
  };
}

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
export async function processArticle(slug: string): Promise<LinkedInPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return generateLinkedInPost(slug, data as BlogFrontmatter, content);
}

// CLI
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
      console.log(post.text);
      console.log('');
    }
  } else {
    // Einzelner Artikel
    const slug = args[0];
    const post = await processArticle(slug);
    console.log(JSON.stringify(post, null, 2));
  }
}
