# CR-011: Migration auf @sigloch/quality-checkers

**Status:** Open
**Quelle:** BoK Projektinventar-Analyse
**Abhängigkeiten:** CR-002 (_management) muss abgeschlossen sein

## Problem

sicon nutzt lokale Kopien der Quality-Checker-Scripts in `scripts/`:
- `compliance-check.ts` (10.464B)
- `bfsg-agent.ts`
- `design-token-lint.ts` (283 Zeilen)
- `code-quality-agent.ts`

Diese sind identisch mit den Template-Versionen in _management. Updates erfordern manuelles Kopieren.

## Ziel

Lokale Scripts durch `@sigloch/quality-checkers` Dependency ersetzen.

## Scope

1. `@sigloch/quality-checkers` als Dependency installieren
2. Lokale `scripts/compliance-check.ts` durch Import ersetzen
3. Lokale `scripts/bfsg-agent.ts` durch Import ersetzen
4. Lokale `scripts/design-token-lint.ts` durch Import ersetzen
5. Lokale `scripts/code-quality-agent.ts` durch Import ersetzen
6. Git-Hooks (`.githooks/pre-push`) auf neue Imports anpassen
7. npm-Scripts in `package.json` aktualisieren
8. Lokale Script-Dateien entfernen

## Akzeptanzkriterien

- [ ] Keine lokalen Quality-Checker-Scripts mehr in `scripts/`
- [ ] `npm run compliance:dsgvo` funktioniert via Paket
- [ ] `npm run compliance:bfsg` funktioniert via Paket
- [ ] `npm run lint:design` funktioniert via Paket
- [ ] Git-Hook `pre-push` läuft erfolgreich
- [ ] Alle bestehenden Tests grün

## Nicht im Scope

- Änderungen an der Checker-Logik (gehört in CR-002)
- Neue Checker hinzufügen
