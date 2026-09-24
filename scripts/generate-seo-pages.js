const fs = require('fs');
const path = require('path');
const PRODUCT_EDUCATION = require('../src/data/productEducation');

const SITE = 'https://aarogyaseva.vercel.app';
const LOGO = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png';

const productPages = [
  ['arjuna-capsules-india','Arjuna Capsules India | Aarogya Seva Ayurvedic Arjuna','Aarogya Seva Arjuna Capsules with Terminalia arjuna bark extract. Learn about traditional Ayurvedic use, ingredients, serving information and responsible supplement buying.'],
  ['shilajit-capsules-1000mg','Shilajit Capsules 1000mg India | Aarogya Seva','Aarogya Seva Shilajeet Capsules 1000mg with purified Shilajeet extract. Compare ingredient amount, traditional Ayurvedic context, serving information and label details.'],
  ['ashwagandha-extract-capsules-india','Ashwagandha Capsules India | Ashwagandha Root Extract','Aarogya Seva Ashwagandha Extract Capsules with Withania somnifera root extract. Explore traditional Ayurvedic use, ingredients, serving information and responsible supplement buying.'],
  ['giloy-extract-capsules-india','Giloy Capsules India | Guduchi Extract | Aarogya Seva','Aarogya Seva Giloy Extract Capsules with Giloy (Guduchi) stem extract. Read traditional Ayurvedic context, ingredients, serving information and responsible use guidance.'],
  ['dig-up-men-wellness-capsules','DIG-UP Capsules India | Ayurvedic Men Wellness','Aarogya Seva DIG-UP Capsules are an Ayurvedic herbal blend for general men’s wellness. Explore ingredients, traditional herbal context, serving information and label details.'],
  ['piles-norm-ayurvedic-capsules','Piles Norm Capsules | Ayurvedic Herbal Wellness India','Aarogya Seva Piles Norm Capsules are an Ayurvedic herbal formulation. Review ingredients, label directions and responsible use information before use.'],
  ['shilajit-ashwagandha-combo','Shilajit Ashwagandha Combo India | Aarogya Seva','Aarogya Seva Shilajeet + Ashwagandha Combo combines purified Shilajeet extract and Ashwagandha root extract. Compare ingredients, serving information and traditional Ayurvedic context.'],
  ['piles-norm-dig-up-combo','Piles Norm + DIG-UP Combo | Ayurvedic Wellness India','Aarogya Seva Piles Norm + DIG-UP Combo brings two Ayurvedic herbal formulations together. Review individual ingredients, serving information and responsible supplement-use guidance.'],
  ['cough-yog-capsules-india','COUGH-YOG Capsules India | Aarogya Seva','Aarogya Seva COUGH-YOG Capsules are a food supplement labelled as a Fever & Cold Relief Formula. Check the full label, ingredients and directions before use.'],
  ['gass-off-churan-100g','GASS OFF Churan 100g | Aarogya Seva','Aarogya Seva GASS OFF Churan is a 100 gm food supplement described on the pack as a tasty & digestive churan. Review the ingredient panel and directions before use.'],
];

const guidePages = [
  ['ayurvedic','Aarogya Seva Ayurvedic Wellness Products & Herbal Guides','Explore Ayurvedic wellness products in India and practical guides for Ashwagandha, Shilajit, Giloy, Arjuna and responsible herbal supplement buying.'],
  ['aarogya-seva-ayurveda','Aarogya Seva Ayurveda | Ayurvedic Wellness Products in India','Explore the Aarogya Seva Ayurveda catalogue, product information, wellness guides and transparent supplement buying information.'],
  ['ayurvedic/ashwagandha','Ashwagandha: Traditional Ayurvedic Context & Buying Guide','Learn about Ashwagandha, common supplement formats, label checks and practical questions to consider before buying.'],
  ['ayurvedic/shilajit','Shilajit: Quality Checks & Buying Guide','Learn what Shilajit is, how traditional use differs from modern marketing and what to check on a supplement label.'],
];

const productCatalog = {
  'arjuna-capsules-india': { name: 'Arjuna Capsules', price: 899 },
  'shilajit-capsules-1000mg': { name: 'Shilajeet Capsules 1000mg', price: 1399 },
  'ashwagandha-extract-capsules-india': { name: 'Ashwagandha Extract Capsules', price: 799 },
  'giloy-extract-capsules-india': { name: 'Giloy Extract Capsules', price: 649 },
  'dig-up-men-wellness-capsules': { name: 'DIG-UP Capsules', price: 849 },
  'piles-norm-ayurvedic-capsules': { name: 'Piles Norm Capsules', price: 749 },
  'shilajit-ashwagandha-combo': { name: 'Shilajeet + Ashwagandha Combo', price: 1899 },
  'piles-norm-dig-up-combo': { name: 'Piles Norm + DIG-UP Combo', price: 1499 },
  'cough-yog-capsules-india': { name: 'COUGH-YOG Capsules', price: 1200 },
  'gass-off-churan-100g': { name: 'GASS OFF Churan', price: 299 },
};

const articlePages = [
  ['ashwagandha-benefits','Ashwagandha: Traditional Uses, Evidence & Buying Guide','A practical guide to Ashwagandha covering traditional Ayurvedic use, modern research questions, supplement labels and responsible buying.'],
  ['shilajit-guide','Shilajit Guide: What It Is, Quality Checks & How to Compare Products','Understand Shilajit, purification, common product formats, label checks and the difference between traditional use and modern marketing claims.'],
  ['arjuna-heart','Arjuna in Ayurveda: Traditional Context & Heart-Wellness Questions','Learn about Arjuna (Terminalia arjuna), its traditional Ayurvedic context and the questions to ask before choosing an Arjuna supplement.'],
];

const buildIndex = path.join(process.cwd(), 'build', 'index.html');
const source = fs.readFileSync(buildIndex, 'utf8');
const scriptSrc = (source.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/i) || [])[1] || '';
const cssLinks = [...source.matchAll(/<link[^>]+href="([^"]+\\.css)"[^>]*>/gi)].map((m) => m[1]);

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function writePage(route, title, description, type, heading, body) {
  const url = `${SITE}/${route}`;
  const productSlug = type === 'Product' ? route.replace(/^ayurvedic-products\//, '') : null;
  const product = type === 'Product' ? productCatalog[productSlug] : null;
  if (type === 'Product' && !product) throw new Error(`Missing product catalog entry for ${route}`);
  const schema = type === 'Product'
    ? {
        '@context':'https://schema.org',
        '@type':'Product',
        '@id':`${url}#product`,
        name: product.name,
        description,
        image:[LOGO],
        brand:{'@type':'Brand',name:'Aarogya Seva'},
        url,
        offers:{
          '@type':'Offer',
          url,
          priceCurrency:'INR',
          price:product.price,
          availability:'https://schema.org/InStock',
          itemCondition:'https://schema.org/NewCondition'
        }
      }
    : { '@context':'https://schema.org','@type':type,'@id':`${url}#page`,name:title,description,url,publisher:{'@type':'Organization',name:'Aarogya Seva',logo:{'@type':'ImageObject',url:LOGO}} };

  const html = `<!doctype html>
<html lang="en-IN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type === 'Product' ? 'product' : 'article'}"><meta property="og:site_name" content="Aarogya Seva">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${LOGO}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${LOGO}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
</head><body><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p>${body}</main><div id="root"></div>
${cssLinks.map((href) => `<link href="${href}" rel="stylesheet">`).join('\n')}
${scriptSrc ? `<script defer src="${scriptSrc}"></script>` : ''}</body></html>`;

  const outDir = path.join(process.cwd(),'build',...route.split('/'));
  fs.mkdirSync(outDir,{recursive:true});
  fs.writeFileSync(path.join(outDir,'index.html'),html);
}

for (const [slug,title,description] of productPages) {
  const product = productCatalog[slug];
  const education = PRODUCT_EDUCATION[slug] || {};
  const list = (items = []) => items.map((x) => `<li>${escapeHtml(x)}</li>`).join('');
  const body = `
    <p><strong>Aarogya Seva ${escapeHtml(product.name)}</strong> is available for purchase online in India. Current listed price: ₹${product.price.toLocaleString('en-IN')}.</p>
    <section><h2>चरक संहिता और आयुर्वेदिक संदर्भ</h2><p>${escapeHtml(education.classical || '')}</p></section>
    <section><h2>यह क्या है और क्यों उपयोग किया जाता है?</h2><p>${escapeHtml(education.why || '')}</p></section>
    <section><h2>कैसे उपयोग करें?</h2><p>${escapeHtml(education.how || '')}</p></section>
    <section><h2>पारंपरिक रूप और उपयोग के तरीके</h2><ul>${list(education.ways)}</ul></section>
    <section><h2>आयुर्वेदिक स्मरण मंत्र</h2><p>${escapeHtml(education.mantra || '')}</p></section>
    <section><h2>Product Label & Responsible Use</h2><p>Review the complete ingredient panel, serving directions, manufacturer information and product label before use. Supplements are not a substitute for professional medical advice.</p></section>
    <p><a href="/shop">Browse Aarogya Seva products</a> · <a href="/ayurvedic">Ayurvedic guides</a> · <a href="/blog">Ayurveda articles</a> · <a href="/about">About Aarogya Seva</a> · <a href="/contact">Contact</a></p>
  `;
  writePage(`ayurvedic-products/${slug}`,title,description,'Product',product.name,body);
}

for (const [route,title,description] of guidePages) {
  writePage(route,title,description,'WebPage',title,
    '<p>Compare botanical names, plant parts, ingredient amounts, serving size, batch information, manufacturer details and product directions. Separate traditional Ayurvedic context from modern health claims.</p>');
}

for (const [slug,title,description] of articlePages) {
  writePage(`blog/${slug}`,title,description,'Article',title,
    '<p>This educational article explains traditional context, supplement-label considerations and responsible buying. Evidence varies by herb, preparation, dose and person.</p><p>If you have a medical condition, are pregnant or breastfeeding, or take medicines, consult a qualified healthcare professional before using supplements.</p>');
}

console.log(`Generated ${productPages.length} product, ${guidePages.length} guide and ${articlePages.length} article SEO pages.`);
