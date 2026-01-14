# Demo-Script: Requirements Traceability mit Knowledge Graph & Claude Desktop

**Dauer:** 20 Minuten
**Zielgruppe:** Engineering-Teams, PLM-Verantwortliche, Quality Manager
**Setting:** Live-Demo mit Claude Desktop + Neo4j

---

## Pre-Demo Checkliste

### 10 Minuten vor Demo-Start

- [ ] **Docker Desktop** gestartet und running
- [ ] **Neo4j Container** läuft:
  ```bash
  docker ps | grep neo4j
  # Falls nicht: docker start neo4j-demo
  ```
- [ ] **Neo4j Browser** geöffnet: http://localhost:7484
  - Login: neo4j / demo-password
  - Testquery: `MATCH (n) RETURN count(n)` - sollte Nodes zurückgeben
- [ ] **Claude Desktop** geöffnet
  - MCP-Status prüfen: Einstellungen > MCP > "neo4j" muss grün sein
  - Test: "Liste alle verfügbaren MCP-Tools" eingeben
- [ ] **PDF-Dokumente** griffbereit in Ordner:
  - `ASPICE_PAM_31.pdf`
  - `FMEA_Handbook_2019.pdf`
  - `ISO26262_Part8.pdf`
  - `OEM_Lastenheft_Bremssystem_v2.3.pdf`
- [ ] **Zweiter Monitor** für Neo4j Browser (falls verfügbar)
- [ ] **Backup-Slides** geladen (falls technische Probleme)

### Schnelltest (2 Min)

```
Claude: "Verbinde dich mit der Neo4j-Datenbank und zeige die Anzahl der Requirements"
```

Erwartete Antwort: "Verbunden. Aktuell X Requirements in der Datenbank."

---

## Demo-Ablauf

### Stufe 1: Unstrukturierte Quellen (0:00 - 2:00)

#### Aktion
PDFs auf dem Bildschirm zeigen - Finder/Explorer öffnen, durch die 4 Dokumente scrollen.

#### Claude-Befehl
```
Keine Eingabe - nur visuelle Demonstration der Ausgangslage
```

#### Talking Points

> "Das kennen Sie alle: Vier verschiedene Quellen - OEM-Lastenheft als Word-Export, A-SPICE als PDF, FMEA-Handbuch, ISO 26262. Jedes Team hat seine eigene Ablage. Der Requirements Engineer sucht manuell nach Zusammenhängen."

> "Frage ans Publikum: Wie lange dauert es bei Ihnen, alle Anforderungen zu einem Subsystem zusammenzutragen? Die ehrliche Antwort: Oft Stunden, manchmal Tage."

#### Erwartetes Ergebnis
Publikum nickt - Wiedererkennung des Problems.

---

### Stufe 2: RAG-Grenze demonstrieren (2:00 - 4:00)

#### Aktion
Claude Desktop öffnen, RAG-Suche durchführen.

#### Claude-Befehl 1 (funktioniert)
```
Durchsuche das OEM-Lastenheft nach allen Anforderungen zum Thema "Bremsdruck"
```

#### Erwartetes Ergebnis
Claude findet 3-4 Requirements:
- REQ-BRK-001: Maximaler Bremsdruck
- REQ-BRK-002: Druckaufbauzeit
- REQ-BRK-003: Druckabbauzeit

#### Claude-Befehl 2 (scheitert - WOW-Moment)
```
Welche A-SPICE Work Products sind erforderlich, um REQ-BRK-001 normkonform nachzuweisen?
```

#### Erwartetes Ergebnis
Claude antwortet vage oder falsch:
- "Ich kann in den Dokumenten keine direkte Verknüpfung finden..."
- Oder: Generische Antwort ohne konkrete Work Products

#### Talking Points

> "Sehen Sie das Problem? RAG findet Text-Passagen, aber keine Beziehungen. Die Frage 'Welche Nachweise brauche ich?' erfordert Wissen über ZUSAMMENHÄNGE - welches Requirement zu welchem Work Product, welcher Test, welche Freigabe."

> "Genau hier beginnt der Knowledge Graph."

---

### Stufe 3: Graph-Visualisierung (5:00 - 7:00)

#### Aktion
Neo4j Browser zeigen, Requirement-Hierarchie visualisieren.

#### Claude-Befehl
```
Zeige die Requirement-Hierarchie für das Bremssystem im Neo4j Graph.
Starte bei der System-Ebene und gehe runter bis zu den Komponenten-Requirements.
```

#### Erwartetes Ergebnis
Claude führt Cypher-Query aus und beschreibt die Struktur:
```
System-Requirement: SYS-BRK-001 "Autonome Notbremsung"
├── Subsystem: SUB-BRK-001 "Bremsdruckmodulation"
│   ├── Component: REQ-BRK-001 "Max. Bremsdruck 180 bar"
│   ├── Component: REQ-BRK-002 "Druckaufbau < 150ms"
│   └── Component: REQ-BRK-003 "Druckabbau < 200ms"
└── Subsystem: SUB-BRK-002 "Sensorik"
    ├── Component: REQ-SEN-001 "Raddrehzahl-Erfassung"
    └── Component: REQ-SEN-002 "Drucksensor-Genauigkeit"
```

#### Neo4j Browser Query (parallel zeigen)
```cypher
MATCH path = (sys:Requirement {level: 'System'})-[:DERIVES_TO*1..3]->(comp:Requirement)
WHERE sys.domain = 'Brake'
RETURN path
LIMIT 50
```

#### Talking Points

> "Das ist der Paradigmenwechsel: Statt Text-Suche sehen wir STRUKTUR. Jeder Knoten ist ein Requirement, jede Kante eine Beziehung - derives_to, verifies, satisfies."

> "Und jetzt kommt das Entscheidende: Diese Struktur können wir gegen Regeln prüfen."

---

### Stufe 4: Regel-Extraktion aus PDF (7:00 - 11:00)

#### Aktion
Live Regel-Erstellung aus A-SPICE Dokument.

#### Claude-Befehl 1 (Regel-Erstellung)
```
Analysiere das A-SPICE PAM 3.1 PDF und extrahiere daraus Compliance-Regeln für Requirements Engineering.
Speichere die Regeln als Cypher-Constraints in der Neo4j-Datenbank.
```

#### Erwartetes Ergebnis
Claude analysiert PDF und erstellt Regeln:
```
Regel 1 (SWE.1.BP1): Jedes Software-Requirement muss eine eindeutige ID haben
→ CONSTRAINT: (r:Requirement {type: 'Software'}) MUST HAVE r.id IS NOT NULL

Regel 2 (SWE.1.BP3): Jedes Software-Requirement muss zu einem System-Requirement nachverfolgbar sein
→ CONSTRAINT: (sw:Requirement {type: 'Software'}) MUST HAVE path TO (sys:Requirement {type: 'System'})

Regel 3 (SWE.1.BP5): Konsistenz zwischen Anforderungen muss gewährleistet sein
→ CONSTRAINT: NO (r1:Requirement)-[:CONFLICTS_WITH]->(r2:Requirement) WHERE r1.status = 'approved'

3 Regeln aus A-SPICE extrahiert und gespeichert.
```

#### Claude-Befehl 2 (Validierung - WOW-Moment)
```
Validiere alle Bremssystem-Requirements gegen die A-SPICE Regeln.
Zeige Violations mit Kontext.
```

#### Erwartetes Ergebnis
```
VALIDIERUNG ABGESCHLOSSEN

Geprüft: 47 Requirements
Bestanden: 44 Requirements
Violations: 3 Requirements

VIOLATIONS:
1. REQ-BRK-017 "Temperaturbereich"
   - Regel: SWE.1.BP3 (Rückverfolgbarkeit)
   - Problem: Keine Verbindung zu System-Requirement
   - Empfehlung: Link zu SYS-BRK-001 oder SYS-ENV-003 erstellen

2. REQ-SEN-004 "Sensor-Kalibrierung"
   - Regel: SWE.1.BP5 (Konsistenz)
   - Problem: Konflikt mit REQ-SEN-002 (unterschiedliche Toleranzwerte)
   - Empfehlung: Werte abstimmen mit Sensorik-Team

3. REQ-BRK-023 "Notfall-Override"
   - Regel: SWE.1.BP1 (Eindeutige ID)
   - Problem: Duplikat-ID mit REQ-BRK-008
   - Empfehlung: ID korrigieren zu REQ-BRK-024
```

#### Talking Points

> "Das haben Sie gerade gesehen: Claude hat ein 200-Seiten PDF analysiert, die relevanten Regeln extrahiert und als ausführbare Constraints gespeichert. In unter einer Minute."

> "Und dann: Automatische Validierung. Keine manuelle Review-Checkliste mehr. Der Graph WEISS, welche Beziehungen fehlen."

> "Frage ans Publikum: Wie lange dauert bei Ihnen ein manuelles Requirements Review? Hier: Sekunden."

---

### Stufe 5: Compliance Score & Impact Analysis (11:00 - 17:00)

#### Aktion
Compliance-Score berechnen, dann Regel verschärfen.

#### Claude-Befehl 1 (Score anzeigen)
```
Berechne den A-SPICE Compliance Score für das Bremssystem.
Zeige den Score nach Prozess-Bereichen aufgeschlüsselt.
```

#### Erwartetes Ergebnis
```
A-SPICE COMPLIANCE SCORE: BREMSSYSTEM

Gesamt-Score: 87.2% (Ziel: 90%)

Nach Prozess-Bereich:
├── SWE.1 Requirements: 91% ████████████░
├── SWE.2 Architecture:  85% ████████████
├── SWE.3 Design:        88% ████████████░
├── SWE.4 Unit Test:     82% ████████████
└── SWE.6 Integration:   89% ████████████░

Kritische Lücken:
- SWE.4 Unit Test: 3 Requirements ohne verlinkte Tests
- SWE.1 Requirements: 3 Traceability-Violations (siehe oben)
```

#### Claude-Befehl 2 (Regel verschärfen)
```
Verschärfe die Traceability-Regel:
Jedes Requirement muss nicht nur zu einem System-Requirement verlinkt sein,
sondern auch zu mindestens einem Test-Case UND einem Review-Record.
```

#### Erwartetes Ergebnis (Score-Änderung - WOW-Moment)
```
REGEL AKTUALISIERT

Alte Regel (SWE.1.BP3):
  Requirement → System-Requirement ✓

Neue Regel (SWE.1.BP3 enhanced):
  Requirement → System-Requirement ✓
  Requirement → Test-Case ✓
  Requirement → Review-Record ✓

IMPACT:
Vorher: 44/47 Requirements compliant (93.6%)
Nachher: 31/47 Requirements compliant (66.0%)

Neue Violations: 13 Requirements
├── 8 ohne Test-Case-Link
└── 5 ohne Review-Record-Link

Score-Änderung: 87.2% → 71.4%
```

#### Talking Points

> "Mit EINER Regel-Änderung sehen wir sofort den Impact. Der Score fällt von 87% auf 71%. Das ist kein Bug - das ist Realität. Die strengere Regel zeigt Lücken auf, die vorher unsichtbar waren."

> "Stellen Sie sich vor: Ihr Kunde verschärft die Anforderungen im Audit. Sie können in Sekunden zeigen, welche Maßnahmen nötig sind."

---

#### Claude-Befehl 3 (Externe Abhängigkeit - HIGHLIGHT)
```
Simuliere folgende Änderung vom Fahrwerk-Team:
"CAN-Message 0x123 wird von 100ms auf 50ms Zykluszeit geändert"

Analysiere den Impact auf das Bremssystem.
```

#### Erwartetes Ergebnis (WOW-Moment)
```
IMPACT ANALYSE: CAN-Message 0x123 Änderung

Quelle: Fahrwerk-Team
Änderung: Zykluszeit 100ms → 50ms

BETROFFENE REQUIREMENTS IM BREMSSYSTEM:

1. REQ-BRK-002 "Druckaufbau < 150ms"
   Impact: KRITISCH
   Grund: Timing-Budget basiert auf 100ms CAN-Zyklus
   → Neue Berechnung erforderlich

2. REQ-SEN-001 "Raddrehzahl-Erfassung"
   Impact: MITTEL
   Grund: Sensor-Fusion nutzt CAN-Daten
   → Algorithmus-Anpassung prüfen

3. REQ-BRK-019 "Datenkonsistenz"
   Impact: NIEDRIG
   Grund: Buffer-Größe anpassen

ABHÄNGIGKEITSKETTE:
CAN-0x123 ←[uses]─ REQ-BRK-002 ←[derives]─ SYS-BRK-001 ←[satisfies]─ FMEA-Item-17

EMPFEHLUNG:
- Sofortige Abstimmung mit Fahrwerk-Team
- Timing-Review für REQ-BRK-002
- FMEA-Update erforderlich
```

#### Talking Points

> "Das ist der Moment, in dem es spannend wird. Eine Änderung vom Fahrwerk-Team - und wir sehen SOFORT, welche unserer Requirements betroffen sind."

> "Frage ans Publikum: Wusste Ihr Bremssystem-Team von dieser Änderung? In der Realität: Oft nein. Die Information geht unter in E-Mails, Meetings, Confluence-Seiten."

> "Mit dem Knowledge Graph: Automatische Benachrichtigung. Der Graph WEISS, dass diese Abhängigkeit existiert."

---

### Ausblick: Stufe 6-7 (18:00 - 20:00)

#### Aktion
Konzept-Folien zeigen (2-3 Slides).

#### Talking Points

> "Was Sie gesehen haben, ist Stufe 1-5. Das Fundament. Und jetzt der Ausblick:"

> "Stufe 6: Der Agent wird proaktiv. Er MERKT, wenn ein neues Requirement inkonsistent ist - BEVOR es committed wird. Wie ein Senior Engineer, der über die Schulter schaut."

> "Stufe 7: Der Agent schlägt Optimierungen vor. 'Diese 3 Requirements könnten zu einem konsolidiert werden.' 'Dieser Test deckt 4 Requirements ab - sehr effizient.' 'Hier fehlt ein Safety-Requirement laut ISO 26262.'"

> "Und das Beste: Die Regeln lernt das System aus IHREN Dokumenten. Ihre A-SPICE-Interpretation, Ihre OEM-Richtlinien, Ihre Best Practices."

---

## Exakte Claude-Befehle (Kurzreferenz)

| Minute | Befehl |
|--------|--------|
| 2:00 | `Durchsuche das OEM-Lastenheft nach allen Anforderungen zum Thema "Bremsdruck"` |
| 3:00 | `Welche A-SPICE Work Products sind erforderlich, um REQ-BRK-001 normkonform nachzuweisen?` |
| 5:00 | `Zeige die Requirement-Hierarchie für das Bremssystem im Neo4j Graph` |
| 7:00 | `Analysiere das A-SPICE PAM 3.1 PDF und extrahiere daraus Compliance-Regeln` |
| 9:00 | `Validiere alle Bremssystem-Requirements gegen die A-SPICE Regeln` |
| 11:00 | `Berechne den A-SPICE Compliance Score für das Bremssystem` |
| 13:00 | `Verschärfe die Traceability-Regel: Requirement → System + Test + Review` |
| 15:00 | `Simuliere CAN-Message 0x123 Änderung, analysiere Impact auf Bremssystem` |

---

## Wow-Momente (Timing beachten)

| Minute | Wow-Moment | Emotionale Wirkung |
|--------|------------|-------------------|
| 3:30 | RAG scheitert an Beziehungsfrage | "Aha, DAS ist das Problem" |
| 9:30 | Regel-Extraktion aus 200-Seiten-PDF in Sekunden | "Das spart Wochen!" |
| 14:00 | Score fällt von 87% auf 71% durch eine Regel | "So sieht Realität aus" |
| 16:00 | Externe Abhängigkeit zeigt Impact-Kette | "Wusste das Team davon?" |

---

## Troubleshooting

### Problem: Neo4j-Verbindung schlägt fehl

**Symptom:** "Kann nicht mit Neo4j verbinden"

**Lösung:**
```bash
# Container neu starten
docker restart neo4j-demo

# Logs prüfen
docker logs neo4j-demo

# Port-Konflikt prüfen
lsof -i :7474
lsof -i :7687
```

**Fallback:** Browser-Tab mit vorbereiteten Screenshots zeigen.

---

### Problem: MCP-Tool nicht verfügbar

**Symptom:** Claude sagt "Ich habe keinen Zugriff auf Neo4j"

**Lösung:**
1. Claude Desktop neu starten
2. Einstellungen > MCP > "neo4j" deaktivieren und aktivieren
3. `/mcp status` eingeben

**Fallback:** Cypher-Queries manuell im Neo4j Browser ausführen, Claude nur zur Erklärung nutzen.

---

### Problem: Langsame Antworten

**Symptom:** Claude braucht > 30 Sekunden

**Lösung:**
- Kürzere Queries verwenden
- `LIMIT 20` bei Graph-Visualisierungen

**Fallback:** "Das System verarbeitet gerade eine komplexe Anfrage - bei 10.000+ Requirements dauert das einen Moment."

---

### Problem: Unerwartete Ergebnisse

**Symptom:** Andere Zahlen als erwartet

**Lösung:**
- Ergebnisse als "Live-Demo, Daten können variieren" einordnen
- Auf das PRINZIP fokussieren, nicht auf exakte Zahlen

**Fallback:** "Die konkreten Werte hängen vom Datenstand ab - wichtig ist der PROZESS."

---

### Problem: Komplette Technik-Ausfälle

**Fallback-Plan:**
1. Vorbereitete Screenshots zeigen (im Ordner `demo-backup/`)
2. Konzept-Folien vortragen
3. "Live-Demo beim nächsten Termin, heute Konzept-Präsentation"

---

## Nach der Demo

### Q&A vorbereiten

**Häufige Fragen:**

1. **"Wie lange dauert die Einführung?"**
   > "Pilot in 4-6 Wochen mit einem Subsystem. Vollständiger Rollout je nach Scope 3-6 Monate."

2. **"Wer pflegt die Regeln?"**
   > "Initiale Extraktion automatisch. Anpassungen durch Quality-Team oder Requirements Engineers. Claude schlägt Updates vor."

3. **"Integration mit bestehenden Tools?"**
   > "APIs zu DOORS, Polarion, Jama. Export als ReqIF. Import aus Excel, Word, PDF."

4. **"Kosten?"**
   > "Individuelles Angebot nach Scope. ROI typischerweise im ersten Audit-Zyklus."

5. **"Datenschutz / On-Premise?"**
   > "Komplett On-Premise möglich. Keine Daten verlassen Ihr Netzwerk. Claude läuft lokal."

### Follow-up

- [ ] Demo-Recording teilen (falls aufgezeichnet)
- [ ] Kontaktdaten austauschen
- [ ] Termin für Deep-Dive oder Pilot-Gespräch anbieten

---

## Anhang: Demo-Daten Setup

### Minimale Testdaten für Neo4j

```cypher
// System-Requirement
CREATE (sys:Requirement {
  id: 'SYS-BRK-001',
  title: 'Autonome Notbremsung',
  type: 'System',
  level: 'System',
  domain: 'Brake',
  status: 'approved'
})

// Subsystem-Requirements
CREATE (sub1:Requirement {
  id: 'SUB-BRK-001',
  title: 'Bremsdruckmodulation',
  type: 'Subsystem',
  level: 'Subsystem',
  domain: 'Brake',
  status: 'approved'
})

// Component-Requirements
CREATE (comp1:Requirement {
  id: 'REQ-BRK-001',
  title: 'Max. Bremsdruck 180 bar',
  type: 'Software',
  level: 'Component',
  domain: 'Brake',
  status: 'approved'
})

CREATE (comp2:Requirement {
  id: 'REQ-BRK-002',
  title: 'Druckaufbau < 150ms',
  type: 'Software',
  level: 'Component',
  domain: 'Brake',
  status: 'approved'
})

// Beziehungen
MATCH (sys:Requirement {id: 'SYS-BRK-001'})
MATCH (sub1:Requirement {id: 'SUB-BRK-001'})
MATCH (comp1:Requirement {id: 'REQ-BRK-001'})
MATCH (comp2:Requirement {id: 'REQ-BRK-002'})
CREATE (sys)-[:DERIVES_TO]->(sub1)
CREATE (sub1)-[:DERIVES_TO]->(comp1)
CREATE (sub1)-[:DERIVES_TO]->(comp2)

// CAN-Interface (für Impact-Analyse)
CREATE (can:Interface {
  id: 'CAN-0x123',
  type: 'CAN-Message',
  cycle_time: '100ms',
  source: 'Fahrwerk'
})

MATCH (comp2:Requirement {id: 'REQ-BRK-002'})
MATCH (can:Interface {id: 'CAN-0x123'})
CREATE (comp2)-[:USES]->(can)
```

---

**Erstellt:** 2025-01-13
**Autor:** andreas@siglochconsulting.de
**Version:** 1.0
