/**
 * Schema.org Structured Data Validator
 * @author andreas@siglochconsulting.de
 *
 * Validates JSON-LD structured data in built HTML files.
 * Übernommen aus siglochimmo, Regeln auf die Schema-Typen dieser Site gesetzt (CR-018).
 */

import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
  schemas: string[];
}

interface SchemaValidation {
  type: string;
  required: string[];
  recommended?: string[];
}

// Schema validation rules
const SCHEMA_RULES: SchemaValidation[] = [
  {
    type: 'Organization',
    required: ['name', 'url'],
    recommended: ['address', 'telephone', 'logo'],
  },
  {
    type: 'ProfessionalService',
    required: ['name', 'url', 'address'],
    recommended: ['telephone', 'logo', 'image', 'areaServed'],
  },
  {
    type: 'Article',
    required: ['headline', 'datePublished', 'author'],
    recommended: ['image', 'dateModified', 'publisher'],
  },
  {
    type: 'FAQPage',
    required: ['mainEntity'],
  },
  {
    type: 'BreadcrumbList',
    required: ['itemListElement'],
  },
  {
    type: 'WebSite',
    required: ['name', 'url'],
  },
  {
    type: 'WebPage',
    required: ['name'],
    recommended: ['description', 'url'],
  },
];

/**
 * Extract JSON-LD scripts from HTML using regex (no external dependencies)
 */
function extractJsonLd(html: string): string[] {
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].trim());
  }
  return matches;
}

function validateSchema(schema: any, file: string): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Handle @graph arrays
  const schemas = schema['@graph'] ? schema['@graph'] : [schema];

  for (const s of schemas) {
    const type = s['@type'];
    if (!type) {
      errors.push('Missing @type property');
      continue;
    }

    // Find matching rule
    const rule = SCHEMA_RULES.find((r) => r.type === type || (Array.isArray(type) && type.includes(r.type)));

    if (rule) {
      // Check required fields
      for (const field of rule.required) {
        if (!s[field] && s[field] !== 0) {
          errors.push(`${type}: Missing required property "${field}"`);
        }
      }

      // Check recommended fields
      if (rule.recommended) {
        for (const field of rule.recommended) {
          if (!s[field] && s[field] !== 0) {
            warnings.push(`${type}: Missing recommended property "${field}"`);
          }
        }
      }
    }

    // Validate nested Question/Answer in FAQPage
    if (type === 'FAQPage' && s.mainEntity) {
      const questions = Array.isArray(s.mainEntity) ? s.mainEntity : [s.mainEntity];
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.name) {
          errors.push(`FAQPage: Question ${i + 1} missing "name" (question text)`);
        }
        if (!q.acceptedAnswer?.text) {
          errors.push(`FAQPage: Question ${i + 1} missing "acceptedAnswer.text"`);
        }
      }
    }

    // Validate BreadcrumbList items
    if (type === 'BreadcrumbList' && s.itemListElement) {
      const items = Array.isArray(s.itemListElement) ? s.itemListElement : [s.itemListElement];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.position) {
          errors.push(`BreadcrumbList: Item ${i + 1} missing "position"`);
        }
        if (!item.name && !item.item?.name) {
          errors.push(`BreadcrumbList: Item ${i + 1} missing "name"`);
        }
      }
    }
  }

  return { errors, warnings };
}

async function validateSchemaOrg(): Promise<void> {
  console.log('🔍 Schema.org Validator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check if dist folder exists
  if (!existsSync('dist')) {
    console.error('❌ Error: dist/ folder not found. Run `npm run build` first.');
    process.exit(1);
  }

  const htmlFiles = await glob('dist/**/*.html');
  console.log(`📂 Scanning ${htmlFiles.length} HTML files...\n`);

  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithSchema = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    const jsonLdScripts = extractJsonLd(html);

    if (jsonLdScripts.length === 0) continue;

    filesWithSchema++;
    const result: ValidationResult = {
      file: file.replace('dist/', ''),
      errors: [],
      warnings: [],
      schemas: [],
    };

    jsonLdScripts.forEach((content, index) => {
      try {
        const schema = JSON.parse(content);

        // Get schema types
        if (schema['@graph']) {
          result.schemas.push(...schema['@graph'].map((s: any) => s['@type']).filter(Boolean));
        } else if (schema['@type']) {
          result.schemas.push(schema['@type']);
        }

        // Validate
        const validation = validateSchema(schema, file);
        result.errors.push(...validation.errors);
        result.warnings.push(...validation.warnings);
      } catch (e) {
        result.errors.push(`Invalid JSON-LD syntax in script ${index + 1}: ${(e as Error).message}`);
      }
    });

    if (result.errors.length > 0 || result.warnings.length > 0) {
      results.push(result);
    }

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  // Output results
  console.log(`📊 Results:`);
  console.log(`   Files scanned: ${htmlFiles.length}`);
  console.log(`   Files with Schema.org: ${filesWithSchema}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}\n`);

  if (results.length > 0) {
    if (totalErrors > 0) {
      console.log(`❌ ${totalErrors} Schema.org Errors:\n`);
      results.forEach((r) => {
        if (r.errors.length > 0) {
          console.log(`   ${r.file}`);
          console.log(`   └─ Schemas: ${r.schemas.join(', ')}`);
          r.errors.forEach((e) => console.log(`      ❌ ${e}`));
          console.log('');
        }
      });
    }

    if (totalWarnings > 0) {
      console.log(`⚠️  ${totalWarnings} Schema.org Warnings:\n`);
      results.forEach((r) => {
        if (r.warnings.length > 0) {
          console.log(`   ${r.file}`);
          r.warnings.forEach((w) => console.log(`      ⚠️  ${w}`));
          console.log('');
        }
      });
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📋 Schema.org Validation Summary:`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   ⚠️  Warnings: ${totalWarnings}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (totalErrors > 0) {
    console.error('❌ Schema.org validation failed');
    process.exit(1);
  }

  if (totalWarnings > 0) {
    console.log('⚠️  Schema.org validation passed with warnings');
  } else {
    console.log('✅ Schema.org validation passed');
  }
}

validateSchemaOrg().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
