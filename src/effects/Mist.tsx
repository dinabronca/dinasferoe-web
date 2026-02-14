import React from 'react';

interface MistProps {
  active?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const Mist: React.FC<MistProps> = ({ active = false, intensity = 'medium' }) => {
  if (!active) return null;

  const opacity = intensity === 'light' ? 0.1 : intensity === 'medium' ? 0.2 : 0.3;

  return (
    <>
      <div 
        className="mist" 
        style={{ opacity, animationDuration: '12s' }}
      />
      <div 
        className="mist" 
        style={{ 
          opacity: opacity * 0.7, 
          animationDuration: '18s',
          animationDelay: '3s',
        }}
      />
      <div 
        className="mist" 
        style={{ 
          opacity: opacity * 0.5, 
          animationDuration: '24s',
          animationDelay: '6s',
        }}
      />
    </>
  );
};
