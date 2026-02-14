# 🚀 SODAROJA — Checklist para Producción

## 🔴 CRÍTICO (sin esto no puede salir)

### 1. Backend / Base de datos
- [ ] **Crear proyecto en Supabase** (supabase.com)
  - Copiar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` al `.env`
  - Ejecutar el SQL de `src/data/supabase.ts` en el SQL Editor
  - Esto reemplaza localStorage por una base de datos real
- [ ] **Activar Supabase Auth** — para que los usuarios se registren/logueen de verdad
  - Ahora el login es falso (localStorage). Hay que conectar con Supabase Auth
  - Descomentar el código en `src/data/supabase.ts`
- [ ] **Migrar contenido de localStorage a Supabase** — que el admin panel guarde en la DB, no en el browser del admin
  - Cambiar `useLocalStorage: false` en `config.ts`

### 2. Pagos
- [ ] **Mercado Pago** — crear app en mercadopago.com.ar/developers
  - Configurar Access Token en el backend
  - Implementar endpoint `/api/create-preference` (ver `src/data/payments.ts`)
  - Implementar webhook `/api/mp-webhook` que active la suscripción cuando el pago se aprueba
  - Necesitás un backend (Vercel serverless functions, Railway, o similar)
- [ ] **Stripe** (opcional, para pagos internacionales) — misma lógica, ver `payments.ts`

### 3. Formulario de contacto
- [ ] **Crear cuenta en EmailJS** (emailjs.com, plan gratuito = 200 emails/mes)
  - Crear un servicio (Gmail o similar)
  - Crear un template con variables: `from_name`, `from_email`, `subject`, `message`
  - Copiar Service ID, Template ID, Public Key en Admin > General > EmailJS
  - Sin esto, el formulario abre el cliente de mail del usuario (mailto)

### 4. Dominio y hosting
- [ ] **Comprar dominio** (sodaroja.com o similar)
- [ ] **Conectar dominio a Vercel** (Settings > Domains)
- [ ] **SSL** — Vercel lo da automáticamente con el dominio

### 5. Imágenes
- [ ] **Subir imagen del Hero** — desde Admin > Inicio > URL Imagen Hero
  - Recomendado: 1200×800px o similar, formato WebP/JPG, max 500KB
  - Idealmente hostear en Supabase Storage o Cloudinary
- [ ] **Fotos del equipo** — reemplazar las placeholder por fotos reales
  - 600×800px mínimo (ratio 3:4), formato WebP/JPG
- [ ] **Imágenes de episodios** — reemplazar las de Unsplash por propias o con derechos
  - 800×600px mínimo, formato WebP/JPG

---

## 🟡 IMPORTANTE (puede salir sin esto, pero mejora mucho)

### 6. SEO
- [ ] **Favicon** — subir tu icono (32×32 .ico o .png) y poner la URL en Admin > General
- [ ] **Meta description** — editar en Admin > General > Descripción SEO
- [ ] **Open Graph image** — necesitás una imagen de 1200×630px para que se vea bien cuando compartan en redes
- [ ] **Google Search Console** — verificar el dominio y subir sitemap
- [ ] **Sitemap.xml** — generar uno automático (hay plugins de Vite para esto)

### 7. Analytics
- [ ] **Google Analytics** — crear propiedad GA4, copiar ID (G-XXXXXXX) en Admin > General

### 8. Contenido
- [ ] **Revisar todos los textos** — ¿Qué es esto?, descripciones, etc.
- [ ] **Completar los datos del equipo** — favoritos, ciudades, redes sociales reales
- [ ] **Subir al menos 3-5 episodios reales** con embeds de Spotify/SoundCloud/YouTube
- [ ] **Verificar que los links de redes sociales** estén bien en Admin > General > Redes

### 9. Legal
- [ ] **Términos y condiciones** — necesarios si cobrás suscripciones
- [ ] **Política de privacidad** — obligatorio por ley si recopilás datos personales
- [ ] **Aviso de cookies** — si usás Google Analytics (no es obligatorio en AR pero sí en EU)

---

## 🟢 NICE TO HAVE (mejoras futuras)

### 10. Performance
- [ ] **Optimizar imágenes** — convertir todo a WebP, usar un CDN (Cloudinary, imgix)
- [ ] **Preload de fuentes** — evitar flash de texto sin estilo
- [ ] **Service Worker** — para que cargue offline y sea PWA

### 11. Funcionalidades extra
- [ ] **Notificaciones por email** — avisar a suscriptores cuando hay episodio nuevo
- [ ] **Comentarios en episodios** — los suscriptores pueden dejar comentarios
- [ ] **Mapa interactivo** — con todas las ciudades visitadas, clickeable
- [ ] **Estadísticas en admin** — visitas, suscriptores, episodios más escuchados
- [ ] **Blog/Notas de viaje** — sección de texto largo asociada a cada episodio
- [ ] **Multi-idioma** — inglés/español

### 12. Seguridad (producción)
- [ ] **Proteger ruta /admin** — solo accesible con usuario admin real (ahora cualquiera puede entrar)
- [ ] **Rate limiting** — en los endpoints de API para evitar spam
- [ ] **Validación server-side** — no confiar solo en la validación del frontend
- [ ] **Variables de entorno en Vercel** — no commitear el `.env` real

---

## ⏱️ Estimación de tiempos

| Tarea | Tiempo estimado |
|-------|----------------|
| Supabase setup + auth | 2-3 horas |
| Mercado Pago integración | 3-4 horas |
| EmailJS | 30 minutos |
| Dominio + DNS | 30 minutos |
| Contenido real (fotos, textos, episodios) | 4-6 horas |
| SEO básico | 1 hora |
| Legal (términos, privacidad) | 2 horas |
| Testing final (mobile, desktop, pagos) | 2-3 horas |
| **TOTAL ESTIMADO** | **15-20 horas** |

---

*Generado el 8 de febrero de 2026 — sodaroja v14*
