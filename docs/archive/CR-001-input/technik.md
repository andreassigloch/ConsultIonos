# Der technische Stack

*Für technisch Interessierte: Welche Werkzeuge ich einsetze und warum.*

---

## Leitprinzipien

1. **Open Source wo möglich** – Keine Vendor-Abhängigkeit
2. **Lokal deploybar** – Daten müssen das Unternehmen nicht verlassen
3. **Deterministisch** – Reproduzierbare Ergebnisse
4. **Audit-fähig** – Nachvollziehbare Entscheidungen

---

## Graph-Datenbank: Neo4j

**Warum Graph?**

Relationale Datenbanken speichern Daten in Tabellen. Beziehungen zwischen Daten erfordern JOINs – bei komplexen Abfragen wird das langsam und unübersichtlich.

Graph-Datenbanken speichern Beziehungen als First-Class-Citizens. "Zeige alle Komponenten, die von dieser Anforderung abhängen" ist eine einfache Traversierung, keine komplexe Query.

**Warum Neo4j?**

- Community Edition ist Open Source (GPLv3)
- Cypher als intuitive Abfragesprache
- Bewährt in Produktion
- Gute Integration mit Python

**Beispiel-Query:**
```cypher
MATCH (req:Requirement)-[:REFINES*]->(func:Function)-[:ALLOCATED_TO]->(block:Block)
WHERE req.id = 'REQ-001'
RETURN func, block
```

---

## Validierung: SHACL

**Was ist SHACL?**

SHACL (Shapes Constraint Language) ist ein W3C-Standard zur Definition von Validierungsregeln für Graph-Daten.

**Warum SHACL?**

- 100% deterministisch – keine Variabilität
- Standardisiert – nicht proprietär
- Dokumentiert automatisch die Regeln
- Audit-fähig

**Beispiel:**
```turtle
:FunctionShape a sh:NodeShape ;
    sh:targetClass :Function ;
    sh:property [
        sh:path :hasOutput ;
        sh:minCount 1 ;
        sh:message "Funktion muss mindestens einen Output haben" ;
    ] .
```

Diese Regel prüft automatisch, ob jede Funktion mindestens einen Output hat. Bei Verletzung: dokumentierte Warnung.

---

## Lokale LLMs: Ollama

**Warum lokal?**

- Keine Daten verlassen das Unternehmen
- Fixkosten statt nutzungsabhängiger API-Kosten
- Keine Abhängigkeit von externen Diensten
- Latenz < 100ms

**Welche Modelle?**

| Modell | Größe | Einsatz |
|--------|-------|---------|
| Llama 3.1 8B | 4-8 GB | Allgemeine Aufgaben |
| Mistral 7B | 4-8 GB | Schnelle Inferenz |
| CodeLlama | 4-8 GB | Code-Generierung |

Für die meisten Unternehmensanwendungen reichen 7-8B Parameter. Größere Modelle bringen selten proportional mehr Nutzen.

**Hardware-Anforderung:**

- Minimum: 16 GB RAM, moderne CPU
- Empfohlen: 32 GB RAM, GPU mit 8+ GB VRAM
- Investition: €2.000-5.000 einmalig

---

## Orchestrierung: MCP-Server

**Was ist MCP?**

Model Context Protocol – ein Standard für die Kommunikation zwischen LLMs und externen Werkzeugen.

**Warum MCP?**

- Standardisiertes Protokoll
- Kompatibel mit Claude, Cursor, VSCode
- Ermöglicht eigene Server für proprietäre APIs

**Beispiel:** Ein MCP-Server für PropStack ermöglicht es, Immobiliendaten direkt aus dem CRM in LLM-Workflows einzubinden – ohne manuelle Datenexporte.

---

## Kostenvergleich

| Komponente | Cloud (monatlich) | Lokal (einmalig) |
|------------|-------------------|------------------|
| Neo4j | €50-500 | €0 (Community) |
| LLM-Inferenz | €100-1.000 | €0 (Ollama) |
| Hardware | – | €2.000-5.000 |
| **Jahr 1** | **€1.800-18.000** | **€2.000-5.000** |
| **Jahr 2+** | **€1.800-18.000** | **~€500** (Strom, Wartung) |

**Break-even:** 6-12 Monate

---

## Was das für Sie bedeutet

Sie brauchen diese technischen Details nicht zu verstehen, um den Ansatz zu nutzen. Aber es ist wichtig zu wissen:

- **Keine Vendor-Lock-in** – Die Systeme gehören Ihnen
- **Planbare Kosten** – Keine Überraschungen bei der Abrechnung
- **Audit-Compliance** – Für regulierte Branchen geeignet
- **Skalierbar** – Von Pilotprojekt bis Unternehmensweite Lösung

---

## Weiterführend

Wenn Sie tiefer einsteigen möchten:

- [Neo4j Documentation](https://neo4j.com/docs/)
- [SHACL Specification](https://www.w3.org/TR/shacl/)
- [Ollama](https://ollama.ai/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

[← Zurück zur Übersicht](/hintergrund)
