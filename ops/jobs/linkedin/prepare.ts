/**
 * LinkedIn Automation Orchestrator — sicon
 * @author andreas@siglochconsulting.de
 *
 * Sucht Blog-Artikel mit linkedinStatus: 'planned', schreibt je Artikel eine
 * Post-Datei nach channels/linkedin/ und setzt das Frontmatter auf 'published'.
 */

import fs from 'fs/promises';
import path from 'path';
import { findPlannedArticles, processArticle, type LinkedInPost } from './generate-post.js';
import { generateImageForArticle } from './generate-image.js';
import { validateImage, formatValidationResult } from '@sigloch/linkedin-tools/validate-image';

// Kanal-Inhalt liegt unter channels/, nicht unter docs/ oder src/ — er wird nie eine URL.
const OUTPUT_DIR = path.join(process.cwd(), 'channels', 'linkedin');
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// =============================================================================
// Frontmatter Update (regex-basiert, damit die YAML-Formatierung erhalten bleibt)
// =============================================================================

export function updateFrontmatterFields(
  content: string,
  updates: Record<string, string>
): string {
  const fmMatch = content.match(/^---\n([\s\S]*?\n)---/);
  if (!fmMatch) return content;

  let fm = fmMatch[1];

  for (const [field, value] of Object.entries(updates)) {
    const pattern = new RegExp(`^${field}:.*$`, 'm');
    if (pattern.test(fm)) {
      fm = fm.replace(pattern, `${field}: ${value}`);
    } else {
      fm = fm.trimEnd() + `\n${field}: ${value}\n`;
    }
  }

  return content.replace(fmMatch[0], `---\n${fm}---`);
}

async function updateFrontmatter(slug: string, today: string): Promise<void> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');

  const updated = updateFrontmatterFields(fileContent, {
    linkedinStatus: "'published'",
    linkedinPostDate: today,
  });

  await fs.writeFile(filePath, updated, 'utf-8');
}

// =============================================================================
// Output Generation (eine Datei je Post)
// =============================================================================

interface PostOutput {
  slug: string;
  title: string;
  post: LinkedInPost;
  imageValidation: string;
  imageAbsPath: string;
}

export function formatSinglePostFile(output: PostOutput, today: string): string {
  const lines: string[] = [];

  lines.push(`# LinkedIn Post: ${output.title}`);
  lines.push('');
  lines.push(`**Quelle:** \`blog/${output.slug}\``);
  lines.push(`**LinkedIn-Typ:** ${output.post.linkedinType}`);
  lines.push(`**URL:** ${output.post.url}`);
  lines.push(`**Generiert:** ${today}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Post-Text
  lines.push('## Post-Text (Copy & Paste)');
  lines.push('');
  lines.push('```');
  lines.push(output.post.text);
  lines.push('```');
  lines.push('');

  // Bild
  lines.push('## Bild');
  lines.push('');
  if (output.imageAbsPath) {
    lines.push(output.imageValidation);
  } else {
    lines.push('- Kein Bild vorhanden');
  }
  lines.push('');

  // Validierung
  lines.push('## Validierung');
  lines.push('');
  const v = output.post.validation;
  lines.push(`- Status: ${v.valid ? '✅ Gültig' : '⚠️ Probleme gefunden'}`);
  lines.push(`- Zeichen gesamt: ${v.stats.totalChars} (optimal: 1.300-1.600)`);
  lines.push(`- Hook-Zeichen: ${v.stats.hookChars} (max: 140)`);
  lines.push(`- Hashtags: ${v.stats.hashtagCount} (optimal: 3-5)`);

  if (v.warnings.length > 0) {
    lines.push('');
    for (const warning of v.warnings) {
      lines.push(`- ⚠️ ${warning}`);
    }
  }

  if (v.errors.length > 0) {
    lines.push('');
    for (const error of v.errors) {
      lines.push(`- ❌ ${error}`);
    }
  }

  lines.push('');
  lines.push('## Checkliste');
  lines.push('');
  lines.push('- [ ] Post-Text kopiert');
  lines.push('- [ ] Bild hochgeladen');
  lines.push('- [ ] Veröffentlicht');
  lines.push('');

  return lines.join('\n');
}

// =============================================================================
// Main
// =============================================================================

async function prepare(): Promise<void> {
  console.log('\n🚀 LinkedIn Post Generator — siglochconsulting.de\n');
  console.log('='.repeat(60));

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const planned = await findPlannedArticles();

  if (planned.length === 0) {
    console.log('\n✨ Keine Artikel mit linkedinStatus: "planned" gefunden.\n');
    return;
  }

  console.log(`\n📝 ${planned.length} Artikel gefunden\n`);

  const today = new Date().toISOString().split('T')[0];
  const outputs: PostOutput[] = [];

  for (const slug of planned) {
    try {
      const post = await processArticle(slug);

      // Bild generieren wenn nötig und API Key vorhanden
      if (!post.imagePath && process.env.FAL_API_KEY) {
        console.log(`🎨 Generiere Bild für: ${slug}`);
        const imageResult = await generateImageForArticle(slug);
        post.imagePath = imageResult.imagePath;
      }

      // Bild validieren
      let imageValidation = '';
      let imageAbsPath = '';

      if (post.imagePath) {
        imageAbsPath = path.join(process.cwd(), 'public', post.imagePath);
        const validation = await validateImage(imageAbsPath);
        imageValidation = formatValidationResult(validation);
      }

      const output: PostOutput = {
        slug,
        title: post.title,
        post,
        imageValidation,
        imageAbsPath,
      };

      const outputFile = path.join(OUTPUT_DIR, `${today}-${slug}.md`);
      await fs.writeFile(outputFile, formatSinglePostFile(output, today), 'utf-8');

      // Frontmatter: planned → published
      await updateFrontmatter(slug, today);

      outputs.push(output);

      const status = post.validation.valid ? '✅' : '⚠️';
      console.log(`${status} ${slug} (${post.validation.stats.totalChars} Zeichen)`);
      console.log(`   📄 ${outputFile}`);
      console.log(`   📝 Frontmatter → linkedinStatus: 'published'`);

    } catch (error) {
      console.error(`❌ ${slug}: ${error}`);
    }
  }

  // Zusammenfassung
  console.log('\n' + '='.repeat(60));
  console.log(`\n📄 ${outputs.length} Posts generiert\n`);

  const withWarnings = outputs.filter(p => p.post.validation.warnings.length > 0);
  if (withWarnings.length > 0) {
    console.log(`💡 ${withWarnings.length} Posts mit Hinweisen:`);
    for (const p of withWarnings) {
      console.log(`   - ${p.slug}: ${p.post.validation.warnings.join(', ')}`);
    }
    console.log('');
  }

  console.log('Workflow:');
  console.log('  1. Post-Datei öffnen');
  console.log('  2. Post-Text kopieren → LinkedIn einfügen');
  console.log('  3. Bild hochladen');
  console.log('  4. Veröffentlichen');
  console.log('  5. linkedinUrl im Frontmatter ergänzen (optional)\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prepare().catch(console.error);
}
