import React, { useEffect, useState } from 'react';

interface BokehProps {
  count?: number;
}

export const Bokeh: React.FC<BokehProps> = ({ count = 15 }) => {
  const [lights, setLights] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      'rgba(212, 197, 176, 0.4)',
      'rgba(232, 220, 200, 0.3)',
      'rgba(107, 122, 158, 0.3)',
      'rgba(139, 58, 58, 0.2)',
    ];

    const newLights = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
    }));
    setLights(newLights);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {lights.map((light) => (
        <div
          key={light.id}
          className="bokeh absolute"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            background: light.color,
            animationDuration: `${light.duration}s`,
            animationDelay: `${light.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
