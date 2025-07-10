import PaymentForm from '@/app/components/payments/PaymentForm';
import { Container, Typography } from '@mui/material';

export default function NewPaymentPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nuevo Pago
      </Typography>
      <PaymentForm />
    </Container>
  );
}