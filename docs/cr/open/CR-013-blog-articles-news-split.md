# CR-013: Blog → Articles/News Split

**Status:** Planned
**Priorität:** Low
**Abhängig von:** CR-012 (LinkedIn refactor auf @sigloch/linkedin-tools)

## Context

siglochimmo nutzt separate `articles/` und `news/` Content Collections.
sicon hat eine einzelne `blog/` Collection mit `type: 'blog' | 'linkedin' | 'conference'`.

Für einheitliches Content-Tooling (LinkedIn, SEO Review, etc.) sollte sicon
die gleiche Struktur verwenden.

## SEO-Bewertung

Zwei Top-Level-URLs (`/artikel/` + `/news/`) ist besser als eine Sammelseite:
- Suchintention trennen (Evergreen vs. Aktuell)
- URL-Semantik signalisiert Tiefe vs. Aktualität
- Veraltete News verwässern nicht die Ratgeber-Rankings

## Scope

1. `src/content/blog/` aufteilen in `src/content/articles/` und `src/content/news/`
2. `src/content/config.ts` mit zwei Collections updaten
3. Alle Page-Templates updaten (blog/[...slug].astro → artikel/[slug].astro)
4. RSS-Feed-Generierung anpassen
5. Redirects: /blog/{slug} → /artikel/{slug} oder /news/{slug}
6. `publikationen.astro` auf zwei Collections umstellen

## NOT in scope

- LinkedIn-Automation (bereits in CR-012 erledigt)
- URL-Struktur-Entscheidungen (braucht Diskussion: /artikel/ vs /blog/)
- Neue Content-Typen oder Schema-Änderungen

## Akzeptanzkriterien

- [ ] Alle bestehenden Blog-Posts unter korrekte Collection migriert
- [ ] /blog/{slug} redirected zu /artikel/{slug}
- [ ] RSS-Feed funktioniert weiterhin
- [ ] `npm run linkedin:prepare` funktioniert mit neuer Struktur
- [ ] Keine 404s für existierende URLs
