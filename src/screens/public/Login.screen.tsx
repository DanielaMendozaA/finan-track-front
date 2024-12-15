
import React from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, ToastAndroid, View } from 'react-native'
import { Theme, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DrawerHomeNavigationProp, LoginNavigationProp, LoginScreenRoutenProp, RegisterNavigationProp } from '../../navigation/types/types';
import ReusableForm, { IInput } from '../../components/molecules/ReusableForm';
import useSubmitLogin from '../../hooks/auth/useSubmitLogin';
import { ILoginUser } from '../../services/auth/interfaces/login-user.interface';
import { CustomModalConfirmComponent } from '../../components/molecules/CustomModal';
import Logo from '../../components/atoms/Logo';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/atoms/CustomTouchableButton';


const schema = yup.object().shape({
    email: yup.string()
        .email('El correo electrónico es inválido')
        .required('Correo electrónico es requerido'),

    password: yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(50, 'La contraseña no puede tener más de 50 caracteres')
        .matches(
            /(?:(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*)/,
            'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
        )
        .required('La contraseña es requerida'),

})


const LoginScreen = () => {
    const navigationLogin = useNavigation<LoginNavigationProp>();
    const navigation = useNavigation<RegisterNavigationProp>();
    const { params } = useRoute<LoginScreenRoutenProp>();
    const { email = '', password = '' } = params || {};

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email,
            password
        }
    });


    const theme = useTheme()
    const styles = createStyles(theme)

    const { submitLogin, loading, errorText, openModalError, setOpenModalError } = useSubmitLogin();

    const handleSubmitForm = async (formData: ILoginUser) => {
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

    const inputs: IInput<{ email: string; password: string }>[] = [
        {
            name: "email",
            type: "text",
            placeholder: "Ingresa tu correo",
            iconName: "email",
            iconLibrary: MaterialIcons,
            control,
            errors,
        },
        {
            name: "password",
            type: "password",
            placeholder: "Ingresa tu contraseña",
            iconName: "password",
            iconLibrary: MaterialIcons,
            control,
            errors,
        },
    ];

    return (

        <View style={styles.container}>
            <Logo />
            <ReusableForm
                inputs={inputs}
            />

            <CustomButton
                title=' ENVIAR'
                onPress={handleSubmit(handleSubmitForm)}
            />
            <CustomButton
                title="Registrarse"
                onPress={() => navigation.navigate('Register')}
                style={styles.navLink} 
                textStyle={styles.textButton} 
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
            alignItems: 'center',
            gap: 20
        },
        navLink: {
            alignSelf: "center",
            backgroundColor: theme.colors.background,
            width: 'auto',
            padding: 0
        },
        textButton: {
            color: theme.colors.text,
            fontSize: 20,
        },

    })

