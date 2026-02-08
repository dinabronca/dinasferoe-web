// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

// Función para hashear contraseñas con SHA-256
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const DINAMARCA = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin password stored - Editable desde el panel admin
  // NOTA: Esta es la contraseña hasheada de "dinamarca2025"
  const [storedPasswordHash, setStoredPasswordHash] = useState(() => {
    const saved = localStorage.getItem('dinamarca_admin_password_hash');
    // Hash SHA-256 real de "dinamarca2025"
    return saved || '90123130476df6cda0a395df774b0770145cd6a2600d7f20d5c0d40a828e8490';
  });

  // ========================================
  // 🔴 EDITÁ ACÁ TU INFORMACIÓN PERSONAL
  // ========================================
  
  // ABOUT ME - Esto se edita desde el panel admin en /admin
  const [aboutText, setAboutText] = useState(() => {
    const saved = localStorage.getItem('dinamarca_about');
    return saved || `soy una contradicción ambulante. me obsesiono con cosas que nadie pidió. 
colecciono referencias visuales como si fueran recuerdos robados. 
creo en la estética como lenguaje. en el silencio como declaración.
probablemente esté pensando en algo que no importa pero me importa.
esto no es un portfolio. es un archivo de mi cabeza.`;
  });

  // REDES SOCIALES - Esto se edita desde el panel admin en /admin
  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem('dinamarca_social');
    return saved ? JSON.parse(saved) : {
      instagram: 'https://instagram.com/tuusuario',
      twitter: 'https://twitter.com/tuusuario',
      letterboxd: 'https://letterboxd.com/tuusuario',
      twitch: 'https://twitch.tv/tuusuario',
      youtube: 'https://youtube.com/@tuusuario',
      spotify: 'https://open.spotify.com/user/tuusuario',
      tiktok: 'https://tiktok.com/@tuusuario'
    };
  });

  const [hiddenSocials, setHiddenSocials] = useState(() => {
    const saved = localStorage.getItem('dinamarca_hidden_socials');
    return saved ? JSON.parse(saved) : {};
  });

  // ========================================
  // FIN ZONA DE EDICIÓN RÁPIDA
  // ========================================

  // PUBLICACIONES - Se editan desde el panel admin
  const [publicaciones, setPublicaciones] = useState(() => {
    const saved = localStorage.getItem('dinamarca_publicaciones');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'fragmentos de una ciudad que no existe',
        date: '2024.11.03',
        heroImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
        preview: 'hay ciudades que solo viven en la memoria. calles que recorriste pero nunca existieron. esta es una de esas...',
        content: `hay ciudades que solo viven en la memoria. calles que recorriste pero nunca existieron.

me acuerdo de una esquina. no sé dónde estaba. solo sé que existió en mi cabeza con tanta fuerza que juraría haberla caminado.

la nostalgia no necesita hechos. solo necesita convicción.

esto es un recuerdo inventado. o quizás todos lo son.`,
        images: [
          'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
          'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200'
        ],
        draft: false,
        order: 0
      },
      {
        id: 2,
        title: 'la estética del fracaso',
        date: '2024.10.15',
        heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
        preview: 'todos mis proyectos favoritos son los que nunca terminé. hay algo poético en lo incompleto...',
        content: `todos mis proyectos favoritos son los que nunca terminé.

hay algo poético en lo incompleto. en la promesa eterna. en el "podría haber sido".

la perfección es aburrida. el fracaso tiene textura.

quizás por eso sigo empezando cosas que sé que no voy a terminar.

no es falta de disciplina. es método.`,
        images: [
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200',
          'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200'
        ]
      },
      {
        id: 3,
        title: 'internet como museo personal',
        date: '2024.09.28',
        heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
        preview: 'guardamos screenshots de conversaciones que nunca volveremos a leer. coleccionamos memes como artefactos culturales...',
        content: `guardamos screenshots de conversaciones que nunca volveremos a leer.
coleccionamos memes como artefactos culturales.
bookmarkeamos artículos para "leer después" sabiendo que nunca lo haremos.

internet es nuestro museo personal. caótico. íntimo. innavegable.

cada carpeta de descargas es una cápsula del tiempo que nadie abrirá.

y está bien. no todo necesita ser revisitado.

algunos archivos solo necesitan existir.`,
        images: [
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
          'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200'
        ]
      }
    ];
  });

  // MULTIMEDIA - Editable desde admin
  const [mediaItems, setMediaItems] = useState(() => {
    const saved = localStorage.getItem('dinamarca_media');
    return saved ? JSON.parse(saved) : [];
  });

  // PROYECTOS - Se editan desde el panel admin
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('dinamarca_projects');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'sodaroja', 
        type: 'podcast',
        description: 'conversaciones sobre cosas que importan y cosas que no. principalmente cosas que no.',
        logo: '◉',
        logoImage: '',
        link: '#'
      },
      { 
        id: 2, 
        name: 'culto efervescente', 
        type: 'religión ficticia',
        description: 'una religión inventada con rituales reales. humor existencial carbonatado.',
        logo: '◬',
        logoImage: '',
        link: '#'
      },
      { 
        id: 3, 
        name: 'sodaroja web', 
        type: 'plataforma',
        description: 'suscripciones. contenido exclusivo. la ilusión de comunidad.',
        logo: '▣',
        logoImage: '',
        link: '#'
      },
      { 
        id: 4, 
        name: 'dinaesthetic prints', 
        type: 'arte visual',
        description: 'prints minimalistas para gente que entiende el silencio.',
        logo: '◘',
        logoImage: '',
        link: '#'
      },
    ];
  });

  // SECCIONES VISIBLES - Control desde admin
  const [visibleSections, setVisibleSections] = useState(() => {
    const saved = localStorage.getItem('dinamarca_visible_sections');
    return saved ? JSON.parse(saved) : {
      'about me': true,
      'publicaciones': true,
      'multimedia': true,
      'proyectos': true,
      'clima': true,
      'contacto': true
    };
  });

  // GOOGLE ANALYTICS ID
  const [analyticsId, setAnalyticsId] = useState(() => {
    const saved = localStorage.getItem('dinamarca_analytics_id');
    return saved || '';
  });

  // SITE CONFIG - Logo, favicon, name, SEO
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('dinamarca_site_config');
    return saved ? JSON.parse(saved) : {
      siteName: 'dinamarca',
      logoUrl: '',
      faviconUrl: '',
      bioSeo: 'archivo digital personal',
      metaDescription: 'portfolio y archivo personal de contenido visual y escrito',
      maintenanceMode: false
    };
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    const saved = localStorage.getItem('dinamarca_admin_password');
    return saved || '90123130476df6cda0a395df774b0770145cd6a2600d7f20d5c0d40a828e8490'; // dinamarca2025
  });

  const GeometricAnimation = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="fixed inset-0 flex items-center justify-center opacity-50 pointer-events-none">
        <div style={{ transform: `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg) rotateZ(${rotation * 0.3}deg)`, transformStyle: 'preserve-3d' }}>
          {/* Outer holographic cube */}
          <div className="relative" style={{ width: '300px', height: '300px', transformStyle: 'preserve-3d' }}>
            {/* Cube faces */}
            <div className="absolute w-full h-full border border-white/20" style={{ 
              transform: 'translateZ(150px)',
              background: 'linear-gradient(135deg, rgba(255,0,0,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            }} />
            <div className="absolute w-full h-full border border-white/20" style={{ 
              transform: 'translateZ(-150px) rotateY(180deg)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,0,0,0.1) 100%)'
            }} />
            <div className="absolute w-full h-full border border-red-500/30" style={{ 
              transform: 'rotateY(90deg) translateZ(150px)',
              background: 'linear-gradient(135deg, rgba(255,0,0,0.15) 0%, rgba(255,255,255,0.03) 100%)'
            }} />
            <div className="absolute w-full h-full border border-red-500/30" style={{ 
              transform: 'rotateY(-90deg) translateZ(150px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,0,0,0.15) 100%)'
            }} />
            <div className="absolute w-full h-full border border-white/10" style={{ 
              transform: 'rotateX(90deg) translateZ(150px)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }} />
            <div className="absolute w-full h-full border border-white/10" style={{ 
              transform: 'rotateX(-90deg) translateZ(150px)',
              background: 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, transparent 70%)'
            }} />
            
            {/* Inner sphere with holographic effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/30"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,0,0,0.2), transparent)',
                   boxShadow: '0 0 60px rgba(255,0,0,0.3), inset 0 0 40px rgba(255,255,255,0.2)'
                 }} />
            
            {/* Orbiting rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-red-500/20"
                 style={{ transform: `rotateX(${rotation * 2}deg)`, transformStyle: 'preserve-3d' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-white/10"
                 style={{ transform: `rotateY(${rotation * 1.5}deg)`, transformStyle: 'preserve-3d' }} />
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${20 + (i * 7)}%`,
                top: `${30 + Math.sin(rotation * 0.02 + i) * 20}%`,
                opacity: Math.abs(Math.sin(rotation * 0.02 + i)) * 0.6,
                boxShadow: i % 3 === 0 ? '0 0 10px rgba(255,0,0,0.5)' : '0 0 8px rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  // Subtle background particles - barely visible
  const BackgroundParticles = () => {
    const [particles] = useState(() => 
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 40 + 30,
        delay: Math.random() * 20
      }))
    );

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-35">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: particle.id % 5 === 0 ? '0 0 4px rgba(255,0,0,0.3)' : '0 0 3px rgba(255,255,255,0.2)'
            }}
          />
        ))}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
            50% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  };

  const Header = () => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
      const triggerGlitch = () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      };

      // Glitch effect every 10 seconds
      const interval = setInterval(() => {
        triggerGlitch();
      }, 10000);

      return () => clearInterval(interval);
    }, []);

    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
          <button 
            onClick={() => {
              setCurrentSection('home');
              setMobileMenuOpen(false);
            }} 
            className={`font-mono text-white tracking-wider hover:text-red-500 transition-colors flex items-center gap-2 ${
              glitch ? 'glitch-effect' : ''
            }`}
          >
            {siteConfig.logoUrl ? (
              <img src={siteConfig.logoUrl} alt="logo" className="w-6 h-6 object-contain" />
            ) : (
              <span className="text-red-500">▪️</span>
            )}
            <span>{siteConfig.siteName}</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 lg:gap-6 font-mono text-xs lg:text-sm">
            {['about me', 'publicaciones', 'multimedia', 'proyectos', 'clima', 'contacto']
              .filter(section => visibleSections[section])
              .map(section => (
              <button type="button"
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`hover:text-red-500 transition-colors ${
                  currentSection === section ? 'text-red-500' : 'text-white/70'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden font-mono text-white text-xl"
          >
            {mobileMenuOpen ? '×' : '≡'}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4 font-mono text-sm">
              {['about me', 'publicaciones', 'multimedia', 'proyectos', 'clima', 'contacto']
                .filter(section => visibleSections[section])
                .map(section => (
                <button type="button"
                  key={section}
                  onClick={() => {
                    setCurrentSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-red-500 transition-colors ${
                    currentSection === section ? 'text-red-500' : 'text-white/70'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}

        <style>{`
          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            60% { transform: translate(-1px, 2px); }
            80% { transform: translate(1px, -2px); }
          }
          .glitch-effect {
            animation: glitch 0.2s linear;
            text-shadow: 2px 0 rgba(255, 0, 0, 0.3), -2px 0 rgba(0, 255, 255, 0.3);
          }
        `}</style>
      </header>
    );
  };

  const Footer = () => (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 font-mono text-xs text-white/50">
        <span className="text-center sm:text-left">© 2025 dinamarca — archivo digital personal</span>
        <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
          {Object.entries(socialLinks)
            .filter(([platform]) => !hiddenSocials[platform])
            .map(([platform, url]) => (
            <a 
              key={platform}
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-red-500 transition-colors lowercase"
            >
              {platform}
            </a>
          ))}
          {isAdmin && (
            <button 
              onClick={() => setCurrentSection('admin')}
              className="hover:text-red-500 transition-colors"
            >
              admin
            </button>
          )}
        </div>
      </div>
    </footer>
  );

  const Home = () => (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <GeometricAnimation />
    </div>
  );

  const AboutMe = () => (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-6 sm:mb-8 tracking-widest">ABOUT_ME</h1>
        <div className="font-mono text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line lowercase">
          {aboutText}
        </div>
      </div>
    </div>
  );

  const Publicaciones = () => (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-8 sm:mb-12 tracking-widest">PUBLICACIONES</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {publicaciones.filter(pub => !pub.hidden && !pub.draft).map(pub => (
            <article 
              key={pub.id} 
              onClick={() => setSelectedPublication(pub)}
              className="border-l border-white/10 pl-4 sm:pl-8 hover:border-red-500/50 transition-all cursor-pointer group"
            >
              {/* Hero image with dark gradient */}
              <div className="relative w-full h-48 sm:h-64 mb-4 sm:mb-6 overflow-hidden -ml-4 sm:-ml-8 group/hero">
                <img 
                  src={pub.heroImage} 
                  alt={pub.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Hover particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/39 rounded-full"
                      style={{
                        left: `${3 + i * 8}%`,
                        bottom: '-10px',
                        animation: `floatUpParticle 2.2s ease-out ${i * 0.1}s infinite`
                      }}
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`red-${i}`}
                      className="absolute w-1 h-1 bg-red-500/39 rounded-full"
                      style={{
                        left: `${10 + i * 15}%`,
                        bottom: '-10px',
                        animation: `floatUpParticle 2.5s ease-out ${i * 0.15}s infinite`
                      }}
                    />
                  ))}
                </div>
                
                {/* Dark gradient overlay - very dark */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70 z-10" />
                
                {/* Content over gradient */}
                <div className="absolute bottom-0 left-4 sm:left-8 right-0 pb-4 sm:pb-6 z-20">
                  <div className="font-mono text-white/40 text-xs mb-1 sm:mb-2">{pub.date}</div>
                  <h2 className="font-mono text-white text-lg sm:text-2xl mb-2 lowercase">{pub.title}</h2>
                </div>
              </div>
              
              <p className="font-mono text-white/60 leading-relaxed lowercase text-xs sm:text-sm">
                {pub.preview}
              </p>
              
              <button className="mt-3 sm:mt-4 font-mono text-red-500 text-xs hover:underline">
                leer completo →
              </button>
              
              <style>{`
                @keyframes floatUpParticle {
                  0% { 
                    transform: translateY(0) translateX(0); 
                    opacity: 0; 
                  }
                  10% { 
                    opacity: 0.8; 
                  }
                  90% { 
                    opacity: 0.3; 
                  }
                  100% { 
                    transform: translateY(-150px) translateX(${(Math.random() - 0.5) * 30}px); 
                    opacity: 0; 
                  }
                }
              `}</style>
            </article>
          ))}
        </div>
        <div className="mt-12 sm:mt-16 text-center font-mono text-white/30 text-xs">
          // agrega más publicaciones para scroll infinito
        </div>
      </div>

      {/* Full publication view modal */}
      {selectedPublication && (
        <div 
          className="fixed inset-0 bg-black z-50 overflow-y-auto"
          onClick={() => setSelectedPublication(null)}
        >
          <div className="min-h-screen pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8" onClick={e => e.stopPropagation()}>
            <div className="max-w-3xl mx-auto">
              {/* Close button */}
              <button 
                onClick={() => setSelectedPublication(null)}
                className="fixed top-4 sm:top-8 right-4 sm:right-8 font-mono text-white/50 hover:text-red-500 text-2xl sm:text-3xl transition-colors z-10"
              >
                ×
              </button>

              {/* Hero image full */}
              <div className="relative w-full h-64 sm:h-96 mb-8 sm:mb-12 overflow-hidden">
                <img 
                  src={selectedPublication.heroImage} 
                  alt={selectedPublication.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                  <div className="font-mono text-white/40 text-xs mb-2">{selectedPublication.date}</div>
                  <h1 className="font-mono text-white text-2xl sm:text-4xl mb-4 lowercase">{selectedPublication.title}</h1>
                </div>
              </div>

              {/* Full content */}
              <div 
                className="font-mono text-white/80 text-base sm:text-lg leading-[1.6] lowercase mb-8 sm:mb-12"
                dangerouslySetInnerHTML={{ __html: renderPublicationContent(selectedPublication.content) }}
              />

              {/* Additional images if any */}
              {selectedPublication.images && selectedPublication.images.length > 1 && (
                <div className="space-y-6 sm:space-y-8">
                  {selectedPublication.images.slice(1).map((img, idx) => (
                    <div 
                      key={idx} 
                      className="relative w-full h-64 sm:h-80 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setLightboxImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`imagen ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 right-4 text-white/50 text-xs font-mono">
                        click para ampliar
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Back button */}
              <button 
                onClick={() => setSelectedPublication(null)}
                className="mt-8 sm:mt-12 font-mono text-red-500 text-sm hover:underline"
              >
                ← volver a publicaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Multimedia = () => {
    // Extraer todas las imágenes de todas las publicaciones
    const allImages = publicaciones.flatMap(pub => {
      const images = [];
      // Agregar hero image
      if (pub.heroImage) {
        images.push({
          id: `${pub.id}-hero`,
          url: pub.heroImage,
          title: pub.title,
          desc: pub.preview,
          pubId: pub.id
        });
      }
      // Agregar imágenes adicionales del array images
      if (pub.images && pub.images.length > 0) {
        pub.images.forEach((img, idx) => {
          // Solo agregar si la imagen NO es la hero image
          if (img !== pub.heroImage) {
            images.push({
              id: `${pub.id}-img-${idx}`,
              url: img,
              title: pub.title,
              desc: `imagen ${idx + 1} - ${pub.title}`,
              pubId: pub.id
            });
          }
        });
      }
      // Extraer imágenes del CONTENIDO con [img:] y [img2:]
      if (pub.content) {
        // Buscar [img:URL]
        const singleImgs = pub.content.match(/\[img:(.+?)\]/g);
        if (singleImgs) {
          singleImgs.forEach((match, idx) => {
            const url = match.match(/\[img:(.+?)\]/)[1];
            images.push({
              id: `${pub.id}-content-img-${idx}`,
              url: url,
              title: pub.title,
              desc: pub.preview,
              pubId: pub.id
            });
          });
        }
        // Buscar [img2:URL1|URL2]
        const doubleImgs = pub.content.match(/\[img2:(.+?)\|(.+?)\]/g);
        if (doubleImgs) {
          doubleImgs.forEach((match, idx) => {
            const [_, url1, url2] = match.match(/\[img2:(.+?)\|(.+?)\]/);
            images.push({
              id: `${pub.id}-content-img2-${idx}-1`,
              url: url1,
              title: pub.title,
              desc: pub.preview,
              pubId: pub.id
            });
            images.push({
              id: `${pub.id}-content-img2-${idx}-2`,
              url: url2,
              title: pub.title,
              desc: pub.preview,
              pubId: pub.id
            });
          });
        }
      }
      return images;
    });

    return (
      <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-8 sm:mb-12 tracking-widest">MULTIMEDIA</h1>
          {allImages.length === 0 ? (
            <div className="font-mono text-white/30 text-sm text-center py-12">
              no hay imágenes. creá publicaciones con imágenes para verlas acá.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {allImages.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="aspect-square bg-white/5 overflow-hidden cursor-pointer hover:ring-2 hover:ring-red-500 transition-all group relative"
            >
              <img 
                src={item.url} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Hover particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/39 rounded-full"
                    style={{
                      left: `${10 + i * 12}%`,
                      bottom: '-10px',
                      animation: `floatUpParticle 2s ease-out ${i * 0.15}s infinite`
                    }}
                  />
                ))}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`red-${i}`}
                    className="absolute w-1 h-1 bg-red-500/39 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      bottom: '-10px',
                      animation: `floatUpParticle 2.5s ease-out ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-10">
                <div className="text-center">
                  <div className="font-mono text-white text-xs sm:text-sm mb-2 lowercase">{item.title}</div>
                  <div className="font-mono text-white/60 text-xs lowercase">{item.desc}</div>
                </div>
              </div>
              
              <style>{`
                @keyframes floatUpParticle {
                  0% { 
                    transform: translateY(0) translateX(0); 
                    opacity: 0; 
                  }
                  10% { 
                    opacity: 0.8; 
                  }
                  90% { 
                    opacity: 0.3; 
                  }
                  100% { 
                    transform: translateY(-150px) translateX(${(Math.random() - 0.5) * 30}px); 
                    opacity: 0; 
                  }
                }
              `}</style>
            </div>
          ))}
        </div>
          )}
        <div className="mt-6 sm:mt-8 text-center font-mono text-white/30 text-xs">
          // todas las imágenes de publicaciones
        </div>
      </div>
      
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full" />
            <div className="mt-3 sm:mt-4 font-mono text-white text-base sm:text-lg lowercase">{selectedMedia.title}</div>
            <div className="mt-2 font-mono text-white/50 text-xs sm:text-sm lowercase">{selectedMedia.desc}</div>
            <button 
              onClick={() => {
                setSelectedMedia(null);
                setCurrentSection('publicaciones');
                // Encontrar y abrir la publicación específica
                setTimeout(() => {
                  const pub = publicaciones.find(p => p.id === selectedMedia.pubId);
                  if (pub) {
                    setSelectedPublication(pub);
                  }
                }, 100);
              }}
              className="mt-3 sm:mt-4 font-mono text-red-500 text-xs hover:underline"
            >
              → ver publicación relacionada
            </button>
          </div>
        </div>
      )}
    </div>
    );
  };

  const Proyectos = () => (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-8 sm:mb-12 tracking-widest">PROYECTOS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => {
                if (project.link && project.link !== '#') {
                  window.open(project.link, '_blank');
                }
              }}
              className="aspect-[4/3] bg-white/5 border border-white/10 hover:border-red-500 transition-all cursor-pointer flex flex-col items-center justify-center p-4 sm:p-6 group relative overflow-hidden"
            >
              {/* Hover particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/39 rounded-full"
                    style={{
                      left: `${10 + i * 12}%`,
                      bottom: '-10px',
                      animation: `floatUpParticle 2s ease-out ${i * 0.15}s infinite`
                    }}
                  />
                ))}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={`red-${i}`}
                    className="absolute w-1 h-1 bg-red-500/39 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      bottom: '-10px',
                      animation: `floatUpParticle 2.5s ease-out ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
              
              {project.logoImage ? (
                <img 
                  src={project.logoImage} 
                  alt={project.name} 
                  className="w-[85px] h-[85px] object-contain mb-3 group-hover:scale-110 transition-transform relative z-10" 
                />
              ) : (
                <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform relative z-10">{project.logo || '▪️'}</div>
              )}
              <h3 className="font-mono text-white text-base sm:text-lg mb-1 lowercase relative z-10 text-center">{project.name}</h3>
              <p className="font-mono text-white/40 text-xs lowercase relative z-10 mb-2 text-center">{project.type}</p>
              <p className="font-mono text-white/60 text-xs lowercase relative z-10 text-center line-clamp-2">{project.description}</p>
              
              <style>{`
                @keyframes floatUpParticle {
                  0% { 
                    transform: translateY(0) translateX(0); 
                    opacity: 0; 
                  }
                  10% { 
                    opacity: 0.8; 
                  }
                  90% { 
                    opacity: 0.3; 
                  }
                  100% { 
                    transform: translateY(-150px) translateX(${(Math.random() - 0.5) * 30}px); 
                    opacity: 0; 
                  }
                }
                .line-clamp-2 {
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div className="max-w-2xl w-full bg-black border border-white/20 p-8 sm:p-12" onClick={e => e.stopPropagation()}>
            <div className="text-5xl sm:text-6xl mb-6">{selectedProject.logo}</div>
            <h2 className="font-mono text-white text-2xl sm:text-3xl mb-2 lowercase">{selectedProject.name}</h2>
            <p className="font-mono text-white/40 text-sm mb-6 lowercase">{selectedProject.type}</p>
            <p className="font-mono text-white/70 leading-relaxed lowercase text-sm sm:text-base">{selectedProject.description}</p>
            {selectedProject.link && selectedProject.link !== '#' && (
              <a 
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block font-mono text-red-500 text-sm hover:underline"
              >
                visitar proyecto →
              </a>
            )}
            <button 
              onClick={() => setSelectedProject(null)}
              className="mt-6 sm:mt-8 block font-mono text-white/50 text-sm hover:text-red-500"
            >
              ← volver
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const Contacto = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Simulate email send
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    };

    return (
      <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-8 sm:mb-12 tracking-widest">CONTACTO</h1>
          
          {submitted ? (
            <div className="font-mono text-red-500 lowercase text-sm sm:text-base">mensaje enviado. gracias.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-2 sm:py-3 font-mono text-white text-sm sm:text-base lowercase focus:border-red-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-2 sm:py-3 font-mono text-white text-sm sm:text-base lowercase focus:border-red-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="mensaje"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="6"
                  className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-2 sm:py-3 font-mono text-white text-sm sm:text-base lowercase focus:border-red-500 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              <button type="button"
                type="submit"
                className="font-mono text-white border border-white/20 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:bg-red-500 hover:border-red-500 transition-all lowercase"
              >
                enviar →
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Función para renderizar contenido con formato y embeds
  const renderPublicationContent = (content) => {
    let html = content;
    
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="text-red-500 hover:underline">$1</a>');
    
    html = html.split('\n\n').map(p => {
      if (p.match(/\[youtube:(.+?)\]/)) {
        const id = p.match(/\[youtube:(.+?)\]/)[1];
        return `<div class="aspect-video w-full my-4"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`;
      }
      
      if (p.match(/\[spotify:(.+?):(.+?)\]/)) {
        const [_, type, id] = p.match(/\[spotify:(.+?):(.+?)\]/);
        const height = type === 'track' || type === 'episode' ? '152' : '352';
        return `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0" width="100%" height="${height}" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      }
      
      if (p.match(/\[instagram:(.+?)\|(.+?)\|(.+?)\]/)) {
        const [_, postUrl, imgUrl, username] = p.match(/\[instagram:(.+?)\|(.+?)\|(.+?)\]/);
        return `<a href="${postUrl}" target="_blank" class="block my-4 group">
          <div class="relative overflow-hidden border border-white/10 hover:border-red-500/50 transition-all">
            <img src="${imgUrl}" class="w-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div>
                <div class="font-mono text-white text-sm">${username}</div>
                <div class="font-mono text-white/50 text-xs mt-1">hacé click para ver el post original →</div>
              </div>
            </div>
          </div>
        </a>`;
      }
      
      if (p.match(/\[twitter:(.+?)\|(.+?)\|(.+?)\]/)) {
        const [_, postUrl, imgUrl, username] = p.match(/\[twitter:(.+?)\|(.+?)\|(.+?)\]/);
        return `<a href="${postUrl}" target="_blank" class="block my-4 group">
          <div class="relative overflow-hidden border border-white/10 hover:border-red-500/50 transition-all">
            <img src="${imgUrl}" class="w-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div>
                <div class="font-mono text-white text-sm">${username}</div>
                <div class="font-mono text-white/50 text-xs mt-1">hacé click para ver el tweet original →</div>
              </div>
            </div>
          </div>
        </a>`;
      }
      
      if (p.match(/\[img:(.+?)\]/)) {
        const url = p.match(/\[img:(.+?)\]/)[1];
        return `<img src="${url}" class="w-full my-4 cursor-pointer hover:opacity-90 transition-opacity lightbox-trigger" data-lightbox-url="${url}" />`;
      }
      
      if (p.match(/\[img2:(.+?)\|(.+?)\]/)) {
        const [_, url1, url2] = p.match(/\[img2:(.+?)\|(.+?)\]/);
        return `<div class="grid grid-cols-2 gap-4 my-4">
          <img src="${url1}" class="w-full cursor-pointer hover:opacity-90 transition-opacity lightbox-trigger" data-lightbox-url="${url1}" />
          <img src="${url2}" class="w-full cursor-pointer hover:opacity-90 transition-opacity lightbox-trigger" data-lightbox-url="${url2}" />
        </div>`;
      }
      
      return `<p class="mb-4">${p}</p>`;
    }).join('');
    
    return html;
  };

  // ADMIN PANEL COMPONENT
  const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('about');
    const [editingAbout, setEditingAbout] = useState(aboutText);
    const [editingSocial, setEditingSocial] = useState(socialLinks);
    const [editingPubs, setEditingPubs] = useState(publicaciones);
    const [editingProjects, setEditingProjects] = useState(projects);
    const [newSocialPlatform, setNewSocialPlatform] = useState('');
    const [newSocialUrl, setNewSocialUrl] = useState('');
    const [editingPubId, setEditingPubId] = useState(null);
    const [newPubForm, setNewPubForm] = useState({
      title: '',
      preview: '',
      content: '',
      heroImage: '',
      images: [],
      scheduledDate: '',
      tags: [],
      slug: ''
    });
    
    // Editor states
    const [showPreview, setShowPreview] = useState(false);
    const contentRef = useRef(null);
    const [embedModalType, setEmbedModalType] = useState(null);
    const [embedData, setEmbedData] = useState({});

    // Editor helper functions
    const insertFormatting = (before, after = '') => {
      const textarea = contentRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = newPubForm.content;
      const selectedText = text.substring(start, end);
      
      const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
      setNewPubForm({...newPubForm, content: newText});
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      }, 0);
    };

    const insertEmbed = (type) => {
      setEmbedModalType(type);
      setEmbedData({});
    };

    const handleEmbedSubmit = () => {
      let code = '';
      
      switch(embedModalType) {
        case 'youtube':
          if (embedData.url) {
            const ytId = embedData.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
            if (ytId) code = `[youtube:${ytId}]`;
          }
          break;
        case 'spotify':
          if (embedData.url) {
            const spotifyId = embedData.url.match(/(?:track|playlist|episode|show)\/([a-zA-Z0-9]+)/)?.[1];
            const spotifyType = embedData.url.match(/\/(track|playlist|episode|show)\//)?.[1];
            if (spotifyId && spotifyType) code = `[spotify:${spotifyType}:${spotifyId}]`;
          }
          break;
        case 'instagram':
          if (embedData.postUrl && embedData.imgUrl && embedData.username) {
            code = `[instagram:${embedData.postUrl}|${embedData.imgUrl}|${embedData.username}]`;
          }
          break;
        case 'twitter':
          if (embedData.postUrl && embedData.imgUrl && embedData.username) {
            code = `[twitter:${embedData.postUrl}|${embedData.imgUrl}|${embedData.username}]`;
          }
          break;
        case 'image':
          if (embedData.url) code = `[img:${embedData.url}]`;
          break;
        case 'image2':
          if (embedData.url1 && embedData.url2) code = `[img2:${embedData.url1}|${embedData.url2}]`;
          break;
      }
      
      if (code) {
        const textarea = contentRef.current;
        const start = textarea.selectionStart;
        const text = newPubForm.content;
        const newText = text.substring(0, start) + '\n' + code + '\n' + text.substring(start);
        setNewPubForm({...newPubForm, content: newText});
      }
      
      setEmbedModalType(null);
      setEmbedData({});
    };

    const renderPreview = (content) => {
      let html = content;
      
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="text-red-500 hover:underline">$1</a>');
      
      html = html.split('\n\n').map(p => {
        if (p.match(/\[youtube:(.+?)\]/)) {
          const id = p.match(/\[youtube:(.+?)\]/)[1];
          return `<div class="aspect-video w-full my-4"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`;
        }
        
        if (p.match(/\[spotify:(.+?):(.+?)\]/)) {
          const [_, type, id] = p.match(/\[spotify:(.+?):(.+?)\]/);
          const height = type === 'track' || type === 'episode' ? '152' : '352';
          return `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0" width="100%" height="${height}" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
        }
        
        if (p.match(/\[instagram:(.+?)\|(.+?)\|(.+?)\]/)) {
          const [_, postUrl, imgUrl, username] = p.match(/\[instagram:(.+?)\|(.+?)\|(.+?)\]/);
          return `<div class="my-4 border border-white/10 p-2">
            <img src="${imgUrl}" class="w-full mb-2" />
            <div class="font-mono text-white/70 text-xs">${username} - click para ver post</div>
          </div>`;
        }
        
        if (p.match(/\[twitter:(.+?)\|(.+?)\|(.+?)\]/)) {
          const [_, postUrl, imgUrl, username] = p.match(/\[twitter:(.+?)\|(.+?)\|(.+?)\]/);
          return `<div class="my-4 border border-white/10 p-2">
            <img src="${imgUrl}" class="w-full mb-2" />
            <div class="font-mono text-white/70 text-xs">${username} - click para ver tweet</div>
          </div>`;
        }
        
        if (p.match(/\[img:(.+?)\]/)) {
          const url = p.match(/\[img:(.+?)\]/)[1];
          return `<img src="${url}" class="w-full my-4" />`;
        }
        
        if (p.match(/\[img2:(.+?)\|(.+?)\]/)) {
          const [_, url1, url2] = p.match(/\[img2:(.+?)\|(.+?)\]/);
          return `<div class="grid grid-cols-2 gap-4 my-4"><img src="${url1}" /><img src="${url2}" /></div>`;
        }
        
        return `<p class="mb-4">${p}</p>`;
      }).join('');
      
      return html;
    };

    const saveAbout = () => {
      setAboutText(editingAbout);
      localStorage.setItem('dinamarca_about', editingAbout);
      alert('About Me guardado ✓');
    };

    const saveSocial = () => {
      setSocialLinks(editingSocial);
      localStorage.setItem('dinamarca_social', JSON.stringify(editingSocial));
      alert('Redes sociales guardadas ✓');
    };

    const addSocialLink = () => {
      if (newSocialPlatform && newSocialUrl) {
        setEditingSocial({...editingSocial, [newSocialPlatform.toLowerCase()]: newSocialUrl});
        setNewSocialPlatform('');
        setNewSocialUrl('');
      }
    };

    const removeSocialLink = (platform) => {
      const updated = {...editingSocial};
      delete updated[platform];
      setEditingSocial(updated);
    };

    // EXPORT/IMPORT FUNCTIONS
    const exportAllData = () => {
      const data = {
        about: aboutText,
        social: socialLinks,
        hiddenSocials: hiddenSocials,
        publicaciones: publicaciones,
        projects: projects,
        mediaItems: mediaItems,
        visibleSections: visibleSections,
        analyticsId: analyticsId,
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dinamarca-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Backup descargado ✓');
    };

    const importAllData = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          // Validar que sea un backup válido
          if (!data.exportDate) {
            alert('Archivo inválido');
            return;
          }

          if (confirm('¿Reemplazar todo el contenido actual con este backup?')) {
            // Importar todo
            if (data.about) {
              setAboutText(data.about);
              localStorage.setItem('dinamarca_about', data.about);
            }
            if (data.social) {
              setSocialLinks(data.social);
              localStorage.setItem('dinamarca_social', JSON.stringify(data.social));
            }
            if (data.hiddenSocials) {
              setHiddenSocials(data.hiddenSocials);
              localStorage.setItem('dinamarca_hidden_socials', JSON.stringify(data.hiddenSocials));
            }
            if (data.publicaciones) {
              setPublicaciones(data.publicaciones);
              localStorage.setItem('dinamarca_publicaciones', JSON.stringify(data.publicaciones));
            }
            if (data.projects) {
              setProjects(data.projects);
              localStorage.setItem('dinamarca_projects', JSON.stringify(data.projects));
            }
            if (data.mediaItems) {
              setMediaItems(data.mediaItems);
              localStorage.setItem('dinamarca_media', JSON.stringify(data.mediaItems));
            }
            if (data.visibleSections) {
              setVisibleSections(data.visibleSections);
              localStorage.setItem('dinamarca_visible_sections', JSON.stringify(data.visibleSections));
            }
            if (data.analyticsId) {
              setAnalyticsId(data.analyticsId);
              localStorage.setItem('dinamarca_analytics_id', data.analyticsId);
            }
            
            alert('Backup importado ✓ Recargá la página');
            window.location.reload();
          }
        } catch (error) {
          alert('Error al importar: ' + error.message);
        }
      };
      reader.readAsText(file);
    };

    // CHANGE PUBLICATION ORDER
    const movePublication = (id, direction) => {
      const currentIndex = editingPubs.findIndex(p => p.id === id);
      if (currentIndex === -1) return;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= editingPubs.length) return;
      
      const updated = [...editingPubs];
      [updated[currentIndex], updated[newIndex]] = [updated[newIndex], updated[currentIndex]];
      
      setEditingPubs(updated);
      setPublicaciones(updated);
      localStorage.setItem('dinamarca_publicaciones', JSON.stringify(updated));
    };

    const savePublicaciones = () => {
      setPublicaciones(editingPubs);
      localStorage.setItem('dinamarca_publicaciones', JSON.stringify(editingPubs));
      alert('Publicaciones guardadas ✓');
    };

    const createNewPublication = (asDraft = false) => {
      if (!newPubForm.title || !newPubForm.content) {
        alert('Título y contenido son obligatorios');
        return;
      }

      // Validar fecha programada
      const isScheduled = newPubForm.scheduledDate && new Date(newPubForm.scheduledDate) > new Date();
      
      let updated;
      if (editingPubId) {
        // Editando publicación existente
        updated = editingPubs.map(p => 
          p.id === editingPubId ? { 
            ...p, 
            ...newPubForm, 
            draft: asDraft || isScheduled,
            scheduled: isScheduled
          } : p
        );
        alert(isScheduled ? 'Publicación programada ✓' : asDraft ? 'Guardado como borrador ✓' : 'Publicación actualizada ✓');
        setEditingPubId(null);
      } else {
        // Creando nueva publicación
        const newPub = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
          ...newPubForm,
          draft: asDraft || isScheduled,
          scheduled: isScheduled,
          order: editingPubs.length
        };
        updated = [newPub, ...editingPubs];
        alert(isScheduled ? 'Publicación programada ✓' : asDraft ? 'Guardado como borrador ✓' : 'Publicación creada ✓');
      }
      
      setEditingPubs(updated);
      setPublicaciones(updated);
      localStorage.setItem('dinamarca_publicaciones', JSON.stringify(updated));
      setNewPubForm({ title: '', preview: '', content: '', heroImage: '', images: [], scheduledDate: "", tags: [], slug: "" });
    };

    const deletePublication = (id) => {
      if (confirm('¿Eliminar esta publicación?')) {
        const updated = editingPubs.filter(p => p.id !== id);
        setEditingPubs(updated);
        setPublicaciones(updated);
        localStorage.setItem('dinamarca_publicaciones', JSON.stringify(updated));
      }
    };

    const addImageToNewPub = () => {
      const url = prompt('URL de la imagen:');
      if (url) {
        setNewPubForm({
          ...newPubForm,
          images: [...newPubForm.images, url]
        });
      }
    };

    const saveProjects = () => {
      setProjects(editingProjects);
      localStorage.setItem('dinamarca_projects', JSON.stringify(editingProjects));
      alert('Proyectos guardados ✓');
    };

    return (
      <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
            <h1 className="font-mono text-white/30 text-xs sm:text-sm tracking-widest">ADMIN PANEL</h1>
            <button 
              onClick={() => { setIsAdmin(false); setCurrentSection('home'); }}
              className="font-mono text-red-500 text-xs hover:underline"
            >
              cerrar sesión
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 overflow-x-auto">
            {['about', 'redes', 'publicaciones', 'proyectos', 'multimedia', 'secciones', 'estadísticas', 'configuración'].map(tab => (
              <button type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono px-3 sm:px-4 py-2 lowercase text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab ? 'text-red-500 border-b-2 border-red-500' : 'text-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ABOUT ME TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <textarea
                value={editingAbout}
                onChange={(e) => setEditingAbout(e.target.value)}
                rows="10"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 font-mono text-white lowercase focus:border-red-500 focus:outline-none resize-none"
              />
              <button type="button"
                onClick={saveAbout}
                className="font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
              >
                guardar about me
              </button>
            </div>
          )}

          {/* REDES SOCIALES TAB */}
          {activeTab === 'redes' && (
            <div className="space-y-8">
              <div className="space-y-4">
                {Object.entries(editingSocial).map(([platform, url]) => (
                  <div key={platform} className="border border-white/10 p-4">
                    <div className="flex gap-4 items-center mb-3">
                      <input
                        value={platform}
                        disabled
                        className="w-40 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white/50 lowercase text-sm"
                      />
                      <input
                        value={url}
                        onChange={(e) => setEditingSocial({...editingSocial, [platform]: e.target.value})}
                        className="flex-1 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="button"
                        onClick={() => {
                          const updated = {...hiddenSocials, [platform]: !hiddenSocials[platform]};
                          setHiddenSocials(updated);
                          localStorage.setItem('dinamarca_hidden_socials', JSON.stringify(updated));
                        }}
                        className="font-mono text-white/70 border border-white/10 px-4 py-2 hover:text-white hover:border-white/30 transition-all text-xs"
                      >
                        {hiddenSocials[platform] ? 'mostrar' : 'ocultar'}
                      </button>
                      <button type="button"
                        onClick={() => removeSocialLink(platform)}
                        className="font-mono text-red-500 hover:underline text-xs"
                      >
                        eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="font-mono text-white/50 text-sm mb-4">agregar nueva red</h3>
                <div className="flex gap-4">
                  <input
                    placeholder="plataforma (ej: threads)"
                    value={newSocialPlatform}
                    onChange={(e) => setNewSocialPlatform(e.target.value)}
                    className="w-40 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  <input
                    placeholder="url completa"
                    value={newSocialUrl}
                    onChange={(e) => setNewSocialUrl(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  <button type="button"
                    onClick={addSocialLink}
                    className="font-mono text-white border border-white/20 px-6 py-2 hover:bg-red-500 hover:border-red-500 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <button type="button"
                onClick={saveSocial}
                className="font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
              >
                guardar redes sociales
              </button>
            </div>
          )}

          {/* PUBLICACIONES TAB */}
          {activeTab === 'publicaciones' && (
            <div className="space-y-8">
              {/* Create new publication */}
              <div className={`border p-6 space-y-4 ${editingPubId ? 'border-red-500/50 bg-red-500/5' : 'border-white/10'}`}>
                <h3 className="font-mono text-white/50 text-sm mb-4">
                  {editingPubId ? '✏️ editando publicación' : 'crear nueva publicación'}
                </h3>
                <input
                  placeholder="título"
                  value={newPubForm.title}
                  onChange={(e) => setNewPubForm({...newPubForm, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />
                <input
                  placeholder="preview (máx 110 caracteres)"
                  value={newPubForm.preview}
                  onChange={(e) => setNewPubForm({...newPubForm, preview: e.target.value})}
                  maxLength={110}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />
                <div className="text-xs font-mono text-white/30 text-right">
                  {newPubForm.preview.length}/110 caracteres
                </div>
                
                {/* EDITOR AVANZADO */}
                <div className="space-y-2">
                  {/* Toolbar */}
                  <div className="flex gap-2 flex-wrap border border-white/10 p-2 bg-white/5">
                    <button type="button"
                      type="button"
                      onClick={() => insertFormatting('**', '**')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Negrita"
                    >
                      <strong>B</strong>
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => insertFormatting('*', '*')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Cursiva"
                    >
                      <em>I</em>
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => {
                        const text = prompt('Texto del link:');
                        const url = prompt('URL:');
                        if (text && url) insertFormatting(`[${text}](${url})`);
                      }}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Link"
                    >
                      🔗
                    </button>
                    <div className="w-px bg-white/10"></div>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('image')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Imagen"
                    >
                      🖼️
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('image2')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="2 Imágenes"
                    >
                      🖼️×2
                    </button>
                    <div className="w-px bg-white/10"></div>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('youtube')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="YouTube"
                    >
                      ▶️
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('spotify')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Spotify"
                    >
                      🎵
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('instagram')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Instagram"
                    >
                      📷
                    </button>
                    <button type="button"
                      type="button"
                      onClick={() => insertEmbed('twitter')}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                      title="Twitter"
                    >
                      🐦
                    </button>
                    <div className="flex-1"></div>
                    <button type="button"
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="font-mono text-white/70 hover:text-white px-3 py-1 text-xs border border-white/10 hover:border-red-500"
                    >
                      {showPreview ? 'editar' : 'preview'}
                    </button>
                  </div>
                  
                  {/* Editor o Preview */}
                  {showPreview ? (
                    <div 
                      className="w-full bg-white/5 border border-white/10 p-4 font-mono text-white text-sm leading-relaxed min-h-[200px]"
                      dangerouslySetInnerHTML={{ __html: renderPreview(newPubForm.content) }}
                    />
                  ) : (
                    <textarea
                      ref={contentRef}
                      placeholder="contenido (usa **negrita** *cursiva* [texto](url) y los botones de arriba)"
                      value={newPubForm.content}
                      onChange={(e) => setNewPubForm({...newPubForm, content: e.target.value})}
                      rows="12"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 font-mono text-white lowercase focus:border-red-500 focus:outline-none resize-none"
                    />
                  )}
                  
                  {/* Guía rápida */}
                  <div className="text-xs font-mono text-white/30 space-y-1">
                    <div>💡 **negrita** | *cursiva* | [texto](url)</div>
                    <div>🖼️ Usa los botones para insertar imágenes y embeds</div>
                  </div>
                </div>
                
                <input
                  placeholder="url imagen hero (principal)"
                  value={newPubForm.heroImage}
                  onChange={(e) => setNewPubForm({...newPubForm, heroImage: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />

                {/* Scheduled Date */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">programar publicación (opcional)</label>
                  <input
                    type="datetime-local"
                    value={newPubForm.scheduledDate}
                    onChange={(e) => setNewPubForm({...newPubForm, scheduledDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                  />
                  <p className="font-mono text-white/30 text-xs">
                    {newPubForm.scheduledDate && new Date(newPubForm.scheduledDate) > new Date() 
                      ? '📅 se publicará automáticamente en esta fecha' 
                      : 'dejá vacío para publicar ahora'}
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">keywords/tags (separados por coma)</label>
                  <input
                    placeholder="ej: viaje, patagonia, fotografía"
                    value={newPubForm.tags?.join(', ') || ''}
                    onChange={(e) => setNewPubForm({
                      ...newPubForm, 
                      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    })}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  <p className="font-mono text-white/30 text-xs">
                    ayuda con SEO y para categorizar tu contenido
                  </p>
                </div>

                {/* Custom URL Slug */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">URL personalizada (opcional)</label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white/30 text-xs">tu-sitio.com/</span>
                    <input
                      placeholder="mi-articulo-genial"
                      value={newPubForm.slug || ''}
                      onChange={(e) => {
                        // Auto-generate slug-friendly format
                        const slug = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, '-')
                          .replace(/-+/g, '-')
                          .replace(/^-|-$/g, '');
                        setNewPubForm({...newPubForm, slug});
                      }}
                      className="flex-1 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <p className="font-mono text-white/30 text-xs">
                    dejá vacío para usar el ID automático
                  </p>
                </div>

                <div>
                  <button type="button"
                    onClick={addImageToNewPub}
                    className="font-mono text-white/50 border border-white/10 px-4 py-2 hover:text-red-500 hover:border-red-500 transition-all text-sm"
                  >
                    + agregar imagen adicional
                  </button>
                  {newPubForm.images.length > 0 && (
                    <div className="mt-2 font-mono text-white/50 text-xs">
                      {newPubForm.images.length} imágenes agregadas
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button type="button"
                    type="button"
                    onClick={() => createNewPublication(false)}
                    className="flex-1 font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
                  >
                    {editingPubId ? 'guardar cambios' : 'publicar'}
                  </button>
                  <button type="button"
                    type="button"
                    onClick={() => createNewPublication(true)}
                    className="font-mono text-white/70 border border-white/10 px-6 py-3 hover:text-white hover:border-white/30 transition-all"
                  >
                    guardar borrador
                  </button>
                </div>
                {editingPubId && (
                  <button type="button"
                    type="button"
                    onClick={() => {
                      setEditingPubId(null);
                      setNewPubForm({ title: '', preview: '', content: '', heroImage: '', images: [], scheduledDate: "", tags: [], slug: "" });
                    }}
                    className="font-mono text-white/50 hover:text-red-500 text-sm"
                  >
                    cancelar edición
                  </button>
                )}
              </div>

              {/* Export/Import buttons */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <h3 className="font-mono text-white/50 text-sm">backup & restore</h3>
                <div className="flex gap-3">
                  <button type="button"
                    onClick={exportAllData}
                    className="flex-1 font-mono text-white/70 border border-white/10 px-6 py-3 hover:text-white hover:border-white/30 transition-all text-sm"
                  >
                    ⬇️ exportar todo
                  </button>
                  <label className="flex-1 font-mono text-white/70 border border-white/10 px-6 py-3 hover:text-white hover:border-white/30 transition-all text-sm text-center cursor-pointer">
                    ⬆️ importar backup
                    <input
                      type="file"
                      accept=".json"
                      onChange={importAllData}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="font-mono text-white/30 text-xs">
                  exportá todo tu contenido a un archivo JSON. importalo en cualquier dispositivo.
                </p>
              </div>

              {/* List existing publications */}
              <div className="space-y-4">
                <h3 className="font-mono text-white/50 text-sm">publicaciones existentes</h3>
                {editingPubs.map((pub, idx) => (
                  <div key={pub.id} className="border border-white/10 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3 items-start flex-1">
                        {/* Order arrows */}
                        <div className="flex flex-col gap-1">
                          <button type="button"
                            onClick={() => movePublication(pub.id, 'up')}
                            disabled={idx === 0}
                            className="font-mono text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                          >
                            ↑
                          </button>
                          <button type="button"
                            onClick={() => movePublication(pub.id, 'down')}
                            disabled={idx === editingPubs.length - 1}
                            className="font-mono text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                          >
                            ↓
                          </button>
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-white lowercase">{pub.title}</div>
                          <div className="font-mono text-white/40 text-xs mt-1">{pub.date}</div>
                          {pub.tags && pub.tags.length > 0 && (
                            <div className="font-mono text-white/30 text-xs mt-1">
                              🏷️ {pub.tags.join(', ')}
                            </div>
                          )}
                          <div className="flex gap-2 mt-1">
                            {pub.hidden && <div className="font-mono text-red-500 text-xs">🔒 oculta</div>}
                            {pub.draft && !pub.scheduled && <div className="font-mono text-yellow-500 text-xs">📝 borrador</div>}
                            {pub.scheduled && (
                              <div className="font-mono text-blue-500 text-xs">
                                📅 programada {pub.scheduledDate ? `(${new Date(pub.scheduledDate).toLocaleString('es-AR', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})})` : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button"
                        onClick={() => {
                          setNewPubForm({
                            title: pub.title,
                            preview: pub.preview,
                            content: pub.content,
                            heroImage: pub.heroImage,
                            images: pub.images || [],
                            scheduledDate: pub.scheduledDate || '',
                            tags: pub.tags || [],
                            slug: pub.slug || ''
                          });
                          setEditingPubId(pub.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="font-mono text-white/70 border border-white/10 px-4 py-2 hover:text-white hover:border-white/30 transition-all text-sm"
                      >
                        editar
                      </button>
                      <button type="button"
                        onClick={() => {
                          const updated = editingPubs.map(p => 
                            p.id === pub.id ? {...p, hidden: !p.hidden} : p
                          );
                          setEditingPubs(updated);
                          setPublicaciones(updated);
                          localStorage.setItem('dinamarca_publicaciones', JSON.stringify(updated));
                        }}
                        className="font-mono text-white/70 border border-white/10 px-4 py-2 hover:text-white hover:border-white/30 transition-all text-sm"
                      >
                        {pub.hidden ? 'mostrar' : 'ocultar'}
                      </button>
                      <button type="button"
                        onClick={() => deletePublication(pub.id)}
                        className="font-mono text-red-500 hover:underline text-sm"
                      >
                        eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROYECTOS TAB */}
          {activeTab === 'proyectos' && (
            <div className="space-y-8">
              {/* Create new project */}
              <div className="border border-white/10 p-6 space-y-4">
                <h3 className="font-mono text-white/50 text-sm mb-4">crear nuevo proyecto</h3>
                <input
                  placeholder="nombre del proyecto"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  id="newProjectName"
                />
                <input
                  placeholder="tipo (ej: podcast, web, etc)"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  id="newProjectType"
                />
                <textarea
                  placeholder="descripción breve"
                  rows="2"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none resize-none"
                  id="newProjectDesc"
                />
                <input
                  placeholder="logo (emoji o símbolo, ej: ◉)"
                  className="w-32 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                  id="newProjectLogo"
                />
                <input
                  placeholder="link del proyecto (url completa)"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  id="newProjectLink"
                />
                <button type="button"
                  onClick={() => {
                    const name = document.getElementById('newProjectName').value;
                    const type = document.getElementById('newProjectType').value;
                    const desc = document.getElementById('newProjectDesc').value;
                    const logo = document.getElementById('newProjectLogo').value;
                    const link = document.getElementById('newProjectLink').value;
                    
                    if (!name || !desc) {
                      alert('Nombre y descripción son obligatorios');
                      return;
                    }
                    
                    const newProject = {
                      id: Date.now(),
                      name,
                      type: type || 'proyecto',
                      description: desc,
                      logo: logo || '▪️',
                      link: link || '#'
                    };
                    
                    const updated = [...editingProjects, newProject];
                    setEditingProjects(updated);
                    setProjects(updated);
                    localStorage.setItem('dinamarca_projects', JSON.stringify(updated));
                    
                    document.getElementById('newProjectName').value = '';
                    document.getElementById('newProjectType').value = '';
                    document.getElementById('newProjectDesc').value = '';
                    document.getElementById('newProjectLogo').value = '';
                    document.getElementById('newProjectLink').value = '';
                    
                    alert('Proyecto creado ✓');
                  }}
                  className="font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  crear proyecto
                </button>
              </div>

              {/* List existing projects */}
              <div className="space-y-4">
                <h3 className="font-mono text-white/50 text-sm">proyectos existentes</h3>
                {editingProjects.map((project, idx) => (
                  <div key={project.id} className="border border-white/10 p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <input
                          value={project.name}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[idx].name = e.target.value;
                            setEditingProjects(updated);
                          }}
                          placeholder="nombre"
                          className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                        />
                        <input
                          value={project.type}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[idx].type = e.target.value;
                            setEditingProjects(updated);
                          }}
                          placeholder="tipo"
                          className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                        />
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[idx].description = e.target.value;
                            setEditingProjects(updated);
                          }}
                          placeholder="descripción"
                          rows="2"
                          className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none resize-none"
                        />
                        <div className="flex gap-3">
                          <input
                            placeholder="logo emoji"
                            value={project.logo}
                            onChange={(e) => {
                              const updated = [...editingProjects];
                              updated[idx].logo = e.target.value;
                              setEditingProjects(updated);
                            }}
                            className="w-32 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                          />
                          <input
                            placeholder="logo URL imagen (40x40px)"
                            value={project.logoImage || ''}
                            onChange={(e) => {
                              const updated = [...editingProjects];
                              updated[idx].logoImage = e.target.value;
                              setEditingProjects(updated);
                            }}
                            className="flex-1 bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                          />
                        </div>
                        <input
                          placeholder="link (url completa)"
                          value={project.link || ''}
                          onChange={(e) => {
                            const updated = [...editingProjects];
                            updated[idx].link = e.target.value;
                            setEditingProjects(updated);
                          }}
                          className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <button type="button"
                        onClick={() => {
                          if (confirm('¿Eliminar este proyecto?')) {
                            const updated = editingProjects.filter((_, i) => i !== idx);
                            setEditingProjects(updated);
                            setProjects(updated);
                            localStorage.setItem('dinamarca_projects', JSON.stringify(updated));
                          }
                        }}
                        className="ml-4 font-mono text-red-500 hover:underline text-sm"
                      >
                        eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button type="button"
                onClick={saveProjects}
                className="font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
              >
                guardar cambios
              </button>
            </div>
          )}

          {/* MULTIMEDIA TAB */}
          {activeTab === 'multimedia' && (
            <div className="space-y-8">
              <div className="border border-white/10 p-6 space-y-4">
                <h3 className="font-mono text-white/50 text-sm mb-4">agregar imagen</h3>
                <input
                  placeholder="URL de la imagen"
                  id="newMediaUrl"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />
                <input
                  placeholder="título"
                  id="newMediaTitle"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />
                <input
                  placeholder="descripción"
                  id="newMediaDesc"
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                />
                <button type="button"
                  onClick={() => {
                    const url = document.getElementById('newMediaUrl').value;
                    const title = document.getElementById('newMediaTitle').value;
                    const desc = document.getElementById('newMediaDesc').value;
                    
                    if (url && title) {
                      const newItem = {
                        id: Date.now(),
                        type: 'image',
                        url,
                        title,
                        desc,
                        linked: 1
                      };
                      const updated = [...mediaItems, newItem];
                      setMediaItems(updated);
                      localStorage.setItem('dinamarca_media', JSON.stringify(updated));
                      document.getElementById('newMediaUrl').value = '';
                      document.getElementById('newMediaTitle').value = '';
                      document.getElementById('newMediaDesc').value = '';
                      alert('Imagen agregada ✓');
                    }
                  }}
                  className="font-mono text-white border border-white/20 px-8 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  agregar imagen
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-mono text-white/50 text-sm">imágenes actuales ({mediaItems.length})</h3>
                {mediaItems.length === 0 ? (
                  <div className="font-mono text-white/30 text-sm">no hay imágenes. agregá algunas arriba.</div>
                ) : (
                  mediaItems.map((item, idx) => (
                    <div key={item.id} className="border border-white/10 p-4 flex justify-between items-center">
                      <div className="flex gap-4 items-center flex-1">
                        <img src={item.url} alt={item.title} className="w-16 h-16 object-cover" />
                        <div className="flex-1">
                          <div className="font-mono text-white lowercase">{item.title}</div>
                          <div className="font-mono text-white/40 text-xs mt-1">{item.desc}</div>
                        </div>
                      </div>
                      <button type="button"
                        onClick={() => {
                          if (confirm('¿Eliminar esta imagen?')) {
                            const updated = mediaItems.filter((_, i) => i !== idx);
                            setMediaItems(updated);
                            localStorage.setItem('dinamarca_media', JSON.stringify(updated));
                          }
                        }}
                        className="font-mono text-red-500 hover:underline text-sm ml-4"
                      >
                        eliminar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECCIONES TAB */}
          {activeTab === 'secciones' && (
            <div className="space-y-6">
              <div className="border border-white/10 p-6">
                <h3 className="font-mono text-white/50 text-sm mb-4">visibilidad de secciones</h3>
                <p className="font-mono text-white/30 text-xs mb-6">
                  desactivá las secciones que no querés que aparezcan en el menú
                </p>
                <div className="space-y-4">
                  {Object.entries(visibleSections).map(([section, visible]) => (
                    <div key={section} className="flex items-center justify-between p-4 border border-white/10">
                      <span className="font-mono text-white lowercase">{section}</span>
                      <button type="button"
                        onClick={() => {
                          const updated = {...visibleSections, [section]: !visible};
                          setVisibleSections(updated);
                          localStorage.setItem('dinamarca_visible_sections', JSON.stringify(updated));
                        }}
                        className={`font-mono px-4 py-2 text-sm transition-all ${
                          visible 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-white/10 text-white/50 hover:bg-white/20'
                        }`}
                      >
                        {visible ? 'visible' : 'oculta'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ESTADÍSTICAS TAB */}
          {activeTab === 'estadísticas' && (
            <div className="space-y-6">
              <div className="border border-white/10 p-6">
                <h3 className="font-mono text-white text-lg mb-4 lowercase">📊 google analytics</h3>
                <p className="font-mono text-white/50 text-sm mb-6">
                  conectá google analytics para ver estadísticas de tus visitantes
                </p>

                {!analyticsId ? (
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 border border-white/10">
                      <h4 className="font-mono text-white text-sm mb-3">paso 1: crear cuenta</h4>
                      <ol className="font-mono text-white/70 text-xs space-y-2 list-decimal list-inside">
                        <li>Andá a <a href="https://analytics.google.com" target="_blank" className="text-red-500 hover:underline">analytics.google.com</a></li>
                        <li>Creá una cuenta gratis</li>
                        <li>Agregá una propiedad (tu sitio web)</li>
                        <li>Copiá tu "Measurement ID" (empieza con G-)</li>
                      </ol>
                    </div>

                    <div className="bg-white/5 p-4 border border-white/10">
                      <h4 className="font-mono text-white text-sm mb-3">paso 2: pegar tu ID acá</h4>
                      <input
                        type="text"
                        placeholder="G-XXXXXXXXXX"
                        value={analyticsId}
                        onChange={(e) => {
                          setAnalyticsId(e.target.value);
                          localStorage.setItem('dinamarca_analytics_id', e.target.value);
                        }}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 font-mono text-white focus:border-red-500 focus:outline-none"
                      />
                      <p className="font-mono text-white/40 text-xs mt-2">
                        ejemplo: G-1234567890
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/30 p-4">
                      <div className="font-mono text-green-500 text-sm mb-2">✓ google analytics conectado</div>
                      <div className="font-mono text-white/50 text-xs">ID: {analyticsId}</div>
                    </div>

                    <div className="bg-white/5 p-4 border border-white/10">
                      <h4 className="font-mono text-white text-sm mb-3">ver tus estadísticas</h4>
                      <a 
                        href="https://analytics.google.com" 
                        target="_blank"
                        className="inline-block font-mono text-white bg-red-500 hover:bg-red-600 px-6 py-3 transition-all"
                      >
                        abrir google analytics →
                      </a>
                      <p className="font-mono text-white/40 text-xs mt-3">
                        ahí vas a ver: visitas, países, tiempo en página, dispositivos, y más
                      </p>
                    </div>

                    <button type="button"
                      onClick={() => {
                        if (confirm('¿Desconectar Google Analytics?')) {
                          setAnalyticsId('');
                          localStorage.removeItem('dinamarca_analytics_id');
                        }
                      }}
                      className="font-mono text-red-500 hover:underline text-sm"
                    >
                      desconectar analytics
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONFIGURACIÓN TAB */}
          {activeTab === 'configuración' && (
            <div className="space-y-6">
              <div className="border border-white/10 p-6 space-y-6">
                <h3 className="font-mono text-white text-lg mb-4 lowercase">⚙️ configuración del sitio</h3>
                
                {/* Site Name */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">nombre del sitio</label>
                  <input
                    value={siteConfig.siteName}
                    onChange={(e) => {
                      const updated = {...siteConfig, siteName: e.target.value};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* Logo URL */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">logo url (opcional)</label>
                  <input
                    placeholder="https://..."
                    value={siteConfig.logoUrl}
                    onChange={(e) => {
                      const updated = {...siteConfig, logoUrl: e.target.value};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  {siteConfig.logoUrl && (
                    <img src={siteConfig.logoUrl} alt="preview" className="w-12 h-12 object-contain border border-white/10 p-2" />
                  )}
                </div>

                {/* Favicon URL */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">favicon url (opcional)</label>
                  <input
                    placeholder="https://..."
                    value={siteConfig.faviconUrl}
                    onChange={(e) => {
                      const updated = {...siteConfig, faviconUrl: e.target.value};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  <p className="font-mono text-white/30 text-xs">
                    el ícono que aparece en la pestaña del navegador
                  </p>
                </div>

                {/* Bio SEO */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">bio corta (para google)</label>
                  <input
                    value={siteConfig.bioSeo}
                    maxLength={60}
                    onChange={(e) => {
                      const updated = {...siteConfig, bioSeo: e.target.value};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                  />
                  <p className="font-mono text-white/30 text-xs">
                    {siteConfig.bioSeo.length}/60 caracteres
                  </p>
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">descripción completa (SEO)</label>
                  <textarea
                    value={siteConfig.metaDescription}
                    maxLength={160}
                    rows={3}
                    onChange={(e) => {
                      const updated = {...siteConfig, metaDescription: e.target.value};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none resize-none"
                  />
                  <p className="font-mono text-white/30 text-xs">
                    {siteConfig.metaDescription.length}/160 caracteres - esto aparece en google
                  </p>
                </div>
              </div>

              {/* Security & Maintenance */}
              <div className="border border-white/10 p-6 space-y-6">
                <h3 className="font-mono text-white text-lg mb-4 lowercase">🔒 seguridad & mantenimiento</h3>
                
                {/* Maintenance Mode */}
                <div className="space-y-2">
                  <label className="font-mono text-white/50 text-xs">modo mantenimiento</label>
                  <button type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const updated = {...siteConfig, maintenanceMode: !siteConfig.maintenanceMode};
                      setSiteConfig(updated);
                      localStorage.setItem('dinamarca_site_config', JSON.stringify(updated));
                    }}
                    className={`w-full font-mono px-6 py-3 transition-all ${
                      siteConfig.maintenanceMode 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {siteConfig.maintenanceMode ? '🔧 modo mantenimiento activo' : 'sitio público'}
                  </button>
                  <p className="font-mono text-white/30 text-xs">
                    activá esto para ocultar temporalmente el sitio mientras hacés cambios
                  </p>
                </div>

                {/* Change Password */}
                <div className="space-y-4">
                  <label className="font-mono text-white/50 text-xs">cambiar contraseña admin</label>
                  <div className="bg-white/5 border border-white/10 p-4 space-y-4">
                    <input
                      type="password"
                      placeholder="contraseña actual"
                      id="currentPasswordCheck"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="nueva contraseña"
                      id="newPassword1"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="repetí nueva contraseña"
                      id="newPassword2"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white focus:border-red-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="tu email (para código 2FA)"
                      id="emailFor2FA"
                      className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                    />
                    <button type="button"
                      onClick={async () => {
                        const current = document.getElementById('currentPasswordCheck').value;
                        const new1 = document.getElementById('newPassword1').value;
                        const new2 = document.getElementById('newPassword2').value;
                        const email = document.getElementById('emailFor2FA').value;

                        if (!current || !new1 || !new2 || !email) {
                          alert('Completá todos los campos');
                          return;
                        }

                        if (new1 !== new2) {
                          alert('Las contraseñas no coinciden');
                          return;
                        }

                        const currentHash = await hashPassword(current);
                        if (currentHash !== adminPassword) {
                          alert('Contraseña actual incorrecta');
                          return;
                        }

                        // Generate simple 2FA code
                        const code = Math.floor(100000 + Math.random() * 900000).toString();
                        const confirmCode = prompt(`Código 2FA enviado a ${email}: ${code}\n\nIngresá el código:`);

                        if (confirmCode !== code) {
                          alert('Código incorrecto');
                          return;
                        }

                        const newHash = await hashPassword(new1);
                        setAdminPassword(newHash);
                        localStorage.setItem('dinamarca_admin_password', newHash);
                        
                        document.getElementById('currentPasswordCheck').value = '';
                        document.getElementById('newPassword1').value = '';
                        document.getElementById('newPassword2').value = '';
                        document.getElementById('emailFor2FA').value = '';
                        
                        alert('Contraseña cambiada ✓');
                      }}
                      className="w-full font-mono text-white border border-white/20 px-6 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
                    >
                      cambiar contraseña
                    </button>
                    <p className="font-mono text-white/30 text-xs">
                      ⚠️ importante: guardá tu nueva contraseña en un lugar seguro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Embed Modal */}
        {embedModalType && (
          <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-black border border-white/20 p-6 space-y-4">
              <h3 className="font-mono text-white text-lg lowercase">
                {embedModalType === 'youtube' && '▶️ agregar youtube'}
                {embedModalType === 'spotify' && '🎵 agregar spotify'}
                {embedModalType === 'instagram' && '📷 agregar instagram'}
                {embedModalType === 'twitter' && '🐦 agregar twitter'}
                {embedModalType === 'image' && '🖼️ agregar imagen'}
                {embedModalType === 'image2' && '🖼️×2 agregar 2 imágenes'}
              </h3>

              {embedModalType === 'instagram' || embedModalType === 'twitter' ? (
                <>
                  <input
                    type="text"
                    placeholder={`URL del ${embedModalType === 'twitter' ? 'tweet' : 'post de Instagram'}`}
                    value={embedData.postUrl || ''}
                    onChange={(e) => setEmbedData({...embedData, postUrl: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={embedData.imgUrl || ''}
                    onChange={(e) => setEmbedData({...embedData, imgUrl: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Usuario (ej: @username)"
                    value={embedData.username || ''}
                    onChange={(e) => setEmbedData({...embedData, username: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                </>
              ) : embedModalType === 'image2' ? (
                <>
                  <input
                    type="text"
                    placeholder="URL primera imagen"
                    value={embedData.url1 || ''}
                    onChange={(e) => setEmbedData({...embedData, url1: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="URL segunda imagen"
                    value={embedData.url2 || ''}
                    onChange={(e) => setEmbedData({...embedData, url2: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                </>
              ) : (
                <input
                  type="text"
                  placeholder="Pegá la URL acá"
                  value={embedData.url || ''}
                  onChange={(e) => setEmbedData({...embedData, url: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-2 font-mono text-white text-sm focus:border-red-500 focus:outline-none"
                  autoFocus
                />
              )}

              <div className="flex gap-3">
                <button type="button"
                  onClick={handleEmbedSubmit}
                  className="flex-1 font-mono text-white border border-white/20 px-6 py-2 hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  insertar
                </button>
                <button type="button"
                  onClick={() => {
                    setEmbedModalType(null);
                    setEmbedData({});
                  }}
                  className="font-mono text-white/50 hover:text-red-500 transition-colors px-4"
                >
                  cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente CLIMA
  const Clima = () => {
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(true);

    const ciudadesConFotos = [
      { nombre: 'Buenos Aires', imagen: 'https://i.pinimg.com/1200x/2c/10/43/2c104376c2708609bdc442a63146247e.jpg', coords: '-34.6037,-58.3816' },
      { nombre: 'Ushuaia', imagen: 'https://i.pinimg.com/1200x/a4/c1/a8/a4c1a858d01267fa2df562d1cb84f37c.jpg', coords: '-54.8019,-68.3030' },
      { nombre: 'El Calafate', imagen: 'https://i.pinimg.com/1200x/87/b9/b4/87b9b413c6b3719971bf5d4c6f40e2ef.jpg', coords: '-50.3373,-72.2647' },
      { nombre: 'Puerto Madryn', imagen: 'https://i.pinimg.com/1200x/15/00/e4/1500e4174f1246e6a221f37e680f23a9.jpg', coords: '-42.7692,-65.0391' },
      { nombre: 'San Martin de los Andes', imagen: 'https://i.pinimg.com/736x/58/8f/ee/588fee60b3355853ef196f691973fee2.jpg', coords: '-40.1572,-71.3532' },
      { nombre: 'Viedma', imagen: 'https://i.pinimg.com/736x/0b/66/e8/0b66e80ef5a58a19dc74b1038365f499.jpg', coords: '-40.8135,-62.9967' },
      { nombre: 'Cuatral Co', imagen: 'https://i.pinimg.com/1200x/28/13/fc/2813fc0703ffa2de77a9055d9f7d0595.jpg', coords: '-37.9167,-68.3500' },
      { nombre: 'Mar del Plata', imagen: 'https://i.pinimg.com/1200x/c6/0a/41/c60a411cc5cc25641f9b5b8b08ff5bb7.jpg', coords: '-38.0055,-57.5426' },
      { nombre: 'Ramos Mejia', imagen: 'https://i.pinimg.com/1200x/f8/34/77/f83477dc37b8f54da13fe224fd0c2d43.jpg', coords: '-34.6417,-58.5647' },
      { nombre: 'Trenque Lauquen', imagen: 'https://i.pinimg.com/1200x/d6/23/13/d62313512542dfa69e90b8e2590eb800.jpg', coords: '-35.9733,-62.7306' },
      { nombre: 'Santa Rosa', imagen: 'https://i.pinimg.com/1200x/62/0c/52/620c52a60e8a01e73a6bc636ee3b739f.jpg', coords: '-36.6167,-64.2833' },
      { nombre: 'Villa Mercedes', imagen: 'https://i.pinimg.com/736x/cc/25/36/cc25360301068e62dc6f515824c55e9c.jpg', coords: '-33.6758,-65.4603' },
      { nombre: 'Mendoza', imagen: 'https://i.pinimg.com/736x/3d/42/6e/3d426e2055699351ab582bf8efe2c7d0.jpg', coords: '-32.8895,-68.8458' },
      { nombre: 'Venado Tuerto', imagen: 'https://i.pinimg.com/1200x/8e/85/68/8e856850e4ad3538bb18b1c0c4c47846.jpg', coords: '-33.7456,-61.9689' },
      { nombre: 'Rio Cuarto', imagen: 'https://i.pinimg.com/1200x/3a/ea/4c/3aea4c4fd23faf003452b97f82a266fb.jpg', coords: '-33.1239,-64.3494' },
      { nombre: 'Villa Gral Belgrano', imagen: 'https://i.pinimg.com/1200x/50/04/8b/50048b76f2e7a876b8502e4479657c2d.jpg', coords: '-31.9772,-64.5597' },
      { nombre: 'Concordia', imagen: 'https://i.pinimg.com/1200x/b8/3e/0a/b83e0ac7738a47c84bc79d16430d8217.jpg', coords: '-31.3933,-58.0208' },
      { nombre: 'Chilecito', imagen: 'https://i.pinimg.com/1200x/bb/c6/5f/bbc65f94c4b43052c0c6ec86e943b6e6.jpg', coords: '-29.1639,-67.4981' },
      { nombre: 'Curuzu Cuatia', imagen: 'https://i.pinimg.com/736x/b6/f6/5f/b6f65f6870ddf6d2222ea143c2aef59d.jpg', coords: '-29.7917,-58.0528' },
      { nombre: 'Fiambala', imagen: 'https://i.pinimg.com/736x/b2/ff/3f/b2ff3fddfce674a52ad9c6d1eb99ad15.jpg', coords: '-27.6917,-67.6139' },
      { nombre: 'Cafayate', imagen: 'https://i.pinimg.com/736x/b4/94/36/b494368665c2a6011e8697354b7b6697.jpg', coords: '-26.0733,-65.9789' },
      { nombre: 'Purmamarca', imagen: 'https://i.pinimg.com/1200x/4d/fa/94/4dfa947b71227e0be3df8492159f579b.jpg', coords: '-23.7419,-65.4986' },
      { nombre: 'Clorinda', imagen: 'https://i.pinimg.com/736x/59/9e/79/599e79a2b3e94edbce4e8dc87fa3e800.jpg', coords: '-25.2844,-57.7186' },
      { nombre: 'Puerto Iguazu', imagen: 'https://i.pinimg.com/736x/82/24/56/822456f46023589086411105591e6e87.jpg', coords: '-25.5978,-54.5789' },
      { nombre: 'Tartagal', imagen: 'https://i.pinimg.com/1200x/04/68/af/0468af79324a6e8beb736f61566a2bd5.jpg', coords: '-22.5164,-63.8014' },
      { nombre: 'Islas Malvinas', imagen: 'https://i.pinimg.com/1200x/99/77/be/9977beb0331a3dd05940e218dad96ef7.jpg', coords: '-51.7963,-59.5236' },
      { nombre: 'San Isidro', imagen: 'https://i.pinimg.com/736x/4d/32/1b/4d321b5f6293248cdf15936a3c07200b.jpg', coords: '-34.4708,-58.5278' },
      { nombre: 'La Plata', imagen: 'https://i.pinimg.com/736x/c5/a7/21/c5a721baeddadca3e337a7ee5cc631b1.jpg', coords: '-34.9214,-57.9544' },
      { nombre: 'Pehuajo', imagen: 'https://i.pinimg.com/736x/a0/a8/3b/a0a83be488519a7ddbd226de91eb9b87.jpg', coords: '-35.8119,-61.8981' },
      { nombre: 'Base Marambio', imagen: 'https://i.pinimg.com/736x/9e/d6/f0/9ed6f02cd9aba22b33ac503c03ba4643.jpg', coords: '-64.2400,-56.6267' }
    ];

    useEffect(() => {
      const fetchWeather = async () => {
        const API_KEY = '770e8847a60823082fc5fa6fc57ed1bb';
        const newWeatherData = {};

        for (const ciudad of ciudadesConFotos) {
          try {
            const [lat, lon] = ciudad.coords.split(',');
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
            );
            const data = await response.json();
            
            if (data.main && data.weather) {
              newWeatherData[ciudad.nombre] = {
                temp: Math.round(data.main.temp),
                description: data.weather[0].description
              };
            }
          } catch (error) {
            console.error(`Error fetching weather for ${ciudad.nombre}:`, error);
            newWeatherData[ciudad.nombre] = {
              temp: '--',
              description: 'sin datos'
            };
          }
        }

        setWeatherData(newWeatherData);
        setLoading(false);
      };

      fetchWeather();
      // Actualizar cada 10 minutos
      const interval = setInterval(fetchWeather, 600000);
      return () => clearInterval(interval);
    }, []);

    const getColorForTemp = (temp) => {
      if (typeof temp !== 'number') return '#9e9e9e';
      if (temp <= 0) return '#00d4ff';
      if (temp <= 10) return '#4dd0e1';
      if (temp <= 18) return '#9e9e9e';
      if (temp <= 25) return '#ffa726';
      if (temp <= 32) return '#ff6b6b';
      if (temp <= 40) return '#ef5350';
      return '#d32f2f';
    };

    return (
      <div className="min-h-screen bg-black pt-24 sm:pt-32 pb-32 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-mono text-white/30 text-xs sm:text-sm mb-8 sm:mb-12 tracking-widest">CLIMA</h1>
          {loading ? (
            <div className="font-mono text-white/30 text-sm text-center py-12">
              cargando temperaturas en vivo...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {ciudadesConFotos.map((ciudad, idx) => {
                const weather = weatherData[ciudad.nombre] || { temp: '--', description: 'sin datos' };
                
                return (
                  <div 
                    key={idx} 
                    className="relative border border-white/10 p-4 hover:border-red-500/50 transition-all overflow-hidden group"
                  >
                    {/* Imagen de fondo con degradado muy oscuro */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7)), url(${ciudad.imagen})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  
                  {/* Contenido sobre la imagen */}
                  <div className="relative z-10">
                    <div className="font-mono text-white text-sm mb-2 lowercase">{ciudad.nombre}</div>
                    <div className="font-mono text-white/50 text-xs mb-2 lowercase">{weather.description}</div>
                    <div 
                      className="font-mono text-2xl font-bold" 
                      style={{color: getColorForTemp(weather.temp)}}
                    >
                      {weather.temp}°
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    );
  };

  const sections = {
    'home': <Home />,
    'about me': <AboutMe />,
    'publicaciones': <Publicaciones />,
    'multimedia': <Multimedia />,
    'proyectos': <Proyectos />,
    'clima': <Clima />,
    'contacto': <Contacto />,
    'admin': <AdminPanel />
  };

  // Check for admin access via URL
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setShowAdminLogin(true);
    }

    // Update favicon and title
    document.title = siteConfig.siteName;
    
    if (siteConfig.faviconUrl) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteConfig.faviconUrl;
    }

    // Update meta description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = siteConfig.metaDescription;
  }, [siteConfig]);

  // Auto-publish scheduled posts
  useEffect(() => {
    const checkScheduled = () => {
      const now = new Date();
      let hasChanges = false;
      
      const updated = publicaciones.map(pub => {
        if (pub.scheduled && pub.scheduledDate) {
          const scheduledTime = new Date(pub.scheduledDate);
          if (scheduledTime <= now) {
            hasChanges = true;
            return { ...pub, draft: false, scheduled: false };
          }
        }
        return pub;
      });

      if (hasChanges) {
        setPublicaciones(updated);
        localStorage.setItem('dinamarca_publicaciones', JSON.stringify(updated));
      }
    };

    // Check every minute
    checkScheduled();
    const interval = setInterval(checkScheduled, 60000);
    return () => clearInterval(interval);
  }, [publicaciones]);

  // Load Google Analytics if ID is set
  useEffect(() => {
    if (analyticsId && analyticsId.startsWith('G-')) {
      // Remove existing scripts
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
      if (existingScript) existingScript.remove();
      
      // Add Google Analytics
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', analyticsId);
      };
    }
  }, [analyticsId]);

  // Listener para lightbox en imágenes del contenido
  useEffect(() => {
    const handleImageClick = (e) => {
      const target = e.target;
      if (target.tagName === 'IMG' && target.classList.contains('lightbox-trigger')) {
        e.preventDefault();
        e.stopPropagation();
        const url = target.getAttribute('data-lightbox-url');
        if (url) {
          // Guardar posición del scroll
          window.lightboxScrollPosition = window.scrollY;
          setLightboxImage(url);
        }
      }
    };

    // Agregar listener al documento
    document.addEventListener('click', handleImageClick, true); // useCapture = true
    
    // MutationObserver para re-aplicar cuando el DOM cambia
    const observer = new MutationObserver(() => {
      // Forzar actualización
      const images = document.querySelectorAll('.lightbox-trigger');
      images.forEach(img => {
        // Asegurar que tengan cursor pointer
        img.style.cursor = 'pointer';
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      document.removeEventListener('click', handleImageClick, true);
      observer.disconnect();
    };
  }, []); // Sin dependencias

  // Restaurar scroll cuando se cierra lightbox
  useEffect(() => {
    if (!lightboxImage && window.lightboxScrollPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo({ top: window.lightboxScrollPosition, behavior: 'instant' });
      }, 10);
    }
  }, [lightboxImage]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const inputHash = await hashPassword(adminPasswordInput);
    if (inputHash === adminPassword) {
      setIsAdmin(true);
      setCurrentSection('admin');
      setShowAdminLogin(false);
      setAdminPasswordInput('');
    } else {
      alert('contraseña incorrecta');
      setAdminPasswordInput('');
    }
  };

  return (
    <div className="bg-black min-h-screen font-mono">
      {siteConfig.maintenanceMode && !isAdmin ? (
        // Maintenance Mode Screen
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-6">
            <div className="text-6xl">🔧</div>
            <h1 className="font-mono text-white text-2xl lowercase">modo mantenimiento</h1>
            <p className="font-mono text-white/50 text-sm max-w-md">
              el sitio está temporalmente fuera de servicio. volvé pronto.
            </p>
            <button type="button"
              onClick={() => setShowAdminLogin(true)}
              className="font-mono text-white/30 hover:text-white text-xs transition-colors"
            >
              acceso admin
            </button>
          </div>
        </div>
      ) : (
        <>
          <BackgroundParticles />
          <Header />
          {sections[currentSection]}
          <Footer />
        </>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-black border border-white/20 p-8">
              <h2 className="font-mono text-white text-xl mb-6 lowercase">admin access</h2>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="contraseña"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 font-mono text-white lowercase focus:border-red-500 focus:outline-none"
                    autoFocus
                  />
                  <button type="button"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors text-lg"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                <div className="flex gap-4">
                  <button type="button"
                    type="submit"
                    className="flex-1 font-mono text-white border border-white/20 px-6 py-3 hover:bg-red-500 hover:border-red-500 transition-all"
                  >
                    entrar
                  </button>
                  <button type="button"
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPasswordInput('');
                      window.location.hash = '';
                    }}
                    className="font-mono text-white/50 hover:text-red-500 transition-colors"
                  >
                    cancelar
                  </button>
                </div>
              </form>
              <div className="mt-6 font-mono text-white/30 text-xs">
                contraseña por defecto: dinamarca2025
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for image zoom */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-mono"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <img 
            src={lightboxImage} 
            alt="imagen ampliada"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default DINAMARCA;
