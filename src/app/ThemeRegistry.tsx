'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import { useMemo } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    // Detecta si el sistema operativo del usuario prefiere el modo oscuro
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Memoizamos el tema para que no se recalcule en cada renderizado
    //   const theme = useMemo(
    //     () => getTheme(prefersDarkMode ? 'dark' : 'light'),
    //     [prefersDarkMode],
    //   );

    //quiero dejarlo en light
    const theme = useMemo(
        () => getTheme('light'),
        [],
    );

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline normaliza los estilos y aplica el color de fondo del tema */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}