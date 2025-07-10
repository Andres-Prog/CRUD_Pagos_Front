import api from './api';
import { Payment, CreatePaymentDto, UpdatePaymentDto } from '../types';

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await api.get('/payments');
  return data;
};

export const getPaymentById = async (id: string): Promise<Payment> => {
  const { data } = await api.get(`/payments/${id}`);
  return data;
};

export const createPayment = async (payment: CreatePaymentDto): Promise<Payment> => {
  const { data } = await api.post('/payments', payment);
  return data;
};

export const updatePayment = async (id: string, status: 'Pending' | 'Completed' | 'Failed'): Promise<void> => {
  const updateDto: UpdatePaymentDto = { id, status };
  await api.put(`/payments/${id}`, updateDto);
};

export const deletePayment = async (id: string): Promise<void> => {
  await api.delete(`/payments/${id}`);
};