import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/api';
import { PRODUCTS as CATALOG_PRODUCTS } from '../mock/mockData';

const AppContext = createContext(null);

const KEYS = {
  cart: 'aarogya_cart',
  wishlist: 'aarogya_wishlist',
  token: 'aarogya_token',
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(KEYS.cart) || '[]'));
      setWishlist(JSON.parse(localStorage.getItem(KEYS.wishlist) || '[]'));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const data = await api.listProducts();
      // Keep storefront product imagery available even if an older DB record has no images.
      // API data remains authoritative for price/stock; catalog data supplies only missing images.
      const normalized = data.map((p) => {
        const catalog = CATALOG_PRODUCTS.find((x) => x.slug === p.slug || x.id === p.slug || x.id === p.id);
        const hasImages = Array.isArray(p.images) && p.images.some((img) => typeof img === 'string' && img.trim());
        return hasImages || !catalog?.images?.length ? p : { ...p, images: catalog.images };
      });
      setProducts(normalized);
    } catch (e) {
      console.error('Load products failed', e);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Restore session
  const loadMe = useCallback(async () => {
    const token = localStorage.getItem(KEYS.token);
    if (!token) {
      setAuthLoading(false);
      return;
    }
    try {
      const me = await api.me();
      setUser(me);
    } catch {
      localStorage.removeItem(KEYS.token);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadMe();
  }, [loadProducts, loadMe]);

  // Auth
  const signup = async (name, email, password, phone = '') => {
    const res = await api.signup({ name, email, password, phone });
    localStorage.setItem(KEYS.token, res.token);
    setUser(res.user);
    return res.user;
  };
  const login = async (identifier, password) => {
    const res = await api.login({ identifier, password });
    localStorage.setItem(KEYS.token, res.token);
    setUser(res.user);
    return res.user;
  };
  const logout = () => {
    localStorage.removeItem(KEYS.token);
    setUser(null);
  };
  const refreshUser = async () => {
    try {
      const me = await api.me();
      setUser(me);
    } catch {}
  };

  // Cart / Wishlist
  const getProduct = (idOrSlug) => products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

  const addToCart = (productId, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.productId === productId);
      if (ex) return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { productId, qty }];
    });
  };
  const updateQty = (productId, qty) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  };
  const removeFromCart = (productId) => setCart((prev) => prev.filter((i) => i.productId !== productId));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isInWishlist = (id) => wishlist.includes(id);

  const cartItems = cart.map((c) => {
    const p = getProduct(c.productId);
    return p ? { ...p, qty: c.qty } : null;
  }).filter(Boolean);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartSubtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartMrpTotal = cartItems.reduce((s, i) => s + i.mrp * i.qty, 0);
  const cartSavings = cartMrpTotal - cartSubtotal;

  return (
    <AppContext.Provider
      value={{
        products,
        loadingProducts,
        loadProducts,
        getProduct,

        cart,
        cartItems,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartSavings,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,

        wishlist,
        toggleWishlist,
        isInWishlist,

        user,
        authLoading,
        signup,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
