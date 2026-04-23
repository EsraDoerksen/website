# DESIGN SKILL — Web & UI Design Rules
> Use this skill for every website and web application build. Covers layout, spacing, shadows, typography, component placement, visual quality, UX interaction standards, and performance.
>
> Stack: React/Next.js or plain HTML. CSS: Tailwind CSS (enforced). Icons: Phosphor Icons.
> Cross-references: skills/compliance/SKILL.md · skills/content/SKILL.md · skills/output/SKILL.md

---

## SETTINGS
```
MOTION_INTENSITY = 3        // 1–10. Keep at 3 for Swiss SME clients. Subtle hover/fade only.
VISUAL_DENSITY   = 5        // 1–10. Balanced — enough content per screen without clutter.
LAYOUT_VARIANCE  = 4        // 1–10. Clean but not boring. Avoid pure centered-only layouts.
```

---

## SECTION 1 — CORE PHILOSOPHY

Target: warm, professional, trust-building interfaces for Swiss SME clients — primarily real estate agents. The goal is never to impress with complexity — it is to communicate credibility, clarity, and approachability at a glance.

**Three guiding principles:**
1. **Trust over flair** — Every decision must make the business look reliable and human, not like a startup or SaaS product.
2. **Content-first** — Layout serves the content (property photos, service descriptions, contact info), not the other way around.
3. **Mobile is primary** — Swiss users browse mobile first. Every layout decision starts at 375px and scales up.

**Real estate pattern:** "Trust & Authority" + "Social Proof Focused". This means: professional photography prominent, credentials visible above the fold, Google review score early in page, specific local market numbers, and low-friction CTAs ("Kostenlose Erstberatung" outperforms "Jetzt kaufen").

---

## SECTION 2 — TAILWIND ENFORCEMENT

Tailwind CSS is the ONLY styling approach. Never write inline styles or custom CSS classes unless overriding a third-party library.

**Rules:**
- ALWAYS `min-h-[100dvh]` for full-height sections. NEVER `h-screen` — causes iOS Safari layout jumping (CLS penalty on Core Web Vitals).
- ALWAYS CSS Grid for multi-column layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. NEVER `w-[calc(33%-1rem)]` flex math.
- Page width constraint: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` on every section wrapper.
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1440px) only. No arbitrary breakpoints.
- NEVER `!important` overrides.
- ALWAYS add `cursor-pointer` to every clickable element that is not a native `<button>` or `<a>`. Missing cursor is one of the most common professional UX failures.

---

## SECTION 3 — SPACING SYSTEM

**Vertical rhythm:**
- Section padding: `py-16 md:py-24` minimum. Never `py-4` or `py-8` for full sections.
- Heading to body gap: `mt-4` or `mt-6`. Never `mt-1` or `mt-2`.
- Card grid gap: `gap-6` or `gap-8`. Never `gap-2`.
- CTA buttons below supporting text: `mt-8` or `mt-10`.

**Horizontal:**
- Body copy: never exceed `max-w-2xl` (optimal readability line length).
- Hero text: `max-w-3xl` maximum.
- Never full-width text on desktop — always constrain readable content.

---

## SECTION 4 — SHADOW PHILOSOPHY

**Rules:**
- NEVER use Tailwind defaults `shadow-md / shadow-lg / shadow-xl` without customization — too cold, erodes warmth.
- Base warm shadow: `shadow-[0_4px_24px_rgba(0,0,0,0.08)]`
- Card hover elevation: `shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300`
- Flat sections: no shadow. Use `border border-neutral-100` for separation.
- NEVER stack multiple shadows on the same element.
- Shadow color: NEVER pure `#000`. Always `rgba` with opacity ≤ 0.15.
- Tint shadows toward the background hue for warmth.

---

## SECTION 5 — TYPOGRAPHY HIERARCHY

**Rules:**
- Always define a font pairing: heading font + body font. Inject via `next/font` (Next.js) or Google Fonts with `preconnect`.
- Recommended warm pairings for real estate: `DM Serif Display` + `Inter`, or `Playfair Display` + `Source Sans 3`, or `Lora` + `Inter`.
- Scale: H1 `text-4xl md:text-5xl lg:text-6xl font-bold`, H2 `text-2xl md:text-3xl font-semibold`, H3 `text-xl font-semibold`, body `text-base leading-relaxed`.
- Line height: `leading-relaxed` (1.625) for body. `leading-tight` only for large display headings.
- Letter spacing: `tracking-tight` for headings ≥ `text-3xl`. Never `tracking-widest` on body.
- NEVER more than 2 font families per project.
- Weight: `font-normal` (400) body, `font-medium` (500) UI labels, `font-semibold` (600) subheadings, `font-bold` (700) H1/H2.

**Font loading (impacts Core Web Vitals LCP):**
```html
<!-- Always preconnect — reduces LCP by 100–200ms -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- display=swap prevents invisible text flash (FOIT) -->
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
In Next.js: always use `next/font/google` — self-hosts fonts, eliminates external request entirely.

---

## SECTION 6 — COLOR APPROACH

Brand colors are client-provided. This skill governs usage, not brand choice.

**Define as CSS variables at project start:**
```css
:root {
  --color-primary:       /* client brand color */;
  --color-primary-hover: /* 10% darker for hover */;
  --color-primary-light: /* 10–15% lighter for backgrounds */;
  --color-secondary:     /* accent */;
  --color-text:          #1a1a1a;
  --color-text-muted:    #6b7280;
  --color-surface:       #ffffff;
  --color-surface-alt:   #f9fafb;
  --color-border:        #e5e7eb;
}
```

**Rules:**
- Primary color: CTAs, active states, highlights only — NEVER large backgrounds.
- Large section backgrounds: `--color-surface` or `--color-surface-alt` only.
- Text on colored backgrounds: verify WCAG AA contrast (see skills/compliance/SKILL.md).
- NEVER pure `#000000` for text. Use `#1a1a1a` or `gray-900`.
- NEVER pure `#ffffff` for sections needing warmth — use `#fafaf9` or `stone-50`.
- Gradients: only as photo overlays for text legibility. NEVER on buttons or UI elements.

---

## SECTION 7 — LAYOUT & COMPONENT PLACEMENT

**Hero sections:**
- NEVER center-only at `LAYOUT_VARIANCE > 3`. Use split-screen (50/50) or left-aligned text + right image.
- Must contain: H1 headline (with primary keyword), 1–2 sentence supporting text, primary CTA, optional secondary link.
- Hero image: `object-cover` with defined aspect ratio. NEVER let images reflow layout (CLS penalty).
- Mobile: stack vertically, image below text, full-width CTA.
- Always define explicit `width` + `height` on all images to prevent CLS.

**Trust signals (critical for real estate):**
- Google review score + count: visible in hero or directly below.
- Years in business + transaction count: specific numbers ("15 Jahre / 200+ Objekte"), never vague.
- Association logos (SVIT, regional Maklerverband): in a trust bar below hero.
- Client testimonials: always include full name, city, and year. Never anonymous.

**Navigation:**
- Sticky nav: `sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100`
- Logo left, nav links center or right, CTA button rightmost.
- Mobile: hamburger menu. NEVER expose full desktop nav on mobile.
- Active link: underline or color indicator. Never bold-only.
- WhatsApp CTA: highly effective for Swiss SME — add as floating button on mobile or sticky bar.

**Z-Index System — define explicitly, never use arbitrary numbers:**
```
z-0    → base content
z-10   → above base (dropdowns, tooltips relative)
z-50   → sticky navigation
z-[100] → overlays / backdrops
z-[200] → modals
z-[300] → toast notifications
z-[400] → tooltips
```

**CTA Buttons:**
- Primary: `rounded-lg px-6 py-3 font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors duration-200 cursor-pointer min-h-[44px]`
- Secondary: outlined, same border-radius.
- NEVER `rounded-full` pill for primary CTAs — reads startup, not professional.
- NEVER gradient buttons.
- NEVER emoji in button text.
- Minimum touch target: `min-h-[44px] min-w-[44px]`.

**Cards:**
- Use ONLY when elevation communicates hierarchy.
- For listings without elevation need: `divide-y divide-neutral-100` or `border-t` separators.
- Card radius: `rounded-xl` max. `rounded-2xl` for image containers only.
- Card padding: `p-6` minimum.

**Footer:**
- Always include: logo, short description, nav links, contact info, legal links (Impressum, Datenschutz, AGB), copyright with dynamic current year.
- Include street address in footer text (reinforces LocalBusiness schema).
- Never a minimal single-line footer for Swiss SME sites.

---

## SECTION 8 — ICONS (PHOSPHOR)

ALWAYS import from `@phosphor-icons/react`. Never mix icon libraries.

```tsx
import { Phone, EnvelopeSimple, MapPin, WhatsappLogo, House } from '@phosphor-icons/react'

// Size standards:
// 16 → inline with text
// 20 → UI elements (nav, buttons)
// 24 → feature icons
// 32–40 → decorative/illustrative
```

**Rules:**
- Standardize `weight` globally. Choose one weight per project and document it.
- NEVER mix `weight="fill"` with `weight="regular"` in the same visual group.
- Icon-only interactive elements: `aria-label` on the parent button (see skills/compliance/SKILL.md).
- Always pair icons with visible text labels in navigation.

---

## SECTION 9 — RESPONSIVE & MOBILE-FIRST

Write mobile-first. Desktop styles are additions, not overrides.

**Mandatory test breakpoints (all four before delivery):**
- `375px` — iPhone SE, minimum supported width
- `768px` — tablet portrait
- `1024px` — laptop / tablet landscape
- `1440px` — wide desktop

**Checklist per component:**
- [ ] No horizontal scroll at any viewport width
- [ ] Images: explicit `width` + `height` attributes (prevents CLS)
- [ ] Body text: minimum `text-sm` (14px) on mobile
- [ ] Form inputs: `text-base` (16px) minimum — prevents iOS auto-zoom (extremely common missed issue)
- [ ] Touch targets: `min-h-[44px]` on all interactive elements
- [ ] Spacing: reduced gracefully on mobile
- [ ] Navigation: hamburger tested open/close

---

## SECTION 10 — INTERACTION STATES & ANIMATION

Always implement full interaction cycles. Never deliver static-only components.

**Required states:**
- **Loading:** Skeleton loaders matching layout shape (`animate-pulse bg-neutral-100 rounded`). NEVER generic spinners for content areas.
- **Empty:** Composed empty state — icon + heading + supporting text + action. Never a blank area.
- **Error:** Clear, human-friendly message in active locale language + retry action.
- **Hover:** `transition-all duration-200`. 150–300ms is the professional range.
- **Focus:** `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none`
- **Disabled:** `opacity-50 cursor-not-allowed pointer-events-none`
- **Active/Pressed:** `active:scale-[0.98]` on buttons for tactile feel.

**Motion accessibility [CRITICAL]:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
In Tailwind: use `motion-safe:animate-*` and `motion-reduce:transition-none` classes. Never skip — affects users with vestibular disorders and is an accessibility requirement.

---

## SECTION 11 — PERFORMANCE & CORE WEB VITALS

Performance is a direct Google ranking signal. All three Core Web Vitals must be in the "Good" range.

**LCP (Largest Contentful Paint) — target < 2.5s:**
- Hero image: `fetchpriority="high"`, NEVER `loading="lazy"` above fold.
- Next.js: `<Image priority />` on hero/above-fold images.
- Preload critical fonts (see Section 5).
- No render-blocking CSS/JS in `<head>`.

**CLS (Cumulative Layout Shift) — target < 0.1:**
- ALWAYS explicit `width` + `height` on all `<img>` tags.
- NEVER `h-screen` (use `min-h-[100dvh]`).
- Reserve space for dynamically loaded content.
- Font `display=swap` (see Section 5).

**INP (Interaction to Next Paint) — target < 200ms:**
- Debounce search inputs and filters.
- Use `loading="lazy"` on all below-fold images.
- Avoid long JS tasks on main thread.

**Image optimization:**
```tsx
// Next.js — always use <Image> component
import Image from 'next/image'
<Image
  src="/hero.jpg"
  alt="Descriptive alt text in active locale language"
  width={1200}
  height={800}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```
- Format: WebP by default. AVIF for large hero images.
- Max compressed hero image: 200KB. Property thumbnails: 50–80KB.
- Never embed uncompressed originals.

---

## SECTION 12 — ANTI-CLICHÉ RULES [CRITICAL]

These are statistically overproduced by AI and are BANNED:

- ❌ Three-column icon + heading + text grid as the only feature section pattern
- ❌ Gradient hero backgrounds (blue-to-purple, teal-to-green)
- ❌ "Trusted by X companies" bars with placeholder or stock logos
- ❌ Testimonials with stock photo avatars — real names + photos required
- ❌ Emoji anywhere in UI
- ❌ Every section centered — vary alignment intentionally
- ❌ `rounded-full` pill as primary CTA
- ❌ Generic stock illustrations (undraw-style SVGs)
- ❌ `shadow-lg` without warm rgba tinting
- ❌ Placeholder copy: "Lorem ipsum", "John Doe", "Acme Corp"
- ❌ Generic hero text: "Welcome to our website", "We are your partner for..."
- ❌ AI copywriting buzzwords (see skills/content/SKILL.md)
- ❌ Maps without actual address/business marker
- ❌ Contact forms with no visible response time expectation

---

## SECTION 13 — PRE-DELIVERY CHECKLIST

**Design:**
- [ ] Tailwind only — no inline styles
- [ ] Mobile-first tested at 375px, 768px, 1024px, 1440px
- [ ] Brand colors as CSS variables
- [ ] Phosphor Icons with consistent weight throughout
- [ ] Heading scale correct, no skipped levels
- [ ] Shadows: warm rgba, not Tailwind defaults
- [ ] Z-index: defined scale, no arbitrary numbers
- [ ] `cursor-pointer` on all non-native clickable elements

**Interaction:**
- [ ] All states: loading, empty, error, hover, focus, disabled, active/pressed
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets ≥ 44px
- [ ] Form inputs ≥ 16px font size (no iOS zoom)

**Performance:**
- [ ] Hero image: `priority` / `fetchpriority="high"`, not lazy
- [ ] All images: explicit `width` + `height`
- [ ] Fonts: `display=swap` or `next/font`
- [ ] Below-fold images: `loading="lazy"`
- [ ] Max hero image file size: 200KB

**Cross-skill:**
- [ ] WCAG AA contrast verified (→ skills/compliance/SKILL.md)
- [ ] Focus states visible and keyboard-testable (→ skills/compliance/SKILL.md)
- [ ] No hardcoded strings — all in translation files (→ skills/content/SKILL.md)
- [ ] Cookie banner + legal footer links present (→ skills/compliance/SKILL.md)
- [ ] No placeholder content, all states complete (→ skills/output/SKILL.md)
