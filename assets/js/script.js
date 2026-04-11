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
const contactForm = document.getElementById('contactForm');
const successMsg = document.querySelector('.success-msg');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  }, 1200);
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
