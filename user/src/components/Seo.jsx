import React from 'react';
import { Helmet } from 'react-helmet';

const Seo = ({
  title = "DeenFit | Premium Islamic Caps",
  description = "Shop premium Islamic caps and streetwear with Urdu calligraphy and Islamic art. Wear your Imaan with pride.",
  keywords = "Islamic caps, DeenFit, Muslim caps, Urdu calligraphy cap, halal fashion",
  image = "https://yourdomain.com/default-banner.png",
  url = "https://yourdomain.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DeenFit" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="DeenFit" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
