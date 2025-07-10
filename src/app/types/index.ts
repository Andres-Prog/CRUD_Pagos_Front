// Defino los tipos
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Completed' | 'Failed';
  customerEmail: string;
  reference: string;
  paymentDate: string;
}

export interface Column<T> {
  id: keyof T | 'actions'; // El 'id' puede ser una propiedad del objeto o la columna de acciones
  label: string;
  // Función opcional para formatear el valor de la celda
  //La propiedad render permite pasar una función personalizada para una columna(no es obligatorio ?)
  render?: (item: T) => React.ReactNode;
}

// Interfaz para el componente de tabla dinámica
export interface DynamicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

// Interfaz para las credenciales
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
}

//Tipos para Payments
export type CreatePaymentDto = Omit<Payment, 'id' | 'status' | 'paymentDate'>;
export type UpdatePaymentDto = Pick<Payment, 'id' | 'status'>;

//Tipos para Customers
export type CreateCustomerDto = Omit<Customer, 'id' | 'createdAt'>;
export type UpdateCustomerDto = Pick<Customer, 'id' | 'fullName' | 'email'>;