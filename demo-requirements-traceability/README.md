# Requirements Traceability Demo

Demo-Setup für die 7-Stufen-Datenreife Präsentation in Claude Desktop.

**Thema:** Requirements-Management und Impact-Analyse im Systems Engineering
**Zielgruppe:** Engineering-Teams, PLM-Verantwortliche, Quality Manager

## Quick Start

```bash
# Einfachste Variante: Alles auf einmal starten
./start-demo.sh

# Oder manuell:
docker-compose up -d
docker exec -i req-traceability-neo4j cypher-shell -u neo4j -p demo-password < seed-data.cypher
```

## Zugangsdaten

- **Neo4j Browser:** http://localhost:7484
- **Bolt Endpoint:** bolt://localhost:7697
- **Username:** neo4j
- **Password:** demo-password

## Enthaltene Daten

### Automotive Aussenlichtsystem

| Typ | Anzahl | IDs |
|-----|--------|-----|
| Stakeholder Requirements | 4 | STK-001 bis STK-004 |
| System Requirements | 7 | SYS-001 bis SYS-007 |
| Software Requirements | 4 | SW-001 bis SW-004 |
| Test Cases | 4 | TC-001 bis TC-004 |
| Komponenten | 4 | K-001 bis K-004 |
| Externe Specs | 3 | EXT-001 bis EXT-003 |

### Absichtliche Demo-Luecken

1. **SW-003 ohne Test:** Warnblinker Override hat keinen zugeordneten Test (TC-005 fehlt)
2. **Externe Abhaengigkeiten:** CAN-Bus Dependencies als "blinder Fleck"

### KEINE vorinstallierten Regeln

Regeln werden in der Demo live aus A-SPICE und ISO 26262 PDFs extrahiert!

## Verifizierung

Nach dem Laden der Seed-Daten:

```cypher
// Anzahl Knoten pruefen (sollte 26 sein)
MATCH (n) RETURN count(n) AS total;

// Requirement-Hierarchie anzeigen
MATCH path = (stk:StakeholderReq)-[:TRACED_TO*]->(sw:SoftwareReq)
RETURN path LIMIT 10;

// SW-003 ohne Test finden (Demo-Luecke)
MATCH (sw:SoftwareReq)
WHERE NOT (sw)-[:VERIFIED_BY]->(:TestCase)
RETURN sw.id, sw.titel;

// Externe Abhaengigkeiten zeigen
MATCH (n)-[:DEPENDS_ON]->(ext:InputSpec)
RETURN n.id, ext.id, ext.quelle;
```

## Container-Verwaltung

```bash
# Stoppen
docker-compose down

# Stoppen und Daten loeschen
docker-compose down -v

# Logs anzeigen
docker-compose logs -f neo4j

# Neustart mit frischen Daten
docker-compose down -v && docker-compose up -d
```

## Troubleshooting

### Neo4j startet nicht
```bash
# Ports pruefen
lsof -i :7474
lsof -i :7687

# Container-Status
docker-compose ps
docker-compose logs neo4j
```

### Seed-Daten nicht geladen
```bash
# Manuell laden via cypher-shell
docker exec -i req-traceability-neo4j cypher-shell -u neo4j -p demo-password < seed-data.cypher
```

### Daten zurücksetzen
```bash
# Alle Daten löschen und neu laden
docker exec req-traceability-neo4j cypher-shell -u neo4j -p demo-password "MATCH (n) DETACH DELETE n"
docker exec -i req-traceability-neo4j cypher-shell -u neo4j -p demo-password < seed-data.cypher
```

## Claude Desktop MCP-Server

### Installation

**Wichtig:** MCP-Server muss nach `~/mcp-servers/` kopiert werden (Claude Desktop hat keinen Full Disk Access für `~/Documents/`).

```bash
# 1. Build
cd neo4j-mcp
npm install
npm run build

# 2. Nach ~/mcp-servers/ kopieren
mkdir -p ~/mcp-servers
cp -r ../neo4j-mcp ~/mcp-servers/
```

### Konfiguration

Füge folgendes zu `~/Library/Application Support/Claude/claude_desktop_config.json` hinzu:

```json
{
  "mcpServers": {
    "neo4j-requirements": {
      "command": "/opt/homebrew/opt/node@20/bin/node",
      "args": [
        "/Users/YOUR_USERNAME/mcp-servers/neo4j-mcp/dist/index.js"
      ],
      "env": {
        "NEO4J_URI": "bolt://localhost:7697",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "demo-password",
        "PATH": "/opt/homebrew/opt/node@20/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

**Nach Änderung:** Claude Desktop komplett beenden (Cmd+Q) und neu starten.

### Troubleshooting MCP

| Problem | Ursache | Lösung |
|---------|---------|--------|
| `EPERM: operation not permitted` | Kein Full Disk Access | Server nach `~/mcp-servers/` kopieren |
| Server startet nicht | Config nicht geladen | Claude Desktop mit Cmd+Q beenden, neu starten |
| Neo4j Auth Fehler | Container nicht gestartet | `docker-compose up -d` ausführen |
| Logs prüfen | - | Claude Desktop > Settings > Developer > neo4j-requirements > Logs |

### Verfügbare MCP-Tools

| Tool | Beschreibung |
|------|--------------|
| `query` | Cypher-Queries ausführen (read-only) |
| `impact_analysis` | Impact bei Requirement-Änderung analysieren |
| `validate` | Alle aktiven Regeln prüfen |
| `add_rule` | Neue Validierungsregel hinzufügen |
| `toggle_rule` | Regel aktivieren/deaktivieren |
| `compliance_score` | Compliance-Score pro Standard berechnen |

## Projektstruktur

```
demo-requirements-traceability/
├── docker-compose.yml      # Neo4j Container Setup
├── seed-data.cypher        # Demo-Daten (Automotive Außenlicht)
├── start-demo.sh           # Start-Script für Demo
├── demo-script.md          # Ausführlicher Demo-Ablauf
├── neo4j-mcp/              # MCP-Server für Claude Desktop
│   ├── src/                # TypeScript Source
│   ├── dist/               # Compiled JavaScript
│   └── package.json
├── demo-pdfs/              # Demo-PDFs (Lastenheft, Standards)
│   ├── lastenheft-aussenlicht.md
│   ├── a-spice-auszug.md
│   ├── iso-26262-auszug.md
│   └── can-interface-spec.md
└── ausblick-folien/        # Konzept-Folien für Stufe 6-7
```

## Abnahmekriterien

- [x] Neo4j startet mit `docker-compose up`
- [x] MCP-Server implementiert (6 Tools)
- [x] Seed-Daten mit absichtlichen Lücken
- [x] Demo-Script für 20-Min Präsentation
- [x] Demo-PDFs für Stufe 1-2
- [x] Ausblick-Folien für Stufe 6-7
