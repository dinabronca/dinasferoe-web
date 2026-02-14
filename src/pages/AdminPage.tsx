import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Radio, ShoppingBag, Mic, Settings, Eye, Save, Plus, Trash2, Image, AlertCircle, Home, HelpCircle, Mail, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, UserCog, Layout } from 'lucide-react';
import { getContent, saveContent, SiteContent } from '../data/content';

const ADMIN_PASSWORD = 'sodaroja2026';

type AdminTab = 'inicio' | 'queesesto' | 'equipo' | 'episodios' | 'frecuencia' | 'shop' | 'contacto' | 'general' | 'micuenta' | 'secciones';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('inicio');
  const [saved, setSaved] = useState(false);
  const [content, setContent] = useState<SiteContent>(getContent());
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [showNewEpisode, setShowNewEpisode] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ id: '', city: '', title: '', description: '', imageUrl: '', publishDate: '', isPremium: false, links: { youtube: '', spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' }, embeds: { spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' } });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { setIsAuthenticated(true); setError(''); } else { setError('Contraseña incorrecta'); }
  };

  const handleSave = () => {
    saveContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let obj: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const ic = "w-full bg-soda-night bg-opacity-80 border border-soda-mist border-opacity-30 rounded-sm px-4 py-3 text-soda-lamp focus:border-soda-accent focus:outline-none transition-colors text-sm";
  const lc = "block text-soda-lamp text-sm mb-2 font-medium";
  const nc = "text-soda-fog text-xs mt-1";
  const cc = "bg-soda-slate bg-opacity-40 backdrop-blur-sm border border-soda-mist border-opacity-20 rounded-sm p-6 mb-6";

  if (!isAuthenticated) {
    return (
      <section className="relative pt-32 pb-24 px-6 min-h-screen flex items-center justify-center restore-cursor">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
          <div className={cc}>
            <div className="text-center mb-8">
              <Shield size={48} className="text-soda-red mx-auto mb-4" />
              <h1 className="text-3xl font-serif text-soda-glow mb-2">Admin Panel</h1>
              <p className="text-soda-fog text-sm">sodaroja — Panel de Administración</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className={lc}>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className={ic} placeholder="Ingresá la contraseña" />
              </div>
              {error && <div className="flex items-center gap-2 text-soda-red text-sm"><AlertCircle size={14} /><span>{error}</span></div>}
              <button onClick={handleLogin} className="w-full py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm tracking-wider">ENTRAR</button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={16} /> },
    { id: 'queesesto', label: 'Qué es esto', icon: <HelpCircle size={16} /> },
    { id: 'equipo', label: 'El Equipo', icon: <Users size={16} /> },
    { id: 'episodios', label: 'Episodios', icon: <Mic size={16} /> },
    { id: 'frecuencia', label: 'Frecuencia Interna', icon: <Radio size={16} /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag size={16} /> },
    { id: 'contacto', label: 'Contacto', icon: <Mail size={16} /> },
    { id: 'micuenta', label: 'Mi Cuenta (campos)', icon: <UserCog size={16} /> },
    { id: 'secciones', label: 'Nombres Secciones', icon: <Layout size={16} /> },
    { id: 'general', label: 'General / Redes', icon: <Settings size={16} /> },
  ];

  const addEpisode = () => {
    const ep = { ...newEpisode, id: `ep-${Date.now()}` };
    update('episodios.items', [...content.episodios.items, ep]);
    setNewEpisode({ id: '', city: '', title: '', description: '', imageUrl: '', publishDate: '', isPremium: false, links: { youtube: '', spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' }, embeds: { spotify: '', soundcloud: '', ivoox: '', applePodcasts: '' } });
    setShowNewEpisode(false);
  };

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-screen restore-cursor">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif text-soda-glow mb-2">Admin Panel</h1>
            <p className="text-soda-fog text-sm">Gestión de contenido de sodaroja</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-sm">✓ Guardado</motion.span>}
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm"><Save size={16} />Guardar</button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 border border-soda-accent text-soda-accent rounded-sm hover:bg-soda-accent hover:bg-opacity-10 transition-all text-sm"><Eye size={16} />Ver Sitio</a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-soda-red bg-opacity-20 border border-soda-red text-soda-glow' : 'border border-soda-mist border-opacity-20 text-soda-fog hover:text-soda-lamp hover:border-opacity-40'}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* ======== INICIO ======== */}
        {activeTab === 'inicio' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Pantalla de Inicio (Hero)</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título principal</label><input type="text" value={content.hero.title} onChange={(e) => update('hero.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Descripción</label><textarea rows={3} value={content.hero.description} onChange={(e) => update('hero.description', e.target.value)} className={ic + ' resize-y'} /></div>
                <div><label className={lc}>URL de imagen principal (opcional, reemplaza la animación)</label><input type="text" value={content.hero.imageUrl} onChange={(e) => update('hero.imageUrl', e.target.value)} className={ic} placeholder="https://..." /><p className={nc}>Dejá vacío para usar la animación del dial de frecuencia</p></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== QUÉ ES ESTO ======== */}
        {activeTab === 'queesesto' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Textos Principales</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título</label><input type="text" value={content.queEsEsto.title} onChange={(e) => update('queEsEsto.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Descripción</label><textarea rows={3} value={content.queEsEsto.description} onChange={(e) => update('queEsEsto.description', e.target.value)} className={ic + ' resize-y'} /></div>
                <div><label className={lc}>Título de estructura</label><input type="text" value={content.queEsEsto.structureTitle} onChange={(e) => update('queEsEsto.structureTitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo de estructura</label><input type="text" value={content.queEsEsto.structureSubtitle} onChange={(e) => update('queEsEsto.structureSubtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Pasos / Estructura</h2>
                <button onClick={() => update('queEsEsto.estructura', [...content.queEsEsto.estructura, { numero: String(content.queEsEsto.estructura.length), emoji: '⭐', titulo: 'Nuevo paso', descripcion: '', detalles: '', destacado: false, color: 'accent' }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs hover:bg-soda-accent hover:bg-opacity-10"><Plus size={14} />Agregar paso</button>
              </div>
              <p className={nc + ' mb-4'}>Podés editar el número, emoji, color y contenido de cada paso. Arrastrá para reordenar.</p>
              {content.queEsEsto.estructura.map((paso, idx) => (
                <div key={idx} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-12 gap-3 mb-3">
                    <div className="col-span-2"><label className={lc}>Número</label><input type="text" value={paso.numero} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], numero: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div className="col-span-2"><label className={lc}>Emoji</label><input type="text" value={paso.emoji} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], emoji: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div className="col-span-3"><label className={lc}>Color</label>
                      <select value={paso.color} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], color: e.target.value as any }; update('queEsEsto.estructura', arr); }} className={ic}>
                        <option value="red">Rojo</option><option value="accent">Azul</option><option value="lamp">Dorado</option><option value="glow">Blanco</option>
                      </select>
                    </div>
                    <div className="col-span-3"><label className={lc}>Destacado</label>
                      <button onClick={() => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], destacado: !arr[idx].destacado }; update('queEsEsto.estructura', arr); }} className="flex items-center gap-2 text-sm mt-1">
                        {paso.destacado ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                        <span className={paso.destacado ? 'text-soda-red' : 'text-soda-fog'}>{paso.destacado ? 'Sí' : 'No'}</span>
                      </button>
                    </div>
                    <div className="col-span-2 flex items-end"><button onClick={() => { const arr = content.queEsEsto.estructura.filter((_, i) => i !== idx); update('queEsEsto.estructura', arr); }} className="text-soda-red text-xs hover:underline mb-3">Eliminar</button></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><label className={lc}>Título</label><input type="text" value={paso.titulo} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], titulo: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                    <div><label className={lc}>Subtítulo (opcional)</label><input type="text" value={paso.subtitulo || ''} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], subtitulo: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic} /></div>
                  </div>
                  <div className="space-y-3">
                    <div><label className={lc}>Descripción</label><textarea rows={2} value={paso.descripcion} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], descripcion: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic + ' resize-y'} /></div>
                    <div><label className={lc}>Detalles</label><textarea rows={2} value={paso.detalles} onChange={(e) => { const arr = [...content.queEsEsto.estructura]; arr[idx] = { ...arr[idx], detalles: e.target.value }; update('queEsEsto.estructura', arr); }} className={ic + ' resize-y'} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Temas</h2>
              {content.queEsEsto.temas.map((tema, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input type="text" value={tema} onChange={(e) => { const arr = [...content.queEsEsto.temas]; arr[idx] = e.target.value; update('queEsEsto.temas', arr); }} className={ic + ' flex-1'} />
                  <button onClick={() => update('queEsEsto.temas', content.queEsEsto.temas.filter((_, i) => i !== idx))} className="text-soda-red p-1"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => update('queEsEsto.temas', [...content.queEsEsto.temas, 'Nuevo tema'])} className="mt-2 flex items-center gap-1 text-soda-accent text-xs"><Plus size={14} />Agregar tema</button>
            </div>
          </div>
        )}

        {/* ======== EL EQUIPO ======== */}
        {activeTab === 'equipo' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.equipo.title} onChange={(e) => update('equipo.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.equipo.subtitle} onChange={(e) => update('equipo.subtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>

            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Integrantes</h2>
                <button onClick={() => update('equipo.members', [...content.equipo.members, { name: 'Nuevo', role: 'Rol', birthYear: 2000, cityBorn: '', cityCurrent: '', zodiac: '', photoUrl: '', socials: [], favorites: {}, cities: {} }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs"><Plus size={14} />Agregar</button>
              </div>
              <div className="bg-soda-night bg-opacity-40 border border-soda-mist border-opacity-10 rounded-sm p-3 mb-4">
                <div className="flex items-center gap-2 text-soda-accent text-xs"><Image size={14} /><span>Fotos: 600×800px mínimo (ratio 3:4), JPG/WebP, max 500KB</span></div>
              </div>

              {content.equipo.members.map((member, mIdx) => (
                <div key={mIdx} className="border border-soda-mist border-opacity-15 rounded-sm mb-4 overflow-hidden">
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-soda-mist hover:bg-opacity-5" onClick={() => setExpandedMember(expandedMember === mIdx ? null : mIdx)}>
                    <div className="flex items-center gap-3">
                      <span className="text-soda-lamp font-medium">{member.name}</span>
                      <span className="text-soda-fog text-xs">— {member.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); update('equipo.members', content.equipo.members.filter((_, i) => i !== mIdx)); }} className="text-soda-red text-xs hover:underline">Eliminar</button>
                      {expandedMember === mIdx ? <ChevronUp size={16} className="text-soda-fog" /> : <ChevronDown size={16} className="text-soda-fog" />}
                    </div>
                  </div>

                  {expandedMember === mIdx && (
                    <div className="p-4 pt-0 space-y-4 border-t border-soda-mist border-opacity-10">
                      <div className="grid grid-cols-3 gap-3">
                        <div><label className={lc}>Nombre</label><input type="text" value={member.name} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], name: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Rol</label><input type="text" value={member.role} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], role: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>URL foto</label><input type="text" value={member.photoUrl} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], photoUrl: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div><label className={lc}>Año nacimiento</label><input type="number" value={member.birthYear} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], birthYear: Number(e.target.value) }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Ciudad natal</label><input type="text" value={member.cityBorn} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cityBorn: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Vive en</label><input type="text" value={member.cityCurrent} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cityCurrent: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                        <div><label className={lc}>Signo</label><input type="text" value={member.zodiac} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], zodiac: e.target.value }; update('equipo.members', arr); }} className={ic} /></div>
                      </div>

                      {/* CUESTIONARIO INDIVIDUAL — Perfil Humano */}
                      <div>
                        <h4 className="text-soda-accent text-sm font-medium mb-3 mt-2">📋 Perfil Humano — {member.name}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {content.equipo.favoriteFields.map((field) => (
                            <div key={field.key}>
                              <label className={lc}>{field.label}</label>
                              <input type="text" value={String(member.favorites[field.key] || '')} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], favorites: { ...arr[mIdx].favorites, [field.key]: e.target.value } }; update('equipo.members', arr); }} className={ic} placeholder={`Respuesta de ${member.name}`} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CUESTIONARIO INDIVIDUAL — Ciudades */}
                      <div>
                        <h4 className="text-soda-accent text-sm font-medium mb-3 mt-2">🌍 Ciudades — {member.name}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {content.equipo.cityFields.map((field) => (
                            <div key={field.key}>
                              <label className={lc}>{field.label}</label>
                              <input type="text" value={member.cities[field.key] || ''} onChange={(e) => { const arr = [...content.equipo.members]; arr[mIdx] = { ...arr[mIdx], cities: { ...arr[mIdx].cities, [field.key]: e.target.value } }; update('equipo.members', arr); }} className={ic} placeholder={`Respuesta de ${member.name}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======== EPISODIOS ======== */}
        {activeTab === 'episodios' && (
          <div>
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Episodios ({content.episodios.items.length})</h2>
                <button onClick={() => setShowNewEpisode(!showNewEpisode)} className="flex items-center gap-2 px-4 py-2 border border-soda-accent text-soda-accent rounded-sm text-sm hover:bg-soda-accent hover:bg-opacity-10">{showNewEpisode ? 'Cancelar' : <><Plus size={16} />Nuevo Episodio</>}</button>
              </div>

              {showNewEpisode && (
                <div className="border-2 border-soda-accent border-opacity-30 rounded-sm p-5 mb-6 bg-soda-night bg-opacity-40">
                  <h3 className="text-soda-accent text-sm font-medium mb-4">Nuevo Episodio</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className={lc}>Ciudad</label><input type="text" value={newEpisode.city} onChange={(e) => setNewEpisode({ ...newEpisode, city: e.target.value })} className={ic} placeholder="Ej: Buenos Aires" /></div>
                    <div><label className={lc}>Título</label><input type="text" value={newEpisode.title} onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })} className={ic} placeholder="Ej: La Dama de Blanco" /></div>
                  </div>
                  <div className="mb-4"><label className={lc}>Descripción</label><textarea rows={2} value={newEpisode.description} onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })} className={ic + ' resize-y'} placeholder="Breve descripción del episodio" /></div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div><label className={lc}>Fecha (YYYY-MM-DD)</label><input type="date" value={newEpisode.publishDate} onChange={(e) => setNewEpisode({ ...newEpisode, publishDate: e.target.value })} className={ic} /></div>
                    <div><label className={lc}>URL Imagen (800×600px)</label><input type="text" value={newEpisode.imageUrl} onChange={(e) => setNewEpisode({ ...newEpisode, imageUrl: e.target.value })} className={ic} placeholder="https://..." /></div>
                    <div><label className={lc}>Premium</label>
                      <button onClick={() => setNewEpisode({ ...newEpisode, isPremium: !newEpisode.isPremium })} className="flex items-center gap-2 text-sm mt-1">
                        {newEpisode.isPremium ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                        <span>{newEpisode.isPremium ? 'Sí (Frecuencia Interna)' : 'No (público)'}</span>
                      </button>
                    </div>
                  </div>
                  <h4 className="text-soda-lamp text-sm mb-3 mt-2">Links (URLs directas)</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div><label className={lc}>YouTube (link)</label><input type="text" value={newEpisode.links.youtube} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, youtube: e.target.value } })} className={ic} placeholder="https://youtube.com/..." /></div>
                    <div><label className={lc}>Spotify (link)</label><input type="text" value={newEpisode.links.spotify} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, spotify: e.target.value } })} className={ic} placeholder="https://open.spotify.com/..." /></div>
                    <div><label className={lc}>SoundCloud (link)</label><input type="text" value={newEpisode.links.soundcloud} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, soundcloud: e.target.value } })} className={ic} placeholder="https://soundcloud.com/..." /></div>
                    <div><label className={lc}>iVoox (link)</label><input type="text" value={newEpisode.links.ivoox} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, ivoox: e.target.value } })} className={ic} placeholder="https://ivoox.com/..." /></div>
                    <div><label className={lc}>Apple Podcasts (link)</label><input type="text" value={newEpisode.links.applePodcasts || ''} onChange={(e) => setNewEpisode({ ...newEpisode, links: { ...newEpisode.links, applePodcasts: e.target.value } })} className={ic} placeholder="https://podcasts.apple.com/..." /></div>
                  </div>
                  <h4 className="text-soda-lamp text-sm mb-3">Embeds (URLs de iframe — se ven dentro del modal del episodio)</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div><label className={lc}>Embed Spotify</label><input type="text" value={newEpisode.embeds.spotify} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, spotify: e.target.value } })} className={ic} placeholder="https://open.spotify.com/embed/..." /></div>
                    <div><label className={lc}>Embed SoundCloud</label><input type="text" value={newEpisode.embeds.soundcloud} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, soundcloud: e.target.value } })} className={ic} placeholder="https://w.soundcloud.com/player/..." /></div>
                    <div><label className={lc}>Embed iVoox</label><input type="text" value={newEpisode.embeds.ivoox} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, ivoox: e.target.value } })} className={ic} placeholder="https://www.ivoox.com/player_..." /></div>
                    <div><label className={lc}>Embed Apple Podcasts</label><input type="text" value={newEpisode.embeds.applePodcasts || ''} onChange={(e) => setNewEpisode({ ...newEpisode, embeds: { ...newEpisode.embeds, applePodcasts: e.target.value } })} className={ic} placeholder="https://embed.podcasts.apple.com/..." /><p className={nc}>Apple tiene embed, copiá la URL del widget</p></div>
                  </div>
                  <button onClick={addEpisode} className="w-full py-3 bg-soda-accent bg-opacity-20 border border-soda-accent text-soda-glow rounded-sm hover:bg-opacity-30 transition-all text-sm">Crear Episodio</button>
                </div>
              )}

              {content.episodios.items.map((ep: any, idx: number) => {
                const isEditing = expandedMember === idx + 1000; // offset to not collide with team member index
                return (
                <div key={ep.id} className="border border-soda-mist border-opacity-15 rounded-sm mb-3 overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="text-soda-accent text-xs font-mono w-8 flex-shrink-0">{idx + 1}</span>
                      {ep.imageUrl && <img src={ep.imageUrl} alt="" className="w-10 h-10 rounded-sm object-cover flex-shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-soda-lamp text-sm truncate">{ep.city} — "{ep.title}"</p>
                        <p className="text-soda-fog text-xs">{ep.publishDate} {ep.isPremium && '• 🔒 Premium'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button onClick={() => setExpandedMember(isEditing ? null : idx + 1000)} className="text-soda-accent text-xs hover:underline">{isEditing ? 'Cerrar' : 'Editar'}</button>
                      <button onClick={() => update('episodios.items', content.episodios.items.filter((_: any, i: number) => i !== idx))} className="text-soda-red text-xs hover:underline">Eliminar</button>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="px-4 pb-4 border-t border-soda-mist border-opacity-10 pt-4 bg-soda-night bg-opacity-30">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className={lc}>Ciudad</label><input type="text" value={ep.city} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], city: e.target.value }; update('episodios.items', arr); }} className={ic} /></div>
                        <div><label className={lc}>Titulo</label><input type="text" value={ep.title} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], title: e.target.value }; update('episodios.items', arr); }} className={ic} /></div>
                      </div>
                      <div className="mb-3"><label className={lc}>Descripcion</label><textarea rows={2} value={ep.description} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], description: e.target.value }; update('episodios.items', arr); }} className={ic + ' resize-y'} /></div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div><label className={lc}>Fecha</label><input type="date" value={ep.publishDate} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], publishDate: e.target.value }; update('episodios.items', arr); }} className={ic} /></div>
                        <div><label className={lc}>URL Imagen</label><input type="text" value={ep.imageUrl} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], imageUrl: e.target.value }; update('episodios.items', arr); }} className={ic} /></div>
                        <div><label className={lc}>Premium</label>
                          <button onClick={() => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], isPremium: !arr[idx].isPremium }; update('episodios.items', arr); }} className="flex items-center gap-2 text-xs mt-1">
                            {ep.isPremium ? <ToggleRight size={20} className="text-soda-red" /> : <ToggleLeft size={20} className="text-soda-fog" />}
                            <span className="text-soda-fog">{ep.isPremium ? 'Premium' : 'Publico'}</span>
                          </button>
                        </div>
                      </div>
                      <h4 className="text-soda-lamp text-xs mb-2 mt-1">Links</h4>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {['youtube','spotify','soundcloud','ivoox','applePodcasts'].map(lk => (
                          <div key={lk}><label className={lc}>{lk}</label><input type="text" value={(ep.links || {})[lk] || ''} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], links: { ...(arr[idx].links || {}), [lk]: e.target.value } }; update('episodios.items', arr); }} className={ic} placeholder="https://..." /></div>
                        ))}
                      </div>
                      <h4 className="text-soda-lamp text-xs mb-2">Embeds</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['spotify','soundcloud','ivoox','applePodcasts'].map(lk => (
                          <div key={lk}><label className={lc}>Embed {lk}</label><input type="text" value={(ep.embeds || {})[lk] || ''} onChange={(e) => { const arr = [...content.episodios.items]; arr[idx] = { ...arr[idx], embeds: { ...(arr[idx].embeds || {}), [lk]: e.target.value } }; update('episodios.items', arr); }} className={ic} placeholder="URL del iframe..." /></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======== FRECUENCIA INTERNA ======== */}
        {activeTab === 'frecuencia' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Textos</h2>
              <div className="space-y-4">
                <div><label className={lc}>Título</label><input type="text" value={content.frecuenciaInterna.title} onChange={(e) => update('frecuenciaInterna.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.frecuenciaInterna.subtitle} onChange={(e) => update('frecuenciaInterna.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Texto introductorio</label><textarea rows={4} value={content.frecuenciaInterna.introText} onChange={(e) => update('frecuenciaInterna.introText', e.target.value)} className={ic + ' resize-y'} /></div>
                <div><label className={lc}>Título de beneficios ("Qué te llevas al sumarte")</label><input type="text" value={content.frecuenciaInterna.benefitsTitle} onChange={(e) => update('frecuenciaInterna.benefitsTitle', e.target.value)} className={ic} /></div>
              </div>
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Planes</h2>
              <p className={nc + ' mb-4'}>⚠️ Al modificar los precios acá, se actualizan los montos mostrados. Asegurate de que coincidan con los precios en Mercado Pago / PayPal.</p>
              {content.frecuenciaInterna.plans.map((plan, idx) => (
                <div key={plan.id} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-5 gap-3">
                    <div><label className={lc}>Nombre</label><input type="text" value={plan.name} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], name: e.target.value }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>ARS $</label><input type="number" value={plan.priceARS} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], priceARS: Number(e.target.value) }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>USD $</label><input type="number" value={plan.priceUSD} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], priceUSD: Number(e.target.value) }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>Descripción</label><input type="text" value={plan.description} onChange={(e) => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], description: e.target.value }; update('frecuenciaInterna.plans', arr); }} className={ic} /></div>
                    <div><label className={lc}>Destacado</label><button onClick={() => { const arr = [...content.frecuenciaInterna.plans]; arr[idx] = { ...arr[idx], featured: !arr[idx].featured }; update('frecuenciaInterna.plans', arr); }} className="flex items-center gap-1 mt-1">{plan.featured ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}</button></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">URLs de Pago</h2>
              <p className={nc + ' mb-4'}>Las suscripciones las gestiona directamente Mercado Pago / PayPal. Vos solo ponés el link y ellos se encargan de cobrar y gestionar.</p>
              <div className="space-y-4">
                <div><label className={lc}>URL Mercado Pago (Argentina — cobro en ARS)</label><input type="text" value={content.frecuenciaInterna.paymentUrls.mercadoPago} onChange={(e) => update('frecuenciaInterna.paymentUrls.mercadoPago', e.target.value)} className={ic} placeholder="https://www.mercadopago.com.ar/subscriptions/..." /><p className={nc}>Creá una suscripción en Mercado Pago → Copiá el link acá</p></div>
                <div><label className={lc}>Plataforma internacional</label>
                  <select value={content.frecuenciaInterna.paymentUrls.internationalProvider} onChange={(e) => update('frecuenciaInterna.paymentUrls.internationalProvider', e.target.value)} className={ic}>
                    <option value="paypal">PayPal (más conocido, acepta casi todo el mundo)</option>
                    <option value="stripe">Stripe (más profesional, necesita más setup)</option>
                    <option value="lemon-squeezy">Lemon Squeezy (fácil, bueno para creadores)</option>
                  </select>
                  <p className={nc}>PayPal es la opción más accesible para suscripciones internacionales. El usuario paga con tarjeta o PayPal directo.</p>
                </div>
                <div><label className={lc}>URL Internacional (cobro en USD)</label><input type="text" value={content.frecuenciaInterna.paymentUrls.international} onChange={(e) => update('frecuenciaInterna.paymentUrls.international', e.target.value)} className={ic} placeholder="https://www.paypal.com/..." /></div>
              </div>
            </div>

            {/* MENSAJES INTERNOS */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">📡 Mensajes Internos</h2>
              <p className={nc + ' mb-4'}>Estos mensajes los ven solo los suscriptores en su panel. Como un feed privado.</p>
              <AdminInternalMessages ic={ic} lc={lc} />
            </div>

            {/* ENCUESTAS */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">📊 Encuestas</h2>
              <p className={nc + ' mb-4'}>Creá encuestas para que voten los suscriptores. Podés ver estadísticas en tiempo real.</p>
              <AdminPolls ic={ic} lc={lc} />
            </div>

            {/* SORTEOS */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">🎰 Sorteos</h2>
              <p className={nc + ' mb-4'}>Los suscriptores compran tickets con burbujas (moneda interna). Más tickets = más chances.</p>
              <AdminRaffles ic={ic} lc={lc} />
            </div>

            {/* NOTIFICACIONES PERSONALES */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">🔔 Notificaciones Personales</h2>
              <p className={nc + ' mb-4'}>Enviá mensajes directos a un suscriptor: aviso de ganador, pago rechazado, feliz cumpleaños, etc.</p>
              <AdminNotifications ic={ic} lc={lc} />
            </div>

            {/* MISIONES / SODITAS */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">🥤 Misiones de Soditas</h2>
              <p className={nc + ' mb-4'}>Configurá cómo se ganan soditas. En producción, las misiones automáticas (escuchar episodios, streak) se verifican por el sistema.</p>
              <AdminMissions ic={ic} lc={lc} />
            </div>
          </div>
        )}

        {/* ======== SHOP ======== */}
        {activeTab === 'shop' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Configuración del Shop</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.shop.title} onChange={(e) => update('shop.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.shop.subtitle} onChange={(e) => update('shop.subtitle', e.target.value)} className={ic} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== CONTACTO ======== */}
        {activeTab === 'contacto' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Contacto</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lc}>Título</label><input type="text" value={content.contacto.title} onChange={(e) => update('contacto.title', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Subtítulo</label><input type="text" value={content.contacto.subtitle} onChange={(e) => update('contacto.subtitle', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Email</label><input type="email" value={content.contacto.email} onChange={(e) => update('contacto.email', e.target.value)} className={ic} /></div>
                <div><label className={lc}>Instagram</label><input type="text" value={content.contacto.instagram} onChange={(e) => update('contacto.instagram', e.target.value)} className={ic} /></div>
              </div>
            </div>
          </div>
        )}

        {/* ======== MI CUENTA — CAMPOS ======== */}
        {activeTab === 'micuenta' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Campos del Perfil de Usuario</h2>
              <p className={nc + ' mb-4'}>Configurá qué datos les pedís a los usuarios cuando se registran. Podés agregar campos tipo texto o tipo selección (dropdown).</p>
              {content.userProfileFields.map((field, idx) => (
                <div key={field.id} className="border border-soda-mist border-opacity-15 rounded-sm p-4 mb-3">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3"><label className={lc}>Nombre del campo</label><input type="text" value={field.label} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], label: e.target.value }; update('userProfileFields', arr); }} className={ic} /></div>
                    <div className="col-span-2"><label className={lc}>Tipo</label>
                      <select value={field.type} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], type: e.target.value as any }; update('userProfileFields', arr); }} className={ic}>
                        <option value="text">Texto libre</option><option value="select">Selección (dropdown)</option><option value="month-year">Mes y año</option>
                      </select>
                    </div>
                    <div className="col-span-2"><label className={lc}>Visible</label>
                      <button onClick={() => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], visible: !arr[idx].visible }; update('userProfileFields', arr); }} className="flex items-center gap-1 mt-1">
                        {field.visible ? <ToggleRight size={24} className="text-green-400" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                      </button>
                    </div>
                    <div className="col-span-2"><label className={lc}>Obligatorio</label>
                      <button onClick={() => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], required: !arr[idx].required }; update('userProfileFields', arr); }} className="flex items-center gap-1 mt-1">
                        {field.required ? <ToggleRight size={24} className="text-soda-red" /> : <ToggleLeft size={24} className="text-soda-fog" />}
                      </button>
                    </div>
                    <div className="col-span-2"><label className={lc}>Placeholder</label><input type="text" value={field.placeholder || ''} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], placeholder: e.target.value }; update('userProfileFields', arr); }} className={ic} /></div>
                    <div className="col-span-1 flex items-end pb-3"><button onClick={() => update('userProfileFields', content.userProfileFields.filter((_, i) => i !== idx))} className="text-soda-red"><Trash2 size={14} /></button></div>
                  </div>
                  {field.type === 'select' && (
                    <div className="mt-3">
                      <label className={lc}>Opciones (una por línea)</label>
                      <textarea rows={3} value={(field.options || []).join('\n')} onChange={(e) => { const arr = [...content.userProfileFields]; arr[idx] = { ...arr[idx], options: e.target.value.split('\n').filter(Boolean) }; update('userProfileFields', arr); }} className={ic + ' resize-y'} placeholder="Opción 1&#10;Opción 2&#10;Opción 3" />
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => update('userProfileFields', [...content.userProfileFields, { id: `field-${Date.now()}`, label: 'Nuevo campo', type: 'text', required: false, visible: true, placeholder: '' }])} className="flex items-center gap-1 text-soda-accent text-xs mt-2"><Plus size={14} />Agregar campo</button>
            </div>
          </div>
        )}

        {/* ======== NOMBRES DE SECCIONES ======== */}
        {activeTab === 'secciones' && (
          <div>
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Nombres de las Secciones</h2>
              <p className={nc + ' mb-4'}>Al cambiar estos nombres, se actualizan automáticamente en el menú de navegación (header) del sitio.</p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(content.sectionNames).map(([key, value]) => (
                  <div key={key}>
                    <label className={lc}>{key}</label>
                    <input type="text" value={value} onChange={(e) => update(`sectionNames.${key}`, e.target.value)} className={ic} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======== GENERAL / REDES ======== */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Meta / SEO */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Meta / Pestaña del navegador</h2>
              <div className="space-y-3">
                <div><label className={lc}>Titulo de la pestaña</label><input type="text" value={content.meta?.pageTitle || 'sodaroja'} onChange={(e) => update('meta.pageTitle', e.target.value)} className={ic} placeholder="sodaroja" /></div>
                <div><label className={lc}>Favicon URL (icono de la pestaña, 32x32 o .ico)</label><input type="text" value={content.meta?.faviconUrl || ''} onChange={(e) => update('meta.faviconUrl', e.target.value)} className={ic} placeholder="https://...favicon.ico" /></div>
                <div><label className={lc}>Descripcion SEO</label><textarea rows={2} value={content.meta?.description || ''} onChange={(e) => update('meta.description', e.target.value)} className={ic + ' resize-y'} placeholder="Descripcion para motores de busqueda" /></div>
              </div>
            </div>

            {/* Google Analytics */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Google Analytics</h2>
              <p className={nc + ' mb-3'}>Pega tu ID de medicion de Google Analytics (formato: G-XXXXXXXXXX).</p>
              <input type="text" value={content.meta?.analyticsId || ''} onChange={(e) => update('meta.analyticsId', e.target.value)} className={ic} placeholder="G-XXXXXXXXXX" />
            </div>

            {/* EmailJS */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">EmailJS (Formulario de contacto)</h2>
              <p className={nc + ' mb-3'}>Configura EmailJS para que el formulario envie emails sin abrir el cliente de correo. Registrate gratis en emailjs.com</p>
              <div className="grid grid-cols-3 gap-3">
                <div><label className={lc}>Service ID</label><input type="text" value={content.meta?.emailjsServiceId || ''} onChange={(e) => update('meta.emailjsServiceId', e.target.value)} className={ic} placeholder="service_xxx" /></div>
                <div><label className={lc}>Template ID</label><input type="text" value={content.meta?.emailjsTemplateId || ''} onChange={(e) => update('meta.emailjsTemplateId', e.target.value)} className={ic} placeholder="template_xxx" /></div>
                <div><label className={lc}>Public Key</label><input type="text" value={content.meta?.emailjsPublicKey || ''} onChange={(e) => update('meta.emailjsPublicKey', e.target.value)} className={ic} placeholder="xxxxx" /></div>
              </div>
              <p className={nc + ' mt-2'}>Sin estos datos, el formulario usa mailto (abre el cliente de correo del usuario).</p>
            </div>

            {/* Redes Sociales */}
            <div className={cc}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-soda-glow">Redes Sociales (Footer)</h2>
                <button onClick={() => update('socialLinks', [...content.socialLinks, { id: `social-${Date.now()}`, platform: 'Nueva red', abbr: 'NR', url: '#', iconUrl: '', visible: true }])} className="flex items-center gap-1 px-3 py-2 border border-soda-accent text-soda-accent rounded-sm text-xs"><Plus size={14} />Agregar red</button>
              </div>
              <p className={nc + ' mb-4'}>Toggle = mostrar/ocultar. Nombre corto. URL completa. Icono opcional (URL imagen).</p>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2 text-soda-fog text-xs px-1">
                <div className="w-8"></div>
                <div className="w-24">Nombre</div>
                <div className="w-10 text-center">Sigla</div>
                <div className="flex-1">URL de la red social</div>
                <div className="w-40">URL icono (opcional)</div>
                <div className="w-5"></div>
              </div>
              {content.socialLinks.map((link: any, idx: number) => (
                <div key={link.id} className="flex items-center gap-2 mb-2">
                  <button onClick={() => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], visible: !arr[idx].visible }; update('socialLinks', arr); }} className="flex-shrink-0 w-8">
                    {link.visible ? <ToggleRight size={22} className="text-green-400" /> : <ToggleLeft size={22} className="text-soda-fog" />}
                  </button>
                  <input type="text" value={link.platform} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], platform: e.target.value }; update('socialLinks', arr); }} className={ic + ' w-24'} placeholder="Nombre" />
                  <input type="text" value={link.abbr} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], abbr: e.target.value.substring(0, 3) }; update('socialLinks', arr); }} className={ic + ' w-10 text-center text-xs'} placeholder="XX" maxLength={3} />
                  <input type="text" value={link.url} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], url: e.target.value }; update('socialLinks', arr); }} className={ic + ' flex-1 min-w-0'} placeholder="https://instagram.com/..." />
                  <input type="text" value={link.iconUrl || ''} onChange={(e) => { const arr = [...content.socialLinks]; arr[idx] = { ...arr[idx], iconUrl: e.target.value }; update('socialLinks', arr); }} className={ic + ' w-40'} placeholder="URL icono" />
                  <button onClick={() => update('socialLinks', content.socialLinks.filter((_: any, i: number) => i !== idx))} className="text-soda-red flex-shrink-0 w-5"><Trash2 size={14} /></button>
                </div>
              ))}
            </div>

            {/* Prompt para iconos por IA */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Prompt para generar iconos de redes con IA</h2>
              <p className={nc + ' mb-3'}>Copia este prompt en ChatGPT, Midjourney, DALL-E o Leonardo para generar iconos que peguen con la web:</p>
              <div className="bg-soda-night bg-opacity-80 border border-soda-mist border-opacity-30 rounded-sm p-4 text-soda-lamp text-sm font-mono leading-relaxed select-all cursor-text">
                Genera un icono circular minimalista para la red social [NOMBRE]. Fondo solido de un solo color (elegir entre #c45555 rojo, #8b3a3a borgona, o #6b7a9e azul acento). Simbolo simple y abstracto de la red social en color crema #d4c5b0 centrado. Sin gradientes, sin sombras, sin texto. Estilo flat, trazo fino. Fondo transparente fuera del circulo. 200x200 pixeles. PNG. Que combine con caritas redondas sonrientes minimalistas de la misma paleta de colores.
              </div>
              <p className={nc + ' mt-2'}>Subi la imagen generada a un hosting (imgur, cloudinary) y pega la URL en el campo "URL icono" de cada red.</p>
            </div>

            {/* Seguridad */}
            <div className={cc}>
              <h2 className="text-xl font-serif text-soda-glow mb-4">Seguridad</h2>
              <p className={nc + ' mb-3'}>Contrasena del panel admin (cambiar aca no actualiza la contrasena hardcodeada, se necesita cambiar en el codigo. En produccion esto se mueve a variables de entorno del servidor).</p>
              <p className="text-soda-fog text-xs">Contrasena actual: sodaroja2026</p>
              <p className={nc + ' mt-4'}>Notas de seguridad para produccion:</p>
              <ul className="text-soda-fog text-xs mt-2 space-y-1 list-disc list-inside">
                <li>Mover autenticacion a Supabase Auth o Firebase Auth</li>
                <li>Guardar contenido en base de datos (no localStorage)</li>
                <li>Variables de entorno para API keys (no hardcoded)</li>
                <li>HTTPS obligatorio</li>
                <li>Rate limiting en endpoints de login</li>
                <li>Pagos: Mercado Pago API + Stripe/PayPal webhooks</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================
// ADMIN SUB-COMPONENTS para Frecuencia Interna
// ============================================================
const AdminInternalMessages: React.FC<{ ic: string; lc: string }> = ({ ic, lc }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [newEmoji, setNewEmoji] = useState('📡');

  useEffect(() => {
    try { setMessages(JSON.parse(localStorage.getItem('sodaroja-internal-messages') || '[]')); } catch {}
  }, []);

  const save = (msgs: any[]) => {
    setMessages(msgs);
    localStorage.setItem('sodaroja-internal-messages', JSON.stringify(msgs));
  };

  const add = () => {
    if (!newMsg.trim()) return;
    save([...messages, { id: `msg-${Date.now()}`, text: newMsg, date: new Date().toISOString(), emoji: newEmoji }]);
    setNewMsg(''); setNewEmoji('📡');
  };

  const remove = (id: string) => save(messages.filter((m: any) => m.id !== id));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input type="text" value={newEmoji} onChange={e => setNewEmoji(e.target.value)} className={ic + ' w-16 text-center'} />
        <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} className={ic + ' flex-1'} placeholder="Escribí un mensaje para los suscriptores..." />
        <button onClick={add} className="px-4 py-2 bg-soda-red/20 border border-soda-red/40 text-soda-lamp rounded-sm text-sm"><Plus size={16} /></button>
      </div>
      {messages.slice().reverse().map((m: any) => (
        <div key={m.id} className="flex items-start gap-3 border border-soda-mist/10 rounded-sm p-3">
          <span className="text-lg">{m.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-soda-lamp text-sm">{m.text}</p>
            <p className="text-soda-fog text-[10px] mt-1">{new Date(m.date).toLocaleDateString('es-AR')}</p>
          </div>
          <button onClick={() => remove(m.id)} className="text-soda-fog hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
        </div>
      ))}
    </div>
  );
};

const AdminPolls: React.FC<{ ic: string; lc: string }> = ({ ic, lc }) => {
  const [polls, setPolls] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newBanner, setNewBanner] = useState('');
  const [newQuestions, setNewQuestions] = useState<{ question: string; options: string }[]>([{ question: '', options: '' }]);

  useEffect(() => {
    try { setPolls(JSON.parse(localStorage.getItem('sodaroja-polls') || '[]')); } catch {}
  }, []);

  const save = (p: any[]) => { setPolls(p); localStorage.setItem('sodaroja-polls', JSON.stringify(p)); };

  const addQuestion = () => setNewQuestions([...newQuestions, { question: '', options: '' }]);
  const removeQuestion = (idx: number) => setNewQuestions(newQuestions.filter((_, i) => i !== idx));
  const updateQuestion = (idx: number, field: string, val: string) => {
    const q = [...newQuestions]; q[idx] = { ...q[idx], [field]: val }; setNewQuestions(q);
  };

  const createPoll = () => {
    if (!newTitle.trim()) return;
    const questions = newQuestions
      .filter(q => q.question.trim() && q.options.trim())
      .map(q => ({ question: q.question, options: q.options.split('\n').map((s: string) => s.trim()).filter(Boolean) }))
      .filter(q => q.options.length >= 2);
    if (questions.length === 0) return;
    save([...polls, {
      id: `poll-${Date.now()}`, title: newTitle, questions, active: true, bannerUrl: newBanner || '',
      // Backwards compat: question = title, options = first question's options
      question: newTitle, options: questions[0].options,
    }]);
    setNewTitle(''); setNewBanner(''); setNewQuestions([{ question: '', options: '' }]);
  };

  const toggle = (id: string) => save(polls.map((p: any) => p.id === id ? { ...p, active: !p.active } : p));
  const remove = (id: string) => save(polls.filter((p: any) => p.id !== id));

  const allVotes = (() => { try { return JSON.parse(localStorage.getItem('sodaroja-poll-votes') || '{}'); } catch { return {}; } })();

  return (
    <div className="space-y-4">
      <p className="text-soda-fog text-[11px]">📐 Banner: <span className="text-soda-lamp">800 × 200 px</span> · Cada encuesta puede tener múltiples preguntas (ej: 10 categorías del Oscar)</p>

      {/* Crear nueva encuesta */}
      <div className="border border-soda-accent/20 rounded-sm p-4 space-y-3">
        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} className={ic} placeholder="Título de la encuesta (ej: Premios Oscar 2026)" />
        <input type="text" value={newBanner} onChange={e => setNewBanner(e.target.value)} className={ic} placeholder="URL del banner (opcional, 800×200px)" />

        <div className="space-y-3">
          {newQuestions.map((q, idx) => (
            <div key={idx} className="border border-soda-mist/10 rounded-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-soda-accent text-[11px]">Pregunta {idx + 1}</span>
                {newQuestions.length > 1 && (
                  <button onClick={() => removeQuestion(idx)} className="text-soda-fog hover:text-red-400 text-[10px]">Eliminar</button>
                )}
              </div>
              <input type="text" value={q.question} onChange={e => updateQuestion(idx, 'question', e.target.value)} className={ic + ' mb-2'} placeholder={`Pregunta (ej: Mejor Película)`} />
              <textarea value={q.options} onChange={e => updateQuestion(idx, 'options', e.target.value)} className={ic + ' resize-y text-xs'} rows={3} placeholder={'Opciones (una por línea):\nOpción 1\nOpción 2'} />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={addQuestion} className="px-3 py-1.5 border border-soda-mist/20 text-soda-fog rounded-sm text-xs hover:text-soda-lamp">+ Agregar pregunta</button>
          <button onClick={createPoll} className="px-4 py-1.5 bg-soda-accent/20 border border-soda-accent/40 text-soda-lamp rounded-sm text-xs flex items-center gap-1"><Plus size={12} />Crear encuesta</button>
        </div>
      </div>

      {/* Lista de encuestas */}
      {polls.map((p: any) => {
        const questions = p.questions || [{ question: p.question, options: p.options }];
        return (
          <div key={p.id} className="border border-soda-mist/15 rounded-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-soda-lamp text-sm font-medium">{p.title || p.question}</h4>
                <span className={`text-[10px] ${p.active ? 'text-emerald-400' : 'text-soda-fog'}`}>{p.active ? 'Activa' : 'Cerrada'} · {questions.length} pregunta{questions.length > 1 ? 's' : ''}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggle(p.id)} className="text-soda-fog hover:text-soda-lamp text-xs">{p.active ? 'Cerrar' : 'Abrir'}</button>
                <button onClick={() => remove(p.id)} className="text-soda-fog hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            {questions.map((q: any, qi: number) => {
              const votes = allVotes[`${p.id}-q${qi}`] || {};
              const total = Object.values(votes).reduce((a: number, b: any) => a + (b as number), 0) as number;
              return (
                <div key={qi} className="mb-2 last:mb-0">
                  <p className="text-soda-fog text-xs font-medium mb-1">{qi + 1}. {q.question}</p>
                  {q.options.map((opt: string, oi: number) => {
                    const count = votes[String(oi)] || 0;
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return <div key={oi} className="flex justify-between text-[11px] text-soda-fog py-0.5 pl-3"><span>{opt}</span><span>{count} ({pct}%)</span></div>;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const AdminRaffles: React.FC<{ ic: string; lc: string }> = ({ ic, lc }) => {
  const [raffles, setRaffles] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(5);
  const [newBanner, setNewBanner] = useState('');

  useEffect(() => {
    try { setRaffles(JSON.parse(localStorage.getItem('sodaroja-raffles') || '[]')); } catch {}
  }, []);

  const save = (r: any[]) => { setRaffles(r); localStorage.setItem('sodaroja-raffles', JSON.stringify(r)); };
  const add = () => {
    if (!newTitle.trim()) return;
    save([...raffles, { id: `raffle-${Date.now()}`, title: newTitle, description: newDesc, active: true, soditasCost: newCost, bannerUrl: newBanner || '' }]);
    setNewTitle(''); setNewDesc(''); setNewCost(5); setNewBanner('');
  };
  const toggle = (id: string) => save(raffles.map((r: any) => r.id === id ? { ...r, active: !r.active } : r));
  const remove = (id: string) => save(raffles.filter((r: any) => r.id !== id));

  // Ver participantes
  const entries = (() => { try { return JSON.parse(localStorage.getItem('sodaroja-raffle-entries') || '{}'); } catch { return {}; } })();

  return (
    <div className="space-y-4">
      <p className="text-soda-fog text-[11px]">📐 Tamaño del banner: <span className="text-soda-lamp">800 × 200 px</span> · Participar cuesta soditas (sin tickets)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} className={ic} placeholder="Título del sorteo" />
        <input type="text" value={newDesc} onChange={e => setNewDesc(e.target.value)} className={ic} placeholder="Descripción (qué se sortea)" />
        <input type="text" value={newBanner} onChange={e => setNewBanner(e.target.value)} className={ic} placeholder="URL del banner (opcional, 800×200px)" />
        <div className="flex gap-2">
          <input type="number" value={newCost} onChange={e => setNewCost(Number(e.target.value))} className={ic + ' w-24'} min={1} />
          <span className="text-soda-fog text-xs self-center">🥤</span>
          <button onClick={add} className="px-3 py-2 bg-soda-accent/20 border border-soda-accent/40 text-soda-lamp rounded-sm text-sm"><Plus size={14} /></button>
        </div>
      </div>
      {raffles.map((r: any) => (
        <div key={r.id} className="flex items-center justify-between border border-soda-mist/15 rounded-sm p-3">
          <div>
            <h4 className="text-soda-lamp text-sm">{r.title}</h4>
            <p className="text-soda-fog text-[10px]">{r.description} · Costo: {r.soditasCost || r.ticketCost || 5} 🥤 · {r.active ? '✅ Activo' : '⏸ Cerrado'}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toggle(r.id)} className="text-soda-fog hover:text-soda-lamp text-xs">{r.active ? 'Cerrar' : 'Abrir'}</button>
            <button onClick={() => remove(r.id)} className="text-soda-fog hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminNotifications: React.FC<{ ic: string; lc: string }> = ({ ic, lc }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState('general');

  useEffect(() => {
    try { setNotifications(JSON.parse(localStorage.getItem('sodaroja-user-notifications') || '[]')); } catch {}
  }, []);

  const save = (n: any[]) => { setNotifications(n); localStorage.setItem('sodaroja-user-notifications', JSON.stringify(n)); };

  const add = () => {
    if (!newText.trim()) return;
    save([...notifications, { id: `notif-${Date.now()}`, text: newText, type: newType, date: new Date().toISOString(), read: false }]);
    setNewText(''); setNewType('general');
  };

  const remove = (id: string) => save(notifications.filter((n: any) => n.id !== id));

  const types = [
    { value: 'general', label: '📬 General' },
    { value: 'winner', label: '🏆 Ganador de sorteo' },
    { value: 'birthday', label: '🎂 Feliz cumpleaños' },
    { value: 'payment', label: '💳 Aviso de pago' },
    { value: 'gift', label: '🎁 Regalo/Sorpresa' },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <select value={newType} onChange={e => setNewType(e.target.value)} className={ic}>
          {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input type="text" value={newText} onChange={e => setNewText(e.target.value)} className={ic + ' sm:col-span-2'} placeholder="Mensaje para el suscriptor..." />
        <button onClick={add} className="px-4 py-2 bg-soda-red/20 border border-soda-red/40 text-soda-lamp rounded-sm text-sm flex items-center gap-2"><Plus size={14} />Enviar</button>
      </div>
      <p className="text-soda-fog text-[10px]">⚠️ En producción, esto enviaría la notificación al usuario específico. Ahora se guarda en localStorage como demo.</p>
      {notifications.slice().reverse().map((n: any) => (
        <div key={n.id} className="flex items-start gap-3 border border-soda-mist/10 rounded-sm p-3">
          <span className="text-sm">{n.type === 'winner' ? '🏆' : n.type === 'birthday' ? '🎂' : n.type === 'payment' ? '💳' : n.type === 'gift' ? '🎁' : '📬'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-soda-lamp text-sm">{n.text}</p>
            <p className="text-soda-fog text-[10px] mt-1">{new Date(n.date).toLocaleDateString('es-AR')} · {n.read ? 'Leído' : 'No leído'}</p>
          </div>
          <button onClick={() => remove(n.id)} className="text-soda-fog hover:text-red-400"><Trash2 size={14} /></button>
        </div>
      ))}
    </div>
  );
};

const AdminMissions: React.FC<{ ic: string; lc: string }> = ({ ic, lc }) => {
  const defaultMissions = [
    { id: 'listen-1', label: 'Escuchar primer episodio', soditas: 3, type: 'auto' },
    { id: 'listen-5', label: 'Escuchar 5 episodios', soditas: 8, type: 'auto' },
    { id: 'listen-10', label: 'Escuchar 10 episodios', soditas: 15, type: 'auto' },
    { id: 'follow-ig', label: 'Seguinos en Instagram', soditas: 5, type: 'social' },
    { id: 'follow-yt', label: 'Suscribite en YouTube', soditas: 5, type: 'social' },
    { id: 'follow-tw', label: 'Seguinos en X (Twitter)', soditas: 5, type: 'social' },
    { id: 'streak-3', label: '3 meses consecutivos', soditas: 10, type: 'auto' },
    { id: 'streak-6', label: '6 meses consecutivos', soditas: 25, type: 'auto' },
    { id: 'poll-vote', label: 'Votar en una encuesta', soditas: 3, type: 'recurring' },
    { id: 'early-bird', label: 'Primero en escuchar episodio nuevo', soditas: 5, type: 'auto' },
  ];
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    const saved = (() => { try { return JSON.parse(localStorage.getItem('sodaroja-missions-config') || 'null'); } catch { return null; } })();
    setMissions(saved || defaultMissions);
  }, []);

  const save = (m: any[]) => { setMissions(m); localStorage.setItem('sodaroja-missions-config', JSON.stringify(m)); };
  const updateMission = (idx: number, field: string, val: any) => {
    const m = [...missions]; m[idx] = { ...m[idx], [field]: val }; save(m);
  };
  const addMission = () => save([...missions, { id: `mission-${Date.now()}`, label: 'Nueva misión', soditas: 5, type: 'social' }]);
  const removeMission = (idx: number) => save(missions.filter((_: any, i: number) => i !== idx));

  return (
    <div className="space-y-2">
      {missions.map((m: any, idx: number) => (
        <div key={m.id} className="grid grid-cols-12 gap-2 items-center border border-soda-mist/10 rounded-sm p-2">
          <input type="text" value={m.label} onChange={e => updateMission(idx, 'label', e.target.value)} className={ic + ' col-span-5 text-xs'} />
          <input type="number" value={m.soditas} onChange={e => updateMission(idx, 'soditas', Number(e.target.value))} className={ic + ' col-span-2 text-xs'} min={1} />
          <select value={m.type} onChange={e => updateMission(idx, 'type', e.target.value)} className={ic + ' col-span-3 text-xs'}>
            <option value="auto">Automática</option>
            <option value="social">Redes sociales</option>
            <option value="recurring">Recurrente</option>
          </select>
          <button onClick={() => removeMission(idx)} className="col-span-2 text-soda-fog hover:text-red-400 text-center"><Trash2 size={12} /></button>
        </div>
      ))}
      <button onClick={addMission} className="px-3 py-1.5 border border-soda-mist/20 text-soda-fog rounded-sm text-xs hover:text-soda-lamp flex items-center gap-1"><Plus size={12} />Agregar misión</button>
    </div>
  );
};
