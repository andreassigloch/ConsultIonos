---
title: 'Datenreife #1: Struktur vor KI - Warum 70% Business Value ohne KI entstehen'
description: 'AI-Projekte scheitern an zwei Dingen: Vorbehalten der Betroffenen und Datenqualität. Das Palantir-Beispiel zeigt: LLMs sind Interface, nicht Fundament. Stufe 1-5 der Datenreife-Leiter.'
pubDate: 2026-02-01
author: 'Andreas Sigloch'
image: '/images/datenreife-stufe-3.png'
tags: ['Datenreife', 'KI', 'Strategie', 'Systems Engineering', 'Palantir']
series: 'Datenreife'
draft: false
type: 'blog'
linkedinStatus: 'published'
linkedinPostDate: 2026-02-02
linkedinUrl: 'https://www.linkedin.com/posts/andreas-sigloch-consulting_das-ki-missverst%C3%A4ndnis-mit-ki-l%C3%B6sen-wir-activity-7423780432267083776-1cTp'
---

## Das Missverständnis

"Mit KI lösen wir das Problem." Dieser Satz fällt gerne, wenn es um Datenprobleme geht. Die Hoffnung: Ein intelligentes System, das aus dem Chaos Ordnung macht.

Die Realität ist ernüchternd: Laut **McKinsey State of AI 2025** nutzen 88% der Unternehmen AI, aber nur **6% erzielen signifikante Erträge** (>5% EBIT). Zwei Drittel stecken noch in der Pilot-Phase. Ein Großteil scheitert an Softfacts wie Mitarbeiter-Widerstand oder fehlender Management-Unterstützung. Nach meiner Erfahrung ist aber auch die mangelnde Daten- oder Prozess-Qualität ein wesentliches Erfolgskriterium: Top-Performer fokussieren auf Dateninfrastruktur *vor* KI-Modellen.

TDWI-Analysen zeigen: Strukturierte Daten liefern **ermöglichen schnellere Entwicklung und niedrigere Kosten** als unstrukturierte AI-Ansätze.

> **Mein Schluss:** 70-80% des Business Value kommen aus Struktur und Regeln - nicht aus KI.

## Die 5 Stufen bis zum Fundament

### Stufe 1: Unstrukturierte Quellen (0% Business Value)
PDF-Spezifikationen stapeln sich auf SharePoint. Wer welche Version nutzt, weiß niemand. Keine Verbindungen, manuelle Suche, Wissen in Köpfen.

### Stufe 2: Embeddings/RAG (10-20% Business Value)
Volltextsuche, Tags, erste Metadaten. "Zeige alle Bauteile mit Temperaturanforderung >85°C." Aber: keine Beziehungen zwischen Objekten.

### Stufe 3: Ontologie + Graph (30-40% Business Value)
Beziehungen zwischen Objekten, Supplier-Links, Impact-Analysen. "Welche Tier-2-Lieferanten sind von Chip-Engpass betroffen?"

*Tech: Neo4j, PuppyGraph*

### Stufe 4: Logische Regeln (50-60% Business Value)
Geschäftsregeln als ausführbare Validierung. "Warnung: Bauteil X nicht freigegeben für Temperaturbereich Y." 100% deterministisch, keine Black Box.

*Tech: SHACL, Datalog*

### Stufe 5: Quantifizierbare Scores (70-80% Business Value) ★
Objektive Metriken statt Bauchgefühl. "Variante A: 78 Punkte, Variante B: 62 Punkte - Empfehlung klar." Der "100%-Nullpunkt" für effizienten KI-Einsatz.

*Tech: TigerGraph Vector-Scoring, I-Score/K-Score*

## Der Palantir-Beweis

Palantir (Foundry/Gotham/AIP) - bewertet mit über $50 Mrd. - operiert genau in diesem Bereich: Stufe 3-7. Ihr Erfolgsrezept:

- **Ontology-Driven AI:** Daten als semantisches Modell. LLMs können diese Ontologie mit natürlicher Sprache abfragen.
- **AIP Logic:** No-Code-Tool für Regeln und quantifizierbare Scores. 100% deterministisch.
- **AIP Assist:** LLM-Interface mit Guardrails gegen Halluzinationen.

**Der entscheidende Punkt:** LLM-Anteil im Betrieb nur 20-40%. 90% der Effizienz kommen aus Ontologie + Regeln. LLMs sind Interface, nicht Fundament.

## Drei Vorteile strukturierter Systeme

**Reproduzierbarkeit:** Gleiche Eingaben = gleiche Ergebnisse. Fundamental für Audits.

**Nachvollziehbarkeit:** Jeder Schritt transparent. Pflicht für MDR, ISO 26262, A-SPICE.

**Planbare Kosten:** Fixe Infrastrukturkosten statt laufende API-Gebühren - und ein Bruchteil des CO₂-Footprints.

## Wann KI sinnvoll ist

KI hat ihren Platz - aber als Werkzeug, nicht als Fundament:

- **In der Entwicklungsphase:** Muster erkennen, Prototypen bauen
- **Als Interface:** Natürlichsprachliche Abfragen auf strukturierten Daten
- **Für Klassifikation:** Ähnlichkeiten finden, Kategorien vorschlagen

Im laufenden Betrieb sollten kritische Entscheidungen auf deterministischen Regeln basieren.

---

*Mehr Details: [Struktur vor KI - die vollständige Analyse](/mein-ansatz/struktur-vor-ki)*

*Nächster Artikel: [Stufe 6-10: Lernende Systeme](/blog/datenreife-02-ausblick)*

*Fragen? [Gespräch vereinbaren](/kontakt)*

Quellen:

- [McKinsey: The State of AI in 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [TDWI: Structured vs Unstructured Data](https://tdwi.org/blogs/data-101/2025/09/structured-vs-unstructured-data.aspx)
