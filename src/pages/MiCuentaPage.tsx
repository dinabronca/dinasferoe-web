import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut, Save, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getContent } from '../data/content';
import { getCurrentUser, logoutUser, DemoUser } from '../data/auth';

export const MiCuentaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'suscripcion' | 'config'>('perfil');
  const content = getContent();
  const fields = content.userProfileFields.filter(f => f.visible);
  const navigate = useNavigate();

  const user: DemoUser | null = getCurrentUser();

  const [formData, setFormData] = useState<Record<string, string>>({
    name: user?.name || '',
    email: user?.email || '',
    photoUrl: user?.photoUrl || '',
  });

  useEffect(() => {
    if (!user) { navigate('/unirse'); }
  }, []);

  if (!user) return null;

  const months = [
    { value: '01', label: 'Enero' }, { value: '02', label: 'Febrero' }, { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' }, { value: '05', label: 'Mayo' }, { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' }, { value: '08', label: 'Agosto' }, { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' }, { value: '11', label: 'Noviembre' }, { value: '12', label: 'Diciembre' },
  ];
  const years = Array.from({ length: 80 }, (_, i) => String(2010 - i));
  const ic = "w-full bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";

  const handleLogout = () => { logoutUser(); navigate('/'); window.location.reload(); };
  const handleSave = () => {
    const updated = { ...user, name: formData.name, email: formData.email, photoUrl: formData.photoUrl };
    localStorage.setItem('sodaroja-user', JSON.stringify(updated));
    alert('Cambios guardados');
  };

  const renderField = (field: typeof fields[0]) => {
    if (field.id === 'name' || field.id === 'email') return null;
    if (field.type === 'month-year') {
      return (
        <div key={field.id}><label className="block text-soda-lamp text-sm mb-2">{field.label}</label>
          <div className="grid grid-cols-2 gap-3">
            <select value={formData[`${field.id}_month`] || ''} onChange={(e) => setFormData({ ...formData, [`${field.id}_month`]: e.target.value })} className={ic}><option value="">Mes</option>{months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}</select>
            <select value={formData[`${field.id}_year`] || ''} onChange={(e) => setFormData({ ...formData, [`${field.id}_year`]: e.target.value })} className={ic}><option value="">Año</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
          </div>
        </div>
      );
    }
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id}><label className="block text-soda-lamp text-sm mb-2">{field.label}</label>
          <select value={formData[field.id] || ''} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} className={ic}><option value="">Elegí una opción</option>{field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
        </div>
      );
    }
    return (
      <div key={field.id}><label className="block text-soda-lamp text-sm mb-2">{field.label}</label>
        <input type="text" value={formData[field.id] || ''} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} className={ic} placeholder={field.placeholder || ''} />
      </div>
    );
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-serif text-soda-glow mb-6">Mi Cuenta</h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-soda-accent to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt="Perfil" className="w-16 h-16 rounded-full object-cover border-2 border-soda-red" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-soda-red bg-opacity-20 flex items-center justify-center border-2 border-soda-red"><User size={32} className="text-soda-red" /></div>
                )}
                <div>
                  <h3 className="text-soda-glow font-serif text-xl">{user.name}</h3>
                  <p className="text-soda-fog text-sm">{user.email}</p>
                </div>
              </div>

              {user.isPremium ? (
                <div className="bg-soda-red bg-opacity-10 border border-soda-red border-opacity-30 rounded-sm p-4 mb-4">
                  <div className="flex items-center gap-2 mb-1"><div className="text-xl">◉</div><span className="text-soda-red text-sm font-medium">FRECUENCIA INTERNA</span></div>
                  <p className="text-soda-lamp text-xs">N° de Socio: {user.memberNumber || 'EF-000XXX'}</p>
                </div>
              ) : (
                <div className="bg-soda-night bg-opacity-60 border border-soda-mist border-opacity-20 rounded-sm p-4 mb-4">
                  <p className="text-soda-fog text-sm mb-2">Cuenta gratuita</p>
                  <a href="/frecuencia-interna" className="text-soda-red text-xs hover:underline">→ Unite a Frecuencia Interna</a>
                </div>
              )}

              <nav className="space-y-2">
                {[
                  { id: 'perfil' as const, icon: <User size={18} />, label: 'Perfil' },
                  { id: 'suscripcion' as const, icon: <CreditCard size={18} />, label: 'Suscripción' },
                  { id: 'config' as const, icon: <Settings size={18} />, label: 'Configuración' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-left text-sm ${activeTab === tab.id ? 'text-soda-lamp bg-soda-mist bg-opacity-20' : 'text-soda-fog hover:bg-soda-mist hover:bg-opacity-10'}`}>
                    {tab.icon}<span>{tab.label}</span>
                  </button>
                ))}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-soda-red hover:bg-soda-red hover:bg-opacity-10 rounded-sm transition-all text-left mt-4 text-sm"><LogOut size={18} /><span>Cerrar Sesión</span></button>
              </nav>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-6">
            {activeTab === 'perfil' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-2">Información Personal</h2>
                <p className="text-soda-fog text-xs mb-8">Solo pedimos lo necesario.</p>
                <div className="space-y-5">
                  <div><label className="block text-soda-lamp text-sm mb-2">Nombre</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={ic} /></div>
                  <div><label className="block text-soda-lamp text-sm mb-2">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={ic} /></div>
                  <div><label className="block text-soda-lamp text-sm mb-2">Foto de perfil (URL)</label><input type="url" value={formData.photoUrl} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} className={ic} placeholder="https://... (máx 200×200px)" /><p className="text-soda-fog text-xs mt-1">Pegá un link a tu foto. No almacenamos imágenes.</p></div>
                  {fields.map(renderField)}
                  <button onClick={handleSave} className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-lamp rounded-sm hover:bg-opacity-30 transition-all mt-4 flex items-center justify-center gap-2 text-sm"><Save size={16} />Guardar Cambios</button>
                </div>
              </div>
            )}

            {activeTab === 'suscripcion' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Tu Suscripción</h2>
                {user.isPremium ? (
                  <>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: 'Estado', value: '✓ Frecuencia Interna activa' },
                        { label: 'N° de Socio', value: user.memberNumber || 'EF-000XXX' },
                        { label: 'Miembro desde', value: new Date(user.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center pb-4 border-b border-soda-mist border-opacity-20">
                          <span className="text-soda-fog text-sm">{row.label}:</span><span className="text-soda-lamp font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm">Cambiar Plan</button>
                        <button className="flex-1 py-3 border border-soda-red text-soda-red rounded-sm hover:bg-soda-red hover:bg-opacity-10 transition-all text-sm">Cancelar Suscripción</button>
                      </div>
                      <a href={content.frecuenciaInterna.paymentUrls.mercadoPago || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 border border-soda-mist border-opacity-30 text-soda-lamp rounded-sm hover:bg-soda-mist hover:bg-opacity-10 transition-all text-sm"><ExternalLink size={14} />Gestionar método de pago</a>
                      <p className="text-soda-fog text-xs text-center">Se abre en la plataforma de pago. No almacenamos datos de tarjeta.</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-soda-fog mb-4">Todavía no sos parte de Frecuencia Interna.</p>
                    <a href="/frecuencia-interna" className="inline-block px-8 py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm tracking-wider">UNIRME A LA FRECUENCIA</a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'config' && (
              <div className="bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-8">
                <h2 className="text-2xl font-serif text-soda-glow mb-6">Configuración</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-soda-mist border-opacity-20">
                    <div><p className="text-soda-lamp text-sm">Notificaciones por email</p><p className="text-soda-fog text-xs">Nuevos episodios y novedades</p></div>
                    <button className="w-12 h-6 bg-soda-accent bg-opacity-30 rounded-full relative"><div className="absolute top-0.5 right-0.5 w-5 h-5 bg-soda-accent rounded-full" /></button>
                  </div>
                  <div className="pt-4"><button className="text-soda-red text-sm hover:underline">Eliminar mi cuenta</button><p className="text-soda-fog text-xs mt-2">Esta acción es irreversible</p></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
