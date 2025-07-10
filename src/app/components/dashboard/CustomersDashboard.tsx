'use client';

import { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { Column, Customer } from '../../types';
import { Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Spinner from '../../components/common/spinner';
import ConfirmationModal from '@/app/components/common/ConfirmationModal';
import { useRouter } from 'next/navigation';
import DynamicTable from '@/app/components/common/DynamicTable';

export default function CustomersDashboard() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

    const columns: Column<Customer>[] = [
        { id: 'fullName', label: 'Nombre Completo' },
        { id: 'email', label: 'Email' },
        { id: 'actions', label: 'Acciones' },
    ];

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getCustomers();
            setCustomers(data);
        } catch {
            setError('No se pudieron obtener los clientes.');
            toast.error('Error al obtener los clientes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDeleteClick = (customer: Customer) => {
        setCustomerToDelete(customer);
        setModalOpen(true);
    };

    const handleEditClick = (customer: Customer) => {
        router.push(`/customers/update?id=${customer.id}`);
    };

    const handleConfirmDelete = async () => {
        if (customerToDelete) {
            try {
                await deleteCustomer(customerToDelete.id);
                toast.success('¡Cliente eliminado con éxito!');
                setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
            } catch {
                toast.error('Error al eliminar el cliente.');
            } finally {
                setModalOpen(false);
                setCustomerToDelete(null);
            }
        }
    };

    if (loading) return <Spinner />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => router.push('/customers/new')}>
                    Crear Cliente
                </Button>
            </Box> */}
            <DynamicTable<Customer>
                data={customers}
                columns={columns}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
            <ConfirmationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar eliminación"
                description={`¿Seguro que desea eliminar a ${customerToDelete?.fullName}?`}
            />
        </Container>
    );
}