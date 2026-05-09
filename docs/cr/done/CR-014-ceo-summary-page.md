# CR-014: CEO Summary Landing Page

**Status:** Done
**Datum:** 2026-05-09
**Autor:** andreas@siglochconsulting

## Ziel

Standalone Landing Page (englisch, ohne sichtbares Menü) als Entry Point für CEO-Gespräche und LinkedIn/Sales-Outreach. Verbindet die zwei bestehenden HTML-Standalone-Files (`public/downloads/sigloch-ceo-chart.html` und `sigloch-ceo-interactive.html`) zu einer einzigen, im Website-Designsystem gestylten Seite.

## Motivation

- Die beiden HTMLs lebten als isolierte Downloads und folgten einem fremden Farbschema (blau/lila), das nicht zur Marke passt.
- CEOs wollen die Story (vier Stufen) **und** den Beweis (interaktiver Graph) auf einer Seite, nicht zwei Files.
- Englischsprachiger Sales-Funnel ohne Header/Footer-Ablenkung gewünscht.

## Scope

### Implementiert
- [x] Neue Seite `src/pages/ceo-summary.astro` → Route `/ceo-summary/`
- [x] Hero + 4-Stufen-Grid + 2 Callouts + interaktiver Graph + Takeaway-Card
- [x] Komplette Übernahme der Graph-Animation (Auto-Play 6s, Stage-Buttons, Pause/Replay)
- [x] Adoption Design Tokens: Olive-Brand-Farben statt blau/lila, Poppins-Typo, `var(--space-*)`-Spacing
- [x] Keine sichtbare Navigation (kein `Header`/`Footer`-Component)
- [x] Sanftere Animationen: Cubic-Bezier-Eases, Stagger-Fade-In, marching dashes auf flashing edges, Pulse auf flashing nodes
- [x] Weniger SVG-Look: Drop-Shadows auf Nodes, Edge-Gradient (light → brand olive), Dot-Grid-Background mit Radial-Mask
- [x] `prefers-reduced-motion` honoriert
- [x] Responsive bis 560px (Stages 4→2→1 col, Callouts/Rules 1 col)
- [x] Build clean, deployed via `npm run deploy`

### Nicht im Scope
- Verlinkung aus Hauptmenü (bewusst — Page ist nicht öffentlich beworben)
- Sitemap-Ausschluss (steht aktuell drin, ist OK für Direktaufrufer)
- Übersetzungs-Variante deutsch (separate CR falls gewünscht)

## Akzeptanzkriterien

- [x] `npm run build` grün
- [x] Page erreichbar unter https://siglochconsulting.de/ceo-summary/
- [x] Animationen smooth (kein Ruckeln im Auto-Play)
- [x] Mobile (Chrome DevTools 375px) lesbar, Graph passt
- [x] Brand-Olive durchgängig statt Fremdfarben

## Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/ceo-summary.astro` | NEU — kompletter Inhalt + Styles + Inline-Script |

Die Original-HTMLs in `public/downloads/` bleiben unangetastet (weiterhin nutzbar für externe Direktverteilung).

## Deployment

- Build: 18b0f54
- Deployed: 18b0f54
- URL: https://siglochconsulting.de/ceo-summary/
