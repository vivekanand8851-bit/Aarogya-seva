// Mock data for Aarogya Seva - with GENUINE brand assets

const LOGO = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/ws7ojtw3_aarogya%20seva%20logo.png';

// Genuine product bottle photos
const IMG_ARJUNA = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/9nl7yn4a_Arjuna.png';
const IMG_PILES_GILOY = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/0z5z0vli_Piles%20Norm.png';
const IMG_PILES_DIGUP = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/pqxkdic1_Piles%20Norm%20%2B%20Dig%20Up.png';
const IMG_SHIL_ASHWA = 'https://customer-assets-lqy194kg.emergentagent.net/job_wellness-india-4/artifacts/mvgj6it7_Shilajeet%20%2BAshwagandha.png';

export const BRAND_LOGO = LOGO;

export const CATEGORIES = [
  { id: 'heart-health', name: 'Heart Health', slug: 'heart-health', image: IMG_ARJUNA, description: 'Arjuna & cardiovascular wellness' },
  { id: 'immunity', name: 'Immunity Boosters', slug: 'immunity-boosters', image: IMG_PILES_GILOY, description: 'Giloy & natural defense' },
  { id: 'digestion', name: 'Digestive Health', slug: 'digestive-health', image: IMG_PILES_DIGUP, description: 'Gut & digestive support' },
  { id: 'mens-wellness', name: "Men's Wellness", slug: 'mens-wellness', image: IMG_SHIL_ASHWA, description: 'Strength, stamina, vitality' },
  { id: 'stress-relief', name: 'Stress & Sleep', slug: 'stress-sleep', image: IMG_SHIL_ASHWA, description: 'Ashwagandha & calm mind' },
  { id: 'specialty', name: 'Specialty Care', slug: 'specialty', image: IMG_PILES_GILOY, description: 'Targeted Ayurvedic solutions' },
];

export const PRODUCTS = [
  {
    id: 'arjuna-capsules', name: 'Arjuna Capsules', slug: 'arjuna-capsules', category: 'heart-health',
    price: 899, mrp: 2999, discount: 70, rating: 0, reviews: 0, inStock: true, isBestseller: true, isNew: false, badge: 'BESTSELLER',
    shortDesc: 'Arjuna bark extract for traditional Ayurvedic wellness and everyday vitality.',
    description: 'Aarogya Seva Arjuna Capsules use Terminalia arjuna bark extract, an herb with a long history of use in Ayurveda. Review the label, ingredient details and recommended directions before use.',
    benefits: ['Traditional Ayurvedic herbal ingredient', 'Supports a balanced wellness routine', 'Made with Arjuna bark extract', 'Vegetarian capsule', 'Clear ingredient and dosage information'],
    ingredients: 'Arjuna (Terminalia arjuna) Bark Extract 1000mg, Vegetarian Capsule Shell', dosage: '1 capsule twice daily with warm water after meals.', images: [IMG_ARJUNA, IMG_ARJUNA],
  },
  {
    id: 'shilajeet-caps', name: 'Shilajeet Capsules 1000mg', slug: 'shilajeet-capsules', category: 'mens-wellness',
    price: 1399, mrp: 4998, discount: 72, rating: 0, reviews: 0, inStock: true, isBestseller: true, isNew: false, badge: 'TOP SELLER',
    shortDesc: 'Purified Shilajeet extract for traditional Ayurvedic vitality and everyday wellness.',
    description: 'Aarogya Seva Shilajeet Capsules contain purified Shilajeet extract. Shilajeet has a long history of traditional Ayurvedic use; modern supplement claims can vary by preparation, so compare the ingredient amount, processing and label information.',
    benefits: ['Traditional Ayurvedic ingredient', 'Supports everyday vitality', 'Purified extract', 'Vegetarian capsule', 'Clear serving information'],
    ingredients: 'Purified Shilajeet Extract 1000mg (100% pure)', dosage: '1 capsule daily with warm milk or water.', images: [IMG_SHIL_ASHWA, IMG_SHIL_ASHWA],
  },
  {
    id: 'ashwagandha-caps', name: 'Ashwagandha Extract Capsules', slug: 'ashwagandha-extract-capsules', category: 'stress-relief',
    price: 799, mrp: 2799, discount: 71, rating: 0, reviews: 0, inStock: true, isBestseller: true, isNew: false, badge: 'BESTSELLER',
    shortDesc: 'Ashwagandha root extract for traditional Ayurvedic wellness and a balanced daily routine.',
    description: 'Aarogya Seva Ashwagandha Extract Capsules contain Withania somnifera root extract. Ashwagandha has a long history of use in Ayurveda; evidence and outcomes can vary by preparation and person.',
    benefits: ['Traditional Ayurvedic herb', 'Supports everyday wellness', 'Root extract', 'Vegetarian capsule', 'Clear serving information'],
    ingredients: 'Ashwagandha Root Extract 1000mg, Vegetarian Capsule Shell', dosage: '1-2 capsules daily after meals.', images: [IMG_SHIL_ASHWA, IMG_SHIL_ASHWA],
  },
  {
    id: 'giloy-extract', name: 'Giloy Extract Capsules', slug: 'giloy-extract-capsules', category: 'immunity',
    price: 649, mrp: 2299, discount: 71, rating: 0, reviews: 0, inStock: true, isBestseller: true, isNew: false, badge: 'IMMUNITY',
    shortDesc: 'Giloy (Guduchi) extract for traditional Ayurvedic wellness and everyday vitality.',
    description: 'Aarogya Seva Giloy Extract Capsules contain Giloy (Guduchi) stem extract, an herb traditionally used in Ayurveda. Product use should follow the label and should not be treated as a substitute for medical care.',
    benefits: ['Traditional Ayurvedic herb', 'Supports everyday wellness', 'Stem extract', 'Vegetarian capsule', 'Clear ingredient information'],
    ingredients: 'Giloy (Tinospora cordifolia) Stem Extract 1000mg', dosage: '1 capsule twice daily.', images: [IMG_PILES_GILOY, IMG_PILES_GILOY],
  },
  {
    id: 'dig-up', name: 'DIG-UP Capsules', slug: 'dig-up-capsules', category: 'mens-wellness',
    price: 849, mrp: 2998, discount: 72, rating: 0, reviews: 0, inStock: true, isBestseller: false, isNew: true, badge: 'NEW',
    shortDesc: 'Ayurvedic herbal blend formulated for men's general wellness and vitality.',
    description: 'A classical Ayurvedic formulation for men\u2019s wellness combining time-tested herbs to support natural male potency, health, vitality and libido. Non-habit forming, safe for daily use.',
    benefits: ['Men\'s general wellness support', 'Ayurvedic herbal blend', 'Supports a balanced daily routine', 'Vegetarian capsule', 'Clear ingredient information'],
    ingredients: 'Proprietary Ayurvedic blend — Ashwagandha, Safed Musli, Shilajeet, Kaunch Beej, Gokshura', dosage: '1 capsule twice daily.', images: [IMG_PILES_DIGUP, IMG_PILES_DIGUP],
  },
  {
    id: 'piles-norm', name: 'Piles Norm Capsules', slug: 'piles-norm-capsules', category: 'specialty',
    price: 749, mrp: 2599, discount: 71, rating: 0, reviews: 0, inStock: true, isBestseller: false, isNew: true, badge: 'NEW',
    shortDesc: 'Ayurvedic herbal formulation for digestive and personal wellness.',
    description: 'Piles Norm is an Ayurvedic herbal formulation. Product information and directions should be read carefully, and persistent or concerning symptoms should be discussed with a qualified healthcare professional.',
    benefits: ['Ayurvedic herbal formulation', 'Supports digestive and personal wellness', 'Plant-based ingredients', 'Clear ingredient information', 'Use according to label directions'],
    ingredients: 'Nagkesar, Haritaki, Neem, Triphala, Rasont, Kutki', dosage: '1 capsule twice daily after meals.', images: [IMG_PILES_GILOY, IMG_PILES_DIGUP],
  },
  {
    id: 'combo-shil-ashwa', name: 'Shilajeet + Ashwagandha Combo', slug: 'shilajeet-ashwagandha-combo', category: 'mens-wellness',
    price: 1899, mrp: 6999, discount: 73, rating: 0, reviews: 0, inStock: true, isBestseller: true, isNew: false, badge: 'COMBO DEAL',
    shortDesc: 'The ultimate men\u2019s vitality combo — Shilajeet + Ashwagandha at best price.',
    description: 'This combo pairs purified Shilajeet extract with Ashwagandha root extract. Both ingredients have a history of traditional Ayurvedic use; product claims can vary by preparation, so review the label and serving directions.',
    benefits: ['Complete men\u2019s vitality support', 'Save \u20b91600 vs individual', 'Energy + Stress relief combo', '60 + 60 = 120 capsules', 'Trusted Aarogya Seva quality'],
    ingredients: 'Shilajeet 1000mg + Ashwagandha 1000mg (60 caps each)', dosage: '1 of each daily.', images: [IMG_SHIL_ASHWA, IMG_SHIL_ASHWA],
  },
  {
    id: 'combo-piles-digup', name: 'Piles Norm + DIG-UP Combo', slug: 'piles-digup-combo', category: 'specialty',
    price: 1499, mrp: 5499, discount: 73, rating: 0, reviews: 0, inStock: true, isBestseller: false, isNew: true, badge: 'COMBO',
    shortDesc: 'Complete wellness combo — men\u2019s health & digestive-anal comfort.',
    description: 'This combo pairs two Ayurvedic herbal formulations for general wellness. Review each product's ingredients and label directions before use.',
    benefits: ['Two-in-one wellness pack', 'Save \u20b9500 combo pricing', 'Both 100% herbal', '120 capsules total', 'AYUSH-certified'],
    ingredients: 'Piles Norm 1000mg + DIG-UP 1000mg (60 caps each)', dosage: '1 of each twice daily.', images: [IMG_PILES_DIGUP, IMG_PILES_DIGUP],
  },
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Aapki Sehat, Hamari Seva',
    subtitle: 'Ayurvedic wellness rooted in traditional knowledge, with clear product information for modern India.',
    cta: 'Shop Best Sellers', link: '/shop', tag: 'UP TO 72% OFF',
    image: 'https://images.pexels.com/photos/18394078/pexels-photo-18394078.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 2,
    title: 'Heart Health, Naturally',
    subtitle: 'Discover Arjuna Capsules — the classical Ayurvedic answer to cardiovascular wellness.',
    cta: 'Try Arjuna Capsules', link: '/product/arjuna-capsules', tag: 'NEW LAUNCH',
    image: 'https://images.unsplash.com/photo-1621176313593-89976c1f1bed?crop=entropy&cs=srgb&fm=jpg&w=1600&q=85',
  },
  {
    id: 3,
    title: 'Strength for Every Man',
    subtitle: 'Shilajeet + Ashwagandha combo — vitality, stamina, stress relief in one pack.',
    cta: 'Grab Combo Deal', link: '/product/shilajeet-ashwagandha-combo', tag: 'SAVE \u20b91600',
    image: 'https://images.pexels.com/photos/12985803/pexels-photo-12985803.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export const TESTIMONIALS = [];

export const BLOG_POSTS = [
  {
    id: 'ashwagandha-benefits',
    title: 'Ashwagandha: Traditional Uses, Evidence & Buying Guide',
    excerpt: 'A practical guide to Ashwagandha covering traditional Ayurvedic use, modern research questions, supplement labels and responsible buying.',
    date: 'July 3, 2025',
    readTime: '7 min read',
    author: 'Aarogya Seva Editorial Team',
    image: IMG_SHIL_ASHWA,
    category: 'Herbal Wellness',
    sections: [
      ['What is Ashwagandha?', 'Ashwagandha (Withania somnifera) is a botanical used in Ayurvedic traditions. Modern supplements can contain root powder, root extract or other preparations, so two products with the same herb name are not necessarily equivalent.'],
      ['Traditional use and modern evidence are not the same thing', 'Traditional use provides historical context, while clinical research evaluates specific preparations and outcomes. Research findings should not be generalized to every Ashwagandha product or to every person.'],
      ['What to check on the label', 'Look for the botanical name, plant part, serving size, amount per serving, manufacturer information, batch details and directions for use. If a product makes a specific health claim, consider whether the claim is supported by credible evidence and permitted for the product category.'],
      ['How to use supplements responsibly', 'Follow the label and avoid assuming that a larger serving is better. People who are pregnant or breastfeeding, take prescription medicines, or have a medical condition should discuss supplement use with a qualified healthcare professional.'],
      ['Bottom line', 'A good buying decision starts with transparent labeling and realistic expectations. Ashwagandha can be part of a broader wellness routine, but a supplement should not replace professional medical care.'],
    ],
  },
  {
    id: 'shilajit-guide',
    title: 'Shilajit Guide: What It Is, Quality Checks & How to Compare Products',
    excerpt: 'Understand Shilajit, purification, common product formats, label checks and the difference between traditional use and modern marketing claims.',
    date: 'June 25, 2025',
    readTime: '8 min read',
    author: 'Aarogya Seva Editorial Team',
    image: IMG_SHIL_ASHWA,
    category: 'Ayurvedic Wellness',
    sections: [
      ['What is Shilajit?', 'Shilajit is a naturally occurring, resin-like substance associated with mountainous regions. It has a long history in traditional Ayurvedic preparations and is sold today in resin, powder, capsule and extract formats.'],
      ['Why purification and sourcing matter', 'Raw material and finished supplements are not automatically interchangeable. When comparing products, look for clear sourcing, purification or processing information, manufacturer details and batch-level quality information where available.'],
      ['Common marketing claims', 'Shilajit is often marketed for energy, stamina, testosterone, minerals or performance. These claims can vary substantially in evidence and may not apply to every preparation. Avoid choosing a product solely because of a dramatic promise.'],
      ['What should a buyer check?', 'Compare the actual ingredient amount, serving size, form, ingredient list, manufacturer, batch information, storage instructions and customer-support details. A transparent label makes products easier to compare.'],
      ['Safety and professional advice', 'Follow the product directions. If you take prescription medicines, have a medical condition, or are unsure whether a supplement is appropriate for you, ask a qualified healthcare professional before use.'],
    ],
  },
  {
    id: 'arjuna-heart',
    title: 'Arjuna in Ayurveda: Traditional Context & Heart-Wellness Questions',
    excerpt: 'Learn about Arjuna (Terminalia arjuna), its traditional Ayurvedic context and the questions to ask before choosing an Arjuna supplement.',
    date: 'June 18, 2025',
    readTime: '6 min read',
    author: 'Aarogya Seva Editorial Team',
    image: IMG_ARJUNA,
    category: 'Herbal Wellness',
    sections: [
      ['What is Arjuna?', 'Arjuna (Terminalia arjuna) is a tree traditionally used in Ayurvedic formulations. Its bark is the part most commonly discussed in classical Ayurvedic contexts and in modern supplements.'],
      ['Traditional context', 'Arjuna has a long history in Ayurvedic practice, but traditional use should not be presented as proof that a supplement can diagnose, treat or prevent a medical condition.'],
      ['What research questions are being studied?', 'Modern research has investigated Arjuna preparations in cardiovascular and related contexts, but study results depend on the preparation, dose, population and outcome measured. A consumer should not assume that research on one preparation applies to every product.'],
      ['Choosing an Arjuna supplement', 'Check the botanical name, plant part, amount per serving, manufacturer details, batch information, directions and any available testing documentation. Be cautious with claims that promise to replace prescribed heart medicines or medical treatment.'],
      ['If you have a heart condition', 'Do not use an Ayurvedic supplement as a substitute for prescribed care. Discuss any supplement with your doctor or another qualified healthcare professional, especially if you take cardiovascular medicines.'],
    ],
  },
];

export const FEATURES = [
  { icon: 'Leaf', title: '100% Natural', desc: 'Sourced from certified organic farms' },
  { icon: 'FlaskConical', title: 'Lab Tested', desc: 'Every batch triple-tested for purity' },
  { icon: 'Truck', title: 'Free Shipping', desc: 'On all orders above \u20b9499 across India' },
  { icon: 'ShieldCheck', title: 'AYUSH Certified', desc: 'Government approved formulations' },
  { icon: 'BadgeIndianRupee', title: 'COD Available', desc: 'Cash on delivery pan-India' },
  { icon: 'Undo2', title: 'Easy Returns', desc: '7-day hassle-free returns' },
];

export const ANNOUNCEMENT_MESSAGES = [
  'Extra \u20b9400 OFF at checkout \u2022 Use code AAROGYA400',
  'Sale is LIVE! Save min 50% on all orders + Free Shipping',
  'Free consultation with Ayurvedic experts on orders above \u20b91499',
];
