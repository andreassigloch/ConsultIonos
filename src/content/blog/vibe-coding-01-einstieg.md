---
title: 'Vibe Coding #1: Was kann man dabei lernen?'
description: 'Die KI eine Anwendung rein mit natürlichsprachigen Vorgaben schreiben lassen - erstaunlicherweise funktioniert das. Hier mein Kochrezept.'
pubDate: 2025-03-01
author: 'Andreas Sigloch'
image: '/images/1748171763292.png'
tags: ['Vibe Coding', 'KI', 'Software Development', 'Prompt Engineering']
series: 'Vibe Coding'
draft: false
linkedinStatus: 'published'
---

## Was ist Vibe Coding?

Das Thema "Vibe Coding" - die KI eine Anwendung rein mit natürlichsprachigen Vorgaben schreiben lassen - ist gerade viel diskutiert. Erstaunlicherweise funktioniert das ganz gut.

## Was kann man dabei lernen?

### 1. Wer kein Ziel hat, kommt nirgends an

Wenn man die Aufgabenstellung unscharf formuliert, wird das Ergebnis ebenfalls unscharf. **Die KI wird die Lücken kreativ nutzen.**

### 2. Langsamer geht es schneller

Erst mal ein Konzept vorschlagen lassen und sich das Ergebnis ansehen. Das Ergebnis ist gerne viel zu umfassend und komplex.

**Vorsicht:** KI haut in beeindruckender Geschwindigkeit Mengen von Code raus. Wenn man die aber im Nachgang signifikant ändern möchte, ist es schnell vorbei mit den "Good Vibes".

### 3. Den Elefanten isst man in Scheiben

Die Größe der Kontextfenster ist immer noch limitiert. Wenn die Unterhaltungen zu lange werden, vergisst die KI einen Teil der Historie oder fokussiert auf einen Teilaspekt.

**Kleinere Aufgabenpakete, eingebettet in eine größere Story, sind essenziell.**

## Klassische Vorgehensweise?

Das hört sich nach ganz klassischer Vorgehensweise für erfolgreiche Teamarbeit an, oder? Wenig überraschend, wenn die aktuellen KIs als Simulation des Menschen erstellt wurden.

Ersetzen Sie "Story" durch "Epic" - mit dem richtigen Plugin (MCP) kann man sicher auch gleich Jira-Tickets generieren lassen. **Die Bausteine bleiben.**

## Mein Kochrezept

1. **Die Aufgabe klar beschreiben:** "Erstelle ein Konzept für [Ihr Problem]. Keinen Code, nur Konzeptbeschreibung."

2. **Inhalte kritisch hinterfragen:** "Entferne xyz Funktionalität", "Schlage Vereinfachungen vor"

3. **Projektbeschreibung erstellen:** "Erstelle eine Projektbeschreibung als Markdown-Dokument. Keinen Code." - Wichtig, sonst fängt er direkt an, seitenweise Code zu erzeugen!

4. **Neuen Chat starten.** "Lese projektbeschreibung.md und schlage ein Lösungskonzept vor. Projektstruktur und verwendete Bibliotheken."
   - Können Sie nicht beurteilen? Bei Perplexity fragen, was die meist verwendete Lösung ist. Je verbreiteter und etablierter, desto gut.
   - Für Nebendiskussionen **unbedingt** einen anderen Chat benutzen!

5. **Neuer Chat.** "Erstelle schrittweises Implementierungskonzept. Nur Beschreibung der Steps, kein Code."

6. **Neuer Chat.** "Lese projektbeschreibung.md und starte mit der Implementierung von Step 1."

7. **10 Min Kaffeepause**, wenn Sie Ihrer KI Lese- und Schreibzugriff gegeben haben.

8. **Have fun.** Oder die KI die Fehlermeldungen abarbeiten lassen.

## Beispiel: Morning Mood App

- Kostenpunkt: **$1,93**
- Die fertige App: [morningmood.vercel.app](https://morningmood.vercel.app)
- Sourcecode: [github.com/andreassigloch/morningmood](https://github.com/andreassigloch/morningmood)

An der Grafik und Soundqualität muss man arbeiten :-)

---

*Neugierig geworden? [Lassen Sie uns sprechen](/#kontakt)*
