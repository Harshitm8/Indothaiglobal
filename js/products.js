/**
 * products.js — Indo Thai Global
 * Product data · card rendering · hover overlay · modal · scroll reveal
 *
 * ════════════════════════════════════════════════════════════════
 *  HOW TO ADD PRODUCT IMAGES
 * ════════════════════════════════════════════════════════════════
 *  1. Create this folder in your project:  assets/products/
 *  2. Drop your image files in there, e.g.:
 *       assets/products/solar-dryer.jpg
 *       assets/products/honey.jpg
 *       assets/products/plastic-crates.jpg
 *       assets/products/kitchen-equipment.jpg
 *       assets/products/vegetable-slicer.jpg
 *       assets/products/pulverizer.jpg
 *       assets/products/knapsack-sprayer.jpg
 *  3. Each product below has:  image: 'assets/products/YOURFILE.jpg'
 *     Just make sure the filename matches what you put in the folder.
 *     Recommended size: 800×600px JPG or WEBP.
 *     If the file is missing, a coloured icon placeholder shows instead.
 *
 * ════════════════════════════════════════════════════════════════
 *  HOW TO ADD VIDEOS  (home.html video showcase section)
 * ════════════════════════════════════════════════════════════════
 *  1. Create this folder:  assets/videos/
 *  2. Drop your video files in there:
 *       assets/videos/solar-dryer.mp4
 *       assets/videos/vegetable-slicer.mp4
 *       assets/videos/pulverizer.mp4
 *       assets/videos/knapsack-sprayer.mp4
 *  3. Also add thumbnail images (shown before video plays):
 *       assets/videos/thumb-solar-dryer.jpg
 *       assets/videos/thumb-slicer.jpg
 *       assets/videos/thumb-pulverizer.jpg
 *       assets/videos/thumb-sprayer.jpg
 *  4. Open home.html and find the 4 video-panel blocks.
 *     Each one has a line like:
 *       <source src="assets/videos/solar-dryer.mp4" type="video/mp4"/>
 *     and a poster attribute:
 *       poster="assets/videos/thumb-solar-dryer.jpg"
 *     The paths are already correct — just drop your files in the folder.
 *
 * ════════════════════════════════════════════════════════════════
 *  HOW TO MAKE THE QUOTE / ENQUIRY FORM SEND EMAILS
 * ════════════════════════════════════════════════════════════════
 *  The easiest FREE option — Formspree (no server needed):
 *
 *  STEP 1: Go to https://formspree.io and create a free account
 *  STEP 2: Click "New Form" → name it "Indo Thai Quote"
 *          → enter  info@indothaiglobal.com  as the email
 *  STEP 3: Copy your form endpoint. It looks like:
 *            https://formspree.io/f/xyzabcde
 *  STEP 4: Open  js/quote.js  (or js/home.js for the enquiry form)
 *          Find the line:  fetch('YOUR_FORMSPREE_URL', {
 *          Replace it with your actual endpoint from Step 3.
 *  STEP 5: Done — Formspree will email you every submission.
 *
 *  Alternative — EmailJS (also free, works with Gmail):
 *    https://emailjs.com → connect your Gmail → use their SDK
 *    Replace the fetch call with:
 *      emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formElement)
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     PRODUCT DATA
     image: path to your image file (relative to HTML)
            e.g. 'assets/products/solar-dryer.jpg'
            Set to '' to show the icon placeholder.
  ══════════════════════════════════════════════════ */
  const PRODUCTS = [
    {
      id: 1,
      name: 'Solar Dryer',
      category: 'Solar',
      icon: '☀️',
      tagline: 'High-capacity continuous drying with solar energy',
      description:
        'Our flagship Solar Tunnel Dryer uses a transparent UV-stabilised polycarbonate cover and an efficient airflow system to deliver uniform, hygienic drying for large-scale food and agricultural produce. Ideal for spices, fruits, vegetables and grains.',
      specs: [
        { key: 'Capacity',    val: '100–2000 kg/batch' },
        { key: 'Temperature', val: '40°C – 75°C' },
        { key: 'Material',    val: 'GI / SS 304 frame' },
        { key: 'Energy',      val: '100% solar powered' },
        { key: 'Footprint',   val: '10m × 2m (modular)' },
      ],
      image: 'assets/products/solar-dryer.jpg',
    },
    {
      id: 2,
      name: 'Honey',
      category: 'Agri Product',
      icon: '🍯',
      tagline: 'Pure, natural honey from sustainable apiaries',
      description:
        'Premium quality honey processed hygienically with minimal intervention to preserve its natural enzymes, antioxidants and flavour. Available in bulk and retail packaging.',
      specs: [
        { key: 'Type',        val: 'Raw / Processed' },
        { key: 'Packaging',   val: '500g, 1kg, 5kg, Bulk' },
        { key: 'Purity',      val: '100% natural, no additives' },
        { key: 'Storage',     val: 'Cool, dry place' },
        { key: 'Shelf Life',  val: '24 months' },
      ],
      image: 'assets/products/honey.jpg',
    },
    {
      id: 3,
      name: 'Plastic Crates',
      category: 'Storage',
      icon: '📦',
      tagline: 'Durable, stackable crates for agricultural produce',
      description:
        'Heavy-duty food-grade plastic crates designed for harvesting, storage and transport of fruits, vegetables and processed goods. Ventilated design prevents moisture build-up and maintains produce quality.',
      specs: [
        { key: 'Material',    val: 'Food-grade HDPE' },
        { key: 'Capacity',    val: '20kg / 30kg / 50kg' },
        { key: 'Feature',     val: 'Stackable, ventilated' },
        { key: 'Temperature', val: '-20°C to +80°C' },
        { key: 'Lifespan',    val: '5+ years' },
      ],
      image: 'assets/products/plastic-crates.jpg',
    },
    {
      id: 4,
      name: 'Kitchen Equipments',
      category: 'Equipment',
      icon: '🍳',
      tagline: 'Stainless steel kitchen equipment for commercial use',
      description:
        'Industrial-grade stainless steel kitchen and food processing equipment built for hotels, restaurants, caterers and food processing units. Hygienic, durable and easy to clean.',
      specs: [
        { key: 'Material',    val: 'SS 304 / SS 316' },
        { key: 'Finish',      val: 'Mirror / Satin polish' },
        { key: 'Standards',   val: 'Food-safe, easy clean' },
        { key: 'Customise',   val: 'Yes — bespoke sizes' },
        { key: 'Warranty',    val: '1 year manufacturing' },
      ],
      image: 'assets/products/kitchen-equipment.jpg',
    },
    {
      id: 5,
      name: 'Vegetable Slicer Machine',
      category: 'Processing',
      icon: '🔪',
      tagline: 'Precision slicing for pre-processing and drying prep',
      description:
        'High-throughput vegetable slicer designed for uniform cutting of vegetables and fruits before drying or processing. Adjustable blade thickness ensures consistent output every time.',
      specs: [
        { key: 'Capacity',    val: '100–500 kg/hr' },
        { key: 'Slice Width', val: '1mm – 20mm (adjustable)' },
        { key: 'Motor',       val: '0.5 – 2 HP electric' },
        { key: 'Material',    val: 'SS 304 contact parts' },
        { key: 'Vegetables',  val: 'All types' },
      ],
      image: 'assets/products/vegetable-slicer.jpg',
    },
    {
      id: 6,
      name: 'Pulverizer',
      category: 'Processing',
      icon: '⚙️',
      tagline: 'Industrial grinding for spices, grains and dried produce',
      description:
        'Robust pulverizer machine designed for fine grinding of dried spices, grains and agricultural produce. Features adjustable output fineness and easy-clean stainless steel chamber.',
      specs: [
        { key: 'Capacity',    val: '50–500 kg/hr' },
        { key: 'Output',      val: '20–200 mesh fineness' },
        { key: 'Motor',       val: '2–10 HP' },
        { key: 'Material',    val: 'SS 316 contact parts' },
        { key: 'Application', val: 'Spices, grains, herbs' },
      ],
      image: 'assets/products/pulverizer.jpg',
    },
    {
      id: 7,
      name: 'Knapsack Sprayer',
      category: 'Agriculture',
      icon: '🌱',
      tagline: 'Efficient, lightweight field spraying solution',
      description:
        'Durable knapsack sprayer engineered for reliable pesticide, herbicide and fertilizer application across field crops. Ergonomic design reduces operator fatigue during extended field use.',
      specs: [
        { key: 'Tank',        val: '16L / 20L' },
        { key: 'Pressure',    val: '2–4 bar (manual pump)' },
        { key: 'Nozzle',      val: 'Adjustable flat/cone jet' },
        { key: 'Material',    val: 'UV-resistant HDPE tank' },
        { key: 'Weight',      val: '2.1 kg (empty)' },
      ],
      image: 'assets/products/knapsack-sprayer.jpg',
    },
  ];

  /* ══════════════════════════════════════════════════
     IMAGE RENDERER — graceful fallback to placeholder
  ══════════════════════════════════════════════════ */
  function renderCardImg(p) {
    const placeholder = `
      <div class="prod-img-placeholder">
        <span class="ph-icon">${p.icon}</span>
        <span class="ph-label">${p.category}</span>
      </div>`;

    if (p.image) {
      return `<img
        src="${p.image}"
        alt="${p.name}"
        class="prod-img"
        loading="lazy"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
      />${placeholder.replace('prod-img-placeholder', 'prod-img-placeholder" style="display:none')}`;
    }
    return placeholder;
  }

  /* ══════════════════════════════════════════════════
     CARD BUILDER — no price shown
  ══════════════════════════════════════════════════ */
  function buildCard(p) {
    const card = document.createElement('article');
    card.className = 'prod-card';
    card.setAttribute('data-id', p.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View details for ' + p.name);

    card.innerHTML =
      '<div class="prod-img-wrap">' +
        renderCardImg(p) +
        '<span class="prod-badge">' + p.category + '</span>' +
        '<div class="prod-overlay" aria-hidden="true">' +
          '<div class="ov-title">' + p.name + '</div>' +
          '<div class="ov-desc">' + p.description + '</div>' +
          '<div class="ov-row">' +
            '<button class="ov-btn" data-id="' + p.id + '">View Details ›</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="prod-body">' +
        '<div class="prod-name">' + p.name + '</div>' +
        '<div class="prod-tagline">' + p.tagline + '</div>' +
        '<div class="prod-footer">' +
          '<span class="prod-cat-tag">' + p.category + '</span>' +
          '<span class="prod-more">Details <span aria-hidden="true">→</span></span>' +
        '</div>' +
      '</div>';

    return card;
  }

  /* ══════════════════════════════════════════════════
     INJECT into every .products-grid on the page
  ══════════════════════════════════════════════════ */
  function injectCards() {
    document.querySelectorAll('.products-grid').forEach(function (grid) {
      PRODUCTS.forEach(function (p) { grid.appendChild(buildCard(p)); });
    });
  }

  /* ══════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════ */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.prod-card').forEach(function (c) { c.classList.add('is-visible'); });
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.prod-card').forEach(function (c) { obs.observe(c); });
  }

  /* ══════════════════════════════════════════════════
     MODAL — no price, specs + enquire buttons
  ══════════════════════════════════════════════════ */
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Product details');
  backdrop.innerHTML =
    '<div class="modal-box" id="modalBox">' +
      '<div class="modal-img-pane" id="modalImgPane"></div>' +
      '<div class="modal-info">' +
        '<div class="modal-cat"     id="modalCat"></div>' +
        '<div class="modal-name"    id="modalName"></div>' +
        '<div class="modal-tagline-text" id="modalTagline"></div>' +
        '<div class="modal-rule"></div>' +
        '<div class="modal-desc"    id="modalDesc"></div>' +
        '<ul  class="modal-specs"   id="modalSpecs"></ul>' +
        '<div class="modal-actions">' +
          '<a href="quote.html"   class="btn btn-dark"  style="font-size:0.8rem;padding:.5rem 1.2rem">Request Quote →</a>' +
          '<a href="contact.html" class="btn btn-ghost" style="font-size:0.8rem;padding:.48rem 1.1rem">Contact Us</a>' +
        '</div>' +
      '</div>' +
      '<button class="modal-close" id="modalClose" aria-label="Close">✕</button>' +
    '</div>';
  document.body.appendChild(backdrop);

  function openModal(id) {
    const p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;

    const imgPane = document.getElementById('modalImgPane');
    imgPane.innerHTML = p.image
      ? '<img src="' + p.image + '" alt="' + p.name + '" onerror="this.parentElement.innerHTML=\'<div class=modal-ph>' + p.icon + '</div>\'">'
      : '<div class="modal-ph">' + p.icon + '</div>';

    document.getElementById('modalCat').textContent     = p.category;
    document.getElementById('modalName').textContent    = p.name;
    document.getElementById('modalTagline').textContent = p.tagline;
    document.getElementById('modalDesc').textContent    = p.description;

    document.getElementById('modalSpecs').innerHTML = p.specs.map(function (s) {
      return '<li class="modal-spec"><span class="spec-k">' + s.key + ':</span> ' + s.val + '</li>';
    }).join('');

    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('modalClose').focus(); }, 50);
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ══════════════════════════════════════════════════
     EVENT DELEGATION
  ══════════════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    const btn  = e.target.closest('.ov-btn');
    const card = e.target.closest('.prod-card');
    if (btn)  { e.stopPropagation(); openModal(Number(btn.dataset.id)); return; }
    if (card) { openModal(Number(card.dataset.id)); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.prod-card');
      if (card) { e.preventDefault(); openModal(Number(card.dataset.id)); }
    }
  });

  /* INIT */
  injectCards();
  initReveal();

})();