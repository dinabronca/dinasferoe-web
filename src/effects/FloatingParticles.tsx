import React, { useEffect, useState } from 'react';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  count = 30, 
  color = 'rgba(212, 197, 176, 0.3)' 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Reduce heavily on mobile
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const actualCount = isMobile ? Math.min(8, Math.floor(count / 5)) : count;
    
    const newParticles = Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-40 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: color,
            filter: 'blur(1px)',
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
