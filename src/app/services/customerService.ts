import api from './api';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../types';

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await api.get('/customers');
  return data;
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await api.get(`/customers/${id}`);
  return data;
};

export const createCustomer = async (customerData: CreateCustomerDto): Promise<Customer> => {
  const { data } = await api.post('/customers', customerData);
  return data;
};

export const updateCustomer = async (id: string, customerData: Omit<UpdateCustomerDto, 'id'>): Promise<void> => {
  await api.put(`/customers/${id}`, customerData);
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await api.delete(`/customers/${id}`);
};