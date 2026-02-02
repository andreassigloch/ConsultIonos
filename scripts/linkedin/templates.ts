/**
 * LinkedIn Post/Article Templates
 * @author andreas@siglochconsulting.de
 *
 * Templates basierend auf LinkedIn Guidelines 2025/2026:
 * - Post: 3.000 Zeichen max, 1.300-1.600 optimal
 * - Hook: 140 Zeichen (vor "See more")
 * - Artikel: 125.000 Zeichen, Google-indexiert
 */

// =============================================================================
// Configuration
// =============================================================================

export interface PostConfig {
  /** Ziel-Zeichenzahl für Post-Body (ohne Hashtags) */
  targetLength: number;
  /** Max Zeichen für Hook (vor "See more") */
  hookMaxLength: number;
  /** Anzahl Hashtags */
  hashtagCount: number;
  /** Link im Kommentar statt im Post */
  linkInComment: boolean;
}

export const DEFAULT_POST_CONFIG: PostConfig = {
  targetLength: 1400,
  hookMaxLength: 140,
  hashtagCount: 5,
  linkInComment: true,
};

// =============================================================================
// LinkedIn Limits (Referenz)
// =============================================================================

export const LINKEDIN_LIMITS = {
  post: {
    maxChars: 3000,
    optimalMin: 1300,
    optimalMax: 1600,
    hookMobile: 140,
    hookDesktop: 210,
    maxImages: 9,
    maxHashtags: 30, // technisch, empfohlen 3-5
  },
  article: {
    maxChars: 125000,
    titleMax: 150,
    titleOptimal: { min: 40, max: 60 },
    coverImage: { width: 1280, height: 720 },
  },
  image: {
    landscape: { width: 1200, height: 627, ratio: '1.91:1' },
    square: { width: 1080, height: 1080, ratio: '1:1' },
    portrait: { width: 1080, height: 1350, ratio: '4:5' },
    maxSizeMB: 5,
    formats: ['png', 'jpg', 'jpeg'],
  },
  comment: {
    maxChars: 1250,
  },
} as const;

// =============================================================================
// Post Template
// =============================================================================

export interface PostTemplate {
  hook: string;        // Max 140 Zeichen, muss standalone funktionieren
  body: string;        // Hauptinhalt
  cta: string;         // Call-to-Action (Frage/Aufforderung)
  hashtags: string[];  // 3-5 Hashtags
  linkComment: string; // Text für ersten Kommentar mit Link
}

/**
 * Generiert Post-Text aus Template-Komponenten
 */
export function formatPost(template: PostTemplate, config: PostConfig = DEFAULT_POST_CONFIG): string {
  const parts: string[] = [];

  // Hook (erste Zeile, vor "See more")
  parts.push(template.hook);

  // Leerzeile nach Hook
  parts.push('');

  // Body
  parts.push(template.body);

  // CTA (falls vorhanden)
  if (template.cta) {
    parts.push('');
    parts.push(template.cta);
  }

  // Hashtags am Ende
  if (template.hashtags.length > 0) {
    parts.push('');
    const tags = template.hashtags
      .slice(0, config.hashtagCount)
      .map(h => h.startsWith('#') ? h : `#${h}`)
      .join(' ');
    parts.push(tags);
  }

  return parts.join('\n');
}

/**
 * Generiert den Kommentar-Text mit Link
 */
export function formatLinkComment(url: string, title?: string): string {
  if (title) {
    return `Vollständiger Artikel: ${title}\n${url}`;
  }
  return `Vollständiger Artikel: ${url}`;
}

// =============================================================================
// Article Template
// =============================================================================

export interface ArticleTemplate {
  title: string;       // 40-60 Zeichen optimal
  coverImage?: string; // 1280x720 empfohlen
  intro: string;       // Einleitung mit Hook
  sections: ArticleSection[];
  conclusion: string;  // Fazit
  cta?: string;        // Optional: Call-to-Action
  sourceUrl?: string;  // Link zur Website
}

export interface ArticleSection {
  heading: string;
  content: string;
}

/**
 * Generiert Artikel-Text im Markdown-Format
 */
export function formatArticle(template: ArticleTemplate): string {
  const parts: string[] = [];

  // Titel
  parts.push(`# ${template.title}`);
  parts.push('');

  // Einleitung
  parts.push(template.intro);
  parts.push('');

  // Sections
  for (const section of template.sections) {
    parts.push(`## ${section.heading}`);
    parts.push('');
    parts.push(section.content);
    parts.push('');
  }

  // Fazit
  parts.push('## Fazit');
  parts.push('');
  parts.push(template.conclusion);

  // CTA
  if (template.cta) {
    parts.push('');
    parts.push(`---`);
    parts.push('');
    parts.push(template.cta);
  }

  // Source Link
  if (template.sourceUrl) {
    parts.push('');
    parts.push(`---`);
    parts.push('');
    parts.push(`*Dieser Artikel erschien ursprünglich auf: ${template.sourceUrl}*`);
  }

  return parts.join('\n');
}

// =============================================================================
// Validation Helpers
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
  stats: {
    totalChars: number;
    hookChars: number;
    hashtagCount: number;
  };
}

/**
 * Validiert Post gegen LinkedIn-Guidelines
 */
export function validatePost(text: string, hook: string, hashtags: string[]): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  const totalChars = text.length;
  const hookChars = hook.length;
  const hashtagCount = hashtags.length;

  // Errors (hard limits)
  if (totalChars > LINKEDIN_LIMITS.post.maxChars) {
    errors.push(`Post überschreitet ${LINKEDIN_LIMITS.post.maxChars} Zeichen (${totalChars})`);
  }

  if (hookChars > LINKEDIN_LIMITS.post.hookMobile) {
    errors.push(`Hook überschreitet ${LINKEDIN_LIMITS.post.hookMobile} Zeichen (${hookChars})`);
  }

  // Warnings (best practices)
  if (totalChars < LINKEDIN_LIMITS.post.optimalMin) {
    warnings.push(`Post unter optimalem Bereich (${totalChars} < ${LINKEDIN_LIMITS.post.optimalMin})`);
  }

  if (totalChars > LINKEDIN_LIMITS.post.optimalMax) {
    warnings.push(`Post über optimalem Bereich (${totalChars} > ${LINKEDIN_LIMITS.post.optimalMax})`);
  }

  if (hashtagCount < 3) {
    warnings.push(`Weniger als 3 Hashtags (${hashtagCount})`);
  }

  if (hashtagCount > 5) {
    warnings.push(`Mehr als 5 Hashtags (${hashtagCount})`);
  }

  // Check for URL in post (should be in comment)
  if (text.includes('http://') || text.includes('https://')) {
    warnings.push('Link im Post gefunden - besser im ersten Kommentar posten');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
    stats: { totalChars, hookChars, hashtagCount },
  };
}

/**
 * Validiert Artikel-Titel
 */
export function validateArticleTitle(title: string): { valid: boolean; message?: string } {
  if (title.length > LINKEDIN_LIMITS.article.titleMax) {
    return {
      valid: false,
      message: `Titel überschreitet ${LINKEDIN_LIMITS.article.titleMax} Zeichen (${title.length})`,
    };
  }

  if (title.length < LINKEDIN_LIMITS.article.titleOptimal.min) {
    return {
      valid: true,
      message: `Titel unter optimalem Bereich (${title.length} < ${LINKEDIN_LIMITS.article.titleOptimal.min})`,
    };
  }

  if (title.length > LINKEDIN_LIMITS.article.titleOptimal.max) {
    return {
      valid: true,
      message: `Titel über optimalem Bereich (${title.length} > ${LINKEDIN_LIMITS.article.titleOptimal.max})`,
    };
  }

  return { valid: true };
}
