// AdminScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AdminScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido Administrador</Text>
            {/* Aquí puedes agregar funcionalidades específicas para el admin */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AdminScreen;
