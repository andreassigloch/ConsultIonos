---
title: 'Datenreife #4: Der Open-Source-Stack für Level 3-7'
description: 'Neo4j, SHACL, TigerGraph, Ollama, MCP: Konkrete Tools für quantifizierbare Datenreife. Kostenvergleich Cloud vs. Lokal.'
pubDate: 2026-01-10
author: 'Andreas Sigloch'
image: '/images/1756817824312.png'
tags: ['Datenreife', 'Neo4j', 'SHACL', 'Ollama', 'Open Source', 'Tech Stack']
series: 'Datenreife'
draft: false
type: 'blog'
linkedinStatus: 'planned'
---

## Leitprinzipien

Bevor wir in die Tools einsteigen, vier Prinzipien für die Auswahl:

- **Open Source:** Keine Vendor-Abhängigkeit. Der Code gehört Ihnen.
- **Lokal deploybar:** Daten verlassen Ihr Unternehmen nicht.
- **Deterministisch:** Reproduzierbare Ergebnisse bei gleichen Eingaben.
- **CO₂-optimiert:** Klassische Algorithmen wo möglich, KI nur wo nötig.

## Stack nach Level

### Level 3: Ontologie + Graph

**Neo4j Community Edition** - Graph-Datenbank (Open Source)

Speichert Daten und ihre Beziehungen als Graph. Ideal für Requirements Traceability, Impact-Analysen und vernetzte Daten.

- Native Graph-Speicherung mit Cypher Query Language
- ACID-transaktional, horizontal skalierbar
- Community Edition vollständig kostenlos

*Use Case:* "Welche Requirements sind von Änderung X betroffen?" - Graph-Traversierung in Millisekunden.

**PuppyGraph** - Alternative für bestehende Data Lakes

Läuft direkt auf Parquet, Delta Lake, PostgreSQL. Zero-ETL Graph Analytics ohne Datenmigration.

### Level 4: Logische Regeln

**SHACL (W3C Standard)** - Validierung

Definiert Geschäftsregeln als ausführbare Constraints. 100% deterministisch - keine Black Box.

- W3C-Standard für RDF-Validierung
- Deklarative Regelsprache, vollständig nachvollziehbar
- Integration in CI/CD möglich

*Use Case:* "Jedes Requirement muss einen Verantwortlichen haben" - Validierung bei jedem Commit.

**Datalog in Neo4j** - Regelbasierte Inferenz

Prolog-ähnliche Regeln direkt in der Graph-Datenbank. Rekursive Abfragen, Compliance-Checks.

### Level 5: Quantifizierbare Scores ★

**I-Score / K-Score** (AAAI 2023)

Informationstheoretische Messung der KG-Qualität. Objektive Scores statt Bauchgefühl.

- **I-Score:** Informationsgehalt pro Knoten
- **K-Score:** Konnektivität und Vollständigkeit
- Trend-Tracking über Zeit

*Use Case:* "Unser Requirements-Graph hat I-Score 0.73 - letzten Monat 0.68" - objektive Fortschrittsmessung.

**TigerGraph Vector-Scoring** - Hybrides Graph + Vector

Vektoren als Attribute auf Graph-Knoten. Kombiniert semantische Ähnlichkeit mit struktureller Analyse.

### Level 6-7: Prediction & Feedback

**TigerGraph GNNs** - Graph Neural Networks

Prädiktive Analytics auf Graph-Strukturen. Sub-second Queries auf Millionen Knoten.

*Use Case:* "Warnung: Lieferant X hat 73% Ausfallrisiko in 4 Wochen"

**PowerDrill Agents** - Self-Improving

Agenten, die aus Nutzer-Feedback lernen. RLHF, autonome Experimente.

## LLM-Integration (wo nötig)

**Ollama** - Lokale LLMs

Wenn KI benötigt wird: Llama 3.1 8B, Mistral 7B lokal. Keine API-Kosten, Daten bleiben im Haus.

- Läuft auf Consumer-Hardware (M1/M2/M3 Mac, RTX 3060+)
- 100% Air-Gapped möglich

**MCP Server** (Anthropic)

Standardisiertes Protokoll für strukturierte KI-Interaktion. Tool-Integration, Guardrails gegen Halluzinationen.

*Use Case:* LLM erhält strukturierten Zugriff auf Neo4j-Graph - nur über definierte Tools.

## Kostenvergleich: Cloud vs. Lokal

|  | Cloud API (pro Jahr) | Lokal (einmalig) |
|--|---------------------|------------------|
| **Jahr 1** | €1.800 - 18.000 | €2.000 - 5.000 |
| **Jahr 2+** | €1.800 - 18.000 | ~€500 (Wartung) |
| **3-Jahres-TCO** | €5.400 - 54.000 | €3.000 - 6.000 |

**Break-even:** Typischerweise nach 6-12 Monaten.

## Warum nicht Cloud?

Cloud-Dienste haben Berechtigung, aber für kritische Prozesse:

- **Laufende Kosten:** API-Gebühren skalieren mit Nutzung
- **Datenschutz:** Daten verlassen das Unternehmen
- **Abhängigkeit:** Preiserhöhungen außer Kontrolle
- **Verfügbarkeit:** Abhängig von Internet und Provider

---

*Mehr Details: [Technischer Stack - die vollständige Analyse](/mein-ansatz/technik)*

*Vorheriger Artikel: [Markt & Trends - Google, Palantir & Co](/blog/datenreife-03-markt-trends)*

*Die gesamte Serie: [Mein Ansatz - 7+ Stufen zur Datenreife](/mein-ansatz)*

*Fragen? [Gespräch vereinbaren](/kontakt)*
