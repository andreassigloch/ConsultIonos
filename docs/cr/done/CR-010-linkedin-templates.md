# CR-010: LinkedIn Templates - Guidelines-konforme Überarbeitung

**Status:** ✅ Completed
**Erstellt:** 2026-02-02
**Autor:** andreas@siglochconsulting.de

## Ziel

LinkedIn Post Generator überarbeiten basierend auf recherchierten LinkedIn Guidelines 2025/2026:
- Post-Struktur: Hook (140 Zeichen) + Body + CTA + Hashtags
- Link im ersten Kommentar (Algorithmus-optimiert)
- Bild-Validierung (Dimensionen, Format, Größe)
- Differenzierung Post vs. Artikel

## LinkedIn Guidelines (Recherche)

### Post-Limits

| Aspekt | Limit | Empfehlung |
|--------|-------|------------|
| Zeichen | 3.000 max | 1.300-1.600 optimal |
| "See more" | ~140 Zeichen (Mobile) | Hook muss standalone funktionieren |
| Links | Unbegrenzt | **Im Kommentar** (Algorithmus!) |
| Hashtags | Unbegrenzt | 3-5 optimal |

### Bild-Spezifikationen

| Format | Dimensionen |
|--------|-------------|
| Landscape | 1200 × 627 px |
| Square | 1080 × 1080 px |
| Portrait | 1080 × 1350 px |
| Max Größe | 5 MB |
| Formate | PNG, JPG (kein GIF) |

## Implementierung

### Neue Dateien

| Datei | Funktion |
|-------|----------|
| `scripts/linkedin/templates.ts` | Post/Article Templates, Limits, Validierung |
| `scripts/linkedin/validate-image.ts` | Bild-Validierung (Dimensionen, Format, Größe) |

### Geänderte Dateien

| Datei | Änderung |
|-------|----------|
| `scripts/linkedin/generate-post.ts` | Hook/Body/CTA Extraktion, Validierung integriert |
| `scripts/linkedin/prepare.ts` | Neues Output-Format mit Checklisten |
| `src/content/config.ts` | `linkedinType`, `linkedinHook` Felder |
| `docs/project/linkedin-content-guide.md` | Guidelines-Dokumentation ergänzt |

### Neue Frontmatter-Felder

```yaml
linkedinType: 'post'  # post | article (default: post)
linkedinHook: ''      # Manueller Hook (max 140 Zeichen)
```

### Output-Format (neu)

```markdown
## [Titel]

### Post-Text (Copy & Paste)
[Hook + Body + CTA + Hashtags]

### Erster Kommentar (Link)
[URL für ersten Kommentar]

### Bild
- Dimensionen: WxH (format) ✅/⚠️
- Format: PNG/JPG ✅/⚠️
- Größe: X MB ✅/⚠️

### Checkliste
- [ ] Post-Text kopiert
- [ ] Bild hochgeladen
- [ ] Veröffentlicht
- [ ] Link im 1. Kommentar gepostet
- [ ] Frontmatter aktualisiert
```

## Quellen

- [LinkedIn Help - Post and share updates](https://www.linkedin.com/help/linkedin/answer/a528176)
- [LinkedIn Post Character Limits 2026](https://socialrails.com/blog/linkedin-post-character-limits)
- [LinkedIn Post Size Guide 2026](https://www.sendible.com/insights/linkedin-post-size)
- [LinkedIn Articles Guide 2025](https://tomislavhorvat.com/linkedin-articles-the-definitive-guide/)

## Erfolgskriterien

- [x] Templates mit LinkedIn-Limits definiert
- [x] Hook-Extraktion (max 140 Zeichen)
- [x] Link im Kommentar statt im Post
- [x] Bild-Validierung implementiert
- [x] Output mit Checklisten
- [x] Content Guide aktualisiert
- [x] Erster Post veröffentlicht (datenreife-01)
