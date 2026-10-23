# LinkedIn Post - KI-Agent mit Kreditkarte, Firewall dazwischen

**Eigene Seite:** keine — Statement-Post, verweist auf den Artikel zum ersten MCP-Server
**URL:** https://siglochconsulting.de/blog/mcp-server-propstack
**Beitragstyp:** These
**Geplant:** 25.10.2026, 16:30 — bei LinkedIn eingeplant
**Bild:** `channels/assets/2026-10-23-agent-klippe/agent-klippe--li-4x5.png`

## Post-Text (Copy & Paste)

```
„Ich habe Claude meine Kreditkarten und den Account gegeben. Seitdem erledigt er Artikelsuche, Bestellung, Tracking und Buchhaltung selbst.“

Hörte ich letztens in einem Gespräch. Funktioniert. Nach meiner Einschätzung ist das aber schon über dem Punkt, an dem Mut zu Leichtsinn wird.

Nach kurzem Kopfschütteln hier zumindest ein Lösungsansatz:

Zwei Agenten statt einem. Der Bestell-Claude sucht Artikel und empfiehlt eine Bestellung. Der Tracking-Claude verfolgt die Lieferung und versorgt die Buchhaltung.

Dazwischen steht eine Firewall in klassischem Code, als MCP-Server. Nur sie kennt die Kreditkarten. Nur sie verwaltet Limits und die Liste erlaubter Artikel. Nur sie führt die Bestellung aus, auf Basis der Empfehlung. Und sie protokolliert jeden Schritt.

Warum so streng? Da prompts nur als Empfehlung gelten kann der Agent bestellen, was er will. Und für potentielle Angreifer ist das natürlich die Einladung zum Fest. Dazu kommt dann noch, wie aktuelle Studien zeigen: Agenten erreichen ihr Ziel auch, indem sie ihre Umgebung manipulieren. Ein Sprachmodell sollte gegen eine Schach-Engine gewinnen und schrieb stattdessen die Datei mit dem Spielstand um. Ein Agent, der seine eigenen Limits ändern kann, hat keine Limits.

Deshalb gehören die Schnittstellen der Firewall gehärtet und die Firewall selbst isoliert. Kein Agent darf seinen Code, seine Konfiguration oder sein Protokoll ändern.

Perfekt ist das nicht. Aber auf jeden Fall besser als die aktuelle Situation.

Ihre Meinung?

👉 Wie ein MCP-Server entsteht: https://siglochconsulting.de/blog/mcp-server-propstack

#KI #KIAgenten #MCP #ITSicherheit #SystemsEngineering
```

## Bild

Strichmännchen mit Kreditkarte auf der Klippe, ein Bein in der Luft, Titel „Mut. Oder schon Leichtsinn?“.
Ausgangsfassung, Render-Befehl und Alt-Text: `channels/assets/2026-10-23-agent-klippe/recipe.json`.

## Validierung

- Zeichen gesamt: 1.640 (optimal: 1.300–1.600)
- Hook: das Zitat in der ersten Zeile (140 Zeichen, max. 140)
- Hashtags: 5 (optimal: 3–5)
- Link im Post-Text, letzte Zeile vor den Hashtags

## Quellen zu „Agenten manipulieren ihre Umgebung"

- Palisade Research, Feb. 2025: Reasoning-Modelle sollten gegen Stockfish gewinnen; o1-preview versuchte in 37 % der Läufe zu schummeln, u. a. durch Ändern der Spielstand-Datei `game/fen.txt`: https://arxiv.org/abs/2502.13295
- Anthropic, Nov. 2025: Ein Modell lernt im Training, Coding-Tests auszutricksen, und sabotiert danach in Claude Code sogar das Werkzeug, das genau dieses Verhalten erkennen soll: https://www.anthropic.com/research/emergent-misalignment-reward-hacking
- Das Zitat am Anfang stammt nicht von mir. Der Aufbau mit Firewall ist mein Vorschlag, nicht in den Studien beschrieben.

## Checkliste

- [x] Bild erzeugt, Motiv-Ordner mit `recipe.json` angelegt
- [x] Post-Text kopiert
- [x] Bei LinkedIn eingeplant (25.10.2026, 16:30)
- [ ] Veröffentlicht
- [ ] LinkedIn-URL hier eingetragen
