"""
Shared HTML partials for House of Arshi v2.
These are Python string templates (not separate files fetched at runtime)
so everything works identically under file:// and on Vercel.
"""

def navbar(asset_prefix="../assets/", pages_prefix="", home_href="../index.html", dark=False, search_box=True):
    wordmark_style = ' style="color:var(--ivory);"' if dark else ''
    mark_file = "mark-white.png" if dark else "mark-black.png"
    search_html = """
      <div class="search-box">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="searchInput" placeholder="Search this collection..." aria-label="Search this collection">
      </div>""" if search_box else ""
    return f"""
<nav class="navbar">
  <div class="nav-inner">
    <div class="nav-left">
      <button type="button" class="burger" onclick="toggleMobileMenu()" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
      <a href="{home_href}" class="nav-logo">
        <img src="{asset_prefix}{mark_file}" alt="House of Arshi mark" class="mark-img" width="53" height="40">
        <div class="logo-text-block">
          <span class="logo-wordmark"{wordmark_style}>House of Arshi</span>
          <span class="logo-tagline">Timeless Elegance, Crafted For You</span>
        </div>
      </a>
    </div>
    <ul class="nav-links">
      <li><a href="{pages_prefix}fusion-wear.html">Fusion Wear</a></li>
      <li><a href="{pages_prefix}indo-western.html">Indo Western</a></li>
      <li><a href="{pages_prefix}semi-formals.html">Semi Formals</a></li>
      <li><a href="{pages_prefix}sarees.html">Sarees</a></li>
      <li><a href="{pages_prefix}formals.html">Formals</a></li>
    </ul>
    <div class="nav-right">{search_html}
      <button type="button" class="nav-icon-btn nav-search-btn" onclick="openMobileMenu({{ focusSearch: true }})" aria-label="Search products">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </button>
      <button type="button" class="nav-icon-btn nav-wishlist-btn" onclick="openDrawer('wishlistDrawer')" aria-label="Open wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9C1 8.5 2 5 5.3 5c2 0 3.3 1.2 3.7 2 .4-.8 1.7-2 3.7-2C16 5 17 8.5 15.3 12 13 16.5 12 21 12 21z"/></svg>
        <span class="badge-count" id="wishlistBadge" style="display:none;">0</span>
      </button>
      <button type="button" class="nav-icon-btn" id="cartIconBtn" onclick="openDrawer('cartDrawer')" aria-label="Open cart">
        <svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L4 3H2"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
        <span class="badge-count" id="cartBadge" style="display:none;">0</span>
      </button>
      <a href="{pages_prefix}login.html" id="navAccountLink" class="nav-account-link">Login</a>
    </div>
  </div>
</nav>
"""

def marquee():
    return """
<div class="marquee">
  <div class="marquee-track">
    <span>Free Shipping Above ₹1,999</span>
    <span>New Drop Every Friday</span>
    <span>Made For The Way You Actually Live</span>
    <span>Easy 7-Day Exchange</span>
    <span>Free Shipping Above ₹1,999</span>
    <span>New Drop Every Friday</span>
    <span>Made For The Way You Actually Live</span>
    <span>Easy 7-Day Exchange</span>
  </div>
</div>
"""

def product_modal():
    return """
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
</div>
"""

def drawers(pages_prefix="../pages/"):
    return f"""
<div class="overlay-scrim" id="overlayScrim"></div>

<div class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartDrawerTitle">
  <div class="drawer-header">
    <h3 id="cartDrawerTitle">Your Bag</h3>
    <button type="button" class="drawer-close" onclick="closeDrawers()" aria-label="Close cart"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
  </div>
  <div class="drawer-body" id="cartBody"></div>
  <div class="drawer-footer" id="cartFooter" style="display:none;">
    <div class="drawer-subtotal"><span>Subtotal</span><span id="cartSubtotal">₹0</span></div>
    <a href="{pages_prefix}cart.html" class="btn btn-primary" id="goToCartBtn" style="display:block; text-align:center;">View Bag and Checkout</a>
    <p class="drawer-note">Shipping and taxes calculated at checkout</p>
  </div>
</div>

<div class="drawer" id="wishlistDrawer" role="dialog" aria-modal="true" aria-labelledby="wishlistDrawerTitle">
  <div class="drawer-header">
    <h3 id="wishlistDrawerTitle">Your Wishlist</h3>
    <button type="button" class="drawer-close" onclick="closeDrawers()" aria-label="Close wishlist"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
  </div>
  <div class="drawer-body" id="wishlistBody"></div>
</div>
"""

def footer(asset_prefix="../assets/", pages_prefix=""):
    return f"""
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="{asset_prefix}mark-white.png" alt="House of Arshi mark" class="footer-brand-mark">
          <div class="footer-brand-text">
            <span class="footer-brand-name">
            <span class="fb-line-1">ARSHI&rsquo;S DESIGNER STUDIO &amp;</span>
            <span class="fb-line-2">House of Arshi</span>
          </span>
          </div>
        </div>
        <p>Fusion, ethnic and everyday fits for the girl who is always a little bit of both. Desi at heart, modern by design.</p>
        <ul class="footer-contact">
          <li>
            <span class="fc-label">Email</span>
            <a href="mailto:arshisdesignerstudio@gmail.com">arshisdesignerstudio@gmail.com</a>
          </li>
          <li>
            <span class="fc-label">Phone</span>
            <a href="tel:+917680890071">+91 7680890071</a>
          </li>
        </ul>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 18l2-9M12 14c2 0 4-1.5 4-4.5S14 5 12 5 8 7 8 9.5"/></svg></a>
          <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 1 1-4-7.2"/><path d="M21 11.5L13 12l3-7"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h2>Shop</h2>
        <a href="{pages_prefix}fusion-wear.html">Fusion Wear</a>
        <a href="{pages_prefix}indo-western.html">Indo Western</a>
        <a href="{pages_prefix}semi-formals.html">Semi Formals</a>
        <a href="{pages_prefix}sarees.html">Sarees</a>
        <a href="{pages_prefix}formals.html">Formals</a>
      </div>
      <div class="footer-col">
        <h2>Company</h2>
        <a href="{pages_prefix}about.html">About Us</a>
        <a href="#">Contact</a>
        <a href="{pages_prefix}cart.html">Your Bag</a>
        <a href="{pages_prefix}wishlist.html">Wishlist</a>
      </div>
      <div class="footer-col">
        <h2>Stay In The Loop</h2>
        <p style="margin-bottom:14px;">Drops, discounts and nothing you will want to skip.</p>
        <form class="footer-newsletter-form" onsubmit="event.preventDefault(); showToast('You are on the list 🤍');">
          <input type="email" placeholder="Your email" aria-label="Your email" autocomplete="email" required>
          <button type="submit">Join</button>
        </form>
        <div class="footer-legal-links">
          <a href="#footer-legal-faq" data-legal="faq">FAQ</a>
          <a href="#footer-legal-privacy" data-legal="privacy">Privacy Policy</a>
          <a href="#footer-legal-terms" data-legal="terms">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>

    <div class="footer-legal-panels" id="footerLegalPanels" hidden>
      <div class="flp-panel" data-panel="faq" id="footer-legal-faq">
        <button class="flp-close" type="button" aria-label="Close panel">×</button>
        <h3>Frequently Asked Questions</h3>
        <div class="flp-body" id="flp-body-faq"></div>
      </div>
      <div class="flp-panel" data-panel="privacy" id="footer-legal-privacy">
        <button class="flp-close" type="button" aria-label="Close panel">×</button>
        <h3>Privacy Policy</h3>
        <div class="flp-body" id="flp-body-privacy"></div>
      </div>
      <div class="flp-panel" data-panel="terms" id="footer-legal-terms">
        <button class="flp-close" type="button" aria-label="Close panel">×</button>
        <h3>Terms &amp; Conditions</h3>
        <div class="flp-body" id="flp-body-terms"></div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2026 Arshis Designer Studio &amp; House of Arshi. All rights reserved.</span>
      <span>Designed for the women who do it all.</span>
    </div>
  </div>
</footer>

"""

def toast():
    return """
<div class="toast" id="toast" role="status" aria-live="polite"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg><span></span></div>
"""

def newsletter_popup():
    return """
<div class="popup-scrim" id="popupScrim"></div>
<div class="newsletter-popup" id="newsletterPopup" role="dialog" aria-labelledby="npTitle">
  <button type="button" class="popup-close" onclick="closeNewsletterPopup()" aria-label="Close popup"><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
  <div class="np-img" id="newsletterPopupImg"></div>
  <div class="np-content">
    <div id="npForm">
      <span class="eyebrow">Welcome To The House</span>
      <h3 id="npTitle">Get 10% Off<br>Your First Order</h3>
      <p>Sign up for first dibs on new drops, festive edits and insider discounts.</p>
      <form class="np-form" onsubmit="submitNewsletter(event)">
        <input type="email" placeholder="Enter your email" aria-label="Your email" autocomplete="email" required>
        <button type="submit" class="btn btn-primary">Claim My 10%</button>
      </form>
      <button type="button" class="np-skip" onclick="closeNewsletterPopup()">No thanks, I will pay full price</button>
    </div>
    <div class="np-success" id="npSuccess">
      <span class="big-emoji">🤍</span>
      <h3>You're In!</h3>
      <p>Check your inbox for your code. Welcome to the House of Arshi family.</p>
    </div>
  </div>
</div>
"""

def scripts(asset_prefix="../assets/"):
    return f"""
<script src="{asset_prefix}data/products.data.js"></script>
<script src="{asset_prefix}data/site-structure.data.js"></script>
<script src="{asset_prefix}data/images.data.js"></script>
<script src="{asset_prefix}data/footer-legal.data.js"></script>
<script src="{asset_prefix}data/image-variants.data.js"></script>
<script src="{asset_prefix}api-client.js"></script>
<script src="{asset_prefix}app.js"></script>
<script src="{asset_prefix}modal.js"></script>

"""

def head(title, asset_prefix="../assets/"):
    root_prefix = asset_prefix[:-len("assets/")]
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#F8F4EC">
<title>{title}</title>
<link rel="icon" href="{root_prefix}favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="{root_prefix}apple-touch-icon.png">
<link rel="preload" href="{asset_prefix}fonts/playfair-display-v40-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{asset_prefix}fonts/outfit-v15-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{asset_prefix}style.css">
</head>
<body>
"""
