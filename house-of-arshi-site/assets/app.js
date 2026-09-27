/* ============================================
   HOUSE OF ARSHI, Core App Logic
   Cart, Wishlist, Search, Mobile Menu, Image Helpers
   Cart/wishlist are now backed by the FastAPI + Supabase backend via
   api-client.js -- these local arrays are just an in-memory mirror of
   what's on the server, refreshed after every change.
   ============================================ */

// ---------- State (mirrors the server; refreshed via loadCart/loadWishlist) ----------
let cart = [];
let wishlist = [];

function normalizeCartRow(row) {
  const p = row.products || {};
  const images = (p.product_images || [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(im => ({ src: im.src, alt: im.alt }));
  return {
    cartItemId: row.id,
    id: p.id,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    size: row.size,
    qty: row.qty,
    images,
  };
}

function normalizeWishlistRow(row) {
  const p = row.products || {};
  const images = (p.product_images || [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(im => ({ src: im.src, alt: im.alt }));
  return {
    wishlistItemId: row.id,
    id: p.id,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    tag: p.tag,
    images,
  };
}

function loadGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveGuestCart() {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}
function loadGuestWishlist() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveGuestWishlist() {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
}

// Storage that never throws (private browsing and blocked storage can throw)
function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

async function loadCart() {
  if (getToken()) {
    try {
      const rows = await CartAPI.list();
      cart = rows.map(normalizeCartRow);
    } catch (err) {
      console.error('Could not load cart', err);
    }
  } else {
    cart = loadGuestCart();
  }
  renderCart();
  renderCartPage();
  renderCheckoutSummary();
  updateBadges();
}

async function loadWishlist() {
  if (getToken()) {
    try {
      const rows = await WishlistAPI.list();
      wishlist = rows.map(normalizeWishlistRow);
    } catch (err) {
      console.error('Could not load wishlist', err);
    }
  } else {
    wishlist = loadGuestWishlist();
  }
  renderWishlist();
  renderWishlistPage();
  updateBadges();
  syncWishlistButtons();
}

// Marks every heart button whose product is in the wishlist
function syncWishlistButtons() {
  document.querySelectorAll('[data-wishlist-id]').forEach(el => {
    const saved = wishlist.some(w => w.id === el.getAttribute('data-wishlist-id'));
    el.classList.toggle('active', saved);
    el.setAttribute('aria-pressed', saved ? 'true' : 'false');
  });
}

// ---------- Account nav ----------
async function initAccountNav() {
  const link = document.getElementById('navAccountLink');
  const menuLink = document.getElementById('mmAccount');
  if (!getToken()) {
    if (link) link.textContent = 'Login';
    return;
  }
  try {
    const customer = await AuthAPI.me();
    const firstName = customer.name.split(' ')[0];
    const logout = (e) => {
      e.preventDefault();
      if (confirm('Log out of House of Arshi?')) {
        AuthAPI.logout();
      }
    };
    if (link) {
      link.textContent = `Hi, ${firstName}`;
      link.href = 'javascript:void(0)';
      link.onclick = logout;
    }
    if (menuLink) {
      menuLink.textContent = `Hi, ${firstName} · Log out`;
      menuLink.href = '#';
      menuLink.onclick = logout;
    }
  } catch (err) {
    // apiRequest already redirects to login on 401
  }
}

// ---------- Utility ----------
function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function isInPagesFolder() {
  return window.location.pathname.includes('/pages/');
}

// Turns a path written from the site root ("pages/cart.html", "index.html")
// into one that works from whichever page is currently open.
function sitePath(path) {
  if (!isInPagesFolder()) return path;
  return path.startsWith('pages/') ? path.slice('pages/'.length) : '../' + path;
}

// Searches every subsection array inside PRODUCTS for a matching id.
// Returns { product, subsectionKey } or null.
function findProductById(id) {
  for (const subKey in PRODUCTS) {
    const found = PRODUCTS[subKey].find(p => p.id === id);
    if (found) return { product: found, subsectionKey: subKey };
  }
  return null;
}

// Shareable link to a product: its category page, which opens the product
// popup automatically when the address ends in #p-<id>.
function productUrl(id) {
  const result = findProductById(id);
  const page = result ? `pages/${result.subsectionKey}.html` : 'index.html';
  return `${sitePath(page)}#p-${id}`;
}

// Opens the product popup in place; ctrl/cmd-click still opens a new tab.
function openProductFromLink(e, id) {
  if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return true;
  if (e) e.preventDefault();
  openProductModal(id);
  return false;
}

// ---------- Scroll lock (drawers, menu, product popup) ----------
// body { overflow: hidden } is ignored by iPhone Safari, so the page is pinned
// in place instead and the scroll position restored afterwards.
let _scrollLocks = 0;
let _lockedScrollY = 0;
function lockScroll() {
  if (_scrollLocks++ > 0) return;
  _lockedScrollY = window.scrollY;
  const s = document.body.style;
  s.position = 'fixed';
  s.top = `-${_lockedScrollY}px`;
  s.left = '0';
  s.right = '0';
  s.width = '100%';
}
function unlockScroll() {
  if (_scrollLocks === 0 || --_scrollLocks > 0) return;
  const s = document.body.style;
  s.position = '';
  s.top = '';
  s.left = '';
  s.right = '';
  s.width = '';
  window.scrollTo({ top: _lockedScrollY, left: 0, behavior: 'instant' });
}

// Keeps keyboard focus inside an open dialog
function trapFocus(container, e) {
  const focusables = [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (!container.contains(document.activeElement)) {
    e.preventDefault();
    first.focus();
  } else if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// ---------- Images ----------

// Looks up an editable image from IMAGES by dotted path, e.g.
// getImage('homepage', 'hero_slide_1') -> { src, alt } or null if not configured
function getImage(section, key) {
  if (!IMAGES[section] || !IMAGES[section][key]) return null;
  const entry = IMAGES[section][key];
  return entry.src ? entry : null;
}

// Renders either a real image (if src is set) or a designed placeholder,
// for section/banner images from images.data.js. sizeLabel controls the
// placeholder icon size ('large' default, 'small' for compact spots).
// opts are passed to responsiveImageHTML (sizes, priority, eager, artDirection).
function sectionImageHTML(section, key, swatchNum = 1, sizeLabel = 'large', opts = {}) {
  const img = getImage(section, key);
  const markPath = isInPagesFolder() ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (img) {
    return responsiveImageHTML(img.src, img.alt, { sizes: '100vw', ...opts });
  }
  const iconSize = sizeLabel === 'small' ? '32px' : '48px';
  return `
    <div class="swatch-placeholder swatch-${swatchNum}" style="width:100%; height:100%;">
      <img class="swatch-icon" src="${markPath}" alt="" style="width:${iconSize}; height:${iconSize}; object-fit:contain;">
      <div class="swatch-note">Photo coming soon</div>
    </div>
  `;
}

// Turns a path written relative to assets/img/ (e.g. "sections/hero-1.jpg")
// into the correct path for whichever page is currently rendering it.
// This means images.data.js and products.data.js never need page-specific
// "../" prefixes, you always write paths the same way no matter which
// page will end up showing that image.
function resolveImgPath(path) {
  if (!path) return path;
  // If someone already wrote a full path (starts with assets/, ../, http, or /),
  // leave it alone rather than double-prefixing.
  if (/^(https?:)?\/\//.test(path) || path.startsWith('../') || path.startsWith('assets/') || path.startsWith('/')) {
    return isInPagesFolder() && path.startsWith('assets/') ? '../' + path : path;
  }
  return (isInPagesFolder() ? '../assets/img/' : 'assets/img/') + path;
}

// Builds an <img> tag that automatically tries assets/img/sections/ and
// assets/img/products/ if a bare filename (no folder) was typed, so people
// editing images.data.js or products.data.js do not need to remember which
// folder a particular photo belongs in. If the path already includes a
// folder (like "products/sk1.jpg"), this is skipped and the path is used
// exactly as given.
function imgTagWithFallback(path, alt, styleAttr, extraAttrs = '') {
  const resolved = resolveImgPath(path);
  const hasExplicitFolder = path.includes('/');
  if (hasExplicitFolder) {
    return `<img src="${resolved}" alt="${alt}" style="${styleAttr}"${extraAttrs}>`;
  }
  // No folder specified, try sections/ first, then fall back to products/
  // if that 404s, using onerror with a one-time guard so it cannot loop.
  const base = isInPagesFolder() ? '../assets/img/' : 'assets/img/';
  const sectionsGuess = base + 'sections/' + path;
  const productsGuess = base + 'products/' + path;
  return `<img src="${sectionsGuess}" alt="${alt}" style="${styleAttr}"${extraAttrs} onerror="if(!this.dataset.fallbackTried){this.dataset.fallbackTried='1'; this.src='${productsGuess}';}">`;
}

// Optimised copies made by dev-tools/optimize_images.py, listed in
// assets/data/image-variants.data.js. Returns null for photos that haven't
// been optimised yet (they are then shown as-is).
function imageVariants(path) {
  if (typeof IMAGE_VARIANTS !== 'object' || !IMAGE_VARIANTS || !path) return null;
  const key = path.replace(/^(\.\.\/)?(assets\/)?img\//, '');
  if (IMAGE_VARIANTS[key]) return IMAGE_VARIANTS[key];
  if (!key.includes('/')) return IMAGE_VARIANTS['sections/' + key] || IMAGE_VARIANTS['products/' + key] || null;
  return null;
}

// Builds a responsive image: small WebP files for phones, bigger ones for
// large screens, a JPEG for old browsers, and (for hero banners) a
// portrait crop on phones. Falls back to a plain <img> when no optimised
// copies exist.
//   opts.sizes         how wide the image is shown, e.g. '(max-width: 980px) 50vw, 420px'
//   opts.priority      the page's main image: load first
//   opts.eager         load now instead of when scrolled into view
//   opts.artDirection  use the portrait phone crop if there is one
//   opts.style         inline style for the <img>
function responsiveImageHTML(path, alt, opts = {}) {
  const style = opts.style || 'width:100%; height:100%; object-fit:cover;';
  const loading = opts.priority ? ' fetchpriority="high"' : (opts.eager ? '' : ' loading="lazy"');
  const attrs = `${loading} decoding="async"`;
  const v = imageVariants(path);
  if (!v) return imgTagWithFallback(path, alt, style, attrs);
  const base = isInPagesFolder() ? '../assets/img/' : 'assets/img/';
  const srcset = (stem, widths) => widths.map(w => `${base}${stem}-${w}.webp ${w}w`).join(', ');
  let sources = '';
  if (opts.artDirection && v.mobile) {
    sources += `<source media="(max-width: 720px)" type="image/webp" srcset="${srcset(v.mobile.base, v.mobile.widths)}" sizes="100vw">`;
  }
  sources += `<source type="image/webp" srcset="${srcset(v.base, v.widths)}" sizes="${opts.sizes || '100vw'}">`;
  return `<picture>${sources}<img src="${base}${v.fallback}" alt="${alt}" width="${v.w}" height="${v.h}" style="${style}"${attrs}></picture>`;
}

// Renders a product card's main thumbnail. Uses the product's first
// gallery image if set, otherwise a designed placeholder.
function productThumbHTML(product, swatchNum, opts = {}) {
  const firstImg = product.images && product.images[0];
  const markPath = isInPagesFolder() ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (firstImg && firstImg.src) {
    return responsiveImageHTML(firstImg.src, firstImg.alt, { sizes: '(max-width: 980px) 50vw, 420px', ...opts });
  }
  return `
    <div class="swatch-placeholder swatch-${swatchNum}">
      <img class="swatch-icon" src="${markPath}" alt="" style="width:40px; height:40px; object-fit:contain;">
      <div class="swatch-label">${product.name}</div>
      <div class="swatch-note">Photo coming soon</div>
    </div>
  `;
}

// Small thumbnail for cart/wishlist drawer rows
function productMiniThumbHTML(product) {
  const firstImg = product.images && product.images[0];
  const markPath = isInPagesFolder() ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (firstImg && firstImg.src) {
    return responsiveImageHTML(firstImg.src, firstImg.alt, { sizes: '80px' });
  }
  return `
    <div class="swatch-placeholder swatch-${product.swatch || 1}" style="padding:6px; gap:4px;">
      <img class="swatch-icon" src="${markPath}" alt="" style="width:18px; height:18px; object-fit:contain;">
    </div>
  `;
}

const HEART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>';

// One product card, used by the homepage, every category page and the
// wishlist page. The photo and the name both open the product popup.
function productCardHTML(p, i = 0) {
  const url = productUrl(p.id);
  return `
    <div class="product-card" data-product-name="${p.name}" data-product-id="${p.id}">
      <div class="product-img-wrap">
        ${p.tag ? `<span class="product-tag gold">${p.tag}</span>` : ''}
        <button type="button" class="wishlist-btn" data-wishlist-id="${p.id}" aria-pressed="false" onclick="toggleWishlist('${p.id}', this); event.stopPropagation();" aria-label="Save ${p.name} to wishlist">${HEART_SVG}</button>
        <a href="${url}" class="product-img-link" tabindex="-1" onclick="return openProductFromLink(event, '${p.id}')">${productThumbHTML(p, (i % 6) + 1)}</a>
        <button type="button" class="quick-add" tabindex="-1" onclick="openProductModal('${p.id}')">View Product</button>
      </div>
      <div class="product-info">
        <a class="pname" href="${url}" onclick="return openProductFromLink(event, '${p.id}')">${p.name}</a>
        <div class="pprice">${formatINR(p.price)} <span class="strike">${formatINR(p.mrp)}</span></div>
      </div>
    </div>
  `;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = message;
  toast.classList.toggle('is-error', type === 'error');
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), type === 'error' ? 4000 : 2400);
}

// ---------- Cart Logic ----------
// Guest cart ids are strings like "sk1_M"; logged-in ids are numbers from the
// server. Buttons pass them as strings, so compare as strings.
function sameCartId(a, b) {
  return String(a) === String(b);
}

async function addToCart(id, size, qty = 1) {
  const result = findProductById(id);
  if (!result) return;
  const { product } = result;

  if (getToken()) {
    try {
      await CartAPI.add(id, size, qty);
      await loadCart();
      bounceCartIcon();
      showToast(`Added "${product.name}" (Size ${size}) to your bag`);
    } catch (err) {
      showToast(err.message || 'Could not add to cart. Please try again.', 'error');
    }
    return;
  }

  // Guest: keep the cart in this browser until they log in at checkout.
  const cartItemId = id + '_' + size;
  const existing = cart.find(item => item.cartItemId === cartItemId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      cartItemId, id: product.id, name: product.name, price: product.price,
      mrp: product.mrp, size, qty, images: product.images,
    });
  }
  saveGuestCart();
  renderCart();
  renderCartPage();
  renderCheckoutSummary();
  updateBadges();
  bounceCartIcon();
  showToast(`Added "${product.name}" (Size ${size}) to your bag`);
}

async function removeFromCart(cartItemId) {
  if (getToken()) {
    try {
      await CartAPI.remove(cartItemId);
      await loadCart();
    } catch (err) {
      showToast(err.message || 'Could not remove item. Please try again.', 'error');
    }
    return;
  }

  cart = cart.filter(item => !sameCartId(item.cartItemId, cartItemId));
  saveGuestCart();
  renderCart();
  renderCartPage();
  renderCheckoutSummary();
  updateBadges();
}

async function changeQty(cartItemId, delta) {
  const item = cart.find(i => sameCartId(i.cartItemId, cartItemId));
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    await removeFromCart(cartItemId);
    return;
  }

  if (getToken()) {
    try {
      await CartAPI.updateQty(cartItemId, newQty);
      await loadCart();
    } catch (err) {
      showToast(err.message || 'Could not update quantity. Please try again.', 'error');
    }
    return;
  }

  item.qty = newQty;
  saveGuestCart();
  renderCart();
  renderCartPage();
  renderCheckoutSummary();
  updateBadges();
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Renders the order summary box on the checkout page, if present
function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsList');
  if (!container) return;

  if (cart.length === 0) {
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="checkout-line-item">
      <div class="checkout-line-thumb">${productMiniThumbHTML(item)}</div>
      <div class="checkout-line-info">
        <div class="clname">${item.name}</div>
        <div class="clmeta">Size ${item.size} &middot; Qty ${item.qty}</div>
      </div>
      <div class="clprice">${formatINR(item.price * item.qty)}</div>
    </div>
  `).join('');

  const sub = cartSubtotal();
  const subEl = document.getElementById('checkoutSubtotal');
  const totalEl = document.getElementById('checkoutTotal');
  if (subEl) subEl.textContent = formatINR(sub);
  if (totalEl) totalEl.textContent = formatINR(sub);
}

// Redirects back to cart if someone lands on checkout with nothing in their bag
function guardCheckoutPage() {
  const guard = document.getElementById('checkoutGuard');
  if (!guard) return;
  if (cart.length === 0) {
    window.location.href = 'cart.html';
  }
}

// Accepts "9876543210", "+91 98765 43210", "098765 43210" and returns the
// 10-digit number, or null if it isn't a valid Indian mobile number.
function normalizeIndianPhone(value) {
  const digits = String(value).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^\d{10}$/.test(digits) ? digits : null;
}

function initCheckoutForm() {
  const phone = document.getElementById('checkoutPhone');
  if (phone) phone.addEventListener('input', () => phone.setCustomValidity(''));
}

// Validates the checkout form, creates a real order on the backend, and
// runs Razorpay's checkout widget (unless Cash on Delivery is selected, in
// which case the order is created as-is with no online payment step).
async function placeOrder(e) {
  e.preventDefault();
  const form = document.getElementById('checkoutForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const phoneInput = document.getElementById('checkoutPhone');
  const phone = normalizeIndianPhone(phoneInput.value);
  if (!phone) {
    phoneInput.setCustomValidity('Please enter a 10-digit mobile number.');
    phoneInput.reportValidity();
    return;
  }

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
    showToast('Please select a payment method', 'error');
    return;
  }

  if (cart.length === 0) {
    showToast('Your bag is empty', 'error');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Placing order...'; }

  const name = document.getElementById('checkoutName').value;
  const email = document.getElementById('checkoutEmail').value;
  const address = [
    document.getElementById('checkoutAddress').value,
    document.getElementById('checkoutCity').value,
    document.getElementById('checkoutState').value,
    document.getElementById('checkoutPincode').value,
  ].filter(Boolean).join(', ');

  try {
    const order = await OrdersAPI.create({
      customer_name: name,
      email,
      phone,
      shipping_address: address,
      items: cart.map(item => ({ product_id: item.id, size: item.size, qty: item.qty })),
    });

    const orderItemsSnapshot = cart.map(item => ({ name: item.name, size: item.size, qty: item.qty, price: item.price }));

    if (selectedPayment.value === 'Cash on Delivery') {
      await clearServerCart();
      sessionStorage.setItem('hoa_last_order', JSON.stringify({
        orderId: order.order_id, items: orderItemsSnapshot, subtotal: order.subtotal, total: order.total,
        paymentMethod: 'Cash on Delivery', customerName: name, email,
      }));
      window.location.href = 'order-confirmation.html';
      return;
    }

    openRazorpayCheckout(order, { name, email, phone }, orderItemsSnapshot);
  } catch (err) {
    showToast(err.message || 'Could not place your order. Please try again.', 'error');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Place Order'; }
  }
}

function openRazorpayCheckout(order, customer, orderItemsSnapshot) {
  const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
  const rzp = new Razorpay({
    key: order.razorpay_key_id,
    amount: Math.round(order.total * 100),
    currency: 'INR',
    name: 'House of Arshi',
    description: 'Order payment',
    order_id: order.razorpay_order_id,
    prefill: { name: customer.name, email: customer.email, contact: customer.phone },
    theme: { color: '#7A2E2E' },
    handler: async function (response) {
      try {
        await OrdersAPI.verify({
          order_id: order.order_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        await clearServerCart();
        sessionStorage.setItem('hoa_last_order', JSON.stringify({
          orderId: order.order_id, items: orderItemsSnapshot, subtotal: order.subtotal, total: order.total,
          paymentMethod: 'Online Payment', customerName: customer.name, email: customer.email,
        }));
        window.location.href = 'order-confirmation.html';
      } catch (err) {
        showToast('Payment succeeded but confirmation failed. Please contact support with your payment ID.', 'error');
      }
    },
    modal: {
      ondismiss: function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Place Order'; }
        showToast('Payment cancelled', 'error');
      },
    },
  });
  rzp.open();
}

// Empties the server-side cart after a successful order (loops rather than
// a bulk endpoint, since carts are small -- fine at this scale).
async function clearServerCart() {
  try {
    await Promise.all(cart.map(item => CartAPI.remove(item.cartItemId)));
  } catch (err) {
    console.error('Could not fully clear cart after order', err);
  }
  cart = [];
}

function bounceCartIcon() {
  const icon = document.getElementById('cartIconBtn');
  if (!icon) return;
  icon.classList.remove('bounce');
  // restart animation
  void icon.offsetWidth;
  icon.classList.add('bounce');
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty">
        <svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
        <div>
          <p style="font-weight:600; color:var(--black); margin-bottom:6px;">Your bag is feeling light</p>
          <p style="font-size:13px;">Let's fix that, go fall in love with something.</p>
        </div>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div style="width:76px; height:96px; border-radius:4px; overflow:hidden; flex-shrink:0;">${productMiniThumbHTML(item)}</div>
      <div class="cart-item-info">
        <div class="ciname">${item.name}</div>
        <div class="cimeta">Size: ${item.size}</div>
        <div class="ciprice">${formatINR(item.price)}</div>
        <div class="cart-qty-row">
          <div class="qty-control">
            <button type="button" onclick="changeQty('${item.cartItemId}', -1)" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button type="button" onclick="changeQty('${item.cartItemId}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="cart-remove" onclick="removeFromCart('${item.cartItemId}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotalEl = document.getElementById('cartSubtotal');
  if (subtotalEl) subtotalEl.textContent = formatINR(cartSubtotal());
}

// Renders the full cart page (pages/cart.html), if present on the current page
function renderCartPage() {
  const container = document.getElementById('cartPageBody');
  if (!container) return;
  const summary = document.getElementById('cartPageSummary');

  if (cart.length === 0) {

    if (summary) summary.style.display = "none";

    container.innerHTML = `
        <div class="cart-page-empty">

            <svg viewBox="0 0 24 24">
                <path d="M6 6h15l-1.5 9h-12z"/>
                <path d="M6 6L4 3H2"/>
                <circle cx="9" cy="20" r="1"/>
                <circle cx="18" cy="20" r="1"/>
            </svg>

            <h3>Your bag is empty</h3>

            <p>
                Looks like you haven't added anything yet.
            </p>

            <a href="../index.html"
               class="btn btn-primary">
               Continue Shopping
            </a>

        </div>
    `;

    return;
}

  if (summary) summary.style.display = 'block';
  container.innerHTML = cart.map(item => `
    <div class="cart-page-row">
      <div class="cart-page-thumb">${productMiniThumbHTML(item)}</div>
      <div class="cart-page-info">
        <div class="cpr-name">${item.name}</div>
        <div class="cpr-meta">Size: ${item.size}</div>
        <div class="cpr-price">${formatINR(item.price)} <span class="strike">${formatINR(item.mrp)}</span></div>
      </div>
      <div class="qty-control">
        <button type="button" onclick="changeQty('${item.cartItemId}', -1)" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button type="button" onclick="changeQty('${item.cartItemId}', 1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-page-line-total">${formatINR(item.price * item.qty)}</div>
      <button type="button" class="cart-page-remove" onclick="removeFromCart('${item.cartItemId}')" aria-label="Remove item">
        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('');

  const subEl = document.getElementById('cartPageSubtotal');
  const totalEl = document.getElementById('cartPageTotal');
  const sub = cartSubtotal();
  if (subEl) subEl.textContent = formatINR(sub);
  if (totalEl) totalEl.textContent = formatINR(sub);
}

// ---------- Wishlist Logic ----------
async function toggleWishlist(id, btnEl) {
  const result = findProductById(id);
  if (!result) return;
  const { product } = result;
  const alreadySaved = wishlist.some(p => p.id === id);

  if (getToken()) {
    try {
      if (alreadySaved) {
        await WishlistAPI.remove(id);
        if (btnEl) btnEl.classList.remove('active');
        showToast('Removed from wishlist');
      } else {
        await WishlistAPI.add(id);
        if (btnEl) btnEl.classList.add('active');
        showToast('Saved to your wishlist');
      }
      await loadWishlist();
    } catch (err) {
      showToast(err.message || 'Could not update wishlist. Please try again.', 'error');
    }
    return;
  }

  // Guest: keep the wishlist in this browser until they log in at checkout.
  if (alreadySaved) {
    wishlist = wishlist.filter(p => p.id !== id);
    showToast('Removed from wishlist');
  } else {
    wishlist.push({
      wishlistItemId: id, id: product.id, name: product.name, price: product.price,
      mrp: product.mrp, tag: product.tag, images: product.images,
    });
    showToast('Saved to your wishlist');
  }
  saveGuestWishlist();
  renderWishlist();
  renderWishlistPage();
  updateBadges();
  syncWishlistButtons();
}

function renderWishlist() {
  const body = document.getElementById('wishlistBody');
  if (!body) return;
  if (wishlist.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>
        <div>
          <p style="font-weight:600; color:var(--black); margin-bottom:6px;">No favourites yet</p>
          <p style="font-size:13px;">Tap the heart on anything you love.</p>
        </div>
      </div>`;
    return;
  }
  body.innerHTML = wishlist.map(item => `
    <div class="cart-item">
      <div style="width:76px; height:96px; border-radius:4px; overflow:hidden; flex-shrink:0;">${productMiniThumbHTML(item)}</div>
      <div class="cart-item-info">
        <div class="ciname">${item.name}</div>
        <div class="ciprice">${formatINR(item.price)}</div>
        <div class="cart-qty-row">
          <button type="button" class="btn btn-primary btn-sm" onclick="openProductModal('${item.id}')">View</button>
          <button type="button" class="cart-remove" onclick="toggleWishlist('${item.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Renders the full wishlist page (pages/wishlist.html), if present
function renderWishlistPage() {
  const container = document.getElementById('wishlistPageBody');
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-page-empty">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>
        <h3>No favourites yet</h3>
        <p>Save the pieces you love and they will show up here.</p>
        <a href="../index.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    return;
  }

  container.innerHTML = `<div class="product-grid">` + wishlist.map((item, i) => productCardHTML(item, i)).join('') + `</div>`;
  syncWishlistButtons();
}

function updateBadges() {
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  }
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
  // Counts shown in the mobile menu
  document.querySelectorAll('[data-count="cart"]').forEach(el => { el.textContent = cartCount; el.hidden = cartCount === 0; });
  document.querySelectorAll('[data-count="wishlist"]').forEach(el => { el.textContent = wishlist.length; el.hidden = wishlist.length === 0; });
}

// ---------- Drawer open/close ----------
let _openDrawerId = null;
let _drawerReturnFocus = null;

function openDrawer(which) {
  const drawer = document.getElementById(which);
  if (!drawer || _openDrawerId === which) return;
  if (_openDrawerId) {
    document.getElementById(_openDrawerId)?.classList.remove('active');
  } else {
    _drawerReturnFocus = document.activeElement;
    lockScroll();
  }
  _openDrawerId = which;
  document.getElementById('overlayScrim').classList.add('active');
  drawer.classList.add('active');
  drawer.querySelector('.drawer-close')?.focus({ preventScroll: true });
}
function closeDrawers() {
  if (!_openDrawerId) return;
  document.getElementById('overlayScrim').classList.remove('active');
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('active'));
  _openDrawerId = null;
  unlockScroll();
  if (_drawerReturnFocus && _drawerReturnFocus.focus) _drawerReturnFocus.focus({ preventScroll: true });
  _drawerReturnFocus = null;
}

// ---------- Search (desktop search box: filters the products on this page) ----------
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', (e) => {
    filterCategoryProducts(e.target.value.trim());
  });
}

function filterCategoryProducts(query) {
  const cards = document.querySelectorAll('[data-product-name]');
  if (cards.length === 0) return;
  let visibleCount = 0;
  cards.forEach(card => {
    const name = card.getAttribute('data-product-name').toLowerCase();
    const match = query === '' || name.includes(query.toLowerCase());
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  const countEl = document.getElementById('resultCount');
  if (countEl) countEl.textContent = `${visibleCount} item${visibleCount !== 1 ? 's' : ''}`;
}

// Whole-catalogue search used by the mobile menu. Matches every word
// against the product name, its category and material.
function searchProducts(query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const found = [];
  for (const [category, list] of Object.entries(PRODUCTS)) {
    for (const p of list) {
      const text = `${p.name} ${category.replace(/-/g, ' ')} ${p.material || ''}`.toLowerCase();
      if (terms.every(t => text.includes(t))) found.push(p);
    }
  }
  return found.slice(0, 24);
}

// ---------- Mobile menu ----------
const MENU_ICONS = {
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
};

// Builds the slide-out menu from site-structure.data.js, so adding a
// category there updates the menu on every page.
function initMobileMenu() {
  if (!document.querySelector('.navbar .burger') || document.getElementById('mobileMenu')) return;
  const structure = (typeof SITE_STRUCTURE === 'object' && SITE_STRUCTURE) || { nav: [], sections: {} };
  const here = window.location.pathname.split('/').pop() || 'index.html';
  const current = file => (file === here ? ' aria-current="page"' : '');

  const items = structure.nav.map(item => {
    const file = item.href.split('/').pop();
    const sectionKey = Object.keys(structure.sections).find(k => structure.sections[k].hub_page === file);
    const subs = (sectionKey && structure.sections[sectionKey].subsections) || [];
    const link = `<a href="${sitePath(item.href)}"${current(file)}>${item.label}</a>`;
    if (!subs.length) return `<li><div class="mm-item">${link}</div></li>`;
    const open = file === here || subs.some(s => s.page === here);
    const id = `mm-sub-${sectionKey}`;
    return `<li>
      <div class="mm-item">
        ${link}
        <button type="button" class="mm-toggle" aria-expanded="${open}" aria-controls="${id}" aria-label="${item.label} categories">${MENU_ICONS.chevron}</button>
      </div>
      <ul class="mm-sub" id="${id}"${open ? '' : ' hidden'}>
        ${subs.map(s => `<li><a href="${sitePath('pages/' + s.page)}"${current(s.page)}>${s.title}</a></li>`).join('')}
      </ul>
    </li>`;
  }).join('');

  const tel = document.querySelector('.footer-contact a[href^="tel:"]');
  const mail = document.querySelector('.footer-contact a[href^="mailto:"]');
  const markPath = isInPagesFolder() ? '../assets/mark-black.png' : 'assets/mark-black.png';

  document.body.insertAdjacentHTML('beforeend', `
    <div class="mobile-menu-scrim" id="mobileMenuScrim"></div>
    <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="mm-head">
        <a class="mm-logo" href="${sitePath('index.html')}"><img src="${markPath}" alt="" width="37" height="28">House of Arshi</a>
        <button type="button" class="mm-close" aria-label="Close menu">${MENU_ICONS.close}</button>
      </div>
      <form class="mm-search" role="search" action="#" onsubmit="return false;">
        ${MENU_ICONS.search}
        <label class="sr-only" for="mmSearch">Search products</label>
        <input type="search" id="mmSearch" placeholder="Search kurtis, sarees, sets…" autocomplete="off" enterkeyhint="search">
      </form>
      <div class="mm-results" id="mmResults" aria-live="polite"></div>
      <nav class="mm-nav" aria-label="Shop categories">
        <ul>
          <li><div class="mm-item"><a href="${sitePath('index.html')}"${current('index.html')}>Home</a></div></li>
          ${items}
        </ul>
      </nav>
      <div class="mm-footer">
        <a class="mm-row" id="mmAccount" href="${sitePath('pages/login.html')}">Login / Create account</a>
        <a class="mm-row" href="${sitePath('pages/wishlist.html')}">Wishlist <span class="mm-count" data-count="wishlist" hidden>0</span></a>
        <a class="mm-row" href="${sitePath('pages/cart.html')}">Your Bag <span class="mm-count" data-count="cart" hidden>0</span></a>
        <a class="mm-row" href="${sitePath('pages/about.html')}">About Us</a>
        ${tel ? `<a class="mm-row" href="${tel.getAttribute('href')}">Call ${tel.textContent.trim()}</a>` : ''}
        ${mail ? `<a class="mm-row" href="${mail.getAttribute('href')}">Email us</a>` : ''}
      </div>
    </div>`);

  const menu = document.getElementById('mobileMenu');
  document.getElementById('mobileMenuScrim').addEventListener('click', () => closeMobileMenu());
  menu.querySelector('.mm-close').addEventListener('click', () => closeMobileMenu());
  menu.querySelectorAll('.mm-toggle').forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }));
  // Tapping the page you're already on just closes the menu
  menu.querySelector('.mm-nav').addEventListener('click', e => {
    const a = e.target.closest('a[aria-current="page"]');
    if (a) { e.preventDefault(); closeMobileMenu(); }
  });

  const input = document.getElementById('mmSearch');
  let searchTimer;
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderMenuSearch(input.value), 120);
  });
  document.getElementById('mmResults').addEventListener('click', e => {
    const a = e.target.closest('a[data-product-id]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    closeMobileMenu({ restoreFocus: false });
    openProductModal(a.dataset.productId);
  });
  updateBadges();
}

function renderMenuSearch(query) {
  const box = document.getElementById('mmResults');
  if (!box) return;
  const q = query.trim();
  if (q.length < 2) {
    box.innerHTML = '';
    return;
  }
  const found = searchProducts(q);
  const summary = found.length
    ? `${found.length} ${found.length === 1 ? 'product' : 'products'}`
    : `No products match “${escapeHTML(q)}”`;
  box.innerHTML = `<p class="mm-results-count">${summary}</p>` + found.map(p => `
    <a class="mm-result" href="${productUrl(p.id)}" data-product-id="${p.id}">
      <span class="mm-result-thumb">${productMiniThumbHTML(p)}</span>
      <span>
        <span class="mm-result-name">${p.name}</span>
        <span class="mm-result-price">${formatINR(p.price)}</span>
      </span>
    </a>`).join('');
}

let _menuReturnFocus = null;

function openMobileMenu(opts = {}) {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  if (!menu.classList.contains('active')) {
    _menuReturnFocus = document.activeElement;
    menu.classList.add('active');
    document.getElementById('mobileMenuScrim').classList.add('active');
    document.querySelectorAll('.burger').forEach(b => b.setAttribute('aria-expanded', 'true'));
    lockScroll();
  }
  const target = opts.focusSearch ? document.getElementById('mmSearch') : menu.querySelector('.mm-close');
  if (target) target.focus({ preventScroll: true });
}

function closeMobileMenu(opts = {}) {
  const menu = document.getElementById('mobileMenu');
  if (!menu || !menu.classList.contains('active')) return;
  menu.classList.remove('active');
  document.getElementById('mobileMenuScrim').classList.remove('active');
  document.querySelectorAll('.burger').forEach(b => b.setAttribute('aria-expanded', 'false'));
  unlockScroll();
  if (opts.restoreFocus !== false && _menuReturnFocus && _menuReturnFocus.focus) {
    _menuReturnFocus.focus({ preventScroll: true });
  }
  _menuReturnFocus = null;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('active')) closeMobileMenu();
  else openMobileMenu();
}

// ---------- Newsletter Popup ----------
// Shown once every two weeks at most, and only after the visitor has had a
// chance to look around (half-way down the page or 25 seconds in). On
// phones it's a small sheet at the bottom that doesn't block the page.
const POPUP_SNOOZE_KEY = 'hoa_popup_snooze_until';
const POPUP_SNOOZE_DAYS = 14;

function initNewsletterPopup() {
  const scrim = document.getElementById('popupScrim');
  const popup = document.getElementById('newsletterPopup');
  if (!scrim || !popup) return;
  if (Number(storageGet(POPUP_SNOOZE_KEY)) > Date.now()) return;

  let shown = false;
  let timer = null;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max > 0.5) show();
  };
  function show() {
    if (shown) return;
    // Don't interrupt while the visitor is using the menu, bag or a product
    if (document.querySelector('.drawer.active, .product-modal.active, .mobile-menu.active')) {
      clearTimeout(timer);
      timer = setTimeout(show, 5000);
      return;
    }
    shown = true;
    clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
    storageSet(POPUP_SNOOZE_KEY, String(Date.now() + POPUP_SNOOZE_DAYS * 864e5));
    // The photo is only used on large screens, so phones never download it
    const imgSlot = document.getElementById('newsletterPopupImg');
    if (imgSlot && !imgSlot.innerHTML.trim() && window.matchMedia('(min-width: 981px)').matches) {
      imgSlot.innerHTML = sectionImageHTML('homepage', 'newsletter_popup_image', 4, 'large', { sizes: '440px', eager: true });
    }
    scrim.classList.add('active');
    popup.classList.add('active');
  }
  timer = setTimeout(show, 25000);
  window.addEventListener('scroll', onScroll, { passive: true });
}

function closeNewsletterPopup() {
  document.getElementById('popupScrim').classList.remove('active');
  document.getElementById('newsletterPopup').classList.remove('active');
}

function submitNewsletter(e) {
  e.preventDefault();
  document.getElementById('npForm').style.display = 'none';
  document.getElementById('npSuccess').classList.add('show');
  setTimeout(closeNewsletterPopup, 2400);
}

// ---------- Hero Slideshow ----------
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length === 0) return;
  let current = 0;
  let timer = null;
  let stoppedByVisitor = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    dots[current]?.setAttribute('aria-current', 'false');
    current = index;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    dots[current]?.setAttribute('aria-current', 'true');
  }
  function start() {
    if (reduceMotion || stoppedByVisitor || timer) return;
    timer = setInterval(() => goTo((current + 1) % slides.length), 4500);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }

  // Picking a slide stops the automatic rotation for good
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    stoppedByVisitor = true;
    stop();
    goTo(i);
  }));
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}

// ---------- Footer legal accordion (FAQ / Privacy / Terms) ----------
function initFooterLegal() {
  const panelsWrap = document.getElementById('footerLegalPanels');
  const linkEls = document.querySelectorAll('.footer-legal-links a[data-legal]');
  if (!panelsWrap || linkEls.length === 0) return;

  const sources = (typeof FOOTER_LEGAL === 'object' && FOOTER_LEGAL) || {};

  function closeAll() {
    panelsWrap.hidden = true;
    panelsWrap.querySelectorAll('.flp-panel').forEach(p => p.classList.remove('is-open'));
    linkEls.forEach(a => a.classList.remove('is-active'));
  }

  function openPanel(kind) {
    const panel = panelsWrap.querySelector(`.flp-panel[data-panel="${kind}"]`);
    if (!panel) return;
    const body = panel.querySelector('.flp-body');
    if (body && !body.dataset.filled && sources[kind]) {
      body.innerHTML = sources[kind];
      body.dataset.filled = 'true';
    }
    // close any other open panel first
    panelsWrap.querySelectorAll('.flp-panel').forEach(p => p.classList.remove('is-open'));
    linkEls.forEach(a => a.classList.remove('is-active'));
    panel.classList.add('is-open');
    panelsWrap.hidden = false;
    linkEls.forEach(a => {
      if (a.getAttribute('data-legal') === kind) a.classList.add('is-active');
    });
    // smooth scroll the panel into view
    setTimeout(() => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  linkEls.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const kind = a.getAttribute('data-legal');
      const panel = panelsWrap.querySelector(`.flp-panel[data-panel="${kind}"]`);
      const isOpen = panel && panel.classList.contains('is-open');
      if (isOpen) {
        closeAll();
      } else {
        openPanel(kind);
      }
      // update URL hash without jump
      if (history.replaceState) {
        history.replaceState(null, '', isOpen ? ' ' : `#footer-legal-${kind}`);
      }
    });
  });

  panelsWrap.querySelectorAll('.flp-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAll();
      if (history.replaceState) history.replaceState(null, '', ' ');
    });
  });

  // Open from URL hash on initial load
  const initialHash = (window.location.hash || '').replace('#footer-legal-', '');
  if (initialHash && sources[initialHash]) {
    openPanel(initialHash);
  }
}

// ---------- Keyboard: Escape closes the top-most layer, Tab stays inside it ----------
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' && e.key !== 'Tab') return;
  const modal = document.getElementById('productModal');
  const modalOpen = modal && modal.classList.contains('active');
  const popup = document.querySelector('.newsletter-popup.active');
  const menu = document.querySelector('.mobile-menu.active');
  const drawer = document.querySelector('.drawer.active');

  if (e.key === 'Escape') {
    if (modalOpen) closeProductModal();
    else if (popup) closeNewsletterPopup();
    else if (menu) closeMobileMenu();
    else if (drawer) closeDrawers();
    return;
  }
  const layer = modalOpen ? modal : (menu || drawer);
  if (layer) trapFocus(layer, e);
});

// ---------- Init on load ----------
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAccountNav();
  initSearch();
  initNewsletterPopup();
  initHeroSlideshow();
  initFooterLegal();
  initCheckoutForm();

  document.getElementById('overlayScrim')?.addEventListener('click', closeDrawers);
  document.getElementById('popupScrim')?.addEventListener('click', closeNewsletterPopup);

  // Cart/wishlist now live on the server -- load them, then run the
  // page-specific renders and guards that depend on that data.
  Promise.all([loadCart(), loadWishlist()]).then(() => {
    guardCheckoutPage();
  });
});
