# OUTPUT SKILL — Code Completeness & Quality Standards
> Use this skill on every project. Prevents incomplete, lazy, or placeholder output from Claude Code. Every file delivered must be production-ready or explicitly marked as a stub.
>
> Cross-references: skills/design/SKILL.md · skills/compliance/SKILL.md · skills/content/SKILL.md

---

## SECTION 1 — THE CORE RULE

**Never deliver half-finished code.** If a component, page, or function is started, it is completed in full. No exceptions. If a task is too large for one pass, explicitly name sub-tasks and complete each fully before moving to the next.

---

## SECTION 2 — BANNED OUTPUT PATTERNS [CRITICAL]

The following are strictly forbidden in any delivered code:

```tsx
// ❌ BANNED — vague placeholder comments
// TODO: implement this
// Add your content here
// Insert logic here
// Complete this later
// ... rest of component
// etc.

// ❌ BANNED — placeholder content in rendered UI
"Lorem ipsum dolor sit amet"
name="John Doe" / name="Max Mustermann" / name="Hans Muster"
company="Acme Corp" / company="Musterfirma AG"
email="user@example.com" (only acceptable in input placeholder attr — not in rendered text)
src="/placeholder.jpg" / src="/image.png" / src="/hero.jpg" (without real path)

// ❌ BANNED — incomplete logic
if (condition) {
  // handle this case
}

function handleSubmit() {
  // TODO: add form submission
}
```

**The only acceptable placeholder format** — when content is genuinely unknown at generation time:

```tsx
// [STUB — requires client input: Insert actual service descriptions here]
const services = [
  { title: "Dienstleistung 1", description: "[STUB — requires client: actual service description]" },
]
```

This format is explicit, locatable with a grep/search, and actionable. Use it freely when real content isn't available — but always make it clear what specifically is needed.

---

## SECTION 3 — COMPLETE FILE OUTPUT

When generating or editing a file, always output the complete file. Never output partial files.

```
❌ NEVER:
// ... existing imports stay the same
// ... rest of component unchanged
// existing code here

✅ ALWAYS:
Complete file from first line to last line.
```

If a file is genuinely too long for one response, explicitly state upfront:
`"This file will be written in [N] parts. Part 1 of N starts now."` — then complete all N parts before stopping.

---

## SECTION 4 — COMPONENT COMPLETENESS STANDARD

**For interactive components, all states must be implemented:**
- [ ] Default / loaded state
- [ ] Loading state (skeleton or spinner — layout-matched, not generic)
- [ ] Empty state (composed: icon + heading + text + action — never blank)
- [ ] Error state (human-friendly message in active locale + retry action)
- [ ] Hover / focus / active states (see skills/design/SKILL.md)
- [ ] Mobile layout tested at 375px (see skills/design/SKILL.md)
- [ ] All props typed (TypeScript) or documented (JSDoc)

**For display components:**
- [ ] Correct heading hierarchy (H1 → H2 → H3 — no skipped levels)
- [ ] Alt text on all images — descriptive, locale-specific
- [ ] Accessible markup (see skills/compliance/SKILL.md)
- [ ] All strings use translation keys — no hardcoded text in any locale (see skills/content/SKILL.md)
- [ ] Structured data added where applicable (see skills/content/SKILL.md)

---

## SECTION 5 — NAMING CONVENTIONS

**Files:**
- React components: `PascalCase.tsx` — e.g. `HeroSection.tsx`, `PropertyCard.tsx`, `ContactForm.tsx`
- Pages (Next.js App Router): `page.tsx` inside named route folders
- Utilities: `camelCase.ts` — e.g. `formatPrice.ts`, `parseLocale.ts`, `generateSchema.ts`
- Translation files: `de-CH.json`, `fr-CH.json`, `it-CH.json`, `en-US.json`
- Schema/structured data helpers: `schema.ts` or co-located as `[component].schema.ts`

**Variables & functions:**
- Booleans: `is` / `has` / `can` prefix — `isLoading`, `hasError`, `canSubmit`
- Event handlers: `handle` prefix — `handleSubmit`, `handleMenuToggle`, `handleLocaleSwitch`
- Async functions: descriptive verb — `fetchListings`, `sendContactForm`, `getLocalizedMeta`
- Locale variable: always named `locale` — never `lang`, `language`, `loc`

**CSS classes (Tailwind):**
Group in this order: layout → spacing → typography → color → border → interaction
```tsx
// Correct grouping
"flex items-center gap-4 px-6 py-3 text-sm font-medium text-white bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none"
```

---

## SECTION 6 — COMMENT STANDARDS

Comments explain *why*, never *what*. Never comment what the code obviously does.

```tsx
// ❌ BANNED — obvious comment
// This is a button
<button onClick={handleSubmit}>Absenden</button>

// ✅ CORRECT — explains non-obvious decision
// min-h-[100dvh] instead of h-screen prevents iOS Safari layout jump (CLS penalty)
<section className="min-h-[100dvh]">

// ✅ CORRECT — explains locale behavior
// en-US is treated as international/expat market, served from /en/ prefix
const defaultLocale = 'de-CH'

// ✅ CORRECT — marks a deliberate stub
// [STUB — requires client: Replace with verified Google Maps embed key]
<div className="h-64 bg-neutral-100 rounded-xl" />
```

---

## SECTION 7 — LOCALE-AWARE OUTPUT RULES

Since all projects are multilingual (de-CH, fr-CH, it-CH, en-US), code output must always account for locale:

- Error messages: always use translation keys, never hardcode in a single language
- Date formatting: always use `Intl.DateTimeFormat(locale, options)` — never raw date strings
- Number/currency formatting: always use `Intl.NumberFormat(locale, { style: 'currency', currency: 'CHF' })`
- Phone number display: always international format `+41 44 XXX XX XX`
- Address display: match Swiss postal format — `[Strasse] [Nr]`, newline `[PLZ] [Stadt]`

```tsx
// Correct locale-aware formatting
const price = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  minimumFractionDigits: 0,
}).format(1250000)
// → "CHF 1'250'000" (Swiss format uses apostrophe as thousands separator)

const date = new Intl.DateTimeFormat('de-CH', {
  day: 'numeric', month: 'long', year: 'numeric'
}).format(new Date())
// → "10. April 2025"
```

---

## SECTION 8 — OUTPUT CHECKLIST

Before marking any task complete:

- [ ] No `// TODO` comments without explicit `[STUB — requires: ...]` format
- [ ] No placeholder text in rendered UI (Lorem ipsum, John Doe, Musterfirma, etc.)
- [ ] No incomplete conditional branches
- [ ] All components have full interaction states (loading, empty, error, hover, focus, disabled, active)
- [ ] Complete file output — no "rest unchanged" shortcuts
- [ ] Naming conventions followed for files, variables, handlers
- [ ] Comments explain *why* not *what*
- [ ] All strings use translation keys — no hardcoded locale text
- [ ] TypeScript: all props and data structures typed
- [ ] Locale-aware number, date, and currency formatting used
- [ ] Cross-skill checklist items verified (see skills/design/SKILL.md Section 13)
