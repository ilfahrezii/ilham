/* =========================================================
   GANO EV TEMBUNG — main.js
   Data kontak, navbar, menu mobile, modal produk & artikel,
   galeri (filter + lightbox), validasi form kontak.
   ========================================================= */
(function() {
  'use strict';
  var G = window.GANO || {
    config: {},
    products: {},
    articles: {}
  };
  var C = G.config;
  var $ = function(s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function(s, r) {
    return [].slice.call((r || document).querySelectorAll(s));
  };

  var ICON = {
    check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    wa: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a3.5 3.5 0 0 1-1.6-1.6l.7-.9-1-2z"/></svg>',
    arrow: '<svg class="icon icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  };

  function waLink(text) {
    return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      } [c];
    });
  }

  /* ---------- 1. isi data kontak dari config.js ---------- */
  function fillContacts() {
    $$('[data-c]').forEach(function(el) {
      var k = el.getAttribute('data-c');
      if (k === 'whatsapp') {
        el.href = waLink('Halo GANO EV Tembung, saya ingin bertanya tentang sepeda listrik.');
        if (el.hasAttribute('data-text')) el.textContent = C.phoneDisplay;
      } else if (k === 'phone') {
        el.href = 'tel:' + C.phoneTel;
        el.textContent = C.phoneDisplay;
      } else if (k === 'email') {
        el.href = 'mailto:' + C.email;
        el.textContent = C.email;
      } else if (k === 'address') {
        el.textContent = C.address;
      } else if (k === 'hours') {
        if (C.hours) el.textContent = C.hours;
        else if (el.closest('.info-item')) el.closest('.info-item').hidden = true;
      } else if (k === 'maps') {
        el.href = C.mapsLink;
      } else if (k === 'instagram') {
        el.href = C.instagram;
      } else if (k === 'tiktok') {
        el.href = C.tiktok;
      }
    });
    var map = $('[data-map]');
    if (map) {
      map.src = C.mapEmbedUrl || ('https://www.google.com/maps?q=' + encodeURIComponent(C.mapQuery) + '&hl=id&z=16&output=embed');
    }
  }

  /* ---------- 2. navbar ---------- */
  function initNav() {
    var nav = $('.nav');
    if (!nav) return;
    var burger = $('.burger'),
      links = $('.nav-links');
    var wa = $('.wa-float');
    var onScroll = function() {
      nav.classList.toggle('scrolled', window.scrollY > 24);
      if (wa) wa.classList.toggle('show', window.scrollY > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });

    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav-links a:not(.btn)').forEach(function(a) {
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href === page || (page === '' && href === 'index.html')) a.setAttribute('aria-current', 'page');
    });

    function setMenu(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      links.classList.toggle('open', open);
      document.body.classList.toggle('lock', open);
    }
    burger.addEventListener('click', function() {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', links).forEach(function(a) {
      a.addEventListener('click', function() {
        setMenu(false);
      });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function() {
      if (window.innerWidth > 960) setMenu(false);
    });
  }

  /* ---------- 3. modal generik (fokus, ESC, trap) ---------- */
  var lastFocus = null;

  function openModal(m) {
    lastFocus = document.activeElement;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    var c = $('.modal-close', m);
    if (c) setTimeout(function() {
      c.focus();
    }, 60);
  }

  function closeModal(m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function bindModal(m, onClose) {
    var close = function() {
      closeModal(m);
      if (onClose) onClose();
    };
    $$('[data-close]', m).forEach(function(b) {
      b.addEventListener('click', close);
    });
    m.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([disabled])', m).filter(function(x) {
        return x.offsetParent !== null;
      });
      if (!f.length) return;
      var first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
    return close;
  }

  /* ---------- 4. modal produk ---------- */
  function initProductModal() {
    var m = $('#productModal');
    if (!m) return;
    var close = bindModal(m, function() {
      history.replaceState(null, '', location.pathname + location.search);
    });

    function open(id) {
      var p = G.products[id];
      if (!p) return;
      var bg = 'assets/images/backgrounds/bg-' + id + '.jpg';
      m.className = 'modal open ' + p.acc;
      var vis = $('.modal-visual', m);
      vis.style.backgroundImage = 'url(' + bg + ')';
      vis.innerHTML = '<picture><source srcset="assets/images/products/gano-ev-' + id + '.webp" type="image/webp"><img src="assets/images/products/gano-ev-' + id + '.png" alt="' + esc(p.name) + '" width="1536" height="1024"></picture>';
      $('[data-m-name]', m).textContent = p.name;
      $('[data-m-cat]', m).textContent = p.cat;
      $('[data-m-over]', m).textContent = p.overview;
      $('[data-m-design]', m).textContent = p.design;
      $('[data-m-feat]', m).innerHTML = p.features.map(function(f) {
        return '<li>' + ICON.check + '<span>' + esc(f) + '</span></li>';
      }).join('');
      var wa = $('[data-m-wa]', m);
      wa.href = waLink('Halo GANO EV Tembung, saya tertarik dengan ' + p.name + '. Bisa minta info lebih lanjut?');
      m.setAttribute('aria-labelledby', 'mTitle');
      openModal(m);
      history.replaceState(null, '', '#' + id);
    }
    $$('[data-open-product]').forEach(function(b) {
      b.addEventListener('click', function(e) {
        e.preventDefault();
        open(b.getAttribute('data-open-product'));
      });
    });

    function fromHash() {
      var id = location.hash.replace('#', '');
      if (G.products[id]) {
        if (!m.classList.contains('open')) open(id);
        var row = document.getElementById('p-' + id);
        if (row) row.scrollIntoView({
          block: 'center'
        });
      }
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------- 5. artikel reader ---------- */
  function initReader() {
    var m = $('#readerModal');
    if (!m) return;
    bindModal(m, function() {
      history.replaceState(null, '', location.pathname + location.search);
    });

    function open(id) {
      var a = G.articles[id];
      if (!a) return;
      $('.reader-img', m).innerHTML = '<img src="' + a.img + '" alt="' + esc(a.title) + '">';
      $('[data-r-meta]', m).innerHTML = '<span class="tag">' + esc(a.tag) + '</span><time datetime="' + a.date + '">' + esc(a.dateLabel) + '</time>';
      $('[data-r-title]', m).textContent = a.title;
      $('[data-r-body]', m).innerHTML = a.body.map(function(b) {
        return Array.isArray(b) ? '<h5>' + esc(b[0]) + '</h5><p>' + esc(b[1]) + '</p>' : '<p>' + esc(b) + '</p>';
      }).join('');
      openModal(m);
      history.replaceState(null, '', '#' + id);
    }
    $$('[data-open-article]').forEach(function(b) {
      b.addEventListener('click', function(e) {
        e.preventDefault();
        open(b.getAttribute('data-open-article'));
      });
    });
    var id = location.hash.replace('#', '');
    if (G.articles[id]) open(id);
  }

  /* ---------- 6. galeri ---------- */
  function initGallery() {
    var grid = $('[data-gallery]');
    if (!grid) return;
    var items = $$('.g-item', grid);
    var chips = $$('.chip');
    chips.forEach(function(c) {
      c.addEventListener('click', function() {
        var f = c.getAttribute('data-filter');
        chips.forEach(function(x) {
          x.setAttribute('aria-pressed', x === c ? 'true' : 'false');
        });
        items.forEach(function(it) {
          it.hidden = !(f === 'all' || it.getAttribute('data-cat') === f);
        });
      });
    });
    var lb = $('#lightbox'),
      img = $('img', lb),
      cap = $('figcaption', lb),
      idx = 0,
      list = [];

    function show(i) {
      idx = (i + list.length) % list.length;
      var it = list[idx],
        im = $('img', it);
      img.style.opacity = 0;
      setTimeout(function() {
        img.src = it.getAttribute('data-full') || im.src;
        img.alt = im.alt;
        cap.innerHTML = '<b>' + esc(it.getAttribute('data-title')) + '</b> &nbsp;·&nbsp; ' + (idx + 1) + ' / ' + list.length;
        img.style.opacity = 1;
      }, 120);
    }

    function open(i) {
      list = items.filter(function(x) {
        return !x.hidden;
      });
      lastFocus = document.activeElement;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lock');
      show(list.indexOf(items[i]));
      setTimeout(function() {
        $('.lb-btn.close', lb).focus();
      }, 60);
    }

    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lock');
      if (lastFocus) lastFocus.focus();
    }
    items.forEach(function(it, i) {
      it.addEventListener('click', function() {
        open(i);
      });
    });
    $('.lb-btn.close', lb).addEventListener('click', close);
    $('.lb-btn.prev', lb).addEventListener('click', function() {
      show(idx - 1);
    });
    $('.lb-btn.next', lb).addEventListener('click', function() {
      show(idx + 1);
    });
    lb.addEventListener('click', function(e) {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', function(e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
    var sx = null;
    lb.addEventListener('pointerdown', function(e) {
      sx = e.clientX;
    });
    lb.addEventListener('pointerup', function(e) {
      if (sx === null) return;
      var dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- 7. form kontak ---------- */
  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    var rules = {
      nama: function(v) {
        return v.trim().length >= 3 ? '' : 'Nama minimal 3 karakter.';
      },
      email: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Masukkan alamat email yang valid.';
      },
      hp: function(v) {
        return /^(\+62|62|0)8[0-9]{8,12}$/.test(v.replace(/[\s-]/g, '')) ? '' : 'Nomor HP tidak valid (contoh: 0812xxxxxxxx).';
      },
      subjek: function(v) {
        return v.trim().length >= 4 ? '' : 'Subjek minimal 4 karakter.';
      },
      pesan: function(v) {
        return v.trim().length >= 10 ? '' : 'Pesan minimal 10 karakter.';
      }
    };

    function check(name) {
      var el = form.elements[name],
        f = el.closest('.field'),
        msg = rules[name](el.value);
      f.classList.toggle('invalid', !!msg);
      $('.err', f).textContent = msg;
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }
    Object.keys(rules).forEach(function(n) {
      form.elements[n].addEventListener('blur', function() {
        check(n);
      });
      form.elements[n].addEventListener('input', function() {
        if (form.elements[n].closest('.field').classList.contains('invalid')) check(n);
      });
    });
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var ok = Object.keys(rules).map(check).every(Boolean);
      var note = $('.form-note', form);
      if (!ok) {
        var bad = $('.invalid input, .invalid textarea', form);
        if (bad) bad.focus();
        note.classList.remove('show');
        return;
      }
      var d = form.elements;
      var text = 'Halo GANO EV Tembung,\n\nNama: ' + d.nama.value.trim() + '\nEmail: ' + d.email.value.trim() + '\nNo. HP: ' + d.hp.value.trim() + '\nSubjek: ' + d.subjek.value.trim() + '\n\n' + d.pesan.value.trim();
      note.textContent = 'Terima kasih! Pesan kamu sudah siap — WhatsApp akan terbuka untuk mengirimkannya ke tim GANO EV Tembung.';
      note.classList.add('show');
      window.open(waLink(text), '_blank', 'noopener');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    fillContacts();
    initNav();
    initProductModal();
    initReader();
    initGallery();
    initForm();
  });
})();
