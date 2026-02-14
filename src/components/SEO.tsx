import React, { useEffect } from 'react';
import { getContent } from '../data/content';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const content = getContent();
  const siteTitle = content.meta?.pageTitle || 'sodaroja';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const desc = description || content.meta?.description || 'Un podcast que viaja por el mundo contando historias.';

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          el.setAttribute('property', property);
        } else {
          el.setAttribute('name', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('og:title', fullTitle);
    setMeta('og:description', desc);
    setMeta('og:type', 'website');
    if (image) setMeta('og:image', image);
    if (url) setMeta('og:url', url);
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    if (image) setMeta('twitter:image', image);
  }, [fullTitle, desc, image, url]);

  return null;
};
