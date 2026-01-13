# CR-007: Homepage & FAQ - Kundenfragen zu KI-Agenten

**Status:** ✅ Completed
**Datum:** 2025-01-13
**Autor:** andreas@siglochconsulting.de

## Ziel

Abgleich der Website-Claims mit realen Kundenfragen/-bedenken zu KI-Agenten und operativem Einsatz. Ergänzung fehlender Themen.

## Recherche-Ergebnisse

### Hauptquellen
- [IBM: KI-Agenten 2025 - Erwartungen vs. Realität](https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality)
- [Hecker Consulting: Warum KI-Projekte scheitern](https://www.hco.de/blog/ki-agenten-im-unternehmen-grenzen-risiken-und-warum-viele-projekte-scheitern)
- [Stack AI: 7 Biggest AI Adoption Challenges](https://www.stack-ai.com/blog/the-biggest-ai-adoption-challenges)
- [Markt und Mittelstand: KI-Agenten im Mittelstand](https://www.marktundmittelstand.de/technologie/ki-agenten-im-mittelstand-produktivitaetsbooster-oder-jobkiller)
- [Salesforce: KI-Index Mittelstand](https://www.salesforce.com/de/news/neuer-ki-index-mittelstand-zeigt-jeder-dritte-mittelstaendler-setzt-bereits-ki-ein/)
- [World Economic Forum: Agentic AI Obstacles](https://www.weforum.org/stories/2025/12/3-obstacles-to-ai-adoption-and-innovation-and-how-to-overcome-them/)
- [McKinsey: State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)

### Kernerkenntnisse

| Thema | Statistik |
|-------|-----------|
| ROI-Erreichung | Nur ~25% der KI-Projekte erreichen erwarteten ROI |
| Produktionsreife | Nur 1/3 der geplanten Use Cases ist produktionsreif |
| Startpunkt unklar | 62% haben keinen klaren Startpunkt |
| Infrastruktur-Upgrade | 85%+ müssen Legacy-Systeme upgraden |
| Task-Completion | Nur ~25% der Aufgaben werden vollständig autonom korrekt erledigt |
| Jobangst | 67% der Mitarbeiter fürchten Jobverlust |
| Aktive Sabotage | 41% Gen Z/Millennials sabotieren KI-Strategie |
| Externe Partner | 89% arbeiten bei KI-Projekten mit externen Partnern |

### Kategorisierte Kundenfragen

**Wirtschaftlichkeit & ROI:**
- Was kostet die Einführung?
- Wann rechnet sich das?
- Welche Prozesse lohnen sich zuerst?

**Technische Machbarkeit:**
- Funktioniert das mit unseren Altsystemen?
- Wie zuverlässig arbeiten Agenten?
- Wie lange dauert die Implementierung?

**Datenschutz & Compliance:**
- Wie erfüllen wir die DSGVO?
- Was bedeutet der EU AI Act für uns?
- Bleiben Daten in Deutschland/EU?

**Organisation & Mitarbeiter:**
- Ersetzt KI Arbeitsplätze?
- Wie nehmen wir Mitarbeiter mit?
- Welche Schulungen brauchen wir?

## Änderungen

### 1. Problem-Section: Neue Card "Bedenken"
**Datei:** `src/pages/index.astro`

Hinzugefügt:
```html
<div class="problem-card">
  <h3>Bedenken</h3>
  <p>EU AI Act, Jobverlust, Know-how-Defizite. Wichtige Fragen – aber beantwortbar.</p>
</div>
```

### 2. FAQ: Kosten-Antwort konkretisiert
**Datei:** `src/components/FAQ.astro`

Vorher:
> "Vielleicht weniger als Sie denken. Entscheidend ist, wo Sie stehen..."

Nachher:
> "Investieren Sie 3 Mann-Monate. Dann haben Sie ein klares Bild, was es konkret für Sie, Ihre Anwendung, in Ihrem Umfeld bedeutet."

### 3. FAQ: Neue Frage zu Mitarbeitermotivation
**Datei:** `src/components/FAQ.astro`

Hinzugefügt:
> **Was motiviert meine Mitarbeiter zur Unterstützung einer KI-Initiative?**
> "Wenn sich Ihre Mitarbeiter über lästige Routine-Tätigkeiten wie manuelle Datenaufbereitung oder Dokumentation beschweren: Exakt das macht die KI gerne und gut. Und sie gibt mir als Mitarbeiter Wissen und Fähigkeiten an die Hand, die man klassisch nicht in dieser Quantität und Qualität bekommt."

### 4. SVG-Icons korrigiert
Punkte in Fragezeichen- und Ausrufezeichen-Icons waren nicht sichtbar (line statt circle). Gefixt mit:
```svg
<circle cx="12" cy="17" r="1" stroke="none" fill="currentColor"></circle>
```

## Abgleich Website vs. Recherche

| Website-Element | Recherche-Match |
|-----------------|-----------------|
| Hero: "Struktur vor KI" | ✅ 62% ohne Startpunkt, Legacy #1 Problem |
| Problem: "Informationen verstreut" | ✅ "Daten fragmentiert, siloisiert" |
| Problem: "Wissen in Köpfen" | ✅ "Unordentliche Daten sind der Normalfall" |
| Problem: "Bedenken" (NEU) | ✅ Adressiert EU AI Act, Jobangst, Know-how |
| Solution: "KI nur wo nötig" | ✅ Adressiert ROI-Unsicherheit |
| FAQ: Kosten (NEU) | ✅ Konkrete Angabe statt vage |
| FAQ: Mitarbeiter (NEU) | ✅ Adressiert 67% Jobangst |

## Betroffene Dateien

- `src/pages/index.astro` - Problem-Section erweitert, SVG-Icons gefixt
- `src/components/FAQ.astro` - 2 FAQs angepasst/hinzugefügt (jetzt 8 statt 7)
