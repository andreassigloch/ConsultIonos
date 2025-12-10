# Sigloch Consulting Website - Requirements

## Übersicht

**Projekt:** Sigloch Consulting Website
**Typ:** Consulting / Beratung
**URL:** https://siglochconsulting.de
**Autor:** andreas@siglochconsulting.de

## Funktionale Anforderungen

### Must-Have

- [x] Responsive Homepage mit Hero-Section
- [x] Beratungsleistungen-Seite mit Service-Kategorien
- [x] Blog/Wissenswertes mit Artikeln
- [x] Kontaktformular (Web3Forms Integration)
- [x] Impressum & Datenschutz (DSGVO-konform)
- [x] Schema.org SEO Markup
- [x] Sitemap Generation

### Nice-to-Have

- [ ] Calendly Integration für Terminbuchung
- [ ] Newsletter-Anmeldung
- [ ] Mehrsprachigkeit (DE/EN)

## Non-Funktionale Anforderungen

### Performance
- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Static Site Generation (kein SSR)

### Accessibility
- BFSG-konform (Barrierefreiheit)
- ARIA Labels für alle interaktiven Elemente
- data-testid Attribute für E2E-Tests

### SEO
- Schema.org ProfessionalService
- Canonical URLs
- Open Graph Tags
- Twitter Cards

## Technologie-Stack

- **Framework:** Astro 5.x
- **Styling:** CSS Custom Properties (Design Tokens)
- **Fonts:** Poppins (Headings), System Fonts (Body)
- **Testing:** Playwright (E2E), Vitest (Unit)
- **Deployment:** IONOS SFTP
