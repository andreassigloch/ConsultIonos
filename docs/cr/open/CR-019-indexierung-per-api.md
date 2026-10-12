# CR-019 — Indexierung per Google Indexing API beantragen

**Status:** offen — Code fertig, Zugang fehlt
**Erstellt:** 2026-10-12
**Typ:** feat

## Ziel

Nach einem Deploy beantragt ein Script die Indexierung der geänderten URLs, statt dass jemand
sie in der Search Console einzeln einreicht. Übernommen aus siglochimmo
(`ops/jobs/gsc-request-indexing.ts`, dort CR-305).

## Umgesetzt

- `ops/jobs/gsc-request-indexing.ts`, Aufruf `npm run seo:request-index`. Ohne `--send`
  Trockenlauf; mit `--send` Antrag und Protokoll in `docs/seo/tracking/indexing-requests.jsonl`.
- Abweichungen von siglochimmo: `google-auth-library` statt des ganzen `googleapis`-Pakets;
  der A/B-Split für das dortige Experiment ist nicht übernommen; der Schlüsselpfad kommt aus
  `.env` (`GSC_SERVICE_ACCOUNT_KEY`) statt aus einem festen Pfad.
- Es wird derselbe Service Account wie in siglochimmo benutzt. Der Schlüssel bleibt dort
  liegen, `.env` zeigt nur auf die Datei.

## Offen — braucht Andreas

Der erste echte Lauf (2026-10-12, 5 URLs, Tag `cr-017-logo`) endete mit 5× HTTP 403
„Failed to verify the URL ownership". Anmeldung und API-Aufruf funktionieren; der Service
Account ist in der Property `siglochconsulting.de` nicht Inhaber.

1. https://search.google.com/search-console/users?resource_id=sc-domain%3Asiglochconsulting.de
2. Nutzer hinzufügen: `search-console-seo-bot@sigloch-immobilien-website.iam.gserviceaccount.com`
3. Berechtigung **Inhaber** (nicht „Vollständig")

Danach denselben Lauf wiederholen und die CR schließen.

## Einschränkung

Google dokumentiert die Indexing API nur für `JobPosting` und `BroadcastEvent`. Für normale
Seiten ist die Wirkung unbelegt; der Antrag kann das Crawlen beschleunigen, erzwingt aber nichts.

## Nachweis

- `tests/unit/gsc-request-indexing.test.ts`: URL-Auswahl, Kontingent, Protokoll, Fehlerhinweis.
- Trockenlauf listet die 5 URLs; echter Lauf erreicht die API und protokolliert die 403.

## Dateien

1. `ops/jobs/gsc-request-indexing.ts` — neu
2. `tests/unit/gsc-request-indexing.test.ts` — neu
3. `package.json`, `package-lock.json`
4. `docs/seo/seo-backlog.md`
5. `docs/seo/tracking/indexing-requests.jsonl` — Protokoll
6. diese CR
