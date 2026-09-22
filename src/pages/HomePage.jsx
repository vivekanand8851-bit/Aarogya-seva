import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  FlaskConical,
  Truck,
  ShieldCheck,
  BadgeIndianRupee,
  Undo2,
  ArrowRight,
} from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SEO, { organizationJsonLd, websiteJsonLd } from '../components/SEO';
import { useApp } from '../context/AppContext';
import { CATEGORIES, FEATURES, BLOG_POSTS } from '../mock/mockData';

const ICONS = { Leaf, FlaskConical, Truck, ShieldCheck, BadgeIndianRupee, Undo2 };

export default function HomePage() {
  const { products } = useApp();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="bg-[#fbf7ec]">
      <SEO
        title="Aarogya Seva Ayurvedic Wellness Products Online in India"
        description="Aarogya Seva is an Indian Ayurvedic wellness brand. Explore Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products and shop online across India."
        url="/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <Hero />

      {/* Features strip */}
      <div className="bg-white border-b border-[#ede4cf]">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] || Leaf;
            return (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#faf1dc] flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#0f3d2e]" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-[#0f3d2e]">{f.title}</div>
                  <div className="text-[11px] text-[#8a7a5a]">{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shop by category */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Discover</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">Shop by Category</h2>
          <div className="w-16 h-[3px] bg-[#e6b64c] mx-auto mt-4 rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/shop?category=${c.id}`}
              className="group text-center"
            >
              <div className="aspect-square rounded-full overflow-hidden bg-white border-2 border-[#ede4cf] group-hover:border-[#e6b64c] transition p-1 shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#faf6ec] to-white flex items-center justify-center p-3">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#0f3d2e]">{c.name}</h3>
              <p className="text-[11px] text-[#8a7a5a] mt-0.5 line-clamp-2">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand relevance */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-white border border-[#ede4cf] rounded-2xl p-6 md:p-8">
          <span className="text-xs tracking-[3px] text-[#8a7a5a] uppercase">Aarogya Seva Ayurvedic Wellness</span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d2e] mt-2">Ayurvedic & Herbal Wellness Products in India</h2>
          <p className="text-[#4a4a4a] leading-relaxed mt-3 max-w-4xl">
            Explore Ayurvedic wellness products online in India, including Ashwagandha capsules, Shilajit capsules, Giloy capsules, Arjuna capsules and digestive wellness products. Aarogya Seva focuses on traditional herbal ingredients, clear labels and straightforward product information so you can compare products before buying.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link to="/ayurvedic/ashwagandha" className="text-sm font-semibold text-[#0f3d2e] underline">Ashwagandha guide</Link>
            <Link to="/ayurvedic/shilajit" className="text-sm font-semibold text-[#0f3d2e] underline">Shilajit guide</Link>
            <Link to="/shop" className="text-sm font-semibold text-[#0f3d2e] underline">Ayurvedic products</Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Featured selection</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">Featured Products</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d2e] hover:text-[#e6b64c]">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f3d2e] to-[#1a5c40] p-8 md:p-14">
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#e6b64c]/15" />
          <div className="absolute -right-4 -top-10 w-40 h-40 rounded-full bg-[#e6b64c]/10" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-[#e6b64c] tracking-[4px] text-xs uppercase">Limited Offer</span>
            <h3 className="font-serif text-white text-3xl md:text-5xl mt-3 leading-tight">
              Extra ₹400 OFF <br />
              <span className="text-[#e6b64c]">on your first order</span>
            </h3>
            <p className="text-[#c4e0ce] mt-4 max-w-md">
              Use code <span className="font-mono bg-white/10 px-2 py-1 rounded border border-white/20">AAROGYA400</span> at checkout • Min. purchase ₹999
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 bg-[#e6b64c] hover:bg-[#d4a238] text-[#0f3d2e] font-semibold px-6 py-3 rounded-lg transition"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Fresh Launch</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">New Arrivals</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d2e] hover:text-[#e6b64c]">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Verified customer reviews can be added here when review data is connected. */}

      {/* Herbal guides */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Learn Before You Buy</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">Ayurvedic Wellness Guides</h2>
          <p className="text-sm text-[#6a6a6a] max-w-2xl mx-auto mt-3">Simple, evidence-aware guides to help you understand popular herbs and compare supplements responsibly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <Link to="/ayurvedic/ashwagandha" className="bg-white border border-[#ede4cf] rounded-xl p-6 hover:shadow-lg transition group">
            <span className="text-[11px] tracking-widest uppercase text-[#8a7a5a]">Guide</span>
            <h3 className="font-serif text-2xl text-[#0f3d2e] mt-2 group-hover:text-[#1a5c40]">Ashwagandha: Uses & Buying Guide</h3>
            <p className="text-sm text-[#6a6a6a] mt-2">Learn what to check on an Ashwagandha supplement label and how traditional use differs from modern marketing claims.</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0f3d2e] mt-4">Read guide <ArrowRight size={15} /></span>
          </Link>
          <Link to="/ayurvedic/shilajit" className="bg-white border border-[#ede4cf] rounded-xl p-6 hover:shadow-lg transition group">
            <span className="text-[11px] tracking-widest uppercase text-[#8a7a5a]">Guide</span>
            <h3 className="font-serif text-2xl text-[#0f3d2e] mt-2 group-hover:text-[#1a5c40]">Shilajit: Quality & Buying Guide</h3>
            <p className="text-sm text-[#6a6a6a] mt-2">Understand Shilajit formats, labeling, sourcing and the questions worth asking before buying.</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0f3d2e] mt-4">Read guide <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Wellness Journal</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">From Our Blog</h2>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#0f3d2e] hover:text-[#e6b64c]">
            All Articles <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white rounded-xl overflow-hidden border border-[#ede4cf] hover:shadow-lg transition"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold tracking-widest text-[#8a7a5a] uppercase">{post.category}</span>
                <h3 className="font-serif text-lg text-[#0f3d2e] mt-2 group-hover:text-[#1a5c40] transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6a6a6a] mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-[#8a7a5a]">
                  <span>{post.date}</span>•<span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white border border-[#ede4cf] rounded-2xl p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-[#0f3d2e]">Join the Aarogya Family</h3>
          <p className="text-sm text-[#6a6a6a] mt-2">Get wellness tips, exclusive offers & ₹200 off on your next order.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              import('../hooks/use-toast').then(({ toast }) =>
                toast({ title: 'Subscribed!', description: 'Check your inbox for a welcome coupon.' })
              );
            }}
            className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 border border-[#ded1a8] rounded-lg px-4 py-3 outline-none focus:border-[#0f3d2e] bg-[#faf6ec]"
            />
            <button
              type="submit"
              className="bg-[#0f3d2e] hover:bg-[#0a2a20] text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
