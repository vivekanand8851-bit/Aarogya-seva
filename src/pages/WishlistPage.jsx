import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, getProduct } = useApp();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="bg-[#fbf7ec] min-h-[60vh] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0f3d2e]">My Wishlist</h1>
        <p className="text-sm text-[#8a7a5a] mt-1">{items.length} products saved</p>

        {items.length === 0 ? (
          <div className="bg-white border border-[#ede4cf] rounded-xl p-16 text-center mt-8">
            <Heart size={40} className="text-[#e6b64c] mx-auto" />
            <p className="text-[#6a6a6a] mt-4">Your wishlist is empty.</p>
            <Link to="/shop" className="inline-block mt-4 bg-[#0f3d2e] text-white px-6 py-2.5 rounded-lg font-semibold">Shop Now</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
