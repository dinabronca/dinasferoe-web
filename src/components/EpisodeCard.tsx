import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../data/auth';

interface Episode {
  id: string; city: string; title: string; description: string; imageUrl: string;
  isPremium: boolean; lat?: number; lng?: number; publishDate?: string;
  links?: Record<string, string>; embeds?: Record<string, string>;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const EpisodeCard: React.FC<{ episode: Episode; isNewest?: boolean; episodeNumber?: number }> = ({ episode, isNewest = false, episodeNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [listened, setListened] = useState(false);
  const [showListenPrompt, setShowListenPrompt] = useState(false);
  const formattedDate = formatDate(episode.publishDate);
  const user = getCurrentUser();
  const isPremiumUser = user?.isPremium === true;
  const isLocked = episode.isPremium && !isPremiumUser;
  const isUnlockedPremium = episode.isPremium && isPremiumUser;
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  useEffect(() => {
    try { const data = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]'); setListened(data.includes(episode.id)); } catch {}
  }, [episode.id]);

  const markListened = (val: boolean) => {
    try {
      const data: string[] = JSON.parse(localStorage.getItem('sodaroja-listened') || '[]');
      const next = val ? (data.includes(episode.id) ? data : [...data, episode.id]) : data.filter(id => id !== episode.id);
      localStorage.setItem('sodaroja-listened', JSON.stringify(next));
      setListened(val); setShowListenPrompt(false);
    } catch {}
  };

  useEffect(() => {
    if (isExpanded) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleCardClick = () => {
    if (!isLocked) { setIsExpanded(true); if (!listened) setShowListenPrompt(true); }
  };

  const links = episode.links || {};
  const embeds = episode.embeds || {};

  return (
    <>
      {/* TARJETA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={!isLocked ? { y: -4, transition: { duration: 0.5, ease: 'easeOut' } } : undefined}
        className="relative group h-full"
        onClick={handleCardClick}
        style={{ cursor: isLocked ? 'default' : 'pointer' }}
      >
        <div className={`relative overflow-hidden rounded-sm h-full flex flex-col transition-all duration-500 ${
          isUnlockedPremium
            ? 'bg-gradient-to-b from-soda-deep to-[#1a1020] border border-soda-red/30 hover:border-soda-red/50'
            : isLocked
            ? 'bg-soda-deep border border-soda-mist/15 hover:border-soda-red/20'
            : 'bg-soda-deep border border-soda-mist/20 hover:border-soda-accent/35'
        }`}>
          <div className="relative h-64 overflow-hidden">
            <img src={episode.imageUrl} alt={episode.city}
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              loading="lazy"
              style={isLocked ? { filter: 'saturate(0.3) contrast(1.1) brightness(0.6) blur(2.5px)' } : isUnlockedPremium ? { filter: 'contrast(1.05) saturate(1.05)' } : {}} />

            {/* VHS scanline for premium (locked or unlocked) */}
            {(isUnlockedPremium || isLocked) && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
                {/* Moving scanline */}
                <div style={{ position: 'absolute', left: 0, width: '100%', height: '30%', background: 'linear-gradient(transparent 0%, rgba(196,85,85,0.06) 40%, rgba(196,85,85,0.12) 50%, rgba(196,85,85,0.06) 60%, transparent 100%)', animation: 'vhsScan 4s linear infinite' }} />
                {/* Horizontal lines */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)' }} />
              </div>
            )}

            {/* Glitch color shift for premium */}
            {isUnlockedPremium && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 11, mixBlendMode: 'screen', opacity: 0.08, background: 'linear-gradient(90deg, rgba(255,0,0,0.3) 33%, rgba(0,255,0,0.3) 66%, rgba(0,0,255,0.3))' }} />
            )}

            {/* Badges izquierda */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
              {isUnlockedPremium && (
                <div style={{ background: 'rgba(196,85,85,0.85)', padding: '4px 12px', borderRadius: '2px', boxShadow: '0 2px 8px rgba(196,85,85,0.3)' }}>
                  <span style={{ color: 'white', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em' }}>FRECUENCIA INTERNA</span>
                </div>
              )}
              {isNewest && <div className="bg-emerald-500 px-3 py-1 rounded-sm"><span className="text-white text-[10px] font-bold tracking-widest">RECIÉN SALIDO</span></div>}
            </div>

            {/* Badges derecha */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
              {listened && (
                <div style={{ background: 'rgba(52,211,153,0.85)', padding: '5px 8px', borderRadius: '2px', border: '1px solid rgba(52,211,153,0.6)', boxShadow: '0 0 8px rgba(52,211,153,0.5)' }} title="Ya lo escuchaste">
                  <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>✓</span>
                </div>
              )}
              {episodeNumber !== undefined && <div className="bg-soda-night/80 px-2.5 py-1 rounded-sm border border-soda-mist/15"><span className="text-soda-lamp text-[11px] font-mono font-bold">#{episodeNumber}</span></div>}
            </div>

            {/* Premium locked — cinematic mystery */}
            {isLocked && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.5) 40%, rgba(10,14,26,0.7) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
                  <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', borderRadius: '50%', border: '1.5px solid rgba(196,85,85,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,85,85,0.08)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c45555', boxShadow: '0 0 12px rgba(196,85,85,0.6)' }} />
                  </div>
                  <div style={{ color: 'rgba(254,248,237,0.8)', fontSize: '11px', letterSpacing: '0.2em', fontWeight: 300 }}>FRECUENCIA INTERNA</div>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-transparent to-transparent" />
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={`text-xs tracking-widest uppercase font-light ${isUnlockedPremium ? 'text-soda-red' : 'text-soda-accent'}`}>{episode.city}</div>
                {formattedDate && !episode.isPremium && <div className="text-soda-fog text-xs font-light">{formattedDate}</div>}
              </div>
              <h3 className="text-soda-glow text-2xl font-serif mb-3">"{episode.title}"</h3>
              <p className="text-soda-fog text-sm leading-relaxed font-light">{episode.description}</p>
            </div>
            {!isLocked && (
              <div className={`pt-4 border-t ${isUnlockedPremium ? 'border-soda-red/20' : 'border-soda-mist/10'}`}>
                <div className={`text-[11px] tracking-widest text-center font-light transition-colors duration-500 ${isUnlockedPremium ? 'text-soda-red/70 group-hover:text-soda-red' : 'text-soda-fog/60 group-hover:text-soda-accent'}`}>Escuchar ▸</div>
              </div>
            )}
            {isLocked && (
              <Link to="/frecuencia-interna" onClick={e => e.stopPropagation()} className="block w-full py-3 border border-soda-red/30 text-soda-red/70 rounded-sm hover:border-soda-red/50 hover:text-soda-red hover:bg-soda-red/5 transition-all duration-500 text-[11px] tracking-widest font-light text-center">
                DESBLOQUEAR
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* MODAL — only renders when open */}
      {isExpanded && !isLocked && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4 md:p-8" onClick={() => setIsExpanded(false)}>
          <div className="absolute inset-0 bg-soda-night/95" />
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-soda-deep border border-soda-mist/30 rounded-sm"
            style={{ WebkitOverflowScrolling: 'touch' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsExpanded(false)} className="absolute top-3 right-3 z-50 w-10 h-10 bg-soda-night/80 rounded-full flex items-center justify-center text-soda-lamp hover:text-soda-glow transition-colors"><X size={20} /></button>

              <div className="relative h-64 overflow-hidden">
                <img src={episode.imageUrl} alt={episode.city} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-soda-deep via-soda-deep/50 to-transparent" />
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  {isUnlockedPremium && <div className="bg-soda-red px-4 py-1.5 rounded-sm"><span className="text-white text-[11px] font-bold tracking-widest">FRECUENCIA INTERNA</span></div>}
                  {isNewest && <div className="bg-emerald-500 px-4 py-1.5 rounded-sm"><span className="text-white text-[11px] font-bold tracking-widest">RECIÉN SALIDO</span></div>}
                </div>
                {episodeNumber !== undefined && <div className="absolute top-4 right-14 z-20 bg-soda-night/80 px-3 py-1.5 rounded-sm border border-soda-mist/15"><span className="text-soda-lamp text-xs font-mono font-bold">#{episodeNumber}</span></div>}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                  <div className="bg-soda-night/85 px-6 py-5">
                    <div className="text-white text-xs tracking-widest uppercase mb-1">{episode.city}</div>
                    {formattedDate && <div className="text-white/70 text-xs mb-1">{formattedDate}</div>}
                    <h2 className="text-2xl font-serif text-white">"{episode.title}"</h2>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-5">
                <p className="text-soda-lamp leading-relaxed text-sm sm:text-base">{episode.description}</p>
                {embeds.spotify && <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">SPOTIFY</h4><iframe src={embeds.spotify} width="100%" height={isMobile ? "152" : "232"} frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: '8px' }} /></div>}
                {embeds.soundcloud && <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">SOUNDCLOUD</h4><iframe src={embeds.soundcloud} width="100%" height={isMobile ? "120" : "166"} frameBorder="0" allow="autoplay" loading="lazy" /></div>}
                {embeds.ivoox && <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">IVOOX</h4><iframe src={embeds.ivoox} width="100%" height={isMobile ? "150" : "200"} frameBorder="0" loading="lazy" /></div>}
                {embeds.applePodcasts && <div><h4 className="text-soda-accent text-xs tracking-wider mb-2">APPLE PODCASTS</h4><iframe src={embeds.applePodcasts} width="100%" height={isMobile ? "150" : "175"} frameBorder="0" allow="autoplay *;" loading="lazy" /></div>}
                <div>
                  <h4 className="text-soda-accent text-xs tracking-wider mb-3">TAMBIEN DISPONIBLE EN</h4>
                  <div className="flex flex-wrap gap-3">
                    {links.youtube && <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />YouTube</a>}
                    {links.spotify && !embeds.spotify && <a href={links.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />Spotify</a>}
                    {links.soundcloud && !embeds.soundcloud && <a href={links.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-soda-mist/30 rounded-sm text-soda-lamp text-sm hover:border-soda-accent transition-all"><ExternalLink size={14} />SoundCloud</a>}
                  </div>
                </div>
                {showListenPrompt && !listened && (
                  <div className="border-t border-soda-mist/15 pt-5 mt-2">
                    <p className="text-soda-lamp text-sm text-center mb-3">¿Ya viajaste con este episodio? 🎧</p>
                    <div className="flex justify-center gap-3">
                      <button onClick={() => markListened(true)} className="px-5 py-2 bg-soda-red/15 border border-soda-red/40 rounded-sm text-soda-lamp text-sm hover:bg-soda-red/25 transition-all">Sí, ya lo escuché 🔴</button>
                      <button onClick={() => setShowListenPrompt(false)} className="px-5 py-2 border border-soda-mist/20 rounded-sm text-soda-fog text-sm hover:text-soda-lamp transition-all">Todavía no 👀</button>
                    </div>
                  </div>
                )}
                {listened && (
                  <div className="border-t border-soda-mist/15 pt-4 mt-2 flex items-center justify-between">
                    <p className="text-emerald-400/70 text-xs">✓ Ya escuchaste este episodio</p>
                    <button onClick={() => markListened(false)} className="text-soda-fog/40 text-[11px] hover:text-soda-fog transition-colors">desmarcar</button>
                  </div>
                )}
              </div>
          </div>
        </div>
      )}
    </>
  );
};
