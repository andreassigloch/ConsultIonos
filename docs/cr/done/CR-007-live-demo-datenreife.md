# CR-007: Live-Demo "Requirements Traceability"

## Ziel
Interaktive Demo für Kundenpräsentationen in **Claude Desktop**. Thema: Requirements-Management und Impact-Analyse im Systems Engineering. Kunde sieht Graph in Neo4j Browser.

## Business Value
- Kernthema Systems Engineering - direkt relevant für Zielkunden
- Zeigt A-SPICE / ISO 26262 / MDR Compliance-Potenzial
- Keine eigene UI nötig - Claude Desktop IST das Interface
- Wiederverwendbar für Workshops, Messen, Website-Video

## Die 7 Stufen der Datenreife (Übersicht)

| Stufe | Name | Business Value | AI-Ops | Demo |
|-------|------|----------------|--------|------|
| 1 | Unstrukturierte Quellen | 0% | 0% | PDF zeigen |
| 2 | Embeddings/RAG | 10-20% | 10% | RAG-Suche, Grenze zeigen |
| 3 | Ontologie + Graph | 30-40% | 5% | Neo4j Visualisierung |
| 4 | Logische Regeln | 50-60% | 0% | Regeln aus PDFs extrahieren |
| **5** | **Quantifizierbare Scores** ★ | **70-80%** | **5%** | **Score, Live-Edit, Impact** |
| 6 | Data Prediction | 85-90% | 20% | Ausblick-Folie |
| 7+ | Lernende Systeme | 90-100% | 40-60% | Ausblick-Folie |

**Kernbotschaft:** 70-80% des Business Value kommt aus Struktur und Regeln (Stufe 3-5) – nicht aus KI.

## Scope

### Must Have
- [x] Neo4j MCP-Server (Cypher-Queries + Regeln) ✅
- [x] Neo4j Docker mit Seed-Daten (Automotive Außenlicht) ✅
- [x] Regeln als Graph-Knoten (live editierbar via MCP) ✅
- [x] Demo-Script für Claude Desktop ✅

### Nice to Have
- [x] RAG-Vergleich vorschalten (PDF → "nur Text") ✅ (Demo-PDFs erstellt)
- [ ] Export als Video für Website

## Technische Architektur

```
┌────────────────────────────────────────────────────────────┐
│                   Claude Desktop                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Chat: "Zeige alle Requirements ohne Test"            │  │
│  │       "Was ist betroffen wenn REQ-005 sich ändert?"  │  │
│  │       "Füge Regel hinzu: Jedes Req braucht Review"   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│                    ┌─────────────┐                          │
│                    │  Neo4j MCP  │                          │
│                    │  Server     │                          │
│                    └─────────────┘                          │
│                           │                                 │
└───────────────────────────│─────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────┐
│                Neo4j Docker (localhost:7474)               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  StakeholderReq ──traced_to→ SystemReq              │  │
│  │       │                          │                   │  │
│  │       │                          ▼                   │  │
│  │       │              SoftwareReq ──verified_by→ Test │  │
│  │       │                          │                   │  │
│  │       └──────────────────────────┼→ Regel (SHACL)   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  Neo4j Browser: Traceability-Graph für Publikum           │
└───────────────────────────────────────────────────────────┘
```

## Komponenten

| Komponente | Beschreibung | Stufe | Aufwand |
|------------|--------------|-------|---------|
| `demo-pdfs/` | 4 PDFs: Lastenheft, A-SPICE, ISO 26262, CAN-Spec | 1-2 | 3h |
| `neo4j-mcp/` | MCP-Server für Neo4j (Query + Regel-CRUD + Impact) | 3-5 | 6h |
| `docker-compose.yml` | Neo4j Container Setup | 3 | 1h |
| `seed-data.cypher` | Requirements + Tests + **externe Abhängigkeiten** | 3 | 2h |
| `ausblick-folien/` | Konzept-Folien für Stufe 6-7 | 6-7 | 1h |
| `demo-script.md` | Ablauf-Script für Claude Desktop | - | 2h |
| **Gesamt** | | | **~15h** |

**Wichtig:**
- Regeln werden NICHT vorinstalliert - Claude erstellt sie live aus den Standard-PDFs!
- Externe Abhängigkeiten (CAN-Spec) sind im Graph - das ist der "blinde Fleck" Moment

## Datenmodell (Ontologie)

```cypher
// Requirement-Hierarchie (V-Modell / A-SPICE)
(:StakeholderReq {id, titel, beschreibung, prioritaet, status})
(:SystemReq {id, titel, beschreibung, asil, status})
(:SoftwareReq {id, titel, beschreibung, status})
(:HardwareReq {id, titel, beschreibung, status})

// Verifikation
(:TestCase {id, titel, typ, status, ergebnis})
(:ReviewRecord {id, datum, reviewer, status})

// Architektur
(:Komponente {id, name, typ})

// Regeln als Knoten (SHACL-inspiriert)
(:Regel {id, name, typ, cypher, schwere, aktiv, standard})

// Beziehungen (Traceability)
(str:StakeholderReq)-[:TRACED_TO]->(syr:SystemReq)
(syr:SystemReq)-[:TRACED_TO]->(swr:SoftwareReq)
(swr:SoftwareReq)-[:VERIFIED_BY]->(tc:TestCase)
(swr:SoftwareReq)-[:IMPLEMENTED_IN]->(k:Komponente)
(syr:SystemReq)-[:REVIEWED_BY]->(rr:ReviewRecord)
```

## Regeln als Graph-Knoten

```cypher
// A-SPICE / ISO 26262 Regeln (vorinstalliert)
CREATE (:Regel {
  id: 'R001',
  name: 'Traceability: System → Stakeholder',
  typ: 'traceability',
  cypher: 'MATCH (syr:SystemReq) WHERE NOT (syr)<-[:TRACED_TO]-(:StakeholderReq) RETURN syr',
  schwere: 'fehler',
  aktiv: true,
  standard: 'A-SPICE SYS.2'
})

CREATE (:Regel {
  id: 'R002',
  name: 'Verifikation: Software-Req braucht Test',
  typ: 'verifikation',
  cypher: 'MATCH (swr:SoftwareReq) WHERE NOT (swr)-[:VERIFIED_BY]->(:TestCase) RETURN swr',
  schwere: 'fehler',
  aktiv: true,
  standard: 'A-SPICE SWE.4'
})

CREATE (:Regel {
  id: 'R003',
  name: 'ASIL-Anforderungen brauchen Review',
  typ: 'review',
  cypher: 'MATCH (syr:SystemReq) WHERE syr.asil IS NOT NULL AND NOT (syr)-[:REVIEWED_BY]->(:ReviewRecord) RETURN syr',
  schwere: 'fehler',
  aktiv: true,
  standard: 'ISO 26262-8'
})

// Diese fügt Kunde live hinzu via MCP:
// "Füge Regel hinzu: Jede Komponente braucht mindestens ein Requirement"
CREATE (:Regel {
  id: 'R004',
  name: 'Komponente braucht Requirement',
  typ: 'vollstaendigkeit',
  cypher: 'MATCH (k:Komponente) WHERE NOT (:SoftwareReq)-[:IMPLEMENTED_IN]->(k) RETURN k',
  schwere: 'warnung',
  aktiv: true,
  standard: 'intern'
})
```

## MCP-Server Tools

```typescript
// neo4j-mcp/tools.ts
tools: [
  {
    name: "query",
    description: "Führe Cypher-Query aus (Read-Only)",
    // Traversierungen, Aggregationen, Impact-Analyse
  },
  {
    name: "impact_analysis",
    description: "Zeige alle betroffenen Elemente wenn Requirement sich ändert",
    // Rekursive Traversierung downstream
  },
  {
    name: "validate",
    description: "Prüfe alle aktiven Regeln, zeige Verstöße",
    // Führt alle Regel-Cypher aus, sammelt Ergebnisse
  },
  {
    name: "add_rule",
    description: "Füge neue Validierungsregel hinzu",
    // CREATE (:Regel {...})
  },
  {
    name: "toggle_rule",
    description: "Aktiviere/Deaktiviere Regel",
    // SET r.aktiv = true/false
  },
  {
    name: "compliance_score",
    description: "Berechne Compliance-Score pro Standard (A-SPICE, ISO 26262)",
    // Aggregation über alle Requirements
  }
]
```

## Demo-Ablauf (10-15 Min)

| Zeit | Im Claude Desktop Chat | Neo4j Browser zeigt |
|------|------------------------|---------------------|
| 0:00 | "Zeige mir die Requirement-Hierarchie" | V-Modell Graph |
| 2:00 | "Welche A-SPICE Regeln gibt es?" | Regel-Knoten mit Standard |
| 3:00 | "Prüfe Traceability" | → 2 Lücken gefunden |
| 5:00 | "Zeige Compliance-Score" | A-SPICE: 75%, ISO: 60% |
| 7:00 | **"Was ist betroffen wenn SYS-REQ-003 sich ändert?"** | Impact-Pfade leuchten auf |
| 9:00 | **"Füge Regel hinzu: Jede Komponente braucht Requirement"** | Neuer Regel-Knoten |
| 11:00 | "Prüfe alle Regeln" | → 1 neue Warnung |
| 13:00 | "Welche Requirements haben ASIL-D aber keinen Test?" | Kritische Lücken |
| 15:00 | Diskussion | Transfer auf Kundenkontext |

## Abnahmekriterien

- [x] Neo4j startet mit `docker-compose up` ✅
- [x] MCP-Server verbindet zu Neo4j ✅
- [x] Claude Desktop kann alle 6 Tools nutzen ✅
- [x] Regel hinzufügen → sofort in Neo4j Browser sichtbar ✅
- [x] Score ändert sich nach neuer Regel ✅
- [x] Demo läuft offline (kein Internet nötig außer Claude API) ✅

## Entwicklungs-Testplan

**Prinzip:** Jedes Tool wird sofort nach Implementierung in Claude Desktop getestet.

| Schritt | Implementieren | Testen in Claude Desktop | Verifizieren in Neo4j |
|---------|----------------|--------------------------|----------------------|
| 1 | Docker + Seed | - | `MATCH (n) RETURN count(n)` → >20 Knoten |
| 2 | MCP connect | "Teste Verbindung" | Server-Log zeigt Connection |
| 3 | `query` Tool | "Zeige alle SystemReqs" | Ergebnis = 7 Requirements |
| 4 | `validate` Tool | "Prüfe alle Regeln" | SW-003 ohne Test gefunden |
| 5 | `add_rule` Tool | "Füge Regel hinzu: ..." | Neuer `:Regel` Knoten sichtbar |
| 6 | `compliance_score` | "Zeige Score" | A-SPICE ~85%, ISO ~71% |
| 7 | `impact_analysis` | "Was wenn SYS-003 ändert?" | Pfad zu SW-002, TC-003 |
| 8 | Externe Deps | "Wer hängt von EXT-001 ab?" | SYS-003, SW-002 gefunden |

**Abnahme = Demo-Durchlauf:**
Der 20-Min-Ablauf komplett durchspielen. Alle 5 Wow-Momente müssen funktionieren.

## Pre-Demo Checkliste

```
□ docker-compose up -d
□ Neo4j Browser: localhost:7474 erreichbar
□ Claude Desktop: MCP-Server "neo4j" grün
□ Schnelltest: "Zeige alle Requirements" → Liste erscheint
□ Neo4j Browser auf zweitem Monitor bereit
□ Demo-PDFs griffbereit (4 Stück)
```

## Risiken

| Risiko | Mitigation |
|--------|------------|
| Neo4j startet nicht | Docker-Compose mit Health-Check, Anleitung |
| MCP-Verbindung instabil | Reconnect-Logic, Fallback: Cypher in Browser |
| Claude generiert falsches Cypher | Tools sind vordefiniert, kein freies Cypher |

## Abhängigkeiten

- Neo4j Community Edition (Docker)
- Claude Desktop mit MCP-Support
- Node.js für MCP-Server

## Zeitplan

| Phase | Aufgabe | Status |
|-------|---------|--------|
| 1 | Neo4j Docker + Seed-Daten | ✅ |
| 2 | MCP-Server Grundgerüst | ✅ |
| 3 | Tools implementieren | ✅ |
| 4 | Demo-Script + Probelauf | ✅ |

## Implementierung

**Pfad:** `demo-requirements-traceability/`

**Erstellte Komponenten:**
- `docker-compose.yml` - Neo4j 5 Community Container
- `seed-data.cypher` - 26 Knoten, 30+ Beziehungen (Automotive Außenlicht)
- `neo4j-mcp/` - MCP-Server mit 6 Tools (TypeScript)
- `demo-pdfs/` - 4 Demo-Dokumente (Lastenheft, A-SPICE, ISO 26262, CAN-Spec)
- `demo-script.md` - 20-Min Demo-Ablauf mit Talking Points
- `ausblick-folien/` - Konzept-Folien für Stufe 6-7
- `start-demo.sh` - Ein-Klick-Startup

---

## Konkretes Beispiel: Automotive Außenlicht

### Warum Außenlicht?
- Jeder Autofahrer versteht: Blinker, Bremslicht, Scheinwerfer
- Klare Sicherheitsrelevanz (ASIL-Einstufung)
- Überschaubare Komplexität für Demo

### Stakeholder Requirements (Kundensicht)

| ID | Requirement | Priorität |
|----|-------------|-----------|
| STK-001 | Fahrer muss Abbiegeabsicht signalisieren können | Muss |
| STK-002 | Nachfolgende Fahrzeuge müssen Bremsvorgang erkennen | Muss |
| STK-003 | Fahrzeug muss bei Dunkelheit Fahrbahn ausleuchten | Muss |
| STK-004 | Fahrer muss Warnblinker bei Panne aktivieren können | Muss |

### System Requirements (Technische Ableitung)

| ID | Requirement | ASIL | Traced to |
|----|-------------|------|-----------|
| SYS-001 | Blinkanlage muss innerhalb 100ms nach Hebelbetätigung aktiv sein | B | STK-001 |
| SYS-002 | Blinkfrequenz: 1.5 Hz ± 0.5 Hz (ECE R6) | B | STK-001 |
| SYS-003 | Bremslicht muss bei Pedaldruck >5N innerhalb 50ms leuchten | C | STK-002 |
| SYS-004 | Bremslichtintensität: 80-300 cd (ECE R7) | B | STK-002 |
| SYS-005 | Abblendlicht muss Ausleuchtung 40m gewährleisten | B | STK-003 |
| SYS-006 | Warnblinker muss alle Blinker synchron aktivieren | B | STK-004 |
| SYS-007 | Warnblinker muss auch bei Zündung AUS funktionieren | C | STK-004 |

### Software Requirements

| ID | Requirement | Traced to |
|----|-------------|-----------|
| SW-001 | Blinkertimer: 333ms ON, 333ms OFF | SYS-002 |
| SW-002 | Bremslicht-Schwellwert konfigurierbar (5-15N) | SYS-003 |
| SW-003 | Warnblinker überschreibt Einzelblinker | SYS-006 |
| SW-004 | Batterie-Watchdog für Warnblinker | SYS-007 |

### Test Cases

| ID | Test | Typ | Verified |
|----|------|-----|----------|
| TC-001 | Blinkerhebel → Licht an in <100ms | Timing | SW-001 |
| TC-002 | Frequenzmessung 1.5Hz ± 0.5Hz | Messung | SW-001 |
| TC-003 | Bremspedal 5N → Licht an in <50ms | Timing | SW-002 |
| TC-004 | Warnblinker bei Motor aus | Funktional | SW-004 |
| TC-005 | ??? | ??? | SW-003 |

### Komponenten

| ID | Name | Typ |
|----|------|-----|
| K-001 | LightController ECU | Hardware |
| K-002 | BlinkerModule | Software |
| K-003 | BrakeLightModule | Software |
| K-004 | HazardLightModule | Software |

### Externe Abhängigkeit: CAN-Bus Spezifikation (anderes Team!)

**Das Problem:** Das Außenlicht-Team weiß nicht, dass ihr Bremslicht von einer CAN-Message abhängt, die ein anderes Team definiert hat.

| ID | Requirement | Quelle | Betrifft |
|----|-------------|--------|----------|
| **EXT-001** | CAN-Message 0x123 "BrakePedalForce" liefert Pedalkraft in 0.1N Auflösung | Fahrwerk-Team | SYS-003, SW-002 |
| **EXT-002** | CAN-Bus Zykluszeit max. 10ms | Plattform-Team | SYS-003 (50ms Reaktion) |
| **EXT-003** | Bei CAN-Timeout >100ms: Fail-Safe aktivieren | Safety-Team | SW-002 |

**Warum kritisch:**
- EXT-001 ändert sich von 0.1N auf 0.5N Auflösung → SW-002 Schwellwert funktioniert nicht mehr!
- EXT-002 wird auf 20ms erhöht → SYS-003 (50ms Reaktion) kann nicht mehr eingehalten werden
- Das Außenlicht-Team erfährt davon... nie? Per Zufall? Beim Integrationstest?

**Im Graph:**
```cypher
// Externe Input-Spezifikation (anderes Team)
(:InputSpec {id: 'EXT-001', titel: 'CAN BrakePedalForce',
             quelle: 'Fahrwerk-Team', version: '2.3'})
(:InputSpec {id: 'EXT-002', titel: 'CAN Zykluszeit',
             quelle: 'Plattform-Team', version: '1.1'})
(:InputSpec {id: 'EXT-003', titel: 'CAN Timeout Handling',
             quelle: 'Safety-Team', version: '4.0'})

// Abhängigkeiten (DAS ist der blinde Fleck!)
(sys3:SystemReq)-[:DEPENDS_ON]->(ext1:InputSpec)
(sys3:SystemReq)-[:DEPENDS_ON]->(ext2:InputSpec)
(sw2:SoftwareReq)-[:DEPENDS_ON]->(ext1:InputSpec)
(sw2:SoftwareReq)-[:DEPENDS_ON]->(ext3:InputSpec)
```

### Demo-Story: Die 7 Stufen live erleben

#### Stufe 1: Unstrukturierte Quellen | Business Value: 0% | AI-Ops: 0%
> **Zeigen:** PDF-Lastenheft "Außenlichtsystem_v3_final_FINAL.pdf"
> "So sieht es heute aus - Dokumente auf dem Laufwerk, Suche per Ctrl+F"

*Generiertes Demo-PDF enthält die Stakeholder-Requirements als Fließtext*

#### Stufe 2: Embeddings/RAG | Business Value: 10-20% | AI-Ops: 10%
> **Claude:** "Finde alle Anforderungen zum Bremslicht im PDF"
> → RAG findet Textstellen, aber: "Welche Tests gehören dazu?" → ???

*Zeigt Grenze von reiner Textsuche*

#### Stufe 3: Ontologie + Graph | Business Value: 30-40% | AI-Ops: 5%
> **Neo4j Browser:** Requirement-Hierarchie visualisieren
> "Jetzt sehen wir Zusammenhänge: STK-002 → SYS-003 → SW-002 → TC-003"

*Umschalten von PDF auf Graph - der "Aha-Moment"*

#### Stufe 4: Logische Regeln | Business Value: 50-60% | AI-Ops: 0%
> **Claude:** "Prüfe alle Regeln"
> → SW-003 (Warnblinker Override) hat keinen Test!
> → Automatische Validierung statt manuelle Checklisten

#### Stufe 5: Quantifizierbare Scores ★ | Business Value: 70-80% | AI-Ops: 5%
> **Claude:** "Zeige Compliance-Score"
> → A-SPICE: 85%, ISO 26262: 71%
> **Live-Edit:** "Füge Regel hinzu: ASIL-C braucht zwei Tests"
> → Score sinkt auf 65% - Effekt sofort sichtbar

*Das Fundament - hier endet die Demo für die meisten Kunden*

---

#### Stufe 6: Prediction (Ausblick) | Business Value: 85-90% | AI-Ops: 20%
> **Claude:** "Welche Requirements haben historisch die meisten Änderungen?"
> → GNN analysiert Änderungshistorie, sagt Risiko-Hotspots voraus
> "SYS-003 hat 73% Wahrscheinlichkeit für Änderung in nächsten 2 Sprints"

*Nur als Konzept/Mockup zeigen - nicht live implementiert*

#### Stufe 7+: Lernende Systeme (Vision) | Business Value: 90-100% | AI-Ops: 40-60%
> **Konzept-Folie:** "Was wäre wenn..."
> - System lernt aus Review-Feedback: "Diese Formulierung führt oft zu Rückfragen"
> - Automatische Vorschläge: "Ähnliches Requirement in Projekt X war so formuliert..."
> - Föderiertes Lernen über Projekte hinweg (ohne Daten zu teilen)

*Nicht implementiert - zeigt wohin die Reise geht*

---

### Demo-Ablauf mit Stufen (15 Min)

| Zeit | Stufe | Business Value | AI-Ops | Aktion | Was passiert |
|------|-------|----------------|--------|--------|--------------|
| 0:00 | 1 | 0% | 0% | PDF öffnen | "So sieht Ihr Alltag aus" |
| 2:00 | 2 | 10-20% | 10% | RAG-Suche im PDF | Findet Text, aber keine Zusammenhänge |
| 4:00 | 3 | 30-40% | 5% | Neo4j Graph zeigen | Traceability sichtbar |
| 6:00 | 4 | 50-60% | 0% | "Prüfe Regeln" | Lücke gefunden: SW-003 ohne Test |
| 8:00 | 5 ★ | 70-80% | 5% | "Zeige Score" | A-SPICE 85% |
| 10:00 | 5 ★ | 70-80% | 5% | **Regel hinzufügen** | Score sinkt auf 65% |
| 12:00 | 5 ★ | 70-80% | 5% | Impact-Analyse | "Was wenn SYS-003 sich ändert?" |
| 14:00 | 6-7 | 85-100% | 20-60% | Ausblick-Folie | Prediction & Learning als Vision |
| 15:00 | - | - | - | Diskussion | Transfer auf Kundenkontext |

### Demo-PDFs (3 Dokumente)

#### PDF 1: Lastenheft Außenlichtsystem (Projektdaten)
```markdown
# Lastenheft: Außenlichtsystem
## Version 3.2 - FREIGEGEBEN

### 1. Einleitung
Dieses Dokument beschreibt die Anforderungen an das Außenlichtsystem...

### 2. Stakeholder-Anforderungen

**STK-001:** Der Fahrer muss seine Abbiegeabsicht den anderen
Verkehrsteilnehmern signalisieren können.

**STK-002:** Nachfolgende Fahrzeuge müssen einen Bremsvorgang
des vorausfahrenden Fahrzeugs erkennen können.

[... weitere Requirements als Fließtext ...]

### 3. Technische Anforderungen
Die Blinkanlage muss innerhalb von 100ms nach Betätigung des
Blinkerhebels aktiv sein (siehe ECE R6). Die Blinkfrequenz
beträgt 1.5 Hz mit einer Toleranz von ±0.5 Hz...
```

#### PDF 2: A-SPICE 4.0 Auszug (Traceability-Regeln)
```markdown
# Automotive SPICE® 4.0 - Auszug

## SYS.2 System Requirements Analysis

### BP5: Ensure bidirectional traceability
Bidirectional traceability shall be established between
stakeholder requirements and system requirements.

**Compliance Criteria:**
- Each system requirement traces to ≥1 stakeholder requirement
- No orphan system requirements allowed
- Traceability matrix shall be maintained

---

## SWE.4 Software Unit Verification

### BP3: Verify software units
Each software unit shall be verified against its requirements.

**Compliance Criteria:**
- Each software requirement has ≥1 associated test case
- Test coverage shall be documented
- Test results shall be recorded
```

#### PDF 3: ISO 26262-8 Auszug (ASIL-Regeln)
```markdown
# ISO 26262-8:2018 - Auszug

## 6.4.2 Requirements for ASIL C/D

### 6.4.2.3 Review Requirements
For safety requirements with ASIL C or D classification:
- Independent review shall be performed
- Review records shall be maintained
- Reviewer shall not be the author

### 6.4.2.5 Verification Requirements
For ASIL C requirements:
- Minimum 2 independent verification methods recommended
For ASIL D requirements:
- Minimum 2 independent verification methods required
```

#### PDF 4: CAN-Bus Interface Spezifikation (Fahrwerk-Team)
```markdown
# CAN-Bus Interface Specification
## Chassis Domain - Version 2.3
### Erstellt von: Fahrwerk-Team

## Message Catalog

### 0x123 - BrakePedalForce
| Signal | Bits | Range | Resolution | Unit |
|--------|------|-------|------------|------|
| PedalForce | 0-15 | 0-1000 | 0.1 | N |
| ValidFlag | 16 | 0-1 | - | bool |

**Cycle Time:** 10ms
**Timeout:** 100ms → Fail-Safe aktivieren

### Änderungshistorie
| Version | Datum | Änderung |
|---------|-------|----------|
| 2.3 | 2024-01 | Resolution von 0.1N auf 0.5N geändert |
| 2.2 | 2023-06 | Cycle Time von 20ms auf 10ms reduziert |
| 2.1 | 2023-01 | Initial |

**ACHTUNG:** Abhängige Systeme bei Änderungen informieren!
(Aber wer sind die abhängigen Systeme...?)
```

**Der Clou:** Das PDF sagt "Abhängige Systeme informieren" - aber niemand weiß, wer das ist. Der Graph weiß es.

---

### Demo-Story: Die 7 Stufen live erleben (erweitert)

#### Stufe 1: Unstrukturierte Quellen | Business Value: 0% | AI-Ops: 0%
> **Zeigen:** 3 PDFs nebeneinander
> - Lastenheft_Aussenlicht_v3_FINAL.pdf
> - A-SPICE_4.0_Auszug.pdf
> - ISO_26262-8_Auszug.pdf
>
> "So sieht es heute aus - Dokumente auf dem Laufwerk, Suche per Ctrl+F"

#### Stufe 2: Embeddings/RAG | Business Value: 10-20% | AI-Ops: 10%
> **Claude:** "Finde alle Anforderungen zum Bremslicht im Lastenheft"
> → RAG findet Textstellen
>
> **Claude:** "Welche A-SPICE Regeln gelten für Traceability?"
> → RAG findet Textstellen im Standard-PDF
>
> **Aber:** "Erfüllt unser Lastenheft die A-SPICE Regeln?" → ???
> *Zeigt Grenze: RAG kann keine Dokumente verknüpfen*

#### Stufe 3: Ontologie + Graph | Business Value: 30-40% | AI-Ops: 5%
> **Neo4j Browser:** Requirement-Hierarchie visualisieren
> "Jetzt sehen wir Zusammenhänge: STK-002 → SYS-003 → SW-002 → TC-003"

#### Stufe 4: Logische Regeln | Business Value: 50-60% | AI-Ops: 0%
**Claude erstellt Regeln aus PDFs!**
> **Claude:** "Lies die A-SPICE und ISO 26262 PDFs und erstelle Validierungsregeln"
>
> → Claude extrahiert:
> - "Jedes SystemReq braucht Trace zu StakeholderReq" (A-SPICE SYS.2 BP5)
> - "Jedes SoftwareReq braucht Test" (A-SPICE SWE.4 BP3)
> - "ASIL-C/D Requirements brauchen Review" (ISO 26262-8 6.4.2.3)
>
> **Live:** "Füge diese Regeln zum Graph hinzu"
> → Regeln werden als Knoten erstellt

#### Stufe 4b: Validierung | Business Value: 50-60% | AI-Ops: 0%
> **Claude:** "Prüfe alle Regeln"
> → SW-003 (Warnblinker Override) hat keinen Test!
> → Automatische Validierung statt manuelle Checklisten

#### Stufe 5: Quantifizierbare Scores ★ | Business Value: 70-80% | AI-Ops: 5%
> **Claude:** "Zeige Compliance-Score"
> → A-SPICE: 85%, ISO 26262: 71%
>
> **Live-Edit:** "Die ISO sagt ASIL-C braucht 2 Tests - füge diese Regel hinzu"
> → Claude liest ISO-PDF erneut, erstellt strengere Regel
> → Score sinkt auf 65% - Effekt sofort sichtbar

*Das Fundament - hier endet die Demo für die meisten Kunden*

---

#### Stufe 6: Prediction (Ausblick) | Business Value: 85-90% | AI-Ops: 20%
> **Claude:** "Welche Requirements haben historisch die meisten Änderungen?"
> → GNN analysiert Änderungshistorie, sagt Risiko-Hotspots voraus
> "SYS-003 hat 73% Wahrscheinlichkeit für Änderung in nächsten 2 Sprints"

*Nur als Konzept/Mockup zeigen - nicht live implementiert*

#### Stufe 7+: Lernende Systeme (Vision) | Business Value: 90-100% | AI-Ops: 40-60%
> **Konzept-Folie:** "Was wäre wenn..."
> - System lernt aus Review-Feedback: "Diese Formulierung führt oft zu Rückfragen"
> - Automatische Vorschläge: "Ähnliches Requirement in Projekt X war so formuliert..."
> - Föderiertes Lernen über Projekte hinweg (ohne Daten zu teilen)

*Nicht implementiert - zeigt wohin die Reise geht*

---

### Demo-Ablauf mit Stufen (20 Min)

| Zeit | Stufe | Business Value | AI-Ops | Aktion | Was passiert |
|------|-------|----------------|--------|--------|--------------|
| 0:00 | 1 | 0% | 0% | 4 PDFs zeigen | "So sieht Ihr Alltag aus" (+ CAN-Spec vom Fahrwerk) |
| 2:00 | 2 | 10-20% | 10% | RAG-Suche: "Bremslicht" | Findet Text im Lastenheft |
| 3:00 | 2 | 10-20% | 10% | RAG-Suche: "A-SPICE Traceability" | Findet Text im Standard |
| 4:00 | 2 | 10-20% | 10% | "Erfüllen wir A-SPICE?" | **RAG scheitert** - keine Verknüpfung |
| 5:00 | 3 | 30-40% | 5% | Neo4j Graph zeigen | Traceability sichtbar |
| 7:00 | 4 | 50-60% | 0% | **"Erstelle Regeln aus A-SPICE PDF"** | Claude extrahiert Regeln |
| 9:00 | 4 | 50-60% | 0% | "Prüfe Regeln" | Lücke gefunden: SW-003 ohne Test |
| 11:00 | 5 ★ | 70-80% | 5% | "Zeige Score" | A-SPICE 85% |
| 13:00 | 5 ★ | 70-80% | 5% | **"ISO sagt 2 Tests für ASIL-C"** | Claude liest ISO, verschärft Regel |
| 15:00 | 5 ★ | 70-80% | 5% | Score neu berechnen | Sinkt auf 65% |
| 16:00 | 5 ★ | 70-80% | 5% | **"Fahrwerk ändert CAN-Message"** | **Cross-Team Impact!** SYS-003, SW-002 |
| 17:00 | 5 ★ | 70-80% | 5% | "Wusste das Außenlicht-Team davon?" | Stille. DAS ist der Punkt. |
| 18:00 | 6-7 | 85-100% | 20-60% | Ausblick-Folie | Prediction & Learning als Vision |
| 20:00 | - | - | - | Diskussion | Transfer auf Kundenkontext |

---

### Wow-Momente der Demo

1. **RAG-Grenze (Min 4):** "Erfüllen wir A-SPICE?" → Stille. Keine Antwort möglich.

2. **Regel-Extraktion (Min 7):** Claude liest Standard-PDF und generiert executable Regeln - kein manuelles Abtippen.

3. **Live-Verschärfung (Min 13):** "Die ISO sagt..." → Claude findet Stelle, passt Regel an, Score sinkt sofort.

4. **Externe Abhängigkeit (Min 16):** "Wer ist betroffen wenn das Fahrwerk-Team die CAN-Message ändert?"
   → Graph zeigt: SYS-003 und SW-002 im Außenlicht-System!
   → "Wusste das Außenlicht-Team davon?" → Stille im Raum.

5. **Der Kreis schließt sich:** PDF-Standards → Graph-Regeln → Validierung → Score → Cross-Team Impact

#### Ausblick-Folie (Stufe 6-7)
```
┌─────────────────────────────────────────────────────────┐
│  AUSBLICK: Was nach dem Fundament kommt                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Stufe 6: Prediction                                    │
│  ├─ Änderungsrisiko pro Requirement                     │
│  ├─ "SYS-003 wird wahrscheinlich angepasst"            │
│  └─ Proaktive Warnungen statt Reaktion                 │
│                                                         │
│  Stufe 7: Lernende Systeme                             │
│  ├─ Feedback-Loops aus Reviews                         │
│  ├─ "Bessere Formulierung basierend auf Erfahrung"     │
│  └─ Wissen über Projekte hinweg nutzen                 │
│                                                         │
│  ➜ Heute: Fundament legen (Stufe 3-5)                  │
│  ➜ Morgen: Darauf aufbauen (Stufe 6-7)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Seed-Daten (Cypher)

```cypher
// Stakeholder Requirements
CREATE (stk1:StakeholderReq {id: 'STK-001', titel: 'Abbiegeabsicht signalisieren', prioritaet: 'Muss'})
CREATE (stk2:StakeholderReq {id: 'STK-002', titel: 'Bremsvorgang erkennbar', prioritaet: 'Muss'})
CREATE (stk3:StakeholderReq {id: 'STK-003', titel: 'Fahrbahn ausleuchten', prioritaet: 'Muss'})
CREATE (stk4:StakeholderReq {id: 'STK-004', titel: 'Warnblinker bei Panne', prioritaet: 'Muss'})

// System Requirements
CREATE (sys1:SystemReq {id: 'SYS-001', titel: 'Blinker <100ms Reaktion', asil: 'B'})
CREATE (sys2:SystemReq {id: 'SYS-002', titel: 'Blinkfrequenz 1.5Hz', asil: 'B'})
CREATE (sys3:SystemReq {id: 'SYS-003', titel: 'Bremslicht <50ms', asil: 'C'})
CREATE (sys4:SystemReq {id: 'SYS-004', titel: 'Bremslicht 80-300cd', asil: 'B'})
CREATE (sys5:SystemReq {id: 'SYS-005', titel: 'Abblendlicht 40m', asil: 'B'})
CREATE (sys6:SystemReq {id: 'SYS-006', titel: 'Warnblinker synchron', asil: 'B'})
CREATE (sys7:SystemReq {id: 'SYS-007', titel: 'Warnblinker ohne Zündung', asil: 'C'})

// Software Requirements
CREATE (sw1:SoftwareReq {id: 'SW-001', titel: 'Blinkertimer 333ms'})
CREATE (sw2:SoftwareReq {id: 'SW-002', titel: 'Bremslicht-Schwellwert'})
CREATE (sw3:SoftwareReq {id: 'SW-003', titel: 'Warnblinker Override'})
CREATE (sw4:SoftwareReq {id: 'SW-004', titel: 'Batterie-Watchdog'})

// Test Cases
CREATE (tc1:TestCase {id: 'TC-001', titel: 'Blinker Timing Test', status: 'passed'})
CREATE (tc2:TestCase {id: 'TC-002', titel: 'Frequenz Test', status: 'passed'})
CREATE (tc3:TestCase {id: 'TC-003', titel: 'Bremslicht Timing', status: 'passed'})
CREATE (tc4:TestCase {id: 'TC-004', titel: 'Warnblinker Standalone', status: 'pending'})
// TC-005 fehlt absichtlich → Demo-Lücke!

// Komponenten
CREATE (k1:Komponente {id: 'K-001', name: 'LightController ECU', typ: 'Hardware'})
CREATE (k2:Komponente {id: 'K-002', name: 'BlinkerModule', typ: 'Software'})
CREATE (k3:Komponente {id: 'K-003', name: 'BrakeLightModule', typ: 'Software'})
CREATE (k4:Komponente {id: 'K-004', name: 'HazardLightModule', typ: 'Software'})

// Traceability: Stakeholder → System
CREATE (stk1)-[:TRACED_TO]->(sys1)
CREATE (stk1)-[:TRACED_TO]->(sys2)
CREATE (stk2)-[:TRACED_TO]->(sys3)
CREATE (stk2)-[:TRACED_TO]->(sys4)
CREATE (stk3)-[:TRACED_TO]->(sys5)
CREATE (stk4)-[:TRACED_TO]->(sys6)
CREATE (stk4)-[:TRACED_TO]->(sys7)

// Traceability: System → Software
CREATE (sys1)-[:TRACED_TO]->(sw1)
CREATE (sys2)-[:TRACED_TO]->(sw1)
CREATE (sys3)-[:TRACED_TO]->(sw2)
CREATE (sys6)-[:TRACED_TO]->(sw3)
CREATE (sys7)-[:TRACED_TO]->(sw4)

// Verifikation: Software → Test
CREATE (sw1)-[:VERIFIED_BY]->(tc1)
CREATE (sw1)-[:VERIFIED_BY]->(tc2)
CREATE (sw2)-[:VERIFIED_BY]->(tc3)
CREATE (sw4)-[:VERIFIED_BY]->(tc4)
// SW-003 hat KEINEN Test → Demo-Lücke!

// Implementation: Software → Komponente
CREATE (sw1)-[:IMPLEMENTED_IN]->(k2)
CREATE (sw2)-[:IMPLEMENTED_IN]->(k3)
CREATE (sw3)-[:IMPLEMENTED_IN]->(k4)
CREATE (sw4)-[:IMPLEMENTED_IN]->(k4)

// ========================================
// EXTERNE ABHÄNGIGKEITEN (Der blinde Fleck!)
// ========================================

// Input-Spezifikationen von anderen Teams
CREATE (ext1:InputSpec {
  id: 'EXT-001',
  titel: 'CAN BrakePedalForce 0x123',
  quelle: 'Fahrwerk-Team',
  version: '2.3',
  resolution: '0.1N',
  cycleTime: '10ms'
})
CREATE (ext2:InputSpec {
  id: 'EXT-002',
  titel: 'CAN Zykluszeit',
  quelle: 'Plattform-Team',
  version: '1.1',
  maxCycleTime: '10ms'
})
CREATE (ext3:InputSpec {
  id: 'EXT-003',
  titel: 'CAN Timeout Handling',
  quelle: 'Safety-Team',
  version: '4.0',
  timeout: '100ms',
  action: 'Fail-Safe'
})

// Abhängigkeiten: Außenlicht → Externe Specs
CREATE (sys3)-[:DEPENDS_ON {kritisch: true, grund: 'Reaktionszeit abhängig von CAN-Zykluszeit'}]->(ext2)
CREATE (sw2)-[:DEPENDS_ON {kritisch: true, grund: 'Schwellwert abhängig von Resolution'}]->(ext1)
CREATE (sw2)-[:DEPENDS_ON {kritisch: true, grund: 'Timeout-Handling erforderlich'}]->(ext3)
```
