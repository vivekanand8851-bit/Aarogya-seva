import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Tag, Leaf } from 'lucide-react';
import SEO, { faqJsonLd, breadcrumbJsonLd } from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../mock/mockData';
import { getProductSeoPath } from '../data/productSeo';

const P = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const DATA = {
  giloy: {
    path: '/ayurvedic/giloy',
    title: 'Giloy Capsules India | Guduchi Extract & Buying Guide',
    description: 'Explore Giloy (Guduchi) extract capsules in India, ingredient details, traditional Ayurvedic context, serving information and practical buying guidance from Aarogya Seva.',
    keywords: 'Giloy capsules India, Guduchi capsules India, Giloy extract, Tinospora cordifolia, Ayurvedic Giloy, Giloy supplement India',
    eyebrow: 'GILOY / GUDUCHI',
    heading: 'Giloy Capsules in India — Clear Product Information Before You Buy',
    intro: 'Explore Giloy (Guduchi) as a traditional Ayurvedic botanical and compare a clearly labelled Aarogya Seva Giloy extract product.',
    productIds: ['giloy-extract'],
    guide: '/blog/ashwagandha-benefits',
    guideLabel: 'Read our responsible herbal buying guides',
    points: ['Giloy (Tinospora cordifolia) stem extract', 'Clear serving and ingredient information', 'Traditional Ayurvedic context, without exaggerated medical promises'],
    faq: [
      ['What is Giloy?', 'Giloy, also known as Guduchi, is the common name used for Tinospora cordifolia, a botanical with a long history in Ayurveda.'],
      ['What should I check before buying Giloy capsules?', 'Check the botanical name, plant part, amount per serving, manufacturer information, batch details and directions for use.'],
      ['How should I use Aarogya Seva Giloy capsules?', 'Follow the product label and serving directions. If you take medicines or manage a health condition, ask a qualified healthcare professional before using supplements.'],
    ],
  },
  digestion: {
    path: '/ayurvedic/digestion',
    title: 'Digestive Wellness Products India | Churan & Herbal Products',
    description: 'Explore digestive wellness products from Aarogya Seva, including GASS OFF Churan and practical information for comparing ingredients, labels and serving directions.',
    keywords: 'digestive wellness products India, digestive churan India, Gass Off churan, digestion support products, Ayurvedic digestive products',
    eyebrow: 'DIGESTIVE WELLNESS',
    heading: 'Digestive Wellness Products — Compare Ingredients & Labels',
    intro: 'A practical starting point for customers looking for digestive wellness products, with clear product information and label-first buying guidance.',
    productIds: ['gass-off-churan', 'piles-norm'],
    guide: '/ayurvedic',
    guideLabel: 'Explore all Ayurvedic wellness guides',
    points: ['GASS OFF Churan 100g product information', 'Ingredient and serving details before purchase', 'General wellness information — not a substitute for medical diagnosis or treatment'],
    faq: [
      ['What is GASS OFF Churan?', 'GASS OFF is listed by Aarogya Seva as a 100g food supplement in churan format. Review the pack ingredient panel and directions before use.'],
      ['Can a supplement replace medical treatment for digestive symptoms?', 'No. Persistent, severe or concerning symptoms should be discussed with a qualified healthcare professional.'],
      ['How do I compare digestive products?', 'Compare ingredients, serving size, manufacturer information, batch details, directions and realistic product positioning rather than choosing only on discount.'],
    ],
  },
  'mens-wellness': {
    path: '/ayurvedic/mens-wellness',
    title: "Men's Wellness Products India | Shilajit, Ashwagandha & Herbal Blends",
    description: "Explore Aarogya Seva men's wellness products including Shilajeet, Ashwagandha and DIG-UP. Compare ingredients, traditional context, serving information and product labels.",
    keywords: "men's wellness products India, Shilajit capsules India, Ashwagandha capsules India, herbal men's wellness, Ayurvedic men wellness",
    eyebrow: "MEN'S WELLNESS",
    heading: "Men's Wellness — Build a Simple Ayurvedic Routine",
    intro: 'Compare products commonly explored for men’s general wellness, including Shilajeet, Ashwagandha and a multi-herb formulation.',
    productIds: ['shilajeet-caps', 'ashwagandha-caps', 'dig-up', 'combo-shil-ashwa'],
    guide: '/ayurvedic/shilajit',
    guideLabel: 'Read the Shilajit quality guide',
    points: ['Purified Shilajeet extract', 'Ashwagandha root extract', 'Multi-herb DIG-UP formulation', 'Combo option for customers comparing two products'],
    faq: [
      ['Which product should I compare first?', 'Start with the ingredient and serving information. Shilajeet, Ashwagandha and DIG-UP are different formulations and should not be treated as interchangeable.'],
      ['Are these products medicines?', 'They are presented as Ayurvedic or herbal wellness products. They should not be used as a substitute for prescribed treatment.'],
      ['What should I check before buying a men’s wellness supplement?', 'Check ingredients, amount per serving, manufacturer details, batch information, directions and whether the product claims are realistic and clearly described.'],
    ],
  },
  'ayurvedic-products-india': {
    path: '/ayurvedic-products-india',
    title: 'Ayurvedic Products Online in India | Aarogya Seva',
    description: 'Shop Aarogya Seva Ayurvedic wellness products online in India. Explore Ashwagandha, Shilajit, Giloy, Arjuna, digestive wellness products and combos with clear product information.',
    keywords: 'Ayurvedic products online India, Ayurvedic products India, herbal products online India, Ayurvedic supplements India, Aarogya Seva products',
    eyebrow: 'AYURVEDIC PRODUCTS INDIA',
    heading: 'Ayurvedic Products Online in India',
    intro: 'Browse a focused catalogue of Ayurvedic and herbal wellness products with transparent ingredient, serving and product information.',
    productIds: ['ashwagandha-caps', 'shilajeet-caps', 'giloy-extract', 'arjuna-capsules', 'gass-off-churan', 'combo-shil-ashwa'],
    guide: '/ayurvedic',
    guideLabel: 'Learn how to compare herbal supplements',
    points: ['Ashwagandha, Shilajeet, Giloy and Arjuna', 'Digestive wellness and combo options', 'Pan-India online ordering with clear product pages'],
    faq: [
      ['What Ayurvedic products can I buy from Aarogya Seva?', 'The catalogue includes Ashwagandha, Shilajeet, Giloy, Arjuna, digestive wellness products and selected combinations.'],
      ['How do I choose an Ayurvedic supplement online?', 'Compare the botanical identity, plant part, amount per serving, ingredients, manufacturer information, directions and return or support information.'],
      ['Does Aarogya Seva claim to treat diseases?', 'The product pages are positioned around Ayurvedic and herbal wellness. Supplements should not be treated as substitutes for diagnosis or treatment by a qualified healthcare professional.'],
    ],
  },
  offers: {
    path: '/offers',
    title: 'Aarogya Seva Offers | ₹400 First Order Discount on ₹999+',
    description: 'Shop current Aarogya Seva wellness offers. Get ₹400 off your first order of ₹999 or more with code AAROGYA400, subject to eligibility and checkout validation.',
    keywords: 'Aarogya Seva offers, Aarogya Seva coupon, AAROGYA400, Ayurvedic offers India, first order discount Ayurvedic products',
    eyebrow: 'CURRENT OFFER',
    heading: 'First Order Offer — ₹400 OFF on ₹999+',
    intro: 'Use the current first-order offer to make your first Aarogya Seva purchase more compelling. The offer is shown at checkout and is subject to eligibility.',
    productIds: ['combo-shil-ashwa', 'shilajeet-caps', 'ashwagandha-caps', 'arjuna-capsules'],
    guide: '/shop',
    guideLabel: 'Shop all products',
    points: ['Coupon: AAROGYA400', '₹400 discount on eligible first orders of ₹999+', 'Free shipping shown for orders of ₹499+'],
    faq: [
      ['What is the Aarogya Seva first-order coupon?', 'The current website offer is AAROGYA400 for ₹400 off an eligible first order of ₹999 or more, subject to checkout validation.'],
      ['Can an existing customer use the first-order offer?', 'No. It is intended for eligible first orders only. Final eligibility is checked at checkout.'],
      ['Where can I see the offer applied?', 'Enter the coupon at checkout on an eligible order. The final payable amount and eligibility are shown before placing the order.'],
    ],
  },
};

export default function CommercialLandingPage({ type }) {
  const data = DATA[type];
  if (!data) return null;
  const products = data.productIds.map((id) => P[id]).filter(Boolean);
  const faqs = data.faq.map(([question, answer]) => ({ question, answer }));
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: data.heading, url: data.path },
    ]),
    faqJsonLd(faqs, data.path),
  ];

  return (
    <div className="bg-[#fbf7ec] min-h-screen">
      <SEO title={data.title} description={data.description} keywords={data.keywords} url={data.path} jsonLd={jsonLd} />
      <div className="bg-[#0f3d2e] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2.5 text-center text-xs md:text-sm font-semibold">
          FIRST ORDER: ₹400 OFF • CODE <span className="text-[#e6b64c]">AAROGYA400</span> • ON ORDERS ₹999+
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-[#8a7a5a]">
        <Link to="/">Home</Link> <span className="mx-1">/</span> <span className="text-[#0f3d2e]">{data.heading}</span>
      </div>

      <header className="max-w-6xl mx-auto px-4 pt-8 pb-10 md:pt-14 md:pb-14">
        <span className="text-xs tracking-[3px] text-[#8a7a5a] uppercase">{data.eyebrow}</span>
        <h1 className="font-serif text-4xl md:text-6xl text-[#0f3d2e] mt-3 max-w-4xl leading-tight">{data.heading}</h1>
        <p className="text-[#4a4a4a] mt-5 max-w-3xl text-base md:text-lg leading-relaxed">{data.intro}</p>
        <div className="flex flex-wrap gap-3 mt-7">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#e6b64c] text-[#0f3d2e] font-bold px-6 py-3 rounded-lg">
            Shop Products <ArrowRight size={17} />
          </Link>
          <Link to={data.guide} className="inline-flex items-center gap-2 border-2 border-[#0f3d2e] text-[#0f3d2e] font-semibold px-6 py-3 rounded-lg">
            {data.guideLabel}
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          [Leaf, 'Traditional ingredients', 'Clear botanical and formulation context.'],
          [CheckCircle2, 'Label-first buying', 'Compare serving and ingredient information.'],
          [ShieldCheck, 'Responsible positioning', 'No promise of diagnosis or guaranteed treatment.'],
          [Truck, 'Simple ordering', 'Browse, add to cart and review checkout details.'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="bg-white border border-[#ede4cf] rounded-xl p-5">
            <Icon size={22} className="text-[#0f3d2e]" />
            <h2 className="font-semibold text-[#0f3d2e] mt-3">{title}</h2>
            <p className="text-sm text-[#6a6a6a] mt-1 leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-[#f2ead8] rounded-2xl p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d2e]">Why start here?</h2>
          <div className="grid md:grid-cols-2 gap-3 mt-5">
            {data.points.map((point) => (
              <div key={point} className="flex gap-3 items-start bg-white/70 rounded-lg p-4">
                <CheckCircle2 size={19} className="text-[#0f3d2e] mt-0.5 shrink-0" />
                <span className="text-sm text-[#3f3f3f]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="text-xs tracking-[2px] text-[#8a7a5a] uppercase">SHOP THIS COLLECTION</span>
            <h2 className="font-serif text-3xl text-[#0f3d2e] mt-1">Popular choices</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-[#0f3d2e] inline-flex items-center gap-1">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
            <Tag size={20} className="text-[#0f3d2e}" />
            <h2 className="font-semibold text-[#0f3d2e] mt-3">Offer clarity</h2>
            <p className="text-sm text-[#666] mt-1">See product price, MRP, discount and checkout total before ordering.</p>
          </div>
          <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
            <ShieldCheck size={20} className="text-[#0f3d2e]" />
            <h2 className="font-semibold text-[#0f3d2e] mt-3">Product transparency</h2>
            <p className="text-sm text-[#666] mt-1">Product pages provide ingredient, serving and general-use information.</p>
          </div>
          <div className="bg-white border border-[#ede4cf] rounded-xl p-5">
            <Truck size={20} className="text-[#0f3d2e]" />
            <h2 className="font-semibold text-[#0f3d2e] mt-3">Shipping</h2>
            <p className="text-sm text-[#666] mt-1">The site currently displays free shipping for orders of ₹499 or more.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white border border-[#ede4cf] rounded-2xl p-6 md:p-10">
          <h2 className="font-serif text-3xl text-[#0f3d2e]">Frequently asked questions</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#0f3d2e]">{faq.question}</h3>
                <p className="text-sm text-[#555] mt-1 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center pb-16">
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#0f3d2e] text-white font-semibold px-7 py-3 rounded-lg">
          Browse Aarogya Seva <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
