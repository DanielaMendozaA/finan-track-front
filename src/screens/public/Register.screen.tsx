
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Dimensions, ActivityIndicator } from 'react-native'
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ReusableForm from '../../components/molecules/ReusableForm';
import { LoginNavigationProp } from '../../navigation/types/types';
import useSubmitRegister from '../../hooks/auth/useSubmitRegister';
import { IRegisterUser } from '../../services/auth/interfaces/register-user.interface';
import { CustomModalConfirmComponent } from '../../components/molecules/CustomModal';



interface DefaultFormValues {
    name: string;
    email: string;
    password: string;
}

const RegisterScreen = () => {
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState<boolean>(false);
    const [defaultFormValues, setDefaultFormValues] = useState<DefaultFormValues>({
        name: '',
        email: '',
        password: ''
    })

    const navigation = useNavigation<LoginNavigationProp>();

    const theme = useTheme();
    const styles = createStyles(theme);

    const { submitRegister, errorText, openModalError, setOpenModalError, loading } = useSubmitRegister();

    const handleSubmit = (formData: IRegisterUser) => {
        console.log("estos son los datos enviados", formData);
        
        submitRegister(formData, () => {
            setIsModalConfirmVisible(true)
            setDefaultFormValues({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        });
    };


    const closeModalError = () => {
        setOpenModalError(false);
    };

    const handleCloseModalConfirm = () => {
        setIsModalConfirmVisible(false)

        console.log("default values", defaultFormValues);
        navigation.navigate('Login', defaultFormValues);
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const inputs = [
        {
            name: "email",
            type: "text",
            placeholder: "Ingresa tu correo",
            rules: {
                required: true,
                // pattern: {
                //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                //     message: 'Email inválido'
                // }
            },
            iconName: "email",
            iconLibrary: MaterialIcons,

        },
        {
            name: "name",
            type: "text",
            placeholder: "Ingresa tu nombre",
            rules: {
                required: true
            },
            iconName: "people",
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
                            onPress: () => navigation.navigate("Login", { email: '', password: '' }),
                        }}
                    />

                    <CustomModalConfirmComponent
                        visible={isModalConfirmVisible}
                        onClose={handleCloseModalConfirm}
                        text='Para completar el registro, confirme el enlace enviado a su correo electrónico.'
                    />

                    {openModalError && (
                        <CustomModalConfirmComponent
                            visible={openModalError}
                            onClose={closeModalError}
                            text={`Error: ${errorText}`}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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

