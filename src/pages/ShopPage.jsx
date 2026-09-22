import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../mock/mockData';

export default function ShopPage() {
  const { products } = useApp();
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const activeCategory = params.get('category') || 'all';
  const q = params.get('q') || '';
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'discount') list.sort((a, b) => b.discount - a.discount);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, activeCategory, q, sort, priceRange]);

  const changeCategory = (id) => {
    const p = new URLSearchParams(search);
    if (id === 'all') p.delete('category');
    else p.set('category', id);
    navigate(`/shop?${p.toString()}`);
  };

  return (
    <div className="bg-[#fbf7ec] min-h-screen">
      <SEO
        title={q ? `Search: ${q}` : (activeCategory === 'all' ? 'All Products' : (CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Shop'))}
        description={`Shop ${activeCategory === 'all' ? 'authentic Ayurvedic supplements' : (CATEGORIES.find((c) => c.id === activeCategory)?.description || 'Ayurvedic products')} online at Aarogya Seva. Best prices, free shipping, AYUSH certified.`}
        url="/shop"
        noindex={Boolean(q) || activeCategory !== "all"}
      />
      <div className="bg-white border-b border-[#ede4cf]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#0f3d2e]">
            {q ? `Search: "${q}"` : activeCategory === 'all' ? 'All Products' : CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Shop'}
          </h1>
          <p className="text-sm text-[#8a7a5a] mt-1">{filtered.length} products available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Filter sidebar */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-6' : 'hidden lg:block'}`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-[#0f3d2e]">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X size={22} /></button>
            </div>
          )}

          <div className="bg-white rounded-xl border border-[#ede4cf] p-5">
            <h4 className="font-semibold text-[#0f3d2e] mb-4">Categories</h4>
            <div className="space-y-2">
              <button
                onClick={() => changeCategory('all')}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded ${activeCategory === 'all' ? 'bg-[#faf1dc] text-[#0f3d2e] font-semibold' : 'text-[#4a4a4a] hover:bg-[#faf6ec]'}`}
              >
                All Products
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => changeCategory(c.id)}
                  className={`block w-full text-left text-sm py-1.5 px-2 rounded ${activeCategory === c.id ? 'bg-[#faf1dc] text-[#0f3d2e] font-semibold' : 'text-[#4a4a4a] hover:bg-[#faf6ec]'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#ede4cf] p-5 mt-4">
            <h4 className="font-semibold text-[#0f3d2e] mb-4">Price Range</h4>
            <div className="flex items-center justify-between text-sm text-[#4a4a4a] mb-2">
              <span>₹0</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-[#0f3d2e]"
            />
          </div>
        </aside>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-[#0f3d2e] border border-[#ded1a8] rounded-lg px-4 py-2 bg-white"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className="ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-[#ded1a8] rounded-lg px-3 py-2 text-sm bg-white text-[#0f3d2e] outline-none focus:border-[#0f3d2e]"
              >
                <option value="popular">Sort: Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-[#ede4cf] rounded-xl p-16 text-center">
              <p className="text-[#8a7a5a]">No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
