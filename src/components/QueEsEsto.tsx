import React from 'react';
import { motion } from 'framer-motion';
import { getContent } from '../data/content';

const colorMap: Record<string, { border: string; text: string }> = {
  red: { border: 'border-soda-red', text: 'text-soda-red' },
  accent: { border: 'border-soda-accent', text: 'text-soda-accent' },
  lamp: { border: 'border-soda-lamp', text: 'text-soda-lamp' },
  glow: { border: 'border-soda-glow', text: 'text-soda-glow' },
};

// Posiciones de lucecitas mapeadas a donde estan las antenas en la imagen
const antennaLights = [
  { x: 6, y: 28 }, { x: 12, y: 18 }, { x: 16, y: 24 }, { x: 20, y: 14 },
  { x: 26, y: 20 }, { x: 31, y: 26 }, { x: 36, y: 16 }, { x: 40, y: 22 },
  { x: 46, y: 12 }, { x: 50, y: 20 }, { x: 55, y: 18 }, { x: 60, y: 14 },
  { x: 65, y: 22 }, { x: 70, y: 16 }, { x: 75, y: 20 }, { x: 80, y: 24 },
  { x: 85, y: 18 }, { x: 90, y: 22 }, { x: 94, y: 16 },
];

export const QueEsEsto: React.FC = () => {
  const content = getContent();
  const { queEsEsto } = content;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  const lightsToShow = isMobile ? antennaLights.filter((_, i) => i % 3 === 0) : antennaLights;

  return (
    <section id="que-es-esto" className="relative py-32 px-6 overflow-hidden">

      {/* ===== CAPA 0: FONDO ANTENAS ===== */}
      <div className="absolute inset-0">
        {/* La imagen real */}
        <img
          src="/antenas-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'saturate(0.15) brightness(0.25) contrast(1.3)',
            opacity: 1,
          }}
        />
        {/* Color overlay oscuro para que pegue con el estilo */}
        <div className="absolute inset-0 bg-soda-night/70" />
        {/* Fade arriba y abajo para transición suave */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgb(10,14,26) 0%, transparent 15%, transparent 85%, rgb(10,14,26) 100%)',
        }} />
        {/* Tinte oscuro rojizo sutil */}
        <div className="absolute inset-0 bg-soda-red/[0.03]" />
      </div>

      {/* ===== CAPA 1: LUCECITAS DE ANTENA ===== */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {lightsToShow.map((pos, i) => (
          <motion.div
            key={`alight-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y + 20}%`,
              width: '5px',
              height: '5px',
              background: '#c45555',
              boxShadow: '0 0 8px rgba(196,85,85,0.7), 0 0 20px rgba(196,85,85,0.3)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                '0 0 6px rgba(196,85,85,0.4), 0 0 15px rgba(196,85,85,0.15)',
                '0 0 12px rgba(196,85,85,0.8), 0 0 30px rgba(196,85,85,0.4)',
                '0 0 6px rgba(196,85,85,0.4), 0 0 15px rgba(196,85,85,0.15)',
              ],
            }}
            transition={{
              duration: 1.5 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: (i % 7) * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ===== CAPA 2: HUMO SUTIL ===== */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={`smoke-${i}`}
              className="absolute"
              style={{
                left: `${-10 + i * 35}%`,
                bottom: '5%',
                width: '45%',
                height: '150px',
                background: `radial-gradient(ellipse, rgba(${i % 2 === 0 ? '10, 14, 26' : '20, 25, 40'}, 0.4) 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
              animate={{ x: [0, 40 + i * 15, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 14 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ===== CAPA 10: CONTENIDO ===== */}
      <div className="max-w-5xl mx-auto relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">{queEsEsto.title}</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg font-light max-w-4xl mx-auto leading-relaxed">{queEsEsto.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl font-serif text-soda-glow mb-4">{queEsEsto.structureTitle}</h3>
          <p className="text-soda-fog text-sm">{queEsEsto.structureSubtitle}</p>
        </motion.div>

        <div className="space-y-6">
          {queEsEsto.estructura.map((item, index) => {
            const colors = colorMap[item.color] || colorMap.accent;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`relative rounded-sm p-8 border transition-all duration-500 group ${
                  item.destacado
                    ? 'bg-soda-night/80 border-soda-red/30 hover:border-soda-red/45'
                    : 'bg-soda-night/70 border-soda-mist/15 hover:border-soda-accent/30'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-sm border-2 flex items-center justify-center font-serif text-2xl ${colors.border} ${colors.text}`}>
                    {item.numero}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <h4 className="text-2xl font-serif text-soda-glow">{item.titulo}</h4>
                        {item.subtitulo && (
                          <p className={`text-sm ${colors.text}`}>{item.subtitulo}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-soda-lamp text-base leading-relaxed font-light mb-3">{item.descripcion}</p>
                    <p className="text-soda-fog text-sm leading-relaxed font-light italic">{item.detalles}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-serif text-soda-glow mb-8 text-center">Temas que exploramos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {queEsEsto.temas.map((tema, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-4 py-3 bg-soda-night/80 border border-soda-accent/30 rounded-sm text-soda-accent text-sm text-center cursor-default"
              >
                {tema}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
