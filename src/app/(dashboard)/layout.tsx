'use client';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '../components/common/spinner';
import Header from '../components/layout/Header';
import { Box } from '@mui/material';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth(); //Estado de Auth
  const router = useRouter();

  useEffect(() => {
    // Voy al login si la carga ha terminado y el usuario no esta autenticado
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Mostramos un spinner mientras se verifica el auth
  if (loading) {
    return <Spinner />;
  }

  // Si está autenticado, muestra el contenido. Si no, el useEffect ya está redirigiendo.
  if (isAuthenticated) {
    return (
      <Box>
        <Header />
        <main>{children}</main>
      </Box>
    );
  }

  // Muestra un spinner mientras se completa la redirección para evitar errores de vista
  return <Spinner />;
}