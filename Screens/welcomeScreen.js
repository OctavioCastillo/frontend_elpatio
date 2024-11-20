import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from '../components/AppText'; // Asegúrate de importar correctamente AppText

function WelcomeScreen({ texto, navigation }) {
    return (
        <ImageBackground
            source={require('../assets/bar.jpg')} 
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.jpg')} 
                />
                <AppText style={styles.title} texto="Bienvenidos a El Patio" />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 75,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: colors.light,
        textAlign: 'center',
    },
    buttonsContainer: {
        width: '100%',
        padding: 20,
    },
    loginButton: {
        backgroundColor: '#000',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#000',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default WelcomeScreen;
