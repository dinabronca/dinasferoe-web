import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Image, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initDemoUsers, findUser, registerUser, loginUser, getCurrentUser } from '../data/auth';

export const UnirsePage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', photoUrl: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { initDemoUsers(); }, []);

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (getCurrentUser()) navigate('/mi-cuenta');
  }, []);

  const ic = "w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.email || !formData.password) { setError('Completá email y contraseña'); return; }
      const user = findUser(formData.email, formData.password);
      if (!user) { setError('Email o contraseña incorrectos'); return; }
      loginUser(user);
      navigate('/mi-cuenta');
      window.location.reload();
    } else {
      if (!formData.name || !formData.email || !formData.password) { setError('Completá todos los campos obligatorios'); return; }
      if (formData.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
      if (formData.password !== formData.confirmPassword) { setError('Las contraseñas no coinciden'); return; }
      const user = registerUser(formData.name, formData.email, formData.password, formData.photoUrl);
      loginUser(user);
      navigate('/mi-cuenta');
      window.location.reload();
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-md">
        <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
          <div className="text-center mb-8">
            <motion.div  className="text-soda-red text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 15px rgba(196, 85, 85, 0.5))' }}>◉</motion.div>
            <h1 className="text-3xl font-serif text-soda-glow mb-2">{mode === 'register' ? 'Unirse al culto' : 'Bienvenido de vuelta'}</h1>
            <p className="text-soda-fog text-sm">{mode === 'register' ? 'Creá tu cuenta y empezá a escuchar' : 'Ingresá a tu cuenta'}</p>
          </div>

          <div className="flex mb-6 border-b border-soda-mist border-opacity-20">
            <button onClick={() => { setMode('register'); setError(''); }} className={`flex-1 pb-3 text-sm transition-all ${mode === 'register' ? 'text-soda-glow border-b-2 border-soda-red' : 'text-soda-fog'}`}>Crear Cuenta</button>
            <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 pb-3 text-sm transition-all ${mode === 'login' ? 'text-soda-glow border-b-2 border-soda-red' : 'text-soda-fog'}`}>Iniciar Sesión</button>
          </div>

          {/* Cuentas demo */}
          {mode === 'login' && (
            <div className="mb-6 bg-soda-night bg-opacity-40 border border-soda-accent border-opacity-20 rounded-sm p-4">
              <p className="text-soda-accent text-xs font-medium mb-2">Cuentas de prueba:</p>
              <div className="space-y-1 text-xs">
                <p className="text-soda-lamp">Premium: <span className="text-soda-fog">premium@sodaroja.com</span> / <span className="text-soda-fog">sodaroja1</span></p>
                <p className="text-soda-lamp">Gratis: <span className="text-soda-fog">user@sodaroja.com</span> / <span className="text-soda-fog">sodaroja2</span></p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div><label className="block text-soda-lamp text-sm mb-2"><User size={14} className="inline mr-2" />Nombre</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={ic} placeholder="¿Cómo te llamás?" /></div>
            )}
            <div><label className="block text-soda-lamp text-sm mb-2"><Mail size={14} className="inline mr-2" />Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={ic} placeholder="tu@email.com" /></div>
            <div><label className="block text-soda-lamp text-sm mb-2"><Lock size={14} className="inline mr-2" />Contraseña</label><input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={ic} placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : 'Tu contraseña'} /></div>
            {mode === 'register' && (
              <>
                <div><label className="block text-soda-lamp text-sm mb-2"><Lock size={14} className="inline mr-2" />Repetir contraseña</label><input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className={ic} placeholder="Repetí la contraseña" /></div>
                <div><label className="block text-soda-lamp text-sm mb-2"><Image size={14} className="inline mr-2" />Foto de perfil (URL, opcional)</label><input type="url" value={formData.photoUrl} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} className={ic} placeholder="https://... (máx 200×200px)" /><p className="text-soda-fog text-xs mt-1">Pegá un link a tu foto. No almacenamos imágenes.</p></div>
              </>
            )}
            {error && <div className="flex items-center gap-2 text-soda-red text-sm"><AlertCircle size={14} />{error}</div>}
            <button type="submit" className="w-full py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm tracking-wider flex items-center justify-center gap-2 mt-4">
              {mode === 'register' ? 'CREAR CUENTA' : 'ENTRAR'}<ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
