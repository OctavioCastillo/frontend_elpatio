import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './welcomeScreen';
import LoginScreen from './loginScreen';
import RegisterScreen from './registerScreen';
import HomeScreen from './homeScreen';
import CuponesScreen from './cuponesScreen';
import AdminScreen from './adminScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Cupones" component={CuponesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}
