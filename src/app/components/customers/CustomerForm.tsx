'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreateCustomerDto } from '../../types';
import { Button, TextField, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { createCustomer } from '../../services/customerService';
import { useRouter } from 'next/navigation';

// Esquema de validación para el formulario de creación de clientes
const CustomerSchema = Yup.object().shape({
  fullName: Yup.string()
    .max(200, 'El nombre no debe exceder los 200 caracteres.')
    .required('El nombre completo es requerido.'),
  email: Yup.string()
    .email('Debe ser un email válido.')
    .required('El email es requerido.'),
});

export default function CustomerForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
      }}
      validationSchema={CustomerSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createCustomer(values as CreateCustomerDto);
          toast.success('¡Cliente creado con éxito!');
          resetForm();
          router.push('/?tab=customers');
        } catch {
          //catch para detener la lógica en caso de error.
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
              {isSubmitting ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
            <Button type="reset" variant="outlined" onClick={() => router.push('/')}>
              Cancelar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}