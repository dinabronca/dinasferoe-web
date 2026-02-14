# 🎙️ SODAROJA - Sitio Web Oficial

Sitio web del podcast narrativo argentino SODAROJA.

## 🌌 Características

- **Efectos atmosféricos avanzados**: lluvia, estrellas, neblina, partículas flotantes
- **Clima en tiempo real**: cada episodio muestra el clima actual de su ciudad
- **Diseño cinematográfico**: transiciones suaves, animaciones elegantes
- **Sistema premium**: "Frecuencia Interna" para contenido exclusivo
- **Responsive**: optimizado para desktop y mobile
- **Texturas analógicas**: grano de película, scanlines, vignette

## 🚀 Instalación Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📦 Deploy en Vercel

1. Subir el proyecto a GitHub
2. Ir a [vercel.com](https://vercel.com)
3. Importar el repositorio
4. Vercel detectará automáticamente Vite
5. Deploy

## 🔑 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# API de Clima (OpenWeather)
VITE_WEATHER_API_KEY=tu_api_key_aqui

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

# Mercado Pago (para sistema premium)
VITE_MERCADO_PAGO_PUBLIC_KEY=tu_public_key_aqui
```

## 🗂️ Estructura del Proyecto

```
sodaroja/
├── src/
│   ├── components/       # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── EpisodeCard.tsx
│   ├── effects/          # Efectos visuales
│   │   ├── CustomCursor.tsx
│   │   ├── Rain.tsx
│   │   ├── Stars.tsx
│   │   ├── Mist.tsx
│   │   ├── FloatingParticles.tsx
│   │   └── Bokeh.tsx
│   ├── styles/           # Estilos globales
│   │   └── globals.css
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Entry point
├── public/               # Archivos estáticos
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Paleta de Colores

- `soda-night`: #0a0e1a (negro azulado profundo)
- `soda-deep`: #141824 (gris azulado oscuro)
- `soda-slate`: #1e2433 (gris medio)
- `soda-mist`: #2a3142 (gris más claro)
- `soda-lamp`: #d4c5b0 (beige cálido tenue)
- `soda-warm`: #e8dcc8 (blanco gastado)
- `soda-glow`: #fef8ed (luz de velador)
- `soda-red`: #8b3a3a (rojo apagado - solo detalles)
- `soda-accent`: #6b7a9e (azul grisáceo)

## 🔮 Próximas Funcionalidades

- [ ] Backend con Node.js + Express
- [ ] Sistema de autenticación (JWT)
- [ ] Integración con Mercado Pago
- [ ] Panel de administración
- [ ] RSS feed privado para miembros premium
- [ ] Mapas interactivos con puntos de historia
- [ ] Sistema de comentarios/comunidad
- [ ] Newsletter
- [ ] Tienda de objetos

## 📝 Notas

- El sitio está optimizado para experiencia nocturna
- Los efectos se ajustan automáticamente según el clima de cada ciudad
- El cursor personalizado mejora la inmersión
- Las animaciones usan Framer Motion para rendimiento óptimo

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Framer Motion** (animaciones)
- **Lucide React** (íconos)
- **Three.js** (efectos 3D - opcional)

## 📱 Contacto

Para consultas sobre el proyecto: [tu@email.com]

---

**SODAROJA** © 2026 — Un proyecto independiente argentino
