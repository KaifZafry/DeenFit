import React, { useEffect } from 'react';

const Seo = ({
  title = "DeenFit | Premium Islamic Caps",
  description = "Shop premium Islamic caps and streetwear with Urdu calligraphy and Islamic art. Wear your Imaan with pride.",
  keywords = "Islamic caps, DeenFit, Muslim caps, Urdu calligraphy cap, halal fashion",
  image = "https://yourdomain.com/default-banner.png",
  url = "https://yourdomain.com"
}) => {
  useEffect(() => {
    if (title) document.title = title;

    const upsertMeta = (selector, attrs) => {
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
        document.head.appendChild(tag);
        return;
      }
      Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    upsertMeta('meta[name="author"]', { name: 'author', content: 'DeenFit' });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'DeenFit' });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  }, [title, description, keywords, image, url]);

  return (
    null
  );
};

export default Seo;
