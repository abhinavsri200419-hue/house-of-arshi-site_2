/* ============================================
   HOUSE OF ARSHI, Product Detail Modal
   Gallery + size selection + add to cart / buy now
   ============================================ */

let _modalState = {
  product: null,
  currentImageIndex: 0,
  selectedSize: null,
  pushed: false,       // true when opening added a browser-history entry
  returnFocus: null
};

// Pages that don't list products (About, bag, checkout...) still need the
// popup for the wishlist's "View" button and search results, so it is
// created on demand when missing.
const PRODUCT_MODAL_HTML = `
<div class="product-modal-scrim" id="productModalScrim" onclick="closeProductModal()"></div>
<div class="product-modal" id="productModal" role="dialog" aria-modal="true" aria-labelledby="modalProductName">
  <button type="button" class="modal-close" onclick="closeProductModal()" aria-label="Close product details">
    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
  </button>
  <div class="modal-gallery">
    <div class="modal-main-image" id="modalMainImage"></div>
    <button type="button" class="modal-nav-arrow prev" onclick="modalGoToImage(_modalState.currentImageIndex - 1)" aria-label="Previous image">
      <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button type="button" class="modal-nav-arrow next" onclick="modalGoToImage(_modalState.currentImageIndex + 1)" aria-label="Next image">
      <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="modal-dots" id="modalDots"></div>
    <div class="modal-thumbs" id="modalThumbs"></div>
  </div>
  <div class="modal-info">
    <span class="modal-tag" id="modalProductTag"></span>
    <h2 id="modalProductName"></h2>
    <div class="modal-price" id="modalProductPrice"></div>

    <div class="modal-section-label">Size</div>
    <div class="size-row" id="modalSizeRow"></div>
    <div class="size-warning" id="modalSizeWarning">Please select a size to continue.</div>

    <div class="modal-section-label">About The Product</div>
    <p class="modal-text" id="modalAbout"></p>

    <div class="modal-section-label">Material</div>
    <p class="modal-text" id="modalMaterial"></p>

    <div class="modal-section-label">Delivery</div>
    <p class="modal-text" id="modalDelivery"></p>

    <div class="modal-actions">
      <button type="button" class="modal-wishlist-btn" id="modalWishlistBtn" aria-label="Add to wishlist" aria-pressed="false">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>
      </button>
      <button type="button" class="btn btn-outline" id="modalAddToCartBtn" onclick="modalAddToCart()">Add to Cart</button>
      <button type="button" class="btn btn-primary" onclick="modalBuyNow()">Buy Now</button>
    </div>
  </div>
</div>`;

function ensureModalMarkup() {
  if (!document.getElementById('productModal')) {
    document.body.insertAdjacentHTML('beforeend', PRODUCT_MODAL_HTML);
  }
  initModalGestures();
}

// "#p-sk1" in the address opens that product (shareable product links)
function productIdFromHash() {
  const match = /^#p-([\w-]+)$/.exec(window.location.hash);
  return match && findProductById(match[1]) ? match[1] : null;
}

function openProductModal(productId, opts = {}) {
  const result = findProductById(productId);
  if (!result) return;
  ensureModalMarkup();
  const modal = document.getElementById('productModal');
  const alreadyOpen = modal.classList.contains('active');

  _modalState = {
    product: result.product,
    currentImageIndex: 0,
    selectedSize: null,
    pushed: alreadyOpen ? _modalState.pushed : false,
    returnFocus: alreadyOpen ? _modalState.returnFocus : document.activeElement
  };

  renderModal();
  modal.scrollTop = 0;

  // Give the popup its own history entry, so the phone's back button
  // closes it instead of leaving the page.
  if (!opts.fromHistory) {
    if (alreadyOpen && _modalState.pushed) {
      history.replaceState({ hoaProduct: productId }, '', '#p-' + productId);
    } else if (!alreadyOpen) {
      history.pushState({ hoaProduct: productId }, '', '#p-' + productId);
      _modalState.pushed = true;
    }
  }

  if (!alreadyOpen) {
    document.getElementById('productModalScrim').classList.add('active');
    modal.classList.add('active');
    lockScroll();
  }
  modal.querySelector('.modal-close').focus({ preventScroll: true });
}

function closeProductModal(opts = {}) {
  const modal = document.getElementById('productModal');
  if (!modal || !modal.classList.contains('active')) return;

  // Opened by us: step back through history; the popstate handler then
  // finishes closing, keeping the back button and the X in sync.
  if (_modalState.pushed && !opts.fromHistory) {
    _modalState.pushed = false;
    history.back();
    return;
  }

  document.getElementById('productModalScrim').classList.remove('active');
  modal.classList.remove('active');
  unlockScroll();
  _modalState.pushed = false;
  if (!opts.fromHistory && /^#p-/.test(window.location.hash)) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  const back = _modalState.returnFocus;
  _modalState.returnFocus = null;
  if (back && back.focus && document.contains(back)) back.focus({ preventScroll: true });
}

window.addEventListener('popstate', () => {
  const modal = document.getElementById('productModal');
  const isOpen = modal && modal.classList.contains('active');
  const id = productIdFromHash();
  if (isOpen && !id) {
    closeProductModal({ fromHistory: true });
  } else if (id && !isOpen) {
    openProductModal(id, { fromHistory: true });
  }
});

function modalGoToImage(index) {
  const images = _modalState.product.images || [];
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  _modalState.currentImageIndex = index;
  renderModalGallery();
}

// Swipe left/right on the photo to change image
function initModalGestures() {
  const el = document.getElementById('modalMainImage');
  if (!el || el.dataset.swipeReady) return;
  el.dataset.swipeReady = '1';
  let startX = null;
  let startY = null;
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    startX = e.clientX;
    startY = e.clientY;
  });
  el.addEventListener('pointercancel', () => { startX = null; });
  el.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      modalGoToImage(_modalState.currentImageIndex + (dx < 0 ? 1 : -1));
    }
  });
}

function modalSelectSize(size) {
  _modalState.selectedSize = size;
  renderModalSizeRow();
  hideModalSizeWarning();
}

function showModalSizeWarning() {
  const warn = document.getElementById('modalSizeWarning');
  if (warn) warn.style.display = 'block';
  // On phones the size row can be scrolled out of view
  document.getElementById('modalSizeRow')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function hideModalSizeWarning() {
  const warn = document.getElementById('modalSizeWarning');
  if (warn) warn.style.display = 'none';
}

function modalAddToCart() {
  if (!_modalState.selectedSize) {
    showModalSizeWarning();
    return;
  }
  addToCart(_modalState.product.id, _modalState.selectedSize, 1);
  // small confirmation animation on the modal's add to cart button
  const btn = document.getElementById('modalAddToCartBtn');
  if (btn) {
    btn.classList.add('added-flash');
    setTimeout(() => btn.classList.remove('added-flash'), 700);
  }
}

function modalBuyNow() {
  if (!_modalState.selectedSize) {
    showModalSizeWarning();
    return;
  }
  addToCart(_modalState.product.id, _modalState.selectedSize, 1);
  const cartPagePath = window.location.pathname.includes('/pages/') ? 'cart.html' : 'pages/cart.html';
  window.location.href = cartPagePath;
}

function renderModal() {
  renderModalGallery();
  renderModalInfo();
}

function renderModalGallery() {
  const product = _modalState.product;
  const images = product.images || [];
  const idx = _modalState.currentImageIndex;
  const markPath = window.location.pathname.includes('/pages/') ? '../assets/mark-white.png' : 'assets/mark-white.png';

  const mainSlot = document.getElementById('modalMainImage');
  const current = images[idx];
  if (current && current.src) {
    mainSlot.innerHTML = responsiveImageHTML(current.src, current.alt, {
      style: 'width:100%; height:100%; object-fit:contain; background:var(--black);',
      sizes: '(max-width: 980px) 100vw, 500px',
      eager: true
    });
  } else {
    mainSlot.innerHTML = `
      <div class="swatch-placeholder swatch-${product.swatch || ((idx % 6) + 1)}" style="width:100%; height:100%;">
        <img class="swatch-icon" src="${markPath}" alt="" style="width:56px; height:56px; object-fit:contain;">
        <div class="swatch-label">${product.name}</div>
        <div class="swatch-note">Image ${idx + 1} of ${images.length}, photo coming soon</div>
      </div>
    `;
  }

  const dotsContainer = document.getElementById('modalDots');
  dotsContainer.innerHTML = images.map((_, i) =>
    `<button type="button" class="${i === idx ? 'active' : ''}" onclick="modalGoToImage(${i})" aria-label="Image ${i + 1}"></button>`
  ).join('');

  const thumbsContainer = document.getElementById('modalThumbs');
  thumbsContainer.innerHTML = images.map((img, i) => {
    const thumbContent = img.src
      ? responsiveImageHTML(img.src, '', { sizes: '56px' })
      : `<div class="swatch-placeholder swatch-${product.swatch || ((i % 6) + 1)}" style="width:100%; height:100%; padding:4px;"><img src="${markPath}" alt="" style="width:16px; height:16px; object-fit:contain;"></div>`;
    return `<button type="button" class="modal-thumb ${i === idx ? 'active' : ''}" onclick="modalGoToImage(${i})" aria-label="Show image ${i + 1} of ${images.length}"${i === idx ? ' aria-current="true"' : ''}>${thumbContent}</button>`;
  }).join('');
}

function renderModalSizeRow() {
  const product = _modalState.product;
  const container = document.getElementById('modalSizeRow');
  container.innerHTML = (product.sizes || []).map(size => {
    const selected = _modalState.selectedSize === size;
    return `<button type="button" class="size-pill ${selected ? 'active' : ''}" aria-pressed="${selected}" onclick="modalSelectSize('${size}')">${size}</button>`;
  }).join('');
}

function renderModalInfo() {
  const product = _modalState.product;

  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductPrice').innerHTML = `${formatINR(product.price)} <span class="strike">${formatINR(product.mrp)}</span>`;

  const tagEl = document.getElementById('modalProductTag');
  if (product.tag) {
    tagEl.textContent = product.tag;
    tagEl.style.display = 'inline-block';
  } else {
    tagEl.style.display = 'none';
  }

  renderModalSizeRow();
  hideModalSizeWarning();

  document.getElementById('modalAbout').textContent = product.about;
  document.getElementById('modalMaterial').textContent = product.material;
  document.getElementById('modalDelivery').textContent = product.delivery;

  const wishBtn = document.getElementById('modalWishlistBtn');
  wishBtn.setAttribute('data-wishlist-id', product.id);
  wishBtn.onclick = () => toggleWishlist(product.id, wishBtn);
  const isWishlisted = typeof wishlist !== 'undefined' && wishlist.some(p => p.id === product.id);
  wishBtn.classList.toggle('active', isWishlisted);
  wishBtn.setAttribute('aria-pressed', isWishlisted ? 'true' : 'false');
}

// Arrow keys flip through the photos (Escape is handled in app.js)
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('productModal');
  if (!modal || !modal.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') modalGoToImage(_modalState.currentImageIndex - 1);
  if (e.key === 'ArrowRight') modalGoToImage(_modalState.currentImageIndex + 1);
});

// Open the product named in the address (e.g. a shared link or search result)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productModal')) initModalGestures();
  const id = productIdFromHash();
  if (id) openProductModal(id, { fromHistory: true });
});
