import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { getCupones } from '../config/authService';
import CouponCard from './couponCard';
import NavBar from './navbar';

function CuponesScreen({ navigation }) {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await getCupones();

                const updatedCoupons = data.map((coupon) => {
                    let imgPath;
                    switch (coupon.tipo) {
                        case 'descuento':
                            imgPath = require('../assets/cupon1.jpg');
                            break;
                        case '2x1':
                            imgPath = require('../assets/cupon2.jpg');
                            break;
                        case 'comida gratis':
                            imgPath = require('../assets/cupon3.jpg');
                            break;
                        default:
                            imgPath = require('../assets/default.jpeg');
                    }
                    return { ...coupon, img: imgPath };
                });

                setCoupons(updatedCoupons);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los cupones.');
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const handleAddToHome = (coupon) => {
        navigation.navigate('Home', { newCoupon: coupon });
    };

    const renderCoupon = ({ item }) => (
        <View style={styles.couponContainer}>
            <CouponCard image={item.img} description={item.descripcion} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToHome(item)}
            >
                <Text style={styles.addButtonText}>Añadir</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Cargando cupones...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cupones Disponibles</Text>
            <FlatList
                data={coupons}
                renderItem={renderCoupon}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.couponsList}
            />
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1e',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#ffffff',
    },
});

export default CuponesScreen;
