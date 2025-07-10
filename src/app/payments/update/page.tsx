'use client';

import UpdatePaymentForm from '../../components/payments/updatePaymentForm';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function UpdatePaymentPage() {

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button component={Link} href="/" startIcon={<ArrowBackIcon />}>
                Volver a Pagos
            </Button>
        </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Actualizar Estado de Pago
      </Typography>
      <UpdatePaymentForm />
    </Container>
  );
}