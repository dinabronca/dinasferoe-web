import React, { useEffect, useState } from 'react';

interface StarsProps {
  count?: number;
  active?: boolean;
}

export const Stars: React.FC<StarsProps> = ({ count = 100, active = false }) => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    if (!active) {
      setStars([]);
      return;
    }

    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60, // Solo en la mitad superior
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 4,
    }));
    setStars(newStars);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};
