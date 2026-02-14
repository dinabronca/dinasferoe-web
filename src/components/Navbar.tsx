import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getContent } from '../data/content';
import { getCurrentUser } from '../data/auth';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const content = getContent();
  const names = content.sectionNames;
  const isLoggedIn = getCurrentUser() !== null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const menuItems = [
    { label: names.inicio, href: '/', special: '' },
    { label: names.queEsEsto, href: '/que-es-esto', special: '' },
    { label: names.equipo, href: '/equipo', special: '' },
    { label: names.episodios, href: '/episodios', special: 'episodios' },
    { label: names.frecuenciaInterna, href: '/frecuencia-interna', special: 'frecuencia' },
    { label: names.shop, href: '/shop', special: '' },
    { label: names.contacto, href: '/contacto', special: '' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-soda-night shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-3 z-[110]">
              <svg width="32" height="32" viewBox="0 0 28 28" className="group-hover:scale-105 transition-transform duration-500">
                <circle cx="14" cy="14" r="12" fill="#c45555" />
                <circle cx="10" cy="12" r="1.5" fill="#d4c5b0" />
                <circle cx="18" cy="12" r="1.5" fill="#d4c5b0" />
                <path d="M 10 17 Q 14 20 18 17" stroke="#d4c5b0" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M 4 8 Q 2 14 4 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.5" />
                <path d="M 24 8 Q 26 14 24 20" stroke="#c45555" strokeWidth="2.5" fill="none" opacity="0.5" />
              </svg>
              <span className="font-serif text-xl tracking-wider text-soda-glow">sodaroja</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm tracking-wide relative group transition-colors duration-400 ${
                      item.special === 'frecuencia'
                        ? active ? 'text-soda-glow' : 'text-soda-red/80 hover:text-soda-glow'
                        : item.special === 'episodios'
                          ? active ? 'text-soda-lamp font-medium' : 'text-soda-accent/80 hover:text-soda-lamp font-medium'
                          : active ? 'text-soda-glow' : 'text-soda-fog/70 hover:text-soda-lamp'
                    }`}
                    style={item.special === 'frecuencia' ? { textShadow: '0 0 8px rgba(196, 85, 85, 0.3)' } : undefined}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-px transition-all duration-500 ${
                      item.special === 'frecuencia' ? 'bg-soda-red' : 'bg-soda-lamp'
                    } ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Right side: auth + hamburger */}
            <div className="flex items-center gap-3">
              {/* Auth — desktop */}
              <div className="hidden lg:block">
                {isLoggedIn ? (
                  <Link to="/mi-cuenta" className="px-6 py-2 border border-soda-accent/30 rounded-sm text-soda-accent/80 text-sm hover:border-soda-accent/50 hover:text-soda-accent hover:bg-soda-accent/5 transition-all duration-500">Mi Cuenta</Link>
                ) : (
                  <Link to="/unirse" className="px-6 py-2 bg-soda-red/10 border border-soda-red/40 rounded-sm text-soda-glow/90 text-sm hover:bg-soda-red/18 hover:border-soda-red/55 transition-all duration-500">Unirse</Link>
                )}
              </div>

              {/* Hamburger — mobile/tablet */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-soda-lamp z-[110] relative"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[8999] lg:hidden" onClick={() => setMobileOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Menu panel */}
          <div
            className="absolute top-0 right-0 w-72 h-full bg-soda-night border-l border-soda-mist/10 pt-20 px-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3.5 px-4 rounded-sm text-base tracking-wide transition-colors ${
                      active ? 'text-soda-glow bg-soda-slate/30'
                      : item.special === 'frecuencia' ? 'text-soda-red'
                      : 'text-soda-fog active:text-soda-lamp active:bg-soda-slate/20'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-soda-mist/10">
              {isLoggedIn ? (
                <Link to="/mi-cuenta" onClick={() => setMobileOpen(false)} className="block w-full py-3 text-center border border-soda-accent/40 rounded-sm text-soda-accent text-sm">
                  Mi Cuenta
                </Link>
              ) : (
                <Link to="/unirse" onClick={() => setMobileOpen(false)} className="block w-full py-3 text-center bg-soda-red/20 border border-soda-red/50 rounded-sm text-soda-glow text-sm">
                  Unirse
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
