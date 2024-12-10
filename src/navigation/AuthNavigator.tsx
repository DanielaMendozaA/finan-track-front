import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { RootStackParamList } from './types/types';
import LoginScreen from '../screens/public/Login.screen';
import RegisterScreen from '../screens/public/Register.screen';

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
