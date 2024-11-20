import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import CouponCard from './couponCard';
import NavBar from './navbar';

function HomeScreen({ navigation, route }) {
    const userName = 'Juan Pérez';
    const userPoints = 1200;

    const [coupons, setCoupons] = useState([
        { id: '1', image: require('../assets/cupon1.jpg'), description: 'Cupón de 20% de descuento' },
    ]);

    useEffect(() => {
        if (route.params?.newCoupon) {
            const newCoupon = route.params.newCoupon;
            if (!coupons.some((coupon) => coupon.id === newCoupon.id)) {
                setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
            }
        }
    }, [route.params?.newCoupon]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userPoints}>{userPoints} Puntos</Text>
            </View>
            <FlatList
                data={coupons}
                renderItem={({ item }) => (
                    <CouponCard image={item.image} description={item.description} />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.couponsList}
                showsVerticalScrollIndicator={false}
            />
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1e', // Fondo que representa un bar
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // Texto blanco
        marginBottom: 10,
    },
    userPoints: {
        fontSize: 18,
        color: '#ffffff',
    },
    couponsList: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
