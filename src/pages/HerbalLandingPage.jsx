import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, ShieldCheck, Leaf, BookOpen } from 'lucide-react';

const DATA = {
  hub: {
    title: 'Aarogya Seva Ayurvedic Wellness Products & Herbal Guides',
    description: 'Explore Aarogya Seva Ayurvedic wellness products in India, with practical guides for Ashwagandha, Shilajit and herbal supplement buying.',
    image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
    product: '/shop',
    productName: 'Explore Ayurvedic Products',
    intro: 'Aarogya Seva is an Indian Ayurvedic wellness brand focused on traditional herbal ingredients, clear product information and a straightforward online shopping experience.',
    sections: [
      ['Ayurvedic wellness products in India', 'Explore herbal wellness products including Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products. Compare ingredients, serving information and label details before buying.'],
      ['Ashwagandha and Shilajit guides', 'Learn about traditional Ayurvedic context, common supplement formats and practical quality checks before choosing a product.'],
      ['How to choose a herbal supplement', 'Look for transparent ingredient information, botanical names, serving size, manufacturer details, batch information and clear directions. Avoid choosing a product solely because of exaggerated health promises or discounts.'],
      ['About Aarogya Seva', 'Use the About, Contact, Policies and individual product pages to verify the brand, product information, customer support and ordering details.'],
    ],
  },
  brand: {
    title: 'Aarogya Seva Ayurveda | Ayurvedic Wellness Products in India',
    description: 'Aarogya Seva Ayurveda (also searched as Aarogya Sewa Ayurveda) is the online home of Aarogya Seva Ayurvedic wellness products in India. Explore Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products.',
    image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
    product: '/shop',
    productName: 'Shop Aarogya Seva Ayurvedic Products',
    intro: 'Aarogya Seva Ayurveda is the brand identity used on this website for Aarogya Seva Ayurvedic wellness products in India. This page helps customers distinguish the store from other organizations or websites that may use similar words in their names.',
    sections: [
      ['About Aarogya Seva Ayurveda', 'Aarogya Seva Ayurveda (also searched as Aarogya Sewa) brings the Aarogya Seva product catalogue, product information, wellness guides and online shopping experience together in one website. The catalogue includes Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products.'],
      ['Aarogya Seva products online in India', 'Browse the Aarogya Seva catalogue to compare product names, ingredients, serving information, prices and availability. Product pages provide the most specific information for each formulation.'],
      ['Ayurvedic and herbal wellness focus', 'The website focuses on Ayurvedic and herbal wellness products rather than presenting supplements as replacements for prescription medicines. Educational guides explain traditional context and practical label checks without promising disease treatment.'],
      ['How to identify this website', 'The canonical website address is https://aarogyaseva.vercel.app/. On this site, the brand is presented as Aarogya Seva Ayurveda and Aarogya Seva. Use the About, Contact, Policies and product pages to verify information before ordering.'],
    ],
  },
  ashwagandha: {
    title: 'Ashwagandha: Uses, Traditional Ayurvedic Context & Buying Guide',
    description: 'Learn about Ashwagandha, its traditional Ayurvedic context, common supplement formats, quality checks and practical questions to consider before buying.',
    image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
    product: '/product/ashwagandha-extract-capsules',
    productName: 'Ashwagandha Extract Capsules',
    intro: 'Ashwagandha (Withania somnifera) is a well-known Ayurvedic herb traditionally used in formulations concerned with general vitality and everyday wellbeing. Modern supplements vary widely in extract type, dose, sourcing and quality, so the label matters.',
    sections: [
      ['What is Ashwagandha?', 'Ashwagandha is a botanical traditionally used in Ayurveda. Different products may use root powder, root extract or combinations of plant parts. When comparing products, check the botanical name, plant part and amount per serving.'],
      ['What should you check before buying?', 'Look for a clear ingredient list, batch information, manufacturer details, suggested use, storage instructions and applicable quality or testing information. Avoid choosing a product only because of a large discount or an exaggerated health promise.'],
      ['How is it commonly used?', 'Supplement directions vary by formulation and concentration. Follow the product label rather than assuming that a higher amount is better. If you are pregnant, breastfeeding, taking medicines or managing a medical condition, discuss supplements with a qualified healthcare professional.'],
      ['Ashwagandha and everyday wellness', 'People commonly explore Ashwagandha in the context of stress management, sleep routines, exercise recovery and general vitality. Evidence varies by outcome and preparation, so individual results should not be assumed.'],
    ],
  },
  shilajit: {
    title: 'Shilajit: What It Is, Quality Checks & Buying Guide',
    description: 'Learn what Shilajit is, how traditional Ayurvedic use differs from modern supplement marketing, what to check on a label and how to compare products responsibly.',
    image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
    product: '/product/shilajeet-capsules',
    productName: 'Shilajeet Capsules 1000mg',
    intro: 'Shilajit is a mineral-rich substance found in mountainous regions and has a long history of use in traditional Ayurvedic formulations. Product quality can differ substantially, making sourcing, purification and transparent labeling important.',
    sections: [
      ['What is Shilajit?', 'Shilajit is a naturally occurring, resin-like substance that contains organic and mineral components. Traditional Ayurvedic preparations use purified Shilajit (Shodhana), while modern products may be sold as resin, powder or extract.'],
      ['How do you compare Shilajit products?', 'Check the form of the product, ingredient quantity, serving size, manufacturer information, batch details and available quality-testing information. Be cautious with unsupported claims about hormones, performance or disease treatment.'],
      ['How is it commonly used?', 'Use only according to the product label. Do not assume that a larger serving is safer or more effective. People taking prescription medicines or managing a health condition should ask a qualified healthcare professional before using a supplement.'],
      ['What makes a product easier to trust?', 'Transparent labeling, traceable manufacturing information, sensible claims, clear customer support and a published return or replacement policy make it easier to evaluate a supplement brand.'],
    ],
  },
};

function breadcrumbJsonLd(slug, title) {
  const isHub = slug === 'hub';
  const isBrand = slug === 'brand';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: isBrand
      ? [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aarogyaseva.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Aarogya Seva Ayurveda', item: 'https://aarogyaseva.vercel.app/aarogya-seva-ayurveda' },
        ]
      : isHub
      ? [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aarogyaseva.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Ayurvedic Wellness Guides', item: 'https://aarogyaseva.vercel.app/ayurvedic' },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aarogyaseva.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Ayurvedic Wellness Guides', item: 'https://aarogyaseva.vercel.app/ayurvedic' },
          { '@type': 'ListItem', position: 3, name: title, item: `https://aarogyaseva.vercel.app/ayurvedic/${slug}` },
        ],
  };
}

export default function HerbalLandingPage({ type }) {
  const data = DATA[type];
  if (!data) return null;

  return (
    <div className="bg-[#fbf7ec] min-h-screen">
      <SEO
        title={data.title}
        description={data.description}
        keywords={
          type === 'hub'
            ? 'Aarogya Seva Ayurvedic, Ayurvedic wellness products India, Ayurvedic products online India, herbal supplements India, Ashwagandha, Shilajit, Giloy, Arjuna'
            : type === 'brand'
              ? 'Aarogya Seva, Aarogya Sewa, Aarogya Seva Ayurveda, Aarogya Sewa Ayurveda, Aarogya Seva India, Aarogya Sewa India, Aarogya Seva Ayurvedic, Aarogya Sewa Ayurvedic, Aarogya Seva products online, Aarogya Sewa products online, official Aarogya Seva website, Ayurvedic products India'
              : type === 'ashwagandha'
              ? 'Ashwagandha capsules India, Ashwagandha online India, Ashwagandha root extract, Ayurvedic Ashwagandha supplement, herbal wellness India'
              : 'Shilajit capsules India, Shilajit online India, Shilajeet capsules, purified Shilajit supplement, Ayurvedic Shilajit'
        }
        url={type === "hub" ? "/ayurvedic" : type === "brand" ? "/aarogya-seva-ayurveda" : `/ayurvedic/${type}`}
        image={data.image}
        jsonLd={breadcrumbJsonLd(type, data.title)}
      />

      <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-[#8a7a5a]">
        <Link to="/">Home</Link> / <Link to="/ayurvedic">Ayurvedic Wellness Guides</Link> / <span className="text-[#0f3d2e]">{data.title}</span>
      </div>

      <header className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-xs tracking-[3px] text-[#8a7a5a] uppercase">{type === "brand" ? "Aarogya Seva Ayurveda" : "Ayurvedic Wellness Guide"}</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0f3d2e] mt-3 leading-tight">{data.title}</h1>
          <p className="text-[#4a4a4a] mt-5 leading-relaxed">{data.intro}</p>
          <Link to={data.product} className="inline-flex items-center gap-2 mt-6 bg-[#e6b64c] text-[#0f3d2e] font-semibold px-6 py-3 rounded-lg">
            View {data.productName} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-[#ede4cf] p-8 flex items-center justify-center">
          <img src={data.image} alt={type === 'ashwagandha' ? 'Ashwagandha wellness product' : type === 'shilajit' ? 'Shilajit and Ashwagandha wellness products' : 'Aarogya Seva Ayurvedic wellness products'} className="max-h-80 object-contain" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-12 grid sm:grid-cols-3 gap-4">
        {[
          [Leaf, 'Traditional context', 'Understand the herb before choosing a supplement.'],
          [ShieldCheck, 'Quality first', 'Check labels, batch information and manufacturer details.'],
          [BookOpen, 'Evidence-aware', 'Separate traditional use from modern health claims.'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="bg-white border border-[#ede4cf] rounded-xl p-5">
            <Icon size={22} className="text-[#0f3d2e]" />
            <h2 className="font-semibold text-[#0f3d2e] mt-3">{title}</h2>
            <p className="text-sm text-[#6a6a6a] mt-1">{text}</p>
          </div>
        ))}
      </section>

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white border border-[#ede4cf] rounded-2xl p-6 md:p-10 space-y-8">
          {data.sections.map(([heading, text]) => (
            <section key={heading}>
              <h2 className="font-serif text-2xl text-[#0f3d2e]">{heading}</h2>
              <p className="text-[#4a4a4a] leading-relaxed mt-2">{text}</p>
            </section>
          ))}
          <section className="border-t border-[#ede4cf] pt-6">
            <h2 className="font-serif text-2xl text-[#0f3d2e]">Important note</h2>
            <p className="text-sm text-[#6a6a6a] leading-relaxed mt-2">
              This page is for general educational information and is not medical advice. Ayurvedic supplements are not a substitute for diagnosis or treatment by a qualified healthcare professional.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
