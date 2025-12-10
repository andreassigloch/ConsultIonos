# Sigloch Consulting Website - Requirements

## Übersicht

**Projekt:** Sigloch Consulting Website
**Typ:** Consulting / Beratung
**URL:** https://siglochconsulting.de
**Autor:** andreas@siglochconsulting.de

---

## Website-Redesign Konzept v2.0 (aus files/)

### Kernbotschaft (hero-page.md)

**Headline:** "Daten strukturieren. Qualität messbar machen."

**Subheadline:** Ein systematischer Ansatz für Unternehmen, die ihre Prozesse auf eine belastbare Grundlage stellen wollen – bevor sie über KI nachdenken.

**Das Problem:**
- Informationen in verschiedenen Systemen verstreut
- Wissen in Köpfen einzelner Mitarbeiter
- Entscheidungen schwer nachvollziehbar

**KI-Tools können das nicht lösen. Sie setzen funktionierende Strukturen voraus.**

---

### Grundprinzip (mein-ansatz.md)

> "Welches Tool brauchen wir?" ist die falsche Frage.
> "Welche Struktur haben unsere Daten?" ist die richtige.

**Zwei Phasen:**
- **Entwicklung:** KI-Werkzeuge intensiv nutzen (schneller bauen, Muster erkennen)
- **Betrieb:** System läuft ohne KI (klare Regeln, deterministische Algorithmen)

**Ergebnis:** Planbare Kosten, keine API-Abhängigkeit, volle Nachvollziehbarkeit.

---

### Neue Seitenstruktur

```
/                    → Home (hero-page.md)
/mein-ansatz         → Methodik + 7 Stufen (mein-ansatz.md)
/projekte/           → Projekt-Portfolio (GitHub Gists)
/beitraege/          → Content Hub (LinkedIn/Medium Mirror)
/hintergrund/        → Vertiefende Artikel
  ├── struktur-vor-ki
  ├── 7-fragen
  ├── branchen
  └── technik
/kontakt             → Calendly + Formular
/impressum           → Legal
/datenschutz         → Legal
```

---

### Home/ (aus hero-page.md)

**Struktur:**

1. **Hero**
   - Headline: "Daten strukturieren. Qualität messbar machen."
   - Subheadline: Systematischer Ansatz vor KI
   - CTA: [Gespräch vereinbaren] [Mein Ansatz]

2. **Problem-Section**
   - Informationen verstreut
   - Wissen in Köpfen
   - Entscheidungen nicht nachvollziehbar
   - "KI-Tools können das nicht lösen"

3. **Lösung-Section**
   - Stufenmodell: Datenmanagement vor Technologie
   - 1. Daten strukturieren → 2. Regeln automatisieren → 3. Qualität messen → 4. KI nur wo nötig
   - "Systeme mit reproduzierbaren Ergebnissen"

4. **Anwendung-Section (2 Spalten)**
   - **Systems Engineering:** INCOSE-Methodik, Graph-basierte Modellierung
   - **Immobilien:** Strukturierte Prozesse, automatisierte Workflows

5. **Kontakt-CTA**
   - "Passt das für Sie?"
   - [Gespräch vereinbaren]

---

### /mein-ansatz (aus mein-ansatz.md)

**Die 7 Stufen des Datenreife-Modells:**

| Stufe | Name | Was sich ändert | KI-Anteil |
|-------|------|-----------------|-----------|
| **1** | Unstrukturierte Ablage | Basis-Situation | 0% |
| **2** | Durchsuchbare Inhalte | Suche in Sekunden | 10-20% |
| **3** | Vernetzte Daten | Impact-Analysen möglich | 10-30% |
| **4** | Automatische Prüfung | Fehler früher erkennen | 5-10% |
| **5** | Messbare Qualität ⭐ | Scores statt Bauchgefühl | 20-30% |
| **6** | Vorhersagen | Proaktiv statt reaktiv | 15-25% |
| **7+** | Lernende Systeme | Kontinuierliche Verbesserung | 30-50% |

**Key Insight:**
> Bis Stufe 5 kommt der Wert überwiegend aus Struktur und Regeln, nicht aus KI.

**Passt gut, wenn:**
- Informationen in verschiedenen Systemen nicht verbunden
- Erfahrungswissen in Köpfen steckt
- Audit-Anforderungen (MDR, ISO, Automotive)

**Passt nicht, wenn:**
- Fertiges Produkt zum Selbst-Installieren gesucht
- Primär Marketing/Vertrieb-Herausforderung
- < 20 Mitarbeiter, überschaubare Komplexität

---

### /projekte/ - Projekt-Portfolio

**Datenquelle:** GitHub Gists oder lokales JSON

**Struktur pro Projekt:**
```yaml
name: "Datenreife-Modell"
type: "Framework / Methodik"
status: "Active"
description: "7-Stufen-Modell für Datenreife in Unternehmen"
tags: ["Datenmanagement", "Graph", "Assessment"]
links:
  - type: "gist"
    url: "https://gist.github.com/..."
  - type: "linkedin"
    url: "https://linkedin.com/..."
```

**Projekttypen:**
- Frameworks / Methodik (Datenreife-Modell, INCOSE-Ansätze)
- Tools / Code (MCP-Server, Automation Scripts)
- Publications (ReConf, LinkedIn Series)
- Client Work (anonymisiert)

---

### /beitraege/ - Content Hub

**Konzept:** Zentraler Hub für alle Veröffentlichungen, gespiegelt von LinkedIn/Medium

**Content-Typen:**
1. **LinkedIn Articles** (gespiegelt)
2. **Medium Posts** (gespiegelt)
3. **Original Blog Posts** (hier geschrieben)
4. **Conference Talks** (ReConf, etc.)

**Metadaten pro Beitrag:**
```yaml
title: "Struktur vor KI"
platform: "linkedin" | "medium" | "original" | "conference"
originalUrl: "https://linkedin.com/..."
pubDate: 2025-01-15
tags: ["Datenmanagement", "Graph"]
excerpt: "..."
```

**Features:**
- Plattform-Badge (LinkedIn, Medium Icon)
- Filter nach Plattform/Tags
- Canonical URL zu Original-Plattform (SEO!)
- "Alle Beiträge →" Link auf Home
- RSS Feed

**Home-Integration:**
- Letzte 3 Beiträge als Teaser-Cards auf Home
- Mit Plattform-Icons

---

### /hintergrund/ (aus files/)

**4 Vertiefungs-Artikel:**

1. **struktur-vor-ki.md**
   - KI kann fehlende Struktur nicht ersetzen
   - Reproduzierbarkeit, Nachvollziehbarkeit, planbare Kosten
   - Reihenfolge: Daten → Zusammenhänge → Regeln → Messung → KI

2. **7-fragen.md**
   - Warum beschäftigen? Warum jetzt? Was bringt es?
   - Was kostet es? Keine Experten? Sensible Daten? Wie anfangen?
   - Investitions-Richtwerte: €10k-50k pro Stufe

3. **branchen.md**
   - Gleiche Methodik für SE + Immobilien
   - Graph-Muster: Objekte, Beziehungen, Regeln, Scores
   - Beispiele für Stufe 3-5 pro Branche

4. **technik.md**
   - Neo4j (Graph), SHACL (Validierung), Ollama (lokale LLMs)
   - Kostenvergleich Cloud vs. Lokal
   - Break-even: 6-12 Monate

---

### FAQ-Sektion für GEO (aus 7-fragen.md)

1. **Warum sollte ich mich damit beschäftigen?**
   - Je länger Wissen in Köpfen statt Systemen, desto größer das Risiko
   - Je fragmentierter die Daten, desto mehr Zeit für Suche

2. **Warum jetzt?**
   - Fachkräfte werden knapper
   - Audit-Anforderungen steigen
   - Mittelständler: kürzere Entscheidungswege = schnellere Umsetzung

3. **Was bringt mir das konkret?**
   - Suche: Minuten → Sekunden
   - Fehlerquote bei Prüfungen: deutlich reduziert
   - Einarbeitung neuer Mitarbeiter: beschleunigt

4. **Was kostet das?**
   - Stufe 2→3: €10.000-30.000 (2-4 Monate)
   - Stufe 3→4: €15.000-40.000 (3-6 Monate)
   - Stufe 4→5: €20.000-50.000 (4-8 Monate)
   - Kein SaaS = keine laufenden API-Kosten

5. **Wir haben keine Experten dafür.**
   - 89% der Unternehmen arbeiten mit externen Partnern
   - System läuft danach ohne KI-Experten
   - Ziel: Befähigung, nicht Abhängigkeit

6. **Was ist mit sensiblen Daten?**
   - Lokale Verarbeitung möglich
   - Open Source, keine Black Boxes
   - Audit-Trails für MDR, ISO, TISAX

7. **Wie fange ich an?**
   - 30 Min Gespräch: Passt der Ansatz?
   - 1-2 Tage Assessment: Wo stehen Sie?
   - 2-3 Monate Pilot: Validierung an konkretem Prozess

---

### Key Messages (Redesign v2.0)

| Seite | Key Message |
|-------|-------------|
| Home | "Daten strukturieren. Qualität messbar machen." |
| Mein Ansatz | "Struktur vor KI – 7 Stufen zur Datenreife" |
| Hintergrund | "Vertiefendes für Entscheider und Techniker" |
| Kontakt | "30 Minuten klären, ob der Ansatz passt" |

---

### Technischer Stack (aus technik.md)

**Leitprinzipien:**
1. Open Source wo möglich – keine Vendor-Abhängigkeit
2. Lokal deploybar – Daten verlassen Unternehmen nicht
3. Deterministisch – reproduzierbare Ergebnisse
4. Audit-fähig – nachvollziehbare Entscheidungen

**Komponenten:**
- **Graph-DB:** Neo4j Community (Open Source)
- **Validierung:** SHACL (W3C Standard, 100% deterministisch)
- **Lokale LLMs:** Ollama (Llama 3.1 8B, Mistral 7B)
- **Orchestrierung:** MCP-Server

**Kostenvergleich:**
| | Cloud (Jahr) | Lokal (einmalig) |
|--|--------------|------------------|
| Jahr 1 | €1.800-18.000 | €2.000-5.000 |
| Jahr 2+ | €1.800-18.000 | ~€500 |

**Break-even:** 6-12 Monate

---

## Funktionale Anforderungen

### Bestehend (v1.0)

- [x] Responsive Homepage mit Hero-Section
- [x] Beratungsleistungen-Seite mit Service-Kategorien
- [x] Blog/Wissenswertes mit Artikeln
- [x] Kontaktformular (Web3Forms Integration)
- [x] Impressum & Datenschutz (DSGVO-konform)
- [x] Schema.org SEO Markup
- [x] Sitemap Generation

### v2.0 Redesign (aus files/)

**Seiten:**
- [ ] Home neu (hero-page.md): Problem → Lösung → Anwendung → CTA
- [ ] /mein-ansatz (mein-ansatz.md): 7-Stufen-Modell + Passt/Passt nicht
- [ ] /projekte/: Projekt-Portfolio (Gist-basiert)
- [ ] /beitraege/: Content Hub (LinkedIn/Medium Mirror)
- [ ] /hintergrund/struktur-vor-ki
- [ ] /hintergrund/7-fragen
- [ ] /hintergrund/branchen
- [ ] /hintergrund/technik
- [ ] /kontakt: Calendly + Formular

**Komponenten:**
- [ ] FAQ-Sektion mit Schema.org FAQPage (7 Fragen)
- [ ] Stufen-Visualisierung (Tabelle oder Cards)
- [ ] Zwei-Spalten Anwendungsbereich (SE + Immobilien)
- [ ] Kostenvergleich-Tabelle (Cloud vs. Lokal)
- [ ] Beiträge-Teaser (3 Cards auf Home mit Plattform-Icons)
- [ ] Projekt-Cards (Gist-Integration)
- [ ] Plattform-Badges (LinkedIn, Medium Icons)

**Content-Migration:**
- [ ] files/*.md → src/pages/ oder src/content/
- [ ] ki-reife-modell-content.md archivieren (ersetzt durch files/)
- [ ] Bestehende Blog-Artikel → /beitraege/ migrieren

### Nice-to-Have

- [ ] Calendly Integration (Popup oder Inline)
- [ ] Newsletter-Anmeldung
- [ ] Mehrsprachigkeit (DE/EN)
- [ ] RSS Feed
- [ ] Graph-Visualisierung der Stufen (D3.js oder SVG)

---

## Non-Funktionale Anforderungen

### Performance
- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Static Site Generation (kein SSR)

### Accessibility
- BFSG-konform (Barrierefreiheit)
- ARIA Labels für alle interaktiven Elemente
- data-testid Attribute für E2E-Tests

### SEO
- Schema.org ProfessionalService
- Schema.org FAQPage (Home)
- Canonical URLs (wichtig für gespiegelte Beiträge!)
- Open Graph Tags
- Twitter Cards

---

## Technologie-Stack

- **Framework:** Astro 5.x
- **Styling:** CSS Custom Properties (Design Tokens)
- **Fonts:** Poppins (Headings), System Fonts (Body)
- **Testing:** Playwright (E2E), Vitest (Unit)
- **Deployment:** IONOS SFTP
- **Daten:** JSON/Markdown für Projekte & Beiträge
