/* ============================================
   HOUSE OF ARSHI, Core App Logic
   Cart, Wishlist, Search, Image Helpers
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
  document.querySelectorAll('[data-wishlist-id]').forEach(el => {
    const id = el.getAttribute('data-wishlist-id');
    el.classList.toggle('active', wishlist.some(w => w.id === id));
  });
}

// ---------- Account nav ----------
async function initAccountNav() {
  const link = document.getElementById('navAccountLink');
  if (!link) return;
  if (!getToken()) {
    link.textContent = 'Login';
    return;
  }
  try {
    const customer = await AuthAPI.me();
    const firstName = customer.name.split(' ')[0];
    link.textContent = `Hi, ${firstName}`;
    link.href = 'javascript:void(0)';
    link.onclick = (e) => {
      e.preventDefault();
      if (confirm('Log out of House of Arshi?')) {
        AuthAPI.logout();
      }
    };
  } catch (err) {
    // apiRequest already redirects to login on 401
  }
}

// ---------- Utility ----------
function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
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

// Looks up an editable image from IMAGES by dotted path, e.g.
// getImage('homepage', 'hero_slide_1') -> { src, alt } or null if not configured
function getImage(section, key) {
  if (!IMAGES[section] || !IMAGES[section][key]) return null;
  const entry = IMAGES[section][key];
  return entry.src ? entry : null;
}

// Renders either a real <img> (if src is set) or a designed placeholder,
// for section/banner images from images.data.js. sizeLabel controls the
// placeholder icon size ('large' default, 'small' for compact spots).
function sectionImageHTML(section, key, swatchNum = 1, sizeLabel = 'large') {
  const img = getImage(section, key);
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const markPath = isInPagesFolder ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (img) {
    return imgTagWithFallback(img.src, img.alt, 'width:100%; height:100%; object-fit:cover;');
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
    return window.location.pathname.includes('/pages/') && path.startsWith('assets/') ? '../' + path : path;
  }
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  return (isInPagesFolder ? '../assets/img/' : 'assets/img/') + path;
}

// Builds an <img> tag that automatically tries assets/img/sections/ and
// assets/img/products/ if a bare filename (no folder) was typed, so people
// editing images.data.js or products.data.js do not need to remember which
// folder a particular photo belongs in. If the path already includes a
// folder (like "products/sk1.jpg"), this is skipped and the path is used
// exactly as given.
function imgTagWithFallback(path, alt, styleAttr) {
  const resolved = resolveImgPath(path);
  const hasExplicitFolder = path.includes('/');
  if (hasExplicitFolder) {
    return `<img src="${resolved}" alt="${alt}" style="${styleAttr}">`;
  }
  // No folder specified, try sections/ first, then fall back to products/
  // if that 404s, using onerror with a one-time guard so it cannot loop.
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const base = isInPagesFolder ? '../assets/img/' : 'assets/img/';
  const sectionsGuess = base + 'sections/' + path;
  const productsGuess = base + 'products/' + path;
  return `<img src="${sectionsGuess}" alt="${alt}" style="${styleAttr}" onerror="if(!this.dataset.fallbackTried){this.dataset.fallbackTried='1'; this.src='${productsGuess}';}">`;
}

// Renders a product card's main thumbnail. Uses the product's first
// gallery image if set, otherwise a designed placeholder.
function productThumbHTML(product, swatchNum) {
  const firstImg = product.images && product.images[0];
  const markPath = window.location.pathname.includes('/pages/') ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (firstImg && firstImg.src) {
    return imgTagWithFallback(firstImg.src, firstImg.alt, 'width:100%; height:100%; object-fit:cover;');
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
  const markPath = window.location.pathname.includes('/pages/') ? '../assets/mark-white.png' : 'assets/mark-white.png';
  if (firstImg && firstImg.src) {
    return imgTagWithFallback(firstImg.src, firstImg.alt, 'width:100%; height:100%; object-fit:cover;');
  }
  return `
    <div class="swatch-placeholder swatch-${product.swatch || 1}" style="padding:6px; gap:4px;">
      <img class="swatch-icon" src="${markPath}" alt="" style="width:18px; height:18px; object-fit:contain;">
    </div>
  `;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ---------- Cart Logic ----------
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
      showToast(err.message || 'Could not add to cart. Please try again.');
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
      showToast(err.message || 'Could not remove item. Please try again.');
    }
    return;
  }

  cart = cart.filter(item => item.cartItemId !== cartItemId);
  saveGuestCart();
  renderCart();
  renderCartPage();
  renderCheckoutSummary();
  updateBadges();
}

async function changeQty(cartItemId, delta) {
  const item = cart.find(i => i.cartItemId === cartItemId);
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
      showToast(err.message || 'Could not update quantity. Please try again.');
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

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
    showToast('Please select a payment method');
    return;
  }

  if (cart.length === 0) {
    showToast('Your bag is empty');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Placing order...'; }

  const name = document.getElementById('checkoutName').value;
  const email = document.getElementById('checkoutEmail').value;
  const phone = document.getElementById('checkoutPhone').value;
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
    showToast(err.message || 'Could not place your order. Please try again.');
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
        showToast('Payment succeeded but confirmation failed. Please contact support with your payment ID.');
      }
    },
    modal: {
      ondismiss: function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Place Order'; }
        showToast('Payment cancelled');
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
            <button onclick="changeQty('${item.cartItemId}', -1)" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.cartItemId}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-remove" onclick="removeFromCart('${item.cartItemId}')">
          Remove
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
        <button onclick="changeQty(${item.cartItemId}, -1)" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.cartItemId}, 1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-page-line-total">${formatINR(item.price * item.qty)}</div>
      <button class="cart-page-remove" onclick="removeFromCart(${item.cartItemId})" aria-label="Remove item">
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
      showToast(err.message || 'Could not update wishlist. Please try again.');
    }
    return;
  }

  // Guest: keep the wishlist in this browser until they log in at checkout.
  if (alreadySaved) {
    wishlist = wishlist.filter(p => p.id !== id);
    if (btnEl) btnEl.classList.remove('active');
    showToast('Removed from wishlist');
  } else {
    wishlist.push({
      wishlistItemId: id, id: product.id, name: product.name, price: product.price,
      mrp: product.mrp, tag: product.tag, images: product.images,
    });
    if (btnEl) btnEl.classList.add('active');
    showToast('Saved to your wishlist');
  }
  saveGuestWishlist();
  renderWishlist();
  renderWishlistPage();
  updateBadges();
  document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach(el => {
    el.classList.toggle('active', wishlist.some(p => p.id === id));
  });
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
          <button class="btn btn-primary" style="padding:8px 16px; font-size:11px;" onclick="openProductModal('${item.id}')">View</button>
          <button class="cart-remove" onclick="toggleWishlist('${item.id}')">Remove</button>
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

  container.innerHTML = `<div class="product-grid">` + wishlist.map(item => `
    <div class="product-card" data-product-name="${item.name}">
      <div class="product-img-wrap">
        ${item.tag ? `<span class="product-tag gold">${item.tag}</span>` : ''}
        <button class="wishlist-btn active" data-wishlist-id="${item.id}" onclick="toggleWishlist('${item.id}', this)" aria-label="Remove from wishlist">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>
        </button>
        <a href="javascript:void(0)" onclick="openProductModal('${item.id}')">${productThumbHTML(item, item.swatch || 1)}</a>
        <button class="quick-add" onclick="openProductModal('${item.id}')">View Product</button>
      </div>
      <div class="product-info">
        <div class="pname">${item.name}</div>
        <div class="pprice">${formatINR(item.price)} <span class="strike">${formatINR(item.mrp)}</span></div>
      </div>
    </div>
  `).join('') + `</div>`;
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
}

// ---------- Drawer open/close ----------
function openDrawer(which) {
  document.getElementById('overlayScrim').classList.add('active');
  document.getElementById(which).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeDrawers() {
  document.getElementById('overlayScrim').classList.remove('active');
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('active'));
  document.body.style.overflow = '';
}

// ---------- Search ----------
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

// ---------- Newsletter Popup ----------
function initNewsletterPopup() {
  const scrim = document.getElementById('popupScrim');
  const popup = document.getElementById('newsletterPopup');
  if (!scrim || !popup) return;

  const alreadyShown = sessionStorage.getItem('hoa_popup_shown');
  if (!alreadyShown) {
    setTimeout(() => {
      scrim.classList.add('active');
      popup.classList.add('active');
      sessionStorage.setItem('hoa_popup_shown', '1');
    }, 1800);
  }
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

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 4500);
}

// ---------- Mobile menu ----------
function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('active');
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

// ---------- Init on load ----------
document.addEventListener('DOMContentLoaded', () => {
  initAccountNav();
  initSearch();
  initNewsletterPopup();
  initHeroSlideshow();
  initFooterLegal();

  document.getElementById('overlayScrim')?.addEventListener('click', closeDrawers);
  document.getElementById('popupScrim')?.addEventListener('click', closeNewsletterPopup);

  // Cart/wishlist now live on the server -- load them, then run the
  // page-specific renders and guards that depend on that data.
  Promise.all([loadCart(), loadWishlist()]).then(() => {
    guardCheckoutPage();
  });
});
