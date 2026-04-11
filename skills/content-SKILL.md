# CONTENT SKILL — Multilingual Structure, Copy Quality, SEO & GEO
> Use this skill on every project. Covers Swiss multilingual site architecture (de-CH, fr-CH, it-CH, en-US), copy quality rules, technical SEO, and GEO (Generative Engine Optimization) for AI search visibility.
>
> Cross-references: skills/design/SKILL.md · skills/compliance/SKILL.md · skills/output/SKILL.md

---

## SECTION 1 — MULTILINGUAL ARCHITECTURE (ALWAYS FROM DAY ONE)

Build multilingual from the start — even if only German launches first. Retrofitting i18n later is expensive and creates structural SEO damage.

**Supported locales:**
```
de-CH  → German Switzerland (default)
fr-CH  → French Switzerland (Romandy)
it-CH  → Italian Switzerland (Ticino)
en-US  → English (US) — for international visitors, expat market
```

**Scaffold all four locales at project start.** fr-CH, it-CH, and en-US can contain stubs at launch — but the file structure and routing must exist.

---

### Next.js (App Router) Setup

```bash
npm install next-intl
```

```ts
// next.config.ts
const nextConfig = {
  i18n: {
    locales: ['de-CH', 'fr-CH', 'it-CH', 'en-US'],
    defaultLocale: 'de-CH',
  },
}
```

**File structure:**
```
messages/
  de-CH.json   ← primary, always complete
  fr-CH.json   ← stub at launch: [STUB — requires translation]
  it-CH.json   ← stub at launch: [STUB — requires translation]
  en-US.json   ← stub at launch: [STUB — requires translation]
```

**Usage:**
```tsx
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  return (
    <>
      <h1>{t('headline')}</h1>
      <p>{t('subheadline')}</p>
      <a href={t('ctaUrl')}>{t('ctaLabel')}</a>
    </>
  )
}
```

**NEVER hardcode user-facing text strings in components.** Every visible string goes through the translation system, including: button labels, error messages, alt text, aria-labels, meta titles, and meta descriptions.

---

### Plain HTML Setup

```html
<html lang="de-CH" data-locale="de-CH">
<h1 data-i18n="hero.headline">Ihr Immobilienmakler in Zürich</h1>
```

```js
// locales/de-CH.js
const translations = {
  'hero.headline': 'Ihr Immobilienmakler in Zürich',
  // fr-CH.js, it-CH.js, en-US.js follow same structure
}
```

---

## SECTION 2 — HREFLANG & LOCALE URL STRUCTURE

Every page must declare all locale variants. This tells Google which language version to serve to which user. Missing hreflang is one of the most common technical SEO errors on multilingual sites.

```html
<head>
  <link rel="alternate" hreflang="de-CH" href="https://example.ch/de/" />
  <link rel="alternate" hreflang="fr-CH" href="https://example.ch/fr/" />
  <link rel="alternate" hreflang="it-CH" href="https://example.ch/it/" />
  <link rel="alternate" hreflang="en-US" href="https://example.ch/en/" />
  <link rel="alternate" hreflang="x-default" href="https://example.ch/" />
</head>
```

**URL structure:** Use locale prefix in path: `/de/`, `/fr/`, `/it/`, `/en/`. Never subdomain-only i18n unless client specifically requires it. The `x-default` should point to the de-CH version (the primary market).

**In Next.js:** Generate hreflang dynamically per page via the locale routing — never hardcode them.

---

## SECTION 3 — SWISS GERMAN COPY TONE

**Formal address:** Always **"Sie"** (formal) unless the client's brand explicitly uses "du". This applies to: button labels, form instructions, error messages, CTAs, onboarding copy, email templates.

```
✅ "Nehmen Sie jetzt Kontakt auf"
❌ "Nimm jetzt Kontakt auf"

✅ "Ihre Immobilie professionell vermarkten"
❌ "Deine Immobilie professionell vermarkten"
```

**Swiss spelling — non-negotiable:**
- Use `ss` NEVER `ß` — Swiss German does not use the Eszett
- `Strasse` not `Straße` · `weiss` not `weiß` · `Grösse` not `Größe` · `Masse` not `Maße`
- This applies to ALL German content including auto-generated copy

**Tone:** Direct, factual, understated. Swiss business culture values substance over enthusiasm. Copy should inform and reassure — never excite or hype.

```
✅ "Über 200 erfolgreich vermittelte Objekte in der Region Zürich"
❌ "Wir bringen Ihre Traumimmobilie zu Ihnen!"
```

---

## SECTION 4 — ANTI-SLOP COPY RULES [CRITICAL]

The following words are BANNED from all client-facing copy. They are AI defaults that signal inauthenticity and erode trust.

**Banned German terms:**
- revolutionär / nahtlos / nahtlose Erfahrung
- massgeschneidert (use: "individuell auf Ihre Bedürfnisse abgestimmt")
- erstklassig (use: specific proof, e.g. "15 Jahre Erfahrung")
- zukunftsweisend / innovativ (unless describing a specific feature)
- ganzheitlich / nachhaltig (unless factually accurate)
- umfassend (use specific scope instead)
- Mehrwert schaffen / auf Augenhöhe
- Leidenschaft (show it — never claim it)
- wir leben [X] / wir atmen [X]
- Ihre Zufriedenheit ist unser Ziel

**Banned English borrowings in German copy:**
- "seamless" / "Game-changer" / "Next-Level" / "State-of-the-Art" / "Boost"

**Banned English (en-US) terms:**
- "Seamless experience" / "Next-gen" / "Game-changing" / "Cutting-edge"
- "Leverage" (verb) / "Synergy" / "Holistic" / "Empower" / "Unlock"
- "Delve" / "Comprehensive" (as filler) / "Tailored solutions"

**Instead:** Use specific, verifiable, concrete language with numbers and location.
```
❌ "Wir bieten erstklassigen, ganzheitlichen Service"
✅ "Persönliche Beratung, von der Besichtigung bis zur Schlüsselübergabe"

❌ "We offer seamless, next-gen real estate solutions"
✅ "200+ properties sold in Greater Zurich since 2009"
```

---

## SECTION 5 — TECHNICAL SEO FOUNDATIONS

These are the non-negotiable technical SEO elements. Missing any of these leaves points on the table.

### 5.1 — Page Titles
- Format: `[Primary Keyword] | [Business Name] — [City/Region]`
- Max **60 characters** (Google truncates beyond this)
- Every page has a unique title — NEVER duplicate
- Include the locale-specific location in the title for local SEO

### 5.2 — Meta Descriptions
- Length: **150–160 characters**
- Action-oriented, locale-specific
- Include primary keyword naturally
- Format: `[What you offer] in [Location]. [Specific proof]. [CTA].`
- Examples:
  - de-CH: `Immobilien kaufen und verkaufen in Zürich. Über 200 erfolgreiche Vermittlungen. Jetzt kostenlose Beratung vereinbaren.`
  - en-US: `Buy and sell property in Zurich, Switzerland. 200+ successful sales since 2009. Book your free consultation today.`
- NEVER duplicate meta descriptions across pages

### 5.3 — Canonical Tags
Always specify the canonical URL to prevent duplicate content issues (especially important for multilingual sites and pages with URL parameters):
```html
<link rel="canonical" href="https://example.ch/de/immobilien-zuerich/" />
```
In Next.js App Router, set canonicals via `generateMetadata()`.

### 5.4 — Viewport & Robots Meta
```html
<!-- Always present in <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Default: index all pages unless explicitly excluded -->
<meta name="robots" content="index, follow" />

<!-- For legal pages (Impressum, Datenschutz, AGB) — exclude from index -->
<meta name="robots" content="noindex, follow" />
```

### 5.5 — Open Graph + Social Sharing
Always add Open Graph meta for every page — these control how the site appears when shared on LinkedIn, WhatsApp, etc. Critical for real estate agents who share listings on social.

```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Meta description]" />
<meta property="og:url" content="https://example.ch/de/[page-path]/" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://example.ch/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="de_CH" />
<meta property="og:locale:alternate" content="fr_CH" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:site_name" content="[Business Name]" />
```

OG image requirements: 1200×630px, under 8MB, JPG or PNG. Always generate a custom OG image per page — never reuse a generic one. Property listing pages: use the property's hero photo as OG image.

### 5.6 — Heading Hierarchy
- One `<h1>` per page — the primary keyword phrase for that page
- `<h2>` for main sections
- `<h3>` for subsections
- NEVER skip levels (H1 → H3 without H2)
- NEVER use headings for visual styling only — use CSS classes

### 5.7 — Sitemap.xml
Every project must have a sitemap. In Next.js App Router:
```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.ch/de/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'de-CH': 'https://example.ch/de/',
          'fr-CH': 'https://example.ch/fr/',
          'it-CH': 'https://example.ch/it/',
          'en-US': 'https://example.ch/en/',
        }
      }
    },
    // add all pages
  ]
}
```

### 5.8 — Robots.txt
```txt
User-agent: *
Allow: /

Sitemap: https://example.ch/sitemap.xml
```

### 5.9 — Internal Linking
Internal links distribute page authority and help Google understand site structure:
- Every page should link to at least 2–3 relevant internal pages
- Use descriptive anchor text — NEVER "click here" or "read more"
- Example: `<a href="/de/immobilien-zuerich">Immobilien in Zürich</a>` not `<a href="/de/page2">mehr erfahren</a>`
- Breadcrumbs on all sub-pages (see structured data below)
- Footer nav links reinforce important pages

### 5.10 — Image SEO
- All images: descriptive `alt` text including location keyword where relevant
- Example: `alt="3.5-Zimmer-Wohnung Seeblick Zürich Seefeld"` not `alt="Wohnung"`
- Image file names: descriptive kebab-case — `wohnung-zuerich-seefeld-wohnzimmer.jpg` not `IMG_2847.jpg`
- Use `next/image` for automatic WebP conversion and responsive `srcSet`

---

## SECTION 6 — STRUCTURED DATA (JSON-LD)

Structured data makes content machine-readable for Google and AI systems. Always add to `<head>` via `<script type="application/ld+json">`.

### 6.1 — LocalBusiness + RealEstateAgent [REQUIRED]
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "RealEstateAgent"],
  "name": "[Business Name]",
  "description": "[1–2 sentence description in primary locale]",
  "url": "https://example.ch/de/",
  "logo": "https://example.ch/logo.png",
  "image": "https://example.ch/office.jpg",
  "telephone": "+41 44 XXX XX XX",
  "email": "info@example.ch",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Strasse + Nr]",
    "addressLocality": "[Stadt]",
    "postalCode": "[PLZ]",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[lng]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "[City]"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[X.X]",
    "reviewCount": "[N]",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.google.com/maps/place/...",
    "https://www.linkedin.com/company/..."
  ]
}
```

### 6.2 — BreadcrumbList [REQUIRED on all sub-pages]
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.ch/de/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Immobilien kaufen",
      "item": "https://example.ch/de/immobilien-kaufen/"
    }
  ]
}
```

### 6.3 — FAQPage [REQUIRED on service pages]
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein Immobilienmakler in der Schweiz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In der Schweiz liegt die übliche Maklerprovision zwischen 2% und 3% des Verkaufspreises..."
      }
    }
  ]
}
```

### 6.4 — Review / AggregateRating [RECOMMENDED]
Include as part of LocalBusiness schema (see 6.1). If displaying individual reviews on the page, also add:
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "author": { "@type": "Person", "name": "Hans Müller" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "reviewBody": "[Review text]",
  "datePublished": "2024-03-15"
}
```

### 6.5 — Person (Agent Profile) [RECOMMENDED for individual agent pages]
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Agent Name]",
  "jobTitle": "Immobilienmakler",
  "worksFor": { "@type": "Organization", "name": "[Company]" },
  "telephone": "[+41...]",
  "email": "[email]",
  "image": "https://example.ch/team/agent-name.jpg",
  "description": "[Bio in primary locale]"
}
```

---

## SECTION 7 — GEO (GENERATIVE ENGINE OPTIMIZATION)

GEO prepares content to be surfaced by AI-powered search tools: ChatGPT, Perplexity, Google AI Overviews, Bing Copilot. These are increasingly important discovery channels, especially for expat/international real estate buyers.

### 7.1 — Direct-Answer Paragraphs
Every service page opens with a 2–3 sentence direct answer to the primary user question, before any other content. This is the most likely passage to be quoted verbatim by AI systems.

```
// Page: /de/immobilien-verkaufen/
// Direct answer paragraph:
"Beim Verkauf einer Immobilie in Zürich erzielen Verkäufer mit einem erfahrenen
Makler durchschnittlich 8–12% höhere Verkaufspreise als beim Direktverkauf.
[Business Name] begleitet Sie von der Marktbewertung bis zur Schlüsselübergabe —
ohne Vorauszahlungen, mit transparenter Provisionsregelung."

// Page: /en/selling-property-zurich/
// Direct answer paragraph:
"Selling property in Zurich with a licensed agent typically achieves 8–12% higher
sale prices compared to private listings. [Business Name] manages the full process
from valuation to key handover — no upfront fees, fully transparent commission."
```

### 7.2 — FAQ Sections
Every service page needs 4–8 FAQ questions. These are the most direct GEO signal — AI systems extract Q&A pairs directly.

Rules for GEO-effective FAQs:
- Question: use exact phrasing users actually search (include location: "in der Schweiz", "in Zurich")
- Answer: 2–4 sentences. Self-contained — readable without the surrounding page
- Include numbers and specific details wherever possible
- Write FAQ in all active locales

### 7.3 — E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)
Google and AI systems evaluate E-E-A-T to determine content quality. Required on every site:

- **Author/agent bio** on any content page: full name, years of experience, credentials (SVIT membership, certifications), photo
- **Publication date + last updated date** on all articles and blog posts
- **Specific credentials** visible on homepage and about page: license numbers, association memberships
- **Local market data**: cite specific statistics ("Durchschnittlicher Quadratmeterpreis in Zürich Q1 2024: CHF 12,800")
- **Case studies or sold listings**: specific addresses or anonymized deals with price ranges

### 7.4 — Speakable Schema (Voice Search / AI assistants)
Mark up content that should be read aloud by voice assistants:
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero-headline", ".direct-answer", ".faq-answer"]
  }
}
```

### 7.5 — Entity-Based SEO
AI systems and modern Google understand entities (real people, real places, real organizations) over keywords alone. Always:
- Mention specific neighborhood names, not just cities: "Zürich Seefeld", "Basel St. Johann"
- Mention actual street names in property descriptions
- Mention real associations: SVIT, local Maklerverbände
- Use real agent names with consistent formatting across all pages and schema
- Link to Google Maps, LinkedIn, association directories to establish entity connections

### 7.6 — Content Depth Signals
AI and Google reward pages that demonstrate real knowledge:
- Specific local market data with date: "Leerstandsquote Kanton Zürich Q4 2024: 0.07%"
- Process explanations: step-by-step descriptions of how the agent works
- Comparison content: "Verkauf mit Makler vs. Privatverkauf in der Schweiz"
- Timeframes: "durchschnittliche Vermarktungszeit in Zürich: 47 Tage (2024)"

### 7.7 — Passage Indexing
Google can index individual paragraphs independently. Each section of every page should:
- Be able to stand alone as an answer to a question
- Have its own sub-heading (H2 or H3)
- Not require the rest of the page to be understood

---

## SECTION 8 — GOOGLE BUSINESS PROFILE CONSISTENCY

Extremely important for local SEO: the NAP (Name, Address, Phone) must be **identical** across:
- The website (footer, contact page, schema)
- Google Business Profile
- Swiss business directories (local.ch, search.ch, moneyhouse.ch)
- SVIT member directory

Any discrepancy in address format, phone format, or business name reduces local ranking authority. Define the canonical format at project start and use it everywhere:

```
// Canonical NAP format — decide once, use everywhere
Name:    "[Business Name]"          // no abbreviations
Address: "[Strasse] [Nr], [PLZ] [Stadt]"
Phone:   "+41 44 XXX XX XX"         // always international format
```

---

## SECTION 9 — CONTENT CHECKLIST

Before delivery, verify:

**Multilingual structure:**
- [ ] All user-facing strings in translation files — no hardcoded text
- [ ] de-CH, fr-CH, it-CH, en-US locale files exist (fr/it/en can be stubs with [STUB] markers)
- [ ] `hreflang` tags on all pages for all four locales
- [ ] URL structure uses locale prefix (`/de/`, `/fr/`, `/it/`, `/en/`)
- [ ] `lang` attribute set to active locale on `<html>` element

**Copy quality:**
- [ ] Formal "Sie" form throughout German copy
- [ ] Swiss `ss` spelling — no `ß` anywhere
- [ ] No banned buzzwords (German or English)
- [ ] Direct-answer paragraph on each service page
- [ ] FAQ section (4–8 questions) with `FAQPage` schema on key pages

**Technical SEO:**
- [ ] Unique page title per page (≤ 60 chars, with location)
- [ ] Unique meta description per page (150–160 chars)
- [ ] Canonical tag on every page
- [ ] `noindex` on legal pages (Impressum, Datenschutz, AGB)
- [ ] Open Graph meta on every page (including custom og:image)
- [ ] One H1 per page, no skipped heading levels
- [ ] Descriptive alt text on all images
- [ ] Descriptive image file names (kebab-case, location-specific)
- [ ] Sitemap.xml generated and referenced in robots.txt
- [ ] Robots.txt present

**Structured data:**
- [ ] `LocalBusiness` + `RealEstateAgent` JSON-LD on homepage
- [ ] `BreadcrumbList` on all sub-pages
- [ ] `FAQPage` schema on service pages
- [ ] `AggregateRating` populated with real review data

**GEO:**
- [ ] E-E-A-T signals: agent bio with credentials and photo
- [ ] Specific local market data with dates
- [ ] Speakable schema on key pages
- [ ] Consistent NAP across site, schema, and external directories
