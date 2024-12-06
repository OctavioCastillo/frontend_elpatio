import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import ScannerButton from '../components/ScannerButton';

function AdminScreen({ navigation }) {
  const [puntos, setPuntos] = useState(''); // Estado para los puntos

  const handleAgregarPuntos = () => {
    if (!puntos || isNaN(puntos)) {
      Alert.alert('Error', 'Por favor, ingresa un valor numérico válido.');
      return;
    }

    Alert.alert('Éxito', `Se agregarán ${puntos} puntos.`);
    // Aquí puedes incluir la lógica para enviar los puntos al backend o procesarlos
    setPuntos(''); // Limpia el input
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
      />

      <TouchableOpacity style={styles.button} onPress={handleAgregarPuntos}>
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminScreen;
