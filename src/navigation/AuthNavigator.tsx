import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from './types/types';
import LoginScreen from '../screens/public/Login.screen';
import RegisterScreen from '../screens/public/Register.screen';
import HomeScreen from '../screens/private/Home.screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();



export const AuthNavigator = () => {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}
