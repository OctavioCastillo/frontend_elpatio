import api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login de Usuario
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { access_token } = response.data;
        await AsyncStorage.setItem('token', access_token);

        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Error en el login:', error.response.data);
        } else {
            console.error('Error en el login:', error.message);
        }
        throw error; 
    }
};

// Obtener datos del perfil del usuario
export const getData = async () => {
    try {
        const response = await api.get('/perfil');

        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta del servidor:', error.response.data);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
        throw error;
    }

};

// Obtener lista de cupones
export const getCupones = async () => {
    try {
        const response = await api.get('/obtener_cupones');
        const cupones = response.data; 
        return cupones; 
    } catch (error) {
        if (error.response) {
            console.error('Error al obtener los cupones:', error.response.data);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
        throw error; 
    }
};

// Registro de Usuario
export const registerUser = async (email, username, password) => {
    try {
        const response = await api.post('/register', {
            email,
            username,
            password,
        });

        // Asumiendo que la respuesta contiene algún mensaje de éxito o datos útiles
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error en el registro:', error.response.data);
        } else {
            console.error('Error en la solicitud:', error.message);
        }
        throw error;
    }
};

export const agregar_puntos = async (token, puntos) => {
    try {
      const response = await api.put('/agregar_puntos',
        { puntos },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json', 
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error al agregar puntos:', error.response?.data || error.message);
      throw error;
    }
  };