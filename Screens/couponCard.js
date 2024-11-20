import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

function CouponCard({ image, description }) {
    return (
        <ImageBackground
            source={image}
            style={styles.couponContainer}
            imageStyle={styles.couponImage}
        >
            <Text style={styles.couponText}>{description}</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    couponContainer: {
        width: '100%',
        height: 150,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden', 
    },
    couponImage: {
        resizeMode: 'cover',
    },
    couponText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
});

export default CouponCard;
