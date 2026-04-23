/**
 * Cookie Consent Banner
 * Replicates the IIFE logic from assets/js/script.js lines 6-82.
 * Tests: locale detection, banner creation, button interactions, ARIA, i18n.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

const CONSENT_KEY = 'cookie_consent'

const copy = {
  en: { body: 'We use cookies', privacyLabel: 'Privacy Policy', accept: 'Accept', decline: 'Decline' },
  de: { body: 'Wir verwenden Cookies', privacyLabel: 'Datenschutzerklärung', accept: 'Akzeptieren', decline: 'Ablehnen' },
  fr: { body: 'Nous utilisons des cookies', privacyLabel: 'Politique de confidentialité', accept: 'Accepter', decline: 'Refuser' },
}

function getLocale() {
  return localStorage.getItem('vektor-lang') || 'en'
}

function showBanner() {
  const locale = getLocale()
  const t = copy[locale] || copy.en
  const banner = document.createElement('div')
  banner.id = 'cookie-banner'
  banner.setAttribute('role', 'dialog')
  banner.setAttribute(
    'aria-label',
    locale === 'de' ? 'Cookie-Einstellungen' : locale === 'fr' ? 'Paramètres des cookies' : 'Cookie settings',
  )
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <div class="cookie-banner-text"><p>${t.body}<a href="legal.html#privacy">${t.privacyLabel}</a>.</p></div>
      <div class="cookie-banner-actions">
        <button class="cookie-btn-decline" id="cookie-decline">${t.decline}</button>
        <button class="cookie-btn-accept" id="cookie-accept">${t.accept}</button>
      </div>
    </div>`
  document.body.appendChild(banner)
  requestAnimationFrame(() => banner.classList.add('visible'))

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    banner.remove()
  })
  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    banner.remove()
  })
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('getLocale', () => {
  it('returns "en" when no locale is stored', () => {
    expect(getLocale()).toBe('en')
  })

  it('returns the stored locale', () => {
    localStorage.setItem('vektor-lang', 'de')
    expect(getLocale()).toBe('de')
  })

  it('returns "fr" when locale is set to fr', () => {
    localStorage.setItem('vektor-lang', 'fr')
    expect(getLocale()).toBe('fr')
  })
})

describe('showBanner — structure & ARIA', () => {
  beforeEach(() => showBanner())

  it('appends the banner to the body', () => {
    expect(document.getElementById('cookie-banner')).not.toBeNull()
  })

  it('sets role="dialog" on the banner', () => {
    expect(document.getElementById('cookie-banner')).toHaveAttribute('role', 'dialog')
  })

  it('sets aria-label to "Cookie settings" for English locale', () => {
    expect(document.getElementById('cookie-banner')).toHaveAttribute('aria-label', 'Cookie settings')
  })

  it('adds the "visible" class via requestAnimationFrame', () => {
    // requestAnimationFrame is synchronous in the test setup
    expect(document.getElementById('cookie-banner')).toHaveClass('visible')
  })

  it('renders an Accept button', () => {
    expect(document.getElementById('cookie-accept')).not.toBeNull()
  })

  it('renders a Decline button', () => {
    expect(document.getElementById('cookie-decline')).not.toBeNull()
  })
})

describe('showBanner — German locale', () => {
  beforeEach(() => {
    localStorage.setItem('vektor-lang', 'de')
    showBanner()
  })

  it('shows German accept label', () => {
    expect(document.getElementById('cookie-accept').textContent).toBe('Akzeptieren')
  })

  it('shows German decline label', () => {
    expect(document.getElementById('cookie-decline').textContent).toBe('Ablehnen')
  })

  it('sets German aria-label', () => {
    expect(document.getElementById('cookie-banner')).toHaveAttribute('aria-label', 'Cookie-Einstellungen')
  })
})

describe('showBanner — French locale', () => {
  beforeEach(() => {
    localStorage.setItem('vektor-lang', 'fr')
    showBanner()
  })

  it('shows French accept label', () => {
    expect(document.getElementById('cookie-accept').textContent).toBe('Accepter')
  })

  it('sets French aria-label', () => {
    expect(document.getElementById('cookie-banner')).toHaveAttribute('aria-label', 'Paramètres des cookies')
  })
})

describe('Accept button', () => {
  beforeEach(() => showBanner())

  it('sets cookie_consent to "accepted" in localStorage', () => {
    document.getElementById('cookie-accept').click()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted')
  })

  it('removes the banner from the DOM', () => {
    document.getElementById('cookie-accept').click()
    expect(document.getElementById('cookie-banner')).toBeNull()
  })
})

describe('Decline button', () => {
  beforeEach(() => showBanner())

  it('sets cookie_consent to "declined" in localStorage', () => {
    document.getElementById('cookie-decline').click()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined')
  })

  it('removes the banner from the DOM', () => {
    document.getElementById('cookie-decline').click()
    expect(document.getElementById('cookie-banner')).toBeNull()
  })
})

describe('consent gate — banner only shown when consent is null', () => {
  it('does not show a banner when consent is already "accepted"', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    // Simulate the gate check from the IIFE
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === null) showBanner()
    expect(document.getElementById('cookie-banner')).toBeNull()
  })

  it('does not show a banner when consent is already "declined"', () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === null) showBanner()
    expect(document.getElementById('cookie-banner')).toBeNull()
  })

  it('shows the banner when consent is null', () => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === null) showBanner()
    expect(document.getElementById('cookie-banner')).not.toBeNull()
  })
})
