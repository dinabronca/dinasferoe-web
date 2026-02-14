import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { getContent } from './data/content';
import { initDemoUsers } from './data/auth';
import './styles/globals.css';

initDemoUsers();

// Lazy load pages que no se ven al inicio
const QueEsEstoPage = lazy(() => import('./pages/QueEsEstoPage').then(m => ({ default: m.QueEsEstoPage })));
const EquipoPage = lazy(() => import('./pages/EquipoPage').then(m => ({ default: m.EquipoPage })));
const EpisodiosPage = lazy(() => import('./pages/EpisodiosPage').then(m => ({ default: m.EpisodiosPage })));
const FrecuenciaInternaPage = lazy(() => import('./pages/FrecuenciaInternaPage').then(m => ({ default: m.FrecuenciaInternaPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ContactoPage = lazy(() => import('./pages/ContactoPage').then(m => ({ default: m.ContactoPage })));
const MiCuentaPage = lazy(() => import('./pages/MiCuentaPage').then(m => ({ default: m.MiCuentaPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const UnirsePage = lazy(() => import('./pages/UnirsePage').then(m => ({ default: m.UnirsePage })));

// Loading fallback minimalista
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-soda-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-soda-fog text-sm">Cargando...</p>
    </div>
  </div>
);

// Iconos SVG minimalistas para redes
const SocialIcon: React.FC<{ platform: string; iconUrl?: string }> = ({ platform, iconUrl }) => {
  if (iconUrl) return <img src={iconUrl} alt={platform} className="w-7 h-7 rounded-full object-cover" loading="lazy" />;

  const p = platform.toLowerCase();
  const colors: Record<string, string> = { instagram: '#c45555', youtube: '#8b3a3a', spotify: '#6b7a9e', soundcloud: '#c45555', tiktok: '#6b7a9e', twitter: '#8b3a3a', x: '#8b3a3a', default: '#c45555' };
  const bg = colors[p] || colors.default;
  const fg = '#d4c5b0';

  const getSymbol = () => {
    switch (p) {
      case 'instagram': return <><rect x="8" y="8" width="12" height="12" rx="3" fill="none" stroke={fg} strokeWidth="1.5" /><circle cx="14" cy="14" r="2.5" fill="none" stroke={fg} strokeWidth="1.2" /><circle cx="21" cy="7" r="1" fill={fg} /></>;
      case 'youtube': return <polygon points="11,9 11,19 21,14" fill={fg} />;
      case 'spotify': return <><path d="M 9 12 Q 14 10 19 12" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M 10 15 Q 14 13 18 15" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M 11 18 Q 14 16.5 17 18" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /></>;
      case 'soundcloud': return <><rect x="8" y="14" width="2" height="5" rx="1" fill={fg} /><rect x="11" y="11" width="2" height="8" rx="1" fill={fg} /><rect x="14" y="12" width="2" height="7" rx="1" fill={fg} /><rect x="17" y="10" width="2" height="9" rx="1" fill={fg} /></>;
      case 'tiktok': return <><path d="M 13 8 L 13 18 Q 13 20 11 20 Q 9 20 9 18 Q 9 16 11 16" fill="none" stroke={fg} strokeWidth="1.5" strokeLinecap="round" /><path d="M 13 12 Q 16 12 18 9" stroke={fg} strokeWidth="1.3" fill="none" strokeLinecap="round" /></>;
      case 'x': case 'twitter': return <><line x1="9" y1="9" x2="19" y2="19" stroke={fg} strokeWidth="1.8" strokeLinecap="round" /><line x1="19" y1="9" x2="9" y2="19" stroke={fg} strokeWidth="1.8" strokeLinecap="round" /></>;
      default: return <circle cx="14" cy="14" r="3" fill={fg} />;
    }
  };

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="transition-transform duration-500 hover:scale-105">
      <circle cx="14" cy="14" r="13" fill={bg} />{getSymbol()}
    </svg>
  );
};

const Footer: React.FC = () => {
  const content = getContent();
  const visibleLinks = content.socialLinks.filter(l => l.visible);

  return (
    <footer className="relative py-8 sm:py-12 px-4 sm:px-6 border-t border-soda-mist border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 28 28" className="opacity-80"><circle cx="14" cy="14" r="12" fill="#c45555" /><circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" /><path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" /><path d="M 4 8 Q 2 14 4 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" /><path d="M 24 8 Q 26 14 24 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.7" /></svg>
              <svg width="24" height="24" viewBox="0 0 28 28" className="opacity-80"><circle cx="14" cy="14" r="12" fill="#6b7a9e" /><circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" /><path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" /></svg>
              <svg width="24" height="24" viewBox="0 0 28 28" className="opacity-80"><circle cx="14" cy="14" r="12" fill="#8b3a3a" /><circle cx="10" cy="12" r="1.2" fill="#d4c5b0" /><circle cx="18" cy="12" r="1.2" fill="#d4c5b0" /><path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.2" fill="none" strokeLinecap="round" /><path d="M 4 8 Q 2 14 4 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" /><path d="M 24 8 Q 26 14 24 20" stroke="#8b3a3a" strokeWidth="2.5" fill="none" opacity="0.7" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-serif text-soda-glow mb-0.5">sodaroja</h3>
              <p className="text-soda-fog text-xs">&copy; 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            {visibleLinks.map((link: any) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform} className="hoverable opacity-70 hover:opacity-100 transition-opacity">
                <SocialIcon platform={link.platform} iconUrl={link.iconUrl} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-soda-night overflow-x-hidden">
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/que-es-esto" element={<QueEsEstoPage />} />
            <Route path="/equipo" element={<EquipoPage />} />
            <Route path="/episodios" element={<EpisodiosPage />} />
            <Route path="/frecuencia-interna" element={<FrecuenciaInternaPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/mi-cuenta" element={<MiCuentaPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/unirse" element={<UnirsePage />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
