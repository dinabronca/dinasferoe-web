import React from 'react';
import { motion } from 'framer-motion';
import { Package, Mail } from 'lucide-react';
import { getContent } from '../data/content';
import { BlueprintEffects } from '../effects/SectionBackgrounds';

export const Shop: React.FC = () => {
  const shop = getContent().shop;
  
  const comingSoonItems = [
    { icon: Package, name: 'Pack de Stickers', desc: 'Colección de stickers del culto' },
  ];

  return (
    <section id="shop" className="relative py-32 px-6 overflow-hidden">
      <BlueprintEffects />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            {shop.title}
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-lg">
            {shop.subtitle}
          </p>
        </motion.div>

        {/* Items centrados */}
        <div className="flex justify-center mb-12">
          {comingSoonItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-12 hover:border-soda-accent hover:border-opacity-40 transition-all text-center max-w-md w-full"
            >
              <item.icon size={48} className="text-soda-accent mb-6 mx-auto" />
              <h3 className="text-2xl font-serif text-soda-glow mb-3">{item.name}</h3>
              <p className="text-soda-fog text-sm">{item.desc}</p>
              <div className="mt-6 inline-block px-5 py-2 border border-soda-accent border-opacity-30 rounded-sm text-soda-accent text-xs tracking-wider">
                PRÓXIMAMENTE
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-soda-night bg-opacity-60 border border-soda-red border-opacity-30 rounded-sm p-12 text-center max-w-2xl mx-auto"
        >
          <div className="text-6xl mb-6">📦</div>
          <h3 className="text-2xl font-serif text-soda-glow mb-4">
            Notificame cuando esté disponible
          </h3>
          <p className="text-soda-fog mb-6 max-w-2xl mx-auto">
            Dejanos tu email y te avisamos cuando esté disponible el catálogo completo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 bg-soda-slate/40 border border-soda-mist/20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm"
            />
            <button className="px-6 py-3 bg-soda-accent/20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-soda-accent/30 transition-all flex items-center justify-center gap-2 text-sm">
              <Mail size={16} />
              <span>Avisame</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
