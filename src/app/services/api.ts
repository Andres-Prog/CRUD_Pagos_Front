import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Interceptor de Peticiones para añadir el token
api.interceptors.request.use(
  (config) => {
    // verificar localStorage puede no estar disponible en el servidor
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('No se pudo acceder a localStorage:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Respuestas con manejo de 401
// Se implementa ya que luego de un tiempo el token quedaa obsoleto y la consultas al back daban 401
api.interceptors.response.use(
  // La primera función se ejecuta si la respuesta es exitosa
  (response) => response,
  // La segunda función se ejecuta si la respuesta falla
  (error) => {
    let errorMessage = 'Ocurrió un error inesperado.';

    if (axios.isAxiosError(error) && error.response) {
      // Manejo específico para el error 401
      if (error.response.status === 401) {
        // El token es inválido o ha expirado.
        toast.error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        
        // Limpiamos el token del localStorage.
        localStorage.removeItem('authToken');
        
        // Redirigimos al usuario a la página de login.
        // Usamos window.location para forzar una recarga completa y limpiar cualquier estado.
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        // Devolvemos una promesa rechazada para detener la ejecución del código original.
        return Promise.reject(new Error('Sesión expirada'));
      }

      // Mapeo los códigos de estado a mensajes custom
      switch (error.response.status) {
        case 400:
          errorMessage = 'Datos inválidos. Por favor, revisa la información enviada.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no fue encontrado.';
          break;
        case 409:
          errorMessage = error.response.data?.error || 'El recurso ya existe o hay un conflicto.';
          break;
        case 500:
          errorMessage = 'Ocurrió un error en el servidor. Por favor, inténtalo más tarde.';
          break;
      }
    } else if (error.request) {
      errorMessage = 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
    }
    
    // Mostramos el toast de error para los demás casos
    toast.error(errorMessage);

    // Rechazamos la promesa
    return Promise.reject(error);
  }
);

export default api;