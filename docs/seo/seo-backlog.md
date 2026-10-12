# SEO Backlog - Sigloch Consulting

## Status

| Maßnahme | Status | Termin | Metriken |
|----------|--------|--------|----------|
| Schema.org ProfessionalService | ✅ Done | - | - |
| Sitemap Integration | ✅ Done | - | - |
| Open Graph Tags | ✅ Done | - | - |
| Rich Results Test | ⏳ Nach Deploy | - | - |
| Link-Vorschaubild `og-image.png` (vorher 404) | ✅ Done 2026-10-12 (CR-017) | LinkedIn Post Inspector nach Deploy | Vorschau zeigt Wortmarke + Claim |
| Schema.org `logo` zeigt auf vorhandene Datei, `telephone` ergänzt | ✅ Done 2026-10-12 (CR-017/018) | Rich Results Test nach Deploy | `npm run validate:schema`: 0 Fehler, 0 Warnungen |
| `robots.txt`, `llms.txt`, `favicon.svg` erreichbar (vorher 403) | ✅ Done 2026-10-12 (CR-017) | GSC robots.txt-Bericht: 2026-10-19 | Baseline 2026-10-12: alle drei HTTP 403 |

## Tracking-Kalender

### Nach jedem Deploy

1. **Google Search Console**
   - URL-Prüfung für geänderte Seiten
   - "Indexierung beantragen" klicken

2. **Rich Results Test**
   - https://search.google.com/test/rich-results
   - Alle Seiten mit Schema.org validieren

### Wöchentlich

- Google Search Console: Impressions & Clicks prüfen
- Ranking-Änderungen dokumentieren

## Schema.org Typen

| Seite | Schema Typ |
|-------|------------|
| Homepage | ProfessionalService, Person |
| Blog Posts | Article, Person |

## Keywords

### Primary

- Systems Engineering Berater
- GenAI Consulting
- A-Spice Beratung
- Produktentwicklung Optimierung

### Secondary

- Requirements Engineering
- LEAN Systems Engineering
- Automotive Consulting
- Transformation Beratung

## Baseline-Metriken

> Nach Deploy ausfüllen

- **Lighthouse Performance:** _TBD_
- **Google Search Impressions:** _TBD_
- **Indexed Pages:** _TBD_
