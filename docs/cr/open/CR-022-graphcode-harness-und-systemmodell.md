# CR-022 — graphcode-Harness-Seite und „Das Systemmodell in Bildern"

**Status:** implementiert, Deploy offen
**Erstellt:** 2026-11-17

## Ziel

graphcode als Harness für Coding-Agenten auf der Website vorstellen: Installation mit
`npx @sigloch/graphcode init`, Key Features aus Leitlinie und Systemmodell-Seite, dazu die
Erklärseite „Das Systemmodell in Bildern" aus dem graphcode-Repo.

## Umfang

| Datei | Art |
|---|---|
| `src/components/SeoHead.astro` | neu — SEO-Kopf aus BaseLayout herausgelöst, genutzt von BaseLayout und der Systemmodell-Seite |
| `src/layouts/BaseLayout.astro` | geändert — nutzt SeoHead |
| `src/lib/systemmodell.ts` | neu — zerlegt den Snapshot in Style, Inhalt, Script; bricht bei externer Ressource ab |
| `src/data/graphcode/systemmodell-in-bildern.html` | Inhalt — Snapshot aus `graphcode/docs/project/systemmodell-in-bildern.html`, Stand 2026-11-17 |
| `src/pages/projekte/graphcode/index.astro` | neu — Harness-Seite: Kern-Claim, Installation, acht Key Features, Links |
| `src/pages/projekte/graphcode/systemmodell.astro` | neu — Systemmodell-Seite mit eigenem Design, ohne globale Site-CSS |
| `src/pages/projekte/index.astro` | geändert — Projektkarte „graphcode" |
| `tests/unit/systemmodell.test.ts` | neu — Zerlegung am echten Snapshot und an Fehlerfällen |
| `tests/e2e/graphcode-harness.spec.ts` | neu — Installationsbefehl, Features, Navigation, Diagramme, keine externen Requests |
| `public/fonts/graphcode/*.woff2` | Inhalt — Fraunces 500/600, Atkinson Hyperlegible 400/700 (aus @fontsource 5.3.0) |

## Entscheidungen

- **Quelle ist das Repo, nicht das Artefakt.** Das Claude-Artefakt nannte 80 Regeln und
  Regelkatalog 50.1.0; die Repo-Datei nennt 81 und 53.0.0 und ist dort per Test gegen den Katalog geprüft.
- **Eigenes Design, ohne BaseLayout.** Die globale Site-CSS (body, h1, p, table) würde das Design
  der Seite überschreiben. Der SEO-Kopf kommt trotzdem aus derselben Komponente.
- **Schriften lokal** statt Google Fonts (DSGVO).
- **Ehrlicher Stand:** Die Harness-Seite nennt die offenen Punkte der Leitlinie, u. a. Kosten ≈ 3,5× gegenüber frei laufendem Agenten.

## Aktualisieren

Datei aus `graphcode/docs/project/` nach `src/data/graphcode/` kopieren, `SNAPSHOT_DATE` in
`src/lib/systemmodell.ts` nachziehen, `npm test` laufen lassen.

## Akzeptanzkriterien

- [x] `/projekte/graphcode` zeigt `npx @sigloch/graphcode init` und acht Key Features
- [x] `/projekte/graphcode/systemmodell` rendert Landkarte, Beispiel und 13 Regelbeispiele, lädt nichts von fremden Hosts
- [x] Beide Seiten in der Sitemap, mit Description und Canonical
- [x] Unit-Tests, E2E, compliance, BFSG, design lint, seo:check, schema grün
- [ ] Deploy und Indexierungs-Antrag für beide URLs
