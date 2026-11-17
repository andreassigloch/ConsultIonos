/**
 * „Das Systemmodell in Bildern" — Snapshot aus dem graphcode-Repo
 * @author andreas@siglochconsulting.de
 *
 * Quelle: graphcode/docs/project/systemmodell-in-bildern.html, dort per Test gegen den
 * Regelkatalog in @sigloch/contracts geprüft. Diese Datei zerlegt den Snapshot in
 * Style, Inhalt und Script, damit die Seite /projekte/graphcode/systemmodell ihn ohne
 * Google Fonts und mit eigenem Kopf ausliefert.
 *
 * Aktualisieren: Datei aus graphcode nach src/data/graphcode/ kopieren, SNAPSHOT_DATE nachziehen.
 */

import source from '../data/graphcode/systemmodell-in-bildern.html?raw';

export const SNAPSHOT_DATE = '2026-11-17';

export interface SystemmodellParts {
  title: string;
  css: string;
  body: string;
  script: string;
}

export function splitSystemmodell(html: string): SystemmodellParts {
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
  // Der zweite <style>-Block trägt das Design; der erste ist der Rahmen des Artefakt-Hosts.
  const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const css = styles.find((s) => s.includes('--font-display'));
  const bodyStart = html.indexOf('<div class="wrap">');
  const scriptStart = html.lastIndexOf('<script>');
  const scriptEnd = html.lastIndexOf('</script>');

  if (!title || !css || bodyStart < 0 || scriptStart < bodyStart || scriptEnd < scriptStart) {
    throw new Error('systemmodell-in-bildern.html: Titel, Style, Inhalt oder Script nicht gefunden');
  }
  if (/fonts\.googleapis|https?:\/\/[^"'\s]*\.(js|css)\b/.test(css + html.slice(bodyStart))) {
    throw new Error('systemmodell-in-bildern.html: externe Ressource im Inhalt (DSGVO)');
  }

  return {
    title,
    css,
    body: html.slice(bodyStart, scriptStart).trim(),
    script: html.slice(scriptStart + '<script>'.length, scriptEnd).trim(),
  };
}

export const systemmodell = splitSystemmodell(source);
