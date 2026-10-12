/**
 * Indexierungs-Antrag über die Google Indexing API (CR-019).
 * @author andreas@siglochconsulting.de
 *
 * Übernommen aus siglochimmo (dort CR-305). Ersetzt den manuellen Klickweg
 * GSC → URL-Prüfung → "Indexierung beantragen".
 * Der Antrag beschleunigt das Crawlen; er erzwingt keine Indexierung.
 *
 * Wichtig: Google dokumentiert die Indexing API ausschließlich für JobPosting und
 * BroadcastEvent. Für andere Seitentypen ist die Wirkung unbelegt.
 *
 * Zugang: Service-Account-Schlüssel, Pfad in .env als GSC_SERVICE_ACCOUNT_KEY. Der Account
 * muss in der GSC-Property siglochconsulting.de als Inhaber eingetragen sein.
 *
 * Nutzung:
 *   npm run seo:request-index -- --dry-run --urls=https://siglochconsulting.de/,https://…/kontakt/
 *   npm run seo:request-index -- --send --tag=<anlass> --urls=…
 *   npm run seo:request-index -- --send --file=docs/seo/tracking/<liste>.md
 */
import { GoogleAuth } from 'google-auth-library';
import { readFileSync, appendFileSync } from 'fs';
import { join } from 'path';

const PUBLISH_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const LOG_PATH = join(process.cwd(), 'docs', 'seo', 'tracking', 'indexing-requests.jsonl');
const SITE_PREFIX = 'https://siglochconsulting.de/';

/** Google-Tageskontingent der Indexing API. Im Script gedeckelt, nicht von der API erzwungen. */
export const DAILY_QUOTA = 200;

export interface RequestLogEntry {
  url: string;
  requestedAt: string;
  tag: string;
  status: 'ok' | 'error';
  apiResponse?: string;
  error?: string;
}

/**
 * Zieht Kandidaten-URLs aus einem Markdown-Dokument: alles, was in einem
 * Fenced-Code-Block auf den Site-Prefix passt. Zeilen hinter `>` (Blockquote)
 * werden ignoriert — dort stehen zurückgestellte URLs mit Begründung.
 */
export function parseUrlsFromMarkdown(md: string, sitePrefix = SITE_PREFIX): string[] {
  const out: string[] = [];
  let inFence = false;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) { inFence = !inFence; continue; }
    if (!inFence) continue;
    if (raw.trimStart().startsWith('>')) continue;
    if (line.startsWith(sitePrefix)) out.push(line);
  }
  return dedupe(out);
}

export function parseUrlsFromArg(arg: string, sitePrefix = SITE_PREFIX): string[] {
  return dedupe(
    arg.split(',').map((s) => s.trim()).filter((s) => s.startsWith(sitePrefix)),
  );
}

export function dedupe(urls: string[]): string[] {
  return [...new Set(urls)];
}

/** Deckelt auf das Tageskontingent und meldet, was abgeschnitten wurde. */
export function capToQuota(urls: string[], quota = DAILY_QUOTA): { send: string[]; deferred: string[] } {
  return { send: urls.slice(0, quota), deferred: urls.slice(quota) };
}

export function buildLogEntry(
  url: string,
  tag: string,
  result: { ok: true; response?: unknown } | { ok: false; error: string },
  now = new Date(),
): RequestLogEntry {
  const base = { url, requestedAt: now.toISOString(), tag };
  if (result.ok) {
    return { ...base, status: 'ok', apiResponse: JSON.stringify(result.response ?? {}) };
  }
  return { ...base, status: 'error', error: result.error };
}

/** Append-only JSONL. Kein Read-Modify-Write, damit parallele Läufe sich nicht überschreiben. */
export function serializeLog(entries: RequestLogEntry[]): string {
  return entries.map((e) => JSON.stringify(e)).join('\n') + '\n';
}

export function appendLog(entries: RequestLogEntry[], logPath = LOG_PATH): void {
  appendFileSync(logPath, serializeLog(entries));
}

/** Übersetzt einen API-Fehler in die Anleitung, die ihn behebt. Exit 2 statt stillem Fehlschlag. */
export function explainAuthFailure(status: number | undefined, message: string, account = '<Service Account>'): string {
  if (status === 403 && /permission|owner|Inhaber/i.test(message)) {
    return [
      'Der Service Account ist in der GSC-Property nicht Inhaber.',
      '→ https://search.google.com/search-console/users?resource_id=sc-domain%3Asiglochconsulting.de',
      `   Nutzer hinzufügen: ${account}`,
      '   Berechtigung: Inhaber (nicht "Vollständig")',
    ].join('\n');
  }
  if (status === 403 || status === 401) {
    return [
      'Indexing API ist im GCP-Projekt des Service Accounts nicht aktiviert oder der Scope fehlt.',
      '→ https://console.cloud.google.com/apis/library/indexing.googleapis.com',
    ].join('\n');
  }
  return `Unerwarteter Fehler (${status ?? '?'}): ${message}`;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flag = (name: string): string | undefined =>
    argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
  const send = argv.includes('--send');
  const tag = flag('tag') ?? 'manual-run';

  let urls: string[] = [];
  const urlsArg = flag('urls');
  const fileArg = flag('file');
  if (urlsArg) urls = parseUrlsFromArg(urlsArg);
  else if (fileArg) urls = parseUrlsFromMarkdown(readFileSync(join(process.cwd(), fileArg), 'utf-8'));
  else {
    console.error('❌ Weder --urls= noch --file= angegeben.');
    process.exit(1);
  }

  if (urls.length === 0) {
    console.error('❌ Keine URLs gefunden. Bei --file: stehen die URLs in einem ```-Block?');
    process.exit(1);
  }

  const { send: toSend, deferred } = capToQuota(urls);
  console.log(`📋 ${urls.length} URL(s) gefunden, Tag "${tag}"`);
  if (deferred.length) console.log(`   ⏭️  ${deferred.length} über Tageskontingent (${DAILY_QUOTA}) — heute nicht gesendet`);

  if (!send) {
    console.log('\n🔍 Dry-Run (kein --send). Es würde beantragt:');
    toSend.forEach((u, i) => console.log(`   ${String(i + 1).padStart(2)}. ${u}`));
    console.log('\n   Zum echten Senden: --send ergänzen.');
    return;
  }

  const keyFile = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!keyFile) {
    console.error('❌ GSC_SERVICE_ACCOUNT_KEY nicht gesetzt. In .env den Pfad zum Service-Account-Schlüssel eintragen.');
    process.exit(2);
  }
  const account: string = JSON.parse(readFileSync(keyFile, 'utf-8')).client_email;
  const auth = new GoogleAuth({ keyFile, scopes: ['https://www.googleapis.com/auth/indexing'] });
  const client = await auth.getClient();

  const entries: RequestLogEntry[] = [];
  let firstAuthError: { status?: number; message: string } | null = null;

  for (const url of toSend) {
    try {
      const res = await client.request({ url: PUBLISH_URL, method: 'POST', data: { url, type: 'URL_UPDATED' } });
      entries.push(buildLogEntry(url, tag, { ok: true, response: res.data }));
      console.log(`   ✅ ${url}`);
    } catch (e) {
      const err = e as { status?: number; code?: number | string; message?: string };
      const status = err.status ?? (typeof err.code === 'number' ? err.code : undefined);
      const message = err.message ?? String(e);
      if ((status === 401 || status === 403) && !firstAuthError) firstAuthError = { status, message };
      entries.push(buildLogEntry(url, tag, { ok: false, error: `${status ?? '?'}: ${message}` }));
      console.log(`   ❌ ${url} — ${status ?? '?'}`);
    }
  }

  if (entries.length) appendLog(entries);

  if (firstAuthError) {
    console.error('\n━━━ Zugang nicht eingerichtet ━━━');
    console.error(explainAuthFailure(firstAuthError.status, firstAuthError.message, account));
    process.exit(2);
  }

  const ok = entries.filter((e) => e.status === 'ok').length;
  console.log(`\n✅ ${ok}/${toSend.length} beantragt. Protokoll: ${LOG_PATH}`);
}

// Run only when invoked directly (allow safe imports for tests)
const isCli = (() => {
  try {
    const entry = process.argv[1] ? join(process.argv[1]) : '';
    return entry.endsWith('gsc-request-indexing.ts') || entry.endsWith('gsc-request-indexing.js');
  } catch { return false; }
})();

if (isCli) {
  main().catch((error) => {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  });
}
