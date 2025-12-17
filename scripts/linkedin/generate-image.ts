/**
 * Blog Image Generator via Fal.ai
 * @author andreas@siglochconsulting.de
 *
 * Generiert Illustrationen für Blog-Artikel via Flux Schnell
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const FAL_API_URL = 'https://fal.run/fal-ai/flux/schnell';
const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

interface GeneratedImage {
  slug: string;
  imagePath: string;
  prompt: string;
}

/**
 * Generiert Bildprompt aus Artikel-Metadaten
 */
function generatePrompt(title: string, tags: string[]): string {
  // Basis-Stil für konsistente Bilder
  const style = 'minimalist flat illustration, professional business style, clean white background, simple shapes, modern design';

  // Themen-Keywords aus Tags extrahieren
  const themeKeywords = tags
    .filter(t => !['KI', 'AI', 'GenAI'].includes(t))
    .slice(0, 2)
    .join(', ');

  // Titel-Keywords
  const titleKeywords = title
    .replace(/[#:]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 4)
    .slice(0, 3)
    .join(' ');

  return `${style}, concept of ${titleKeywords}, ${themeKeywords}, no text, no words, abstract representation`;
}

/**
 * Generiert Bild via Fal.ai API
 */
async function generateImageViaFal(prompt: string): Promise<Buffer> {
  const apiKey = process.env.FAL_API_KEY;

  if (!apiKey) {
    throw new Error('FAL_API_KEY nicht gesetzt. Bitte in .env konfigurieren.');
  }

  const response = await fetch(FAL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_16_9',
      num_images: 1,
      enable_safety_checker: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fal.ai API Fehler: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const imageUrl = result.images?.[0]?.url;

  if (!imageUrl) {
    throw new Error('Keine Bild-URL in Fal.ai Response');
  }

  // Bild herunterladen
  const imageResponse = await fetch(imageUrl);
  const arrayBuffer = await imageResponse.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Generiert und speichert Bild für Artikel
 */
export async function generateImageForArticle(slug: string): Promise<GeneratedImage> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data } = matter(fileContent);

  // Prüfe ob bereits Bild vorhanden
  if (data.image) {
    console.log(`⏭️  ${slug}: Bild bereits vorhanden (${data.image})`);
    return {
      slug,
      imagePath: data.image,
      prompt: '',
    };
  }

  const prompt = generatePrompt(data.title, data.tags || []);
  console.log(`🎨 Generiere Bild für: ${data.title}`);
  console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

  const imageBuffer = await generateImageViaFal(prompt);

  // Speichern mit Timestamp als Filename
  const timestamp = Date.now();
  const filename = `${timestamp}.png`;
  const outputPath = path.join(IMAGES_DIR, filename);

  await fs.writeFile(outputPath, imageBuffer);

  const imagePath = `/images/${filename}`;
  console.log(`✅ Bild gespeichert: ${imagePath}`);

  // Frontmatter aktualisieren
  const updatedContent = fileContent.replace(
    /^---\n/,
    `---\nimage: '${imagePath}'\n`
  );

  // Nur wenn image noch nicht existiert
  if (!data.image) {
    const newContent = matter.stringify(fileContent.replace(/^---[\s\S]*?---/, ''), {
      ...data,
      image: imagePath,
    });
    await fs.writeFile(filePath, newContent);
    console.log(`📝 Frontmatter aktualisiert: ${slug}.md`);
  }

  return {
    slug,
    imagePath,
    prompt,
  };
}

/**
 * Findet Artikel ohne Bild
 */
export async function findArticlesWithoutImage(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const withoutImage: string[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(BLOG_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(content);

    if (!data.image && data.linkedinStatus === 'planned') {
      withoutImage.push(file.replace('.md', ''));
    }
  }

  return withoutImage;
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Alle Artikel ohne Bild
    const withoutImage = await findArticlesWithoutImage();

    if (withoutImage.length === 0) {
      console.log('Alle geplanten Artikel haben bereits Bilder.');
      process.exit(0);
    }

    console.log(`\n🖼️  ${withoutImage.length} Artikel ohne Bild:\n`);

    for (const slug of withoutImage) {
      try {
        await generateImageForArticle(slug);
      } catch (error) {
        console.error(`❌ Fehler bei ${slug}:`, error);
      }
    }
  } else {
    // Einzelner Artikel
    const slug = args[0];
    const result = await generateImageForArticle(slug);
    console.log(JSON.stringify(result, null, 2));
  }
}
