# CR-017 — Neues Logo auf der Website

**Status:** abgeschlossen (lokal, nicht deployed)
**Erstellt:** 2026-10-12
**Abgeschlossen:** 2026-10-12
**Typ:** feat

## Ziel

Die Wortmarke aus dem Markenpaket „Sigloch-Consulting-Auftritt" steht auf der Website. Bisher
gab es kein Logo: Text im Header, ein braunes „S" als Favicon, und zwei Verweise auf Dateien,
die nie existierten (`/images/og-image.jpg`, `/images/logo.svg`, beide live 404).

## Was sich ändert

| Ort | Vorher | Nachher |
|---|---|---|
| Header | Text „Andreas Sigloch / Consulting" auf Oliv-Verlauf | Wortmarke auf `--color-background-dark` |
| Footer | Überschrift „Sigloch Consulting" auf Oliv-Verlauf | Wortmarke auf `--color-background-dark` |
| Aktiver Menüpunkt | `--color-primary-800` | `--color-primary` |
| Favicon | braunes „S" (SVG) | Symbol auf Oliv: SVG, PNG 32, Touch-Icon 180 |
| Link-Vorschaubild | Verweis auf fehlendes `og-image.jpg` | `og-image.png` 1200×630, Wortmarke + Claim |
| Schema.org `logo` | Verweis auf fehlendes `logo.svg` | Wortmarke hell |

## Entscheidungen

- **Dunkle Fläche statt Oliv-Verlauf** in Header und Footer. Der grüne Knoten der Wortmarke
  (`#9baa47`) hebt sich vom Oliv kaum ab; das Markenpaket setzt die dunkle Variante durchgehend
  auf `#151515` (Banner, Avatar, Statement-Vorlage). Als Empfehlung vorgeschlagen, von Andreas
  nicht ausdrücklich gewählt — er sagte „Logo einbauen". Rückweg: der Verlauf steht in der
  Git-Historie von `Header.astro` und `Footer.astro`.
- **Logo als Inline-SVG** über `src/components/Logo.astro`. Die Schrift ist im SVG in Pfade
  umgewandelt, es wird nichts nachgeladen.
- **Vorschaubild wird erzeugt, nicht gezeichnet:** `npm run og:image` rendert es aus Wortmarke
  und Claim im Aufbau des LinkedIn-Banners. Im Markenpaket lag keines.

## Nebenbefund: drei Dateien lieferten live 403

`favicon.svg`, `robots.txt` und `llms.txt` hatten lokal die Rechte `600`. `lftp mirror` überträgt
die Rechte, der Webserver darf die Dateien dann nicht lesen. Die Quellen stehen jetzt auf `644`,
und das Deploy-Script setzt nach dem Build `chmod -R a+rX dist/`, weil Git diese Rechte nicht
versioniert und der Fehler sonst mit der nächsten so angelegten Datei wiederkommt.

Wirksam wird das erst mit dem nächsten Deploy.

## Nachweis

- `tests/e2e/branding.spec.ts`: 10 Tests — Wortmarke in Header und Footer, kein horizontaler
  Überlauf bei 375 px, alle fünf Dateien ausgeliefert, `og:image` und Schema.org-Logo zeigen auf
  vorhandene Dateien.
- `npm run build`: 59 Seiten; die betroffenen Dateien in `dist/` haben `644`.
- `npm run compliance:bfsg`: 0 Verstöße. `npm run seo:check`: bestanden.
- Sichtprüfung per Screenshot: Startseite 1280 px, Footer, `/projekte` bei 375 px.

## Nicht Teil dieser CR

- `npm run lint:design` meldet 12 Fehler, alle in Dateien, die diese CR nicht anfasst
  (`ceo-summary.astro` u. a.).
- `npm run validate:schema` bricht ab: `scripts/schema-org-validator.ts` existiert nicht.
- `tests/e2e/smoke.spec.ts` prüft noch die alte Hero-Überschrift.
- Der Footer-Satz „Daten strukturieren. Qualität messbar machen." ist der alte Claim.

## Dateien

1. `src/components/Logo.astro` — neu
2. `src/components/Header.astro`
3. `src/components/Footer.astro`
4. `src/layouts/BaseLayout.astro`
5. `src/lib/config.ts`
6. `ops/jobs/og-image.mjs` — neu
7. `scripts/build-and-deploy.sh`
8. `package.json`
9. `tests/e2e/branding.spec.ts` — neu
10. diese CR

Assets ohne Inhaltsänderung aus dem Markenpaket: `src/assets/logo/logo-dunkel.svg`,
`public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`,
`public/images/logo.svg`. Erzeugt: `public/images/og-image.png`.
