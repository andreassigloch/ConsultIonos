# CR-003: LinkedIn-Artikel Import

**Status:** ✅ Completed
**Datum:** 2025-12-17
**Autor:** Andreas Sigloch

## Zusammenfassung

Import aller LinkedIn-Artikel als Blog-Beiträge, formatiert nach der neuen Serien-Struktur (CR-002).

## Quelle

- `docs/project/LinkedIn.md` - Gesammelte LinkedIn-Posts

## Erstellte Artikel

### Serie: Think AI (7 Artikel)

| Datei | Titel | Datum | Bild |
|-------|-------|-------|------|
| think-ai-01-paradigmenwechsel-anforderungen.md | Paradigmenwechsel im Anforderungsmanagement | 2025-01-15 | 1747387002586.jpeg |
| think-ai-02-praktische-tipps.md | Praktische Tipps zur KI-Unterstützung | 2025-02-01 | - |
| think-ai-03-roadblocker.md | Vier Roadblocker für GenAI | 2025-04-23 | 1745407248069.png |
| think-ai-04-automatisierung.md | Automatisierung - Warum nicht gleich ein Programm? | 2025-05-15 | - |
| think-ai-05-grmpf.md | Grmpf! Die Nebenwirkungen | 2025-06-01 | 1748866254584.jpeg |
| think-ai-06-claudegraph.md | ClaudeGraph - Wenn die KI zurückpritscht | 2025-07-01 | 1743172292631.jpeg |
| think-ai-07-prompt-komprimierung.md | Es muss nicht immer mehr sein | 2025-11-25 | 1764087578874.png |

### Serie: Vibe Coding (3 Artikel)

| Datei | Titel | Datum | Bild |
|-------|-------|-------|------|
| vibe-coding-01-einstieg.md | Was kann man dabei lernen? | 2025-03-01 | 1748171763292.png |
| vibe-coding-02-when-ai-programs-ai.md | When AI is Programming AI | 2024-10-30 | 1730281380077.png |
| vibe-coding-03-noapp.md | NoApp - System Engineering ohne Code | 2025-08-01 | 1756817824312.png |

### Serie: Summer School (5 Artikel)

| Datei | Titel | Datum | Bild |
|-------|-------|-------|------|
| summer-school-01-start.md | AI for Systems Engineering | 2024-07-15 | 1720096908080.jpeg |
| summer-school-02-ontology.md | Observations on Ontology | 2024-07-25 | 1723390289485.jpeg |
| summer-school-03-use-case-generation.md | Generate a Use Case with 9 Words | 2024-08-05 | 1723914416709.jpeg |
| summer-school-04-framework.md | A Framework Proposal for SE Assistants | 2024-08-15 | 1724594345666.png |
| summer-school-05-summary.md | The Summary | 2024-08-25 | 1725113264207.jpeg |

### Einzelartikel (5 Artikel)

| Datei | Titel | Datum | Bild |
|-------|-------|-------|------|
| genai-systems-engineering-2025.md | GenAI und Systems Engineering 2025 | 2025-01-01 | 1735827072875.jpeg |
| der-tod-der-software.md | Der Tod der Software | 2024-11-15 | - |
| mcp-server-propstack.md | Get Access! Mein erster MCP-Server | 2025-12-01 | 1763139762463.jpeg |
| apps-websites-glaskugel.md | Apps, Websites und ein Blick in die Glaskugel | 2025-11-01 | 1761726624645.jpeg |
| prompt-und-requirements-engineering.md | Prompt Engineering und Requirements Engineering | 2025-09-01 | 1754645450552.jpeg |

## Bild-Zuordnung

Bilder wurden anhand der LinkedIn-Timestamps zugeordnet:

| Bild | Inhalt | Zugeordnet zu |
|------|--------|---------------|
| 1764087578874.png | Netzwerk-Kompression | Think AI #7 |
| 1763139762463.jpeg | Propstack MCP Robot | MCP-Server |
| 1761726624645.jpeg | App vs Website | Apps/Websites Glaskugel |
| 1756817824312.png | NoApp Terminal Output | Vibe Coding #3 |
| 1754645450552.jpeg | Business/Casual Split | Prompt & RE |
| 1753030668740.png | Developer mit AI | (nicht verwendet) |
| 1748866254584.jpeg | GRMPF Comic | Think AI #5 |
| 1748171763292.png | Good Vibes | Vibe Coding #1 |
| 1747387002586.jpeg | Steampunk Spec-Maschine | Think AI #1 |
| 1747045334775.jpeg | Sysli Konzept | (bereits in systems-engineering-and-ai.md) |
| 1745941322694.jpeg | A-SPICE Mapping | (nicht verwendet) |
| 1745407248069.png | Roadblocker | Think AI #3 |
| 1743172292631.jpeg | Graph-Visualisierung | Think AI #6 |
| 1735827072875.jpeg | Casal Regina Foto | GenAI 2025 |
| 1730281380077.png | AI Programming AI | Vibe Coding #2 |
| 1725113264207.jpeg | Summer School #5 | Summer School #5 |
| 1724594345666.png | SE Framework | Summer School #4 |
| 1723914416709.jpeg | Use Case Generation | Summer School #3 |
| 1723390289485.jpeg | Ontology | Summer School #2 |
| 1720096908080.jpeg | My Summer School | Summer School #1 |

## Formatierung

- Markdown mit deutschem Text
- Frontmatter nach Astro Content Collections Schema
- Interne Links zu /#kontakt
- Externe Links zu GitHub-Repos wo vorhanden
- Tags für Kategorisierung und Filterung

## Tests

- [x] Alle 20 Artikel erstellt
- [x] Bilder korrekt referenziert
- [x] Dev-Server läuft ohne Fehler
- [x] Artikel auf /publikationen/ sichtbar
