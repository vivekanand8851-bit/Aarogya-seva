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
  Star,
  BadgeCheck,
  HeartPulse,
  Stethoscope,
} from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SEO, { organizationJsonLd, websiteJsonLd } from '../components/SEO';
import { useApp } from '../context/AppContext';
import { CATEGORIES, FEATURES, BLOG_POSTS } from '../mock/mockData';
import SafeImage from '../components/SafeImage';

const ICONS = { Leaf, FlaskConical, Truck, ShieldCheck, BadgeIndianRupee, Undo2 };

export default function HomePage() {
  const { products } = useApp();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="bg-[#fbf7ec]">
      <SEO
        title="Aarogya Seva Ayurveda | Ayurvedic Wellness Products Online in India"
        description="Aarogya Seva Ayurveda is the online home of Aarogya Seva Ayurvedic wellness products in India. Explore Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products."
        url="/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <div className="bg-[#0f3d2e] text-white text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          <span className="font-semibold">FIRST ORDER: ₹400 OFF</span><span className="text-[#e6b64c] font-mono">AAROGYA400</span><span className="text-[#c4e0ce]">On orders ₹999+</span><span className="text-[#c4e0ce]">Free shipping ₹499+</span>
        </div>
      </div>
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
                  <SafeImage
                    src={c.image}
                    alt={c.name}
                    fallbackLabel={c.name}
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
          <span className="text-xs tracking-[3px] text-[#8a7a5a] uppercase">Aarogya Seva Ayurveda — Ayurvedic Wellness</span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d2e] mt-2">Aarogya Seva Ayurveda — Ayurvedic & Herbal Wellness Products in India</h2>
          <p className="text-[#4a4a4a] leading-relaxed mt-3 max-w-4xl">
            Aarogya Seva Ayurveda is the dedicated online destination for Aarogya Seva Ayurvedic wellness products in India. Customers may also search for the brand as “Aarogya Sewa” or “Aarogya Sewa Ayurveda”; these spellings refer to the same Aarogya Seva brand on this website. Explore Ashwagandha capsules, Shilajit capsules, Giloy capsules, Arjuna capsules and digestive wellness products with clear ingredient and product information before buying.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link to="/aarogya-seva-ayurveda" className="text-sm font-semibold text-[#0f3d2e] underline">About Aarogya Seva Ayurveda</Link><Link to="/ayurvedic/ashwagandha" className="text-sm font-semibold text-[#0f3d2e] underline">Ashwagandha guide</Link>
            <Link to="/ayurvedic/shilajit" className="text-sm font-semibold text-[#0f3d2e] underline">Shilajit guide</Link>
            <Link to="/shop" className="text-sm font-semibold text-[#0f3d2e] underline">Ayurvedic products</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8"><span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Find Your Wellness Focus</span><h2 className="font-serif text-3xl md:text-4xl text-[#0f3d2e] mt-2">Shop by Wellness Need</h2><p className="text-sm text-[#6a6a6a] mt-2">Start with what you want to support, then choose the right product.</p></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[['Stress & Sleep','Ashwagandha','/ayurvedic/ashwagandha'],['Daily Vitality','Shilajit','/ayurvedic/shilajit'],['Immunity Support','Giloy','/shop?category=immunity'],['Heart Wellness','Arjuna','/shop?category=heart'],['Digestive Wellness','Digestion','/shop?category=digestive'],['Piles Care','Piles Norm','/shop?category=piles']].map(([need,label,to]) => (
            <Link key={need} to={to} className="group bg-white border border-[#ede4cf] rounded-xl p-4 hover:border-[#e6b64c] hover:shadow-md transition"><div className="w-10 h-10 rounded-full bg-[#faf1dc] flex items-center justify-center text-[#0f3d2e] mb-3"><HeartPulse size={19}/></div><div className="text-xs text-[#8a7a5a]">{need}</div><div className="font-semibold text-[#0f3d2e] mt-1">{label}</div><div className="text-xs text-[#0f3d2e] mt-2 group-hover:underline">Explore →</div></Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#fffaf0] border border-[#e6d8b9] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"><div><span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Limited-time value</span><h2 className="font-serif text-3xl text-[#0f3d2e] mt-1">Today's Wellness Picks</h2></div><Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f3d2e]">View all offers <ArrowRight size={16}/></Link></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{products.filter((p) => p.discount || p.isBestseller).slice(0, 4).map((p) => <ProductCard key={`deal-${p.id}`} product={p}/>)}</div>
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
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  fallbackLabel={post.title}
                  fallbackType="photo"
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
          <p className="text-sm text-[#6a6a6a] mt-2">Get practical wellness tips and exclusive Aarogya Seva offers.</p>
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
