const fs = require('fs');
const path = require('path');
const PRODUCT_EDUCATION = require('../src/data/productEducation');
const { BLOG_POSTS } = require('../src/mock/mockData');

const SITE = 'https://aarogyaseva.vercel.app';
const LOGO = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png';

const PRODUCT_IMAGES = {
  'arjuna-capsules-india': 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/9nl7yn4a_Arjuna.png',
  'shilajit-capsules-1000mg': 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
  'ashwagandha-extract-capsules-india': 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
  'giloy-extract-capsules-india': LOGO,
  'dig-up-men-wellness-capsules': LOGO,
  'piles-norm-ayurvedic-capsules': 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/0z5z0vli_Piles%20Norm.png',
  'shilajit-ashwagandha-combo': 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png',
  'piles-norm-dig-up-combo': LOGO,
  'cough-yog-capsules-india': LOGO,
  'gass-off-churan-100g': LOGO
};

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
  ['ayurvedic/giloy','Giloy Capsules India | Guduchi Extract & Buying Guide','Explore Giloy (Guduchi) extract capsules in India, ingredient details, traditional Ayurvedic context, serving information and practical buying guidance.'],
  ['ayurvedic/digestion','Digestive Wellness Products India | Churan & Herbal Products','Explore digestive wellness products from Aarogya Seva, including GASS OFF Churan and practical information for comparing ingredients, labels and serving directions.'],
  ['ayurvedic/mens-wellness',"Men's Wellness Products India | Shilajit, Ashwagandha & Herbal Blends","Explore Aarogya Seva men's wellness products including Shilajeet, Ashwagandha and DIG-UP. Compare ingredients, traditional context, serving information and product labels."],
  ['ayurvedic-products-india','Ayurvedic Products Online in India | Aarogya Seva','Shop Aarogya Seva Ayurvedic wellness products online in India. Explore Ashwagandha, Shilajit, Giloy, Arjuna, digestive wellness products and combos.'],
  ['offers','Aarogya Seva Offers | Current Ayurvedic Product Deals','Explore current Aarogya Seva offers on Ayurvedic wellness products. Review product details, eligibility, delivery charges and final checkout price before ordering.'],
];

const routeToProductSlug = {
  'arjuna-capsules-india': 'arjuna-capsules',
  'shilajit-capsules-1000mg': 'shilajeet-capsules',
  'ashwagandha-extract-capsules-india': 'ashwagandha-extract-capsules',
  'giloy-extract-capsules-india': 'giloy-extract-capsules',
  'dig-up-men-wellness-capsules': 'dig-up-capsules',
  'piles-norm-ayurvedic-capsules': 'piles-norm-capsules',
  'shilajit-ashwagandha-combo': 'shilajeet-ashwagandha-combo',
  'piles-norm-dig-up-combo': 'piles-digup-combo',
  'cough-yog-capsules-india': 'cough-yog-capsules',
  'gass-off-churan-100g': 'gass-off-churan',
};

const productCatalog = {
  'arjuna-capsules-india': { name: 'Arjuna Capsules', price: 899, rating: 4.7, reviews: 1284 },
  'shilajit-capsules-1000mg': { name: 'Shilajeet Capsules 1000mg', price: 1399, rating: 4.8, reviews: 2156 },
  'ashwagandha-extract-capsules-india': { name: 'Ashwagandha Extract Capsules', price: 799, rating: 4.6, reviews: 1420 },
  'giloy-extract-capsules-india': { name: 'Giloy Extract Capsules', price: 649, rating: 4.7, reviews: 986 },
  'dig-up-men-wellness-capsules': { name: 'DIG-UP Capsules', price: 849, rating: 4.5, reviews: 634 },
  'piles-norm-ayurvedic-capsules': { name: 'Piles Norm Capsules', price: 749, rating: 4.6, reviews: 512 },
  'shilajit-ashwagandha-combo': { name: 'Shilajeet + Ashwagandha Combo', price: 1899, rating: 4.9, reviews: 428 },
  'piles-norm-dig-up-combo': { name: 'Piles Norm + DIG-UP Combo', price: 1499, rating: 4.5, reviews: 218 },
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
        image:[PRODUCT_IMAGES[productSlug] || LOGO],
        sku: productSlug,
        category: 'Ayurvedic Wellness Product',
        brand:{'@type':'Brand',name:'Aarogya Seva'},
        url,
        offers:{
          '@type':'Offer',
          url,
          priceCurrency:'INR',
          price:product.price,
          availability:'https://schema.org/InStock',
          itemCondition:'https://schema.org/NewCondition',
          shippingDetails:[
            {
              '@type':'OfferShippingDetails',
              orderValue:{'@type':'MonetaryAmount',minValue:0,maxValue:498.99,currency:'INR'},
              shippingRate:{'@type':'MonetaryAmount',value:49,currency:'INR'},
              shippingDestination:{'@type':'DefinedRegion',addressCountry:'IN'},
              deliveryTime:{
                '@type':'ShippingDeliveryTime',
                handlingTime:{'@type':'QuantitativeValue',minValue:1,maxValue:2,unitCode:'DAY'},
                transitTime:{'@type':'QuantitativeValue',minValue:3,maxValue:7,unitCode:'DAY'}
              }
            },
            {
              '@type':'OfferShippingDetails',
              orderValue:{'@type':'MonetaryAmount',minValue:499,currency:'INR'},
              shippingRate:{'@type':'MonetaryAmount',value:0,currency:'INR'},
              shippingDestination:{'@type':'DefinedRegion',addressCountry:'IN'},
              deliveryTime:{
                '@type':'ShippingDeliveryTime',
                handlingTime:{'@type':'QuantitativeValue',minValue:1,maxValue:2,unitCode:'DAY'},
                transitTime:{'@type':'QuantitativeValue',minValue:3,maxValue:7,unitCode:'DAY'}
              }
            }
          ],
          hasMerchantReturnPolicy:{
            '@type':'MerchantReturnPolicy',
            applicableCountry:'IN',
            returnPolicyCategory:'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays:7
          }
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
${type === 'Product' ? '<meta name="aarogya-seo-static" content="product">' : ''}
<meta property="og:type" content="${type === 'Product' ? 'product' : 'article'}"><meta property="og:site_name" content="Aarogya Seva">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${type === 'Product' ? (PRODUCT_IMAGES[productSlug] || LOGO) : LOGO}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${type === 'Product' ? (PRODUCT_IMAGES[productSlug] || LOGO) : LOGO}">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE},{'@type':'ListItem',position:2,name:type==='Product'?'Ayurvedic Products':type==='Article'?'Blog':'Ayurvedic Guides',item:type==='Product'?SITE+'/shop':type==='Article'?SITE+'/blog':SITE+'/ayurvedic'},{'@type':'ListItem',position:3,name:title,item:url}]}).replace(/</g,'\\u003c')}</script>
</head><body><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p>${body}</main><div id="root"></div>
${cssLinks.map((href) => `<link href="${href}" rel="stylesheet">`).join('\n')}
${scriptSrc ? `<script defer src="${scriptSrc}"></script>` : ''}</body></html>`;

  const outDir = path.join(process.cwd(),'build',...route.split('/'));
  fs.mkdirSync(outDir,{recursive:true});
  fs.writeFileSync(path.join(outDir,'index.html'),html);
}

for (const [slug,title,description] of productPages) {
  const product = productCatalog[slug];
  const education = PRODUCT_EDUCATION[routeToProductSlug[slug]] || {};
  const list = (items = []) => items.map((x) => `<li>${escapeHtml(x)}</li>`).join('');
  const body = `
    <p><strong>Aarogya Seva ${escapeHtml(product.name)}</strong> is presented as an Ayurvedic wellness product for customers looking for clearly described botanical ingredients, traditional context and practical daily-use guidance. Current listed price: ₹${product.price.toLocaleString('en-IN')}.</p>
    <figure><img src="${PRODUCT_IMAGES[slug] || LOGO}" alt="${escapeHtml(product.name)} by Aarogya Seva Ayurvedic wellness product" width="600" height="600" loading="eager" decoding="async"><figcaption>${escapeHtml(product.name)} — Aarogya Seva</figcaption></figure>
    <section><h2>उत्पाद का परिचय</h2><p>${escapeHtml(education.intro || '')}</p></section>
    <section><h2>मुख्य सामग्री और वनस्पति परिचय</h2><p>${escapeHtml(education.ingredients || '')}</p></section>
    <section><h2>चरक संहिता और आयुर्वेदिक संदर्भ</h2><p>${escapeHtml(education.classical || '')}</p></section>
    <section><h2>आयुर्वेद में इसके गुण और पारंपरिक उपयोग</h2><p>${escapeHtml(education.properties || '')}</p></section>
    <section><h2>क्यों उपयोग किया जाता है?</h2><p>${escapeHtml(education.why || '')}</p></section>
    <section><h2>दैनिक जीवन में उपयोग और सेवन की विधि</h2><p>${escapeHtml(education.how || '')}</p></section>
    <section><h2>पारंपरिक रूप और उपयोग के तरीके</h2><ul>${list(education.ways)}</ul></section>
    <section><h2>किस प्रकार की गुणवत्ता पर ध्यान दें?</h2><p>${escapeHtml(education.quality || '')}</p></section>
    <section><h2>आयुर्वेदिक दिनचर्या के साथ उपयोग</h2><p>${escapeHtml(education.routine || '')}</p></section>
    <section><h2>महत्वपूर्ण सावधानियाँ</h2><p>${escapeHtml(education.cautions || '')}</p></section>
    <section><h2>आयुर्वेदिक स्मरण मंत्र</h2><p>${escapeHtml(education.mantra || '')}</p></section>
    <section><h2>ज्ञान और जिम्मेदार उपयोग</h2><p>आयुर्वेदिक ग्रंथ किसी द्रव्य के गुण, कर्म और प्रयोग का पारंपरिक संदर्भ देते हैं; किसी आधुनिक branded product का परिणाम उसकी वास्तविक सामग्री, मात्रा, processing, गुणवत्ता और व्यक्ति की स्थिति पर निर्भर कर सकता है। इसलिए Aarogya Seva product page पर botanical identity, ingredient information, serving directions और traditional context को अलग-अलग समझना महत्वपूर्ण है। यह सामग्री सामान्य educational information के लिए है और व्यक्तिगत चिकित्सकीय परामर्श का विकल्प नहीं है।</p></section>
    <section><h2>संबंधित आयुर्वेदिक ज्ञान</h2><p><a href="/ayurvedic">Ayurvedic Wellness Guides</a> · <a href="/ayurvedic/ashwagandha">Ashwagandha Guide</a> · <a href="/ayurvedic/shilajit">Shilajit Guide</a> · <a href="/blog">Ayurveda Articles</a></p></section>
    <p><a href="/shop">Aarogya Seva के सभी उत्पाद देखें</a> · <a href="/about">Aarogya Seva के बारे में</a> · <a href="/contact">संपर्क करें</a></p>
  `;
  writePage(`ayurvedic-products/${slug}`,title,description,'Product',product.name,body);
}

const commercialGuideContent = {
  'ayurvedic/giloy': {
    intro: 'Giloy, also called Guduchi (Tinospora cordifolia), has a place in traditional Ayurvedic practice. Customers comparing Giloy products should start with the exact plant part, extract form, ingredient quantity, serving directions and cautions printed on the pack. Traditional use does not guarantee a specific outcome from every modern product.',
    sections: [
      ['What to check before buying Giloy capsules', 'Read the complete ingredient panel and confirm the botanical name, plant part, extract quantity, excipients, net quantity, manufacturer details, batch information and expiry date. Do not rely on a product title alone to judge strength or quality.'],
      ['Traditional context and responsible use', 'Giloy is discussed in Ayurvedic traditions, but it should not be presented as a guaranteed treatment or a replacement for diagnosis or prescribed care. People with existing conditions, those taking medicines, and pregnant or breastfeeding people should seek advice from a qualified healthcare professional before use.'],
      ['Explore Aarogya Seva products', 'Review the Giloy Extract Capsules product page for available label details and current price. Compare the actual pack information with your needs before adding it to your cart.']
    ],
    links: [['Giloy Extract Capsules','/ayurvedic-products/giloy-extract-capsules-india'],['All products','/shop'],['Product policies','/policies']]
  },
  'ayurvedic/digestion': {
    intro: 'Aarogya Seva’s digestive wellness range includes GASS OFF Churan. If you are comparing digestive products online in India, use the ingredient list, serving directions, pack size, price per pack, storage instructions and manufacturer information—not broad promises—to decide what fits your preferences.',
    sections: [
      ['How to compare digestive churan', 'Check the complete ingredient panel, net weight, recommended serving, warnings, batch number and expiry date. Follow the label and do not exceed its directions. If digestive symptoms are severe, persistent, recurrent, or accompanied by blood, fever, dehydration or unexplained weight loss, seek medical care rather than relying on a supplement.'],
      ['Everyday digestive habits', 'Regular meals, adequate fluids, appropriate fibre, movement and noticing food triggers can support general digestive wellbeing. Individual needs vary; a product is not a substitute for evaluating persistent symptoms.'],
      ['Shop GASS OFF Churan', 'Review the GASS OFF Churan 100 g product page for current product and label details. Check the final cart total, shipping charge and available payment method before confirming an order.']
    ],
    links: [['GASS OFF Churan 100 g','/ayurvedic-products/gass-off-churan-100g'],['All products','/shop'],['Shipping and policies','/policies']]
  },
  'ayurvedic/mens-wellness': {
    intro: 'Explore Aarogya Seva products commonly considered within men’s general wellness routines, including Shilajeet Capsules, Ashwagandha Extract Capsules and DIG-UP Capsules. Products differ in ingredients and label directions; compare the pack information rather than assuming that all herbal blends have the same purpose or effect.',
    sections: [
      ['Compare ingredients and labels', 'Check the botanical names, ingredient quantities, serving instructions, warnings, manufacturer details and batch/expiry information. For Shilajit products, prioritise clear information on purification and quality testing where available. Do not assume a product is tested or standardised unless the brand provides evidence.'],
      ['Set realistic expectations', 'Sleep, nutrition, physical activity, stress management and medical assessment can all matter to wellbeing. No supplement should be marketed as a guaranteed way to increase testosterone, cure sexual dysfunction or treat an underlying condition. Seek professional advice for persistent fatigue, sexual-health concerns or symptoms that are new or worsening.'],
      ['Explore related products', 'Read the individual product pages before choosing a single product or combination. Review the ingredient overlap and ask a qualified clinician or pharmacist about possible interactions if you take medicines or have a health condition.']
    ],
    links: [['Shilajeet Capsules','/ayurvedic-products/shilajit-capsules-1000mg'],['Ashwagandha Capsules','/ayurvedic-products/ashwagandha-extract-capsules-india'],['DIG-UP Capsules','/ayurvedic-products/dig-up-men-wellness-capsules'],['All products','/shop']]
  },
  'ayurvedic-products-india': {
    intro: 'Shop Aarogya Seva Ayurvedic wellness products online in India. The catalogue includes Ashwagandha, Shilajeet, Giloy, Arjuna, digestive churan, other herbal products and selected combinations. Use each product page to review available ingredients, pack details, directions, price and relevant precautions before purchasing.',
    sections: [
      ['How to choose an Ayurvedic wellness product', 'Start with your intended general-wellness use, then compare the full ingredient list, botanical identity, ingredient quantity, serving directions, manufacturer details, batch and expiry. Prefer claims that are specific and supported by transparent product information.'],
      ['Price, delivery and payment', 'Check the current listed price and your cart total before checkout. Delivery fees, offers and payment methods may depend on order details. Only treat a discount as active when the checkout accepts it and shows the reduced total before payment.'],
      ['Responsible product information', 'Traditional Ayurvedic context and a product’s modern formulation are not the same thing. Products are not substitutes for diagnosis or prescribed treatment. If you are pregnant, breastfeeding, taking medicines or managing a health condition, seek qualified advice before use.']
    ],
    links: [['Shop all products','/shop'],['Ashwagandha Capsules','/ayurvedic-products/ashwagandha-extract-capsules-india'],['Shilajeet Capsules','/ayurvedic-products/shilajit-capsules-1000mg'],['GASS OFF Churan','/ayurvedic-products/gass-off-churan-100g'],['Contact Aarogya Seva','/contact']]
  },
  'offers': {
    intro: 'Browse current Aarogya Seva offers and product combinations. Offers, coupon eligibility, delivery charges and availability can change, so check the final cart and checkout summary before placing an order. A promotion should only be considered applied when the checkout displays the reduced total.',
    sections: [
      ['How to use an offer', 'Open the relevant product page, confirm the pack size and price, add the item to your cart, and review any offer instructions shown on the website. Enter a coupon only if it is currently advertised as available. Confirm that the discount appears in the order summary before paying.'],
      ['Compare value, not only the discount', 'Consider the quantity, ingredients, serving directions, delivery fee and whether the product suits your needs. A higher crossed-out price is not a substitute for clear product information.'],
      ['Need help before ordering?', 'Review the policies and contact information if you need clarification about an offer, delivery or an order. Do not complete payment if the checkout total or payment status is unclear.']
    ],
    links: [['Shop all products','/shop'],['Product policies','/policies'],['Contact Aarogya Seva','/contact']]
  }
};

for (const [route,title,description] of guidePages) {
  const key = route.endsWith('ashwagandha') ? 'ashwagandha-extract-capsules' : route.endsWith('shilajit') ? 'shilajeet-capsules' : null;
  const education = key ? PRODUCT_EDUCATION[key] || {} : {};
  const commercial = commercialGuideContent[route];
  const sections = commercial
    ? commercial.sections.map(([heading,content]) => '<section><h2>'+escapeHtml(heading)+'</h2><p>'+escapeHtml(content)+'</p></section>').join('')
    : [
        ['परिचय',education.intro],['मुख्य सामग्री',education.ingredients],['आयुर्वेदिक संदर्भ',education.classical],
        ['पारंपरिक उपयोग',education.properties],['क्यों उपयोग किया जाता है',education.why],
        ['उपयोग की विधि',education.how],['गुणवत्ता पर ध्यान',education.quality],['दैनिक दिनचर्या',education.routine]
      ].filter(([,p])=>p).map(([heading,p])=>'<section><h2>'+escapeHtml(heading)+'</h2><p>'+escapeHtml(p)+'</p></section>').join('');
  const links = commercial
    ? commercial.links.map(([label,href])=>'<li><a href="'+href+'">'+escapeHtml(label)+'</a></li>').join('')
    : '<li><a href="/shop">Aarogya Seva के उत्पाद देखें</a></li><li><a href="/blog">Ayurveda Articles पढ़ें</a></li>';
  const safety = '<section><h2>महत्वपूर्ण जानकारी</h2><p>यह सामग्री सामान्य जानकारी के लिए है, व्यक्तिगत चिकित्सकीय सलाह का विकल्प नहीं। उत्पाद के लेबल का पालन करें और किसी बीमारी के निदान या उपचार के लिए योग्य स्वास्थ्य-विशेषज्ञ से सलाह लें।</p></section>';
  writePage(route,title,description,'WebPage',title,
    '<p>'+escapeHtml(commercial ? commercial.intro : description)+'</p>'+sections+safety+
    '<section><h2>संबंधित उत्पाद और जानकारी</h2><ul>'+links+'</ul></section>');
}

for (const [slug,title,description] of articlePages) {
  const article = BLOG_POSTS.find(p => p.id === slug);
  const sections = article?.sections || [];
  const body = sections.map(([heading,content]) => '<section><h2>'+escapeHtml(heading)+'</h2><p>'+escapeHtml(content)+'</p></section>').join('');
  writePage('blog/'+slug,title,description,'Article',title,body+'<p><a href="/ayurvedic">Ayurvedic Wellness Guides</a> · <a href="/shop">Aarogya Seva Products</a></p>');
}

console.log(`Generated ${productPages.length} product, ${guidePages.length} guide and ${articlePages.length} article SEO pages.`);
