/**
 * LinkedIn Automation Orchestrator
 * @author andreas@siglochconsulting.de
 *
 * Generiert LinkedIn-Posts aus Blog-Artikeln:
 * 1. Artikel mit linkedinStatus: 'planned' finden
 * 2. Post-Text generieren
 * 3. In Datei speichern (Copy/Paste ready)
 */

import fs from 'fs/promises';
import path from 'path';
import { findPlannedArticles, processArticle } from './generate-post.js';
import { generateImageForArticle } from './generate-image.js';

const OUTPUT_DIR = path.join(process.cwd(), 'docs', 'linkedin-queue');

interface PostOutput {
  slug: string;
  title: string;
  text: string;
  imagePath: string;
  imageAbsPath: string;
}

async function prepare(): Promise<void> {
  console.log('\n🚀 LinkedIn Post Generator\n');
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

      // Bild generieren wenn nötig
      if (!post.imagePath && process.env.FAL_API_KEY) {
        console.log(`🎨 Generiere Bild für: ${slug}`);
        const imageResult = await generateImageForArticle(slug);
        post.imagePath = imageResult.imagePath;
      }

      const imageAbsPath = post.imagePath
        ? path.join(process.cwd(), 'public', post.imagePath)
        : '';

      posts.push({
        slug,
        title: post.title,
        text: post.text,
        imagePath: post.imagePath || '',
        imageAbsPath,
      });

      console.log(`✅ ${slug}`);
    } catch (error) {
      console.error(`❌ ${slug}: ${error}`);
    }
  }

  // 3. Output-Datei erstellen
  const today = new Date().toISOString().split('T')[0];
  const outputFile = path.join(OUTPUT_DIR, `${today}-posts.md`);

  let output = `# LinkedIn Posts - ${today}\n\n`;
  output += `Generiert: ${new Date().toLocaleString('de-DE')}\n\n`;
  output += `---\n\n`;

  for (const post of posts) {
    output += `## ${post.title}\n\n`;
    output += `**Slug:** \`${post.slug}\`\n\n`;

    if (post.imageAbsPath) {
      output += `**Bild:** \`${post.imageAbsPath}\`\n\n`;
    }

    output += `### Post-Text (Copy & Paste):\n\n`;
    output += `\`\`\`\n${post.text}\n\`\`\`\n\n`;
    output += `---\n\n`;
  }

  output += `## Nach dem Posten\n\n`;
  output += `Frontmatter aktualisieren:\n`;
  output += `\`\`\`yaml\n`;
  output += `linkedinStatus: 'published'\n`;
  output += `linkedinPostDate: ${today}\n`;
  output += `linkedinUrl: 'https://www.linkedin.com/posts/...'\n`;
  output += `\`\`\`\n`;

  await fs.writeFile(outputFile, output, 'utf-8');

  // 4. Zusammenfassung
  console.log('\n' + '='.repeat(60));
  console.log(`\n📄 ${posts.length} Posts generiert\n`);
  console.log(`📁 Datei: ${outputFile}\n`);
  console.log('Nächste Schritte:');
  console.log('  1. Datei öffnen');
  console.log('  2. Post-Text kopieren → LinkedIn einfügen');
  console.log('  3. Bild hochladen (Pfad in Datei)');
  console.log('  4. Posten');
  console.log('  5. linkedinStatus im Artikel auf "published" setzen\n');
}

// Run
prepare().catch(console.error);
