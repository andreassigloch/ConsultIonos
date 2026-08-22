# CR-015 — Statische graphcode-Demo unter /projekte/graphcode-demo

**Status:** abgeschlossen
**Erstellt:** 2026-08-22
**Abgeschlossen:** 2026-08-22

## Ziel

Das Ergebnis der 15-Minuten-Demo (Repo `graphcodedemo`, Modell „City People Mover")
als statische Seite auf siglochconsulting.de zeigen: eine deutsche Landing-Page mit
zwei Screenshots aus dem graphcode-Viewer plus die 15 aus dem Modell generierten
Dokumente vollständig browsebar.

## Umfang

| Datei | Art |
|---|---|
| `src/lib/graphcodeDemo.ts` | neu — Dokumentliste (Slug, deutscher Titel, Zusammenfassung) und die aus dem Modell gezählten Kennzahlen |
| `src/pages/projekte/graphcode-demo/index.astro` | neu — Landing-Page (deutsch) |
| `src/pages/projekte/graphcode-demo/[doc].astro` | neu — Route je Dokument, rendert das Markdown aus `src/data/graphcode-demo/` |
| `src/pages/projekte/index.astro` | geändert — Projektkarte; interne Projektlinks öffnen nicht mehr in neuem Tab |
| `tests/e2e/graphcode-demo.spec.ts` | neu — E2E über Landing-Page, alle 15 Dokumente, Blättern |
| `src/data/graphcode-demo/*.md` | Inhalt — 15 Exporte aus `graphcodedemo/docs/views/`, unverändert |
| `public/images/graphcode-demo/*.png` | Inhalt — 2 Screenshots aus dem graphcode-Viewer |

## Entscheidungen

- **Seite deutsch, Dokumente englisch.** Modell- und Exportsprache ist Englisch; die
  Landing-Page sagt das und ordnet ein.
- **Dokumente werden kopiert, nicht generiert.** Ein Snapshot vom 22.08.2026,
  graphcode 0.17.0. Bei einer Modelländerung: `docs/views/*.md` aus `graphcodedemo`
  neu kopieren und das Datum in `src/lib/graphcodeDemo.ts` nachziehen.
- **Leere Dokumente bleiben sichtbar** (Trade Study, Implementierungsplan, Integrationsplan,
  Änderungsprotokoll, CR-Liste). Im Konzeptstand gibt es dort nichts zu drucken — das
  ist Teil der Aussage, nicht ein Fehler.
- **Zahlen sind aus dem Snapshot gezählt**, nicht aus den Demo-Unterlagen übernommen:
  219 Einträge, 402 Verknüpfungen, 64 Anforderungen (davon 16 Risiken), 41 Tests ohne
  Ergebnis, 0 von 219 Einträgen mit Regelverstoß, 3 von 8 Reifegrad-Toren bestanden.

## Akzeptanzkriterien

- [x] `/projekte/graphcode-demo` erreichbar, von `/projekte` verlinkt
- [x] alle 15 Dokumente unter `/projekte/graphcode-demo/<slug>` gerendert
- [x] `npm run build` grün (59 Seiten)
- [x] `npx playwright test tests/e2e/graphcode-demo.spec.ts` grün (19 Tests)
- [x] `npm run lint:design` ohne Befund in den neuen Dateien
- [x] kein horizontaler Überlauf bei 390 / 768 / 1280 px

## Offen

Deploy (`npm run deploy`, IONOS SFTP) ist nicht Teil dieses CR.
