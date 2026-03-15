/**
 * navbar.js — Indo Thai Global
 * Handles: scroll effects, progress bar, hamburger toggle, active links
 */

(function () {
  'use strict';

  /* ── Elements ── */
  const nav      = document.getElementById('nav');
  const progress = document.getElementById('navProgress');
  const burger   = document.getElementById('burger');
  const drawer   = document.getElementById('drawer');

  if (!nav) return; // guard if navbar not present

  /* ────────────────────────────────────────────
     SCROLL: shadow depth + progress bar
  ──────────────────────────────────────────── */
  function onScroll() {
    const scrolled = window.scrollY > 12;
    nav.classList.toggle('is-scrolled', scrolled);

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progress.style.width = pct.toFixed(2) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ────────────────────────────────────────────
     HAMBURGER / DRAWER
  ──────────────────────────────────────────── */
  if (!burger || !drawer) return;

  let isOpen = false;

  function toggleDrawer(force) {
    isOpen = typeof force === 'boolean' ? force : !isOpen;
    burger.classList.toggle('is-open', isOpen);
    drawer.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    // lock body scroll when drawer open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // toggle on burger click
  burger.addEventListener('click', function () {
    toggleDrawer();
  });

  // close when a drawer link/CTA is clicked
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggleDrawer(false);
    });
  });

  // close on outside click
  document.addEventListener('click', function (e) {
    if (isOpen && !nav.contains(e.target) && !drawer.contains(e.target)) {
      toggleDrawer(false);
    }
  });

  // close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) toggleDrawer(false);
  });

  // close drawer if window resizes past mobile breakpoint
  window.addEventListener('resize', function () {
    if (isOpen && window.innerWidth > 900) toggleDrawer(false);
  }, { passive: true });

  /* ────────────────────────────────────────────
     ACTIVE LINK — highlight based on current URL
  ──────────────────────────────────────────── */
  const current = window.location.pathname.split('/').pop() || 'home.html';

  document.querySelectorAll('.nav-link, .drawer-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();

/* ────────────────────────────────────────────
   LANGUAGE SWITCHER — All World Languages
──────────────────────────────────────────── */
(function () {
  var navLang    = document.getElementById('navLang');
  var langBtn    = document.getElementById('langBtn');
  var langCur    = document.getElementById('langCurrent');
  var langFlag   = document.getElementById('langFlag');
  var langSearch = document.getElementById('langSearch');
  var scroll     = document.getElementById('langOptionsScroll');
  if (!navLang || !langBtn) return;

  /* Toggle open/close */
  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var opening = !navLang.classList.contains('open');
    navLang.classList.toggle('open', opening);
    if (opening && langSearch) setTimeout(function () { langSearch.focus(); }, 60);
  });
  document.addEventListener('click', function () { navLang.classList.remove('open'); });
  navLang.addEventListener('click', function (e) { e.stopPropagation(); });

  /* Search */
  if (langSearch) {
    langSearch.addEventListener('input', function () {
      var q = langSearch.value.trim().toLowerCase();
      scroll.querySelectorAll('.lang-group').forEach(function (grp) {
        var any = false;
        grp.querySelectorAll('.lang-option').forEach(function (opt) {
          var match = !q
            || opt.querySelector('.lang-option-name').textContent.toLowerCase().includes(q)
            || opt.querySelector('.lang-option-code').textContent.toLowerCase().includes(q);
          opt.classList.toggle('lang-hidden', !match);
          if (match) any = true;
        });
        grp.classList.toggle('lang-group-hidden', !any);
      });
    });
  }

  /* Click option */
  document.querySelectorAll('.lang-option').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      applyLang(opt.dataset.lang, opt.dataset.flag,
        opt.querySelector('.lang-option-code').textContent.trim());
      navLang.classList.remove('open');
      if (langSearch) {
        langSearch.value = '';
        document.querySelectorAll('.lang-option').forEach(function (o) { o.classList.remove('lang-hidden'); });
        document.querySelectorAll('.lang-group').forEach(function (g) { g.classList.remove('lang-group-hidden'); });
      }
    });
  });

  /* Restore saved language */
  var saved = localStorage.getItem('itg-lang') || 'en';
  var savedOpt = document.querySelector('.lang-option[data-lang="' + saved + '"]');
  if (savedOpt) {
    applyLang(saved, savedOpt.dataset.flag,
      savedOpt.querySelector('.lang-option-code').textContent.trim());
  }

  function applyLang(lang, flag, code) {
    document.querySelectorAll('.lang-option').forEach(function (o) {
      o.classList.toggle('active', o.dataset.lang === lang);
    });
    if (langCur)  langCur.textContent  = code  || lang.toUpperCase().slice(0, 2);
    if (langFlag) langFlag.textContent = flag  || '🌐';
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('itg-lang', lang);

    /* Trigger Google Translate */
    function doTranslate() {
      var sel = document.querySelector('.goog-te-combo');
      if (sel) { sel.value = lang; sel.dispatchEvent(new Event('change')); return true; }
      return false;
    }
    if (!doTranslate()) {
      var tries = 0;
      var iv = setInterval(function () {
        if (doTranslate() || ++tries > 20) clearInterval(iv);
      }, 300);
    }
  }
})();