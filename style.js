/* ═══════════════════════════════════════════════════════════════
   SUPER GYM — style.js
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── LANGUAGE TOGGLE ──────────────────────────────────────── */
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'ar';

  function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dataset.lang = lang;

    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      const text = el.dataset[lang];
      if (text) el.textContent = text;
    });

    /* Update select options */
    document.querySelectorAll('select option[data-ar][data-en]').forEach(opt => {
      const text = opt.dataset[lang];
      if (text) opt.textContent = text;
    });

    /* Update input placeholders */
    const namePH     = document.querySelector('#nameInput');
    const phonePH    = document.querySelector('#phoneInput');
    const messagePH  = document.querySelector('#messageInput');
    if (namePH)    namePH.placeholder    = lang === 'ar' ? 'أدخل اسمك'            : 'Enter your name';
    if (phonePH)   phonePH.placeholder   = lang === 'ar' ? 'أدخل رقم هاتفك'       : 'Enter your phone number';
    if (messagePH) messagePH.placeholder = lang === 'ar' ? 'اكتب رسالتك هنا...'   : 'Write your message here...';
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLang(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  /* ── THEME TOGGLE ─────────────────────────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  let isDark = true;

  function setTheme(dark) {
    isDark = dark;
    document.body.classList.toggle('dark-theme', dark);
    document.body.classList.toggle('light-theme', !dark);
    localStorage.setItem('supergym-theme', dark ? 'dark' : 'light');
  }

  const savedTheme = localStorage.getItem('supergym-theme');
  if (savedTheme) setTheme(savedTheme === 'dark');
  else setTheme(true);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => setTheme(!isDark));
  }

  /* ── HAMBURGER MENU ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── NAV SCROLL STYLE ─────────────────────────────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── CONTACT FORM ─────────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = currentLang === 'ar' ? 'تم الإرسال ✓' : 'Sent ✓';
      btn.style.background = '#25D366';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── SCROLL REVEAL ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.service-card, .coach-card, .gallery-item, .feature-item, .contact-item'
  );

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      obs.observe(el);
    });
  }

})();