# esra-skill — Web Development Skills for Swiss SME Projects

A collection of SKILL.md files for Claude Code that enforce professional standards for Swiss SME client websites. Covers UI/UX design quality, Swiss legal compliance, multilingual content architecture, SEO/GEO visibility, and output completeness.

## Install

```bash
npx skills add https://github.com/[your-username]/esra-skill
```

## Skills

| Skill | File | Use when |
|---|---|---|
| **design** | `skills/design/SKILL.md` | Every web project — layout, spacing, shadows, typography, performance |
| **compliance** | `skills/compliance/SKILL.md` | Every web project — nLPD, GDPR, cookie consent, AGB, WCAG AA |
| **content** | `skills/content/SKILL.md` | Every web project — i18n, Swiss copy, SEO, GEO, structured data |
| **output** | `skills/output/SKILL.md` | Every web project — completeness, no placeholders, naming, locale formatting |

**All four skills are active on every project.**

## Reference All Skills at Project Start

Add this to your first Claude Code prompt for every new project:

```
Please read and strictly follow all rules in:
- skills/design/SKILL.md
- skills/compliance/SKILL.md
- skills/content/SKILL.md
- skills/output/SKILL.md
```

## Stack

- **Framework:** React / Next.js or plain HTML + CSS
- **CSS:** Tailwind CSS (enforced)
- **Icons:** Phosphor Icons (`@phosphor-icons/react`)
- **i18n:** next-intl (Next.js) or data-i18n attributes (HTML)
- **Locales:** `de-CH` (default), `fr-CH`, `it-CH`, `en-US`
- **Target market:** Swiss SME clients — real estate agent niche
- **Accessibility:** WCAG 2.1 AA
- **Compliance:** Swiss nLPD + GDPR-compatible
- **Deployment:** Vercel, Netlify, or custom VPS

## Repo Structure

```
esra-skill/
├── README.md
└── skills/
    ├── design/
    │   └── SKILL.md    ← UI, layout, shadows, spacing, performance, Core Web Vitals
    ├── compliance/
    │   └── SKILL.md    ← nLPD, GDPR, cookies, Impressum, Datenschutz, AGB, WCAG AA
    ├── content/
    │   └── SKILL.md    ← i18n, Swiss German copy, SEO, GEO, structured data, schema
    └── output/
        └── SKILL.md    ← completeness, no placeholders, naming, locale formatting
```

## Cross-Skill Reference Map

Each file references the others where their concerns overlap:

- `design/SKILL.md` → references `compliance/SKILL.md` for contrast and focus states
- `design/SKILL.md` → references `content/SKILL.md` for multilingual string handling
- `design/SKILL.md` → references `output/SKILL.md` for completeness standards
- `compliance/SKILL.md` → references `content/SKILL.md` for locale-aware legal copy
- `content/SKILL.md` → references `design/SKILL.md` for image alt text and performance
- `output/SKILL.md` → references all three skills in its completion checklist

## Inspiration & Sources

- [taste-skill](https://github.com/Leonxlnx/taste-skill) — Design anti-cliché rules, anti-slop philosophy
- [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — UX interaction standards, pre-delivery checklist patterns, motion accessibility, z-index systems, breakpoint testing spec
