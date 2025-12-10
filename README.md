# Sigloch Consulting Website

> Website für Andreas Sigloch Consulting - Systems Engineering & GenAI Beratung

## Quick Start

```bash
# Dependencies installieren
npm install

# Development Server starten (Port 4322)
npm run dev

# Production Build
npm run build

# Preview
npm run preview
```

## Tech Stack

- **Framework:** Astro 5.x
- **Styling:** CSS Custom Properties (Design Tokens)
- **Testing:** Playwright (E2E), Vitest (Unit)
- **Deployment:** IONOS SFTP

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev Server auf Port 4322 |
| `npm run build` | Production Build |
| `npm run deploy` | Build & Deploy zu IONOS |
| `npm run test:e2e` | Playwright E2E Tests |
| `npm run compliance` | DSGVO Compliance Check |
| `npm run lint:design` | Design Token Validation |

## Struktur

```
sicon/
├── src/
│   ├── components/    # Astro Components
│   ├── layouts/       # Page Layouts
│   ├── pages/         # Routes
│   ├── content/       # Blog Markdown
│   ├── lib/           # Configuration
│   └── styles/        # Design Tokens & CSS
├── public/            # Static Assets
├── scripts/           # Build & Validation
└── docs/              # Documentation
```

## Konfiguration

Zentrale Konfiguration in `src/lib/config.ts`:
- Site Meta (URL, Name, Description)
- Contact Information
- Brand Colors
- Schema.org Data

## Environment Variables

```bash
cp .env.example .env
```

- `WEB3FORMS_ACCESS_KEY` - Kontaktformular API Key
- `IONOS_SFTP_PASSWORD` - Deployment Credentials

## Links

- **Live:** https://siglochconsulting.de
- **LinkedIn:** https://www.linkedin.com/in/andreas-sigloch/
