---
title: 'Vibe Coding #3: NoApp - System Engineering ohne Code'
description: 'Claude Code auf "Allgemeiner Systems Engineer" umprogrammiert: 27 Dateien, 1587 Zeilen - und kein einziger Zeile traditioneller Code.'
pubDate: 2025-08-01
author: 'Andreas Sigloch'
image: '/images/1756817824312.png'
tags: ['Vibe Coding', 'KI', 'Claude Code', 'Systems Engineering', 'NoCode']
series: 'Vibe Coding'
draft: false
linkedinStatus: 'published'
---

## Zwei Motivationen

**1. Vibe Coding braucht Guidance**

- **Inhaltlich:** Ohne qualifizierte Inputs wird das Ergebnis nicht Ihren Erwartungen entsprechen
- **Operativ:** Ein Coding Agent mit Vollzugriff auf Web, Dateisystem und Kommandozeile kann eine Menge Unfug anrichten

**2. Die Weiterentwicklung von Claude Code**

In den letzten Monaten sind neben MCPs noch einige Fähigkeiten hinzugekommen:
- Sub-Agenten
- Selbst definierte Kommandos
- "Umprogrammierung" auf andere Domains als Software Engineering

## Die Idee

> Eigentlich braucht es doch gar keinen Code mehr, wenn ich Claude Code auf "Allgemeinen Systems Engineer" umprogrammiere, ein paar Agenten die INCOSE-Rollen wahrnehmen, und mich alle zusammen durch die Erstellung einer System-Spezifikation führen?

Eine gut LLM-lesbare Textdatei mit 100-300 Zeilen ist in jedem Fall besser als keine Spec.

## Das Ergebnis

```
⏺ 🎯 ALL TARGETS ACHIEVED - COMPREHENSIVE SUCCESS

Primary Targets: ✅ COMPLETE

1. Safe Environment
   - ✅ Docker Sandbox: Complete isolation
   - ✅ Permissions: File-only access

2. Claude Code Features Demo
   - ✅ /agents: 4 specialized agents (13KB+ total)
   - ✅ /hooks: Git automation with validation
   - ✅ /output-style: General systems engineering

3. NoApp Concept
   - ✅ Zero Code: 0 lines of application programming
   - ✅ Configuration-Only: YAML + prompts + Docker

4. Complex System Design
   - ✅ Guided Process: Discovery → Architecture → Validation
   - ✅ Real Specifications: 18+ complete system specs

Evidence Metrics:
- 27 files, 1587 lines - No traditional code
- 18+ specifications across multiple engineering domains
- Complete security isolation
- Production-ready deployment
```

## Meine Key-Takeaways

### 1. Das Wissen steckt drin

Das Wissen über so ziemlich alles steckt in den LLMs. Man muss es nur geschickt abrufen. Für die 80% Commodity-Umfänge Ihres Systems sollte es allemal reichen.

**Fokussieren Sie sich auf Ihre Innovation / USP.**

### 2. Code-Less App in Reichweite

Eine "Code-Less App" oder "App-on-demand" scheint nicht mehr sehr weit weg. Macht ökonomisch sicher nicht überall Sinn, aber wenn die Spezifikation da ist, ist das schnell erledigt.

## Zum Ausprobieren

Wer es sich ansehen oder ausprobieren möchte: [github.com/andreassigloch/noapp](https://github.com/andreassigloch/noapp)

Dort finden sich auch Beispiel-Sys-Specs. Die Agent-Prompts sind NICHT optimiert, daher wird jede Spec noch etwas anders aussehen.

---

*Feedback & Anregungen gerne jederzeit: [Kontakt aufnehmen](/#kontakt)*
