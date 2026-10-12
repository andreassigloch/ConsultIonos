# CR-016 — LinkedIn-Vorgehen aus siglochimmo übernehmen

**Status:** abgeschlossen
**Erstellt:** 2026-10-12
**Abgeschlossen:** 2026-10-12
**Typ:** refactor

## Ziel

Das LinkedIn-Management arbeitet wie in `siglochimmo/ops/jobs/linkedin/`: eine Datei je Post
unter `channels/linkedin/`, Link im Post-Text, Frontmatter-Update durch das Script. Das
Markenpaket „Sigloch-Consulting-Auftritt" (Vorlagen, Karussell, Banner) bekommt einen Ort.

## Was sich ändert

| Vorher | Nachher |
|---|---|
| `scripts/linkedin/` | `ops/jobs/linkedin/` |
| `docs/linkedin-queue/YYYY-MM-DD-posts.md` (Sammeldatei) | `channels/linkedin/YYYY-MM-DD-slug.md` (eine je Post) |
| Link als erster Kommentar | Link im Post-Text, letzte Zeile vor den Hashtags |
| Frontmatter von Hand auf `published` | `linkedin:prepare` setzt `linkedinStatus` und `linkedinPostDate` |
| Post-Bilder ohne Ort | `channels/assets/<datum>-<motiv>/` mit `recipe.json` |
| `.claude/skills/linkedin-post.md` + `.claude/commands/linkedin-post.md` | `.claude/skills/linkedin-post/SKILL.md` |

Sicon-spezifisch geblieben: ein Content-Verzeichnis (`blog`), Kernthese aus dem Blockquote
zuerst, Serie als Hashtag, CTAs, Bildgenerierung über `linkedin:image`.

## Nebenbefund: die Pipeline lief nicht

`package.json` verwies auf `file:../../../sigloch-modules/…` — der Pfad vor dem Repo-Umzug.
`node_modules/@sigloch/linkedin-tools` und `…/quality-checkers` zeigten ins Leere, jeder
`linkedin:*`-Aufruf brach beim Import ab. Beide Pfade zeigen jetzt auf
`../../dev/sigloch-modules/…` wie in siglochimmo.

`npm run test` (`vitest run`) sammelte außerdem die Playwright-Specs ein und war dadurch rot,
ohne einen einzigen Unit-Test auszuführen. Der Aufruf ist auf `tests/unit` begrenzt.

## Nicht übernommen

- **Register-Test** (siglochimmo `tests/unit/social-register.test.ts`): prüft die Bindung
  News ↔ Motiv über ein `motiv`-Feld im Content-Schema. Sicon hat das Feld nicht und bisher
  kein Motiv, das ein Artikel nennt. `verwendet_in` ist hier Konvention, kein geprüfter Vertrag.
- **GBP, Instagram, Facebook:** sicon bespielt nur LinkedIn.

## Offen

- `validatePost` in `@sigloch/linkedin-tools` warnt weiter „Link im Post gefunden - besser im
  ersten Kommentar posten". Das widerspricht der Regel in beiden Repos und gehört im
  gemeinsamen Modul entfernt, nicht hier weggefiltert.
- `recipe.json` des FMEA-Karussells: `rechte` und `reproduzieren` sind nicht belegt.
- `channels/assets/_unzugeordnet/China Speed Visualisierung.png` (1,6 MB): keine Datei nennt es.
- Logos und Favicons des Markenpakets sind nicht übernommen — das ist der Website-Auftritt,
  nicht der LinkedIn-Kanal.

## Nachweis

- `npm run test`: `tests/unit/linkedin-post.test.ts` prüft Link-Position im Post-Text,
  Frontmatter-Update und Post-Datei.
- `npm run build`: 59 Seiten.
- `linkedin:prepare` gegen eine Kopie von `src/content/blog/` ausgeführt: 3 Post-Dateien,
  3 Artikel auf `published` mit Datum, sonst kein Unterschied. Im Repo **nicht** ausgeführt —
  die 3 geplanten Artikel (`datenreife-02`, `-03`, `-04`) stehen weiter auf `planned`.

## Dateien

Inhaltlich geändert oder neu:

1. `ops/jobs/linkedin/prepare.ts`
2. `ops/jobs/linkedin/generate-post.ts`
3. `tests/unit/linkedin-post.test.ts` — neu
4. `package.json`, `package-lock.json`
5. `channels/README.md` — neu
6. `channels/assets/2026-10-11-fmea-karussell/recipe.json` — neu
7. `.claude/skills/linkedin-post/SKILL.md`
8. `docs/project/linkedin-content-guide.md`
9. diese CR

Reine Verschiebungen und Importe ohne Inhaltsänderung: `generate-image.ts`, vier Post-Dateien
und ein Bild aus `docs/linkedin-queue/`, zwölf Dateien aus dem Markenpaket.
