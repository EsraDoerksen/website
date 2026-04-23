# COMPLIANCE SKILL — Swiss Legal, Privacy & Accessibility
> Use this skill on every project. Covers Swiss nLPD data protection, GDPR-compatible patterns, cookie consent, AGB, WCAG AA accessibility, and required legal pages.
>
> Cross-references: skills/design/SKILL.md · skills/content/SKILL.md · skills/output/SKILL.md

---

## SECTION 1 — WHY THIS MATTERS

Switzerland's revised Data Protection Act (revDSG / nLPD) came into force on 1 September 2023. It applies to all websites operated by or for Swiss businesses. Since many Swiss sites also attract EU visitors, GDPR-compatible patterns are required simultaneously. Non-compliance creates legal exposure for clients — every site must be compliant from day one.

---

## SECTION 2 — COOKIE CONSENT

**Rule:** Tracking cookies (Google Analytics, Meta Pixel, etc.) MUST NOT load before the user gives explicit opt-in consent. Hard requirement under both nLPD and GDPR.

**Implementation pattern:**
```tsx
// Consent must be opt-IN (never opt-out, never pre-checked)
// Consent banner appears on first visit before ANY tracking loads
// Store consent in localStorage key: 'cookie_consent'
// Values: 'accepted' | 'declined' | null (null = not yet decided)

// Banner text by locale:
const bannerText = {
  'de-CH': {
    heading: "Diese Website verwendet Cookies",
    body: "Wir verwenden Cookies zur Analyse und Verbesserung der Nutzung. Sie können ablehnen, ohne Einschränkungen.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    privacy: "Datenschutzerklärung"
  },
  'fr-CH': {
    heading: "Ce site utilise des cookies",
    body: "Nous utilisons des cookies pour analyser et améliorer l'expérience. Vous pouvez refuser sans restriction.",
    accept: "Accepter",
    decline: "Refuser",
    privacy: "Politique de confidentialité"
  },
  'it-CH': {
    heading: "Questo sito utilizza cookie",
    body: "Utilizziamo i cookie per analizzare e migliorare l'esperienza. Potete rifiutare senza restrizioni.",
    accept: "Accetta",
    decline: "Rifiuta",
    privacy: "Informativa sulla privacy"
  },
  'en-US': {
    heading: "This website uses cookies",
    body: "We use cookies to analyze and improve your experience. You may decline without any restrictions.",
    accept: "Accept",
    decline: "Decline",
    privacy: "Privacy Policy"
  }
}
```

**Banner placement & behavior:**
- Fixed to bottom: `fixed bottom-0 left-0 right-0 z-[200]`
- Appears BEFORE any analytics scripts initialize
- Must include link to privacy policy page
- Decline must be equally visible as Accept — NEVER grey out or shrink Decline
- NEVER pre-check consent boxes
- NEVER use dark patterns (e.g., large Accept button, tiny Decline link)

**Conditional script loading:**
```tsx
useEffect(() => {
  if (localStorage.getItem('cookie_consent') === 'accepted') {
    // initialize Google Analytics / Meta Pixel / etc.
  }
}, [])
```

---

## SECTION 3 — REQUIRED LEGAL PAGES

Every Swiss business website MUST have the following pages. Generate stubs if client content is not yet ready, but never launch without them.

### 3.1 — Impressum (Legal Notice) [MANDATORY]

Required content:
- Company legal name and legal form (e.g., "Muster Immobilien GmbH")
- Registered street address (no P.O. box — full physical address)
- Phone number
- Email address
- UID (VAT number): format CHE-XXX.XXX.XXX
- Commercial register entry (Handelsregister), if applicable
- Responsible person for content (name + function)

Optional but recommended:
- Responsible regulatory body (if licensed profession)
- Disclaimer on liability for external links

**Locale note:** Generate the Impressum in the primary locale (de-CH). For multilingual sites, provide translated versions but keep the legal entity data identical.

### 3.2 — Datenschutzerklärung / Privacy Policy [MANDATORY]

Required content under nLPD:
- Identity and contact details of data controller
- What personal data is collected (name, email, IP, form data, analytics)
- Purpose and legal basis for each data type
- Storage duration for each data category
- Whether data is shared with third parties (Google, Meta, hosting provider, etc.) and where (country)
- User rights: access, correction, deletion, data portability, objection
- Contact for data subject requests (email or form)
- Date of last update

**For Google Analytics specifically:**
- Must name Google Ireland Limited as processor
- Must state that IP addresses are anonymized
- Must link to Google's own privacy policy

### 3.3 — AGB (Allgemeine Geschäftsbedingungen / General Terms & Conditions)

**Status: MANDATORY for any site that includes service agreements, bookings, purchase flows, or client contracts. Strongly recommended for all real estate agency sites.**

**Mandatory AGB content (real estate context):**
```
1. Geltungsbereich — Scope: which services are covered, who the contracting parties are
2. Vertragsschluss — Contract formation: how the client-agent relationship is established
3. Leistungsumfang — Scope of services: what is included in the agency mandate
4. Provisionsregelung — Commission: percentage, when it becomes due, payment terms
5. Exklusivität — Exclusivity: whether the mandate is exclusive or non-exclusive
6. Laufzeit und Kündigung — Duration and termination: notice periods, conditions
7. Pflichten des Auftraggebers — Client obligations: cooperation, information provision
8. Haftungsbeschränkung — Liability limitation: to the extent permitted by Swiss law (OR Art. 100)
9. Datenschutz — Data protection: reference to full Datenschutzerklärung
10. Anwendbares Recht — Applicable law: Swiss law (OR / ZGB)
11. Gerichtsstand — Place of jurisdiction: city where the agency is registered
```

**Optional AGB content (add if applicable):**
```
- Widerrufsrecht — Right of withdrawal (if consumer contract under OR)
- Anzahlung / Retainer — Deposit or retainer payment terms
- Urheberrecht — Copyright on marketing materials produced by agent
- Force majeure clause
- Änderungsvorbehalt — Right to modify AGB (with notice period)
```

**Important notes:**
- AGB must be accessible before contract formation (not buried in footer only)
- A checkbox acknowledging AGB must be present on any engagement/booking form
- For B2C real estate services in Switzerland, AGB must comply with Swiss OR (Obligationenrecht)
- Do NOT copy AGB from another business — each must reflect the actual services offered
- Recommend client has AGB reviewed by a Swiss lawyer before launch
- Generate a well-structured stub with `[STUB — requires client/legal input: ...]` markers on all specific terms

**Footer link:** Always include alongside Impressum and Datenschutz.

### 3.4 — Footer Links (mandatory on every page)

```tsx
<footer>
  <a href={`/${locale}/impressum`}>Impressum</a>
  <a href={`/${locale}/datenschutz`}>Datenschutz</a>
  <a href={`/${locale}/agb`}>AGB</a>
  {/* Copyright with dynamic year */}
  <p>© {new Date().getFullYear()} [Business Name]. Alle Rechte vorbehalten.</p>
</footer>
```

Locale-aware footer link labels:
```
de-CH: Impressum | Datenschutz | AGB
fr-CH: Mentions légales | Politique de confidentialité | CGV
it-CH: Note legali | Informativa sulla privacy | CGC
en-US: Legal Notice | Privacy Policy | Terms & Conditions
```

---

## SECTION 4 — CONTACT FORMS

Every contact form collecting personal data requires a data processing notice and consent checkbox.

```tsx
// Data notice (above or below form, always visible)
<p className="text-sm text-neutral-500">
  {locale === 'de-CH' && 'Ihre Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Weitere Informationen: '}
  {locale === 'fr-CH' && 'Vos données sont utilisées uniquement pour traiter votre demande et ne sont pas transmises à des tiers. Plus d\'informations: '}
  {locale === 'it-CH' && 'I suoi dati vengono utilizzati esclusivamente per elaborare la sua richiesta e non vengono trasmessi a terzi. Maggiori informazioni: '}
  {locale === 'en-US' && 'Your data is used solely to process your inquiry and is not shared with third parties. More information: '}
  <a href={`/${locale}/datenschutz`}>{privacyLabel[locale]}</a>
</p>

// Consent checkbox (required, unchecked by default)
<label className="flex items-start gap-2">
  <input type="checkbox" required className="mt-1" />
  <span className="text-sm">
    {/* de-CH: */}
    Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.
  </span>
</label>
```

**Rules:**
- Checkbox unchecked by default — never pre-checked
- Submit button disabled until checkbox is checked
- Data must reach a server/email — never client-side state only
- Include honeypot field for spam protection (hidden input, checked server-side):
```tsx
{/* Honeypot — hidden from users, catches bots */}
<input
  type="text"
  name="_honeypot"
  tabIndex={-1}
  aria-hidden="true"
  className="hidden"
  autoComplete="off"
/>
```

---

## SECTION 5 — WCAG AA ACCESSIBILITY

All interfaces must meet WCAG 2.1 Level AA. These are the highest-frequency violations:

**Color Contrast:**
- Normal text (< 18px / < 14px bold): minimum **4.5:1** contrast ratio
- Large text (≥ 18px / ≥ 14px bold): minimum **3:1**
- UI components (buttons, inputs, icons): minimum **3:1** against adjacent color
- Verify at: https://webaim.org/resources/contrastchecker/
- NEVER light grey body text on white backgrounds

**Focus States:**
```tsx
// Apply to all interactive elements — never remove outline without replacement
className="focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none"
```
- Test keyboard navigation: Tab through entire page, every interactive element reachable
- Focus indicator must be visible against all backgrounds

**Images:**
- Every `<img>`: descriptive `alt` attribute
- Decorative images: `alt=""` (empty string — not missing attribute)
- Property photos: specific alt — `alt="Wohnzimmer der 4-Zimmer-Wohnung an der Musterstrasse 12, Zürich"`
- NEVER `alt="image"` or `alt="photo"`

**Forms:**
- Every input: associated `<label>` — NEVER use placeholder as the only label
- Required fields: `required` attribute + visual asterisk with legend explaining it
- Error messages: use `aria-describedby` to associate with field

```tsx
<label htmlFor="email">
  {locale === 'de-CH' ? 'E-Mail-Adresse' : 'Email Address'} *
</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-error"
  className="text-base ..." // min 16px prevents iOS zoom
/>
<p id="email-error" role="alert" className="text-red-600 text-sm hidden">
  {locale === 'de-CH' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : 'Please enter a valid email address.'}
</p>
```

**Semantic HTML:**
- Use: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<aside>`
- One `<h1>` per page. Never skip heading levels.
- Buttons: always `<button>`. Links: always `<a href>`. Never `<div onClick>`.

**ARIA:**
- Nav landmark: `<nav aria-label="Hauptnavigation">` (or locale equivalent)
- Mobile menu toggle: `aria-expanded` + `aria-controls`
- Icon-only buttons: `aria-label` on button, `aria-hidden="true"` on icon

```tsx
<button aria-label={locale === 'de-CH' ? 'Anrufen' : 'Call us'}>
  <Phone size={20} weight="regular" aria-hidden="true" />
</button>
```

---

## SECTION 6 — HTML LANG ATTRIBUTE

Always set the correct `lang` on `<html>`. Required for both accessibility and SEO.

```html
<html lang="de-CH">  <!-- German Switzerland -->
<html lang="fr-CH">  <!-- French Switzerland -->
<html lang="it-CH">  <!-- Italian Switzerland -->
<html lang="en-US">  <!-- English (US) -->
```

In Next.js App Router with `next-intl`, this is handled automatically via locale routing — always verify it is not left as default `lang="en"`.

---

## SECTION 7 — COMPLIANCE CHECKLIST

Before delivery, every project must pass:

**Legal pages:**
- [ ] Impressum with complete legal info (UID, address, responsible person)
- [ ] Datenschutzerklärung with nLPD-required content and third-party list
- [ ] AGB stub generated with `[STUB]` markers on client-specific terms
- [ ] Footer links: Impressum + Datenschutz + AGB on every page (locale-aware labels)
- [ ] Copyright year dynamic: `new Date().getFullYear()`

**Data & cookies:**
- [ ] Cookie consent banner (opt-in, loads before all analytics)
- [ ] No tracking scripts load before consent
- [ ] Contact form data notice present and visible
- [ ] Contact form consent checkbox unchecked by default
- [ ] Honeypot spam protection on all forms

**Accessibility:**
- [ ] WCAG AA contrast verified for all text and UI elements
- [ ] All focus states visible — keyboard navigation tested
- [ ] All images have descriptive alt attributes
- [ ] All form inputs have associated labels (not just placeholders)
- [ ] Semantic HTML landmarks used correctly
- [ ] One H1 per page, no skipped heading levels
- [ ] `lang` attribute set to active locale on `<html>`
- [ ] Icon-only buttons have `aria-label`
