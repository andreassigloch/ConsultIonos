# Sigloch Consulting - Current Design System Analysis

**Date**: 2025-11-07
**Source**: siglochconsulting.de
**Author**: andreas@siglochconsulting.de

---

## Color Palette

### Primary Colors

#### Brand Green (Olive/Sage)
- **Primary Heading Color**: `rgb(104, 120, 14)` / `#68780E`
- **Usage**: H1, H2, H3 headings, accent elements
- **Characteristics**: Earthy, professional, organic

#### Background Colors
- **Body Background**: Transparent / White
- **Navigation Background**: Green gradient overlay pattern
- **Footer Background**: Green gradient with diagonal stripes
- **Button Primary**: `rgb(255, 255, 255)` (White) with green accent

#### Text Colors
- **Body Text**: `rgb(0, 0, 0)` / `#000000` (Black)
- **Link Default**: `rgb(21, 21, 21)` / `#151515` (Near Black)
- **Button Text**: `rgb(160, 160, 160)` / `#A0A0A0` (Gray)

### Secondary/Accent Colors
- **Cream/Beige**: Used in section backgrounds and mind map elements
- **Light Green Variants**: Various tints in gradient backgrounds and diagrams
- **Yellow/Gold**: Accent lines in mind map diagrams

### Gradient Pattern
- Green diagonal stripe pattern
- Used in navigation header and footer
- Creates dynamic, modern feel
- Multiple tints of green with transparency

---

## Typography

### Font Families

#### Primary: Poppins
- **Usage**: Headings (H2, H3)
- **Characteristics**: Modern, geometric sans-serif
- **Weights Used**: 400 (Regular)

#### Secondary: OpenSans
- **Usage**: H4, H5, some body content
- **Characteristics**: Humanist sans-serif, highly readable
- **Weights Used**: 400 (Regular)

#### Fallback: Times
- **Usage**: Body text fallback
- **Characteristics**: Serif, traditional
- **Weights Used**: 400 (Regular)

### Type Scale

#### Headings
- **H2**: 33px, Poppins, Regular (400), line-height: normal
- **H3**: 28px, Poppins, Regular (400), line-height: normal
- **H4**: 16px, OpenSans, Regular (400), line-height: normal
- **H5**: 16px, OpenSans, Regular (400), line-height: normal

#### Body
- **Body Text**: 16px, Times (fallback), Regular (400), line-height: normal

### Typography Notes
- **Large heading size difference** (33px → 28px → 16px)
- **Limited weight variation** (all 400 regular)
- **Opportunity**: Add more typographic hierarchy with font weights (600, 700)
- **Opportunity**: Improve line-height for better readability (1.5-1.6 for body, 1.2-1.3 for headings)

---

## Spacing & Layout

### Container Widths
- **Content areas**: Appear to use standard WordPress content width
- **Sections**: Full-width backgrounds with contained content

### Section Patterns
1. **Two-column layouts**: Text left, image right (or reversed)
2. **Full-width hero**: Large image with text overlay
3. **Centered content**: Single column for forms and specific content

### Spacing Observations
- Generous whitespace between sections
- Comfortable padding within content areas
- Clear visual separation between homepage sections

### Grid System
- Responsive layout adapting from desktop to mobile
- Image-text combinations reflow on smaller screens

---

## Components

### Navigation
- **Style**: Pill-shaped buttons
- **Active state**: Darker green/olive background
- **Hover state**: Likely subtle color change
- **Position**: Fixed/sticky at top with green gradient background

### Buttons
- **Primary Button** (Contact Form "Send"):
  - Background: Green (matching brand)
  - Text: White
  - Shape: Rounded rectangle
  - Full-width on mobile

- **Navigation Pills**:
  - Background: Dark green/olive when active
  - Background: Transparent/light when inactive
  - Text: White/light
  - Shape: Pill/rounded

### Forms
- **Input Fields**:
  - Background: Light gray (`#C0C0C0` or similar)
  - Border: Minimal or none visible
  - Shape: Rectangular with slight rounding
  - Width: Full-width within container

- **Textarea**: Same style as inputs, larger height
- **Checkbox**: Standard with GDPR consent label
- **Labels**: Above fields, required fields marked with asterisk

### Cards/Content Blocks
- **Service blocks**: Text sections with accompanying mind map diagrams
- **Blog article previews**: Title + description + thumbnail images
- **Background**: Alternating between white and light beige/cream

### Icons
- **Social Media**: LinkedIn, Email, Phone (simple line icons)
- **Style**: Minimal, monochrome
- **Size**: Small to medium
- **Location**: Footer

### Images
- **Hero images**: Large, professional photography
- **Portrait**: Professional headshot, high quality
- **Conceptual imagery**:
  - Workspace/laptop scenes
  - Chess pieces (strategy metaphor)
  - Minimal product design (white chair)
- **Diagrams**: Mind maps with node-link structure in brand colors

---

## Visual Style

### Photography
- **Tone**: Professional, clean, slightly desaturated
- **Subjects**: Workspace technology, strategic thinking metaphors, minimalist design
- **Treatment**: Some blur/depth of field effects
- **Quality**: High resolution, professional

### Graphics/Diagrams
- **Mind Maps**: Node-link diagrams with color-coded elements
- **Colors**: Green spectrum with yellow/gold accent lines
- **Style**: Modern, clean, professional
- **Background**: Green gradient matching brand

### Patterns
- **Diagonal Stripes**: Green gradient stripes in navigation and footer
- **Gradients**: Multiple green tints creating depth
- **Transparency**: Layered transparent elements

---

## Responsive Behavior

### Breakpoints (Observed)
- **Desktop**: Full two-column layouts, large images
- **Tablet**: Likely adjusted column widths
- **Mobile**: Single column stack, full-width elements

### Mobile Considerations
- Navigation likely converts to hamburger menu
- Two-column layouts stack vertically
- Images scale to full container width
- Form remains functional and accessible

---

## Brand Personality

### Visual Tone
- **Professional**: Clean layouts, quality photography
- **Approachable**: Friendly portrait, accessible language
- **Strategic**: Chess imagery, structured diagrams
- **Modern**: Contemporary design patterns, GenAI focus
- **Organic**: Earth-tone green, natural feel

### Design Values
- Clarity over complexity
- Substance over flash
- Professionalism with warmth
- Strategic thinking visualization

---

## Design System Recommendations for Redesign

### Color Enhancements
1. **Expand palette**: Add 2-3 complementary accent colors
2. **Define color roles**: Primary, Secondary, Accent, Success, Warning, Error
3. **Create systematic tints/shades**: 50, 100, 200...900 scale for each color
4. **Improve contrast**: Ensure WCAG AA compliance for all text
5. **Add semantic colors**: Info, success, warning, error states

### Typography Improvements
1. **Establish clear hierarchy**: Use font weights (400, 500, 600, 700)
2. **Optimize line-heights**: 1.5-1.6 for body, 1.2-1.3 for headings
3. **Define type scale**: 8-point or modular scale system
4. **Add font-size tokens**: --text-xs, --text-sm, --text-base, --text-lg, etc.
5. **Letter-spacing refinement**: Especially for headings

### Spacing System
1. **Create spacing scale**: 4px base (4, 8, 16, 24, 32, 48, 64, 96, 128)
2. **Define spacing tokens**: --space-1 through --space-8
3. **Consistent section padding**: Vertical rhythm system
4. **Component spacing**: Internal padding/margin standards

### Component Library
1. **Button variants**: Primary, Secondary, Outline, Ghost, Link
2. **Button sizes**: Small, Medium, Large
3. **Form components**: Standardized input styles, error states
4. **Card components**: Blog cards, service cards, testimonial cards
5. **Navigation**: Desktop and mobile variants
6. **Icons**: Consistent icon library (FontAwesome, Heroicons, or custom)

### Design Tokens Structure
```css
:root {
  /* Colors */
  --color-primary: #68780E;
  --color-primary-light: #8FA518;
  --color-primary-dark: #4A5509;
  --color-text: #151515;
  --color-text-secondary: #4A4A4A;
  --color-background: #FFFFFF;
  --color-background-alt: #F8F8F6;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'OpenSans', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

---

## Technical Recommendations

### Performance
- Optimize images (WebP format, lazy loading)
- Minimize CSS/JS bundles
- Consider static site generation vs WordPress
- Implement caching strategy

### Accessibility
- Ensure sufficient color contrast (WCAG AA minimum)
- Add focus states for keyboard navigation
- Semantic HTML structure
- Alt text for all images
- ARIA labels where needed

### SEO
- Maintain/improve schema markup
- Optimize meta descriptions
- Add Open Graph images
- Structured data for articles/events
- Fast page load times

### Modern Stack Consideration
- **Option 1**: Continue WordPress with custom theme
- **Option 2**: Move to Astro/Next.js for performance
- **Option 3**: Headless WordPress with modern frontend

---

## Files & Assets Inventory

### Current Visuals Captured
1. Homepage sections (5 screenshots)
2. Beratungsleistungen page (3 screenshots)
3. Wissenswertes page (2 screenshots)

### Asset Types Identified
- Professional portrait photo
- Workspace/laptop imagery
- Chess piece photography (strategy metaphors)
- Minimal product design (white chair)
- Mind map diagrams (Strategy, Efficiency, Operational)
- Summer School presentation slides
- Social media icons

### Design File Needs for Redesign
- Logo files (SVG, PNG)
- Full photography library
- Icon set
- Diagram source files
- Brand guidelines document (if exists)

---

## Conclusion

The current design system is **clean and professional** but has opportunities for:
1. **Systematization**: Implement design tokens for consistency
2. **Expansion**: Broader color palette and typography hierarchy
3. **Enhancement**: Improved contrast and accessibility
4. **Modernization**: Updated visual treatments while maintaining professionalism
5. **Component library**: Reusable, consistent components

The brand identity is strong with the green/olive color and professional tone. The redesign should **preserve these strengths** while addressing the technical and systematic improvements outlined above.
