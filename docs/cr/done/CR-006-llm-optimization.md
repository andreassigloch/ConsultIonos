# CR-006: LLM/AI Optimization

**Status:** Done
**Erstellt:** 2025-12-17
**Autor:** andreas@siglochconsulting.de

## Ziel

Website für AI/LLM-Crawler optimieren, analog zu siglochimmo. Wissen aus "Mein Ansatz" und Blog-Artikeln für LLM-Systeme aufbereiten.

## Umsetzung

### 1. robots.txt (neu)

`public/robots.txt` mit AI-Bot-Permissions:
- GPTBot (OpenAI)
- ClaudeBot (Anthropic)
- PerplexityBot
- Google-Extended
- Anthropic-ai
- CCBot
- cohere-ai

### 2. llms.txt (neu)

`public/llms.txt` nach llmstxt.org-Standard mit:
- 7+ Stufen Datenreife-Modell komplett dokumentiert
- Key Insights (70-80% Business Value aus Struktur)
- Service-Kategorien und Branchen
- Technologie-Stack (Neo4j, TigerGraph, SHACL)
- Fit/Not-Fit Kriterien
- Zitationsformat für LLMs

### 3. Hidden LLM Context

`src/layouts/BaseLayout.astro`:
- Unsichtbares `<div class="llm-context">` auf jeder Seite
- Enthält Kernbotschaften für AI-Crawler
- CSS-Klasse `.llm-context` mit sr-only Pattern (aria-hidden)

### 4. E2E Tests

`tests/e2e/seo-llm-optimization.spec.ts`:
- robots.txt AI-Bot Permissions
- llms.txt Struktur und Inhalt
- Hidden LLM context Existenz
- Visuelle Versteckung verifiziert
- Schema.org Structured Data

## Geänderte Dateien

| Datei | Änderung |
|-------|----------|
| `public/robots.txt` | NEU - AI-Bot Permissions |
| `public/llms.txt` | NEU - Strukturierter LLM-Content |
| `src/layouts/BaseLayout.astro` | Hidden LLM context div |
| `src/styles/global.css` | .llm-context CSS-Klasse |
| `tests/e2e/seo-llm-optimization.spec.ts` | NEU - 6 Tests |

## Testabdeckung

```
6 passed (919ms)
- robots.txt allows AI crawlers
- llms.txt exists and contains structured content
- hidden LLM context exists on pages
- LLM context is visually hidden
- homepage has organization schema
- FAQ section with Schema.org
```

## Validierung

- [x] Build erfolgreich (41 Seiten)
- [x] E2E Tests bestanden
- [x] robots.txt erreichbar unter /robots.txt
- [x] llms.txt erreichbar unter /llms.txt
- [x] Hidden content auf allen Seiten

## Referenz

Pattern übernommen von: `../siglochimmo/public/llms.txt`
