/* Content interactions: gallery filters and subtle pointer illumination. */
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grid = document.querySelector('.tiles');

  if (grid) {
    const items = [...grid.querySelectorAll('.gi')];
    const intro = document.createElement('div');
    intro.className = 'gallery-intro';
    intro.innerHTML = '<div><span class="section-kicker">DI BALIK SETIAP PERJALANAN</span><h2>Lebih dekat.<br><em>Lebih berkarakter.</em></h2></div><p>Dari showroom hingga jalanan. Jelajahi cerita pelanggan dan detail empat karakter SpeedSphere T18.</p>';
    grid.before(intro);
    items.forEach((item, index) => {
      item.style.setProperty('--photo-order', index);
      const label = document.createElement('small');
      label.className = 'gallery-number';
      label.textContent = String(index + 1).padStart(2, '0');
      label.setAttribute('aria-hidden', 'true');
      item.append(label);
      const zoom = document.createElement('i');
      zoom.className = 'gallery-zoom';
      zoom.textContent = '↗';
      zoom.setAttribute('aria-hidden', 'true');
      item.append(zoom);
    });
    const toolbar = document.createElement('div');
    toolbar.className = 'gallery-toolbar';
    toolbar.innerHTML = `<div class="gallery-filters" role="group" aria-label="Filter galeri">
      <button class="gallery-filter" type="button" data-filter="all" aria-pressed="true">Semua foto</button>
      <button class="gallery-filter" type="button" data-filter="store" aria-pressed="false">Showroom & pelanggan</button>
      <button class="gallery-filter" type="button" data-filter="products" aria-pressed="false">Koleksi T18</button>
    </div><span class="gallery-count" role="status"></span>`;
    grid.before(toolbar);
    const count = toolbar.querySelector('.gallery-count');
    count.textContent = `${items.length} foto`;
    toolbar.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const previous = new Map(items.filter(item => !item.hidden).map(item => [item, item.getBoundingClientRect()]));
      toolbar.querySelectorAll('[data-filter]').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      let visible = 0;
      items.forEach(item => {
        item.hidden = button.dataset.filter !== 'all' && !item.dataset.src.includes(`/${button.dataset.filter}/`);
        if (!item.hidden) {
          item.classList.add('in');
          item.getAnimations().forEach(animation => animation.cancel());
          const before = previous.get(item);
          const after = item.getBoundingClientRect();
          if (!reducedMotion) item.animate([{
            opacity: before ? .7 : 0,
            transform: before ? `translate(${before.left - after.left}px, ${before.top - after.top}px) scale(.98)` : 'translateY(24px) scale(.96)'
          }, {
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          }, ], {
            duration: 560,
            delay: visible * 35,
            fill: 'backwards',
            easing: 'cubic-bezier(.22,1,.36,1)'
          });
          visible++;
        }
      });
      count.textContent = `${visible} foto`;
    });
  }

  document.querySelectorAll('.sh').forEach((heading, index) => {
    const title = heading.querySelector('h2');
    if (!title) return;
    const kicker = document.createElement('span');
    kicker.className = 'section-kicker';
    kicker.textContent = `${String(index + 1).padStart(2, '0')} / GANO EV TEMBUNG`;
    const group = document.createElement('div');
    title.before(group);
    group.append(kicker, title);
  });

  if (reducedMotion || !matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('.keu > div, .steps li, .panel').forEach(card => {
    card.classList.add('section-glow');
    let frame;
    card.addEventListener('pointermove', event => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      });
    });
  });
})();
