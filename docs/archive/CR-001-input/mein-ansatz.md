# Mein Ansatz

---

## Das Grundprinzip

Die meisten Digitalisierungsprojekte beginnen mit der Frage: "Welches Tool brauchen wir?"

Ich stelle eine andere Frage: "Welche Struktur haben unsere Daten – und welche sollten sie haben?"

Der Grund: Werkzeuge kommen und gehen. Eine durchdachte Datenstruktur bleibt. Und sie ist die Voraussetzung dafür, dass Werkzeuge überhaupt funktionieren.

---

## Zwei Phasen

Ich unterscheide zwischen Entwicklung und Betrieb:

**In der Entwicklung** nutze ich KI-Werkzeuge intensiv – um schneller zu bauen, Muster zu erkennen, Wissen in Systeme zu übersetzen.

**Im Betrieb** läuft das fertige System weitgehend ohne KI. Stattdessen: klare Regeln, deterministische Algorithmen, reproduzierbare Ergebnisse.

Das bedeutet: planbare Kosten, keine API-Abhängigkeit, volle Nachvollziehbarkeit.

---

## Die Stufen

Ich arbeite mit einem Reifegradmodell, das beschreibt, wie Unternehmen ihre Daten schrittweise nutzbarer machen können.

---

### Stufe 1: Unstrukturierte Ablage

*Der Ausgangspunkt der meisten Unternehmen.*

Dokumente liegen in Ordnern, Informationen in E-Mails, Zusammenhänge in den Köpfen von Mitarbeitern. Es gibt keine systematische Verbindung zwischen den Daten.

**Typische Symptome:**
- Suche nach Informationen dauert lange
- Wissen geht verloren, wenn Mitarbeiter wechseln
- Dieselben Fehler wiederholen sich

---

### Stufe 2: Durchsuchbare Inhalte

*Dokumente werden nach Inhalt findbar.*

Moderne Suchsysteme ermöglichen es, nicht nur nach Dateinamen, sondern nach Inhalten zu suchen. Ein Mitarbeiter kann ähnliche Projekte oder Dokumente in Sekunden finden.

**Was sich ändert:**
- Informationssuche wird deutlich schneller
- Ähnlichkeiten werden erkennbar
- Einarbeitung neuer Mitarbeiter wird einfacher

**Technologie:** Vektordatenbanken, Embeddings

---

### Stufe 3: Vernetzte Daten

*Zusammenhänge werden explizit.*

Die Daten werden zu einem Netzwerk: Was hängt von was ab? Welche Dokumente gehören zu welchem Projekt? Welche Lieferanten liefern welche Teile?

**Was sich ändert:**
- Impact-Analysen in Sekunden statt Stunden
- Abhängigkeiten werden sichtbar
- Änderungen lassen sich nachverfolgen

**Technologie:** Graph-Datenbanken (Neo4j)

**Beispiel:** "Zeige alle Komponenten, die von Lieferant X abhängen" – sofort beantwortet durch eine Graph-Abfrage.

---

### Stufe 4: Automatische Prüfung

*Regeln werden zu automatischen Checks.*

Das Wissen erfahrener Mitarbeiter – "Das geht nicht, weil..." – wird in Prüfregeln übersetzt. Das System warnt, bevor ein Fehler passiert.

**Was sich ändert:**
- Fehler werden früher erkannt
- Qualitätssicherung wird konsistenter
- Erfahrungswissen wird konserviert

**Technologie:** Regelbasierte Systeme, SHACL

**Beispiel:** "Dieses Dokument ist unvollständig: Abschnitt 3 fehlt" – automatisch erkannt, bevor es den nächsten Prozessschritt erreicht.

**Wichtig:** Diese Prüfungen sind 100% deterministisch. Keine Halluzinationen, keine Variabilität.

---

### Stufe 5: Messbare Qualität

*Subjektive Einschätzungen werden zu objektiven Scores.*

Anstatt "Das sieht gut aus" gibt es messbare Kriterien: "Das erfüllt 78% der definierten Qualitätsanforderungen." Entscheidungen werden nachvollziehbar.

**Was sich ändert:**
- Qualität wird vergleichbar
- Fortschritt wird messbar
- Entscheidungen werden dokumentierbar

**Technologie:** Scoring-Algorithmen, gewichtete Metriken

**Beispiel:** Ein Lead-Score, der auf nachvollziehbaren Kriterien basiert – nicht auf Bauchgefühl.

**Das ist der Punkt, an dem die meisten Unternehmen den größten Hebel haben.** Bis hierher liegt der Wert primär im Datenmanagement und in Regeln. KI spielt eine untergeordnete Rolle.

---

### Stufe 6: Vorhersagen

*Muster in historischen Daten werden nutzbar.*

Auf Basis der gesammelten Daten lassen sich Vorhersagen treffen: Wann wird ein Engpass eintreten? Welche Projekte sind gefährdet?

**Was sich ändert:**
- Proaktives statt reaktives Handeln
- Bessere Ressourcenplanung
- Frühwarnsysteme

**Technologie:** Zeitreihen-Analyse, Graph-Algorithmen

**Voraussetzung:** Stufe 5 muss stabil laufen. Ohne saubere historische Daten keine belastbaren Vorhersagen.

---

### Stufe 7+: Lernende Systeme

*Das System verbessert sich durch Nutzung.*

Feedback-Schleifen ermöglichen es, dass Regeln und Scores sich an tatsächliche Ergebnisse anpassen. Das System wird besser, je mehr es genutzt wird.

**Was sich ändert:**
- Kontinuierliche Verbesserung
- Anpassung an veränderte Bedingungen
- Reduktion manueller Nachjustierung

**Technologie:** InstructLab, Fine-Tuning kleiner Modelle

**Für die meisten Unternehmen ist das Zukunftsmusik** – aber wichtig zu wissen, wohin die Reise gehen kann.

---

## Wo der Wert entsteht

| Stufe | Geschäftswert | KI-Anteil |
|-------|---------------|-----------|
| 1 | – | 0% |
| 2 | 10-20% | 10-20% |
| 3 | 30-40% | 10-30% |
| 4 | 50-60% | 5-10% |
| **5** | **70-80%** | **20-30%** |
| 6 | 85-90% | 15-25% |
| 7+ | 90-95% | 30-50% |

Die Zahlen sind Richtwerte. Entscheidend ist: **Bis Stufe 5 kommt der Wert überwiegend aus Struktur und Regeln, nicht aus KI.**

---

## Was das für Sie bedeutet

Wenn Sie überlegen, ob dieser Ansatz für Sie relevant ist, sind hier einige Anhaltspunkte:

**Passt wahrscheinlich gut, wenn:**
- Sie Informationen in verschiedenen Systemen haben, die nicht verbunden sind
- Erfahrungswissen bei Ihnen in Köpfen steckt, nicht in Systemen
- Sie Entscheidungen treffen müssen, deren Grundlage schwer nachvollziehbar ist
- Sie Audit-Anforderungen erfüllen müssen (MDR, ISO, Automotive)

**Passt wahrscheinlich nicht, wenn:**
- Sie ein fertiges Produkt suchen, das Sie selbst installieren können
- Ihre Herausforderung primär Marketing oder Vertrieb ist
- Sie unter 20 Mitarbeiter haben und die Komplexität überschaubar ist

---

## Der erste Schritt

Ein Gespräch von 30 Minuten reicht aus, um zu klären:
- Auf welcher Stufe Sie aktuell stehen
- Ob ein strukturierter Ansatz für Ihre Situation sinnvoll ist
- Was ein nächster Schritt sein könnte

[Gespräch vereinbaren →]
