import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../RegisterForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { registerUser } from '../../../services/authService';

// Mock de los módulos externos
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify');
jest.mock('@/services/authService');

describe('RegisterForm', () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    //mock antes de cada prueba
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    // Limpiar mocks antes de cada prueba
    (registerUser as jest.Mock).mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  it('renderizar el formulario correctamente', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('mostrar errores de validación', async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // Esperamos a que aparezcan los mensajes de error
    expect(await screen.findByText('El nombre es requerido')).toBeInTheDocument();
    expect(await screen.findByText('El email es requerido')).toBeInTheDocument();
    expect(await screen.findByText('La contraseña es requerida')).toBeInTheDocument();
  });

  it('Llamar a registerUser y redirigir al login si el registro es exitoso', async () => {
    // Configura el mock de la API para que la promesa se resuelva (éxito)
    (registerUser as jest.Mock).mockResolvedValue(undefined);

    render(<RegisterForm />);

    // Simula que el usuario llena el formulario
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    
    // Simula el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    //Espero el asincronismo
    await waitFor(() => {
      // Valido que se llamó a la API con los datos correctos
      expect(registerUser).toHaveBeenCalledWith({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(toast.success).toHaveBeenCalledWith('Registro exitoso! Inisia sesión para continuar');
      expect(mockRouterPush).toHaveBeenCalledWith('/login');
    });
  });

  it('Error inesperado', async () => {
    // Mockeo el codigo de error
    const apiError = { response: { status: 409 } };
    (registerUser as jest.Mock).mockRejectedValue(apiError);

    render(<RegisterForm />);

    // Lleno los campos requeridos
    fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'duplicado@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    
    // Submit formulario
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // Esperamos y verificamos que se muestre el toast de error correcto
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Ocurrió un error inesperado.');
    });
  });
});