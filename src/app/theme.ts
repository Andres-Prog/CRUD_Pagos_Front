'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles'; // Importar responsiveFontSizes
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const getTheme = (mode: 'light' | 'dark') => {
    let theme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // --- Paleta para el modo claro ---
                    primary: {
                        main: '#1976d2', // Azul primario
                    },
                    secondary: {
                        main: '#dc004e', // Rosa secundario
                    },
                    background: {
                        default: '#f4f6f8', // Fondo gris claro
                        paper: '#ffffff',   // Fondo de los componentes como Paper, Card, etc.
                    },
                }
                : {
                    // --- Paleta para el modo oscuro ---
                    primary: {
                        main: '#90caf9', // Azul más claro para contraste
                    },
                    secondary: {
                        main: '#f48fb1', // Rosa más claro
                    },
                    background: {
                        default: '#121212', // Fondo oscuro estándar
                        paper: '#1e1e1e',   // Fondo de componentes ligeramente más claro
                    },
                }),
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
    });
    // Ajusta automáticamente los tamaños de fuente
    // basados en el ancho de la pantalla.
    theme = responsiveFontSizes(theme);

    return theme;
};

export default getTheme;