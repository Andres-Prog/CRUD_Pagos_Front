'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  loading: boolean; //Verificando el estado inicial
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- Inicia en true
  const router = useRouter();

  useEffect(() => {
    try {
      // Al cargar la app, intenta leer el token de localStorage
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("No se pudo acceder a localStorage", error);
    } finally {
      // Termina la carga después de verificar, independientemente del resultado
      setLoading(false); 
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    router.push('/'); // Redirige al dashboard después del login
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const value = {
    token,
    loading, //Estado de carga
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Error en useAuth');
  }
  return context;
}