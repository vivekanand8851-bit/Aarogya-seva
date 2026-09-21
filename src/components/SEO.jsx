import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULTS = {
  siteName: 'Aarogya Seva',
  siteUrl: 'https://www.aarogyasewa.com',
  title: 'Aarogya Seva - Buy Authentic Ayurvedic Supplements Online in India',
  description:
    'Buy premium Ayurvedic supplements online at Aarogya Seva - Ashwagandha, Shilajit, Giloy, Arjuna capsules & more. 100% natural, AYUSH certified, Free shipping, COD available across India. Aapki Sehat, Hamari Seva.',
  keywords:
    'ayurvedic supplements India, buy ashwagandha online, shilajit capsules India, giloy tablets, arjuna capsules heart health, authentic ayurveda, natural immunity booster, herbal supplements, ayush certified, aarogya seva, ayurvedic medicine online, digestive health ayurveda, mens wellness capsules, stress relief supplements, ayurvedic tablets India, ayurvedic doctor consultation',
  image: 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png',
  type: 'website',
};

export default function SEO({ title, description, keywords, image, type, url, jsonLd }) {
  const t = title ? `${title} | ${DEFAULTS.siteName}` : DEFAULTS.title;
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
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="author" content="Aarogya Seva" />
      <meta name="language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <link rel="canonical" href={u} />

      {/* Open Graph */}
      <meta property="og:type" content={tp} />
      <meta property="og:site_name" content={DEFAULTS.siteName} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={u} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aarogya Seva',
  legalName: 'Aarogya Seva',
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
  sameAs: [
    'https://www.facebook.com/profile.php?id=61574420841337',
    'https://www.instagram.com/aarogya.sevaa',
  ],
};

export const productJsonLd = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.shortDesc || product.description,
  image: product.images,
  sku: product.id,
  brand: { '@type': 'Brand', name: 'Aarogya Seva' },
  aggregateRating: product.reviews > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviews,
  } : undefined,
  offers: {
    '@type': 'Offer',
    url: `${DEFAULTS.siteUrl}/product/${product.slug}`,
    priceCurrency: 'INR',
    price: product.price,
    priceValidUntil: '2026-12-31',
    availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
});
