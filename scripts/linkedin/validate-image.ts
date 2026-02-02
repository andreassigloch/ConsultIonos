/**
 * LinkedIn Image Validator
 * @author andreas@siglochconsulting.de
 *
 * Validiert Bilder gegen LinkedIn-Guidelines:
 * - Dimensionen: 1200x627 (landscape), 1080x1080 (square), 1080x1350 (portrait)
 * - Dateigröße: max 5 MB
 * - Format: PNG, JPG (keine GIFs)
 */

import fs from 'fs/promises';
import path from 'path';
import { LINKEDIN_LIMITS } from './templates.js';

// =============================================================================
// Types
// =============================================================================

export interface ImageValidation {
  valid: boolean;
  path: string;
  exists: boolean;
  format: string | null;
  dimensions: { width: number; height: number } | null;
  sizeBytes: number;
  sizeMB: number;
  warnings: string[];
  errors: string[];
  recommendation: string | null;
}

export type ImageFormat = 'landscape' | 'square' | 'portrait' | 'unknown';

// =============================================================================
// PNG/JPG Header Parsing (ohne externe Dependencies)
// =============================================================================

/**
 * Liest Bilddimensionen aus PNG-Header
 */
function parsePngDimensions(buffer: Buffer): { width: number; height: number } | null {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  if (!buffer.subarray(0, 8).equals(pngSignature)) {
    return null;
  }

  // IHDR chunk starts at byte 8, width at 16, height at 20
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  return { width, height };
}

/**
 * Liest Bilddimensionen aus JPEG-Header
 */
function parseJpegDimensions(buffer: Buffer): { width: number; height: number } | null {
  // JPEG signature: FF D8 FF
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    // Find next marker
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }

    const marker = buffer[offset + 1];

    // SOF markers (Start of Frame) contain dimensions
    // SOF0 (0xC0) - Baseline DCT
    // SOF1 (0xC1) - Extended sequential DCT
    // SOF2 (0xC2) - Progressive DCT
    if (marker >= 0xc0 && marker <= 0xc3) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }

    // Skip to next segment
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
    } else {
      const segmentLength = buffer.readUInt16BE(offset + 2);
      offset += 2 + segmentLength;
    }
  }

  return null;
}

/**
 * Ermittelt Bildformat aus Dateiendung und Header
 */
function detectImageFormat(filePath: string, buffer: Buffer): string | null {
  const ext = path.extname(filePath).toLowerCase();

  // Verify with magic bytes
  if (ext === '.png') {
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    if (buffer.subarray(0, 4).equals(pngSignature)) {
      return 'png';
    }
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      return 'jpg';
    }
  }

  if (ext === '.gif') {
    const gif87a = Buffer.from('GIF87a');
    const gif89a = Buffer.from('GIF89a');
    if (buffer.subarray(0, 6).equals(gif87a) || buffer.subarray(0, 6).equals(gif89a)) {
      return 'gif';
    }
  }

  // Fallback to extension
  if (['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
    return ext.replace('.', '');
  }

  return null;
}

/**
 * Liest Bilddimensionen aus Datei
 */
async function getImageDimensions(
  filePath: string,
  buffer: Buffer
): Promise<{ width: number; height: number } | null> {
  const format = detectImageFormat(filePath, buffer);

  if (format === 'png') {
    return parsePngDimensions(buffer);
  }

  if (format === 'jpg' || format === 'jpeg') {
    return parseJpegDimensions(buffer);
  }

  return null;
}

// =============================================================================
// Format Detection
// =============================================================================

/**
 * Bestimmt das LinkedIn-Format basierend auf Dimensionen
 */
export function detectLinkedInFormat(width: number, height: number): ImageFormat {
  const ratio = width / height;

  // Landscape: 1.91:1 (tolerance ±0.1)
  if (ratio >= 1.8 && ratio <= 2.0) {
    return 'landscape';
  }

  // Square: 1:1 (tolerance ±0.05)
  if (ratio >= 0.95 && ratio <= 1.05) {
    return 'square';
  }

  // Portrait: 4:5 = 0.8 (tolerance ±0.1)
  if (ratio >= 0.7 && ratio <= 0.9) {
    return 'portrait';
  }

  return 'unknown';
}

/**
 * Gibt empfohlene Dimensionen für ein Format zurück
 */
export function getRecommendedDimensions(format: ImageFormat): { width: number; height: number } {
  switch (format) {
    case 'landscape':
      return LINKEDIN_LIMITS.image.landscape;
    case 'square':
      return LINKEDIN_LIMITS.image.square;
    case 'portrait':
      return LINKEDIN_LIMITS.image.portrait;
    default:
      return LINKEDIN_LIMITS.image.landscape; // Default to landscape
  }
}

// =============================================================================
// Main Validation
// =============================================================================

/**
 * Validiert ein Bild gegen LinkedIn-Guidelines
 */
export async function validateImage(imagePath: string): Promise<ImageValidation> {
  const result: ImageValidation = {
    valid: true,
    path: imagePath,
    exists: false,
    format: null,
    dimensions: null,
    sizeBytes: 0,
    sizeMB: 0,
    warnings: [],
    errors: [],
    recommendation: null,
  };

  // Check if file exists
  try {
    const stats = await fs.stat(imagePath);
    result.exists = true;
    result.sizeBytes = stats.size;
    result.sizeMB = stats.size / (1024 * 1024);
  } catch {
    result.exists = false;
    result.errors.push(`Datei nicht gefunden: ${imagePath}`);
    result.valid = false;
    return result;
  }

  // Read file header (first 64KB should be enough for headers)
  const buffer = Buffer.alloc(65536);
  const fileHandle = await fs.open(imagePath, 'r');
  try {
    await fileHandle.read(buffer, 0, 65536, 0);
  } finally {
    await fileHandle.close();
  }

  // Detect format
  result.format = detectImageFormat(imagePath, buffer);

  if (!result.format) {
    result.errors.push('Unbekanntes Bildformat');
    result.valid = false;
    return result;
  }

  // Check format
  if (result.format === 'gif') {
    result.errors.push('GIF nicht unterstützt - wird als statisches Bild angezeigt');
    result.valid = false;
  }

  if (result.format && !(LINKEDIN_LIMITS.image.formats as readonly string[]).includes(result.format)) {
    result.warnings.push(`Format "${result.format}" möglicherweise nicht optimal`);
  }

  // Check file size
  if (result.sizeMB > LINKEDIN_LIMITS.image.maxSizeMB) {
    result.errors.push(
      `Dateigröße ${result.sizeMB.toFixed(2)} MB überschreitet ${LINKEDIN_LIMITS.image.maxSizeMB} MB`
    );
    result.valid = false;
  }

  // Get dimensions
  result.dimensions = await getImageDimensions(imagePath, buffer);

  if (!result.dimensions) {
    result.warnings.push('Dimensionen konnten nicht gelesen werden');
    return result;
  }

  const { width, height } = result.dimensions;
  const detectedFormat = detectLinkedInFormat(width, height);

  // Check dimensions against recommended
  if (detectedFormat === 'unknown') {
    result.warnings.push(
      `Ungewöhnliches Seitenverhältnis (${width}x${height}). ` +
        'Empfohlen: 1200x627 (landscape), 1080x1080 (square), 1080x1350 (portrait)'
    );

    // Suggest closest format
    const ratio = width / height;
    if (ratio > 1) {
      result.recommendation = `Für Landscape: Resize auf 1200x627`;
    } else if (ratio < 1) {
      result.recommendation = `Für Portrait: Resize auf 1080x1350`;
    } else {
      result.recommendation = `Für Square: Resize auf 1080x1080`;
    }
  } else {
    const recommended = getRecommendedDimensions(detectedFormat);

    // Check if dimensions are optimal
    if (width < recommended.width || height < recommended.height) {
      result.warnings.push(
        `Auflösung (${width}x${height}) unter Empfehlung (${recommended.width}x${recommended.height})`
      );
    }
  }

  return result;
}

/**
 * Formatiert Validierungsergebnis für Output
 */
export function formatValidationResult(validation: ImageValidation): string {
  const lines: string[] = [];

  lines.push(`- Pfad: \`${validation.path}\``);

  if (!validation.exists) {
    lines.push(`- Status: Datei nicht gefunden`);
    return lines.join('\n');
  }

  // Dimensions
  if (validation.dimensions) {
    const { width, height } = validation.dimensions;
    const format = detectLinkedInFormat(width, height);
    const icon = format !== 'unknown' ? '' : '';
    lines.push(`- Dimensionen: ${width}x${height} (${format}) ${icon}`);
  }

  // Format
  const formatIcon = validation.format && (LINKEDIN_LIMITS.image.formats as readonly string[]).includes(validation.format) ? '' : '';
  lines.push(`- Format: ${validation.format?.toUpperCase() || 'unbekannt'} ${formatIcon}`);

  // Size
  const sizeIcon = validation.sizeMB <= LINKEDIN_LIMITS.image.maxSizeMB ? '' : '';
  lines.push(`- Größe: ${validation.sizeMB.toFixed(2)} MB ${sizeIcon}`);

  // Errors
  for (const error of validation.errors) {
    lines.push(`- ${error}`);
  }

  // Warnings
  for (const warning of validation.warnings) {
    lines.push(`- ${warning}`);
  }

  // Recommendation
  if (validation.recommendation) {
    lines.push(`- Empfehlung: ${validation.recommendation}`);
  }

  return lines.join('\n');
}

// =============================================================================
// CLI
// =============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: tsx validate-image.ts <image-path>');
    process.exit(1);
  }

  const imagePath = args[0];
  const validation = await validateImage(imagePath);

  console.log('\n LinkedIn Image Validation\n');
  console.log('='.repeat(60));
  console.log(formatValidationResult(validation));
  console.log('='.repeat(60));

  if (!validation.valid) {
    console.log('\n Bild erfüllt nicht alle Anforderungen\n');
    process.exit(1);
  }

  console.log('\n Bild ist LinkedIn-kompatibel\n');
}
