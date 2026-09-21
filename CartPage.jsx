import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { cartItems, cartSubtotal, cartMrpTotal, cartSavings, updateQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] bg-[#fbf7ec] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white border border-[#ede4cf] flex items-center justify-center mx-auto">
            <ShoppingBag size={30} className="text-[#0f3d2e]" />
          </div>
          <h2 className="font-serif text-2xl text-[#0f3d2e] mt-6">Your bag is empty</h2>
          <p className="text-[#6a6a6a] mt-2">Looks like you haven’t added anything yet.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 mt-6 bg-[#0f3d2e] hover:bg-[#0a2a20] text-white font-semibold px-6 py-3 rounded-lg transition">
            Shop Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const shipping = cartSubtotal >= 499 ? 0 : 49;
  const total = cartSubtotal + shipping;

  return (
    <div className="bg-[#fbf7ec] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl text-[#0f3d2e]">Your Bag ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-[#ede4cf] rounded-xl p-4 flex gap-4">
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 md:w-28 md:h-28 object-contain bg-gradient-to-br from-white to-[#faf6ec] rounded-lg flex-shrink-0 p-2" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.slug}`} className="font-semibold text-[#0f3d2e] hover:text-[#1a5c40]">{item.name}</Link>
                  <p className="text-xs text-[#8a7a5a] mt-1 line-clamp-1">{item.shortDesc}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-bold text-[#0f3d2e]">₹{item.price.toLocaleString()}</span>
                    <span className="text-xs text-[#a89573] line-through">₹{item.mrp.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-[#0a7a3f]">{item.discount}% OFF</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#ded1a8] rounded-lg">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1.5 text-[#0f3d2e]"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-semibold text-[#0f3d2e]">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1.5 text-[#0f3d2e]"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-[#c84a3f] hover:text-[#a83a2f] text-sm flex items-center gap-1">
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white border border-[#ede4cf] rounded-xl p-6 h-fit sticky top-24">
            <h3 className="font-serif text-xl text-[#0f3d2e] mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#6a6a6a]">MRP Total</span><span className="text-[#0f3d2e]">₹{cartMrpTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Discount</span><span className="text-[#0a7a3f]">- ₹{cartSavings.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Subtotal</span><span className="text-[#0f3d2e] font-semibold">₹{cartSubtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#6a6a6a]">Shipping</span><span className={shipping === 0 ? 'text-[#0a7a3f]' : 'text-[#0f3d2e]'}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              {shipping > 0 && (
                <p className="text-xs text-[#8a7a5a] bg-[#faf1dc] p-2 rounded">Add ₹{499 - cartSubtotal} more to unlock FREE shipping</p>
              )}
              <div className="border-t border-[#ede4cf] pt-3 flex justify-between text-base"><span className="font-semibold text-[#0f3d2e]">Total</span><span className="font-bold text-[#0f3d2e]">₹{total.toLocaleString()}</span></div>
              <p className="text-xs text-[#0a7a3f] font-semibold flex items-center gap-1"><Tag size={12} /> You save ₹{cartSavings.toLocaleString()} on this order</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-5 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-bold py-3.5 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
            <Link to="/shop" className="block text-center text-sm text-[#0f3d2e] hover:underline mt-3">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
