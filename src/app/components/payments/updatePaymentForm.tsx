'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Payment } from '../../types';
import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link
} from '@mui/material';
import { toast } from 'react-toastify';
import { getPaymentById, updatePayment } from '../../services/paymentService';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '../../components/common/spinner';

// Validacion yup formik
const UpdatePaymentSchema = Yup.object().shape({
  status: Yup.string()
    .oneOf(['Pending', 'Completed', 'Failed'], 'Estado no válido')
    .required('El estado es requerido'),
});

export default function UpdatePaymentForm() {

  const searchParams = useSearchParams();
  const paymentId = searchParams.get('id');
  const router = useRouter();
  const [initialPaymentData, setInitialPaymentData] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook para buscar los datos iniciales del pago
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const data = await getPaymentById(paymentId!);
        setInitialPaymentData(data);
      } catch {
        setError('No se pudieron cargar los detalles del pago.');
        toast.error('No se pudieron cargar los detalles del pago.');
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchPaymentDetails();
    }
  }, [paymentId]);

  // Muestra un spinner mientras se cargan los datos
  if (loading) {
    return <Spinner />;
  }

  // Muestra un mensaje de error si la carga falla
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Muestra un mensaje si no se encuentra el pago
  if (!initialPaymentData) {
    return <Typography>Pago no encontrado.</Typography>;
  }

  return (
    <Formik
      // Habilita la reinicialización para que el formulario se actualice con los datos cargados
      enableReinitialize
      initialValues={{
        status: initialPaymentData.status,
      }}
      validationSchema={UpdatePaymentSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updatePayment(paymentId!, values.status as 'Pending' | 'Completed' | 'Failed');
          toast.success('¡Estado del pago actualizado con éxito!');
          router.push('/');
        } catch {
          toast.error('No se pudo actualizar el estado del pago.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Campos no editables que muestran la información del pago */}
            <TextField label="ID del Pago" value={initialPaymentData.id} disabled fullWidth />
            <TextField label="Monto" value={`${initialPaymentData.amount} ${initialPaymentData.currency}`} disabled fullWidth />
            <TextField label="Referencia" value={initialPaymentData.reference} disabled fullWidth />

            {/* Campo editable para el estado del pago */}
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Estado</InputLabel>
              <Field
                as={Select}
                name="status"
                labelId="status-select-label"
                label="Estado"
              >
                <MenuItem value="Pending">Pendiente</MenuItem>
                <MenuItem value="Completed">Completado</MenuItem>
                <MenuItem value="Failed">Fallido</MenuItem>
              </Field>
            </FormControl>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Actualizar Estado
            </Button>
            <Button component={Link} href="/" type="reset" variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}