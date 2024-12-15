
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Dimensions, ActivityIndicator } from 'react-native'
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ReusableForm, { IInput } from '../../components/molecules/ReusableForm';
import { LoginNavigationProp } from '../../navigation/types/types';
import useSubmitRegister from '../../hooks/auth/useSubmitRegister';
import { IRegisterUser } from '../../services/auth/interfaces/register-user.interface';
import { CustomModalConfirmComponent } from '../../components/molecules/CustomModal';
import Logo from '../../components/atoms/Logo';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/atoms/CustomTouchableButton';



interface FormValues {
    name: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    name: yup
        .string()
        .min(2, "El título debe tener al menos 2 caracteres")
        .required("El título es requerido"),

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


const RegisterScreen = () => {
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState<boolean>(false);
    const [defaultFormValues, setDefaultFormValues] = useState<FormValues>({
        name: '',
        email: '',
        password: ''
    })

    const navigation = useNavigation<LoginNavigationProp>();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const theme = useTheme();
    const styles = createStyles(theme);

    const { submitRegister, errorText, openModalError, setOpenModalError, loading } = useSubmitRegister();

    const handleSubmitForm = (formData: IRegisterUser) => {
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

    const inputs: IInput<{ name: string; email: string; password: string }>[] = [
        {
            name: "name",
            type: "text",
            placeholder: "Ingresa tu nombre",
            iconName: "people",
            iconLibrary: MaterialIcons,
            control,
            errors,

        },
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
        <KeyboardAvoidingView
            style={{ flex: 1, width: '90%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} >
            <ScrollView style={styles.scrollView} >
                <View style={styles.container}>
                    <Logo />
                    <ReusableForm
                        inputs={inputs}
                    />

                    <CustomButton
                        title='ENVIAR'
                        onPress={handleSubmit(handleSubmitForm)}
                    />
                    <CustomButton
                        title="Iniciar Sesión"
                        onPress={() => navigation.navigate('Login', {})}
                        style={styles.navLink}
                        textStyle={styles.textButton}
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
            width,
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            minHeight: height
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

