---
title: 'Datenreife #1: Struktur vor KI - Warum 70% Business Value ohne KI entstehen'
description: '70% aller AI-Projekte scheitern an Datenqualität. Der Palantir-Beweis zeigt: LLMs sind Interface, nicht Fundament. Level 1-5 der Datenreife-Leiter.'
pubDate: 2025-12-20
author: 'Andreas Sigloch'
image: '/images/1745407248069.png'
tags: ['Datenreife', 'KI', 'Strategie', 'Systems Engineering', 'Palantir']
series: 'Datenreife'
draft: false
type: 'blog'
linkedinStatus: 'planned'
---

## Das Missverständnis

"Mit KI lösen wir das Problem." Dieser Satz fällt in vielen Unternehmen, wenn es um Datenprobleme geht. Die Hoffnung: Ein intelligentes System, das aus dem Chaos Ordnung macht.

Die Realität ist ernüchternd: Laut **McKinsey State of AI 2025** scheitern **70% aller AI-Projekte an Datenqualität** - nicht an Algorithmen. Die IMD-Studie bestätigt: Top-Performer fokussieren auf Dateninfrastruktur *vor* KI-Modellen.

TDWI-Analysen zeigen: Strukturierte Daten liefern **3x höheren ROI** als unstrukturierte AI-Ansätze.

> **Der Schluss:** 70-80% des Business Value kommen aus Struktur und Regeln - nicht aus KI.

## Die 5 Stufen bis zum Fundament

### Level 1: Unstrukturierte Quellen (0% Business Value)
PDF-Spezifikationen stapeln sich auf SharePoint. Wer welche Version nutzt, weiß niemand. Keine Verbindungen, manuelle Suche, Wissen in Köpfen.

### Level 2: Embeddings/RAG (10-20% Business Value)
Volltextsuche, Tags, erste Metadaten. "Zeige alle Bauteile mit Temperaturanforderung >85°C." Aber: keine Beziehungen zwischen Objekten.

### Level 3: Ontologie + Graph (30-40% Business Value)
Beziehungen zwischen Objekten, Supplier-Links, Impact-Analysen. "Welche Tier-2-Lieferanten sind von Chip-Engpass betroffen?"

*Tech: Neo4j, PuppyGraph*

### Level 4: Logische Regeln (50-60% Business Value)
Geschäftsregeln als ausführbare Validierung. "Warnung: Bauteil X nicht freigegeben für Temperaturbereich Y." 100% deterministisch, keine Black Box.

*Tech: SHACL, Datalog*

### Level 5: Quantifizierbare Scores (70-80% Business Value) ★
Objektive Metriken statt Bauchgefühl. "Variante A: 78 Punkte, Variante B: 62 Punkte - Empfehlung klar." Der "100%-Nullpunkt" für effizienten KI-Einsatz.

*Tech: TigerGraph Vector-Scoring, I-Score/K-Score*

## Der Palantir-Beweis

Palantir (Foundry/Gotham/AIP) - bewertet mit über $50 Mrd. - operiert genau in diesem Bereich: Level 3-7. Ihr Erfolgsrezept:

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

*Nächster Artikel: [Level 6-13: Lernende Systeme und darüber hinaus](/blog/datenreife-02-ausblick)*

*Fragen? [Gespräch vereinbaren](/kontakt)*
