import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_LOGO } from '../mock/mockData';
import { getProductSeoPath } from '../data/productSeo';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?category=heart-health', label: 'Heart' },
  { to: '/shop?category=immunity', label: 'Immunity' },
  { to: '/shop?category=mens-wellness', label: "Men's Wellness" },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { cartCount, wishlist, user, products } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered =
    query.length > 1
      ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
      : [];

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8e0d1]">
      <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
        <button
          className="lg:hidden text-[#0f3d2e]"
          onClick={() => setMobileOpen(true)}
          aria-label="menu"
        >
          <Menu size={26} />
        </button>

        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={BRAND_LOGO}
            alt="Aarogya Seva"
            className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-[20px] font-semibold text-[#0f3d2e]">Aarogya Seva</span>
            <span className="text-[10px] tracking-[3px] text-[#8a7a5a] uppercase">Aapki Sehat, Hamari Seva</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              className="text-[13px] font-medium tracking-wide text-[#2a2a2a] hover:text-[#0f3d2e] relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#e6b64c] hover:after:w-full after:transition-all"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            className="p-2 hover:bg-[#f6efdf] rounded-full transition"
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="search"
          >
            <Search size={20} className="text-[#0f3d2e]" />
          </button>
          <Link
            to={user ? '/account' : '/login'}
            className="p-2 hover:bg-[#f6efdf] rounded-full transition hidden sm:block"
            aria-label="account"
          >
            <User size={20} className="text-[#0f3d2e]" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:bg-[#f6efdf] rounded-full transition relative" aria-label="wishlist">
            <Heart size={20} className="text-[#0f3d2e]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#c84a3f] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="p-2 hover:bg-[#f6efdf] rounded-full transition relative" aria-label="cart">
            <ShoppingBag size={20} className="text-[#0f3d2e]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#e6b64c] text-[#0f3d2e] text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-[#e8e0d1] bg-[#faf6ec]">
          <form
            onSubmit={submitSearch}
            className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3"
          >
            <Search size={18} className="text-[#8a7a5a]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Ashwagandha, Shilajit, Giloy..."
              className="flex-1 bg-transparent outline-none text-[#0f3d2e] placeholder:text-[#a89573]"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-[#8a7a5a] hover:text-[#0f3d2e]"
            >
              <X size={18} />
            </button>
          </form>
          {filtered.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 pb-3">
              <div className="bg-white rounded-lg border border-[#e8e0d1] overflow-hidden shadow-sm">
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    to={getProductSeoPath(p.slug)}
                    className="flex items-center gap-3 p-3 hover:bg-[#faf6ec] border-b last:border-0 border-[#e8e0d1]"
                    onClick={() => setSearchOpen(false)}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#0f3d2e]">{p.name}</div>
                      <div className="text-xs text-[#8a7a5a]">₹{p.price} · {p.discount}% off</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-xl text-[#0f3d2e]">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={22} className="text-[#0f3d2e]" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 border-b border-[#f0e8d5] text-[#0f3d2e] font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
