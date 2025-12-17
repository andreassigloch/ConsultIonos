# CR-004: LinkedIn Content Guide & Schema-Erweiterung

**Status:** ✅ Completed
**Erstellt:** 2025-12-17
**Abgeschlossen:** 2025-12-17

---

## Ziel

Template und Stilbeschreibung für Blog-Artikel und LinkedIn-Postings erstellen, um konsistente Content-Erstellung zu ermöglichen.

## Umfang

### 1. Content Guide erstellt
**Datei:** `docs/project/linkedin-content-guide.md`

Enthält:
- **Beitragstypen:** Fachbeitrag (theory) vs. Praxisbeitrag (practice)
- **Textstil:** Struktur, Tonalität, sprachliche Muster
- **Bildstil:** KI-generiert, technisch-abstrakt, mit Selbstironie
- **Hashtag-Empfehlungen:** Primäre und sekundäre nach Thema
- **Serien-Formate:** Think AI, Datenreife, Vibe Coding, Summer School
- **Artikel-Template:** Vollständige Frontmatter- und Content-Struktur
- **Veröffentlichungsrhythmus:** Wöchentlich, Dienstag/Mittwoch

### 2. Schema erweitert
**Datei:** `src/content/config.ts`

Neue Felder:
- `category`: `'theory'` | `'practice'` - Unterscheidung Fachbeitrag/Praxisbeitrag
- `hashtags`: `string[]` - Empfohlene LinkedIn-Hashtags

### 3. Konferenzbeitrag integriert
**Dateien:**
- `public/downloads/ReConf2025_Sysli_pitch_website.pdf`
- `src/pages/publikationen.astro` - REConf 2025 Eintrag mit Download-Link

### 4. Bereinigung
- REConf 2024 Dummy-Eintrag entfernt

## Geänderte Dateien

| Datei | Änderung |
|-------|----------|
| `docs/project/linkedin-content-guide.md` | Neu erstellt |
| `src/content/config.ts` | Schema um `category` und `hashtags` erweitert |
| `src/pages/publikationen.astro` | REConf 2025 hinzugefügt, REConf 2024 entfernt |
| `public/downloads/ReConf2025_Sysli_pitch_website.pdf` | PDF kopiert |

## Validierung

- [x] Build erfolgreich
- [x] Schema-Validierung bestanden
- [x] PDF-Download funktional

## Nächste Schritte (optional)

- Bestehende Blog-Posts mit `category` und `hashtags` ergänzen
- Filter nach Kategorie auf Publikationen-Seite
