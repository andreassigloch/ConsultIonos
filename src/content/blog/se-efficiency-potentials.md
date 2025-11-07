---
title: 'Systems Engineering Efficiency Potentials'
description: 'Identifikation und Nutzung von Effizienzpotenzialen in Systems Engineering Prozessen.'
pubDate: 2024-11-20
author: 'Andreas Sigloch'
tags: ['Efficiency', 'Systems Engineering', 'Process Optimization', 'Value Stream']
draft: false
---

## Wo liegt Verschwendung im SE-Prozess?

Systems Engineering bietet enormes Potenzial zur Effizienzsteigerung - wenn man weiß, wo man ansetzen muss. Basierend auf LEAN-Prinzipien identifizieren wir **7 Arten der Verschwendung** in SE-Prozessen.

## Die 7 Verschwendungen im SE

### 1. Überproduktion (Overproduction)
**Symptom**: Dokumentation, die niemand liest

Beispiele:
- Anforderungen mit exzessivem Detailgrad
- Modelle, die nie aktualisiert werden
- Reports, die niemand nutzt

**Lösung**: Just-in-time Documentation, Need-driven Specification

### 2. Warten (Waiting)
**Symptom**: Teams blockiert durch Abhängigkeiten

Beispiele:
- Warten auf Requirements-Freigabe
- Warten auf Tool-Zugänge
- Warten auf Reviews

**Lösung**: Parallel Engineering, Self-Service Tools, Rolling Wave Planning

### 3. Transport (Transportation)
**Symptom**: Information muss zwischen Systemen übertragen werden

Beispiele:
- Manuelle Datenmigration zwischen Tools
- Copy-Paste zwischen Systemen
- E-Mail-Ping-Pong für Information Requests

**Lösung**: Tool-Integration, Single Source of Truth, API-basierte Workflows

### 4. Überbearbeitung (Over-Processing)
**Symptom**: Unnötig komplexe Prozesse

Beispiele:
- 5-stufiger Approval-Prozess für Änderungen
- Meetings mit 20 Teilnehmern
- Excessive Formalism ohne Mehrwert

**Lösung**: Process Simplification, Decision Rights Matrix, Working Agreements

### 5. Bestände (Inventory)
**Symptom**: Work in Progress (WIP) ohne Mehrwert

Beispiele:
- 100 offene Requirements ohne Priorisierung
- Halbfertige Designs
- Backlog von Testfällen

**Lösung**: WIP Limits, Pull-based Planning, Priority Management

### 6. Bewegung (Motion)
**Symptom**: Unnötige Schritte im Arbeitsablauf

Beispiele:
- Ständiges Wechseln zwischen 5 Tools
- Suchen von Information
- Wiederholtes Einloggen

**Lösung**: Integrated Toolchain, Single Sign-On, Information Architecture

### 7. Fehler (Defects)
**Symptom**: Nacharbeit durch Fehler

Beispiele:
- Inkonsistente Requirements
- Unvollständige Spezifikationen
- Fehlerhafte Trace Links

**Lösung**: Built-in Quality, Automated Checks, Reviews

## Value Stream Mapping für SE

### Schritt 1: Current State erfassen

Visualisieren Sie Ihren SE-Prozess:
```
[Req. Elicitation] → [Analysis] → [Specification] → [Review] → [Release]
   3 days            5 days       7 days           2 days      1 day
   ↓ 2d wait         ↓ 1d wait    ↓ 3d wait        ↓ 5d wait
```

**Lead Time**: 29 Tage
**Value-Adding Time**: 18 Tage
**Efficiency**: 62%

### Schritt 2: Verschwendung identifizieren

Wo liegen die Wartezeiten? Warum?
- Review-Bottleneck: Nur 2 autorisierte Reviewer
- Tool-Medienbrüche: 3 verschiedene Systeme
- Rework: 30% der Requirements müssen überarbeitet werden

### Schritt 3: Future State designen

```
[Req. Workshop] → [Collaborative Spec.] → [Auto-Review] → [Release]
   2 days           4 days                 0.5 days        0.5 days
   ↓ 0.5d           ↓ 0.5d                ↓ 0d
```

**New Lead Time**: 8 Tage (72% Reduktion!)
**New Value-Adding Time**: 7 Tage
**New Efficiency**: 88%

## Quick Wins für SE Efficiency

### 1. Requirements Templates
**Effort**: Low | **Impact**: High

Standardisierte Vorlagen reduzieren:
- Anforderungsqualität ↑ 40%
- Review-Dauer ↓ 50%
- Nachfragen ↓ 60%

### 2. Automated Traceability
**Effort**: Medium | **Impact**: High

Tool-gestützte Traceability:
- Trace-Pflege ↓ 80%
- Impact Analysis: 15 min statt 2 Tage
- Audit-Vorbereitung ↓ 70%

### 3. Collaborative Sessions
**Effort**: Low | **Impact**: Medium

Requirements Workshops statt E-Mail-Ping-Pong:
- Clarification-Zyklen ↓ 75%
- Team-Alignment ↑
- Time-to-Specification ↓ 40%

### 4. Definition of Done
**Effort**: Low | **Impact**: Medium

Klare Fertigstellungskriterien für Requirements:
- Rework ↓ 50%
- Review-Dauer ↓ 30%
- Quality Gates transparent

## Messung des Erfolgs

### Key Performance Indicators

**Process Efficiency**:
- Lead Time (days)
- Cycle Time per Phase
- % Value-Adding Time

**Quality**:
- Defect Rate (Fehler pro Requirement)
- Rework Rate (%)
- Review Rejection Rate (%)

**Throughput**:
- Requirements per Sprint
- Story Points Velocity
- Change Request Cycle Time

## Fazit

SE Efficiency ist kein Hexenwerk - es erfordert:
1. **Transparenz**: Prozesse visualisieren
2. **Messung**: KPIs definieren und tracken
3. **Kontinuierliche Verbesserung**: Kaizen-Mentalität
4. **Team-Empowerment**: Bottom-up Optimierung

**Starten Sie mit Value Stream Mapping!**

---

Interessiert an einem Efficiency Assessment? [Kontaktieren Sie mich](/#kontakt)!
