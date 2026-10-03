/* =========================================================
   GANO EV TEMBUNG — carousel.js
   1) Hero carousel (background, produk, teks, thumbnail)
   2) Horizontal scroller untuk "Produk Unggulan"
   Tanpa library — memakai Web Animations API + CSS transition.
   ========================================================= */
(function() {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.2,.8,.2,1)';
  var DUR = 6500;

  /* ---------- helper animasi ---------- */
  function run(el, kf, opt) {
    if (!el || reduce || !el.animate) return Promise.resolve();
    var a = el.animate(kf, Object.assign({
      fill: 'both',
      easing: EASE
    }, opt));
    return a.finished.then(function() {
      try {
        a.commitStyles();
      } catch (e) {}
      a.cancel();
    }).catch(function() {});
  }

  /* ================= HERO ================= */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;
    var data = (window.GANO && window.GANO.hero) || [];
    var len = data.length;
    var bgs = hero.querySelectorAll('.hero-bg i');
    var bikes = hero.querySelectorAll('.bike');
    var thumbs = hero.querySelectorAll('.thumb');
    var stage = hero.querySelector('.hero-stage');
    var lineSpans = hero.querySelectorAll('.line > span');
    var pill = hero.querySelector('.pill');
    var pillText = hero.querySelector('[data-pill]');
    var desc = hero.querySelector('.hero-desc');
    var ctas = hero.querySelectorAll('.hero-cta .btn');
    var cta1 = hero.querySelector('[data-cta-product]');
    var counter = hero.querySelector('[data-counter]');
    var peekImg = hero.querySelector('.peek img');
    var peekSrc = hero.querySelectorAll('[data-peek-src]');
    var trails = hero.querySelectorAll('.trail');
    var cur = 0,
      token = 0,
      timer = null,
      started = 0,
      remaining = DUR,
      isPaused = false;
    var accClasses = data.map(function(d) {
      return d.acc;
    });

    hero.style.setProperty('--dur', DUR + 'ms');
    if (reduce) hero.classList.add('noauto');

    function revealText(first) {
      var delay = first ? 450 : 80;
      var jobs = [];
      lineSpans.forEach(function(s, i) {
        jobs.push(run(s, [{
          transform: 'translate3d(0,110%,0)'
        }, {
          transform: 'translate3d(0,0,0)'
        }], {
          duration: 1000,
          delay: delay + i * 120
        }));
      });
      jobs.push(run(pill, [{
        opacity: 0,
        transform: 'translate3d(0,14px,0)'
      }, {
        opacity: 1,
        transform: 'translate3d(0,0,0)'
      }], {
        duration: 800,
        delay: delay
      }));
      jobs.push(run(desc, [{
        opacity: 0,
        transform: 'translate3d(0,22px,0)'
      }, {
        opacity: 1,
        transform: 'translate3d(0,0,0)'
      }], {
        duration: 900,
        delay: delay + 320
      }));
      ctas.forEach(function(b, i) {
        jobs.push(run(b, [{
          opacity: 0,
          transform: 'translate3d(0,22px,0) scale(.96)'
        }, {
          opacity: 1,
          transform: 'translate3d(0,0,0) scale(1)'
        }], {
          duration: 800,
          delay: delay + 480 + i * 110
        }));
      });
      if (reduce) {
        lineSpans.forEach(function(s) {
          s.style.transform = 'none';
        });
        [pill, desc].concat([].slice.call(ctas)).forEach(function(e) {
          e.style.opacity = 1;
        });
      }
      return Promise.all(jobs);
    }

    function hideText() {
      if (reduce) return Promise.resolve();
      var jobs = [];
      lineSpans.forEach(function(s, i) {
        jobs.push(run(s, {
          transform: 'translate3d(0,-110%,0)'
        }, {
          duration: 380,
          delay: i * 40,
          easing: 'cubic-bezier(.6,0,.9,.4)'
        }));
      });
      [pill, desc].concat([].slice.call(ctas)).forEach(function(e) {
        jobs.push(run(e, {
          opacity: 0
        }, {
          duration: 300
        }));
      });
      return Promise.all(jobs);
    }

    function setContent(i) {
      var d = data[i];
      lineSpans[0].textContent = d.l1;
      lineSpans[1].textContent = d.l2;
      if (pillText) pillText.textContent = d.pill;
      desc.textContent = d.desc;
      if (cta1) cta1.setAttribute('href', 'produk.html#' + d.id);
    }

    function fireTrails() {
      if (reduce) return;
      trails.forEach(function(t, i) {
        t.animate([{
          opacity: 0,
          transform: 'translate3d(-120%,0,0) rotate(-6deg)'
        }, {
          opacity: .95,
          offset: .35
        }, {
          opacity: 0,
          transform: 'translate3d(260%,-30px,0) rotate(-6deg)'
        }], {
          duration: 1500 + i * 250,
          delay: i * 140,
          easing: 'cubic-bezier(.3,.6,.2,1)',
          fill: 'none'
        });
      });
    }

    function updatePeek(i) {
      if (!peekImg || !peekSrc.length) return;
      var next = (i + 1) % len;
      var src = peekSrc[next];
      run(peekImg.parentNode, [{
        opacity: .8
      }, {
        opacity: 0
      }], {
        duration: 250
      }).then(function() {
        var pic = peekImg.parentNode;
        peekImg.src = src.getAttribute('data-peek-src');
        return run(pic, [{
          opacity: 0,
          transform: 'rotate(-10deg) translate3d(30px,0,0)'
        }, {
          opacity: .8,
          transform: 'rotate(-10deg) translate3d(0,0,0)'
        }], {
          duration: 800
        });
      });
    }

    function go(n, dir) {
      n = (n + len) % len;
      if (n === cur) return;
      if (!dir) dir = n > cur ? 1 : -1;
      var prev = cur;
      cur = n;
      var my = ++token;
      var amt = window.innerWidth <= 960 ? 12 : 16;
      stage.style.setProperty('--dx', (dir > 0 ? amt : -amt) + '%');

      /* background crossfade + accent */
      bgs.forEach(function(b, i) {
        b.classList.toggle('on', i === cur);
      });
      accClasses.forEach(function(c) {
        hero.classList.remove(c);
      });
      hero.classList.add(data[cur].acc);

      /* product swap: fade + slide + scale */
      var outB = bikes[prev],
        inB = bikes[cur];
      outB.classList.remove('active');
      outB.classList.add('out');
      inB.classList.add('reset');
      inB.classList.remove('out', 'active');
      void inB.offsetWidth;
      inB.classList.remove('reset');
      inB.classList.add('active');

      /* thumbnail + counter */
      thumbs.forEach(function(t, i) {
        var on = i === cur;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      if (counter) counter.textContent = '0' + (cur + 1);
      var activeThumb = thumbs[cur];
      if (activeThumb && activeThumb.scrollIntoView && window.innerWidth <= 960) {
        var sc = activeThumb.parentNode;
        sc.scrollTo({
          left: activeThumb.offsetLeft - 16,
          behavior: reduce ? 'auto' : 'smooth'
        });
      }

      fireTrails();
      updatePeek(cur);
      hideText().then(function() {
        if (my !== token) return;
        setContent(cur);
        revealText(false);
      });
      schedule(DUR);
    }

    /* ---- autoplay with proper pause/resume ---- */
    function schedule(ms) {
      clearTimeout(timer);
      if (reduce) return;
      remaining = ms;
      started = Date.now();
      if (isPaused) return;
      timer = setTimeout(function() {
        go(cur + 1, 1);
      }, ms);
    }

    function pause() {
      if (isPaused || reduce) return;
      isPaused = true;
      hero.classList.add('paused');
      clearTimeout(timer);
      remaining = Math.max(400, remaining - (Date.now() - started));
    }

    function resume() {
      if (!isPaused || reduce) return;
      isPaused = false;
      hero.classList.remove('paused');
      started = Date.now();
      timer = setTimeout(function() {
        go(cur + 1, 1);
      }, remaining);
    }

    thumbs.forEach(function(t, i) {
      t.addEventListener('click', function() {
        go(i);
      });
    });
    var prevBtn = hero.querySelector('[data-prev]'),
      nextBtn = hero.querySelector('[data-next]');
    if (prevBtn) prevBtn.addEventListener('click', function() {
      go(cur - 1, -1);
    });
    if (nextBtn) nextBtn.addEventListener('click', function() {
      go(cur + 1, 1);
    });

    var hoverEls = [stage, hero.querySelector('.hero-explore')];
    hoverEls.forEach(function(el) {
      if (!el) return;
      el.addEventListener('mouseenter', pause);
      el.addEventListener('mouseleave', resume);
      el.addEventListener('focusin', pause);
      el.addEventListener('focusout', resume);
    });
    document.addEventListener('visibilitychange', function() {
      document.hidden ? pause() : resume();
    });

    /* swipe */
    var sx = null,
      sy = null;
    stage.addEventListener('pointerdown', function(e) {
      sx = e.clientX;
      sy = e.clientY;
    });
    stage.addEventListener('pointerup', function(e) {
      if (sx === null) return;
      var dx = e.clientX - sx,
        dy = e.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
    stage.addEventListener('pointercancel', function() {
      sx = null;
    });
    hero.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') go(cur + 1, 1);
      if (e.key === 'ArrowLeft') go(cur - 1, -1);
    });

    /* initial state */
    bgs[0].classList.add('on');
    bikes[0].classList.add('active');
    hero.classList.add(data[0].acc);
    thumbs[0].classList.add('active');
    setContent(0);
    updatePeekInitial();

    function updatePeekInitial() {
      if (peekImg && peekSrc.length) peekImg.src = peekSrc[1 % len].getAttribute('data-peek-src');
    }
    var begun = false;

    function start() {
      if (begun) return;
      begun = true;
      stage.classList.remove('pre');
      revealText(true);
      fireTrails();
      schedule(DUR + 900);
    }
    if (document.documentElement.classList.contains('js')) {
      if (document.readyState === 'complete') start();
      else {
        window.addEventListener('load', start);
        setTimeout(start, 1600);
      }
    } else {
      stage.classList.remove('pre');
    }
    window.__ganoHero = {
      go: go
    };
  }

  /* ================= FEATURED SCROLLER ================= */
  function initScroller() {
    document.querySelectorAll('[data-scroller]').forEach(function(wrap) {
      var track = wrap.querySelector('.f-scroller');
      var prev = wrap.querySelector('[data-s-prev]');
      var next = wrap.querySelector('[data-s-next]');
      if (!track) return;

      function step() {
        var c = track.querySelector('.fcard');
        return c ? c.getBoundingClientRect().width + 22 : 320;
      }

      function state() {
        if (prev) prev.disabled = track.scrollLeft < 8;
        if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
        [prev, next].forEach(function(b) {
          if (b) b.style.opacity = b.disabled ? .35 : 1;
        });
      }
      if (prev) prev.addEventListener('click', function() {
        track.scrollBy({
          left: -step(),
          behavior: 'smooth'
        });
      });
      if (next) next.addEventListener('click', function() {
        track.scrollBy({
          left: step(),
          behavior: 'smooth'
        });
      });
      track.addEventListener('scroll', function() {
        window.requestAnimationFrame(state);
      }, {
        passive: true
      });
      window.addEventListener('resize', state);
      state();
      /* drag to scroll (mouse) */
      var down = false,
        startX = 0,
        startLeft = 0,
        moved = false;
      track.addEventListener('pointerdown', function(e) {
        if (e.pointerType !== 'mouse') return;
        down = true;
        moved = false;
        startX = e.clientX;
        startLeft = track.scrollLeft;
      });
      window.addEventListener('pointermove', function(e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 5) {
          moved = true;
          track.style.scrollSnapType = 'none';
          track.scrollLeft = startLeft - dx;
        }
      });
      window.addEventListener('pointerup', function() {
        if (!down) return;
        down = false;
        track.style.scrollSnapType = '';
      });
      track.addEventListener('click', function(e) {
        if (moved) {
          e.preventDefault();
          moved = false;
        }
      }, true);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initScroller();
  });
})();
