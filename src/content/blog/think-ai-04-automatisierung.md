---
title: 'Think AI #4: Automatisierung - Warum nicht gleich ein Programm?'
description: 'Statt Zapier oder N8N die KI ein ganzes Programm schreiben lassen? ImPhoto zeigt: Software on Demand hat eine Nische.'
pubDate: 2025-05-15
author: 'Andreas Sigloch'
tags: ['Think AI', 'KI', 'Automatisierung', 'Software Development', 'Vibe Coding']
series: 'Think AI'
draft: false
---

## Der klassische Weg

Einer der wesentlichen Use Cases für KI ist die Automatisierung von Geschäftsabläufen. Programme wie Zapier oder N8N sind die Kandidaten, wenn die Microsoft-Bordmittel am Ende sind.

**Allerdings:** Das ist alles andere als plug and play. Die Struktur und Interfaces aller Input- und Output-Programme muss man im Detail kennen. Die Extraktion und Konvertierung der Daten braucht auch den ein oder anderen Codeblock.

## Die Alternative

> Warum dann die KI nicht gleich ein ganzes Programm für den gewünschten Ablauf schreiben lassen?

## Praxisbeispiel: ImPhoto

**ImPhoto** heißt das Projekt für Sigloch-Immobilien im Nachbar-Büro.

### Aufgabe
Die Fotos aus dem Fotoshooting für das Exposé:
- Einlesen
- Den richtigen Räumen zuordnen
- Basische Korrekturen vornehmen
- Ordentlich benannte Fotos im richtigen Format in den Exposé-Ordner schieben

### Zeitaufwand (geplant)
- 1h Spec erstellen mit Claude.ai
- 1h Autarke Softwareerstellung durch claude-flow's Agentenschwarm
- 8h Debugging und Nachschärfen
- 8h Dokumentieren und verpacken als "echte" App

### Realität
Hat natürlich so nicht funktioniert - es waren dann doch **24h Debugging und Nachschärfen**.

### Ergebnis
Programm läuft. Von den 34h kann man mit etwas mehr Erfahrung sicher noch einiges abziehen.

## Resümee

Ich glaube, dass **"Software on Demand"** eine Nische hat. Mindestens aber kann man so schnell einen brauchbaren Prototypen mit Hausmitteln zusammenbekommen:
- Zum Testen, ob die eigene Spec etwas taugt
- Oder den MVP als Spec definieren

**Wichtig:** Damit es funktioniert, ist eine minimale Spec Voraussetzung. Mindestens die Use Cases sauber beschreiben. Auch da hilft die KI natürlich.

Das Ganze verkaufsfähig zu machen mit User-Authentifizierungen etc. sollte man besser Profis überlassen.

**Versuch macht klug.**

---

*Mit agentischen Grüßen - [Kontakt aufnehmen](/#kontakt)*
