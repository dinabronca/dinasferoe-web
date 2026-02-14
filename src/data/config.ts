/// <reference types="vite/client" />
// ============================================================
// CONFIGURACION PARA PRODUCCION
// ============================================================
// Este archivo centraliza las configuraciones que en produccion
// se mueven a variables de entorno (.env)
//
// PROXIMOS PASOS:
// 1. Crear proyecto en Supabase (supabase.com)
// 2. Configurar Auth (email + password)
// 3. Crear tablas: users, content, subscriptions, episodes
// 4. Configurar Mercado Pago SDK para Argentina
// 5. Configurar Stripe/PayPal para pagos internacionales
// 6. Mover todo el contenido de localStorage a Supabase
// 7. Configurar webhooks de pago para activar suscripciones
// ============================================================

export const config = {
  // Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',

  // Pagos Argentina
  mercadoPagoPublicKey: import.meta.env.VITE_MP_PUBLIC_KEY || '',

  // Pagos Internacional
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',

  // Admin
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || 'sodaroja2026',

  // Email (para formulario de contacto)
  contactEmailService: import.meta.env.VITE_EMAIL_SERVICE || 'mailto',
  // Opciones: 'mailto' (actual), 'emailjs', 'resend', 'sendgrid'
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',

  // Feature flags
  useLocalStorage: true, // false cuando se migre a Supabase
  demoMode: true, // false en produccion
};

// Estado actual del sistema
export const systemStatus = {
  auth: 'localStorage',      // -> 'supabase'
  content: 'localStorage',   // -> 'supabase'
  payments: 'external-link',  // -> 'mercadopago-api + stripe'
  email: 'mailto',           // -> 'emailjs' o 'resend'
  images: 'external-url',    // -> 'supabase-storage' o 'cloudinary'
  analytics: 'gtag-script',  // ya funciona
};
