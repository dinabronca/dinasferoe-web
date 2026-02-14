import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden" style={style}>
      {!loaded && (
        <div className="absolute inset-0 bg-soda-slate animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={style}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
