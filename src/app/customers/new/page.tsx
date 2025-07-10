import CustomerForm from '@/app/components/customers/CustomerForm';
import { Container, Typography } from '@mui/material';

export default function NewPaymentPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nuevo Cliente
      </Typography>
      <CustomerForm />
    </Container>
  );
}