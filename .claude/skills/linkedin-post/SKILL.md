---
name: linkedin-post
description: "LinkedIn-Post generieren aus Blog-Artikeln mit linkedinStatus 'planned'. Verwenden bei: LinkedIn-Post erstellen, LinkedIn-Content, nach Artikel-Erstellung."
allowed-tools: Read, Grep, Glob, Write, Edit, Bash(npm run linkedin:prepare*), Bash(npm run linkedin:post*), Bash(open*)
---

# LinkedIn Post Generator

Generiert LinkedIn-Posts aus Blog-Artikeln mit `linkedinStatus: 'planned'`.

Tonalität und Beitragstypen: [docs/project/linkedin-content-guide.md](../../../docs/project/linkedin-content-guide.md).
Ablage und Bildschema: [channels/README.md](../../../channels/README.md).

## Ablauf

1. Vorschau ohne Schreibzugriff: `npm run linkedin:post`
2. `npm run linkedin:prepare` ausführen — schreibt je Artikel `channels/linkedin/YYYY-MM-DD-slug.md`
   und setzt den Artikel auf `linkedinStatus: 'published'` mit `linkedinPostDate`
3. **Post-Text prüfen** gegen den Content Guide. Der Generator nimmt die ersten Absätze des
   Artikels; das ist ein Entwurf, kein fertiger Post
4. Dem User die generierte Datei zeigen
5. Begleitbild im Finder anzeigen: `open -R <bildpfad>`
6. LinkedIn-Posting-Seite öffnen: `open "https://www.linkedin.com/feed/?shareActive=true"`

`linkedin:prepare` schreibt das Frontmatter sofort um. Nicht „zum Testen" ausführen.

## Formatierung

- **Hook:** max. 140 Zeichen, Frage oder Statement, kein Emoji, kein Hashtag
- **Hashtags:** 3–5, am Ende
- **Leerzeilen** zwischen Absätzen
- **Link im Post-Text**, als letzte Zeile vor den Hashtags (`👉 <url>`). Kein „Link im ersten
  Kommentar": ein geplanter Post nimmt keinen Kommentar mit, der Kommentar müsste nach der
  Veröffentlichung von Hand nachgeschoben werden (Entscheidung Andreas 2026-10-03 für
  siglochimmo, hier übernommen).

Der Validator aus `@sigloch/linkedin-tools` meldet dazu noch „Link im Post gefunden - besser im
ersten Kommentar posten". Der Hinweis ist überholt und wird ignoriert.

## Begleitbild

Jeder Post braucht ein Bild. Formate und Muster liegen unter `channels/assets/`:

| Beitragstyp | Muster | Format |
|---|---|---|
| Praxisbeitrag | `_vorlagen/vorlage-praxisfall--li-4x5.png` (hell, Diagramm + Kernsatz) | 1080×1350 |
| These / Fachbeitrag | `_vorlagen/vorlage-statement--li-4x5.png` (dunkel, zwei Zeilen) | 1080×1350 |
| Mehrstufige Erklärung | Karussell wie `2026-10-11-fmea-karussell/`, als PDF-Dokument-Post | 1080×1350 je Seite |

Ein fertiges Bild bekommt einen Motiv-Ordner `channels/assets/<JJJJ-MM-TT>-<motiv-slug>/` mit
`recipe.json`; `verwendet_in` nennt die Post-Datei und den Artikel.

## Neuen Artikel für LinkedIn vorbereiten

Im Frontmatter des Artikels:

```yaml
linkedinStatus: 'planned'
linkedinType: 'post'                  # oder 'article'
linkedinHook: 'Max 140 Zeichen Hook'  # optional, sonst aus description
hashtags:                             # optional, sonst aus series und tags
  - SystemsEngineering
```

## Nach dem Posten

`linkedinStatus` und `linkedinPostDate` setzt das Script. Von Hand bleibt:

```yaml
linkedinUrl: 'https://www.linkedin.com/posts/...'
```

## Posts ohne Artikel

Der Regelfall ist Artikel → Post. Entsteht ein Post direkt (Karussell, Statement-Grafik), wird
die Post-Datei von Hand unter `channels/linkedin/YYYY-MM-DD-slug.md` angelegt und führt
`**Eigene Seite:** /blog/<slug>` oder `**Eigene Seite:** keine — <Grund>`.
