
import React from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import ReusableForm from '../../components/molecules/ReusableForm';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { LoginNavigationProp, RegisterNavigationProp } from '../../navigation/types/types';

export const LoginScreen = () => {
    const theme = useTheme()
    const styles = createStyles(theme)
    const navigation = useNavigation<RegisterNavigationProp>();

    const inputs = [
        {
            name: "email",
            label: "",
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
                    path: "Register",
                    text: "Registrarse",
                    onPress: () => navigation.navigate("Register"),
                }}
            />

        </View>
    )
}



const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: 220,
            height: 220,
        },

    })



// { name: "acceptTerms", label: "Aceptar términos", type: "checkbox", rules: { required: true } },
// {
//     name: "gender",
//     label: "Género",
//     type: "select",
//     options: [
//         { label: "Masculino", value: "male" },
//         { label: "Femenino", value: "female" },
//         { label: "otro", value: "otro" },
//     ],
// },

// {
//     name: "gender",
//     label: "Género",
//     type: "radio",
//     options: [
//         { label: "Masculino", value: "male" },
//         { label: "Femenino", value: "female" },
//         { label: "otro", value: "otro" },
//     ],
//     rules: { required: true },
// },