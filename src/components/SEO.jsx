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

const absoluteUrl = (value) => {
  if (!value) return DEFAULTS.siteUrl;
  if (/^https?:\/\//i.test(value)) return value;
  return `${DEFAULTS.siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

export default function SEO({ title, description, keywords, image, type, url, jsonLd, noindex = false }) {
  const t = title
    ? (title.includes(DEFAULTS.siteName) ? title : `${title} | ${DEFAULTS.siteName}`)
    : DEFAULTS.title;
  const d = description || DEFAULTS.description;
  const k = keywords || DEFAULTS.keywords;
  const img = absoluteUrl(image || DEFAULTS.image);
  const tp = type || DEFAULTS.type;
  const u = absoluteUrl(url);
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${u}#webpage`,
    url: u,
    name: t,
    description: d,
    isPartOf: { '@id': `${DEFAULTS.siteUrl}#website` },
    inLanguage: 'en-IN',
  };

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta name="keywords" content={k} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content="Aarogya Seva" />
      <meta name="language" content="en-IN" />
      <meta name="content-language" content="en-IN" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <link rel="canonical" href={u} />

      <meta property="og:type" content={tp} />
      <meta property="og:site_name" content={DEFAULTS.siteName} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={img} />
      <meta property="og:image:alt" content={`${t} - Aarogya Seva Ayurveda`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={u} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={`${t} - Aarogya Seva Ayurveda`} />

      <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DEFAULTS.siteUrl}#website`,
  name: 'Aarogya Seva',
  alternateName: ['Aarogya Seva Ayurveda', 'Aarogya Seva Ayurvedic Wellness', 'Aarogya Sewa', 'Aarogya Sewa Ayurveda'],
  url: DEFAULTS.siteUrl,
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${DEFAULTS.siteUrl}/shop?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  '@id': `${DEFAULTS.siteUrl}#organization`,
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

export const productJsonLd = (product, seoPath = getProductSeoPath(product.slug)) => {
  const productUrl = absoluteUrl(seoPath);
  const images = (product.images || []).map(absoluteUrl).filter(Boolean);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    description: product.shortDesc || product.description,
    image: images,
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Aarogya Seva' },
    url: productUrl,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  if (product.rating > 0 && product.reviews > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
};

export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
});
