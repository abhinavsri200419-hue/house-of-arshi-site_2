/* ============================================
   HOUSE OF ARSHI, Product Detail Modal
   Gallery + size selection + add to cart / buy now
   ============================================ */

let _modalState = {
  product: null,
  currentImageIndex: 0,
  selectedSize: null
};

function openProductModal(productId) {
  const result = findProductById(productId);
  if (!result) return;
  const { product } = result;

  _modalState = {
    product,
    currentImageIndex: 0,
    selectedSize: null
  };

  renderModal();

  document.getElementById('productModalScrim').classList.add('active');
  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalScrim').classList.remove('active');
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
}

function modalGoToImage(index) {
  const images = _modalState.product.images || [];
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  _modalState.currentImageIndex = index;
  renderModalGallery();
}

function modalSelectSize(size) {
  _modalState.selectedSize = size;
  renderModalSizeRow();
  hideModalSizeWarning();
}

function showModalSizeWarning() {
  const warn = document.getElementById('modalSizeWarning');
  if (warn) warn.style.display = 'block';
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
    mainSlot.innerHTML = imgTagWithFallback(current.src, current.alt, 'width:100%; height:100%; object-fit:contain; background:var(--black);');
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
    `<button class="${i === idx ? 'active' : ''}" onclick="modalGoToImage(${i})" aria-label="Image ${i + 1}"></button>`
  ).join('');

  const thumbsContainer = document.getElementById('modalThumbs');
  thumbsContainer.innerHTML = images.map((img, i) => {
    const thumbContent = img.src
      ? imgTagWithFallback(img.src, img.alt, 'width:100%; height:100%; object-fit:cover;')
      : `<div class="swatch-placeholder swatch-${product.swatch || ((i % 6) + 1)}" style="width:100%; height:100%; padding:4px;"><img src="${markPath}" alt="" style="width:16px; height:16px; object-fit:contain;"></div>`;
    return `<button class="modal-thumb ${i === idx ? 'active' : ''}" onclick="modalGoToImage(${i})">${thumbContent}</button>`;
  }).join('');
}

function renderModalSizeRow() {
  const product = _modalState.product;
  const container = document.getElementById('modalSizeRow');
  container.innerHTML = (product.sizes || []).map(size => `
    <button class="size-pill ${_modalState.selectedSize === size ? 'active' : ''}" onclick="modalSelectSize('${size}')">${size}</button>
  `).join('');
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
}

// Keyboard navigation for the modal gallery (left/right arrows, escape to close)
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('productModal');
  if (!modal || !modal.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') modalGoToImage(_modalState.currentImageIndex - 1);
  if (e.key === 'ArrowRight') modalGoToImage(_modalState.currentImageIndex + 1);
  if (e.key === 'Escape') closeProductModal();
});
