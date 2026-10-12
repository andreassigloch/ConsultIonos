# CR-018 — Validatoren und Smoke-Test reparieren

**Status:** abgeschlossen
**Erstellt:** 2026-10-12
**Abgeschlossen:** 2026-10-12
**Typ:** fix

## Ziel

`npm run validate:all` und die Browser-Tests laufen durch. Beide waren rot, ohne dass es
jemand merkte: der Pre-Push-Hook ruft sie nicht auf.

## Befunde und Behebung

| Befund | Root Cause | Behebung |
|---|---|---|
| `validate:schema` bricht ab | `scripts/schema-org-validator.ts` wurde nie in dieses Repo übernommen, nur der npm-Eintrag | Script aus siglochimmo übernommen; Immobilien-Typen raus, `ProfessionalService` rein |
| `security:audit` bricht ab | Script existiert in keinem der Repos | npm-Eintrag gelöscht, aus `validate:all` entfernt |
| `lint:design`: 12 Fehler | feste Farbwerte in `ceo-summary.astro` | Werte in die `--ceo-*`-Variablen der Seite gezogen, Weiß über `--color-background`. Kein Farbwert geändert |
| 2 Smoke-Tests rot | Tests prüften Hero- und Problem-Text von vor dem Claim-Wechsel | Erwartung auf den aktuellen Text gesetzt |
| Schema: `telephone` fehlt (57 Seiten) | Nummer stand nur im `contactPoint` | `telephone` am `ProfessionalService` ergänzt |

## Nachweis

- `npm run validate:all`: Exit 0. `lint:design` 0 Fehler, `validate:schema` 0 Fehler.
- `npx playwright test`: 47 von 47 grün.
- `npm run build`: 59 Seiten.

## Offen

- `lint:design` meldet 12 Warnungen (Breakpoints, `clamp()`-Schriftgrößen, `!important`). Sie
  brechen den Lauf nicht.
- Es gibt keinen Security-Audit. Falls gewollt: eigene CR, nicht stillschweigend ein Script.

## Dateien

1. `scripts/schema-org-validator.ts` — neu
2. `package.json`
3. `src/pages/ceo-summary.astro`
4. `src/lib/config.ts`
5. `tests/e2e/smoke.spec.ts`
6. `docs/seo/seo-backlog.md`
7. diese CR
