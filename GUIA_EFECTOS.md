# 🎨 GUÍA DE EFECTOS VISUALES - SODAROJA

## 📋 EFECTOS ACTUALMENTE IMPLEMENTADOS

### 1. EFECTOS DE FONDO PERMANENTES

#### Grano de Película (Film Grain)
**Ubicación:** `src/styles/globals.css` - clase `.film-grain`
**Qué hace:** Textura analógica que simula película vintage
**Intensidad actual:** 8% de opacidad
**Cómo ajustar:**
```css
.film-grain {
  opacity: 0.08; /* Cambiar este valor: 0 = sin efecto, 0.15 = muy visible */
}
```

#### Vignette (Oscurecimiento de Bordes)
**Ubicación:** `src/styles/globals.css` - clase `.vignette`
**Qué hace:** Oscurece los bordes de la pantalla
**Cómo ajustar:**
```css
.vignette {
  background: radial-gradient(
    ellipse at center, 
    transparent 0%, 
    transparent 40%,        /* Punto donde empieza */
    rgba(10, 14, 26, 0.4) 80%,  /* Intensidad media */
    rgba(10, 14, 26, 0.8) 100%  /* Intensidad bordes */
  );
}
```

#### Scanlines (Líneas de Monitor CRT)
**Ubicación:** `src/styles/globals.css` - clase `.scanlines`
**Qué hace:** Líneas horizontales sutiles
**Intensidad actual:** 40% de opacidad
**Cómo ajustar:**
```css
.scanlines {
  opacity: 0.4; /* 0 = sin efecto, 0.8 = muy visible */
  background-size: 100% 4px; /* Cambiar 4px para líneas más gruesas */
}
```

### 2. CURSOR PERSONALIZADO

**Ubicación:** `src/effects/CustomCursor.tsx`
**Qué hace:** Cursor circular que cambia al hacer hover
**Cómo desactivar:**
En `src/styles/globals.css` comentar:
```css
/* * {
  cursor: none !important;
} */
```

**Cómo cambiar tamaño:**
```css
#custom-cursor {
  width: 20px;  /* Tamaño normal */
  height: 20px;
}

#custom-cursor.hover {
  width: 40px;  /* Tamaño al hacer hover */
  height: 40px;
}
```

### 3. PARTÍCULAS FLOTANTES

**Ubicación:** `src/effects/FloatingParticles.tsx`
**Qué hace:** Puntos luminosos que flotan lentamente
**Cantidad actual:** 40 partículas
**Cómo ajustar:**

En `src/App.tsx`:
```tsx
<FloatingParticles count={40} /> 
// Cambiar count: 20 = pocas, 60 = muchas
```

**Desactivar completamente:**
Comentar la línea en `App.tsx`:
```tsx
{/* <FloatingParticles count={40} /> */}
```

### 4. BOKEH (LUCES URBANAS DESENFOCADAS)

**Ubicación:** `src/effects/Bokeh.tsx`
**Qué hace:** Círculos de luz difusa en el fondo
**Cantidad actual:** 12 luces
**Cómo ajustar:**

En `src/App.tsx`:
```tsx
<Bokeh count={12} />
// count: 5 = sutíl, 20 = intenso
```

**Cambiar colores:**
En `src/effects/Bokeh.tsx` modificar array de colores:
```typescript
const colors = [
  'rgba(212, 197, 176, 0.4)',  // Beige cálido
  'rgba(232, 220, 200, 0.3)',  // Blanco gastado
  'rgba(107, 122, 158, 0.3)',  // Azul grisáceo
  'rgba(139, 58, 58, 0.2)',    // Rojo apagado
];
```

### 5. EFECTOS CLIMÁTICOS DINÁMICOS

#### Lluvia
**Ubicación:** `src/effects/Rain.tsx`
**Cuándo aparece:** Cuando el clima de una ciudad es lluvioso
**Intensidades:** `light`, `medium`, `heavy`

**Cómo cambiar intensidad:**
En `src/components/EpisodeCard.tsx`:
```tsx
<Rain active={true} intensity="heavy" />
// light = 50 gotas
// medium = 100 gotas
// heavy = 150 gotas
```

#### Estrellas
**Ubicación:** `src/effects/Stars.tsx`
**Cuándo aparece:** Cuando hay cielo despejado nocturno
**Cantidad actual:** 100 estrellas

**Ajustar:**
```tsx
<Stars active={true} count={200} />
// Más estrellas = más visible
```

#### Neblina
**Ubicación:** `src/effects/Mist.tsx`
**Cuándo aparece:** Cuando hay clima nublado
**Intensidades:** `light`, `medium`, `heavy`

### 6. ANIMACIONES DE FRAMER MOTION

#### Fade In (Aparición gradual)
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
>
```

**Ajustar velocidad:**
- `duration: 0.5` = rápido
- `duration: 1.2` = normal
- `duration: 2.0` = lento

#### Fade In Up (Aparición desde abajo)
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

**Ajustar distancia:**
- `y: 20` = movimiento corto
- `y: 50` = movimiento medio
- `y: 100` = movimiento largo

### 7. EFECTOS EN CARDS DE EPISODIOS

#### Hover Effect (Elevación al pasar mouse)
**Ubicación:** `src/styles/globals.css` - clase `.card-hover`
```css
.card-hover:hover {
  transform: translateY(-8px); /* Qué tanto se eleva */
  box-shadow: 0 20px 60px rgba(212, 197, 176, 0.15);
}
```

#### Overlay Oscuro en Imágenes
**Ubicación:** `src/styles/globals.css` - clase `.image-overlay`
```css
.image-overlay::after {
  background: linear-gradient(
    to bottom,
    rgba(10, 14, 26, 0.3) 0%,  /* Opacidad arriba */
    rgba(10, 14, 26, 0.7) 100% /* Opacidad abajo */
  );
}
```

### 8. EFECTO GLITCH (CONTENIDO PREMIUM)

**Ubicación:** `src/styles/globals.css` - clase `.glitch`
**Qué hace:** Efecto de interferencia en texto
**Cómo desactivar:**
Comentar las animaciones en episodios premium

**Ajustar intensidad:**
```css
.glitch::before {
  left: 2px;              /* Cambiar desplazamiento */
  text-shadow: -2px 0 #ff00de;  /* Intensidad del efecto */
}
```

### 9. RUIDO ESTÁTICO (TV NOISE)

**Ubicación:** `src/styles/globals.css` - clase `.static-noise`
**Qué hace:** Interferencia de TV en contenido bloqueado
**Intensidad actual:** 8% de opacidad

**Ajustar:**
```css
.static-noise {
  opacity: 0.08;  /* 0 = sin ruido, 0.2 = muy visible */
}
```

### 10. BOTONES CON RESPLANDOR

**Ubicación:** `src/styles/globals.css` - clase `.glow-button`
**Qué hace:** Efecto de onda al hacer hover

**Desactivar:**
```css
/* Comentar todo el bloque .glow-button */
```

## 🎛️ CONTROL GLOBAL DE EFECTOS

### Desactivar TODOS los efectos visuales

En `src/App.tsx`, comentar estos componentes:
```tsx
function App() {
  return (
    <div className="relative min-h-screen bg-soda-night">
      {/* COMENTAR ESTAS LÍNEAS PARA DESACTIVAR EFECTOS */}
      {/* <div className="film-grain" /> */}
      {/* <div className="vignette" /> */}
      {/* <div className="scanlines" /> */}
      {/* <CustomCursor /> */}
      {/* <FloatingParticles count={40} /> */}
      {/* <Bokeh count={12} /> */}
      
      {/* Dejar solo el contenido */}
      <Navbar />
      <Hero />
      {/* ... resto del contenido ... */}
    </div>
  );
}
```

### Crear Modo "Performance" (menos efectos)

Agregar en `src/App.tsx`:
```tsx
const PERFORMANCE_MODE = false; // Cambiar a true para modo performance

function App() {
  return (
    <div className="relative min-h-screen bg-soda-night">
      {/* Efectos solo si NO está en modo performance */}
      {!PERFORMANCE_MODE && (
        <>
          <div className="film-grain" />
          <div className="vignette" />
          <CustomCursor />
          <FloatingParticles count={20} />
        </>
      )}
      
      {/* Contenido siempre visible */}
      <Navbar />
      <Hero />
    </div>
  );
}
```

## 🔧 CONFIGURACIÓN RECOMENDADA POR DISPOSITIVO

### Desktop Potente
- Todos los efectos activos
- Partículas: 40-60
- Bokeh: 12-20
- Calidad alta en texturas

### Desktop Normal
- Todos los efectos activos
- Partículas: 30
- Bokeh: 10
- Calidad media

### Mobile
- Desactivar: Bokeh, Partículas flotantes
- Mantener: Grano, Vignette, Efectos climáticos
- Reducir animaciones

**Implementar detección:**
```tsx
const isMobile = window.innerWidth < 768;

{!isMobile && <Bokeh count={12} />}
{!isMobile && <FloatingParticles count={40} />}
```

## 🎨 PERSONALIZACIÓN DE COLORES

### Cambiar Paleta Completa

En `tailwind.config.js`:
```javascript
colors: {
  'soda': {
    'night': '#0a0e1a',    // Fondo principal
    'deep': '#141824',      // Fondo secundario
    'lamp': '#d4c5b0',      // Texto principal
    'red': '#8b3a3a',       // Acento rojo
    'accent': '#6b7a9e',    // Acento azul
  },
}
```

### Hacer el Sitio Más Claro
```javascript
colors: {
  'soda': {
    'night': '#1a1e2a',    // Menos oscuro
    'lamp': '#ffffff',      // Texto más claro
  },
}
```

### Hacer el Sitio Más Oscuro
```javascript
colors: {
  'soda': {
    'night': '#000000',    // Negro puro
    'lamp': '#a0a0a0',      // Texto más tenue
  },
}
```

## 🚀 OPTIMIZACIÓN DE PERFORMANCE

### Si el sitio va lento:

1. **Reducir partículas:**
```tsx
<FloatingParticles count={15} />  // En vez de 40
<Bokeh count={6} />               // En vez de 12
```

2. **Simplificar animaciones:**
En `tailwind.config.js` reducir duración:
```javascript
animation: {
  'float': 'float 4s ease-in-out infinite', // Era 6s
}
```

3. **Desactivar efectos pesados en mobile:**
```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

{!isMobile && <HeavyEffect />}
```

4. **Lazy loading de imágenes:**
```tsx
<img loading="lazy" src={imageUrl} />
```

## 📱 EFECTOS ESPECÍFICOS PARA MOBILE

Crear archivo `src/utils/deviceDetection.ts`:
```typescript
export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const isLowEndDevice = () => {
  return navigator.hardwareConcurrency < 4;
};
```

Usar en `App.tsx`:
```tsx
import { isMobile, isLowEndDevice } from './utils/deviceDetection';

const showHeavyEffects = !isMobile() && !isLowEndDevice();

{showHeavyEffects && <Bokeh count={12} />}
```

## 🎯 EFECTOS RECOMENDADOS MANTENER

**Siempre:**
- Grano de película (muy sutil)
- Vignette
- Transiciones suaves

**Desktop:**
- Cursor personalizado
- Partículas flotantes
- Bokeh
- Todos los efectos climáticos

**Mobile:**
- Solo efectos climáticos (lluvia, estrellas)
- Animaciones reducidas
- Sin partículas pesadas

---

**¿Querés sacar algún efecto específico?** Decime cuál y te digo exactamente dónde comentarlo.
