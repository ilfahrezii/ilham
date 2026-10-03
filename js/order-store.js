/* Shared order state. Keep this file before app.js on every page. */
(() => {
  'use strict';

  const CART_KEY = 'gano-cart';
  const DRAFT_KEY = 'gano-order-draft';
  const PRODUCTS = ['black', 'street', 'silver', 'graffiti'];
  const fileScope = `gano-order:${location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1)}:`;
  let memory = {};

  function clean(value) {
    const result = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
    PRODUCTS.forEach(key => {
      const quantity = Number(value[key]);
      if (Number.isSafeInteger(quantity) && quantity > 0) result[key] = Math.min(quantity, 99);
    });
    return result;
  }

  function read(key) {
    for (const storage of ['localStorage', 'sessionStorage']) {
      try {
        const value = window[storage].getItem(key);
        if (value !== null) return JSON.parse(value);
      } catch {
        /* Storage may be unavailable in private or local-file contexts. */ }
    }
    return null;
  }

  function write(key, value) {
    let saved = false;
    for (const storage of ['localStorage', 'sessionStorage']) {
      try {
        window[storage].setItem(key, JSON.stringify(value));
        saved = true;
      } catch {
        /* The other storage can still preserve this session. */ }
    }
    return saved;
  }

  function loadCart() {
    // file:// storage can be isolated per HTML file. Carry only product quantities
    // within this tab, scoped to this folder; never put personal details in URLs.
    if (location.protocol === 'file:' && window.name.startsWith(fileScope)) {
      try {
        return clean(JSON.parse(window.name.slice(fileScope.length)));
      } catch {
        /* Recover below. */ }
    }
    return clean(read(CART_KEY) ?? memory);
  }

  function saveCart(value) {
    memory = clean(value);
    const saved = write(CART_KEY, memory);
    if (location.protocol === 'file:') window.name = fileScope + JSON.stringify(memory);
    return saved || location.protocol === 'file:';
  }

  window.GanoOrderStore = {
    loadCart,
    saveCart,
    loadDraft: () => read(DRAFT_KEY) || {},
    saveDraft: value => write(DRAFT_KEY, value),
    cartKey: CART_KEY,
    draftKey: DRAFT_KEY,
  };
})();
