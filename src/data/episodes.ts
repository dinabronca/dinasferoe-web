// Episodios de demo con embeds reales de podcasts famosos para testing
// Ordenados por fecha descendente (más reciente primero)

interface DemoEpisode {
  id: string;
  city: string;
  title: string;
  description: string;
  imageUrl: string;
  isPremium: boolean;
  lat: number;
  lng: number;
  publishDate: string;
  links: Record<string, string>;
  embeds: Record<string, string>;
}

export const demoEpisodes: DemoEpisode[] = [
  {
    id: '6',
    city: 'NUEVA YORK',
    title: 'El Fantasma del Metro',
    description: 'Línea 6, estación City Hall. Clausurada en 1945. Pero algunos conductores juran que alguien sigue esperando allí.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    isPremium: false,
    lat: 40.7128,
    lng: -74.0060,
    publishDate: '2026-02-05',
    links: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', spotify: 'https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk' },
    embeds: {
      spotify: 'https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator&theme=0',
    },
  },
  {
    id: '5',
    city: 'PRAGA',
    title: 'El Reloj que Predijo la Guerra',
    description: 'En la plaza más antigua de Europa, un reloj astronómico medieval guarda una profecía que nadie quiso escuchar.',
    imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',
    isPremium: true,
    lat: 50.0875,
    lng: 14.4214,
    publishDate: '2026-01-25',
    links: {},
    embeds: {},
  },
  {
    id: '4',
    city: 'ESTAMBUL',
    title: 'Los Tesoros Hundidos del Bósforo',
    description: 'Tres imperios. Mil naufragios. Un buzo que encontró algo que no debía encontrar.',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    isPremium: false,
    lat: 41.0082,
    lng: 28.9784,
    publishDate: '2026-01-10',
    links: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', spotify: 'https://open.spotify.com/episode/3Qm86XLflmIXVm1wd7iAGE' },
    embeds: {
      spotify: 'https://open.spotify.com/embed/episode/3Qm86XLflmIXVm1wd7iAGE?utm_source=generator&theme=0',
      soundcloud: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/291&color=%23c45555&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
    },
  },
  {
    id: '3',
    city: 'BUENOS AIRES',
    title: 'La Dama de Blanco',
    description: 'Cada noche de tormenta, una figura cruza el Cementerio de la Recoleta. Los que la siguieron... nunca contaron la historia completa.',
    imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&q=80',
    isPremium: false,
    lat: -34.6037,
    lng: -58.3816,
    publishDate: '2025-12-20',
    links: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    embeds: {
      spotify: 'https://open.spotify.com/embed/episode/5VKBVQoB2sBkE43qRx3Svb?utm_source=generator&theme=0',
    },
  },
  {
    id: '2',
    city: 'TOKIO',
    title: 'El Último Samurái Digital',
    description: 'En los callejones de Akihabara, un hombre programa códigos que nadie puede descifrar. Su identidad: un misterio de 20 años.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    isPremium: true,
    lat: 35.6762,
    lng: 139.6503,
    publishDate: '2025-12-01',
    links: {},
    embeds: {},
  },
  {
    id: '1',
    city: 'PARÍS',
    title: 'Las Catacumbas Olvidadas',
    description: 'Bajo las calles más elegantes del mundo, seis millones de esqueletos guardan secretos que nadie quiere recordar.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    isPremium: false,
    lat: 48.8566,
    lng: 2.3522,
    publishDate: '2025-11-15',
    links: { youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', spotify: 'https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk' },
    embeds: {
      spotify: 'https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator&theme=0',
      soundcloud: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/291&color=%23c45555&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
    },
  },
];
