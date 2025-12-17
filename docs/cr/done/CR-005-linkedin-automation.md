# CR-005: LinkedIn-Automation

**Status:** ✅ Completed
**Erstellt:** 2025-12-17
**Autor:** andreas@siglochconsulting.de

## Ziel

Automatisierte LinkedIn-Post-Generierung aus Blog-Artikeln:
1. Blog-Artikel → LinkedIn-Post (Kurzfassung + Hashtags)
2. Bildgenerierung via Fal.ai (Flux Schnell) wenn kein Bild vorhanden
3. Output als Copy/Paste-Datei in `docs/linkedin-queue/`
4. Tracking via Frontmatter (`linkedinStatus`, `linkedinPostDate`)

## Workflow

```
Blog-Artikel              Markdown-Datei            LinkedIn
[planned] ──────────────► [Copy/Paste] ──────────► [published]
         npm run linkedin:prepare    docs/linkedin-queue/
```

1. Artikel schreiben mit `linkedinStatus: 'planned'`
2. `npm run linkedin:prepare` → generiert Post-Datei
3. Datei öffnen → Post-Text kopieren → LinkedIn einfügen
4. Bild hochladen (Pfad in Datei)
5. Frontmatter auf `published` setzen

## Technische Umsetzung

### 1. Frontmatter-Schema ✅

```typescript
linkedinStatus: z.enum(['draft', 'planned', 'published']).optional(),
linkedinPostDate: z.date().optional(),
linkedinUrl: z.string().optional(),
```

### 2. Scripts ✅

| Script | Funktion |
|--------|----------|
| `scripts/linkedin/generate-post.ts` | Artikel → Post-Text + Hashtags |
| `scripts/linkedin/generate-image.ts` | Fal.ai Flux Schnell → Bild |
| `scripts/linkedin/prepare.ts` | Orchestriert + Output-Datei |

### 3. NPM Scripts ✅

```bash
npm run linkedin:prepare  # Kompletter Workflow → docs/linkedin-queue/
npm run linkedin:post     # Nur Posts anzeigen (CLI)
npm run linkedin:image    # Nur Bilder generieren
```

### 4. Skill ✅

`.claude/skills/linkedin-post.md` - Aufruf via `/project:linkedin-post`

### 5. Hook ✅

`user-prompt-submit` Hook prüft auf offene Posts und zeigt Hinweis.

### 6. Umgebungsvariablen (optional)

```bash
FAL_API_KEY=xxx  # Fal.ai für Bildgenerierung
```

## Erfolgskriterien

- [x] Post-Text aus Artikel generiert (~200-300 Zeichen)
- [x] Bild via Fal.ai generiert (wenn keins vorhanden + API Key)
- [x] Output in `docs/linkedin-queue/YYYY-MM-DD-posts.md`
- [x] Frontmatter-Tracking funktioniert
- [x] Skill für einfachen Aufruf
- [x] Hook für Erinnerung an offene Posts
