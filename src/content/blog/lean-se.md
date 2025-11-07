---
title: 'Lean SE - Leichtgewichtige Ansätze'
description: 'Systems Engineering kann sehr schwergewichtig sein. Nicht jedes Projekt braucht das "große Besteck". Hier sind Ideen für leichtgewichtige Ansätze.'
pubDate: 2024-12-15
author: 'Andreas Sigloch'
tags: ['Lean SE', 'Systems Engineering', 'Efficiency', 'Process Optimization']
draft: false
---

## Das Problem

Systems Engineering (SE) hat den Ruf, **schwergewichtig** und **bürokratisch** zu sein. Viele Teams scheuen den Einstieg, weil sie befürchten, sich in Prozessen und Dokumentation zu verlieren.

> "Nicht jedes Projekt braucht das 'große Besteck'"

## Die Lösung: Lean SE

**Lean Systems Engineering** kombiniert die Strukturiertheit von SE mit der Agilität von LEAN-Methoden.

### Grundprinzipien

1. **Wertorientierung**: Fokus auf das, was wirklich Mehrwert schafft
2. **Minimal Viable Process**: So viel Prozess wie nötig, so wenig wie möglich
3. **Iterative Verfeinerung**: Start simple, grow as needed
4. **Praktikabilität vor Perfektion**: Lieber 80% umgesetzt als 100% dokumentiert

## Praktische Ansätze

### 1. Requirements Light

Statt vollständiger Requirements-Spezifikationen:
- **User Stories mit Akzeptanzkriterien**
- **Lightweight Use Cases**
- **Visuelle Modelle** statt textueller Spezifikationen

```
Als [Rolle]
möchte ich [Funktion]
um [Nutzen] zu erreichen

Akzeptanzkriterien:
- [ ] Kriterium 1
- [ ] Kriterium 2
```

### 2. Architecture Modeling

Nicht jedes Projekt braucht vollständige SysML-Modelle:
- **Context Diagrams**: Systemgrenzen klar definieren
- **Interface Matrix**: Schnittstellen übersichtlich darstellen
- **Component Diagrams**: Nur die wichtigsten Bausteine

### 3. Verification & Validation

Pragmatischer V&V-Ansatz:
- **Risk-based Testing**: Fokus auf kritische Bereiche
- **Exploratory Testing**: Für unkritische Features
- **Continuous Integration**: Automatisierte Tests wo sinnvoll

## Wann Lean SE einsetzen?

### Geeignet für:
- ✅ Kleine bis mittlere Projekte (< 20 Personen)
- ✅ Interne Entwicklungen ohne strenge Zertifizierung
- ✅ Prototypen und MVPs
- ✅ Agile Produktentwicklung

### Weniger geeignet für:
- ❌ Safety-critical Systems (Automotive, Medizin, Luftfahrt)
- ❌ Projekte mit strikten regulatorischen Anforderungen
- ❌ Sehr große, verteilte Entwicklungsteams

## Success Factors

### 1. Team Buy-in
Das Team muss den Ansatz mittragen und verstehen, **warum** bestimmte Praktiken wichtig sind.

### 2. Anpassungsfähigkeit
Der Prozess muss wachsen können:
```
MVP → Basic SE → Standard SE → Full SE
```

### 3. Tooling
Einfache, zugängliche Tools bevorzugen:
- Confluence / Notion für Dokumentation
- Miro / Mural für visuelle Modelle
- Jira / GitHub Issues für Tracking

## Beispiel: Automotive Startup

Ein Automotive Startup mit 12 Entwicklern:

**Challenge**: A-Spice Assessment steht bevor, aber kein Budget für heavyweight Prozesse.

**Lösung**:
1. **Minimal Requirements Management**: Jira mit Custom Fields
2. **Lightweight Architecture**: Draw.io Diagramme in Confluence
3. **Test Management**: Automatisierte Tests + manuelle Checklisten
4. **Traceability**: Einfache Link-Matrix in Excel

**Ergebnis**: A-Spice Level 2 erreicht mit < 20% Overhead

## Fazit

Lean SE ist kein "SE light" - es ist **pragmatisches SE**. Die Kunst liegt darin, die richtige Balance zu finden zwischen:
- Struktur und Flexibilität
- Dokumentation und Agilität
- Vollständigkeit und Geschwindigkeit

**Starten Sie klein, lernen Sie schnell, skalieren Sie bei Bedarf.**

---

Haben Sie Erfahrungen mit Lean SE? [Lassen Sie uns darüber sprechen](/#kontakt)!
