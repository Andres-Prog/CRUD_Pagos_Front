'use client';

import { Container, Box, Typography, Link as MuiLink } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Crear Cuenta
        </Typography>
        <RegisterForm />
        <MuiLink component={Link} href="/login" variant="body2">
          ¿Tenes cuenta? Inicia sesión
        </MuiLink>
      </Box>
    </Container>
  );
}
