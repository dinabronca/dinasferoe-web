# 🚀 INICIO RÁPIDO - SODAROJA

## ⚡ 5 Minutos para ver el sitio funcionando

### 1. Descargar el proyecto
Ya tenés toda la carpeta `sodaroja/` lista para usar.

### 2. Instalar Node.js (si no lo tenés)
Descargar de: https://nodejs.org/ (versión LTS recomendada)

### 3. Abrir terminal en la carpeta del proyecto
```bash
cd sodaroja
```

### 4. Instalar dependencias
```bash
npm install
```
*Esto tarda 2-3 minutos la primera vez*

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 6. Abrir en el navegador
Ir a: http://localhost:5173

**¡LISTO! Ya deberías ver SODAROJA funcionando** 🎉

---

## 🎨 Primeras Modificaciones

### Cambiar el contenido de los episodios

**Archivo:** `src/App.tsx`

Buscar `mockEpisodes` (línea ~20) y modificar:

```typescript
const mockEpisodes = [
  {
    id: '1',
    city: 'TU_CIUDAD',           // ← Cambiar
    title: 'Tu Título',          // ← Cambiar
    description: 'Tu descripción...', // ← Cambiar
    imageUrl: 'URL_DE_IMAGEN',   // ← Cambiar
    isPremium: false,
    lat: -34.6037,               // ← Coordenadas
    lng: -58.3816,
    spotifyUrl: '#',
    soundcloudUrl: '#',
  },
  // Agregar más episodios copiando este bloque
];
```

### Cambiar colores principales

**Archivo:** `tailwind.config.js`

```javascript
colors: {
  'soda': {
    'night': '#0a0e1a',    // ← Fondo oscuro principal
    'lamp': '#d4c5b0',      // ← Color del texto
    'red': '#8b3a3a',       // ← Color de acento
  },
}
```

### Desactivar efectos que no te gustan

**Archivo:** `src/App.tsx`

Comentar cualquier línea que no quieras:

```tsx
{/* <FloatingParticles count={40} /> */}  // ← Partículas desactivadas
{/* <Bokeh count={12} /> */}              // ← Bokeh desactivado
```

---

## 📝 Agregar tu primer episodio REAL

1. Preparar:
   - Título del episodio
   - Descripción (max 2-3 líneas)
   - Ciudad
   - Coordenadas (buscar en Google Maps)
   - Imagen (recomendado: 800x600px, formato JPG)
   - URL de Spotify/SoundCloud

2. Subir imagen a algún servicio:
   - Imgur: https://imgur.com
   - Cloudinary: https://cloudinary.com
   - O usar Unsplash como placeholder

3. Agregar en `mockEpisodes`:
```typescript
{
  id: '5',  // Número único
  city: 'MONTEVIDEO',
  title: 'El Fantasma del Teatro Solís',
  description: 'Una actriz desapareció hace 90 años. Sus zapatos siguen apareciendo en los camerinos.',
  imageUrl: 'https://imgur.com/tu-imagen.jpg',
  isPremium: false,  // true para bloquearlo
  lat: -34.9059,
  lng: -56.2002,
  spotifyUrl: 'https://open.spotify.com/episode/...',
  soundcloudUrl: 'https://soundcloud.com/...',
}
```

4. Guardar y ver los cambios instantáneamente

---

## 🌐 Subir a Internet (Vercel)

### Opción más fácil: Deploy desde GitHub

1. **Subir a GitHub:**
   - Crear cuenta en https://github.com
   - Crear nuevo repositorio
   - Subir la carpeta `sodaroja/`

2. **Conectar con Vercel:**
   - Ir a https://vercel.com
   - Registrarse (gratis)
   - Click en "Import Project"
   - Seleccionar tu repositorio de GitHub
   - Click en "Deploy"

**¡En 2 minutos tu sitio está online!** 🚀

### Tu sitio estará en:
`https://sodaroja-tu-nombre.vercel.app`

---

## 🔑 Agregar API Keys (después)

### Clima en Tiempo Real (OpenWeather)

1. Registrarse gratis en: https://openweathermap.org/api
2. Copiar tu API Key
3. Crear archivo `.env` en la raíz:
```
VITE_WEATHER_API_KEY=tu_api_key_aqui
```
4. Reiniciar el servidor (`npm run dev`)

### Google Maps

1. Ir a: https://console.cloud.google.com/
2. Crear proyecto nuevo
3. Habilitar "Maps JavaScript API"
4. Crear credencial
5. Agregar a `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

---

## 🆘 Problemas Comunes

### "npm not found"
**Solución:** Instalar Node.js desde https://nodejs.org/

### "Port 5173 is already in use"
**Solución:** Cerrar otras ventanas de terminal que tengan el servidor corriendo

### Los efectos van muy lentos
**Solución:** Reducir cantidad de partículas:
```tsx
<FloatingParticles count={15} />  // En vez de 40
<Bokeh count={6} />               // En vez de 12
```

### No se ven las imágenes
**Solución:** Verificar que las URLs sean públicas (Unsplash, Imgur, etc)

### Los cambios no se reflejan
**Solución:** 
1. Guardar el archivo
2. El navegador se recarga automáticamente
3. Si no, hacer F5 o Ctrl+R

---

## 📚 Archivos Importantes

```
sodaroja/
├── src/
│   ├── App.tsx              ← AQUÍ editar contenido principal
│   ├── components/
│   │   ├── Hero.tsx         ← Logo y título principal
│   │   ├── Navbar.tsx       ← Menú de navegación
│   │   └── EpisodeCard.tsx  ← Tarjetas de episodios
│   ├── effects/             ← Todos los efectos visuales
│   └── styles/
│       └── globals.css      ← Estilos globales
├── tailwind.config.js       ← AQUÍ cambiar colores
└── package.json             ← Configuración del proyecto
```

---

## 🎯 Próximos Pasos

1. ✅ Ver el sitio funcionando localmente
2. ✅ Cambiar contenido de ejemplo
3. ✅ Subir a Vercel
4. ⏳ Agregar API Keys
5. ⏳ Crear backend (ver GUIA_IMPLEMENTACION.md)
6. ⏳ Configurar Mercado Pago
7. ⏳ Agregar más páginas

---

## 💡 Tips

- **Auto-guardado:** Los cambios se ven instantáneamente
- **Hot Reload:** No hace falta recargar la página
- **Inspeccionar:** Click derecho → Inspeccionar para ver código
- **Consola:** Ver errores en la consola del navegador (F12)

---

## 📞 ¿Atascado?

1. Revisar la consola del navegador (F12)
2. Leer `GUIA_EFECTOS.md` para customizar efectos
3. Leer `GUIA_IMPLEMENTACION.md` para próximas fases
4. Buscar el error en Google
5. Preguntar en comunidades:
   - Stack Overflow
   - Reddit r/webdev
   - Discord de React

---

**¡Éxitos con SODAROJA! 🎙️✨**

*Cualquier duda, revisá los otros archivos de documentación.*
