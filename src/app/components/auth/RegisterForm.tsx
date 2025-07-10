'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { registerUser } from '../../services/authService';
import { RegisterCredentials } from '../../types';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
});

export default function RegisterForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await registerUser(values as RegisterCredentials);
          toast.success('Registro exitoso! Inisia sesión para continuar');
          router.push('/login');
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('Ocurrió un error inesperado.');
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field as={TextField} name="fullName" label="Nombre Completo" fullWidth margin="normal" error={touched.fullName && !!errors.fullName} helperText={<ErrorMessage name="fullName" />} />
          <Field as={TextField} name="email" label="Email" type="email" fullWidth margin="normal" error={touched.email && !!errors.email} helperText={<ErrorMessage name="email" />} />
          <Field as={TextField} name="password" label="Contraseña" type="password" fullWidth margin="normal" error={touched.password && !!errors.password} helperText={<ErrorMessage name="password" />} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}