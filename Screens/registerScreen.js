import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de instalar esta librería
import colors from '../config/colors';

function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        // Redirigir al usuario a la pantalla de inicio de sesión
        navigation.navigate('Login');
    };

    return (
        <ImageBackground
            source={require('../assets/register.jpg')}
            style={styles.background}
        >
            {/* Flecha para volver */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Welcome')} // Cambiar al nombre registrado
            >
                <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.title}>Registrarse</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Listo</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 40, // Ajusta según sea necesario para iOS/Android
        left: 20,
        zIndex: 10, // Asegúrate de que esté encima del fondo
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 15,
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#444',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: colors.light,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;