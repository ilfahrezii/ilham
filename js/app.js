(() => {
  const WA = '6282246020229',
    EM = 'ganoevtembung@gmail.com';
  const PR = {
    black: {
      n: 'SPEEDSPHERE T18 BLACK',
      p: 6150000,
      c: 'Minimalis · Sporty',
      d: 'Sepeda motor listrik serba hitam dengan aksen oranye. Tampilan bersih, cocok untuk harian.'
    },
    street: {
      n: 'SPEEDSPHERE T18 STREET EDITION',
      p: 6350000,
      c: 'Hitam · Silver Graphic',
      d: 'Bodi hitam dengan grafis silver yang ekspresif. Terlihat beda di jalan.'
    },
    silver: {
      n: 'SPEEDSPHERE T18 SILVER CLASSIC',
      p: 6450000,
      c: 'Retro · Modern',
      d: 'Bodi silver dengan jok coklat. Gaya klasik, tenaga listrik.'
    },
    graffiti: {
      n: 'SPEEDSPHERE T18 GRAFFITI EDITION',
      p: 6550000,
      c: 'Hijau · Graffiti',
      d: 'Hijau-hitam dengan grafis graffiti yang berani. Untuk yang suka tampil mencolok.'
    }
  };
  const KEYS = Object.keys(PR),
    $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rp = n => 'Rp ' + n.toLocaleString('id-ID'),
    img = k => `assets/images/products/gano-ev-${k}.webp`;
  const store = window.GanoOrderStore;
  let cart = store.loadCart();
  const save = () => {
    if (!store.saveCart(cart)) toast('Penyimpanan browser tidak tersedia. Pesanan hanya bertahan di halaman ini.');
  };
  const fields = ['o-nama', 'o-ambil', 'o-cat'];

  function restoreDraft() {
    const draft = store.loadDraft();
    fields.forEach(id => {
      const field = document.getElementById(id);
      if (field && typeof draft[id] === 'string') field.value = draft[id];
    });
  }
  restoreDraft();
  fields.forEach(id => document.getElementById(id)?.addEventListener('input', () => {
    store.saveDraft(Object.fromEntries(fields.map(key => [key, document.getElementById(key)?.value || ''])));
  }));

  function refreshOrder() {
    cart = store.loadCart();
    render();
    restoreDraft();
  }
  addEventListener('pageshow', refreshOrder);
  addEventListener('storage', event => {
    if (!event.key || [store.cartKey, store.draftKey].includes(event.key)) refreshOrder();
  });
  const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
  $$('[data-wa]').forEach(a => a.href = wa('Halo GANO EV Tembung, saya mau tanya info sepeda motor listrik SpeedSphere T18.'));

  function toast(t) {
    let e = $('.toast');
    if (!e) {
      e = document.createElement('div');
      e.className = 'toast';
      e.setAttribute('role', 'status');
      document.body.append(e)
    }
    e.textContent = t;
    e.classList.add('on');
    clearTimeout(e._t);
    e._t = setTimeout(() => e.classList.remove('on'), 2200)
  }

  function render() {
    const ks = Object.keys(cart).filter(k => PR[k] && cart[k] > 0),
      tot = ks.reduce((a, k) => a + PR[k].p * cart[k], 0),
      cnt = ks.reduce((a, k) => a + cart[k], 0);
    $$('[data-cart-count]').forEach(e => {
      e.textContent = cnt;
      e.classList.toggle('has', cnt > 0)
    });
    const list = $('[data-cart-list]');
    if (!list) return;
    $('[data-cart-send]').disabled = !cnt;
    $$('.cart-btn').forEach(button => button.setAttribute('aria-label', `Buka pesanan, ${cnt} unit`));
    list.innerHTML = ks.length ? ks.map(k => `<div class="ci"><img src="${img(k)}" alt="" width="70" height="46"><div><b>${PR[k].n}</b><small>${rp(PR[k].p)}</small><div class="q"><button data-q="${k}" data-d="-1" aria-label="Kurangi">−</button><span>${cart[k]}</span><button data-q="${k}" data-d="1" aria-label="Tambah">+</button></div></div><button data-rm="${k}" aria-label="Hapus">✕</button></div>`).join('') + `<div class="tot"><span>Perkiraan total</span><span>${rp(tot)}</span></div>` : '<div class="order-empty"><span aria-hidden="true">＋</span><h3>Mulai perjalananmu.</h3><p>Temukan T18 favoritmu dan tambahkan ke pesanan.</p><a class="btn btn-y" href="produk.html">Jelajahi koleksi</a></div>';
  }

  function add(k) {
    if (!PR[k]) return;
    cart = store.loadCart();
    cart[k] = Math.min(99, (cart[k] || 0) + 1);
    save();
    render();
    toast(PR[k].n + ' ditambahkan');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $$('.cart-btn').forEach(b => {
      b.animate([{
        transform: 'scale(1)'
      }, {
        transform: 'scale(1.15)'
      }, {
        transform: 'scale(1)'
      }], 300)
    })
  }
  let previousFocus = null;
  $$('.drawer,.modal,.lb').forEach(element => {
    element.inert = true;
  });
  const open = (element, visible) => {
    if (!element) return;
    if (visible) {
      $$('.drawer.open,.modal.open,.lb.open').forEach(other => {
        if (other !== element) open(other, false);
      });
      previousFocus = document.activeElement;
    } else if (element.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    element.inert = !visible;
    element.classList.toggle('open', visible);
    element.setAttribute('aria-hidden', String(!visible));
    document.body.style.overflow = $('.drawer.open,.modal.open,.lb.open') ? 'hidden' : '';
    if (visible) element.querySelector('button')?.focus();
    else previousFocus?.focus();
  };
  document.addEventListener('keydown', event => {
    const dialog = $('.drawer.open,.modal.open,.lb.open');
    if (!dialog || event.key !== 'Tab') return;
    const focusable = $$('button:not(:disabled),a[href],input,select,textarea', dialog).filter(item => item.getClientRects().length);
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  document.addEventListener('click', e => {
    if (e.target.id === 'lb') {
      open($('#lb'), false);
      return;
    }
    const t = e.target.closest('button,a,[data-close],[data-cart-close]');
    if (!t) return;
    if (t.matches('[data-add]')) add(t.dataset.add);
    else if (t.matches('[data-add-current]')) add(KEYS[+($('.hero')?.dataset.v || 0)]);
    else if (t.matches('[data-cart-open]')) {
      refreshOrder();
      open($('#drawer'), true);
    } else if (t.matches('[data-cart-close]')) open($('#drawer'), false);
    else if (t.matches('[data-close]')) open($('#pmodal'), false);
    else if (t.matches('[data-detail],[data-detail-cur]')) {
      const k = t.dataset.detail || KEYS[+($('.hero')?.dataset.v || 0)],
        m = $('#pmodal');
      m.dataset.k = k;
      $('.m-img img', m).src = img(k);
      $('.m-img img', m).alt = PR[k].n;
      $('[data-m-cat]', m).textContent = PR[k].c;
      $('[data-m-name]', m).textContent = PR[k].n;
      $('[data-m-desc]', m).textContent = PR[k].d + ' Mulai dari ' + rp(PR[k].p) + '.';
      open(m, true)
    } else if (t.matches('[data-m-add]')) {
      add($('#pmodal').dataset.k);
      open($('#pmodal'), false)
    } else if (t.matches('[data-q]')) {
      const k = t.dataset.q;
      cart = store.loadCart();
      if (!PR[k]) return;
      cart[k] = Math.min(99, Math.max(0, (cart[k] || 0) + +t.dataset.d));
      if (!cart[k]) delete cart[k];
      save();
      render()
    } else if (t.matches('[data-rm]')) {
      cart = store.loadCart();
      delete cart[t.dataset.rm];
      save();
      render()
    } else if (t.matches('[data-cart-send]')) {
      cart = store.loadCart();
      const ks = Object.keys(cart).filter(k => PR[k] && cart[k] > 0);
      if (!ks.length) return toast('Pilih sepeda dulu');
      const n = $('#o-nama').value.trim() || '-',
        tot = ks.reduce((a, k) => a + PR[k].p * cart[k], 0);
      window.open(wa(`Halo GANO EV Tembung, saya mau pesan:\n${ks.map(k=>`• ${PR[k].n} x${cart[k]} (${rp(PR[k].p)})`).join('\n')}\nPerkiraan total: ${rp(tot)}\n\nNama: ${n}\nPengambilan: ${$('#o-ambil').value}\nCatatan: ${$('#o-cat').value.trim()||'-'}`), '_blank', 'noopener')
    } else if (t.matches('[data-read]')) {
      const f = t.closest('.pc-b').querySelector('.art-full');
      f.hidden = !f.hidden;
      t.firstChild.textContent = f.hidden ? 'Baca selengkapnya ' : 'Tutup '
    } else if (t.matches('[data-mail]')) {
      const f = $('#cf');
      location.href = `mailto:${EM}?subject=${encodeURIComponent('Tanya sepeda motor listrik')}&body=${encodeURIComponent((f.n.value||'')+'\n\n'+(f.p.value||''))}`
    } else if (t.matches('.gi')) {
      const l = $('#lb');
      $('img', l).src = t.dataset.src;
      $('img', l).alt = t.dataset.cap;
      $('figcaption', l).textContent = t.dataset.cap;
      open(l, true)
    } else if (t.closest('.lb-x') || e.target.id === 'lb') open($('#lb'), false);
    else if (t.matches('.burger')) {
      const o = t.getAttribute('aria-expanded') !== 'true';
      t.setAttribute('aria-expanded', o);
      $('.links').classList.toggle('open', o)
    } else if (t.closest('.links a')) {
      $('.links').classList.remove('open');
      $('.burger').setAttribute('aria-expanded', 'false');
    }
  });
  $('#cf')?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    window.open(wa(`Halo GANO EV Tembung, saya ${f.n.value}.\n${f.p.value}`), '_blank', 'noopener')
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.drawer.open,.modal.open,.lb.open').forEach(x => open(x, false));
      $('.links')?.classList.remove('open');
      $('.burger')?.setAttribute('aria-expanded', 'false');
    }
  });
  $('.vid-b video')?.addEventListener('error', e => {
    e.target.hidden = true;
    $('.vid-fb').hidden = false
  });
  const nv = $('[data-nav]');
  const sc = () => nv.classList.toggle('stuck', scrollY > 30);
  sc();
  addEventListener('scroll', sc, {
    passive: true
  });
  let hd;
  const keep = () => nv.matches(':hover') || $('.links.open') || $('.open') || nv.contains(document.activeElement) && document.activeElement.matches('input,textarea,select');
  const arm = () => {
    clearTimeout(hd);
    hd = setTimeout(() => keep() ? arm() : nv.classList.add('away'), 2600)
  };
  const wake = () => {
    nv.classList.remove('away');
    arm()
  };
  ['scroll', 'mousemove', 'touchstart', 'touchmove', 'keydown', 'pointerdown', 'wheel'].forEach(ev => addEventListener(ev, wake, {
    passive: true
  }));
  wake();
  window.GANO = {
    keys: KEYS
  };
  render();
})();
