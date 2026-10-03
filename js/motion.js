/* Shared motion layer. All content remains usable without animations. */
(() => {
  'use strict';

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const animate = (element, frames, options = {}) => {
    if (!element || preference.matches) return;
    return element.animate(frames, {
      duration: 600,
      easing: 'cubic-bezier(.22,1,.36,1)',
      ...options,
    });
  };

  // A soft light follows the pointer; transforms stay separate from scroll reveal.
  document.querySelectorAll('.gi, .pc, .panel, .vm > div, .on-node, .cta').forEach(card => {
    let frame;
    card.addEventListener('pointermove', event => {
      if (preference.matches || !finePointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        card.style.setProperty('--light-x', `${x * 100}%`);
        card.style.setProperty('--light-y', `${y * 100}%`);
        card.style.setProperty('--image-x', `${(x - .5) * 10}px`);
        card.style.setProperty('--image-y', `${(y - .5) * 8}px`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      card.style.setProperty('--image-x', '0px');
      card.style.setProperty('--image-y', '0px');
    });
  });

  // Brief press feedback, including keyboard activation; no navigation delays.
  document.addEventListener('click', event => {
    const button = event.target.closest('main .btn, .gallery-filter, .q button');
    if (!button || button.disabled || button.closest('.hero')) return;
    animate(button, [
      { scale: '1' },
      { scale: '.96', offset: .3 },
      { scale: '1' },
    ], { duration: 320 });
  });

  // Let photos browse as a sequence, limited to the active gallery filter.
  const lightbox = document.querySelector('#lb');
  if (lightbox) {
    const photo = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    const controls = document.createElement('div');
    controls.className = 'lb-controls';
    controls.innerHTML = '<button type="button" data-photo-step="-1" aria-label="Foto sebelumnya">←</button><span class="lb-position" aria-live="polite"></span><button type="button" data-photo-step="1" aria-label="Foto berikutnya">→</button>';
    lightbox.append(controls);
    const visiblePhotos = () => [...document.querySelectorAll('.gi:not([hidden])')];
    let current = 0;

    function show(index, direction = 1) {
      const photos = visiblePhotos();
      if (!photos.length) return;
      current = (index + photos.length) % photos.length;
      const item = photos[current];
      photo.src = item.dataset.src;
      photo.alt = item.dataset.cap;
      caption.textContent = item.dataset.cap;
      controls.querySelector('.lb-position').textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
      photo.getAnimations().forEach(animation => animation.cancel());
      animate(photo, [
        { opacity: 0, transform: `translateX(${direction * 28}px) scale(.97)` },
        { opacity: 1, transform: 'translateX(0) scale(1)' },
      ], { duration: 450 });
    }

    document.addEventListener('click', event => {
      const item = event.target.closest('.gi');
      if (item) show(visiblePhotos().indexOf(item));
      const step = event.target.closest('[data-photo-step]');
      if (step) show(current + Number(step.dataset.photoStep), Number(step.dataset.photoStep));
    });
    document.addEventListener('keydown', event => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        show(current + direction, direction);
      }
    });
    let touchX;
    photo.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, { passive: true });
    photo.addEventListener('touchend', event => {
      if (touchX === undefined) return;
      const delta = event.changedTouches[0].clientX - touchX;
      touchX = undefined;
      if (Math.abs(delta) > 55) show(current + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    }, { passive: true });
  }

  // Entrance effects for content not covered by the original reveal observer.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      animate(target, [
        { opacity: 0, translate: '0 24px' },
        { opacity: 1, translate: '0 0' },
      ], { duration: 800 });
      observer.unobserve(target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.gallery-intro, .gallery-toolbar, .info li, .fgrid > div').forEach(item => observer.observe(item));

  // Ambient motion only runs while the callout is on screen.
  const ambient = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-visible', entry.isIntersecting));
  });
  document.querySelectorAll('.cta').forEach(item => ambient.observe(item));
  preference.addEventListener('change', () => {
    if (preference.matches) document.getAnimations().forEach(animation => animation.cancel());
  });
})();
