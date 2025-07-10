'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { toast } from 'react-toastify';
import { Container, Box, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string().required('Requerido'),
});

export default function LoginPage() {
    const { login } = useAuth();

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const { token } = await loginUser(values);
                            login(token);
                        } catch {
                            toast.error('Credenciales incorrectas.');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field as={TextField} name="email" label="Email" fullWidth margin="normal" error={touched.email && !!errors.email} helperText={<ErrorMessage name="email" />} />
                            <Field as={TextField} name="password" label="Contraseña" type="password" fullWidth margin="normal" error={touched.password && !!errors.password} helperText={<ErrorMessage name="password" />} />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <MuiLink component={Link} href="/register" variant="body2">
                                        Regístrate
                                    </MuiLink>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}