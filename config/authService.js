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
