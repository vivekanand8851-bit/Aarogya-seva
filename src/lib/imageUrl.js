export function normalizeImageUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  // Google Drive share links are not direct image URLs. Convert common
  // Drive formats to Google's thumbnail endpoint so they can be rendered
  // by <img>. The Drive file still needs "Anyone with the link" -> Viewer.
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();

    if (host === 'drive.google.com' || host === 'drive.usercontent.google.com') {
      let id = url.searchParams.get('id') || '';
      const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
      if (!id && fileMatch) id = fileMatch[1];

      if (id) {
        return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;
      }
    }
  } catch (_) {
    // Keep non-URL values unchanged; browser will surface any invalid URL.
  }

  return raw;
}

export function normalizeImageUrls(values = []) {
  return (Array.isArray(values) ? values : [values])
    .map(normalizeImageUrl)
    .filter(Boolean);
}


export function getImageFallback(name = 'Aarogya Seva', type = 'product') {
  const safeName = String(name || 'Aarogya Seva')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const isBrand = type === 'brand';
  const isPhoto = type === 'photo';
  const title = isBrand ? 'AAROGYA SEVA' : safeName;
  const subtitle = isBrand ? 'AAPKI SEHAT · HAMARI SEVA' : (isPhoto ? 'Aarogya Seva Wellness' : 'Ayurvedic Wellness');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520">
    <rect width="800" height="520" rx="28" fill="#faf6ec"/>
    <rect x="32" y="32" width="736" height="456" rx="24" fill="#ffffff" stroke="#e6b64c" stroke-width="3"/>
    <circle cx="400" cy="190" r="92" fill="#f1ead8"/>
    <rect x="340" y="125" width="120" height="150" rx="18" fill="#ffffff" stroke="#0f3d2e" stroke-width="4"/>
    <rect x="355" y="106" width="90" height="34" rx="8" fill="#0f3d2e"/>
    <rect x="357" y="165" width="86" height="60" rx="8" fill="#e6b64c"/>
    <path d="M400 178c-25 20-25 34 0 47 25-13 25-27 0-47z" fill="#0f3d2e"/>
    <text x="400" y="305" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#0f3d2e">${title}</text>
    <text x="400" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#8a7a5a">${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getProductImageFallback(name = 'Ayurvedic Product') {
  const safeName = String(name || 'Ayurvedic Product')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
    <rect width="420" height="420" rx="28" fill="#faf6ec"/>
    <circle cx="210" cy="155" r="82" fill="#f1ead8"/>
    <rect x="150" y="105" width="120" height="150" rx="18" fill="#ffffff" stroke="#c9b989" stroke-width="4"/>
    <rect x="166" y="86" width="88" height="34" rx="8" fill="#0f3d2e"/>
    <rect x="168" y="145" width="84" height="58" rx="8" fill="#e6b64c"/>
    <path d="M210 157c-22 18-22 31 0 43 22-12 22-25 0-43z" fill="#0f3d2e"/>
    <text x="210" y="226" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#0f3d2e">AAROGYA SEVA</text>
    <text x="210" y="310" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#0f3d2e">${safeName}</text>
    <text x="210" y="338" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#8a7a5a">Ayurvedic Wellness</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
