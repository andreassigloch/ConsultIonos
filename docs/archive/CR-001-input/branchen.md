# Eine Methodik, verschiedene Branchen

*Warum dieselben Prinzipien für Systems Engineering und Immobilien funktionieren.*

---

## Die Beobachtung

Auf den ersten Blick haben Maschinenbau und Immobilienvermittlung wenig gemeinsam. Unterschiedliche Produkte, Kunden, Zyklen.

Aber auf der Ebene der Datenstruktur ähneln sie sich mehr, als man denkt:

- Objekte mit Eigenschaften
- Beziehungen zwischen Objekten
- Regeln, die gelten müssen
- Qualität, die bewertet werden soll

Die Domäne ändert sich. Die Struktur bleibt.

---

## Stufe 3: Vernetzte Daten

**Systems Engineering:**
```
(Anforderung) ─[verfeinert]→ (Funktion) ─[zugeordnet]→ (Komponente)
```
Eine Anforderung wird durch Funktionen erfüllt, die Komponenten zugeordnet sind. Ändert sich eine Anforderung, ist sofort sichtbar, welche Komponenten betroffen sind.

**Immobilien:**
```
(Objekt) ─[zugeordnet]→ (Kontakt) ─[hat]→ (Aktivität)
```
Ein Objekt ist Kontakten zugeordnet, die Aktivitäten haben (Besichtigungen, Anfragen). Ändert sich der Objektstatus, ist klar, welche Kontakte informiert werden müssen.

**Medizintechnik:**
```
(Anforderung) ─[verifiziert_durch]→ (Testfall) ─[dokumentiert_in]→ (DHF)
```
Für Audits: Welche Anforderung wurde wie getestet und wo ist das dokumentiert?

**Fertigung:**
```
(Teil) ─[geliefert_von]→ (Lieferant) ─[nutzt]→ (Prozess)
```
Bei Lieferantenausfall: Welche Teile und Prozesse sind betroffen?

---

## Stufe 4: Automatische Prüfung

Regeln lassen sich branchenunabhängig formulieren:

| Branche | Regel | Konsequenz |
|---------|-------|------------|
| Systems Engineering | Funktion ohne Output | Warnung |
| Immobilien | Exposé ohne Grundriss | Warnung |
| Medizintechnik | Risikoklasse IIb ohne Testnachweis | Eskalation |
| Fertigung | Material X mit Prozess Y | Fertigung stoppen |

Die Syntax ist gleich. Nur die Begriffe ändern sich.

---

## Stufe 5: Messbare Qualität

Scores funktionieren überall dort, wo Qualität bisher subjektiv bewertet wird.

**Architektur-Score (Systems Engineering):**
- Vollständigkeit: 85%
- Konsistenz: 72%
- Kohäsion: 78%
- **Gesamt: 78/100**

**Lead-Score (Immobilien):**
- Budget passt: ✓
- Zeitrahmen definiert: ✓
- Finanzierung geklärt: teilweise
- **Gesamt: 75/100**

**Lieferanten-Score (Fertigung):**
- Liefertreue: 92%
- Qualitätsquote: 88%
- Kommunikation: 70%
- **Gesamt: 84/100**

Die Kriterien sind domänenspezifisch. Das Prinzip ist universell.

---

## Was das bedeutet

Ich muss nicht Experte in Ihrer Branche sein, um Ihre Datenstruktur zu verstehen. Die Muster wiederholen sich.

Was ich brauche:
- Ihre Fachbegriffe
- Ihre Regeln (die oft in Köpfen stecken)
- Ihre Definition von Qualität

Den Rest – die Struktur, die Prüfungen, die Scores – bringt die Methodik mit.

---

## Wo ich Erfahrung habe

**Systems Engineering:**
- INCOSE-konforme Anforderungsmodellierung
- Funktionale Architektur
- Graph-basierte Traceability

**Immobilien:**
- Bi-nationale Vermittlung (Deutschland/Portugal)
- Automatisierte Workflows
- LLM-optimierte Vermarktung

Andere Branchen sind möglich, wenn die Grundmuster passen.

---

[← Zurück zur Übersicht](/hintergrund)
