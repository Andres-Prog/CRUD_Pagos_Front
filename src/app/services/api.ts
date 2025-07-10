import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor de Peticiones (para añadir el token) ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Ocurrió un error inesperado.';

    if (axios.isAxiosError(error) && error.response) {
      // Mapeamos los códigos de estado a mensajes amigables
      switch (error.response.status) {
        case 400: // Bad Request
          errorMessage = 'Datos inválidos. Por favor, revisa la información enviada.';
          break;
        case 401: // Unauthorized
          errorMessage = 'No estás autorizado para realizar esta acción.';
          break;
        case 404: // Not Found
          errorMessage = 'El recurso solicitado no fue encontrado.';
          break;
        case 409: // Conflict
          errorMessage = error.response.data?.error || 'El recurso ya existe o hay un conflicto.';
          break;
        case 500: // Internal Server Error
          errorMessage = 'Ocurrió un error en el servidor. Por favor, inténtalo más tarde.';
          break;
      }
    } else if (error.request) {
      // Default
      errorMessage = 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
    }
    
    // Mostramos el error en un toast para el usuario
    toast.error(errorMessage);

    // Rechazamos la promesa para que el .catch() en el componente se active si es necesario
    return Promise.reject(error);
  }
);

export default api;