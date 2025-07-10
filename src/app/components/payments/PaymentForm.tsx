'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreatePaymentDto } from '../../types';
import { Button, TextField, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { createPayment } from '../../services/paymentService';
import { useRouter } from 'next/navigation';

const PaymentSchema = Yup.object().shape({
  amount: Yup.number().positive('El monto debe ser positivo').required('El monto es requerido'),
  currency: Yup.string().length(3, 'Debe ser 3 caracteres, como USD o ARS').required('La Moneda es requerida'),
  reference: Yup.string().required('El concepto es requerido'),
  customerEmail: Yup.string().email('Must be a valid email').required('El email es requerido'),
});

export default function PaymentForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        amount: 0,
        currency: 'ARS',
        reference: '',
        customerEmail: '',
      }}
      validationSchema={PaymentSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createPayment(values as CreatePaymentDto);
          toast.success('El pago se peoceso con Exito!');
          router.push('/');
        } catch {
          toast.error('Error al procesar el pago.');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field
              name="amount"
              as={TextField}
              type="number"
              label="Monto"
              error={touched.amount && !!errors.amount}
              helperText={<ErrorMessage name="amount" />}
            />
            <Field
              name="currency"
              as={TextField}
              label="Moneda"
              error={touched.currency && !!errors.currency}
              helperText={<ErrorMessage name="currency" />}
            />
            <Field
              name="reference"
              as={TextField}
              label="Concepto"
              error={touched.reference && !!errors.reference}
              helperText={<ErrorMessage name="reference" />}
            />
            <Field
              name="customerEmail"
              as={TextField}
              label="Email"
              error={touched.customerEmail && !!errors.customerEmail}
              helperText={<ErrorMessage name="customerEmail" />}
            />
            <Button type="submit" variant="contained">
              Guardar
            </Button>
            <Button type="reset" variant="outlined" onClick={() => router.push('/')}>
              cancelar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}