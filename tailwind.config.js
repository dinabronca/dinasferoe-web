/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta SODAROJA
        'soda': {
          'night': '#0a0e1a',        // negro azulado profundo
          'deep': '#141824',          // gris azulado oscuro
          'slate': '#1e2433',         // gris medio
          'mist': '#2a3142',          // gris más claro
          'fog': '#8a94a6',           // gris claro - MÁS VISIBLE
          'lamp': '#e8dcc8',          // beige cálido - MÁS CLARO
          'warm': '#f5f0e8',          // blanco gastado - MÁS CLARO
          'glow': '#ffffff',          // luz de velador - BLANCO PURO
          'red': '#c45555',           // rojo más visible
          'accent': '#8a9bc4',        // azul más visible
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Crimson Pro', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'rain-drop': 'rainDrop 1s linear infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
        'interference': 'interference 2s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        rainDrop: {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.3' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        interference: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.15' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
