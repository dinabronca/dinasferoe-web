import React, { useEffect, useState } from 'react';

interface RainProps {
  intensity?: 'light' | 'medium' | 'heavy';
  active?: boolean;
}

export const Rain: React.FC<RainProps> = ({ intensity = 'medium', active = false }) => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    if (!active) {
      setDrops([]);
      return;
    }

    const dropCount = intensity === 'light' ? 50 : intensity === 'medium' ? 100 : 150;
    const newDrops = Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
    setDrops(newDrops);
  }, [intensity, active]);

  if (!active) return null;

  return (
    <div className="rain-container">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
