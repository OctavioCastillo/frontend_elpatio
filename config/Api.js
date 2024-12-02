import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://elpatio-backend.onrender.com', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para incluir el token en las peticiones
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Obtiene el token desde AsyncStorage
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; // Incluye el token en las cabeceras
            }
        } catch (error) {
            console.error('Error obteniendo el token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
