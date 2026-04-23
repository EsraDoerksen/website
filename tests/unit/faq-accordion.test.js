/**
 * FAQ Accordion
 * Replicates the event handler logic from assets/js/script.js lines 141-160.
 * Tests: single-open constraint, maxHeight animation, open/close toggle.
 */
import { describe, it, expect, beforeEach } from 'vitest'

function setupDOM(count = 3) {
  const items = Array.from({ length: count }, (_, i) => `
    <div class="faq-item">
      <button class="faq-question">Question ${i + 1}</button>
      <div class="faq-answer" style="max-height: 0;">Answer ${i + 1}</div>
    </div>
  `).join('')
  document.body.innerHTML = `<div class="faq-list">${items}</div>`

  // jsdom does not compute scrollHeight from content; set it manually
  document.querySelectorAll('.faq-answer').forEach((el, i) => {
    Object.defineProperty(el, 'scrollHeight', { configurable: true, get: () => (i + 1) * 100 })
  })
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item')
      const answer = item.querySelector('.faq-answer')
      const isOpen = item.classList.contains('open')

      // Close all
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open')
        i.querySelector('.faq-answer').style.maxHeight = '0'
      })

      // Open clicked if it was previously closed
      if (!isOpen) {
        item.classList.add('open')
        answer.style.maxHeight = answer.scrollHeight + 'px'
      }
    })
  })
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('FAQ accordion — open/close', () => {
  beforeEach(() => {
    setupDOM()
    initFaqAccordion()
  })

  it('adds "open" class to a clicked question', () => {
    const [btn] = document.querySelectorAll('.faq-question')
    btn.click()
    expect(btn.closest('.faq-item')).toHaveClass('open')
  })

  it('sets maxHeight to scrollHeight on the opened answer', () => {
    const [btn] = document.querySelectorAll('.faq-question')
    btn.click()
    const answer = btn.closest('.faq-item').querySelector('.faq-answer')
    expect(answer.style.maxHeight).toBe('100px') // scrollHeight mocked to 100 for item 0
  })

  it('closes an already-open item when clicked again', () => {
    const [btn] = document.querySelectorAll('.faq-question')
    btn.click()
    expect(btn.closest('.faq-item')).toHaveClass('open')
    btn.click()
    expect(btn.closest('.faq-item')).not.toHaveClass('open')
  })

  it('resets maxHeight to "0" when item is closed via second click', () => {
    const [btn] = document.querySelectorAll('.faq-question')
    btn.click()
    btn.click()
    const answer = btn.closest('.faq-item').querySelector('.faq-answer')
    expect(answer.style.maxHeight).toBe('0')
  })
})

describe('FAQ accordion — single-open constraint', () => {
  beforeEach(() => {
    setupDOM()
    initFaqAccordion()
  })

  it('closes the previously open item when another is opened', () => {
    const btns = document.querySelectorAll('.faq-question')
    btns[0].click()
    btns[1].click()

    expect(btns[0].closest('.faq-item')).not.toHaveClass('open')
    expect(btns[1].closest('.faq-item')).toHaveClass('open')
  })

  it('resets maxHeight on the previously open item', () => {
    const btns = document.querySelectorAll('.faq-question')
    btns[0].click()
    btns[1].click()

    const firstAnswer = btns[0].closest('.faq-item').querySelector('.faq-answer')
    expect(firstAnswer.style.maxHeight).toBe('0')
  })

  it('only one item is open at any time across all items', () => {
    const btns = document.querySelectorAll('.faq-question')
    btns[2].click()
    btns[1].click()

    const openItems = document.querySelectorAll('.faq-item.open')
    expect(openItems.length).toBe(1)
  })
})

describe('FAQ accordion — initial state', () => {
  beforeEach(() => {
    setupDOM()
    initFaqAccordion()
  })

  it('starts with no items open', () => {
    expect(document.querySelectorAll('.faq-item.open').length).toBe(0)
  })

  it('all answers start with maxHeight "0"', () => {
    document.querySelectorAll('.faq-answer').forEach((answer) => {
      expect(answer.style.maxHeight).toBe('0')
    })
  })
})
