import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Alert } from 'react-native';
import CouponCard from './couponCard';
import NavBar from './navbar';
import { getData } from '../config/authService';

function HomeScreen({ navigation, route }) {
    const [userName, setUserName] = useState('');
    const [userPoints, setUserPoints] = useState(0);
    const [coupons, setCoupons] = useState([
        { id: '1', image: require('../assets/cupon1.jpg'), description: 'Cupón de 20% de descuento' },
    ]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getData();
                setUserName(response.Usuario.username);
                setUserPoints(response.Usuario.puntos);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron obtener los datos del usuario.');
                console.error('Error obteniendo datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (route.params?.newCoupon) {
            const newCoupon = route.params.newCoupon;
            if (!coupons.some((coupon) => coupon.id === newCoupon.id || coupon._id === newCoupon._id)) {
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
                    <CouponCard
                        image={item.image || item.img}
                        description={item.description || item.descripcion}
                    />
                )}
                keyExtractor={(item) => item.id || item._id}
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
        backgroundColor: '#1c1c1e',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
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
