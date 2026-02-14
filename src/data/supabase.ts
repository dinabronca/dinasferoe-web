/// <reference types="vite/client" />
// ============================================================
// SUPABASE CLIENT — Activar cuando se configure el proyecto
// ============================================================
// Para activar:
// 1. Crear proyecto en supabase.com
// 2. Copiar URL y anon key al .env
// 3. npm install @supabase/supabase-js
// 4. Descomentar el código de abajo
// 5. En config.ts, cambiar useLocalStorage a false
// ============================================================

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========== AUTH ==========
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// ========== CONTENT ==========
export const getContentFromDB = async () => {
  const { data } = await supabase.from('site_content').select('*').single();
  return data?.content || null;
};

export const saveContentToDB = async (content: any) => {
  const { error } = await supabase.from('site_content').upsert({ id: 1, content });
  return { error };
};

// ========== USERS / SUBSCRIPTIONS ==========
export const getUserProfile = async (userId: string) => {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single();
  return data;
};

export const updateUserProfile = async (userId: string, profile: any) => {
  const { error } = await supabase.from('users').update(profile).eq('id', userId);
  return { error };
};

export const checkSubscription = async (userId: string) => {
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();
  return !!data;
};

// ========== STORAGE (imagenes) ==========
export const uploadImage = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) return { url: null, error };
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: urlData.publicUrl, error: null };
};
*/

// ========== SQL PARA CREAR LAS TABLAS ==========
// Ejecutar en el SQL Editor de Supabase:
/*
-- Contenido del sitio
CREATE TABLE site_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usuarios
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  member_number TEXT UNIQUE,
  photo_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  profile JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suscripciones
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  plan TEXT NOT NULL, -- 'mensual', 'anual'
  status TEXT NOT NULL, -- 'active', 'cancelled', 'expired'
  payment_provider TEXT, -- 'mercadopago', 'stripe', 'paypal'
  payment_id TEXT,
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'ARS',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Episodios (opcional — se puede mantener en site_content)
CREATE TABLE episodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  publish_date DATE,
  links JSONB DEFAULT '{}',
  embeds JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can read content" ON site_content FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Users can read own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
*/

// Placeholder export para que no de error de modulo vacio
export const SUPABASE_READY = false;
