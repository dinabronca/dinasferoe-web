import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Radio, MessageCircle, BarChart3, Trophy, Settings, CreditCard, LogOut, ArrowRight, Bell, Gift, Instagram, Youtube, Twitter, Headphones, Calendar, Zap, Star, ExternalLink, ChevronRight } from 'lucide-react';
import { getCurrentUser } from '../data/auth';

// ============================================================
// PLANES & BENEFICIOS
// ============================================================
interface Plan { id: string; name: string; priceARS: number; priceUSD: number; description: string; featured?: boolean; }
const plans: Plan[] = [
  { id: 'plan-a', name: 'Mate', priceARS: 2500, priceUSD: 4, description: 'Un empujoncito que suma mucho' },
  { id: 'plan-b', name: 'Soda', priceARS: 5000, priceUSD: 8, description: 'El que más eligen', featured: true },
  { id: 'plan-c', name: 'Sifón', priceARS: 12500, priceUSD: 20, description: 'Para los que quieren que esto crezca' },
];
const benefits = [
  '2 episodios extras por mes', 'Sorteos exclusivos', 'Historias más profundas',
  'Acceso anticipado', 'Tu Número de Socio', 'Comunidad privada',
  'Sin publicidad', 'RSS privado', 'Descuentos en la tienda', 'Ser parte real del proyecto',
];

// ============================================================
// LOCALSTORAGE HELPERS (en producción → Supabase)
// ============================================================
const getLS = (k: string, d: any = []) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(d)); } catch { return d; } };
const setLS = (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v));

// ============================================================
// AURORA BOREAL + RAYOS
// ============================================================
const AuroraEffect: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768);
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Aurora rojo/magenta */}
      <motion.div className="absolute" style={{ left: '-15%', top: '-25%', width: '80%', height: '60%',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(196,85,85,0.12) 0%, rgba(139,58,58,0.05) 40%, transparent 70%)',
        filter: 'blur(60px)' }}
        animate={{ x: [0, 100, -40, 0], y: [0, 40, -25, 0], opacity: [0.5, 0.8, 0.6, 0.5] }}
        transition={{ duration: isMobile ? 25 : 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Aurora azul */}
      <motion.div className="absolute" style={{ right: '-10%', top: '5%', width: '65%', height: '55%',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(138,155,196,0.10) 0%, rgba(100,130,180,0.04) 40%, transparent 70%)',
        filter: 'blur(55px)' }}
        animate={{ x: [0, -70, 50, 0], y: [0, -35, 25, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
        transition={{ duration: isMobile ? 28 : 17, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* Aurora verde tenue */}
      {!isMobile && <motion.div className="absolute" style={{ left: '15%', bottom: '-5%', width: '70%', height: '40%',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(80,180,120,0.05) 0%, transparent 60%)',
        filter: 'blur(55px)' }}
        animate={{ x: [0, 60, -40, 0], opacity: [0.3, 0.55, 0.35, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
      />}

      {/* ===== RAYOS DE LUZ ===== */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.div key={`ray-${i}`} className="absolute"
          style={{
            left: `${10 + i * 20}%`, top: 0, width: '2px', height: '100%',
            background: `linear-gradient(to bottom, transparent 0%, ${i % 2 === 0 ? 'rgba(196,85,85,0.12)' : 'rgba(138,155,196,0.08)'} 30%, ${i % 2 === 0 ? 'rgba(196,85,85,0.06)' : 'rgba(138,155,196,0.04)'} 70%, transparent 100%)`,
          }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.9, 0],
            scaleX: [1, 1.5, 1, 2, 1],
          }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 2.5, ease: 'easeInOut' }}
        />
      ))}
      {/* Rayos diagonales anchos */}
      {!isMobile && [0, 1].map(i => (
        <motion.div key={`dray-${i}`} className="absolute"
          style={{
            left: `${20 + i * 45}%`, top: '-10%', width: '80px', height: '120%',
            background: `linear-gradient(${150 + i * 30}deg, transparent 0%, rgba(196,85,85,0.03) 40%, rgba(138,155,196,0.02) 60%, transparent 100%)`,
            filter: 'blur(20px)',
            transform: `rotate(${-15 + i * 8}deg)`,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], x: [0, 30, 0] }}
          transition={{ duration: 10 + i * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 5 }}
        />
      ))}
    </div>
  );
};

// ============================================================
// SODITAS MISSIONS SYSTEM
// ============================================================
interface Mission { id: string; label: string; icon: React.ElementType; soditas: number; completed: boolean; type: 'one-time' | 'recurring'; }

const getMissions = (): Mission[] => {
  const completed: string[] = getLS('sodaroja-missions-done', []);
  const listenedCount = getLS('sodaroja-listened', []).length;
  const pollCount = Object.keys(getLS('sodaroja-user-poll-votes', {})).length;
  
  // Read config from admin (or use defaults)
  const config: any[] | null = (() => { try { return JSON.parse(localStorage.getItem('sodaroja-missions-config') || 'null'); } catch { return null; } })();
  
  const defaultConfig = [
    { id: 'listen-1', label: 'Escuchar tu primer episodio', icon: 'Headphones', soditas: 3, type: 'auto' },
    { id: 'listen-5', label: 'Escuchar 5 episodios', icon: 'Headphones', soditas: 8, type: 'auto' },
    { id: 'listen-10', label: 'Escuchar 10 episodios', icon: 'Star', soditas: 15, type: 'auto' },
    { id: 'follow-ig', label: 'Seguinos en Instagram', icon: 'Instagram', soditas: 5, type: 'social' },
    { id: 'follow-yt', label: 'Suscribite en YouTube', icon: 'Youtube', soditas: 5, type: 'social' },
    { id: 'follow-tw', label: 'Seguinos en X (Twitter)', icon: 'Twitter', soditas: 5, type: 'social' },
    { id: 'streak-3', label: '3 meses consecutivos suscripto', icon: 'Calendar', soditas: 10, type: 'auto' },
    { id: 'streak-6', label: '6 meses consecutivos suscripto', icon: 'Zap', soditas: 25, type: 'auto' },
    { id: 'poll-vote', label: 'Votar en una encuesta', icon: 'BarChart3', soditas: 3, type: 'recurring' },
    { id: 'early-bird', label: 'Ser de los primeros en escuchar', icon: 'Zap', soditas: 5, type: 'auto' },
  ];

  const iconMap: Record<string, React.ElementType> = { Headphones, Star, Instagram, Youtube, Twitter, Calendar, Zap, BarChart3, Trophy, Heart };
  const items = config || defaultConfig;

  return items.map((m: any) => {
    let autoCompleted = false;
    if (m.id === 'listen-1') autoCompleted = listenedCount >= 1;
    else if (m.id === 'listen-5') autoCompleted = listenedCount >= 5;
    else if (m.id === 'listen-10') autoCompleted = listenedCount >= 10;
    else if (m.id === 'poll-vote') autoCompleted = pollCount > 0;
    else autoCompleted = completed.includes(m.id);
    
    return {
      id: m.id,
      label: m.label,
      icon: iconMap[m.icon] || Star,
      soditas: m.soditas,
      completed: autoCompleted,
      type: m.type === 'recurring' ? 'recurring' as const : 'one-time' as const,
    };
  });
};

const completeMission = (missionId: string) => {
  const done: string[] = getLS('sodaroja-missions-done', []);
  if (!done.includes(missionId)) { done.push(missionId); setLS('sodaroja-missions-done', done); }
};

// ============================================================
// SUBSCRIBER DASHBOARD
// ============================================================
const SubscriberDashboard: React.FC = () => {
  const user = getCurrentUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [polls, setPolls] = useState<any[]>([]);
  const [pollVotes, setPollVotes] = useState<Record<string, Record<string, number>>>({});
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [raffles, setRaffles] = useState<any[]>([]);
  const [raffleEntries, setRaffleEntries] = useState<Record<string, boolean>>({});
  const [soditas, setSoditas] = useState(10);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [showMissions, setShowMissions] = useState(false);
  const [activePollPage, setActivePollPage] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState('plan-b');
  const [payMethod, setPayMethod] = useState('Mercado Pago');

  useEffect(() => {
    setMessages(getLS('sodaroja-internal-messages'));
    setPolls(getLS('sodaroja-polls'));
    setPollVotes(getLS('sodaroja-poll-votes', {}));
    setUserVotes(getLS('sodaroja-user-poll-votes', {}));
    setRaffles(getLS('sodaroja-raffles'));
    setRaffleEntries(getLS('sodaroja-raffle-entries', {}));
    setSoditas(parseInt(localStorage.getItem('sodaroja-user-bubbles') || '10'));
    setNotifications(getLS('sodaroja-user-notifications', []));
    setMissions(getMissions());
    setUserPlan(localStorage.getItem('sodaroja-user-plan') || 'plan-b');
    setPayMethod(localStorage.getItem('sodaroja-pay-method') || 'Mercado Pago');
  }, []);

  const listenedCount = useMemo(() => getLS('sodaroja-listened').length, []);
  const activePolls = polls.filter((p: any) => p.active);
  const activeRaffles = raffles.filter((r: any) => r.active);
  const currentPoll = activePolls[0];
  const currentRaffle = activeRaffles[0];
  const unreadNotifs = notifications.filter((n: any) => !n.read).length;

  const addSoditas = (amount: number) => {
    const n = soditas + amount; setSoditas(n); localStorage.setItem('sodaroja-user-bubbles', String(n));
  };

  const pollCompleted = currentPoll ? userVotes[currentPoll.id] !== undefined : true;

  const enterRaffle = (raffleId: string) => {
    const cost = raffles.find((r: any) => r.id === raffleId)?.soditasCost || 5;
    if (soditas < cost || raffleEntries[raffleId]) return;
    const ns = soditas - cost; setSoditas(ns); localStorage.setItem('sodaroja-user-bubbles', String(ns));
    const ne = { ...raffleEntries, [raffleId]: true }; setRaffleEntries(ne); setLS('sodaroja-raffle-entries', ne);
  };

  const claimSocialMission = (missionId: string) => {
    completeMission(missionId);
    addSoditas(5);
    setMissions(getMissions());
  };

  const markNotifRead = (id: string) => {
    const updated = notifications.map((n: any) => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated); setLS('sodaroja-user-notifications', updated);
  };

  // BANNER IMAGE SIZES (for Photoshop):
  // Encuesta banner: 800×200 px
  // Sorteo banner: 800×200 px

  return (
    <div className="space-y-8 relative" style={{ zIndex: 2 }}>
      {/* ===== HEADER ===== */}
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-soda-glow">Frecuencia Interna</h2>
          <p className="text-soda-lamp text-sm">Bienvenido/a, <span className="text-soda-red font-medium">{user?.name || 'suscriptor'}</span></p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-soda-red/10 border border-soda-red/30 rounded-sm px-4 py-1.5">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-2 h-2 bg-soda-red rounded-full" />
              <span className="text-soda-red text-xs tracking-wider font-medium">SEÑAL ACTIVA</span>
            </motion.div>
            <button onClick={() => setShowMissions(!showMissions)}
              className="inline-flex items-center gap-2 bg-soda-accent/10 border border-soda-accent/20 rounded-sm px-4 py-1.5 hover:bg-soda-accent/15 transition-all">
              <span className="text-sm">🥤</span>
              <span className="text-soda-lamp text-sm font-medium">{soditas} soditas</span>
              <ChevronRight size={12} className={`text-soda-fog transition-transform ${showMissions ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ===== MISIONES SODITAS (expandible) ===== */}
      <AnimatePresence>
        {showMissions && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <div className="bg-soda-night/70 border border-soda-accent/15 rounded-sm p-5 max-w-3xl mx-auto">
              <h3 className="text-soda-glow font-serif text-sm mb-4 flex items-center gap-2">🥤 Cómo ganar soditas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {missions.map(m => {
                  const Icon = m.icon;
                  const isSocial = m.id.startsWith('follow-');
                  return (
                    <div key={m.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-sm border transition-all ${
                      m.completed ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-soda-mist/10 hover:border-soda-accent/20'
                    }`}>
                      <Icon size={14} className={m.completed ? 'text-emerald-400' : 'text-soda-fog'} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs ${m.completed ? 'text-emerald-400/80 line-through' : 'text-soda-lamp'}`}>{m.label}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-soda-accent text-[11px] font-medium">+{m.soditas} 🥤</span>
                        {isSocial && !m.completed && (
                          <button onClick={() => claimSocialMission(m.id)} className="text-[10px] text-soda-accent border border-soda-accent/30 rounded-sm px-2 py-0.5 hover:bg-soda-accent/10">Hecho</button>
                        )}
                        {m.completed && <span className="text-emerald-400 text-[10px]">✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== GRID 3 COLUMNAS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ===== COL IZQUIERDA — Plan + Opciones ===== */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm p-5">
            <h3 className="text-soda-glow font-serif text-sm mb-4 flex items-center gap-2"><Settings size={14} className="text-soda-accent" />Tu Plan</h3>
            <div className="flex items-center justify-between mb-4">
              <div><div className="text-soda-lamp text-sm font-medium">Plan {plans.find(p => p.id === userPlan)?.name || 'Soda'}</div><div className="text-soda-fog text-xs">${(plans.find(p => p.id === userPlan)?.priceARS || 5000).toLocaleString('es-AR')} ARS / mes</div></div>
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-sm px-2.5 py-1"><span className="text-emerald-400 text-[11px]">Activo</span></div>
            </div>
            <div className="space-y-1">
              <button onClick={() => setOpenPanel(openPanel === 'plan' ? null : 'plan')} className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs text-soda-fog hover:text-soda-lamp hover:bg-soda-mist/5 transition-all"><ArrowRight size={12} className="text-soda-accent/50" />Cambiar plan</button>
              <AnimatePresence>{openPanel === 'plan' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="py-2 space-y-2">
                    {plans.map(p => (
                      <button key={p.id} onClick={() => { setUserPlan(p.id); localStorage.setItem('sodaroja-user-plan', p.id); setOpenPanel(null); }}
                        className={`w-full text-left px-3 py-2.5 rounded-sm border text-xs transition-all ${userPlan === p.id ? 'border-soda-red/40 bg-soda-red/10 text-soda-lamp' : 'border-soda-mist/10 text-soda-fog hover:border-soda-accent/20'}`}>
                        <div className="font-medium">{p.name} <span className="text-soda-fog font-normal">— ${p.priceARS.toLocaleString('es-AR')}/mes</span></div>
                        <div className="text-[10px] text-soda-fog/60 mt-0.5">{p.description}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}</AnimatePresence>

              <button onClick={() => setOpenPanel(openPanel === 'payment' ? null : 'payment')} className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs text-soda-fog hover:text-soda-lamp hover:bg-soda-mist/5 transition-all"><CreditCard size={12} className="text-soda-accent/50" />Medio de pago</button>
              <AnimatePresence>{openPanel === 'payment' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="py-2 space-y-2">
                    {['Visa ****6411', 'Mastercard ****2190', 'Mercado Pago'].map((m, i) => (
                      <button key={i} onClick={() => { setPayMethod(m); localStorage.setItem('sodaroja-pay-method', m); setOpenPanel(null); }}
                        className={`w-full text-left px-3 py-2 rounded-sm border text-xs transition-all ${payMethod === m ? 'border-soda-accent/30 bg-soda-accent/5 text-soda-lamp' : 'border-soda-mist/10 text-soda-fog hover:border-soda-accent/20'}`}>
                        <span>{i === 0 ? '💳' : i === 1 ? '💳' : '📱'} {m}</span>
                      </button>
                    ))}
                    <p className="text-soda-fog/40 text-[10px] px-1">En producción se conecta con tu pasarela de pagos.</p>
                  </div>
                </motion.div>
              )}</AnimatePresence>

              <button onClick={() => setOpenPanel(openPanel === 'history' ? null : 'history')} className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs text-soda-fog hover:text-soda-lamp hover:bg-soda-mist/5 transition-all"><BarChart3 size={12} className="text-soda-accent/50" />Historial de pagos</button>
              <AnimatePresence>{openPanel === 'history' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="py-2 space-y-1.5">
                    {[
                      { date: '01/02/2026', amount: 5000, method: payMethod, status: 'Pagado' },
                      { date: '01/01/2026', amount: 5000, method: payMethod, status: 'Pagado' },
                      { date: '01/12/2025', amount: 5000, method: payMethod, status: 'Pagado' },
                    ].map((h, i) => (
                      <div key={i} className="px-3 py-2 border border-soda-mist/5 rounded-sm">
                        <div className="flex justify-between text-xs"><span className="text-soda-lamp">{h.date}</span><span className="text-emerald-400/70">{h.status}</span></div>
                        <div className="flex justify-between text-[10px] text-soda-fog mt-0.5"><span>${h.amount.toLocaleString('es-AR')} ARS</span><span>{h.method}</span></div>
                      </div>
                    ))}
                    <p className="text-soda-fog/40 text-[10px] px-1">En producción estos datos vienen de tu pasarela.</p>
                  </div>
                </motion.div>
              )}</AnimatePresence>

              <button className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs text-soda-fog/40 hover:text-red-400/60 transition-all"><LogOut size={12} className="text-soda-accent/50" />Dar de baja</button>
            </div>
          </div>
          {/* Stats */}
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm p-4">
            <h4 className="text-soda-fog text-[10px] tracking-wider mb-3">TUS NÚMEROS</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { n: listenedCount, l: 'Episodios', e: '🎧' },
                { n: soditas, l: 'Soditas', e: '🥤' },
                { n: Object.keys(userVotes).length, l: 'Encuestas', e: '📊' },
                { n: Object.keys(raffleEntries).filter(k => raffleEntries[k]).length, l: 'Sorteos', e: '🎰' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2"><div className="text-soda-glow text-lg font-serif">{s.n}</div><div className="text-soda-fog text-[10px]">{s.e} {s.l}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== COL CENTRAL — Encuesta + Sorteo + Notificaciones ===== */}
        <div className="lg:col-span-5 space-y-4">
          {/* ENCUESTA con imagen/banner */}
          <div className="bg-soda-night/60 border border-soda-accent/15 rounded-sm overflow-hidden">
            {currentPoll ? (
              <>
                {/* Banner image — 800×200px */}
                {currentPoll.bannerUrl ? (
                  <img src={currentPoll.bannerUrl} alt={currentPoll.question} className="w-full h-auto cursor-pointer" onClick={() => setActivePollPage(currentPoll.id)} />
                ) : (
                  <div className="bg-gradient-to-r from-soda-accent/10 via-soda-deep to-soda-red/10 px-5 py-4 border-b border-soda-mist/10">
                    <div className="text-soda-fog text-[10px] tracking-wider mb-1">ENCUESTA ACTIVA</div>
                    <h4 className="text-soda-glow font-serif text-base">{currentPoll.question}</h4>
                  </div>
                )}
                {userVotes[currentPoll.id] !== undefined ? (
                  <div className="px-5 py-3">
                    <p className="text-emerald-400/70 text-xs flex items-center gap-1.5">✓ Ya votaste · +3 🥤 sumadas</p>
                  </div>
                ) : (
                  <div className="px-5 py-3">
                    <button onClick={() => setActivePollPage(currentPoll.id)}
                      className="w-full py-2.5 bg-soda-accent/15 border border-soda-accent/30 rounded-sm text-soda-lamp text-sm hover:bg-soda-accent/20 transition-all flex items-center justify-center gap-2">
                      <BarChart3 size={14} />Votar · +3 🥤
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <BarChart3 size={24} className="text-soda-fog/20 mx-auto mb-2" />
                <p className="text-soda-fog text-xs">No hay encuestas activas.</p>
              </div>
            )}
          </div>

          {/* SORTEO con banner */}
          <div className="bg-soda-night/60 border border-soda-red/15 rounded-sm overflow-hidden">
            {currentRaffle ? (
              <>
                {currentRaffle.bannerUrl ? (
                  <img src={currentRaffle.bannerUrl} alt={currentRaffle.title} className="w-full h-auto" />
                ) : (
                  <div className="bg-gradient-to-r from-soda-red/15 via-soda-deep to-soda-accent/10 px-5 py-4 border-b border-soda-mist/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-soda-fog text-[10px] tracking-wider mb-1">SORTEO</div>
                        <h4 className="text-soda-glow font-serif text-base">{currentRaffle.title}</h4>
                        <p className="text-soda-fog text-xs mt-1">{currentRaffle.description}</p>
                      </div>
                      <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">🎰</motion.span>
                    </div>
                  </div>
                )}
                <div className="px-5 py-4">
                  {raffleEntries[currentRaffle.id] ? (
                    <div className="text-center">
                      <p className="text-emerald-400 text-sm font-medium mb-1">¡Ya estás participando! 🎉</p>
                      <p className="text-soda-fog/50 text-[11px]">Buena suerte. Te notificamos si ganaste.</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-soda-fog text-xs">Cuesta <span className="text-soda-lamp font-medium">{currentRaffle.soditasCost || 5} 🥤</span></div>
                      <button onClick={() => enterRaffle(currentRaffle.id)} disabled={soditas < (currentRaffle.soditasCost || 5)}
                        className={`px-5 py-2.5 rounded-sm text-sm font-medium transition-all ${
                          soditas >= (currentRaffle.soditasCost || 5)
                            ? 'bg-soda-red/20 border border-soda-red/40 text-soda-lamp hover:bg-soda-red/30'
                            : 'border border-soda-mist/15 text-soda-fog/40 cursor-not-allowed'
                        }`}>Participar 🎰</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <Trophy size={24} className="text-soda-fog/20 mx-auto mb-2" />
                <p className="text-soda-fog text-xs">No hay sorteos activos. Guardá tus soditas 🥤</p>
              </div>
            )}
          </div>

          {/* NOTIFICACIONES PERSONALES */}
          <div className="bg-soda-night/60 border border-soda-lamp/10 rounded-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-soda-mist/10 flex items-center justify-between">
              <h3 className="text-soda-glow font-serif text-sm flex items-center gap-2">
                <Bell size={14} className="text-soda-lamp" />Notificaciones
                {unreadNotifs > 0 && <span className="bg-soda-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadNotifs}</span>}
              </h3>
            </div>
            <div className="max-h-48 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center"><p className="text-soda-fog/40 text-xs">Sin notificaciones.</p></div>
              ) : (
                <div className="divide-y divide-soda-mist/5">
                  {notifications.slice().reverse().map((n: any) => (
                    <motion.div key={n.id} initial={!n.read ? { x: -5 } : false} animate={{ x: 0 }}
                      onClick={() => markNotifRead(n.id)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${!n.read ? 'bg-soda-red/5 hover:bg-soda-red/8' : 'hover:bg-soda-mist/3'}`}>
                      <div className="flex items-start gap-2.5">
                        <span className="text-sm flex-shrink-0">
                          {n.type === 'winner' ? '🏆' : n.type === 'birthday' ? '🎂' : n.type === 'payment' ? '💳' : n.type === 'gift' ? '🎁' : '📬'}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs leading-relaxed ${!n.read ? 'text-soda-lamp font-medium' : 'text-soda-fog'}`}>{n.text}</p>
                          <p className="text-soda-fog/30 text-[10px] mt-1">{new Date(n.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 bg-soda-red rounded-full flex-shrink-0 mt-1" />}
                      </div>
                      {/* Efecto confeti para winners */}
                      {n.type === 'winner' && !n.read && (
                        <motion.div className="flex justify-center gap-1 mt-1"
                          animate={{ y: [-5, 0], opacity: [0, 1] }} transition={{ duration: 0.5 }}>
                          {['🎊', '✨', '🎉'].map((e, i) => (
                            <motion.span key={i} animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                              className="text-xs">{e}</motion.span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== COL DERECHA — Mensajes del equipo ===== */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-soda-night/60 border border-soda-mist/15 rounded-sm">
            <div className="px-4 py-3 border-b border-soda-mist/10">
              <h3 className="text-soda-glow font-serif text-sm flex items-center gap-2"><Radio size={14} className="text-soda-red" />Transmisiones</h3>
              <p className="text-soda-fog/40 text-[10px] mt-0.5">Mensajes del equipo sodaroja</p>
            </div>
            <div className="max-h-[480px] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Radio size={28} className="text-soda-fog/15 mx-auto mb-3" />
                  </motion.div>
                  <p className="text-soda-fog text-xs">Silencio en la frecuencia...</p>
                  <p className="text-soda-fog/40 text-[10px] mt-1">Cuando publiquemos algo, lo ves acá primero.</p>
                </div>
              ) : (
                <div className="divide-y divide-soda-mist/5">
                  {messages.slice().reverse().map((msg: any) => (
                    <div key={msg.id} className="px-4 py-3.5 hover:bg-soda-mist/3 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-7 h-7 bg-soda-red/15 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs">{msg.emoji || '📡'}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-soda-lamp text-sm leading-relaxed">{msg.text}</p>
                          <p className="text-soda-fog/30 text-[10px] mt-1.5">{new Date(msg.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== POLL PAGE (overlay) — multi-question ===== */}
      <AnimatePresence>
        {activePollPage && currentPoll && !pollCompleted && (
          <PollPage poll={currentPoll} onClose={() => setActivePollPage(null)} onComplete={(answers) => {
            // Save all answers
            const questions = currentPoll.questions || [{ question: currentPoll.question, options: currentPoll.options }];
            const nv = { ...pollVotes };
            questions.forEach((_: any, qi: number) => {
              const key = `${currentPoll.id}-q${qi}`;
              if (!nv[key]) nv[key] = {};
              const ans = answers[qi];
              if (ans !== undefined) nv[key][String(ans)] = (nv[key][String(ans)] || 0) + 1;
            });
            setPollVotes(nv); setLS('sodaroja-poll-votes', nv);
            const nuv = { ...userVotes, [currentPoll.id]: 1 }; setUserVotes(nuv); setLS('sodaroja-user-poll-votes', nuv);
            addSoditas(3);
            setActivePollPage(null);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Multi-question poll page component
const PollPage: React.FC<{ poll: any; onClose: () => void; onComplete: (answers: Record<number, number>) => void }> = ({ poll, onClose, onComplete }) => {
  const questions = poll.questions || [{ question: poll.question, options: poll.options }];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = questions.length;

  const selectOption = (optIdx: number) => {
    const newAnswers = { ...answers, [current]: optIdx };
    setAnswers(newAnswers);
    if (current < total - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      setTimeout(() => onComplete(newAnswers), 400);
    }
  };

  const q = questions[current];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-soda-night/95" />
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-soda-deep border border-soda-accent/20 rounded-sm" style={{ WebkitOverflowScrolling: 'touch' }} onClick={e => e.stopPropagation()}>
        {current === 0 && poll.bannerUrl && <img src={poll.bannerUrl} alt="" className="w-full h-auto" />}
        <div className="p-6">
          {/* Progress */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-soda-fog text-[11px]">{current + 1} de {total}</span>
            <div className="flex-1 mx-3 h-1 bg-soda-mist/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-soda-red/60 rounded-full" animate={{ width: `${((current + 1) / total) * 100}%` }} />
            </div>
            <span className="text-soda-accent text-[11px]">+3 🥤</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <h3 className="text-soda-glow font-serif text-lg mb-4">{q.question}</h3>
              <div className="space-y-2">
                {q.options.map((opt: string, idx: number) => {
                  const selected = answers[current] === idx;
                  return (
                    <button key={idx} onClick={() => selectOption(idx)}
                      className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-all ${
                        selected ? 'border border-soda-red/50 bg-soda-red/10 text-soda-lamp' : 'border border-soda-mist/15 text-soda-fog hover:border-soda-red/30 hover:bg-soda-red/5 hover:text-soda-lamp'
                      }`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-soda-night/80 rounded-full flex items-center justify-center text-soda-fog hover:text-soda-lamp">✕</button>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// PUBLIC VIEW (unchanged)
// ============================================================
const PublicView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('plan-b');
  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1];
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768);

  return (
    <>
      {[...Array(isMobile ? 3 : 6)].map((_, i) => (
        <motion.div key={`w-${i}`} className="absolute left-1/2 top-1/2 border-2 border-soda-red rounded-full pointer-events-none"
          style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px`, marginLeft: `-${150 + i * 75}px`, marginTop: `-${150 + i * 75}px` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {[...Array(isMobile ? 4 : 20)].map((_, i) => (
        <motion.div key={`p-${i}`} className="absolute w-1 h-1 bg-soda-red rounded-full opacity-40"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <motion.div animate={{ scale: [1, 1.03, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="inline-block mb-8">
            <div className="text-8xl text-soda-red">◉</div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">Frecuencia Interna</h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-red to-transparent mx-auto mb-8" />
          <p className="text-soda-lamp text-xl font-light max-w-2xl mx-auto mb-8">Las historias que se cuentan cuando la noche ya está avanzada</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-3xl mx-auto mb-20">
          <p className="text-soda-fog text-base font-light leading-relaxed text-center">Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos. Cada episodio lleva horas de investigación, edición y producción. Tu aporte nos permite seguir haciéndolo.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Elegí cómo querés sumarte</h3>
            <div className="space-y-6">
              {plans.map((plan, idx) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-soda-night/50 rounded-sm p-8 transition-all duration-500 cursor-pointer ${
                    selectedPlan === plan.id ? 'border border-soda-red/60 scale-[1.01]' : plan.featured ? 'border border-soda-accent/40' : 'border border-soda-mist/15 hover:border-soda-mist/30'
                  }`}>
                  <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-soda-red bg-soda-red' : 'border-soda-mist/40'}`}>{selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full" />}</div>
                  {plan.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-soda-red px-4 py-1 rounded-sm text-xs tracking-wider text-soda-glow">MÁS ELEGIDO</div>}
                  <div className="flex items-end justify-between pr-8">
                    <div><h4 className="text-2xl font-serif text-soda-glow mb-2">{plan.name}</h4><p className="text-soda-fog text-sm">{plan.description}</p></div>
                    <div className="text-right"><div className="text-3xl font-light text-soda-lamp">${plan.priceARS.toLocaleString('es-AR')}</div><div className="text-sm text-soda-fog">USD ${plan.priceUSD}/mes</div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-serif text-soda-glow mb-8 text-center lg:text-left">Qué te llevas al sumarte</h3>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm border border-soda-accent/40 flex items-center justify-center group-hover:border-soda-red group-hover:bg-soda-red/10 transition-all"><Check size={14} className="text-soda-accent group-hover:text-soda-red" /></div>
                  <span className="text-soda-lamp font-light group-hover:text-soda-glow transition-colors">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <div className="mb-6 text-center"><div className="text-soda-lamp text-sm mb-1">Plan seleccionado: <span className="text-soda-red font-medium">{currentPlan.name}</span></div><div className="text-soda-fog text-xs">${currentPlan.priceARS.toLocaleString('es-AR')} ARS / USD ${currentPlan.priceUSD} por mes</div></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="w-full sm:w-auto px-10 py-5 bg-soda-red/10 border border-soda-red/50 text-soda-glow rounded-sm hover:bg-soda-red/20 hover:border-soda-red/70 transition-all duration-500 tracking-wider">
              <span className="flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (ARGENTINA)</span>
              <span className="block text-xs text-soda-lamp mt-1 opacity-70">Mercado Pago · ${currentPlan.priceARS.toLocaleString('es-AR')} ARS/mes</span>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-soda-accent/8 border border-soda-accent/40 text-soda-glow rounded-sm hover:bg-soda-accent/15 hover:border-soda-accent/60 transition-all duration-500 tracking-wider">
              <span className="flex items-center justify-center gap-2"><Heart size={18} />SUSCRIBIRME (INTERNACIONAL)</span>
              <span className="block text-xs text-soda-lamp mt-1 opacity-70">USD ${currentPlan.priceUSD}/mes</span>
            </button>
          </div>
          <p className="text-soda-fog text-xs mt-8 font-light text-center">Cancelá cuando quieras, sin compromiso ni letra chica</p>
        </motion.div>
      </div>
    </>
  );
};

// ============================================================
// MAIN
// ============================================================
export const FrecuenciaInterna: React.FC = () => {
  const user = getCurrentUser();
  const isPremium = user?.isPremium === true;
  return (
    <section id="frecuencia-interna" className="relative py-32 px-6 bg-gradient-to-b from-soda-night via-soda-deep to-soda-night overflow-hidden">
      {isPremium && <AuroraEffect />}
      {isPremium ? <div className="max-w-7xl mx-auto relative z-10"><SubscriberDashboard /></div> : <PublicView />}
    </section>
  );
};
