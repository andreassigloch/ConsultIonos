# Sigloch Consulting Website

**Version 2.0** - Modern, fast, GDPR-compliant website for Systems Engineering & GenAI consulting.

Built with [Astro](https://astro.build), following the Sigloch Methodology from `WEB_PROJECT_TEMPLATE.md`.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Dev server**: http://localhost:4321

---

## 📁 Project Structure

```
ConsultIonos/
├── .claude/              # Claude Code configuration
├── docs/                 # Project documentation
│   ├── site-audit.md
│   ├── design-system.md
│   ├── content-inventory.md
│   └── redesign-summary.md
├── scripts/              # Automation scripts
│   └── compliance-check.ts
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ContactForm.astro
│   │   └── Calendly.astro
│   ├── content/          # Markdown content
│   │   ├── config.ts
│   │   └── blog/         # Blog posts
│   ├── layouts/          # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/            # Routes (file-based routing)
│   │   ├── index.astro   # Homepage
│   │   ├── beratungsleistungen.astro
│   │   ├── wissenswertes.astro
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   └── blog/[...slug].astro
│   └── styles/           # Design system
│       ├── tokens.css    # Design tokens
│       └── global.css    # Global styles
├── public/               # Static assets
├── package.json
└── astro.config.mjs
```

---

## 🎨 Design System

### Brand Colors
- **Primary**: `#68780E` (Olive/Sage Green)
- **Typography**: Poppins (headings), Open Sans (body)
- **Spacing**: 4px base scale
- **Responsive**: Mobile-first design

### Design Tokens
All styles use CSS custom properties from `src/styles/tokens.css`:

```css
color: var(--color-primary);
padding: var(--space-4);
font-size: var(--text-lg);
```

**Never hardcode values!**

---

## 📄 Pages

### Homepage (`/`)
6 sections:
1. Hero with ReConf announcement
2. Value Proposition
3. Motivation
4. Client Benefits
5. Contribution (Strategy-Method-People)
6. Contact Form

### Services (`/beratungsleistungen`)
- Strategy Consulting
- Efficiency Programs
- Operational Support

### Blog (`/wissenswertes`)
- Featured article
- Article grid
- LinkedIn integration
- Dynamic blog posts from Markdown

### Blog Posts (`/blog/[slug]`)
- Systems Engineering and AI
- Lean SE
- SE Efficiency Potentials

### Legal
- Impressum (`/impressum`)
- Datenschutzerklärung (`/datenschutz`)

---

## ✍️ Content Management

### Adding Blog Posts

1. Create new Markdown file in `src/content/blog/`:

```markdown
---
title: 'Your Article Title'
description: 'Short description'
pubDate: 2025-11-20
author: 'Andreas Sigloch'
tags: ['Tag1', 'Tag2']
draft: false
---

Your content here...
```

2. Blog posts automatically appear on `/wissenswertes`
3. Accessible at `/blog/your-file-name`

### Content Features
- ✅ Markdown support
- ✅ Frontmatter metadata
- ✅ Tag system
- ✅ Draft mode
- ✅ Social sharing (LinkedIn, Twitter)
- ✅ Schema.org markup for SEO

---

## 📧 Contact Form Setup

### Web3Forms Integration (IONOS Compatible)

1. **Sign up**: https://web3forms.com (FREE - 250 submissions/month)

2. **Get Access Key**: Copy from dashboard

3. **Configure**:
```bash
cp .env.example .env
# Edit .env:
WEB3FORMS_ACCESS_KEY=your_actual_key_here
```

4. **Update Component**:
Edit `src/components/ContactForm.astro` line 36:
```html
<input type="hidden" name="access_key" value="YOUR_KEY_HERE">
```

### Testing
- Fill out form on homepage
- Check email delivery
- Verify GDPR consent checkbox works

---

## 📅 Calendly Integration

### Setup

1. **Sign up**: https://calendly.com

2. **Get Scheduling URL**: e.g., `https://calendly.com/andreas-siglochconsulting`

3. **Use Component**:
```astro
---
import Calendly from '../components/Calendly.astro';
---

<!-- Popup Button -->
<Calendly
  url="https://calendly.com/your-url"
  buttonText="Termin buchen"
/>

<!-- Inline Widget -->
<Calendly
  url="https://calendly.com/your-url"
  inline={true}
/>
```

---

## ✅ GDPR Compliance

### Compliance Check Script

Automatically scans for:
- API keys and credentials
- Personal data (emails, phones)
- Precise geolocation
- Sensitive information

```bash
# Run compliance check
npm run compliance

# Whitelist official company info in:
# scripts/compliance-check.ts
```

### Whitelisted
- andreas@siglochconsulting.de
- +49 170 4454877
- Company name and address

---

## 🧪 Testing

```bash
# Unit tests (when added)
npm run test

# E2E tests with Playwright (when added)
npm run test:e2e
npm run test:e2e:ui  # UI mode

# Compliance check
npm run compliance
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build static site
npm run build

# Output: dist/
```

### Deploy to IONOS

1. Build: `npm run build`
2. Upload `dist/` folder contents to IONOS webspace
3. Configure domain
4. Done! ✅

### Important: Environment Variables

For Web3Forms to work in production:
- Add `WEB3FORMS_ACCESS_KEY` to your hosting environment
- Or hardcode in `ContactForm.astro` (less secure but works for static hosting)

---

## 📝 Scripts

```json
{
  "dev": "astro dev",               // Start dev server
  "build": "astro build",           // Build for production
  "preview": "astro preview",       // Preview production build
  "compliance": "tsx scripts/compliance-check.ts"
}
```

---

## 🎯 Features

### ✅ Completed
- [x] Design system with brand colors
- [x] Responsive design (mobile, tablet, desktop)
- [x] Homepage with 6 sections
- [x] Services page
- [x] Blog system with Markdown
- [x] Contact form (Web3Forms)
- [x] Calendly integration
- [x] Legal pages (Impressum, Datenschutz)
- [x] GDPR compliance checking
- [x] SEO optimization
- [x] Schema.org markup
- [x] Social sharing

### ⏳ TODO
- [ ] Add Web3Forms API key
- [ ] Replace placeholder images
- [ ] Add favicon and logo
- [ ] Add og-image for social sharing
- [ ] Test contact form with real email
- [ ] Add more blog posts
- [ ] Set up testing framework
- [ ] Add analytics (Plausible/Umami)

---

## 🔧 Configuration

### Update Contact Information

**Files to update**:
- `src/layouts/BaseLayout.astro` (Schema.org)
- `src/components/Footer.astro` (Contact section)
- `src/pages/impressum.astro`
- `src/pages/datenschutz.astro`

### Update LinkedIn URL

Search for `linkedin.com/in/andreas-sigloch` and update with your URL.

### Update Calendly URL

Search for `calendly.com/andreas-siglochconsulting` and update.

---

## 🎨 Customization

### Change Colors

Edit `src/styles/tokens.css`:
```css
:root {
  --color-primary: #68780E;  /* Your brand color */
}
```

### Change Fonts

Edit `src/styles/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

Then update tokens:
```css
--font-heading: 'YourFont', sans-serif;
```

---

## 📦 Dependencies

### Production
- `astro` - Static site generator

### Development
- `typescript` - Type safety
- `tsx` - Script runner
- `@playwright/test` - E2E testing (when added)
- `vitest` - Unit testing (when added)

---

## 🤝 Support

**Questions?** Contact andreas@siglochconsulting.de

**Issues?** Check documentation in `/docs/`

---

## 📄 License

© 2025 Sigloch Consulting. All rights reserved.

---

**Built with** ❤️ **using the Sigloch Methodology**
