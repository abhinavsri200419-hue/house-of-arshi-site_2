/* ============================================
   HOUSE OF ARSHI - API Client
   All calls to the FastAPI backend go through here.
   ============================================ */

// TODO before launch: replace with your real deployed backend URL
// (e.g. "https://house-of-arshi-api.onrender.com")
const API_BASE_URL = "http://localhost:8000";

const TOKEN_KEY = "hoa_token";
const CUSTOMER_KEY = "hoa_customer";
const GUEST_CART_KEY = "hoa_guest_cart";
const GUEST_WISHLIST_KEY = "hoa_guest_wishlist";
const REDIRECT_AFTER_LOGIN_KEY = "hoa_redirect_after_login";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setSession(token, customer) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CUSTOMER_KEY);
}

function getCachedCustomer() {
  const raw = localStorage.getItem(CUSTOMER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function pagesPrefix() {
  return window.location.pathname.indexOf('/pages/') !== -1 ? '' : 'pages/';
}

function goToLogin() {
  clearSession();
  window.location.href = pagesPrefix() + 'login.html';
}

/**
 * Called right after a successful login/signup. If there's a guest cart or
 * wishlist sitting in localStorage (built up while the person was browsing
 * without an account), push each item into their new account via the real
 * API, then clear the local copies so they don't get merged twice.
 * Safe to call even if there's nothing to merge.
 */
async function mergeGuestDataIntoAccount() {
  const guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || "[]");
  for (const item of guestCart) {
    try {
      await CartAPI.add(item.id, item.size, item.qty);
    } catch (err) {
      console.error("Could not merge guest cart item", item, err);
    }
  }
  localStorage.removeItem(GUEST_CART_KEY);

  const guestWishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]");
  for (const item of guestWishlist) {
    try {
      await WishlistAPI.add(item.id);
    } catch (err) {
      console.error("Could not merge guest wishlist item", item, err);
    }
  }
  localStorage.removeItem(GUEST_WISHLIST_KEY);
}

/**
 * Call after a successful login/signup to send the person back where they
 * came from (e.g. checkout), merging any guest cart/wishlist first.
 */
async function completeLoginRedirect(defaultDestination) {
  const redirect = sessionStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);
  sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);
  await mergeGuestDataIntoAccount();
  window.location.href = redirect || defaultDestination;
}

/**
 * Core request helper. Throws an Error with a readable message on failure.
 * On a 401 (expired/invalid token), clears the session and redirects to
 * login -- matches the site's "account required to browse" design.
 */
async function apiRequest(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (auth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error("Could not reach the server. Please check your connection and try again.");
  }

  if (response.status === 401 && auth) {
    goToLogin();
    throw new Error("Please log in again.");
  }

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message = (data && data.detail) || `Something went wrong (${response.status}).`;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return data;
}

// ---------- Auth ----------
const AuthAPI = {
  async signup(name, email, phone, password) {
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      auth: false,
      body: { name, email, phone, password },
    });
    setSession(data.access_token, data.customer);
    return data.customer;
  },

  async login(email, password) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      auth: false,
      body: { email, password },
    });
    setSession(data.access_token, data.customer);
    return data.customer;
  },

  async me() {
    return apiRequest("/auth/me");
  },

  logout() {
    goToLogin();
  },
};

// ---------- Products ----------
const ProductsAPI = {
  async list(category) {
    const qs = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(`/products${qs}`, { auth: false });
  },
  async get(productId) {
    return apiRequest(`/products/${encodeURIComponent(productId)}`, { auth: false });
  },
};

// ---------- Cart ----------
const CartAPI = {
  async list() {
    return apiRequest("/cart");
  },
  async add(productId, size, qty = 1) {
    return apiRequest("/cart", { method: "POST", body: { product_id: productId, size, qty } });
  },
  async updateQty(itemId, qty) {
    return apiRequest(`/cart/${itemId}`, { method: "PATCH", body: { qty } });
  },
  async remove(itemId) {
    return apiRequest(`/cart/${itemId}`, { method: "DELETE" });
  },
};

// ---------- Wishlist ----------
const WishlistAPI = {
  async list() {
    return apiRequest("/wishlist");
  },
  async add(productId) {
    return apiRequest("/wishlist", { method: "POST", body: { product_id: productId } });
  },
  async remove(productId) {
    return apiRequest(`/wishlist/${encodeURIComponent(productId)}`, { method: "DELETE" });
  },
};

// ---------- Orders ----------
const OrdersAPI = {
  async create({ customer_name, email, phone, shipping_address, items }) {
    return apiRequest("/orders", {
      method: "POST",
      body: { customer_name, email, phone, shipping_address, items },
    });
  },
  async verify({ order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    return apiRequest("/orders/verify", {
      method: "POST",
      body: { order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature },
    });
  },
  async mine() {
    return apiRequest("/orders/mine");
  },
};
