# Sigloch Consulting Website - Architecture

## Projektstruktur

```
sicon/
├── src/
│   ├── components/           # Astro Components
│   │   ├── Header.astro      # Navigation mit Mobile Menu
│   │   ├── Footer.astro      # Footer mit Social Links
│   │   ├── ContactForm.astro # Web3Forms Integration
│   │   └── Calendly.astro    # Calendly Booking Widget
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro  # Master Template + SEO
│   │   └── BlogPost.astro    # Blog Post Layout
│   │
│   ├── lib/
│   │   └── config.ts         # Zentrale Konfiguration
│   │
│   ├── pages/                # File-based Routing
│   │   ├── index.astro       # Homepage
│   │   ├── beratungsleistungen.astro
│   │   ├── wissenswertes.astro
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   └── blog/[...slug].astro
│   │
│   ├── content/
│   │   ├── config.ts         # Zod Schema für Blog
│   │   └── blog/             # Markdown Artikel
│   │
│   └── styles/
│       ├── tokens.css        # Design Tokens (MANDATORY)
│       └── global.css        # Global Styles + Reset
│
├── public/                   # Static Assets
├── scripts/                  # Build & Validation Scripts
├── docs/                     # Project Documentation
└── .claude/                  # Claude Code Config
```

## Design System

### Design Tokens (tokens.css)

Alle Styles MÜSSEN CSS Custom Properties verwenden:

```css
/* ❌ VERBOTEN */
.button { background: #68780E; }

/* ✅ REQUIRED */
.button { background: var(--color-primary); }
```

### Brand Colors

- **Primary:** `#68780E` (Olive/Sage Green)
- **Secondary:** `#e8ebd5`
- **Background:** `#ffffff`
- **Text:** `#151515`

### Typography

- **Headings:** Poppins (400, 500, 600, 700)
- **Body:** System Fonts

## Integrations

### Web3Forms (Kontaktformular)

```
Endpoint: https://api.web3forms.com/submit
Access Key: .env -> WEB3FORMS_ACCESS_KEY
```

### Calendly (Terminbuchung)

```
URL: https://calendly.com/siglochconsulting/erstgespraech
Widget: Popup oder Inline
```

### Deployment (IONOS SFTP)

```
Host: home396750070.1and1-data.host
User: u67250678
Password: .env -> IONOS_SFTP_PASSWORD
```

## Compliance

### Pre-Push Hooks

```bash
npm run compliance      # DSGVO Check
npm run compliance:bfsg # Accessibility Check
```

### Validation Scripts

```bash
npm run lint:design     # Design Token Linter
npm run validate:schema # Schema.org Validation
npm run seo:check       # SEO Validation
```
