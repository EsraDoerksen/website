import '@testing-library/jest-dom'
import { vi } from 'vitest'

// IntersectionObserver is not implemented in jsdom
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// ResizeObserver is not implemented in jsdom
global.ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// requestAnimationFrame: execute callback synchronously so DOM assertions
// don't need async/await in every test
global.requestAnimationFrame = vi.fn((cb) => {
  cb(performance.now())
  return 1
})
global.cancelAnimationFrame = vi.fn()

// matchMedia is not implemented in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Reset DOM and localStorage between every test to guarantee isolation
beforeEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})
