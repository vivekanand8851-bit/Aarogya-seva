import React, { useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Undo2,
  BadgeIndianRupee,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import SEO, { productJsonLd, breadcrumbJsonLd } from '../components/SEO';
import { normalizeImageUrl } from '../lib/imageUrl';
import { getProductSeo, PRODUCT_SEO_SLUGS, getProductSeoPath } from '../data/productSeo';
import { toast } from '../hooks/use-toast';

export default function ProductDetailPage({ seoUrl = false }) {
  const { slug, seoSlug } = useParams();
  const productSlug = seoUrl ? PRODUCT_SEO_SLUGS[seoSlug] : slug;
  const { products, addToCart, toggleWishlist, isInWishlist, user } = useApp();
  const product = products.find((p) => p.slug === productSlug);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const navigate = useNavigate();

  if (product && !seoUrl) {
    return <Navigate to={getProductSeoPath(product.slug)} replace />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-2xl text-[#0f3d2e]">Product not found</h2>
        <Link to="/shop" className="text-[#0f3d2e] underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const seo = getProductSeo(product.slug, product);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product.id, qty);
    toast({ title: 'Added to bag', description: `${qty} × ${product.name}` });
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    if (!user) {
      toast({ title: 'Please login to checkout' });
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-[#fbf7ec] pb-16">
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={`Aarogya Seva, Aarogya Sewa, ${seo.keywords}`}
        image={normalizeImageUrl(product.images?.[0])}
        type="product"
        url={getProductSeoPath(product.slug)}
        jsonLd={[\n          productJsonLd(product, getProductSeoPath(product.slug)),\n          breadcrumbJsonLd([\n            { name: 'Home', url: '/' },\n            { name: 'Shop', url: '/shop' },\n            { name: product.name, url: getProductSeoPath(product.slug) },\n          ]),\n        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-[#8a7a5a]">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{' '}
        <span className="text-[#0f3d2e]">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gradient-to-br from-white to-[#faf6ec] rounded-xl overflow-hidden border border-[#ede4cf] flex items-center justify-center p-8">
            <img
              src={normalizeImageUrl(product.images?.[imgIdx])}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center p-1.5 ${imgIdx === i ? 'border-[#0f3d2e]' : 'border-[#ede4cf]'}`}
              >
                <img src={normalizeImageUrl(img)} alt={`${product.name} image ${i + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className="inline-block bg-[#c84a3f] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
              {product.badge}
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-3">{product.name}</h1>
          {product.reviews > 0 && product.rating > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-[#e6b64c] text-[#e6b64c]' : 'text-[#e0d3b0]'}
                  />
                ))}
              </div>
              <span className="text-sm text-[#0f3d2e] font-semibold">{product.rating}</span>
              <span className="text-sm text-[#8a7a5a]">({product.reviews.toLocaleString()} reviews)</span>
            </div>
          )}

          <p className="text-[#4a4a4a] mt-4 leading-relaxed">{product.shortDesc}</p>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-bold text-[#0f3d2e]">₹{product.price.toLocaleString()}</span>
            <span className="text-lg text-[#a89573] line-through">₹{product.mrp.toLocaleString()}</span>
            <span className="text-sm font-semibold text-[#0a7a3f]">{product.discount}% OFF</span>
          </div>
          <p className="text-xs text-[#8a7a5a] mt-1">Inclusive of all taxes • Free shipping on this order</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border-2 border-[#0f3d2e] rounded-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-[#0f3d2e]"><Minus size={16} /></button>
              <span className="w-10 text-center font-semibold text-[#0f3d2e]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2 text-[#0f3d2e]"><Plus size={16} /></button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white font-semibold py-3.5 rounded-lg transition"
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-bold py-3.5 rounded-lg transition"
            >
              <Zap size={18} /> Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white transition"
            >
              <Heart size={18} fill={wished ? '#c84a3f' : 'none'} className={wished ? 'text-[#c84a3f]' : ''} />
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-white border border-[#ede4cf] rounded-xl p-5">
            <p className="text-xs text-[#8a7a5a] mb-3">Aarogya Seva Ayurveda • {seo.title}</p>
            <h4 className="font-semibold text-[#0f3d2e] mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#3a3a3a]">
                  <Check size={16} className="text-[#0a7a3f] mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {[
              { icon: Truck, label: 'Free Shipping' },
              { icon: BadgeIndianRupee, label: 'COD Available' },
              { icon: Undo2, label: '7-day Returns' },
              { icon: ShieldCheck, label: 'Quality & Care' },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-[#faf1dc] p-3 rounded-lg">
                <f.icon size={20} className="text-[#0f3d2e]" />
                <span className="text-[11px] font-medium text-[#0f3d2e] mt-1.5">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="border-b border-[#ede4cf] flex gap-6">
          {['description', 'ingredients', 'dosage'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize border-b-2 transition ${tab === t ? 'border-[#0f3d2e] text-[#0f3d2e]' : 'border-transparent text-[#8a7a5a]'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-6 text-[#3a3a3a] leading-relaxed max-w-3xl">
          {tab === 'description' && (
            <div className="space-y-6">
              <p>{seo.description}</p>
              <section>
                <h2 className="font-serif text-2xl text-[#0f3d2e] mb-3">Key Points in Hindi</h2>
                <ul className="list-disc pl-5 space-y-2">{seo.hindi.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
              <section>
                <h2 className="font-serif text-2xl text-[#0f3d2e] mb-3">Key Points in English</h2>
                <ul className="list-disc pl-5 space-y-2">{seo.english.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
              <p className="text-sm text-[#6b6253]">Traditional Ayurvedic context is provided for information only. Follow the product label and seek qualified healthcare advice for medical concerns.</p>
            </div>
          )}
          {tab === 'ingredients' && <p><span className="font-semibold">Ingredients:</span> {product.ingredients}</p>}
          {tab === 'dosage' && <p><span className="font-semibold">Recommended Dosage:</span> {product.dosage}</p>}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h3 className="font-serif text-2xl md:text-3xl text-[#0f3d2e] mb-6">You may also like</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
