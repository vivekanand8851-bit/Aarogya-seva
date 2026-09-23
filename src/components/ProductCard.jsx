import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import { normalizeImageUrl } from '../lib/imageUrl';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, user } = useApp();
  const wished = isInWishlist(product.id);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    toast({ title: 'Added to bag', description: product.name });
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    if (!user) {
      toast({ title: 'Please login to checkout', description: 'Redirecting...' });
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative bg-white rounded-xl overflow-hidden border border-[#ede4cf] hover:border-[#c9b989] hover:shadow-[0_10px_30px_-10px_rgba(15,61,46,0.25)] transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white to-[#faf6ec] flex items-center justify-center p-4">
        <img
          src={normalizeImageUrl(product.images?.[0])}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#c84a3f] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleWish}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition ${wished ? 'text-[#c84a3f]' : 'text-[#6a5a3a]'}`}
          aria-label="wishlist"
        >
          <Heart size={16} fill={wished ? '#c84a3f' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-[#0f3d2e] leading-snug line-clamp-2 min-h-[44px]">
          {product.name}
        </h3>
        {product.reviews > 0 && product.rating > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#8a7a5a]">
            <Star size={13} className="fill-[#e6b64c] text-[#e6b64c]" />
            <span className="font-semibold text-[#0f3d2e]">{product.rating}</span>
            <span>({product.reviews.toLocaleString()})</span>
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold text-[#0f3d2e]">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-[#a89573] line-through">₹{product.mrp.toLocaleString()}</span>
          <span className="text-xs font-semibold text-[#0a7a3f]">{product.discount}% OFF</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 border-2 border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white text-xs font-semibold py-2.5 rounded-lg transition"
          >
            <ShoppingBag size={14} />
            Add
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1.5 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] text-xs font-bold py-2.5 rounded-lg transition"
          >
            <Zap size={14} />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
