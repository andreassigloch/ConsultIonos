# `channels/` — was das Repo verlässt

**Regel in einem Satz:** Was hier liegt, wird **nie** eine URL. Es geht per Copy-Paste auf eine
fremde Plattform und ist dort zu Hause, nicht bei uns.

Das Gegenstück ist `src/content/` — dort liegt, was Astro zu einer Seite macht. Vorgehen
übernommen aus `siglochimmo/channels/` (dort CR-337), hier CR-016.

## Aufbau

```
channels/
├── README.md      dieses Dokument
├── linkedin/      LinkedIn-Posts
└── assets/        fertige Post-Bilder, alle Varianten, recipe.json
```

Ein Post ist eine Datei `YYYY-MM-DD-slug.md` — Datum = Posting-Datum. `npm run linkedin:prepare`
(`ops/jobs/linkedin/`) schreibt sie aus jedem Blog-Artikel mit `linkedinStatus: 'planned'` und
setzt den Artikel danach auf `'published'`.

Die Dateien ohne dieses Schema (`2026-02-07-posts.md`, `2026-03-02-posts.md`,
`datenreife-01-published.md`, `datenreife-03-draft.md`) stammen aus der Zeit der Sammeldatei
unter `docs/linkedin-queue/` und bleiben, wie sie waren.

## Die Quelle liegt woanders

Jeder Post hat eine Quelle in `src/content/blog/`; die Post-Datei nennt sie als `**Quelle:**` und
`**URL:**`. Entsteht ein Post ohne Artikel (Karussell, Statement-Grafik), steht in der Post-Datei
`**Eigene Seite:** keine — <Grund>`.

Der Artikel ist zugleich das Register: Er trägt `linkedinStatus`, `linkedinPostDate` und
`linkedinUrl`.

## Bildablage

```
assets/<JJJJ-MM-TT>-<motiv-slug>/
├── recipe.json
├── <motiv>--li-4x5.png       LinkedIn Hochformat   1080×1350
├── <motiv>--li-4x5-<n>.png   Karussell-Seite n     1080×1350
├── <motiv>--li-doc.pdf       Karussell als Dokument-Post
├── <motiv>--li-1x1.png       LinkedIn quadratisch  1080×1080
└── <motiv>--li-3x2.png       LinkedIn Querformat   1200×627
```

**Namensschema:** `<motiv-slug>--<kanal>-<seitenverhältnis>.<ext>`. Der doppelte Bindestrich
trennt Motiv von Variante. Kanal-Kürzel: `li` LinkedIn · `src` Ausgangsfassung.

Ein Motiv, ein Ordner. Eine neue Größe desselben Motivs ist eine **Variante**, kein neues Motiv.
Der Ordner trägt das Erstelldatum vorn (`erstellt` aus der `recipe.json`).

### `recipe.json`

Pflicht je Motiv:

| Feld | Zweck |
|---|---|
| `quelle` | woher das Ausgangsmaterial kommt |
| `rechte` | eigene Grafik, Kundenmaterial, Fremdbild — entscheidet, ob wir es posten dürfen |
| `reproduzieren` | der Befehl oder das Werkzeug, das die Variante erzeugt hat |
| `alt` | Alt-Text, damit er nicht je Post neu erfunden wird |
| `verwendet_in` | alle Dateien, die das Bild referenzieren — Post und Artikel |

### Ordner mit Unterstrich: kein Motiv

| Ordner | Inhalt |
|---|---|
| `assets/_vorlagen/` | Mustergrafiken des Markenauftritts: `vorlage-praxisfall` (hell, Diagramm), `vorlage-statement` (dunkel, These) |
| `assets/_profil/` | Profil-Ausstattung: Banner 1584×396, Avatar 800×800 |
| `assets/_unzugeordnet/` | Bilder ohne bekannte Aussage und Quelle — zuordnen oder löschen |

## Die zwei Orte für Bilder

| Ort | Inhalt |
|---|---|
| **`channels/assets/`** | fertige Post-Bilder, alle Varianten, `recipe.json` |
| `public/images/…` | Bilder, die die Website ausliefert |

Ein Motiv kann in beiden liegen. Der Crop ist je Ziel ein anderer, deshalb liegen die Fassungen
getrennt und nicht als Kopie voneinander.

## Konventionen

- **PNG für Grafiken, JPG für Fotos, je Datei ≤ 400 KB.**
- **Keine fremden Firmenlogos** in eigenen Grafiken.
- **Link im Post-Text**, nicht im ersten Kommentar — Begründung im Skill
  `.claude/skills/linkedin-post/SKILL.md`.
