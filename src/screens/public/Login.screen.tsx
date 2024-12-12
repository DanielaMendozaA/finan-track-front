
import React from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, ToastAndroid, View } from 'react-native'
import { Theme, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { DrawerHomeNavigationProp, LoginNavigationProp, LoginScreenRoutenProp, RegisterNavigationProp } from '../../navigation/types/types';
import ReusableForm from '../../components/molecules/ReusableForm';
import useSubmitLogin from '../../hooks/auth/useSubmitLogin';
import { ILoginUser } from '../../services/auth/interfaces/login-user.interface';
import { CustomModalConfirmComponent } from '../../components/molecules/CustomModal';

const LoginScreen = () => {
    const navigationLogin = useNavigation<LoginNavigationProp>();
    const navigation = useNavigation<RegisterNavigationProp>();
    const navigationHome = useNavigation<DrawerHomeNavigationProp>();
    const { params } = useRoute<LoginScreenRoutenProp>();
    const { email = '', password = '' } = params || {};
    const defaultValues = {
        email,
        password
    }

    const theme = useTheme()
    const styles = createStyles(theme)

    const { submitLogin, loading, errorText, openModalError, setOpenModalError } = useSubmitLogin();

    const handleSubmit = async (formData: ILoginUser) => {
        await submitLogin(formData, () => {
            ToastAndroid.show('¡Bienvenido!', ToastAndroid.SHORT);

        });
    };

    const closeModalError = () => {
        setOpenModalError(false);
        navigationLogin.navigate('Login', { email: '', password: '' });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

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
            },
            iconName: "email",
            iconLibrary: MaterialIcons,

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
            iconName: "password",
            iconLibrary: MaterialIcons,
        },

    ]

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
                defaultValues={defaultValues}
            />

            {openModalError && (
                <CustomModalConfirmComponent
                    visible={openModalError}
                    onClose={closeModalError}
                    text={`Error: ${errorText}`}
                />
            )}

        </View>
    )
}


export default LoginScreen
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