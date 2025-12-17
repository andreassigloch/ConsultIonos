# CR-001: Website Redesign v2.0

**Status:** ✅ Completed
**Erstellt:** 2025-12-10
**Abgeschlossen:** 2025-12-10
**Autor:** andreas@siglochconsulting.de

---

## Ziel

Neugestaltung der Sigloch Consulting Website mit Fokus auf "Daten strukturieren. Qualität messbar machen." statt "AI-First Systems Engineering".

---

## Scope

Siehe [requirements.md](../../project/requirements.md#website-redesign-konzept-v20-aus-files) für:
- Neue Seitenstruktur
- 7-Stufen Datenreife-Modell
- FAQ für GEO
- Technischer Stack

---

## Implementierte Seiten

### Neue Struktur

```
/                    → Home (neu: Problem → Lösung → Anwendung → FAQ → CTA)
/mein-ansatz         → Methodik + 7-Stufen-Modell + Passt/Passt nicht
/projekte            → Projekt-Portfolio (6 Projekte)
/beitraege           → Content Hub (4 Beiträge)
/hintergrund/        → Index-Seite
  ├── struktur-vor-ki
  ├── 7-fragen
  ├── branchen
  └── technik
/kontakt             → Calendly + Formular
```

### Komponenten

- [x] FAQ.astro - Akkordeon mit Schema.org FAQPage Markup (7 Fragen)
- [x] Header.astro - Neue Navigation
- [x] Footer.astro - Aktualisiertes Tagline + Links

---

## Aufgaben

- [x] Home neu bauen (hero-page.md)
- [x] /mein-ansatz Seite
- [x] /projekte/ Portfolio
- [x] /beitraege/ Content Hub
- [x] /hintergrund/* (4 Artikel + Index)
- [x] /kontakt mit Calendly
- [x] FAQ-Komponente mit Schema.org
- [ ] Bestehende Blog-Artikel migrieren (bleibt in /blog/)

---

## Abnahmekriterien

- [x] Alle Seiten aus requirements.md implementiert
- [x] Schema.org FAQPage validiert
- [ ] Lighthouse Score > 90 (noch zu prüfen nach Deploy)
- [x] E2E Tests grün (17/17 passed)

---

## Technische Details

- **Playwright Config:** playwright.config.ts erstellt
- **E2E Tests:** tests/e2e/smoke.spec.ts mit 17 Tests
- **Build:** erfolgreich (19 Seiten)

---

## Nächste Schritte (optional)

- Lighthouse Score prüfen
- Blog-Artikel in /beitraege/ migrieren
- RSS Feed für /beitraege/
- Mehr Projekt-/Beitrags-Content hinzufügen
