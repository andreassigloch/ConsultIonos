# LinkedIn Post Generator

Generiert LinkedIn-Posts aus Blog-Artikeln mit `linkedinStatus: 'planned'`.

## Ablauf

1. Führe `npm run linkedin:prepare` aus
2. Zeige dem User die generierte Datei in `docs/linkedin-queue/`
3. Erkläre die nächsten Schritte (Copy/Paste zu LinkedIn)

## Output

Die Datei enthält für jeden Artikel:
- Post-Text (Copy/Paste ready)
- Absoluten Pfad zum Bild
- Anleitung zum Frontmatter-Update nach dem Posten

## Nach dem Posten

User muss im Artikel-Frontmatter setzen:
```yaml
linkedinStatus: 'published'
linkedinPostDate: YYYY-MM-DD
linkedinUrl: 'https://www.linkedin.com/posts/...'
```
