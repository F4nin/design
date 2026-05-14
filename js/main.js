/* ============================================
   ЦВЕТИ — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ── NAV ──────────────────────────────── */
  const nav = document.getElementById('mainNav');

  function updateNav() {
    if (!nav) return;
    const solid = nav.classList.contains('nav--solid');
    if (window.scrollY > 60) {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
    } else if (!solid) {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
    }
  }

  if (nav) {
    if (nav.classList.contains('nav--transparent')) {
      window.addEventListener('scroll', updateNav, { passive: true });
    }
    updateNav();
  }

  /* ── MOBILE NAV ──────────────────────── */
  const hamburger     = document.getElementById('hamburger');
  const mobileNav     = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav()  { mobileNav && mobileNav.classList.add('mobile-nav--open'); document.body.style.overflow = 'hidden'; }
  function closeMobileNav() { mobileNav && mobileNav.classList.remove('mobile-nav--open'); document.body.style.overflow = ''; }

  hamburger     && hamburger.addEventListener('click', openMobileNav);
  mobileNavClose && mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNav && mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) closeMobileNav();
  });

  /* ── HERO PARALLAX ───────────────────── */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      heroBg.style.transform = 'translateY(' + (y * 0.35) + 'px) scale(1.05)';
    }, { passive: true });
  }

  /* ── SCROLL ANIMATIONS ───────────────── */
  function initScrollAnim() {
    const els = document.querySelectorAll('.anim-up, .anim-fade');
    if (!els.length) return;

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { obs.observe(el); });
  }

  initScrollAnim();

  /* ── SHOP: VIEW TOGGLE ───────────────── */
  const gridBtn  = document.getElementById('gridViewBtn');
  const listBtn  = document.getElementById('listViewBtn');
  const shopGrid = document.getElementById('shopGrid');

  if (gridBtn && listBtn && shopGrid) {
    gridBtn.addEventListener('click', function () {
      shopGrid.classList.remove('shop__grid--list');
      gridBtn.classList.add('shop__view-btn--active');
      listBtn.classList.remove('shop__view-btn--active');
    });
    listBtn.addEventListener('click', function () {
      shopGrid.classList.add('shop__grid--list');
      listBtn.classList.add('shop__view-btn--active');
      gridBtn.classList.remove('shop__view-btn--active');
    });
  }

  /* ── SHOP: FILTER RANGE DISPLAYS ────── */
  const heightRange = document.getElementById('heightRange');
  const heightVal   = document.getElementById('heightVal');
  if (heightRange && heightVal) {
    heightRange.addEventListener('input', function () {
      heightVal.textContent = 'до ' + this.value + ' см';
    });
  }

  const priceRange = document.getElementById('priceRange');
  const priceVal   = document.getElementById('priceVal');
  if (priceRange && priceVal) {
    priceRange.addEventListener('input', function () {
      priceVal.textContent = 'до ' + this.value + ' ₽';
    });
  }

  /* ── SHOP: FILTER RESET ──────────────── */
  const filterReset = document.getElementById('filterReset');
  if (filterReset) {
    filterReset.addEventListener('click', function () {
      document.querySelectorAll('.shop__filters input[type=checkbox]').forEach(function (cb) {
        cb.checked = false;
      });
      if (heightRange) { heightRange.value = 80; heightVal.textContent = 'до 80 см'; }
      if (priceRange)  { priceRange.value = 300; priceVal.textContent = 'до 300 ₽'; }
      document.querySelectorAll('.color-swatch').forEach(function (s) {
        s.style.outline = '';
      });
    });
  }

  /* ── COLOR SWATCHES ──────────────────── */
  document.querySelectorAll('.color-swatch').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.color-swatch').forEach(function (b) { b.style.outline = ''; });
      this.style.outline = '3px solid var(--c-olive)';
      this.style.outlineOffset = '2px';
    });
  });

  /* ── PRODUCT: QTY CONTROL ────────────── */
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus  = document.getElementById('qtyPlus');
  const qtyTotal = document.getElementById('qtyTotal');
  const totalPriceEl = document.getElementById('totalPrice');

  const PRICE_PER_STEM = 85;
  const STEMS_PER_PACK = 25;

  function updateQtyDisplay() {
    if (!qtyInput) return;
    const packs = parseInt(qtyInput.value) || 1;
    const stems = packs * STEMS_PER_PACK;
    const total = packs * STEMS_PER_PACK * PRICE_PER_STEM;
    if (qtyTotal) qtyTotal.textContent = '= ' + stems + ' стеблей';
    if (totalPriceEl) totalPriceEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', function () {
      const v = parseInt(qtyInput.value) || 1;
      if (v > 1) { qtyInput.value = v - 1; updateQtyDisplay(); }
    });
  }
  if (qtyPlus) {
    qtyPlus.addEventListener('click', function () {
      const v = parseInt(qtyInput.value) || 1;
      qtyInput.value = v + 1;
      updateQtyDisplay();
    });
  }
  if (qtyInput) {
    qtyInput.addEventListener('input', updateQtyDisplay);
    updateQtyDisplay();
  }

  /* ── PRODUCT: THUMBNAIL SWITCHING ────── */
  document.querySelectorAll('.product__thumb').forEach(function (thumb, idx) {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('.product__thumb').forEach(function (t) {
        t.classList.remove('product__thumb--active');
      });
      this.classList.add('product__thumb--active');
    });
  });

  /* ── PRODUCT: FAV BUTTON ─────────────── */
  const productFavBtn = document.querySelector('.product__fav-btn');
  if (productFavBtn) {
    productFavBtn.addEventListener('click', function () {
      const svg = this.querySelector('svg');
      if (svg) {
        const active = svg.getAttribute('fill') === 'currentColor';
        svg.setAttribute('fill', active ? 'none' : 'currentColor');
        this.style.color   = active ? '' : 'var(--c-error)';
        this.style.borderColor = active ? '' : 'var(--c-error)';
      }
    });
  }

  /* ── CABINET: MENU SECTIONS ──────────── */
  document.querySelectorAll('.cabinet__menu-item[data-section]').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.cabinet__menu-item').forEach(function (i) {
        i.classList.remove('cabinet__menu-item--active');
      });
      this.classList.add('cabinet__menu-item--active');

      const sectionId = this.dataset.section;
      document.querySelectorAll('.cabinet__card').forEach(function (card) {
        card.style.display = 'none';
      });
      const target = document.getElementById('section-' + sectionId);
      if (target) target.style.display = 'block';
    });
  });

  /* show orders by default */
  const defaultSection = document.getElementById('section-orders');
  if (defaultSection) {
    document.querySelectorAll('.cabinet__card').forEach(function (c) {
      c.style.display = c.id === 'section-orders' ? 'block' : 'none';
    });
  }

  /* ── CABINET: DELIVERY TOGGLE ─────────── */
  const pickupBtn    = document.getElementById('pickupBtn');
  const deliveryBtn  = document.getElementById('deliveryBtn');
  const deliveryForm = document.getElementById('deliveryForm');

  if (pickupBtn && deliveryBtn && deliveryForm) {
    pickupBtn.addEventListener('click', function () {
      pickupBtn.classList.add('delivery-opt--active');
      deliveryBtn.classList.remove('delivery-opt--active');
      deliveryForm.classList.remove('delivery-form--visible');
    });
    deliveryBtn.addEventListener('click', function () {
      deliveryBtn.classList.add('delivery-opt--active');
      pickupBtn.classList.remove('delivery-opt--active');
      deliveryForm.classList.add('delivery-form--visible');
    });
  }

  /* ── CART TIMER ──────────────────────── */
  const cartTimerEl = document.getElementById('cartTimer');
  if (cartTimerEl) {
    let totalSec = 47 * 60 + 23;
    const tick = setInterval(function () {
      totalSec--;
      if (totalSec <= 0) { clearInterval(tick); cartTimerEl.textContent = '0:00'; return; }
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      cartTimerEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
  }

  /* ── NEWS FILTER TABS ────────────────── */
  document.querySelectorAll('.news-filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.news-filter-btn').forEach(function (b) {
        b.classList.remove('news-filter-btn--active');
      });
      this.classList.add('news-filter-btn--active');
    });
  });

  /* ── FAV BUTTONS (card) ──────────────── */
  document.querySelectorAll('.p-card__fav').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('p-card__fav--active');
      const svg = this.querySelector('svg');
      if (svg) {
        const isActive = this.classList.contains('p-card__fav--active');
        svg.setAttribute('fill', isActive ? 'currentColor' : 'none');
      }
    });
  });

  /* ── ADD TO CART FEEDBACK ──────────────── */
  document.querySelectorAll('.p-card__add-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const orig = this.innerHTML;
      this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>';
      this.style.background = 'var(--c-success)';
      const self = this;
      setTimeout(function () {
        self.innerHTML = orig;
        self.style.background = '';
      }, 1500);
    });
  });

  /* ── SORT SELECT STYLE ───────────────── */
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', function () {
      /* placeholder for sort logic */
    });
  }

  /* ── CONTACTS: CALLBACK FORM ────────── */
  const callbackForms = document.querySelectorAll('.contacts__callback form, .contacts__callback button[type=button]');
  // No-op: form handled server-side

  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ──── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ── PAGE TRANSITION ─────────────────── */
  document.querySelectorAll('a[href]').forEach(function (link) {
    if (link.hostname !== window.location.hostname) return;
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) return;
    link.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    });
  });

  /* ── STACK SECTION SCALE EFFECT ─────── */
  function initStackEffect() {
    const sections = document.querySelectorAll('.stack-section:not(:first-child)');
    if (!sections.length) return;

    window.addEventListener('scroll', function () {
      sections.forEach(function (sec, idx) {
        const rect = sec.getBoundingClientRect();
        if (rect.top > 0) {
          sec.style.transform = '';
          return;
        }
        const buried = Math.min(Math.abs(rect.top) / window.innerHeight, 1);
        const scale  = 1 - buried * 0.03;
        sec.style.transformOrigin = 'center top';
        sec.style.transform = 'scale(' + scale + ')';
      });
    }, { passive: true });
  }

  initStackEffect();

  /* ── FOOTER: FORM VALIDATION HINT ────── */
  const footerCallbackInputs = document.querySelectorAll('.contacts__callback input[type=tel]');
  footerCallbackInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '');
      if (v.startsWith('7') || v.startsWith('8')) v = v.slice(1);
      let fmt = '+7 ';
      if (v.length > 0) fmt += '(' + v.slice(0, 3);
      if (v.length >= 3) fmt += ') ' + v.slice(3, 6);
      if (v.length >= 6) fmt += '-' + v.slice(6, 8);
      if (v.length >= 8) fmt += '-' + v.slice(8, 10);
      this.value = fmt;
    });
  });

  /* ── ORDER REPEAT BUTTONS ───────────── */
  document.querySelectorAll('.order-card__repeat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const orig = this.textContent;
      this.textContent = 'Добавлено в корзину';
      this.style.color = 'var(--c-success)';
      const self = this;
      setTimeout(function () {
        self.textContent = orig;
        self.style.color = '';
      }, 2000);
    });
  });

  /* ── REMOVE CART ITEM ───────────────── */
  document.querySelectorAll('.cart-item__remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.cart-item');
      if (item) {
        item.style.opacity = '0';
        item.style.transition = 'opacity .3s';
        setTimeout(function () { item.remove(); }, 300);
      }
    });
  });

  /* ── PAGINATION BUTTONS ─────────────── */
  document.querySelectorAll('.page-btn:not([title])').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.page-btn').forEach(function (b) {
        b.classList.remove('page-btn--active');
      });
      this.classList.add('page-btn--active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

})();
