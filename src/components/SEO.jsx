import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getProductSeoPath } from '../data/productSeo';

const DEFAULTS = {
  siteName: 'Aarogya Seva',
  siteUrl: 'https://aarogya-seva.vercel.app',
  title: 'Aarogya Seva | Ayurvedic Wellness Products in India',
  description:
    'Aarogya Seva is an Indian Ayurvedic wellness brand offering Ashwagandha, Shilajit, Giloy, Arjuna and digestive wellness products online. Also searchable as Aarogya Sewa.',
  keywords:
    'Aarogya Seva, Aarogya Sewa, Aarogya Seva Ayurveda, Aarogya Seva Ayurvedic, Aarogya Sewa Ayurveda, Aarogya Sewa Ayurvedic, Aarogya Seva India, Aarogya Sewa India, Aarogya Seva products, Aarogya Sewa products, Aarogya Seva official, Ayurvedic wellness products India, Ayurvedic products online India, Ashwagandha capsules India, Shilajit capsules India, Giloy capsules India, Arjuna capsules India',
  image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png',
  type: 'website',
};

export default function SEO({ title, description, keywords, image, type, url, jsonLd, noindex = false }) {
  const t = title ? (title.includes(DEFAULTS.siteName) ? title : `${title} | ${DEFAULTS.siteName}`) : DEFAULTS.title;
  const d = description || DEFAULTS.description;
  const k = keywords || DEFAULTS.keywords;
  const img = image || DEFAULTS.image;
  const tp = type || DEFAULTS.type;
  const u = url ? `${DEFAULTS.siteUrl}${url}` : DEFAULTS.siteUrl;

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta name="keywords" content={k} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <meta name="author" content="Aarogya Seva" />
      <meta name="language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <link rel="canonical" href={u} />

      <meta property="og:type" content={tp} />
      <meta property="og:site_name" content={DEFAULTS.siteName} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={u} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={`${t} - Aarogya Seva Ayurveda`} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aarogya Seva',
  alternateName: ['Aarogya Seva Ayurveda', 'Aarogya Seva Ayurvedic Wellness', 'Aarogya Sewa', 'Aarogya Sewa Ayurveda'],
  url: DEFAULTS.siteUrl,
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'Aarogya Seva',
  alternateName: ['Aarogya Seva Ayurveda', 'Aarogya Sewa', 'Aarogya Sewa Ayurveda'],
  url: DEFAULTS.siteUrl,
  logo: DEFAULTS.image,
  description: DEFAULTS.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ground Floor, 77, Dadri',
    addressLocality: 'Gautam Buddha Nagar',
    addressRegion: 'Uttar Pradesh',
    postalCode: '203207',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8470807059',
    contactType: 'customer service',
    email: 'aarogyaseva.info@gmail.com',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  areaServed: 'IN',
  knowsAbout: ['Ayurveda', 'Ashwagandha', 'Shilajit', 'Giloy', 'Arjuna', 'Herbal wellness products'],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61574420841337',
    'https://www.instagram.com/aarogya.sevaa',
  ],
};

export const productJsonLd = (product, seoPath = getProductSeoPath(product.slug)) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.shortDesc || product.description,
  image: product.images,
  sku: product.id,
  brand: { '@type': 'Brand', name: 'Aarogya Seva' },
  offers: {
    '@type': 'Offer',
    url: `${DEFAULTS.siteUrl}${seoPath}`,
    priceCurrency: 'INR',
    price: product.price,
    priceValidUntil: '2026-12-31',
    availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
});
