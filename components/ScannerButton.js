import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

function ScannerButton({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

  const handlePress = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          'Permisos requeridos',
          'Es necesario otorgar permisos de cámara para usar el escáner.'
        );
        return;
      }
    }
    navigation.navigate('Scanner'); // Navega a la pantalla del escáner
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Abrir Escáner QR</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0E7AFE',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScannerButton;
