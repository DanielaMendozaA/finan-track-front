
import React from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import ReusableForm from '../../components/molecules/ReusableForm';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { LoginNavigationProp } from '../../navigation/types/types';

export const RegisterScreen = () => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const navigation = useNavigation<LoginNavigationProp>();

    const inputs = [
        {
            name: "email",
            type: "text",
            placeholder: "Ingresa tu correo",
            rules: {
                required: true,
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email inválido'
                }
            }

        },
        {
            name: "username",
            type: "text",
            placeholder: "Ingresa tu nombre",
            rules: {
                required: true
            }

        },

        {
            name: "password",
            label: "",
            type: "password",
            placeholder: "Ingresa tu contraseña",
            rules: {
                required: true,
                pattern: { value: /(?:(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*)/, message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial' }
            },
        },


    ]

    const handleSubmit = (data: any) => {
        Alert.alert("Datos enviados", JSON.stringify(data));
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '90%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} >
            <ScrollView style={styles.scrollView} >
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/finan-track-logo.png')}
                        style={styles.logo}
                    />

                    <ReusableForm
                        inputs={inputs}
                        onSubmit={handleSubmit}
                        buttonText="Enviar"
                        navLink={{
                            path: "Login",
                            text: "Iniciar Sesión",
                            onPress: () => navigation.navigate("Login"),
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        scrollView: {
            width
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30
        },
        logo: {
            width: 220,
            height: 220,
        },

    })

