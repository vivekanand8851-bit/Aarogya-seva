const fs = require('fs');
const path = require('path');

const SITE = 'https://aarogyaseva.vercel.app';
const LOGO = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png';

const pages = [
  {
    slug: 'arjuna-capsules-india',
    title: 'Arjuna Capsules India | Aarogya Seva Ayurvedic Arjuna',
    description: 'Aarogya Seva Arjuna Capsules with Terminalia arjuna bark extract. Learn about traditional Ayurvedic use, ingredients, serving information and everyday wellness in India.',
  },
  {
    slug: 'shilajit-capsules-1000mg',
    title: 'Shilajit Capsules 1000mg India | Aarogya Seva',
    description: 'Aarogya Seva Shilajeet Capsules 1000mg with purified Shilajeet extract. Compare ingredient amount, traditional Ayurvedic context, serving information and label details.',
  },
  {
    slug: 'ashwagandha-extract-capsules-india',
    title: 'Ashwagandha Capsules India | Ashwagandha Root Extract',
    description: 'Aarogya Seva Ashwagandha Extract Capsules with Withania somnifera root extract. Explore traditional Ayurvedic use, ingredients, serving information and responsible supplement buying.',
  },
  {
    slug: 'giloy-extract-capsules-india',
    title: 'Giloy Capsules India | Guduchi Extract | Aarogya Seva',
    description: 'Aarogya Seva Giloy Extract Capsules with Giloy (Guduchi) stem extract. Read traditional Ayurvedic context, ingredients, serving information and responsible use guidance.',
  },
  {
    slug: 'dig-up-men-wellness-capsules',
    title: 'DIG-UP Capsules India | Ayurvedic Men Wellness',
    description: 'Aarogya Seva DIG-UP Capsules are an Ayurvedic herbal blend for general men’s wellness. Explore ingredients, traditional herbal context, serving information and label details.',
  },
  {
    slug: 'piles-norm-ayurvedic-capsules',
    title: 'Piles Norm Capsules | Ayurvedic Herbal Wellness India',
    description: 'Aarogya Seva Piles Norm Capsules are an Ayurvedic herbal formulation. Review ingredients, label directions and responsible use information before use.',
  },
  {
    slug: 'shilajit-ashwagandha-combo',
    title: 'Shilajit Ashwagandha Combo India | Aarogya Seva',
    description: 'Aarogya Seva Shilajeet + Ashwagandha Combo combines purified Shilajeet extract and Ashwagandha root extract. Compare ingredients, serving information and traditional Ayurvedic context.',
  },
  {
    slug: 'piles-norm-dig-up-combo',
    title: 'Piles Norm + DIG-UP Combo | Ayurvedic Wellness India',
    description: 'Aarogya Seva Piles Norm + DIG-UP Combo brings two Ayurvedic herbal formulations together. Review individual ingredients, serving information and responsible supplement-use guidance.',
  },
  {
    slug: 'cough-yog-capsules-india',
    title: 'COUGH-YOG Capsules India | Aarogya Seva',
    description: 'Aarogya Seva COUGH-YOG Capsules are a food supplement labelled as a Fever & Cold Relief Formula. Check the full label, ingredients and directions before use.',
  },
  {
    slug: 'gass-off-churan-100g',
    title: 'GASS OFF Churan 100g | Aarogya Seva',
    description: 'Aarogya Seva GASS OFF Churan is a 100 gm food supplement described on the pack as a tasty & digestive churan. Review the ingredient panel and directions before use.',
  },
];

const buildIndex = path.join(process.cwd(), 'build', 'index.html');
const source = fs.readFileSync(buildIndex, 'utf8');
const scriptSrc = (source.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/i) || [])[1] || '';
const cssLinks = [...source.matchAll(/<link[^>]+href="([^"]+\.css)"[^>]*>/gi)].map((m) => m[1]);

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

for (const page of pages) {
  const url = `${SITE}/ayurvedic-products/${page.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: page.title.split(' | ')[0],
    description: page.description,
    image: [LOGO],
    brand: { '@type': 'Brand', name: 'Aarogya Seva' },
    url,
  };

  const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${url}">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Aarogya Seva">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${LOGO}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">
<meta name="twitter:image" content="${LOGO}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
</head>
<body>
<main>
<h1>${escapeHtml(page.title.split(' | ')[0])}</h1>
<p>${escapeHtml(page.description)}</p>
<p>Aarogya Seva Ayurvedic wellness product information, ingredients and label guidance. Please follow the product label and seek qualified healthcare advice for medical concerns.</p>
</main>
<div id="root"></div>
${cssLinks.map((href) => `<link href="${href}" rel="stylesheet">`).join('\n')}
${scriptSrc ? `<script defer src="${scriptSrc}"></script>` : ''}
</body>
</html>
`;

  const outDir = path.join(process.cwd(), 'build', 'ayurvedic-products', page.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

console.log(`Generated ${pages.length} static product SEO pages.`);
