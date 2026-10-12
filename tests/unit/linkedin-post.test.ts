/**
 * LinkedIn-Pipeline: Post-Generator und Frontmatter-Update (CR-016)
 * @author andreas@siglochconsulting.de
 */

import { describe, test, expect } from 'vitest';
import matter from 'gray-matter';
import { generateLinkedInPost } from '../../ops/jobs/linkedin/generate-post';
import { updateFrontmatterFields, formatSinglePostFile } from '../../ops/jobs/linkedin/prepare';

const FRONTMATTER = {
  title: 'Datenreife #9: Testartikel',
  description: 'Warum Struktur vor KI kommt.',
  pubDate: new Date('2026-10-01'),
  tags: ['MBSE'],
  linkedinStatus: 'planned' as const,
};

const BODY = [
  '> **Struktur vor KI.** Erst der Graph, dann das Modell.',
  'Ein Absatz mit der eigentlichen Aussage des Artikels.',
].join('\n\n');

describe('generateLinkedInPost', () => {
  const post = generateLinkedInPost('datenreife-09-test', FRONTMATTER, BODY);

  test('der Link steht im Post-Text, nach dem CTA und vor den Hashtags', () => {
    const url = 'https://siglochconsulting.de/blog/datenreife-09-test';
    expect(post.url).toBe(url);

    const lines = post.text.split('\n');
    const linkLine = lines.indexOf(`👉 ${url}`);
    expect(linkLine).toBeGreaterThan(lines.indexOf('Wie strukturiert ist Ihre Datenbasis?'));
    expect(lines[lines.length - 1]).toMatch(/^#/);
    expect(linkLine).toBeLessThan(lines.length - 1);
  });

  test('es gibt keinen separaten Link-Kommentar mehr', () => {
    expect(post).not.toHaveProperty('linkComment');
  });

  test('linkedinType fällt auf post zurück und wird aus dem Frontmatter übernommen', () => {
    expect(post.linkedinType).toBe('post');
    const article = generateLinkedInPost('x', { ...FRONTMATTER, linkedinType: 'article' }, BODY);
    expect(article.linkedinType).toBe('article');
  });
});

describe('updateFrontmatterFields', () => {
  const source = [
    '---',
    "title: 'Datenreife #9: Testartikel'",
    'pubDate: 2026-10-01',
    "linkedinStatus: 'planned'",
    'tags:',
    '  - MBSE',
    '---',
    '',
    'Text mit --- im Fließtext.',
    '',
  ].join('\n');

  const updated = updateFrontmatterFields(source, {
    linkedinStatus: "'published'",
    linkedinPostDate: '2026-10-12',
  });

  test('ersetzt ein vorhandenes Feld und hängt ein fehlendes an', () => {
    const { data } = matter(updated);
    expect(data.linkedinStatus).toBe('published');
    expect(data.linkedinPostDate).toEqual(new Date('2026-10-12'));
    expect(updated.match(/^linkedinStatus:/gm)).toHaveLength(1);
  });

  test('lässt übriges Frontmatter und den Artikeltext unverändert', () => {
    const { data, content } = matter(updated);
    expect(data.title).toBe('Datenreife #9: Testartikel');
    expect(data.tags).toEqual(['MBSE']);
    expect(content).toBe(matter(source).content);
  });

  test('Datei ohne Frontmatter bleibt unangetastet', () => {
    expect(updateFrontmatterFields('nur Text', { linkedinStatus: "'published'" })).toBe('nur Text');
  });
});

describe('formatSinglePostFile', () => {
  const post = generateLinkedInPost('datenreife-09-test', FRONTMATTER, BODY);
  const file = formatSinglePostFile(
    { slug: post.slug, title: post.title, post, imageValidation: '', imageAbsPath: '' },
    '2026-10-12'
  );

  test('nennt Quelle und URL und führt keinen Link-Kommentar', () => {
    expect(file).toContain('**Quelle:** `blog/datenreife-09-test`');
    expect(file).toContain('**URL:** https://siglochconsulting.de/blog/datenreife-09-test');
    expect(file).toContain(post.text);
    expect(file).not.toMatch(/Erster Kommentar|Link im 1\. Kommentar/);
  });
});
