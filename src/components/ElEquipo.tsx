import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import { TeamAmbience } from '../effects/SectionBackgrounds';

interface TeamMember {
  name: string;
  role: string;
  birthYear: number;
  cityBorn: string;
  cityCurrent: string;
  zodiac: string;
  photoUrl: string;
  socials: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  favorites: Record<string, string | number>;
  cities: Record<string, string>;
}

// ============================================================
// ADMIN PANEL — CONFIGURACIÓN DE "EL EQUIPO"
// ============================================================
//
// TÍTULO Y SUBTÍTULO DE LA SECCIÓN (editable):
const sectionTitle = 'El Equipo';
const sectionSubtitle = 'Las personas detrás de cada historia';
//
// RESOLUCIÓN DE IMÁGENES RECOMENDADA:
// Fotos de perfil: 600×800px mínimo (ratio 3:4), formato JPG/WebP, max 500KB
// Se recomienda que el rostro esté centrado en el tercio superior.
//
// CATEGORÍAS EDITABLES — "Perfil Humano"
// Podés agregar, quitar o renombrar cualquier campo.
const favoriteFields: { key: string; label: string }[] = [
  { key: 'iceCream', label: 'Helado favorito' },
  { key: 'drink', label: 'Bebida favorita' },
  { key: 'book', label: 'Libro favorito' },
  { key: 'movie', label: 'Película favorita' },
  { key: 'series', label: 'Serie favorita' },
  { key: 'character', label: 'Personaje favorito' },
  { key: 'celebrity', label: 'Famoso favorito' },
  { key: 'album', label: 'Álbum musical favorito' },
  { key: 'podcast', label: 'Podcast que escucha' },
  { key: 'sport', label: 'Deporte favorito' },
  { key: 'food', label: 'Comida favorita' },
  { key: 'smell', label: 'Olor favorito' },
  { key: 'sound', label: 'Sonido que le relaja' },
  { key: 'timeOfDay', label: 'Hora favorita del día' },
  { key: 'weather', label: 'Clima favorito' },
  { key: 'tattoos', label: 'Cantidad de tatuajes' },
];

// CATEGORÍAS EDITABLES — "Ciudades"
const cityFields: { key: string; label: string }[] = [
  { key: 'dreamVisit', label: 'Ciudad que sueña con visitar' },
  { key: 'wouldntVisit', label: 'Ciudad que no visitaría' },
  { key: 'wouldLive', label: 'Ciudad donde viviría' },
  { key: 'bestFood', label: 'Ciudad donde se come mejor' },
  { key: 'wouldPropose', label: 'Ciudad donde propondría casamiento' },
  { key: 'wouldIsolate', label: 'Ciudad donde se aislaría' },
  { key: 'meetPeople', label: 'Ciudad donde iría a conocer gente' },
  { key: 'vacation', label: 'Ciudad para vacacionar siempre' },
  { key: 'allExpensesPaid', label: 'Ciudad que soñaría conocer todo pago' },
  { key: 'writeBook', label: 'Ciudad donde escribiría un libro' },
  { key: 'recordEpisode', label: 'Ciudad donde grabaría un episodio ideal' },
  { key: 'nostalgia', label: 'Ciudad que le genera nostalgia sin haber ido' },
];

// DATOS DE LOS INTEGRANTES (editable desde admin)
const teamMembers: TeamMember[] = [
  {
    name: 'Mikasa',
    role: 'Narradora Principal',
    birthYear: 1995,
    cityBorn: 'Buenos Aires',
    cityCurrent: 'Buenos Aires',
    zodiac: 'Escorpio',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    socials: { instagram: "#", twitter: "#", youtube: "#", tiktok: "#" },
    favorites: {
      iceCream: 'Chocolate amargo', drink: 'Café negro', book: 'Cien años de soledad',
      movie: 'Blade Runner', series: 'Dark', character: 'Don Draper',
      celebrity: 'David Bowie', album: 'OK Computer', podcast: 'Serial',
      sport: 'Natación', food: 'Pizza napolitana', smell: 'Café recién hecho',
      sound: 'Lluvia', timeOfDay: '3:00 AM', weather: 'Lluvia nocturna', tattoos: 3,
    },
    cities: {
      dreamVisit: 'Tokio', wouldntVisit: 'Dubai', wouldLive: 'Berlín',
      bestFood: 'Roma', wouldPropose: 'París', wouldIsolate: 'Islandia',
      meetPeople: 'Barcelona', vacation: 'Kioto', allExpensesPaid: 'Nueva York',
      writeBook: 'Praga', recordEpisode: 'Estambul', nostalgia: 'Lisboa',
    },
  },
  {
    name: 'Violet',
    role: 'Co-Narradora',
    birthYear: 1992,
    cityBorn: 'Rosario',
    cityCurrent: 'Barcelona',
    zodiac: 'Piscis',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    socials: { instagram: "#", twitter: "#", youtube: "#", tiktok: "#" },
    favorites: {
      iceCream: 'Limón', drink: 'Té verde', book: 'El principito',
      movie: 'Your Name', series: 'Stranger Things', character: 'Hermione Granger',
      celebrity: 'Björk', album: 'The Dark Side of the Moon', podcast: 'Radiolab',
      sport: 'Yoga', food: 'Sushi', smell: 'Jazmín',
      sound: 'Viento', timeOfDay: '6:00 AM', weather: 'Niebla matinal', tattoos: 5,
    },
    cities: {
      dreamVisit: 'Kioto', wouldntVisit: 'Las Vegas', wouldLive: 'Ámsterdam',
      bestFood: 'Bangkok', wouldPropose: 'Santorini', wouldIsolate: 'Noruega',
      meetPeople: 'Lisboa', vacation: 'Bali', allExpensesPaid: 'Tokio',
      writeBook: 'Edimburgo', recordEpisode: 'Praga', nostalgia: 'París',
    },
  },
  {
    name: 'Levi',
    role: 'Editor y Productor',
    birthYear: 1988,
    cityBorn: 'Córdoba',
    cityCurrent: 'Buenos Aires',
    zodiac: 'Capricornio',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    socials: { instagram: "#", twitter: "#", youtube: "#", tiktok: "#" },
    favorites: {
      iceCream: 'Dulce de leche', drink: 'Fernet con coca', book: 'Rayuela',
      movie: 'Inception', series: 'Breaking Bad', character: 'Tyler Durden',
      celebrity: 'Thom Yorke', album: 'In Rainbows', podcast: '99% Invisible',
      sport: 'Escalada', food: 'Asado', smell: 'Tierra mojada',
      sound: 'Tormenta', timeOfDay: '11:00 PM', weather: 'Tormenta eléctrica', tattoos: 0,
    },
    cities: {
      dreamVisit: 'Reikiavik', wouldntVisit: 'Mumbai', wouldLive: 'Copenhague',
      bestFood: 'Ciudad de México', wouldPropose: 'Venecia', wouldIsolate: 'Patagonia',
      meetPeople: 'Berlín', vacation: 'Noruega', allExpensesPaid: 'Islandia',
      writeBook: 'San Sebastián', recordEpisode: 'Berlín', nostalgia: 'Montevideo',
    },
  },
];
// ============================================================

export const ElEquipo: React.FC = () => {
  const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  return (
    <section id="equipo" className="relative py-32 px-6 overflow-hidden">
      <TeamAmbience />

      {/* Atmospheric background with aurora */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Atmospheric gradients */}
        <div className="absolute" style={{ left: '-15%', top: '10%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.06) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <div className="absolute" style={{ right: '-10%', bottom: '10%', width: '50%', height: '50%', background: 'radial-gradient(ellipse, rgba(138, 155, 196, 0.05) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        
        {/* Animated aurora bands */}
        <motion.div className="absolute"
          style={{ left: '5%', top: '0', width: '30%', height: '100%', background: 'linear-gradient(180deg, transparent 0%, rgba(196,85,85,0.04) 30%, rgba(196,85,85,0.08) 50%, rgba(196,85,85,0.04) 70%, transparent 100%)', filter: 'blur(30px)' }}
          animate={{ x: [0, 80, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute"
          style={{ right: '10%', top: '0', width: '25%', height: '100%', background: 'linear-gradient(180deg, transparent 0%, rgba(138,155,196,0.03) 30%, rgba(138,155,196,0.06) 50%, rgba(138,155,196,0.03) 70%, transparent 100%)', filter: 'blur(25px)' }}
          animate={{ x: [0, -60, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        
        {/* Horizontal frequency lines */}
        {!isMobileDevice && (
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(212, 197, 176, 0.025) 80px)',
            backgroundSize: '100% 80px',
          }} />
        )}
        {/* Glow central sutil */}
        <motion.div
          className="absolute"
          style={{ left: '30%', top: '40%', width: '40%', height: '30%', background: 'radial-gradient(ellipse, rgba(196, 85, 85, 0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-soda-glow mb-6">
            {sectionTitle}
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto mb-6" />
          <p className="text-soda-fog font-light">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-15 rounded-sm overflow-hidden hover:border-soda-mist hover:border-opacity-30 transition-all duration-700 group hover:-translate-y-1 relative">
                {/* Glow rojo que aparece en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-soda-red/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-sm" />
                <div className="absolute -inset-px rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(135deg, rgba(196,85,85,0.08), transparent 40%, transparent 60%, rgba(138,155,196,0.05))' }} />
                {/* Foto - ratio 3:4 con partículas doradas, negras y color tint en hover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-soda-deep">
                  {/* Partículas doradas */}
                  {[...Array(isMobileDevice ? 2 : 8)].map((_, i) => (
                    <motion.div
                      key={`gold-${i}`}
                      className="absolute w-1 h-1 bg-soda-lamp rounded-full pointer-events-none z-10"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  {/* Partículas negras */}
                  {[...Array(isMobileDevice ? 2 : 6)].map((_, i) => (
                    <motion.div
                      key={`black-${i}`}
                      className="absolute rounded-full pointer-events-none z-10"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        width: `${4 + Math.random() * 3}px`,
                        height: `${4 + Math.random() * 3}px`,
                        background: 'rgba(10, 14, 26, 0.7)',
                      }}
                      animate={{
                        y: [0, -18, 0],
                        x: [0, 6 * (Math.random() > 0.5 ? 1 : -1), 0],
                        opacity: [0, 0.55, 0],
                        scale: [0.4, 1.1, 0.4],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Color tint sutil en hover */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-soda-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <motion.img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soda-night via-transparent to-transparent opacity-60 group-hover:opacity-45 transition-opacity duration-700" />
                </div>

                {/* Info completa — sin botón, todo visible */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-soda-glow mb-2">{member.name}</h3>
                  <p className="text-soda-accent text-sm mb-4">{member.role}</p>
                  
                  <div className="space-y-2 text-soda-fog text-xs mb-6">
                    <p>Nacido en {member.cityBorn} ({member.birthYear})</p>
                    <p>Vive en {member.cityCurrent}</p>
                    <p>{member.zodiac}</p>
                  </div>

                  {/* Redes sociales */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-soda-mist border-opacity-20">
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} className="hoverable text-soda-accent hover:text-soda-lamp transition-colors" title="Instagram">
                        <Instagram size={20} />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="hoverable text-soda-accent hover:text-soda-lamp transition-colors" title="Twitter/X">
                        <Twitter size={20} />
                      </a>
                    )}
                    {member.socials.youtube && (
                      <a href={member.socials.youtube} className="hoverable text-soda-accent hover:text-soda-lamp transition-colors" title="YouTube">
                        <Youtube size={20} />
                      </a>
                    )}
                    {member.socials.tiktok && (
                      <a href={member.socials.tiktok} className="hoverable text-soda-accent hover:text-soda-lamp transition-colors text-sm" title="TikTok">
                        TT
                      </a>
                    )}
                  </div>

                  {/* Favoritos — todo visible directamente */}
                  <div className="mb-6">
                    <h4 className="text-soda-lamp text-xs font-medium mb-3 tracking-wider">PERFIL HUMANO</h4>
                    <div className="space-y-2 text-xs">
                      {favoriteFields.map((field) => (
                        member.favorites[field.key] !== undefined ? (
                          <div key={field.key} className="text-soda-fog">
                            <span className="text-soda-accent">{field.label}:</span> {String(member.favorites[field.key])}
                          </div>
                        ) : null
                      ))}
                    </div>
                  </div>

                  {/* Ciudades — todo visible directamente */}
                  <div>
                    <h4 className="text-soda-lamp text-xs font-medium mb-3 tracking-wider">CIUDADES</h4>
                    <div className="space-y-2 text-xs">
                      {cityFields.map((field) => (
                        member.cities[field.key] !== undefined ? (
                          <div key={field.key} className="text-soda-fog">
                            <span className="text-soda-accent">{field.label}:</span> {member.cities[field.key]}
                          </div>
                        ) : null
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
