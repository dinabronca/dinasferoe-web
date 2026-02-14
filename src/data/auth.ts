// Cuentas de prueba pre-creadas
// Se cargan la primera vez que se accede a la web

export interface DemoUser {
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  isPremium: boolean;
  memberNumber?: string;
  createdAt: string;
}

const generateMemberNumber = (): string => {
  const vowels = 'AEIOU';
  const v1 = vowels[Math.floor(Math.random() * 5)];
  const v2 = vowels[Math.floor(Math.random() * 5)];
  const nums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  return `${v1}${v2}-${nums}`;
};

export const demoUsers: DemoUser[] = [
  {
    name: 'Mikasa Ackerman',
    email: 'premium@sodaroja.com',
    password: 'sodaroja1',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    isPremium: true,
    memberNumber: generateMemberNumber(),
    createdAt: '2025-10-01T00:00:00.000Z',
  },
  {
    name: 'Eren Jaeger',
    email: 'user@sodaroja.com',
    password: 'sodaroja2',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    isPremium: false,
    createdAt: '2025-12-15T00:00:00.000Z',
  },
];

export const initDemoUsers = () => {
  // Siempre re-crear las cuentas demo para aplicar actualizaciones
  const db = JSON.parse(localStorage.getItem('sodaroja-users-db') || '[]') as DemoUser[];
  const hasDemo = db.some(u => u.email === 'premium@sodaroja.com');
  if (!hasDemo) {
    const merged = [...db, ...demoUsers];
    localStorage.setItem('sodaroja-users-db', JSON.stringify(merged));
  }
};

export const findUser = (email: string, password: string): DemoUser | null => {
  try {
    const db = JSON.parse(localStorage.getItem('sodaroja-users-db') || '[]') as DemoUser[];
    return db.find(u => u.email === email && u.password === password) || null;
  } catch {
    return null;
  }
};

export const registerUser = (name: string, email: string, password: string, photoUrl: string): DemoUser => {
  const db = JSON.parse(localStorage.getItem('sodaroja-users-db') || '[]') as DemoUser[];
  const newUser: DemoUser = {
    name,
    email,
    password,
    photoUrl,
    isPremium: false,
    createdAt: new Date().toISOString(),
  };
  db.push(newUser);
  localStorage.setItem('sodaroja-users-db', JSON.stringify(db));
  return newUser;
};

export const getCurrentUser = (): DemoUser | null => {
  try {
    const stored = localStorage.getItem('sodaroja-user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const loginUser = (user: DemoUser) => {
  localStorage.setItem('sodaroja-user', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('sodaroja-user');
};
