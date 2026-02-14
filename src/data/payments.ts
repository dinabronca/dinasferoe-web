/// <reference types="vite/client" />
// ============================================================
// MERCADO PAGO — Integración de pagos para Argentina
// ============================================================
// Para activar:
// 1. Crear cuenta en mercadopago.com.ar/developers
// 2. Obtener credenciales de produccion
// 3. Copiar PUBLIC_KEY al .env
// 4. Crear backend endpoint para generar preference
// 5. Descomentar el código
// ============================================================

/*
// FRONTEND: Crear boton de pago
export const createPaymentButton = async (plan: 'mensual' | 'anual') => {
  const prices = { mensual: 2990, anual: 29900 }; // en centavos ARS
  const titles = { mensual: 'Frecuencia Interna - Mensual', anual: 'Frecuencia Interna - Anual' };
  
  // Llamar a tu backend para crear la preference
  const response = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titles[plan],
      price: prices[plan] / 100,
      currency: 'ARS',
      plan,
    }),
  });
  
  const { preferenceId } = await response.json();
  return preferenceId;
};

// BACKEND (Node.js/Express): Crear preference
// Este código va en tu servidor, NO en el frontend
//
// const mercadopago = require('mercadopago');
// mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });
//
// app.post('/api/create-preference', async (req, res) => {
//   const { title, price, currency, plan } = req.body;
//   const preference = await mercadopago.preferences.create({
//     items: [{ title, unit_price: price, quantity: 1, currency_id: currency }],
//     back_urls: {
//       success: 'https://sodaroja.com/mi-cuenta?payment=success',
//       failure: 'https://sodaroja.com/mi-cuenta?payment=failure',
//       pending: 'https://sodaroja.com/mi-cuenta?payment=pending',
//     },
//     auto_return: 'approved',
//     notification_url: 'https://sodaroja.com/api/mp-webhook',
//   });
//   res.json({ preferenceId: preference.body.id });
// });

// WEBHOOK: Recibir notificaciones de pago
// app.post('/api/mp-webhook', async (req, res) => {
//   const { type, data } = req.body;
//   if (type === 'payment') {
//     const payment = await mercadopago.payment.findById(data.id);
//     if (payment.body.status === 'approved') {
//       // Activar suscripcion en Supabase
//       await supabase.from('subscriptions').insert({
//         user_id: payment.body.metadata.user_id,
//         plan: payment.body.metadata.plan,
//         status: 'active',
//         payment_provider: 'mercadopago',
//         payment_id: data.id.toString(),
//         amount: payment.body.transaction_amount,
//         currency: 'ARS',
//         expires_at: calculateExpiry(payment.body.metadata.plan),
//       });
//       // Marcar usuario como premium
//       await supabase.from('users').update({ is_premium: true }).eq('id', payment.body.metadata.user_id);
//     }
//   }
//   res.sendStatus(200);
// });
*/

// ============================================================
// STRIPE — Para pagos internacionales
// ============================================================
/*
// Similar estructura pero usando Stripe Checkout
// npm install @stripe/stripe-js
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
//
// export const createStripeCheckout = async (plan: string, userId: string) => {
//   const response = await fetch('/api/create-checkout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ plan, userId }),
//   });
//   const { sessionId } = await response.json();
//   const stripe = await stripePromise;
//   await stripe.redirectToCheckout({ sessionId });
// };
*/

export const PAYMENTS_READY = false;
