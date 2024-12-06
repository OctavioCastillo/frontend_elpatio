import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, AppState, Platform, StatusBar, Text } from 'react-native';
import { CameraView } from 'expo-camera';

function ScannerScreen({ navigation }) {
  const qrLock = useRef(false); // Control para evitar múltiples lecturas
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        qrLock.current = false; // Reinicia el bloqueo si la app vuelve al primer plano
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Bloquea lecturas adicionales

      try {
        const qrData = JSON.parse(data); // Parsear el JSON del QR
        Alert.alert('Éxito', 'Código QR escaneado con éxito.', [
          {
            text: 'Aceptar',
            onPress: () => navigation.navigate('Admin', { qrData }), // Pasa los datos a AdminScreen
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'El código QR no contiene un JSON válido.');
        qrLock.current = false; // Permitir otro intento
      }
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar hidden />}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned} // Maneja el escaneo del QR
      />
      <View style={styles.scanFrame}>
        <Text style={styles.scanText}>Alinea el código QR dentro del marco</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    height: 200,
    borderWidth: 2,
    borderColor: '#0E7AFE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    top: -30,
  },
});

export default ScannerScreen;
