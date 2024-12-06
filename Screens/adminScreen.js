import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import ScannerButton from '../components/ScannerButton';
import { agregar_puntos } from '../config/authService';

function AdminScreen({ route, navigation }) {
  const [puntos, setPuntos] = useState('');
  const [qrData, setQrData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (route.params?.qrData) {
      setQrData(route.params.qrData); // Establecer los datos del QR
      setButtonDisabled(false); // Habilita el botón al recibir datos
    }
  }, [route.params]);

  const handleAgregarPuntos = async () => {
    if (!puntos || isNaN(puntos)) {
      Alert.alert('Error', 'Por favor, ingresa un valor numérico válido.');
      return;
    }

    try {
      const response = await agregar_puntos(qrData.token, puntos); // Llamada a la API para agregar puntos
      // Cambiar 'response.puntos' a 'response.nuevos_puntos' para acceder al valor correcto
      Alert.alert('Éxito', `Puntos agregados: ${response.nuevos_puntos}`); 
      setPuntos(''); // Limpiar el campo de puntos
    } catch (error) {
      console.error('Error al agregar puntos:', error);
      Alert.alert('Error', 'No se pudo agregar puntos. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido Administrador</Text>
      <ScannerButton navigation={navigation} />

      <TextInput
        style={styles.input}
        placeholder="Ingresa los puntos"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={puntos}
        onChangeText={(text) => setPuntos(text)}
        editable={!buttonDisabled} // Deshabilita el input si no hay datos del QR
      />

      <TouchableOpacity
        style={[styles.button, buttonDisabled && styles.buttonDisabled]}
        onPress={handleAgregarPuntos}
        disabled={buttonDisabled} // Deshabilita el botón si no hay datos del QR
      >
        <Text style={styles.buttonText}>Agregar Puntos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 15,
    marginVertical: 20,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#0E7AFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
