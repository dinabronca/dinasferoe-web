import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { EpisodeCard } from '../components/EpisodeCard';
import { getContent } from '../data/content';
import { demoEpisodes } from '../data/episodes';

export const HomePage: React.FC = () => {
  const content = getContent();
  const storeEps = content.episodios?.items || [];
  const allRaw = storeEps.length > 0 ? storeEps : demoEpisodes;
  const sorted = useMemo(() =>
    [...allRaw].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')),
    [allRaw]
  );
  const featured = sorted.slice(0, 6);

  const episodeNumberMap = React.useMemo(() => {
    const byDate = [...allRaw].sort((a, b) => (a.publishDate || '').localeCompare(b.publishDate || ''));
    const map: Record<string, number> = {};
    byDate.forEach((ep: any, i: number) => { map[ep.id] = i + 1; });
    return map;
  }, [allRaw]);

  return (
    <>
      <Hero />

      {/* ===== ÚLTIMOS DESTINOS — estilo editorial ===== */}
      <section id="episodios" className="relative py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header editorial — alineado izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 sm:mb-16"
          >
            {/* Línea roja + label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-soda-red" />
              <span className="text-soda-red text-[11px] tracking-[0.25em] uppercase font-light">Viajes recientes</span>
            </div>

            {/* Título grande con cursiva */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-soda-glow leading-tight">
              Los últimos <em className="text-soda-red/90">destinos</em>
            </h2>
          </motion.div>

          {/* Grid de episodios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featured.map((episode: any, index: number) => (
              <EpisodeCard key={episode.id} episode={episode} isNewest={index === 0} episodeNumber={episodeNumberMap[episode.id]} />
            ))}
          </div>

          {/* Ver todos — al final, centrado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mt-14 sm:mt-20"
          >
            <Link to="/episodios" className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 border border-soda-mist/20 text-soda-lamp/70 rounded-sm hover:border-soda-lamp/25 hover:text-soda-lamp transition-all duration-500 tracking-[0.2em] text-[11px] uppercase">
              Ver todos
              <ArrowRight size={14} className="text-soda-fog/50 group-hover:text-soda-lamp/70 group-hover:translate-x-0.5 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
