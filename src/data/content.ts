// ============================================================
// STORE CENTRAL DE CONTENIDO — sodaroja
// Todo el contenido editable del sitio vive acá.
// El Admin Panel lee y modifica estos datos.
// En producción, conectar con Supabase/Firebase.
// ============================================================

export interface SiteContent {
  // Meta / SEO / Analytics
  meta: {
    pageTitle: string;
    faviconUrl: string;
    description: string;
    analyticsId: string;
    emailjsServiceId: string;
    emailjsTemplateId: string;
    emailjsPublicKey: string;
  };

  // Nombres de las secciones (aparecen en el header/navbar)
  sectionNames: {
    inicio: string;
    queEsEsto: string;
    equipo: string;
    episodios: string;
    frecuenciaInterna: string;
    shop: string;
    contacto: string;
  };

  // INICIO / HERO
  hero: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string; // URL de imagen principal (reemplaza el SVG)
  };

  // QUÉ ES ESTO
  queEsEsto: {
    title: string;
    description: string;
    structureTitle: string;
    structureSubtitle: string;
    estructura: {
      numero: string;
      emoji: string;
      titulo: string;
      subtitulo?: string;
      descripcion: string;
      detalles: string;
      destacado: boolean;
      color: 'red' | 'accent' | 'lamp' | 'glow'; // Color del número y borde
    }[];
    temas: string[];
  };

  // EL EQUIPO
  equipo: {
    title: string;
    subtitle: string;
    favoriteFields: { key: string; label: string }[];
    cityFields: { key: string; label: string }[];
    members: {
      name: string;
      role: string;
      birthYear: number;
      cityBorn: string;
      cityCurrent: string;
      zodiac: string;
      photoUrl: string;
      socials: { platform: string; url: string; abbr: string }[];
      favorites: Record<string, string | number>;
      cities: Record<string, string>;
    }[];
  };

  // EPISODIOS
  episodios: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      city: string;
      title: string;
      description: string;
      imageUrl: string;
      publishDate: string; // YYYY-MM-DD
      isPremium: boolean;
      lat?: number;
      lng?: number;
      links: {
        youtube?: string;
        spotify?: string;
        soundcloud?: string;
        ivoox?: string;
        applePodcasts?: string;
      };
      embeds: {
        spotify?: string;
        soundcloud?: string;
        ivoox?: string;
        applePodcasts?: string;
      };
    }[];
  };

  // FRECUENCIA INTERNA
  frecuenciaInterna: {
    title: string;
    subtitle: string;
    introText: string;
    benefitsTitle: string;
    benefits: string[];
    cancelNote: string;
    plans: {
      id: string;
      name: string;
      priceARS: number;
      priceUSD: number;
      description: string;
      featured: boolean;
    }[];
    paymentUrls: {
      mercadoPago: string;
      international: string;
      internationalProvider: 'paypal' | 'stripe' | 'lemon-squeezy';
    };
  };

  // SHOP
  shop: {
    title: string;
    subtitle: string;
    products: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      price?: number;
      purchaseUrl: string;
      isComingSoon: boolean;
    }[];
  };

  // CONTACTO
  contacto: {
    title: string;
    subtitle: string;
    email: string;
    instagram: string;
  };

  // FOOTER — Redes sociales
  socialLinks: {
    id: string;
    platform: string;
    abbr: string;
    url: string;
    iconUrl?: string;
    visible: boolean;
  }[];

  // MI CUENTA — Campos del perfil de usuario
  userProfileFields: {
    id: string;
    label: string;
    type: 'text' | 'select' | 'month-year';
    required: boolean;
    visible: boolean;
    options?: string[]; // Para tipo 'select'
    placeholder?: string;
  }[];
}

// ============================================================
// DATOS POR DEFECTO
// ============================================================
export const defaultContent: SiteContent = {
  meta: {
    pageTitle: 'sodaroja',
    faviconUrl: '',
    description: 'sodaroja - un podcast que viaja por el mundo contando historias que nadie mas cuenta.',
    analyticsId: '',
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
  },

  sectionNames: {
    inicio: 'Inicio',
    queEsEsto: '¿Qué es esto?',
    equipo: 'El Equipo',
    episodios: 'Episodios',
    frecuenciaInterna: 'Frecuencia Interna',
    shop: 'Shop',
    contacto: 'Contacto',
  },

  hero: {
    title: 'sodaroja',
    subtitle: 'un podcast narrativo',
    description: 'Historias reales de ciudades lejanas.\nCada episodio es un viaje nocturno que no olvidarás.',
    imageUrl: '',
  },

  queEsEsto: {
    title: '¿Qué es sodaroja?',
    description: 'Podcast de investigación narrativa que explora ciudades del mundo a través de historias reales. Cada episodio de 60-80 minutos combina investigación profunda con narrativa cinematográfica y producción sonora envolvente. No es un noticiero ni un documental tradicional: es una experiencia auditiva que te transporta a las calles, los rincones ocultos y los eventos que definieron la identidad de cada lugar.',
    structureTitle: 'Estructura de cada episodio',
    structureSubtitle: '9 momentos que construyen el viaje',
    estructura: [
      { numero: '0', emoji: '🎙️', titulo: 'Apertura Ritual', descripcion: 'No es locución radial ni algo impostado. Es una entrada suave, íntima, como si la charla ya hubiera empezado.', detalles: 'Generamos clima, hacemos sentir al oyente que entra a un espacio seguro y marcamos que comienza el viaje.', destacado: false, color: 'accent' },
      { numero: '1', emoji: '🪟', titulo: 'Ventana Roja', subtitulo: '(Bloque de actualidad)', descripcion: 'Este bloque aparece cuando hay algo que el mundo está atravesando y no se puede ignorar.', detalles: 'Eventos culturales grandes, fenómenos globales, muertes relevantes, hechos históricos. No es noticiero. Es charla con mirada humana.', destacado: true, color: 'red' },
      { numero: '2', emoji: '🌍', titulo: 'Introducción a la Ciudad', descripcion: 'Transición hacia la ciudad elegida. Atmósfera, contexto cultural, sensaciones del lugar.', detalles: 'Es abrir la puerta del viaje. Cómo se siente esa ciudad.', destacado: false, color: 'accent' },
      { numero: '3-5', emoji: '🔺', titulo: 'Prismas', subtitulo: '(Historias de la ciudad)', descripcion: 'Dos o tres historias reales de esa ciudad. Crímenes, personajes ocultos, hechos históricos, mitos urbanos.', detalles: 'Narración con clima, sin morbo. Deben contrastar o complementarse: otra época, otra energía, otra mirada del lugar.', destacado: false, color: 'accent' },
      { numero: '6', emoji: '🕯️', titulo: 'Susurros del Culto', descripcion: 'Recomendaciones: película, serie, libro, disco, lugar, artista.', detalles: 'Siempre algo que encaje con la energía del episodio. Tono íntimo, como pasar un secreto.', destacado: false, color: 'accent' },
      { numero: '7', emoji: '📍', titulo: 'Rastros del Culto', descripcion: 'Fotos que mandó la gente, dónde apareció un sticker, cómo llegó ahí.', detalles: 'Construye el mapa físico del culto.', destacado: false, color: 'accent' },
      { numero: '8', emoji: '📜', titulo: 'Bitácora de Frecuencia Interna', descripcion: 'Lectura de mails y mensajes. La parte más humana.', detalles: 'Qué sintieron, dónde escucharon, qué les pasó, si viajaron. Acá se fortalece la comunidad.', destacado: true, color: 'red' },
      { numero: '9', emoji: '🌙', titulo: 'Cierre Suave', descripcion: 'No es despedida radial. Es sensación de: seguimos acá, esto no termina, el viaje continúa.', detalles: 'Deja al oyente acompañado, no "cerrado".', destacado: false, color: 'accent' },
    ],
    temas: ['Crímenes reales', 'Historia urbana', 'Mitos y leyendas', 'Personajes olvidados', 'Arquitectura secreta', 'Gastronomía local', 'Música y cultura', 'Sucesos inexplicables', 'Arte underground', 'Fenómenos paranormales', 'Subculturas urbanas', 'Tradiciones perdidas'],
  },

  equipo: {
    title: 'El Equipo',
    subtitle: 'Las personas detrás de cada historia',
    favoriteFields: [
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
    ],
    cityFields: [
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
    ],
    members: [
      {
        name: 'Mikasa', role: 'Narradora Principal', birthYear: 1995, cityBorn: 'Buenos Aires', cityCurrent: 'Buenos Aires', zodiac: 'Escorpio',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
        socials: [{ platform: 'Instagram', url: '#', abbr: 'IG' }, { platform: 'Twitter', url: '#', abbr: 'X' }, { platform: 'YouTube', url: '#', abbr: 'YT' }, { platform: 'TikTok', url: '#', abbr: 'TT' }],
        favorites: { iceCream: 'Chocolate amargo', drink: 'Café negro', book: 'Cien años de soledad', movie: 'Blade Runner', series: 'Dark', character: 'Don Draper', celebrity: 'David Bowie', album: 'OK Computer', podcast: 'Serial', sport: 'Natación', food: 'Pizza napolitana', smell: 'Café recién hecho', sound: 'Lluvia', timeOfDay: '3:00 AM', weather: 'Lluvia nocturna', tattoos: 3 },
        cities: { dreamVisit: 'Tokio', wouldntVisit: 'Dubai', wouldLive: 'Berlín', bestFood: 'Roma', wouldPropose: 'París', wouldIsolate: 'Islandia', meetPeople: 'Barcelona', vacation: 'Kioto', allExpensesPaid: 'Nueva York', writeBook: 'Praga', recordEpisode: 'Estambul', nostalgia: 'Lisboa' },
      },
      {
        name: 'Violet', role: 'Co-Narradora', birthYear: 1992, cityBorn: 'Rosario', cityCurrent: 'Barcelona', zodiac: 'Piscis',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
        socials: [{ platform: 'Instagram', url: '#', abbr: 'IG' }, { platform: 'Twitter', url: '#', abbr: 'X' }, { platform: 'YouTube', url: '#', abbr: 'YT' }, { platform: 'TikTok', url: '#', abbr: 'TT' }],
        favorites: { iceCream: 'Limón', drink: 'Té verde', book: 'El principito', movie: 'Your Name', series: 'Stranger Things', character: 'Hermione Granger', celebrity: 'Björk', album: 'The Dark Side of the Moon', podcast: 'Radiolab', sport: 'Yoga', food: 'Sushi', smell: 'Jazmín', sound: 'Viento', timeOfDay: '6:00 AM', weather: 'Niebla matinal', tattoos: 5 },
        cities: { dreamVisit: 'Kioto', wouldntVisit: 'Las Vegas', wouldLive: 'Ámsterdam', bestFood: 'Bangkok', wouldPropose: 'Santorini', wouldIsolate: 'Noruega', meetPeople: 'Lisboa', vacation: 'Bali', allExpensesPaid: 'Tokio', writeBook: 'Edimburgo', recordEpisode: 'Praga', nostalgia: 'París' },
      },
      {
        name: 'Levi', role: 'Editor y Productor', birthYear: 1988, cityBorn: 'Córdoba', cityCurrent: 'Buenos Aires', zodiac: 'Capricornio',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        socials: [{ platform: 'Instagram', url: '#', abbr: 'IG' }, { platform: 'Twitter', url: '#', abbr: 'X' }, { platform: 'YouTube', url: '#', abbr: 'YT' }, { platform: 'TikTok', url: '#', abbr: 'TT' }],
        favorites: { iceCream: 'Dulce de leche', drink: 'Fernet con coca', book: 'Rayuela', movie: 'Inception', series: 'Breaking Bad', character: 'Tyler Durden', celebrity: 'Thom Yorke', album: 'In Rainbows', podcast: '99% Invisible', sport: 'Escalada', food: 'Asado', smell: 'Tierra mojada', sound: 'Tormenta', timeOfDay: '11:00 PM', weather: 'Tormenta eléctrica', tattoos: 0 },
        cities: { dreamVisit: 'Reikiavik', wouldntVisit: 'Mumbai', wouldLive: 'Copenhague', bestFood: 'Ciudad de México', wouldPropose: 'Venecia', wouldIsolate: 'Patagonia', meetPeople: 'Berlín', vacation: 'Noruega', allExpensesPaid: 'Islandia', writeBook: 'San Sebastián', recordEpisode: 'Berlín', nostalgia: 'Montevideo' },
      },
    ],
  },

  episodios: {
    title: 'Episodios',
    subtitle: 'Cada ciudad tiene una historia que merece ser contada',
    items: [
      {
        id: 'ep-001', city: 'París', title: 'Las Catacumbas Olvidadas',
        description: 'Bajo los bulevares iluminados de París existe un mundo de silencio y huesos.',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
        publishDate: '2025-11-15', isPremium: false, lat: 48.8566, lng: 2.3522,
        links: { youtube: '#', spotify: '#', soundcloud: '#' },
        embeds: { spotify: '', soundcloud: '', ivoox: '' },
      },
      {
        id: 'ep-002', city: 'Tokio', title: 'El Último Samurái Digital',
        description: 'En los callejones de Akihabara, la tradición y el futuro colisionan.',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
        publishDate: '2025-12-01', isPremium: true, lat: 35.6762, lng: 139.6503,
        links: { youtube: '#', spotify: '#' },
        embeds: { spotify: '', soundcloud: '' },
      },
      {
        id: 'ep-003', city: 'Buenos Aires', title: 'La Dama de Blanco',
        description: 'La Recoleta guarda secretos que solo se revelan de madrugada.',
        imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80',
        publishDate: '2025-12-20', isPremium: false, lat: -34.6037, lng: -58.3816,
        links: { youtube: '#', spotify: '#', soundcloud: '#', ivoox: '#' },
        embeds: { spotify: '', soundcloud: '', ivoox: '' },
      },
      {
        id: 'ep-004', city: 'Estambul', title: 'El Bazar de las Almas',
        description: 'Entre especias y alfombras, las voces del Gran Bazar cuentan historias milenarias.',
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
        publishDate: '2026-01-10', isPremium: true, lat: 41.0082, lng: 28.9784,
        links: { youtube: '#', spotify: '#' },
        embeds: { spotify: '' },
      },
      {
        id: 'ep-005', city: 'Ciudad de México', title: 'Ecos de Tenochtitlán',
        description: 'La ciudad más grande de América Latina esconde ruinas debajo de cada esquina.',
        imageUrl: 'https://images.unsplash.com/photo-1518659526054-190340b32735?w=600&q=80',
        publishDate: '2026-01-25', isPremium: false, lat: 19.4326, lng: -99.1332,
        links: { youtube: '#', spotify: '#', soundcloud: '#' },
        embeds: { spotify: '', soundcloud: '' },
      },
      {
        id: 'ep-006', city: 'Praga', title: 'El Relojero del Viejo Mundo',
        description: 'En la ciudad de las cien torres, un reloj astronómico guarda un secreto oscuro.',
        imageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80',
        publishDate: '2026-02-05', isPremium: false, lat: 50.0755, lng: 14.4378,
        links: { youtube: '#', spotify: '#' },
        embeds: { spotify: '' },
      },
    ],
  },

  frecuenciaInterna: {
    title: 'Frecuencia Interna',
    subtitle: 'Las historias que se cuentan cuando la noche ya está avanzada',
    introText: 'Sodaroja es un proyecto independiente que hacemos con amor, pero también con tiempo, energía y recursos. Si te gusta lo que hacemos y querés que sigamos explorando ciudades, contando historias y mejorando la producción, tu apoyo marca una diferencia enorme. No es una transacción, es ser parte de algo.',
    benefitsTitle: 'Qué recibís al unirte',
    benefits: [
      '2 episodios extras por mes',
      'Sorteos exclusivos',
      'Historias más profundas y sin editar',
      'Acceso anticipado a cada episodio',
      'Participación en futuros episodios',
      'Número de Socio Efervescente',
      'Comunidad privada',
      'Sin publicidad',
      'RSS privado',
      'Descuentos en la tienda',
      'Nos ayudás a mejorar el equipo',
      'Ser parte real del proyecto',
    ],
    cancelNote: 'Podés cancelar cuando quieras. Sin compromisos, sin letra chica.',
    plans: [
      { id: 'mate', name: 'Mate', priceARS: 2500, priceUSD: 4, description: 'Un empujoncito que suma mucho', featured: false },
      { id: 'soda', name: 'Soda', priceARS: 5000, priceUSD: 8, description: 'El que más eligen', featured: true },
      { id: 'sifon', name: 'Sifón', priceARS: 12500, priceUSD: 20, description: 'Para los que quieren que esto crezca en serio', featured: false },
    ],
    paymentUrls: {
      mercadoPago: '#',
      international: '#',
      internationalProvider: 'paypal',
    },
  },

  shop: {
    title: 'Archivo Interno',
    subtitle: 'Objetos seleccionados del archivo sodaroja',
    products: [
      { id: 'sticker-pack', name: 'Pack de Stickers', description: 'Colección de stickers del culto', imageUrl: '', price: undefined, purchaseUrl: '#', isComingSoon: true },
    ],
  },

  contacto: {
    title: 'Contacto',
    subtitle: '¿Querés proponernos una ciudad, una historia, o simplemente saludar?',
    email: 'hola@sodaroja.com',
    instagram: '@sodaroja',
  },

  socialLinks: [
    { id: 'ig', platform: 'Instagram', abbr: 'IG', url: '#', visible: true },
    { id: 'x', platform: 'Twitter/X', abbr: 'X', url: '#', visible: true },
    { id: 'yt', platform: 'YouTube', abbr: 'YT', url: '#', visible: true },
    { id: 'sp', platform: 'Spotify', abbr: 'SP', url: '#', visible: true },
    { id: 'sc', platform: 'SoundCloud', abbr: 'SC', url: '#', visible: true },
    { id: 'tt', platform: 'TikTok', abbr: 'TT', url: '#', visible: true },
    { id: 'ap', platform: 'Apple Podcasts', abbr: 'AP', url: '#', visible: true },
  ],

  userProfileFields: [
    { id: 'name', label: 'Nombre', type: 'text', required: true, visible: true, placeholder: 'Tu nombre' },
    { id: 'nickname', label: 'Apodo / Cómo te decimos', type: 'text', required: false, visible: true, placeholder: '¿Cómo te gusta que te llamen?' },
    { id: 'email', label: 'Email', type: 'text', required: true, visible: true, placeholder: 'tu@email.com' },
    { id: 'birth', label: 'Mes y año de nacimiento', type: 'month-year', required: false, visible: true },
    { id: 'pronouns', label: 'Pronombres', type: 'select', required: false, visible: true, options: ['Él', 'Ella', 'Elle', 'Prefiero no decir'] },
    { id: 'city', label: 'Ciudad', type: 'text', required: false, visible: true, placeholder: '¿Desde dónde nos escuchás?' },
    { id: 'country', label: 'País', type: 'select', required: false, visible: true, options: [
      '🇦🇫 Afganistán','🇦🇱 Albania','🇩🇿 Argelia','🇦🇩 Andorra','🇦🇴 Angola','🇦🇬 Antigua y Barbuda',
      '🇦🇷 Argentina','🇦🇲 Armenia','🇦🇺 Australia','🇦🇹 Austria','🇦🇿 Azerbaiyán','🇧🇸 Bahamas',
      '🇧🇭 Baréin','🇧🇩 Bangladés','🇧🇧 Barbados','🇧🇾 Bielorrusia','🇧🇪 Bélgica','🇧🇿 Belice',
      '🇧🇯 Benín','🇧🇹 Bután','🇧🇴 Bolivia','🇧🇦 Bosnia y Herzegovina','🇧🇼 Botsuana','🇧🇷 Brasil',
      '🇧🇳 Brunéi','🇧🇬 Bulgaria','🇧🇫 Burkina Faso','🇧🇮 Burundi','🇨🇻 Cabo Verde','🇰🇭 Camboya',
      '🇨🇲 Camerún','🇨🇦 Canadá','🇹🇩 Chad','🇨🇱 Chile','🇨🇳 China','🇨🇴 Colombia',
      '🇰🇲 Comoras','🇨🇬 Congo','🇨🇷 Costa Rica','🇭🇷 Croacia','🇨🇺 Cuba','🇨🇾 Chipre',
      '🇨🇿 Chequia','🇩🇰 Dinamarca','🇩🇯 Yibuti','🇩🇲 Dominica','🇩🇴 Rep. Dominicana',
      '🇪🇨 Ecuador','🇪🇬 Egipto','🇸🇻 El Salvador','🇬🇶 Guinea Ecuatorial','🇪🇷 Eritrea','🇪🇪 Estonia',
      '🇸🇿 Esuatini','🇪🇹 Etiopía','🇫🇯 Fiyi','🇫🇮 Finlandia','🇫🇷 Francia','🇬🇦 Gabón',
      '🇬🇲 Gambia','🇬🇪 Georgia','🇩🇪 Alemania','🇬🇭 Ghana','🇬🇷 Grecia','🇬🇩 Granada',
      '🇬🇹 Guatemala','🇬🇳 Guinea','🇬🇼 Guinea-Bisáu','🇬🇾 Guyana','🇭🇹 Haití','🇭🇳 Honduras',
      '🇭🇺 Hungría','🇮🇸 Islandia','🇮🇳 India','🇮🇩 Indonesia','🇮🇷 Irán','🇮🇶 Irak',
      '🇮🇪 Irlanda','🇮🇱 Israel','🇮🇹 Italia','🇨🇮 Costa de Marfil','🇯🇲 Jamaica','🇯🇵 Japón',
      '🇯🇴 Jordania','🇰🇿 Kazajistán','🇰🇪 Kenia','🇰🇮 Kiribati','🇰🇼 Kuwait','🇰🇬 Kirguistán',
      '🇱🇦 Laos','🇱🇻 Letonia','🇱🇧 Líbano','🇱🇸 Lesoto','🇱🇷 Liberia','🇱🇾 Libia',
      '🇱🇮 Liechtenstein','🇱🇹 Lituania','🇱🇺 Luxemburgo','🇲🇬 Madagascar','🇲🇼 Malaui','🇲🇾 Malasia',
      '🇲🇻 Maldivas','🇲🇱 Malí','🇲🇹 Malta','🇲🇭 Islas Marshall','🇲🇷 Mauritania','🇲🇺 Mauricio',
      '🇲🇽 México','🇫🇲 Micronesia','🇲🇩 Moldavia','🇲🇨 Mónaco','🇲🇳 Mongolia','🇲🇪 Montenegro',
      '🇲🇦 Marruecos','🇲🇿 Mozambique','🇲🇲 Myanmar','🇳🇦 Namibia','🇳🇷 Nauru','🇳🇵 Nepal',
      '🇳🇱 Países Bajos','🇳🇿 Nueva Zelanda','🇳🇮 Nicaragua','🇳🇪 Níger','🇳🇬 Nigeria',
      '🇰🇵 Corea del Norte','🇲🇰 Macedonia del Norte','🇳🇴 Noruega','🇴🇲 Omán','🇵🇰 Pakistán',
      '🇵🇼 Palaos','🇵🇸 Palestina','🇵🇦 Panamá','🇵🇬 Papúa Nueva Guinea','🇵🇾 Paraguay','🇵🇪 Perú',
      '🇵🇭 Filipinas','🇵🇱 Polonia','🇵🇹 Portugal','🇵🇷 Puerto Rico','🇶🇦 Catar','🇷🇴 Rumanía',
      '🇷🇺 Rusia','🇷🇼 Ruanda','🇰🇳 San Cristóbal y Nieves','🇱🇨 Santa Lucía',
      '🇻🇨 San Vicente y las Granadinas','🇼🇸 Samoa','🇸🇲 San Marino','🇸🇹 Santo Tomé y Príncipe',
      '🇸🇦 Arabia Saudita','🇸🇳 Senegal','🇷🇸 Serbia','🇸🇨 Seychelles','🇸🇱 Sierra Leona',
      '🇸🇬 Singapur','🇸🇰 Eslovaquia','🇸🇮 Eslovenia','🇸🇧 Islas Salomón','🇸🇴 Somalia',
      '🇿🇦 Sudáfrica','🇰🇷 Corea del Sur','🇸🇸 Sudán del Sur','🇪🇸 España','🇱🇰 Sri Lanka',
      '🇸🇩 Sudán','🇸🇷 Surinam','🇸🇪 Suecia','🇨🇭 Suiza','🇸🇾 Siria','🇹🇼 Taiwán',
      '🇹🇯 Tayikistán','🇹🇿 Tanzania','🇹🇭 Tailandia','🇹🇱 Timor Oriental','🇹🇬 Togo',
      '🇹🇴 Tonga','🇹🇹 Trinidad y Tobago','🇹🇳 Túnez','🇹🇷 Turquía','🇹🇲 Turkmenistán',
      '🇹🇻 Tuvalu','🇺🇬 Uganda','🇺🇦 Ucrania','🇦🇪 Emiratos Árabes','🇬🇧 Reino Unido',
      '🇺🇸 Estados Unidos','🇺🇾 Uruguay','🇺🇿 Uzbekistán','🇻🇺 Vanuatu','🇻🇦 Vaticano',
      '🇻🇪 Venezuela','🇻🇳 Vietnam','🇾🇪 Yemen','🇿🇲 Zambia','🇿🇼 Zimbabue',
      '🌍 Otro'
    ] },
    { id: 'howFoundUs', label: '¿Cómo nos encontraste?', type: 'select', required: false, visible: true, options: ['Instagram', 'YouTube', 'Un amigo/a', 'Spotify', 'Google', 'TikTok', 'Otro'] },
  ],
};

// ============================================================
// FUNCIONES HELPER
// ============================================================
export const getContent = (): SiteContent => {
  try {
    const stored = localStorage.getItem('sodaroja-content');
    if (stored) {
      return { ...defaultContent, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Error loading content from localStorage');
  }
  return defaultContent;
};

export const saveContent = (content: SiteContent): void => {
  try {
    localStorage.setItem('sodaroja-content', JSON.stringify(content));
  } catch (e) {
    console.warn('Error saving content to localStorage');
  }
};
