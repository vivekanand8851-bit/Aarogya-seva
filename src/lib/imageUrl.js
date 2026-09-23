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
