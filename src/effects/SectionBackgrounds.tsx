import React from 'react';

// ============================================================
// Backgrounds LIVIANOS — solo CSS estático, CERO motion, CERO animaciones
// ============================================================

export const TeamAmbience: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(196, 85, 85, 0.04) 0%, transparent 60%)' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(138, 155, 196, 0.03) 0%, transparent 50%)' }} />
  </div>
);

export const EpisodeVibes: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(196, 85, 85, 0.03) 0%, transparent 60%)' }} />
  </div>
);

export const BlueprintEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(138, 155, 196, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 155, 196, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
);

export const MailEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(138, 155, 196, 0.04) 0%, transparent 50%)' }} />
  </div>
);
