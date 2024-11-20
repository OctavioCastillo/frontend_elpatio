import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import CouponCard from './couponCard';
import NavBar from './navbar';  // Importa la barra de navegación

function CuponesScreen({ navigation }) {
    const availableCoupons = [
        { id: '1', image: require('../assets/cupon1.jpg'), description: 'Cupón de 20% de descuento' },
        { id: '2', image: require('../assets/cupon2.jpg'), description: 'Cupón de 1 bebida gratis' },
        { id: '3', image: require('../assets/cupon3.jpg'), description: 'Cupón de 2x1 en cervezas' },
    ];

    const handleAddToHome = (coupon) => {
        navigation.navigate('Home', { newCoupon: coupon });
    };

    const renderCoupon = ({ item }) => (
        <View style={styles.couponContainer}>
            <CouponCard image={item.image} description={item.description} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToHome(item)}
            >
                <Text style={styles.addButtonText}>Añadir</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cupones Disponibles</Text>
            <FlatList
                data={availableCoupons}
                renderItem={renderCoupon}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.couponsList}
            />
            {/* Barra de navegación */}
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1e', 
        paddingHorizontal: 20,  
        paddingTop: 20, // 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // Texto blanco
        marginBottom: 20,
        textAlign: 'center',
    },
    couponsList: {
        flexGrow: 1,
        paddingBottom: 20,  
    },
    couponContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,  
    },
    addButton: {
        width: '80%', 
        backgroundColor: '#ffffff', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'center', 
    },
    addButtonText: {
        color: '#000000', 
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CuponesScreen;
