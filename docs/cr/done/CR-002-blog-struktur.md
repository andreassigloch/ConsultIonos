# CR-002: Blog-Struktur mit Serien

**Status:** ✅ Completed
**Datum:** 2025-12-17
**Autor:** Andreas Sigloch

## Zusammenfassung

Umstrukturierung des Blog-Bereichs in thematische Serien für bessere Navigation und inhaltliche Gruppierung.

## Änderungen

### Neue Blog-Struktur

**4 Serien definiert:**

1. **Think AI** (7 Artikel)
   - Prefix: `think-ai-XX-`
   - Tag: `Think AI`
   - Thema: KI-Reflexionen, Erfahrungen, Roadblocker

2. **Vibe Coding** (3 Artikel)
   - Prefix: `vibe-coding-XX-`
   - Tag: `Vibe Coding`
   - Thema: KI-gestützte Softwareentwicklung

3. **Summer School** (5 Artikel)
   - Prefix: `summer-school-XX-`
   - Tag: `Summer School`
   - Thema: AI for Systems Engineering (2024)

4. **Einzelartikel** (5 Artikel)
   - Ohne Serien-Prefix
   - Themenübergreifende Artikel

### Frontmatter-Schema

```yaml
---
title: 'Serie #X: Titel'
description: 'Beschreibung'
pubDate: YYYY-MM-DD
author: 'Andreas Sigloch'
image: '/images/XXXXX.jpeg'  # optional
tags: ['Serie', 'Tag1', 'Tag2']
series: 'Serienname'  # optional
draft: false
---
```

## Betroffene Dateien

- `src/content/blog/*.md` - 20 neue Artikel

## Tests

- [x] Dev-Server startet ohne Fehler
- [x] Alle Artikel auf /publikationen/ sichtbar
- [x] Bilder korrekt zugeordnet
