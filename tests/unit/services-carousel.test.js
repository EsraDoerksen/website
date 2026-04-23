/**
 * Services Carousel (most complex component)
 * Tests the pure algorithmic functions from assets/js/script.js lines 370-505.
 * Covers: currentSnappedIndex detection, buildClones DOM mutation,
 * infinite-loop jump logic, mode detection, and snap calculation.
 *
 * The functions are replicated here as pure/testable versions to avoid
 * importing script.js and triggering its global side effects.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

// ─── Pure algorithm: currentSnappedIndex ─────────────────────────────────────
// Finds which card index is closest to the centre of the track.
function computeSnappedIndex(cards, trackScrollLeft, trackOffsetWidth) {
  const centre = trackScrollLeft + trackOffsetWidth / 2
  let best = 0
  let bestDist = Infinity
  cards.forEach((card, i) => {
    const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  return best
}

// ─── Pure algorithm: snapTo target scrollLeft ─────────────────────────────────
// Returns the scrollLeft value needed so the card at `idx` is centred in track.
function computeSnapTarget(cards, idx, trackOffsetWidth) {
  const card = cards[idx]
  if (!card) return 0
  return card.offsetLeft + card.offsetWidth / 2 - trackOffsetWidth / 2
}

// ─── Pure algorithm: before/after slider position clamping ───────────────────
function computeRevealPosition(clientX, rectLeft, rectWidth) {
  let ratio = (clientX - rectLeft) / rectWidth
  ratio = Math.max(0.02, Math.min(0.98, ratio))
  return ratio * 100
}

// ─── Infinite loop jump logic ─────────────────────────────────────────────────
function resolveInfiniteJump(currentIdx, totalChildren, N, snapTo) {
  if (currentIdx === 0) {
    snapTo(N) // clone of last → jump to real last
  } else if (currentIdx === totalChildren - 1) {
    snapTo(1) // clone of first → jump to real first
  }
}

// ─── Mode detection ──────────────────────────────────────────────────────────
const MOBILE_BP = 1024

function detectMode(windowWidth) {
  return windowWidth < MOBILE_BP ? 'mobile' : 'desktop'
}

// ─── DOM helpers for buildClones ─────────────────────────────────────────────
function buildClonesDOM(scroll, originalCards) {
  scroll.querySelectorAll('.carousel-clone').forEach((c) => c.remove())
  const first = originalCards[0].cloneNode(true)
  const last = originalCards[originalCards.length - 1].cloneNode(true)
  first.classList.add('carousel-clone')
  last.classList.add('carousel-clone')
  scroll.appendChild(first)
  scroll.insertBefore(last, scroll.firstChild)
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('computeSnappedIndex — centre detection', () => {
  // Three cards, each 300px wide at consecutive offsets
  const cards = [
    { offsetLeft: 0, offsetWidth: 300 },   // centre: 150px
    { offsetLeft: 300, offsetWidth: 300 }, // centre: 450px
    { offsetLeft: 600, offsetWidth: 300 }, // centre: 750px
  ]

  it('returns 0 when track is scrolled to the start (card 0 centred)', () => {
    // trackScrollLeft=0, trackOffsetWidth=375 → trackCentre=187.5 → closest to card 0 (dist 37.5)
    expect(computeSnappedIndex(cards, 0, 375)).toBe(0)
  })

  it('returns 1 when track is scrolled to show card 1', () => {
    // trackScrollLeft=300, trackCentre=487.5 → closest to card 1 (dist 37.5)
    expect(computeSnappedIndex(cards, 300, 375)).toBe(1)
  })

  it('returns 2 when track is scrolled to show card 2', () => {
    // trackScrollLeft=600, trackCentre=787.5 → closest to card 2 (dist 37.5)
    expect(computeSnappedIndex(cards, 600, 375)).toBe(2)
  })

  it('returns the single card for a single-card track', () => {
    expect(computeSnappedIndex([{ offsetLeft: 0, offsetWidth: 300 }], 0, 375)).toBe(0)
  })

  it('breaks ties in favour of the earlier card', () => {
    // Exactly halfway between card 0 and card 1 — card 0 should win (first best)
    // card 0 centre=150, card 1 centre=450; track centre=300 → equal dist=150
    // The algorithm keeps `best` at 0 only if strictly less, so card 0 wins.
    expect(computeSnappedIndex(cards, 112.5, 375)).toBe(0) // trackCentre=300 — card 0 dist=150, card 1 dist=150
  })
})

describe('computeSnapTarget — scrollLeft calculation', () => {
  const cards = [
    { offsetLeft: 0, offsetWidth: 300 },
    { offsetLeft: 300, offsetWidth: 300 },
    { offsetLeft: 600, offsetWidth: 300 },
  ]
  const trackWidth = 375

  it('centres card 0 when tracking to index 0', () => {
    // card0.centre=150; 150 - 375/2 = -37.5 → negative means no scroll needed
    expect(computeSnapTarget(cards, 0, trackWidth)).toBe(-37.5)
  })

  it('centres card 1 at index 1', () => {
    // card1.centre=450; 450 - 187.5 = 262.5
    expect(computeSnapTarget(cards, 1, trackWidth)).toBe(262.5)
  })

  it('returns 0 for an out-of-bounds index', () => {
    expect(computeSnapTarget(cards, 99, trackWidth)).toBe(0)
  })
})

describe('infinite loop jump logic', () => {
  const N = 7 // 7 real cards

  it('jumps to real last card (index N) when on the last-card clone (index 0)', () => {
    const snapTo = vi.fn()
    resolveInfiniteJump(0, N + 2, N, snapTo)
    expect(snapTo).toHaveBeenCalledOnce()
    expect(snapTo).toHaveBeenCalledWith(7)
  })

  it('jumps to real first card (index 1) when on the first-card clone (last index)', () => {
    const snapTo = vi.fn()
    resolveInfiniteJump(N + 1, N + 2, N, snapTo)
    expect(snapTo).toHaveBeenCalledOnce()
    expect(snapTo).toHaveBeenCalledWith(1)
  })

  it('does not jump for real cards (indices 1 through N)', () => {
    for (let idx = 1; idx <= N; idx++) {
      const snapTo = vi.fn()
      resolveInfiniteJump(idx, N + 2, N, snapTo)
      expect(snapTo).not.toHaveBeenCalled()
    }
  })
})

describe('mode detection', () => {
  it('returns "mobile" for widths below 1024px', () => {
    expect(detectMode(375)).toBe('mobile')
    expect(detectMode(768)).toBe('mobile')
    expect(detectMode(1023)).toBe('mobile')
  })

  it('returns "desktop" for widths at or above 1024px', () => {
    expect(detectMode(1024)).toBe('desktop')
    expect(detectMode(1280)).toBe('desktop')
    expect(detectMode(1440)).toBe('desktop')
  })
})

describe('buildClones — DOM mutation', () => {
  let scroll
  let originalCards

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="scroll">
        <div class="card" data-id="1">Card 1</div>
        <div class="card" data-id="2">Card 2</div>
        <div class="card" data-id="3">Card 3</div>
      </div>
    `
    scroll = document.getElementById('scroll')
    originalCards = Array.from(scroll.children)
  })

  it('adds exactly 2 clone elements', () => {
    buildClonesDOM(scroll, originalCards)
    const clones = scroll.querySelectorAll('.carousel-clone')
    expect(clones.length).toBe(2)
  })

  it('inserts the clone of the last original card as the first child', () => {
    buildClonesDOM(scroll, originalCards)
    // DOM order: [lastClone, card1, card2, card3, firstClone]
    expect(scroll.firstChild).toHaveClass('carousel-clone')
    expect(scroll.firstChild.dataset.id).toBe('3') // clone of card 3 (last)
  })

  it('appends the clone of the first original card as the last child', () => {
    buildClonesDOM(scroll, originalCards)
    expect(scroll.lastChild).toHaveClass('carousel-clone')
    expect(scroll.lastChild.dataset.id).toBe('1') // clone of card 1 (first)
  })

  it('total child count is originalCards + 2 after buildClones', () => {
    buildClonesDOM(scroll, originalCards)
    expect(scroll.children.length).toBe(originalCards.length + 2)
  })

  it('removes old clones before rebuilding (idempotent)', () => {
    buildClonesDOM(scroll, originalCards)
    buildClonesDOM(scroll, originalCards)
    const clones = scroll.querySelectorAll('.carousel-clone')
    expect(clones.length).toBe(2)
  })
})

describe('computeRevealPosition — before/after slider clamping', () => {
  it('clamps to 2% at the left edge', () => {
    expect(computeRevealPosition(0, 0, 100)).toBe(2)
  })

  it('clamps to 98% at the right edge', () => {
    expect(computeRevealPosition(100, 0, 100)).toBe(98)
  })

  it('returns 50% for the midpoint', () => {
    expect(computeRevealPosition(50, 0, 100)).toBe(50)
  })

  it('clamps values below 2%', () => {
    expect(computeRevealPosition(-50, 0, 100)).toBe(2)
  })

  it('clamps values above 98%', () => {
    expect(computeRevealPosition(200, 0, 100)).toBe(98)
  })

  it('accounts for a non-zero rect left offset', () => {
    // rect starts at x=100, width=200; clicking at x=200 → 50%
    expect(computeRevealPosition(200, 100, 200)).toBe(50)
  })
})
