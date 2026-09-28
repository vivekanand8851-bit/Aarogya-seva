import React from 'react';
import { getImageFallback, normalizeImageUrl } from '../lib/imageUrl';

export default function SafeImage({ src, alt = '', fallbackLabel, fallbackType = 'product', className = '', ...props }) {
  const [failed, setFailed] = React.useState(false);
  const normalized = normalizeImageUrl(src);
  const fallback = getImageFallback(fallbackLabel || alt || 'Aarogya Seva', fallbackType);

  return (
    <img
      src={failed || !normalized ? fallback : normalized}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
