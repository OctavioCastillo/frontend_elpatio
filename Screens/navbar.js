import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener instalada esta librería

function NavBar({ navigation }) {
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

            {/* Botón para WelcomeScreen */}
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Welcome')}>
                <Icon name="log-out" size={24} color="#fff" />
                <Text style={styles.navText}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#333', 
        paddingVertical: 10,
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
});

export default NavBar;
