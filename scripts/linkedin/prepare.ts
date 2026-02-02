/**
 * LinkedIn Automation Orchestrator
 * @author andreas@siglochconsulting.de
 *
 * Generiert LinkedIn-Posts aus Blog-Artikeln:
 * 1. Artikel mit linkedinStatus: 'planned' finden
 * 2. Post-Text generieren (Hook/Body/CTA/Hashtags)
 * 3. Bild validieren
 * 4. In Datei speichern (Copy/Paste ready)
 */

import fs from 'fs/promises';
import path from 'path';
import { findPlannedArticles, processArticle, type LinkedInPost } from './generate-post.js';
import { generateImageForArticle } from './generate-image.js';
import { validateImage, formatValidationResult } from './validate-image.js';

const OUTPUT_DIR = path.join(process.cwd(), 'docs', 'linkedin-queue');

// =============================================================================
// Output Generation
// =============================================================================

interface PostOutput {
  slug: string;
  title: string;
  post: LinkedInPost;
  imageValidation: string;
  imageAbsPath: string;
}

/**
 * Generiert Markdown-Output für einen Post
 */
function formatPostOutput(output: PostOutput): string {
  const lines: string[] = [];

  lines.push(`## ${output.title}`);
  lines.push('');
  lines.push(`**Slug:** \`${output.slug}\``);
  lines.push('');

  // Post-Text
  lines.push('### Post-Text (Copy & Paste)');
  lines.push('');
  lines.push('```');
  lines.push(output.post.text);
  lines.push('```');
  lines.push('');

  // Erster Kommentar (Link)
  lines.push('### Erster Kommentar (Link)');
  lines.push('');
  lines.push('```');
  lines.push(output.post.linkComment);
  lines.push('```');
  lines.push('');

  // Bild
  lines.push('### Bild');
  lines.push('');
  if (output.imageAbsPath) {
    lines.push(output.imageValidation);
  } else {
    lines.push('- Kein Bild vorhanden');
  }
  lines.push('');

  // Validierung
  lines.push('### Validierung');
  lines.push('');
  const v = output.post.validation;
  lines.push(`- Status: ${v.valid ? '✅ Gültig' : '⚠️ Probleme gefunden'}`);
  lines.push(`- Zeichen gesamt: ${v.stats.totalChars} (optimal: 1.300-1.600)`);
  lines.push(`- Hook-Zeichen: ${v.stats.hookChars} (max: 140)`);
  lines.push(`- Hashtags: ${v.stats.hashtagCount} (optimal: 3-5)`);

  if (v.warnings.length > 0) {
    lines.push('');
    lines.push('**Hinweise:**');
    for (const warning of v.warnings) {
      lines.push(`- ⚠️ ${warning}`);
    }
  }

  if (v.errors.length > 0) {
    lines.push('');
    lines.push('**Fehler:**');
    for (const error of v.errors) {
      lines.push(`- ❌ ${error}`);
    }
  }

  lines.push('');
  lines.push('### Checkliste');
  lines.push('');
  lines.push('- [ ] Post-Text kopiert');
  lines.push('- [ ] Bild hochgeladen');
  lines.push('- [ ] Veröffentlicht');
  lines.push('- [ ] Link im 1. Kommentar gepostet');
  lines.push('- [ ] Frontmatter aktualisiert');
  lines.push('');
  lines.push('---');
  lines.push('');

  return lines.join('\n');
}

/**
 * Generiert vollständige Output-Datei
 */
function generateOutputFile(posts: PostOutput[], today: string): string {
  const lines: string[] = [];

  lines.push(`# LinkedIn Posts - ${today}`);
  lines.push('');
  lines.push(`Generiert: ${new Date().toLocaleString('de-DE')}`);
  lines.push('');

  // Zusammenfassung
  lines.push('## Zusammenfassung');
  lines.push('');
  lines.push(`| Artikel | Zeichen | Hook | Status |`);
  lines.push(`|---------|---------|------|--------|`);

  for (const post of posts) {
    const v = post.post.validation;
    const status = v.valid ? '✅' : '⚠️';
    lines.push(`| ${post.title.substring(0, 40)}... | ${v.stats.totalChars} | ${v.stats.hookChars} | ${status} |`);
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  // Einzelne Posts
  for (const post of posts) {
    lines.push(formatPostOutput(post));
  }

  // Anleitung
  lines.push('## Nach dem Posten');
  lines.push('');
  lines.push('Frontmatter im Artikel aktualisieren:');
  lines.push('');
  lines.push('```yaml');
  lines.push(`linkedinStatus: 'published'`);
  lines.push(`linkedinPostDate: ${today}`);
  lines.push(`linkedinUrl: 'https://www.linkedin.com/posts/...'`);
  lines.push('```');
  lines.push('');

  // LinkedIn Guidelines Kurzreferenz
  lines.push('## LinkedIn Guidelines (Kurzreferenz)');
  lines.push('');
  lines.push('| Aspekt | Limit | Empfehlung |');
  lines.push('|--------|-------|------------|');
  lines.push('| Post-Zeichen | 3.000 max | 1.300-1.600 optimal |');
  lines.push('| Hook (vor "See more") | 140 Zeichen | Muss standalone funktionieren |');
  lines.push('| Links | Im Post möglich | **Besser im 1. Kommentar** (Algorithmus) |');
  lines.push('| Hashtags | Unbegrenzt | 3-5 optimal |');
  lines.push('| Bild | 1-9 pro Post | 1200×627 (landscape) oder 1080×1080 (square) |');
  lines.push('');

  return lines.join('\n');
}

// =============================================================================
// Main
// =============================================================================

async function prepare(): Promise<void> {
  console.log('\n🚀 LinkedIn Post Generator (v2)\n');
  console.log('='.repeat(60));

  // Output-Verzeichnis erstellen
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // 1. Geplante Artikel finden
  const planned = await findPlannedArticles();

  if (planned.length === 0) {
    console.log('\n✨ Keine Artikel mit linkedinStatus: "planned" gefunden.\n');
    return;
  }

  console.log(`\n📝 ${planned.length} Artikel gefunden\n`);

  const posts: PostOutput[] = [];

  // 2. Jeden Artikel verarbeiten
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

      posts.push({
        slug,
        title: post.title,
        post,
        imageValidation,
        imageAbsPath,
      });

      // Status ausgeben
      const status = post.validation.valid ? '✅' : '⚠️';
      console.log(`${status} ${slug} (${post.validation.stats.totalChars} Zeichen)`);

    } catch (error) {
      console.error(`❌ ${slug}: ${error}`);
    }
  }

  // 3. Output-Datei erstellen
  const today = new Date().toISOString().split('T')[0];
  const outputFile = path.join(OUTPUT_DIR, `${today}-posts.md`);
  const output = generateOutputFile(posts, today);

  await fs.writeFile(outputFile, output, 'utf-8');

  // 4. Zusammenfassung
  console.log('\n' + '='.repeat(60));
  console.log(`\n📄 ${posts.length} Posts generiert\n`);
  console.log(`📁 Datei: ${outputFile}\n`);

  // Warnungen anzeigen
  const withWarnings = posts.filter(p => p.post.validation.warnings.length > 0);
  const withErrors = posts.filter(p => !p.post.validation.valid);

  if (withErrors.length > 0) {
    console.log(`⚠️  ${withErrors.length} Posts mit Fehlern:`);
    for (const p of withErrors) {
      console.log(`   - ${p.slug}: ${p.post.validation.errors.join(', ')}`);
    }
    console.log('');
  }

  if (withWarnings.length > 0) {
    console.log(`💡 ${withWarnings.length} Posts mit Hinweisen:`);
    for (const p of withWarnings) {
      console.log(`   - ${p.slug}: ${p.post.validation.warnings.join(', ')}`);
    }
    console.log('');
  }

  console.log('Workflow:');
  console.log('  1. Datei öffnen');
  console.log('  2. Post-Text kopieren → LinkedIn einfügen');
  console.log('  3. Bild hochladen');
  console.log('  4. Veröffentlichen');
  console.log('  5. Link im ersten Kommentar posten');
  console.log('  6. linkedinStatus im Artikel auf "published" setzen\n');
}

// Run
prepare().catch(console.error);
