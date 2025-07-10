import api from './api';
import { LoginCredentials, LoginResponse, RegisterCredentials } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<void> => {
  await api.post('/auth/register', credentials);
};