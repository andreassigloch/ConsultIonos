---
title: 'Prompt Engineering und Requirements Engineering'
description: 'Eine unmögliche Kombination? Wie INCOSE-Qualitätsmerkmale beim Vibe-Coding helfen - und warum man nicht verraten sollte, dass es Requirements Engineering ist.'
pubDate: 2025-09-01
author: 'Andreas Sigloch'
image: '/images/1754645450552.jpeg'
tags: ['KI', 'Prompt Engineering', 'Requirements Engineering', 'INCOSE', 'Systems Engineering']
draft: false
---

## Die Frage

Auf der Suche nach weiteren Optimierungen meines virtuellen Lieblings-Mitarbeiters Claude Code bin ich auf eine interessante Frage gestoßen:

> Kann man klassisches Requirements Engineering nicht auch im Prompt Engineering zielführend einsetzen?

## Was sich getan hat

In den letzten Wochen hat sich wieder einiges getan:

- **Verschiedene Ebenen von Prompts** - global, im Projekt oder nur lokal
- **MCPs** - Tools für Browser, Datenbanken, Git und mehr
- **Agenten** - rollenbasiert für Architekt, Tester, Reviewer

## Das bleibende Problem

Alles das sind Hilfen, um das **Verhalten** des Coding-Agenten zu steuern. Die **Inhalte** der Aufgaben müssen dennoch passend geschnitten übergeben werden.

Die wesentlichen Eigenheiten der LLMs sind immer noch vorhanden:

- Vorgaben werden gerne übergangen
- Lücken werden ungefragt gefüllt
- Kreative neue Funktionalitäten werden eingefügt
- Das Kontextfenster zeigt nicht auf die "richtigen" Inhalte

## Was hilft

### INCOSE-Qualitätsmerkmale

Ist die Anforderung **unambiguous**, **complete**, **verifiable** (um nur einige der INCOSE-Qualitätsmerkmale zu nennen), kann die KI:

- **Zielgerichtet arbeiten** (unambiguous)
- **Sich selbst überprüfen** (verifiable)

### Hierarchischer Aufbau

Wenn ich die Anforderungen hierarchisch aufgebaut habe, bekomme ich über die Hierarchie einen guten Hinweis, was es an Kontext braucht.

### KI-Review

Am Schluss die KI nochmal ein Review machen lassen:
- a) Sind die Anforderungen vollständig umgesetzt?
- b) Ist irgendetwas dazu gekommen, was nicht in den Anforderungen stand?

## Fazit

So hilft gutes altes Requirements Engineering auch beim ach so modernen Prompt Engineering oder Vibe-Coding.

**Experten-Tipp:** Erzählt keinem, dass es Requirements Engineering ist.

---

*Happy Engineering! [Kontakt aufnehmen](/#kontakt)*
