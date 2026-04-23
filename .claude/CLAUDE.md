# CLAUDE.md — ImmoGrowth Project Rules

This file is automatically loaded by Claude Code at the start of every session. All rules below are **mandatory** on every task — no exceptions. They are derived from the four active skills in `.claude/skills/`.

---

## PROJECT CONTEXT

- **Client:** ImmoGrowth — AI marketing specialist, Swiss SME focus, real estate niche
- **Stack:** Plain HTML + CSS (`assets/css/style.css`) + Vanilla JS (`assets/js/script.js`)
- **CSS approach:** Custom CSS variables — NOT Tailwind (this is a plain HTML project)
- **Icons:** Phosphor Icons (`@phosphor-icons/web`)
- **i18n:** `data-i18n` attributes + `assets/js/script.js` locale switcher
- **Locales:** `de-CH` (default), `fr-CH`, `en-US`
- **Brand colors:** Orange (`#D4622C`), Navy (`#1B2A44`), Off-white (`#FAF9F5`)
- **Fonts:** Plus Jakarta Sans (headings, 600/700) + Inter (body, 400/500)
- **Spacing:** 8px base grid — `--sp-1` (4px) through `--sp-9` (120px)
- **Target:** WCAG 2.1 AA, Swiss nLPD + GDPR-compatible, Core Web Vitals "Good"

---

## ACTIVE SKILLS (ALL FOUR ALWAYS APPLY)

---

# SKILL 1 — DESIGN

> Full reference: `.claude/skills/design-SKILL.md`

### Core philosophy
- **Trust over flair.** Every decision makes the business look reliable — not startup-like.
- **Content-first.** Layout serves the content, not the other way around.
- **Mobile is primary.** Every layout decision starts at 375px and scales up.

### Spacing system
- Section padding: `var(--sp-9)` (120px) top/bottom minimum. Never less than `var(--sp-6)` (48px).
- Card grid gap: `var(--sp-4)` (24px) minimum.
- CTA margin below supporting text: `var(--sp-5)` (32px).
- Body copy: never exceed 760px width (optimal readability line length).

### Shadow rules
- NEVER use raw `box-shadow: 0 4px 8px #000` — always warm rgba.
- Base shadow: `0 4px 24px rgba(30,28,25,0.08)`
- Hover elevation: `0 8px 32px rgba(30,28,25,0.12)`
- Shadow color opacity: never above 0.15. Never pure `#000`.

### Typography
- H1: Plus Jakarta Sans 700, 48–64px. H2: 700, 32–40px. H3: 600, 24px. Body: Inter 400, 16px.
- `line-height: 1.6` for body. Tight leading only for large display headings.
- Never more than 2 font families.

### Color usage
- `--accent` (#D4622C): CTAs, active states, highlights only — NEVER large backgrounds.
- `--navy` / `--navy-dark`: dark section backgrounds (testimonials, footer, CTA bands).
- `--bg` (#FAF9F5): default page background — warmer than pure white.
- Never pure `#000000` for text. Use `--text` (#1E1C19).
- Gradients: only as photo overlays for text legibility. NEVER on buttons or UI elements.

### Layout & components
- Hero: H1 with primary keyword, 1–2 sentence support, primary CTA, optional secondary link.
- Navigation: sticky, logo left, links right, CTA button rightmost. Mobile: hamburger only.
- Footer: always include logo, description, nav links, contact info, legal links (Impressum, Datenschutz, AGB), dynamic copyright year with actual street address.
- CTA buttons: `border-radius: var(--r-btn)` (6px). NEVER pill/rounded-full for primary CTAs. NEVER gradient buttons. NEVER emoji in button text.
- Touch targets: minimum 44×44px on all interactive elements.
- Add `cursor: pointer` on every clickable element that is not a native `<button>` or `<a>`.

### Z-index system — always use this scale, never arbitrary numbers
```
0    → base content
10   → dropdowns / tooltips (relative)
50   → sticky navigation
100  → overlays / backdrops
200  → modals / cookie banner
300  → toast notifications
400  → tooltips
```

### Interaction states — all required, never deliver static-only components
- Hover: `transition: all 0.3s cubic-bezier(0.4,0,0.2,1)`
- Focus: `outline: 2px solid var(--accent); outline-offset: 3px` — NEVER remove without a replacement
- Disabled: `opacity: 0.5; cursor: not-allowed; pointer-events: none`
- Active/pressed: `transform: scale(0.98)` on buttons
- `prefers-reduced-motion` — ALWAYS add:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance (Core Web Vitals — all three must be "Good")
- Hero images: `fetchpriority="high"` — NEVER `loading="lazy"` above the fold.
- ALL images: explicit `width` + `height` attributes — prevents CLS.
- Below-fold images: `loading="lazy"`.
- Fonts: always `display=swap` — prevents FOIT.
- Max hero image: 200KB. Property thumbnails: 50–80KB. Format: WebP/AVIF.

### Mandatory test breakpoints before delivery
- `375px` — iPhone SE (minimum supported)
- `768px` — tablet portrait
- `1024px` — laptop
- `1440px` — wide desktop

### Anti-cliché rules — BANNED
- ❌ Three-column icon + heading + text grid as the only feature section pattern
- ❌ Gradient hero backgrounds (blue-to-purple, teal-to-green)
- ❌ Stock photo testimonial avatars — real names + photos only
- ❌ Emoji anywhere in UI
- ❌ Every section center-aligned — vary alignment intentionally
- ❌ Placeholder copy: "Lorem ipsum", "John Doe", "Acme Corp"
- ❌ Generic hero text: "Welcome to our website", "We are your partner for..."
- ❌ `shadow-lg` or any shadow without warm rgba tinting
- ❌ Contact forms with no visible response time expectation
- ❌ Maps without actual business address/marker

---

# SKILL 2 — COMPLIANCE

> Full reference: `.claude/skills/compliance-SKILL.md`

### Cookie consent — CRITICAL (nLPD + GDPR hard requirement)
- Tracking cookies MUST NOT load before explicit opt-in consent.
- Banner: fixed bottom, `z-index: 200`, appears before any analytics initialize.
- Store consent in `localStorage` key `cookie_consent` — values: `'accepted'` | `'declined'` | `null`
- Decline must be equally prominent as Accept — NEVER grey out, shrink, or hide Decline.
- NEVER pre-check any consent box. NEVER use dark patterns.
- Only load analytics when `localStorage.getItem('cookie_consent') === 'accepted'`.

### Required legal pages — every Swiss business website must have all three
1. **Impressum** — company legal name, full physical address (no P.O. box), phone, email, UID (CHE-XXX.XXX.XXX), responsible person.
2. **Datenschutzerklärung** — data controller identity, what data is collected, purpose, storage duration, third-party list (Google, Meta, hosting provider + country), user rights (access, correction, deletion, portability, objection), last-updated date. For Google Analytics: must name Google Ireland Limited, state IP anonymization, link to Google privacy policy.
3. **AGB** — scope, commission terms, exclusivity, duration/termination, liability limitation (Swiss OR Art. 100), applicable law (Swiss OR/ZGB), Gerichtsstand (city of agency registration).
4. **Footer links on every page** — Impressum | Datenschutz | AGB (locale-aware labels).

Locale-aware footer link labels:
```
de-CH: Impressum | Datenschutz | AGB
fr-CH: Mentions légales | Politique de confidentialité | CGV
en-US: Legal Notice | Privacy Policy | Terms & Conditions
```

### Contact forms — data protection requirements
- Always include a visible data processing notice (above or below form).
- Consent checkbox: unchecked by default, required before submit enables.
- Honeypot spam protection — always include:
```html
<input type="text" name="_honeypot" style="display:none" tabindex="-1" aria-hidden="true" autocomplete="off">
```

### WCAG 2.1 AA — Accessibility
- Normal text (< 18px): minimum **4.5:1** contrast ratio.
- Large text (≥ 18px / ≥ 14px bold): minimum **3:1**.
- UI components (buttons, inputs, icons): minimum **3:1** against adjacent color.
- Focus states: always visible — never remove `outline` without a styled replacement.
- Images: every `<img>` has descriptive `alt`. Decorative images: `alt=""`. NEVER `alt="image"` or `alt="photo"`.
- Forms: every input has an associated `<label>`. NEVER use placeholder text as the only label.
- Semantic HTML: use `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<aside>`.
- One `<h1>` per page. NEVER skip heading levels (no H1 → H3 without H2).
- Buttons: always `<button>`. Links: always `<a href>`. NEVER `<div onClick>`.
- Nav landmark: `<nav aria-label="Hauptnavigation">`.
- Icon-only buttons: `aria-label` on the `<button>`, `aria-hidden="true"` on the icon.
- Mobile menu toggle: `aria-expanded` + `aria-controls` attributes.

### HTML lang attribute
```html
<html lang="de-CH">  <!-- always set to the active locale -->
```

---

# SKILL 3 — CONTENT

> Full reference: `.claude/skills/content-SKILL.md`

### Multilingual architecture
- Build multilingual from day one — even if only German launches first.
- Active locales: `de-CH` (default), `fr-CH`, `en-US`.
- Use `data-i18n` attributes on ALL user-facing text. NEVER hardcode strings in HTML.
- `hreflang` tags on every page for all active locales + `x-default` pointing to de-CH URL.
- `lang` attribute on `<html>` must match the active locale.

### Swiss German copy tone
- Always **"Sie"** (formal) unless client explicitly approves "du" in writing.
- Swiss spelling — non-negotiable: `ss` NOT `ß`.
  - `Strasse` not `Straße` · `weiss` not `weiß` · `Grösse` not `Größe` · `Masse` not `Maße`
- Tone: direct, factual, understated. Swiss business culture values substance over enthusiasm.

```
✅ "Über 200 erfolgreich vermittelte Objekte in der Region Zürich"
❌ "Wir bringen Ihre Traumimmobilie zu Ihnen!"
```

### Banned words — NEVER use in any copy

**German — banned:**
`revolutionär` · `nahtlos` · `nahtlose Erfahrung` · `erstklassig` · `massgeschneidert` · `zukunftsweisend` · `innovativ` · `ganzheitlich` · `nachhaltig` (unless factually true) · `umfassend` · `Mehrwert schaffen` · `auf Augenhöhe` · `Leidenschaft` · `wir leben [X]` · `wir atmen [X]` · `Ihre Zufriedenheit ist unser Ziel`

**English — banned:**
`Seamless experience` · `Next-gen` · `Game-changing` · `Cutting-edge` · `Leverage` (as verb) · `Synergy` · `Holistic` · `Empower` · `Unlock` · `Delve` · `Comprehensive` (as filler) · `Tailored solutions` · `State-of-the-Art` · `Boost`

**Instead:** use specific, verifiable, concrete language with numbers and location.

### Technical SEO — non-negotiable
- Page title: `[Primary Keyword] | [Business Name] — [City]`, max **60 chars**, unique per page.
- Meta description: **150–160 chars**, action-oriented, locale-specific, unique per page.
- Canonical tag on every page.
- Legal pages: `<meta name="robots" content="noindex, follow">`.
- Open Graph meta on every page — custom `og:image` 1200×630px per page.
- Sitemap.xml + robots.txt must be present.
- Internal links: descriptive anchor text — NEVER "click here" or "read more".
- Image `alt` text: location-specific and descriptive — `"3.5-Zimmer-Wohnung Zürich Seefeld"` not `"Wohnung"`.
- Image file names: descriptive kebab-case — `buero-muttenz-empfang.webp` not `IMG_2847.jpg`.

### Structured data (JSON-LD in `<head>`)
- **Homepage:** `LocalBusiness` + `RealEstateAgent` schema with address, phone, geo, openingHours, aggregateRating.
- **All sub-pages:** `BreadcrumbList` schema.
- **Service pages:** `FAQPage` schema (4–8 questions).
- **Agent pages:** `Person` schema with credentials.

### GEO (Generative Engine Optimization — AI search visibility)
- Every service page opens with a **2–3 sentence direct-answer paragraph** before any other content. This is the passage most likely to be quoted verbatim by ChatGPT, Perplexity, and Google AI Overviews.
- FAQ sections: 4–8 self-contained questions per service page. Each answer readable without surrounding page context.
- E-E-A-T signals: full agent bio with name, photo, credentials (SVIT membership), years of experience on all content pages.
- Include specific local market data with dates: `"Leerstandsquote Kanton Zürich Q4 2024: 0.07%"`.
- Entity signals: use real neighborhood names (not just cities), real associations (SVIT), real street names. Link to Google Maps, LinkedIn.

### NAP consistency (critical for local SEO)
Name, Address, Phone must be **identical** across: website footer, contact page, schema markup, Google Business Profile, local.ch, search.ch. Define canonical format at project start:
```
Name:    "ImmoGrowth"
Address: "[Strasse] [Nr], [PLZ] Muttenz"
Phone:   "+41 76 586 09 01"
```

---

# SKILL 4 — OUTPUT

> Full reference: `.claude/skills/output-SKILL.md`

### The core rule
**Never deliver half-finished code.** If a component, page, or function is started, it is completed in full. No exceptions. If a task is too large for one response, state upfront: `"This will be written in N parts."` — then complete all parts.

### Banned output patterns — NEVER produce
```
// TODO: implement this
// Add your content here
// ... rest of component
// existing code here

"Lorem ipsum"
name="John Doe" / "Max Mustermann"
src="/placeholder.jpg"
if (condition) { // handle this case }
```

The ONLY acceptable placeholder format when content is genuinely unknown:
```
// [STUB — requires client input: describe exactly what is needed]
```

### Complete file output
NEVER output partial files. NEVER write:
- `// ... existing imports stay the same`
- `// ... rest unchanged`
- `// existing code here`

Always output the complete file from first line to last line.

### Component completeness — all interactive components must implement ALL states
- Default / loaded
- Loading (skeleton matching layout shape — NEVER a generic spinner for content areas)
- Empty (icon + heading + text + action — NEVER a blank area)
- Error (human-friendly message in active locale + retry action)
- Hover / focus / active / disabled

### Naming conventions
- HTML files: `kebab-case.html`
- CSS class names: semantic descriptors matching the component role
- JS functions: `camelCase`, `handle` prefix for event handlers (`handleSubmit`, `handleMenuToggle`)
- JS booleans: `is` / `has` / `can` prefix (`isLoading`, `hasError`, `canSubmit`)
- Locale variable: always named `locale` — NEVER `lang`, `language`, `loc`
- Image files: descriptive kebab-case with location — `buero-muttenz-empfang.webp`
- Translation keys: `section.element` dot notation — `hero.headline`, `footer.copyright`

### Comment standards
Comments explain **why**, never **what**. Never comment what the code obviously does.
```js
// ✅ Correct — explains non-obvious decision
// min-h: 100dvh instead of height: 100vh prevents iOS Safari layout jump (CLS penalty)

// ✅ Correct — marks deliberate stub
// [STUB — requires client: Replace with verified Google Maps embed key]

// ❌ Banned — explains the obvious
// This is the submit button
```

### Locale-aware formatting — always use these, never raw strings
```js
// Currency — Swiss format uses apostrophe as thousands separator
new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 0 }).format(1250000)
// → "CHF 1'250'000"

// Dates
new Intl.DateTimeFormat('de-CH', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
// → "10. April 2025"

// Phone: always international format
"+41 76 586 09 01"

// Address: Swiss postal format
"Musterstrasse 12\n4132 Muttenz"
```

---

## MASTER PRE-DELIVERY CHECKLIST

Run through this before marking any task complete:

### Design
- [ ] Mobile-first — tested at 375px, 768px, 1024px, 1440px
- [ ] Brand CSS variables used — no hardcoded hex values in new code
- [ ] Heading scale correct, no skipped levels
- [ ] Shadows: warm rgba, not raw black
- [ ] Z-index: defined scale from above, no arbitrary numbers
- [ ] `cursor: pointer` on all non-native clickable elements
- [ ] All states: hover, focus, disabled, active/pressed
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets ≥ 44px on all interactive elements
- [ ] Form inputs ≥ 16px font size (prevents iOS auto-zoom)
- [ ] Hero images: `fetchpriority="high"`, NOT lazy
- [ ] All images: explicit `width` + `height` attributes

### Compliance
- [ ] No tracking scripts load before cookie consent
- [ ] Contact forms: visible data notice + unchecked consent checkbox + honeypot field
- [ ] WCAG AA contrast verified for all text and UI elements
- [ ] All focus states visible — tab through every interactive element
- [ ] All images have descriptive `alt` attributes
- [ ] All form inputs have associated `<label>` elements
- [ ] Semantic HTML landmarks: `<nav>`, `<main>`, `<header>`, `<footer>`
- [ ] `lang` attribute on `<html>` matches active locale
- [ ] Legal footer links (Impressum, Datenschutz, AGB) on every page

### Content
- [ ] All user-facing strings use `data-i18n` — no hardcoded text
- [ ] Formal "Sie" throughout German copy
- [ ] Swiss `ss` spelling — no `ß` anywhere
- [ ] No banned buzzwords (German or English)
- [ ] Unique page title ≤ 60 chars with location keyword
- [ ] Unique meta description 150–160 chars
- [ ] Canonical tag on every page
- [ ] `noindex` on legal pages (Impressum, Datenschutz, AGB)
- [ ] Open Graph meta on every page
- [ ] `hreflang` tags for all active locales + `x-default`
- [ ] One `<h1>` per page, no skipped heading levels
- [ ] Descriptive alt text on all images
- [ ] Structured data where applicable (LocalBusiness, BreadcrumbList, FAQPage)

### Output
- [ ] No `// TODO` without `[STUB — requires: ...]` format
- [ ] No placeholder text in rendered UI
- [ ] Complete file output — no "rest unchanged" shortcuts
- [ ] Naming conventions followed
- [ ] Comments explain *why* not *what*
- [ ] Locale-aware number, date, and currency formatting
- [ ] All interactive components have complete state coverage
