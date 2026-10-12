/**
 * Indexierungs-Antrag: URL-Auswahl, Kontingent, Protokoll (CR-019)
 * @author andreas@siglochconsulting.de
 */

import { describe, test, expect } from 'vitest';
import {
  parseUrlsFromArg,
  parseUrlsFromMarkdown,
  capToQuota,
  buildLogEntry,
  serializeLog,
  explainAuthFailure,
} from '../../ops/jobs/gsc-request-indexing';

const SITE = 'https://siglochconsulting.de/';

describe('URL-Auswahl', () => {
  test('--urls nimmt nur URLs dieser Site und entfernt Dubletten', () => {
    const urls = parseUrlsFromArg(`${SITE}, ${SITE}kontakt/ ,https://sigloch-immobilien.de/,${SITE}`);
    expect(urls).toEqual([SITE, `${SITE}kontakt/`]);
  });

  test('--file liest nur Code-Blöcke und überspringt zurückgestellte Zeilen', () => {
    const md = [`${SITE}nicht-im-block/`, '```', `${SITE}projekte/`, `> ${SITE}zurueckgestellt/`, '```'].join('\n');
    expect(parseUrlsFromMarkdown(md)).toEqual([`${SITE}projekte/`]);
  });

  test('das Tageskontingent deckelt, der Rest wird ausgewiesen', () => {
    const urls = Array.from({ length: 5 }, (_, i) => `${SITE}${i}/`);
    const { send, deferred } = capToQuota(urls, 3);
    expect(send).toHaveLength(3);
    expect(deferred).toEqual([`${SITE}3/`, `${SITE}4/`]);
  });
});

describe('Protokoll', () => {
  const now = new Date('2026-10-12T15:00:00Z');

  test('Erfolg und Fehler werden als je eine JSONL-Zeile geschrieben', () => {
    const ok = buildLogEntry(SITE, 'cr-017', { ok: true, response: { a: 1 } }, now);
    const failed = buildLogEntry(SITE, 'cr-017', { ok: false, error: '403: nope' }, now);
    expect(ok).toMatchObject({ url: SITE, tag: 'cr-017', status: 'ok', requestedAt: '2026-10-12T15:00:00.000Z' });
    expect(failed).toMatchObject({ status: 'error', error: '403: nope' });

    const lines = serializeLog([ok, failed]).trimEnd().split('\n');
    expect(lines.map((l) => JSON.parse(l).status)).toEqual(['ok', 'error']);
  });
});

describe('explainAuthFailure', () => {
  test('fehlende Inhaberschaft nennt Property und Service Account', () => {
    const text = explainAuthFailure(403, 'Permission denied. Failed to verify the URL ownership.', 'bot@example.iam');
    expect(text).toContain('siglochconsulting.de');
    expect(text).toContain('bot@example.iam');
    expect(text).toContain('Inhaber');
  });

  test('anderes 403 verweist auf die API-Aktivierung', () => {
    expect(explainAuthFailure(403, 'API has not been used')).toContain('indexing.googleapis.com');
  });
});
