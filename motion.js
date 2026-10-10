/**
 * Tango Para La Vida — motion engine (no dependencies).
 *
 * Replaces AOS. Works with content that Alpine renders after load:
 *   - `mount()` scans the page once and then watches for new nodes (MutationObserver),
 *     so anything Alpine inserts with data-fx / data-text is picked up automatically.
 *   - `data-fx`   elements get `.is-in` when they scroll into view (once).
 *   - `data-text` elements are split into words/characters, then get `.is-in`.
 *     `data-text="scrub"` is driven by scroll position instead of a one-shot reveal.
 *   - Also drives: scroll progress bar, scrollspy for the nav, the hero glow that
 *     follows the pointer, and `swap()` (soft crossfade when the program level changes).
 * All animation itself lives in motion.css. Under prefers-reduced-motion text is
 * left unsplit and the pointer/scrub effects are skipped.
 */
(function () {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  var SELECTOR = '[data-fx], [data-text]';

  var io = null;
  var mounted = false;
  var scrubs = [];
  var progressEl = null;
  var ticking = false;

  /* Deterministic 0..1 value per index, so the "focus" scatter is stable between loads. */
  function hash(n) {
    var x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function makePiece(cls, text, vars) {
    var s = document.createElement('span');
    s.className = cls;
    s.textContent = text;
    Object.keys(vars || {}).forEach(function (k) { s.style.setProperty(k, vars[k]); });
    return s;
  }

  /* ---------- Text splitting ---------- */
  function split(el) {
    if (el.hasAttribute('data-split-done')) return;
    el.setAttribute('data-split-done', '');
    if (reduceQuery.matches) return; // keep plain text; the CSS shows it as-is

    var mode = el.getAttribute('data-text');
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;

    var byChar = mode === 'rise' || mode === 'focus' || mode === 'pairs';

    // Screen readers get the intact sentence; the split pieces are hidden from them.
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;

    var visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');

    var index = 0;
    text.split(' ').forEach(function (word, wi, all) {
      var w = document.createElement('span');
      w.className = 'w';

      if (byChar) {
        Array.from(word).forEach(function (ch) {
          w.appendChild(makePiece('c', ch, {
            '--ci': index,
            '--rnd': hash(index + 1).toFixed(3),
            '--dir': index % 2 ? 1 : -1
          }));
          index += 1;
        });
      } else {
        w.appendChild(makePiece('c', word, { '--ci': index }));
        index += 1;
      }

      visual.appendChild(w);
      if (wi < all.length - 1) visual.appendChild(document.createTextNode(' '));
    });

    el.textContent = '';
    el.appendChild(sr);
    el.appendChild(visual);
  }

  /* ---------- Reveal wiring ---------- */
  function track(el) {
    if (el.__fx) return;
    el.__fx = true;

    if (el.getAttribute('data-text') === 'scrub' && !reduceQuery.matches) {
      scrubs.push(el);
      return;
    }
    if (!io) { el.classList.add('is-in'); return; }
    io.observe(el);
  }

  function collect(root) {
    var found = [];
    if (root.matches && root.matches(SELECTOR)) found.push(root);
    if (root.querySelectorAll) found.push.apply(found, root.querySelectorAll(SELECTOR));
    // Split first, then observe, so nothing is ever visible half-prepared.
    found.forEach(function (el) { if (el.hasAttribute('data-text')) split(el); });
    found.forEach(track);
    if (scrubs.length) frame();
  }

  /* ---------- Scroll-driven bits (one rAF-throttled handler) ---------- */
  function frame() {
    ticking = false;
    var doc = document.documentElement;

    if (progressEl) {
      var max = doc.scrollHeight - window.innerHeight;
      progressEl.style.setProperty('--p', max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4) : 0);
    }

    var vh = window.innerHeight;
    // At the very bottom of the page, reveal whatever is on screen: a short footer can sit entirely
    // inside the observer's bottom margin and would otherwise never cross it.
    if (io && window.scrollY + vh >= doc.scrollHeight - 2) {
      Array.prototype.forEach.call(document.querySelectorAll('[data-fx]:not(.is-in), [data-text]:not(.is-in)'), function (el) {
        if (el.getAttribute('data-text') === 'scrub') return;
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) { el.classList.add('is-in'); io.unobserve(el); }
      });
    }
    scrubs.forEach(function (el) {
      var words = el.querySelectorAll('.c');
      if (!words.length) return;
      var r = el.getBoundingClientRect();
      var start = vh * 0.85;
      var span = vh * 0.5 + r.height * 0.6;
      var p = Math.min(1, Math.max(0, (start - r.top) / span));
      var n = Math.round(p * words.length);
      var prev = el.__lit || 0;
      if (n === prev) return;
      for (var i = Math.min(n, prev); i < Math.max(n, prev); i += 1) {
        words[i].classList.toggle('lit', i < n);
      }
      el.__lit = n;
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  /* ---------- Scrollspy: gold underline follows the section in view ---------- */
  function initSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('header nav a.nav-link[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var section = id && document.getElementById(id);
      if (section) byId[id] = { link: a, section: section };
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(byId).forEach(function (id) { spy.observe(byId[id].section); });
  }

  /* ---------- Hero glow follows the pointer with a little inertia ---------- */
  function initGlow() {
    var hero = document.getElementById('hero');
    var glow = document.getElementById('hero-glow');
    if (!hero || !glow || !fineQuery.matches || reduceQuery.matches) return;

    var tx = 0, ty = 0, x = 0, y = 0, raf = 0;

    function loop() {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      raf = (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) ? window.requestAnimationFrame(loop) : 0;
    }
    function kick() { if (!raf) raf = window.requestAnimationFrame(loop); }

    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * 0.2;
      ty = (e.clientY - r.top - r.height / 2) * 0.2;
      kick();
    });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
  }

  /* ---------- Soft crossfade when the program level changes ---------- */
  function swap() {
    if (reduceQuery.matches || !document.body.animate) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-swap]'), function (el) {
      el.getAnimations().forEach(function (a) { if (a.id === 'swap') a.cancel(); });
      el.animate(
        [
          { opacity: 0.25, transform: 'translateY(10px)', filter: 'blur(3px)' },
          { opacity: 1, transform: 'none', filter: 'blur(0)' }
        ],
        { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', id: 'swap' }
      );
    });
  }

  /* ---------- Boot ---------- */
  function mount() {
    if (mounted) return;
    mounted = true;

    try {
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          });
        }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
      }

      progressEl = document.getElementById('scroll-progress');

      collect(document.body);

      // Alpine renders lists and templates after this point; pick those up too.
      new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (n) {
            if (n.nodeType === 1) collect(n);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      initSpy();
      initGlow();
      frame();
    } catch (err) {
      document.documentElement.classList.add('fx-off');
      if (window.console) console.error('Motion engine failed, showing static page.', err);
    }
  }

  window.TangoMotion = { mount: mount, swap: swap };
})();
