# Warum Struktur vor KI

---

Es gibt ein verbreitetes Missverständnis: Wenn wir nur das richtige KI-Tool hätten, würden sich unsere Datenprobleme lösen.

Das Gegenteil ist der Fall. KI-Werkzeuge setzen funktionierende Datenstrukturen voraus. Sie können fehlende Struktur nicht ersetzen.

---

## Was KI gut kann

- Natürliche Sprache verstehen und generieren
- Ähnlichkeiten in großen Textmengen finden
- Zusammenfassungen erstellen
- Kreative Vorschläge machen

## Was KI nicht kann

- Fehlende Daten erfinden (nicht zuverlässig)
- Zusammenhänge kennen, die nirgends dokumentiert sind
- Konsistent dieselbe Antwort auf dieselbe Frage geben
- Erklären, warum sie zu einem Ergebnis kommt

---

## Die Konsequenz

Für viele Unternehmensanwendungen braucht es:

**Reproduzierbarkeit** – Dieselbe Eingabe muss dasselbe Ergebnis liefern. Klassische Algorithmen und Regelsysteme können das. LLMs nicht zuverlässig.

**Nachvollziehbarkeit** – Bei Audits oder Fehlern muss klar sein, warum eine Entscheidung getroffen wurde. Regelbasierte Systeme dokumentieren das automatisch.

**Planbare Kosten** – API-Kosten skalieren mit der Nutzung. Lokale Systeme haben Fixkosten.

---

## Eine andere Reihenfolge

Statt: "Welche KI können wir nutzen?"

Besser: 
1. Welche Daten haben wir?
2. Wie hängen sie zusammen?
3. Welche Regeln gelten?
4. Was wollen wir messen?
5. Und erst dann: Wo hilft KI wirklich?

In den meisten Fällen liegt der größte Hebel in den Schritten 1-4. KI kommt in Schritt 5 – wenn überhaupt.

---

## Ein Beispiel

**Ohne Struktur:**
"Finde alle Projekte, die ähnlich zu diesem sind."
→ LLM durchsucht Dokumente, findet vielleicht etwas Ähnliches, vielleicht nicht. Ergebnis variiert.

**Mit Struktur:**
"Zeige alle Projekte mit Kunde X, Material Y, Toleranzklasse Z."
→ Graph-Query liefert in Millisekunden exakt die passenden Projekte. Immer dieselben. Nachvollziehbar.

Das zweite Szenario braucht keine KI. Es braucht eine Graph-Datenbank und ein sauberes Datenmodell.

---

## Wann KI sinnvoll ist

- Wenn natürliche Sprache im Spiel ist (Texte zusammenfassen, Anfragen verstehen)
- Wenn Kreativität gefragt ist (Vorschläge generieren, Varianten erkunden)
- Wenn die Aufgabe nicht in Regeln fassbar ist

Für alles andere gibt es meist bessere Werkzeuge.

---

[← Zurück zur Übersicht](/hintergrund)
