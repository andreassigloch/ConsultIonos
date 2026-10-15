# CR-020 — http und www auf https://siglochconsulting.de weiterleiten

**Status:** abgeschlossen
**Erstellt:** 2026-10-15
**Abgeschlossen:** 2026-10-15
**Typ:** fix

## Problem

`http://siglochconsulting.de/`, `https://www.siglochconsulting.de/` und
`http://www.siglochconsulting.de/` lieferten die Seite jeweils mit 200 aus. Vier Adressen für
denselben Inhalt; nur der Canonical-Tag zeigte auf die richtige. Es gab keine `.htaccess`.

## Lösung

`public/.htaccess` mit der Weiterleitungsregel aus siglochimmo, die auf demselben IONOS-Host
seit Langem läuft: `HTTPS off` oder `www.` → 301 auf `https://siglochconsulting.de/<pfad>`.
Das Deploy-Script setzt die Datei bereits auf `644`.

## Nachweis

Nach Deploy per `curl` gegen die Live-Site: drei Varianten 301 auf die kanonische Adresse mit
erhaltenem Pfad, kanonische Adresse 200, keine Schleife, Verifizierungsdatei für die Search
Console weiter erreichbar.

## Dateien

1. `public/.htaccess` — neu
2. diese CR
