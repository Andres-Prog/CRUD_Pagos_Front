'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
    const { logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CRUD Pagos
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Cerrar Sesión
                </Button>
            </Toolbar>
        </AppBar>
    );
}