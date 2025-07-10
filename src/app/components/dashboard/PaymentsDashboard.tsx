'use client';

import { useEffect, useState } from 'react';
import { getPayments, deletePayment } from '../../services/paymentService';
import { Column, Payment } from '../../types';
import { Container, Typography, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import Spinner from '../../components/common/spinner';
import ConfirmationModal from '@/app/components/common/ConfirmationModal';
import { useRouter } from 'next/navigation';
import DynamicTable from '@/app/components/common/DynamicTable';

export default function PaymentsDashboard() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);

  const columns: Column<Payment>[] = [
    { id: 'reference', label: 'Referencia' },
    {
      id: 'amount',
      label: 'Monto',
      render: (item) => `${item.amount.toFixed(2)} ${item.currency}`,
    },
    { id: 'status', label: 'Estado' },
    {
      id: 'paymentDate',
      label: 'Fecha de Pago',
      render: (item) => new Date(item.paymentDate).toLocaleDateString(),
    },
    { id: 'actions', label: 'Acciones' },
  ];

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await getPayments();
      setPayments(data);
    } catch {
      setError('No se pudieron obtener los pagos.');
      toast.error('Error al obtener los pagos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDeleteClick = (payment: Payment) => {
    setPaymentToDelete(payment);
    setModalOpen(true);
  };

  const handleEditClick = (payment: Payment) => {
    router.push(`/payments/update?id=${payment.id}`);
  };

  const handleConfirmDelete = async () => {
    if (paymentToDelete) {
      try {
        await deletePayment(paymentToDelete.id);
        toast.success('¡Pago eliminado con éxito!');
        setPayments(payments.filter((p) => p.id !== paymentToDelete.id));
      } catch {
        toast.error('Error al eliminar el pago.');
      } finally {
        setModalOpen(false);
        setPaymentToDelete(null);
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => router.push('/payments/new')}>
          Crear Pago
        </Button>
      </Box>
      <DynamicTable<Payment>
        data={payments}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        description={`¿Seguro que desea eliminar el pago con referencia "${paymentToDelete?.reference}"?`}
      />
    </Container>
  );
}