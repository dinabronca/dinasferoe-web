import React, { useState, useMemo, lazy } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { EpisodeCard } from '../components/EpisodeCard';
import { EpisodeVibes } from '../effects/SectionBackgrounds';
import { getContent } from '../data/content';
import { demoEpisodes } from '../data/episodes';
import { SEO } from '../components/SEO';

export const EpisodiosPage: React.FC = () => {
  const content = getContent();
  // Combinar: episodios del admin store + demo fallback
  const storeEps = content.episodios?.items || [];
  const allRaw = storeEps.length > 0 ? storeEps : demoEpisodes;

  // Ordenar mas reciente primero
  const allSorted = useMemo(() =>
    [...allRaw].sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || '')),
    [allRaw]
  );

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  // Mapa de id -> numero (mas antiguo = #1, mas reciente = mayor numero)
  const episodeNumberMap = useMemo(() => {
    const byDate = [...allRaw].sort((a, b) => (a.publishDate || '').localeCompare(b.publishDate || ''));
    const map: Record<string, number> = {};
    byDate.forEach((ep, i) => { map[ep.id] = i + 1; });
    return map;
  }, [allRaw]);

  const filtered = useMemo(() => {
    let eps = allSorted;
    if (search) {
      const q = search.toLowerCase().trim();
      const numMatch = q.match(/^#?(\d+)$/);
      if (numMatch) {
        const num = parseInt(numMatch[1]);
        eps = eps.filter(e => episodeNumberMap[e.id] === num);
      } else {
        eps = eps.filter(e => e.city.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      }
    }
    if (filter === 'free') eps = eps.filter(e => !e.isPremium);
    if (filter === 'premium') eps = eps.filter(e => e.isPremium);
    return eps;
  }, [allSorted, search, filter, episodeNumberMap]);

  const cities = useMemo(() => [...new Set(allSorted.map(e => e.city))], [allSorted]);

  const newestId = allSorted.length > 0 ? allSorted[0].id : null;

  return (
    <section className="relative pt-28 sm:pt-32 pb-24 px-4 sm:px-6 min-h-screen">
      <SEO title="Episodios" description="Todos los episodios de sodaroja. Historias reales de ciudades del mundo." />
      <EpisodeVibes />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-soda-glow mb-4 sm:mb-6">{content.episodios?.title || 'Todos los Episodios'}</h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-4 sm:mb-6" />
          <p className="text-soda-fog font-light tracking-wide text-base sm:text-lg">{filtered.length} episodios</p>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-12">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-soda-fog" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por ciudad, titulo o #número..." className="w-full bg-soda-slate/30 border border-soda-mist/15 rounded-sm pl-10 pr-4 py-2.5 text-soda-lamp text-sm focus:border-soda-accent/40 focus:outline-none transition-colors duration-500" />
          </div>
          <div className="flex gap-2">
            {(['all', 'free', 'premium'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-sm text-xs tracking-wider transition-all duration-500 border ${filter === f ? 'border-soda-red/50 bg-soda-red/10 text-soda-glow' : 'border-soda-mist/15 text-soda-fog/60 hover:text-soda-fog hover:border-soda-mist/25'}`}>
                {f === 'all' ? 'TODOS' : f === 'free' ? 'ABIERTOS' : 'FRECUENCIA INTERNA'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((episode: any, index: number) => (
            <motion.div key={episode.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}>
              <EpisodeCard episode={episode} isNewest={episode.id === newestId} episodeNumber={episodeNumberMap[episode.id]} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16"><p className="text-soda-fog text-lg">No se encontraron episodios</p></div>
        )}

        <div className="text-center mt-12 sm:mt-16"><p className="text-soda-fog text-sm">Mas episodios proximamente</p></div>
      </div>
    </section>
  );
};
