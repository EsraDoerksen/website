/**
 * Portfolio Filter
 * Replicates the event handler logic from assets/js/script.js lines 162-180.
 * Tests: active button state, card visibility by category, "all" shows all.
 */
import { describe, it, expect, beforeEach } from 'vitest'

function setupDOM() {
  document.body.innerHTML = `
    <div class="filter-controls">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="web">Web</button>
      <button class="filter-btn" data-filter="seo">SEO</button>
      <button class="filter-btn" data-filter="social">Social</button>
    </div>
    <div class="portfolio-grid">
      <div class="portfolio-card" data-category="web" style="display: block;">Web 1</div>
      <div class="portfolio-card" data-category="seo" style="display: block;">SEO 1</div>
      <div class="portfolio-card" data-category="web" style="display: block;">Web 2</div>
      <div class="portfolio-card" data-category="social" style="display: block;">Social 1</div>
    </div>
  `
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn')
  const portfolioCards = document.querySelectorAll('.portfolio-card')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      const filter = btn.dataset.filter

      portfolioCards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter
        card.style.display = show ? 'block' : 'none'
        if (show) {
          card.style.animation = 'fadeIn 0.3s ease forwards'
        }
      })
    })
  })
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('filter button active state', () => {
  beforeEach(() => {
    setupDOM()
    initPortfolioFilter()
  })

  it('adds "active" class to the clicked button', () => {
    const webBtn = document.querySelector('[data-filter="web"]')
    webBtn.click()
    expect(webBtn).toHaveClass('active')
  })

  it('removes "active" from all other buttons when one is clicked', () => {
    const webBtn = document.querySelector('[data-filter="web"]')
    webBtn.click()

    document.querySelectorAll('.filter-btn').forEach((btn) => {
      if (btn !== webBtn) {
        expect(btn).not.toHaveClass('active')
      }
    })
  })

  it('exactly one button is active at a time', () => {
    document.querySelector('[data-filter="seo"]').click()
    const activeButtons = document.querySelectorAll('.filter-btn.active')
    expect(activeButtons.length).toBe(1)
  })

  it('switching filters moves the active class correctly', () => {
    document.querySelector('[data-filter="web"]').click()
    document.querySelector('[data-filter="seo"]').click()
    expect(document.querySelector('[data-filter="seo"]')).toHaveClass('active')
    expect(document.querySelector('[data-filter="web"]')).not.toHaveClass('active')
  })
})

describe('card visibility — category filters', () => {
  beforeEach(() => {
    setupDOM()
    initPortfolioFilter()
  })

  it('shows only web cards when "web" filter is active', () => {
    document.querySelector('[data-filter="web"]').click()

    document.querySelectorAll('.portfolio-card').forEach((card) => {
      if (card.dataset.category === 'web') {
        expect(card.style.display).toBe('block')
      } else {
        expect(card.style.display).toBe('none')
      }
    })
  })

  it('shows only SEO cards when "seo" filter is active', () => {
    document.querySelector('[data-filter="seo"]').click()

    document.querySelectorAll('.portfolio-card').forEach((card) => {
      if (card.dataset.category === 'seo') {
        expect(card.style.display).toBe('block')
      } else {
        expect(card.style.display).toBe('none')
      }
    })
  })

  it('hides cards that do not match the active filter', () => {
    document.querySelector('[data-filter="social"]').click()
    const webCard = document.querySelector('[data-category="web"]')
    expect(webCard.style.display).toBe('none')
  })
})

describe('card visibility — "all" filter', () => {
  beforeEach(() => {
    setupDOM()
    initPortfolioFilter()
  })

  it('shows all cards when "all" is selected', () => {
    // First hide some by applying a filter
    document.querySelector('[data-filter="web"]').click()
    // Then restore all
    document.querySelector('[data-filter="all"]').click()

    document.querySelectorAll('.portfolio-card').forEach((card) => {
      expect(card.style.display).toBe('block')
    })
  })

  it('applies fadeIn animation to visible cards', () => {
    document.querySelector('[data-filter="web"]').click()

    document.querySelectorAll('[data-category="web"]').forEach((card) => {
      expect(card.style.animation).toContain('fadeIn')
    })
  })
})

describe('filter count correctness', () => {
  beforeEach(() => {
    setupDOM()
    initPortfolioFilter()
  })

  it('web filter shows exactly 2 cards', () => {
    document.querySelector('[data-filter="web"]').click()
    const visible = Array.from(document.querySelectorAll('.portfolio-card')).filter(
      (c) => c.style.display !== 'none',
    )
    expect(visible.length).toBe(2)
  })

  it('seo filter shows exactly 1 card', () => {
    document.querySelector('[data-filter="seo"]').click()
    const visible = Array.from(document.querySelectorAll('.portfolio-card')).filter(
      (c) => c.style.display !== 'none',
    )
    expect(visible.length).toBe(1)
  })

  it('"all" shows all 4 cards', () => {
    document.querySelector('[data-filter="web"]').click() // apply a filter first
    document.querySelector('[data-filter="all"]').click()
    const visible = Array.from(document.querySelectorAll('.portfolio-card')).filter(
      (c) => c.style.display !== 'none',
    )
    expect(visible.length).toBe(4)
  })
})
