/* ============================================
   ImmoGrowth — Main Script
   ============================================ */

// ── Cookie Consent Banner ──
(function () {
  const CONSENT_KEY = 'cookie_consent';

  function getLocale() {
    return localStorage.getItem('vektor-lang') || 'en';
  }

  const copy = {
    en: {
      body: 'We use cookies to analyse and improve your experience. You may decline without any restrictions. More information: ',
      privacyLabel: 'Privacy Policy',
      accept: 'Accept',
      decline: 'Decline',
    },
    de: {
      body: 'Wir verwenden Cookies zur Analyse und Verbesserung der Nutzung. Sie können ablehnen, ohne Einschränkungen. Weitere Informationen: ',
      privacyLabel: 'Datenschutzerklärung',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
    },
    fr: {
      body: "Nous utilisons des cookies pour analyser et améliorer l'expérience. Vous pouvez refuser sans restriction. Plus d'informations: ",
      privacyLabel: 'Politique de confidentialité',
      accept: 'Accepter',
      decline: 'Refuser',
    },
  };

  function initAnalytics() {
    // Analytics scripts load only after consent
    // [STUB — requires client: insert Google Analytics / Meta Pixel init here]
  }

  function showBanner() {
    const locale = getLocale();
    const t = copy[locale] || copy.en;
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', locale === 'de' ? 'Cookie-Einstellungen' : locale === 'fr' ? 'Paramètres des cookies' : 'Cookie settings');
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <div class="cookie-banner-text">
          <p>${t.body}<a href="legal.html#privacy">${t.privacyLabel}</a>.</p>
        </div>
        <div class="cookie-banner-actions">
          <button class="cookie-btn-decline" id="cookie-decline">${t.decline}</button>
          <button class="cookie-btn-accept" id="cookie-accept">${t.accept}</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    // Trigger visible after paint to allow CSS transition
    requestAnimationFrame(() => banner.classList.add('visible'));

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.remove();
      initAnalytics();
    });
    document.getElementById('cookie-decline').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'declined');
      banner.remove();
    });
  }

  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'accepted') {
    initAnalytics();
  } else if (consent === null) {
    // Not yet decided — show banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();

// ── Hero video smooth fade-in ──
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const onReady = () => heroVideo.classList.add('loaded');
  if (heroVideo.readyState >= 3) {
    onReady();
  } else {
    heroVideo.addEventListener('canplay', onReady, { once: true });
    setTimeout(onReady, 1500); // fallback if event doesn't fire
  }
}

// ── Dynamic copyright year ──
document.querySelectorAll('.copyright-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Navbar scroll effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
});
mobileClose?.addEventListener('click', closeMobileMenu);
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
function closeMobileMenu() {
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
  hamburger?.setAttribute('aria-expanded', 'false');
}

// ── Scroll animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── FAQ accordion ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ── Portfolio filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'block' : 'none';
      if (show) {
        card.style.animation = 'fadeIn 0.3s ease forwards';
      }
    });
  });
});

// ── Contact form ──
// SETUP: Go to https://formspree.io, create a form for esra.doerksen@immogrowth.digital,
// then replace YOUR_FORM_ID below with the ID from your Formspree dashboard.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojpgeka';

const contactForm = document.getElementById('contactForm');
const successMsg = document.querySelector('.success-msg');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot — abort silently if a bot filled the hidden field
  if (contactForm.querySelector('[name="_honeypot"]')?.value) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      contactForm.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    } else {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || 'Server error');
    }
  } catch (err) {
    console.error('Form submission failed:', err);
    btn.textContent = originalText;
    btn.disabled = false;
    alert('Something went wrong — please try again or email esra.doerksen@immogrowth.digital directly.');
  }
});

// ── Smooth counter animation ──
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!isNaN(target)) animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Navbar active state on scroll (homepage) ──
if (currentPage === 'index.html' || currentPage === '') {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').includes(current));
    });
  });
}

// ── Process scroll: sticky left panel / active step highlight ──
(function () {
  const steps = document.querySelectorAll('.process-scroll-step');
  const progressBar = document.getElementById('processProgress')?.querySelector('.process-visual-progress-bar');
  const stepLabel = document.getElementById('processStepLabel');
  if (!steps.length) return;

  // Activate first step immediately
  steps[0].classList.add('active');

  const stepTitles = Array.from(steps).map(s => s.querySelector('h3')?.textContent || '');
  const progressValues = ['25%', '50%', '75%', '100%'];

  function activate(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    if (progressBar) progressBar.style.width = progressValues[index];
    if (stepLabel) stepLabel.textContent = stepTitles[index];
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activate(parseInt(entry.target.dataset.step));
      }
    });
  }, { threshold: 0.55 });

  steps.forEach(step => obs.observe(step));
})();

// ── Before/After Reveal Slider ──
(function () {
  const wrapper = document.getElementById('revealWrapper');
  if (!wrapper) return;

  const handle = document.getElementById('revealHandle');
  let dragging = false;
  let currentPct = 50;

  function setPos(x) {
    const rect = wrapper.getBoundingClientRect();
    let ratio = (x - rect.left) / rect.width;
    ratio = Math.max(0.02, Math.min(0.98, ratio));
    currentPct = ratio * 100;
    const pct = currentPct.toFixed(2) + '%';
    wrapper.style.setProperty('--reveal-pos', pct);
    handle.setAttribute('aria-valuenow', Math.round(currentPct));
  }

  function onMove(e) {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPos(x);
  }

  function onUp() {
    dragging = false;
    wrapper.classList.remove('dragging');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  }

  wrapper.addEventListener('mousedown', (e) => {
    dragging = true;
    wrapper.classList.add('dragging');
    setPos(e.clientX);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  wrapper.addEventListener('touchstart', (e) => {
    dragging = true;
    wrapper.classList.add('dragging');
    setPos(e.touches[0].clientX);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onUp);
  }, { passive: true });

  // Keyboard support on the handle
  handle.setAttribute('tabindex', '0');
  handle.style.pointerEvents = 'auto';
  handle.style.cursor = 'ew-resize';
  handle.addEventListener('keydown', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') setPos(rect.left + rect.width * ((currentPct - step) / 100));
    if (e.key === 'ArrowRight') setPos(rect.left + rect.width * ((currentPct + step) / 100));
  });
})();


// ── Services: Scroll-Pinned (desktop) + Infinite Carousel (mobile) ──
(function () {
  const MOBILE_BP = 1024;
  const wrapper = document.getElementById('servicesPinWrapper');
  const section = document.querySelector('.services-scroll-section');
  const track   = document.querySelector('.services-cards-track');
  const scroll  = document.querySelector('.services-cards-scroll');
  if (!wrapper || !section || !scroll) return;

  const originalCards = Array.from(scroll.children);
  const N = originalCards.length; // 7

  /* ════════════════════════════════
     DESKTOP: scroll-pinned pan
  ════════════════════════════════ */
  let totalTravel = 0;

  function setupDesktop() {
    scroll.style.transition = 'none';
    totalTravel = scroll.scrollWidth - window.innerWidth;
    if (totalTravel <= 0) { wrapper.style.height = ''; return; }
    wrapper.style.height = (window.innerHeight + totalTravel) + 'px';
  }

  function onScrollDesktop() {
    if (totalTravel <= 0) return;
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(-wrapperTop, totalTravel));
    scroll.style.transform = 'translateX(-' + progress + 'px)';
  }

  /* ════════════════════════════════
     MOBILE: scroll-snap infinite carousel
     Track uses overflow-x:scroll + scroll-snap.
     Clones at start/end enable infinite loop.
     DOM order: [lastClone, card1..card7, firstClone]  (indices 0..N+1)
  ════════════════════════════════ */
  let mobileReady = false;
  let jumpTimer = null;

  function buildClones() {
    scroll.querySelectorAll('.carousel-clone').forEach(c => c.remove());
    const first = originalCards[0].cloneNode(true);
    const last  = originalCards[N - 1].cloneNode(true);
    first.classList.add('carousel-clone');
    last.classList.add('carousel-clone');
    scroll.appendChild(first);                        // index N+1 (clone of card 1)
    scroll.insertBefore(last, scroll.firstChild);     // index 0   (clone of card 7)
  }

  // Scroll track so that the card at DOM index `idx` is centred — instantly (no animation)
  function snapTo(idx) {
    const card = scroll.children[idx];
    if (!card) return;
    // offsetLeft is relative to scroll div; scroll div's left = track's left edge
    // scrollLeft needed so card centre aligns with track centre
    const target = card.offsetLeft + card.offsetWidth / 2 - track.offsetWidth / 2;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = target;
    // restore smooth behaviour for user swipes
    requestAnimationFrame(() => { track.style.scrollBehavior = ''; });
  }

  // Which card index is currently snapped to (closest to track centre)
  function currentSnappedIndex() {
    const centre = track.scrollLeft + track.offsetWidth / 2;
    let best = 0, bestDist = Infinity;
    Array.from(scroll.children).forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }

  function setupMobile() {
    wrapper.style.height = '';
    if (!mobileReady) {
      buildClones();
      mobileReady = true;
    }
    // Two nested RAFs to let clones fully lay out before measuring offsetLeft
    requestAnimationFrame(() => requestAnimationFrame(() => snapTo(1)));
  }

  function teardownMobile() {
    clearTimeout(jumpTimer);
    scroll.querySelectorAll('.carousel-clone').forEach(c => c.remove());
    mobileReady = false;
    scroll.style.transform = '';
  }

  // After the user's scroll settles, check if we're on a clone and silently jump
  function onScrollMobile() {
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(() => {
      const idx = currentSnappedIndex();
      const total = scroll.children.length; // N + 2
      if (idx === 0) {
        // On the last-card clone → jump to real last card
        snapTo(N);
      } else if (idx === total - 1) {
        // On the first-card clone → jump to real first card
        snapTo(1);
      }
    }, 80); // fires shortly after scroll stops
  }

  /* ════════════════════════════════
     Init & resize
  ════════════════════════════════ */
  let activeMode = null;

  function init() {
    const mode = window.innerWidth < MOBILE_BP ? 'mobile' : 'desktop';
    if (mode === activeMode) {
      if (mode === 'desktop') { setupDesktop(); onScrollDesktop(); }
      else { requestAnimationFrame(() => requestAnimationFrame(() => snapTo(1))); }
      return;
    }
    activeMode = mode;
    if (mode === 'mobile') {
      window.removeEventListener('scroll', onScrollDesktop);
      track.addEventListener('scroll', onScrollMobile, { passive: true });
      setupMobile();
    } else {
      track.removeEventListener('scroll', onScrollMobile);
      teardownMobile();
      setupDesktop();
      onScrollDesktop();
      window.addEventListener('scroll', onScrollDesktop, { passive: true });
    }
  }

  init();
  window.addEventListener('resize', () => { activeMode = null; init(); });
})();
