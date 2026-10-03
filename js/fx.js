(() => {
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches,
    fine = matchMedia('(pointer:fine)').matches;
  // scroll progress + cursor glow
  const bar = document.createElement('div');
  bar.id = 'prog';
  document.body.append(bar);
  addEventListener('scroll', () => {
    bar.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%'
  }, {
    passive: true
  });
  if (fine && !rm) {
    const g = document.createElement('div');
    g.id = 'glow';
    document.body.append(g);
    addEventListener('pointermove', e => {
      g.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
    })
  }
  // hero slider
  const hero = $('.hero'),
    TH = ['fire', 'wind', 'earth', 'leaf'];
  let th = 'fire',
    ps = [];
  if (hero) {
    const S = a => $$(a, hero),
      n = S('.slide').length;
    let i = 0,
      tm;
    const go = k => {
      i = (k + n) % n;
      hero.dataset.v = i;
      hero.dataset.th = TH[i];
      th = TH[i];
      ps.length = 0;
      ['.bgl i', '.ht', '.slide', '.th'].forEach(s => S(s).forEach(e => e.classList.toggle('on', +e.dataset.s === i)));
      $('[data-count]').textContent = '0' + (i + 1);
      S('.th').forEach(t => {
        t.classList.remove('on');
        void t.offsetWidth;
        t.classList.toggle('on', +t.dataset.s === i)
      });
      {
        const t = S('.th')[i],
          p = t.parentElement;
        p.scrollTo({
          left: t.offsetLeft - p.offsetLeft - 12,
          behavior: 'smooth'
        })
      }
      auto()
    };
    const auto = () => {
      clearTimeout(tm);
      if (!rm) tm = setTimeout(() => go(i + 1), 6000)
    };
    S('[data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
    $('[data-prev]', hero).onclick = () => go(i - 1);
    $('[data-next]', hero).onclick = () => go(i + 1);
    auto();
    const v = $('.slides', hero);
    if (fine && !rm) hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - .5,
        y = (e.clientY - r.top) / r.height - .5;
      v.style.setProperty('--ry', x * 9 + 'deg');
      v.style.setProperty('--rx', -y * 6 + 'deg');
      $$('.bgl i', hero).forEach(b => b.style.transform = `scale(1.08) translate(${-x*24}px,${-y*16}px)`)
    });
    hero.addEventListener('pointerleave', () => {
      v.style.setProperty('--ry', '0deg');
      v.style.setProperty('--rx', '0deg')
    });
    let sx;
    hero.addEventListener('touchstart', e => sx = e.touches[0].clientX, {
      passive: true
    });
    hero.addEventListener('touchend', e => {
      const d = e.changedTouches[0].clientX - sx;
      if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1))
    });
  }
  // 3D tilt cards
  if (fine && !rm) $$('[data-tilt]').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--ry', (x - .5) * 14 + 'deg');
      c.style.setProperty('--rx', (.5 - y) * 14 + 'deg');
      c.style.setProperty('--mx', x * 100 + '%');
      c.style.setProperty('--my', y * 100 + '%')
    });
    c.addEventListener('pointerleave', () => {
      c.style.setProperty('--ry', '0deg');
      c.style.setProperty('--rx', '0deg')
    });
  });
  // showroom stack
  $$('[data-stack]').forEach(s => {
    let cs = $$('.sc', s);
    const set = () => cs.forEach((c, k) => c.className = 'sc p' + k);
    set();
    cs.forEach(c => c.addEventListener('click', () => {
      const k = cs.indexOf(c);
      if (k === 0) {
        cs.push(cs.shift())
      } else {
        cs = [c, ...cs.filter(x => x !== c)]
      }
      set()
    }));
    if (fine && !rm) s.addEventListener('pointermove', e => {
      const r = s.getBoundingClientRect();
      s.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 12 + 'deg');
      s.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 8 + 'deg')
    });
    s.addEventListener('pointerleave', () => {
      s.style.setProperty('--ry', '0deg');
      s.style.setProperty('--rx', '0deg')
    });
  });
  // reveal + counters
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
    $$('[data-n]', e.target).forEach(b => {
      const t = +b.dataset.n,
        s = performance.now(),
        f = now => {
          const p = Math.min((now - s) / 1400, 1);
          b.textContent = Math.round(t * (1 - Math.pow(1 - p, 3)));
          p < 1 && requestAnimationFrame(f)
        };
      rm ? b.textContent = t : requestAnimationFrame(f)
    })
  }), {
    threshold: 0.01
  });
  if (!rm) $$('.sh,.prof-s,.prof-t,.sr-card,.sr-img,.cta,.pc,.keu>div,.steps li,.tl li,.on-node,.gi,.vm>div,.show-t,.stack,.panel,.vid-t,.vid-b,.phero .wrap').forEach((e) => {
    e.classList.add('rv');
    const siblings = [...e.parentElement.children];
    e.style.setProperty('--d', (siblings.indexOf(e) % 4) * .085 + 's');
    io.observe(e)
  });
  else $$('[data-n]').forEach(b => b.textContent = b.dataset.n);
  // magnetic buttons
  if (fine && !rm) $$('.btn-y').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.translate = ((e.clientX - r.left - r.width / 2) * .18) + 'px ' + ((e.clientY - r.top - r.height / 2) * .25) + 'px'
    });
    b.addEventListener('pointerleave', () => b.style.translate = '')
  });
  // efek per varian: api, angin, danau, daun
  if (hero && !rm) {
    const cv = $('.fxc', hero),
      c = cv.getContext('2d');
    let W = 0,
      H = 0,
      run = false,
      SX = 0,
      SW = 0,
      SH = 0,
      GY = 0;
    const R = (a, b) => a + Math.random() * (b - a),
      k = innerWidth < 700 ? .55 : 1;
    const rs = () => {
      const d = Math.min(devicePixelRatio || 1, 2),
        r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * d;
      cv.height = H * d;
      c.setTransform(d, 0, 0, d, 0, 0);
      const sr = $('.slides', hero).getBoundingClientRect();
      SX = sr.left - r.left;
      SW = sr.width;
      SH = sr.height;
      GY = sr.top - r.top + SH * .86
    };
    rs();
    addEventListener('resize', rs);
    addEventListener('load', rs);
    const rate = {
      fire: .8,
      wind: .07,
      earth: .55,
      leaf: .06
    };
    const sp = () => {
      if (th === 'fire') ps.push({
        t: 'f',
        x: SX + R(.2, .85) * SW,
        y: GY - R(0, .3) * SH,
        vx: R(-.3, .3),
        vy: R(-1.8, -.6),
        r: R(1, 3.2),
        l: 0,
        m: R(60, 130)
      });
      else if (th === 'wind') ps.push({
        t: 'w',
        x: -160,
        y: R(.12, .85) * H,
        vx: R(7, 13),
        len: R(70, 170),
        l: 0,
        m: 150,
        ph: R(0, 6)
      });
      else if (th === 'earth') {
        const rear = Math.random() < .7,
          bx = SX + SW * (rear ? .78 : .27);
        if (Math.random() < .35) ps.push({
          t: 'c',
          x: bx,
          y: GY - 4,
          vx: rear ? R(.8, 3) : R(-2.5, -.6),
          vy: R(-3.2, -1.2),
          r: R(1.5, 3.5),
          l: 0,
          m: 90
        });
        else ps.push({
          t: 'd',
          x: bx + R(-20, 20),
          y: GY - R(2, 16),
          vx: rear ? R(.3, 1.1) : R(-.9, -.2),
          vy: R(-.5, -.15),
          r: R(6, 14),
          l: 0,
          m: R(70, 120)
        })
      } else ps.push({
        t: 'l',
        x: R(-.1, .9) * W,
        y: -12,
        vx: R(.5, 1.5),
        vy: R(.7, 1.5),
        s: R(5, 10),
        a: R(0, 6),
        va: R(-.05, .05),
        l: 0,
        m: 1e4
      })
    };
    const tick = () => {
      if (!run) return;
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = th === 'earth' ? 'source-over' : 'lighter';
      if (th === 'earth') {
        c.save();
        c.translate(SX + SW * .5, GY + 4);
        c.scale(1, .14);
        const g = c.createRadialGradient(0, 0, 4, 0, 0, SW * .46);
        g.addColorStop(0, 'rgba(70,45,25,.65)');
        g.addColorStop(1, 'rgba(70,45,25,0)');
        c.fillStyle = g;
        c.fillRect(-SW, -SW, 2 * SW, 2 * SW);
        c.restore()
      }
      if (ps.length < 150 * k && Math.random() < rate[th] * k) sp();
      if (th === 'fire' && Math.random() < .5 * k) sp();
      ps = ps.filter(p => {
        p.l++;
        if (p.t === 'f') {
          p.x += p.vx + Math.sin(p.l / 12) * .4;
          p.y += p.vy;
          const a = 1 - p.l / p.m;
          c.fillStyle = `rgba(255,${120+a*100|0},30,${a})`;
          c.shadowColor = '#ff7a00';
          c.shadowBlur = 10;
          c.beginPath();
          c.arc(p.x, p.y, p.r * a + .4, 0, 7);
          c.fill();
          c.shadowBlur = 0
        } else if (p.t === 'w') {
          p.x += p.vx;
          const a = Math.sin(p.l / p.m * Math.PI) * .35,
            y = p.y + Math.sin(p.x / 50 + p.ph) * 8;
          c.strokeStyle = `rgba(210,230,255,${a})`;
          c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(p.x - p.len, y);
          c.lineTo(p.x, y);
          c.stroke()
        } else if (p.t === 'd') {
          p.x += p.vx;
          p.y += p.vy;
          p.r += .35;
          c.fillStyle = `rgba(196,160,112,${(1-p.l/p.m)*.28})`;
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, 7);
          c.fill()
        } else if (p.t === 'c') {
          p.vy += .14;
          p.x += p.vx;
          p.y += p.vy;
          c.fillStyle = 'rgba(88,58,34,.95)';
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, 7);
          c.fill();
          if (p.y > GY) p.l = p.m
        } else {
          p.x += p.vx + Math.sin(p.l / 30) * .6;
          p.y += p.vy;
          p.a += p.va;
          c.save();
          c.translate(p.x, p.y);
          c.rotate(p.a);
          c.fillStyle = p.s > 7.5 ? 'rgba(95,208,104,.85)' : 'rgba(55,150,70,.85)';
          c.beginPath();
          c.ellipse(0, 0, p.s, p.s * .45, 0, 0, 7);
          c.fill();
          c.restore()
        }
        return p.l < p.m && p.y < H + 20 && p.x < W + 30
      });
      c.globalCompositeOperation = 'source-over';
      requestAnimationFrame(tick)
    };
    new IntersectionObserver(e => {
      const v = e[0].isIntersecting;
      if (v && !run) {
        run = true;
        tick()
      } else run = v
    }, {
      threshold: .1
    }).observe(hero);
  }
  // efek banner halaman dalam: api, angin, tanah, akar
  (() => {
    const ph = $('.phero');
    if (!ph || rm) return;
    const pg = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    const TM = {
      produk: ['fire', 'wind'],
      galeri: ['wind', 'earth'],
      tentang: ['earth', 'root'],
      artikel: ['fire', 'wind'],
      kontak: ['root', 'leaf']
    } [pg] || ['wind'];
    const cv = document.createElement('canvas');
    cv.className = 'pfx';
    cv.setAttribute('aria-hidden', 'true');
    ph.prepend(cv);
    const c = cv.getContext('2d');
    let W = 0,
      H = 0,
      ps = [],
      rt = [],
      run = false;
    const R = (a, b) => a + Math.random() * (b - a),
      k = innerWidth < 700 ? .5 : 1;
    const rs = () => {
      const d = Math.min(devicePixelRatio || 1, 2),
        r = ph.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * d;
      cv.height = H * d;
      c.setTransform(d, 0, 0, d, 0, 0)
    };
    rs();
    addEventListener('resize', rs);
    const rate = {
        fire: .7,
        wind: .07,
        earth: .4,
        leaf: .07
      },
      GY = () => H * .9;
    const sp = {
      fire: () => ps.push({
        t: 'f',
        x: R(0, W),
        y: GY(),
        vx: R(-.3, .3),
        vy: R(-1.6, -.5),
        r: R(1, 3),
        l: 0,
        m: R(70, 140)
      }),
      wind: () => ps.push({
        t: 'w',
        x: -160,
        y: R(.1, .85) * H,
        vx: R(7, 13),
        len: R(70, 170),
        l: 0,
        m: 160,
        ph: R(0, 6)
      }),
      earth: () => {
        if (Math.random() < .3) ps.push({
          t: 'c',
          x: R(0, W),
          y: GY(),
          vx: R(.8, 3),
          vy: R(-3, -1.2),
          r: R(1.5, 3),
          l: 0,
          m: 90
        });
        else ps.push({
          t: 'd',
          x: R(0, W),
          y: GY() - R(0, 10),
          vx: R(.4, 1.2),
          vy: R(-.4, -.1),
          r: R(6, 14),
          l: 0,
          m: R(80, 130)
        })
      },
      leaf: () => ps.push({
        t: 'l',
        x: R(-.1, .9) * W,
        y: -10,
        vx: R(.5, 1.5),
        vy: R(.6, 1.4),
        s: R(5, 10),
        a: R(0, 6),
        va: R(-.05, .05),
        l: 0,
        m: 1e4
      })
    };
    const grow = () => {
      if (rt.length < 5 * k && Math.random() < .04) rt.push({
        a: -Math.PI / 2 + R(-.5, .5),
        pts: [
          [R(0, W), H + 4]
        ],
        max: R(40, 75),
        h: 0,
        col: Math.random() < .35 ? '138,90,43' : '63,163,77'
      });
      rt = rt.filter(r => {
        const n = r.pts.length;
        if (n < r.max) {
          const p = r.pts[n - 1];
          r.a += R(-.13, .13);
          r.pts.push([p[0] + Math.cos(r.a) * 3.4, p[1] + Math.sin(r.a) * 3.4])
        } else r.h++;
        const al = r.h > 110 ? Math.max(0, 1 - (r.h - 110) / 80) : 1;
        c.strokeStyle = `rgba(${r.col},${al*.9})`;
        c.lineCap = 'round';
        for (let i = 1; i < r.pts.length; i++) {
          c.lineWidth = 3.2 * (1 - i / r.max) + .7;
          c.beginPath();
          c.moveTo(...r.pts[i - 1]);
          c.lineTo(...r.pts[i]);
          c.stroke();
          if (i % 10 === 0) {
            c.fillStyle = `rgba(111,220,120,${al*.85})`;
            c.beginPath();
            c.ellipse(r.pts[i][0] + (i % 20 ? 6 : -6), r.pts[i][1], 7, 3, i % 20 ? -.6 : .6, 0, 7);
            c.fill()
          }
        }
        return r.h < 190
      })
    };
    const tick = () => {
      if (!run) return;
      c.clearRect(0, 0, W, H);
      if (TM.includes('fire')) {
        const g = c.createRadialGradient(W / 2, H, 5, W / 2, H, W * .5);
        g.addColorStop(0, `rgba(255,100,20,${.22+.08*Math.sin(Date.now()/100)})`);
        g.addColorStop(1, 'rgba(255,60,0,0)');
        c.fillStyle = g;
        c.fillRect(0, H * .4, W, H * .6)
      }
      if (TM.includes('earth')) {
        const g = c.createLinearGradient(0, H * .7, 0, H);
        g.addColorStop(0, 'rgba(70,45,25,0)');
        g.addColorStop(1, 'rgba(70,45,25,.55)');
        c.fillStyle = g;
        c.fillRect(0, H * .7, W, H * .3)
      }
      TM.forEach(t => {
        if (t !== 'root' && ps.length < 130 * k && Math.random() < rate[t] * k) sp[t]();
        if (t === 'fire' && Math.random() < .4 * k) sp.fire()
      });
      if (TM.includes('root')) grow();
      ps = ps.filter(p => {
        p.l++;
        c.globalCompositeOperation = (p.t === 'd' || p.t === 'c') ? 'source-over' : 'lighter';
        if (p.t === 'f') {
          p.x += p.vx + Math.sin(p.l / 12) * .4;
          p.y += p.vy;
          const a = 1 - p.l / p.m;
          c.fillStyle = `rgba(255,${120+a*100|0},30,${a})`;
          c.shadowColor = '#ff7a00';
          c.shadowBlur = 10;
          c.beginPath();
          c.arc(p.x, p.y, p.r * a + .4, 0, 7);
          c.fill();
          c.shadowBlur = 0
        } else if (p.t === 'w') {
          p.x += p.vx;
          const a = Math.sin(p.l / p.m * Math.PI) * .35,
            y = p.y + Math.sin(p.x / 50 + p.ph) * 8;
          c.strokeStyle = `rgba(210,230,255,${a})`;
          c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(p.x - p.len, y);
          c.lineTo(p.x, y);
          c.stroke()
        } else if (p.t === 'd') {
          p.x += p.vx;
          p.y += p.vy;
          p.r += .3;
          c.fillStyle = `rgba(196,160,112,${(1-p.l/p.m)*.26})`;
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, 7);
          c.fill()
        } else if (p.t === 'c') {
          p.vy += .14;
          p.x += p.vx;
          p.y += p.vy;
          c.fillStyle = 'rgba(88,58,34,.95)';
          c.beginPath();
          c.arc(p.x, p.y, p.r, 0, 7);
          c.fill();
          if (p.y > GY()) p.l = p.m
        } else {
          p.x += p.vx + Math.sin(p.l / 30) * .6;
          p.y += p.vy;
          p.a += p.va;
          c.save();
          c.translate(p.x, p.y);
          c.rotate(p.a);
          c.fillStyle = p.s > 7.5 ? 'rgba(95,208,104,.85)' : 'rgba(55,150,70,.85)';
          c.beginPath();
          c.ellipse(0, 0, p.s, p.s * .45, 0, 0, 7);
          c.fill();
          c.restore()
        }
        return p.l < p.m && p.y < H + 20 && p.x < W + 30
      });
      c.globalCompositeOperation = 'source-over';
      requestAnimationFrame(tick)
    };
    new IntersectionObserver(e => {
      const v = e[0].isIntersecting;
      if (v && !run) {
        run = true;
        tick()
      } else run = v
    }, {
      threshold: .05
    }).observe(ph);
  })();
})();
