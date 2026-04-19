/** @type {import('tailwindcss').Config} */
// ==============================================
// IMMOGROWTH — Tailwind CSS Configuration
// Extends the default Tailwind theme with
// ImmoGrowth brand tokens.
// ==============================================

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {

      // ─── Colors ──────────────────────────────
      colors: {

        // Neutral base
        'ig-black':     '#1E1C19',
        'ig-dark':      '#3A3835',
        'ig-mid':       '#8A8880',
        'ig-light':     '#EDECEB',
        'ig-offwhite':  '#FAF9F5',

        // Primary orange
        orange: {
          dark:    '#A85025',
          DEFAULT: '#D4622C',
          mid:     '#E88056',
          tint:    '#F6EDE5',
        },

        // Secondary navy
        navy: {
          dark:    '#0E1C30',
          DEFAULT: '#1B2A44',
          mid:     '#243866',
          tint:    '#D2D9E8',
        },

      },

      // ─── Font families ────────────────────────
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],  // override Tailwind default
      },

      // ─── Font sizes ───────────────────────────
      fontSize: {
        'display': ['3.5rem',    { lineHeight: '1',    letterSpacing: '-0.02em' }],
        'h1':      ['2.75rem',   { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h2':      ['2rem',      { lineHeight: '1.2',  letterSpacing: '-0.005em' }],
        'h3':      ['1.375rem',  { lineHeight: '1.3' }],
        'body-lg': ['1.125rem',  { lineHeight: '1.75' }],
        'body':    ['1rem',      { lineHeight: '1.75' }],
        'sm':      ['0.875rem',  { lineHeight: '1.5' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
        'label':   ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },

      // ─── Font weights ─────────────────────────
      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },

      // ─── Letter spacing ───────────────────────
      letterSpacing: {
        display:  '-0.02em',
        h1:       '-0.01em',
        h2:       '-0.005em',
        normal:   '0',
        label:    '0.08em',
        overline: '0.12em',
      },

      // ─── Spacing ──────────────────────────────
      // Extends (does not replace) Tailwind's default scale
      spacing: {
        '18':  '4.5rem',   /* 72px */
        '22':  '5.5rem',   /* 88px */
        '30':  '7.5rem',   /* 120px — section padding desktop */
      },

      // ─── Max width ────────────────────────────
      maxWidth: {
        content: '1240px',
        prose:   '680px',
      },

      // ─── Border radius ────────────────────────
      borderRadius: {
        sm:   '4px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl': '16px',
      },

      // ─── Box shadows ──────────────────────────
      boxShadow: {
        'focus-orange': '0 0 0 3px rgba(212, 98, 44, 0.12)',
        'focus-navy':   '0 0 0 3px rgba(27, 42, 68, 0.15)',
        'none':         'none',
      },

      // ─── Transitions ──────────────────────────
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

    },
  },

  plugins: [],
}

// ─── Usage examples ─────────────────────────────
//
// Primary CTA button:
//   <button class="bg-orange text-white rounded-md px-4 py-2 font-semibold
//                  hover:bg-orange-dark transition-colors duration-base">
//     Beratung starten
//   </button>
//
// Navy hero section:
//   <section class="bg-navy text-white px-6 py-20 md:py-30">
//
// Eyebrow text:
//   <p class="text-orange text-label font-medium tracking-overline uppercase">
//     Digitales Marketing
//   </p>
//
// Orange tag / badge:
//   <span class="bg-orange-tint text-orange-dark text-label
//                font-medium rounded-sm px-2 py-1">
//     SEO
//   </span>
//
// Navy info tag:
//   <span class="bg-navy-tint text-navy text-label
//                font-medium rounded-sm px-2 py-1">
//     Zürich
//   </span>
