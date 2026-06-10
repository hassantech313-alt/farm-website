/*!
 * Dream Farms – Ultra-Premium Luxury Website
 * Main JavaScript: GSAP + Lenis + Custom Animations
 */

'use strict';

/* ── REGISTER GSAP PLUGINS ─────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── LENIS FALLBACK ─────────────────────────────────────────── */
// If Lenis fails to load, create a minimal polyfill
if (typeof Lenis === 'undefined') {
  window.Lenis = class LenisFallback {
    constructor() {}
    on() {}
    scrollTo(target, opts) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    stop() {}
    start() {}
    raf() {}
  };
}

/* ═══════════════════════════════════════════════════════════════
   1. PRELOADER
═══════════════════════════════════════════════════════════════ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const tl = gsap.timeline();

  // Lock body scroll during preload
  document.body.style.overflow = 'hidden';

  // After progress animation completes, reveal site
  tl.to(preloader, {
    delay: 3,
    duration: 1,
    yPercent: -100,
    ease: 'power4.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      initHeroAnimations();
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   2. LENIS SMOOTH SCROLL
═══════════════════════════════════════════════════════════════ */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1.2,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Smooth nav link scrolling
// Mobile me preventDefault/Lenis se kabhi-kabhi hash scroll block ho jata hai,
// isliye mobile navbar links par safer native navigation use karte hain.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;

    const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    const isNavbarLink = link.closest && link.closest('.nav-links');

    // If it's mobile navbar link, let the browser handle hash navigation.
    if (isMobile && isNavbarLink) {
      // Menu close logic already runs in initNavbar();
      // Browser native hash navigation scroll will be more reliable.
      return;
    }

    e.preventDefault();
    lenis.scrollTo(target, { offset: -80, duration: 1.6 });
  });
});


/* ═══════════════════════════════════════════════════════════════
   3. CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1 });
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    gsap.set(outline, { x: outlineX, y: outlineY });
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effects
  document.querySelectorAll('a, button, .gallery-item, .facility-card, .exp-card, .review-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(outline, { width: 60, height: 60, borderColor: 'rgba(201,168,76,0.8)', duration: 0.3 });
      gsap.to(dot, { scale: 1.5, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(outline, { width: 36, height: 36, borderColor: 'rgba(201,168,76,0.6)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   4. NAVBAR
═══════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
    lenis.stop();
    if (!navLinks?.classList.contains('open')) lenis.start();
  });

  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      lenis.start();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks?.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      lenis.start();
    }
  });
})();

/* ═══════════════════════════════════════════════════════════════
   5. HERO ANIMATIONS (called after preloader)
═══════════════════════════════════════════════════════════════ */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-title-line', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
    .to('.hero-title-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-card', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');
}

/* ── HERO BACKGROUND SLIDER ─────────────────────────────────── */
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;

  // If only one hero image exists, don't auto-slide.
  if (slides.length <= 1) return;

  let current = 0;

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(nextSlide, 5000);
})();

/* ── HERO PARTICLES ─────────────────────────────────────────── */
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = window.innerWidth > 768 ? 30 : 12;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(201,168,76,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
    `;
    container.appendChild(p);

    gsap.to(p, {
      y: -(Math.random() * 200 + 100),
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: Math.random() * 4 + 3,
      repeat: -1,
      delay: Math.random() * 5,
      ease: 'none',
    });
  }
})();

/* ═══════════════════════════════════════════════════════════════
   6. SCROLL ANIMATIONS (ScrollTrigger)
═══════════════════════════════════════════════════════════════ */
(function initScrollAnimations() {

  // Generic fade-up for section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // About section
  gsap.from('.about-img-main', {
    scrollTrigger: { trigger: '.about-section', start: 'top 75%', once: true },
    opacity: 0,
    x: -60,
    duration: 1.1,
    ease: 'power3.out',
  });

  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-section', start: 'top 75%', once: true },
    opacity: 0,
    x: 60,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from('.about-img-stat', {
    scrollTrigger: { trigger: '.about-section', start: 'top 60%', once: true },
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.5,
  });

  gsap.utils.toArray('.pillar').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      opacity: 0,
      x: -30,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  // Stats counter
  gsap.utils.toArray('.count').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
        });
      },
    });
  });

  // Facilities cards stagger
  gsap.utils.toArray('.facility-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      delay: (i % 4) * 0.1,
      ease: 'power3.out',
    });
  });

  // Property features alternating slide
  document.querySelectorAll('.property-feature.left').forEach(el => {
    gsap.from(el.querySelector('.property-media'), {
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      opacity: 0, x: -80, duration: 1, ease: 'power3.out',
    });
    gsap.from(el.querySelector('.property-info'), {
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      opacity: 0, x: 80, duration: 1, ease: 'power3.out', delay: 0.2,
    });
  });

  document.querySelectorAll('.property-feature.right').forEach(el => {
    gsap.from(el.querySelector('.property-info'), {
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      opacity: 0, x: -80, duration: 1, ease: 'power3.out',
    });
    gsap.from(el.querySelector('.property-media'), {
      scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      opacity: 0, x: 80, duration: 1, ease: 'power3.out', delay: 0.2,
    });
  });

  // Gallery items
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%', once: true },
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      delay: (i % 4) * 0.08,
      ease: 'power3.out',
    });
  });

  // Experience cards
  gsap.utils.toArray('.exp-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      opacity: 0,
      y: 60,
      duration: 0.7,
      delay: (i % 3) * 0.15,
      ease: 'power3.out',
    });
  });

  // Instagram grid
  gsap.utils.toArray('.insta-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%', once: true },
      opacity: 0,
      scale: 0.85,
      duration: 0.5,
      delay: i * 0.08,
      ease: 'back.out(1.4)',
    });
  });

  // Location
  gsap.from('.location-info', {
    scrollTrigger: { trigger: '.location-section', start: 'top 75%', once: true },
    opacity: 0, x: -60, duration: 1, ease: 'power3.out',
  });

  gsap.from('.location-map', {
    scrollTrigger: { trigger: '.location-section', start: 'top 75%', once: true },
    opacity: 0, x: 60, duration: 1, ease: 'power3.out', delay: 0.2,
  });

  // Booking section
  gsap.from('.booking-content', {
    scrollTrigger: { trigger: '.booking-section', start: 'top 75%', once: true },
    opacity: 0, y: 60, duration: 1, ease: 'power3.out',
  });

  // Footer
  gsap.from('.footer-grid > *', {
    scrollTrigger: { trigger: '.footer-section', start: 'top 85%', once: true },
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // Review cards
  gsap.utils.toArray('.review-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: '.reviews-section', start: 'top 70%', once: true },
      opacity: 0,
      y: 50,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

})();

/* ═══════════════════════════════════════════════════════════════
   7. PARALLAX
═══════════════════════════════════════════════════════════════ */
(function initParallax() {
  // Hero parallax
  gsap.to('.hero-bg-slider', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    yPercent: 30,
    ease: 'none',
  });

  // About image subtle parallax
  gsap.to('.about-art-bg', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    yPercent: -10,
    ease: 'none',
  });

  // Experience background
  gsap.to('.experience-bg', {
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    yPercent: 20,
    ease: 'none',
  });
})();

/* ═══════════════════════════════════════════════════════════════
   8. REVIEWS SWIPER
═══════════════════════════════════════════════════════════════ */
(function initReviewsSwiper() {
  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: '.reviews-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.reviews-prev',
      nextEl: '.reviews-next',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    effect: 'slide',
  });
})();

/* ═══════════════════════════════════════════════════════════════
   9. GALLERY FILTERS
═══════════════════════════════════════════════════════════════ */
(function initGalleryFilters() {
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        const show = category === 'all' || cat === category;

        if (show) {
          gsap.to(item, {
            opacity: 1, scale: 1, duration: 0.4,
            ease: 'power3.out',
            onStart: () => { item.style.display = 'block'; item.style.pointerEvents = 'auto'; }
          });
        } else {
          gsap.to(item, {
            opacity: 0, scale: 0.9, duration: 0.3,
            ease: 'power3.in',
            onComplete: () => { item.style.display = 'none'; item.style.pointerEvents = 'none'; }
          });
        }
      });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   10. GLIGHTBOX
═══════════════════════════════════════════════════════════════ */
(function initLightbox() {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    openEffect: 'fade',
    closeEffect: 'fade',
    cssEfects: {
      fade: { in: 'fadeIn', out: 'fadeOut' },
    },
    svg: {
      close: '<i class="fas fa-times"></i>',
      next: '<i class="fas fa-chevron-right"></i>',
      prev: '<i class="fas fa-chevron-left"></i>',
    },
  });
})();

/* ═══════════════════════════════════════════════════════════════
   11. BACK TO TOP
═══════════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.8, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   12. IMAGE ERROR FALLBACK
═══════════════════════════════════════════════════════════════ */
(function initImageFallback() {
  document.querySelectorAll('img[src]').forEach(img => {
    // For logo images, show a styled text fallback
    img.addEventListener('error', function() {
      const isLogo = this.closest('.nav-logo') || this.closest('.footer-brand') || this.closest('.preloader-logo');

      if (isLogo) {
        // Replace with text-based logo
        this.style.display = 'none';
        const logoText = document.createElement('div');
        logoText.style.cssText = `
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #C9A84C;
          letter-spacing: 0.1em;
          line-height: 1.2;
          text-align: center;
          padding: 6px;
        `;
        logoText.innerHTML = '<span style="display:block;font-size:1.1em">🏡</span>DREAM<br>FARMS';
        this.parentElement.appendChild(logoText);
      } else {
        // Generic fallback for other images
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent && !parent.querySelector('.img-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = 'img-fallback';
          fallback.style.cssText = `
            width: 100%; height: 100%; min-height: 200px;
            background: linear-gradient(135deg, #0D1527 0%, #1A2844 50%, #0D1527 100%);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: 12px; color: rgba(201,168,76,0.6);
          `;
          fallback.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span style="font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(201,168,76,0.35)">Dream Farms</span>
          `;
          parent.appendChild(fallback);
        }
      }
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════
   13. NAVBAR ACTIVE LINK
═══════════════════════════════════════════════════════════════ */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  function updateActive() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
})();

/* ── Active nav link style ───────────────────────────────────── */
const styleActiveNav = document.createElement('style');
styleActiveNav.textContent = `
  .nav-link.active-nav {
    color: var(--gold-light) !important;
  }
  .nav-link.active-nav::after {
    transform: translateX(-50%) scaleX(1) !important;
  }
`;
document.head.appendChild(styleActiveNav);

/* ═══════════════════════════════════════════════════════════════
   14. GOLD SHIMMER ON HERO TITLE
═══════════════════════════════════════════════════════════════ */
(function initShimmer() {
  const title = document.querySelector('.hero-title-line');
  if (!title) return;

  // Add CSS shimmer class
  const style = document.createElement('style');
  style.textContent = `
    @keyframes goldShimmer {
      0% { background-position: -500px 0; }
      100% { background-position: 500px 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════════════════════
   14b. GALLERY ENHANCEMENTS
═══════════════════════════════════════════════════════════════ */
(function initGalleryEnhancements() {
  // Add PDF badge labels to gallery items
  const labels = [
    'Villa 1', 'Private Pool', 'Living Room',
    'Villa 2', 'Bedroom', 'Pool Evening',
    'Villa 3', 'Suite', 'Garden',
    'Villa 4', 'Garden', 'Interior',
    'Palsana', 'Pool Deck', 'Suite'
  ];

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const badge = document.createElement('span');
    badge.className = 'pdf-badge';
    badge.textContent = labels[i] || 'View';
    item.appendChild(badge);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   15. INIT COMPLETE
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Refresh ScrollTrigger after fonts load
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });

  // Add loaded class to body
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
  });

  console.log('%cDream Farms %c| Where Luxury Meets Your Comfort',
    'color: #C9A84C; font-weight: 700; font-size: 16px; font-family: serif;',
    'color: rgba(255,255,255,0.6); font-size: 12px;'
  );
});
