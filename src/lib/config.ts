/**
 * Site Configuration
 * @author andreas@siglochconsulting.de
 *
 * Central configuration file for all site constants, colors, and settings.
 * Following schema-based development principles - no hardcoded values in components.
 */

export const siteConfig = {
  // Site Meta
  name: 'Sigloch Consulting',
  title: 'Sigloch Consulting - Daten strukturieren. Qualität messbar machen.',
  description: 'Systematischer Ansatz für Unternehmen, die ihre Prozesse auf eine belastbare Grundlage stellen wollen – bevor sie über KI nachdenken.',
  url: 'https://siglochconsulting.de',
  locale: 'de-DE',

  // Contact Information
  contact: {
    name: 'Andreas Sigloch',
    company: 'Sigloch Consulting',
    email: 'andreas@siglochconsulting.de',
    phone: '+49 170 4454877',
    address: {
      street: 'Dagersheimer Strasse 11/2',
      zip: '71069',
      city: 'Sindelfingen',
      country: 'Deutschland',
    },
    vatId: '', // Add when applicable
  },

  // Social Media
  social: {
    linkedin: 'https://www.linkedin.com/in/andreas-sigloch-consulting',
    xing: 'https://www.xing.com/profile/Andreas_Sigloch/',
  },

  // Theme Colors - Brand (Olive/Sage Green)
  colors: {
    primary: '#68780E', // Olive/Sage Green (Brand Primary)
    primaryLight: '#8a9c3a',
    primaryDark: '#4a5809',
    secondary: '#e8ebd5', // Light olive tint
    accent: '#f5f6ed', // Very light olive tint
    success: '#10b981', // Green (system color)
    error: '#ef4444', // Red (system color)
    warning: '#f59e0b', // Amber (system color)
    info: '#68780E', // Use brand olive for info

    // Neutrals
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f5f6ed',
    border: '#e8ebd5',
  },

  // Typography - Poppins for headings, System for body
  fonts: {
    title: '"Poppins", system-ui, sans-serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },

  // Layout
  layout: {
    maxWidth: '1200px',
    containerPadding: '1rem',
  },

  // SEO
  seo: {
    defaultOgImage: '/images/og-image.jpg',
  },

  // Business Hours (for Schema.org)
  businessHours: {
    weekdays: {
      opens: '09:00',
      closes: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    note: 'Termine nach Vereinbarung',
  },

  // Geo Location (Sindelfingen Office)
  geo: {
    latitude: 48.7133,
    longitude: 9.0033,
  },

  // Service Areas
  serviceAreas: {
    countries: ['DE', 'AT', 'CH'], // DACH region
    regions: [
      'Baden-Württemberg',
      'Bayern',
      'Hessen',
      'Nordrhein-Westfalen',
    ],
  },

  // Service Categories
  services: {
    strategy: {
      title: 'Strategieberatung',
      items: [
        'Systems Engineering Strategy',
        'GenAI Integration',
        'Digital Transformation',
        'Technology Roadmapping',
      ],
    },
    efficiency: {
      title: 'Effizienzprogramme',
      items: [
        'LEAN Systems Engineering',
        'Process Optimization',
        'A-SPICE Improvement',
        'Tool Chain Optimization',
      ],
    },
    operational: {
      title: 'Operative Unterstützung',
      items: [
        'Technical Coaching',
        'Team Enablement',
        'Project Recovery',
        'Interim Management',
      ],
    },
  },

  // Industries
  industries: [
    'Automotive',
    'Transportation',
    'Defense',
    'Machinery',
    'Industrial Equipment',
  ],

  // Features
  features: {
    enableBlog: true,
    enableCalendly: true,
    enableContactForm: true,
  },

  // Calendly Configuration
  calendly: {
    url: 'https://calendly.com/andreas-euyz/30min',
    buttonText: 'Termin vereinbaren',
  },

  // Web3Forms (Contact Form)
  web3forms: {
    endpoint: 'https://api.web3forms.com/submit',
  },
} as const;

// Organization Schema.org data (for SEO)
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  alternateName: [
    'Sigloch Consulting',
    'Andreas Sigloch Consulting',
    'SiCon',
  ],
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.svg`,
  image: `${siteConfig.url}/images/andreas-sigloch.png`,
  description: siteConfig.description,
  founder: {
    '@type': 'Person',
    name: siteConfig.contact.name,
    jobTitle: 'Systems Engineering Consultant',
    email: siteConfig.contact.email,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: 'customer service',
    areaServed: siteConfig.serviceAreas.countries,
    availableLanguage: ['de', 'en'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address.street,
    postalCode: siteConfig.contact.address.zip,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  // Services offered
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Beratungsleistungen',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Systems Engineering Beratung',
          description: 'Strategische Beratung für effizientes Systems Engineering',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'GenAI Integration',
          description: 'Integration von Generativer KI in Entwicklungsprozesse',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'LEAN Methoden',
          description: 'Effizienzsteigerung durch LEAN Systems Engineering',
        },
      },
    ],
  },
  // Service areas
  areaServed: siteConfig.serviceAreas.countries.map((country) => ({
    '@type': 'Country',
    name: country === 'DE' ? 'Germany' : country === 'AT' ? 'Austria' : 'Switzerland',
  })),
  // Knowledge/expertise areas
  knowsAbout: [
    'Systems Engineering',
    'Generative AI',
    'LEAN Methods',
    'A-SPICE',
    'Automotive Development',
    'MBSE',
    'Requirements Engineering',
  ],
} as const;
