'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Customer } from '../../types';
import {
  Button,
  TextField,
  Box,
  Typography,
  Link
} from '@mui/material';
import { toast } from 'react-toastify';
import { getCustomerById, updateCustomer } from '../../services/customerService';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/app/components/common/spinner';


const UpdateCustomerSchema = Yup.object().shape({
  fullName: Yup.string()
    .max(200, 'El nombre no debe exceder los 200 caracteres.')
    .required('El nombre completo es requerido.'),
  email: Yup.string()
    .email('Debe ser un email válido.')
    .required('El email es requerido.'),
});

export default function UpdateCustomerForm() {

  const searchParams = useSearchParams();
  const customerId = searchParams.get('id');
  const router = useRouter();
  const [initialCustomerData, setInitialCustomerData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook para buscar los datos iniciales del cliente
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        const data = await getCustomerById(customerId!);
        setInitialCustomerData(data);
      } catch {
        setError('No se pudieron cargar los detalles del cliente.');
        toast.error('No se pudieron cargar los detalles del cliente.');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  if (loading) return <Spinner />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!initialCustomerData) return <Typography>Cliente no encontrado.</Typography>;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fullName: initialCustomerData.fullName,
        email: initialCustomerData.email,
        id: initialCustomerData.id
      }}
      validationSchema={UpdateCustomerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateCustomer(customerId!, values);
          toast.success('Cliente actualizado con exito');
          router.push('/');
        } catch {
          toast.error('No se pudo actualizar el cliente.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField label="ID del Cliente" value={initialCustomerData.id} disabled fullWidth />

            <Field
              name="fullName"
              as={TextField}
              label="Nombre Completo"
              error={touched.fullName && !!errors.fullName}
              helperText={<ErrorMessage name="fullName" />}
              fullWidth
            />

            <Field
              name="email"
              as={TextField}
              type="email"
              label="Email"
              error={touched.email && !!errors.email}
              helperText={<ErrorMessage name="email" />}
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Actualizando...' : 'Actualizar Cliente'}
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