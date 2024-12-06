import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg'; // Importar QRCode para generar el código QR
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para obtener el token
import { getData } from '../config/authService'; // Importa tu función getData

function NavBar({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [qrValue, setQrValue] = useState('');

    // Función para obtener los datos del usuario y generar el QR con el token incluido
    const handleGenerateQR = async () => {
        try {
            // Obtiene los datos del perfil del usuario
            const data = await getData(); 

            // Obtiene el token desde AsyncStorage
            const token = await AsyncStorage.getItem('token');

            // Combina los datos del usuario con el token
            const qrData = {
                ...data.Usuario,
                token: token || 'Token no disponible', // Incluye el token, o un mensaje si no está disponible
            };

            // Establece el valor para el código QR
            setQrValue(JSON.stringify(qrData));

            // Muestra el modal
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'No se pudo generar el código QR. Inténtalo más tarde.');
        }
    };

    return (
        <View style={styles.navBar}>
            {/* Botón para HomeScreen */}
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={24} color="#fff" />
                <Text style={styles.navText}>Inicio</Text>
            </TouchableOpacity>

            {/* Botón para CuponesScreen */}
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cupones')}>
                <Icon name="pricetag" size={24} color="#fff" />
                <Text style={styles.navText}>Cupones</Text>
            </TouchableOpacity>

            {/* Botón para abrir el código QR */}
            <TouchableOpacity style={styles.navButton} onPress={handleGenerateQR}>
                <Icon name="qr-code" size={24} color="#fff" />
                <Text style={styles.navText}>Mi QR</Text>
            </TouchableOpacity>

            {/* Modal para mostrar el código QR */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)} // Cierra el modal al presionar "Atrás"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Tu Código QR</Text>
                        {qrValue ? (
                            <QRCode value={qrValue} size={200} />
                        ) : (
                            <Text style={styles.errorText}>No se pudo generar el código QR</Text>
                        )}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#333',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    },
});

export default NavBar;
