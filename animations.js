/* =========================================================
   GANO EV TEMBUNG — animations.js
   Entrance, scroll reveal, parallax ringan, magnetic button,
   custom cursor (desktop). Hanya transform & opacity.
   Menghormati prefers-reduced-motion.
   ========================================================= */
(function() {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- entrance (navbar turun dari atas, dll) ---------- */
  function loaded() {
    requestAnimationFrame(function() {
      root.classList.add('loaded');
    });
  }
  if (document.readyState === 'complete') loaded();
  else window.addEventListener('load', loaded);
  setTimeout(loaded, 1800); /* jaga-jaga jika load tertahan */

  document.addEventListener('DOMContentLoaded', function() {
    /* ---------- scroll reveal ---------- */
    document.querySelectorAll('[data-stagger]').forEach(function(parent) {
      var base = parseFloat(parent.getAttribute('data-stagger')) || 0.09;
      parent.querySelectorAll(':scope > [data-reveal]').forEach(function(el, i) {
        el.style.setProperty('--d', (i * base).toFixed(2) + 's');
      });
    });
    var items = document.querySelectorAll('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function(el) {
        el.classList.add('in');
      });
    } else {
      var map = new Map();
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            map.get(e.target).classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
      });
      items.forEach(function(el) {
        /* clip-path membuat elemen tak terdeteksi: amati induknya untuk reveal "img" */
        var t = el.getAttribute('data-reveal') === 'img' ? el.parentNode : el;
        map.set(t, el);
        io.observe(t);
      });
    }

    /* ---------- parallax ringan ---------- */
    var par = [].slice.call(document.querySelectorAll('[data-parallax]'));
    if (par.length && !reduce) {
      var ticking = false;
      var update = function() {
        var vh = window.innerHeight;
        par.forEach(function(el) {
          var r = el.parentNode.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
          var d = (r.top + r.height / 2 - vh / 2) * speed;
          el.style.transform = 'translate3d(0,' + d.toFixed(1) + 'px,0) scale(1.14)';
        });
        ticking = false;
      };
      window.addEventListener('scroll', function() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      }, {
        passive: true
      });
      window.addEventListener('resize', update);
      update();
    }
    var phBg = document.querySelector('.ph-bg');
    if (phBg && !reduce) {
      window.addEventListener('scroll', function() {
        var y = Math.min(window.scrollY, 700);
        phBg.style.transform = 'translate3d(0,' + (y * 0.25).toFixed(1) + 'px,0) scale(1.1)';
      }, {
        passive: true
      });
    }

    /* ---------- magnetic button ---------- */
    if (finePointer && !reduce) {
      document.querySelectorAll('.btn, .social a, .arrow-btn').forEach(function(b) {
        var s = b.classList.contains('btn') ? 0.22 : 0.3;
        b.addEventListener('pointermove', function(e) {
          var r = b.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) * s,
            y = (e.clientY - r.top - r.height / 2) * s;
          b.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
        });
        b.addEventListener('pointerleave', function() {
          b.style.transform = '';
        });
      });
    }

    /* ---------- custom cursor (desktop saja) ---------- */
    if (finePointer && !reduce) {
      var ring = document.createElement('div');
      ring.className = 'cursor';
      ring.setAttribute('aria-hidden', 'true');
      var dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ring);
      document.body.appendChild(dot);
      root.classList.add('has-cursor');
      document.body.classList.add('has-cursor');
      var mx = -100,
        my = -100,
        rx = -100,
        ry = -100;
      window.addEventListener('pointermove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        ring.classList.add('on');
        dot.classList.add('on');
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
        var t = e.target.closest && e.target.closest('a, button, .g-item, .fcard, input, textarea');
        ring.classList.toggle('big', !!t);
      });
      document.addEventListener('mouseleave', function() {
        ring.classList.remove('on');
        dot.classList.remove('on');
      });
      (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        requestAnimationFrame(loop);
      })();
    }
  });
})();
